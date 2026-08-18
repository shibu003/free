// Data loading, search, and validation for the free-tier database.
// CLI: node lib.js validate | node lib.js stale <days> | node lib.js readme
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), 'data', 'services');

const CATEGORIES = ['compute', 'hosting', 'database', 'storage', 'llm-api', 'ci', 'vector', 'auth', 'email', 'observability', 'ml-compute'];
const CONFIDENCES = ['high', 'medium', 'low'];
// What kind of offer an entry is, not whether it's free — a service can mix
// types (e.g. a perpetual quota AND a separate one-time trial credit), so
// this lives per free_tier[] item, not once on the service.
const TIER_TYPES = ['perpetual-quota', 'recurring-credit', 'trial-credit', 'one-time-credit', 'self-hosted'];

export function loadServices() {
  return readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(DATA_DIR, f), 'utf8')))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function validateService(s) {
  const errors = [];
  const req = (field, ok) => { if (!ok) errors.push(`${s.id ?? '?'}: ${field}`); };
  req('id must be a kebab-case string', typeof s.id === 'string' && /^[a-z0-9-]+$/.test(s.id));
  req('name must be a non-empty string', typeof s.name === 'string' && s.name.length > 0);
  req(`category must be one of ${CATEGORIES.join('|')}`, CATEGORIES.includes(s.category));
  req('url must be https', typeof s.url === 'string' && s.url.startsWith('https://'));
  req('pricing_url must be https', typeof s.pricing_url === 'string' && s.pricing_url.startsWith('https://'));
  req('has_free_tier must be boolean', typeof s.has_free_tier === 'boolean');
  req('free_tier must be an array', Array.isArray(s.free_tier));
  if (Array.isArray(s.free_tier)) {
    if (s.has_free_tier) req('free_tier must be non-empty when has_free_tier', s.free_tier.length > 0);
    for (const e of s.free_tier) {
      req('free_tier entries need resource+limit strings', typeof e.resource === 'string' && typeof e.limit === 'string');
      // type is optional (older entries predate this field) but must be a
      // known value once present — an unrecognized type is worse than none.
      req(`free_tier[].type must be one of ${TIER_TYPES.join('|')} or omitted`, e.type === undefined || TIER_TYPES.includes(e.type));
    }
  }
  req('credit_card_required must be boolean or null', typeof s.credit_card_required === 'boolean' || s.credit_card_required === null);
  req('open_source must be boolean or omitted', s.open_source === undefined || typeof s.open_source === 'boolean');
  req('tags must be an array of strings', Array.isArray(s.tags) && s.tags.every((t) => typeof t === 'string'));
  req('verified_at must be YYYY-MM-DD', typeof s.verified_at === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s.verified_at));
  req('sources must be a non-empty array of URLs', Array.isArray(s.sources) && s.sources.length > 0 && s.sources.every((u) => typeof u === 'string' && u.startsWith('http')));
  req(`confidence must be one of ${CONFIDENCES.join('|')}`, CONFIDENCES.includes(s.confidence));
  return errors;
}

export function findFree(services, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return services;
  return services.filter((s) => {
    const haystack = [
      s.id, s.name, s.category, s.notes ?? '',
      ...(s.tags ?? []),
      ...s.free_tier.flatMap((e) => [e.resource, e.limit, e.notes ?? '']),
    ].join(' ').toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function staleServices(services, maxAgeDays) {
  const cutoff = Date.now() - maxAgeDays * 86400_000;
  return services.filter((s) => new Date(s.verified_at).getTime() < cutoff);
}

// Classifies a pricing_url by fetching it. Not "is the data still correct" —
// a 200 tells you nothing about whether the free-tier numbers changed, only
// that the page is still there. What this catches is the sharper failure:
// the page moved or the vendor took it down, so nobody can verify or correct
// this entry at all until the URL is fixed. That's why only DEAD blocks
// anything; UNVERIFIABLE and WARNING are informational (bot walls and
// transient errors are common on pricing pages and don't mean the data
// is wrong).
export async function checkUrl(url, { timeoutMs = 10_000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    // Some pricing pages 405 on HEAD but serve GET fine — retry before judging.
    if (res.status === 405) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    }
    if (res.status >= 200 && res.status < 400) return { status: 'OK', code: res.status };
    if (res.status === 404 || res.status === 410) return { status: 'DEAD', code: res.status };
    if (res.status === 403 || res.status === 429) return { status: 'UNVERIFIABLE', code: res.status };
    return { status: 'WARNING', code: res.status };
  } catch (err) {
    return { status: err.name === 'AbortError' ? 'WARNING' : 'WARNING', code: null, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

export async function checkAllUrls(services, opts) {
  const results = [];
  for (const s of services) {
    const r = await checkUrl(s.pricing_url, opts);
    results.push({ id: s.id, url: s.pricing_url, ...r });
  }
  return results;
}

const CATEGORY_ORDER = ['llm-api', 'vector', 'ml-compute', 'compute', 'hosting', 'database', 'storage', 'auth', 'email', 'observability', 'ci'];

export function renderTable(services) {
  const lines = [];
  const seen = [...new Set(services.map((s) => s.category))];
  const cats = [...seen].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  for (const cat of cats) {
    lines.push(`\n### ${cat}\n`);
    lines.push('| Service | Free tier | Card? | Verified |');
    lines.push('|---|---|---|---|');
    for (const s of services.filter((x) => x.category === cat)) {
      const tier = s.has_free_tier
        ? s.free_tier.map((e) => `${e.resource}: ${e.limit}`).join('; ')
        : '**none**';
      const card = s.credit_card_required === null ? '?' : s.credit_card_required ? 'yes' : 'no';
      lines.push(`| [${s.name}](${s.pricing_url}) | ${tier} | ${card} | ${s.verified_at} |`);
    }
  }
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, arg] = process.argv.slice(2);
  const services = loadServices();
  if (cmd === 'validate') {
    const errors = services.flatMap(validateService);
    const ids = new Set(services.map((s) => s.id));
    if (ids.size !== services.length) errors.push('duplicate service ids');
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exit(1);
    }
    console.log(`${services.length} services valid`);
  } else if (cmd === 'stale') {
    for (const s of staleServices(services, Number(arg ?? 60))) {
      console.log(`${s.id} (verified ${s.verified_at})`);
    }
  } else if (cmd === 'check-urls') {
    const results = await checkAllUrls(services);
    const dead = results.filter((r) => r.status === 'DEAD');
    for (const r of results) {
      if (r.status !== 'OK') console.log(`${r.status} ${r.id} ${r.url} (${r.code ?? r.error})`);
    }
    console.log(`\n${results.length} checked, ${dead.length} dead, ${results.filter((r) => r.status === 'UNVERIFIABLE').length} unverifiable, ${results.filter((r) => r.status === 'WARNING').length} warnings`);
    if (dead.length) process.exit(1);
  } else if (cmd === 'readme') {
    const path = join(dirname(fileURLToPath(import.meta.url)), 'README.md');
    const md = readFileSync(path, 'utf8');
    const [start, end] = ['<!-- TABLE:START -->', '<!-- TABLE:END -->'];
    const updated = md.replace(
      new RegExp(`${start}[\\s\\S]*${end}`),
      `${start}\n${renderTable(services)}\n${end}`
    );
    writeFileSync(path, updated);
    console.log('README table regenerated');
  } else {
    console.error('usage: node lib.js validate | node lib.js stale <days> | node lib.js check-urls | node lib.js readme');
    process.exit(1);
  }
}

// Data loading, search, and validation for the free-tier database.
// CLI: node lib.js validate | node lib.js stale <days> | node lib.js readme
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), 'data', 'services');

const CATEGORIES = ['compute', 'hosting', 'database', 'storage', 'llm-api', 'ci', 'vector', 'auth', 'email', 'observability', 'ml-compute'];
const CONFIDENCES = ['high', 'medium', 'low'];

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
    }
  }
  req('credit_card_required must be boolean or null', typeof s.credit_card_required === 'boolean' || s.credit_card_required === null);
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
    console.error('usage: node lib.js validate | node lib.js stale <days>');
    process.exit(1);
  }
}

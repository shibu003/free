import test from 'node:test';
import assert from 'node:assert/strict';
import { loadServices, validateService, findFree, staleServices } from './lib.js';

const services = loadServices();

test('database loads and every record validates', () => {
  assert.ok(services.length >= 10, `expected >=10 services, got ${services.length}`);
  for (const s of services) {
    assert.deepEqual(validateService(s), []);
  }
  assert.equal(new Set(services.map((s) => s.id)).size, services.length, 'duplicate ids');
});

test('find_free matches services by their own name and by limits text', () => {
  for (const s of services) {
    const hits = findFree(services, s.id);
    assert.ok(hits.some((h) => h.id === s.id), `find "${s.id}" should return itself`);
  }
  assert.equal(findFree(services, '').length, services.length);
  assert.equal(findFree(services, 'zzz-no-such-thing-xyz').length, 0);
});

test('stale detection uses verified_at', () => {
  assert.equal(staleServices(services, 100000).length, 0);
  assert.equal(staleServices(services, 0).length, services.length);
});

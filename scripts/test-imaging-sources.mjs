/**
 * 影像来源插件自检
 * node scripts/test-imaging-sources.mjs
 */
import { catalog, searchSource, searchAll, healthCheck, buildLink } from '../data/imaging-sources/index.mjs';

const q = process.argv[2] || 'Galeazzi fracture radiograph';

console.log('=== Imaging Sources Plugin Test ===\n');
console.log('catalog:', catalog().length, 'sources');
console.log('api-capable:', catalog({ apiOnly: true }).length);

console.log('\n1. health (api sources)...');
const health = await healthCheck();
for (const c of health.checks || []) {
  console.log(' ', c.sourceId, c.ok ? 'OK' : 'FAIL', c.error || c.message || '');
}

console.log('\n2. search openi:', q);
try {
  const oi = await searchSource('openi', q, { limit: 2 });
  console.log('  hits:', oi.hits.length, oi.hits.map(h => h.file).join(', '));
} catch (e) {
  console.log('  error:', e.message);
}

console.log('\n3. search wikimedia-commons:', q);
try {
  const wiki = await searchSource('wikimedia-commons', q, { limit: 2 });
  console.log('  hits:', wiki.hits.length, wiki.hits.map(h => h.file).join(', '));
} catch (e) {
  console.log('  error:', e.message);
}

console.log('\n4. link radiopaedia');
const link = buildLink('radiopaedia', q);
console.log(' ', link.url);

console.log('\n5. link 丁香园');
console.log(' ', buildLink('dxy-imaging', '骨折').url);

console.log('\n6. search-all (limited)...');
const all = await searchAll(q, { limit: 2, sources: ['openi', 'wikimedia-commons', 'biomed-central'] });
console.log('  sources:', all.results.length, 'errors:', all.errors.length);

console.log('\ndone');

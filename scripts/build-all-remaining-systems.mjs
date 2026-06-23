/**
 * 生成 8 系统 catalog 并导入 site-data.json
 * node scripts/build-all-remaining-systems.mjs [--dry-run]
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { DOC_SYSTEMS } from '../data/doc-remaining-systems-source.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const node = process.execPath;

function run(script, args = []) {
  const r = spawnSync(node, [path.join(__dirname, script), ...args], { stdio: 'inherit', cwd: root });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log('=== generate catalogs ===');
run('generate-remaining-systems-catalog.mjs');

console.log('\n=== build system content ===');
for (const { sys } of DOC_SYSTEMS) {
  const args = [sys];
  if (dryRun) args.push('--dry-run');
  run('build-system-content.mjs', args);
}

console.log('\n=== disease counts per system ===');
const siteData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8'));
let total = 0;
for (const { sys } of DOC_SYSTEMS) {
  const n = siteData.diseases.filter(d => d.sys === sys).length;
  total += n;
  console.log(`  ${sys}: ${n}`);
}
console.log('  ---');
console.log(`  remaining-8 total: ${total}`);
console.log(`  site total: ${siteData.diseases.length}`);
run('generate-nav-fallback.mjs');
run('generate-site-lite.mjs');
console.log('\nbuild-all-remaining-systems', dryRun ? '(dry-run)' : 'done');

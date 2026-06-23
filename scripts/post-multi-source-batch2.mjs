/**
 * 多源补充完成后：剔除 blocked 图、同步 ONLINE_VERIFIED、校验、统计
 * node scripts/post-multi-source-batch2.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { CURATED_GALLERIES, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import { OPENI_BLOCK, BLOCK_WORDS } from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const curatedPath = path.join(root, 'data', 'batch2-gallery-curated.mjs');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-post-multi-source-report.json');
const ALL_DISEASES = process.argv.includes('--all');

function isBlockedFile(file) {
  if (!file) return true;
  if (BLOCKED_FILES.has(file)) return true;
  if (OPENI_BLOCK.test(file)) return true;
  if (BLOCK_WORDS.test(file)) return true;
  return false;
}

function loadRegistryLines() {
  const raw = fs.readFileSync(registryPath, 'utf8');
  const m = raw.match(/const RAW=`([\s\S]*?)`;/);
  return m ? m[1].trim().split('\n').filter(Boolean) : [];
}

function saveRegistryLines(lines) {
  const body = fs.readFileSync(registryPath, 'utf8');
  fs.writeFileSync(registryPath, body.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${lines.join('\n')}\`;`), 'utf8');
}

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const g = site.diseaseGalleries || {};
const removed = [];

for (const [type, items] of Object.entries(g)) {
  const kept = [];
  for (const it of items || []) {
    if (isBlockedFile(it.file)) {
      removed.push({ type, file: it.file, reason: 'blocked' });
      continue;
    }
    kept.push(it);
  }
  if (kept.length) g[type] = kept;
  else delete g[type];
}
site.diseaseGalleries = g;

const used = new Set();
for (const items of Object.values(g)) {
  for (const it of items || []) if (it.file) used.add(it.file);
}

const registryLines = loadRegistryLines();
const keptLines = registryLines.filter(line => {
  const file = line.split('|')[0];
  if (isBlockedFile(file) && !used.has(file)) {
    removed.push({ type: '*registry*', file, reason: 'blocked-unused' });
    return false;
  }
  return true;
});
if (keptLines.length !== registryLines.length) saveRegistryLines(keptLines);

for (const file of removed.map(r => r.file)) {
  delete site.imageAttribRegistry?.[file];
}

const batch2 = ALL_DISEASES
  ? (site.diseases || [])
  : (() => {
      const out = [];
      for (const c of Object.values(list.categories || {})) {
        for (const d of c.diseases || []) out.push(d);
      }
      return out;
    })();

const onlineVerified = {};
for (const d of batch2) {
  if (CURATED_GALLERIES[d.type]?.length) continue;
  const files = (g[d.type] || []).map(i => i.file).filter(Boolean);
  if (files.length) onlineVerified[d.type] = files;
}

let curated = fs.readFileSync(curatedPath, 'utf8');
const block = `export const ONLINE_VERIFIED_GALLERIES = ${JSON.stringify(onlineVerified, null, 2)};`;
curated = curated.replace(/export const ONLINE_VERIFIED_GALLERIES = \{[\s\S]*?\};/, block);
fs.writeFileSync(curatedPath, curated, 'utf8');

const withImg = batch2.filter(d => (g[d.type] || []).length);
const empty = batch2.filter(d => !(g[d.type] || []).length);
const slots = withImg.reduce((n, d) => n + (g[d.type]?.length || 0), 0);
const openiCount = Object.keys(site.imageAttribRegistry || {}).filter(k => k.startsWith('openi__')).length;

site.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(site, null, 2), 'utf8');

const report = {
  at: new Date().toISOString(),
  removed: removed.length,
  removedSamples: removed.slice(0, 40),
  withImg: withImg.length,
  empty: empty.length,
  slots,
  openiRegistry: openiCount,
  onlineVerifiedTypes: Object.keys(onlineVerified).length,
  emptyList: empty.map(d => ({ type: d.type, title: d.title }))
};
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log('blocked removed:', removed.length);
console.log('coverage:', withImg.length, '/', batch2.length, `(${((withImg.length / batch2.length) * 100).toFixed(1)}%)`);
console.log('slots:', slots, '| still empty:', empty.length, '| open-i registry:', openiCount);
console.log('report:', reportPath);

execSync(`node scripts/validate-batch2-galleries.mjs${ALL_DISEASES ? ' --all' : ''}`, { cwd: root, stdio: 'inherit' });
try {
  execSync('node scripts/audit-batch2-gallery-match.mjs', { cwd: root, stdio: 'inherit' });
} catch {
  console.warn('audit finished with findings (non-zero exit); see output above');
}

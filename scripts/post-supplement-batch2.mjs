/**
 * 在线补充完成后：同步 ONLINE_VERIFIED、校验、统计
 * node scripts/post-supplement-batch2.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { CURATED_GALLERIES } from '../data/batch2-gallery-curated.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const curatedPath = path.join(root, 'data', 'batch2-gallery-curated.mjs');
const dataPath = path.join(root, 'data', 'site-data.json');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-post-supplement-report.json');

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const g = site.diseaseGalleries || {};

const batch2 = [];
for (const c of Object.values(list.categories || {})) {
  for (const d of c.diseases || []) batch2.push(d);
}

const onlineVerified = {};
for (const d of batch2) {
  if (CURATED_GALLERIES[d.type]?.length) continue;
  const files = (g[d.type] || []).map(i => i.file).filter(Boolean);
  if (files.length) onlineVerified[d.type] = files;
}

// 更新 batch2-gallery-curated.mjs 中 ONLINE_VERIFIED_GALLERIES
let curated = fs.readFileSync(curatedPath, 'utf8');
const block = `export const ONLINE_VERIFIED_GALLERIES = ${JSON.stringify(onlineVerified, null, 2)};`;
curated = curated.replace(
  /export const ONLINE_VERIFIED_GALLERIES = \{[\s\S]*?\};/,
  block
);
fs.writeFileSync(curatedPath, curated, 'utf8');

const withImg = batch2.filter(d => (g[d.type] || []).length);
const empty = batch2.filter(d => !(g[d.type] || []).length);
const slots = withImg.reduce((n, d) => n + (g[d.type]?.length || 0), 0);

const report = {
  at: new Date().toISOString(),
  withImg: withImg.length,
  empty: empty.length,
  slots,
  onlineVerifiedTypes: Object.keys(onlineVerified).length,
  emptyList: empty.map(d => ({ type: d.type, title: d.title }))
};
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log('ONLINE_VERIFIED synced:', Object.keys(onlineVerified).length, 'types');
console.log('coverage:', withImg.length, '/', batch2.length, `(${((withImg.length / batch2.length) * 100).toFixed(1)}%)`);
console.log('slots:', slots, '| still empty:', empty.length);
console.log('report:', reportPath);

execSync('node scripts/validate-batch2-galleries.mjs', { cwd: root, stdio: 'inherit' });

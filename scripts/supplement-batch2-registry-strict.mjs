/**
 * 注册库严格匹配（score>=20）补充空图库疾病
 * node scripts/supplement-batch2-registry-strict.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOCKED_FILES, EXTRA_SEARCH } from '../data/batch2-gallery-curated.mjs';

const MIN = 20;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');

function scoreFile(title, disease) {
  if (BLOCKED_FILES.has(title)) return -100;
  const t = title.toLowerCase();
  const tokens = [
    disease.type,
    ...(disease.en || '').split(/[\s/(),-]+/),
    ...(disease.title || '').split(/[\s/(),·-]+/)
  ]
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length >= 4);
  let score = 0;
  for (const tok of tokens) {
    if (tok.length >= 4 && t.includes(tok)) score += tok.length >= 8 ? 12 : 8;
  }
  for (const q of EXTRA_SEARCH[disease.type] || []) {
    for (const w of q.toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && t.includes(w)) score += 10;
    }
  }
  if (/x-ray|xray|radiograph|mri|mrt|ct |sono|ultrasound/.test(t)) score += 4;
  return score;
}

function inferModality(file) {
  const s = file.toLowerCase();
  if (/mri|mrt/.test(s)) return 'MRI';
  if (/ct /.test(s)) return 'CT';
  return 'X线';
}

const raw = fs.readFileSync(registryPath, 'utf8');
const regFiles = (raw.match(/const RAW=`([\s\S]*?)`;/)?.[1] || '')
  .trim()
  .split('\n')
  .map(l => l.split('|')[0])
  .filter(Boolean);

const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const g = site.diseaseGalleries || {};
const empty = [];
for (const c of Object.values(list.categories || {})) {
  for (const d of c.diseases || []) {
    if (!(g[d.type] || []).length) empty.push(d);
  }
}

const added = [];
for (const d of empty) {
  const ranked = regFiles
    .map(file => ({ file, score: scoreFile(file, d) }))
    .filter(x => x.score >= MIN)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) continue;
  const items = ranked.slice(0, 2).map(x => ({
    file: x.file,
    caption: `${inferModality(x.file)} · ${d.title}典型影像`,
    site: `${d.title} · ${inferModality(x.file)}`.slice(0, 28),
    ann: [],
    modified: /annotation|annotated/i.test(x.file)
  }));
  site.diseaseGalleries[d.type] = items;
  added.push({ type: d.type, title: d.title, score: ranked[0].score, files: items.map(i => i.file) });
  console.log(`+ ${d.type} (${ranked[0].score}): ${items.map(i => i.file).join(' | ')}`);
}

site.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(site, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'data', 'batch2-strict-registry-supplement.json'), JSON.stringify({ min: MIN, added }, null, 2));
console.log('\nstrict registry: added', added.length, 'diseases');

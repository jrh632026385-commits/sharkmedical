/**
 * 从 image-attrib-registry 为第二批空图库疾病做离线高分匹配
 * node scripts/supplement-batch2-offline-registry.mjs [--min=15]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOCKED_FILES, EXTRA_SEARCH } from '../data/batch2-gallery-curated.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-offline-registry-supplement.json');

const MIN_SCORE = Number(process.argv.find(a => a.startsWith('--min='))?.slice(6) || 15);
const BLOCK_EXT = /\.(svg|gif|webm|ogv|pdf|djvu)$/i;
const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|photo of patient|portrait|histolog|microscop|anatomy chart|logo|icon/i;

function loadBatch2() {
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  const out = [];
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) out.push(d);
  }
  return out;
}

function loadRegistry() {
  const raw = fs.readFileSync(registryPath, 'utf8');
  const m = raw.match(/const RAW=`([\s\S]*?)`;/);
  const map = {};
  const files = [];
  if (!m) return { map, files };
  m[1]
    .trim()
    .split('\n')
    .forEach(line => {
      if (!line.trim()) return;
      const p = line.split('|');
      if (p.length < 5) return;
      files.push(p[0]);
      map[p[0]] = {
        author: p[1],
        license: p[2],
        licenseUrl: p[3],
        pageUrl: p[4],
        source: 'Wikimedia Commons',
        title: p[0]
      };
    });
  return { map, files };
}

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
  if (/x-ray|xray|radiograph|roentgen|mri|mrt|ct |sono|ultrasound/.test(t)) score += 4;
  if (
    /fracture|fraktur|luxation|tumor|sarcoma|lipoma|hemangioma|chondro|meniscus|spondyl|disc|ligament|arthritis|lesion|ruptur|dislocation|myeloma|exostos|osteochondroma|osteoid|enchondroma|galeazzi|bennett|olecranon|bankart|charcot|blount|paget|melorheostosis|osteoma|liposarcoma|desmoid|tgct|pvns|dfsp|compartment|spondylolysis|meniscoid|madelung|synostosis/.test(
      t
    )
  )
    score += 3;
  if (BLOCK_WORDS.test(t)) score -= 20;
  if (BLOCK_EXT.test(t)) score -= 30;
  return score;
}

function inferModality(file) {
  const s = file.toLowerCase();
  if (/mri|mrt|t1|t2|pdw|stir/.test(s)) return 'MRI';
  if (/ct |ct-/.test(s)) return 'CT';
  if (/sono|ultrasound|us /.test(s)) return '超声';
  if (/dxa|dexa/.test(s)) return 'DXA';
  return 'X线';
}

function makeItem(disease, file) {
  const mod = inferModality(file);
  return {
    file,
    caption: `${mod} · ${disease.title}典型影像`,
    site: `${disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: /annotation|annotated|标注/i.test(file)
  };
}

const batch2 = loadBatch2();
const { map: registryMap } = loadRegistry();
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
siteData.diseaseGalleries = siteData.diseaseGalleries || {};

const registryFiles = Object.keys(registryMap);
const empty = batch2.filter(d => !(siteData.diseaseGalleries[d.type] || []).length);
const report = { minScore: MIN_SCORE, supplemented: [], stillEmpty: [] };

console.log(`Offline registry match: ${empty.length} empty diseases, min score ${MIN_SCORE}\n`);

for (const disease of empty) {
  const ranked = registryFiles
    .map(file => ({ file, score: scoreFile(file, disease) }))
    .filter(x => x.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
  const items = ranked.slice(0, 2).map(x => makeItem(disease, x.file));
  if (items.length) {
    siteData.diseaseGalleries[disease.type] = items;
    report.supplemented.push({
      type: disease.type,
      title: disease.title,
      n: items.length,
      scores: ranked.slice(0, 2).map(x => x.score),
      files: items.map(i => i.file)
    });
    console.log(`+ ${disease.type}: ${items.length} (score ${ranked[0].score}) — ${items[0].file.slice(0, 55)}`);
  } else {
    report.stillEmpty.push({ type: disease.type, title: disease.title });
  }
}

for (const [f, meta] of Object.entries(registryMap)) {
  siteData.imageAttribRegistry[f] = meta;
}
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log('\noffline registry done');
console.log('  supplemented:', report.supplemented.length);
console.log('  still empty:', report.stillEmpty.length);

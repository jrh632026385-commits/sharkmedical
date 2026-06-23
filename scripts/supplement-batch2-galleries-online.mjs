/**
 * 仅为第二批「尚无图库」的疾病在线补充 Wikimedia 影像（不覆盖已有精选图）
 * 运行：node scripts/supplement-batch2-galleries-online.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CURATED_GALLERIES, EXTRA_SEARCH, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import { searchCommonsFiles } from '../data/wikimedia-api.mjs';
import { MAX_GALLERY_IMAGES, pickTopRanked } from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-gallery-online-supplement.json');

const ALLOWED_LICENSE = /cc0|cc by|cc-by|public domain|no restrictions|copyrighted free use/i;
const BLOCK_EXT = /\.(svg|webm|ogv|pdf|djvu)$/i;
const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|photo of patient|portrait|histolog|microscop|anatomy chart|logo|icon/i;
const MIN_SCORE = 12;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadBatch2() {
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  const out = [];
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) out.push(d);
  }
  return out;
}

function loadRegistryRaw() {
  const raw = fs.readFileSync(registryPath, 'utf8');
  const m = raw.match(/const RAW=`([\s\S]*?)`;/);
  const map = {};
  const lines = [];
  if (m) {
    m[1]
      .trim()
      .split('\n')
      .forEach((line, idx) => {
        if (!line.trim()) return;
        lines.push(line);
        const p = line.split('|');
        if (p.length < 5) return;
        map[p[0]] = {
          author: p[1],
          license: p[2],
          licenseUrl: p[3],
          pageUrl: p[4],
          source: 'Wikimedia Commons',
          title: p[0],
          idx: idx + 1
        };
      });
  }
  return { map, lines };
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
  if (/x-ray|xray|radiograph|mri|mrt|ct |sono|ultrasound/.test(t)) score += 4;
  if (
    /fracture|fraktur|luxation|tumor|sarcoma|sarkom|lipoma|hemangioma|chondro|meniscus|spondyl|disc|ligament|arthritis|lesion|ruptur|dislocation|myeloma|exostos|osteochondroma|synovitis|ganglion|schwannoma|fibroma|chordoma|aneurysmal|osteoid|enchondroma|galeazzi|bennett|jefferson|hangman|olecranon|bankart|charcot|blount|rickets|syringomyelia|chiari/.test(
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
  if (/mri|mrt|t1|t2/.test(s)) return 'MRI';
  if (/ct |ct-/.test(s)) return 'CT';
  if (/sono|ultrasound/.test(s)) return '超声';
  return 'X线';
}

function makeItem(disease, file, score) {
  const mod = inferModality(file);
  return {
    file,
    caption: `${mod} · ${disease.title}典型影像`,
    site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: /annotation|annotated|标注/i.test(file),
    _score: score
  };
}

async function commonsSearch(query, limit = 5) {
  return searchCommonsFiles(query, limit);
}

function appendRegistryLine(lines, file, meta) {
  if (lines.some(l => l.startsWith(file + '|'))) return false;
  lines.push([file, meta.author, meta.license, meta.licenseUrl, meta.pageUrl].join('|'));
  return true;
}

function saveRegistryJs(lines) {
  const body = fs.readFileSync(registryPath, 'utf8');
  const newRaw = lines.join('\n');
  const next = body.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${newRaw}\`;`);
  fs.writeFileSync(registryPath, next, 'utf8');
}

async function supplementDisease(disease, registryMap) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.en || disease.title} radiograph`,
    `${disease.en || disease.title} MRI`
  ].slice(0, 4);
  const seen = new Set();
  const ranked = [];
  for (const q of queries) {
    try {
      const hits = await commonsSearch(q, 5);
      for (const h of hits) {
        if (seen.has(h.file) || BLOCKED_FILES.has(h.file)) continue;
        seen.add(h.file);
        if (!ALLOWED_LICENSE.test(h.license || '')) continue;
        const score = scoreFile(h.file, disease);
        if (score < MIN_SCORE) continue;
        ranked.push({ ...h, score });
      }
    } catch (e) {
      console.warn('  search fail:', q, e.message);
    }
    await sleep(350);
  }
  ranked.sort((a, b) => b.score - a.score);
  const picked = pickTopRanked(ranked, MAX_GALLERY_IMAGES, MIN_SCORE).map(h => {
    if (!registryMap[h.file]) {
      registryMap[h.file] = {
        author: h.author,
        license: h.license,
        licenseUrl: h.licenseUrl,
        pageUrl: h.pageUrl,
        source: 'Wikimedia Commons',
        title: h.file
      };
    }
    return makeItem(disease, h.file, h.score);
  });
  return picked.map(({ _score, ...rest }) => rest);
}

async function main() {
  const batch2 = loadBatch2();
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  siteData.diseaseGalleries = siteData.diseaseGalleries || {};

  const empty = batch2.filter(d => !(siteData.diseaseGalleries[d.type] || []).length);
  const report = { supplemented: [], stillEmpty: [], newRegistry: [] };

  console.log(`Supplementing ${empty.length} empty batch2 diseases (min score ${MIN_SCORE})...\n`);

  for (let i = 0; i < empty.length; i++) {
    const disease = empty[i];
    process.stdout.write(`[${i + 1}/${empty.length}] ${disease.type} ... `);
    const items = await supplementDisease(disease, registryMap);
    if (items.length) {
      siteData.diseaseGalleries[disease.type] = items;
      for (const it of items) {
        const meta = registryMap[it.file];
        if (meta && appendRegistryLine(registryLines, it.file, meta)) {
          report.newRegistry.push(it.file);
        }
      }
      report.supplemented.push({
        type: disease.type,
        title: disease.title,
        n: items.length,
        files: items.map(i => i.file)
      });
      console.log(`+ ${items.length} — ${items.map(i => i.file).join(', ')}`);
    } else {
      console.log('—');
      report.stillEmpty.push({ type: disease.type, title: disease.title });
    }
  }

  for (const [f, meta] of Object.entries(registryMap)) {
    siteData.imageAttribRegistry[f] = meta;
  }
  if (report.newRegistry.length) saveRegistryJs(registryLines);

  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\nsupplement done');
  console.log('  supplemented:', report.supplemented.length);
  console.log('  still empty:', report.stillEmpty.length);
  console.log('  new registry lines:', report.newRegistry.length);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

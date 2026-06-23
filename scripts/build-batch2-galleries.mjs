/**
 * 为第二批 164 条疾病写入影像图库 + 授权注册表
 * 默认离线：仅使用 image-attrib-registry.js 中 154 张已授权图 + 手工精选
 * 可选在线：node scripts/build-batch2-galleries.mjs --online（Wikimedia 补充检索）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CURATED_GALLERIES,
  ONLINE_VERIFIED_GALLERIES,
  EXTRA_SEARCH,
  BLOCKED_FILES
} from '../data/batch2-gallery-curated.mjs';
import { searchCommonsFiles } from '../data/wikimedia-api.mjs';
import { MAX_GALLERY_IMAGES, pickTopRanked } from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-gallery-report.json');

const ONLINE = process.argv.includes('--online');
const ALLOWED_LICENSE = /cc0|cc by|cc-by|public domain|no restrictions|copyrighted free use/i;
const BLOCK_EXT = /\.(svg|gif|webm|ogv|pdf|djvu)$/i;
const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|photo of patient|portrait|histolog|microscop|anatomy chart|logo|icon/i;

const sleep = ms => new Promise(r => setTimeout(r, ms));

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
  if (!m) return { map, files: [] };
  const files = [];
  m[1]
    .trim()
    .split('\n')
    .forEach((line, idx) => {
      if (!line.trim()) return;
      const p = line.split('|');
      if (p.length < 5) return;
      const file = p[0];
      files.push(file);
      map[file] = {
        author: p[1],
        license: p[2],
        licenseUrl: p[3],
        pageUrl: p[4],
        source: 'Wikimedia Commons',
        title: file,
        idx: idx + 1
      };
    });
  return { map, files };
}

function inferModality(file, captionHint = '') {
  const s = `${file} ${captionHint}`.toLowerCase();
  if (/mri|mrt|t1|t2|pdwi|stir/.test(s)) return 'MRI';
  if (/ct |ct-|computed tomography|volumen rendering/.test(s)) return 'CT';
  if (/sono|ultrasound|us |echographie/.test(s)) return '超声';
  if (/dxa|dexa|bone density/.test(s)) return 'DXA';
  return 'X线';
}

function inferSite(disease, file) {
  const region = disease.region || disease.title || '';
  const mod = inferModality(file, disease.en);
  return `${region} · ${mod}`.slice(0, 28);
}

function makeCaption(disease, file, modality) {
  const base = disease.title || disease.type;
  if (/annotation|annotated|标注/i.test(file)) return `【标注】${base} · ${modality}典型征象`;
  return `${modality} · ${base}典型影像`;
}

function normalizeEntry(disease, entry) {
  if (typeof entry === 'string') {
    const file = entry;
    const modality = inferModality(file, disease.en);
    return {
      file,
      caption: makeCaption(disease, file, modality),
      site: inferSite(disease, file),
      ann: [],
      modified: /annotation|annotated|标注/i.test(file)
    };
  }
  const file = entry.file;
  const modality = inferModality(file, entry.caption || disease.en);
  return {
    file,
    caption: entry.caption || makeCaption(disease, file, modality),
    site: entry.site ?? inferSite(disease, file),
    ann: entry.ann || [],
    modified: entry.modified ?? /annotation|annotated|标注/i.test(file)
  };
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
  if (/x-ray|xray|radiograph|roentgen|cr |ct |mri|mrt|sono|ultrasound/.test(t)) score += 4;
  if (
    /fracture|fraktur|luxation|tumor|tumour|sarcoma|sarkom|lipoma|hemangioma|osteoma|chondro|meniscus|menisk|spondyl|disc|ligament|tendon|arthritis|arthrose|lesion|ruptur|dislocation|myeloma|plasmozytom|exostos|osteochondroma/.test(
      t
    )
  )
    score += 3;
  if (BLOCK_WORDS.test(t)) score -= 20;
  if (BLOCK_EXT.test(t)) score -= 30;
  return score;
}

function findOfflineImages(disease, registryFiles, usedFiles) {
  const ranked = registryFiles
    .map(file => ({ file, score: scoreFile(file, disease) }))
    .filter(x => x.score >= 10 && !usedFiles.has(x.file))
    .sort((a, b) => b.score - a.score);
  return pickTopRanked(ranked, MAX_GALLERY_IMAGES, 10).map(x => normalizeEntry(disease, x.file));
}

function findVerifiedOnlineImages(disease) {
  const raw = ONLINE_VERIFIED_GALLERIES[disease.type];
  if (!raw?.length) return [];
  return raw.map(e => normalizeEntry(disease, e)).filter(it => !BLOCKED_FILES.has(it.file));
}

function findCuratedImages(disease) {
  const raw = CURATED_GALLERIES[disease.type];
  if (!raw?.length) return [];
  return raw.map(e => normalizeEntry(disease, e)).filter(it => !BLOCKED_FILES.has(it.file));
}

async function commonsSearch(query, limit = 6) {
  return searchCommonsFiles(query, limit);
}

async function findOnlineImages(disease, registryMap) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.en || disease.title} X-ray`,
    `${disease.en || disease.title} MRI`
  ].slice(0, 4);
  const seen = new Set();
  const ranked = [];
  for (const q of queries) {
    try {
      const hits = await commonsSearch(q, 6);
      for (const h of hits) {
        if (seen.has(h.file) || BLOCKED_FILES.has(h.file)) continue;
        seen.add(h.file);
        if (!ALLOWED_LICENSE.test(h.license || '')) continue;
        const score = scoreFile(h.file, disease);
        if (score < 8) continue;
        ranked.push({ ...h, score });
      }
    } catch (e) {
      console.warn('  search fail:', q, e.message);
    }
    await sleep(350);
  }
  ranked.sort((a, b) => b.score - a.score);
  return pickTopRanked(ranked, MAX_GALLERY_IMAGES, 8).map(h => {
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
    return normalizeEntry(disease, h.file);
  });
}

function validateGallery(type, title, items, registryMap) {
  const issues = [];
  const disease = { type, title, en: title };
  for (const it of items) {
    if (!registryMap[it.file]) issues.push(`缺少授权: ${it.file}`);
    if (BLOCKED_FILES.has(it.file)) issues.push(`禁用文件: ${it.file}`);
    if (BLOCK_WORDS.test(it.file)) issues.push(`疑似示意图: ${it.file}`);
    if (BLOCK_EXT.test(it.file) && !/\.gif$/i.test(it.file)) issues.push(`禁用格式: ${it.file}`);
    // 精选 / 已确认在线图库已人工审核，不做自动评分否决
    if (!CURATED_GALLERIES[type]?.length && !ONLINE_VERIFIED_GALLERIES[type]?.length) {
      const score = scoreFile(it.file, disease);
      if (score < 8) issues.push(`匹配度偏低(${score}): ${it.file}`);
    }
  }
  return issues;
}

async function main() {
  const diseases = loadBatch2();
  const { map: registryMap, files: registryFiles } = loadRegistry();
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  siteData.diseaseGalleries = siteData.diseaseGalleries || {};

  const report = {
    mode: ONLINE ? 'online+offline' : 'offline',
    ok: [],
    weak: [],
    empty: [],
    validationErrors: [],
    totalImages: 0,
    registryCount: Object.keys(registryMap).length
  };

  const usedFiles = new Set();

  for (const disease of diseases) {
    let items = findCuratedImages(disease);

    if (!items.length) {
      items = findVerifiedOnlineImages(disease);
    }

    if (!items.length && ONLINE) {
      items = await findOnlineImages(disease, registryMap);
    }

    // 去重同一疾病内文件
    const seen = new Set();
    items = items.filter(it => {
      if (seen.has(it.file)) return false;
      seen.add(it.file);
      return true;
    });

    siteData.diseaseGalleries[disease.type] = items;
    items.forEach(it => usedFiles.add(it.file));

    const valIssues = validateGallery(disease.type, disease.title, items, registryMap);
    if (valIssues.length) {
      report.validationErrors.push({ type: disease.type, title: disease.title, issues: valIssues });
    }

    if (items.length >= 2) report.ok.push({ type: disease.type, title: disease.title, n: items.length, files: items.map(i => i.file) });
    else if (items.length === 1) report.weak.push({ type: disease.type, title: disease.title, files: items.map(i => i.file) });
    else report.empty.push({ type: disease.type, title: disease.title });

    report.totalImages += items.length;
    console.log(`${disease.type}: ${items.length} image(s)${items.length ? ' — ' + items[0].file.slice(0, 48) : ''}`);
  }

  siteData.imageAttribRegistry = { ...registryMap, ...(siteData.imageAttribRegistry || {}) };
  // 确保注册表以 registry.js 为准（154 条基线）
  for (const [f, meta] of Object.entries(registryMap)) {
    siteData.imageAttribRegistry[f] = meta;
  }

  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\nbuild-batch2-galleries done');
  console.log('  mode:', report.mode);
  console.log('  ok (>=2):', report.ok.length);
  console.log('  weak (1):', report.weak.length);
  console.log('  empty:', report.empty.length);
  console.log('  total images:', report.totalImages);
  console.log('  validation errors:', report.validationErrors.length);
  console.log('  report:', reportPath);

  if (report.validationErrors.length) {
    console.log('\nValidation issues (first 10):');
    report.validationErrors.slice(0, 10).forEach(e => {
      console.log(`  ${e.type}: ${e.issues.join('; ')}`);
    });
    process.exitCode = 1;
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

/**
 * 全站疾病影像图库审计与清理：剔除非影像学、错配、低分匹配图
 * 运行：node scripts/prune-all-galleries.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CURATED_GALLERIES,
  ONLINE_VERIFIED_GALLERIES,
  BLOCKED_FILES,
  EXTRA_SEARCH
} from '../data/batch2-gallery-curated.mjs';
import {
  isRadiologyImage,
  scorePathologyMatch,
  itemGalleryText,
  inferModality,
  OPENI_BLOCK,
  RAD_FILENAME,
  IMAGING_WORDS
} from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const reportPath = path.join(root, 'data', 'gallery-prune-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_PER_DISEASE = Number(process.env.MAX_GALLERY_IMAGES || 20);
const MIN_SCORE_OPENI = Number(process.env.MIN_SCORE_OPENI || 22);
const MIN_FILENAME_OPENI = 8;

const BLOCK_EXT = /\.(svg|gif|webm|ogv|pdf|djvu)$/i;

const NON_IMAGING_EXTRA =
  /clinical photograph|clinical photo|clinical appearance|photograph of the|photograph shows|photo of the patient|patient photograph|intraoperative|gross specimen|microphotograph|h&e|he stain|immunohist|histolog|microscop|pathology slide|wide resection|surgical intervention|external appearance|hands and arm|boutonniere|first visit photograph|evaluation of the extent of the pathological|photo of the patient.?s dorsal|finger injuries|candida septic|living anatomy|treatise on orthopedic|diagram of the bony|bone density scanner|feature osteoprosis/i;

const ANATOMY_RULES = [
  { file: /shoulder|rotator cuff|supraspinat|glenohumer|acromioclav/i, regionMust: /肩|shoulder|rotator|glenohumer|acromioclav/i, label: '肩部影像≠其他部位' },
  { file: /scaphoid|scapho/i, regionMust: /腕|舟骨|scaphoid|wrist|hand|手/i, label: '舟骨/腕部≠其他部位' },
  { file: /cervical spine|c-spine|c spine|longus colli|odontoid/i, regionMust: /颈|颈椎|cervical|spine|脊柱|脊髓/i, label: '颈椎≠其他部位' },
  { file: /lumbar|l-spine|l4|l5|sciatica/i, regionMust: /腰|脊柱|lumbar|spine|disc|间盘/i, label: '腰椎≠其他部位' },
  { file: /pleura|pulmonary|lung|chest radiograph|pneumonia|lobar/i, regionMust: /胸|肺|呼吸|pleura|lung|chest|纵隔/i, label: '胸部≠其他系统' },
  { file: /schwannoma|vestibular|acoustic neuroma/i, regionMust: /神经|听|vestibular|schwann|头颈|ear|brain|颅/i, label: '听神经瘤≠其他部位' },
  { file: /forearm|elbow joint|humerus(?!.*knee)/i, regionMust: /肘|前臂|forearm|elbow|humer|桡|尺/i, label: '前臂/肘≠其他部位' },
  { file: /sacroiliac|si joint/i, regionMust: /骶髂|pelvis|骨盆|spine|脊柱|ankle|踝/i, label: '骶髂/骨盆≠不匹配部位' },
  { file: /metatarsophalangeal|metatarsal/i, regionMust: /足|趾|foot|metatars|踝|ankle/i, label: '跖趾/足≠其他部位' },
  { file: /thumb|metacarpophalangeal|mcp joint/i, regionMust: /手|thumb|指|hand|wrist|腕/i, label: '手/拇指≠其他部位' },
  { file: /achilles|calcane|跟腱/i, regionMust: /跟|踝|achilles|calcane|foot|足/i, label: '跟腱/跟骨≠其他部位' },
  { file: /meniscus|menisk/i, regionMust: /膝|knee|menisc|半月/i, label: '半月板≠非膝关节' },
  { file: /dislocation|luxation|脱位/i, regionMust: /脱位|disloc|luxation|肩|肘|髋|膝|踝|bankart|galeazzi|monteggia/i, label: '脱位图可能错配' },
  { file: /myeloma|plasmozytom/i, diseaseMust: /myeloma|浆细胞|plasmacytoma|plasmozytom/i, label: '骨髓瘤图错配' },
  { file: /hemangioma|haemangiom/i, diseaseMust: /hemang|血管瘤|maffucci/i, label: '血管瘤图错配' },
  { file: /exostos|osteochondroma/i, diseaseMust: /exostos|osteochondroma|外生|hme|maffucci|multiple hereditary/i, label: '外生骨疣图错配' },
  { file: /therapeutics|1916|radium therapy|living anatomy/i, diseaseMust: /.^/, label: '历史教材/非诊断影像' }
];

function loadRegistry() {
  const raw = fs.readFileSync(registryPath, 'utf8');
  const m = raw.match(/const RAW=`([\s\S]*?)`;/);
  const map = {};
  if (!m) return map;
  m[1]
    .trim()
    .split('\n')
    .forEach(line => {
      if (!line.trim()) return;
      const p = line.split('|');
      if (p.length < 5) return;
      map[p[0]] = {
        author: p[1],
        license: p[2],
        licenseUrl: p[3],
        pageUrl: p[4],
        source: p[0].startsWith('openi__') ? 'Open-i / PubMed Central' : 'Wikimedia Commons',
        title: p[0]
      };
    });
  return map;
}

function diseaseText(d) {
  return `${d.type} ${d.title || ''} ${d.sub || ''} ${d.region || ''} ${d.en || ''}`.toLowerCase();
}

function checkAnatomy(disease, text) {
  const dt = diseaseText(disease);
  const issues = [];
  for (const rule of ANATOMY_RULES) {
    if (rule.file.test(text)) {
      const ok = rule.regionMust ? rule.regionMust.test(dt) : rule.diseaseMust?.test(dt);
      if (!ok) issues.push(rule.label);
    }
  }
  return issues;
}

function scoreFilename(file, disease) {
  if (!file || BLOCKED_FILES.has(file)) return -100;
  if (OPENI_BLOCK.test(file) || BLOCK_EXT.test(file)) return -100;
  const t = String(file).toLowerCase();
  const tokens = [
    disease.type,
    disease.sub,
    disease.region,
    ...(disease.en || '').split(/[\s/(),-]+/),
    ...(disease.title || '').split(/[\s/(),·-]+/),
    ...(disease.signs || [])
  ]
    .map(s => String(s || '').trim().toLowerCase())
    .filter(s => s.length >= 3);
  let score = 0;
  for (const tok of tokens) {
    if (t.includes(tok)) score += tok.length >= 8 ? 12 : 8;
  }
  for (const q of EXTRA_SEARCH[disease.type] || []) {
    for (const w of q.toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && t.includes(w)) score += 10;
    }
  }
  if (/x-ray|xray|radiograph|roentgen|ct |mri|mrt|sono|ultrasound|tomograph/.test(t)) score += 4;
  if (/fracture|luxation|tumor|sarcoma|meniscus|ligament|tendon|arthritis|myeloma|hemangioma|osteochondroma|dislocation|spondyl|disc|ruptur/.test(t))
    score += 3;
  if (NON_IMAGING_EXTRA.test(t)) score -= 30;
  return score;
}

function inferSite(disease, file) {
  const mod = inferModality(`${file} ${disease.en || ''}`);
  return `${disease.region || disease.title || ''} · ${mod}`.slice(0, 28);
}

function makeCaption(disease, file, hint) {
  const mod = inferModality(`${file} ${hint || ''}`);
  const base = disease.title || disease.type;
  if (/annotation|annotated|标注/i.test(file)) return `【标注】${base} · ${mod}典型征象`;
  if (hint && hint.length > 8 && !hint.startsWith('openi__')) return hint;
  return `${mod} · ${base}典型影像`;
}

function normalizeCuratedEntry(disease, entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      caption: makeCaption(disease, entry),
      site: inferSite(disease, entry),
      ann: [],
      modified: /annotation|annotated|标注/i.test(entry)
    };
  }
  const file = entry.file;
  return {
    file,
    caption: entry.caption || makeCaption(disease, file, entry.caption),
    site: entry.site ?? inferSite(disease, file),
    ann: entry.ann || [],
    modified: entry.modified ?? /annotation|annotated|标注/i.test(file)
  };
}

function isCuratedFile(type, file) {
  const list = CURATED_GALLERIES[type];
  if (!list?.length) return false;
  return list.some(entry => (typeof entry === 'string' ? entry : entry.file) === file);
}

function isVerifiedFile(type, file) {
  const list = ONLINE_VERIFIED_GALLERIES[type];
  if (!list?.length) return false;
  return list.some(entry => (typeof entry === 'string' ? entry : entry.file) === file);
}

function passesHardFilters(item, disease) {
  const file = item.file;
  const text = itemGalleryText(item);
  if (!file) return { ok: false, reason: 'missing-file' };
  if (BLOCKED_FILES.has(file)) return { ok: false, reason: 'blocked' };
  if (OPENI_BLOCK.test(file) || BLOCK_EXT.test(file)) return { ok: false, reason: 'blocked-ext' };
  if (NON_IMAGING_EXTRA.test(text)) return { ok: false, reason: 'non-imaging-text' };
  if (!isRadiologyImage(item)) return { ok: false, reason: 'non-radiology' };
  const anatomy = checkAnatomy(disease, text);
  if (anatomy.length) return { ok: false, reason: anatomy.join(';') };
  return { ok: true, text };
}

function shouldKeep(item, disease) {
  const hard = passesHardFilters(item, disease);
  if (!hard.ok) return { keep: false, reason: hard.reason };

  const file = item.file;
  const text = hard.text;
  const pathScore = scorePathologyMatch(text, disease, EXTRA_SEARCH[disease.type] || []);
  const nameScore = scoreFilename(file, disease);
  const isOpenI = file.startsWith('openi__');
  const score = pathScore + nameScore * 0.4;

  if (isCuratedFile(disease.type, file)) {
    return { keep: true, score: Math.max(score, 80), pathScore, nameScore, reason: 'curated' };
  }

  // 本地/Wikimedia 影像：已通过非影像与解剖冲突检查即保留
  if (!isOpenI) {
    if (pathScore <= -100) return { keep: false, reason: 'blocked-content' };
    return { keep: true, score: Math.max(score, 24), pathScore, nameScore, reason: 'local-radiology' };
  }

  // Open-i 自动补充：语义分 + 文件名分双门槛
  if (pathScore < MIN_SCORE_OPENI) return { keep: false, reason: `low-path-${pathScore}` };
  if (nameScore < MIN_FILENAME_OPENI && pathScore < 28) {
    return { keep: false, reason: `low-name-${nameScore}` };
  }

  return { keep: true, score, pathScore, nameScore };
}

function attachAttrib(item, registry) {
  const meta = registry[item.file];
  if (meta) item.attrib = { ...meta };
  if (item.url) return item;
  if (meta?.pageUrl && !item.file.startsWith('openi__')) {
    item.url = meta.pageUrl;
  }
  return item;
}

function buildCuratedGallery(disease, registry) {
  const raw = CURATED_GALLERIES[disease.type];
  if (!raw?.length) return null;
  const items = [];
  for (const entry of raw) {
    const item = attachAttrib(normalizeCuratedEntry(disease, entry), registry);
    const verdict = shouldKeep(item, disease);
    if (verdict.keep) items.push({ ...item, _score: verdict.score });
  }
  return items.sort((a, b) => b._score - a._score).slice(0, MAX_PER_DISEASE);
}

function pruneExisting(items, disease, registry) {
  const scored = [];
  for (const it of items) {
    const item = attachAttrib({ ...it }, registry);
    const verdict = shouldKeep(item, disease);
    if (!verdict.keep) continue;
    let boost = item.file.startsWith('openi__') ? 0 : 45;
    if (isCuratedFile(disease.type, item.file)) boost += 80;
    if (isVerifiedFile(disease.type, item.file) && !item.file.startsWith('openi__')) boost += 35;
    scored.push({ ...item, _score: verdict.score + boost });
  }
  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, MAX_PER_DISEASE);
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const registry = loadRegistry();
const byType = Object.fromEntries((siteData.diseases || []).map(d => [d.type, d]));
const g = { ...(siteData.diseaseGalleries || {}) };

const report = {
  mode: DRY_RUN ? 'dry-run' : 'apply',
  at: new Date().toISOString(),
  before: { diseases: 0, images: 0 },
  after: { diseases: 0, images: 0 },
  removed: [],
  resetCurated: [],
  emptied: []
};

for (const items of Object.values(g)) report.before.images += items.length;
report.before.diseases = Object.keys(g).length;

const nextG = {};

for (const d of siteData.diseases || []) {
  const type = d.type;
  const existing = g[type] || [];
  if (!existing.length && !CURATED_GALLERIES[type]?.length) continue;

  let kept;
  if (CURATED_GALLERIES[type]?.length) {
    kept = buildCuratedGallery(d, registry) || [];
    report.resetCurated.push({ type, title: d.title, before: existing.length, after: kept.length });
  } else {
    kept = pruneExisting(existing, d, registry);
  }

  kept = kept.map(({ _score, ...rest }) => rest);
  if (kept.length) nextG[type] = kept;
  else if (existing.length) report.emptied.push({ type, title: d.title, removed: existing.length });

  for (const it of existing) {
    const still = kept.some(k => k.file === it.file);
    if (!still) {
      const verdict = shouldKeep(attachAttrib({ ...it }, registry), d);
      report.removed.push({
        type,
        title: d.title,
        file: it.file,
        reason: verdict.reason || 'not-selected',
        caption: String(it.caption || '').slice(0, 80)
      });
    }
  }
}

report.after.diseases = Object.keys(nextG).length;
report.after.images = Object.values(nextG).reduce((n, arr) => n + arr.length, 0);

if (!DRY_RUN) {
  siteData.diseaseGalleries = nextG;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
}

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log('=== 全站影像图库清理 ===');
console.log('模式:', DRY_RUN ? 'dry-run' : 'apply');
console.log('清理前:', report.before.diseases, '种疾病,', report.before.images, '张');
console.log('清理后:', report.after.diseases, '种疾病,', report.after.images, '张');
console.log('移除:', report.removed.length, '张');
console.log('精选重置:', report.resetCurated.length, '种');
console.log('清空:', report.emptied.length, '种');
console.log('报告:', reportPath);

if (report.removed.length) {
  console.log('\n--- 移除样例 ---');
  report.removed.slice(0, 20).forEach(r => {
    console.log(`  [${r.type}] ${r.reason} | ${r.file?.slice(0, 55)}`);
  });
}

/**
 * 从 gallery-prune-report 恢复因每病张数上限被裁掉的合格影像，并重排至 MAX 张/病
 * node scripts/restore-capped-galleries.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CURATED_GALLERIES, BLOCKED_FILES, EXTRA_SEARCH } from '../data/batch2-gallery-curated.mjs';
import {
  isRadiologyImage,
  scorePathologyMatch,
  itemGalleryText,
  inferModality,
  OPENI_BLOCK
} from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const pruneReportPath = path.join(root, 'data', 'gallery-prune-report.json');
const outReportPath = path.join(root, 'data', 'gallery-restore-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_PER_DISEASE = Number(process.env.MAX_GALLERY_IMAGES || 20);
const CAP_REASONS = new Set(['not-selected', 'local-radiology']);

const BLOCK_EXT = /\.(svg|gif|webm|ogv|pdf|djvu)$/i;
const NON_IMAGING_EXTRA =
  /clinical photograph|clinical photo|clinical appearance|photograph of the|photograph shows|photo of the patient|patient photograph|intraoperative|gross specimen|microphotograph|h&e|he stain|immunohist|histolog|microscop|pathology slide|wide resection|surgical intervention|external appearance|hands and arm|boutonniere|first visit photograph|evaluation of the extent of the pathological|photo of the patient.?s dorsal|finger injuries|candida septic|living anatomy|treatise on orthopedic|diagram of the bony|bone density scanner|feature osteoprosis/i;

const ANATOMY_RULES = [
  { file: /shoulder|rotator cuff|supraspinat|glenohumer|acromioclav/i, regionMust: /肩|shoulder|rotator|glenohumer|acromioclav/i },
  { file: /scaphoid|scapho/i, regionMust: /腕|舟骨|scaphoid|wrist|hand|手/i },
  { file: /cervical spine|c-spine|c spine|longus colli|odontoid/i, regionMust: /颈|颈椎|cervical|spine|脊柱|脊髓/i },
  { file: /lumbar|l-spine|l4|l5|sciatica/i, regionMust: /腰|脊柱|lumbar|spine|disc|间盘/i },
  { file: /pleura|pulmonary|lung|chest radiograph|pneumonia|lobar/i, regionMust: /胸|肺|呼吸|pleura|lung|chest|纵隔/i },
  { file: /schwannoma|vestibular|acoustic neuroma/i, regionMust: /神经|听|vestibular|schwann|头颈|ear|brain|颅/i },
  { file: /forearm|elbow joint|humerus(?!.*knee)/i, regionMust: /肘|前臂|forearm|elbow|humer|桡|尺/i },
  { file: /sacroiliac|si joint/i, regionMust: /骶髂|pelvis|骨盆|spine|脊柱|ankle|踝/i },
  { file: /metatarsophalangeal|metatarsal/i, regionMust: /足|趾|foot|metatars|踝|ankle/i },
  { file: /thumb|metacarpophalangeal|mcp joint/i, regionMust: /手|thumb|指|hand|wrist|腕/i },
  { file: /achilles|calcane|跟腱/i, regionMust: /跟|踝|achilles|calcane|foot|足/i },
  { file: /meniscus|menisk/i, regionMust: /膝|knee|menisc|半月/i },
  { file: /dislocation|luxation|脱位/i, regionMust: /脱位|disloc|luxation|肩|肘|髋|膝|踝|bankart|galeazzi|monteggia/i },
  { file: /myeloma|plasmozytom/i, diseaseMust: /myeloma|浆细胞|plasmacytoma|plasmozytom/i },
  { file: /hemangioma|haemangiom/i, diseaseMust: /hemang|血管瘤|maffucci/i },
  { file: /exostos|osteochondroma/i, diseaseMust: /exostos|osteochondroma|外生|hme|maffucci|multiple hereditary/i },
  { file: /therapeutics|1916|radium therapy|living anatomy/i, diseaseMust: /.^/ }
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
  for (const rule of ANATOMY_RULES) {
    if (rule.file.test(text)) {
      const ok = rule.regionMust ? rule.regionMust.test(dt) : rule.diseaseMust?.test(dt);
      if (!ok) return false;
    }
  }
  return true;
}

function scoreFilename(file, disease) {
  if (!file || BLOCKED_FILES.has(file)) return -100;
  if (OPENI_BLOCK.test(file) || BLOCK_EXT.test(file)) return -100;
  const t = String(file).toLowerCase();
  const tokens = [disease.type, disease.sub, disease.region, ...(disease.signs || []), disease.title, disease.en]
    .filter(Boolean)
    .join(' ')
    .split(/[\s/(),·\-、，]+/)
    .map(s => s.trim().toLowerCase())
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
  return score;
}

function attachAttrib(item, registry, siteRegistry) {
  const meta = registry[item.file] || siteRegistry[item.file];
  if (meta) item.attrib = { ...meta };
  if (!item.url && meta?.pageUrl && !item.file.startsWith('openi__')) item.url = meta.pageUrl;
  return item;
}

function shouldKeep(item, disease) {
  const text = itemGalleryText(item);
  if (!item.file || BLOCKED_FILES.has(item.file)) return null;
  if (OPENI_BLOCK.test(item.file) || BLOCK_EXT.test(item.file)) return null;
  if (NON_IMAGING_EXTRA.test(text) || !isRadiologyImage(item)) return null;
  if (!checkAnatomy(disease, text)) return null;

  const pathScore = scorePathologyMatch(text, disease, EXTRA_SEARCH[disease.type] || []);
  const nameScore = scoreFilename(item.file, disease);
  const isOpenI = item.file.startsWith('openi__');
  let score = pathScore + nameScore * 0.4;

  if (!isOpenI) {
    if (pathScore <= -100) return null;
    score = Math.max(score, 24);
    score += 45;
  } else {
    if (pathScore < 22) return null;
    if (nameScore < 8 && pathScore < 28) return null;
  }

  const curated = CURATED_GALLERIES[disease.type];
  if (curated?.some(e => (typeof e === 'string' ? e : e.file) === item.file)) score += 80;

  return score;
}

function buildItem(removed, disease, registry, siteRegistry) {
  const mod = inferModality(`${removed.file} ${removed.caption || ''}`);
  const item = {
    file: removed.file,
    caption: removed.caption || `${mod} · ${disease.title || disease.type}典型影像`,
    site: '',
    ann: [],
    modified: /annotation|annotated|标注/i.test(removed.file)
  };
  return attachAttrib(item, registry, siteRegistry);
}

function trimToMax(items, disease, registry, siteRegistry) {
  const scored = [];
  for (const it of items) {
    const item = attachAttrib({ ...it }, registry, siteRegistry);
    const score = shouldKeep(item, disease);
    if (score == null) continue;
    scored.push({ ...item, _score: score });
  }
  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, MAX_PER_DISEASE).map(({ _score, ...rest }) => rest);
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const pruneReport = JSON.parse(fs.readFileSync(pruneReportPath, 'utf8'));
const registry = loadRegistry();
const siteRegistry = siteData.imageAttribRegistry || {};
const byType = Object.fromEntries((siteData.diseases || []).map(d => [d.type, d]));
const g = { ...(siteData.diseaseGalleries || {}) };

const capped = (pruneReport.removed || []).filter(r => CAP_REASONS.has(r.reason));
const restoreReport = {
  mode: DRY_RUN ? 'dry-run' : 'apply',
  at: new Date().toISOString(),
  maxPerDisease: MAX_PER_DISEASE,
  before: { diseases: Object.keys(g).length, images: Object.values(g).reduce((n, a) => n + a.length, 0) },
  restoreCandidates: capped.length,
  restored: 0,
  skippedDuplicate: 0,
  skippedNoDisease: 0,
  after: {}
};

for (const row of capped) {
  const disease = byType[row.type];
  if (!disease) {
    restoreReport.skippedNoDisease++;
    continue;
  }
  const list = g[row.type] ? [...g[row.type]] : [];
  if (list.some(i => i.file === row.file)) {
    restoreReport.skippedDuplicate++;
    continue;
  }
  list.push(buildItem(row, disease, registry, siteRegistry));
  g[row.type] = list;
  restoreReport.restored++;
}

for (const [type, items] of Object.entries(g)) {
  const disease = byType[type];
  if (!disease || !items?.length) continue;
  g[type] = trimToMax(items, disease, registry, siteRegistry);
}

siteData.diseaseGalleries = g;
restoreReport.after = {
  diseases: Object.keys(g).filter(k => g[k]?.length).length,
  images: Object.values(g).reduce((n, a) => n + a.length, 0)
};

if (!DRY_RUN) {
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
}
fs.writeFileSync(outReportPath, JSON.stringify(restoreReport, null, 2), 'utf8');

console.log('=== 恢复超量裁剪影像 ===');
console.log('模式:', DRY_RUN ? 'dry-run' : 'apply');
console.log('每病上限:', MAX_PER_DISEASE);
console.log('清理前:', restoreReport.before.diseases, '种 /', restoreReport.before.images, '张');
console.log('候选恢复:', restoreReport.restoreCandidates, '| 实际并入:', restoreReport.restored);
console.log('清理后:', restoreReport.after.diseases, '种 /', restoreReport.after.images, '张');
console.log('报告:', outReportPath);

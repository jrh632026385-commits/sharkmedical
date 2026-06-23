/**
 * 审计第二批影像图库：疾病-图片语义匹配度
 * node scripts/audit-batch2-gallery-match.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CURATED_GALLERIES,
  EXTRA_SEARCH,
  BLOCKED_FILES
} from '../data/batch2-gallery-curated.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const listPath = path.join(root, '_imaging-primary-list.json');

const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|photo of patient|portrait|histolog|microscop|anatomy chart|logo|icon|synpic|synthetic|phantom|simulat/i;
const BLOCK_EXT = /\.(svg|gif|webm|ogv|pdf|djvu)$/i;

// 文件名含下列词但疾病不含对应概念 → 疑似错配
const CONFLICT_RULES = [
  { file: /scaphoid/i, diseaseMust: /scaphoid|舟状骨|舟骨/i, label: '舟骨骨折 ≠ 舟月韧带' },
  { file: /myeloma|plasmozytom/i, diseaseMust: /myeloma|浆细胞|plasmacytoma|plasmozytom/i, label: '骨髓瘤图 ≠ 骨淋巴瘤' },
  { file: /hemangioma|haemangiom/i, diseaseMust: /hemang|血管瘤|maffucci/i, label: '血管瘤图可能错配' },
  { file: /exostos|osteochondroma/i, diseaseMust: /exostos|osteochondroma|外生|hme|maffucci|multiple hereditary/i, label: '外生骨疣图可能错配' },
  { file: /dislocation|luxation|脱位/i, diseaseMust: /disloc|luxation|脱位|galeazzi|monteggia|bankart/i, label: '脱位图可能错配' },
  { file: /meniscus|menisk/i, diseaseMust: /menisc|半月板/i, label: '半月板图可能错配' },
  { file: /achilles|跟腱/i, diseaseMust: /achilles|跟腱/i, label: '跟腱图可能错配' },
  { file: /gastrocnemius|腓肠肌/i, diseaseMust: /calf|gastrocnem|腓肠/i, label: '腓肠肌图可能错配' },
  { file: /hamstring|腘绳/i, diseaseMust: /hamstring|腘绳/i, label: '腘绳肌图可能错配' },
  { file: /therapeutics|1916|radium therapy/i, diseaseMust: /.^/, label: '历史教材图非临床影像' }
];

function loadBatch2() {
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  const out = [];
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) out.push(d);
  }
  return out;
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
  const hits = [];
  for (const tok of tokens) {
    if (tok.length >= 4 && t.includes(tok)) {
      const pts = tok.length >= 8 ? 12 : 8;
      score += pts;
      hits.push(tok);
    }
  }
  for (const q of EXTRA_SEARCH[disease.type] || []) {
    for (const w of q.toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && t.includes(w)) {
        score += 10;
        hits.push(`q:${w}`);
      }
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
  return { score, hits };
}

function diseaseText(d) {
  return `${d.type} ${d.title || ''} ${d.en || ''}`.toLowerCase();
}

function checkConflicts(disease, file) {
  const dt = diseaseText(disease);
  const issues = [];
  for (const rule of CONFLICT_RULES) {
    if (rule.file.test(file) && !rule.diseaseMust.test(dt)) {
      issues.push(rule.label);
    }
  }
  return issues;
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const batch2 = loadBatch2();
const galleries = siteData.diseaseGalleries || {};

const lowScore = []; // score < 12
const mediumScore = []; // 12-15
const conflicts = [];
const crossUse = new Map();
const curatedOk = [];
const nonCurated = [];

for (const d of batch2) {
  const items = galleries[d.type] || [];
  if (!items.length) continue;
  const isCurated = !!CURATED_GALLERIES[d.type]?.length;
  for (const it of items) {
    const { score, hits } = scoreFile(it.file, d);
    const row = {
      type: d.type,
      title: d.title,
      en: d.en,
      file: it.file,
      score,
      hits,
      curated: isCurated
    };
    crossUse.set(it.file, (crossUse.get(it.file) || []).concat(d.type));
    const c = checkConflicts(d, it.file);
    if (c.length) conflicts.push({ ...row, conflicts: c });

    if (isCurated) curatedOk.push(row);
    else nonCurated.push(row);

    if (score < 12) lowScore.push(row);
    else if (score < 16) mediumScore.push(row);
  }
}

const sharedFiles = [...crossUse.entries()].filter(([, types]) => types.length > 1);

console.log('=== 第二批影像匹配审计 ===\n');
console.log('有图疾病:', batch2.filter(d => (galleries[d.type] || []).length).length);
console.log('影像条目:', batch2.reduce((n, d) => n + (galleries[d.type]?.length || 0), 0));
console.log('精选来源:', new Set(curatedOk.map(r => r.type)).size, '种疾病');
console.log('非精选(在线/自动):', new Set(nonCurated.map(r => r.type)).size, '种疾病');

console.log('\n--- 疑似错配 (规则冲突) ---');
if (!conflicts.length) console.log('  (无)');
else conflicts.forEach(c => {
  console.log(`  [${c.type}] ${c.title}`);
  console.log(`    文件: ${c.file}`);
  console.log(`    问题: ${c.conflicts.join('; ')} | 评分=${c.score}`);
});

console.log('\n--- 低分匹配 (score<12，建议移除) ---');
lowScore.sort((a, b) => a.score - b.score);
if (!lowScore.length) console.log('  (无)');
else lowScore.forEach(r => {
  console.log(`  [${r.type}] ${r.title} | score=${r.score} | ${r.file}`);
});

console.log('\n--- 中等匹配 (12≤score<16，建议人工复核) ---');
mediumScore.sort((a, b) => a.score - b.score);
mediumScore.slice(0, 40).forEach(r => {
  console.log(`  [${r.type}] ${r.title} | score=${r.score} | hits=${r.hits.join(',')||'-'} | ${r.file.slice(0, 60)}`);
});
if (mediumScore.length > 40) console.log(`  ... 另有 ${mediumScore.length - 40} 条`);

console.log('\n--- 同图复用于多种疾病 ---');
sharedFiles.sort((a, b) => b[1].length - a[1].length);
sharedFiles.slice(0, 25).forEach(([file, types]) => {
  console.log(`  ${file.slice(0, 55)} → ${types.join(', ')}`);
});

console.log('\n--- 精选图库逐条 (人工核对清单) ---');
const byType = {};
for (const r of curatedOk) {
  (byType[r.type] = byType[r.type] || { title: r.title, rows: [] }).rows.push(r);
}
for (const [type, { title, rows }] of Object.entries(byType).sort()) {
  const flags = rows.some(r => r.score < 12 || checkConflicts({ type, title, en: rows[0]?.en }, r.file).length);
  console.log(`\n${flags ? '⚠' : '✓'} ${title} (${type})`);
  rows.forEach(r => {
    const c = checkConflicts({ type, title, en: r.en }, r.file);
    console.log(`    score=${r.score} ${c.length ? '⚠' + c.join(',') : ''} | ${r.file}`);
  });
}

const badCount = conflicts.length + lowScore.length;
console.log('\n=== 汇总 ===');
console.log('规则冲突:', conflicts.length);
console.log('低分(<12):', lowScore.length);
console.log('中等(12-15):', mediumScore.length);
console.log('同图复用:', sharedFiles.length, '个文件');
process.exitCode = badCount ? 1 : 0;

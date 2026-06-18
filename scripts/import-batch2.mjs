/**
 * 将 164 条「影像可主诊」缺漏病种写入 site-data.json（第二批录入）。
 * 原有 50 条标记为第一批；暂不添加影像图库。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const pipePath = path.join(root, '_rebuilt-disease-pipe.txt');
const primaryPath = path.join(root, '_imaging-primary-types.json');

const SYS_LABEL = {
  bonetumor: '骨肿瘤',
  fx: '骨折与创伤',
  arthritis: '关节炎与关节病',
  softtumor: '软组织肿瘤',
  muscle: '肌肉与肌腱病变',
  joint: '关节病变'
};

function parsePipeLine(line) {
  const p = line.split('|');
  if (p.length < 12) return null;
  return {
    sys: p[0],
    type: p[1],
    region: p[2],
    mod: p[3],
    cat: p[4],
    subcat: p[5],
    zone: p[6],
    title: p[7],
    sub: p[8],
    sev: p[9],
    sevtext: p[10],
    desc: p[11],
    signs: p.slice(12).filter(Boolean)
  };
}

function loadPrimaryTypes() {
  const raw = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));
  const types = new Set();
  if (raw.categories) {
    for (const cat of Object.values(raw.categories)) {
      for (const d of cat.diseases || []) types.add(d.type);
    }
  } else {
    for (const arr of Object.values(raw)) {
      if (Array.isArray(arr)) arr.forEach(t => types.add(t));
    }
  }
  return types;
}

const pipeMap = new Map();
if (fs.existsSync(pipePath)) {
  for (const line of fs.readFileSync(pipePath, 'utf8').split(/\n/)) {
    const row = parsePipeLine(line.trim());
    if (row?.type) pipeMap.set(row.type, row);
  }
}

const primaryTypes = loadPrimaryTypes();
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const existingTypes = new Set((siteData.diseases || []).map(d => d.type));
const galleries = siteData.diseaseGalleries || {};
const taxByType = { ...(siteData.taxByType || {}) };
const diseaseDetails = { ...(siteData.diseaseDetails || {}) };

let added = 0;
let skipped = 0;

for (const type of primaryTypes) {
  if (existingTypes.has(type)) {
    skipped++;
    continue;
  }
  const row = pipeMap.get(type);
  if (!row) {
    console.warn('WARN: no pipe row for', type);
    continue;
  }
  const disease = {
    title: row.title,
    sub: row.sub,
    type: row.type,
    region: row.region,
    mod: row.mod,
    cat: row.cat,
    subcat: row.subcat,
    zone: row.zone,
    sev: row.sev,
    sevtext: row.sevtext,
    desc: row.desc,
    signs: row.signs,
    entryBatch: 2,
    entryBatchLabel: '第二批录入疾病',
    sysCategory: row.sys,
    sysCategoryLabel: SYS_LABEL[row.sys] || row.sys
  };
  siteData.diseases.push(disease);
  existingTypes.add(type);
  taxByType[type] = { cat: row.cat, subcat: row.subcat, zone: row.zone };
  if (!galleries[type]) galleries[type] = [];
  if (!diseaseDetails[type]) {
    diseaseDetails[type] = {
      overview: row.desc,
      epi: '',
      pathophys: '',
      clinical: [],
      staging: '',
      imagingKeys: row.signs.length ? row.signs.map(s => [s, '']) : [],
      modalities: row.mod ? [[row.mod.split(' · ')[0] || row.mod, '待补充影像说明']] : [],
      mgmt: [],
      ddx: [],
      pitfalls: [],
      pearls: ['第二批录入 · 影像可主诊 · 图库待补充']
    };
  }
  added++;
}

for (const d of siteData.diseases) {
  if (!d.entryBatch) {
    d.entryBatch = 1;
    d.entryBatchLabel = '第一批录入疾病';
  }
}

siteData.diseaseGalleries = galleries;
siteData.taxByType = taxByType;
siteData.diseaseDetails = diseaseDetails;
siteData.updatedAt = new Date().toISOString();

fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

const b1 = siteData.diseases.filter(d => d.entryBatch === 1).length;
const b2 = siteData.diseases.filter(d => d.entryBatch === 2).length;
console.log('import-batch2 done');
console.log('  added batch2:', added, '(skipped existing:', skipped + ')');
console.log('  total diseases:', siteData.diseases.length, '(batch1:', b1, 'batch2:', b2 + ')');
console.log('  gallery types:', Object.keys(galleries).length);

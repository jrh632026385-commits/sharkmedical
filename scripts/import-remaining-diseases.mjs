/**
 * 将 _rebuilt-disease-pipe.txt 中尚未入库的扩展病种写入 site-data.json（补全至 276 条）。
 * 不含图库。node scripts/import-remaining-diseases.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const pipePath = path.join(root, '_rebuilt-disease-pipe.txt');
const dryRun = process.argv.includes('--dry-run');

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

const pipeMap = new Map();
for (const line of fs.readFileSync(pipePath, 'utf8').split(/\n/)) {
  const row = parsePipeLine(line.trim());
  if (row?.type) pipeMap.set(row.type, row);
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const existingTypes = new Set((siteData.diseases || []).map(d => d.type));
const galleries = siteData.diseaseGalleries || {};
const taxByType = { ...(siteData.taxByType || {}) };
const diseaseDetails = { ...(siteData.diseaseDetails || {}) };

let added = 0;
const addedTypes = [];

for (const [type, row] of pipeMap) {
  if (existingTypes.has(type)) continue;
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
    entryBatch: 3,
    entryBatchLabel: '第三批录入疾病',
    sysCategory: row.sys,
    sysCategoryLabel: SYS_LABEL[row.sys] || row.sys
  };
  siteData.diseases.push(disease);
  existingTypes.add(type);
  taxByType[type] = { cat: row.cat, subcat: row.subcat, zone: row.zone };
  if (!galleries[type]) galleries[type] = [];
  addedTypes.push(type);
  added++;
}

for (const d of siteData.diseases) {
  if (!d.entryBatch) {
    d.entryBatch = 1;
    d.entryBatchLabel = '第一批录入疾病';
  }
}

console.log('import-remaining-diseases', dryRun ? '(dry-run)' : 'done');
console.log('  to add:', added, addedTypes.join(', '));
console.log('  total would be:', siteData.diseases.length);

if (!dryRun && added) {
  siteData.diseaseGalleries = galleries;
  siteData.taxByType = taxByType;
  siteData.diseaseDetails = diseaseDetails;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
}

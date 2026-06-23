/**
 * 修复缩写标注误伤与嵌套重复（如 AC→ACL、T2（T2（T2加权）…）
 * 运行：node scripts/fix-abbrev-corruption.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { fixText, fixDetail } from '../data/abbrev-fix.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data', 'site-data.json');

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  let changed = 0;
  const details = siteData.diseaseDetails || {};

  for (const [type, det] of Object.entries(details)) {
    const fixed = fixDetail(det);
    if (JSON.stringify(fixed) !== JSON.stringify(det)) {
      details[type] = fixed;
      changed++;
    }
  }

  for (const d of siteData.diseases || []) {
    for (const k of ['title', 'sub', 'region', 'mod', 'desc', 'sevtext']) {
      if (typeof d[k] === 'string') d[k] = fixText(d[k]);
    }
    if (Array.isArray(d.signs)) d.signs = d.signs.map(fixText);
  }

  siteData.diseaseDetails = details;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

  const remainDup = JSON.stringify(details).match(/([A-Z]{2,10})（\1（/g);
  const remainAcl = JSON.stringify(details).match(/AC（肩锁关节）L/g);
  console.log('fix-abbrev-corruption done');
  console.log('  types changed:', changed);
  console.log('  remaining nested abbrev (approx):', remainDup ? remainDup.length : 0);
  console.log('  remaining AC/L corruption:', remainAcl ? remainAcl.length : 0);
}

export { fixText, fixDetail } from '../data/abbrev-fix.mjs';

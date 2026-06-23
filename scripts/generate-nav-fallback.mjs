/**
 * 生成轻量导航回退 data/nav-fallback.json（供前端在 site-data 加载前/失败时展示分类）
 * node scripts/generate-nav-fallback.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'data', 'nav-fallback.json');

const SYS_KEYS = [
  'nervous', 'urogenital', 'female-repro', 'endocrine', 'head-neck', 'breast', 'hematolymph', 'systemic',
  'respiratory', 'digestive', 'circulatory'
];

const PREFIX = {
  nervous: 'NERVOUS',
  urogenital: 'UROGENITAL',
  'female-repro': 'FEMALE_REPRO',
  endocrine: 'ENDOCRINE',
  'head-neck': 'HEAD_NECK',
  breast: 'BREAST',
  hematolymph: 'HEMATOLYMPH',
  systemic: 'SYSTEMIC',
  respiratory: 'RESPIRATORY',
  digestive: 'DIGESTIVE',
  circulatory: 'CIRCULATORY'
};

async function main() {
  const site = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8'));
  const out = {
    updatedAt: new Date().toISOString(),
    SYS_GROUPS: site.SYS_GROUPS || {},
    SYS_ORDER: site.SYS_ORDER || []
  };

  for (const sys of SYS_KEYS) {
    const prefix = PREFIX[sys];
    const groupsKey = `${prefix}_NAV_GROUPS`;
    const orderKey = `${prefix}_NAV_ORDER`;
    if (site[groupsKey]) out[groupsKey] = site[groupsKey];
    if (site[orderKey]) out[orderKey] = site[orderKey];
  }

  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('generate-nav-fallback done →', outPath);
  console.log('  systems:', SYS_KEYS.length, 'bytes:', fs.statSync(outPath).size);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

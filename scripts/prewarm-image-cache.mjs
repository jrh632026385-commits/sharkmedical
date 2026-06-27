/**
 * 预下载常用缩略图到本地缓存，减轻首屏等待。
 * node scripts/prewarm-image-cache.mjs [--limit 200] [--width 360]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const limitArg = process.argv.indexOf('--limit');
const widthArg = process.argv.indexOf('--width');
const LIMIT = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : 180;
const WIDTH = widthArg >= 0 ? Number(process.argv[widthArg + 1]) : 360;
const BASE = process.env.SHARK_BASE || 'http://localhost:3000';

const galleries = JSON.parse(
  fs.readFileSync(path.join(root, 'data', 'site-galleries.json'), 'utf8')
).diseaseGalleries;

const urls = new Set();
for (const arr of Object.values(galleries || {})) {
  for (const item of arr || []) {
    const file = String(item?.file || '');
    const direct = String(item?.url || '');
    if (file.startsWith('openi__')) {
      urls.add(`${BASE}/api/openi/img?file=${encodeURIComponent(file)}`);
      continue;
    }
    if (/^(baiduimg__|europmcfig__|cnkiepmc__|uscase__|baike__|dxy__|cmacsr__|eduweb__)/i.test(file)) {
      if (direct) urls.add(`${BASE}/api/img?url=${encodeURIComponent(direct)}`);
      continue;
    }
    if (file && !file.startsWith('openi__')) {
      urls.add(`${BASE}/api/wikimedia/img?file=${encodeURIComponent(file.replace(/ /g, '_'))}&width=${WIDTH}`);
    }
  }
}

const list = [...urls].slice(0, LIMIT);
console.log(`prewarm ${list.length} images @ width=${WIDTH}`);

let ok = 0;
let fail = 0;
for (let i = 0; i < list.length; i++) {
  const url = list[i];
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await res.arrayBuffer();
    ok++;
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${list.length} ok=${ok} fail=${fail}`);
  } catch (err) {
    fail++;
    if (fail <= 8) console.warn('  fail', url, err.message);
  }
}

console.log(`done ok=${ok} fail=${fail}`);

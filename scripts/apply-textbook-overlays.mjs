/**
 * 按《骨科学》（第2版，张英泽、翁习生主编）覆盖全部 diseaseDetails
 * 运行：node scripts/apply-textbook-overlays.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { polishDetail, tidyDetail } from './chinese-polish.mjs';
import { TEXTBOOK_REF } from '../data/textbook-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const overlayDir = path.join(root, 'data', 'textbook-overlays');

function applyOverlay(base, overlay) {
  if (!overlay) return { ...base };
  const out = { ...base };
  for (const [k, v] of Object.entries(overlay)) {
    if (v == null || k === 'force') continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      out[k] = v.map(item => (Array.isArray(item) ? [...item] : item));
    } else if (typeof v === 'string' && v.trim()) {
      out[k] = v.trim();
    }
  }
  return out;
}

async function loadOverlays() {
  const merged = {};
  for (const file of [
    'orthopedics-v2.mjs',
    'orthopedics-v2-batch1-auto.mjs',
    'orthopedics-v2-batch2.mjs'
  ]) {
    const p = path.join(overlayDir, file);
    if (!fs.existsSync(p)) continue;
    const mod = await import(`${pathToFileURL(p).href}?t=${Date.now()}`);
    Object.assign(merged, mod.default || {});
  }
  return merged;
}

const overlays = await loadOverlays();
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const details = { ...(siteData.diseaseDetails || {}) };

let updated = 0;
for (const [type, patch] of Object.entries(overlays)) {
  if (!details[type]) continue;
  details[type] = tidyDetail(polishDetail(applyOverlay(details[type], patch)));
  updated++;
}

siteData.diseaseDetails = details;
siteData.textbookRef = TEXTBOOK_REF;
siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('apply-textbook-overlays done');
console.log('  updated:', updated, '/', Object.keys(overlays).length);
console.log('  textbookRef:', TEXTBOOK_REF);

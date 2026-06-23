/**
 * 加载疾病详情备用来源（detailMap / overlay / medical-fixes / batch2 合并层）
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

function applyOverlay(base, overlay) {
  if (!overlay) return { ...(base || {}) };
  const out = { ...(base || {}) };
  for (const [k, v] of Object.entries(overlay)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      out[k] = v.map(item => (Array.isArray(item) ? [...item] : item));
    } else if (typeof v === 'string' && v.trim()) {
      out[k] = v.trim();
    }
  }
  return out;
}

async function importBlock(filePath) {
  const mod = await import(pathToFileURL(filePath).href);
  return mod.default || mod.CONTENT || {};
}

export function loadDetailMapFromIndex(indexPath) {
  const html = fs.readFileSync(indexPath, 'utf8');
  const block = html.match(/const detailMap=\{([\s\S]*?)\n\};/);
  if (!block) return {};
  const out = {};
  const re = /(\w[\w-]*):\{overview:`([^`]+)`/g;
  let m;
  while ((m = re.exec(block[1]))) {
    out[m[1]] = { overview: m[2] };
  }
  return out;
}

export async function loadBatch2Merged(root) {
  const detailsDir = path.join(root, 'data', 'batch2-details');
  const enrichDir = path.join(detailsDir, 'enrichments');
  const merged = {};

  if (fs.existsSync(detailsDir)) {
    for (const file of fs.readdirSync(detailsDir)) {
      if (!/\.mjs$/.test(file) || file === 'medical-fixes.mjs') continue;
      const block = await importBlock(path.join(detailsDir, file));
      for (const [type, detail] of Object.entries(block)) {
        merged[type] = { ...detail };
      }
    }
  }

  if (fs.existsSync(enrichDir)) {
    for (const file of fs.readdirSync(enrichDir)) {
      if (!/\.mjs$/.test(file)) continue;
      const block = await importBlock(path.join(enrichDir, file));
      for (const [type, detail] of Object.entries(block)) {
        merged[type] = applyOverlay(merged[type], detail);
      }
    }
  }

  return merged;
}

export async function loadDetailSources(root) {
  const indexPath = path.join(root, 'index.html');
  const overlayPath = path.join(root, 'data', 'textbook-overlays', 'orthopedics-v2.mjs');
  const fixPath = path.join(root, 'data', 'batch2-details', 'medical-fixes.mjs');

  const detailMap = loadDetailMapFromIndex(indexPath);
  const overlayMod = fs.existsSync(overlayPath)
    ? (await import(pathToFileURL(overlayPath).href)).default || {}
    : {};
  const medicalFixes = fs.existsSync(fixPath)
    ? (await import(pathToFileURL(fixPath).href)).default || {}
    : {};
  const batch2Merged = await loadBatch2Merged(root);

  return { detailMap, overlayMod, medicalFixes, batch2Merged };
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { canPersistWrites, isVercel, kvGet, kvSet } from './kv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const KV_KEY = 'shark:site-data';

export function getDataPath() {
  return dataPath;
}

function readSiteDataFile() {
  if (!fs.existsSync(dataPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return null;
  }
}

function detailHasContent(detail) {
  if (!detail || typeof detail !== 'object') return false;
  return Object.values(detail).some(val => {
    if (Array.isArray(val)) return val.length > 0;
    return String(val ?? '').trim().length > 0;
  });
}

function mergeDiseaseDetails(fileDetails, kvDetails) {
  const out = { ...(fileDetails || {}) };
  for (const [key, detail] of Object.entries(kvDetails || {})) {
    if (detailHasContent(detail)) {
      out[key] = { ...(out[key] || {}), ...detail };
    }
  }
  return out;
}

function mergeImageAttribRegistry(fileReg, kvReg) {
  const out = { ...(fileReg || {}) };
  for (const [key, entry] of Object.entries(kvReg || {})) {
    if (!entry || typeof entry !== 'object') continue;
    const hasContent = [entry.author, entry.license, entry.licenseUrl, entry.pageUrl]
      .some(v => String(v ?? '').trim());
    if (hasContent) out[key] = { ...(out[key] || {}), ...entry };
  }
  return out;
}

function diseaseTypeKey(d) {
  return String(d?.type || d?.id || '').trim();
}

/** 仓库新增批次与 KV 线上编辑合并：按 type 去重，KV 字段覆盖同 type 的仓库条目 */
function mergeDiseases(fileList, kvList) {
  const file = Array.isArray(fileList) ? fileList : [];
  const kv = Array.isArray(kvList) ? kvList : [];
  const byType = new Map();
  for (const d of file) {
    const k = diseaseTypeKey(d);
    if (k) byType.set(k, d);
  }
  for (const d of kv) {
    const k = diseaseTypeKey(d);
    if (k) byType.set(k, { ...(byType.get(k) || {}), ...d });
  }
  const seen = new Set();
  const out = [];
  for (const d of file) {
    const k = diseaseTypeKey(d);
    if (k && byType.has(k) && !seen.has(k)) {
      out.push(byType.get(k));
      seen.add(k);
    }
  }
  for (const d of kv) {
    const k = diseaseTypeKey(d);
    if (k && !seen.has(k)) {
      out.push(byType.get(k));
      seen.add(k);
    }
  }
  return out;
}

/** KV 中非空图库优先；否则保留仓库图库（含第二批空图库占位） */
function mergeDiseaseGalleries(fileGal, kvGal) {
  const out = { ...(fileGal || {}) };
  for (const [key, gal] of Object.entries(kvGal || {})) {
    if (Array.isArray(gal) && gal.length > 0) out[key] = gal;
    else if (!(key in out)) out[key] = Array.isArray(gal) ? gal : [];
  }
  return out;
}

/** KV 中疾病/图库等可编辑字段优先；详情与授权在 KV 为空时回退到仓库 site-data.json */
function mergeSiteData(fromKv, fromFile) {
  if (!fromFile) return fromKv;
  if (!fromKv) return fromFile;
  return {
    ...fromFile,
    ...fromKv,
    diseases: mergeDiseases(fromFile.diseases, fromKv.diseases),
    diseaseGalleries: mergeDiseaseGalleries(fromFile.diseaseGalleries, fromKv.diseaseGalleries),
    diseaseDetails: mergeDiseaseDetails(fromFile.diseaseDetails, fromKv.diseaseDetails),
    imageAttribRegistry: mergeImageAttribRegistry(fromFile.imageAttribRegistry, fromKv.imageAttribRegistry)
  };
}

export async function readSiteData() {
  const fromFile = readSiteDataFile();
  const fromKv = await kvGet(KV_KEY);
  if (fromKv && fromFile) return mergeSiteData(fromKv, fromFile);
  if (fromKv) return fromKv;
  return fromFile;
}

export async function writeSiteData(data) {
  if (!canPersistWrites()) {
    const err = new Error('Vercel 上需连接 Vercel KV 才能保存内容，或在本地修改后 git push 更新 data/site-data.json');
    err.status = 503;
    throw err;
  }
  data.updatedAt = new Date().toISOString();
  const saved = await kvSet(KV_KEY, data);
  if (saved) return data;
  const tmp = dataPath + '.tmp';
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, dataPath);
  return data;
}

export async function patchSiteData(partial) {
  const current = (await readSiteData()) || { version: 1 };
  const next = { ...current, ...partial, version: current.version || 1 };
  return writeSiteData(next);
}

export function getSiteDataReadHint() {
  if (isVercel() && !canPersistWrites()) {
    return '只读模式：内容来自仓库中的 data/site-data.json';
  }
  return '';
}

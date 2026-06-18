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

export async function readSiteData() {
  const fromKv = await kvGet(KV_KEY);
  if (fromKv) return fromKv;
  return readSiteDataFile();
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

import fs from 'fs';

const cache = new Map();

export function readJsonFileCached(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const stat = fs.statSync(filePath);
  const mtime = stat.mtimeMs;
  const hit = cache.get(filePath);
  if (hit && hit.mtime === mtime) return hit.data;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  cache.set(filePath, { data, mtime });
  return data;
}

export function invalidateJsonFileCache(filePath) {
  if (filePath) cache.delete(filePath);
  else cache.clear();
}

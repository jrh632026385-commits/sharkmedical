import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', '..', 'data', 'site-data.json');

let mergedCache = { data: null, mtime: 0 };

export function getSiteDataFileMtime() {
  try {
    return fs.statSync(dataPath).mtimeMs;
  } catch {
    return 0;
  }
}

export function getCachedMergedSiteData() {
  const mtime = getSiteDataFileMtime();
  if (mergedCache.data && mergedCache.mtime === mtime) {
    return mergedCache.data;
  }
  return null;
}

export function setCachedMergedSiteData(data) {
  mergedCache = { data, mtime: getSiteDataFileMtime() };
}

export function invalidateMergedSiteDataCache() {
  mergedCache = { data: null, mtime: 0 };
}

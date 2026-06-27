import path from 'path';
import { fileURLToPath } from 'url';
import { readSiteData } from './dataStore.js';
import { readJsonFileCached } from './jsonFileCache.js';
import { toPublicSiteData } from './publicSiteData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', '..', 'data');

function stripHeavyFields(data) {
  if (!data || typeof data !== 'object') return data;
  const {
    diseaseGalleries,
    diseaseDetails,
    imageAttribRegistry,
    filmData,
    ...catalog
  } = data;
  return catalog;
}

export function readCatalogFile() {
  return readJsonFileCached(path.join(dataDir, 'site-catalog.json'));
}

export function readGalleriesFile() {
  return readJsonFileCached(path.join(dataDir, 'site-galleries.json'));
}

export async function readPublicCatalog() {
  const split = readCatalogFile();
  if (split) return toPublicSiteData(split);
  const data = await readSiteData();
  if (!data) return null;
  return toPublicSiteData(stripHeavyFields(data));
}

export async function readPublicGalleries() {
  const split = readGalleriesFile();
  if (split) return split;
  const data = await readSiteData();
  if (!data) return null;
  return {
    updatedAt: data.updatedAt,
    diseaseGalleries: data.diseaseGalleries || {},
    imageAttribRegistry: data.imageAttribRegistry || {}
  };
}

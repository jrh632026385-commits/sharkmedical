/** 撤销离线误配的 8 条 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const REVERT = [
  'galeazzi',
  'bennett',
  'boxer',
  'proxfibula',
  'shoulder-oa',
  'ankle-oa',
  'tgct',
  'meniscoid'
];

const site = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
for (const t of REVERT) site.diseaseGalleries[t] = [];
site.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(site, null, 2), 'utf8');
console.log('reverted', REVERT.length, 'diseases');

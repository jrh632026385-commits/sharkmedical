import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8'));
const report = JSON.parse(fs.readFileSync(path.join(root, 'data', 'batch2-strict-registry-supplement.json'), 'utf8'));
for (const a of report.added || []) site.diseaseGalleries[a.type] = [];
site.updatedAt = new Date().toISOString();
fs.writeFileSync(path.join(root, 'data', 'site-data.json'), JSON.stringify(site, null, 2));
console.log('reverted strict:', (report.added || []).length);

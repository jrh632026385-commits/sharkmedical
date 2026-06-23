/**
 * 同步 system-catalog.mjs → site-data.json
 * node scripts/patch-system-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYS_GROUPS, SYS_ORDER } from '../data/system-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '..', 'data', 'site-data.json');

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
siteData.SYS_GROUPS = SYS_GROUPS;
siteData.SYS_ORDER = SYS_ORDER;
siteData.updatedAt = new Date().toISOString();

fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
console.log('patch-system-catalog done');
console.log('  systems:', SYS_ORDER.length);

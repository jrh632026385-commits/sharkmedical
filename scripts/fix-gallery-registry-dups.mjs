/**
 * 修复授权注册缺失 + 跨疾病重复图
 * node scripts/fix-gallery-registry-dups.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchFileMetadata } from '../data/wikimedia-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');

const REGISTRY_FIX = [
  'Chalk stick fracture bei Morbus Bechterew 55M - CT koronar und sagittal - 001.jpg',
  'Talus Fraktur.jpg',
  'Talar Fractures.jpg'
];

const FILE_ALIASES = {
  'Radiographie d\u2019une luxation post\u00e9rieur du coude gauche sans fracture.jpg':
    "Radiographie d'une luxation post\u00e9rieur du coude gauche sans fracture.jpg"
};

const DUP_REMOVALS = [
  { file: 'Vertebral Hemangioma.jpg', removeFrom: 'skelet-hemang' },
  { file: 'Vertebral hemangioma 01.jpg', removeFrom: 'skelet-hemang' },
  { file: "Ewing's sarcoma MRI nci-vol-1832-300.jpg", removeFrom: 'ewing-extra' }
];

function loadRegistryRaw() {
  const raw = fs.readFileSync(registryPath, 'utf8');
  const m = raw.match(/const RAW=`([\s\S]*?)`;/);
  const map = {};
  const lines = [];
  if (m) {
    m[1]
      .trim()
      .split('\n')
      .forEach(line => {
        if (!line.trim()) return;
        lines.push(line);
        const p = line.split('|');
        if (p.length < 5) return;
        map[p[0]] = {
          author: p[1],
          license: p[2],
          licenseUrl: p[3],
          pageUrl: p[4],
          source: 'Wikimedia Commons',
          title: p[0]
        };
      });
  }
  return { map, lines, raw };
}

function appendRegistryLine(lines, file, meta) {
  if (lines.some(l => l.startsWith(file + '|'))) return false;
  lines.push([file, meta.author, meta.license, meta.licenseUrl, meta.pageUrl].join('|'));
  return true;
}

function saveRegistryJs(lines, raw) {
  fs.writeFileSync(
    registryPath,
    raw.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${lines.join('\n')}\`;`),
    'utf8'
  );
}

async function main() {
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const g = siteData.diseaseGalleries || {};
  siteData.imageAttribRegistry = siteData.imageAttribRegistry || {};
  const { map: registryMap, lines: registryLines, raw: registryRaw } = loadRegistryRaw();
  const report = { aliases: [], registryAdded: [], dupsRemoved: [] };

  for (const [from, to] of Object.entries(FILE_ALIASES)) {
    for (const [type, items] of Object.entries(g)) {
      for (const it of items || []) {
        if (it.file === from) {
          it.file = to;
          report.aliases.push({ type, from, to });
        }
      }
    }
  }

  for (const file of REGISTRY_FIX) {
    if (registryMap[file]) {
      siteData.imageAttribRegistry[file] = registryMap[file];
      continue;
    }
    try {
      const meta = await fetchFileMetadata(file);
      registryMap[file] = meta;
      siteData.imageAttribRegistry[file] = meta;
      if (appendRegistryLine(registryLines, file, meta)) report.registryAdded.push(file);
      console.log('registry +', file);
    } catch (e) {
      console.warn('registry fail', file, e.message);
    }
  }

  for (const alias of Object.values(FILE_ALIASES)) {
    const meta = registryMap[alias] || siteData.imageAttribRegistry[alias];
    if (meta) siteData.imageAttribRegistry[alias] = meta;
  }

  for (const { file, removeFrom } of DUP_REMOVALS) {
    const items = g[removeFrom] || [];
    const kept = items.filter(it => it.file !== file);
    if (kept.length !== items.length) {
      g[removeFrom] = kept.length ? kept : undefined;
      if (!kept.length) delete g[removeFrom];
      report.dupsRemoved.push({ file, removeFrom });
      console.log('dup removed', file, 'from', removeFrom);
    }
  }

  for (const [f, meta] of Object.entries(registryMap)) {
    siteData.imageAttribRegistry[f] = meta;
  }
  saveRegistryJs(registryLines, registryRaw);
  siteData.diseaseGalleries = g;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(path.join(root, 'data', 'fix-gallery-report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log('fix-gallery done', JSON.stringify(report));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

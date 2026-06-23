/**
 * 为中文疾病名生成 Open-i / Wikimedia 英文检索词
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DISEASE_EN_DICT, DISEASE_EN_EXACT } from './disease-en-dict.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const listPath = path.join(root, '_imaging-primary-list.json');
const mapPath = path.join(root, 'data', 'disease-en-map.json');

let _cachedMap = null;

function loadPrimaryListEn() {
  const map = new Map();
  if (!fs.existsSync(listPath)) return map;
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) {
      if (d.type && d.en) map.set(d.type, d.en);
    }
  }
  return map;
}

function extractAscii(title) {
  return [...String(title || '').matchAll(/[A-Za-z][A-Za-z0-9/+-]*/g)].map(m => m[0]).filter(Boolean);
}

function translateTitle(title) {
  const raw = String(title || '').trim();
  if (!raw) return '';
  if (DISEASE_EN_EXACT[raw]) return DISEASE_EN_EXACT[raw];

  const ascii = extractAscii(raw);
  let t = raw.replace(/[（(][^）)]*[）)]/g, ' ').replace(/[/·、]/g, ' ').replace(/[A-Za-z0-9+-]+/g, ' ').trim();
  if (!t && ascii.length) return ascii.join(' ');

  const keys = Object.keys(DISEASE_EN_DICT).sort((a, b) => b.length - a.length);
  const parts = [];
  let i = 0;
  while (i < t.length) {
    let hit = '';
    for (const k of keys) {
      if (t.startsWith(k, i)) {
        hit = DISEASE_EN_DICT[k];
        i += k.length;
        break;
      }
    }
    if (!hit) {
      i += 1;
      continue;
    }
    parts.push(hit);
  }

  const en = [...parts, ...ascii].join(' ').replace(/\s+/g, ' ').trim();
  return en || raw;
}

export function buildDiseaseSearchEn(disease) {
  const type = disease?.type || '';
  const title = disease?.title || '';
  const map = loadDiseaseEnMap();
  if (map[type]?.en) return map[type].en;
  if (disease?.en && /[A-Za-z]{3,}/.test(disease.en)) return disease.en.trim();

  const primary = loadPrimaryListEn();
  if (primary.has(type)) return primary.get(type);

  const translated = translateTitle(title);
  if (/[A-Za-z]{3,}/.test(translated)) return translated;

  const ascii = extractAscii(title);
  if (ascii.length) return ascii.join(' ');

  return translated || title;
}

export function buildDiseaseSearchQueries(disease, targetMods = []) {
  const en = buildDiseaseSearchEn(disease);
  const aliases = loadDiseaseEnMap()[disease?.type]?.aliases || [];
  const base = [en, ...aliases].filter((q, i, a) => q && a.indexOf(q) === i);
  const out = [];
  for (const q of base) {
    out.push(q);
    for (const mod of targetMods.slice(0, 4)) {
      if (mod === 'MRI') out.push(`${q} MRI`);
      else if (mod === 'CT') out.push(`${q} CT`);
      else if (mod === 'X线') out.push(`${q} radiograph`);
      else if (mod === '超声') out.push(`${q} ultrasound`);
      else if (mod === '内镜') out.push(`${q} endoscopy`);
      else if (mod === 'DSA') out.push(`${q} angiography`);
      else if (mod === '钼靶') out.push(`${q} mammography`);
    }
  }
  return [...new Set(out)].filter(Boolean);
}

export function loadDiseaseEnMap() {
  if (_cachedMap) return _cachedMap;
  if (fs.existsSync(mapPath)) {
    try {
      _cachedMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
      return _cachedMap;
    } catch {
      _cachedMap = {};
    }
  } else {
    _cachedMap = {};
  }
  return _cachedMap;
}

export function saveDiseaseEnMap(map) {
  _cachedMap = map;
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2), 'utf8');
}

/** 为 site-data 全部疾病生成/刷新 disease-en-map.json */
export function generateDiseaseEnMap(siteData) {
  const primary = loadPrimaryListEn();
  const map = {};
  let mapped = 0;
  for (const d of siteData.diseases || []) {
    let en = primary.get(d.type) || '';
    if (!en || !/[A-Za-z]{3,}/.test(en)) en = translateTitle(d.title);
    if (!/[A-Za-z]{2,}/.test(en)) continue;
    map[d.type] = { en, title: d.title };
    mapped++;
  }
  saveDiseaseEnMap(map);
  return { total: siteData.diseases?.length || 0, mapped, unmapped: (siteData.diseases?.length || 0) - mapped };
}

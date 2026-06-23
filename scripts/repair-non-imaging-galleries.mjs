/**
 * 剔除非影像学配图（临床照片、示意图、组织学等），并从 Open-i / Wikimedia 补图
 * node scripts/repair-non-imaging-galleries.mjs [--dry-run] [--max 6]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_SEARCH } from '../data/batch2-gallery-curated.mjs';
import {
  scorePathologyMatch,
  hasVisiblePathology,
  inferModality,
  OPENI_BLOCK,
  BLOCK_WORDS,
  NON_RADIOLOGY,
  IMAGING_WORDS,
  MODALITY_ZH,
  MIN_SCORE,
  pickTopRanked,
  isRadiologyImage,
  itemGalleryText
} from '../data/gallery-match-utils.mjs';
import { searchOpenI, openiAttribFromHit, openiFileId } from '../data/openi-api.mjs';
import { searchCommonsFiles } from '../data/wikimedia-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const reportPath = path.join(root, 'data', 'non-imaging-repair-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_PER = (() => {
  const i = process.argv.indexOf('--max');
  return i >= 0 ? Number(process.argv[i + 1]) : 6;
})();

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
          source: p[0].startsWith('openi__') ? 'Open-i / PubMed Central' : 'Wikimedia Commons',
          title: p[0]
        };
      });
  }
  return { map, lines };
}

function appendRegistryLine(lines, file, meta) {
  if (lines.some(l => l.startsWith(file + '|'))) return false;
  lines.push([file, meta.author, meta.license, meta.licenseUrl, meta.pageUrl].join('|'));
  return true;
}

function saveRegistryJs(lines) {
  const body = fs.readFileSync(registryPath, 'utf8');
  fs.writeFileSync(registryPath, body.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${lines.join('\n')}\`;`), 'utf8');
}

function hitLooksRadiology(text) {
  const t = String(text || '');
  if (BLOCK_WORDS.test(t) || NON_RADIOLOGY.test(t)) return false;
  return IMAGING_WORDS.test(t) || MODALITY_ZH.test(t) || /radiograph|x-ray|xray|magnetic resonance|computed tomography|ultrasound|sonograph/i.test(t);
}

function scoreOpenIHit(hit, disease) {
  const fileId = hit.fileId || openiFileId(hit);
  if (OPENI_BLOCK.test(fileId)) return -100;
  const text = [hit.articleTitle, hit.imageCaption, hit.Problems].filter(Boolean).join(' ');
  if (!hitLooksRadiology(text)) return -100;
  let score = scorePathologyMatch(text, disease, EXTRA_SEARCH[disease.type] || []);
  if (score < 0 || !hasVisiblePathology(text)) return -100;
  return score;
}

function scoreWikiFile(file, license, disease) {
  if (OPENI_BLOCK.test(file) || BLOCK_WORDS.test(file)) return -100;
  if (!hitLooksRadiology(file)) return -100;
  let score = scorePathologyMatch(file, disease, EXTRA_SEARCH[disease.type] || []);
  if (score < 0 || !hasVisiblePathology(file)) return -100;
  if (!/cc0|cc by|public domain|no restrictions/i.test(license || '')) score -= 20;
  return score;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchReplacements(disease, seen, limit) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.sub || disease.en || disease.title} radiograph X-ray MRI`,
    `${disease.en || disease.title} MRI CT radiograph`
  ].slice(0, 4);
  const ranked = [];
  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 12, imageType: 'xg' });
      for (const hit of list) {
        const file = openiFileId(hit);
        if (!hit.imageUrl || seen.has(file)) continue;
        const score = scoreOpenIHit(hit, disease);
        if (score < MIN_SCORE.openi) continue;
        seen.add(file);
        ranked.push({ source: 'openi', file, url: hit.imageUrl, score, hit });
      }
    } catch (e) {
      console.warn('  openi:', q, e.message);
    }
    await sleep(450);
    try {
      const hits = await searchCommonsFiles(`${disease.en || disease.sub || disease.title} radiograph MRI`, 6);
      for (const h of hits) {
        if (seen.has(h.file)) continue;
        const score = scoreWikiFile(h.file, h.license, disease);
        if (score < MIN_SCORE.wikimedia) continue;
        seen.add(h.file);
        ranked.push({
          source: 'wikimedia',
          file: h.file,
          score,
          meta: {
            author: h.author,
            license: h.license,
            licenseUrl: h.licenseUrl,
            pageUrl: h.pageUrl,
            source: 'Wikimedia Commons',
            title: h.file
          }
        });
      }
    } catch (e) {
      console.warn('  wiki:', e.message);
    }
    await sleep(350);
  }
  return pickTopRanked(ranked, limit, MIN_SCORE.openi);
}

function toGalleryItem(disease, pick, registryMap) {
  if (pick.source === 'openi') {
    const attrib = openiAttribFromHit(pick.hit);
    const mod = inferModality(`${pick.hit.imageCaption} ${pick.hit.articleTitle}`);
    const caption = `${mod} · ${disease.title} · ${String(pick.hit.imageCaption || '').slice(0, 50)}`;
    if (!registryMap[pick.file]) registryMap[pick.file] = { ...attrib, title: attrib.title || pick.file };
    return {
      file: pick.file,
      url: pick.url,
      caption: caption.slice(0, 120),
      site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
      ann: [],
      modified: false,
      attrib
    };
  }
  const mod = inferModality(pick.file);
  if (!registryMap[pick.file]) registryMap[pick.file] = pick.meta;
  return {
    file: pick.file,
    caption: `${mod} · ${disease.title}典型影像`,
    site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: /annotation|annotated/i.test(pick.file),
    attrib: pick.meta
  };
}

async function main() {
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const diseases = siteData.diseases || [];
  const byType = Object.fromEntries(diseases.map(d => [d.type, d]));
  const g = siteData.diseaseGalleries || {};
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  const report = { mode: DRY_RUN ? 'dry-run' : 'apply', removed: [], replaced: [], unchanged: [], errors: [] };
  const affected = new Set();

  for (const [type, items] of Object.entries(g)) {
    const disease = byType[type] || { type, title: type, en: '', sub: '' };
    const kept = [];
    for (const it of items) {
      if (isRadiologyImage(it)) {
        kept.push(it);
        continue;
      }
      report.removed.push({
        type,
        title: disease.title,
        file: it.file,
        reason: 'non-radiology',
        snippet: itemGalleryText(it).slice(0, 140)
      });
      affected.add(type);
    }
    if (kept.length !== items.length) g[type] = kept;
    if (!kept.length && items.length) delete g[type];
  }

  console.log(`Non-radiology removed: ${report.removed.length} items, ${affected.size} diseases`);
  if (DRY_RUN) {
    report.affected = [...affected];
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log('dry-run report:', reportPath);
    return;
  }

  const newRegistry = [];
  let i = 0;
  for (const type of [...affected]) {
    const disease = byType[type];
    if (!disease) continue;
    const existing = g[type] || [];
    const slots = Math.max(1, MAX_PER - existing.length);
    if (existing.length >= MAX_PER && report.removed.filter(r => r.type === type).length === 0) continue;
    const need = existing.length ? Math.min(slots, report.removed.filter(r => r.type === type).length) : Math.max(1, MAX_PER);
    const seen = new Set(existing.map(x => x.file));
    process.stdout.write(`[${++i}/${affected.size}] ${type} (+${need}) ... `);
    try {
      const picks = await fetchReplacements(disease, seen, need);
      if (!picks.length) {
        console.log('no-match');
        report.unchanged.push({ type, reason: 'no-match' });
        continue;
      }
      const added = picks.map(p => toGalleryItem(disease, p, registryMap));
      g[type] = [...existing, ...added];
      for (const it of added) {
        const meta = registryMap[it.file];
        if (meta && appendRegistryLine(registryLines, it.file, meta)) newRegistry.push(it.file);
      }
      report.replaced.push({ type, title: disease.title, added: added.map(a => a.file) });
      console.log(`+${added.length}`);
    } catch (e) {
      console.log('!', e.message);
      report.errors.push({ type, error: e.message });
    }
  }

  for (const [f, meta] of Object.entries(registryMap)) {
    siteData.imageAttribRegistry[f] = meta;
  }
  if (newRegistry.length) saveRegistryJs(registryLines);
  siteData.diseaseGalleries = g;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('\nreplaced:', report.replaced.length, '| report:', reportPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

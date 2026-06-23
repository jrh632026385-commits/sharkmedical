/**
 * 第二批：同图复用审计 — 保留最高分疾病，错配侧移除并从 Open-i 补图
 * node scripts/repair-duplicate-batch2.mjs [--dry-run] [--max 6]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_SEARCH, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import {
  scorePathologyMatch,
  hasVisiblePathology,
  inferModality,
  OPENI_BLOCK,
  MIN_SCORE,
  pickTopRanked
} from '../data/gallery-match-utils.mjs';
import { searchOpenI, openiAttribFromHit, openiFileId } from '../data/openi-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-duplicate-repair-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const ALL_DISEASES = process.argv.includes('--all');
const MAX_PER = (() => {
  const i = process.argv.indexOf('--max');
  return i >= 0 ? Number(process.argv[i + 1]) : 6;
})();
const SCORE_GAP = 8;

function loadBatch2() {
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  const out = [];
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) out.push(d);
  }
  return out;
}

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

function itemText(it) {
  return `${it.file || ''} ${it.caption || ''} ${it.attrib?.title || ''} ${it.site || ''}`;
}

function diseaseMeta(type, byType) {
  return byType[type] || { type, title: type, en: '' };
}

function scoreUse(type, file, g, byType) {
  const d = diseaseMeta(type, byType);
  const it = (g[type] || []).find(x => x.file === file);
  if (!it) return { type, title: d.title, score: -100 };
  return {
    type,
    title: d.title,
    score: scorePathologyMatch(itemText(it), d, EXTRA_SEARCH[type] || [])
  };
}

/** 同图复用：含 batch2↔batch2 与 batch2↔旧库；仅移除 batch2 侧错配副本 */
function planDuplicateRemovals(batch2, g) {
  const batch2Set = new Set(batch2.map(d => d.type));
  const byType = Object.fromEntries(batch2.map(d => [d.type, d]));
  const fileMap = new Map();

  for (const [type, items] of Object.entries(g)) {
    for (const it of items || []) {
      if (!it?.file) continue;
      if (!fileMap.has(it.file)) fileMap.set(it.file, []);
      fileMap.get(it.file).push(type);
    }
  }

  const removals = [];
  for (const [file, types] of fileMap.entries()) {
    if (types.length < 2) continue;
    const batchTypes = types.filter(t => batch2Set.has(t));
    if (batchTypes.length < 1) continue;

    const scored = types.map(t => scoreUse(t, file, g, byType)).sort((a, b) => b.score - a.score);
    const best = scored[0];

    for (const t of batchTypes) {
      const s = scored.find(x => x.type === t);
      if (!s) continue;
      const others = scored.filter(x => x.type !== t);
      if (!others.length) continue;

      const bestOther = others.reduce((a, b) => (b.score > a.score ? b : a), others[0]);
      const minWeak = s.score < MIN_SCORE.openi;
      const dominated = s.score < bestOther.score - SCORE_GAP;
      const legacyShare = others.some(o => !batch2Set.has(o.type));
      const keepBatch2OnLegacyShare =
        s.score >= 40 && s.score >= bestOther.score + SCORE_GAP;
      const legacyDup = legacyShare && !keepBatch2OnLegacyShare;

      if (minWeak || dominated || legacyDup) {
        removals.push({
          file,
          type: s.type,
          title: s.title,
          score: s.score,
          keep: bestOther.type,
          keepScore: bestOther.score,
          reason: minWeak ? 'low-score' : dominated ? 'dominated' : 'legacy-share'
        });
      }
    }
  }
  return removals;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function scoreOpenIHit(hit, disease) {
  const fileId = openiFileId(hit);
  if (OPENI_BLOCK.test(fileId)) return -100;
  const text = [hit.articleTitle, hit.imageCaption, hit.Problems].filter(Boolean).join(' ');
  let score = scorePathologyMatch(text, disease, EXTRA_SEARCH[disease.type] || []);
  if (score < 0 || !hasVisiblePathology(text)) return -100;
  return score;
}

async function fetchReplacements(disease, seen, limit) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.en || disease.title} MRI`,
    `${disease.en || disease.title} radiograph`
  ].slice(0, 4);
  const ranked = [];
  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 10, imageType: 'xg' });
      for (const hit of list) {
        const file = openiFileId(hit);
        if (!hit.imageUrl || seen.has(file) || BLOCKED_FILES.has(file)) continue;
        const score = scoreOpenIHit(hit, disease);
        if (score < MIN_SCORE.openi) continue;
        seen.add(file);
        ranked.push({ file, url: hit.imageUrl, score, hit });
      }
    } catch (e) {
      console.warn('  openi:', q, e.message);
    }
    await sleep(450);
  }
  return pickTopRanked(ranked, limit, MIN_SCORE.openi);
}

function toGalleryItem(disease, pick, registryMap) {
  const attrib = openiAttribFromHit(pick.hit);
  const mod = inferModality(`${pick.hit.imageCaption} ${pick.hit.articleTitle}`);
  if (!registryMap[pick.file]) registryMap[pick.file] = { ...attrib, title: attrib.title || pick.file };
  return {
    file: pick.file,
    url: pick.url,
    caption: `${mod} · ${disease.title} · ${String(pick.hit.imageCaption || '').slice(0, 50)}`.slice(0, 120),
    site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: false,
    attrib
  };
}

async function main() {
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const batch2 = ALL_DISEASES
    ? (siteData.diseases || [])
    : loadBatch2();
  const { map: registryMap, lines: registryLines, raw: registryRaw } = loadRegistryRaw();
  const g = siteData.diseaseGalleries || {};
  const report = { mode: DRY_RUN ? 'dry-run' : 'apply', removed: [], replaced: [], unchanged: [], errors: [] };

  const removals = planDuplicateRemovals(batch2, g);
  console.log(`Duplicate removals planned: ${removals.length}`);

  const affected = new Set();
  for (const r of removals) {
    const items = g[r.type] || [];
    const kept = items.filter(it => it.file !== r.file);
    if (kept.length !== items.length) {
      report.removed.push(r);
      affected.add(r.type);
      if (kept.length) g[r.type] = kept;
      else delete g[r.type];
    }
  }

  if (DRY_RUN) {
    report.affected = [...affected];
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log('dry-run report:', reportPath);
    return;
  }

  let i = 0;
  for (const type of [...affected]) {
    const disease = batch2.find(d => d.type === type);
    if (!disease) continue;
    const existing = g[type] || [];
    const slots = Math.max(0, MAX_PER - existing.length);
    if (slots === 0) {
      report.unchanged.push({ type, reason: 'already full' });
      continue;
    }
    const seen = new Set(existing.map(x => x.file));
    for (const r of removals.filter(x => x.type === type)) seen.add(r.file);
    process.stdout.write(`[${++i}/${affected.size}] ${type} (+${slots}) ... `);
    try {
      const picks = await fetchReplacements(disease, seen, slots);
      if (!picks.length) {
        console.log('no-match');
        report.unchanged.push({ type, reason: 'no-match' });
        continue;
      }
      const added = picks.map(p => toGalleryItem(disease, p, registryMap));
      g[type] = [...existing, ...added];
      for (const it of added) {
        const meta = registryMap[it.file];
        if (meta) appendRegistryLine(registryLines, it.file, meta);
      }
      report.replaced.push({ type, title: disease.title, added: added.map(a => a.file) });
      console.log(`+${added.length}`);
    } catch (e) {
      console.log('!', e.message);
      report.errors.push({ type, error: e.message });
    }
  }

  for (const items of Object.values(g)) {
    for (const it of items || []) {
      if (it?.file && it.attrib) {
        siteData.imageAttribRegistry = siteData.imageAttribRegistry || {};
        if (!siteData.imageAttribRegistry[it.file]) {
          siteData.imageAttribRegistry[it.file] = { ...it.attrib, title: it.attrib.title || it.file };
        }
      }
    }
  }
  for (const [f, meta] of Object.entries(registryMap)) {
    siteData.imageAttribRegistry[f] = meta;
  }

  saveRegistryJs(registryLines, registryRaw);
  siteData.diseaseGalleries = g;
  siteData.updatedAt = new Date().toISOString();
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('\nremoved:', report.removed.length, 'replaced:', report.replaced.length);
  console.log('report:', reportPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

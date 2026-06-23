/**
 * 审计并修复错配/病理不明显图库，从 1 类网站补充替换
 * node scripts/repair-gallery-class1.mjs [--dry-run] [--max 6]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CURATED_GALLERIES,
  EXTRA_SEARCH,
  BLOCKED_FILES
} from '../data/batch2-gallery-curated.mjs';
import {
  scorePathologyMatch,
  hasVisiblePathology,
  inferModality,
  OPENI_BLOCK,
  BLOCK_WORDS,
  MIN_SCORE,
  pickTopRanked,
  diseaseTokens,
  countTokenHits
} from '../data/gallery-match-utils.mjs';
import { searchOpenI, openiAttribFromHit, openiFileId } from '../data/openi-api.mjs';
import { searchCommonsFiles } from '../data/wikimedia-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-gallery-repair-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_PER = (() => {
  const i = process.argv.indexOf('--max');
  return i >= 0 ? Number(process.argv[i + 1]) : 6;
})();

const CONFLICT_RULES = [
  { file: /myeloma|plasmozytom/i, diseaseMust: /myeloma|浆细胞|plasmacytoma|plasmozytom/i, label: '骨髓瘤≠其他' },
  { file: /hemangioma|haemangiom/i, diseaseMust: /hemang|血管瘤|maffucci|mazabraud/i, label: '血管瘤错配' },
  { file: /meniscus|menisk/i, diseaseMust: /menisc|半月板/i, label: '半月板错配' },
  { file: /achilles|跟腱/i, diseaseMust: /achilles|跟腱/i, label: '跟腱错配' },
  { file: /gastrocnemius|腓肠肌/i, diseaseMust: /calf|gastrocnem|腓肠/i, label: '腓肠肌错配' },
  { file: /therapeutics|1916|radium therapy/i, diseaseMust: /.^/, label: '历史教材' }
];

const WRONG_SITE = [
  {
    file: /tibial plateau|plateau fracture|platform fracture/i,
    onlyFor: /pilon|胫骨远端/i,
    label: '胫骨平台≠Pilon'
  },
  {
    file: /lumbar|l4.?l5|l5.?s1|l4-l5/i,
    onlyFor: /thoracic-disc|胸椎/i,
    label: '腰椎≠胸椎间盘'
  },
  {
    file: /luxation|disloc|脱位|sans fracture/i,
    onlyFor: /olecranon|鹰嘴/i,
    fileOk: /olecranon|鹰嘴|fracture|fraktur/i,
    label: '肘脱位≠鹰嘴骨折'
  },
  {
    file: /ventral dislocation of the radial head|radial head.*disloc|dislocation of the radial head/i,
    onlyFor: /radialhead|mason|桡骨头/i,
    exempt: /essex|monteggia|galeazzi|脱位/i,
    label: '桡骨头脱位≠桡骨颈骨折'
  },
  {
    file: /scaphoid fracture|scaphoid non-union advanced collapse/i,
    onlyFor: /preiser/i,
    label: '舟骨骨折≠Preiser 骨坏死'
  },
  {
    file: /supraspinatus/i,
    onlyFor: /subscap|冈下/i,
    label: '冈上肌图≠冈下肌撕裂'
  },
  {
    file: /subcapital|surgical neck|proxhumerous|proximal humerus/i,
    onlyFor: /supracondylar|髁上/i,
    label: '肱骨近端≠髁上骨折'
  },
  {
    file: /spinal stenosis|lumbar spinal stenosis/i,
    onlyFor: /spondylolisthesis|滑脱/i,
    label: '椎管狭窄≠滑脱'
  },
  {
    file: /crescent sign/i,
    onlyFor: /subchondral-insufficiency|软骨下/i,
    label: '新月征≠软骨下不全骨折'
  },
  {
    file: /Vertebral hemangioma|Wirbelkoerperhaemangiom/i,
    onlyFor: /fd-mazabraud/i,
    fileOk: /fibrous|dysplasia|fibrodysplasia|纤维/i,
    label: '单纯血管瘤≠Mazabraud'
  },
  {
    file: /luxation postérieur du coude|elbow dislocation/i,
    onlyFor: /olecranon|鹰嘴/i,
    fileOk: /olecranon|鹰嘴|fracture|fraktur/i,
    label: '肘脱位≠鹰嘴骨折'
  },
  {
    file: /sans fracture|without fracture|无骨折/i,
    onlyFor: /olecranon|鹰嘴/i,
    requireAlso: /luxation|disloc|脱位|luxation/i,
    label: '肘脱位无骨折≠鹰嘴骨折'
  },
  {
    file: /osteogenic sarcoma|Osteogenic sarcoma/i,
    onlyFor: /parosteo|periosteo/i,
    label: '普通骨肉瘤图≠骨膜型'
  },
  {
    file: /myeloma|plasmozytom/i,
    onlyFor: /plasmacytoma/i,
    label: '骨髓瘤/多发病≠孤立性浆细胞瘤'
  }
];

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

function itemText(it) {
  return `${it.file || ''} ${it.caption || ''} ${it.site || ''}`;
}

function checkConflicts(disease, file) {
  const dt = `${disease.type} ${disease.title || ''} ${disease.en || ''}`.toLowerCase();
  const issues = [];
  for (const rule of CONFLICT_RULES) {
    if (rule.file.test(file) && !rule.diseaseMust.test(dt)) issues.push(rule.label);
  }
  for (const rule of WRONG_SITE) {
    if (!rule.file.test(file)) continue;
    if (rule.requireAlso && !rule.requireAlso.test(file)) continue;
    if (rule.onlyFor && !rule.onlyFor.test(dt)) continue;
    if (rule.exempt && rule.exempt.test(dt)) continue;
    if (rule.fileOk && rule.fileOk.test(file) && !/sans fracture|without fracture/i.test(file)) continue;
    issues.push(rule.label);
  }
  return issues;
}

function shouldRemove(disease, it) {
  const file = it.file || '';
  if (BLOCKED_FILES.has(file) || OPENI_BLOCK.test(file) || BLOCK_WORDS.test(file)) {
    return { remove: true, reason: 'blocked' };
  }
  const conflicts = checkConflicts(disease, file);
  if (conflicts.length) return { remove: true, reason: conflicts.join('; ') };
  return { remove: false, score: scorePathologyMatch(itemText(it), disease, EXTRA_SEARCH[disease.type] || []) };
}

function scoreOpenIHit(hit, disease) {
  const fileId = hit.fileId || openiFileId(hit);
  if (OPENI_BLOCK.test(fileId)) return -100;
  const text = [hit.articleTitle, hit.imageCaption, hit.Problems].filter(Boolean).join(' ');
  let score = scorePathologyMatch(text, disease, EXTRA_SEARCH[disease.type] || []);
  if (score < 0 || !hasVisiblePathology(text)) return -100;
  return score;
}

function scoreWikiFile(file, license, disease) {
  if (BLOCKED_FILES.has(file) || BLOCK_WORDS.test(file)) return -100;
  let score = scorePathologyMatch(file, disease, EXTRA_SEARCH[disease.type] || []);
  if (score < 0 || !hasVisiblePathology(file)) return -100;
  if (!/cc0|cc by|public domain|no restrictions/i.test(license || '')) score -= 20;
  return score;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchReplacements(disease, seen, limit) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.en || disease.title} radiograph X-ray`,
    `${disease.en || disease.title} MRI`
  ].slice(0, 4);
  const ranked = [];
  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 10, imageType: 'xg' });
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
    await sleep(400);
    try {
      const hits = await searchCommonsFiles(`${disease.en || disease.title} radiograph`, 5);
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
  const batch2 = loadBatch2();
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  const g = siteData.diseaseGalleries || {};
  const report = { mode: DRY_RUN ? 'dry-run' : 'apply', removed: [], replaced: [], unchanged: [], errors: [] };

  const affected = new Set();

  for (const d of batch2) {
    const items = g[d.type] || [];
    if (!items.length) continue;
    const kept = [];
    for (const it of items) {
      const { remove, reason, score } = shouldRemove(d, it);
      if (remove) {
        report.removed.push({ type: d.type, title: d.title, file: it.file, reason, score });
        affected.add(d.type);
      } else kept.push(it);
    }
    if (kept.length !== items.length) g[d.type] = kept;
    if (!kept.length && items.length) delete g[d.type];
  }

  console.log(`Removed ${report.removed.length} bad items from ${affected.size} diseases`);
  if (DRY_RUN) {
    report.affected = [...affected];
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log('dry-run report:', reportPath);
    return;
  }

  const newRegistry = [];
  let i = 0;
  for (const type of [...affected]) {
    const disease = batch2.find(d => d.type === type);
    if (!disease) continue;
    const existing = g[type] || [];
    const slots = Math.max(0, MAX_PER - existing.length);
    if (slots === 0) {
      report.unchanged.push({ type, reason: 'already full after prune' });
      continue;
    }
    const seen = new Set(existing.map(x => x.file));
    process.stdout.write(`[${++i}/${affected.size}] ${type} (+${slots}) ... `);
    try {
      const picks = await fetchReplacements(disease, seen, slots);
      if (!picks.length) {
        console.log('no replacement');
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

/**
 * 多源影像补充：Open-i (PMC) + Wikimedia Commons（含 Radiopaedia 上传图）+ Radiopaedia 手工检索指引
 * OpenMRS：非公开影像库，跳过
 *
 * 运行：node scripts/supplement-batch2-multi-source.mjs
 *   --dry-run       不写 site-data
 *   --empty-only    仅处理尚无图库的疾病（默认）
 *   --optimize      为已有图库追加高分图（无张数上限时处理全部第二批）
 *   --all           处理 site-data 全部 276 种（默认仅第二批 164 种）
 *   --max N         每病最多 N 张（建议 20）
 *   --under N       仅处理图库少于 N 张的疾病（如 --under 20）
 *   --round2        第二轮定向：更低评分门槛 + 扩展检索词
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_SEARCH, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import { ROUND2_EXTRA_SEARCH, ROUND2_TOPUP_SEARCH } from '../data/round2-extra-search.mjs';
import { searchOpenI, openiAttribFromHit } from '../data/openi-api.mjs';
import { searchCommonsFiles } from '../data/wikimedia-api.mjs';
import {
  MAX_GALLERY_IMAGES,
  MIN_SCORE,
  scorePathologyMatch,
  inferModality,
  pickModalityBalanced,
  parseTargetModalities,
  galleryCapacity,
  hasVisiblePathology,
  countTokenHits,
  diseaseTokens,
  OPENI_BLOCK,
  BLOCK_WORDS,
  NON_RADIOLOGY,
  isRadiologyImage,
  itemGalleryText
} from '../data/gallery-match-utils.mjs';
import { buildDiseaseSearchEn, buildDiseaseSearchQueries, generateDiseaseEnMap } from '../data/disease-search-en.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-multi-source-supplement.json');
const sourcesReportPath = path.join(root, 'data', 'batch2-external-sources-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const ALL_DISEASES = process.argv.includes('--all');
const ROUND2 = process.argv.includes('--round2');
const STRICT = process.argv.includes('--strict');
const EMPTY_ONLY = !process.argv.includes('--optimize');
const OPTIMIZE = process.argv.includes('--optimize');
const UNDER_MAX = (() => {
  const i = process.argv.indexOf('--under');
  return i >= 0 ? Number(process.argv[i + 1]) : 0;
})();
const LIMIT = (() => {
  const i = process.argv.indexOf('--limit');
  return i >= 0 ? Number(process.argv[i + 1]) : 0;
})();
const OFFSET = (() => {
  const i = process.argv.indexOf('--offset');
  return i >= 0 ? Math.max(0, Number(process.argv[i + 1])) : 0;
})();
const MAX_PER_DISEASE = (() => {
  const i = process.argv.indexOf('--max');
  if (i >= 0) return Number(process.argv[i + 1]);
  return MAX_GALLERY_IMAGES;
})();
const SYS_FILTER = (() => {
  const i = process.argv.indexOf('--sys');
  return i >= 0 ? String(process.argv[i + 1] || '').trim() : '';
})();
const TYPE_FILTER = (() => {
  const i = process.argv.indexOf('--type');
  return i >= 0 ? String(process.argv[i + 1] || '').trim() : '';
})();
const FROM_TYPE = (() => {
  const i = process.argv.indexOf('--from-type');
  return i >= 0 ? String(process.argv[i + 1] || '').trim() : '';
})();

const ALLOWED_LICENSE = /cc0|cc by|cc-by|public domain|no restrictions|copyrighted free use/i;
const ALLOW_UNLICENSED = /^(1|true|yes)$/i.test(String(process.env.ALLOW_UNLICENSED || '1'));
const BLOCK_EXT = /\.(svg|webm|ogv|pdf|djvu|gif)$/i;
const DISEASE_TIMEOUT_MS = Number(process.env.SUPPLEMENT_DISEASE_TIMEOUT_MS || 300000);
const BATCH_OFFSET = Number(process.env.SUPPLEMENT_BATCH_OFFSET || 0);
const BATCH_TOTAL = Number(process.env.SUPPLEMENT_BATCH_TOTAL || 0);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function progressLabel(i, totalTargets, targetCount) {
  if (BATCH_TOTAL > 0) return `[${BATCH_OFFSET + i + 1}/${BATCH_TOTAL}]`;
  if (FROM_TYPE) return `[${i + 1}/${targetCount}]`;
  return `[${OFFSET + i + 1}/${totalTargets}]`;
}

function extraSearch(type) {
  const base = EXTRA_SEARCH[type] || [];
  if (!ROUND2) return base;
  return [...base, ...(ROUND2_EXTRA_SEARCH[type] || []), ...(ROUND2_TOPUP_SEARCH[type] || [])];
}

function effectiveMinScore() {
  if (!ROUND2) return Math.min(MIN_SCORE.openi, MIN_SCORE.wikimedia);
  return Math.min(
    Number(process.env.MIN_SCORE_OPENI || 18),
    Number(process.env.MIN_SCORE_WIKI || 10)
  );
}

function minOpenI() {
  if (STRICT) return Number(process.env.MIN_SCORE_OPENI || 24);
  if (ROUND2) return Number(process.env.MIN_SCORE_OPENI || 18);
  return MIN_SCORE.openi;
}
function minWiki() {
  if (STRICT) return Number(process.env.MIN_SCORE_WIKI || 14);
  if (ROUND2) return Number(process.env.MIN_SCORE_WIKI || 10);
  return MIN_SCORE.wikimedia;
}
function minRad() {
  if (STRICT) return Number(process.env.MIN_SCORE_RAD || 18);
  if (ROUND2) return Number(process.env.MIN_SCORE_RAD || 12);
  return MIN_SCORE.radiopaediaCommons;
}

function slotsQueryLimit(floor = 8) {
  const cap = MAX_PER_DISEASE > 0 ? MAX_PER_DISEASE : 20;
  return Math.min(16, Math.max(floor, Math.ceil(cap / 2)));
}

const QUERY_LIMIT = ROUND2 ? 14 : slotsQueryLimit();
const WIKI_QUERY_LIMIT = ROUND2 ? 10 : slotsQueryLimit(6);

function loadBatch2List() {
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  const out = [];
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) out.push(d);
  }
  return out;
}

function loadAllDiseases(siteData) {
  return (siteData.diseases || []).map(d => ({
    ...d,
    en: buildDiseaseSearchEn(d)
  }));
}

function loadBatch2() {
  return loadBatch2List();
}

function buildGlobalUsedFiles(siteData) {
  const used = new Set();
  for (const d of siteData.diseases || []) {
    for (const item of siteData.diseaseGalleries?.[d.type] || []) {
      if (item?.file) used.add(item.file);
    }
  }
  return used;
}

const MOD_SEARCH = {
  MRI: en => [`${en} MRI`, `${en} magnetic resonance imaging`],
  X线: en => [`${en} radiograph`, `${en} X-ray`],
  CT: en => [`${en} CT`, `${en} computed tomography`],
  超声: en => [`${en} ultrasound`, `${en} sonography`],
  DXA: en => [`${en} DXA bone density`],
  DSA: en => [`${en} DSA`, `${en} cerebral angiography`, `${en} angiography`],
  内镜: en => [`${en} endoscopy`, `${en} endoscopic imaging`],
  钼靶: en => [`${en} mammography`, `${en} mammogram`],
  核素: en => [`${en} scintigraphy`, `${en} nuclear medicine`],
  造影: en => [`${en} contrast study`, `${en} angiography`],
  心电图: en => [`${en} ECG`, `${en} electrocardiogram`]
};

function modSearchQueries(mod, en) {
  const entry = MOD_SEARCH[mod];
  if (typeof entry === 'function') return entry(en);
  if (Array.isArray(entry)) return entry;
  return [`${en} ${mod}`];
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
      .forEach((line, idx) => {
        if (!line.trim()) return;
        lines.push(line);
        const p = line.split('|');
        if (p.length < 5) return;
        const file = p[0];
        map[file] = {
          author: p[1],
          license: p[2],
          licenseUrl: p[3],
          pageUrl: p[4],
          source: file.startsWith('openi__')
            ? 'Open-i / PubMed Central'
            : p[4].includes('radiopaedia')
              ? 'Radiopaedia (Wikimedia Commons)'
              : 'Wikimedia Commons',
          title: p[0],
          idx: idx + 1
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
  const newRaw = lines.join('\n');
  const next = body.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${newRaw}\`;`);
  fs.writeFileSync(registryPath, next, 'utf8');
}

function existingFiles(siteData, type) {
  return new Set((siteData.diseaseGalleries[type] || []).map(i => i.file));
}

function makeGalleryItem(disease, { file, url, caption, site, source, attrib, modified }) {
  return {
    file,
    ...(url ? { url } : {}),
    caption,
    site: site || `${disease.region || disease.title} · ${inferModality(caption)}`.slice(0, 28),
    ann: [],
    modified: !!modified,
    ...(attrib ? { attrib } : {})
  };
}

function hitLooksRadiology(text) {
  const t = String(text || '');
  if (BLOCK_WORDS.test(t) || NON_RADIOLOGY.test(t)) return false;
  return /radiograph|x-ray|xray|magnetic resonance|computed tomography|ultrasound|sonograph|tomograph|mri|mrt|\bct\b|endoscop|scintigraph|fluoroscop/i.test(
    t
  );
}

function scoreOpenIHit(hit, disease) {
  const fileId = hit.fileId || '';
  if (OPENI_BLOCK.test(fileId)) return -100;
  const text = [hit.articleTitle, hit.imageCaption, hit.Problems, hit.journal_title].filter(Boolean).join(' ');
  if (!hitLooksRadiology(text)) return -100;
  let score = scorePathologyMatch(text, disease, extraSearch(disease.type));
  if (score < 0) return score;
  if (!hasVisiblePathology(text)) return -50;
  const tokenHits = countTokenHits(text.toLowerCase(), diseaseTokens(disease));
  if (tokenHits < 2 && score < MIN_SCORE.openi + 10) return -50;
  if (hit.Problems && String(hit.Problems).length >= 4) score += 4;
  if (/radiopaedia/i.test(text)) score += 3;
  if (/annotation|annotated|arrow|demonstrat|典型|明显/.test(text)) score += STRICT ? 6 : 3;
  const enToks = (disease.en || '')
    .split(/[\s/(),-]+/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length >= 5);
  const enHit = enToks.some(t => text.toLowerCase().includes(t));
  if (enHit) score += 10;
  if (STRICT) {
    if (!enHit && tokenHits < 2) return -50;
    if (!hasVisiblePathology(text) || score < minOpenI()) return -50;
  } else if (!enHit && score < MIN_SCORE.openi + 8) return -50;
  return score;
}

function scoreWikiFile(file, license, disease) {
  if (BLOCKED_FILES.has(file)) return -100;
  const t = file.toLowerCase();
  if (BLOCK_EXT.test(t) || BLOCK_WORDS.test(t)) return -100;
  if (!hitLooksRadiology(t)) return -100;
  let score = scorePathologyMatch(t, disease, extraSearch(disease.type));
  if (score < 0) return score;
  if (!hasVisiblePathology(t)) return -50;
  if (STRICT) {
    const tokenHits = countTokenHits(t, diseaseTokens(disease));
    if (tokenHits < 2 && score < minWiki() + 8) return -50;
    if (/annotation|annotated|- annotation|arrow/.test(t)) score += 6;
  }
  if (/radiopaedia|radsource/i.test(t)) score += 6;
  if (/annotation|annotated|- annotation/i.test(t)) score += 4;
  if (!ALLOW_UNLICENSED && !ALLOWED_LICENSE.test(license || '')) score -= 30;
  return score;
}

async function fetchOpenICandidates(disease, seen, targetMods) {
  const en = buildDiseaseSearchEn(disease);
  disease.en = en;
  const modQueries = [];
  for (const mod of targetMods) {
    modQueries.push(...modSearchQueries(mod, en));
  }
  const queries = [
    ...modQueries,
    ...buildDiseaseSearchQueries(disease, targetMods).slice(0, 6),
    ...extraSearch(disease.type),
    `${en} radiograph`,
    `${en} MRI`,
    `${en} CT`,
    `${en} ultrasound`
  ]
    .filter((q, i, a) => q && a.indexOf(q) === i)
    .slice(0, QUERY_LIMIT);

  const ranked = [];
  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 12, imageType: 'xg' });
      for (const hit of list) {
        if (!hit.imageUrl || seen.has(hit.fileId)) continue;
        if (OPENI_BLOCK.test(hit.fileId || '')) continue;
        const score = scoreOpenIHit(hit, disease);
        if (score < minOpenI()) continue;
        ranked.push({
          source: 'open-i',
          file: hit.fileId,
          url: hit.imageUrl,
          score,
          hit
        });
      }
    } catch (e) {
      console.warn('    Open-i:', q, e.message);
    }
    await sleep(450);
  }
  return ranked;
}

async function fetchWikiCandidates(disease, seen, radiopaediaBias = false, targetMods = []) {
  const en = buildDiseaseSearchEn(disease);
  disease.en = en;
  const base = extraSearch(disease.type);
  const modQueries = [];
  for (const mod of targetMods) {
    for (const q of modSearchQueries(mod, en)) {
      modQueries.push(radiopaediaBias ? `radiopaedia ${q}` : q);
    }
  }
  const queryPool = radiopaediaBias
    ? [
        ...modQueries.slice(0, 4),
        `radiopaedia ${en} radiograph`,
        ...base.slice(0, 2)
      ]
    : [
        ...modQueries.slice(0, 4),
        ...base.slice(0, 2),
        `${en} X-ray radiograph`,
        `${en} MRI`,
        `${en} CT`,
        `${en} ultrasound`
      ];
  const queries = queryPool
    .filter((q, i, a) => q && a.indexOf(q) === i)
    .slice(0, WIKI_QUERY_LIMIT);

  const ranked = [];
  for (const q of queries) {
    try {
      const hits = await searchCommonsFiles(q, 6);
      for (const h of hits) {
        if (seen.has(h.file) || BLOCKED_FILES.has(h.file)) continue;
        const score = scoreWikiFile(h.file, h.license, disease);
        const min = radiopaediaBias ? minRad() : minWiki();
        if (score < min) continue;
        ranked.push({
          source: radiopaediaBias || /radiopaedia/i.test(h.file) ? 'radiopaedia-commons' : 'wikimedia',
          file: h.file,
          score,
          meta: {
            author: h.author,
            license: h.license,
            licenseUrl: h.licenseUrl,
            pageUrl: h.pageUrl,
            source: /radiopaedia/i.test(h.file) ? 'Radiopaedia (Wikimedia Commons)' : 'Wikimedia Commons',
            title: h.file
          }
        });
      }
    } catch (e) {
      console.warn('    Wikimedia:', q, e.message);
    }
    await sleep(400);
  }
  return ranked;
}

function toItems(disease, picks, registryMap) {
  return picks
    .map(p => {
    if (p.source === 'open-i') {
      const attrib = openiAttribFromHit(p.hit);
      const mod = inferModality(`${p.hit.imageCaption} ${p.hit.articleTitle}`);
      const caption = `${mod} · ${disease.title} · ${stripShort(p.hit.imageCaption || 'PMC 病例')}`;
      if (!registryMap[p.file]) registryMap[p.file] = { ...attrib, title: attrib.title || p.file, imageUrl: p.url };
      return makeGalleryItem(disease, {
        file: p.file,
        url: p.url,
        caption: caption.slice(0, 120),
        source: 'open-i',
        attrib
      });
    }
    const mod = inferModality(p.file);
    const caption = `${mod} · ${disease.title}典型影像`;
    if (!registryMap[p.file]) registryMap[p.file] = p.meta;
    const modified = /annotation|annotated/i.test(p.file);
    return makeGalleryItem(disease, {
      file: p.file,
      caption,
      modified,
      attrib: p.meta
    });
  })
    .filter(item => isRadiologyImage(item));
}

function stripShort(s) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
}

async function supplementDisease(disease, siteData, registryMap, globalUsedFiles) {
  const existing = siteData.diseaseGalleries[disease.type] || [];
  const slots = galleryCapacity(existing.length, MAX_PER_DISEASE);
  if (slots === 0) return { added: [], skipped: 'full' };

  disease.en = buildDiseaseSearchEn(disease);
  const seen = existingFiles(siteData, disease.type);
  const targetMods = parseTargetModalities(disease, siteData.diseaseDetails);
  const allRanked = [];

  const openi = await fetchOpenICandidates(disease, seen, targetMods);
  allRanked.push(...openi);
  openi.forEach(r => seen.add(r.file));

  const wiki = await fetchWikiCandidates(disease, seen, false, targetMods);
  allRanked.push(...wiki);
  wiki.forEach(r => seen.add(r.file));

  const rad = await fetchWikiCandidates(disease, seen, true, targetMods);
  allRanked.push(...rad);

  const picks = pickModalityBalanced(
    allRanked,
    slots,
    targetMods,
    effectiveMinScore(),
    globalUsedFiles
  );
  if (!picks.length) return { added: [], skipped: 'no-match', targetMods };

  for (const p of picks) globalUsedFiles.add(p.file);
  return { added: toItems(disease, picks, registryMap), targetMods };
}

async function supplementDiseaseWithTimeout(disease, siteData, registryMap, globalUsedFiles) {
  let timer;
  try {
    return await Promise.race([
      supplementDisease(disease, siteData, registryMap, globalUsedFiles),
      new Promise(resolve => {
        timer = setTimeout(
          () => resolve({ added: [], skipped: 'timeout', targetMods: parseTargetModalities(disease) }),
          DISEASE_TIMEOUT_MS
        );
      })
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function buildSourcesReport(targets, emptyAll) {
  return {
    generatedAt: new Date().toISOString(),
    maxGalleryImages: MAX_PER_DISEASE,
    minScores: MIN_SCORE,
    sources: {
      openi: {
        name: 'Open-i (NLM / PMC)',
        api: 'https://openi.nlm.nih.gov/api/search',
        license: 'PMC Open Access；须署名并查阅原文许可',
        status: '已接入自动补充'
      },
      radiopaedia: {
        name: 'Radiopaedia',
        url: 'https://radiopaedia.org',
        license: 'CC BY-NC-SA 3.0（非商业）；无批量 API',
        status: 'Commons 镜像检索 + 手工检索链接',
        reason: '优先匹配已上传至 Wikimedia 的 Radiopaedia 图；其余见 manualSearch',
        manualSearch: emptyAll.slice(0, 30).map(d => ({
          type: d.type,
          title: d.title,
          searchUrl: `https://radiopaedia.org/search?q=${encodeURIComponent(d.en || d.title)}&scope=articles`
        }))
      },
      openmrs: {
        name: 'OpenMRS',
        url: 'https://openmrs.org',
        status: '跳过',
        reason: '电子病历 + Orthanc PACS 集成，非公开可检索影像库'
      },
      wikimedia: {
        name: 'Wikimedia Commons',
        status: '已接入（严格病理匹配评分）'
      }
    },
    targetCount: targets.length,
    emptyCount: emptyAll.length
  };
}

async function main() {
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const enStats = generateDiseaseEnMap(siteData);
  console.log(`Disease EN map: ${enStats.mapped}/${enStats.total} mapped, ${enStats.unmapped} need review\n`);
  const catalog = ALL_DISEASES ? loadAllDiseases(siteData) : loadBatch2();
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  siteData.diseaseGalleries = siteData.diseaseGalleries || {};
  const globalUsedFiles = buildGlobalUsedFiles(siteData);

  const emptyAll = catalog.filter(d => !(siteData.diseaseGalleries[d.type] || []).length);
  let targets = EMPTY_ONLY
    ? emptyAll
    : MAX_PER_DISEASE <= 0
      ? catalog.filter(d => (siteData.diseaseGalleries[d.type] || []).length <= 1)
      : catalog.filter(d => (siteData.diseaseGalleries[d.type] || []).length < MAX_PER_DISEASE);
  if (FROM_TYPE) {
    const fromIdx = catalog.findIndex(d => d.type === FROM_TYPE);
    if (fromIdx < 0) {
      console.error(`--from-type not found: ${FROM_TYPE}`);
      process.exit(1);
    }
    const allowed = new Set(catalog.slice(fromIdx).map(d => d.type));
    targets = targets.filter(d => allowed.has(d.type));
  }
  if (UNDER_MAX > 0) {
    targets = targets.filter(d => (siteData.diseaseGalleries[d.type] || []).length < UNDER_MAX);
  }
  if (SYS_FILTER) targets = targets.filter(d => d.sys === SYS_FILTER);
  if (TYPE_FILTER) targets = targets.filter(d => d.type === TYPE_FILTER);
  const totalTargets = targets.length;
  if (OFFSET > 0) targets = targets.slice(OFFSET);
  if (LIMIT > 0) targets = targets.slice(0, LIMIT);

  const report = {
    mode: DRY_RUN ? 'dry-run' : 'apply',
    allDiseases: ALL_DISEASES,
    emptyOnly: EMPTY_ONLY,
    optimize: OPTIMIZE,
    maxImages: MAX_PER_DISEASE,
    minScores: MIN_SCORE,
    supplemented: [],
    appended: [],
    stillEmpty: [],
    newRegistry: [],
    errors: []
  };

  console.log(
    `Multi-source supplement: ${targets.length}/${catalog.length} diseases, max ${MAX_PER_DISEASE <= 0 ? 'unlimited' : MAX_PER_DISEASE}/disease`,
    ALL_DISEASES ? `[all ${catalog.length}]` : '[batch2]',
    ROUND2 ? '[round2]' : '',
    STRICT ? '[strict]' : '',
    UNDER_MAX > 0 ? `[under ${UNDER_MAX}]` : '',
    SYS_FILTER ? `[sys ${SYS_FILTER}]` : '',
    TYPE_FILTER ? `[type ${TYPE_FILTER}]` : '',
    FROM_TYPE ? `[from ${FROM_TYPE}]` : '',
    OFFSET > 0 ? `[offset ${OFFSET}]` : '',
    DRY_RUN ? '[dry-run]' : ''
  );
  if (FROM_TYPE) {
    const fromPos = catalog.findIndex(d => d.type === FROM_TYPE) + 1;
    console.log(`  resume from catalog #${fromPos} (${FROM_TYPE}), ${targets.length} targets\n`);
  } else if (OFFSET > 0) {
    console.log(`  resume from #${OFFSET + 1}/${totalTargets} (${targets.length} remaining)\n`);
  } else {
    console.log('  Open-i → Wikimedia → Radiopaedia-Commons\n');
  }

  fs.writeFileSync(sourcesReportPath, JSON.stringify(buildSourcesReport(targets, emptyAll), null, 2), 'utf8');

  for (let i = 0; i < targets.length; i++) {
    const disease = targets[i];
    const had = (siteData.diseaseGalleries[disease.type] || []).length;
    process.stdout.write(`${progressLabel(i, totalTargets, targets.length)} ${disease.type} (${had} existing) ... `);
    try {
      const { added, skipped, targetMods } = await supplementDiseaseWithTimeout(
        disease,
        siteData,
        registryMap,
        globalUsedFiles
      );
      if (added.length) {
        if (!DRY_RUN) {
          const merged = [...(siteData.diseaseGalleries[disease.type] || []), ...added];
          const seenFiles = new Set();
          siteData.diseaseGalleries[disease.type] = merged.filter(it => {
            if (!it?.file || seenFiles.has(it.file)) return false;
            seenFiles.add(it.file);
            return true;
          }).slice(0, MAX_PER_DISEASE > 0 ? MAX_PER_DISEASE : undefined);
          for (const it of added) {
            const meta = registryMap[it.file];
            if (meta && appendRegistryLine(registryLines, it.file, meta)) report.newRegistry.push(it.file);
          }
          for (const [f, meta] of Object.entries(registryMap)) {
            siteData.imageAttribRegistry[f] = meta;
          }
          if (report.newRegistry.length) saveRegistryJs(registryLines);
          siteData.updatedAt = new Date().toISOString();
          fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
          fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        }
        const entry = {
          type: disease.type,
          title: disease.title,
          added: added.length,
          total: had + added.length,
          targetMods,
          files: added.map(a => ({ file: a.file, source: a.attrib?.source || '?' }))
        };
        if (had) report.appended.push(entry);
        else report.supplemented.push(entry);
        console.log(`+${added.length} (${added.map(a => a.file.slice(0, 40)).join('; ')})`);
      } else {
        if (!had) report.stillEmpty.push({ type: disease.type, title: disease.title, reason: skipped });
        console.log(skipped || '—');
      }
    } catch (e) {
      report.errors.push({ type: disease.type, error: e.message });
      console.log('!', e.message);
    }
  }

  if (!DRY_RUN) {
    for (const [f, meta] of Object.entries(registryMap)) {
      siteData.imageAttribRegistry[f] = meta;
    }
    if (report.newRegistry.length) saveRegistryJs(registryLines);
    siteData.updatedAt = new Date().toISOString();
    fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\nmulti-source supplement done');
  console.log('  new galleries:', report.supplemented.length);
  console.log('  appended:', report.appended.length);
  console.log('  still empty:', report.stillEmpty.length);
  console.log('  new registry:', report.newRegistry.length);
  console.log('  report:', reportPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

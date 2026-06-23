/**
 * Radiopaedia 定向补充：Wikimedia Commons 分类/检索（Radiopaedia  taxonomy 对齐）+ 手工案例链接
 * 针对仍无图库的第二批疾病（默认 3 种）
 *
 * node scripts/supplement-batch2-radiopaedia-target.mjs
 *   --dry-run
 *   --types quad-tear,biceps-long
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_SEARCH, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import { searchCommonsFiles, fetchFileMetadata, wikimediaQuery } from '../data/wikimedia-api.mjs';
import {
  BLOCK_WORDS,
  OPENI_BLOCK,
  inferModality,
  scorePathologyMatch,
  hasVisiblePathology
} from '../data/gallery-match-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-radiopaedia-target-supplement.json');

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_PER = 6;
const MIN_SCORE = 10;
const ALLOWED_LICENSE = /cc0|cc by|cc-by|public domain|no restrictions|copyrighted free use|attribution/i;
const BLOCK_EXT = /\.(svg|webm|ogv|pdf|djvu|gif)$/i;

const TARGETS = {
  'quad-tear': {
    commonsCategories: [
      'Quadriceps tendon rupture',
      'X-rays of quadriceps tendon rupture',
      'MRI of quadriceps tendon rupture'
    ],
    queries: [
      'radiopaedia quadriceps tendon rupture',
      'quadriceps tendon rupture radiograph',
      'Quadrizepssehnenruptur'
    ],
    aliasBoost: /quadrizeps|quadriceps|sehnenruptur|patella|ruptur der quadriceps/i,
    radiopaediaCases: [
      { title: 'Quadriceps tendon rupture', url: 'https://radiopaedia.org/articles/quadriceps-tendon-rupture' },
      { title: 'Quadriceps tendon rupture (case)', url: 'https://radiopaedia.org/search?q=quadriceps%20tendon%20rupture&scope=cases' }
    ]
  },
  'biceps-long': {
    commonsCategories: [
      'Biceps tendon rupture',
      'MRI of biceps tendon rupture',
      'Ultrasound images of biceps tendon rupture'
    ],
    queries: [
      'radiopaedia biceps long head rupture',
      'Rupturelongheadbiceps',
      'lange Bizepssehne rupture'
    ],
    aliasBoost: /long head|lange bizepssehne|rupturelonghead|proximal.*biceps|biceps.*ruptur/i,
    fileReject: /dist\.|distal biceps|Dist\. bizeps/i,
    radiopaediaCases: [
      { title: 'Biceps tendon rupture', url: 'https://radiopaedia.org/articles/biceps-tendon-rupture' },
      { title: 'Proximal biceps tendon rupture', url: 'https://radiopaedia.org/search?q=proximal%20biceps%20tendon%20rupture&scope=cases' }
    ]
  },
  'rhabdo-trauma': {
    commonsCategories: ['Rhabdomyolysis', 'Compartment syndrome', 'Crush syndrome'],
    queries: [
      'radiopaedia rhabdomyolysis CT',
      'radiopaedia rhabdomyolysis MRI',
      'traumatic rhabdomyolysis imaging'
    ],
    aliasBoost: /rhabdomyolysis|myonecrosis|crush syndrome|compartment syndrome|横纹肌/i,
    fileReject: /hydrate|warmup|coke|renal tubules|actin and myosin|fluid replacement|diagram|illustration/i,
    radiopaediaCases: [
      { title: 'Rhabdomyolysis (CT case)', url: 'https://radiopaedia.org/cases/37698' },
      {
        title: 'Rhabdomyolysis with myonecrosis',
        url: 'https://radiopaedia.org/search?q=rhabdomyolysis%20myonecrosis&scope=cases'
      },
      { title: 'Rhabdomyolysis article', url: 'https://radiopaedia.org/articles/rhabdomyolysis' }
    ]
  }
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

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
      .forEach((line, idx) => {
        if (!line.trim()) return;
        lines.push(line);
        const p = line.split('|');
        if (p.length < 5) return;
        map[p[0]] = {
          author: p[1],
          license: p[2],
          licenseUrl: p[3],
          pageUrl: p[4],
          source: /radiopaedia/i.test(p[4]) ? 'Radiopaedia (Wikimedia Commons)' : 'Wikimedia Commons',
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
  const next = body.replace(/const RAW=`[\s\S]*?`;/, `const RAW=\`${lines.join('\n')}\`;`);
  fs.writeFileSync(registryPath, next, 'utf8');
}

function scoreTargetFile(file, disease, cfg) {
  if (BLOCKED_FILES.has(file) || OPENI_BLOCK.test(file) || BLOCK_EXT.test(file) || BLOCK_WORDS.test(file))
    return -100;
  if (cfg.fileReject?.test(file)) return -100;
  let score = scorePathologyMatch(file, disease, EXTRA_SEARCH[disease.type] || []);
  if (cfg.aliasBoost?.test(file)) score += 18;
  if (/annotation|annotated|- annotation/i.test(file)) score += 4;
  if (/radiopaedia/i.test(file)) score += 8;
  if (score > 0 && !hasVisiblePathology(file) && !cfg.aliasBoost?.test(file)) score -= 15;
  return score;
}

async function categoryFiles(category) {
  const data = await wikimediaQuery({
    action: 'query',
    generator: 'categorymembers',
    gcmtitle: `Category:${category}`,
    gcmtype: 'file',
    gcmlimit: '50',
    prop: 'imageinfo',
    iiprop: 'extmetadata|mime',
    iiurlwidth: '400'
  });
  return Object.values(data.query?.pages || {}).map(p => {
    const meta = p.imageinfo?.[0]?.extmetadata || {};
    const lic = (meta.LicenseShortName?.value || meta.UsageTerms?.value || '').replace(/<[^>]+>/g, ' ').trim();
    return {
      file: p.title.replace(/^File:/, ''),
      mime: p.imageinfo?.[0]?.mime,
      license: lic
    };
  });
}

async function collectCandidates(disease, cfg, seen) {
  const ranked = [];

  for (const cat of cfg.commonsCategories || []) {
    try {
      for (const h of await categoryFiles(cat)) {
        if (!h.mime?.startsWith('image/') || seen.has(h.file)) continue;
        seen.add(h.file);
        const score = scoreTargetFile(h.file, disease, cfg);
        if (score < MIN_SCORE) continue;
        if (!ALLOWED_LICENSE.test(h.license || '')) continue;
        ranked.push({ file: h.file, score, source: 'commons-category', category: cat });
      }
    } catch (e) {
      console.warn('    category:', cat, e.message);
    }
    await sleep(300);
  }

  for (const q of cfg.queries || []) {
    try {
      const hits = await searchCommonsFiles(q, 8);
      for (const h of hits) {
        if (seen.has(h.file) || BLOCKED_FILES.has(h.file)) continue;
        seen.add(h.file);
        const score = scoreTargetFile(h.file, disease, cfg);
        if (score < MIN_SCORE) continue;
        if (!ALLOWED_LICENSE.test(h.license || '')) continue;
        ranked.push({ file: h.file, score, source: 'commons-search', query: q, meta: h });
      }
    } catch (e) {
      console.warn('    search:', q, e.message);
    }
    await sleep(400);
  }

  ranked.sort((a, b) => b.score - a.score);
  return ranked.slice(0, MAX_PER);
}

async function ensureMeta(file, registryMap, pick) {
  if (registryMap[file]) return registryMap[file];
  if (pick.meta?.author) {
    return {
      author: pick.meta.author,
      license: pick.meta.license || '见原文页面',
      licenseUrl: pick.meta.licenseUrl || '',
      pageUrl: pick.meta.pageUrl || `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`,
      source: /radiopaedia/i.test(file) ? 'Radiopaedia (Wikimedia Commons)' : 'Wikimedia Commons',
      title: file
    };
  }
  const attrib = await fetchFileMetadata(file);
  return { ...attrib, source: /radiopaedia/i.test(file) ? 'Radiopaedia (Wikimedia Commons)' : 'Wikimedia Commons' };
}

function makeItem(disease, file, meta) {
  const mod = inferModality(file);
  return {
    file,
    caption: `${mod} · ${disease.title}典型影像`,
    site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: /annotation|annotated/i.test(file),
    attrib: meta
  };
}

async function main() {
  const typesArg = (() => {
    const i = process.argv.indexOf('--types');
    return i >= 0 ? process.argv[i + 1].split(',').map(s => s.trim()) : null;
  })();

  const batch2 = loadBatch2();
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  siteData.diseaseGalleries = siteData.diseaseGalleries || {};

  const empty = batch2.filter(d => !(siteData.diseaseGalleries[d.type] || []).length);
  const typeList = typesArg || empty.map(d => d.type).filter(t => TARGETS[t]);
  const diseases = batch2.filter(d => typeList.includes(d.type));

  const report = {
    mode: DRY_RUN ? 'dry-run' : 'apply',
    supplemented: [],
    manualOnly: [],
    stillEmpty: [],
    newRegistry: []
  };

  console.log(`Radiopaedia-target supplement: ${diseases.length} diseases${DRY_RUN ? ' [dry-run]' : ''}\n`);

  for (let i = 0; i < diseases.length; i++) {
    const disease = diseases[i];
    const cfg = TARGETS[disease.type];
    if (!cfg) continue;

    process.stdout.write(`[${i + 1}/${diseases.length}] ${disease.type} ... `);
    const seen = new Set();
    const picks = await collectCandidates(disease, cfg, seen);

    if (!picks.length) {
      report.manualOnly.push({
        type: disease.type,
        title: disease.title,
        radiopaediaCases: cfg.radiopaediaCases
      });
      report.stillEmpty.push({ type: disease.type, title: disease.title });
      console.log('no commons match → Radiopaedia manual');
      continue;
    }

    const items = [];
    for (const pick of picks) {
      const meta = await ensureMeta(pick.file, registryMap, pick);
      registryMap[pick.file] = meta;
      items.push(makeItem(disease, pick.file, meta));
    }

    if (!DRY_RUN) {
      siteData.diseaseGalleries[disease.type] = items;
      for (const it of items) {
        if (appendRegistryLine(registryLines, it.file, registryMap[it.file])) {
          report.newRegistry.push(it.file);
        }
      }
    }

    report.supplemented.push({
      type: disease.type,
      title: disease.title,
      n: items.length,
      files: items.map(i => i.file),
      radiopaediaCases: cfg.radiopaediaCases
    });
    console.log(`+${items.length} (${items.map(i => i.file.slice(0, 36)).join('; ')})`);
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
  console.log('\nradiopaedia-target done');
  console.log('  supplemented:', report.supplemented.length);
  console.log('  manual only:', report.manualOnly.length);
  console.log('  still empty:', report.stillEmpty.length);
  console.log('  report:', reportPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

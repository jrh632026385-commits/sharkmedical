/**
 * 从 Open-i (PMC) 为第二批尚无图库的疾病补充影像
 * Radiopaedia：CC BY-NC-SA，不支持批量 API，见 data/batch2-external-sources-report.json
 * OpenMRS：临床 PACS 集成，非公开影像库，跳过
 *
 * 运行：node scripts/supplement-batch2-external.mjs
 * 可选：--dry-run  只输出报告不写 site-data
 *       --limit N    仅处理前 N 个空图库
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXTRA_SEARCH, BLOCKED_FILES } from '../data/batch2-gallery-curated.mjs';
import { searchOpenI, openiAttribFromHit, openiImageUrl } from '../data/openi-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const registryPath = path.join(root, 'image-attrib-registry.js');
const listPath = path.join(root, '_imaging-primary-list.json');
const reportPath = path.join(root, 'data', 'batch2-gallery-external-supplement.json');
const sourcesReportPath = path.join(root, 'data', 'batch2-external-sources-report.json');

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = (() => {
  const i = process.argv.indexOf('--limit');
  return i >= 0 ? Number(process.argv[i + 1]) : 0;
})();

const MIN_SCORE = 22;
const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|histolog|microscop|flowchart|graph abstract|staining|immunohist|western blot|gel electrophoresis|photo of patient|portrait|table \d|figure \d legend only/i;
const IMAGING_WORDS = /radiograph|x-ray|xray|roentgen|computed tomography|\bct\b|\bmri\b|mrt|ultrasound|sonograph|magnetic resonance|fluoroscop/i;

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
          source: p[4].includes('openi') || p[0].startsWith('openi__') ? 'Open-i / PubMed Central' : 'Wikimedia Commons',
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

function inferModality(text) {
  const s = String(text || '').toLowerCase();
  if (/mri|mrt|magnetic resonance/.test(s)) return 'MRI';
  if (/\bct\b|computed tomography/.test(s)) return 'CT';
  if (/ultrasound|sonograph/.test(s)) return '超声';
  if (/radiograph|x-ray|xray|roentgen|fluoroscop/.test(s)) return 'X线';
  return '影像';
}

function scoreOpenIHit(hit, disease) {
  const text = [
    hit.articleTitle,
    hit.imageCaption,
    hit.Problems,
    hit.journal_title
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (BLOCK_WORDS.test(text)) return -100;

  const tokens = [
    disease.type,
    ...(disease.en || '').split(/[\s/(),-]+/),
    ...(disease.title || '').split(/[\s/(),·-]+/)
  ]
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length >= 4);

  let score = 0;
  let tokenHits = 0;
  for (const tok of tokens) {
    if (tok.length >= 4 && text.includes(tok)) {
      tokenHits++;
      score += tok.length >= 8 ? 14 : 10;
    }
  }
  if (tokenHits === 0) return -50;

  for (const q of EXTRA_SEARCH[disease.type] || []) {
    for (const w of q.toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && text.includes(w)) score += 12;
    }
  }

  if (IMAGING_WORDS.test(text)) score += 8;
  else score -= 15;

  if (/case report|case series/.test(text)) score += 2;
  if (/pediatric|child|infant/.test(text) && /pediatric|child|infant|juvenile/i.test(disease.en || '')) score += 3;

  return score;
}

function makeOpenIItem(disease, hit, score) {
  const mod = inferModality(`${hit.imageCaption} ${hit.articleTitle}`);
  const attrib = openiAttribFromHit(hit);
  return {
    file: hit.fileId,
    url: hit.imageUrl,
    caption: `${mod} · ${disease.title}（PMC）`,
    site: `${disease.region || disease.title} · ${mod}`.slice(0, 28),
    ann: [],
    modified: false,
    attrib,
    _score: score,
    _pmcid: hit.uid,
    _queryMeta: { article: hit.articleTitle?.slice(0, 80), caption: hit.imageCaption?.slice(0, 80) }
  };
}

async function supplementDisease(disease, registryMap) {
  const queries = [
    ...(EXTRA_SEARCH[disease.type] || []),
    `${disease.en || disease.title} radiograph`,
    `${disease.en || disease.title} MRI`
  ].slice(0, 3);

  const seen = new Set();
  const ranked = [];

  for (const q of queries) {
    try {
      const { list } = await searchOpenI(q, { limit: 6, imageType: 'xg' });
      for (const hit of list) {
        if (!hit.imageUrl || seen.has(hit.fileId)) continue;
        seen.add(hit.fileId);
        const score = scoreOpenIHit(hit, disease);
        if (score < MIN_SCORE) continue;
        ranked.push({ hit, score });
      }
    } catch (e) {
      console.warn('  Open-i fail:', q, e.message);
    }
    await sleep(400);
  }

  ranked.sort((a, b) => b.score - a.score);
  const top = ranked[0];
  if (!top) return [];

  const item = makeOpenIItem(disease, top.hit, top.score);
  if (!registryMap[item.file]) {
    registryMap[item.file] = { ...item.attrib, title: item.attrib.title || item.file };
  }
  const { _score, _pmcid, _queryMeta, ...rest } = item;
  rest._reportScore = top.score;
  return [rest];
}

function buildSourcesReport(empty) {
  return {
    generatedAt: new Date().toISOString(),
    sources: {
      openi: {
        name: 'Open-i (NLM)',
        api: 'https://openi.nlm.nih.gov/api/search',
        license: 'PMC Open Access 文章图像；须署名并查阅原文许可',
        status: '已接入自动补充脚本 supplement-batch2-external.mjs',
        note: '优先匹配 X线/MRI/CT 图注；min score ' + MIN_SCORE
      },
      radiopaedia: {
        name: 'Radiopaedia',
        url: 'https://radiopaedia.org',
        license: 'CC BY-NC-SA 3.0（非商业）',
        status: '未批量接入',
        reason: '无公开批量下载 API；商用需联系 license@radiopaedia.org',
        manualSearch: empty.slice(0, 20).map(d => ({
          type: d.type,
          title: d.title,
          searchUrl: `https://radiopaedia.org/search?q=${encodeURIComponent(d.en || d.title)}&scope=articles`
        }))
      },
      openmrs: {
        name: 'OpenMRS',
        url: 'https://openmrs.org',
        status: '跳过',
        reason: '电子病历 + Orthanc PACS 集成平台，非公开可检索影像库'
      }
    },
    emptyCount: empty.length
  };
}

async function main() {
  const batch2 = loadBatch2();
  const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { map: registryMap, lines: registryLines } = loadRegistryRaw();
  siteData.diseaseGalleries = siteData.diseaseGalleries || {};

  let empty = batch2.filter(d => !(siteData.diseaseGalleries[d.type] || []).length);
  if (LIMIT > 0) empty = empty.slice(0, LIMIT);

  const report = {
    mode: DRY_RUN ? 'dry-run' : 'apply',
    source: 'open-i',
    minScore: MIN_SCORE,
    supplemented: [],
    candidates: [],
    stillEmpty: [],
    newRegistry: [],
    errors: []
  };

  console.log(`Open-i supplement: ${empty.length} empty diseases (min score ${MIN_SCORE})${DRY_RUN ? ' [dry-run]' : ''}\n`);

  fs.writeFileSync(sourcesReportPath, JSON.stringify(buildSourcesReport(empty), null, 2), 'utf8');

  for (const disease of empty) {
    try {
      const items = await supplementDisease(disease, registryMap);
      if (items.length) {
        if (!DRY_RUN) siteData.diseaseGalleries[disease.type] = items;
        for (const it of items) {
          const meta = registryMap[it.file];
          if (meta && !DRY_RUN && appendRegistryLine(registryLines, it.file, meta)) {
            report.newRegistry.push(it.file);
          }
        }
        report.supplemented.push({
          type: disease.type,
          title: disease.title,
          n: items.length,
          file: items[0].file,
          url: items[0].url,
          score: items[0]._score
        });
        console.log(`+ ${disease.type}: ${items[0].file} (score ${items[0]._score ?? '?'})`);
      } else {
        report.stillEmpty.push({ type: disease.type, title: disease.title, en: disease.en });
        console.log(`  ${disease.type}: no match`);
      }
    } catch (e) {
      report.errors.push({ type: disease.type, error: e.message });
      console.warn(`! ${disease.type}:`, e.message);
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

  console.log('\nexternal supplement done');
  console.log('  supplemented:', report.supplemented.length);
  console.log('  still empty:', report.stillEmpty.length);
  console.log('  new registry:', report.newRegistry.length);
  console.log('  report:', reportPath);
  console.log('  sources:', sourcesReportPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

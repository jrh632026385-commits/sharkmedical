#!/usr/bin/env node
/**
 * 1 类网站 · 影像学检索 CLI（供 Cursor Agent 调用，无需启动 Web 服务）
 *
 * 用法：
 *   node scripts/class1-imaging-search.mjs list [--api-only]
 *   node scripts/class1-imaging-search.mjs health [--source openi]
 *   node scripts/class1-imaging-search.mjs search --q "Galeazzi fracture MRI" --source openi [--limit 6]
 *   node scripts/class1-imaging-search.mjs search-all --q "osteoblastoma radiograph" [--limit 4]
 *   node scripts/class1-imaging-search.mjs links --q "骨母细胞瘤" [--category chinese|education|...]
 *   node scripts/class1-imaging-search.mjs disease --type ostoblastoma [--limit 6]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  catalog,
  searchSource,
  searchAll,
  healthCheck,
  buildLink,
  cite,
  listSources
} from '../data/imaging-sources/index.mjs';
import { EXTRA_SEARCH } from '../data/batch2-gallery-curated.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const listPath = path.join(__dirname, '..', '_imaging-primary-list.json');

function parseArgs(argv) {
  const args = argv.slice(2);
  const cmd = args[0] || 'help';
  const opts = { cmd, limit: 6, source: 'openi', q: '', type: '', category: '', apiOnly: false, json: true };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '--api-only') opts.apiOnly = true;
    else if (a === '--no-json') opts.json = false;
    else if (a === '--limit' && args[i + 1]) opts.limit = Number(args[++i]);
    else if (a === '--source' && args[i + 1]) opts.source = args[++i];
    else if (a === '--q' && args[i + 1]) opts.q = args[++i];
    else if (a === '--type' && args[i + 1]) opts.type = args[++i];
    else if (a === '--category' && args[i + 1]) opts.category = args[++i];
    else if (a === '-q' && args[i + 1]) opts.q = args[++i];
  }
  if (!opts.q && args[1] && !args[1].startsWith('-') && cmd !== 'list' && cmd !== 'health' && cmd !== 'help') {
    opts.q = args[1];
  }
  return opts;
}

function loadDisease(type) {
  if (!fs.existsSync(listPath)) return null;
  const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  for (const cat of Object.values(list.categories || {})) {
    for (const d of cat.diseases || []) {
      if (d.type === type) return d;
    }
  }
  return null;
}

function buildQueries(disease) {
  const extra = EXTRA_SEARCH[disease.type] || [];
  return [
    ...extra.slice(0, 3),
    `${disease.en || disease.title} radiograph`,
    `${disease.en || disease.title} MRI`
  ].filter(Boolean);
}

function print(out) {
  console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 2));
}

async function cmdList(opts) {
  print({
    label: '1类网站目录',
    count: catalog({ apiOnly: opts.apiOnly, category: opts.category || undefined }).length,
    sources: catalog({ apiOnly: opts.apiOnly, category: opts.category || undefined })
  });
}

async function cmdHealth(opts) {
  const data = await healthCheck(opts.source || undefined);
  print({ label: '1类网站 API 健康', ...data });
}

async function cmdSearch(opts) {
  if (!opts.q) throw new Error('需要 --q 检索词');
  const data = await searchSource(opts.source, opts.q, { limit: opts.limit });
  print({ label: '1类网站单源检索', query: opts.q, ...data });
}

async function cmdSearchAll(opts) {
  if (!opts.q) throw new Error('需要 --q 检索词');
  const data = await searchAll(opts.q, { limit: opts.limit });
  print({ label: '1类网站多源检索', ...data });
}

async function cmdLinks(opts) {
  if (!opts.q) throw new Error('需要 --q 检索词');
  let sources = listSources({ category: opts.category || undefined });
  if (opts.apiOnly) sources = sources.filter(s => s.plugin);
  const links = sources.map(s => buildLink(s.id, opts.q)).filter(Boolean);
  print({ label: '1类网站检索链接', query: opts.q, count: links.length, links });
}

async function cmdDisease(opts) {
  if (!opts.type) throw new Error('需要 --type 疾病 type');
  const disease = loadDisease(opts.type);
  if (!disease) throw new Error(`未知疾病 type: ${opts.type}`);
  const queries = buildQueries(disease);
  const results = [];
  for (const q of queries.slice(0, 3)) {
    try {
      const r = await searchAll(q, { limit: Math.min(opts.limit, 4) });
      results.push({ query: q, ...r });
    } catch (e) {
      results.push({ query: q, error: e.message });
    }
  }
  const manualLinks = listSources({ category: opts.category || undefined })
    .filter(s => s.integration === 'search-link' || s.integration === 'manual')
    .slice(0, 12)
    .map(s => buildLink(s.id, disease.en || disease.title));
  print({
    label: '1类网站疾病检索',
    disease: { type: disease.type, title: disease.title, en: disease.en },
    queries,
    apiResults: results,
    manualLinks
  });
}

function cmdHelp() {
  print(`1类网站影像学检索 CLI（Agent 入口）

命令:
  list [--api-only] [--category chinese|education|dataset|international|institutional]
  health [--source openi]
  search --q "..." --source openi|wikimedia-commons|biomed-central|radiopaedia-commons [--limit N]
  search-all --q "..." [--limit N]
  links --q "..." [--category chinese]
  disease --type <diseaseType> [--limit N]

npm: npm run class1-search -- search-all --q "fracture radiograph"

注册表: data/imaging-sources/registry.mjs
Skill:  .cursor/skills/class1-imaging-search/SKILL.md`);
}

async function main() {
  const opts = parseArgs(process.argv);
  const map = {
    list: cmdList,
    health: cmdHealth,
    search: cmdSearch,
    'search-all': cmdSearchAll,
    links: cmdLinks,
    disease: cmdDisease,
    help: cmdHelp
  };
  const fn = map[opts.cmd] || cmdHelp;
  try {
    await fn(opts);
  } catch (e) {
    console.error(JSON.stringify({ ok: false, error: e.message }, null, 2));
    process.exit(1);
  }
}

main();

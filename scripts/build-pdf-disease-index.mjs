/**
 * 从《骨肌系统影像诊断》全文为 214 条疾病检索相关段落
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mskChapterFor } from '../data/textbook-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagesPath = path.join(root, 'data', 'pdf-sources', 'musculoskeletal-imaging.pages.json');
const dataPath = path.join(root, 'data', 'site-data.json');
const outPath = path.join(root, 'data', 'pdf-sources', 'disease-extracts.json');

const ALIASES = {
  knee: ['前交叉韧带', 'ACL'],
  pcl: ['后交叉韧带', 'PCL'],
  mcl: ['内侧副韧带', 'MCL'],
  meniscus: ['半月板'],
  tumor: ['骨肉瘤'],
  gct: ['骨巨细胞瘤'],
  ewing: ['尤文肉瘤'],
  myeloma: ['多发性骨髓瘤'],
  metastasis: ['骨转移'],
  avn: ['股骨头缺血坏死', '骨坏死'],
  gout: ['痛风'],
  as: ['强直性脊柱炎'],
  tb: ['脊柱结核', '骨关节结核'],
  infect: ['急性骨髓炎', '骨髓炎'],
  septic: ['化脓性关节炎'],
  wrist: ['舟骨骨折', '舟骨'],
  radius: ['桡骨远端骨折', 'Colles'],
  femneck: ['股骨颈骨折'],
  tibplat: ['胫骨平台骨折'],
  patella: ['髌骨骨折'],
  monteggia: ['Monteggia'],
  galeazzi: ['Galeazzi'],
  lisfranc: ['Lisfranc'],
  spondylolysis: ['椎弓峡部裂', '峡部裂'],
  spondylolisthesis: ['滑脱'],
  pvns: ['色素沉着绒毛结节性滑膜炎', 'PVNS', 'TGCT'],
  tgct: ['腱鞘巨细胞瘤', 'TGCT'],
  lipoma: ['脂肪瘤'],
  olecranon: ['尺骨鹰嘴', '鹰嘴骨折'],
  cppd: ['焦磷酸钙', 'CPPD', '软骨钙化'],
  dish: ['弥漫性特发性骨肥厚', 'DISH'],
  tibialshaft: ['胫骨骨折', '胫骨骨干'],
  'ankle-oa': ['踝关节骨关节炎'],
  radialhead: ['桡骨头骨折', '桡骨头'],
};

function keywordsFor(dis, det) {
  const set = new Set();
  const add = s => {
    String(s || '')
      .split(/[/、，,；;（）()\s]+/)
      .map(x => x.trim())
      .filter(x => x.length >= 2 && !/^第.+版$/.test(x))
      .forEach(x => set.add(x));
  };
  add(dis.title);
  add(dis.desc);
  const t = String(dis.title || '');
  if (/损伤$/.test(t)) add(t.replace(/损伤$/, '撕裂'));
  if (/损伤$/.test(t)) add(t.replace(/损伤$/, '断裂'));
  if (/炎$/.test(t)) add(t.replace(/炎$/, ''));
  for (const a of ALIASES[dis.type] || []) add(a);
  const list = [...set];
  list.sort((a, b) => b.length - a.length);
  return list.slice(0, 15);
}

function stripChapter(s) {
  return String(s || '').replace(/^【[^】]+】/, '');
}

function scorePage(text, keywords, boost = []) {
  const hits = keywords.filter(kw => kw && kw.length >= 2 && text.includes(kw));
  if (!hits.length) return 0;
  let score = 0;
  for (const kw of hits) {
    const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const m = text.match(re);
    const weight = boost.includes(kw) ? 3 : 1;
    if (m) score += m.length * Math.min(kw.length, 10) * weight;
  }
  if (/图\s*\d+[-–—]/.test(text)) score *= 0.7;
  return score;
}

function cleanText(t) {
  return String(t || '')
    .replace(/图\s*\d+[-–—]\d+[^\n]*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSentences(text) {
  return cleanText(text)
    .split(/(?<=[。；;])\s*/)
    .map(s => s.trim())
    .filter(
      s =>
        s.length >= 12 &&
        !/^第[一二三四五六七八九十\d]+[章节]/.test(s) &&
        !/【(?:影像|临床|典型)/.test(s) &&
        !/骨肌系统影像诊断/.test(s) &&
        !/^[A-Z]\s*～/.test(s) &&
        !/病例一|病例二/.test(s)
    );
}

function extractImagingKeys(text) {
  const sentences = splitSentences(text);
  const direct = [];
  const indirect = [];
  const combo = [];
  for (const s of sentences) {
    if (/X\s*线|平片|CT|MRI|超声|直接|纤维|骨折线|破坏|高信号|低信号/.test(s)) {
      if (direct.length < 2) direct.push(s);
      else if (indirect.length < 2) indirect.push(s);
      else if (combo.length < 2) combo.push(s);
    }
  }
  while (direct.length < 1 && sentences[0]) direct.push(sentences[0]);
  while (indirect.length < 1 && sentences[1]) indirect.push(sentences[1]);
  while (combo.length < 1 && sentences[2]) combo.push(sentences[2]);
  return [
    ['直接征象', direct[0] || '结合 X 线/CT/MRI 评估主要形态学改变。'],
    ['间接征象', indirect[0] || direct[1] || '注意间接征象与对侧对比。'],
    ['关键组合', combo[0] || '多模态综合判断，避免单模态过度解读。']
  ];
}

function extractOverview(text, keywords) {
  const sentences = splitSentences(text).filter(
    s =>
      !/^[\d一二三四五六七八九十]+[.、．]/.test(s) &&
      !/^【/.test(s) &&
      !/^图\s*\d/.test(s) &&
      s.length <= 200
  );
  const hit = sentences.find(
    s =>
      keywords.some(k => k.length >= 2 && s.includes(k)) &&
      /是|指|为|常见于|好发|属于|一种/.test(s)
  );
  const pick =
    hit ||
    sentences.find(s => keywords.some(k => k.length >= 2 && s.includes(k))) ||
    sentences.find(s => /是.*(损伤|骨折|肿瘤|炎|病|综合征)/.test(s)) ||
    sentences[0];
  return pick ? pick.slice(0, 220) : '';
}

const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const extracts = {};
let matched = 0;

for (const dis of siteData.diseases || []) {
  const det = siteData.diseaseDetails?.[dis.type];
  if (!det) continue;
  const keywords = keywordsFor(dis, det);
  const boost = [...(ALIASES[dis.type] || []), dis.title].filter(Boolean);
  const ranked = pages
    .map(p => ({ page: p.page, text: p.text, score: scorePage(p.text, keywords, boost) }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  if (!ranked.length) {
    extracts[dis.type] = { keywords, matched: false, chapter: mskChapterFor(dis.type, dis.sysCategory) };
    continue;
  }

  matched++;
  const blob = ranked.map(r => r.text).join('\n');
  const overview = extractOverview(blob, keywords);
  const imagingKeys = extractImagingKeys(blob);
  const modalities = [];
  if (/MRI|磁共振/.test(blob)) modalities.push(['MRI', '见书中相关章节影像表现与诊断要点。']);
  if (/CT/.test(blob)) modalities.push(['CT', '骨窗/软组织窗评估骨折、骨破坏及软组织成分。']);
  if (/X\s*线|平片/.test(blob)) modalities.push(['X线', '首选筛查或随访；部分隐匿骨折需 CT/MRI 补充。']);

  extracts[dis.type] = {
    keywords,
    matched: true,
    chapter: mskChapterFor(dis.type, dis.sysCategory),
    pages: ranked.map(r => r.page),
    score: ranked[0].score,
    overview,
    imagingKeys,
    modalities: modalities.length ? modalities : undefined,
    pearl: overview ? `${overview.slice(0, 100)}${overview.length > 100 ? '…' : ''}` : undefined
  };
}

fs.writeFileSync(outPath, JSON.stringify(extracts, null, 2), 'utf8');
console.log('build-pdf-disease-index done');
console.log('  diseases:', Object.keys(extracts).length);
console.log('  matched:', matched);

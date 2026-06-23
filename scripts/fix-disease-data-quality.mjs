/**
 * 疾病描述数据质量修复：缩写误伤、损坏引用、第二批详情重同步、多系统模板优化
 * 运行：node scripts/fix-disease-data-quality.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { fixDetail, fixText } from '../data/abbrev-fix.mjs';
import { normalizeDetail } from './batch2-detail-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');

const SYSTEM_LABELS = {
  respiratory: '呼吸系统',
  digestive: '消化系统',
  circulatory: '循环系统',
  nervous: '神经系统',
  urogenital: '泌尿生殖系统',
  'female-repro': '女性生殖系统与产科',
  endocrine: '内分泌系统',
  'head-neck': '头颈部与五官',
  breast: '乳腺',
  hematolymph: '血液与淋巴系统',
  systemic: '全身性与多系统'
};

function applyOverlay(base, overlay) {
  if (!overlay) return { ...(base || {}) };
  const out = { ...(base || {}) };
  for (const [k, v] of Object.entries(overlay)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      out[k] = v.map(item => (Array.isArray(item) ? [...item] : item));
    } else if (typeof v === 'string' && v.trim()) {
      out[k] = v.trim();
    }
  }
  return out;
}

async function importBlock(filePath) {
  const mod = await import(pathToFileURL(filePath).href);
  return mod.default || mod.CONTENT || {};
}

async function loadBatch23Content() {
  const detailsDir = path.join(root, 'data', 'batch2-details');
  const enrichDir = path.join(detailsDir, 'enrichments');
  const merged = {};

  for (const file of fs.readdirSync(detailsDir)) {
    if (!/\.mjs$/.test(file) || file === 'medical-fixes.mjs') continue;
    const block = await importBlock(path.join(detailsDir, file));
    for (const [type, detail] of Object.entries(block)) {
      merged[type] = { ...detail };
    }
  }

  if (fs.existsSync(enrichDir)) {
    for (const file of fs.readdirSync(enrichDir)) {
      if (!/\.mjs$/.test(file)) continue;
      const block = await importBlock(path.join(enrichDir, file));
      for (const [type, detail] of Object.entries(block)) {
        merged[type] = applyOverlay(merged[type] || {}, detail);
      }
    }
  }

  const varPath = path.join(enrichDir, 'list-variation.mjs');
  if (fs.existsSync(varPath)) {
    const variations = await importBlock(varPath);
    for (const [type, patch] of Object.entries(variations)) {
      merged[type] = applyOverlay(merged[type] || {}, patch);
    }
  }

  return merged;
}

function buildModalities(row, sys) {
  const [, , title, , , , modStr] = row;
  const mods = modStr.split(' · ').map(s => s.trim());
  const list = [];
  const add = (name, text) => {
    if (!list.some(m => m[0] === name)) list.push([name, text]);
  };

  for (const m of mods) {
    if (m === 'X线' || m === '胸片') {
      add('X线', `X线/胸片用于${title}的初步筛查、钙化/骨结构及并发症评估。`);
    } else if (m === 'CT' || m.startsWith('CT(') || m.includes('CTA') || m.includes('CTPA') || m.includes('CT肺') || m.includes('冠脉CTA') || m.includes('心脏CTA') || m.includes('主动脉CTA')) {
      add('CT', `CT/CTA 用于${title}的解剖定位、密度/强化特征、血管形态及急症评估。`);
    } else if (m === 'MRI' || m.includes('MRA') || m.includes('MRCP') || m.includes('MR静脉') || m.includes('CT/MR')) {
      add('MRI', `MRI/MRA 用于${title}的软组织对比、信号特征、扩散/灌注及多平面评估。`);
    } else if (m === '超声' || m.includes('多普勒') || m === 'FAST') {
      add('超声', `超声/多普勒是${title}床旁筛查、囊实性判定、血流评估及引导穿刺的首选模态之一。`);
    } else if (m === 'DSA' || m.includes('DSA')) {
      add('DSA', `DSA 用于${title}的血管解剖、侧支循环及介入治疗路径规划。`);
    } else if (m === 'PET-CT' || m.includes('PET')) {
      add('PET-CT', `PET-CT 用于${title}的代谢活性、分期、疗效评估及转移筛查。`);
    } else if (m === '核素' || m.includes('核素') || m.includes('通气灌注') || m.includes('V/Q') || m.includes('IVU')) {
      add('核素', `核素显像/V-Q/IVU 用于${title}的功能评估、灌注缺损或排泄路径评估。`);
    } else if (m === '钼靶' || m.includes('钼靶')) {
      add('钼靶', `钼靶摄影是${title}筛查与钙化/结构扭曲评估的核心模态。`);
    } else if (m === '内镜' || m.includes('内镜') || m.includes('膀胱镜') || m.includes('结肠镜') || m.includes('支气管镜')) {
      add('内镜', `内镜用于${title}的直接观察、活检及部分腔内治疗。`);
    } else if (m === '心电图') {
      add('心电图', `${title}需结合心电图评估节律、缺血或负荷相关改变。`);
    } else if (m.includes('造影') || m.includes('IVU') || m.includes('钡')) {
      add('造影', `造影检查用于${title}的腔道形态、通过障碍及瘘口评估。`);
    }
  }

  if (sys === 'nervous' && !list.some(m => m[0] === 'MRI')) {
    add('MRI', `MRI 是${title}软组织与信号特征评估的核心模态，建议多序列联合。`);
  }
  if (sys === 'breast' && !list.some(m => m[0] === '钼靶')) {
    add('钼靶', `钼靶与超声/MRI 联合提高${title}检出与 BI-RADS 评估准确率。`);
  }
  if (sys === 'urogenital' && !list.some(m => m[0] === '超声')) {
    add('超声', `超声是${title}初筛与随访的常用模态，可评估囊实性及血流。`);
  }
  return list;
}

function buildSystemDetail(row, navGroups, sys) {
  const [navGroup, , title, , region, , modStr, sev, sevtext, desc, ...signs] = row;
  const navLabel = navGroups[navGroup]?.label || navGroup;
  const sysLabel = SYSTEM_LABELS[sys] || sys;
  const modalities = buildModalities(row, sys);
  const signList = signs.filter(Boolean);
  const signText = signList.join('、');
  const modList = modStr.split(' · ').map(s => s.trim()).filter(Boolean);

  const imagingKeys = [
    ['核心征象', signText || `${title}的典型影像表现应结合${region}解剖与${modList[0] || '多模态'}综合判读`],
    ['定位评估', `${region}为主要受累区域；${navLabel}内需评估范围、分期及并发症`],
    ['关键组合', `${signList[0] || '典型征象'} + 临床背景 → 支持${title}诊断或分型`]
  ];

  const clinical = signList.length
    ? [
        `${title}常见影像相关线索：${signList.slice(0, 3).join('、')}`,
        `病变累及${region}时可出现相应功能障碍，需结合专科查体`,
        sev === 'high' ? '急症或高危表现需紧急评估与多学科处理' : '病程急慢性与并发症有助于判断分期',
        sevtext ? `风险分层：${sevtext}` : null
      ].filter(Boolean)
    : [
        `${title}的临床表现因病因而异，需结合${region}专科评估`,
        `体征与${region}受累相关，应同步评估并发症`,
        sev === 'high' ? '急症或高危表现需紧急评估与多学科处理' : '病程与并发症有助于判断急慢性'
      ];

  const isTumor = /malignant|benign|tumor|癌|瘤|转移/.test(navGroup + title);
  const isVascular = /vascular|cerebrovascular|栓塞|血栓|狭窄|夹层|动脉瘤/.test(navGroup + title);
  const isObstetric = sys === 'female-repro' && navGroup === 'obstetrics';

  return {
    overview: fixText(String(desc || `${title}属于${sysLabel}·${navLabel}。`).trim()),
    epi: fixText(`${title}的流行病学与危险因素因病因而异；${sevtext || '需结合既往史与暴露史'}。`),
    pathophys: fixText(`${title}的病理生理与${navLabel}机制相关，可累及${region}并产生相应影像改变。`),
    clinical: clinical.map(fixText),
    staging: isTumor
      ? '按组织学类型与 TNM/FIGO 等标准分期；增强 CT/MRI/PET-CT 辅助分期。'
      : isObstetric
        ? '按孕周、胎儿生物测量及胎盘/羊水指标分层管理。'
        : isVascular
          ? '按解剖部位、狭窄/闭塞程度及器官灌注/并发症分层。'
          : '按严重程度、器官功能与并发症分层管理。',
    imagingKeys: imagingKeys.map(([k, v]) => [fixText(k), fixText(v)]),
    modalities: modalities.map(([k, v]) => [fixText(k), fixText(v)]),
    mgmt: [
      '针对病因的特异性治疗（药物/手术/介入/放疗等）',
      '并发症处理与器官功能支持',
      '多学科协作（专科、影像、病理）',
      '定期影像随访评估疗效与复发'
    ].map(fixText),
    ddx: [
      `${navLabel}内其他常见疾病`,
      `${sysLabel}相关交叉病变鉴别`,
      '影像非特异表现时的功能/实验室/病理确认'
    ].map(fixText),
    pitfalls: [
      '影像表现可非特异，需结合临床与实验室',
      modStr.includes('超声') ? '超声受声窗/操作者影响，必要时 CT/MRI 补充' : '早期或小病灶可假阴性，必要时重复或换模态',
      isTumor ? '影像定性后仍需病理确诊组织学类型' : '随访间隔需根据风险分层个体化'
    ].map(fixText),
    pearls: [
      `多模态联合（${modList.slice(0, 3).join('/')}）提高${title}检出与分型准确率`,
      `按${navLabel}思路构建鉴别清单`,
      `${sysLabel}疾病应同步评估原发灶与转移/并发症`
    ].map(fixText)
  };
}

function stripBadSources(det) {
  if (!det?.sources || !Array.isArray(det.sources)) return det;
  const bad = det.sources.every(s => String(s).includes('[object Object]') || !String(s).trim());
  if (bad) {
    const { sources, ...rest } = det;
    return rest;
  }
  det.sources = det.sources.map(s => fixText(String(s))).filter(Boolean);
  return det;
}

async function loadCatalogRows(sys, cache) {
  if (cache.has(sys)) return cache.get(sys);
  const catalogPath = path.join(root, 'data', `${sys}-catalog.mjs`);
  if (!fs.existsSync(catalogPath)) return null;
  const mod = await import(pathToFileURL(catalogPath).href);
  const prefix = sys.toUpperCase().replace(/-/g, '_');
  const out = {
    rows: mod[`${prefix}_DISEASE_ROWS`] || [],
    navGroups: mod[`${prefix}_NAV_GROUPS`] || {}
  };
  cache.set(sys, out);
  return out;
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const batch23 = await loadBatch23Content();
const medicalFixes = await importBlock(path.join(root, 'data', 'batch2-details', 'medical-fixes.mjs'));
const catalogCache = new Map();
const stats = {
  abbrevFixed: 0,
  sourcesRemoved: 0,
  batch23Updated: 0,
  systemUpdated: 0,
  cardFixed: 0
};

for (const d of siteData.diseases || []) {
  for (const k of ['title', 'sub', 'region', 'mod', 'desc', 'sevtext']) {
    if (typeof d[k] === 'string') {
      const next = fixText(d[k]);
      if (next !== d[k]) {
        d[k] = next;
        stats.cardFixed++;
      }
    }
  }
  if (Array.isArray(d.signs)) d.signs = d.signs.map(fixText);
}

for (const d of siteData.diseases || []) {
  const batch = Number(d.entryBatch);
  let det = siteData.diseaseDetails?.[d.type];
  if (!det) continue;

  if (batch === 2 || batch === 3) {
    const raw = batch23[d.type];
    if (raw) {
      det = normalizeDetail(d, raw);
      if (medicalFixes[d.type]) det = applyOverlay(det, medicalFixes[d.type]);
      stats.batch23Updated++;
    }
  } else if (batch >= 4 && d.sys) {
    const catalog = await loadCatalogRows(d.sys, catalogCache);
    const row = catalog?.rows?.find(r => r[1] === d.type);
    if (row) {
      det = buildSystemDetail(row, catalog.navGroups, d.sys);
      stats.systemUpdated++;
    }
  }

  const before = JSON.stringify(det);
  det = fixDetail(det);
  det = stripBadSources(det);
  if (JSON.stringify(det) !== before) stats.abbrevFixed++;
  if (!det.sources && before.includes('[object Object]')) stats.sourcesRemoved++;
  siteData.diseaseDetails[d.type] = det;
}

siteData.updatedAt = new Date().toISOString();
fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('fix-disease-data-quality done');
console.log(JSON.stringify(stats, null, 2));

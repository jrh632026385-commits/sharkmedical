/**
 * 通用系统疾病导入（无图库）
 * node scripts/build-system-content.mjs <system-key> [--dry-run]
 * 例: node scripts/build-system-content.mjs nervous
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const dryRun = process.argv.includes('--dry-run');

const SYSTEM_LABELS = {
  nervous: '神经系统',
  urogenital: '泌尿生殖系统',
  'female-repro': '女性生殖系统与产科',
  endocrine: '内分泌系统',
  'head-neck': '头颈部与五官',
  breast: '乳腺',
  hematolymph: '血液与淋巴系统',
  systemic: '全身性与多系统'
};

const BATCH_LABELS = {
  nervous: '第七批录入（神经系统）',
  urogenital: '第七批录入（泌尿生殖）',
  'female-repro': '第七批录入（女性生殖）',
  endocrine: '第七批录入（内分泌）',
  'head-neck': '第七批录入（头颈五官）',
  breast: '第七批录入（乳腺）',
  hematolymph: '第七批录入（血液淋巴）',
  systemic: '第七批录入（全身多系统）'
};

function sysKeyToConst(sys) {
  return sys.toUpperCase().replace(/-/g, '_');
}

async function loadCatalog(sys) {
  const catalogPath = path.join(root, 'data', `${sys}-catalog.mjs`);
  if (!fs.existsSync(catalogPath)) throw new Error(`catalog not found: ${catalogPath}`);
  return import(pathToFileURL(catalogPath).href);
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
      add('心电图', `${title}需结合心电图评估节律、缺血或负荷相关改变（循环系统适用）。`);
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

function buildDetail(row, navGroups, sys) {
  const [navGroup, , title, sub, region, , modStr, sev, sevtext, desc, ...signs] = row;
  const navLabel = navGroups[navGroup]?.label || navGroup;
  const sysLabel = SYSTEM_LABELS[sys] || sys;
  const modalities = buildModalities(row, sys);
  const imagingKeys = [
    ['核心征象', signs.slice(0, 2).join('；') || desc.slice(0, 48)],
    ['分布特点', `${region}受累，${navLabel}常见表现；结合临床与实验室综合判断。`],
    ['关键组合', `${signs[0] || '典型影像'} + 临床背景 → 支持${title}诊断或分型。`]
  ];
  const clinical = [
    `${title}常见${sysLabel}相关症状（依病因而异）`,
    `体征与${region}受累相关，需结合病史与专科查体`,
    sev === 'high' ? '急症或高危表现需紧急评估与多学科处理' : '病程与并发症有助于判断急慢性'
  ];
  if (signs.length) clinical.push(`影像线索：${signs.join('、')}`);
  const isTumor = /malignant|benign|tumor|癌|瘤|转移/.test(navGroup + title);
  const isVascular = /vascular|cerebrovascular|栓塞|血栓|狭窄|夹层|动脉瘤/.test(navGroup + title);
  const isObstetric = sys === 'female-repro' && navGroup === 'obstetrics';
  return {
    overview: `${title}（${sub}）属于${sysLabel}·${navLabel}。${desc}`,
    epi: `${title}的流行病学与危险因素因病因而异；${sevtext}。需结合既往史、家族史与暴露史。`,
    pathophys: `${title}的病理生理与${navLabel}机制相关，可累及${region}并产生相应影像改变。`,
    clinical,
    staging: isTumor ? '按组织学类型与 TNM/FIGO 等标准分期；增强 CT/MRI/PET-CT 辅助分期。' : isObstetric ? '按孕周、胎儿生物测量及胎盘/羊水指标分层管理。' : isVascular ? '按解剖部位、狭窄/闭塞程度及器官灌注/并发症分层。' : '按严重程度、器官功能与并发症分层管理。',
    imagingKeys,
    modalities,
    mgmt: [
      '针对病因的特异性治疗（药物/手术/介入/放疗等）',
      '并发症处理与器官功能支持',
      '多学科协作（专科、影像、病理）',
      '定期影像随访评估疗效与复发'
    ],
    ddx: [
      `${navLabel}内其他常见疾病`,
      `${sysLabel}交叉病变鉴别`,
      '影像非特异表现时的功能/实验室/病理确认'
    ],
    pitfalls: [
      '影像表现可非特异，需结合临床与实验室',
      modStr.includes('超声') ? '超声受声窗/操作者影响，必要时 CT/MRI 补充' : '早期或小病灶可假阴性，必要时重复或换模态',
      isTumor ? '影像定性后仍需病理确诊组织学类型' : '随访间隔需根据风险分层个体化'
    ],
    pearls: [
      `多模态联合（${modStr.split(' · ').slice(0, 3).join('/')}）提高${title}检出与分型准确率`,
      `按${navLabel}思路构建鉴别清单`,
      `${sysLabel}疾病应同步评估原发灶与转移/并发症`
    ]
  };
}

function mapZone(row, sys) {
  const [navGroup] = row;
  const zoneMap = {
    cerebrovascular: 'cerebrovascular', 'intracranial-tumor': 'intracranial',
    'infection-inflammation': 'infection', demyelination: 'white-matter',
    neurodegeneration: 'degeneration', 'head-trauma': 'trauma', congenital: 'congenital',
    'spine-cord': 'spine', kidney: 'kidney', ureter: 'ureter', bladder: 'bladder',
    'urethra-prostate': 'prostate', 'male-genital': 'testis', adrenal: 'adrenal',
    uterus: 'uterus', ovary: 'ovary', 'fallopian-pelvis': 'pelvis', obstetrics: 'obstetric',
    thyroid: 'thyroid', parathyroid: 'parathyroid', 'pituitary-hypothalamus': 'pituitary',
    'pancreatic-endocrine': 'endocrine-bone', 'eye-orbit': 'orbit', 'ear-temporal': 'ear',
    'nose-sinus': 'sinus', 'pharynx-oral': 'pharynx', salivary: 'salivary', 'neck-jaw': 'neck',
    benign: 'benign', inflammation: 'inflammation', malignant: 'malignant',
    lymphoma: 'lymphoma', 'myeloid-plasma': 'myeloid', 'anemia-bone': 'anemia-bone',
    'spleen-reticulo': 'spleen', lymphatic: 'lymphatic', metastasis: 'metastasis',
    granulomatous: 'granuloma', 'metabolic-deposit': 'metabolic', connective: 'connective',
    'disseminated-infection': 'infection', 'hereditary-tumor': 'hereditary'
  };
  return zoneMap[navGroup] || sys;
}

function rowToDisease(row, sys, batch) {
  const [navGroup, type, title, , region, subcat, mod, sev, sevtext, desc, ...signs] = row;
  return {
    title,
    sub: sevtext,
    type,
    region,
    mod,
    cat: navGroup,
    subcat,
    zone: mapZone(row, sys),
    sev,
    sevtext,
    desc,
    signs,
    sys,
    navGroup,
    entryBatch: batch,
    entryBatchLabel: BATCH_LABELS[sys] || `第七批录入（${sys}）`
  };
}

const sys = process.argv.slice(2).find(a => !a.startsWith('--') && SYSTEM_LABELS[a]);
if (!sys) {
  console.error('Usage: node scripts/build-system-content.mjs <system-key> [--dry-run]');
  console.error('Keys:', Object.keys(SYSTEM_LABELS).join(', '));
  process.exit(1);
}

const constPrefix = sysKeyToConst(sys);
const catalog = await loadCatalog(sys);
const NAV_GROUPS = catalog[`${constPrefix}_NAV_GROUPS`];
const NAV_ORDER = catalog[`${constPrefix}_NAV_ORDER`];
const DISEASE_ROWS = catalog[`${constPrefix}_DISEASE_ROWS`];

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const existingTypes = new Set((siteData.diseases || []).map(d => d.type));
const galleries = { ...(siteData.diseaseGalleries || {}) };
const taxByType = { ...(siteData.taxByType || {}) };
const diseaseDetails = { ...(siteData.diseaseDetails || {}) };
const detailsExport = {};

let added = 0;
let skipped = 0;

for (const row of DISEASE_ROWS) {
  const type = row[1];
  if (existingTypes.has(type)) {
    skipped++;
    continue;
  }
  const disease = rowToDisease(row, sys, 7);
  siteData.diseases.push(disease);
  existingTypes.add(type);
  taxByType[type] = { cat: disease.cat, subcat: disease.subcat, zone: disease.zone };
  if (!galleries[type]) galleries[type] = [];
  diseaseDetails[type] = buildDetail(row, NAV_GROUPS, sys);
  detailsExport[type] = diseaseDetails[type];
  added++;
}

siteData.diseaseGalleries = galleries;
siteData.taxByType = taxByType;
siteData.diseaseDetails = diseaseDetails;
siteData[`${constPrefix}_NAV_GROUPS`] = NAV_GROUPS;
siteData[`${constPrefix}_NAV_ORDER`] = NAV_ORDER;
const sysCount = siteData.diseases.filter(d => d.sys === sys).length;
if (siteData.SYS_GROUPS?.[sys]) {
  const modHint = sys === 'breast' ? '钼靶 · 超声 · MRI' : sys === 'nervous' ? 'CT · MRI · DSA' : '多模态影像';
  siteData.SYS_GROUPS[sys].desc = `${sysCount} 种${SYSTEM_LABELS[sys]}疾病 · ${modHint}`;
}
siteData.updatedAt = new Date().toISOString();

const detailsOutPath = path.join(root, 'data', 'batch2-details', `${sys}.mjs`);
const detailsFileContent = `/** ${SYSTEM_LABELS[sys]}疾病详情 · 自动生成 */\nexport default ${JSON.stringify(detailsExport, null, 2)};\n`;

console.log(`build-system-content ${sys}`, dryRun ? '(dry-run)' : 'done');
console.log('  added:', added, 'skipped (exists):', skipped);
console.log('  catalog rows:', DISEASE_ROWS.length);
console.log('  total diseases:', siteData.diseases.length);
console.log(`  ${sys}:`, sysCount);

if (!dryRun) {
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  if (Object.keys(detailsExport).length) {
    fs.writeFileSync(detailsOutPath, detailsFileContent, 'utf8');
    console.log('  wrote:', detailsOutPath);
  }
  console.log('  wrote:', dataPath);
}

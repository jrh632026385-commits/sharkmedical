/**
 * 导入消化系统疾病与详情（无图库）
 * node scripts/build-digestive-content.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DIGESTIVE_NAV_GROUPS,
  DIGESTIVE_NAV_ORDER,
  DIGESTIVE_DISEASE_ROWS
} from '../data/digestive-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const detailsOutPath = path.join(root, 'data', 'batch2-details', 'digestive.mjs');
const dryRun = process.argv.includes('--dry-run');

const ENDOSCOPY_NAV = new Set([
  'oral-salivary', 'esophagus', 'stomach-duodenum', 'colorectal-appendix',
  'anorectal', 'small-bowel'
]);

function mapZone(navGroup, region) {
  if (['oral-salivary', 'esophagus', 'stomach-duodenum'].includes(navGroup)) return 'upper';
  if (['small-bowel'].includes(navGroup)) return 'mid';
  if (['colorectal-appendix', 'anorectal'].includes(navGroup)) return 'lower';
  if (navGroup === 'liver') return 'liver';
  if (navGroup === 'biliary') return 'hepatobiliary';
  if (navGroup === 'pancreas') return 'pancreas';
  if (navGroup === 'spleen') return 'spleen';
  if (navGroup === 'peritoneum') return 'peritoneum';
  if (region.includes('肝') && navGroup === 'infection-parasite') return 'liver';
  return 'general';
}

function buildModalities(row) {
  const [navGroup, , title, , , , modStr] = row;
  const mods = modStr.split(' · ').map(s => s.trim());
  const list = [];
  const add = (name, text) => {
    if (!list.some(m => m[0] === name)) list.push([name, text]);
  };
  for (const m of mods) {
    if (m === 'X线') add('X线', `腹部/胸部 X 线用于${title}的急腹症筛查、气腹、肠梗阻或钙化评估；必要时多体位或对比既往片。`);
    else if (m === 'CT') add('CT', `增强/多期 CT 是${title}解剖定位、并发症与分期评估的核心模态，可评估实质脏器、肠壁及血管。`);
    else if (m === 'MRI') add('MRI', `MRI/MRCP 用于${title}的软组织对比、胆胰管解剖或特定场景（如肝局灶病变、直肠分期）评估。`);
    else if (m === '超声') add('超声', `床旁或经腹/经直肠超声可用于${title}的积液、肿块、胆道扩张评估，并引导穿刺引流。`);
    else if (m === 'PET-CT') add('PET-CT', `PET-CT 用于${title}的代谢活性评估、肿瘤分期与疗效监测。`);
    else if (m === '核素') add('核素', `核素显像用于${title}的功能或出血/感染灶定位。`);
    else if (m === '内镜') add('内镜', `胃镜/结肠镜/ERCP/EUS 等内镜可直接观察${title}相关黏膜与腔道，活检、止血、扩张或引流。`);
    else if (m === '上消化道造影') add('上消化道造影', `钡餐/碘水造影评估${title}的腔道形态、通过障碍、瘘口或疝；动态观察蠕动与反流。`);
    else if (m === '钡灌肠') add('钡灌肠', `钡灌肠/CT 结肠成像用于${title}的大肠轮廓、狭窄、扭转或息肉样病变评估。`);
    else if (m === '测压') add('测压', `高分辨率食管/肛门测压用于${title}的动力障碍分型与手术/介入规划。`);
    else if (m === '活检') add('活检', `内镜或影像引导活检是${title}组织学确诊与分子检测的关键步骤。`);
    else if (m === 'ERCP') add('ERCP', `ERCP 用于${title}的胆胰管显影、取石、支架置入与细胞学刷检。`);
    else if (m === 'FAST') add('FAST', `FAST 床旁超声快速评估${title}相关腹腔游离液体与实质脏器损伤。`);
    else if (m === 'CTA' || m === '血管成像') add('CT', `CTA/血管成像用于${title}的血管闭塞、栓塞或动脉瘤评估。`);
    else if (m === '腹腔镜') add('CT', `腹腔镜/CT 联合用于${title}的腹膜病变评估与活检取样。`);
    else if (m === '造影') add('上消化道造影', `造影检查用于${title}的腔道通过性、梗阻点与瘘口评估。`);
  }
  if (ENDOSCOPY_NAV.has(navGroup) && !list.some(m => m[0] === '内镜')) {
    add('内镜', `消化内镜（胃镜/肠镜/ERCP/EUS 等）有助于${title}的直接可视化、取样与部分腔内治疗。`);
  }
  return list;
}

function buildDetail(row) {
  const [navGroup, , title, sub, region, , modStr, sev, sevtext, desc, ...signs] = row;
  const navLabel = DIGESTIVE_NAV_GROUPS[navGroup]?.label || navGroup;
  const modalities = buildModalities(row);
  const imagingKeys = [
    ['核心征象', signs.slice(0, 2).join('；') || desc.slice(0, 40)],
    ['分布特点', `${region}受累，${navLabel}常见表现模式；结合临床、实验室与内镜综合判断。`],
    ['关键组合', `${signs[0] || '典型影像'} + 临床背景 → 支持${title}诊断或分型。`]
  ];
  const clinical = [
    `${title}常见消化系统症状（腹痛、呕吐、腹泻、黄疸、便血等，依病因而异）`,
    `体征与${region}受累相关，需结合腹膜刺激征、肠鸣音与生命体征`,
    sev === 'high' ? '重症或急腹症需紧急评估与多学科处理' : '病程、营养状态与并发症有助于判断急慢性'
  ];
  if (signs.length) clinical.push(`影像/内镜线索：${signs.join('、')}`);
  const isTumor = /tumor|malignant|benign|cancer|carcinoma|腺瘤|癌/.test(navGroup + title);
  const isInfection = /infection|infect|parasite|脓肿|炎/.test(navGroup + title);
  return {
    overview: `${title}（${sub}）属于${navLabel}。${desc}`,
    epi: `${title}的流行病学与危险因素因病因而异；${sevtext}。需结合饮食史、用药史、旅行史与基础疾病。`,
    pathophys: `${title}的病理生理与${navLabel}机制相关，可累及${region}并产生相应影像与内镜可见改变。`,
    clinical,
    staging: isTumor ? '按 TNM 与组织学类型分期；增强 CT/MRI/PET-CT 与内镜/EUS 辅助分期。' : isInfection ? '按病原、严重度与并发症分层；影像/内镜动态随访活动性。' : '按严重程度、营养状态与并发症分层管理。',
    imagingKeys,
    modalities,
    mgmt: [
      '针对病因的特异性治疗（抗感染、免疫调节、手术/介入/内镜等）',
      '营养支持、液体复苏与并发症处理',
      '多学科协作（消化内科、普外、影像、病理）',
      '定期影像/内镜随访评估疗效与复发'
    ],
    ddx: [
      `${navLabel}内其他常见疾病`,
      '炎症、肿瘤与功能/动力障碍交叉',
      '急腹症病因鉴别（必要时急诊 CT/内镜）'
    ],
    pitfalls: [
      '影像表现非特异，需结合临床、实验室与内镜',
      modStr.includes('内镜') ? '内镜操作需评估出血/穿孔风险与肠道准备' : '早期影像可假阴性，必要时 CT/MRI/内镜',
      '治疗反应不佳时应复查影像并重新评估诊断'
    ],
    pearls: [
      `多模态联合（CT/MRI/超声+内镜）提高${title}检出率`,
      ENDOSCOPY_NAV.has(navGroup) ? '内镜+横断面影像互补：腔内外病变一并评估' : '超声/CT 快速评估急腹症与实质脏器',
      `按${navLabel}思路构建鉴别清单`
    ]
  };
}

function rowToDisease(row) {
  const [navGroup, type, title, , region, subcat, mod, sev, sevtext, desc, ...signs] = row;
  return {
    title,
    sub: sevtext,
    type,
    region,
    mod,
    cat: navGroup,
    subcat,
    zone: mapZone(navGroup, region),
    sev,
    sevtext,
    desc,
    signs,
    sys: 'digestive',
    navGroup,
    entryBatch: 5,
    entryBatchLabel: '消化系统录入'
  };
}

const siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const existingTypes = new Set((siteData.diseases || []).map(d => d.type));
const galleries = { ...(siteData.diseaseGalleries || {}) };
const taxByType = { ...(siteData.taxByType || {}) };
const diseaseDetails = { ...(siteData.diseaseDetails || {}) };
const detailsExport = {};

let added = 0;
let skipped = 0;

for (const row of DIGESTIVE_DISEASE_ROWS) {
  const type = row[1];
  if (existingTypes.has(type)) {
    skipped++;
    continue;
  }
  const disease = rowToDisease(row);
  siteData.diseases.push(disease);
  existingTypes.add(type);
  taxByType[type] = { cat: disease.cat, subcat: disease.subcat, zone: disease.zone };
  if (!galleries[type]) galleries[type] = [];
  diseaseDetails[type] = buildDetail(row);
  detailsExport[type] = diseaseDetails[type];
  added++;
}

siteData.diseaseGalleries = galleries;
siteData.taxByType = taxByType;
siteData.diseaseDetails = diseaseDetails;
siteData.DIGESTIVE_NAV_GROUPS = DIGESTIVE_NAV_GROUPS;
siteData.DIGESTIVE_NAV_ORDER = DIGESTIVE_NAV_ORDER;
if (siteData.SYS_GROUPS?.digestive) {
  siteData.SYS_GROUPS.digestive.desc = `${siteData.diseases.filter(d => d.sys === 'digestive').length} 种消化与腹部疾病 · 多模态与内镜`;
}
siteData.updatedAt = new Date().toISOString();

const detailsFileContent = `/** 消化系统疾病详情 · 自动生成（含内镜等多模态） */\nexport default ${JSON.stringify(detailsExport, null, 2)};\n`;

console.log('build-digestive-content', dryRun ? '(dry-run)' : 'done');
console.log('  added:', added, 'skipped (exists):', skipped);
console.log('  catalog rows:', DIGESTIVE_DISEASE_ROWS.length);
console.log('  total diseases:', siteData.diseases.length);
console.log('  digestive:', siteData.diseases.filter(d => d.sys === 'digestive').length);

if (!dryRun) {
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(detailsOutPath, detailsFileContent, 'utf8');
  console.log('  wrote:', dataPath);
  console.log('  wrote:', detailsOutPath);
}

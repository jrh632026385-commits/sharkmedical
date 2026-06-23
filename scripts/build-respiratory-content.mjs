/**
 * 导入呼吸系统疾病与详情（无图库）
 * node scripts/build-respiratory-content.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  RESPIRATORY_NAV_GROUPS,
  RESPIRATORY_NAV_ORDER,
  RESPIRATORY_DISEASE_ROWS
} from '../data/respiratory-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const detailsOutPath = path.join(root, 'data', 'batch2-details', 'respiratory.mjs');
const dryRun = process.argv.includes('--dry-run');

const ENDOSCOPY_NAV = new Set([
  'upper-airway', 'central-airway', 'infection', 'chronic-airway', 'tumor', 'trauma-iatrogenic'
]);

function buildModalities(row) {
  const [navGroup, , title, , , , modStr] = row;
  const mods = modStr.split(' · ').map(s => s.trim());
  const list = [];
  const add = (name, text) => {
    if (!list.some(m => m[0] === name)) list.push([name, text]);
  };
  for (const m of mods) {
    if (m === 'X线') add('X线', `胸片/DR 评估${title}的整体分布、实变、气胸或纵隔改变；必要时多体位或对比既往片。`);
    else if (m === 'CT') add('CT', `高分辨 CT 是${title}解剖定位与征象细节的核心模态，可评估小叶/段/叶受累及并发症。`);
    else if (m === 'MRI') add('MRI', `MRI 用于${title}的软组织对比、纵隔/胸壁侵犯或特定场景（如 PAVM、LAM）评估。`);
    else if (m === '超声') add('超声', `床旁超声可用于${title}的胸腔积液、气胸或膈肌运动评估，并引导穿刺。`);
    else if (m === 'PET-CT') add('PET-CT', `PET-CT 用于${title}的代谢活性评估、分期与疗效监测。`);
    else if (m === '核素') add('核素', `V/Q 扫描或肺灌注显像用于${title}的功能/灌注评估。`);
    else if (m === '内镜') add('内镜', `纤维/电子支气管镜或上消化道内镜直接观察${title}相关气道/上呼吸道黏膜，可取活检、刷检或介入治疗。`);
  }
  if (ENDOSCOPY_NAV.has(navGroup) && !list.some(m => m[0] === '内镜')) {
    add('内镜', `支气管镜/喉镜等内镜检查有助于${title}的直接可视化、狭窄评估、取样与部分腔内治疗。`);
  }
  return list;
}

function buildDetail(row) {
  const [navGroup, type, title, sub, region, subcat, modStr, sev, sevtext, desc, ...signs] = row;
  const navLabel = RESPIRATORY_NAV_GROUPS[navGroup]?.label || navGroup;
  const modalities = buildModalities(row);
  const imagingKeys = [
    ['核心征象', signs.slice(0, 2).join('；') || desc.slice(0, 40)],
    ['分布特点', `${region}受累，${navLabel}常见表现模式；结合临床与化验综合判断。`],
    ['关键组合', `${signs[0] || '典型影像'} + 临床背景 → 支持${title}诊断或分型。`]
  ];
  const clinical = [
    `${title}常见呼吸系统症状（咳嗽、呼吸困难、胸痛等，依病因而异）`,
    `体征与${region}受累相关，需结合听诊、血氧与生命体征`,
    sev === 'high' ? '重症或急症表现需紧急评估与处理' : '病程与活动耐量有助于判断急慢性'
  ];
  if (signs.length) clinical.push(`影像/内镜线索：${signs.join('、')}`);
  return {
    overview: `${title}（${sub}）属于${navLabel}。${desc}`,
    epi: `${title}的流行病学与危险因素因病因而异；${sevtext}。临床评估需结合暴露史、基础病与免疫状态。`,
    pathophys: `${title}的病理生理与${navLabel}机制相关，可累及${region}并产生相应影像与内镜可见改变。`,
    clinical,
    staging: navGroup === 'tumor' ? '按 TNM 与组织学类型分期；PET-CT 辅助分期。' : navGroup === 'infection' ? '按病原、严重度与并发症分层；活动性感染需动态影像随访。' : '按严重程度、肺功能与并发症分层管理。',
    imagingKeys,
    modalities,
    mgmt: [
      '针对病因的特异性治疗（抗感染、免疫抑制、手术/介入等）',
      '氧疗、呼吸支持与并发症处理',
      '多学科协作（呼吸科、胸外、影像、病理）',
      '定期影像/内镜随访评估疗效与复发'
    ],
    ddx: [
      `${navLabel}内其他常见疾病`,
      '感染性与非感染性病因交叉',
      '肿瘤与良性病变鉴别（必要时活检）'
    ],
    pitfalls: [
      '影像表现非特异，需结合临床与实验室',
      modStr.includes('内镜') ? '内镜操作需评估气道安全与出血风险' : '早期胸片可假阴性，必要时 CT/内镜',
      '治疗反应不佳时应复查影像并重新评估诊断'
    ],
    pearls: [
      `HRCT/多模态联合提高${title}检出率`,
      ENDOSCOPY_NAV.has(navGroup) ? '内镜+影像互补：腔内外病变一并评估' : '超声床旁快速评估气胸/积液',
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
    zone: region.includes('上') || navGroup === 'upper-airway' ? 'upper' : region.includes('纵隔') ? 'mediastinum' : region.includes('胸膜') ? 'pleura' : 'lung',
    sev,
    sevtext,
    desc,
    signs,
    sys: 'respiratory',
    navGroup,
    entryBatch: 4,
    entryBatchLabel: '呼吸系统录入'
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

for (const row of RESPIRATORY_DISEASE_ROWS) {
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
siteData.SYS_GROUPS = siteData.SYS_GROUPS || {};
siteData.RESPIRATORY_NAV_GROUPS = RESPIRATORY_NAV_GROUPS;
siteData.RESPIRATORY_NAV_ORDER = RESPIRATORY_NAV_ORDER;
siteData.updatedAt = new Date().toISOString();

const detailsFileContent = `/** 呼吸系统疾病详情 · 自动生成（含内镜等多模态） */\nexport default ${JSON.stringify(detailsExport, null, 2)};\n`;

console.log('build-respiratory-content', dryRun ? '(dry-run)' : 'done');
console.log('  added:', added, 'skipped (exists):', skipped);
console.log('  total diseases:', siteData.diseases.length);
console.log('  respiratory:', siteData.diseases.filter(d => d.sys === 'respiratory').length);

if (!dryRun) {
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(detailsOutPath, detailsFileContent, 'utf8');
  console.log('  wrote:', dataPath);
  console.log('  wrote:', detailsOutPath);
}

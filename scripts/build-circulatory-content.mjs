/**
 * 导入循环系统疾病与详情（无图库，含心电图等多模态）
 * node scripts/build-circulatory-content.mjs [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CIRCULATORY_NAV_GROUPS,
  CIRCULATORY_NAV_ORDER,
  CIRCULATORY_DISEASE_ROWS
} from '../data/circulatory-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-data.json');
const detailsOutPath = path.join(root, 'data', 'batch2-details', 'circulatory.mjs');
const dryRun = process.argv.includes('--dry-run');

function mapZone(navGroup) {
  const zoneMap = {
    'coronary-ischemic': 'coronary',
    cardiomyopathy: 'myocardium',
    valve: 'valve',
    pericardium: 'pericardium',
    'cardiac-tumor': 'cardiac',
    congenital: 'congenital',
    aortic: 'aorta',
    'pulmonary-vascular': 'pulmonary',
    'peripheral-arterial': 'peripheral',
    venous: 'venous',
    'heart-failure': 'heart'
  };
  return zoneMap[navGroup] || 'heart';
}

function buildModalities(row) {
  const [, , title, , , , modStr] = row;
  const mods = modStr.split(' · ').map(s => s.trim());
  const list = [];
  const add = (name, text) => {
    if (!list.some(m => m[0] === name)) list.push([name, text]);
  };
  for (const m of mods) {
    if (m === '心电图') {
      add('心电图', `${title}的心电图评估节律、传导、缺血/梗死、负荷变化及心律失常线索；与超声、MRI 及冠脉/肺血管影像互补。`);
    } else if (m.includes('冠脉CTA') || m === '心脏CTA') {
      add('CT', `冠脉/心脏 CTA 用于${title}的冠脉解剖、斑块性质、狭窄率与先天/术后解剖评估；低心率扫描与钙化积分辅助风险分层。`);
    } else if (m.includes('心脏MRI')) {
      add('MRI', `心脏 MRI（含延迟强化、T1/T2 mapping、首过灌注）是${title}组织定征、瘢痕/水肿、心肌病分型与肿瘤鉴别的核心模态。`);
    } else if (m === 'SPECT' || m.includes('SPECT')) {
      add('核素', `SPECT/PET 心肌灌注显像用于${title}的可逆/固定灌注缺损、负荷-静息对比及存活心肌评估。`);
    } else if (m === 'DSA' || m.includes('DSA')) {
      add('DSA', `DSA 冠脉/外周动脉造影是${title}有创评估金标准，可测量狭窄、指导 PCI/取栓并评估侧支循环。`);
    } else if (m.includes('超声心动图') || m === '超声') {
      add('超声', `超声心动图（经胸/经食管）是${title}结构、瓣膜、心功能与血流动力学评估的首选床旁模态。`);
    } else if (m === 'CT' || m.includes('CT(')) {
      add('CT', `心脏/胸腹 CT 用于${title}的钙化、解剖、TAVR 术前瓣环测量或外周/主动脉病变评估。`);
    } else if (m.includes('主动脉CTA') || m === 'CTA') {
      add('CT', `CTA 用于${title}的血管解剖、狭窄/闭塞、动脉瘤尺寸与夹层真假腔评估。`);
    } else if (m === 'MRA') {
      add('MRI', `MRA 无对比或增强 MRA 用于${title}的主动脉、颈动脉、肾动脉及外周血管形态评估。`);
    } else if (m === 'CTPA' || m.includes('CT肺动脉')) {
      add('CT', `CT 肺动脉造影（CTPA）是${title}肺动脉充盈缺损、截断与右心负荷评估的一线检查。`);
    } else if (m.includes('肺通气灌注') || m === '核素') {
      add('核素', `肺通气/灌注扫描（V/Q）用于${title}的不匹配灌注、CTEPH 筛查及孕妇/碘过敏替代方案。`);
    } else if (m.includes('多普勒') || m === '多普勒超声') {
      add('超声', `多普勒超声用于${title}的静脉不可压、动脉狭窄、盗血及外周 ABI/波形评估。`);
    } else if (m.includes('静脉成像') || m.includes('CT/MR')) {
      add('CT', `CT/MR 静脉成像用于${title}的深静脉、腔静脉、门静脉及侧支回流路径评估。`);
    } else if (m === 'X线' || m === '胸片') {
      add('X线', `胸片用于${title}心影大小、肺淤血/水肿、胸腔积液及主动脉轮廓初步评估。`);
    }
  }
  if (!list.some(m => m[0] === '心电图') && modStr.includes('心电图')) {
    add('心电图', `${title}需结合心电图评估节律、缺血或负荷相关 ST-T 改变。`);
  }
  return list;
}

function buildDetail(row) {
  const [navGroup, , title, sub, region, , modStr, sev, sevtext, desc, ...signs] = row;
  const navLabel = CIRCULATORY_NAV_GROUPS[navGroup]?.label || navGroup;
  const modalities = buildModalities(row);
  const imagingKeys = [
    ['核心征象', signs.slice(0, 2).join('；') || desc.slice(0, 48)],
    ['分布特点', `${region}受累，${navLabel}典型表现；结合超声/MRI/CTA 与心电图综合判断。`],
    ['关键组合', `${signs[0] || '典型影像'} + 心电图/超声 → 支持${title}诊断或危险分层。`]
  ];
  const clinical = [
    `${title}常见循环/心血管症状（胸痛、气促、水肿、晕厥、跛行等，依病因而异）`,
    `体征与${region}及血流动力学相关，需结合血压、心率、杂音与周围灌注`,
    sev === 'high' ? '急症或高危表现需紧急评估与多学科处理' : '病程、危险因素与并发症有助于判断急慢性'
  ];
  if (signs.length) clinical.push(`影像/心电图线索：${signs.join('、')}`);
  const isTumor = /tumor|malignant|metastasis|肉瘤|转移/.test(navGroup + title);
  const isVascular = /coronary|aortic|pulmonary|peripheral|venous|embolism|dissection/.test(navGroup + title);
  return {
    overview: `${title}（${sub}）属于${navLabel}。${desc}`,
    epi: `${title}的流行病学与危险因素因病因而异；${sevtext}。需结合高血压、糖尿病、吸烟、家族史与既往心血管病史。`,
    pathophys: `${title}的病理生理与${navLabel}机制相关，可累及${region}并产生相应影像、超声与心电图改变。`,
    clinical,
    staging: isTumor ? '按组织学类型与转移范围分期；心脏 MRI/CT 与超声评估腔内外侵犯。' : isVascular ? '按解剖部位、狭窄/夹层分型及器官灌注/右心负荷分层；遵循相应指南（如 Stanford 夹层、NASCET 颈动脉）。' : '按 NYHA/ACC 心功能、瓣膜程度或心衰分型分层管理。',
    imagingKeys,
    modalities,
    mgmt: [
      '针对病因的特异性治疗（抗栓/抗凝、血运重建、瓣膜/介入、手术等）',
      '血流动力学支持与并发症处理（利尿、正性肌力、机械循环等）',
      '多学科协作（心内、心外、影像、血管外科）',
      '定期超声/MRI/CTA 及心电图随访评估疗效与复发'
    ],
    ddx: [
      `${navLabel}内其他常见疾病`,
      '缺血、心肌病、瓣膜与心包病变交叉',
      '血管急症与功能性/心电图改变鉴别'
    ],
    pitfalls: [
      '影像与心电图表现可非特异，需结合临床与实验室',
      modStr.includes('超声') ? '超声受声窗限制，TEE/MRI/CTA 补充评估' : '早期 CTA/MRI 可假阴性，必要时重复或换模态',
      '抗凝/抗血小板决策需权衡出血与栓塞风险'
    ],
    pearls: [
      `多模态联合（超声/MRI/CTA+心电图）提高${title}检出与分型准确率`,
      modStr.includes('心电图') ? '心电图与影像同步解读：缺血、负荷、心律失常与结构异常互补' : '床旁超声优先评估血流动力学与急症',
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
    zone: mapZone(navGroup),
    sev,
    sevtext,
    desc,
    signs,
    sys: 'circulatory',
    navGroup,
    entryBatch: 6,
    entryBatchLabel: '循环系统录入'
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

for (const row of CIRCULATORY_DISEASE_ROWS) {
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
siteData.CIRCULATORY_NAV_GROUPS = CIRCULATORY_NAV_GROUPS;
siteData.CIRCULATORY_NAV_ORDER = CIRCULATORY_NAV_ORDER;
const circCount = siteData.diseases.filter(d => d.sys === 'circulatory').length;
if (siteData.SYS_GROUPS?.circulatory) {
  siteData.SYS_GROUPS.circulatory.desc = `${circCount} 种循环与心血管疾病 · 多模态与心电图`;
}
siteData.updatedAt = new Date().toISOString();

const detailsFileContent = `/** 循环系统疾病详情 · 自动生成（含心电图等多模态） */\nexport default ${JSON.stringify(detailsExport, null, 2)};\n`;

console.log('build-circulatory-content', dryRun ? '(dry-run)' : 'done');
console.log('  added:', added, 'skipped (exists):', skipped);
console.log('  catalog rows:', CIRCULATORY_DISEASE_ROWS.length);
console.log('  total diseases:', siteData.diseases.length);
console.log('  circulatory:', circCount);

if (!dryRun) {
  fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
  fs.writeFileSync(detailsOutPath, detailsFileContent, 'utf8');
  console.log('  wrote:', dataPath);
  console.log('  wrote:', detailsOutPath);
}

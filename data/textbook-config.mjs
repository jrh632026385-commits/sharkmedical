/**
 * 四本参考书配置（桌面 PDF）
 */
export const SOURCE_BOOKS = [
  {
    id: 'musculoskeletal-imaging',
    title: '骨肌系统影像诊断',
    cite: '《骨肌系统影像诊断》',
    editors: '郭锬、董越、焦晟主编',
    publisher: '科学出版社',
    year: '2025',
    isbn: '978-7-03-080200-2',
    file: 'C:/Users/Administrator/Desktop/9787030802002_000020290283_15600470.pdf',
    textExtractable: true
  },
  {
    id: 'bones-joints-imaging',
    title: '骨与关节影像诊断学',
    cite: '《骨与关节影像诊断学》',
    editors: 'James Markus 原著，罗殿中、韦兴主译',
    publisher: '科学出版社',
    edition: '第8版',
    file: 'C:/Users/Administrator/Desktop/15485264(1).pdf',
    textExtractable: false
  },
  {
    id: 'trauma-imaging-tcm',
    title: '骨伤科影像学',
    cite: '《骨伤科影像学》',
    editors: '全国中医药行业「十四五」规划教材',
    publisher: '中国中医药出版社',
    file: 'C:/Users/Administrator/Desktop/骨伤科影像学_14996356(1).pdf',
    textExtractable: false
  },
  {
    id: 'injury-imaging-guide',
    title: '骨关节损伤影像诊断一点通',
    cite: '《骨关节损伤影像诊断一点通》',
    editors: '刘琳、张鞭、高岱峰主编',
    publisher: '中国医药科技出版社',
    year: '2024',
    file: 'C:/Users/Administrator/Desktop/15508409.pdf',
    textExtractable: false
  }
];

export const TEXTBOOK_REF = SOURCE_BOOKS.map(
  b => `${b.cite}（${b.editors}，${b.publisher}${b.year ? `，${b.year}` : ''}${b.edition ? `，${b.edition}` : ''}）`
).join('；');

/** 《骨肌系统影像诊断》章节映射 */
export const MSK_CHAPTER = {
  knee: '第三章 下肢创伤及运动损伤',
  pcl: '第三章 下肢创伤及运动损伤',
  mcl: '第三章 下肢创伤及运动损伤',
  meniscus: '第三章 下肢创伤及运动损伤',
  tibplat: '第三章 下肢创伤及运动损伤',
  patella: '第三章 下肢创伤及运动损伤',
  kneeoa: '第六章 结缔组织病',
  hip: '第六章 结缔组织病',
  hipimp: '第六章 结缔组织病',
  gout: '第七章 内分泌与代谢性骨疾病',
  cppd: '第七章 内分泌与代谢性骨疾病',
  avn: '第四章 骨坏死与骨软骨病',
  osteoporosis: '第七章 内分泌与代谢性骨疾病',
  wrist: '第二章 上肢创伤及运动损伤',
  shoulder: '第二章 上肢创伤及运动损伤',
  elbow: '第二章 上肢创伤及运动损伤',
  radius: '第二章 上肢创伤及运动损伤',
  humerus: '第二章 上肢创伤及运动损伤',
  clavicle: '第二章 上肢创伤及运动损伤',
  ankle: '第三章 下肢创伤及运动损伤',
  calcaneus: '第三章 下肢创伤及运动损伤',
  talus: '第三章 下肢创伤及运动损伤',
  lisfranc: '第三章 下肢创伤及运动损伤',
  femneck: '第三章 下肢创伤及运动损伤',
  pelvis: '第三章 下肢创伤及运动损伤',
  monteggia: '第二章 上肢创伤及运动损伤',
  stressfx: '第二章 上肢创伤及运动损伤',
  spine: '第八章 脊柱疾病',
  cervical: '第八章 脊柱疾病',
  vertfx: '第八章 脊柱疾病',
  spinalstenosis: '第八章 脊柱疾病',
  tb: '第五章 骨与关节感染性疾病',
  infect: '第五章 骨与关节感染性疾病',
  septic: '第五章 骨与关节感染性疾病',
  hand: '第六章 结缔组织病',
  as: '第六章 结缔组织病',
  psa: '第六章 结缔组织病',
  tumor: '第九章 骨与关节肿瘤和肿瘤样病变',
  gct: '第九章 骨与关节肿瘤和肿瘤样病变',
  ewing: '第九章 骨与关节肿瘤和肿瘤样病变',
  myeloma: '第九章 骨与关节肿瘤和肿瘤样病变',
  metastasis: '第九章 骨与关节肿瘤和肿瘤样病变',
  chondrosarcoma: '第九章 骨与关节肿瘤和肿瘤样病变',
  osteochondroma: '第九章 骨与关节肿瘤和肿瘤样病变',
  hemangioma: '第九章 骨与关节肿瘤和肿瘤样病变',
  ddh: '第十一章 儿童骨发育异常',
  scfe: '第十一章 儿童骨发育异常',
  perthes: '第十一章 儿童骨发育异常',
  achilles: '第三章 下肢创伤及运动损伤'
};

export function mskChapterFor(type, sysCategory) {
  if (MSK_CHAPTER[type]) return MSK_CHAPTER[type];
  const byCat = {
    fx: '第二章 上肢创伤及运动损伤',
    muscle: '第二章 上肢创伤及运动损伤',
    arthritis: '第六章 结缔组织病',
    bonetumor: '第九章 骨与关节肿瘤和肿瘤样病变',
    softtumor: '第十章 软组织肿瘤',
    joint: '第八章 脊柱疾病'
  };
  return byCat[sysCategory] || '《骨肌系统影像诊断》各论';
}

export function stripChapterTag(text) {
  return String(text || '')
    .replace(/^【[^】]+】\s*/, '')
    .trim();
}

export function applyChapterTag(text, chapter) {
  const body = stripChapterTag(text);
  return body ? `【${chapter}】${body}` : `【${chapter}】`;
}

export const IMAGING_LABELS = ['直接征象', '间接征象', '关键组合'];

/**
 * 1 类网站 · 医学影像来源注册表（Agent 检索插件目录）
 * integration: api | hybrid | search-link | dataset | manual | restricted
 */
export const IMAGING_SOURCE_CATEGORIES = {
  international: '国际开放资源',
  education: '教学与病例库',
  dataset: '公开数据集',
  chinese: '中文影像资源',
  institutional: '机构教学库'
};

/** @type {import('./types.d.ts').ImagingSourceDef[]} */
export const IMAGING_SOURCES = [
  // ── 已接入 API ──
  {
    id: 'wikimedia-commons',
    name: 'Wikimedia Commons Medical Images',
    nameZh: 'Wikimedia Commons 医学影像',
    category: 'international',
    integration: 'api',
    plugin: 'wikimedia',
    homepage: 'https://commons.wikimedia.org/wiki/Category:Medical_imaging',
    license: { summary: 'CC / Public Domain 等（逐图核对）', commercial: 'depends', attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=wikimedia-commons' }
  },
  {
    id: 'openi',
    name: 'Open-i (NIH)',
    nameZh: 'Open-i（NIH）',
    category: 'international',
    integration: 'api',
    plugin: 'openi',
    homepage: 'https://openi.nlm.nih.gov',
    license: { summary: 'PMC Open Access（逐篇核对原文许可）', commercial: 'depends', attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=openi' }
  },
  {
    id: 'pmc',
    name: 'PubMed Central (PMC)',
    nameZh: 'PubMed Central',
    category: 'international',
    integration: 'api',
    plugin: 'openi',
    homepage: 'https://www.ncbi.nlm.nih.gov/pmc/',
    license: { summary: 'PMC OA 文章图像', commercial: 'depends', attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=pmc' },
    notes: '与 Open-i 共用检索；结果链接至 PMC 原文'
  },
  {
    id: 'nlm-open-access',
    name: 'NLM Open Access Images',
    nameZh: 'NLM 开放获取影像',
    category: 'international',
    integration: 'hybrid',
    plugin: 'openi',
    homepage: 'https://openi.nlm.nih.gov',
    license: { summary: 'NLM / PMC OA', commercial: 'depends', attribution: true },
    searchUrl: q => `https://openi.nlm.nih.gov/gridquery?q=${encodeURIComponent(q)}`
  },
  {
    id: 'biomed-central',
    name: 'BioMed Central Open Image Collection',
    nameZh: 'BioMed Central 开放图像',
    category: 'international',
    integration: 'api',
    plugin: 'europmc',
    homepage: 'https://www.biomedcentral.com',
    license: { summary: 'CC BY 等 OA 期刊（Europe PMC 检索）', commercial: 'depends', attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=biomed-central' }
  },
  {
    id: 'tcia',
    name: 'The Cancer Imaging Archive (TCIA)',
    nameZh: 'TCIA 癌症影像档案',
    category: 'dataset',
    integration: 'api',
    plugin: 'tcia',
    homepage: 'https://www.cancerimagingarchive.net',
    license: { summary: 'TCIA 数据使用条款（非诊断用途）', commercial: false, attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=tcia' }
  },
  {
    id: 'radiopaedia-commons',
    name: 'Radiopaedia (Wikimedia Commons mirror)',
    nameZh: 'Radiopaedia（Commons 镜像）',
    category: 'education',
    integration: 'hybrid',
    plugin: 'wikimedia-radiopaedia',
    homepage: 'https://radiopaedia.org',
    license: { summary: 'Commons 已上传图遵循原许可；主站 CC BY-NC-SA', commercial: false, attribution: true },
    api: { endpoint: '/api/imaging-sources/search?source=radiopaedia-commons' }
  },

  // ── 混合 / 检索链接（国际）──
  {
    id: 'radiopaedia',
    name: 'Radiopaedia',
    nameZh: 'Radiopaedia',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://radiopaedia.org',
    license: { summary: 'CC BY-NC-SA 3.0（非商业）', commercial: false, attribution: true },
    searchUrl: q => `https://radiopaedia.org/search?q=${encodeURIComponent(q)}&scope=articles`
  },
  {
    id: 'rsna-cases',
    name: 'RSNA Case Collection',
    nameZh: 'RSNA 病例集',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://cases.rsna.org',
    license: { summary: 'RSNA 教育用途（见站点条款）', commercial: false, attribution: true },
    searchUrl: q => `https://cases.rsna.org/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'radiology-assistant',
    name: 'Radiology Assistant',
    nameZh: 'Radiology Assistant',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://radiologyassistant.nl',
    license: { summary: '教育用途（见站点版权）', commercial: false, attribution: true },
    searchUrl: q => `https://radiologyassistant.nl/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'radiology-online',
    name: 'Radiology Online',
    nameZh: 'Radiology Online',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://www.radiologyonline.org',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:radiologyonline.org+${encodeURIComponent(q)}`
  },
  {
    id: 'eurorad',
    name: 'Eurorad',
    nameZh: 'Eurorad',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://www.eurorad.org',
    license: { summary: 'ESR 病例库（见站点条款）', commercial: false, attribution: true },
    searchUrl: q => `https://www.eurorad.org/case-search?search=${encodeURIComponent(q)}`
  },
  {
    id: 'medpix',
    name: 'MedPix (NLM)',
    nameZh: 'MedPix',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://medpix.nlm.nih.gov',
    license: { summary: 'NLM 教学病例（见原文）', commercial: false, attribution: true },
    searchUrl: q => `https://medpix.nlm.nih.gov/search?query=${encodeURIComponent(q)}`
  },
  {
    id: 'learning-radiology',
    name: 'LearningRadiology',
    nameZh: 'LearningRadiology',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://learningradiology.com',
    license: { summary: '教育用途', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:learningradiology.com+${encodeURIComponent(q)}`
  },
  {
    id: 'e-anatomy',
    name: 'e-Anatomy (partial free)',
    nameZh: 'e-Anatomy（部分免费）',
    category: 'education',
    integration: 'restricted',
    homepage: 'https://www.imaios.com/en/e-anatomy',
    license: { summary: 'IMAIOS 订阅/免费层', commercial: false, attribution: true },
    searchUrl: q => `https://www.imaios.com/en/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'orthobullets',
    name: 'Orthobullets',
    nameZh: 'Orthobullets',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://www.orthobullets.com',
    license: { summary: '教育用途（见站点条款）', commercial: false, attribution: true },
    searchUrl: q => `https://www.orthobullets.com/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'ajr',
    name: 'American Journal of Roentgenology (AJR open)',
    nameZh: 'AJR（部分开放）',
    category: 'international',
    integration: 'search-link',
    homepage: 'https://www.ajronline.org',
    license: { summary: '部分 OA 文章', commercial: 'depends', attribution: true },
    searchUrl: q =>
      `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}+AND+AJR[journal]+AND+free+full+text[filter]`
  },
  {
    id: 'esr-education',
    name: 'European Society of Radiology Education',
    nameZh: 'ESR 教育资源',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://www.myesr.org/education',
    license: { summary: 'ESR 教育材料', commercial: false, attribution: true },
    searchUrl: q => `https://www.myesr.org/search?search=${encodeURIComponent(q)}`
  },
  {
    id: 'radiology-masterclass',
    name: 'Radiology Masterclass',
    nameZh: 'Radiology Masterclass',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://www.radiologymasterclass.co.uk',
    license: { summary: '教育用途', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:radiologymasterclass.co.uk+${encodeURIComponent(q)}`
  },
  {
    id: 'radiology-ped-em',
    name: 'Radiology Cases in Pediatric Emergency Medicine',
    nameZh: '儿科急诊放射病例',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://hsc.unm.edu/health-clinics/emergency-medicine/radiology-cases/',
    license: { summary: 'UNM 教学病例', commercial: false, attribution: true },
    searchUrl: q =>
      `https://www.google.com/search?q=site:hsc.unm.edu+${encodeURIComponent(q)}+radiology+case`
  },
  {
    id: 'harvard-radiology-ed',
    name: 'Harvard Medical School Radiology Education',
    nameZh: '哈佛医学院放射教育',
    category: 'institutional',
    integration: 'search-link',
    homepage: 'https://learn.hms.harvard.edu',
    license: { summary: '机构教学（见原文）', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:learn.hms.harvard.edu+${encodeURIComponent(q)}+radiology`
  },
  {
    id: 'radiology-education-asia',
    name: 'Radiology Education Asia',
    nameZh: 'Radiology Education Asia',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://radiologyeducationasia.com',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://radiologyeducationasia.com/?s=${encodeURIComponent(q)}`
  },
  {
    id: 'digital-anatomist',
    name: 'Digital Anatomist',
    nameZh: 'Digital Anatomist',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://digitalanatomy.alleninstitute.org',
    license: { summary: 'Allen Institute（见原文）', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=Digital+Anatomist+${encodeURIComponent(q)}`
  },
  {
    id: 'radiology-reference',
    name: 'Radiology Reference Article Library',
    nameZh: '放射学参考文库',
    category: 'education',
    integration: 'search-link',
    homepage: 'https://radiopaedia.org',
    license: { summary: '通常指向 Radiopaedia / 公开综述', commercial: false, attribution: true },
    searchUrl: q => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}+radiology+review`
  },

  // ── 数据集（门户链接 / 部分 API）──
  {
    id: 'tcia-collections',
    name: 'Cancer Imaging Archive Collections',
    nameZh: 'TCIA 专题集合',
    category: 'dataset',
    integration: 'hybrid',
    plugin: 'tcia',
    homepage: 'https://www.cancerimagingarchive.net/collections/',
    license: { summary: 'TCIA 数据条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.cancerimagingarchive.net/collections/?search=${encodeURIComponent(q)}`
  },
  {
    id: 'midrc',
    name: 'MIDRC',
    nameZh: 'MIDRC',
    category: 'dataset',
    integration: 'search-link',
    homepage: 'https://midrc.org',
    license: { summary: 'MIDRC 数据使用协议', commercial: false, attribution: true },
    searchUrl: q => `https://midrc.org/?s=${encodeURIComponent(q)}`
  },
  {
    id: 'mimic-cxr',
    name: 'MIMIC-CXR',
    nameZh: 'MIMIC-CXR',
    category: 'dataset',
    integration: 'restricted',
    homepage: 'https://physionet.org/content/mimic-cxr-jpg/',
    license: { summary: 'PhysioNet Credentialed Health Data License', commercial: false, attribution: true },
    searchUrl: q => `https://physionet.org/content/?topic=${encodeURIComponent(q)}`
  },
  {
    id: 'lidc-idri',
    name: 'LIDC-IDRI',
    nameZh: 'LIDC-IDRI',
    category: 'dataset',
    integration: 'hybrid',
    plugin: 'tcia',
    homepage: 'https://wiki.cancerimagingarchive.net/display/Public/LIDC-IDRI',
    license: { summary: 'TCIA / LIDC 条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.cancerimagingarchive.net/collection/lidc-idri/`
  },
  {
    id: 'chestxray14',
    name: 'ChestX-ray14',
    nameZh: 'ChestX-ray14',
    category: 'dataset',
    integration: 'dataset',
    homepage: 'https://nihcc.app.box.com/v/ChestXray-NIHCC',
    license: { summary: 'NIH 数据集（非实时 API）', commercial: false, attribution: true },
    searchUrl: q => `https://www.kaggle.com/search?q=${encodeURIComponent('ChestX-ray14 ' + q)}`
  },
  {
    id: 'brats',
    name: 'BraTS',
    nameZh: 'BraTS',
    category: 'dataset',
    integration: 'dataset',
    homepage: 'https://www.synapse.org/#!Synapse:syn25829067',
    license: { summary: 'Synapse 数据条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.synapse.org/#!Synapse:syn25829067`
  },
  {
    id: 'physionet',
    name: 'PhysioNet Medical Imaging',
    nameZh: 'PhysioNet 医学影像',
    category: 'dataset',
    integration: 'search-link',
    homepage: 'https://physionet.org',
    license: { summary: 'PhysioNet 各数据集许可不同', commercial: false, attribution: true },
    searchUrl: q => `https://physionet.org/content/?topic=${encodeURIComponent(q)}`
  },
  {
    id: 'github-datasets',
    name: 'GitHub Public Medical Imaging Datasets',
    nameZh: 'GitHub 公开医学影像数据集',
    category: 'dataset',
    integration: 'search-link',
    homepage: 'https://github.com/search',
    license: { summary: '各仓库许可不同', commercial: 'depends', attribution: true },
    searchUrl: q => `https://github.com/search?q=${encodeURIComponent(q + ' medical imaging dataset')}&type=repositories`
  },
  {
    id: 'kaggle-datasets',
    name: 'Kaggle Medical Imaging Datasets',
    nameZh: 'Kaggle 医学影像数据集',
    category: 'dataset',
    integration: 'search-link',
    homepage: 'https://www.kaggle.com/datasets',
    license: { summary: '各数据集许可不同', commercial: 'depends', attribution: true },
    searchUrl: q => `https://www.kaggle.com/search?q=${encodeURIComponent(q + ' medical imaging')}&type=dataset`
  },

  // ── 中文资源（检索链接）──
  {
    id: 'dxy-imaging',
    name: '丁香园影像',
    nameZh: '丁香园影像',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.dxy.cn',
    license: { summary: '平台内容版权（引用须注明出处）', commercial: false, attribution: true },
    searchUrl: q => `https://www.dxy.cn/search?words=${encodeURIComponent(q + ' 影像')}`
  },
  {
    id: 'yxyl',
    name: '影像园',
    nameZh: '影像园',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.yxyl.net',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:yxyl.net+${encodeURIComponent(q)}`
  },
  {
    id: 'dinghu',
    name: '鼎湖影像',
    nameZh: '鼎湖影像',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://mp.weixin.qq.com',
    license: { summary: '微信公众号（引用须注明）', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('鼎湖影像 ' + q)}`
  },
  {
    id: 'medlive-imaging',
    name: '医脉通影像',
    nameZh: '医脉通',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.medlive.cn',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.medlive.cn/search?query=${encodeURIComponent(q + ' 影像')}`
  },
  {
    id: 'cmit-journal',
    name: '中国医学影像技术杂志',
    nameZh: '中国医学影像技术杂志',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.chinesemedicalimaging.com',
    license: { summary: '期刊版权（OA 文章除外）', commercial: false, attribution: true },
    searchUrl: q => `https://www.chinesemedicalimaging.com/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'cmic-journal',
    name: '中国医学计算机成像杂志',
    nameZh: '中国医学计算机成像杂志',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.cjci.org.cn',
    license: { summary: '期刊版权', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('中国医学计算机成像杂志 ' + q)}`
  },
  {
    id: 'cnki',
    name: '中国知网（部分开放）',
    nameZh: '中国知网',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.cnki.net',
    license: { summary: 'CNKI 版权（部分 OA）', commercial: false, attribution: true },
    searchUrl: q => `https://kns.cnki.net/kns8/defaultresult/index?kw=${encodeURIComponent(q + ' 医学影像')}`
  },
  {
    id: 'wanfang',
    name: '万方医学',
    nameZh: '万方医学',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://med.wanfangdata.com.cn',
    license: { summary: '万方版权', commercial: false, attribution: true },
    searchUrl: q => `https://med.wanfangdata.com.cn/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'cbm',
    name: '中国生物医学文献数据库（CBM）',
    nameZh: 'CBM',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.sinomed.ac.cn',
    license: { summary: 'SinoMed 版权', commercial: false, attribution: true },
    searchUrl: q => `https://www.sinomed.ac.cn/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'cjr-open',
    name: '中华放射学杂志开放资源',
    nameZh: '中华放射学杂志',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.chinajr.org',
    license: { summary: '中华医学会期刊', commercial: false, attribution: true },
    searchUrl: q => `https://www.chinajr.org/search?q=${encodeURIComponent(q)}`
  },
  {
    id: 'cn-imaging-net',
    name: '中国医学影像网',
    nameZh: '中国医学影像网',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.chinacloud.org.cn',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('中国医学影像网 ' + q)}`
  },
  {
    id: 'yx-time',
    name: '影像时间',
    nameZh: '影像时间',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://mp.weixin.qq.com',
    license: { summary: '微信公众号', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('影像时间 ' + q)}`
  },
  {
    id: 'radiology-salon',
    name: '放射沙龙',
    nameZh: '放射沙龙',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://mp.weixin.qq.com',
    license: { summary: '微信公众号', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('放射沙龙 ' + q)}`
  },
  {
    id: 'imaging-service-center',
    name: '医学影像服务中心',
    nameZh: '医学影像服务中心',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.google.com',
    license: { summary: '见原文', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('医学影像服务中心 ' + q)}`
  },
  {
    id: 'huaxia-imaging',
    name: '华夏影像诊断中心',
    nameZh: '华夏影像诊断中心',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.google.com',
    license: { summary: '见原文', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=${encodeURIComponent('华夏影像诊断中心 ' + q)}`
  },
  {
    id: 'yixuejie-imaging',
    name: '医学界影像频道',
    nameZh: '医学界影像频道',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.yxj.org.cn',
    license: { summary: '见站点条款', commercial: false, attribution: true },
    searchUrl: q => `https://www.yxj.org.cn/search?keyword=${encodeURIComponent(q + ' 影像')}`
  },
  {
    id: 'cara-education',
    name: '中国医师协会放射医师分会教育资源',
    nameZh: '放射医师分会教育',
    category: 'chinese',
    integration: 'search-link',
    homepage: 'https://www.cara.org.cn',
    license: { summary: '机构教育材料', commercial: false, attribution: true },
    searchUrl: q => `https://www.google.com/search?q=site:cara.org.cn+${encodeURIComponent(q)}`
  },
  {
    id: 'hospital-teaching-cases',
    name: '医学院校附属医院公开教学病例库',
    nameZh: '附属医院教学病例',
    category: 'institutional',
    integration: 'manual',
    homepage: 'https://www.google.com',
    license: { summary: '各院公开资料（须逐案授权）', commercial: false, attribution: true },
    searchUrl: q =>
      `https://www.google.com/search?q=${encodeURIComponent('协和医院 OR 华西医院 OR 中山大学肿瘤 放射 教学 病例 ' + q)}`
  }
];

export const SOURCE_BY_ID = Object.fromEntries(IMAGING_SOURCES.map(s => [s.id, s]));

export function listSources(filter = {}) {
  let out = [...IMAGING_SOURCES];
  if (filter.category) out = out.filter(s => s.category === filter.category);
  if (filter.integration) out = out.filter(s => s.integration === filter.integration);
  if (filter.apiOnly) out = out.filter(s => s.plugin || s.integration === 'api' || s.integration === 'hybrid');
  return out;
}

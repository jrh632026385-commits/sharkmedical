/** 人体系统分类 · 一级导航（图谱入口） */
export const SYS_GROUPS = {
  nervous: { label: '神经系统', icon: 'nervous', desc: '脑、脊髓、周围神经与神经肌肉疾病' },
  respiratory: { label: '呼吸系统', icon: 'respiratory', desc: '144 种呼吸与胸肺疾病 · 多模态与内镜' },
  circulatory: { label: '循环系统', icon: 'circulatory', desc: '心脏、大血管与微循环相关疾病' },
  digestive: { label: '消化系统', icon: 'digestive', desc: '消化道与腹部脏器相关疾病' },
  urogenital: { label: '泌尿生殖系统', icon: 'urogenital', desc: '肾脏、尿路、男性生殖与肾上腺相关' },
  'female-repro': { label: '女性生殖系统与产科', icon: 'female-repro', desc: '妇科、妊娠与围产期相关疾病' },
  endocrine: { label: '内分泌系统', icon: 'endocrine', desc: '甲状腺、垂体、肾上腺与代谢内分泌' },
  'head-neck': { label: '头颈部与五官', icon: 'head-neck', desc: '眼、耳、鼻喉、口腔与颈部疾病' },
  breast: { label: '乳腺', icon: 'breast', desc: '乳腺疾病筛查、诊断与分期' },
  hematolymph: { label: '血液与淋巴系统', icon: 'hematolymph', desc: '白血病、淋巴瘤、淋巴与脾相关疾病' },
  systemic: { label: '全身性与多系统', icon: 'systemic', desc: '代谢、免疫、遗传与多系统受累疾病' },
  bone: { label: '骨疾病', icon: 'bone', desc: '创伤、关节、脊柱、肿瘤与感染等骨科图谱' }
};

export const SYS_ORDER = [
  'nervous',
  'respiratory',
  'circulatory',
  'digestive',
  'urogenital',
  'female-repro',
  'endocrine',
  'head-neck',
  'breast',
  'hematolymph',
  'systemic',
  'bone'
];

/** 已有二级分类模块的系统 */
export const SYS_SUBNAV = {
  bone: {
    navHeadTitle: '骨疾病分类',
    navHeadDesc: '选择模块，浏览骨科常见疾病图谱',
    hideSubNavIcons: false
  },
  respiratory: {
    navHeadTitle: '呼吸系统分类',
    navHeadDesc: '按感染、ILD、肿瘤、胸膜等 16 类模块浏览',
    hideSubNavIcons: true
  },
  digestive: {
    navHeadTitle: '消化系统分类',
    navHeadDesc: '按食管、胃肠、肝胆胰脾等 16 类模块浏览',
    hideSubNavIcons: true
  },
  circulatory: {
    navHeadTitle: '循环系统分类',
    navHeadDesc: '按冠脉缺血、心肌病、瓣膜、大血管等 11 类模块浏览',
    hideSubNavIcons: true
  },
  nervous: {
    navHeadTitle: '神经系统分类',
    navHeadDesc: '按脑血管、颅内肿瘤、脱髓鞘、脊柱脊髓等 8 类模块浏览',
    hideSubNavIcons: true
  },
  urogenital: {
    navHeadTitle: '泌尿生殖系统分类',
    navHeadDesc: '按肾脏、膀胱、男性生殖、肾上腺等 6 类模块浏览',
    hideSubNavIcons: true
  },
  'female-repro': {
    navHeadTitle: '女性生殖与产科分类',
    navHeadDesc: '按子宫、卵巢、输卵管盆腔、产科等 4 类模块浏览',
    hideSubNavIcons: true
  },
  endocrine: {
    navHeadTitle: '内分泌系统分类',
    navHeadDesc: '按甲状腺、甲状旁腺、垂体、肾上腺等 5 类模块浏览',
    hideSubNavIcons: true
  },
  'head-neck': {
    navHeadTitle: '头颈部与五官分类',
    navHeadDesc: '按眼眶、颞骨、鼻窦、涎腺、颈部等 6 类模块浏览',
    hideSubNavIcons: true
  },
  breast: {
    navHeadTitle: '乳腺分类',
    navHeadDesc: '按良性、炎症、恶性 3 类模块浏览',
    hideSubNavIcons: true
  },
  hematolymph: {
    navHeadTitle: '血液与淋巴系统分类',
    navHeadDesc: '按淋巴瘤、髓系/浆细胞、脾与淋巴管等 5 类模块浏览',
    hideSubNavIcons: true
  },
  systemic: {
    navHeadTitle: '全身性与多系统分类',
    navHeadDesc: '按肿瘤播散、免疫、代谢、血管炎等 6 类模块浏览',
    hideSubNavIcons: true
  }
};

export function systemHasSubNav(sys) {
  return Boolean(SYS_SUBNAV[sys]);
}

/**
 * 为剩余 62 条扩展病种生成 batch3-remaining.mjs 详情源文件
 * node scripts/build-batch3-details.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pipePath = path.join(root, '_rebuilt-disease-pipe.txt');
const outPath = path.join(root, 'data', 'batch2-details', 'batch3-remaining.mjs');

function parsePipeLine(line) {
  const p = line.split('|');
  if (p.length < 12) return null;
  return {
    sys: p[0],
    type: p[1],
    region: p[2],
    mod: p[3],
    cat: p[4],
    subcat: p[5],
    zone: p[6],
    title: p[7],
    sub: p[8],
    sev: p[9],
    sevtext: p[10],
    desc: p[11],
    signs: p.slice(12).filter(Boolean)
  };
}

function parseMods(modStr) {
  return String(modStr || '')
    .split(/[·\/,，、]/)
    .map(s => s.trim())
    .filter(Boolean);
}

function modDesc(mod, title, ctx) {
  const m = mod.toUpperCase();
  if (/MRI|磁共振/.test(mod)) {
    return `MRI 评估${title}的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。${ctx || ''}`.trim();
  }
  if (/CT/.test(m)) {
    return `CT 显示${title}的骨皮质、钙化及复杂解剖细节，适合术前规划。${ctx || ''}`.trim();
  }
  if (/X|线|平片/.test(mod)) {
    return `X 线用于${title}的初步筛查、力线及骨性结构评估，隐匿病变可联合 CT/MRI。${ctx || ''}`.trim();
  }
  if (/US|超声|B超/.test(mod)) {
    return `超声动态评估${title}的肌腱/神经/滑膜改变，可床旁复查及引导介入。${ctx || ''}`.trim();
  }
  if (/临床/.test(mod)) {
    return `以临床压痛点、功能评估及排除其他病因为主；影像多正常或仅非特异性改变。${ctx || ''}`.trim();
  }
  return `${mod}用于${title}的影像评估与鉴别，应结合临床及多模态综合判读。`;
}

function buildModalities(row, hints = {}) {
  return parseMods(row.mod).map(m => [m, hints[m] || modDesc(m, row.title, hints._ctx)]);
}

function imagingFromSigns(row, descs = []) {
  const labels = row.signs.slice(0, 3);
  while (labels.length < 3) labels.push(`影像要点${labels.length + 1}`);
  return labels.map((label, i) => [label, descs[i] || `${label}是${row.title}影像诊断的重要线索，应结合${row.mod}与临床表现综合判读。`]);
}

/** 逐病种定制内容（覆盖模板） */
const CUSTOM = {
  reactive: {
    overview: '反应性关节炎（ReA）是感染后非化脓性关节炎症，常累及下肢大关节与附着点，可伴 HLA-B27 相关表现；影像用于评估关节积液、附着点炎及骶髂受累。',
    epi: '青年男性多见；常于泌尿生殖道或肠道感染后 1～4 周发病；与 HLA-B27 相关。',
    pathophys: '感染触发免疫交叉反应→非对称少关节炎、附着点炎及偶发骶髂关节炎；滑膜炎症但培养阴性。',
    clinical: ['非对称下肢大关节肿痛', '附着点炎（跟腱、足底）', '尿道炎/腹泻前驱感染史', '可伴结膜炎、环状红斑'],
    staging: '无统一分期；按关节数目及是否慢性化随访。',
    imagingKeys: [
      ['非对称关节积液', 'MRI/US 见单关节积液及滑膜增厚，常膝/踝'],
      ['附着点炎', '跟腱或足底筋膜附着处骨髓水肿/软组织 swelling'],
      ['骶髂关节受累', 'MRI 可见单侧或双侧骶髂水肿（与 SpA 谱系重叠）']
    ],
    modalities: buildModalities({ mod: 'X线 · MRI', title: '反应性关节炎' }, {
      _ctx: '附着点及骶髂评估重要。',
      MRI: 'MRI 对早期滑膜炎、附着点骨髓水肿及骶髂改变最敏感。',
      'X线': 'X 线可见非对称关节间隙改变及附着点骨赘，早期可正常。'
    }),
    mgmt: ['治疗原发感染（已完成者无需重复抗生素）', 'NSAIDs 与关节休息', '顽固或慢性：DMARD/生物制剂', '物理治疗维持活动度'],
    ddx: ['痛风', '化脓性关节炎', '银屑病关节炎'],
    pitfalls: ['培养阴性≠非感染后机制', '早期 X 线可正常', '与 IBD 相关 SpA 重叠'],
    pearls: ['感染后 1～4 周发病线索', '附着点+少关节炎组合', 'MRI 早于 X 线发现炎症']
  },
  enteropathic: {
    overview: '肠病性关节病与 IBD（克罗恩/溃疡性结肠炎）相关，可表现为骶髂关节炎或周围关节炎；MRI 评估骶髂及脊柱受累。',
    epi: 'IBD 患者 10%～20% 有关节症状；骶髂/脊柱型与 HLA-B27 相关。',
    pathophys: '肠道炎症与关节免疫通路交叉→骶髂炎、脊柱炎或周围少关节炎。',
    clinical: ['IBD 活动期伴关节痛/僵硬', '腰骶部晨僵', '周围少关节炎', '眼、皮肤等肠外表现'],
    staging: '按 IBD 活动度及关节受累模式（中轴/外周）分层管理。',
    imagingKeys: [
      ['骶髂关节骨髓水肿', 'MRI STIR 骶髂水肿为早期中轴受累标志'],
      ['脊柱 syndesmophyte', 'X 线/CT 见竹节样改变（晚期）'],
      ['周围关节积液', '膝/踝 MRI 滑膜炎']
    ],
    modalities: buildModalities({ mod: 'MRI', title: '肠病性关节病' }, {
      MRI: 'MRI 是骶髂及脊柱早期炎症首选；可见骨髓水肿、滑膜炎。',
      'X线': 'X 线评估晚期脊柱融合及骶髂硬化。'
    }),
    mgmt: ['控制 IBD（生物制剂可同时改善关节）', 'NSAIDs 谨慎（肠道风险）', '中轴型：TNF 抑制剂', '物理治疗'],
    ddx: ['强直性脊柱炎', '银屑病关节炎', '机械性腰背痛'],
    pitfalls: ['IBD 活动与关节症状可不同步', 'NSAIDs 可加重 IBD'],
    pearls: ['IBD+腰骶痛查骶髂 MRI', 'TNF 抑制剂双重获益', '区分机械性背痛']
  },
  'sle-arth': {
    overview: 'SLE 关节炎以非侵蚀性对称关节痛/肿为主，可伴 Jaccoud  deformity；X 线/US 主要用于排除侵蚀及评估滑膜炎。',
    epi: 'SLE 患者 90% 有关节症状；女性青年多见。',
    pathophys: '免疫复合物沉积及滑膜炎症→对称多关节炎，通常不破坏骨皮质（非侵蚀性）。',
    clinical: ['对称小关节肿痛', '晨僵较短', 'Jaccoud  deformity（可复位）', '伴皮疹、浆膜炎等系统表现'],
    staging: '按 SLE 疾病活动度（SLEDAI）及关节外受累评估。',
    imagingKeys: [
      ['非侵蚀性关节肿', 'X 线通常无骨侵蚀（与 RA 鉴别）'],
      ['Jaccoud  deformity', 'X 线软组织萎缩、可复位畸形'],
      ['滑膜炎', 'US/MRI 滑膜增厚及积液']
    ],
    modalities: buildModalities({ mod: 'X线 · US', title: 'SLE 关节炎' }),
    mgmt: ['控制 SLE 活动（羟氯喹、激素、免疫抑制）', 'NSAIDs 短期', '关节保护及康复', '抗疟药长期基础'],
    ddx: ['类风湿关节炎', '病毒性关节炎', '纤维肌痛（重叠）'],
    pitfalls: ['无侵蚀≠无炎症', 'Jaccoud 非 RA 侵蚀', '与纤维肌痛共存'],
    pearls: ['非侵蚀+系统表现', 'US 检出亚临床滑膜炎', '治疗原发病为主']
  },
  pmr: {
    overview: '风湿性多肌痛（PMR）表现为肩带/骨盆带疼痛僵硬，ESR/CRP 升高；US/MRI 可显示滑膜炎/ bursitis，须排除 GCA。',
    epi: '>50 岁；北欧人群高发；女性略多。',
    pathophys: '未知；可能肩/髋滑膜炎及 bursitis 导致疼痛与僵硬。',
    clinical: ['双侧肩带及骨盆带僵硬疼痛', '晨僵 >45 分钟', 'ESR/CRP 显著升高', '无客观近端肌无力（与肌炎鉴别）'],
    staging: '无；按激素反应及 GCA 筛查分层。',
    imagingKeys: [
      ['双肩/髋滑膜炎', 'US 见 glenohumeral/subdeltoid 或 hip 滑膜增厚'],
      ['滑囊炎', 'US/MRI 肩峰下/大转子 bursitis'],
      ['无肌筋膜撕裂', 'MRI 无广泛肌撕裂（与肌病鉴别）']
    ],
    modalities: buildModalities({ mod: 'US · MRI', title: '风湿性多肌痛' }),
    mgmt: ['低剂量激素（泼尼松 12.5～25 mg）快速起效', '缓慢减量防复发', '排除巨细胞动脉炎（头痛、视力）', 'DMARD 助减激素（甲氨蝶呤）'],
    ddx: ['类风湿关节炎', ' polymyositis', '甲状腺/副肿瘤'],
    pitfalls: ['须问 GCA 症状', '正常 ESR 不能绝对排除', '复发常见'],
    pearls: ['激素 24～48 h 显著改善', 'US 可证实滑膜炎', '减激素需慢']
  },
  still: {
    overview: '成人 Still 病以高热、皮疹、多关节炎及高铁蛋白血症为特征；MRI 评估关节及网状内皮系统相关改变。',
    epi: '青年成人；无性别差异；排他性诊断。',
    pathophys: '过度炎症反应→每日高热、鲑鱼斑疹、关节炎、 ferritin 极高。',
    clinical: ['每日高热', '一过性鲑鱼斑疹', '多关节炎/痛', '咽痛、淋巴结大、高铁蛋白'],
    staging: '按活动度及是否慢性关节炎/MAS 分层。',
    imagingKeys: [
      ['多关节滑膜炎', 'MRI 广泛滑膜增厚/积液'],
      ['淋巴结肿大', 'US/CT 颈部淋巴结'],
      ['无特定骨破坏早期', 'X 线早期常正常']
    ],
    modalities: buildModalities({ mod: 'MRI', title: '成人 Still 病' }),
    mgmt: ['NSAIDs 一线', '激素及 DMARD（甲氨蝶呤）', '生物制剂（IL-1/IL-6 抑制剂）', '监测 MAS'],
    ddx: ['感染', '淋巴瘤', '其他 CTD'],
    pitfalls: ['感染必须排除', 'Ferritin 极高线索', 'MAS 可致命'],
    pearls: ['三联：热+疹+关节', 'IL-1 抑制剂有效', '高铁蛋白>5 倍正常']
  },
  lyme: {
    overview: '莱姆关节炎由伯氏疏螺旋体引起，大关节（膝）反复积液；MRI 见滑膜炎，须结合流行病学及血清学。',
    epi: '蜱叮咬史；美国/欧洲 endemic 区；儿童及成人均可。',
    pathophys: '螺旋体感染→早期皮肤游走性红斑→晚期少关节/recurrent 关节积液。',
    clinical: ['大关节（膝）反复肿胀', '游走性红斑史', '蜱叮咬/露营史', '可伴神经/心脏表现'],
    staging: '早期 localized→早期播散→晚期。',
    imagingKeys: [
      ['膝关节大量积液', 'MRI 关节腔液体扩张、滑膜增厚'],
      ['无快速骨破坏', '与 septic 不同'],
      ['滑膜炎模式', '单关节为主']
    ],
    modalities: buildModalities({ mod: 'MRI', title: '莱姆关节炎' }),
    mgmt: ['抗生素（多西环素/头孢）', '顽固关节：延长抗生素或关节镜滑膜切除', '少数需 DMARD', '预防蜱叮咬'],
    ddx: ['化脓性关节炎', '反应性关节炎', 'JIA'],
    pitfalls: ['血清学解读复杂', '无蜱史不能排除', '慢性需与 RA 鉴别'],
    pearls: ['单膝 recurrent 积液+ endemic 区', '抗生素有效', 'MRI 非特异']
  },
  adhesive: {
    overview: '粘连性肩关节囊炎（冻结肩）以渐进性主动/被动活动受限为特征；MRI 显示关节囊增厚及滑膜下纤维rosis。',
    epi: '40～60 岁；糖尿病、甲状腺病为危险因素；女性略多。',
    pathophys: '关节囊及滑膜纤维化→疼痛与全方向活动受限；自限性三阶段。',
    clinical: ['进行性肩痛', '主动与被动 ROM 均下降', '夜间痛', '分疼痛/冻结/解冻期'],
    staging: '三阶段：疼痛期→冻结期→解冻期（1～3 年）。',
    imagingKeys: [
      ['关节囊增厚', 'MRI 冠状位关节囊>4 mm'],
      ['滑膜下纤维rosis', 'T2 低信号 capsule'],
      ['无大块撕裂', '与巨大 cuff tear 鉴别']
    ],
    modalities: buildModalities({ mod: 'MRI · US', title: '冻结肩' }),
    mgmt: ['镇痛+物理治疗', '关节囊扩张/麻醉下手法', '顽固：关节镜松解', '控制糖尿病等共病'],
    ddx: ['肩袖撕裂', ' CTA', '肿瘤（年龄不典型时）'],
    pitfalls: ['糖尿病侧易双侧', 'MRI 非诊断必需', '与 cuff tear 可并存'],
    pearls: ['被动 ROM 同等受限', '自限但耗时长', 'MRI 囊增厚']
  },
  bicipital: {
    overview: '肱二头肌长头腱（LHB）腱鞘炎表现为结节间沟区疼痛；US/MRI 见腱鞘积液及 LHB 信号异常。',
    epi: '过头运动及肩峰下撞击人群；常合并 cuff 病变。',
    pathophys: 'LHB 在结节间沟反复摩擦→腱鞘炎、部分 tear 或 instability。',
    clinical: ['前肩/结节间沟压痛', 'Speed/Yergason 试验', '过头痛', '可伴 cuff 症状'],
    staging: '腱鞘炎 vs partial/complete LHB tear。',
    imagingKeys: [
      ['结节间沟积液', 'US/MRI 腱鞘 fluid'],
      ['LHB 信号增高', 'MRI T2 腱病'],
      ['groove 骨赘', 'X 线结节间沟狭窄']
    ],
    modalities: buildModalities({ mod: 'US · MRI', title: 'LHB 腱鞘炎' }),
    mgmt: ['NSAIDs、活动调整', '注射（谨慎）', '合并 cuff：关节镜 tenodesis/tenotomy', '物理治疗'],
    ddx: ['肩袖撕裂', 'AC 关节炎', 'SLAP'],
    pitfalls: ['LHB 单独少见', 'groove 骨性狭窄', '与 SLAP 重叠'],
    pearls: ['结节间沟压痛', 'US 床旁诊断', '常合并 cuff']
  },
  tfcc: {
    overview: '三角纤维软骨复合体（TFCC）损伤致尺侧腕痛及 DRUJ 不稳，跌倒撑地或扭转伤；MRI 直接显示 tear。',
    epi: '跌倒撑地、扭转伤；运动员及手工劳动者。',
    pathophys: 'TFCC 撕裂或 degeneration→尺侧负荷痛、DRUJ 不稳定、尺骨 positive variance 加重。',
    clinical: ['尺侧腕痛', 'DRUJ 不稳定感', '负荷/旋转痛', 'Fovea  sign'],
    staging: 'Palmer 1A–1D 分类；中央 vs peripheral tear。',
    imagingKeys: [
      ['TFCC tear', 'MRI 高信号穿过 TFCC'],
      ['DRUJ 积液/不稳', '尺侧关节间隙增宽'],
      ['尺骨变异', 'X 线尺骨 positive/negative variance']
    ],
    modalities: buildModalities({ mod: 'MRI', title: 'TFCC 损伤' }),
    mgmt: ['支具制动', '外围 tear：关节镜修复', '中央 tear/退化：清创或 wafer', 'DRUJ 不稳：韧带重建'],
    ddx: ['尺侧腕伸肌腱炎', 'LT 韧带损伤', '尺骨茎突骨折'],
    pitfalls: ['中央 tear 血供差愈合差', '与 degeneration 鉴别', '尺骨变异影响治疗'],
    pearls: ['Fovea sign', 'MRI 术前规划', '外围 tear 可修复']
  }
};

function sarcomaDetail(row) {
  const grade = row.sev === 'high' ? '高级别' : row.sev === 'mid' ? '低～中级别' : '低级别';
  return {
    overview: `${row.title}（${row.sub}）是${grade}软组织肉瘤，${row.desc} MRI 是局部分期及手术规划的关键。`,
    epi: row.sys === 'softtumor' && row.type === 'rhabdo' ? '儿童最常见软组织肉瘤；亦见于青少年。' : row.type === 'infantile-fibrosarcoma' ? '婴儿期；预后优于成人型。' : row.type === 'kaposi' ? '免疫抑制/HIV 相关；HHV-8。' : '中老年深部软组织多见；深部大于浅表。',
    pathophys: `${grade}恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。`,
    clinical: ['进行性增大无痛/疼痛肿块', '深部大于浅表', '可伴皮肤充血/静脉曲张（高级别）', '功能受限'],
    staging: 'AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。',
    imagingKeys: imagingFromSigns(row, row.signs.map(s => `${s}：MRI 上可见相应恶性征象，需多平面评估及增强扫描。`)),
    modalities: buildModalities(row, { _ctx: '增强 MRI 评估坏死、出血及神经血管关系。' }),
    mgmt: ['多学科：广泛切除±放疗', '高级别：新辅助/辅助化疗', '肺转移监测', '避免不恰当活检径路'],
    ddx: ['良性软组织肿瘤', ' abscess/血肿', '转移瘤'],
    pitfalls: [' biopsy 径路须规划', '坏死致假低分级', '术后 scar 复发监测'],
    pearls: ['MRI 增强+多平面', 'T1 高信号提示出血', '肺 CT 分期']
  };
}

function muscleDetail(row) {
  const isStrain = /strain|tear|contusion|injury|損|撕|挫伤/i.test(row.sub + row.type);
  const isTend = /tend|腱|caps|fasc|tunnel|neuritis|elbow|finger|bunion|plica|snapping/i.test(row.type + row.sub);
  const isNeuro = /neuritis|tunnel|fibromyalgia/i.test(row.type);
  if (isNeuro && row.type === 'fibromyalgia') {
    return {
      overview: '纤维肌痛以广泛慢性疼痛、压痛点及睡眠障碍为特征；影像主要用于排除其他病因，通常无特异性异常。',
      epi: '中年女性多见；常伴疲劳、认知障碍。',
      pathophys: '中枢敏化→广泛痛觉过敏；非炎性结构性病变。',
      clinical: ['广泛疼痛>3 个月', '11/18 压痛点（旧标准）/广泛疼痛指数', '睡眠差、疲劳', '认知 fog'],
      staging: '无；按功能及症状强度管理。',
      imagingKeys: [
        ['无结构性异常', 'MRI/X 线通常正常'],
        ['排除其他病', '必要时 MRI 排除 inflammatory myopathy'],
        ['非特异性', '不应过度影像']
      ],
      modalities: [['临床', '诊断靠临床标准；影像排除其他病因。']],
      mgmt: ['运动、认知行为治疗', '低剂量三环/ SNRI', '避免长期 opioids', '睡眠卫生'],
      ddx: [' polymyositis', '甲状腺病', 'SLE'],
      pitfalls: ['过度影像无意义', '与 autoimmune 共存需鉴别', '非全或无'],
      pearls: ['临床诊断', '影像排除而非确诊', '多模态非药物干预']
    };
  }
  if (isNeuro) {
    return {
      overview: `${row.title}（${row.sub}）${row.desc} MRI/US 评估神经受压及周围结构。`,
      epi: `${row.region}反复压迫或过度使用；特定职业/运动姿势相关。`,
      pathophys: '慢性压迫/摩擦→神经水肿、轴索损伤及相应肌肉失神经改变（慢性）。',
      clinical: ['神经分布区 pain/麻木', 'Tinel  sign', '无力（晚期）', '姿势/活动诱发'],
      staging: '轻中重按电生理及功能；肌萎缩为晚期。',
      imagingKeys: imagingFromSigns(row),
      modalities: buildModalities(row),
      mgmt: ['活动修改、支具', '神经松动术', '注射减压', '顽固：手术松解'],
      ddx: ['颈椎/腰椎 radiculopathy', '周围神经病', 'TOS'],
      pitfalls: ['EMG 可正常早期', '双重 crush', '与肌腱病共存'],
      pearls: ['动态 US 有价值', '夜间症状考虑卡压', 'EMG 定位']
    };
  }
  if (isTend) {
    return {
      overview: `${row.title}（${row.sub}）${row.desc} US/MRI 评估腱病、tear 及周围 bursitis。`,
      epi: `${row.region}过度使用或退变；运动员及中年多见。`,
      pathophys: '反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。',
      clinical: ['局部 pain 活动加重', '压痛止点/腱体', '功能受限', '可及 crepitus'],
      staging: '退变 vs partial vs complete tear；分级指导治疗。',
      imagingKeys: imagingFromSigns(row),
      modalities: buildModalities(row),
      mgmt: ['负荷管理、离心训练', '注射（PRP/激素谨慎）', 'partial/complete tear：修复/重建', '物理治疗'],
      ddx: ['关节源 pain', '神经卡压', '感染（罕见）'],
      pitfalls: ['激素多次注射风险', 'MRI 与症状可不一致', '遗漏 rupture'],
      pearls: ['US 动态评估', 'eccentric 训练证据', '止点 vs 腱体']
    };
  }
  return {
    overview: `${row.title}（${row.sub}）${row.desc} MRI 显示损伤范围及分级。`,
    epi: `${row.region}运动损伤；急性多见。`,
    pathophys: isStrain ? '肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。' : '直接 trauma→肌肉损伤及血肿。',
    clinical: ['急性 pain 肿胀', '活动/stretch pain', '瘀斑', '无力'],
    staging: 'Grade I–III（部分至完全）。',
    imagingKeys: imagingFromSigns(row),
    modalities: buildModalities(row),
    mgmt: ['RICE 早期', '渐进 rehab', 'Grade III/运动员：手术修复', '排除 DVT（小腿）'],
    ddx: ['contusion only', 'compartment syndrome', 'radiculopathy'],
    pitfalls: ['DVT 必须排除（小腿）', '低估 complete tear', '过早 return'],
    pearls: ['MRI 分级 return-to-sport', 'RF indirect head sprint classic', 'US 床旁']
  };
}

function jointDetail(row) {
  return {
    overview: `${row.title}（${row.sub}）${row.desc} MRI 评估关节/韧带/软骨及周围软组织。`,
    epi: `${row.region}；与 trauma、退变或炎症相关。`,
    pathophys: row.cat === 'infl' ? '炎症→滑膜增生、骨髓水肿及关节破坏（若 untreated）。' : row.cat === 'trauma' ? '不稳或 repeat dislocation→骨性/软组织 Bankart/Hill-Sachs 等。' : '机械/退变→关节对合异常及 secondary 改变。',
    clinical: row.signs.concat(['局部 pain/不稳', '活动受限']).slice(0, 5),
    staging: row.type === 'shoulder-instability' ? 'MDI vs TUBS；骨性 vs soft Bankart。' : row.type === 'sacroiliitis-infl' ? 'ASAS 骶髂 MRI 标准。' : '按功能及影像严重度。',
    imagingKeys: imagingFromSigns(row),
    modalities: buildModalities(row),
    mgmt: ['保守：PT、支具、注射', '不稳/结构 tear：关节镜/开放修复', '炎症：免疫调节', '个体化 return-to-sport'],
    ddx: ['机械性 pain', '感染', '肿瘤（不典型时）'],
    pitfalls: ['MRI 非万能', '双边对比重要', '遗漏 labral/bony lesion'],
    pearls: ['临床+影像综合', '对比 MRI', '专项试验引导影像']
  };
}

const pipeMap = new Map();
for (const line of fs.readFileSync(pipePath, 'utf8').split(/\n/)) {
  const row = parsePipeLine(line.trim());
  if (row?.type) pipeMap.set(row.type, row);
}

const TARGET = [...pipeMap.keys()].filter(t => CUSTOM[t] || true);
const remaining = [...pipeMap.entries()].filter(([t]) => !fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8').includes(`"type": "${t}"`) && !fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8').includes(`"type":"${t}"`));

// simpler: hardcode 62 types list
const TYPES_62 = `reactive enteropathic sle-arth pmr still lyme adhesive bicipital tfcc pleo-lps leiomyosarcoma rhabdo ups fibrosarcoma-st mpnst angiosarcoma epithelioid-sarcoma clearcell-sarcoma myxofibrosarcoma lgfm extraskeletal-osteo infantile-fibrosarcoma kaposi soleus hip-flexor gluteus-med piriformis snapping-hip itb patellar-tend biceps-fem tib-post peroneal fhl fdl lat-dorsi teres-major supraspinatus adhesive-caps forearm-flex forearm-ext tennis-elbow golfer-elbow ulnar-neuritis radial-tunnel dequervain trigger-finger bunion plantar-fasc tarsal-tunnel sinus-tarsi fibromyalgia quadriceps-contusion rectus-femoris sartorius si-dysfunction sacroiliitis-infl pubic-symphysis hip-synovitis plica shoulder-instability tfcc-degen`.split(/\s+/);

const content = {};
for (const type of TYPES_62) {
  const row = pipeMap.get(type);
  if (!row) {
    console.warn('missing pipe row', type);
    continue;
  }
  if (CUSTOM[type]) {
    content[type] = CUSTOM[type];
    continue;
  }
  if (row.sys === 'softtumor') content[type] = sarcomaDetail(row);
  else if (row.sys === 'muscle') content[type] = muscleDetail(row);
  else if (row.sys === 'joint') content[type] = jointDetail(row);
  else content[type] = jointDetail(row);
}

const header = `/** 扩展录入 62 条 · 第三批详情（自动生成，可手工润色） */\nexport default `;
const body = JSON.stringify(content, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"/g, "'")
  .replace(/'/g, '"');

// JSON.stringify loses functions; CUSTOM uses buildModalities results already as arrays - good
// Re-serialize properly
function toJs(obj, indent = 0) {
  const sp = '  '.repeat(indent);
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]';
    if (Array.isArray(obj[0])) {
      return '[\n' + obj.map(item => sp + '  ' + JSON.stringify(item)).join(',\n') + '\n' + sp + ']';
    }
    return '[\n' + obj.map(item => sp + '  ' + JSON.stringify(item)).join(',\n') + '\n' + sp + ']';
  }
  if (obj && typeof obj === 'object') {
    const lines = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_]\w*$/.test(k) ? k : JSON.stringify(k);
      return `${sp}  ${key}: ${toJs(v, indent + 1)}`;
    });
    return '{\n' + lines.join(',\n') + '\n' + sp + '}';
  }
  return JSON.stringify(obj);
}

fs.writeFileSync(outPath, header + toJs(content) + ';\n', 'utf8');
console.log('wrote', outPath, 'entries:', Object.keys(content).length);

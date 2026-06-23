/** 扩展录入 62 条 · 第三批详情（自动生成，可手工润色） */
export default {
  reactive: {
    overview: "反应性关节炎（ReA）是感染后非化脓性关节炎症，常累及下肢大关节与附着点，可伴 HLA-B27 相关表现；影像用于评估关节积液、附着点炎及骶髂受累。",
    epi: "青年男性多见；常于泌尿生殖道或肠道感染后 1～4 周发病；与 HLA-B27 相关。",
    pathophys: "感染触发免疫交叉反应→非对称少关节炎、附着点炎及偶发骶髂关节炎；滑膜炎症但培养阴性。",
    clinical: [
      "非对称下肢大关节肿痛",
      "附着点炎（跟腱、足底）",
      "尿道炎/腹泻前驱感染史",
      "可伴结膜炎、环状红斑"
    ],
    staging: "无统一分期；按关节数目及是否慢性化随访。",
    imagingKeys: [
      ["非对称关节积液","MRI/US 见单关节积液及滑膜增厚，常膝/踝"],
      ["附着点炎","跟腱或足底筋膜附着处骨髓水肿/软组织 swelling"],
      ["骶髂关节受累","MRI 可见单侧或双侧骶髂水肿（与 SpA 谱系重叠）"]
    ],
    modalities: [
      ["X线","X 线可见非对称关节间隙改变及附着点骨赘，早期可正常。"],
      ["MRI","MRI 对早期滑膜炎、附着点骨髓水肿及骶髂改变最敏感。"]
    ],
    mgmt: [
      "治疗原发感染（已完成者无需重复抗生素）",
      "NSAIDs 与关节休息",
      "顽固或慢性：DMARD/生物制剂",
      "物理治疗维持活动度"
    ],
    ddx: [
      "痛风",
      "化脓性关节炎",
      "银屑病关节炎"
    ],
    pitfalls: [
      "培养阴性≠非感染后机制",
      "早期 X 线可正常",
      "与 IBD 相关 SpA 重叠"
    ],
    pearls: [
      "感染后 1～4 周发病线索",
      "附着点+少关节炎组合",
      "MRI 早于 X 线发现炎症"
    ]
  },
  enteropathic: {
    overview: "肠病性关节病与 IBD（克罗恩/溃疡性结肠炎）相关，可表现为骶髂关节炎或周围关节炎；MRI 评估骶髂及脊柱受累。",
    epi: "IBD 患者 10%～20% 有关节症状；骶髂/脊柱型与 HLA-B27 相关。",
    pathophys: "肠道炎症与关节免疫通路交叉→骶髂炎、脊柱炎或周围少关节炎。",
    clinical: [
      "IBD 活动期伴关节痛/僵硬",
      "腰骶部晨僵",
      "周围少关节炎",
      "眼、皮肤等肠外表现"
    ],
    staging: "按 IBD 活动度及关节受累模式（中轴/外周）分层管理。",
    imagingKeys: [
      ["骶髂关节骨髓水肿","MRI STIR 骶髂水肿为早期中轴受累标志"],
      ["脊柱 syndesmophyte","X 线/CT 见竹节样改变（晚期）"],
      ["周围关节积液","膝/踝 MRI 滑膜炎"]
    ],
    modalities: [
      ["MRI","MRI 是骶髂及脊柱早期炎症首选；可见骨髓水肿、滑膜炎。"]
    ],
    mgmt: [
      "控制 IBD（生物制剂可同时改善关节）",
      "NSAIDs 谨慎（肠道风险）",
      "中轴型：TNF 抑制剂",
      "物理治疗"
    ],
    ddx: [
      "强直性脊柱炎",
      "银屑病关节炎",
      "机械性腰背痛"
    ],
    pitfalls: [
      "IBD 活动与关节症状可不同步",
      "NSAIDs 可加重 IBD"
    ],
    pearls: [
      "IBD+腰骶痛查骶髂 MRI",
      "TNF 抑制剂双重获益",
      "区分机械性背痛"
    ]
  },
  "sle-arth": {
    overview: "SLE 关节炎以非侵蚀性对称关节痛/肿为主，可伴 Jaccoud  deformity；X 线/US 主要用于排除侵蚀及评估滑膜炎。",
    epi: "SLE 患者 90% 有关节症状；女性青年多见。",
    pathophys: "免疫复合物沉积及滑膜炎症→对称多关节炎，通常不破坏骨皮质（非侵蚀性）。",
    clinical: [
      "对称小关节肿痛",
      "晨僵较短",
      "Jaccoud  deformity（可复位）",
      "伴皮疹、浆膜炎等系统表现"
    ],
    staging: "按 SLE 疾病活动度（SLEDAI）及关节外受累评估。",
    imagingKeys: [
      ["非侵蚀性关节肿","X 线通常无骨侵蚀（与 RA 鉴别）"],
      ["Jaccoud  deformity","X 线软组织萎缩、可复位畸形"],
      ["滑膜炎","US/MRI 滑膜增厚及积液"]
    ],
    modalities: [
      ["X线","X 线用于SLE 关节炎的初步筛查、力线及骨性结构评估，隐匿病变可联合 CT/MRI。"],
      ["US","超声动态评估SLE 关节炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "控制 SLE 活动（羟氯喹、激素、免疫抑制）",
      "NSAIDs 短期",
      "关节保护及康复",
      "抗疟药长期基础"
    ],
    ddx: [
      "类风湿关节炎",
      "病毒性关节炎",
      "纤维肌痛（重叠）"
    ],
    pitfalls: [
      "无侵蚀≠无炎症",
      "Jaccoud 非 RA 侵蚀",
      "与纤维肌痛共存"
    ],
    pearls: [
      "非侵蚀+系统表现",
      "US 检出亚临床滑膜炎",
      "治疗原发病为主"
    ]
  },
  pmr: {
    overview: "风湿性多肌痛（PMR）表现为肩带/骨盆带疼痛僵硬，ESR/CRP 升高；US/MRI 可显示滑膜炎/ bursitis，须排除 GCA。",
    epi: ">50 岁；北欧人群高发；女性略多。",
    pathophys: "未知；可能肩/髋滑膜炎及 bursitis 导致疼痛与僵硬。",
    clinical: [
      "双侧肩带及骨盆带僵硬疼痛",
      "晨僵 >45 分钟",
      "ESR/CRP 显著升高",
      "无客观近端肌无力（与肌炎鉴别）"
    ],
    staging: "无；按激素反应及 GCA 筛查分层。",
    imagingKeys: [
      ["双肩/髋滑膜炎","US 见 glenohumeral/subdeltoid 或 hip 滑膜增厚"],
      ["滑囊炎","US/MRI 肩峰下/大转子 bursitis"],
      ["无肌筋膜撕裂","MRI 无广泛肌撕裂（与肌病鉴别）"]
    ],
    modalities: [
      ["US","超声动态评估风湿性多肌痛的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估风湿性多肌痛的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "低剂量激素（泼尼松 12.5～25 mg）快速起效",
      "缓慢减量防复发",
      "排除巨细胞动脉炎（头痛、视力）",
      "DMARD 助减激素（甲氨蝶呤）"
    ],
    ddx: [
      "类风湿关节炎",
      " polymyositis",
      "甲状腺/副肿瘤"
    ],
    pitfalls: [
      "须问 GCA 症状",
      "正常 ESR 不能绝对排除",
      "复发常见"
    ],
    pearls: [
      "激素 24～48 h 显著改善",
      "US 可证实滑膜炎",
      "减激素需慢"
    ]
  },
  still: {
    overview: "成人 Still 病以高热、皮疹、多关节炎及高铁蛋白血症为特征；MRI 评估关节及网状内皮系统相关改变。",
    epi: "青年成人；无性别差异；排他性诊断。",
    pathophys: "过度炎症反应→每日高热、鲑鱼斑疹、关节炎、 ferritin 极高。",
    clinical: [
      "每日高热",
      "一过性鲑鱼斑疹",
      "多关节炎/痛",
      "咽痛、淋巴结大、高铁蛋白"
    ],
    staging: "按活动度及是否慢性关节炎/MAS 分层。",
    imagingKeys: [
      ["多关节滑膜炎","MRI 广泛滑膜增厚/积液"],
      ["淋巴结肿大","US/CT 颈部淋巴结"],
      ["无特定骨破坏早期","X 线早期常正常"]
    ],
    modalities: [
      ["MRI","MRI 评估成人 Still 病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "NSAIDs 一线",
      "激素及 DMARD（甲氨蝶呤）",
      "生物制剂（IL-1/IL-6 抑制剂）",
      "监测 MAS"
    ],
    ddx: [
      "感染",
      "淋巴瘤",
      "其他 CTD"
    ],
    pitfalls: [
      "感染必须排除",
      "Ferritin 极高线索",
      "MAS 可致命"
    ],
    pearls: [
      "三联：热+疹+关节",
      "IL-1 抑制剂有效",
      "高铁蛋白>5 倍正常"
    ]
  },
  lyme: {
    overview: "莱姆关节炎由伯氏疏螺旋体引起，大关节（膝）反复积液；MRI 见滑膜炎，须结合流行病学及血清学。",
    epi: "蜱叮咬史；美国/欧洲 endemic 区；儿童及成人均可。",
    pathophys: "螺旋体感染→早期皮肤游走性红斑→晚期少关节/recurrent 关节积液。",
    clinical: [
      "大关节（膝）反复肿胀",
      "游走性红斑史",
      "蜱叮咬/露营史",
      "可伴神经/心脏表现"
    ],
    staging: "早期 localized→早期播散→晚期。",
    imagingKeys: [
      ["膝关节大量积液","MRI 关节腔液体扩张、滑膜增厚"],
      ["无快速骨破坏","与 septic 不同"],
      ["滑膜炎模式","单关节为主"]
    ],
    modalities: [
      ["MRI","MRI 评估莱姆关节炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "抗生素（多西环素/头孢）",
      "顽固关节：延长抗生素或关节镜滑膜切除",
      "少数需 DMARD",
      "预防蜱叮咬"
    ],
    ddx: [
      "化脓性关节炎",
      "反应性关节炎",
      "JIA"
    ],
    pitfalls: [
      "血清学解读复杂",
      "无蜱史不能排除",
      "慢性需与 RA 鉴别"
    ],
    pearls: [
      "单膝 recurrent 积液+ endemic 区",
      "抗生素有效",
      "MRI 非特异"
    ]
  },
  adhesive: {
    overview: "粘连性肩关节囊炎（冻结肩）以渐进性主动/被动活动受限为特征；MRI 显示关节囊增厚及滑膜下纤维rosis。",
    epi: "40～60 岁；糖尿病、甲状腺病为危险因素；女性略多。",
    pathophys: "关节囊及滑膜纤维化→疼痛与全方向活动受限；自限性三阶段。",
    clinical: [
      "进行性肩痛",
      "主动与被动 ROM 均下降",
      "夜间痛",
      "分疼痛/冻结/解冻期"
    ],
    staging: "三阶段：疼痛期→冻结期→解冻期（1～3 年）。",
    imagingKeys: [
      ["关节囊增厚","MRI 冠状位关节囊>4 mm"],
      ["滑膜下纤维rosis","T2 低信号 capsule"],
      ["无大块撕裂","与巨大 cuff tear 鉴别"]
    ],
    modalities: [
      ["MRI","MRI 评估冻结肩的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估冻结肩的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "镇痛+物理治疗",
      "关节囊扩张/麻醉下手法",
      "顽固：关节镜松解",
      "控制糖尿病等共病"
    ],
    ddx: [
      "肩袖撕裂",
      " CTA",
      "肿瘤（年龄不典型时）"
    ],
    pitfalls: [
      "糖尿病侧易双侧",
      "MRI 非诊断必需",
      "与 cuff tear 可并存"
    ],
    pearls: [
      "被动 ROM 同等受限",
      "自限但耗时长",
      "MRI 囊增厚"
    ]
  },
  bicipital: {
    overview: "肱二头肌长头腱（LHB）腱鞘炎表现为结节间沟区疼痛；US/MRI 见腱鞘积液及 LHB 信号异常。",
    epi: "过头运动及肩峰下撞击人群；常合并 cuff 病变。",
    pathophys: "LHB 在结节间沟反复摩擦→腱鞘炎、部分 tear 或 instability。",
    clinical: [
      "前肩/结节间沟压痛",
      "Speed/Yergason 试验",
      "过头痛",
      "可伴 cuff 症状"
    ],
    staging: "腱鞘炎 vs partial/complete LHB tear。",
    imagingKeys: [
      ["结节间沟积液","US/MRI 腱鞘 fluid"],
      ["LHB 信号增高","MRI T2 腱病"],
      ["groove 骨赘","X 线结节间沟狭窄"]
    ],
    modalities: [
      ["US","超声动态评估LHB 腱鞘炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估LHB 腱鞘炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "NSAIDs、活动调整",
      "注射（谨慎）",
      "合并 cuff：关节镜 tenodesis/tenotomy",
      "物理治疗"
    ],
    ddx: [
      "肩袖撕裂",
      "AC 关节炎",
      "SLAP"
    ],
    pitfalls: [
      "LHB 单独少见",
      "groove 骨性狭窄",
      "与 SLAP 重叠"
    ],
    pearls: [
      "结节间沟压痛",
      "US 床旁诊断",
      "常合并 cuff"
    ]
  },
  tfcc: {
    overview: "三角纤维软骨复合体（TFCC）损伤致尺侧腕痛及 DRUJ 不稳，跌倒撑地或扭转伤；MRI 直接显示 tear。",
    epi: "跌倒撑地、扭转伤；运动员及手工劳动者。",
    pathophys: "TFCC 撕裂或 degeneration→尺侧负荷痛、DRUJ 不稳定、尺骨 positive variance 加重。",
    clinical: [
      "尺侧腕痛",
      "DRUJ 不稳定感",
      "负荷/旋转痛",
      "Fovea  sign"
    ],
    staging: "Palmer 1A–1D 分类；中央 vs peripheral tear。",
    imagingKeys: [
      ["TFCC tear","MRI 高信号穿过 TFCC"],
      ["DRUJ 积液/不稳","尺侧关节间隙增宽"],
      ["尺骨变异","X 线尺骨 positive/negative variance"]
    ],
    modalities: [
      ["MRI","MRI 评估TFCC 损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "支具制动",
      "外围 tear：关节镜修复",
      "中央 tear/退化：清创或 wafer",
      "DRUJ 不稳：韧带重建"
    ],
    ddx: [
      "尺侧腕伸肌腱炎",
      "LT 韧带损伤",
      "尺骨茎突骨折"
    ],
    pitfalls: [
      "中央 tear 血供差愈合差",
      "与 degeneration 鉴别",
      "尺骨变异影响治疗"
    ],
    pearls: [
      "Fovea sign",
      "MRI 术前规划",
      "外围 tear 可修复"
    ]
  },
  "pleo-lps": {
    overview: "多形性脂肪肉瘤（Pleomorphic Liposarcoma）是高级别软组织肉瘤，高级别多形性细胞脂肪肉瘤,老年。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["异质性","异质性：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["坏死","坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["高级别","高级别：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估多形性脂肪肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  leiomyosarcoma: {
    overview: "平滑肌肉瘤（Leiomyosarcoma）是高级别软组织肉瘤，大实性肿块伴坏死出血,中老年。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["实性肿块","实性肿块：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["坏死","坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["不均匀强化","不均匀强化：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估平滑肌肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  rhabdo: {
    overview: "横纹肌肉瘤（Rhabdomyosarcoma）是高级别软组织肉瘤，儿童最常见软组织肉瘤,异质性强化。 MRI 是局部分期及手术规划的关键。",
    epi: "儿童最常见软组织肉瘤；亦见于青少年。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["儿童肉瘤","儿童肉瘤：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["异质性","异质性：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["坏死","坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估横纹肌肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  ups: {
    overview: "未分化多形性肉瘤（UPS / MFH）是高级别软组织肉瘤，高级别多形性肉瘤,中老年深部软组织。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["深部肿块","深部肿块：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["坏死","坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["高级别","高级别：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估未分化多形性肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  "fibrosarcoma-st": {
    overview: "软组织纤维肉瘤（Soft Tissue Fibrosarcoma）是高级别软组织肉瘤，梭形细胞肿瘤,均匀低 T2 区域。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["梭形肿瘤","梭形肿瘤：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["均匀低T2","均匀低T2：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["浸润生长","浸润生长：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估软组织纤维肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  mpnst: {
    overview: "恶性周围神经鞘膜瘤（MPNST）是高级别软组织肉瘤，神经纤维瘤恶变或新发,快速增大伴坏死。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["快速增大","快速增大：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["坏死","坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["神经起源","神经起源：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估恶性周围神经鞘膜瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  angiosarcoma: {
    overview: "血管肉瘤（Angiosarcoma）是高级别软组织肉瘤，高级别血管源性肉瘤,可继发放射区。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["出血坏死","出血坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["不规则强化","不规则强化：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["放射后","放射后：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估血管肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  "epithelioid-sarcoma": {
    overview: "上皮样肉瘤（Epithelioid Sarcoma）是高级别软组织肉瘤，手足或前臂缓慢生长结节,中央坏死。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["中央坏死","中央坏死：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["手足","手足：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["年轻","年轻：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估上皮样肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  "clearcell-sarcoma": {
    overview: "透明细胞肉瘤（Clear Cell Sarcoma）是高级别软组织肉瘤，肌腱旁黑色素性肉瘤,易转移。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["肌腱旁","肌腱旁：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["黑色素","黑色素：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["淋巴结转移","淋巴结转移：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估透明细胞肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  myxofibrosarcoma: {
    overview: "黏液纤维肉瘤（Myxofibrosarcoma）是高级别软组织肉瘤，老年四肢黏液与纤维混合肉瘤,多分叶。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["多分叶","多分叶：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["黏液成分","黏液成分：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["老年","老年：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估黏液纤维肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  lgfm: {
    overview: "低度纤维黏液样肉瘤（Low-grade Fibromyxoid Sarcoma）是低～中级别软组织肉瘤，低度恶性外观,长期随访可转移。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "低～中级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["低度外观","低度外观：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["纤维黏液","纤维黏液：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["延迟转移","延迟转移：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估低度纤维黏液样肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  "extraskeletal-osteo": {
    overview: "骨外骨肉瘤（Extraskeletal Osteosarcoma）是高级别软组织肉瘤，软组织内成骨性恶性肿瘤,老年。 MRI 是局部分期及手术规划的关键。",
    epi: "中老年深部软组织多见；深部大于浅表。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["软组织成骨","软组织成骨：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["矿化","矿化：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["老年","老年：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估骨外骨肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"],
      ["CT","CT 显示骨外骨肉瘤的骨皮质、钙化及复杂解剖细节，适合术前规划。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  "infantile-fibrosarcoma": {
    overview: "婴儿型纤维肉瘤（Infantile Fibrosarcoma）是高级别软组织肉瘤，婴儿期快速生长梭形肿瘤,预后较成人好。 MRI 是局部分期及手术规划的关键。",
    epi: "婴儿期；预后优于成人型。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["婴儿","婴儿：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["快速生长","快速生长：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["ETV6-NTRK","ETV6-NTRK：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估婴儿型纤维肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  kaposi: {
    overview: "卡波西肉瘤（Kaposi Sarcoma）是高级别软组织肉瘤，免疫抑制相关皮肤黏膜与软组织血管肿瘤。 MRI 是局部分期及手术规划的关键。",
    epi: "免疫抑制/HIV 相关；HHV-8。",
    pathophys: "高级别恶性软组织肿瘤→局部浸润及血行转移（肺常见）；坏死、出血及不均匀强化典型。",
    clinical: [
      "进行性增大无痛/疼痛肿块",
      "深部大于浅表",
      "可伴皮肤充血/静脉曲张（高级别）",
      "功能受限"
    ],
    staging: "AJCC 第 8 版 TNM + 分级；MRI 用于 local staging。",
    imagingKeys: [
      ["皮肤紫斑","皮肤紫斑：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["免疫抑制","免疫抑制：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"],
      ["HHV-8","HHV-8：MRI 上可见相应恶性征象，需多平面评估及增强扫描。"]
    ],
    modalities: [
      ["MRI","MRI 评估卡波西肉瘤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。增强 MRI 评估坏死、出血及神经血管关系。"]
    ],
    mgmt: [
      "多学科：广泛切除±放疗",
      "高级别：新辅助/辅助化疗",
      "肺转移监测",
      "避免不恰当活检径路"
    ],
    ddx: [
      "良性软组织肿瘤",
      " abscess/血肿",
      "转移瘤"
    ],
    pitfalls: [
      " biopsy 径路须规划",
      "坏死致假低分级",
      "术后 scar 复发监测"
    ],
    pearls: [
      "MRI 增强+多平面",
      "T1 高信号提示出血",
      "肺 CT 分期"
    ]
  },
  soleus: {
    overview: "比目鱼肌损伤（Soleus Strain）深部小腿肌劳损,与腓肠肌鉴别。 MRI 显示损伤范围及分级。",
    epi: "小腿运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["深部水肿","深部水肿是比目鱼肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["肌束撕裂","肌束撕裂是比目鱼肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["劳损","劳损是比目鱼肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估比目鱼肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "hip-flexor": {
    overview: "髂腰肌损伤（Iliopsoas Strain）髂腰肌或肌腱损伤,髋屈痛,可伴血肿。 MRI 显示损伤范围及分级。",
    epi: "髂腰肌运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["髂腰肌","髂腰肌是髂腰肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["髋屈痛","髋屈痛是髂腰肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["血肿","血肿是髂腰肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估髂腰肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "gluteus-med": {
    overview: "臀中肌肌腱病（Gluteus Medius Tendinopathy）臀中肌止点肌腱病或撕裂,侧卧痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "髋外展过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["止点病变","止点病变是臀中肌肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["Trendelenburg","Trendelenburg是臀中肌肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["外展痛","外展痛是臀中肌肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估臀中肌肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  piriformis: {
    overview: "梨状肌综合征（Piriformis Syndrome）梨状肌压迫坐骨神经,臀痛放射下肢。 MRI 显示损伤范围及分级。",
    epi: "臀部运动损伤；急性多见。",
    pathophys: "直接 trauma→肌肉损伤及血肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["梨状肌","梨状肌是梨状肌综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["坐骨神经","坐骨神经是梨状肌综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["臀痛","臀痛是梨状肌综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估梨状肌综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "snapping-hip": {
    overview: "弹响髋（Snapping Hip）髂腰肌或 ITB 弹响,动态超声可见。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "髋过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["弹响","弹响是弹响髋影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["动态超声","动态超声是弹响髋影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["ITB","ITB是弹响髋影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估弹响髋的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估弹响髋的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  itb: {
    overview: "髂胫束摩擦综合征（IT Band Syndrome）膝外侧疼痛,髂胫束与外侧髁摩擦。 MRI 显示损伤范围及分级。",
    epi: "膝外侧运动损伤；急性多见。",
    pathophys: "直接 trauma→肌肉损伤及血肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["外侧膝痛","外侧膝痛是髂胫束摩擦综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["ITB增厚","ITB增厚是髂胫束摩擦综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["跑步者","跑步者是髂胫束摩擦综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估髂胫束摩擦综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "patellar-tend": {
    overview: "髌腱病（Patellar Tendinopathy）跳跃膝,髌腱近端增厚与信号异常。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "髌腱过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["髌腱增厚","髌腱增厚是髌腱病影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["跳跃膝","跳跃膝是髌腱病影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["止点病","止点病是髌腱病影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估髌腱病的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估髌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "biceps-fem": {
    overview: "股二头肌损伤（Biceps Femoris Strain）股二头肌远端或近端撕裂。 MRI 显示损伤范围及分级。",
    epi: "膝运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["股二头","股二头是股二头肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["腘绳损伤","腘绳损伤是股二头肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["外后侧痛","外后侧痛是股二头肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估股二头肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "tib-post": {
    overview: "胫后肌腱病（Posterior Tibial Tendinopathy）胫后肌腱退变撕裂,成人获得性平足。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "足踝过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["胫后腱","胫后腱是胫后肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["平足","平足是胫后肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["内踝痛","内踝痛是胫后肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估胫后肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估胫后肌腱病的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  peroneal: {
    overview: "腓骨肌腱病（Peroneal Tendinopathy）腓骨长短肌腱撕裂或脱位,外踝后痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "外踝过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["腓骨腱","腓骨腱是腓骨肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["腱脱位","腱脱位是腓骨肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["外踝痛","外踝痛是腓骨肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估腓骨肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估腓骨肌腱病的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  fhl: {
    overview: "拇长屈肌腱病（FHL Tendinopathy）拇长屈肌腱腱鞘炎,舞蹈员足。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "踝过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["FHL腱鞘","FHL腱鞘是拇长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["舞蹈员足","舞蹈员足是拇长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["后踝痛","后踝痛是拇长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估拇长屈肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  fdl: {
    overview: "趾长屈肌腱病（FDL Tendinopathy）趾长屈肌腱退变,足底内侧痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "足过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["FDL","FDL是趾长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["足底痛","足底痛是趾长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["腱鞘炎","腱鞘炎是趾长屈肌腱病影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估趾长屈肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "lat-dorsi": {
    overview: "背阔肌撕裂（Latissimus Dorsi Tear）背阔肌肌腹或止点撕裂,少见。 MRI 显示损伤范围及分级。",
    epi: "腋背运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["背阔肌","背阔肌是背阔肌撕裂影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["运动伤","运动伤是背阔肌撕裂影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["腋痛","腋痛是背阔肌撕裂影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估背阔肌撕裂的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "teres-major": {
    overview: "大圆肌损伤（Teres Major Strain）大圆肌肌腹损伤,内旋痛。 MRI 显示损伤范围及分级。",
    epi: "腋运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["大圆肌","大圆肌是大圆肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["内旋痛","内旋痛是大圆肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["肌腹水肿","肌腹水肿是大圆肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估大圆肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  supraspinatus: {
    overview: "冈上肌肌腱病（Supraspinatus Tendinopathy）冈上肌退变或部分撕裂,肩峰下撞击。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "肩过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["冈上肌","冈上肌是冈上肌肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["撞击","撞击是冈上肌肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["肩峰下","肩峰下是冈上肌肌腱病影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估冈上肌肌腱病的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估冈上肌肌腱病的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "adhesive-caps": {
    overview: "肩关节囊炎（Frozen Shoulder）肩关节囊增厚粘连,分期炎症-冻结-解冻。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "肩过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["囊增厚","囊增厚是肩关节囊炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["活动受限","活动受限是肩关节囊炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["冻结","冻结是肩关节囊炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估肩关节囊炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "forearm-flex": {
    overview: "前臂屈肌群劳损（Forearm Flexor Strain）屈肌群过度使用,网球肘对侧少见。 MRI 显示损伤范围及分级。",
    epi: "前臂运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["屈肌群","屈肌群是前臂屈肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["劳损","劳损是前臂屈肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["前臂痛","前臂痛是前臂屈肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估前臂屈肌群劳损的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "forearm-ext": {
    overview: "前臂伸肌群劳损（Forearm Extensor Strain）伸肌群劳损,与网球肘相关。 MRI 显示损伤范围及分级。",
    epi: "前臂运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["伸肌群","伸肌群是前臂伸肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["网球肘区","网球肘区是前臂伸肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["劳损","劳损是前臂伸肌群劳损影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估前臂伸肌群劳损的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "tennis-elbow": {
    overview: "网球肘（Lateral Epicondylitis）伸肌总腱起点的退变微撕裂,外侧肘痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "肘外侧过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["伸肌总腱","伸肌总腱是网球肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["外侧痛","外侧痛是网球肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["握力弱","握力弱是网球肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估网球肘的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估网球肘的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "golfer-elbow": {
    overview: "高尔夫肘（Medial Epicondylitis）屈肌总腱起点退变,内侧肘痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "肘内侧过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["屈肌总腱","屈肌总腱是高尔夫肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["内侧痛","内侧痛是高尔夫肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["投掷痛","投掷痛是高尔夫肘影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估高尔夫肘的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估高尔夫肘的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "ulnar-neuritis": {
    overview: "尺神经炎（Cubital Tunnel Syndrome）肘管尺神经受压,环指小指麻木。 MRI/US 评估神经受压及周围结构。",
    epi: "肘反复压迫或过度使用；特定职业/运动姿势相关。",
    pathophys: "慢性压迫/摩擦→神经水肿、轴索损伤及相应肌肉失神经改变（慢性）。",
    clinical: [
      "神经分布区 pain/麻木",
      "Tinel  sign",
      "无力（晚期）",
      "姿势/活动诱发"
    ],
    staging: "轻中重按电生理及功能；肌萎缩为晚期。",
    imagingKeys: [
      ["尺神经","尺神经是尺神经炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["肘管","肘管是尺神经炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["麻木","麻木是尺神经炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估尺神经炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估尺神经炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "活动修改、支具",
      "神经松动术",
      "注射减压",
      "顽固：手术松解"
    ],
    ddx: [
      "颈椎/腰椎 radiculopathy",
      "周围神经病",
      "TOS"
    ],
    pitfalls: [
      "EMG 可正常早期",
      "双重 crush",
      "与肌腱病共存"
    ],
    pearls: [
      "动态 US 有价值",
      "夜间症状考虑卡压",
      "EMG 定位"
    ]
  },
  "radial-tunnel": {
    overview: "桡管综合征（Radial Tunnel Syndrome）桡神经深支受压,前臂伸肌痛。 MRI/US 评估神经受压及周围结构。",
    epi: "前臂反复压迫或过度使用；特定职业/运动姿势相关。",
    pathophys: "慢性压迫/摩擦→神经水肿、轴索损伤及相应肌肉失神经改变（慢性）。",
    clinical: [
      "神经分布区 pain/麻木",
      "Tinel  sign",
      "无力（晚期）",
      "姿势/活动诱发"
    ],
    staging: "轻中重按电生理及功能；肌萎缩为晚期。",
    imagingKeys: [
      ["桡神经","桡神经是桡管综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["深支","深支是桡管综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["伸肌痛","伸肌痛是桡管综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估桡管综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "活动修改、支具",
      "神经松动术",
      "注射减压",
      "顽固：手术松解"
    ],
    ddx: [
      "颈椎/腰椎 radiculopathy",
      "周围神经病",
      "TOS"
    ],
    pitfalls: [
      "EMG 可正常早期",
      "双重 crush",
      "与肌腱病共存"
    ],
    pearls: [
      "动态 US 有价值",
      "夜间症状考虑卡压",
      "EMG 定位"
    ]
  },
  dequervain: {
    overview: "德奎尔万腱鞘炎（de Quervain Tenosynovitis）拇短伸与拇长展肌腱鞘炎,Finkelstein 阳性。 MRI 显示损伤范围及分级。",
    epi: "腕桡运动损伤；急性多见。",
    pathophys: "直接 trauma→肌肉损伤及血肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["第一腱鞘","第一腱鞘是德奎尔万腱鞘炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["Finkelstein","Finkelstein是德奎尔万腱鞘炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["桡侧腕痛","桡侧腕痛是德奎尔万腱鞘炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估德奎尔万腱鞘炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估德奎尔万腱鞘炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "trigger-finger": {
    overview: "扳机指（Trigger Finger）屈肌腱 A1 pulley 狭窄,指屈伸卡顿。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "手指过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["A1 pulley","A1 pulley是扳机指影像诊断的重要线索，应结合US与临床表现综合判读。"],
      ["卡顿","卡顿是扳机指影像诊断的重要线索，应结合US与临床表现综合判读。"],
      ["腱鞘增厚","腱鞘增厚是扳机指影像诊断的重要线索，应结合US与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估扳机指的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  bunion: {
    overview: "拇外翻（Hallux Valgus）第一跖趾关节外翻畸形,籽骨移位。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "第一跖趾过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["拇外翻","拇外翻是拇外翻影像诊断的重要线索，应结合X线 · MRI与临床表现综合判读。"],
      ["籽骨","籽骨是拇外翻影像诊断的重要线索，应结合X线 · MRI与临床表现综合判读。"],
      ["骨赘","骨赘是拇外翻影像诊断的重要线索，应结合X线 · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["X线","X 线用于拇外翻的初步筛查、力线及骨性结构评估，隐匿病变可联合 CT/MRI。"],
      ["MRI","MRI 评估拇外翻的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "plantar-fasc": {
    overview: "跖筋膜炎（Plantar Fasciitis）足底筋膜起点退变,晨起第一步痛。 US/MRI 评估腱病、tear 及周围 bursitis。",
    epi: "足底过度使用或退变；运动员及中年多见。",
    pathophys: "反复微损伤→腱退变、胶原紊乱、新生血管及 partial tear。",
    clinical: [
      "局部 pain 活动加重",
      "压痛止点/腱体",
      "功能受限",
      "可及 crepitus"
    ],
    staging: "退变 vs partial vs complete tear；分级指导治疗。",
    imagingKeys: [
      ["筋膜增厚","筋膜增厚是跖筋膜炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["跟骨刺","跟骨刺是跖筋膜炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"],
      ["晨起痛","晨起痛是跖筋膜炎影像诊断的重要线索，应结合US · MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["US","超声动态评估跖筋膜炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"],
      ["MRI","MRI 评估跖筋膜炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "负荷管理、离心训练",
      "注射（PRP/激素谨慎）",
      "partial/complete tear：修复/重建",
      "物理治疗"
    ],
    ddx: [
      "关节源 pain",
      "神经卡压",
      "感染（罕见）"
    ],
    pitfalls: [
      "激素多次注射风险",
      "MRI 与症状可不一致",
      "遗漏 rupture"
    ],
    pearls: [
      "US 动态评估",
      "eccentric 训练证据",
      "止点 vs 腱体"
    ]
  },
  "tarsal-tunnel": {
    overview: "跗管综合征（Tarsal Tunnel Syndrome）胫神经跗管内受压,足底麻木。 MRI/US 评估神经受压及周围结构。",
    epi: "内踝反复压迫或过度使用；特定职业/运动姿势相关。",
    pathophys: "慢性压迫/摩擦→神经水肿、轴索损伤及相应肌肉失神经改变（慢性）。",
    clinical: [
      "神经分布区 pain/麻木",
      "Tinel  sign",
      "无力（晚期）",
      "姿势/活动诱发"
    ],
    staging: "轻中重按电生理及功能；肌萎缩为晚期。",
    imagingKeys: [
      ["胫神经","胫神经是跗管综合征影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["跗管","跗管是跗管综合征影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["足底麻木","足底麻木是跗管综合征影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估跗管综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估跗管综合征的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "活动修改、支具",
      "神经松动术",
      "注射减压",
      "顽固：手术松解"
    ],
    ddx: [
      "颈椎/腰椎 radiculopathy",
      "周围神经病",
      "TOS"
    ],
    pitfalls: [
      "EMG 可正常早期",
      "双重 crush",
      "与肌腱病共存"
    ],
    pearls: [
      "动态 US 有价值",
      "夜间症状考虑卡压",
      "EMG 定位"
    ]
  },
  "sinus-tarsi": {
    overview: "窦道综合征（Sinus Tarsi Syndrome）距骨窦脂肪被纤维组织替代,外踝前痛。 MRI 显示损伤范围及分级。",
    epi: "外踝运动损伤；急性多见。",
    pathophys: "直接 trauma→肌肉损伤及血肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["窦道脂肪","窦道脂肪是窦道综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["纤维替代","纤维替代是窦道综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["外踝前痛","外踝前痛是窦道综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估窦道综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  fibromyalgia: {
    overview: "纤维肌痛以广泛慢性疼痛、压痛点及睡眠障碍为特征；影像主要用于排除其他病因，通常无特异性异常。",
    epi: "中年女性多见；常伴疲劳、认知障碍。",
    pathophys: "中枢敏化→广泛痛觉过敏；非炎性结构性病变。",
    clinical: [
      "广泛疼痛>3 个月",
      "11/18 压痛点（旧标准）/广泛疼痛指数",
      "睡眠差、疲劳",
      "认知 fog"
    ],
    staging: "无；按功能及症状强度管理。",
    imagingKeys: [
      ["无结构性异常","MRI/X 线通常正常"],
      ["排除其他病","必要时 MRI 排除 inflammatory myopathy"],
      ["非特异性","不应过度影像"]
    ],
    modalities: [
      ["临床","诊断靠临床标准；影像排除其他病因。"]
    ],
    mgmt: [
      "运动、认知行为治疗",
      "低剂量三环/ SNRI",
      "避免长期 opioids",
      "睡眠卫生"
    ],
    ddx: [
      " polymyositis",
      "甲状腺病",
      "SLE"
    ],
    pitfalls: [
      "过度影像无意义",
      "与 autoimmune 共存需鉴别",
      "非全或无"
    ],
    pearls: [
      "临床诊断",
      "影像排除而非确诊",
      "多模态非药物干预"
    ]
  },
  "quadriceps-contusion": {
    overview: "股四头肌挫伤（Quadriceps Contusion）直接撞击股四头肌血肿,骨化性肌炎风险。 MRI 显示损伤范围及分级。",
    epi: "大腿运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["肌内血肿","肌内血肿是股四头肌挫伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["挫伤","挫伤是股四头肌挫伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["骨化风险","骨化风险是股四头肌挫伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估股四头肌挫伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "rectus-femoris": {
    overview: "股直肌损伤（Rectus Femoris Injury）直头或折返头撕裂,踢球损伤。 MRI 显示损伤范围及分级。",
    epi: "髋运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["股直肌","股直肌是股直肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["折返头","折返头是股直肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["髋屈痛","髋屈痛是股直肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估股直肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  sartorius: {
    overview: "缝匠肌损伤（Sartorius Strain）缝匠肌肌腹拉伤,少见。 MRI 显示损伤范围及分级。",
    epi: "大腿运动损伤；急性多见。",
    pathophys: "肌肉离心收缩过载→肌纤维撕裂、血肿及水肿。",
    clinical: [
      "急性 pain 肿胀",
      "活动/stretch pain",
      "瘀斑",
      "无力"
    ],
    staging: "Grade I–III（部分至完全）。",
    imagingKeys: [
      ["缝匠肌","缝匠肌是缝匠肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["拉伤","拉伤是缝匠肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["浅表","浅表是缝匠肌损伤影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估缝匠肌损伤的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "RICE 早期",
      "渐进 rehab",
      "Grade III/运动员：手术修复",
      "排除 DVT（小腿）"
    ],
    ddx: [
      "contusion only",
      "compartment syndrome",
      "radiculopathy"
    ],
    pitfalls: [
      "DVT 必须排除（小腿）",
      "低估 complete tear",
      "过早 return"
    ],
    pearls: [
      "MRI 分级 return-to-sport",
      "RF indirect head sprint classic",
      "US 床旁"
    ]
  },
  "si-dysfunction": {
    overview: "骶髂关节功能障碍（SI Joint Dysfunction）骶髂关节源性腰痛,炎症与机械性鉴别。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "骶髂；与 trauma、退变或炎症相关。",
    pathophys: "机械/退变→关节对合异常及 secondary 改变。",
    clinical: [
      "骶髂痛",
      "Gaenslen",
      "注射诊断",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "按功能及影像严重度。",
    imagingKeys: [
      ["骶髂痛","骶髂痛是骶髂关节功能障碍影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["Gaenslen","Gaenslen是骶髂关节功能障碍影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["注射诊断","注射诊断是骶髂关节功能障碍影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估骶髂关节功能障碍的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  "sacroiliitis-infl": {
    overview: "炎性骶髂关节炎（Inflammatory Sacroiliitis）强直性脊柱炎等炎性骶髂关节炎,MRI 水肿。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "骶髂；与 trauma、退变或炎症相关。",
    pathophys: "炎症→滑膜增生、骨髓水肿及关节破坏（若 untreated）。",
    clinical: [
      "骨髓水肿",
      "侵蚀",
      "双侧对称",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "ASAS 骶髂 MRI 标准。",
    imagingKeys: [
      ["骨髓水肿","骨髓水肿是炎性骶髂关节炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["侵蚀","侵蚀是炎性骶髂关节炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["双侧对称","双侧对称是炎性骶髂关节炎影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估炎性骶髂关节炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  "pubic-symphysis": {
    overview: "耻骨联合病变（Pubic Symphysis Disorder）运动员耻骨炎或产后耻骨联合分离。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "耻骨联合；与 trauma、退变或炎症相关。",
    pathophys: "机械/退变→关节对合异常及 secondary 改变。",
    clinical: [
      "耻骨炎",
      "联合分离",
      "运动员",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "按功能及影像严重度。",
    imagingKeys: [
      ["耻骨炎","耻骨炎是耻骨联合病变影像诊断的重要线索，应结合MRI · X线与临床表现综合判读。"],
      ["联合分离","联合分离是耻骨联合病变影像诊断的重要线索，应结合MRI · X线与临床表现综合判读。"],
      ["运动员","运动员是耻骨联合病变影像诊断的重要线索，应结合MRI · X线与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估耻骨联合病变的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["X线","X 线用于耻骨联合病变的初步筛查、力线及骨性结构评估，隐匿病变可联合 CT/MRI。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  "hip-synovitis": {
    overview: "髋关节滑膜炎（Hip Synovitis）一过性髋关节滑膜炎(儿童)或炎性滑膜炎。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "髋关节；与 trauma、退变或炎症相关。",
    pathophys: "炎症→滑膜增生、骨髓水肿及关节破坏（若 untreated）。",
    clinical: [
      "关节积液",
      "滑膜增厚",
      "儿童跛行",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "按功能及影像严重度。",
    imagingKeys: [
      ["关节积液","关节积液是髋关节滑膜炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["滑膜增厚","滑膜增厚是髋关节滑膜炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"],
      ["儿童跛行","儿童跛行是髋关节滑膜炎影像诊断的重要线索，应结合MRI · US与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估髋关节滑膜炎的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"],
      ["US","超声动态评估髋关节滑膜炎的肌腱/神经/滑膜改变，可床旁复查及引导介入。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  plica: {
    overview: "膝滑膜皱襞综合征（Plica Syndrome）滑膜皱襞肥厚嵌顿,前膝痛。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "膝关节；与 trauma、退变或炎症相关。",
    pathophys: "机械/退变→关节对合异常及 secondary 改变。",
    clinical: [
      "皱襞肥厚",
      "前膝痛",
      "屈伸痛",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "按功能及影像严重度。",
    imagingKeys: [
      ["皱襞肥厚","皱襞肥厚是膝滑膜皱襞综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["前膝痛","前膝痛是膝滑膜皱襞综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["屈伸痛","屈伸痛是膝滑膜皱襞综合征影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估膝滑膜皱襞综合征的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  "shoulder-instability": {
    overview: "肩关节不稳（Shoulder Instability）复发性肩脱位或松弛,骨性/软组织 Bankart。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "肩；与 trauma、退变或炎症相关。",
    pathophys: "不稳或 repeat dislocation→骨性/软组织 Bankart/Hill-Sachs 等。",
    clinical: [
      "复发脱位",
      "盂唇缺损",
      "Hill-Sachs",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "MDI vs TUBS；骨性 vs soft Bankart。",
    imagingKeys: [
      ["复发脱位","复发脱位是肩关节不稳影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["盂唇缺损","盂唇缺损是肩关节不稳影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["Hill-Sachs","Hill-Sachs是肩关节不稳影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估肩关节不稳的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  },
  "tfcc-degen": {
    overview: "TFCC 退变（TFCC Degeneration）三角纤维软骨退变撕裂,尺侧腕痛。 MRI 评估关节/韧带/软骨及周围软组织。",
    epi: "腕；与 trauma、退变或炎症相关。",
    pathophys: "机械/退变→关节对合异常及 secondary 改变。",
    clinical: [
      "TFCC退变",
      "尺侧痛",
      "尺骨阳性变异",
      "局部 pain/不稳",
      "活动受限"
    ],
    staging: "按功能及影像严重度。",
    imagingKeys: [
      ["TFCC退变","TFCC退变是TFCC 退变影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["尺侧痛","尺侧痛是TFCC 退变影像诊断的重要线索，应结合MRI与临床表现综合判读。"],
      ["尺骨阳性变异","尺骨阳性变异是TFCC 退变影像诊断的重要线索，应结合MRI与临床表现综合判读。"]
    ],
    modalities: [
      ["MRI","MRI 评估TFCC 退变的骨髓水肿、软组织及肌腱/滑膜改变，无辐射，适合分级与随访。"]
    ],
    mgmt: [
      "保守：PT、支具、注射",
      "不稳/结构 tear：关节镜/开放修复",
      "炎症：免疫调节",
      "个体化 return-to-sport"
    ],
    ddx: [
      "机械性 pain",
      "感染",
      "肿瘤（不典型时）"
    ],
    pitfalls: [
      "MRI 非万能",
      "双边对比重要",
      "遗漏 labral/bony lesion"
    ],
    pearls: [
      "临床+影像综合",
      "对比 MRI",
      "专项试验引导影像"
    ]
  }
};

/** 列表字段条数变化层：简单病 2–3 条，复杂病 5–7 条，由 scripts/build-list-variation.mjs 生成 */
export default {
  ostoidoma: {
    ddx: [
      "骨母细胞瘤:体积更大(>1.5–2 cm)、NSAID 效果差、好发脊柱后柱",
      "应力性骨折:线状骨折线、无巢状透亮区、与过度使用相关",
      "Brodie 脓肿:可有窦道、感染指标升高、抗菌治疗有效"
    ],
    pitfalls: [
      "巢灶过小(<5 mm)平片易漏诊,症状典型时仍需 CT",
      "勿将显著反应性硬化误判为成骨性恶性肿瘤或骨肉瘤"
    ],
    pearls: [
      "夜间痛+阿司匹林/NSAID 有效是临床诊断三联征",
      "CT 是定位 nidus 及规划消融的首选影像",
      "射频消融可避免开放手术,尤其适用于四肢典型病例"
    ]
  },
  ostoblastoma: {
    ddx: [
      "骨样骨瘤:更小(<1.5 cm)、NSAID 有效、皮质内 nidus 典型",
      "动脉瘤样骨囊肿:液-液平、无骨样基质钙化、更偏心性",
      "成骨性转移:年龄偏大、多发病灶、碱性磷酸酶升高"
    ],
    pitfalls: [
      "与骨样骨瘤在大小上存在灰区(1.5–2 cm),需综合临床 NSAID 反应判断",
      "脊柱病变切勿漏评神经压迫,可急性进展",
      "刮除不全易复发,尤其是骨壳不完整区域"
    ],
    pearls: [
      ">2 cm 且 NSAID 无效时倾向骨母细胞瘤而非骨样骨瘤",
      "CT 显示骨壳与钙化分布是术前规划关键",
      "脊柱后柱是特征部位,MRI 评估神经结构必需"
    ]
  },
  fibrodysplasia: {
    mgmt: [
      "无症状者可观察,定期影像随访",
      "矫形手术及内固定处理畸形与病理性骨折",
      "双膦酸盐可减轻骨痛,疗效存在个体差异",
      "放疗严格禁忌(恶变风险);MCAS 需内分泌科联合管理"
    ],
    ddx: [
      "Paget 病:老年发病、骨增大伴混合溶骨-硬化、碱性磷酸酶升高",
      "单纯性骨囊肿:边界更清、单房透亮、无磨玻璃基质",
      "低度中心性骨肉瘤:成人、进展性骨破坏、可伴疼痛加重"
    ],
    pitfalls: [
      "磨玻璃样改变并非 FD 特有,需结合年龄、分布及临床表现",
      "MCAS 患者需全面内分泌评估,勿仅关注骨骼",
      "放疗可诱发恶变,任何情况下均应避免"
    ],
    pearls: [
      "磨玻璃+骨膨胀+无骨膜反应是经典影像三联",
      "股骨颈受累是病理性骨折高风险部位",
      "MRI 用于术前范围评估及发现 Mazabraud 软组织黏液瘤"
    ]
  },
  abc: {
    ddx: [
      "单纯性骨囊肿:中心性、单房、膨胀较轻、无液平",
      "骨巨细胞瘤:偏心、无骨壳、好发骨骺、成人多见",
      "血管扩张性骨肉瘤:高度恶性、软组织肿块、骨膜反应"
    ],
    pitfalls: [
      "液平亦见于 GCT、软骨黏液样纤维瘤等,不能单凭液平诊断",
      "必须排除继发 ABC 的 underlying 骨肿瘤,活检需多部位"
    ],
    pearls: [
      "液平+膨胀骨壳高度提示 ABC,但需 CT/MRI 确认",
      "CT 评估骨壳完整性是 Capanna 分型的基础",
      "脊柱 ABC 需神经科/骨科联合评估压迫情况"
    ]
  },
  ubc: {
    ddx: [
      "动脉瘤样骨囊肿:偏心性、多房、膨胀显著、可见液平",
      "纤维结构不良:磨玻璃密度、非单房透亮、无囊腔结构",
      "Ewing 瘤:骨膜反应、软组织肿块、全身症状"
    ],
    pitfalls: [
      "骨折后改变可暂时掩盖典型单房透亮表现",
      "勿与 ABC 混淆:UBC 为中心性、单房、膨胀较轻",
      "囊内注射常需多次,单次成功率有限"
    ],
    pearls: [
      "落雪征是 UBC 病理骨折的特征性征象",
      "活动期囊肿更靠近生长板,复发率更高",
      "儿童肱骨近端 UBC 是最经典发病部位"
    ]
  },
  enchondroma: {
    ddx: [
      "软骨肉瘤:深部大骨、皮质破坏、软组织肿块、成人",
      "骨梗死: serpiginous 硬化边、无软骨基质钙化",
      "低度中心性骨肉瘤:无环弧钙化、成人髓内溶骨"
    ],
    pitfalls: [
      "深部大骨(股骨、肱骨、骨盆)单发内生软骨瘤需高度警惕软骨肉瘤",
      "疼痛+皮质破坏+软组织肿块=恶变警报,需立即活检",
      "Maffucci 恶变率最高,不可按良性单发处理"
    ],
    pearls: [
      "手短骨环弧状钙化几乎均为良性内生软骨瘤",
      "深部股骨/骨盆单发病变\"宁恶勿善\",倾向活检",
      "MRI 增强及软组织肿块评估是恶变监测关键"
    ]
  },
  chondroblastoma: {
    ddx: [
      "骨巨细胞瘤:无钙化、更偏 eccentric、骨骺已闭合成人多见",
      "感染/化脓性关节炎:临床炎症指标升高、发热",
      "软骨肉瘤:年龄偏大、破坏更重、软组织肿块"
    ],
    pitfalls: [
      "勿与 GCT 混淆:钙化存在+青少年骨骺=软骨母细胞瘤",
      "刮除接近 physis 可致生长障碍,需权衡",
      "复发多因刮除不全,尤其骨壳不完整区域"
    ],
    pearls: [
      "青少年骨骺溶骨+钙化=软骨母细胞瘤直至证明否则",
      "CT 显示钙化是鉴别 GCT 的最可靠方法",
      "MRI 评估 physis 跨越及关节面受累是术前必需"
    ]
  },
  nof: {
    ddx: [
      "纤维结构不良:髓内磨玻璃,非皮质缺损",
      "Brodie 脓肿:有症状、无硬化缘、感染指标升高",
      "皮质内骨肉瘤:持续进展、无硬化缘、成人"
    ],
    pitfalls: [
      "勿过度治疗偶然发现的小 NOF,是正常发育变异",
      "Jaffe III 级大 NOF 可致病理性骨折,需评估",
      "与纤维结构不良部位(髓内)和密度(磨玻璃)不同"
    ],
    pearls: [
      "儿童干端皮质偏心性缺损=NOF 直至证明否则",
      "随年龄向远端\"迁移\"并最终愈合是特征性病程",
      "Jaffe III 级需评估骨折风险,但多数仍观察"
    ]
  },
  lchbone: {
    ddx: [
      "Ewing 瘤:骨膜反应、软组织肿块、小圆细胞",
      "骨髓炎:发热、感染指标升高、抗菌治疗有效",
      "转移瘤:多发病灶、老年、原发肿瘤史"
    ],
    pitfalls: [
      "多系统 LCH 需全身评估(胸 CT、腹部超声、内分泌)",
      "脊柱病变勿漏评脊髓压迫,可急性进展",
      "与 Ewing 瘤影像可重叠,活检及免疫组化鉴别"
    ],
    pearls: [
      "儿童扁平椎+椎间隙正常=LCH 经典表现",
      "颅骨穿孔样破坏是 LCH 特征性征象",
      "多系统型需儿科肿瘤科协作,不可仅局部处理"
    ]
  },
  chordoma: {
    mgmt: [
      "广泛切除是治愈关键,骶骨切除可达 S3 水平",
      "质子/重离子放疗用于不可切除或辅助治疗",
      "化疗效果有限,靶向(BRACHYURY、EGFR)在研究中",
      "复发率高(50–70%),需长期随访"
    ],
    ddx: [
      "软骨肉瘤:环弧钙化、T2 信号低于脊索瘤、偏侧骶骨",
      "骨巨细胞瘤:偏侧、无 T2 极高信号、无黏液基质",
      "转移瘤:多发病灶、原发肿瘤史"
    ],
    pitfalls: [
      "活检通道必须规划在最终切除范围内",
      "颅底病变与脑干/垂体关系复杂,需多学科规划",
      "勿误判为良性软骨样肿瘤而延误治疗"
    ],
    pearls: [
      "骶骨中线 T2 极高信号肿块=脊索瘤直至证明否则",
      "MRI 评估神经结构(骶神经、脑干)是术前必需",
      "广泛切除范围是预后最强预测因子"
    ]
  },
  parosteo: {
    ddx: [
      "骨赘/骨软骨瘤:有蒂、髓腔连续、表面平滑",
      "经典型骨肉瘤:髓腔侵犯、骨破坏、软组织肿块",
      "骨化性肌炎:周围钙化成熟、外伤史、无骨表面基底"
    ],
    pitfalls: [
      "低度恶性不可低估,完整切除范围需足够",
      "MRI 必须确认髓腔未受累",
      "Dedifferentiation 罕见但预后急剧恶化,需 ample 活检"
    ],
    pearls: [
      "宽基底+骨皮质完整+股骨远端后方=parosteal OS",
      "MRI 排除髓腔侵犯是手术规划关键",
      "低度恶性通常不需化疗,但需广泛切除"
    ]
  },
  telosteo: {
    ddx: [
      "ABC:无软组织肿块、骨壳完整、无骨膜反应",
      "骨巨细胞瘤:无骨膜反应、骨骺好发",
      "Ewing 瘤:儿童、洋葱皮骨膜反应"
    ],
    pitfalls: [
      "与 ABC 影像极易混淆,是骨科影像最常见陷阱之一",
      "活检必须多部位、充分组织"
    ],
    pearls: [
      "ABC 样外观+软组织肿块=高度怀疑 telangiectatic OS",
      "多部位活检是确诊关键",
      "必须按高度恶性 OS 多模式治疗"
    ]
  },
  periosteo: {
    ddx: [
      "Parosteal OS:低度、宽基底、少骨膜反应、皮质完整",
      "反应性骨膜骨化:无肿块、外伤/感染史",
      "Ewing 瘤:髓内起源、溶骨为主"
    ],
    pitfalls: [
      "与 parosteal OS 恶性度完全不同,治疗方案不同",
      "骨膜反应非特异,需活检确认",
      "MRI 评估髓腔侵犯是手术规划必需"
    ],
    pearls: [
      "显著骨膜反应+骨膜下成骨=考虑 periosteal OS",
      "MRI 评估髓腔侵犯",
      "按中等度 OS 化疗,不可按 parosteal OS 处理"
    ]
  },
  "lgc-osteo": {
    mgmt: [
      "广泛切除或刮除+辅助",
      "监测 dedifferentiation(影像突然变化或疼痛加重)",
      "放疗不首选",
      "dedifferentiation 后按高级别 OS 治疗"
    ],
    ddx: [
      "纤维结构不良:儿童/青少年、磨玻璃密度、GNAS 突变",
      "骨梗死:serpiginous 硬化边、有缺血史",
      "经典型骨肉瘤:更 aggressive、软组织肿块"
    ],
    pitfalls: [
      "与 FD 混淆是诊断延误最常见原因",
      "活检需代表区域,避免仅取到低级别成分",
      "dedifferentiation 急剧改变预后"
    ],
    pearls: [
      "成人\"FD 样\"髓内病变=LGC-OS 直至排除",
      "长期随访观察进展是鉴别 FD 的关键",
      "MRI 增强有助于与 FD 鉴别"
    ]
  },
  plasmacytoma: {
    ddx: [
      "转移瘤:原发不明、多发病灶、老年",
      "骨淋巴瘤:软组织肿块更突出、DWI 扩散受限",
      "多发性骨髓瘤:多骨+骨髓克隆性浆细胞≥10%"
    ],
    pitfalls: [
      "骨髓活检是排除 MM 的必需步骤",
      "单骨病变≠孤立性,需全身评估",
      "放疗后需长期随访监测 MM 进展"
    ],
    pearls: [
      ">40 岁纯溶骨+脊柱=考虑浆细胞肿瘤",
      "全身 MRI/PET-CT 分期必需",
      "放疗是 SBP 治愈性治疗首选"
    ]
  },
  lymphomabone: {
    ddx: [
      "Ewing 瘤:儿童、骨膜反应、小圆细胞",
      "转移瘤:多发病灶、原发肿瘤史",
      "骨肉瘤:骨膜反应、ALP 升高、破坏重"
    ],
    pitfalls: [
      "X 线可严重低估病变范围,MRI/PET 必需",
      "活检需足够组织用于免疫组化",
      "与 Ewing 瘤鉴别需分子检测"
    ],
    pearls: [
      "软组织肿块+骨破坏轻=考虑骨淋巴瘤",
      "DWI 扩散受限是重要辅助征象",
      "化疗为主,预后优于大多数骨恶性肿瘤"
    ]
  },
  adamantinoma: {
    ddx: [
      "骨纤维发育不良(OFD):儿童、不转移、前胫同样部位",
      "纤维结构不良:磨玻璃密度、非前皮质",
      "骨肉瘤:更 aggressive、软组织肿块、ALP 升高"
    ],
    pitfalls: [
      "与 OFD 鉴别依赖年龄和组织学,影像可相似",
      "多灶性易漏诊,需全面影像评估",
      "低度恶性≠良性,不可观察"
    ],
    pearls: [
      "成人胫骨前皮质多灶溶骨=adamantinoma 直至证明否则",
      "与 OFD 构成疾病谱,年龄是重要鉴别点",
      "终身肺转移监测必需"
    ]
  },
  fibrosarcomabone: {
    ddx: [
      "骨肉瘤:骨化/骨样基质、ALP 升高",
      "MFH/UPS:影像相似,免疫组化鉴别",
      "转移瘤:多发病灶、原发肿瘤史"
    ],
    pitfalls: [
      "无骨化易与转移瘤混淆",
      "活检是确诊唯一途径"
    ],
    pearls: [
      "纯溶骨+无骨化=纤维肉瘤谱系考虑",
      "MRI 评估软组织范围",
      "广泛切除是主要治疗手段"
    ]
  },
  hemangioendo: {
    ddx: [
      "转移瘤:已知原发、多发病灶",
      "骨血管瘤:良性、无骨破坏、椎体 corduroy",
      "Ewing 瘤:儿童、骨膜反应"
    ],
    pitfalls: [
      "影像非特异,多灶时易误诊为转移",
      "病理+免疫组化是确诊必需",
      "与良性血管瘤行为差异大"
    ],
    pearls: [
      "多灶溶骨+无原发肿瘤=考虑 HE",
      "MRI 评估多灶范围",
      "免疫组化(CD31/ERG)确诊"
    ]
  },
  "cc-chondro": {
    ddx: [
      "软骨母细胞瘤:青少年、良性、刮除有效",
      "常规软骨肉瘤:深部、干端、非骨骺",
      "骨巨细胞瘤:无钙化、无软骨基质"
    ],
    pitfalls: [
      "与软骨母细胞瘤年龄存在交叉(20–30 岁灰区)",
      "刮除不全复发率高",
      "低度仍可转移,不可掉以轻心"
    ],
    pearls: [
      "成人骨骺软骨肿瘤=CCCS 直至证明否则",
      "广泛切除,勿按软骨母细胞瘤刮除",
      "CT 发现细微钙化有助于鉴别 GCT"
    ]
  },
  "dediff-chondro": {
    mgmt: [
      "广泛切除+化疗(肉瘤方案)",
      "预后差,5 年生存约 10–20%",
      "肺转移常见,需全身治疗",
      "活检需多部位避免仅取到低级别成分"
    ],
    ddx: [
      "常规 II 级软骨肉瘤:无 dediff 区域",
      "骨肉瘤:无软骨成分",
      "MFH/UPS:无低度软骨区"
    ],
    pitfalls: [
      "活检可能仅取到 low-grade 成分,导致低估",
      "需 ample、多部位活检",
      "Sudden 临床变化= dediff 警报"
    ],
    pearls: [
      "软骨钙化+ aggressive 区= dediff CS",
      "多部位活检是确诊关键",
      "按高度恶性肉瘤多模式治疗"
    ]
  },
  "mesench-chondro": {
    mgmt: [
      "广泛切除为主，脊柱/骨盆手术复杂度高",
      "辅助化疗（方案类似 Ewing/小圆细胞肿瘤）",
      "放疗用于无法切除或辅助",
      "肺转移监测及多学科肉瘤中心管理"
    ],
    ddx: [
      "Ewing 瘤：儿童多见，通常无软骨岛",
      "普通软骨肉瘤：无小圆细胞成分",
      "淋巴瘤：无软骨钙化"
    ],
    pitfalls: [
      "活检可能仅取到小细胞区导致误判",
      "需 ample 活检含软骨成分",
      "脊柱手术需神经监测"
    ],
    pearls: [
      "小圆细胞+软骨岛=间叶性软骨肉瘤",
      "颌骨/脊柱为经典部位",
      "化疗较普通软骨肉瘤更有效"
    ]
  },
  "peri-chondro": {
    ddx: [
      "骨软骨瘤:有蒂、髓腔连续、干端好发",
      "软骨肉瘤(周围型):深部、破坏、软组织肿块",
      "骨化性肌炎:外伤史、周围钙化成熟"
    ],
    pitfalls: [
      "与骨软骨瘤混淆(表面位置相似)",
      "无髓腔连续是鉴别关键",
      "勿过度切除"
    ],
    pearls: [
      "骨表面+无髓腔连续=骨膜软骨瘤",
      "指骨表面最常见",
      "切除治愈,复发极少"
    ]
  },
  osteoma: {
    ddx: [
      "骨软骨瘤:长骨、髓腔连续、有蒂",
      "外生骨疣:形态不同、表面不规则"
    ],
    pitfalls: [
      "Gardner 综合征需结肠镜筛查",
      "与 exostosis 命名易混淆"
    ],
    pearls: [
      "额窦均匀致密骨块=骨瘤",
      "Gardner=多发骨瘤+结肠息肉"
    ],
    mgmt: [
      "无症状者观察",
      "sinus 阻塞/反复感染/美容需求:手术切除",
      "Gardner 综合征:定期结肠镜(息肉恶变风险)"
    ]
  },
  melorheostosis: {
    ddx: [
      "Paget 病:老年、混合溶骨-硬化、ALP 升高",
      "骨化性肌炎:外伤史、软组织钙化",
      "旁骨性骨肉瘤:软组织肿块、成人"
    ],
    pitfalls: [
      "罕见,易误诊为其他骨病变",
      "与 Paget 病年龄不符"
    ],
    pearls: [
      "蜡油沿骨长轴=melorheostosis,影像独特",
      "X 线即可诊断",
      "矫形手术为主,无特效药"
    ]
  },
  osteopoikilosis: {
    ddx: [
      "骨转移(成骨性):不对称、已知原发、进展性",
      "骨条纹症:线状而非 round foci"
    ],
    pitfalls: [
      "勿误判为转移瘤(对称+无破坏是关键)",
      "骨扫描可无摄取或轻度摄取"
    ],
    pearls: [
      "对称多发硬化骨岛=骨斑点症",
      "无临床意义,无需治疗"
    ],
    mgmt: [
      "无需治疗",
      "告知良性,解除焦虑",
      "Buschke-Ollendorff:皮肤科随访"
    ]
  },
  striata: {
    ddx: [
      "成骨性转移:非线性、不对称、进展性",
      "蜡油状骨病:蜡油状 cortical、非线状"
    ],
    pitfalls: [
      "与转移瘤混淆(形态线性+对称是关键)",
      "可与 poikilosis 合并"
    ],
    pearls: [
      "线状 striations 沿骨长轴=骨条纹症",
      "良性,无临床意义"
    ],
    mgmt: [
      "观察,无需治疗",
      "告知良性",
      "无需随访"
    ]
  },
  cortdesmoid: {
    ddx: [
      "NOF:干端偏心性、非后内侧特定部位",
      "Brodie 脓肿:有症状、无硬化缘、感染指标升高"
    ],
    pitfalls: [
      "勿过度活检或切除,是自限性病变",
      "与 NOF 位置不同(后内侧 vs 偏心性)"
    ],
    pearls: [
      "儿童胫骨后内侧皮质缺损=cortical desmoid",
      "观察即可,切勿手术"
    ],
    mgmt: [
      "观察即可,无需手术",
      "自限性,随生长自愈",
      "告知家长,解除焦虑"
    ]
  },
  iolipoma: {
    ddx: [
      "骨梗死:serpiginous 硬化边、无脂肪密度",
      "转移瘤:非脂肪密度、破坏"
    ],
    pitfalls: [
      "罕见,需 CT 确认脂肪成分",
      "与骨梗死混淆(脂肪密度是关键)"
    ],
    pearls: [
      "CT -100 HU=骨内脂肪瘤确诊",
      "跟骨是最常见部位"
    ],
    mgmt: [
      "观察为主",
      "有症状(罕见)可切除",
      "无需活检(CT 确诊)"
    ]
  },
  browntumor: {
    ddx: [
      "骨巨细胞瘤:无 HPT、单发、无 subperiosteal resorption",
      "转移瘤:多发病灶、原发肿瘤",
      "动脉瘤样骨囊肿:儿童、液平、单发"
    ],
    pitfalls: [
      "勿当原发性肿瘤广泛切除",
      "必须查 Ca/PTH/ALP/肾功能"
    ],
    pearls: [
      "溶骨+ HPT=棕色瘤",
      "Subperiosteal resorption 是 HPT 特征",
      "治疗 HPT 而非切除骨病变"
    ]
  },
  "skelet-hemang": {
    ddx: [
      "转移瘤:多灶、已知原发、破坏皮质",
      "Paget 病:颅骨混合密度、老年"
    ],
    pitfalls: [
      "椎体血管瘤可 simulate 转移(但 corduroy+无破坏)",
      "MRI T2 高信号非特异"
    ],
    pearls: [
      "椎体 corduroy=血管瘤,通常 incidental",
      "CT polka-dot 征确诊"
    ],
    mgmt: [
      "无症状者观察,无需治疗",
      "症状性:血管栓塞或放疗(罕见)",
      "病理性骨折:内固定"
    ]
  },
  "fd-mazabraud": {
    ddx: [
      "孤立 FD：无肌内黏液瘤",
      "软组织肉瘤：侵袭性生长及骨破坏",
      "ABC：液平及膨胀性骨病变"
    ],
    pitfalls: [
      "肌内黏液瘤位置与 FD 骨相关",
      "FD 中放疗可诱发恶变",
      "黏液瘤可多发"
    ],
    pearls: [
      "FD+肌内黏液瘤=Mazabraud",
      "MRI 搜寻邻近骨的 T2 极高肿块",
      "避免放疗"
    ]
  },
  "ossifying-fibroma": {
    ddx: [
      "纤维结构不良:长骨、磨玻璃、非颌骨",
      "成釉细胞瘤:多房、soap-bubble、更侵袭性",
      "骨肉瘤:破坏、软组织肿块"
    ],
    pitfalls: [
      "颌骨 location 是诊断关键",
      "juvenile 型复发率更高,需更积极处理",
      "与成釉细胞瘤鉴别(后者更侵袭性)"
    ],
    pearls: [
      "颌骨纤维-骨病变=ossifying fibroma",
      "CT 评估范围及牙关系",
      "Juvenile 型更 aggressive,需积极切除"
    ]
  },
  paget: {
    mgmt: [
      "双膦酸盐( zoledronic acid)为一线",
      "处理并发症(骨折、畸形)",
      "监测肉瘤转化(1%):疼痛突然加重+新发肿块",
      "Calcitonin 用于不能耐受双膦酸盐者",
      "双膦酸盐/地诺单抗抑制骨转换",
      "畸形：截骨矫形",
      "恶变：广泛切除"
    ],
    ddx: [
      "溶骨性转移:多灶、原发肿瘤、无骨增大",
      "纤维结构不良:年轻、磨玻璃、无 ALP 升高",
      "前列腺癌成骨转移:不同模式、PSA 升高",
      "转移瘤 blastic：多灶、已知原发",
      "骨纤维结构不良：年轻、磨玻璃"
    ],
    pitfalls: [
      "ALP 升高但 Ca 正常(区别于 HPT)",
      "肉瘤转化:疼痛加重+软组织肿块=紧急评估",
      "骨折后弯曲脊柱(picture frame vertebra 后)",
      "ALP 升高但可正常于 monostotic",
      "新发疼痛+肿块=恶变警报"
    ],
    pearls: [
      "老年骨增大+ALP 升高=Paget 病",
      "Blade of grass 是溶骨期经典表现",
      "1% 肉瘤转化风险,需长期监测",
      "Blade of grass lytic phase",
      "1% 继发骨肉瘤风险"
    ]
  },
  "polyostotic-fd": {
    mgmt: [
      "无症状：观察及定期影像",
      "双膦酸盐减轻骨痛",
      "矫形内固定处理畸形与骨折",
      "MAS：内分泌科管理性早熟等；放疗禁忌"
    ],
    ddx: [
      "多骨转移：年龄、原发瘤及破坏模式不同",
      "Paget 病：老年、混合密度",
      "多骨血管瘤：垂直条纹/polka-dot"
    ],
    pitfalls: [
      "MAS 需内分泌全面评估",
      "放疗可诱发 FD 恶变",
      "注意 Mazabraud 肌内黏液瘤"
    ],
    pearls: [
      "多骨磨玻璃+儿童=多骨型 FD",
      "shepherd crook 股骨颈需防骨折",
      "筛查 MAS 内分泌"
    ]
  },
  hme: {
    mgmt: [
      "有症状者手术切除",
      "监测软骨帽厚度(MRI)",
      "恶变:广泛切除按软骨肉瘤处理",
      "矫形处理畸形和短肢"
    ],
    ddx: [
      "多发内生软骨瘤(Ollier):髓内、非表面",
      "转移性骨肿瘤:成人、溶骨、无髓腔连续",
      "单发骨软骨瘤:单个、无家族史"
    ],
    pitfalls: [
      "成人软骨帽>2 cm=恶变可疑,需活检",
      "骨盆骨软骨瘤手术复杂",
      "不完全切除可复发"
    ],
    pearls: [
      "多发 exostoses+家族史=HME",
      "MRI 软骨帽厚度是恶变监测关键",
      "EXT1 突变恶变风险更高"
    ]
  },
  maffucci: {
    mgmt: [
      "终身影像随访监测恶变",
      "矫形处理畸形",
      "可疑恶变病灶积极切除活检",
      "血管畸形出血:栓塞或切除"
    ],
    ddx: [
      "Ollier 病(无血管瘤):无软组织血管畸形",
      "HME:表面骨软骨瘤,非髓内",
      "Proteus 综合征:过度生长、不同模式"
    ],
    pitfalls: [
      "内生软骨瘤病中恶变风险最高(25–30%)",
      "单侧 predominance 是重要线索",
      "血管畸形可出血,需注意"
    ],
    pearls: [
      "内生软骨瘤病+血管瘤=Maffucci",
      "25–30% 软骨肉瘤恶变率,最高",
      "终身严密监测,不可按良性观察"
    ]
  },
  galeazzi: {
    ddx: [
      "Essex-Lopresti：桡骨头骨折+骨间膜+DRUJ 三联",
      "单纯桡骨骨折：DRUJ 稳定、尺桡关系正常",
      "Monteggia：尺骨骨折+桡骨头脱位"
    ],
    pitfalls: [
      "仅固定桡骨而忽视 DRUJ 致慢性尺侧痛",
      "桡骨短缩复位不良导致 DRUJ 持续不稳"
    ],
    pearls: [
      "凡桡骨远段骨折必查 DRUJ",
      "真侧位是评估尺桡分离的关键体位",
      "复位并固定桡骨后 DRUJ 常可恢复稳定"
    ]
  },
  bennett: {
    ddx: [
      "Rolando 骨折：Y/T 形关节内粉碎",
      "Gamekeeper 拇指：尺侧副韧带损伤",
      "第一掌骨基底关节外骨折"
    ],
    pitfalls: [
      "单纯石膏固定再移位及不愈合率高",
      "关节台阶未纠正易早发创伤性关节炎",
      "勿将 Rolando 粉碎型误判为简单 Bennett"
    ],
    pearls: [
      "Bennett=关节内骨折+APL 牵拉移位",
      "CT 对术前螺钉方向规划至关重要",
      "稳定内固定允许早期功能活动"
    ]
  },
  boxer: {
    ddx: [
      "第五掌骨骨干骨折：部位不同、处理原则有别",
      "Bennett 骨折：第一掌骨基底"
    ],
    pitfalls: [
      "忽视旋转畸形（比成角更影响功能）",
      "成角可接受标准因掌骨序号而异"
    ],
    pearls: [
      "最常见的手部骨折",
      "旋转畸形比成角更影响功能"
    ],
    mgmt: [
      "闭合复位后尺侧沟形石膏固定",
      "成角过大或旋转畸形明显者考虑手术",
      "2–3 周后开始早期活动锻炼"
    ]
  },
  scapholunate: {
    ddx: [
      "舟骨骨折：鼻烟窝压痛、舟骨内骨折线",
      "月三角韧带损伤：尺侧腕痛为主",
      "CPPD：软骨钙质沉积，分布不同"
    ],
    pitfalls: [
      "平片早期可完全正常",
      "Grip 应力位或 MRI 对早期诊断必需"
    ],
    pearls: [
      "SL 间隙>3 mm 或不对称即应怀疑损伤",
      "MRI 是显示韧带断裂的最佳手段",
      "DISI 为慢性不稳定的重要征象"
    ]
  },
  triquetrum: {
    ddx: [
      "钩骨骨折：钩突部位、尺侧深压痛",
      "尺骨茎突骨折：茎突尖端",
      "月三角韧带损伤：平片可阴性"
    ],
    pitfalls: [
      "未拍侧位导致漏诊",
      "小碎片被忽视但疼痛持续"
    ],
    pearls: [
      "侧位片是发现背侧碎片的关键",
      "第二常见腕骨骨折",
      "MRI 有助于发现合并月三角韧带损伤"
    ]
  },
  jefferson: {
    mgmt: [
      "稳定型：Halo vest 或硬颈围",
      "不稳定型：Halo 或 C1–2 融合",
      "横韧带断裂：通常需手术融合",
      "严格排除合并 C2 及脊髓损伤",
      "不稳定（横韧带断裂）：C1–2 融合",
      "儿童可用 Halo；评估 VAI 与椎动脉"
    ],
    ddx: [
      "C2 骨折：Hangman 或齿状突",
      "寰枢旋转性半脱位",
      "Odontoid 骨折伴寰枢不稳",
      "Rotatory C1–2 subluxation（儿童）",
      "C2 齿状突骨折（机制不同）"
    ],
    pitfalls: [
      "平片易低估，CT 必需",
      "Rule of Spence >7 mm 提示横韧带损伤",
      "合并 C2 骨折并不少见",
      "开口位投照角度不当假阴性",
      "仅看 C1 忽略 C2–3  disc 损伤"
    ],
    pearls: [
      "开口位观察 C1 burst 形态",
      "CT 是术前评估金标准",
      "横韧带完整性决定稳定性及是否融合",
      "Spence 规则：侧块总外移>7 mm",
      "CT 是分型与稳定性评估首选"
    ]
  },
  hangman: {
    mgmt: [
      "Levine Ⅰ–Ⅱ 型：Halo 或内固定",
      "Ⅲ–Ⅳ 型或不稳定：ORIF 或融合",
      "神经损伤者需减压",
      "合并损伤按整体颈椎策略处理"
    ],
    ddx: [
      "Odontoid Ⅱ 型骨折",
      "C2 椎体 burst 骨折",
      "Chance 胸腰段骨折（机制不同）"
    ],
    pitfalls: [
      "Levine 分级直接影响治疗选择",
      "MRI 查 C2–3 间盘损伤",
      "勿与齿状突骨折混淆"
    ],
    pearls: [
      "C2 pars 骨折=Hangman",
      "Levine-Edwards 分型为治疗路线图",
      "CT+MRI 完整评估骨性及软组织"
    ]
  },
  chance: {
    mgmt: [
      "稳定无神经损伤：支具固定",
      "不稳或神经损伤：短节段内固定融合",
      "必须排查腹腔脏器损伤",
      "早期康复及神经监测"
    ],
    ddx: [
      "单纯压缩骨折：后柱完整",
      "Burst 骨折：轴向压缩为主",
      "其他屈曲-牵张损伤"
    ],
    pitfalls: [
      "必须筛查腹腔损伤",
      "MRI 评估后柱韧带完整性",
      "三柱概念决定稳定性判断"
    ],
    pearls: [
      "Seatbelt 伤+水平骨折线=Chance",
      "CT 显示骨折全路径",
      "腹部筛查为必做项目"
    ]
  },
  odontoid: {
    mgmt: [
      "Ⅰ/Ⅲ 型稳定：硬颈围或 Halo",
      "Ⅱ 型：螺钉固定/Halo/后路融合（年龄个体化）",
      "老年Ⅱ型：融合 vs Halo 存在争议",
      "不愈合或脊髓受压：手术融合/减压"
    ],
    ddx: [
      "Hangman 骨折：C2 pars 而非齿突",
      "Jefferson 骨折：C1 环 burst",
      "寰枢旋转性半脱位"
    ],
    pitfalls: [
      "Ⅱ 型不愈合率高，需积极固定",
      "老年骨质量差影响内固定",
      "CT 分型为治疗决策基础"
    ],
    pearls: [
      "Anderson 分型直接指导治疗",
      "Ⅱ 型最 problematic",
      "CT 为分型及术前规划必需"
    ]
  },
  supracondylar: {
    ddx: [
      "外髁骨折：Salter-Harris Ⅳ",
      "内上髁骨折：屈肌牵拉",
      "肘关节脱位"
    ],
    pitfalls: [
      "无脉为急诊，不可延误",
      "Baumann 角评估内翻复位质量",
      "克氏针道感染及异位骨化"
    ],
    pearls: [
      "儿童最常见肘骨折",
      "桡动脉搏动必查",
      "Gartland 分型指导治疗策略"
    ]
  },
  olecranon: {
    ddx: [
      "肱三头肌止点撕脱",
      "Monteggia 骨折-脱位"
    ],
    pitfalls: [
      "忽视伸肘装置完整性",
      "关节面台阶未纠正"
    ],
    pearls: [
      "移位骨折通常需手术",
      "张力带为经典固定方式"
    ],
    mgmt: [
      "无移位：伸肘位石膏固定",
      "移位：张力带或钢板固定",
      "粉碎：钢板固定或肘关节置换（老年）"
    ]
  },
  radialhead: {
    ddx: [
      "肱骨小头骨折",
      "Essex-Lopresti 三联",
      "肘关节脱位合并骨折"
    ],
    pitfalls: [
      "必须查 DRUJ 及骨间膜",
      "单纯切除致桡骨近端迁移"
    ],
    pearls: [
      "Mason 分型决定保守/手术/置换",
      "CT 评估关节面粉碎（III 型）",
      "务必筛查 Essex-Lopresti 与 DRUJ"
    ]
  },
  mason: {
    ddx: [
      "桡骨头条目：同一损伤的临床实体",
      "肱骨小头骨折",
      "Monteggia 骨折"
    ],
    pitfalls: [
      "Mason Ⅲ 勿简单切除",
      "Ⅳ 型须先复位脱位",
      "必须筛查 Essex-Lopresti"
    ],
    pearls: [
      "Mason 是分型工具而非独立疾病",
      "III 型多考虑置换",
      "与 radialhead 条目一并阅读"
    ]
  },
  essex: {
    mgmt: [
      "急性：桡骨头置换+IOM/DRUJ 修复",
      "慢性：复杂重建（截骨、IOM 重建）",
      "早期识别避免慢性迁移",
      "多学科肘-腕联合评估"
    ],
    ddx: [
      "单纯桡骨头骨折：IOM 及 DRUJ 完整",
      "Galeazzi 骨折：桡骨远段+DRUJ",
      "单纯 DRUJ 不稳"
    ],
    pitfalls: [
      "仅处理肘部而忽略腕部",
      "慢性期桡骨迁移难以重建",
      "MRI 对 IOM 评估关键"
    ],
    pearls: [
      "肘骨折+腕痛=Essex-Lopresti 直至排除",
      "对比双侧桡骨长度",
      "急性期 IOM 修复预后更好"
    ]
  },
  hillsachs: {
    mgmt: [
      "首次脱位：复位+康复",
      "复发/engaging：Bankart 修复+ remplissage/Bristow",
      "大缺损：骨移植填充",
      "个体化评估 on/off-track"
    ],
    ddx: [
      "Reverse Hill-Sachs（后脱位）",
      "大结节骨折",
      "单纯 Bankart 无 HS"
    ],
    pitfalls: [
      "必须量化缺损大小",
      "Off-track 概念影响术式选择",
      "合并 Bankart 需一并处理"
    ],
    pearls: [
      "Stryker notch 位显示 HS 缺损",
      "CT 测量缺损及盂骨丢失",
      "On/off-track 指导 remplissage 决策"
    ]
  },
  bankart: {
    mgmt: [
      "关节镜 Bankart 修复",
      "骨丢失>20–25%：Latarjet/Bristow 骨块转移",
      "术后系统康复",
      "复发者重新评估骨丢失"
    ],
    ddx: [
      "HAGL 损伤：肱骨侧盂肱韧带撕脱",
      "ALPSA：盂唇滑至盂颈",
      "多向不稳（MDI）"
    ],
    pitfalls: [
      "低估骨丢失导致复发",
      "MRI arthrogram 对盂唇更敏感",
      "需评估 off-track Hill-Sachs"
    ],
    pearls: [
      "MRI 是盂唇评估首选",
      "CT 量化盂骨丢失",
      "Latarjet 适用于 critical bone loss"
    ]
  },
  pilon: {
    mgmt: [
      "分期：外固定→待软组织恢复后延迟 ORIF",
      "微创钢板技术减少软组织剥离",
      "肿胀期避免早期 ORIF 防坏死",
      "恢复长度、轴线及关节面",
      "高能量损伤须排除同侧距骨/跟骨/胫骨平台骨折",
      "软组织 blister 分期决定手术窗口"
    ],
    ddx: [
      "踝关节三踝骨折：较低能量",
      "距骨骨折：轴向负荷",
      "单纯胫骨远端干骺端骨折",
      "Tillaux 骨折（青少年）",
      "三踝骨折（低能量）"
    ],
    pitfalls: [
      "早期 ORIF 易致 wound necrosis",
      "CT 三维规划关节面复位",
      "腓骨长度及 syndesmosis 需恢复",
      "忽视距下关节受累",
      "内踝/后踝骨折块常需联合固定"
    ],
    pearls: [
      "等待 wrinkles sign 再 definitive ORIF",
      "CT 3D 为术前规划金标准",
      "分期处理是核心原则",
      "CT 3D 重建为术前金标准",
      "Rüedi-Allgöwer 指导固定策略"
    ]
  },
  maisonneuve: {
    mgmt: [
      "Syndesmosis 固定（螺钉或 suture-button）",
      "内侧损伤需内固定或 deltoid 评估",
      "腓骨近端通常不需单独固定",
      "早期康复及 syndesmosis 螺钉取出时机",
      "下胫腓联合螺钉/Endobutton 固定",
      "内侧三角韧带/内踝骨折一并处理",
      "腓骨近端通常不需 ORIF"
    ],
    ddx: [
      "单纯踝关节扭伤：无近端腓骨骨折",
      "Weber C 无近端腓骨：Maisonneuve 有",
      "孤立腓骨近端骨折",
      "单纯 Weber B/C 踝骨折",
      "下胫腓联合损伤无近端腓骨骨折"
    ],
    pitfalls: [
      "必须影像覆盖至膝",
      "漏诊腓骨近端骨折",
      "Syndesmosis 复位质量影响预后",
      " ankle X 线必须包含全长胫腓",
      "Syndesmosis 复位不良致慢性不稳"
    ],
    pearls: [
      "踝伤必拍至膝",
      "近端腓骨+syndesmosis=Maisonneuve",
      "全长胫腓片为必做",
      "触诊腓骨近端为必查步骤",
      "MRI 评估 deltoid/联合韧带"
    ]
  },
  segond: {
    ddx: [
      "Arcuate 复合体撕脱：稍近端",
      "外侧平台骨折：更大、更复杂"
    ],
    pitfalls: [
      "小骨片易被忽略",
      "见 Segond 必行 MRI 查 ACL"
    ],
    pearls: [
      "Segond 骨折≈ACL 损伤",
      "MRI 为必做检查"
    ],
    mgmt: [
      "按 ACL 损伤原则处理（重建为主）",
      "Segond 骨片通常不需单独固定",
      "合并 MCL/半月板一并处理"
    ]
  },
  tibialshaft: {
    ddx: [
      "孤立腓骨骨折",
      "Pilon 骨折：累及踝关节",
      "应力性骨折：线状、无创伤"
    ],
    pitfalls: [
      "骨筋膜室综合征可迅速进展",
      "影像需包括膝/踝关节",
      "软组织 envelope 决定手术时机"
    ],
    pearls: [
      "髓内钉为稳定骨折金标准",
      "持续监测 compartments",
      "全长胫腓片为必拍"
    ]
  },
  proxfibula: {
    ddx: [
      "Maisonneuve 骨折组合",
      "外侧平台骨折",
      "髌骨脱位合并伤"
    ],
    pitfalls: [
      "漏诊合并踝部 syndesmosis 损伤",
      "忽视腓总神经检查",
      "并非所有骨折需手术"
    ],
    pearls: [
      "踝扭伤必触诊腓骨近端",
      "Maisonneuve 模式识别",
      "Syndesmosis 处理优先于近端腓骨"
    ]
  },
  "burst-lumbar": {
    mgmt: [
      "稳定无神经损伤：支具",
      "不稳或神经损伤：后路±前路融合",
      "神经进行性缺损：减压",
      "TLICS≥4 通常需手术",
      "TLICS≥4 倾向手术",
      "神经进行性损害：减压+融合",
      "骨质疏松：骨水泥增强螺钉"
    ],
    ddx: [
      "单纯压缩骨折：后柱完整",
      "Chance 骨折：水平经椎弓",
      "转移瘤：病史及多节段",
      "Chance 骨折：水平经后柱",
      "转移瘤：多节段、原发灶"
    ],
    pitfalls: [
      "TLICS 指导手术决策",
      "MRI 评估 PLC 不可省略",
      "Retropulsion 百分比量化",
      "PLC 损伤 MRI 评估",
      "retropulsion % 决定 canal compromise"
    ],
    pearls: [
      "CT 量化椎管侵占",
      "MRI 评估 PLC 是稳定性关键",
      "TLICS≥4 通常需要手术",
      "Denis 三柱+TLICS 并用",
      "CT 看骨性侵占"
    ]
  },
  hemarthrosis: {
    mgmt: [
      "急性出血：立即因子替代治疗至止血",
      "预防性规律因子输注减少关节出血次数",
      "顽固滑膜炎：放射性滑膜切除（RTI）或关节镜滑膜切除",
      "终末期：关节置换或融合等关节保护策略"
    ],
    ddx: [
      "创伤性单次 hemarthrosis",
      "弥漫型 TGCT/PVNS（血性积液但无凝血病）",
      "化脓性关节炎"
    ],
    pitfalls: [
      "早期 X 线可完全正常",
      "MRI 对早期软骨及含铁血黄素更敏感",
      "须区分 target joint 概念并记录"
    ],
    pearls: [
      "反复自发性关节积血应筛查血友病",
      "MRI 含铁血黄素为慢性标志",
      "预防性因子治疗可显著延缓关节病"
    ]
  },
  charcot: {
    mgmt: [
      "急性期：全接触石膏/支具制动至炎症期结束",
      "定制鞋垫及减压鞋具长期管理",
      "部分病例选择重建或融合手术",
      "并行排查及治疗骨髓炎（若存在）",
      "足科/内分泌/影像多学科随访",
      "活动期禁止负重直至炎症指标及皮温下降"
    ],
    ddx: [
      "骨髓炎：probe-to-bone 阳性、培养及实验室支持",
      "痛风",
      "类风湿关节炎",
      "痛风性关节炎：结晶、间歇发作",
      "RA 足：对称、侵蚀模式不同"
    ],
    pitfalls: [
      "MRI 不能可靠区分 Charcot 与 OM",
      "须临床+探针+实验室综合判断",
      "可双侧受累",
      "单足片不足以评估对侧",
      "支具需长程佩戴防再骨折"
    ],
    pearls: [
      "神经病+温热足= Charcot 直至证明否则",
      "急性期先制动非手术",
      "OM 评估应与 Charcot 并行",
      "Eichenholtz 0 期为活动性炎症期",
      "中足 Lisfranc 区最易塌陷"
    ]
  },
  dish: {
    ddx: [
      "强直性脊柱炎：骶髂关节炎、侵蚀、方形椎体",
      "退行性脊柱病：间隙狭窄为主",
      "Forestier 征（仅脊柱 DISH）"
    ],
    pitfalls: [
      "融合节段轻微外伤可致过伸骨折",
      "勿与 AS 混淆导致错误治疗",
      "DISH 非真正全椎体骨性融合"
    ],
    pearls: [
      "胸椎右侧流注样骨化+间隙保留= DISH 典型",
      "骶髂关节通常不受累，有别于 AS",
      "轻微创伤可致融合节段过伸骨折"
    ]
  },
  "synov-chondro": {
    ddx: [
      "继发性 OA 碎片：大小不均、基础 OA 明显",
      "弥漫型 TGCT/PVNS",
      "局限型 TGCT"
    ],
    pitfalls: [
      "继发型须识别基础 OA",
      "MRI 可显示未骨化期病变",
      "切除不全易复发"
    ],
    pearls: [
      "原发型=大小较均匀滑膜结节",
      "CT/MRI 术前规划必要",
      "完整滑膜切除是关键"
    ]
  },
  pvns: {
    mgmt: [
      "局限型：完整结节切除",
      "弥漫型：开放或关节镜下完整滑膜切除，常需多次手术",
      "辅助放疗（选择性）降低复发",
      "终末期 OA：关节置换",
      "复发者考虑低剂量放疗或重复滑膜切除",
      "关节外延伸者需开放完整切除"
    ],
    ddx: [
      "滑膜软骨瘤病",
      "血友病性滑膜炎",
      "滑膜肉瘤（罕见，须活检）",
      "hemophilic synovitis：凝血病史",
      "滑膜肉瘤：实性肿块、无含铁血黄素模式"
    ],
    pitfalls: [
      "弥漫型复发率高",
      "MRI blooming 勿漏读 GRE 序列",
      "须评估关节外延伸",
      "局限型与弥漫型治疗策略不同",
      "GRE/SWI 序列必扫"
    ],
    pearls: [
      "现病理命名：弥漫型腱鞘巨细胞肿瘤（TGCT）",
      "MRI 含铁血黄素致 T2/T2* 低信号",
      "弥漫型需完整滑膜切除",
      "弥漫型=TGCT 病理命名",
      "blooming 伪影是 MRI 指纹征"
    ]
  },
  sapho: {
    ddx: [
      "CRMO（儿童）",
      "转移瘤（多部位须鉴别）",
      "化脓性骨髓炎/骨炎"
    ],
    pitfalls: [
      "诊断常延迟",
      "MRI 评估活动性",
      "多部位病变勿误判转移"
    ],
    pearls: [
      "前胸壁+脓疱病/痤疮= SAPHO",
      "MRI 显示活动性骨炎",
      "慢性炎性骨病非感染"
    ]
  },
  "erosive-oa": {
    ddx: [
      "银屑病关节炎：边缘侵蚀、DIP 笔帽样",
      "RA：对称 MCP 受累",
      "痛风： erosive tophi"
    ],
    pitfalls: [
      "与 PsA 侵蚀模式混淆",
      "中央 vs 边缘侵蚀是鉴别关键",
      "炎性发作期勿误诊 RA"
    ],
    pearls: [
      "gull-wing=侵蚀性 OA 标志",
      "DIP/PIP 为主",
      "与 PsA 侵蚀模式不同"
    ]
  },
  "shoulder-oa": {
    ddx: [
      "单纯旋转袖撕裂无 OA",
      "类风湿肩关节炎",
      "肱骨头 AVN"
    ],
    pitfalls: [
      "腋位片对 GH OA 必需",
      "CTA 改变影响术式选择",
      "CT 评估关节盂骨量"
    ],
    pearls: [
      "腋位片看 GH OA",
      "cuff 缺失选 RSA",
      "CT 规划关节盂"
    ]
  },
  "ankle-oa": {
    ddx: [
      "炎性关节炎",
      "距骨 AVN",
      "距下关节原发 OA"
    ],
    pitfalls: [
      "必须负重位片",
      "评估距下关节累及",
      "力线矫正可延缓进展"
    ],
    pearls: [
      "创伤后是常见原因",
      "负重位评估力线",
      "截骨适用于早期畸形"
    ]
  },
  oci: {
    mgmt: [
      "稳定：休息、制动及逐步负重",
      "不稳定：内固定、微骨折或骨软骨移植",
      "游离体：取出或固定",
      "康复按运动需求个体化"
    ],
    ddx: [
      "OCD：慢性病程、青少年骨骺区典型部位、无明确急性外伤",
      "骨坏死：地理样病灶、双线征（髋/膝）",
      "应力性骨折：线状低信号骨折线"
    ],
    pitfalls: [
      "OCI 强调急性/创伤机制",
      "MRI 评估稳定性不可省略",
      "与 OCD 勿混淆"
    ],
    pearls: [
      "OCI 强调急性/创伤或应力机制；OCD 为慢性剥脱过程",
      "踝外侧距骨 OCI 常见",
      "不稳定碎片应积极固定或移植"
    ]
  },
  lipoma: {
    ddx: [
      "脂肪肉瘤：厚分隔、强化结节",
      "血管脂肪瘤：多发、触痛"
    ],
    pitfalls: [
      "深部肌内并非一定良性",
      "厚分隔>2 mm 需警惕"
    ],
    pearls: [
      "MRI 抑脂低信号支持脂肪瘤",
      "浅表几乎总是良性",
      "深部病变需谨慎"
    ]
  },
  angiolipoma: {
    ddx: [
      "典型脂肪瘤:单发、无痛、无血管强化",
      "血管瘤:无脂肪信号,以血管成分为主"
    ],
    pitfalls: [
      "勿因含\"脂肪\"而误诊为普通 lipoma,疼痛和多发是关键",
      "小病灶超声可能低估血管成分,建议 MRI 确认"
    ],
    pearls: [
      "触痛性多发前臂皮下结节=血管脂肪瘤三联",
      "MRI 强化血管+脂肪信号是确诊组合"
    ],
    mgmt: [
      "无症状者可观察,多数因疼痛就诊",
      "疼痛明显者手术切除,完整切除缓解症状",
      "多发者分次切除或仅处理症状性病灶"
    ]
  },
  schwannoma: {
    ddx: [
      "神经纤维瘤:沿神经梭形增粗,累及神经束, NF1 相关",
      "恶性周围神经鞘膜瘤(MPNST):快速增大、坏死、边界不清",
      "神经鞘囊肿/神经节:无实性强化成分"
    ],
    pitfalls: [
      "ancient schwannoma 可有不典型细胞学,勿与 MPNST 混淆",
      "target 征亦见于神经纤维瘤,需结合偏心/梭形生长鉴别"
    ],
    pearls: [
      "split-fat + enter-exit 是 schwannoma 经典 MRI 组合",
      "囊内摘除可保留神经功能,优于整块切除",
      "ancient 变性是良性退变,认识其影像可避免过度治疗"
    ]
  },
  neurofibroma: {
    ddx: [
      "Schwannoma:偏心生长,神经被推挤,enter-exit 征",
      "MPNST:坏死、边界不清、快速生长,尤其 NF1 背景",
      "神经瘤:创伤后 stump neuroma,有明确外伤史"
    ],
    pitfalls: [
      "NF1 患者任何神经肿瘤快速变化均需警惕 MPNST",
      "完全切除常牺牲神经,术前需充分告知功能风险",
      "target 征非特异,不能单独区分 schwannoma 与 neurofibroma"
    ],
    pearls: [
      "梭形神经增粗=神经纤维瘤,偏心肿块=schwannoma",
      "NF1 筛查(咖啡斑、Lisch 结节)是评估恶变风险的前提",
      "快速增大+疼痛在 NF1 背景=MPNST 直至证实否则"
    ]
  },
  "hemangioma-st": {
    ddx: [
      "动静脉畸形(AVM):高流量,扩张供血动脉与早期静脉引流",
      "血管肉瘤:老年,快速生长,坏死,无 phleboliths",
      "肌内脂肪瘤/WDLPS:脂肪信号,无血管强化"
    ],
    pitfalls: [
      "肌内血管瘤无 phleboliths 时极易与肉瘤混淆,需 MRI 强化特征",
      "活检可致严重出血,影像典型时应避免",
      "儿童血管瘤自然史多样,勿一律手术"
    ],
    pearls: [
      "phleboliths=软组织血管瘤的影像指纹",
      "肌内 T2 亮+phleboliths 可确诊,无需活检",
      "术前栓塞是深部病变手术安全的重要措施"
    ]
  },
  lymphangioma: {
    ddx: [
      "血管瘤:实性强化成分,彩色多普勒血流丰富",
      "畸胎瘤:含脂肪/钙化/实性成分,血清 AFP 可升高",
      "鳃裂囊肿:沿胸锁乳突肌分布,单房多见"
    ],
    pitfalls: [
      "微囊型影像可与正常脂肪混淆,需高分辨率 MRI",
      "感染后影像复杂,勿与脓肿完全等同",
      "颈部病变必须评估气道,即使无症状"
    ],
    pearls: [
      "儿童颈部多囊 T2 亮=淋巴管瘤直至证实否则",
      "巨囊型治疗反应远优于微囊型,分型决定预后",
      "无血流囊性病变区别于血管瘤的关键"
    ]
  },
  ganglion: {
    ddx: [
      "TGCT(腱鞘巨细胞瘤):实性低 T2 含铁血黄素,可侵蚀骨",
      "滑膜肉瘤:实性肿块,钙化,青年深部,极少纯囊性"
    ],
    pitfalls: [
      "腕掌侧囊肿手术需避开正中神经及桡动脉",
      "仅抽吸复发率高,患者需知情"
    ],
    pearls: [
      "腕背囊肿+透光阳性+关节蒂=经典三联",
      "完整切除蒂部是降低复发的关键"
    ],
    mgmt: [
      "无症状可观察,部分自行消退",
      "穿刺抽吸+激素注射,复发率 50–70%",
      "手术切除含蒂部完整囊壁,复发率降至 5–10%"
    ]
  },
  baker: {
    ddx: [
      "DVT:静脉内血栓,静脉不可压缩,无腘窝囊性结构",
      "腘动脉瘤:搏动性,彩色多普勒见动脉血流"
    ],
    pitfalls: [
      "破裂后小腿肿痛勿盲目抗凝,需超声排除 DVT",
      "仅切除囊肿不处理关节病变必复发"
    ],
    pearls: [
      "Baker 囊肿=膝关节病的\"排气阀\",治膝不治囊",
      "crescent 征+无静脉血栓=假性血栓征"
    ],
    mgmt: [
      "治疗基础膝关节病(积液引流、关节镜)是根本",
      "囊肿穿刺抽吸+激素注射,复发常见",
      "顽固复发可手术切除囊壁"
    ]
  },
  "myositis-oss": {
    ddx: [
      "骨外骨肉瘤:中心 aggressive 骨化,骨破坏,无分区成熟",
      "软组织肉瘤:早期 MO 最难鉴别,需临床病史",
      "钙化性肌炎:血肿钙化,无典型分区架构"
    ],
    pitfalls: [
      "早期(3–6 周)活检可诊为肉瘤,是最大陷阱",
      "分区架构是良性 MO 的标志,中心 aggressive 骨化考虑 OSS",
      "无外伤史应质疑 MO 诊断"
    ],
    pearls: [
      "外伤史+数周演进+周边骨化=MO 三联",
      "CT 分区架构是确诊关键,优于活检",
      "等待成熟后再手术,早期切除适得其反"
    ]
  },
  elastofibroma: {
    ddx: [
      "软组织肉瘤:单侧、侵袭性、无脂肪条索、快速增大",
      "脂肪瘤:均匀脂肪信号,无纤维弹性基质"
    ],
    pitfalls: [
      "单侧病变勿轻易诊断,需排除肉瘤",
      "不熟悉部位易误诊为恶性肿瘤"
    ],
    pearls: [
      "老年+双侧肩胛下+脂肪条索=弹性纤维瘤",
      "位置比形态更重要"
    ],
    mgmt: [
      "无症状者观察,无需活检",
      "症状明显(弹响、疼痛)者手术切除",
      "完整切除后不复发"
    ]
  },
  lipoblastoma: {
    ddx: [
      "成熟脂肪瘤:成人,均匀脂肪信号",
      "WDLPS:成人,厚分隔>2 mm,非脂肪结节"
    ],
    pitfalls: [
      "年龄是最重要的鉴别因素,<3 岁脂肪肿块几乎均为良性",
      "组织学可见脂肪母细胞,勿与 liposarcoma 混淆(结合年龄)"
    ],
    pearls: [
      "婴幼儿脂肪肿块=脂肪母细胞瘤直至证实否则",
      "年龄+影像排除 WDLPS 特征=可安全切除"
    ],
    mgmt: [
      "完整手术切除,预后极好",
      "脂肪母细胞瘤病需评估全部病灶,分次切除",
      "不完整切除可复发"
    ]
  },
  "fibroma-sheath": {
    ddx: [
      "TGCT:含铁血黄素致低 T2* blooming,可侵蚀骨",
      "腱鞘囊肿:囊性 T2 高信号,非实性"
    ],
    pitfalls: [
      "与 TGCT 影像重叠,关键鉴别为含铁血黄素与骨侵蚀",
      "过小病灶超声可能漏诊"
    ],
    pearls: [
      "小纤维结节+邻接肌腱+无含铁血黄素=腱鞘纤维瘤",
      "TGCT 有含铁血黄素 blooming,可侵蚀骨"
    ],
    mgmt: [
      "有症状者局部切除",
      "完整切除后复发极少",
      "无症状小结节可观察"
    ]
  },
  "soft-chondroma": {
    ddx: [
      "滑膜软骨瘤病:关节内多发游离体,非单一软组织结节",
      "骨外软骨肉瘤:大、深部、快速生长、软组织肿块",
      "钙化性腱膜炎:肘/足跟,无软骨信号"
    ],
    pitfalls: [
      "深部大病变在手足以外部位需警惕软骨肉瘤",
      "钙化形态非特异,需结合临床",
      "与 synovial chondromatosis 混淆(关节内 vs 软组织)"
    ],
    pearls: [
      "手足指趾软组织环弧钙化=软组织软骨瘤",
      "MRI 软骨信号确认成分",
      "无骨附着是区别于骨旁软骨瘤的关键"
    ]
  },
  "granular-cell": {
    ddx: [
      "Schwannoma:可囊变,与神经密切,enter-exit 征",
      "纤维肌瘤:低信号,无强化均匀性"
    ],
    pitfalls: [
      "恶性型罕见但活检可低估",
      "舌部勿与鳞癌混淆(黏膜完整、无溃疡)"
    ],
    pearls: [
      "舌黏膜下黄色结节=颗粒细胞瘤经典",
      "多数良性,完整切除即可"
    ],
    mgmt: [
      "完整局部切除,边缘清楚",
      "舌部病变注意功能重建",
      "恶性型需广泛切除+淋巴结清扫+辅助放疗"
    ]
  },
  leiomyoma: {
    ddx: [
      "平滑肌肉瘤:深部>5 cm,坏死,快速生长,核分裂高",
      "神经鞘瘤:T2 高,enter-exit 征"
    ],
    pitfalls: [
      "深部大平滑肌肿瘤一律按肉瘤处理直至病理证实",
      "血管型疼痛可误诊为血栓或动脉疾病"
    ],
    pearls: [
      "小皮肤/浅表平滑肌瘤几乎均良性",
      "疼痛+寒冷诱发+静脉邻接=血管平滑肌瘤"
    ],
    mgmt: [
      "皮肤型:观察或局部切除",
      "血管平滑肌瘤:症状性者切除",
      "深部大或快速增大者完整切除+病理确认"
    ]
  },
  myxoma: {
    ddx: [
      "黏液样脂肪肉瘤:脂肪信号+强化结节+厚分隔",
      "黏液纤维肉瘤:老年,多分叶,曲线强化",
      "神经鞘瘤囊变:T2 高但有实性强化部分"
    ],
    pitfalls: [
      "肌内 T2 极高病变勿一概为囊肿,黏液瘤是实性",
      "与黏液样 LPS 鉴别必须确认无脂肪及强化结节",
      "Mazabraud 中骨病变为 FD 非转移"
    ],
    pearls: [
      "肌内大腿 T2 极高+无脂肪=黏液瘤",
      "Mazabraud=FD+软组织黏液瘤",
      "无强化结节是与黏液样 LPS 的关键鉴别"
    ]
  },
  tgct: {
    ddx: [
      "弥漫型 TGCT（PVNS）",
      "骨巨细胞瘤",
      "滑膜肉瘤"
    ],
    pitfalls: [
      "TGCT 与 PVNS 是同一疾病谱(局限/弥漫),勿当作无关疾病",
      "含铁血黄素低 T2* 也见于陈旧出血,但 TGCT 为实性",
      "边缘切除复发率高,患者需知情"
    ],
    pearls: [
      "局限型 TGCT 多位于手指腱鞘",
      "低 T2/T2* 含铁血黄素",
      "完整切除降低复发"
    ]
  },
  "nodular-fasciitis": {
    ddx: [
      "软组织肉瘤:生长更慢(数月到数年),通常更大",
      "侵袭性纤维瘤病:深部,浸润性,无自限性",
      "炎性肉芽肿:有感染征象,抗生素有效"
    ],
    pitfalls: [
      "快速生长是最大陷阱,导致过度手术",
      "活检组织学可模拟纤维肉瘤或 MFH"
    ],
    pearls: [
      "数周病史+筋膜层+触痛=结节性筋膜炎三联",
      "活检确诊后多数仅需观察",
      "是\"看起来最恶性实则良性\"的经典代表"
    ]
  },
  desmoid: {
    ddx: [
      "纤维肉瘤:有转移潜能,老年,坏死",
      "结节性筋膜炎:快速生长,小,自限",
      "瘢痕疙瘩:皮肤局限,无深部浸润"
    ],
    pitfalls: [
      "广泛切除可能导致功能灾难,尤其四肢/肠系膜",
      "FAP 患者需结肠筛查"
    ],
    pearls: [
      "浸润性生长+无转移=desmoid 核心概念",
      "FAP+腹内/腹壁硬纤维瘤=Gardner 综合征",
      "主动监测是合理选择,不是所有 desmoid 需立即手术"
    ]
  },
  alt: {
    mgmt: [
      "广泛手术切除,R0 困难(腹膜后)",
      "辅助放疗:腹膜后/不可切除边缘",
      "长期随访监测去分化及复发",
      "去分化后按高级别肉瘤方案(化疗考虑)"
    ],
    ddx: [
      "WDLPS：与 ALT 为同一肿瘤（atypical lipomatous tumor / WDLPS）",
      "脂肪瘤：浅表、薄分隔、无结节",
      "黏液样脂肪肉瘤：T2 黏液信号、强化结节"
    ],
    pitfalls: [
      "四肢浅表几乎从不为 LPS,勿过度诊断",
      "厚分隔阈值 2 mm 是影像共识,必须测量",
      "腹膜后脂肪肿块=WDLPS 直至证实否则"
    ],
    pearls: [
      "ALT=WDLPS（部位命名不同）",
      "厚分隔>2 mm 及非脂肪结节需警惕",
      "深部retroperitoneum/大腿常见"
    ]
  },
  wdlps: {
    mgmt: [
      "积极手术切除,腹膜后需多学科(泌尿/血管)",
      "辅助放疗降低局部复发(腹膜后)",
      "去分化后考虑化疗(蒽环类)",
      "终身随访,监测复发及去分化",
      "腹膜后：多学科+完整切除",
      "监测去分化转化",
      "放疗用于切缘阳性"
    ],
    ddx: [
      "ALT：同一肿瘤",
      "脂肪瘤：无厚分隔/结节",
      "去分化脂肪肉瘤：突然增大、高级别成分",
      "Myxoid LPS：黏液信号、无脂肪",
      "Hibernoma：棕色脂肪信号"
    ],
    pitfalls: [
      "不完全切除腹膜后 WDLPS 几乎必然复发",
      "去分化可发生在复发灶,随访中新增强区域需警惕",
      "活检路径需规划,避免污染腹膜腔",
      " superficial 肢体极少 WDLPS",
      "不完整切除高复发"
    ],
    pearls: [
      "WDLPS=ALT",
      "广泛切除；监测去分化",
      "腹膜后肿块须纳入鉴别",
      "ALT=WDLPS 同一实体",
      "厚分隔>2 mm 为警报"
    ]
  },
  "myxoid-lps": {
    ddx: [
      "肌内黏液瘤:无强化结节,无脂肪,良性",
      "黏液纤维肉瘤:老年,曲线强化,无脂肪",
      "WDLPS 黏液变性:以脂肪为主,厚分隔"
    ],
    pitfalls: [
      "与肌内黏液瘤鉴别必须寻找强化结节及脂肪",
      "圆细胞比例需病理准确评估,决定预后",
      "黏液成分可掩盖实性部分,MRI 增强关键"
    ],
    pearls: [
      "黏液 T2 亮+强化结节=黏液样脂肪肉瘤",
      "大腿深部是最经典部位",
      "圆细胞>25%=高级别,预后显著恶化"
    ]
  },
  synovialsarcoma: {
    mgmt: [
      "广泛切除+辅助放疗(局部控制标准)",
      "辅助化疗争议,高危患者考虑",
      "肺转移灶切除(寡转移)",
      "靶向治疗(IFN、免疫)在研究中",
      "广泛切除+放疗",
      "化疗用于高级别/转移",
      "肺 CT 分期"
    ],
    ddx: [
      "PVNS/TGCT:含铁血黄素,无钙化,关节内滑膜",
      "滑膜软骨瘤病:关节内多发游离体",
      "Ewing 肉瘤:儿童,骨破坏或骨外",
      "PVNS：含铁血黄素、关节内",
      "GCT 腱鞘：手指小结节"
    ],
    pitfalls: [
      "名\"滑膜\"易误判为关节内病变,实际多数在关节旁",
      "钙化有助于鉴别但非特异(亦见于 MFH 等)",
      "青年关节旁肿块=滑膜肉瘤直至活检排除",
      "非真正滑膜来源",
      "calcification 非特异"
    ],
    pearls: [
      "青年+关节旁+钙化=强烈怀疑滑膜肉瘤",
      "SS18-SSX 融合是分子确诊金标准",
      "肺转移筛查是分期必需",
      "SS18-SSX 融合检测",
      "青少年 periarticular 实性肿块须活检"
    ]
  },
  dfsp: {
    ddx: [
      "皮肤纤维瘤:边界清楚,不浸润脂肪,CD34 阴性",
      "瘢痕疙瘩:有创伤/手术史,不浸润远隔脂肪",
      "恶性黑色素瘤:色素,淋巴结转移"
    ],
    pitfalls: [
      "切缘不足复发率极高(可达 50%)",
      "纤维肉瘤样转化时 CD34 可阴性,勿漏诊"
    ],
    pearls: [
      "斑块+后期结节=protuberans 命名来源",
      "CD34+ 和 COL1A1-PDGFB 是诊断标志",
      "Mohs 手术是控制复发的最佳方式"
    ]
  },
  asps: {
    ddx: [
      "血管瘤:phleboliths,渐进强化,无流空+极度强化组合",
      "副神经节瘤:沿神经,儿茶酚胺症状",
      "血管外皮瘤/SFT:STAT6+,成人,形态不同"
    ],
    pitfalls: [
      "缓慢生长+富血供→易误诊为血管瘤而观察",
      "流空信号亦见于副神经节瘤等,需综合",
      "晚期转移可发生在初诊后多年"
    ],
    pearls: [
      "青年+极度强化+流空信号=ASPS 经典三联",
      "TFE3 融合是分子确诊标志",
      "肺脑转移筛查是长期随访重点"
    ]
  },
  "ewing-extra": {
    ddx: [
      "横纹肌肉瘤:儿童,横纹肌分化,不同免疫组化",
      "淋巴瘤:全身淋巴结,LDH 升高",
      "骨 Ewing:骨破坏起源,骨扫描阳性"
    ],
    pitfalls: [
      "必须活检确认 EWSR1 融合,免疫组化 alone 不够",
      "骨扫描/PET 排除骨起源 Ewing"
    ],
    pearls: [
      "儿童深部小圆细胞=Ewing 家族直至证实否则",
      "EWSR1-FLI1 融合是分子确诊",
      "多学科化疗方案是生存关键"
    ]
  },
  hemangiopericytoma: {
    ddx: [
      "孤立性纤维性肿瘤（SFT）：同一谱系",
      "血管肉瘤",
      "副神经节瘤"
    ],
    pitfalls: [
      "HPC 与 SFT 已统一命名,勿当作两种无关肿瘤",
      "STAT6 核阳性是确诊关键 IHC",
      "脑膜型需与脑膜瘤鉴别(STAT6 vs EMA)"
    ],
    pearls: [
      "HPC 与 SFT 同一谱系",
      "术前栓塞可减少出血",
      "STAT6 免疫组化"
    ]
  },
  sft: {
    ddx: [
      "神经鞘瘤",
      "纤维肉瘤",
      "HPC：同一谱系旧称"
    ],
    pitfalls: [
      "影像非特异,最终诊断靠 STAT6 IHC 及分子",
      "胸膜 SFT 与胸膜间皮瘤鉴别需 IHC"
    ],
    pearls: [
      "STAT6 免疫组化确诊",
      "恶性型广泛切除并随访",
      "与 HPC 同一谱系"
    ]
  },
  "plantar-fibroma": {
    ddx: [
      "纤维肉瘤:快速增大,深部,无筋膜局限",
      "TGCT:含铁血黄素,低 T2*,腱鞘非筋膜",
      "跖筋膜炎:弥漫增厚,无离散结节"
    ],
    pitfalls: [
      "切除后复发率高,勿过度手术期望根治",
      "与 Dupuytren 关联,需询问掌部结节",
      "双侧病变支持良性纤维瘤病,单侧深部需警惕肉瘤"
    ],
    pearls: [
      "足底筋膜低信号结节+Dupuytren=Ledderhose",
      "功能保守治疗优先于积极手术",
      "与 desmoid 同属纤维瘤病家族,无转移"
    ]
  },
  "quad-tear": {
    ddx: [
      "大腿挫伤/血肿",
      "股四头肌腱断裂",
      "髌骨或胫骨结节撕脱骨折"
    ],
    pitfalls: [
      "仅关注股直肌而漏诊股中间肌等其他头",
      "将慢性瘢痕/钙化误判为急性撕裂"
    ],
    pearls: [
      "rectus femoris 间接头为冲刺损伤经典部位",
      "MRI 横截面积分级指导重返运动",
      "完全撕裂早期修复预后优于延迟手术"
    ]
  },
  hamstring: {
    ddx: [
      "坐骨神经痛/腰椎 radiculopathy",
      "大腿后侧挫伤",
      "腘窝囊肿或深静脉血栓"
    ],
    pitfalls: [
      "仅报告\"腘绳肌拉伤\"未指明头别及是否 tendon involvement",
      "X 线阴性即排除儿童 ischial avulsion",
      "过早 sprint 导致复发及 chronic scar"
    ],
    pearls: [
      "proximal biceps femoris 长头为最常见部位",
      "edema 长度>10 cm 或 tendon 受累提示 prolonged RTP",
      "Nordic eccentric 训练为循证预防手段"
    ]
  },
  "calf-tear": {
    ddx: [
      "深静脉血栓（DVT）",
      "Achilles tendon rupture",
      "soleus 深部 tear / chronic exertional compartment"
    ],
    pitfalls: [
      "未行 US/Doppler 排除 DVT",
      "将 soleus 深部 tear 误判为轻微 gastroc strain"
    ],
    pearls: [
      "tennis leg 经典部位为 medial gastroc junction",
      "US bedside 可同时评估 DVT",
      "soleus tear 恢复时间常长于 gastroc"
    ]
  },
  adductor: {
    ddx: [
      "athletic pubalgia / sports hernia",
      "hip labral tear / FAI",
      "osteitis pubis 孤立表现"
    ],
    pitfalls: [
      "仅 label groin pain 为 adductor 而未排除 hip 及 abdominal 源",
      "低估 tendon avulsion 需手术",
      "symphysis edema 误读为 infection"
    ],
    pearls: [
      "adductor longus origin 为 groin pull 经典部位",
      "MRI tendon involvement 决定 recovery 时间",
      "chronic groin 常为多因素需系统评估"
    ]
  },
  "gluteus-min": {
    ddx: [
      "孤立 trochanteric bursitis",
      "hip OA / referred pain",
      "lumbar radiculopathy L5/S1"
    ],
    pitfalls: [
      "仅 diagnose bursitis 而 miss underlying tendon tear",
      "未用 coronal oblique 漏诊 partial tear"
    ],
    pearls: [
      "Trendelenburg + MRI tendon tear 为关键组合",
      "bursitis 常为 secondary finding",
      "coronal oblique MRI 为 abductor 评估必扫序列"
    ]
  },
  subscap: {
    ddx: [
      "孤立 supraspinatus tear",
      "frozen shoulder / adhesive capsulitis",
      "anterior labral tear 孤立"
    ],
    pitfalls: [
      "仅关注 supraspinatus 漏诊 subscap upper tear",
      "忽略 LHB subluxation 为 subscap tear 线索"
    ],
    pearls: [
      "lift-off test 为 subscap 功能关键 clinical test",
      "sagittal oblique MRI 显示 upper subscap 最佳",
      "LHB subluxation 强烈提示 subscap 及 pulley 损伤"
    ]
  },
  infraspinatus: {
    ddx: [
      "PM tear（极罕见）",
      "posterior labral tear 孤立",
      "quadrilateral space syndrome"
    ],
    pitfalls: [
      "isolated infraspinatus tear 诊断需排除 infraspinatus 为主的其他 pathology",
      "忽略 fatty infiltration 对 repair 预后影响",
      "将 normal variant 小裂隙误判为 tear"
    ],
    pearls: [
      "external rotation weakness 为关键 clinical clue",
      "tear size + retraction + Goutallier 决定 surgical plan",
      "posterior cuff 常需与 supraspinatus 一并评估"
    ]
  },
  "teres-minor": {
    ddx: [
      "infraspinatus tear",
      "axillary nerve palsy / quadrilateral space syndrome",
      "posterior labral tear"
    ],
    pitfalls: [
      "isolated teres minor tear 为 diagnosis of exclusion",
      "将 quadrilateral space syndrome 误为 pure muscle tear",
      "US 漏诊 deep posterior cuff"
    ],
    pearls: [
      "isolated teres minor tear 极罕见，需全面 cuff 评估",
      "hornblower sign 提示 posterior cuff 功能丧失",
      "MRI 需包括 quadrilateral space 区域"
    ]
  },
  deltoid: {
    ddx: [
      "rotator cuff tear",
      "axillary nerve palsy",
      "shoulder dislocation / fracture"
    ],
    pitfalls: [
      "focus on cuff 而 miss deltoid tear",
      "未评估 axillary nerve 导致 missed concomitant neuropathy"
    ],
    pearls: [
      "contour change + abduction weakness 提示 deltoid tear",
      "early complete tear repair 预后最佳",
      "必须排除 axillary nerve injury"
    ]
  },
  "biceps-long": {
    ddx: [
      "subscapularis tear",
      "AC joint pathology",
      "anterior impingement 孤立"
    ],
    pitfalls: [
      "Popeye deformity 误归因 LHB 而实为 distal biceps rupture",
      "miss pulley lesion 导致 persistent instability"
    ],
    pearls: [
      "groove 外 LHB 为 pulley tear 关键征象",
      "tenodesis 为 active patient 常用方案",
      "MRA 提高 SLAP 及 anchor 评估 accuracy"
    ]
  },
  "biceps-dist": {
    ddx: [
      "partial tear / tendinopathy",
      "brachialis injury",
      "antecubital bursitis"
    ],
    pitfalls: [
      "hook test 假阴性致 missed complete tear",
      "delayed repair 因 retraction 及 scarring 需 graft",
      "将 brachialis tear 误为 biceps"
    ],
    pearls: [
      "hook test 为 complete tear 重要 bedside test",
      "early repair（<3 weeks）恢复 supination strength 最佳",
      "MRI 对 partial tear 及 retraction 评估 essential"
    ]
  },
  triceps: {
    ddx: [
      "olecranon fracture 孤立",
      "posterior arm contusion",
      "olecranon bursitis"
    ],
    pitfalls: [
      "rare 病变易 misdiagnose 为 contusion",
      "miss olecranon avulsion fragment on X线"
    ],
    pearls: [
      "extension weakness against gravity 为 complete tear 关键 sign",
      "X线必查 olecranon avulsion",
      "complete tear 应 early surgical repair"
    ]
  },
  "pec-major": {
    ddx: [
      "pectoralis minor strain",
      "rib fracture / costochondritis",
      " anterior shoulder pathology"
    ],
    pitfalls: [
      "focus on shoulder cuff 而 miss pec tear",
      "delayed repair 因 retraction 及 scar 困难"
    ],
    pearls: [
      "bench press eccentric 为 classic mechanism",
      "MRI retraction 测量指导 surgery timing",
      "young athlete complete tear 应 early repair"
    ]
  },
  extensor: {
    ddx: [
      "radial/ posterior interosseous nerve palsy",
      "swan neck deformity（非 tear）",
      "joint contracture / stiffness"
    ],
    pitfalls: [
      "multi-level extensor injury 仅修一处",
      "miss sagittal band rupture 致 chronic subluxation"
    ],
    pearls: [
      "US dynamic test 为 closed rupture 关键",
      "zone 定位决定 repair approach",
      "RA attrition 需 systemic + local treatment"
    ]
  },
  plantaris: {
    ddx: [
      "DVT",
      "gastrocnemius tear alone"
    ],
    pitfalls: [
      "plantaris absent 为 normal variant 勿误判 pathology",
      "未 exclude DVT"
    ],
    pearls: [
      "plantaris coiled stump 为 US 特征征",
      "常与 gastroc tear 并存"
    ],
    mgmt: [
      "Conservative management 为主，同 gastroc strain protocol",
      "Heel wedge 及 progressive calf rehabilitation",
      "Exclude DVT before aggressive mobilization"
    ]
  },
  "supraspinatus-calc": {
    ddx: [
      "septic bursitis / septic arthritis",
      "acute cuff tear",
      "gouty tophus deposition"
    ],
    pitfalls: [
      "resorptive phase severe pain 误疑 infection 而过度 antibiotic",
      "仅 MRI 无 X线 漏诊 calcification"
    ],
    pearls: [
      "X线 为 calcific tendinitis 首选 diagnostic test",
      "resorptive phase（cloud sign）疼痛最重",
      "US-guided lavage 循证有效且微创"
    ]
  },
  mallet: {
    ddx: [
      "swan neck deformity（其他 cause）",
      "DIP fracture unrelated to extensor avulsion",
      "DIP joint arthritis"
    ],
    pitfalls: [
      "splint 仅 immobilize PIP 而非 DIP",
      "skin necrosis from excessive splint pressure"
    ],
    pearls: [
      "splint 必须 continuous DIP extension（允许 PIP 活动）",
      "bony fragment >30–50% 或 subluxation 考虑 ORIF",
      "compliance 为 treatment success 关键"
    ]
  },
  "volar-plate": {
    ddx: [
      "central slip injury / boutonniere",
      "PIP fracture-dislocation",
      "simple PIP sprain"
    ],
    pitfalls: [
      "miss collateral ligament combined injury",
      "stable vs unstable 判断不足致 chronic subluxation",
      "over-splinting 致 stiffness"
    ],
    pearls: [
      "MRI 为 unstable PIP 最佳 pre-op assessment",
      "volar plate + collateral 常合并损伤",
      "early protected motion 对 stable injury 重要"
    ]
  },
  "central-slip": {
    ddx: [
      "volar plate injury",
      "simple PIP sprain",
      "boutonniere from other cause（RA）"
    ],
    pitfalls: [
      "miss central slip 致 preventable boutonniere",
      "splint 错误 immobilize MCP 而非 PIP extension"
    ],
    pearls: [
      "splint PIP extension + MCP flexion 为 classic protocol",
      "boutonniere 为 missed central slip 的 sequela",
      "MRI 对 occult closed tear 有价值"
    ]
  },
  mortons: {
    ddx: [
      "metatarsalgia / MTP synovitis",
      "metatarsal stress fracture",
      "interdigital bursitis"
    ],
    pitfalls: [
      "clinical diagnosis 为主，imaging 为 confirmatory",
      "second/third space 定位错误"
    ],
    pearls: [
      "Mulder click 为 highly specific clinical test",
      "US 为 cost-effective diagnostic tool",
      "third web space 为 classic location"
    ]
  },
  "os-trigonum": {
    ddx: [
      "Achilles tendinopathy",
      "posterior tibial tendinopathy",
      "talar fracture / posterior process fracture"
    ],
    pitfalls: [
      "incidental os trigonum 过度 treatment",
      "symptomatic 但未见 interface edema 时 consider other cause",
      "miss FHL tenosynovitis as main pain generator"
    ],
    pearls: [
      "plantarflexion pain 为 clinical hallmark",
      "MRI interface edema 区分 symptomatic vs incidental",
      "arthroscopic excision 对 refractory case 有效"
    ]
  },
  "stress-tib-ant": {
    ddx: [
      "medial tibial stress syndrome",
      "chronic exertional compartment syndrome",
      "infection / osteomyelitis（rare）"
    ],
    pitfalls: [
      "X线 negative 即排除 early stress injury",
      "anterior vs medial location 混淆",
      "progression to complete fracture 因 premature return"
    ],
    pearls: [
      "MRI 为 early stress reaction 最 sensitive",
      "anterior cortex location 为 key differentiator",
      "Fredericson grading 指导 return-to-activity"
    ]
  },
  compartment: {
    mgmt: [
      "Acute：emergent fasciotomy 所有 affected compartments（含 foot if needed）",
      "CECS：elective fasciotomy after pressure test confirmation",
      "Avoid tight dressings/casts  post-trauma 并 monitor",
      "Late sequelae：debridement、 skin graft 及 functional rehabilitation",
      "急性：紧急筋膜切开，6 小时内预后最佳",
      "CECS：测压>35 mmHg 或休息压差支持诊断"
    ],
    ddx: [
      "cellulitis / necrotizing fasciitis",
      "DVT",
      "neurogenic/radicular pain",
      "深静脉血栓：D-二聚体/超声",
      "蜂窝织炎：皮肤红斑为主"
    ],
    pitfalls: [
      "acute 等待 MRI 延误 fasciotomy",
      "miss foot compartment involvement",
      "CECS 与 stress fracture/shin splints 混淆",
      "足/compartment 也要评估",
      "急性勿等 MRI"
    ],
    pearls: [
      "acute compartment syndrome 为 clinical emergency",
      "pain + passive stretch pain 为 early reliable sign",
      "never delay fasciotomy for imaging in acute setting",
      "Pain out of proportion 是红旗",
      "被动伸趾痛（小腿）"
    ]
  },
  myositis: {
    mgmt: [
      "Pyomyositis：IV antibiotics + US/CT-guided drainage",
      "Autoimmune：immunosuppression（steroid、 DMARD）及 malignancy screening",
      "Supportive：pain control 及 PT after inflammation control",
      "Biopsy：autoimmune diagnosis 及 exclude inclusion body myositis"
    ],
    ddx: [
      "focal muscle strain/trauma",
      "rhabdomyolysis",
      "denervation edema"
    ],
    pitfalls: [
      "autoimmune 未 biopsy 误治 infection",
      "abscess 未 drainage 仅 antibiotic",
      "bilateral symmetric 误为 trauma"
    ],
    pearls: [
      "diffuse edema + fever = pyomyositis until proven otherwise",
      "MRI guides aspiration site",
      "dermatomyositis 需 malignancy workup"
    ]
  },
  "rhabdo-trauma": {
    mgmt: [
      "Aggressive IV fluid resuscitation（target high UOP）及 alkalinization 争议",
      "Monitor CK、 electrolytes 及 renal function q6h early",
      "Treat concurrent compartment syndrome with fasciotomy",
      "Dialysis for refractory AKI/hyperkalemia"
    ],
    ddx: [
      "compartment syndrome without rhabdo",
      "myositis/infection",
      "hematoma/contusion"
    ],
    pitfalls: [
      "AKI prevention 不足（fluid 延迟）",
      "miss concurrent compartment syndrome",
      "MRI 延误 acute compartment fasciotomy"
    ],
    pearls: [
      "CK + dark urine 为 classic combination",
      "aggressive early hydration 降低 AKI risk",
      "always assess compartment pressure concurrently"
    ]
  },
  denervation: {
    ddx: [
      "myositis（often symmetric/bilateral）",
      "disuse atrophy（less edema, non-territorial）",
      "primary muscle disease"
    ],
    pitfalls: [
      "MRI pattern 未按 nerve territory 解读",
      "EMG timing 过早（<3 weeks 可能 normal）",
      "bilateral symmetric 误为 denervation"
    ],
    pearls: [
      "MRI acute edema pattern 高度 specific for denervation territory",
      "fatty atrophy 为 irreversible late sign",
      "EMG 与 MRI 互补 confirm diagnosis"
    ]
  },
  "tendon-xanthoma": {
    ddx: [
      "focal tendinopathy/tendinitis（painful, focal）",
      "tendon tear with thickening",
      "gouty tendon deposition（different signal/history）"
    ],
    pitfalls: [
      "focal tendinopathy 误为 xanthoma 或 vice versa",
      "未 recognize 为 FH systemic marker 漏筛 family"
    ],
    pearls: [
      "bilateral Achilles thickening in young adult = xanthoma/FH until proven otherwise",
      "treat systemic lipids not tendon locally",
      "screen first-degree relatives"
    ]
  },
  spondylolysis: {
    ddx: [
      "Pars 应力反应（MRI 水肿但 X 线未断裂）",
      "椎弓根骨折",
      "Spina bifida occulta（神经弓未闭）"
    ],
    pitfalls: [
      "平片阴性不能排除，斜位及 SPECT/MRI 更敏感",
      "勿将正常变异（如 limbus vertebra）误判为峡部裂"
    ],
    pearls: [
      "Scottie dog 征“项圈”缺失= 峡部裂经典征",
      "青少年运动员隐匿腰痛应查斜位",
      "SPECT 对活动性应力反应最敏感"
    ]
  },
  spondylolisthesis: {
    ddx: [
      "退变性滑脱 vs 峡部裂性（峡部是否完整）",
      "假性滑脱（小关节过度活动）",
      "Traumatic 滑脱（急性骨折线）"
    ],
    pitfalls: [
      "过伸过屈位评估不稳，但辐射剂量需权衡",
      "高级别滑脱勿漏评马尾症状"
    ],
    pearls: [
      "Meyerding 分级侧位测量 slip %",
      "MRI 评估神经压迫优于 CT",
      "Hamstring 紧张提示高级别滑脱"
    ]
  },
  schmorl: {
    ddx: [
      "Modic 终板改变（终板层面而非椎体内）",
      "溶骨性转移/感染（破坏性强、无硬化边）"
    ],
    pitfalls: [
      "勿将 Schmorl 结节误判为溶骨性病变",
      "Scheuermann 需测量后凸角度"
    ],
    pearls: [
      "Schmorl 结节极常见，多为良性",
      "Scheuermann 多发 Schmorl+后凸>45°"
    ],
    mgmt: [
      "无症状：无需治疗，影像随访即可",
      "Scheuermann 病：理疗、支具（ skeletally immature）、监测后凸进展",
      "合并显著背痛：NSAID、核心稳定训练"
    ]
  },
  modic: {
    ddx: [
      "感染性 discitis/OM（增强明显、临床感染征）",
      "肿瘤性骨髓浸润"
    ],
    pitfalls: [
      "Modic I 与感染鉴别需结合增强及临床",
      "勿将 Modic 等同于必须手术"
    ],
    pearls: [
      "Modic I 与活动性 discogenic pain 相关性最强",
      "II 型最常见且相对稳定"
    ],
    mgmt: [
      "保守治疗：NSAID、理疗、核心稳定及姿势训练",
      "Modic I 型 discogenic pain：可考虑硬膜外或 discography 引导治疗",
      "顽固 discogenic pain：椎体间融合或 disc replacement 个体化评估"
    ]
  },
  "thoracic-disc": {
    ddx: [
      "脊髓肿瘤/硬膜外转移",
      "脊髓空洞",
      "transverse myelitis（急性，增强模式不同）"
    ],
    pitfalls: [
      "胸椎 disc 症状隐匿，易延误诊断",
      "中央型突出即使体积小也可致严重脊髓病",
      "calcified disc 术前 CT 必查"
    ],
    pearls: [
      "MRI 是胸椎 disc 诊断金标准",
      "进行性脊髓症状= 手术指征",
      "calcified 硬突出手术规划需 CT"
    ]
  },
  syringomyelia: {
    ddx: [
      "脊髓肿瘤 cyst（增强有壁结节）",
      "transverse myelitis",
      "cord infarction（急性，DWI 受限）"
    ],
    pitfalls: [
      "须排查 Chiari、肿瘤及 VHL",
      "空洞与肿瘤 cyst 增强表现不同",
      "post-traumatic 空洞可延迟出现"
    ],
    pearls: [
      "Chiari I+syringomyelia 常见组合",
      "分离性感觉障碍为特征性临床线索",
      "MRI 全脊髓筛查排除肿瘤"
    ]
  },
  chiari: {
    ddx: [
      " acquired tonsillar ectopia（颅压增高、脑萎缩）",
      "basilar invagination",
      "platybasia"
    ],
    pitfalls: [
      "须区分 congenital Chiari 与 acquired tonsillar descent",
      "I 型必查全脊髓排除 syringomyelia"
    ],
    pearls: [
      "I 型≥5 mm 下疝+症状= 手术指征",
      "syringomyelia 合并率极高",
      "valsalva 头痛为典型线索"
    ]
  },
  atlantoaxial: {
    mgmt: [
      "Trauma/急性不稳：hard collar 或 Halo 固定，尽早评估手术",
      "RA C1–C2：融合（C1–C2 或 occipitocervical）当 ADI>10 mm 或脊髓压迫",
      "Rotatory subluxation：牵引复位+固定；失败则融合",
      "Down 综合征：无症状 ADI<5 mm 观察，有症状或 ADI 增大则固定"
    ],
    ddx: [
      "odontoid  fracture vs  hypoplasia",
      "basilar invagination",
      "C1 ring fracture（Jefferson）"
    ],
    pitfalls: [
      "RA 患者颈操做需谨慎，可致 acute cord compression",
      "rotatory subluxation 平片易漏，CT 必查",
      "儿童 ADI 阈值与成人不同"
    ],
    pearls: [
      "ADI>3 mm 成人提示 C1–C2 不稳",
      "CT 3D 评估 rotatory subluxation",
      "RA 患者术前必查 C1–C2"
    ]
  },
  "odontoid-hypo": {
    ddx: [
      "odontoid  fracture（acute trauma、 fracture line）",
      "os odontoideum vs persistent ossiculum terminale",
      "RA pannus 侵蚀 odontoid"
    ],
    pitfalls: [
      "os odontoideum 与 fracture nonunion 鉴别困难",
      "儿童 ADI 阈值不同",
      "Morquio 等须综合征筛查"
    ],
    pearls: [
      "CT 是 odontoid 形态评估关键",
      "ADI 增大+ cord signal= 手术指征",
      "os odontoideum 可 congenital 或 post-traumatic"
    ]
  },
  discitis: {
    mgmt: [
      "Blood culture 及 image-guided biopsy 明确病原",
      "IV 抗生素 6–12 周，根据 sensitivities 调整",
      "Epidural abscess 致神经压迫：手术引流+减压",
      "Immobilization、疼痛控制；监测 ESR/CRP 治疗反应",
      "血培养+骨活检指导抗生素",
      "不稳定或巨大脓肿：减压+内固定"
    ],
    ddx: [
      "Modic I 改变（无增强、无 fever/CRP 升高）",
      "Schmorl 结节/退变",
      "Brucella 等特异性感染",
      "Modic I 型终板炎：无全身感染",
      "转移瘤：椎间盘常保留"
    ],
    pitfalls: [
      "早期 X 线正常不能排除",
      "Modic I 与 discitis 增强表现不同",
      "Post-op  discitis 与 normal post-op 改变鉴别",
      "已开始抗生素后培养阳性率下降",
      "须评估硬膜外脓肿范围"
    ],
    pearls: [
      "MRI+增强是诊断金标准",
      "ESR/CRP 监测治疗反应",
      "Biopsy 在 culture 阴性时重要",
      "MRI 最早；T1 低 T2 高+增强",
      "儿童 disc 血供丰富更易受累"
    ]
  },
  "epidural-abscess": {
    mgmt: [
      "Emergency MRI 及 neurosurgical/spine  consultation",
      "IV 抗生素（经验性覆盖 MRSA 等）+ 血培养",
      "神经 deficit 或进行性压迫：urgent surgical drainage+decompression",
      "High-dose antibiotics 6–8 周；监测 ESR/CRP 及神经功能",
      "全脊柱 MRI（20–40% 多节段）",
      "神经功能进行性下降=急诊手术"
    ],
    ddx: [
      "Epidural hematoma（acute trauma、无 fever）",
      "Epidural phlegmon（early discitis）",
      "Metastatic epidural disease（增强模式不同）",
      "硬膜外血肿：创伤/抗凝",
      "硬膜外转移：已知原发瘤"
    ],
    pitfalls: [
      "Classic triad 缺失时易延误",
      "勿因等待 culture 而 delay MRI/手术",
      "Multilevel abscess 需全 spine MRI",
      "仅扫 symptomatic level 漏诊",
      "延迟减压可致不可逆瘫痪"
    ],
    pearls: [
      "SEA 是 spine emergency",
      "MRI 全 spine 增强不 delay",
      "Time to decompression 影响预后",
      "三联：背痛+发热+神经缺损",
      "增强 MRI 显示脓肿壁强化"
    ]
  },
  meniscoid: {
    mgmt: [
      "根型：保守理疗、药物、颈托",
      "脊髓型或进行性无力：手术减压融合",
      "避免脊髓型暴力推拿",
      "根型：颈托、理疗、药物",
      "脊髓型或进行性肌力下降：减压融合",
      "避免暴力推拿"
    ],
    ddx: [
      "椎管狭窄症",
      "脊髓肿瘤",
      "周围神经病",
      "颈椎管狭窄症（多节段）",
      "脊髓肿瘤：强化肿块",
      "肌萎缩侧索硬化：无根性痛"
    ],
    pitfalls: [
      "meniscoid 在本库=颈椎间盘疝",
      "脊髓型需完整 MRI",
      "轴位+矢状位必看",
      "本库 type=meniscoid 指颈椎间盘疝",
      "须轴位+矢状位联合读片"
    ],
    pearls: [
      "meniscoid=颈椎间盘疝",
      "MRI 金标准",
      "脊髓型尽早手术评估",
      "脊髓 T2 高信号提示预后不良",
      "C5–6/C6–7 最常见"
    ]
  },
  "oss-flavum": {
    mgmt: [
      "有脊髓病或进行性神经功能障碍：后路减压（椎板切除或椎管扩大成形术）",
      "OLF 为后方压迫，通常不需要前路手术；合并前方 OPLL 时需分别评估",
      "围术期脊髓监测；多学科评估合并颈椎病/胸椎病",
      "无症状轻度骨化可随访观察",
      "OLF 为后方压迫，通常后路减压",
      "合并 OPLL 需分别评估前后侵占",
      "无症状可随访"
    ],
    ddx: [
      "OPLL：骨化位于椎管前方正中后纵韧带区，与 OLF 可并存",
      "黄韧带肥厚（非骨化）：MRI T2 等/低信号但 CT 无明显骨化密度",
      "椎间盘突出/硬膜外肿瘤：MRI 可鉴别",
      "黄韧带肥厚（非骨化）",
      "硬膜外脂肪增多",
      "后纵韧带骨化（OPLL）"
    ],
    pitfalls: [
      "切勿将 OLF 与 OPLL 混称或混治",
      "MRI 对骨化范围评估不如 CT，术前需 CT",
      "多节段病变需规划足够减压范围",
      "切勿与 OPLL 混称",
      "MRI 不能替代 CT 定量骨化"
    ],
    pearls: [
      "OLF=后方黄韧带骨化；OPLL=前方后纵韧带骨化",
      "CT 是骨化定量与手术规划金标准",
      "胸椎下段 OLF 是亚洲人群脊髓病常见原因之一",
      "OLF=黄韧带；OPLL=后纵韧带",
      "胸椎下段亚洲人群多见"
    ]
  },
  opll: {
    mgmt: [
      "Asymptomatic/mild：观察及 MRI 随访",
      "Progressive myelopathy： anterior decompression（ACDF、 corpectomy）或 posterior expansion",
      "Occupation ratio>50% 或 cord signal change： often 需手术",
      "与 OLF 并存： combined approach  individualize"
    ],
    ddx: [
      "OLF（posterior，黄韧带）",
      "Disc calcification/ossification",
      "Meningioma（dural based，enhancing）"
    ],
    pitfalls: [
      "OPLL anterior、OLF posterior，勿混淆",
      "CT 测量 occupation ratio 标准",
      "Cord T2 signal 影响预后"
    ],
    pearls: [
      "OPLL = 后纵韧带骨化，椎管前方",
      "CT occupation ratio 指导手术",
      "与 OLF 可并存，分别评估"
    ]
  },
  blount: {
    ddx: [
      "生理性内翻：2 岁前常见，physis 正常",
      "佝偻病：全身骨矿化异常、Looser 带",
      "骨纤维异常增殖症：单侧骨膨胀及 ground-glass 改变"
    ],
    pitfalls: [
      "2 岁前生理性内翻勿过度诊断",
      "双侧内翻须筛查 rickets/代谢病"
    ],
    pearls: [
      "内侧 physis 增宽+platform 下陷= Blount 关键征",
      "Langenskiöld 分级指导手术时机",
      "全长站立位力线评估不可省略"
    ]
  },
  rickets: {
    ddx: [
      "Blount 病：单侧、platform 下陷",
      "Caffey 病：皮质增厚+骨膜反应",
      "Metaphyseal dysplasia：特定基因型"
    ],
    pitfalls: [
      "Looser 带勿误认为真骨折",
      "早期 X 线可仅 subtle 干骺端模糊",
      "须实验室确认而非仅凭影像"
    ],
    pearls: [
      "干骺端杯口+Looser 带=活动性 rickets",
      "双侧对称畸形支持代谢性病因",
      "治疗有效后影像可逐渐改善"
    ]
  },
  "acetabular-dysplasia": {
    ddx: [
      "FAI：cam/pincer 为主，覆盖可正常",
      "DDH 残余：History 及 Severin 分级",
      "Legg-Calvé-Perthes 后遗症"
    ],
    pitfalls: [
      "仅看 CE angle 忽视 LCEA 及 anterior coverage",
      "假 profile 位投照不当致测量误差",
      "勿将 normal variant 浅臼过度诊断"
    ],
    pearls: [
      "LCEA<20° 为判定发育不良的常用界值",
      "PAO 适用于无 advanced OA 的年轻患者",
      "MRI 评估 labrum 与 cartilage 并行"
    ]
  },
  "transient-osteoporosis": {
    ddx: [
      "ONFH：T1 band、新月征",
      "Insufficiency fracture：subchondral fracture line",
      "Bone marrow edema syndrome（BME）"
    ],
    pitfalls: [
      "早期与 ONFH 混淆导致过度治疗",
      "可进展为 insufficiency fracture",
      "双侧少见但可发生"
    ],
    pearls: [
      "弥漫水肿+无 band= 支持 TOH",
      "孕妇第三 trimester 为典型场景",
      "自限性但须随访排除 ONFH"
    ]
  },
  "bone-marrow-edema": {
    ddx: [
      "ONFH：T1 band、crescent sign",
      "Stress/insufficiency fracture：fracture line",
      "OM：clinical+lab+增强 pattern"
    ],
    pitfalls: [
      "BME 为 nonspecific，勿单独诊断",
      "X 线正常不能排除 BME",
      "须全序列 MRI 避免漏读 band"
    ],
    pearls: [
      "BME= MRI 表现非独立疾病",
      "寻找 subchondral line 与 band",
      "伴随关节积液提示 intra-articular source"
    ]
  },
  "subchondral-insufficiency": {
    mgmt: [
      "保护负重 6–12 周，拐杖或 knee scooter",
      "治疗 underlying osteoporosis",
      "persistent pain 或 collapse：HTO、unicompartmental 或 TKA",
      "避免过早关节镜（可能加重 collapse）"
    ],
    ddx: [
      "ON：T1 band 更典型、risk factors 重叠",
      "Meniscal tear：小范围 edema",
      "Stress fracture：younger、不同 location"
    ],
    pitfalls: [
      "早期 X 线/CT 完全正常",
      "误作 meniscal tear 行 arthroscopy",
      "与 SONK 概念重叠勿混淆命名"
    ],
    pearls: [
      "subchondral line+ diffuse BME= SCIF 核心",
      "elderly 突发膝痛必查 MRI",
      "保护负重优于早期 surgery"
    ]
  },
  "osteonecrosis-knee": {
    mgmt: [
      "早期：保护负重、NSAID、bisphosphonate（争议）",
      "中小 lesion 无 collapse：HTO 或 core decompression（selected）",
      "collapse 或 advanced OA：UKA 或 TKA",
      "治疗 underlying risk factors（steroid 减量等）"
    ],
    ddx: [
      "SCIF：fracture line 为主、可重叠 SPONK",
      "Meniscal tear：小范围 edema",
      "Primary OA：渐进性、无 band"
    ],
    pitfalls: [
      "I 期 X 线正常易漏诊",
      "SPONK 与 SCIF 命名/机制争议",
      "lesion size 低估导致错误保关节手术"
    ],
    pearls: [
      "MFC 负重区 band= SONK 典型",
      "MRI I 期即可诊断",
      "lesion>50% condyle 预后差"
    ]
  },
  osteochondritis: {
    mgmt: [
      "Stable + immature skeleton：activity modification、bracing 6–12 月",
      "Unstable 或 mature：arthroscopic fixation（bioabsorbable pins/screws）或 drilling",
      "Loose body：removal + marrow stimulation/ fixation",
      "Fail conservative：osteochondral autograft/allograft 或 ACI",
      "骨骼未成熟+稳定：制动 6–12 周",
      "不稳定：内固定/骨软骨移植",
      "游离体：取出或固定"
    ],
    ddx: [
      "Normal ossification variant：smooth borders、asymptomatic",
      "ON fragment：older、risk factors",
      "Acute osteochondral fracture：trauma history",
      "急性骨软骨骨折：明确外伤",
      "Normal 变异：对侧对称"
    ],
    pitfalls: [
      "勿将外侧股骨髁病变误作典型 OCD 部位",
      "稳定性判断依赖 MRI 液相，平片不足",
      "与急性骨软骨骨折需结合创伤史",
      "膝典型部位为 MFC 外侧面",
      "MRI 液相 cleft=不稳定"
    ],
    pearls: [
      "膝 OCD 典型位于股骨内侧髁外侧面（MFC lateral aspect）",
      "MRI 液相 cleft 提示不稳定碎片",
      "骨骼未成熟者愈合潜力更好",
      "Berndt-Harty 用于距骨 OCD",
      "未成熟骨骼愈合潜力更大"
    ]
  },
  "meniscal-cyst": {
    ddx: [
      "Popliteal/Baker cyst：posterior、与 gastroc-semim 裂隙相关",
      "Soft tissue sarcoma：solid、enhancing"
    ],
    pitfalls: [
      "勿误诊为 tumor 行广泛切除",
      "aspiration  without 治疗 tear 必复发"
    ],
    pearls: [
      "Cyst+horizontal tear= 典型组合",
      "Arthroscopy 同时处理 tear 与 cyst"
    ],
    mgmt: [
      "symptomatic：arthroscopic partial meniscectomy + cyst decompression",
      "asymptomatic small cyst：观察",
      "aspiration  alone 复发率高"
    ]
  },
  "discoid-meniscus": {
    ddx: [
      "Normal meniscus tear：无 discoid morphology",
      "Plicae syndrome：medial snapping",
      "Loose body：intrarticular fragment"
    ],
    pitfalls: [
      "单层面 thick meniscus 不足以诊断",
      "忽视 Wrisberg 型 attachment 异常",
      "total meniscectomy 导致 early OA"
    ],
    pearls: [
      "≥3 层面 bowtie= discoid 提示",
      "Wrisberg 型须 stabilization",
      "Saucerization 优于 total resection"
    ]
  },
  "acl-ganglion": {
    ddx: [
      "ACL tear：discontinuity、 instability",
      "Notch fibroma/ synovial chondromatosis"
    ],
    pitfalls: [
      "Mucoid ACL degeneration 与 tear 混淆",
      "忽视 multiloculated cyst 在 revision ACL 中"
    ],
    pearls: [
      "Celery stalk sign= mucoid ACL/ganglion",
      "Stable knee + ACL cyst= 典型组合"
    ],
    mgmt: [
      "Symptomatic：arthroscopic cyst decompression + ACL debridement",
      "Asymptomatic incidental：观察",
      "Open excision  rarely needed"
    ]
  },
  slap: {
    mgmt: [
      "Type I degenerative：debridement alone",
      "Type II acute：anchor repair（suture anchor to supraglenoid tubercle）",
      "Type IV 含 bucket-handle：repair 或 resect handle + biceps tenodesis",
      "Failed repair 或 biceps symptoms：biceps tenodesis/tenotomy"
    ],
    ddx: [
      "Normal superior labrum variant：sublabral foramen、Buford complex",
      "Rotator cuff tear：supraspinatus/infraspinatus",
      "Biceps tendinopathy alone"
    ],
    pitfalls: [
      "Sublabral recess 误为 SLAP",
      "Buford complex（cord-like MGHL）勿 repair",
      "Age>40 degenerative superior labrum 慎判 SLAP"
    ],
    pearls: [
      "MRA 提高 SLAP 检出",
      "Type II= anchor peel 需 repair",
      "Paralabral cyst 提示 labral tear"
    ]
  },
  "ac-joint": {
    ddx: [
      "Glenohumeral OA：global shoulder 痛、GH joint 变窄",
      "Rotator cuff tear：weakness、night pain",
      "Adhesive capsulitis：global ROM loss"
    ],
    pitfalls: [
      "标准 AP 位 AC joint 重叠显示不清",
      "Zanca view 为 AC 专用"
    ],
    pearls: [
      "Cross-body adduction pain= AC 定位",
      "Zanca view 必用",
      "CC distance 增宽= significant separation"
    ]
  },
  "glenohumeral-oa": {
    ddx: [
      "Cuff tear alone：preserved joint space",
      "CPPD：chondrocalcinosis",
      "Neuropathic arthropathy：rare in shoulder"
    ],
    pitfalls: [
      "Standard AP 非 true AP 误判 joint space",
      "忽视 cuff status 影响 prosthesis 选择"
    ],
    pearls: [
      "True AP+axillary= GH OA 基础",
      "Hamada 分级指导 cuff tear arthropathy",
      "Reverse TSA 用于 cuff-deficient OA"
    ]
  },
  "elbow-oa": {
    ddx: [
      "Primary OA other joints：multi-joint pattern",
      "CPPD：chondrocalcinosis",
      "Hemophilic arthropathy：history"
    ],
    pitfalls: [
      "Throwing athlete osteophyte 非 always OA",
      "Loose body 可仅 CT 可见",
      "TEA 禁忌 high-demand patient"
    ],
    pearls: [
      "Terminal extension loss= elbow OA 早期 sign",
      "Arthroscopic debridement 适合 mechanical block",
      "Post-traumatic 为最常见 etiology"
    ]
  },
  "radioulnar-synostosis": {
    ddx: [
      "Radioulnar coalition vs cross-union：history 区分",
      "Isolated radial head dislocation",
      "Forearm malunion without synostosis"
    ],
    pitfalls: [
      "Early fibrous union MRI 易漏 CT 细节",
      "Excision recurrence 率高",
      "忽视 associated congenital anomalies"
    ],
    pearls: [
      "Proximal synostosis= 最常见",
      "CT 3D 规划 excision",
      "Bilateral congenital 查 family history"
    ]
  },
  madelung: {
    ddx: [
      "Traumatic malunion：history 区分",
      "Rickets/ metabolic： bilateral 但 pattern 不同",
      "Turner syndrome：similar SHOX 相关"
    ],
    pitfalls: [
      "Single view 低估 volar tilt",
      "忽视 SHOX testing（Leri-Weill）",
      "Premature surgery before maturity"
    ],
    pearls: [
      "Adolescent female + bilateral= 查 Madelung",
      "Ulnar positive variance= impaction 根源",
      "Radial osteotomy 为核心矫形"
    ]
  },
  kienbock: {
    ddx: [
      "Preiser（scaphoid ON）",
      "Lunate fracture：acute trauma、localized",
      "CPPD：chondrocalcinosis in lunate"
    ],
    pitfalls: [
      "Early X 线 normal 延误诊断",
      "忽视 ulnar variance 影响 treatment 选择",
      "Confuse with Keinbock vs lunate stress injury"
    ],
    pearls: [
      "Ulnar minus= 重要 risk factor",
      "MRI 早于 X 线发现 AVN",
      "Lichtman III+ 常需 salvage procedure"
    ]
  },
  preiser: {
    ddx: [
      "Scaphoid fracture nonunion：trauma history、linear fracture",
      "Kienböck（lunate）",
      "Scaphoid stress reaction：reversible edema"
    ],
    pitfalls: [
      "误作 scaphoid fracture 仅 immobilize 不足",
      "Small avascular proximal pole 在 MRI 需仔细"
    ],
    pearls: [
      "Proximal pole AVN= Preiser 定位",
      "MRI 关键 early tool",
      "Revascularization 仅 early collapse 前有效"
    ]
  },
  "loose-body-knee": {
    ddx: [
      "Fabella 或 sesamoid：fixed location、not intra-articular mobile",
      "Chip fracture：acute、trauma"
    ],
    pitfalls: [
      "Pure cartilaginous body X 线 negative",
      "Multiple compartments 须 systematic arthroscopy"
    ],
    pearls: [
      "CT 计数 calcified bodies",
      "Arthroscopy 同时处理 etiology"
    ],
    mgmt: [
      "Symptomatic：arthroscopic removal（minimum invasive）",
      "Treat primary cause（OCD fixation、 synovectomy for chondromatosis）",
      "Multiple bodies： thorough arthroscopic hunt all compartments"
    ]
  },
  osgood: {
    ddx: [
      "Sinding-Larsen-Johansson：inferior patella pole",
      "Patellar tendon tear：acute、trauma"
    ],
    pitfalls: [
      "Over-imaging 通常 unnecessary",
      "Complete activity stop 非必须（relative rest）"
    ],
    pearls: [
      "Clinical diagnosis 为主",
      "Self-limited with maturity"
    ],
    mgmt: [
      "Activity modification（relative rest，avoid pain-provoking sports）",
      "Ice、NSAID 及 quadriceps/hamstring stretching",
      "Skeletal maturity 后 vast majority resolve"
    ]
  },
  sinding: {
    ddx: [
      "Osgood-Schlatter：tibial tuberosity",
      "Jumper's knee（patellar tendinopathy）：adult、no apophysis"
    ],
    pitfalls: [
      "Confuse with patellar tendinopathy in adult",
      "Aggressive imaging 通常不需要"
    ],
    pearls: [
      "Inferior patella pole= SLJ 定位",
      "Apophysitis 只见于 skeletally immature"
    ],
    mgmt: [
      "Relative rest 及 activity modification",
      "Ice、NSAID 及 stretching/strengthening program",
      "Knee pad for kneeling activities"
    ]
  },
  patellofemoral: {
    mgmt: [
      "Physical therapy：quadriceps（VMO） strengthening、 hip abductor",
      "Activity modification 及 patellar taping/bracing",
      "Chondral defect：microfracture、 MACI 或 trochleoplasty（selected）",
      "Maltracking：medial patellofemoral ligament reconstruction ± TTO"
    ],
    ddx: [
      "Patellar tendinopathy：inferior patella tendon tenderness",
      "Meniscal tear：joint line pain、effusion",
      "Plica syndrome：medial synovial fold"
    ],
    pitfalls: [
      "Axial MRI 切层角度不当误判 tilt",
      "PF pain 非 always chondromalacia on MRI",
      "忽视 hip/core weakness"
    ],
    pearls: [
      "Movie sign= classic PF pain",
      "TT-TG 评估 maltracking",
      "PT 为 first-line 治疗"
    ]
  },
  "hip-labral": {
    mgmt: [
      "Conservative：PT、activity mod、injection（selected）",
      "Arthroscopic labral repair（preferred over debridement in reparable tear）",
      "Concurrent FAI osteoplasty（cam/pincer correction）",
      "Dysplasia：may need PAO instead of or in addition to arthroscopy"
    ],
    ddx: [
      "Groin strain：no intra-articular finding",
      "Intra-articular loose body",
      "Athletic pubalgia/core injury"
    ],
    pitfalls: [
      "Plain MRI 假阴性/假阳性率高于 MRA",
      "Normal labral variants（sub labral recess）",
      "Miss underlying dysplasia 导致 arthroscopy 失败"
    ],
    pearls: [
      "MRA= labral tear 首选",
      "FADIR positive+groin pain 高度 suspicious",
      "Repair+cam correction 改善 outcomes"
    ]
  },
  "facet-arthropathy": {
    ddx: [
      "Discogenic pain（Modic、 disc 源）",
      "Sacroiliac joint pain",
      "Hip pathology（referred pain）"
    ],
    pitfalls: [
      "Facet pain 与 discogenic 鉴别需 block",
      "MRI effusion 非特异",
      "Oblique X 线评估 lumbar facet"
    ],
    pearls: [
      "Extension 加重提示 facet 成分",
      "Diagnostic block 确认 facet 源",
      "Hypertrophic facet 可致 stenosis"
    ]
  }
};

/** 关节与四肢 24 条 · 富文本扩展 */
export default {
  blount: {
    overview:
      'Blount 病（胫骨内翻/Blount disease）是儿童胫骨近端内侧生长板异常导致的进行性内翻畸形，分婴幼儿型与青少年型；影像上须与生理性内翻及佝偻病鉴别。',
    epi: '婴幼儿型 1–3 岁起病，非裔及肥胖儿童风险更高；青少年型 10 岁后起病；单侧或双侧均可，双侧更需排除代谢性骨病。',
    pathophys:
      '胫骨近端内侧 physis 生长抑制或不对称→胫骨内翻及 procurvatum；负重增加可加速畸形；与单纯生理性内翻的鉴别关键在于内侧生长板改变。',
    clinical: [
      '进行性膝内翻，步行后加重',
      '胫骨近端内侧隆起（“内踝样”突起）',
      '双下肢力线异常，步态异常',
      '通常无急性疼痛，晚期可有关节不适',
      '须测量 tibiofemoral angle 及 BMI 评估'
    ],
    staging: 'Langenskiöld I–VI 级（按内侧 tibia 平台改变及骨桥形成）；区分 infantile vs adolescent 型。',
    imagingKeys: [
      ['内侧生长板异常', 'X 线见胫骨近端内侧 physis 增宽、不规则及内侧 platform 下陷；为 Blount 与生理性内翻的核心鉴别点'],
      ['内翻畸形', '全长站立位 X 线测量 mechanical axis 内偏；胫骨内翻角增大，常伴 procurvatum'],
      ['Langenskiöld 骨桥', '晚期内侧 epiphysis 与 metaphysis 间骨桥形成；CT/MRI 可评估骨桥范围及生长潜力']
    ],
    modalities: [
      ['X线', '正侧位及全长站立位评估内翻角、内侧 platform 形态及 Langenskiöld 分级'],
      ['MRI', '评估 physis 软骨桥、骨髓异常及排除代谢性骨病'],
      ['CT', '术前骨桥三维评估及截骨规划']
    ],
    mgmt: [
      '早期 infantile 型：支具或内侧生长板 tethering',
      '进展期或 adolescent 型：高位胫骨截骨（HTO）矫正力线',
      '合并肥胖者须并行体重管理',
      '定期随访至骨骼成熟，监测复发'
    ],
    ddx: ['生理性内翻：2 岁前常见，physis 正常', '佝偻病：全身骨矿化异常、Looser 带', '骨纤维异常增殖症：单侧骨膨胀及 ground-glass 改变'],
    pitfalls: ['2 岁前生理性内翻勿过度诊断', '双侧内翻须筛查 rickets/代谢病', '仅看 CORA 而忽视 platform 形态'],
    pearls: ['内侧 physis 增宽+platform 下陷= Blount 关键征', 'Langenskiöld 分级指导手术时机', '全长站立位力线评估不可省略']
  },
  rickets: {
    overview:
      '佝偻病是维生素 D 缺乏或代谢异常导致骨矿化障碍，儿童表现为生长板增宽、干骺端杯口状改变及骨骼畸形；影像特征具高度提示性。',
    epi: '发展中国家及日照不足、纯母乳喂养未补 Vit D 婴幼儿多见；亦见于 renal osteodystrophy、hypophosphatemic rickets 等代谢性病因。',
    pathophys:
      'Vit D/磷/钙代谢障碍→骨基质矿化不足→生长板软骨堆积、干骺端宽化及机械性变形；慢性者可致内翻/外翻及脊柱后凸。',
    clinical: [
      '生长迟缓、出牙延迟及囟门闭合延迟',
      '肋软骨串珠、手镯/脚镯样改变',
      '肌无力、易跌倒',
      '低钙可致 tetany 或 seizures',
      '须查 Vit D、钙磷、PTH 及碱性磷酸酶'
    ],
    staging: '按病因分型（营养性、抗 Vit D 性、renal、hypophosphatemic）；影像按受累部位及活动性评估。',
    imagingKeys: [
      ['干骺端杯口状增宽', 'X 线见 growth plate 增宽、干骺端呈杯口/毛刷样，膝/腕/踝最常见'],
      ['Looser 带（假骨折）', '皮质内透光线，与骨长轴垂直，见于股骨颈、耻骨支等；为活动性 rickets 标志'],
      ['骨骼畸形', '胫骨内翻、膝外翻、脊柱后凸及胸廓畸形；双侧对称性分布']
    ],
    modalities: [
      ['X线', '干骺端改变、Looser 带及畸形评估；腕/膝为筛查首选部位'],
      ['MRI', '评估骨髓水肿、生长板软骨厚度及并发症'],
      ['DXA/QCT', '骨密度评估及治疗随访（非诊断必需）']
    ],
    mgmt: [
      'Vit D 及钙剂补充（按病因调整剂量）',
      '代谢性 rickets 针对原发病（磷酸盐、Vit D 类似物等）',
      '畸形严重者骨骼成熟后截骨矫形',
      '监测钙磷、PTH、ALP 及 25-OH Vit D 至正常化'
    ],
    ddx: ['Blount 病：单侧、platform 下陷', 'Caffey 病：皮质增厚+骨膜反应', 'Metaphyseal dysplasia：特定基因型']
    ,
    pitfalls: ['Looser 带勿误认为真骨折', '早期 X 线可仅 subtle 干骺端模糊', '须实验室确认而非仅凭影像'],
    pearls: ['干骺端杯口+Looser 带=活动性 rickets', '双侧对称畸形支持代谢性病因', '治疗有效后影像可逐渐改善']
  },
  'acetabular-dysplasia': {
    overview:
      '髋臼发育不良（acetabular dysplasia）指髋臼浅、陡或覆盖不足，导致股骨头覆盖不良及早期 OA 风险；成人可无症状或表现为髋部疼痛及不稳定感。',
    epi: '女性多见；与 DDH 谱系相关；20–40 岁出现症状者常见；亚洲人群发病率相对较高。',
    pathophys:
      '髋臼发育不足→股骨头覆盖减少（尤其 anterior-superior）→应力集中及边缘负荷增加→盂唇损伤及早期 OA；CE angle 减小、acetabular index 增大。',
    clinical: [
      'Groin 或 lateral hip 深部疼痛，久坐后加重',
      'C-sign、impingement 试验阳性',
      '活动受限（尤其 flexion+internal rotation）',
      '可有关节不稳定感或 catching',
      '须评估 LCEA、CE angle 及 Tönnis grade'
    ],
    staging: 'Tönnis 0–3（OA 程度）；Severin 用于 DDH 术后；按 LCEA<20°、CE angle<25° 定义 dysplasia。',
    imagingKeys: [
      ['髋臼浅/陡', 'X 线/AP 见 acetabular index 增大、 sourcil 变平；股骨头覆盖不足，尤其 anterosuperior'],
      ['CE/LCEA 减小', 'CE angle（Wiberg）<20–25° 或 LCEA<20° 提示覆盖不足；crossover sign 提示 pincer 成分'],
      ['早期 OA 征象', '关节间隙变窄、 sclerosis 及 osteophyte；MRI 可见 labral tear 及软骨损伤']
    ],
    modalities: [
      ['X线', 'AP 及 false profile 评估 CE angle、LCEA、acetabular index 及 Tönnis grade'],
      ['MRI', '盂唇撕裂、软骨损伤及 marrow edema；MR arthrography 提高 labral 显示'],
      ['CT', '三维重建评估骨性覆盖及 PAO 截骨规划']
    ],
    mgmt: [
      '轻症：活动调整、物理治疗及 core strengthening',
      '有症状年轻患者：髋臼周围截骨（PAO）改善覆盖',
      '合并 FAI 时可能需要 arthroscopy 或联合截骨',
      '终末期 OA：THA'
    ],
    ddx: ['FAI：cam/pincer 为主，覆盖可正常', 'DDH 残余：History 及 Severin 分级', 'Legg-Calvé-Perthes 后遗症'],
    pitfalls: ['仅看 CE angle 忽视 LCEA 及 anterior coverage', '假 profile 位投照不当致测量误差', '勿将 normal variant 浅臼过度诊断'],
    pearls: ['LCEA<20° 为判定发育不良的常用界值', 'PAO 适用于无进展期 OA 的年轻患者', 'MRI 评估盂唇与软骨并行']
  },
  'transient-osteoporosis': {
    overview:
      '一过性骨质疏松（transient osteoporosis of the hip, TOH）以中年男性或孕晚期女性髋部突发疼痛及弥漫骨髓水肿为特征，通常自限，须与 ONFH 及隐匿骨折鉴别。',
    epi: '30–50 岁男性第三 trimester 孕妇；单侧髋为主；自限性，6–12 个月内缓解；可复发。',
    pathophys:
      '确切机制不明；可能与局部血流调节异常、机械负荷及激素变化有关；表现为股骨头及颈广泛骨髓水肿，无明确坏死带或骨折线（初期）。',
    clinical: [
      '突发髋部或 groin 痛，负重加剧',
      '无 trauma 史或轻微 trauma',
      '活动度下降但通常无 fever 或 systemic 症状',
      '孕妇第三 trimester 典型',
      '实验室炎症指标通常正常'
    ],
    staging: '按时间分为急性期（水肿最明显）、修复期（逐渐吸收）及恢复正常；无 formal 分级系统。',
    imagingKeys: [
      ['弥漫骨髓水肿', 'MRI STIR/T2 见股骨头、颈及 intertrochanteric 区广泛高信号，范围大于 ONFH 典型区域'],
      ['无坏死带', 'T1 无地图样低信号 band；DWI 无 diffusion restriction 坏死核心特征'],
      ['无骨折线（初期）', 'T1/STIR 无明确 subchondral fracture line；但可合并 insufficiency fracture 需随访']
    ],
    modalities: [
      ['MRI', '诊断金标准；显示水肿范围、排除 ONFH 及 fracture'],
      ['X线', '早期常正常；晚期可见 regional osteopenia'],
      ['CT', '排除隐匿骨折；非首选']
    ],
    mgmt: [
      '保护负重、拐杖或 wheelchair 至疼痛缓解',
      'NSAID 及物理治疗 symptomatic relief',
      '密切 MRI 随访排除 ONFH 或 fracture 进展',
      '通常 6–12 个月自行恢复，无需手术'
    ],
    ddx: ['ONFH：T1 band、新月征', 'Insufficiency fracture：subchondral fracture line', 'Bone marrow edema syndrome（BME）'],
    pitfalls: ['早期与 ONFH 混淆导致过度治疗', '可进展为 insufficiency fracture', '双侧少见但可发生'],
    pearls: ['弥漫水肿+无 band= 支持 TOH', '孕妇第三 trimester 为典型场景', '自限性但须随访排除 ONFH']
  },
  'bone-marrow-edema': {
    overview:
      '骨髓水肿（bone marrow edema, BME）是 MRI 上 STIR/T2 高信号、T1 低信号的 nonspecific 表现，可见于 trauma、OA、ON、BME syndrome 及 infection 等多种情况。',
    epi: '无独立流行病学；随基础疾病而异；BME syndrome 好发于 30–60 岁男性，髋/膝/踝均可。',
    pathophys:
      '局部血流增加、间质 fluid 积聚或 trabecular microinjury→ MRI 信号改变；机制包括机械超负荷、炎症及 ischemia 等。',
    clinical: [
      '疼痛程度与 BME 范围不一定平行',
      '负重痛、夜间痛取决于病因',
      '可有关节肿胀或活动受限',
      '须结合病史（trauma/ steroid/ alcohol 等）',
      '实验室检查帮助排除 infection 及 inflammatory arthropathy'
    ],
    staging: '无统一分期；按病因及范围描述（局灶 vs 弥漫；subchondral vs diaphyseal）。',
    imagingKeys: [
      ['STIR 高信号', '骨髓弥漫或局灶高 signal，边界可清晰或模糊；为 BME 最直接征象'],
      ['T1 低信号', '对应 STIR 高 signal 区域 T1 减低；须与 fat-containing lesion 鉴别'],
      ['伴随征象', 'subchondral fracture line 提示 SCIF；T1 band 提示 ON；effusion 提示 intra-articular pathology']
    ],
    modalities: [
      ['MRI', 'BME 检测最敏感；须 T1+STIR/T2 FS 配对解读'],
      ['X线', '常正常或仅 subtle osteopenia；不能排除 BME'],
      ['CT', '评估骨结构、 fracture 及 calcification；对 BME 本身不敏感']
    ],
    mgmt: [
      '针对病因治疗（unload、治疗 ON/OA 等）',
      'BME syndrome：保护负重、NSAID、bisphosphonate 或 prostacyclin  analog（争议）',
      '合并 fracture 者须 appropriately restrict weight-bearing',
      '3–6 个月 MRI 随访评估吸收'
    ],
    ddx: ['ONFH：T1 band、crescent sign', 'Stress/insufficiency fracture：fracture line', 'OM：clinical+lab+增强 pattern'],
    pitfalls: ['BME 为 nonspecific，勿单独诊断', 'X 线正常不能排除 BME', '须全序列 MRI 避免漏读 band'],
    pearls: ['BME= MRI 表现非独立疾病', '寻找 subchondral line 与 band', '伴随关节积液提示 intra-articular source']
  },
  'subchondral-insufficiency': {
    overview:
      '软骨下不全骨折（subchondral insufficiency fracture, SCIF）多见于老年骨质疏松患者，以 subchondral plate 骨折及广泛 BME 为特征，好发股骨髁及胫骨 plateau。',
    epi: '>60 岁女性，osteoporosis 或 steroid 使用史；膝>髋；急性 onset pain 而无明确 high-energy trauma。',
    pathophys:
      '骨强度下降+正常或轻度增加负荷→ subchondral bone 微骨折→ BME 扩展；可进展为 collapse 或类似 ON 表现。',
    clinical: [
      '急性膝/髋痛，负重明显受限',
      '通常无 high-energy trauma',
      'osteoporosis 或 steroid 等 risk factors',
      '关节积液及 effusion 常见',
      '与 meniscal tear 症状可重叠'
    ],
    staging: '按 Yao 或 Koshino 分型（ knee SCIF）；早期仅 BME→可见 fracture line→collapse。',
    imagingKeys: [
      ['subchondral fracture line', 'MRI T1/STIR 见软骨下低信号线，与关节面平行，位于 sclerotic plate 下方'],
      ['广泛 BME', 'STIR 见 femoral condyle 或 tibial plateau 大片水肿，范围常大于 meniscal tear 相关 edema'],
      ['plate 硬化/塌陷', 'T1 见 subchondral low signal band；进展期可见 contour depression 及 OA 改变']
    ],
    modalities: [
      ['MRI', '诊断首选；T1+STIR 显示 fracture line 及 edema 范围'],
      ['X线', '早期正常；进展期可见 sclerosis、collapse 或 OA'],
      ['CT', '显示 sclerotic plate 及 collapse 程度；术前评估']
    ],
    mgmt: [
      '保护负重 6–12 周，拐杖或 knee scooter',
      '治疗 underlying osteoporosis',
      'persistent pain 或 collapse：HTO、unicompartmental 或 TKA',
      '避免过早关节镜（可能加重 collapse）']
    ,
    ddx: ['ON：T1 band 更典型、risk factors 重叠', 'Meniscal tear：小范围 edema', 'Stress fracture：younger、不同 location'],
    pitfalls: ['早期 X 线/CT 完全正常', '误作 meniscal tear 行 arthroscopy', '与 SONK 概念重叠勿混淆命名'],
    pearls: ['subchondral line+ diffuse BME= SCIF 核心', 'elderly 突发膝痛必查 MRI', '保护负重优于早期 surgery']
  },
  'osteonecrosis-knee': {
    overview:
      '膝关节骨坏死（osteonecrosis of the knee, SONK/SPONK）以股骨髁或胫骨 plateau subchondral 坏死为特征，老年 SPONK 与 younger secondary ON 临床影像各异。',
    epi: 'SPONK：>60 岁女性，内侧 femoral condyle 最常见；secondary ON：steroid、alcohol、SLE 等；可 bilateral。',
    pathophys:
      'subchondral 血供障碍→ necrotic segment→ fracture line 及 collapse→ secondary OA；SPONK 可能与 insufficiency fracture 机制重叠。',
    clinical: [
      '突发膝痛，内侧 compartment 为主（MFC SPONK）',
      '负重痛、夜间痛及 joint effusion',
      '活动度下降',
      'secondary ON 有 steroid/alcohol 等 history',
      '须评估 lesion size 及 collapse 程度'
    ],
    staging: 'Koshino/Iwano 或 Ficat-Arlet adapted（I 水肿→II fracture line→III collapse→IV OA）；Ahlbäck 用于 secondary。',
    imagingKeys: [
      ['T1 低信号 band', 'subchondral crescentic low signal，与关节面平行，位于 MFC 或 plateau weight-bearing 区'],
      ['新月征/ collapse', 'X 线/CT 见 crescent sign、subchondral collapse 及 sclerosis'],
      ['BME 范围', 'STIR 见 condyle 广泛 edema； lesion size>50% 或 >2/3 condyle 预后差']
    ],
    modalities: [
      ['MRI', '早期诊断（band+edema）；评估 lesion size 及 collapse'],
      ['X线', 'II 期后 crescent sign、flattening 及 OA 改变'],
      ['CT', 'collapse 程度、 sclerotic margin 及 UKA/TKA 规划']
    ],
    mgmt: [
      '早期：保护负重、NSAID、bisphosphonate（争议）',
      '中小 lesion 无 collapse：HTO 或 core decompression（selected）',
      'collapse 或 advanced OA：UKA 或 TKA',
      '治疗 underlying risk factors（steroid 减量等）']
    ,
    ddx: ['SCIF：fracture line 为主、可重叠 SPONK', 'Meniscal tear：小范围 edema', 'Primary OA：渐进性、无 band'],
    pitfalls: ['I 期 X 线正常易漏诊', 'SPONK 与 SCIF 命名/机制争议', 'lesion size 低估导致错误保关节手术'],
    pearls: ['MFC 负重区 band= SONK 典型', 'MRI I 期即可诊断', 'lesion>50% condyle 预后差']
  },
  osteochondritis: {
    overview:
      '剥脱性骨软骨炎（OCD/osteochondritis dissecans）是 subchondral bone 与 overlying cartilage 分离，青少年 knee/elbow 多见；膝 OCD 典型部位为 MFC 的外侧 aspect（非 lateral condyle）。',
    epi: '10–20 岁男性；knee 最常见（MFC lateral aspect）；elbow capitellum 次之；与 repetitive microtrauma 及 genetics 相关。',
    pathophys:
      'subchondral bone 血供障碍或 repetitive stress→ bone+cartilage fragment 形成→ stable vs unstable lesion；未愈合可 loose body。',
    clinical: [
      '活动相关膝/肘痛，swelling 及 effusion',
      'Mechanical symptoms：locking、catching',
      'Extension 或 weight-bearing 痛',
      'Wilson test（knee internal rotation+extension）可 reproduce pain',
      '须评估 lesion stability 及 open physis'
    ],
    staging: 'Berndt-Harty（I–IV）或 ICRS/OCD staging；stable vs unstable；healing potential 与 skeletal maturity 相关。',
    imagingKeys: [
      ['MFC 外侧 aspect lesion', 'X 线/MRI 见 medial femoral condyle 外侧面 subchondral defect 及 sclerotic rim；非 lateral femoral condyle'],
      ['cartilage覆盖与液信号', 'MRI T2 见 fragment 下 high signal line（不稳定标志）；cartilage intact vs breach'],
      ['loose body', '关节内 free fragment；CT/MRI 显示 detached ossicle 及 donor site']
    ],
    modalities: [
      ['MRI', '评估 stability（T2 line）、cartilage 及 marrow edema；诊断敏感'],
      ['X线', 'tunnel view/AP/lateral 显示 MFC lateral aspect defect 及 sclerotic margin'],
      ['CT', '骨性 fragment 大小、 location 及术前 planning']
    ],
    mgmt: [
      'Stable + immature skeleton：activity modification、bracing 6–12 月',
      'Unstable 或 mature：arthroscopic fixation（bioabsorbable pins/screws）或 drilling',
      'Loose body：removal + marrow stimulation/ fixation',
      'Fail conservative：osteochondral autograft/allograft 或 ACI']
    ,
    ddx: ['Normal ossification variant：smooth borders、asymptomatic', 'ON fragment：older、risk factors', 'Acute osteochondral fracture：trauma history'],
    pitfalls: ['误将 lesion 定位于 lateral femoral condyle', 'X 线 tunnel view 遗漏 MFC lateral aspect', 'stable vs unstable 误判影响治疗'],
    pearls: ['Knee OCD= MFC lateral aspect（critical）', 'T2 high signal line= unstable', 'Skeletal immaturity 保 conservative 机会大']
  },
  'meniscal-cyst': {
    overview:
      '半月板囊肿（meniscal cyst）多为半月板 tear（尤其 horizontal cleavage）旁 fluid 积聚形成的 juxta-articular 囊性病变，膝 lateral 更常见，可致局部 swelling。',
    epi: '30–50 岁；lateral meniscus 多于 medial；与 degenerative horizontal tear 相关；可因 trauma 急性增大。',
    pathophys:
      'meniscal tear 形成 one-way valve→ synovial fluid 进入 cyst→ juxta-articular 囊性扩张；与 popliteal cyst 机制不同。',
    clinical: [
      '膝 lateral（或 medial）关节线旁 swelling',
      '可触及 fluctuant mass，flexion 可能更明显',
      'Pain 与 tear 及 cyst 大小相关',
      '可有关节 effusion 及 mechanical symptoms',
      '须与 soft tissue tumor 鉴别'
    ],
    staging: '无 formal 分期；按 cyst 大小、是否与 tear 连通及 symptom 描述。',
    imagingKeys: [
      ['关节线旁 cyst', 'MRI T2 高信号囊性灶，位于 meniscus 旁，与 tear 相通；lateral joint line 后方常见'],
      ['horizontal cleavage tear', 'meniscus 内水平撕裂线，为 cyst 的 communication channel'],
      ['无 solid component', '无 enhancement mass、无 soft tissue nodularity；区别于 sarcoma']
    ],
    modalities: [
      ['MRI', '显示 cyst、tear 连通及 exclude mass；诊断首选'],
      ['超声', '囊性病变 realtime 评估、 aspiration 引导；见 meniscal 旁 anechoic 区'],
      ['X线', '通常正常；排除 calcified mass 及 OA']
    ],
    mgmt: [
      'symptomatic：arthroscopic partial meniscectomy + cyst decompression',
      'asymptomatic small cyst：观察',
      'aspiration  alone 复发率高',
      '治疗 underlying tear 为关键']
    ,
    ddx: ['Popliteal/Baker cyst：posterior、与 gastroc-semim 裂隙相关', 'Soft tissue sarcoma：solid、enhancing', 'Ganglion cyst：无 meniscal tear 连通'],
    pitfalls: ['勿误诊为 tumor 行广泛切除', 'aspiration  without 治疗 tear 必复发', 'CT  alone 难以显示 tear 连通'],
    pearls: ['Cyst+horizontal tear= 典型组合', 'Arthroscopy 同时处理 tear 与 cyst', 'MRI 为诊断金标准']
  },
  'discoid-meniscus': {
    overview:
      '盘状半月板（discoid meniscus）是半月板形态异常（complete/incomplete），亚洲儿童 lateral 多见，可 snap、pain 或 tear，Wrisberg 型无 posterior attachment 易 instability。',
    epi: '亚洲儿童 incidence 较高（~3% lateral）；often incidental；symptomatic 者 10–20 岁； bilateral 约 20%。',
    pathophys:
      'embryologic 发育异常→ meniscus 呈 discoid 增厚 extended coverage； abnormal collagen→ tear risk；Wrisberg 型缺 posterior horn attachment→ hypermobility。',
    clinical: [
      'Snapping knee（“弹响膝”）或 clunk',
      'Lateral joint line pain 及 swelling',
      'Hypermobility 感或 giving way',
      '可 asymptomatic 至 adolescence',
      'Wrisberg 型更易 locking 及 sudden pain'
    ],
    staging: 'Watanabe 分型：complete、incomplete、Wrisberg（无 posterior attachment）；按 stability 及 tear 分级。',
    imagingKeys: [
      [' thickened discoid 形态', 'MRI 见 lateral meniscus 增宽增厚，覆盖 tibial plateau 过多；3 个或以上 sagittal 连续层面“bowtie sign”'],
      ['complete vs incomplete', 'Complete 完全覆盖 plateau；incomplete 部分覆盖但仍增厚'],
      ['tear 及 cyst', '伴 horizontal/oblique tear 或 meniscal cyst；Wrisberg 型见 posterior horn 无 tibial attachment']
    ],
    modalities: [
      ['MRI', '形态评估、分型及 tear 检测；诊断标准方法'],
      ['X线', '间接征：lateral tibial plateau 变平、cap sign；非确诊'],
      ['Arthroscopy', '确诊及 treatment；gold standard for morphology']
    ],
    mgmt: [
      'Asymptomatic：观察',
      'Symptomatic stable：partial saucerization 保留 rim',
      'Wrisberg 型：saucerization + stabilization（repair posterior horn）',
      'Torn discoid：partial meniscectomy + saucerization']
    ,
    ddx: ['Normal meniscus tear：无 discoid morphology', 'Plicae syndrome：medial snapping', 'Loose body：intrarticular fragment'],
    pitfalls: ['单层面 thick meniscus 不足以诊断', '忽视 Wrisberg 型 attachment 异常', 'total meniscectomy 导致 early OA'],
    pearls: ['≥3 层面 bowtie= discoid 提示', 'Wrisberg 型须 stabilization', 'Saucerization 优于 total resection']
  },
  'acl-ganglion': {
    overview:
      'ACL 腱鞘囊肿（ACL ganglion cyst）是沿 ACL 纤维或 intercruciate notch 的 mucinous cyst，可致 notch 占用、flexion 痛或 mimic ACL tear symptoms。',
    epi: '20–40 岁；无 gender 偏好；可 incidental；与 prior trauma 或 mucoid degeneration 相关； bilateral 少见。',
    pathophys:
      'ACL mucoid degeneration 或 synovial herniation→ ganglion 沿 ligament 长轴形成；可 multiloculated，压迫 fat pad 或 notch。',
    clinical: [
      'Anterior knee pain，尤其 deep flexion',
      '可及 deep mass 或 fullness',
      'Mechanical block 罕见但可能',
      '通常 ACL stability 正常（Lachman negative）',
      '与 ACL tear symptoms 部分重叠'
    ],
    staging: '无分期；按 cyst 大小、location（ACL 内 vs notch）及 symptom 描述。',
    imagingKeys: [
      ['ACL 内/旁 T2 高信号', 'MRI 见沿 ACL 纤维走行的 multiloculated T2 hyperintense cyst，ACL fibers 可 spread apart（“celery stalk sign”）'],
      ['notch 占用', 'intercondylar notch 内 mass effect；可能影响 graft placement（revision 场景）'],
      ['ACL  continuity 保留', '与 complete tear 不同， fibers 连续但 mucoid 变；Lachman 临床稳定']
    ],
    modalities: [
      ['MRI', '诊断首选；显示 cyst 与 ACL 关系及 exclude tear'],
      ['X线', '通常正常；notch 间接 narrowing 非特异'],
      ['Arthroscopy', 'direct visualization；treatment 同时确认']
    ],
    mgmt: [
      'Symptomatic：arthroscopic cyst decompression + ACL debridement',
      'Asymptomatic incidental：观察',
      'Open excision  rarely needed',
      'Exclude associated intra-articular pathology']
    ,
    ddx: ['ACL tear：discontinuity、 instability', 'Notch fibroma/ synovial chondromatosis', 'Pigmented villonodular synovitis'],
    pitfalls: ['Mucoid ACL degeneration 与 tear 混淆', '忽视 multiloculated cyst 在 revision ACL 中', 'clinical stability 勿忽视 MRI 异常'],
    pearls: ['Celery stalk sign= mucoid ACL/ganglion', 'Stable knee + ACL cyst= 典型组合', 'Arthroscopic decompression 效果良好']
  },
  slap: {
    overview:
      'SLAP 损伤（superior labrum anterior to posterior tear）是 glenoid 上盂唇及 biceps anchor 撕裂，常见于 overhead athlete 及 fall on outstretched arm，分型决定治疗。',
    epi: '20–40 岁；overhead athlete（baseball、swimming）；亦见于 acute trauma（fall on arm）；type II 最常见。',
    pathophys:
      'Superior labrum + biceps anchor 受 shear/peel 力→ tear；type II 为 anchor 剥离；degenerative superior labrum 与 age 相关。',
    clinical: [
      'Deep shoulder pain，overhead activity 加重',
      'Clicking、 catching 或 instability sensation',
      'O’Brien test、 crank test 可 positive',
      'Biceps tenderness 及 speed test 可能 positive',
      '须与 rotator cuff tear 及 biceps tendinopathy 鉴别'
    ],
    staging: 'Snyder SLAP I–IV；扩展 V–VII（clockwise peel、extension 等）；MRA 或 arthroscopy 确认分型。',
    imagingKeys: [
      ['上盂唇 tear', 'MRI/MRA 见 superior labrum 2–10 点区 tear；fluid cleft 进入 labrum-biceps anchor'],
      ['paralabral cyst', 'spinoglenoid notch 或 suprascapular notch cyst 提示 labral tear（后上唇）'],
      ['biceps anchor 剥离', 'Type II：biceps anchor 与 supraglenoid tubercle 间 high signal；MRA 显示 contrast undermining']
    ],
    modalities: [
      ['MRA', 'SLAP 检测 sensitivity 高于 plain MRI；contrast 显示 undermining tear'],
      ['MRI', '3T 高分辨率 labral 评估；ABER 位增加 anterior labrum 显示'],
      ['Arthroscopy', '分型 gold standard；direct probe test']
    ],
    mgmt: [
      'Type I degenerative：debridement alone',
      'Type II acute：anchor repair（suture anchor to supraglenoid tubercle）',
      'Type IV 含 bucket-handle：repair 或 resect handle + biceps tenodesis',
      'Failed repair 或 biceps symptoms：biceps tenodesis/tenotomy']
    ,
    ddx: ['Normal superior labrum variant：sublabral foramen、Buford complex', 'Rotator cuff tear：supraspinatus/infraspinatus', 'Biceps tendinopathy alone'],
    pitfalls: ['Sublabral recess 误为 SLAP', 'Buford complex（cord-like MGHL）勿 repair', 'Age>40 degenerative superior labrum 慎判 SLAP'],
    pearls: ['MRA 提高 SLAP 检出', 'Type II= anchor peel 需 repair', 'Paralabral cyst 提示 labral tear']
  },
  'ac-joint': {
    overview:
      '肩锁关节（AC joint）病变包括 OA、separations（Rockwood）及 distal clavicle osteolysis，表现为 anterior shoulder pain，overhead 及 cross-body adduction 痛典型。',
    epi: 'AC OA：middle-aged manual laborer；separation：contact sport、fall on shoulder；osteolysis：weightlifter、post-trauma。',
    pathophys:
      'AC joint 为 planar diarthrodial joint；OA 致 joint space narrowing 及 osteophyte；separation 为 CC/AC ligament injury；osteolysis 为 distal clavicle resorption。',
    clinical: [
      'Anterior/superior shoulder pain',
      'Cross-body adduction 及 AC 直接压痛',
      'Separation：step-off deformity 及 trauma history',
      'Weightlifter osteolysis：insidious pain post overload',
      'Neer/Hawkins 阴性有助于与 impingement 区分'
    ],
    staging: 'Rockwood I–VI（AC separation）；AC OA 按 Kellgren；osteolysis 按 resorption 程度。',
    imagingKeys: [
      ['joint space narrowing 及 osteophyte', 'Zanca view 见 AC joint 变窄、sclerosis、inferior/superior osteophyte（OA）'],
      ['CC distance增宽', 'Rockwood III+：coracoclavicular distance 较对侧增宽>25%；提示 CC ligament rupture'],
      ['distal clavicle resorption', 'Osteolysis：distal clavicle皮质 erosive change 及 widening；无 infection 征']
    ],
    modalities: [
      ['X线', 'Zanca 15° cephalic tilt 评估 AC joint；stress view 测 CC distance'],
      ['MRI', 'ligament injury、osteolysis marrow edema 及 exclude other pathology'],
      ['CT', '复杂 fracture-dislocation 及 pre-op planning（rare）']
    ],
    mgmt: [
      'AC OA/ mild separation：activity mod、injection、physical therapy',
      'Rockwood III+ symptomatic：CC ligament reconstruction + AC stabilization',
      'Distal clavicle osteolysis：rest、NSAID； refractory 者 distal clavicle excision（Mumford）',
      'End-stage OA：resection arthroplasty']
    ,
    ddx: ['Glenohumeral OA：global shoulder 痛、GH joint 变窄', 'Rotator cuff tear：weakness、night pain', 'Adhesive capsulitis：global ROM loss'],
    pitfalls: ['标准 AP 位 AC joint 重叠显示不清', 'Zanca view 为 AC 专用', 'Osteolysis 勿误为 metastasis/infection'],
    pearls: ['Cross-body adduction pain= AC 定位', 'Zanca view 必用', 'CC distance 增宽= significant separation']
  },
  'glenohumeral-oa': {
    overview:
      '盂肱关节骨关节炎（glenohumeral OA）以 joint space narrowing、humeral head flattening 及 osteophyte 为特征，分 primary 与 post-traumatic/cuff tear arthropathy 等 secondary 类型。',
    epi: 'Primary GH OA 少于 hip/knee；>60 岁；post-traumatic 及 chronic instability 后；cuff tear arthropathy 为 massive RCT 特殊类型。',
    pathophys:
      'Cartilage loss→ joint space narrowing→ osteophyte（especially inferior head “goats beard”）→ subchondral sclerosis；cuff tear arthropathy 加 superior migration 及 acetabularization。',
    clinical: [
      'Global shoulder pain 及 stiffness',
      'ROM 下降，external rotation 常早期受限',
      'Crepitus 及 night pain',
      'Cuff tear arthropathy：weakness + superior migration',
      'Functional loss：overhead activity、 dressing 困难'
    ],
    staging: 'Samilson-Prieto（osteophyte）；Tönnis；cuff tear arthropathy 用 Hamada classification I–V。',
    imagingKeys: [
      ['joint space narrowing', 'True AP/grasp 位见 GH joint space 不对称变窄；优先 weight-bearing 或 stress 位'],
      ['humeral head flattening 及 osteophyte', 'Head 变平、subchondral sclerosis；inferior osteophyte（goats beard）'],
      ['glenoid wear pattern', 'Posterior wear（instability OA）或 medialized wear（cuff tear arthropathy + superior migration）']
    ],
    modalities: [
      ['X线', 'True AP、axillary、scapular Y 评估 joint space、osteophyte 及 wear pattern'],
      ['CT', 'glenoid bone stock 及 version 评估（reverse TSA planning）'],
      ['MRI', 'rotator cuff status、labrum 及 exclude AVN/ tumor']
    ],
    mgmt: [
      'Early：PT、NSAID、injection',
      'Cuff intact：anatomic TSA',
      'Massive irreparable cuff + OA：reverse TSA',
      'Young post-traumatic：consider arthroscopy/debridement 或 delay arthroplasty']
    ,
    ddx: ['Cuff tear alone：preserved joint space', 'CPPD：chondrocalcinosis', 'Neuropathic arthropathy：rare in shoulder'],
    pitfalls: ['Standard AP 非 true AP 误判 joint space', '忽视 cuff status 影响 prosthesis 选择', 'Axillary view 对 posterior dislocation/ wear 关键'],
    pearls: ['True AP+axillary= GH OA 基础', 'Hamada 分级指导 cuff tear arthropathy', 'Reverse TSA 用于 cuff-deficient OA']
  },
  'elbow-oa': {
    overview:
      '肘关节骨关节炎（elbow OA）相对少见，多为 post-traumatic 或 manual labor 相关，以 osteophyte、joint space narrowing 及 loose body 为特征，常限制 extension。',
    epi: 'Middle-aged male manual worker；post-fracture（especially intra-articular）；primary primary 少见；throwing athlete 有 osteophyte 但 cartilage 可保留。',
    pathophys:
      'Prior trauma 或 repetitive load→ cartilage wear→ marginal osteophyte（olecranon、coronoid、capitulum）→ loose body→ mechanical block 及 synovitis。',
    clinical: [
      'Mechanical block：loss of terminal extension',
      'Locking、 catching 及 effusion',
      'Activity-related pain，rest 缓解',
      'Usually well-preserved flexion',
      'Prior fracture 或 instability history 常见'
    ],
    staging: 'Broberg-Morrey radiographic grade 0–III；按 joint space、osteophyte 及 subchondral change。',
    imagingKeys: [
      ['marginal osteophyte', 'X 线见 olecranon tip、coronoid 及 trochlea/capitulum 骨赘；often prominent before severe narrowing'],
      ['joint space narrowing', 'Medial compartment 常先受累；AP/lateral 评估 asymmetric narrowing'],
      ['loose body', 'Joint 内 ossific/calcific body；CT 敏感；与 mechanical symptoms 相关']
    ],
    modalities: [
      ['X线', 'AP/lateral 评估 osteophyte、joint space 及 loose body'],
      ['CT', 'loose body 定位、 osteophyte 三维及 pre-arthroplasty planning'],
      ['MRI', 'early cartilage loss、 synovitis 及 UCL/ LCL 状态']
    ],
    mgmt: [
      'Early mechanical symptoms：arthroscopic debridement + loose body removal',
      'Activity modification 及 NSAID',
      'End-stage：total elbow arthroplasty（low demand）或 interposition arthroplasty',
      'Avoid open osteophyte excision alone without addressing underlying OA']
    ,
    ddx: ['Primary OA other joints：multi-joint pattern', 'CPPD：chondrocalcinosis', 'Hemophilic arthropathy：history'],
    pitfalls: ['Throwing athlete osteophyte 非 always OA', 'Loose body 可仅 CT 可见', 'TEA 禁忌 high-demand patient'],
    pearls: ['Terminal extension loss= elbow OA 早期 sign', 'Arthroscopic debridement 适合 mechanical block', 'Post-traumatic 为最常见 etiology']
  },
  'radioulnar-synostosis': {
    overview:
      '桡尺骨骨性连接（radioulnar synostosis）是 proximal 或 central radius-ulna 骨桥形成，限制 forearm rotation，可为 congenital 或 post-traumatic（Monteggia 等）。',
    epi: 'Congenital： bilateral 50%、常 familial；post-traumatic：Monteggia fracture 固定不当、burn contracture；male 略多。',
    pathophys:
      'Embryologic failure of segmentation 或 trauma/surgery 后 bone cross union→ synostosis bar→ pronation/supination 丧失；type I proximal 最常见。',
    clinical: [
      'Forearm rotation 受限（pronation/supination）',
      'Congenital：often bilateral、childhood 发现',
      'Post-traumatic：fracture/fixation history',
      'Compensatory shoulder/wrist motion 增加',
      'Functional impact 取决于 fusion level 及 unilateral vs bilateral']
    ,
    staging: 'Cleary-Omar 分型 I–IV（按 fusion 位置：proximal、middle、distal）；congenital vs acquired。',
    imagingKeys: [
      ['radius-ulna 骨桥', 'X 线/CT 见桡尺骨间 osseous bridge，多位于 proximal third； marrow continuity 穿过 bridge'],
      ['rotation 失配', 'CT 3D 显示 fusion 长度及 level；forearm 固定于 pronation 或 neutral 位'],
      ['associated anomaly', 'Congenital：radial head dislocation、Madura 五联征（ knee dislocation、clinodactyly 等）']
    ],
    modalities: [
      ['X线', 'AP/lateral 显示 synostosis 部位及 radial head 位置'],
      ['CT', '骨桥范围、3D 评估及 pre-operative planning'],
      ['MRI', 'early fibrous synostosis（pre-osseous）；评估 adjacent soft tissue']
    ],
    mgmt: [
      'Asymptomatic mild：observation + adaptation',
      'Significant functional deficit：excision + interposition（free fat/muscle）',
      'Timing：congenital 延迟至 skeletal maturity；post-traumatic 待 fracture healing',
      'Recurrence risk 高，expectations 须 realistic']
    ,
    ddx: ['Radioulnar coalition vs cross-union：history 区分', 'Isolated radial head dislocation', 'Forearm malunion without synostosis'],
    pitfalls: ['Early fibrous union MRI 易漏 CT 细节', 'Excision recurrence 率高', '忽视 associated congenital anomalies'],
    pearls: ['Proximal synostosis= 最常见', 'CT 3D 规划 excision', 'Bilateral congenital 查 family history']
  },
  madelung: {
    overview:
      'Madelung 畸形是 distal radius  growth disturbance 导致 radial inclination 增大、volat tilt 异常及 ulnar head dorsal subluxation，常与 Leri-Weill dyschondrosteosis 相关。',
    epi: 'Adolescent female； bilateral 50–60%；Leri-Weill 可伴 SHOX mutation；presentation 12–14 岁 growth spurt。',
    pathophys:
      'Volar-ulnar physis growth arrest 或 asymmetric growth→ distal radius volar tilt 增加、radial inclination 增大→ carpal slip 及 ulnar positive variance；Vickers ligament 可能参与。',
    clinical: [
      'Wrist deformity：anterior radial bowing、ulnar head prominent dorsally',
      'Decreased wrist extension 及 grip strength',
      'Ulnar-side wrist pain（ulnar impaction）',
      'Limited pronation/supination  secondary',
      'Short stature 及 mesomelic shortening（Leri-Weill）']
    ,
    staging: '按 skeletal maturity、 ulnar variance 及 OA 程度；Vickers ligament 存在与否。',
    imagingKeys: [
      ['distal radius 形态异常', 'X 线/CT 见 radial inclination 增大、 excessive volar tilt、 anterior bowing；epiphysis 相对 ulna 向 ulnar-volar 移位'],
      ['ulnar positive variance', 'Ulnar head dorsal subluxation；ulna 相对 radius 延长导致 ulnar impaction'],
      ['Vickers ligament（MRI）', 'Volar-ulnar radius 至 lunate/triquetrum 纤维带；可能加重 growth disturbance']
    ],
    modalities: [
      ['X线', 'PA/lateral 测量 radial inclination、 volar tilt、 ulnar variance'],
      ['MRI', 'Vickers ligament、 physeal bar 及 cartilage injury'],
      ['CT', 'Pre-operative osteotomy 三维规划']
    ],
    mgmt: [
      'Mild asymptomatic：observation',
      'Physeal bar 未闭合：bar resection + fat interposition',
      'Skeletal maturity：radial corrective osteotomy ± ulnar shortening',
      'Advanced ulnar impaction：wafer resection 或 ulnar shortening osteotomy']
    ,
    ddx: ['Traumatic malunion：history 区分', 'Rickets/ metabolic： bilateral 但 pattern 不同', 'Turner syndrome：similar SHOX 相关'],
    pitfalls: ['Single view 低估 volar tilt', '忽视 SHOX testing（Leri-Weill）', 'Premature surgery before maturity'],
    pearls: ['Adolescent female + bilateral= 查 Madelung', 'Ulnar positive variance= impaction 根源', 'Radial osteotomy 为核心矫形']
  },
  kienbock: {
    overview:
      'Kienböck 病（lunatum osteonecrosis）是 lunate AVN，导致 fragmentation、collapse 及 carpal collapse（SNAC wrist），与 ulnar variance 及 trauma 相关。',
    epi: '20–40 岁 manual laborer；male 为主；ulnar minus variance 风险 factor； bilateral 少见。',
    pathophys:
      'Lunate 血供单一/ vulnerable→ ischemia→ necrosis→ fracture、fragmentation→ lunate collapse→ carpal height loss 及 SNAC pattern OA。',
    clinical: [
      'Dorsal wrist pain，activity 加重',
      'Decreased grip strength 及 stiffness',
      'Central wrist tenderness over lunate',
      'Progressive clunk 或 collapse 后 deformity',
      'Ulnar variance 评估（negative 更 common）']
    ,
    staging: 'Lichtman I–IV（I sclerosis→II fracture→III collapse→IV SNAC）；MRI 可 early detect pre-radiographic。',
    imagingKeys: [
      ['lunate sclerosis/ fragmentation', 'X 线见 lunate 密度增高、 fracture line 或 fragmentation；III 期 collapse 变短'],
      ['lunate collapse 及 SNAC', 'Carpal height index 下降；capitate 向 proximal migration；III/IV 期 scaphoid rotation 及 OA'],
      ['MRI T1 低信号', 'Early：lunate diffuse/low signal T1、STIR edema；progressive low signal 无 enhancement= necrosis']
    ],
    modalities: [
      ['MRI', 'Early diagnosis（pre-X-ray）；评估 viability 及 marrow status'],
      ['X线', 'Lichtman staging；PA/lateral 及 clenched fist view 评估 scaphoid ring'],
      ['CT', 'Fragmentation 细节及 pre-operative planning']
    ],
    mgmt: [
      'I–IIa ulnar minus：joint leveling（radial shortening 或 ulnar lengthening）',
      'IIb–III：revascularization（vascularized bone graft）± leveling',
      'IV SNAC：proximal row carpectomy 或 partial/ total wrist fusion',
      'Symptomatic interim：immobilization、NSAID']
    ,
    ddx: ['Preiser（scaphoid ON）', 'Lunate fracture：acute trauma、localized', 'CPPD：chondrocalcinosis in lunate'],
    pitfalls: ['Early X 线 normal 延误诊断', '忽视 ulnar variance 影响 treatment 选择', 'Confuse with Keinbock vs lunate stress injury'],
    pearls: ['Ulnar minus= 重要 risk factor', 'MRI 早于 X 线发现 AVN', 'Lichtman III+ 常需 salvage procedure']
  },
  preiser: {
    overview:
      'Preiser 病是 scaphoid osteonecrosis（idiopathic AVN），罕见，表现为 snuffbox 区 chronic pain，progressive collapse 及 SNAC/SNAC wrist 风险。',
    epi: '30–50 岁；无 clear trauma；male 略多；比 Kienböck 更 rare；predisposing factors 包括 steroid、SLE（secondary 型）。',
    pathophys:
      'Scaphoid retrograde blood supply vulnerable→ proximal pole AVN→ sclerosis、fracture、collapse→ carpal malalignment 及 secondary OA。',
    clinical: [
      'Radial snuffbox chronic pain',
      'Grip weakness 及 wrist stiffness',
      'Usually no acute fracture history（idiopathic）',
      'Progressive collapse 后 wrist deformity',
      'Secondary 型：steroid/autoimmune history']
    ,
    staging: 'Herbert + Lanzetta 或 modified Lichtman-like：I sclerosis→II fragmentation→III collapse→IV carpal OA。',
    imagingKeys: [
      ['scaphoid proximal pole AVN', 'X 线/MRI 见 scaphoid 近极 sclerosis、 fragmentation；区别于 acute fracture nonunion'],
      ['T1 弥漫低信号', 'MRI proximal pole low T1、 variable STIR；无 enhancement= necrotic；early edema 可 present'],
      ['collapse 及 SNAC pattern', 'Scaphoid height loss、humpback deformity；capitate migration 及 midcarpal OA']
    ],
    modalities: [
      ['MRI', 'Early AVN detection；differentiate from occult fracture'],
      ['X线', 'Sclerosis、 fragmentation、 collapse 及 SNAC 评估'],
      ['CT', 'Fragmentation 及 arthroplasty/fusion planning']
    ],
    mgmt: [
      'Early：immobilization、 revascularization（vascularized graft to proximal pole）',
      'Collapse：proximal row carpectomy 或 scaphoid excision + four-corner fusion',
      'End-stage SNAC：partial/total wrist fusion 或 arthroplasty',
      'Treat secondary cause（steroid reduction 等）']
    ,
    ddx: ['Scaphoid fracture nonunion：trauma history、linear fracture', 'Kienböck（lunate）', 'Scaphoid stress reaction：reversible edema'],
    pitfalls: ['误作 scaphoid fracture 仅 immobilize 不足', 'Small avascular proximal pole 在 MRI 需仔细', 'Secondary vs idiopathic workup 不同'],
    pearls: ['Proximal pole AVN= Preiser 定位', 'MRI 关键 early tool', 'Revascularization 仅 early collapse 前有效']
  },
  'loose-body-knee': {
    overview:
      '膝关节游离体（loose body）是关节内 detached ossified/cartilaginous fragment，源于 OCD、synovial chondromatosis、OA 或 trauma，可致 locking 及 rapid cartilage wear。',
    epi: 'Any age；OCD 于 adolescent；primary synovial chondromatosis 30–50 岁；OA loose body 于 elderly；size 从 few mm 至 large body。',
    pathophys:
      'Cartilage/bone fragment detachment→ intra-articular mobile body→ mechanical erosion of cartilage、 synovitis 及 secondary OA；synovial chondromatosis 为 metaplastic nodules detachment。',
    clinical: [
      'Intermittent locking、 catching 或 giving way',
      'Effusion 及 activity-related pain',
      'Sometimes palpable mobile mass（medial/lateral gutter）',
      'History of OCD、OA 或 synovial chondromatosis',
      'Acute locked knee 需 urgent 评估']
    ,
    staging: '按 etiology 分期（OCD Berndt-Harty、 synovial chondromatosis Milgram I–III）；按 number 及 size 描述。',
    imagingKeys: [
      ['joint 内 ossific body', 'X 线/CT 见关节腔内 round/oval calcified/ossified body；location 可变（suprapatellar、 notch、gutter）'],
      ['donor site defect', 'OCD：MFC lateral aspect defect；OA：marginal osteophyte break-off'],
      ['multiple bodies', 'Synovial chondromatosis：数十枚 similar size bodies；secondary OA 常 fewer、 larger irregular bodies']
    ],
    modalities: [
      ['X线', 'Radiopaque body 筛查；tunnel view 找 donor site'],
      ['CT', 'Body 数目、 size、 location 及 pre-op mapping；敏感于 calcified body'],
      ['MRI', 'Non-calcified cartilaginous body、 donor site cartilage 及 associated pathology']
    ],
    mgmt: [
      'Symptomatic：arthroscopic removal（minimum invasive）',
      'Treat primary cause（OCD fixation、 synovectomy for chondromatosis）',
      'Multiple bodies： thorough arthroscopic hunt all compartments',
      'Associated OA：debridement ± definitive arthroplasty if end-stage']
    ,
    ddx: ['Fabella 或 sesamoid：fixed location、not intra-articular mobile', 'Chip fracture：acute、trauma', 'Pigmented villonodular synovitis：soft tissue mass'],
    pitfalls: ['Pure cartilaginous body X 线 negative', 'Multiple compartments 须 systematic arthroscopy', 'Miss donor site 导致 recurrence'],
    pearls: ['CT 计数 calcified bodies', 'Arthroscopy 同时处理 etiology', 'Locking= 手术 indication']
  },
  osgood: {
    overview:
      'Osgood-Schlatter 病是 tibial tuberosity apophysitis，见于 skeletal immature athlete，表现为 anterior knee pain 及 tibial tubercle tenderness/swelling。',
    epi: '10–15 岁；male>female；running/jumping sports；bilateral 20–30%；self-limited with skeletal maturity。',
    pathophys:
      'Repetitive quadriceps traction→ tibial tuberosity apophysis microtrauma→ inflammation、 fragmentation 及 heterotopic bone；与 rapid growth 相关。',
    clinical: [
      'Anterior knee pain，activity 加重（jump/run/climb stairs）',
      'Tibial tubercle tenderness 及 swelling',
      'Quadriceps tightness；pain with resisted extension',
      '通常无 effusion 或 instability',
      'Skeletal immaturity 必具']
    ,
    staging: 'Clinical/radiographic：active apophysitis vs healed ossicle；无 universal 分级。',
    imagingKeys: [
      ['tibial tuberosity fragmentation', 'X 线/lateral 见 tibial tubercle 不规则、 multiple ossification centers 或 separation；soft tissue swelling anterior'],
      ['patellar tendon thickening', 'MRI STIR 见 patellar tendon tibial attachment 及 tuberosity edema；无 intra-articular pathology'],
      [' healed ossicle', 'Mature：persistent ossicle 可 symptomatic；donut-shaped fragment 位于 tendon insertion']
    ],
    modalities: [
      ['X线', 'Lateral 评估 tuberosity fragmentation；usually sufficient'],
      ['MRI', 'Exclude other pathology；显示 edema extent（rarely needed）'],
      ['Ultrasound', 'Tendon thickening 及 neo-vascularization（research/selective）']
    ],
    mgmt: [
      'Activity modification（relative rest，avoid pain-provoking sports）',
      'Ice、NSAID 及 quadriceps/hamstring stretching',
      'Skeletal maturity 后 vast majority resolve',
      'Refractory symptomatic ossicle：surgical excision（rare）']
    ,
    ddx: ['Sinding-Larsen-Johansson：inferior patella pole', 'Patellar tendon tear：acute、trauma', 'Infection：fever、systemic signs'],
    pitfalls: ['Over-imaging 通常 unnecessary', 'Complete activity stop 非必须（relative rest）', 'Adult new onset 须 exclude other diagnosis'],
    pearls: ['Clinical diagnosis 为主', 'Self-limited with maturity', 'Tibial tubercle point tenderness pathognomonic']
  },
  sinding: {
    overview:
      'Sinding-Larsen-Johansson 病（SLJ）是 inferior patella pole apophysitis，与 Osgood-Schlatter  analogous 但位于 patellar 下端，见于 adolescent jumper/runner。',
    epi: '10–14 岁；male 略多；jumping/kicking sports； bilateral 可能；resolves with maturity。',
    pathophys:
      'Repetitive patellar tendon traction on inferior patella apophysis→ inflammation、 fragmentation 及 calcification at inferior pole。',
    clinical: [
      'Inferior patella/anterior knee pain，jump/kick 加重',
      'Inferior patella pole tenderness',
      'Pain with kneeling 及 resisted extension',
      'Local swelling at inferior pole',
      'No significant joint effusion']
    ,
    staging: 'Clinical active vs healed calcification；无 formal radiographic stage。',
    imagingKeys: [
      ['inferior patella pole fragmentation', 'Lateral X 线见 patella 下极 irregularity、 fragmentation 或 calcification；对应 SLJ 部位'],
      ['patellar tendon proximal edema', 'MRI STIR 见 inferior pole 及 proximal patellar tendon edema；区别于 jumper\'s knee（adult tendinopathy）'],
      ['persistent calcification', 'Healed phase：inferior pole calcific fragment 可残留；symptomatic 若 irritates tendon']
    ],
    modalities: [
      ['X线', 'Lateral knee 显示 inferior pole change；first-line'],
      ['MRI', 'Edema pattern 及 exclude stress fracture/OCD'],
      ['Ultrasound', 'Tendon thickening at inferior pole attachment']
    ],
    mgmt: [
      'Relative rest 及 activity modification',
      'Ice、NSAID 及 stretching/strengthening program',
      'Knee pad for kneeling activities',
      'Rare：excision symptomatic calcific fragment post-maturity']
    ,
    ddx: ['Osgood-Schlatter：tibial tuberosity', 'Jumper\'s knee（patellar tendinopathy）：adult、no apophysis', 'Inferior patella stress fracture'],
    pitfalls: ['Confuse with patellar tendinopathy in adult', 'Aggressive imaging 通常不需要', 'Bilateral 仍 supports apophysitis'],
    pearls: ['Inferior patella pole= SLJ 定位', 'Apophysitis 只见于 skeletally immature', 'Conservative management 为主']
  },
  patellofemoral: {
    overview:
      '髌股关节病（patellofemoral pain syndrome / chondromalacia / PF OA）是 patella-cartilage 或 tracking 异常导致的 anterior knee pain，从 adolescent overuse 到 advanced PF OA spectrum。',
    epi: 'PF pain：adolescent/young adult female 常见；PF OA：often post-trauma 或 patellar instability； obesity 为 risk factor。',
    pathophys:
      'Maltracking、Q-angle 异常或 overload→ patellar cartilage softening/fissuring→ subchondral change；advanced 期 joint space lateral patellar facet narrowing。',
    clinical: [
      'Anterior knee pain，stairs/squat/prolonged sit（movie sign）',
      'Crepitus 无 true locking（unless loose body）',
      'Patellar grind、apprehension 或 J-sign（maltracking）',
      '通常 minimal effusion',
      'TT-TG、 patellar height 及 alignment 评估']
    ,
    staging: 'Outerbridge I–IV（chondral）；Kellgren for PF OA；Merchant/lateral PF joint space 评估。',
    imagingKeys: [
      ['cartilage signal abnormality', 'MRI 见 patellar or trochlear cartilage fissuring、 thinning 或 full-thickness defect；STIR subchondral edema'],
      ['maltracking 征', 'Lateral patellar tilt/ subluxation on axial MRI；TT-TG>20 mm 提示 lateral tracking'],
      ['PF joint space narrowing', 'Skyline/Merchant view 见 patellofemoral compartment 变窄、 osteophyte（OA 期）']
    ],
    modalities: [
      ['MRI', 'Cartilage quantification、 maltracking 及 exclude other pathology'],
      ['X线', 'Skyline/Merchant 评估 PF joint space、 tilt 及 subluxation'],
      ['CT', 'TT-TG、tibial tubercle-trochlear groove 关系；pre-tibial tubercle osteotomy']
    ],
    mgmt: [
      'Physical therapy：quadriceps（VMO） strengthening、 hip abductor',
      'Activity modification 及 patellar taping/bracing',
      'Chondral defect：microfracture、 MACI 或 trochleoplasty（selected）',
      'Maltracking：medial patellofemoral ligament reconstruction ± TTO']
    ,
    ddx: ['Patellar tendinopathy：inferior patella tendon tenderness', 'Meniscal tear：joint line pain、effusion', 'Plica syndrome：medial synovial fold'],
    pitfalls: ['Axial MRI 切层角度不当误判 tilt', 'PF pain 非 always chondromalacia on MRI', '忽视 hip/core weakness'],
    pearls: ['Movie sign= classic PF pain', 'TT-TG 评估 maltracking', 'PT 为 first-line 治疗']
  },
  'hip-labral': {
    overview:
      '髋盂唇损伤（hip labral tear）常伴 FAI 或 dysplasia，表现为 groin pain、clicking 及 limited ROM，MRI arthrography 或 direct arthroscopy 为诊断关键。',
    epi: '20–40 岁 active adult；FAI 或 dysplasia 背景；female 略多；also post-traumatic；often delayed diagnosis（avg years）。',
    pathophys:
      'FAI cam/pincer 或 hip hypermobility→ labrum repetitive shear→ tear（ anterior/superior 常见）； dysplasia→ edge loading 及 labral degeneration。',
    clinical: [
      'Groin pain（C-sign）',
      'Clicking、 catching 或 giving way',
      'Limited flexion+internal rotation',
      'Positive impingement test（FADIR）',
      'Night pain 及 sitting discomfort']
    ,
    staging: '按 tear location（ anterior 1–3 o\'clock 常见）、morphology（radial/longitudinal/flap）及 associated FAI/dysplasia；Snyder-like adapted。',
    imagingKeys: [
      ['labral tear', 'MRA 见 labrum 内 contrast cleft 或 undermining tear； anterior/superior 最常见； paralabral cyst 支持'],
      ['cam/pincer morphology', 'Alpha angle>55°（cam）；pincer sign（crossover、posterior wall sign）解释 etiology'],
      ['cartilage injury', 'Acetabular chondral delamination 或 kissing femoral head lesion；影响 prognosis']
    ],
    modalities: [
      ['MRA', 'Hip labral tear 检测 sensitivity 最佳；intra-articular contrast'],
      ['MRI', '3T 无 contrast 可接受；评估 marrow edema 及 paralabral cyst'],
      ['Arthroscopy', 'Diagnostic+therapeutic gold standard；direct visualization 及 probed tear']
    ],
    mgmt: [
      'Conservative：PT、activity mod、injection（selected）',
      'Arthroscopic labral repair（preferred over debridement in reparable tear）',
      'Concurrent FAI osteoplasty（cam/pincer correction）',
      'Dysplasia：may need PAO instead of or in addition to arthroscopy']
    ,
    ddx: ['Groin strain：no intra-articular finding', 'Intra-articular loose body', 'Athletic pubalgia/core injury'],
    pitfalls: ['Plain MRI 假阴性/假阳性率高于 MRA', 'Normal labral variants（sub labral recess）', 'Miss underlying dysplasia 导致 arthroscopy 失败'],
    pearls: ['MRA= labral tear 首选', 'FADIR positive+groin pain 高度 suspicious', 'Repair+cam correction 改善 outcomes']
  }
};

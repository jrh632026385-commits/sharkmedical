/** 关节与脊柱 15 条 · 富文本扩展 */
export default {
  spondylolysis: {
    overview:
      '椎弓峡部裂（spondylolysis）为椎弓峡部骨性缺损，多见于 L5，常因重复性伸展应力导致应力性骨折或先天性峡部发育薄弱；青少年运动员及芭蕾舞者高发，可进展为滑脱。',
    epi: '10–20 岁青少年及年轻运动员最常见；L5 占 85–95%，L4 次之；芭蕾舞、体操、美式橄榄球等重复伸展运动人群风险增高；双侧峡部裂较单侧更易滑脱。',
    pathophys:
      '重复微损伤或先天性峡部发育薄弱→应力性骨折或纤维连接→峡部连续性中断；单侧可代偿，双侧则失去后方张力带，易进展为 spondylolisthesis；峡部缺损处可见纤维组织或假关节形成。',
    clinical: [
      '下腰痛，伸展及旋转活动加重',
      '单侧或双侧椎旁压痛，L5 水平明显',
      'Hamstring 紧张及步态异常（进展性滑脱时）',
      '青少年运动员隐匿性腰痛，休息可部分缓解',
      '神经根症状少见，除非合并显著滑脱或椎管狭窄'
    ],
    staging: 'Meyerding 分级用于合并滑脱者（I–IV 级）；按单侧/双侧峡部裂及是否进展为滑脱评估。',
    imagingKeys: [
      ['峡部缺损', '斜位 X 线见 pars interarticularis 透亮线或断裂；Scottie dog 征中“项圈”缺失为经典征象'],
      ['SPECT/骨扫描', '急性期峡部代谢活性增高；慢性期可阴性；对隐匿性应力性骨折敏感'],
      ['MRI 骨髓水肿', 'T2/STIR 峡部及邻近椎弓根骨髓水肿提示活动性应力反应；可评估是否合并滑脱及神经压迫']
    ],
    modalities: [
      ['X线', '正侧位+双斜位（45°）评估峡部；Scottie dog 征；合并滑脱时测量 slip percentage'],
      ['MRI', '骨髓水肿、神经根及硬膜囊评估；无辐射，适合青少年反复随访'],
      ['SPECT/CT', '隐匿性峡部裂检出；CT 可三维显示缺损形态及假关节']
    ],
    mgmt: [
      '活动性应力反应：制动、避免伸展运动 3–6 个月',
      '物理治疗：核心稳定、Hamstring 拉伸及渐进性重返运动',
      '顽固疼痛或滑脱进展：峡部融合或内固定',
      '无症状者：观察及运动方式调整，定期影像随访'
    ],
    ddx: ['Pars 应力反应（MRI 水肿但 X 线未断裂）', '椎弓根骨折', 'Spina bifida occulta（神经弓未闭）'],
    pitfalls: ['平片阴性不能排除，斜位及 SPECT/MRI 更敏感', '勿将正常变异（如 limbus vertebra）误判为峡部裂', '须评估是否合并滑脱及双侧受累'],
    pearls: ['Scottie dog 征“项圈”缺失= 峡部裂经典征', '青少年运动员隐匿腰痛应查斜位', 'SPECT 对活动性应力反应最敏感']
  },
  spondylolisthesis: {
    overview:
      '椎体滑脱（spondylolisthesis）指上位椎体相对下位椎体向前或向后移位，按病因分为峡部裂性、退变性、峡部发育不良性及创伤性等；L5–S1 最常见，可致椎管/神经孔狭窄及神经根症状。',
    epi: '峡部裂性：青少年及年轻成人，L5–S1；退变性：>50 岁女性，L4–L5 多见；峡部发育不良性：儿童期起；整体患病率约 4–6%。',
    pathophys:
      '峡部裂性：峡部断裂→失去后方张力带→上位椎体向前滑移；退变性：小关节及椎间盘退变→失稳滑移；滑移加重椎管及神经孔狭窄，可压迫神经根或马尾。',
    clinical: [
      '下腰痛，久坐、站立及伸展加重',
      '神经根症状：L5 或 S1 根性痛、麻木、无力（取决于滑脱节段）',
      'Hamstring 紧张、步态短缩（严重滑脱）',
      '马尾综合征（高级别滑脱罕见但需警惕）',
      '体检：腰椎前凸增加、Pelvic tilt 改变、直腿抬高可阳性'
    ],
    staging: 'Meyerding I–IV 级（<25%、25–50%、50–75%、>75%）；Wiltse-Newman 分型（I 峡部裂性、II 峡部发育不良性、III 退变性、IV 创伤性、V 病理性）。',
    imagingKeys: [
      ['滑移程度', '侧位 X 线测量 slip percentage（Meyerding）；L5–S1 滑移>50% 为高级别，手术指征增加'],
      ['椎管及神经孔狭窄', 'MRI 见硬膜囊受压、神经根池变窄；CT 可量化椎管横截面积及骨性狭窄'],
      ['小关节及椎间盘退变', '退变性滑脱伴小关节骨关节炎、椎间盘高度丢失；峡部裂性者峡部缺损可见']
    ],
    modalities: [
      ['X线', '侧位测量滑移百分比；过伸过屈位评估不稳；正位评估 scoliosis'],
      ['MRI', '神经根及硬膜囊压迫、Modic 改变、小关节积液；术前规划金标准'],
      ['CT', '骨性椎管狭窄、峡部缺损形态、小关节骨赘及术前螺钉规划']
    ],
    mgmt: [
      'I–II 级无症状或轻症：理疗、核心稳定、NSAID',
      '有神经根症状：硬膜外注射、神经阻滞',
      'III–IV 级或进行性神经功能缺损：减压+融合（PLIF/TLIF/ALIF）',
      '儿童/青少年峡部裂性：部分可行峡部修复+固定'
    ],
    ddx: ['退变性滑脱 vs 峡部裂性（峡部是否完整）', '假性滑脱（小关节过度活动）', 'Traumatic 滑脱（急性骨折线）'],
    pitfalls: ['过伸过屈位评估不稳，但辐射剂量需权衡', '高级别滑脱勿漏评马尾症状', '退变性与峡部裂性治疗策略不同'],
    pearls: ['Meyerding 分级侧位测量 slip %', 'MRI 评估神经压迫优于 CT', 'Hamstring 紧张提示高级别滑脱']
  },
  schmorl: {
    overview:
      'Schmorl 结节（椎体终板疝/椎间盘疝入椎体）为髓核经终板薄弱区疝入相邻椎体，形成椎体内陷或硬化结节；多为退变或发育性终板薄弱所致，通常无症状，MRI 上 T1 低/T2 高或硬化边。',
    epi: '广泛存在于一般人群，尸检可见率 50% 以上；青少年 Scheuermann 病常多发；与终板发育薄弱、重复负荷及 Scheuermann 相关；单发或多发均可。',
    pathophys:
      '终板软骨及骨性终板薄弱→髓核在轴向负荷下经裂隙疝入椎体→周围反应性硬化或纤维组织形成；Scheuermann 病者终板不规则及 wedge 形变常伴多发 Schmorl 结节。',
    clinical: [
      '多数无症状，影像偶然发现',
      'Scheuermann 病：青少年背痛、后凸畸形',
      '多发或巨大结节偶伴局部压痛',
      '通常无神经根或脊髓压迫症状',
      '需与感染、肿瘤性溶骨鉴别（临床背景不同）'
    ],
    staging: '无统一临床分期；按单发/多发、是否合并 Scheuermann 或 Modic 改变描述；Scheuermann 按 Sorensen 后凸角度分级。',
    imagingKeys: [
      ['椎体内陷结节', 'X 线/CT 见椎体上下缘圆形或卵圆形凹陷，边缘硬化；侧位最易显示'],
      ['MRI 信号特征', 'T1 低信号、T2 高信号（活跃期）或 T2 低信号（硬化期）；与 Modic 终板改变可并存'],
      ['Scheuermann 伴随征', '终板不规则、椎体 wedge 形变、Schmorl 多发；后凸>45° 为 Scheuermann 诊断标准之一']
    ],
    modalities: [
      ['X线', '侧位见椎体终板凹陷及硬化边；评估 Scheuermann 后凸角度'],
      ['MRI', '结节信号、终板 Modic 改变、是否合并椎间盘突出或脊髓受压'],
      ['CT', '硬化边及凹陷形态；与溶骨性病变鉴别时评估骨皮质完整性']
    ],
    mgmt: [
      '无症状：无需治疗，影像随访即可',
      'Scheuermann 病：理疗、支具（ skeletally immature）、监测后凸进展',
      '合并显著背痛：NSAID、核心稳定训练',
      '极少需手术，除非合并严重后凸或神经压迫'
    ],
    ddx: ['Modic 终板改变（终板层面而非椎体内）', '溶骨性转移/感染（破坏性强、无硬化边）', 'Limbus vertebra（边缘型终板疝）'],
    pitfalls: ['勿将 Schmorl 结节误判为溶骨性病变', 'Scheuermann 需测量后凸角度', '与 Modic 改变位置不同（椎体内 vs 终板）'],
    pearls: ['Schmorl 结节极常见，多为良性', 'Scheuermann 多发 Schmorl+后凸>45°', '硬化边提示良性，溶骨性破坏无硬化边']
  },
  modic: {
    overview:
      'Modic 终板骨髓改变（Modic changes）为椎间盘退变相关的椎体终板及邻近骨髓信号异常，分为 I 型（水肿/炎症）、II 型（脂肪浸润）及 III 型（硬化）；与下腰痛活动度相关，I 型提示更活跃退变过程。',
    epi: '腰椎退变患者常见，MRI 检出率约 20–40%；I 型约 10–15%，II 型最多见；与年龄、椎间盘退变 Pfirrmann 分级正相关；下腰痛患者中 Modic I 型与疼痛相关性更强。',
    pathophys:
      '椎间盘退变→终板微裂及营养通道破坏→骨髓水肿（I 型）、脂肪替代（II 型）或硬化（III 型）；I 型反映炎症/血管化终板裂隙，与机械性下腰痛及 discogenic pain 相关。',
    clinical: [
      '慢性下腰痛，坐位及前倾加重',
      'Modic I 型者疼痛与 MRI 活动性更相关',
      '局部深部压痛，无典型根性放射痛（除非合并椎间盘突出）',
      '晨僵轻至中度，活动后部分缓解',
      '需排除感染、肿瘤及骨折性骨髓水肿'
    ],
    staging: 'Modic I（T1 低/T2 高，水肿/炎症）、Modic II（T1/T2 均高，脂肪）、Modic III（T1/T2 均低，硬化）；按累及终板范围（<25%、25–50%、>50%）描述。',
    imagingKeys: [
      ['Modic I 型', 'T1 低、T2/STIR 高信号，终板及邻近骨髓水肿；提示活动性终板炎症，与 discogenic pain 相关'],
      ['Modic II 型', 'T1 及 T2 均高信号，脂肪浸润；最常见，相对稳定'],
      ['Modic III 型', 'T1/T2 均低信号，终板硬化；反映终末期退变，X 线可见终板硬化']
    ],
    modalities: [
      ['MRI', 'Modic 分型及范围评估金标准；需 T1、T2 及 STIR 序列'],
      ['X线', '终板硬化、间隙狭窄及骨赘；Modic III 与 X 线硬化对应'],
      ['CT', '终板硬化及骨赘形态；术前评估骨质量']
    ],
    mgmt: [
      '保守治疗：NSAID、理疗、核心稳定及姿势训练',
      'Modic I 型 discogenic pain：可考虑硬膜外或 discography 引导治疗',
      '顽固 discogenic pain：椎体间融合或 disc replacement 个体化评估',
      '合并椎间盘突出或狭窄：按神经压迫情况决定减压方案'
    ],
    ddx: ['感染性 discitis/OM（增强明显、临床感染征）', '肿瘤性骨髓浸润', '急性终板骨折骨髓水肿'],
    pitfalls: ['Modic I 与感染鉴别需结合增强及临床', '勿将 Modic 等同于必须手术', 'I 型可随时间转化为 II/III 型'],
    pearls: ['Modic I 与活动性 discogenic pain 相关性最强', 'II 型最常见且相对稳定', '增强 MRI 有助于排除感染']
  },
  'thoracic-disc': {
    overview:
      '胸椎间盘突出（thoracic disc herniation）相对少见，占全部椎间盘突出约 0.25–1%；中央型可致脊髓压迫（脊髓型），侧方型可致神经根症状；T8–T12 略多，常因退变或轻微 trauma 诱发，MRI 为诊断关键。',
    epi: '40–60 岁多见；占椎间盘突出总量<1%；T8–T12 稍多；与 Scheuermann、创伤及重复负荷相关；男性略多；多数为软性突出，少数 calcified 硬突出。',
    pathophys:
      '椎间盘退变或轻微 trauma→后纵韧带薄弱区髓核突出→中央型压迫脊髓（脊髓型），侧方型进入椎管侧方压迫神经根；硬膜与脊髓之间空间小，轻微突出即可致显著脊髓症状。',
    clinical: [
      '中央型：步态不稳、下肢痉挛、感觉平面、括约肌功能障碍（脊髓型）',
      '侧方型：带状胸腹壁放射痛、感觉异常',
      '深部背痛，咳嗽或 valsalva 可加重',
      'Brown-Séquard 综合征（半切型压迫）',
      '进展性脊髓病需紧急评估，不可延误'
    ],
    staging: '按突出位置（中央/侧方/硬膜外）、是否 calcified 及脊髓受压程度（T2 信号、横截面积）分级；无统一 Meyerding 类分级。',
    imagingKeys: [
      ['髓核突出位置', 'MRI 矢状/轴位显示突出位于中央、侧方或硬膜外；中央型与脊髓受压直接相关'],
      ['脊髓受压及信号', 'T2 高信号提示脊髓 edema/myelomalacia；轴位测量脊髓横截面积及 CSF 间隙消失'],
      ['钙化/硬突出', 'CT 见 disc calcification；硬突出与软性突出相比手术难度及复发风险不同']
    ],
    modalities: [
      ['MRI', '突出位置、脊髓受压及信号、硬膜囊形态；诊断及术前规划金标准'],
      ['CT', 'disc calcification、骨性椎管狭窄及术前骨性解剖'],
      ['X线', '侧位见 disc space 变窄、Schmorl 结节；筛查 scoliosis 及整体排列']
    ],
    mgmt: [
      '无症状或轻症：观察、NSAID、理疗',
      '进行性脊髓型：尽早减压手术（后路、前路或侧路）',
      '神经根症状为主：硬膜外注射、选择性神经根阻滞',
      'calcified 硬突出：常需手术切除，微创经皮摘除难度高'
    ],
    ddx: ['脊髓肿瘤/硬膜外转移', '脊髓空洞', 'transverse myelitis（急性，增强模式不同）'],
    pitfalls: ['胸椎 disc 症状隐匿，易延误诊断', '中央型突出即使体积小也可致严重脊髓病', 'calcified disc 术前 CT 必查'],
    pearls: ['MRI 是胸椎 disc 诊断金标准', '进行性脊髓症状= 手术指征', 'calcified 硬突出手术规划需 CT']
  },
  syringomyelia: {
    overview:
      '脊髓空洞症（syringomyelia）为脊髓内充满 CSF 样液体的空洞，可原发或与 Chiari I、肿瘤、创伤、蛛网膜炎相关；空洞扩大可致中央管周围交叉纤维受累，出现分离性感觉障碍及无力，MRI 显示脊髓内 T2 高信号条带。',
    epi: 'Chiari I 相关者占 50% 以上；亦见于 post-traumatic、肿瘤（如 hemangioblastoma）、蛛网膜炎；发病年龄跨度大，Chiari 相关者常青年起病；Von Hippel-Lindau 需排查。',
    pathophys:
      'CSF 动力学异常或脊髓中央管扩张→脊髓内空洞形成；空洞扩大破坏前连合交叉纤维（分离性痛温觉丧失）及前角（肌萎缩）；Chiari 相关者小脑扁桃体下疝致枕大孔 CSF 梗阻为常见机制。',
    clinical: [
      '分离性感觉障碍：痛温觉丧失，触觉保留（披肩样分布）',
      '手肌萎缩、爪形手（前角受累）',
      '颈肩痛、头痛（Chiari 相关）',
      '步态不稳、痉挛（空洞扩大累及侧索）',
      'Scoliosis（Chiari/空洞相关儿童）'
    ],
    staging: '按空洞长度（节段数）、是否 Chiari 相关、脊髓 atrophy 及 T2 信号范围描述；Syntrix 等分类用于 Chiari 相关空洞。',
    imagingKeys: [
      ['脊髓内 T2 高信号空洞', 'MRI 矢状位见脊髓内条形 T2 高信号，可连续或多节段；轴位见圆形或偏心空洞'],
      ['Chiari I 征象', '小脑扁桃体低于枕大孔≥5 mm；常合并 syringomyelia，需同时评估'],
      ['脊髓 atrophy', ' chronic 空洞致脊髓变细、外部轮廓不规则；提示长期压迫及不可逆改变']
    ],
    modalities: [
      ['MRI', '空洞范围、Chiari 畸形、肿瘤及 post-traumatic 改变；诊断金标准'],
      ['CT', '颅颈交界骨性解剖、枕骨大孔及 C1 形态；Chiari 术前规划'],
      ['Cine MRI/CSF flow', '评估枕大孔 CSF 流动梗阻；Chiari 相关空洞术前辅助']
    ],
    mgmt: [
      'Chiari 相关：后颅窝减压±空洞引流/shunting',
      '肿瘤相关：切除肿瘤±空洞减压',
      '无症状小空洞：观察及 MRI 随访',
      '进行性神经功能缺损：手术干预，个体化选择 shunt 或减压'
    ],
    ddx: ['脊髓肿瘤 cyst（增强有壁结节）', 'transverse myelitis', 'cord infarction（急性，DWI 受限）'],
    pitfalls: ['须排查 Chiari、肿瘤及 VHL', '空洞与肿瘤 cyst 增强表现不同', 'post-traumatic 空洞可延迟出现'],
    pearls: ['Chiari I+syringomyelia 常见组合', '分离性感觉障碍为特征性临床线索', 'MRI 全脊髓筛查排除肿瘤']
  },
  chiari: {
    overview:
      'Chiari 畸形为后颅窝发育异常导致小脑组织下疝至枕大孔以下，I 型（扁桃体下疝≥5 mm，常合并 syringomyelia）最常见；II 型合并脊髓脊膜膨出；可致头痛、颈痛、颅神经及脊髓症状，MRI 为诊断标准。',
    epi: 'Chiari I：成人及青少年，女性略多；II 型：新生儿/婴儿伴 myelomeningocele；I 型 prevalence 约 0.1–1%；syringomyelia 合并率 50–70%（I 型）。',
    pathophys:
      '后颅窝容积不足→小脑扁桃体下疝→枕大孔 CSF 流动梗阻→颅内压及脊髓 CSF 动力学异常→syringomyelia、头痛及颅神经受压（如 CN IX/X 致吞咽困难）。',
    clinical: [
      '头痛（咳嗽、valsalva 诱发，枕部为主）',
      '颈痛、上肢麻木/无力（syringomyelia 或神经根）',
      '吞咽困难、声音嘶哑（CN IX/X）',
      '步态不稳、眼球震颤（小脑/脑干受压）',
      'Chiari II：呼吸异常、吞咽困难、hydrocephalus'
    ],
    staging: 'Chiari I/II/III/IV 分型；I 型按 tonsillar descent 距离（5–10 mm、>10 mm）及是否合并 syringomyelia、hydrocephalus 描述。',
    imagingKeys: [
      ['扁桃体下疝', 'MRI 矢状位小脑扁桃体低于枕大孔后缘≥5 mm（I 型）；II 型合并 vermis 及第四脑室 elongation'],
      ['syringomyelia', 'I 型 Chiari 常合并脊髓空洞；须行全脊髓 MRI 筛查以评估空洞范围'],
      ['脑干及第四脑室形态', 'II 型见 fourth ventricle  elongation、beaked tectum；I 型后颅窝容积减小']
    ],
    modalities: [
      ['MRI', '扁桃体位置、syringomyelia、hydrocephalus；诊断金标准'],
      ['CT', '颅颈交界骨性解剖、枕骨大孔、C1 及 basilar invagination 评估'],
      ['Cine MRI', 'CSF 流动梗阻程度；术前评估及 shunt 决策辅助']
    ],
    mgmt: [
      '无症状 I 型：观察及 MRI 随访',
      '有症状 I 型：后颅窝减压（suboccipital craniectomy+C1 laminectomy）',
      '合并 syringomyelia：减压后多数空洞缩小',
      'Chiari II：多学科管理，hydrocephalus shunt、脊膜膨出修复'
    ],
    ddx: [' acquired tonsillar ectopia（颅压增高、脑萎缩）', 'basilar invagination', 'platybasia'],
    pitfalls: ['须区分 congenital Chiari 与 acquired tonsillar descent', 'I 型必查全脊髓排除 syringomyelia', 'basilar invagination 可合并需单独评估'],
    pearls: ['I 型≥5 mm 下疝+症状= 手术指征', 'syringomyelia 合并率极高', 'valsalva 头痛为典型线索']
  },
  atlantoaxial: {
    overview:
      '寰枢关节异常（atlantoaxial instability/dislocation）指 C1（ atlas）与 C2（axis）之间失稳或脱位，可由 trauma、RA、Down 综合征、odontoid 发育异常或 rotatory subluxation 引起；可压迫脊髓或椎动脉，属高危颈椎病变。',
    epi: 'RA 患者 C1–C2 受累约 30%；Down 综合征 atlantoaxial instability 约 10–20%；trauma、odontoid 骨折/发育异常；儿童 rotatory subluxation（Grisel 综合征）_post-URTI。',
    pathophys:
      'transverse ligament 或 odontoid 完整性破坏→C1 相对 C2 向前/向后或 rotatory 移位→椎管容积减小、脊髓受压；RA 者 pannus 侵蚀 odontoid 及 ligament；rotatory subluxation 为 C1 绕 C2 旋转固定。',
    clinical: [
      '颈痛、活动受限，头颈倾斜（rotatory subluxation）',
      '脊髓病：四肢无力、步态不稳、病理征',
      'RA 患者：颈痛、神经症状，可急性恶化',
      '椎动脉症状：眩晕、复视（rotation 或 subluxation）',
      'Trauma 后 high cervical 损伤需固定直至排除'
    ],
    staging: 'Fielding & Hawkins rotatory subluxation I–IV；RA 按 Ranawat 或 Redlund-Johnell 评估 C1–C2；按 anterior atlantodental interval（ADI）>3 mm 成人、>5 mm 儿童提示不稳。',
    imagingKeys: [
      ['ADI 增宽', '侧位 X 线/CT 见 C1 前弓与 odontoid 间距>3 mm（成人）；>5 mm 儿童；提示 transverse ligament 功能丧失'],
      ['Rotatory subluxation', 'CT 3D/C1 on C2 rotation；Fielding 分型；open-mouth odontoid 见 C1 侧块不对称'],
      ['脊髓受压', 'MRI 见 C1–C2 水平脊髓受压、T2 高信号；pannus（RA）或 hematoma（trauma）']
    ],
    modalities: [
      ['CT', '骨性 C1–C2 关系、ADI、rotatory 角度； trauma 及术前规划金标准'],
      ['MRI', '脊髓受压、pannus、ligament 及 cord signal；RA 及 soft tissue 评估'],
      ['X线', '侧位 ADI、open-mouth odontoid；动态位评估不稳（谨慎使用）']
    ],
    mgmt: [
      'Trauma/急性不稳：hard collar 或 Halo 固定，尽早评估手术',
      'RA C1–C2：融合（C1–C2 或 occipitocervical）当 ADI>10 mm 或脊髓压迫',
      'Rotatory subluxation：牵引复位+固定；失败则融合',
      'Down 综合征：无症状 ADI<5 mm 观察，有症状或 ADI 增大则固定'
    ],
    ddx: ['odontoid  fracture vs  hypoplasia', 'basilar invagination', 'C1 ring fracture（Jefferson）'],
    pitfalls: ['RA 患者颈操做需谨慎，可致 acute cord compression', 'rotatory subluxation 平片易漏，CT 必查', '儿童 ADI 阈值与成人不同'],
    pearls: ['ADI>3 mm 成人提示 C1–C2 不稳', 'CT 3D 评估 rotatory subluxation', 'RA 患者术前必查 C1–C2']
  },
  'odontoid-hypo': {
    overview:
      '齿状突发育不全/发育不良（odontoid hypoplasia/aplasia）为 C2 齿状突形成不足或缺如，属 C2 发育异常，常合并 atlantoaxial instability；可见于 os odontoideum、Morquio 综合征等，易致 C1 向前滑移及脊髓压迫。',
    epi: '罕见；可见于 Down 综合征、Morquio、 spondyloepiphyseal dysplasia；os odontoideum 为 acquired/developmental 争议；儿童期可发现，成人可因 trauma 或慢性不稳出现症状。',
    pathophys:
      'Embryologic 第二 cervical sclerotome 发育异常→odontoid 形成不足或缺如→transverse ligament 无法有效 restrain C1→C1 anterior subluxation→脊髓受压；os odontoideum 为分离的 odontoid tip 与 body 间 fibrous union。',
    clinical: [
      '颈痛、活动受限',
      '脊髓病：步态不稳、上肢无力、病理征',
      '可无症状直至 trauma 或慢性不稳进展',
      'Morquio 等综合征：矮小、角膜混浊、多系统表现',
      'High cervical  trauma 后神经症状加重'
    ],
    staging: '按 odontoid 形态（hypoplasia、aplasia、os odontoideum）；ADI 及 spinal cord compression 程度；Fielding 等用于 C1–C2 不稳。',
    imagingKeys: [
      ['Odontoid 形态异常', 'open-mouth/CT 见 odontoid 短小、缺如或 os odontoideum（分离骨块伴间隙）'],
      ['ADI 增宽及 C1 前移', '侧位 ADI 增大，C1 相对 C2 向前移位；提示 transverse ligament 功能不足'],
      ['脊髓受压', 'MRI 见 C1–C2 水平 cord compression、T2 高信号；评估 pannus 及 soft tissue']
    ],
    modalities: [
      ['CT', 'Odontoid 骨性形态、os odontoideum、ADI；诊断及术前规划'],
      ['MRI', '脊髓受压、ligament、pannus； soft tissue 及 cord signal'],
      ['X线', '侧位 ADI、open-mouth odontoid；筛查 C1–C2 关系']
    ],
    mgmt: [
      '无症状、ADI 稳定：观察及避免 contact sports',
      '有脊髓压迫或进行性 ADI 增大：C1–C2 或 occipitocervical 融合',
      'os odontoideum 有症状：融合；无症状者个体化',
      '综合征患者：多学科管理，早期影像筛查 C1–C2'
    ],
    ddx: ['odontoid  fracture（acute trauma、 fracture line）', 'os odontoideum vs persistent ossiculum terminale', 'RA pannus 侵蚀 odontoid'],
    pitfalls: ['os odontoideum 与 fracture nonunion 鉴别困难', '儿童 ADI 阈值不同', 'Morquio 等须综合征筛查'],
    pearls: ['CT 是 odontoid 形态评估关键', 'ADI 增大+ cord signal= 手术指征', 'os odontoideum 可 congenital 或 post-traumatic']
  },
  discitis: {
    overview:
      '椎间盘炎（discitis）为椎间盘及相邻终板感染，儿童血源性播散多见，成人可 post-operative 或血源性；与相邻椎体骨髓炎（spondylodiscitis）常同时存在；早期 X 线可正常，MRI 最敏感，延误诊断可致严重并发症。',
    epi: '儿童<10 岁血源性多见；成人：糖尿病、免疫抑制、IVDU、post-spinal surgery；金黄色葡萄球菌最常见；男性略多；发病率随年龄及 comorbidity 增加。',
    pathophys:
      '血源性 bacteria 沉积于终板- disc 交界（低血管区）→ disc 及终板感染→炎症、破坏及 abscess 形成；可 spread 至 epidural space、paraspinal soft tissue；儿童 disc 血供相对丰富，recovery 潜力较成人好。',
    clinical: [
      '背痛，儿童可表现为 irritability、refusal to walk',
      '发热、ESR/CRP 升高',
      'Spinal tenderness，活动受限',
      '神经根或脊髓症状（epidural extension）',
      'Post-operative：伤口周围痛、发热，与简单 disc degeneration 鉴别'
    ],
    staging: '无统一分期；按 disc/vertebral 破坏范围、epidural/paraspinal abscess 及神经压迫描述；McMaster 等用于儿童。',
    imagingKeys: [
      ['终板及 disc 信号异常', 'MRI T1 低、T2/STIR 高，disc space 受累；早期 X 线可正常'],
      ['增强模式', 'Disc 及终板 irregular enhancement；epidural/phlegmon 增强；有助于与 Modic 鉴别'],
      ['Paraspinal/epidural  extension', 'MRI 见 paraspinal abscess、epidural phlegmon；CT 引导 biopsy 定位']
    ],
    modalities: [
      ['MRI', '最早检出；增强必做；评估 abscess 及 cord compression'],
      ['X线', '间隙变窄、终板破坏（滞后 2–4 周）；筛查用'],
      ['CT', '骨破坏细节、guidance for biopsy；术后 hardware 评估']
    ],
    mgmt: [
      'Blood culture 及 image-guided biopsy 明确病原',
      'IV 抗生素 6–12 周，根据 sensitivities 调整',
      'Epidural abscess 致神经压迫：手术引流+减压',
      'Immobilization、疼痛控制；监测 ESR/CRP 治疗反应'
    ],
    ddx: ['Modic I 改变（无增强、无 fever/CRP 升高）', 'Schmorl 结节/退变', 'Brucella 等特异性感染'],
    pitfalls: ['早期 X 线正常不能排除', 'Modic I 与 discitis 增强表现不同', 'Post-op  discitis 与 normal post-op 改变鉴别'],
    pearls: ['MRI+增强是诊断金标准', 'ESR/CRP 监测治疗反应', 'Biopsy 在 culture 阴性时重要']
  },
  'epidural-abscess': {
    overview:
      '硬膜外脓肿（spinal epidural abscess, SEA）为硬膜外间隙化脓性感染，可致 rapid 脊髓压迫；经典三联征（发热、背痛、神经 deficit）仅部分患者具备；IVDU、糖尿病、免疫抑制为高危因素，属神经外科/脊柱急症，延误可致永久性瘫痪。',
    epi: '年发病率约 2–25/100 000，近年上升（IVDU、MRSA）；男性、50–70 岁多见；30–50% 有糖尿病；可原发或继发于 discitis、OM、post-procedure。',
    pathophys:
      '血源性 spread 或 direct extension（discitis、OM、procedure）→ epidural space 脓液积聚→ spinal cord compression 及 ischemia→神经功能进行性恶化；abscess 可 spread 多节段， dorsal 或 circumferential。',
    clinical: [
      '背痛（局部或 radicular），常 severe',
      '发热、ESR/CRP/WBC 升高',
      '进行性 motor/sensory deficit、括约肌功能障碍',
      'Classic triad 仅 10–15% 全部具备',
      'Hours to days 内可 rapid 恶化，需 emergency 评估'
    ],
    staging: '按神经功能（motor/sensory/bladder）及 abscess 范围（节段数、location）；无统一分期，但 "time to decompression" 影响预后。',
    imagingKeys: [
      ['硬膜外 T1 低/T2 高 collection', 'MRI 矢状/轴位见 epidural 液体/脓液，可 wrap around thecal sac；增强 ring 或 diffuse enhancement'],
      ['脊髓受压', 'Thecal sac compression、 cord displacement 及 T2 高 signal（ischemia/edema）'],
      ['Source 追踪', '同时评估 discitis、OM、paraspinal abscess；CT/MRI 全 spine 若多节段 suspected']
    ],
    modalities: [
      ['MRI', '全 spine 增强 MRI 金标准；T1、T2、STIR 及 gadolinium'],
      ['CT', '骨性破坏、guidance for drainage；MRI contraindicated 时 limited role'],
      ['Blood culture', '病原学；与 MRI 并行，不 delay imaging']
    ],
    mgmt: [
      'Emergency MRI 及 neurosurgical/spine  consultation',
      'IV 抗生素（经验性覆盖 MRSA 等）+ 血培养',
      '神经 deficit 或进行性压迫：urgent surgical drainage+decompression',
      'High-dose antibiotics 6–8 周；监测 ESR/CRP 及神经功能'
    ],
    ddx: ['Epidural hematoma（acute trauma、无 fever）', 'Epidural phlegmon（early discitis）', 'Metastatic epidural disease（增强模式不同）'],
    pitfalls: ['Classic triad 缺失时易延误', '勿因等待 culture 而 delay MRI/手术', 'Multilevel abscess 需全 spine MRI'],
    pearls: ['SEA 是 spine emergency', 'MRI 全 spine 增强不 delay', 'Time to decompression 影响预后']
  },
  meniscoid: {
    overview:
      '颈椎间盘疝（meniscoid disc / uncovertebral disc herniation）指髓核经钩椎关节区（Luschka 关节）疝出，形成类似半月板样的软组织块，压迫神经根或椎动脉；属颈椎特有，与膝关节 meniscoid body 完全不同，好发于 C5–C6、C6–C7。',
    epi: '中老年颈椎退变患者；C5–C6、C6–C7 最常见；与 uncovertebral joint 退变及 disc 突出相关；男性略多；亚洲人群 cervical spondylosis 背景常见。',
    pathophys:
      '颈椎 disc 退变→后外侧或 uncovertebral 区 weak point→髓核疝出形成 meniscoid 形软组织块→压迫 exiting nerve root 或刺激 vertebral artery；与 simple disc protrusion 位置不同，位于 uncovertebral 区。',
    clinical: [
      '颈肩痛、上肢 radicular pain（C5–C7 根分布）',
      '相应 dermatomal 麻木、weakness',
      'Spurling test 可阳性',
      'Vertebral artery 症状少见（眩晕、 vertigo）',
      '与 simple cervical disc herniation 症状重叠，影像定位关键'
    ],
    staging: '按 herniation 位置（uncovertebral/medial/lateral）、神经根压迫程度及是否 multilevel；无统一分级。',
    imagingKeys: [
      ['Uncovertebral 区 soft tissue 块', 'MRI 轴位见钩椎关节区 meniscoid 形高信号块，与 disc 连续；非 knee meniscus'],
      ['神经根压迫', '同节段 nerve root compression、 foraminal narrowing；C5–C7 根最常见'],
      ['Vertebral artery 关系', 'MRA 或 MRI 评估 herniation 与 vertebral artery 关系； rare 但需警惕']
    ],
    modalities: [
      ['MRI', 'Uncovertebral meniscoid disc、root compression；诊断首选'],
      ['CT', 'Uncovertebral 骨赘、foraminal stenosis；术前骨性评估'],
      ['X线', 'Cervical spondylosis、osteophyte、disc space narrowing']
    ],
    mgmt: [
      '保守治疗：NSAID、 cervical collar、physiotherapy',
      'Persistent radiculopathy：epidural/selective nerve root injection',
      'Refractory 或 progressive deficit：ACDF 或 posterior foraminotomy',
      'Multilevel 者 individualize 手术范围'
    ],
    ddx: ['Simple posterolateral disc herniation', 'Uncovertebral osteophyte alone', 'Nerve root sheath cyst'],
    pitfalls: ['勿与膝关节 meniscoid body 混淆', '须明确 uncovertebral 区 origin', 'Multilevel 时定位症状对应节段'],
    pearls: ['Meniscoid = 颈椎间盘疝，非膝半月板', 'C5–C7 uncovertebral 区好发', 'MRI 轴位显示 meniscoid 形态']
  },
  'oss-flavum': {
    overview:
      '黄韧带骨化（ossification of ligamentum flavum, OLF）为黄韧带纤维变性后骨化，导致椎管后方侵占及脊髓/马尾压迫；与 OPLL（后纵韧带骨化）解剖位置不同，OLF 位于椎管后壁；亚洲人群高发，胸段最常见，可 multilevel。',
    epi: '亚洲人群 prevalence 较高；50–70 岁；胸段 T9–T12 最多见，亦可腰段；与 OPLL 可并存但为不同 ligament；糖尿病、氟中毒等为危险因素。',
    pathophys:
      '黄韧带 fibrocartilaginous 变性→endochondral ossification→ligament 增厚骨化→椎管 posterior 侵占→脊髓/ cauda equina compression；progressive 可 multilevel，与 OPLL anterior 压迫形成 "sandwich" compression。',
    clinical: [
      'Progressive 脊髓病：步态不稳、下肢无力、 spasticity',
      '胸段： gait disturbance、 sensory level',
      '腰段： claudication、 cauda equina symptoms',
      '通常 insidious onset，缓慢进展',
      '与 OPLL 并存时症状更重'
    ],
    staging: '按 OLF 范围（节段数）、occupation ratio（椎管侵占率）、location（single/multilevel）；与 OPLL 分开评估。',
    imagingKeys: [
      ['椎管后壁骨化', 'CT 见黄韧带区 high density ossification，位于 lamina 与 dura 之间；posterior 侵占'],
      ['椎管狭窄', 'MRI/CT 测量 spinal canal AP diameter 及 occupation ratio；T2 cord compression'],
      ['与 OPLL 区分', 'OLF posterior、OPLL anterior；二者可并存，须分别描述位置及范围']
    ],
    modalities: [
      ['CT', 'OLF 骨化范围、thickness、occupation ratio；诊断及术前规划金标准'],
      ['MRI', 'Cord compression、 signal、 OPLL 并存评估； soft tissue'],
      ['X线', '间接征象；CT 远优于 X 线显示 OLF']
    ],
    mgmt: [
      'Mild 无症状：观察及 MRI 随访',
      'Progressive myelopathy： posterior decompression（laminectomy/ laminoplasty）',
      'Multilevel： extensive posterior decompression，必要时 fusion',
      '与 OPLL 并存： often 需 combined anterior+posterior  approach'
    ],
    ddx: ['OPLL（anterior，后纵韧带）', 'Ligamentum flavum hypertrophy（非骨化）', 'Posterior disc herniation'],
    pitfalls: ['OLF 与 OPLL 必须区分（posterior vs anterior）', 'CT 显示 OLF 优于 MRI', 'Multilevel 时 measure 每节段 occupation'],
    pearls: ['OLF = 黄韧带骨化，椎管后壁', '与 OPLL 解剖位置完全不同', 'CT 是 OLF 评估首选']
  },
  opll: {
    overview:
      '后纵韧带骨化（ossification of posterior longitudinal ligament, OPLL）为后纵韧带骨化致椎管前方侵占及脊髓压迫；亚洲人群高发， cervical 最常见；分 continuous、segmental、mixed 等型；与 OLF（黄韧带骨化）为不同结构，可并存。',
    epi: '日本人 prevalence 约 2–4%；其他亚洲人群亦较高；50–60 岁；男性略多；C3–C5 最常受累；与 diabetes、DISH 相关； familial 倾向。',
    pathophys:
      'Posterior longitudinal ligament mesenchymal 细胞化生→ ectopic ossification→ anterior spinal canal stenosis→ cord compression；progressive ossification 可 extend multilevel；occupation ratio>40–50% 与 myelopathy 相关。',
    clinical: [
      'Progressive cervical myelopathy： hand clumsiness、 gait disturbance',
      'Upper extremity numbness、weakness',
      'Lower extremity spasticity、 hyperreflexia',
      '通常 insidious，可 stepwise deterioration',
      '与 OLF 并存时 "sandwich" compression 症状更重'
    ],
    staging: 'Mitsubishi/Investigation Committee 分型：segmental、continuous、mixed、other；按 occupation ratio（<25%、25–50%、>50%）及 cord signal。',
    imagingKeys: [
      ['前纵韧带后/OPLL 骨化', 'CT 见椎体后方、 disc 后方 continuous 或 segmental 骨化； anterior canal 侵占'],
      ['Occupation ratio', 'CT axial 测量 ossification 占椎管 AP diameter 比例；>40–50% 与 myelopathy 相关'],
      ['Cord compression 及 signal', 'MRI T2 cord compression、 intramedullary high signal 提示 poor prognosis']
    ],
    modalities: [
      ['CT', 'OPLL 分型、 thickness、occupation ratio；术前规划金标准'],
      ['MRI', 'Cord compression、 signal、 OLF 并存； soft tissue'],
      ['X线', 'Lateral 见 disc 后方 ossification； screening，细节不如 CT']
    ],
    mgmt: [
      'Asymptomatic/mild：观察及 MRI 随访',
      'Progressive myelopathy： anterior decompression（ACDF、 corpectomy）或 posterior expansion',
      'Occupation ratio>50% 或 cord signal change： often 需手术',
      '与 OLF 并存： combined approach  individualize'
    ],
    ddx: ['OLF（posterior，黄韧带）', 'Disc calcification/ossification', 'Meningioma（dural based，enhancing）'],
    pitfalls: ['OPLL anterior、OLF posterior，勿混淆', 'CT 测量 occupation ratio 标准', 'Cord T2 signal 影响预后'],
    pearls: ['OPLL = 后纵韧带骨化，椎管前方', 'CT occupation ratio 指导手术', '与 OLF 可并存，分别评估']
  },
  'facet-arthropathy': {
    overview:
      '小关节病（facet arthropathy / facet joint osteoarthritis）为腰椎或颈椎小关节退变、骨赘形成及 synovial 改变，是 mechanical low back pain 和 facet-mediated pain 的常见原因；可合并 spondylolisthesis、 spinal stenosis；影像上小关节间隙变窄、骨赘及 MRI 积液/ edema。',
    epi: '随年龄增长 prevalence 增加；>50 岁 lumbar facet arthropathy 常见；与 disc degeneration 平行； obesity、 repetitive extension 负荷为危险因素；可单节段或多节段。',
    pathophys:
      '小关节 cartilage 磨损→ osteophyte、 synovial hypertrophy→ joint space narrowing、 effusion；inflammatory 及 mechanical pain； hypertrophic facet 可 contribute to lateral recess/foraminal stenosis；与 disc 退变互为因果。',
    clinical: [
      'Mechanical low back pain，extension 及 rotation 加重',
      'Paraspinal tenderness，facet loading 可 reproduce pain',
      '可 radiate 至 buttock/thigh（非 true radiculopathy）',
      'Morning stiffness，activity 后部分缓解',
      '合并 stenosis 时 neurogenic claudication'
    ],
    staging: '按 Kellgren-Lawrence 或 Pfirmann 类似分级；按单/多节段、是否合并 stenosis/spondylolisthesis；无统一 facet 专用分期。',
    imagingKeys: [
      ['小关节间隙变窄及骨赘', 'CT/X 线见 facet joint space narrowing、osteophyte、 subchondral sclerosis'],
      ['MRI 积液及 edema', 'T2 高信号 effusion、 marrow edema 提示 active facet inflammation；与 pain 相关性'],
      ['Stenosis 贡献', 'Hypertrophic facet 致 lateral recess/foraminal narrowing；与 central stenosis 分开描述']
    ],
    modalities: [
      ['MRI', 'Facet effusion、 marrow edema、 stenosis、 disc 并存；评估 active inflammation'],
      ['CT', 'Facet osteophyte、 joint space、 bone 细节； stenosis 量化'],
      ['X线', 'Oblique 见 facet arthropathy； lateral recess 间接评估']
    ],
    mgmt: [
      'Conservative：NSAID、 physiotherapy、 core stability、 avoid excessive extension',
      'Facet-mediated pain： diagnostic facet block → radiofrequency ablation',
      '合并 stenosis： decompression ± fusion  individualize',
      'Obesity 及 activity modification'
    ],
    ddx: ['Discogenic pain（Modic、 disc 源）', 'Sacroiliac joint pain', 'Hip pathology（referred pain）'],
    pitfalls: ['Facet pain 与 discogenic 鉴别需 block', 'MRI effusion 非特异', 'Oblique X 线评估 lumbar facet'],
    pearls: ['Extension 加重提示 facet 成分', 'Diagnostic block 确认 facet 源', 'Hypertrophic facet 可致 stenosis']
  }
};

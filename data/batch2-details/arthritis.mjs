/** 关节炎与关节病 10 条 · 第二批疾病详情 */
export default {
  hemarthrosis: {
    overview: '关节积血(血友病性关节病)反复出血致 synovitis、软骨损伤及骨关节炎,早期 MRI 可发现。',
    epi: '血友病 A/B;儿童起病的 recurrent hemarthrosis 以膝、踝、肘多见。',
    pathophys: 'Factor 缺乏→ intra-articular bleeding→ iron deposition→ synovitis→ cartilage/bone destruction。',
    clinical: ['Acute  hot swollen joint', 'Recurrent  same  joint', 'Reduced  ROM', 'Factor  level  known'],
    staging: 'Arnold-Hilgartner 0–V radiographic; Joints  affected  count。',
    imagingKeys: [['Joint  effusion', 'dense on CT/hemosiderin on MRI'], ['Synovial  hypertrophy', ''], ['Subchondral  cyst/erosion', 'chronic']],
    modalities: [['X线', 'Late: juxta-articular osteoporosis, erosions, OA'], ['CT', 'effusion density'], ['MRI', 'hemosiderin low T2*, synovitis, early cartilage']],
    mgmt: ['Factor  replacement acute', 'Prophylaxis', 'Synovectomy(RTI)', 'Joint  preservation'],
    ddx: ['Traumatic  hemarthrosis:single  event', 'PVNS:bloody  but  not  hemophilia', 'Septic  joint'],
    pitfalls: ['Early  X-ray  normal', 'MRI  for early', 'Target  joint  concept'],
    pearls: ['Recurrent  spontaneous  hemarthrosis→ hemophilia', 'MRI  hemosiderin', 'Prophylaxis  prevents  arthropathy']
  },
  charcot: {
    overview: 'Charcot 神经关节病是 neuropathy 背景下关节破坏性病变,常见于糖尿病,可 mimic 感染。',
    epi: 'Diabetes  neuropathy; also  syringomyelia, leprosy。',
    pathophys: 'Loss  of sensation+ abnormal  loading→ microfractures, fragmentation, dislocation。',
    clinical: ['Warm  swollen  foot(可 painless)', 'Neuropathy', 'May  present  as infection'],
    staging: 'Eichenholtz 0–3; Sanders-Frykberg  anatomic。',
    imagingKeys: [['Midfoot  collapse', 'rocker bottom'], ['Fragmentation', ''], ['Density  preserved vs infection', '']],
    modalities: [['X线', 'Dislocation, debris, density'], ['CT', 'planning  fusion'], ['MRI', 'marrow  edema(非特异), exclude  osteo']],
    mgmt: ['Immobilization  acute', 'Custom  footwear', 'Surgery  reconstruction  selected', 'Treat  osteomyelitis  if present'],
    ddx: ['Osteomyelitis:probe-to-bone, lab', 'Gout', 'RA'],
    pitfalls: ['MRI  cannot  reliably  separate  Charcot vs OM', 'Clinical+ probe', 'Bilateral  possible'],
    pearls: ['Neuropathic+ warm  foot= Charcot until proven', 'Immobilize  first', 'OM  workup  parallel']
  },
  dish: {
    overview: '弥漫性特发性骨肥厚（DISH）是脊柱及四肢附着点流柱状骨化，通常非炎性；典型为胸椎右侧连续骨化，椎间盘间隙多保留。',
    epi: '>50 岁男性多见；肥胖、糖尿病相关；骶髂关节通常不受累。',
    pathophys: '附着点骨化及脊柱前外侧流柱状骨桥形成；非炎性退行性骨化过程。',
    clinical: ['多数无症状或轻度僵硬', '胸椎活动受限', '颈椎 DISH 可吞咽困难', '四肢附着点骨化'],
    staging: 'Resnick 标准；按受累部位（胸/颈/腰）及四肢附着点。',
    imagingKeys: [
      ['流柱状骨化', '胸椎右侧椎体前外侧连续骨桥，≥4 连续椎体'],
      ['椎间盘间隙保留', '有别于强直性脊柱炎间隙狭窄'],
      ['四肢附着点骨化', '髂嵴、坐骨结节、肱骨内上髁等']
    ],
    modalities: [
      ['X线', '脊柱右侧流注样骨化、四肢附着点骨赘'],
      ['CT', '颈椎骨化评估吞咽/气道相关结构'],
      ['MRI', '排除感染、肿瘤；评估脊髓受压']
    ],
    mgmt: ['无症状：观察', 'NSAID/理疗缓解症状', '颈椎骨化致吞咽困难：手术少见', '融合节段：避免过伸暴力防骨折'],
    ddx: ['强直性脊柱炎：骶髂关节炎、侵蚀', '退行性脊柱病：间隙狭窄为主', 'Forestier 征（仅脊柱）'],
    pitfalls: ['融合节段轻微外伤可致不稳定骨折', '勿与 AS 混淆', 'DISH 非真正全椎体融合'],
    pearls: ['胸椎右侧流注样骨化+间隙保留', '骶髂关节通常正常', '过伸骨折风险']
  },
  'synov-chondro': {
    overview: '滑膜软骨瘤病是 synovial  chondrometaplasia 致 intra-articular  loose  bodies,可 secondary OA。',
    epi: '30–50 岁; knee  most; monoarticular。',
    pathophys: 'Synovial  nodules  cartilaginous→ ossify→ loose  bodies; may  be  primary  or  secondary。',
    clinical: ['Pain, swelling, locking', 'Palpable  nodules', 'Chronic  course'],
    staging: 'Milgram  I(synovial) II(transitional) III(loose  bodies); primary vs secondary。',
    imagingKeys: [['Loose  bodies', 'ring-and-arc  calcification'], ['Synovial  nodules', ''], ['Joint  space', 'preserved  early']],
    modalities: [['X线', 'Multiple  ossified  bodies, uniform  size  primary'], ['CT', 'extent, non-ossified'], ['MRI', 'cartilaginous  nodules T2 高']],
    mgmt: ['Synovectomy+ removal  bodies', 'OA: arthroplasty', 'Recurrence  primary'],
    ddx: ['Secondary  OA  fragments: uneven', 'PVNS', 'TgCT'],
    pitfalls: ['Secondary  has  OA  primary', 'MRI  pre-ossification', 'Recurrence  after  incomplete'],
    pearls: ['Primary= uniform  nodules', 'CT/MRI  pre-op', 'Synovectomy  key']
  },
  pvns: {
    overview: '色素沉着绒毛结节性滑膜炎(PVNS)是 synovial  proliferative  lesion, localized  or  diffuse,含 hemosiderin。',
    epi: '20–40 岁; knee  common; localized  vs diffuse。',
    pathophys: 'Synovial  villous  proliferation, hemosiderin, bone  erosion  in  diffuse。',
    clinical: ['Chronic  swelling', 'Recurrent  effusion( bloody)', 'Limited  ROM'],
    staging: 'Localized  vs diffuse; intra- vs extra-articular。',
    imagingKeys: [['Synovial  mass', ''], ['Low  T2*  hemosiderin', 'MRI'], ['Bone  erosion', 'diffuse']],
    modalities: [['X线', 'Effusion, bone  erosion  late'], ['CT', 'erosions'], ['MRI', 'blooming  artifact, low T2*, mass']],
    mgmt: ['Localized: excision', 'Diffuse: synovectomy( arthroscopic/open), RT  adjunct', 'TKA  if  end-stage'],
    ddx: ['Synovial  chondromatosis', 'Hemophilic  synovitis', 'Synovial  sarcoma'],
    pitfalls: ['Diffuse  recurrence  high', 'MRI  blooming', 'Extra-articular  extension'],
    pearls: ['MRI  hemosiderin  signature', 'Diffuse  needs  complete  synovectomy', 'Recurrence  monitor']
  },
  sapho: {
    overview: 'SAPHO 综合征是 synovitis, acne, pustulosis, hyperostosis, osteitis 组合,前胸壁  common。',
    epi: '30–50 岁; anterior  chest  wall, spine, sacroiliac。',
    pathophys: 'Chronic  osteitis  enthesitis; possibly  Propionibacterium  association。',
    clinical: ['Anterior  chest  pain/swelling', 'Palmoplantar  pustulosis/acne', 'Chronic  course'],
    staging: 'By  sites: anterior  chest, spine, SI。',
    imagingKeys: [['Hyperostosis', 'manubrium/sternoclavicular'], ['Osteitis  MRI  edema', ''], ['Enthesitis', '']],
    modalities: [['X线', 'Hyperostosis, sclerosis'], ['CT', 'bone  detail'], ['MRI', 'marrow  edema, active  osteitis']],
    mgmt: ['NSAID/bisphosphonates', 'TNF  inhibitors  refractory', 'Antibiotics  controversial'],
    ddx: ['CRMO', 'Metastasis', 'Osteomyelitis'],
    pitfalls: ['Delayed  diagnosis', 'MRI  activity', 'Multifocal  mimic  mets'],
    pearls: ['Anterior  chest+ pustulosis= SAPHO', 'MRI  active  osteitis', 'Chronic  inflammatory']
  },
  'erosive-oa': {
    overview: '侵蚀性骨关节炎是 hand  OA  aggressive  form, central  erosions  in  IP  joints, “gull-wing”。',
    epi: 'Postmenopausal  women; DIP/PIP。',
    pathophys: 'Central  cartilage  loss  with  peripheral  osteophyte→ gull-wing  erosion。',
    clinical: ['Hand  pain, Heberden/Bouchard', 'Inflammatory  flares', 'Deformity'],
    staging: 'Erosive  vs non-erosive  OA  hand。',
    imagingKeys: [['Gull-wing  erosion', 'central'], ['Osteophytes', 'peripheral'], ['Joint  space  narrowing', '']],
    modalities: [['X线', 'Central  erosion+ osteophytes'], ['MRI', 'synovitis  flare'], ['US', 'synovitis']],
    mgmt: ['NSAID/splint', 'Intra-articular  steroid  cautious', 'Joint  fusion  severe'],
    ddx: ['Psoriatic  arthritis: marginal  erosions', 'RA: MCP  symmetric', 'Gout'],
    pitfalls: ['Vs  PsA', 'Central  vs marginal  erosion', 'Inflammatory  flares'],
    pearls: ['Gull-wing= erosive  OA', 'Hand  DIP/PIP', 'Vs  PsA  pattern']
  },
  'shoulder-oa': {
    overview: '肩关节骨关节炎以 glenohumeral  joint  space  narrowing、osteophytes 及 posterior  wear 为特征。',
    epi: 'Elderly; post-trauma/ cuff  tear  arthropathy  variant。',
    pathophys: 'Cartilage  loss, osteophyte, subchondral  sclerosis; cuff  tear  arthropathy  superior  migration。',
    clinical: ['Pain, stiffness', 'Crepitus', 'Reduced  ROM  external  rotation'],
    staging: 'Ahlbäck/Samilson; cuff  tear  arthropathy  separate。',
    imagingKeys: [['Glenohumeral  narrowing', ''], ['Osteophytes', 'inferior  humerus'], ['Cuff  tear  arthropathy', 'superior  migration']],
    modalities: [['X线', 'AP/axillary  narrowing, osteophytes'], ['CT', 'glenoid  bone  stock'], ['MRI', 'cuff  status, cartilage']],
    mgmt: ['PT/ analgesia', 'Injection', 'Anatomic/reverse  TSA'],
    ddx: ['Cuff  tear  alone', 'RA', 'AVN  humeral  head'],
    pitfalls: ['Axillary  view  essential', 'CT  for  glenoid  planning', 'CTA  pattern'],
    pearls: ['Axillary  for  GH  OA', 'Reverse  TSA  if cuff  deficient', 'CT  glenoid']
  },
  'ankle-oa': {
    overview: '踝关节 OA 常 post-trauma, tibiotalar  narrowing  asymmetric, osteophytes  anterior  tibia/talus。',
    epi: 'Post  fracture/sprain; primary  less  common。',
    pathophys: 'Cartilage  wear, varus/valgus  malalignment  accelerates。',
    clinical: ['Activity  pain', 'Stiffness', 'Swelling  mild'],
    staging: 'Takakura  ankle  OA; varus  alignment。',
    imagingKeys: [['Tibiotalar  narrowing', 'often  asymmetric'], ['Osteophytes', ''], ['Malalignment', 'varus']],
    modalities: [['X线', 'Weight-bearing  AP/mortise/lateral'], ['CT', 'deformity  planning'], ['MRI', 'cartilage, ligament']],
    mgmt: ['Brace/ injection', 'Osteotomy  alignment', 'Ankle  fusion/replacement'],
    ddx: ['Inflammatory  arthritis', 'AVN  talus', 'Subtalar  primary'],
    pitfalls: ['Weight-bearing  films', 'Subtalar  involvement', 'Alignment  correction'],
    pearls: ['Post-trauma  common', 'Weight-bearing  views', 'Alignment  osteotomy']
  },
  oci: {
    overview: '骨软骨损伤（OCI）指创伤或慢性应力导致的关节软骨及软骨下骨损伤；与慢性剥脱性骨软骨炎（OCD）的病程和机制不同。',
    epi: '踝外侧距骨、膝股骨髁、髌骨好发；急性运动损伤或创伤多见。',
    pathophys: '急性剪切/撞击或重复负荷致软骨及软骨下骨损伤；不稳定碎片可形成游离体。',
    clinical: ['定位关节疼痛', '肿胀、活动加重', '可有交锁或不稳感'],
    staging: 'Berndt-Harty（踝）；ICRS（膝）；MRI 稳定性评估。',
    imagingKeys: [['软骨下骨损伤', 'MRI 骨髓水肿；CT/X线 软骨下低密度'], ['软骨缺损', 'MRI 软骨变薄、裂隙或剥离'], ['碎片稳定性', 'MRI 液相线或移位提示不稳定']],
    modalities: [['MRI', '骨髓水肿、软骨缺损、液相及稳定性'], ['X线', '软骨下骨改变'], ['CT', '骨性碎片大小及关节面']],
    mgmt: ['稳定：休息、制动、逐步负重', '不稳定：固定、微骨折或骨软骨移植', '游离大碎片：手术取出或固定'],
    ddx: ['OCD：慢性病程、典型骨骺部位', '骨坏死', '应力性骨折'],
    pitfalls: ['OCI 强调急性/创伤机制', 'MRI 评估稳定性', '与 OCD 勿混淆'],
    pearls: ['OCI≠OCD：前者多急性创伤', '踝外侧距骨常见', '不稳定应积极处理']
  }
};

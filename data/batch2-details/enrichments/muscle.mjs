/** 肌肉与肌腱 27 条 · 第二批疾病详情 · 富文本扩展 */
export default {
  'quad-tear': {
    overview: '股四头肌撕裂多见于运动损伤，好发于 rectus femoris 间接头，MRI 可显示肌纤维中断、血肿及肌腱回缩，用于分级与手术决策。',
    epi: '常见于足球、篮球、短跑及跳跃运动员；rectus femoris 间接头最常受累；年龄以青年为主，既往腘绳肌紧张或热身不足者风险增高。',
    pathophys: '高速离心收缩或急停变向时肌腹-腱连接处或肌腹中段承受过载应力，导致部分或完全纤维断裂；完全撕裂可伴肌肉回缩及较大血肿，间接头因跨双关节更易损伤。',
    clinical: [
      '急性大腿前侧锐痛，常伴"啪"声或撕裂感',
      '大腿前部肿胀、瘀斑，伸膝抗阻明显疼痛',
      '部分或完全伸膝无力，可触及凹陷或肿块',
      '完全撕裂时髌骨位置可能偏低、步态跛行',
      '慢性者可表现为反复轻度拉伤后瘢痕化及钙化'
    ],
    staging: '常用三级：I 级≤10% 横截面积、II 级 10%–50%、III 级>50% 或完全断裂；MRI 可进一步区分肌腹、腱连接处及是否累及肌腱。',
    imagingKeys: [
      ['肌纤维连续性中断', 'T2/STIR 高信号区伴低信号纤维断端，可定位撕裂平面及横截面积百分比'],
      ['血肿与周围水肿', '急性期 T2 高信号血肿，肌间及筋膜下液体蔓延，有助于判断损伤范围'],
      ['肌腱回缩与断端间距', '完全撕裂时近端肌腹回缩、断端分离，测量间距指导早期修复时机']
    ],
    modalities: [
      ['MRI', '首选，可分级、评估血肿范围、肌腱受累及回缩程度，指导康复或手术'],
      ['US', '床旁动态扫查可见肌纤维缺口及血肿，适合随访但深部及完全撕裂评估受限'],
      ['X线', '通常正常，用于排除髌骨或胫骨结节撕脱骨折及软组织钙化']
    ],
    mgmt: [
      'I–II 级：RICE、渐进性伸膝及髋屈肌群强化康复',
      'III 级或运动员完全撕裂：早期手术修复或锚钉固定',
      '控制负荷与重返运动标准，避免过早高强度冲刺与跳跃',
      '慢性钙化灶或功能受限者可考虑病灶清除及肌腱重建'
    ],
    ddx: ['大腿挫伤/血肿', '股四头肌腱断裂', '髌骨或胫骨结节撕脱骨折'],
    pitfalls: ['仅关注股直肌而漏诊股中间肌等其他头', '将慢性瘢痕/钙化误判为急性撕裂', '未行 MRI 低估肌腱连接处受累程度'],
    pearls: ['rectus femoris 间接头为冲刺损伤经典部位', 'MRI 横截面积分级指导重返运动', '完全撕裂早期修复预后优于延迟手术']
  },

  hamstring: {
    overview: '腘绳肌损伤是 sprint 及变向运动最常见肌损伤之一，proximal biceps femoris 长头最常受累，MRI 可量化 edema 范围并评估肌腱受累。',
    epi: '多见于足球、橄榄球、澳式足球及短跑运动员；近端损伤远多于远端；既往损伤史、年龄偏大及 Nordic 训练不足者复发率高。',
    pathophys: '高速 sprint 末期或过度伸展时腘绳肌群承受极大离心负荷，导致 musculotendinous junction 或肌腹撕裂；肌腱受累者愈合慢、复发风险显著升高。',
    clinical: [
      '突发大腿后侧疼痛， sprint 中常见，可伴 audible pop',
      '坐起、弯腰及腘绳肌 stretch 时疼痛加重',
      '腘绳肌抗阻及髋伸展无力， bruising 可延至膝后',
      '近端坐骨结节附着处压痛，完全撕裂可触及凹陷',
      '复发性损伤表现为慢性隐袭性后侧大腿痛及硬结'
    ],
    staging: 'British Athletics 及 MRI 分级：0 级（MRI 阴性临床阳性）至 IV 级完全断裂；需记录 edema 长度、纤维中断百分比及是否累及 free tendon。',
    imagingKeys: [
      ['近端 biceps femoris 长头 edema', 'T2/STIR 高信号沿肌腹-腱连接区分布，edema 纵向长度与预后相关'],
      ['纤维中断与断端形态', 'PD/T2 可见低信号纤维断端及 fluid cleft，区分部分与完全撕裂'],
      ['肌腱受累与坐骨结节附着', 'T1 低信号腱内高信号或腱连续性中断提示 prolonged recovery 及更高复发率']
    ],
    modalities: [
      ['MRI', '金标准，评估 edema 范围、分级、肌腱受累及 scar 形成，指导康复进度'],
      ['US', '可见 hypoechoic 缺损区及动态收缩时纤维不连续，适合 bedside 初筛'],
      ['X线', '成人通常正常；儿童需排除 ischial tuberosity 撕脱骨折']
    ],
    mgmt: [
      '急性期：保护、冰敷、无痛范围活动及早期 isometric 负荷',
      '离心 Nordic curl 及 progressive loading 为核心康复方案',
      '完全近端肌腱撕裂或骨性撕脱：早期手术固定',
      '按 MRI 及功能测试分阶段 return-to-sport，避免过早 sprint'
    ],
    ddx: ['坐骨神经痛/腰椎 radiculopathy', '大腿后侧挫伤', '腘窝囊肿或深静脉血栓'],
    pitfalls: ['仅报告"腘绳肌拉伤"未指明头别及是否 tendon involvement', 'X 线阴性即排除儿童 ischial avulsion', '过早 sprint 导致复发及 chronic scar'],
    pearls: ['proximal biceps femoris 长头为最常见部位', 'edema 长度>10 cm 或 tendon 受累提示 prolonged RTP', 'Nordic eccentric 训练为循证预防手段']
  },

  'calf-tear': {
    overview: '小腿腓肠肌/比目鱼肌撕裂俗称 tennis leg，好发于 medial gastrocnemius 头 musculotendinous junction，需与 DVT 及跟腱断裂鉴别。',
    epi: '多见于 40–50 岁休闲运动者及网球、羽毛球运动员；medial gastroc 头最常见；plantaris 协同 rupture 并不少见。',
    pathophys: '足踝突然背伸时 gastrocnemius 在膝伸位承受强烈拉伸，musculotendinous junction 发生部分或完全撕裂；比目鱼肌深部撕裂症状更隐匿但恢复更慢。',
    clinical: [
      '突发小腿后侧锐痛，如"被踢"或"枪击"感',
      '局部 swelling、瘀斑，跖屈抗阻及 walk 时疼痛',
      '可触及条索状硬结或凹陷， Achilles 完整性通常保留',
      'plantaris 孤立 rupture 症状可较轻',
      '必须评估 DVT 红旗：单侧肿胀、 Homan 征及发热'
    ],
    staging: 'I–III 级部分至完全撕裂；需区分 gastrocnemius、soleus 及 plantaris；MRI 可量化 edema 范围及是否累及 fascia。',
    imagingKeys: [
      ['medial gastroc 头 junction 撕裂', 'T2 高信号沿 musculotendinous junction 分布，可见纤维断端及 feathering 征'],
      ['plantaris 协同 rupture', '细条状 tendon 连续性中断及沿 gastroc 内侧 fluid tracking，可为 isolated 或 combined'],
      ['血肿与筋膜下 fluid', 'acute hematoma 呈 T1 高/T2 高或 complex signal，fascial 完整性影响 rehabilitation 策略']
    ],
    modalities: [
      ['US', '首选初筛，dynamic 扫查可见 muscle gap、血肿及 plantaris，可同时 Doppler 排除 DVT'],
      ['MRI', '精确评估 soleus 深部撕裂、edema 范围及 chronic 瘢痕，适合运动员及复杂病例'],
      ['X线', '通常正常，排除 calcific myonecrosis 及 foreign body']
    ],
    mgmt: [
      '早期 heel wedge 或 boot 允许 protected weight bearing',
      '渐进性 calf stretch 及 eccentric strengthening',
      '排除 DVT 后再行 aggressive mobilization',
      '完全撕裂或功能持续受限者 rarely 需手术，多数 conservative 有效'
    ],
    ddx: ['深静脉血栓（DVT）', 'Achilles tendon rupture', 'soleus 深部 tear / chronic exertional compartment'],
    pitfalls: ['未行 US/Doppler 排除 DVT', '将 soleus 深部 tear 误判为轻微 gastroc strain', '过早 aggressive stretch 导致 re-bleed'],
    pearls: ['tennis leg 经典部位为 medial gastroc junction', 'US bedside 可同时评估 DVT', 'soleus tear 恢复时间常长于 gastroc']
  },

  adductor: {
    overview: '内收肌损伤常见于足球、冰球等 kicking 运动，adductor longus 肌腱或 musculotendinous junction 最常受累，需与 athletic pubalgia 及 labral 病变鉴别。',
    epi: '多见于职业及业余足球、冰球运动员；adductor longus  origin 最常见；核心稳定性不足及既往 groin 伤史为危险因素。',
    pathophys: 'forced abduction 时内收肌群 eccentric 过载，导致 tendon 微 tear 至完全 avulsion； chronic 可进展为 tendinopathy 并合并 osteitis pubis 或 sports hernia 等 groin 综合征。',
    clinical: [
      'groin 内侧疼痛， kicking 及 sprint 起始时加重',
      '内收抗阻试验阳性， origin 压痛明显',
      '完全撕裂可伴 sudden pop、 bruising 及内收无力',
      '慢性者表现为 groin 隐袭痛及 sprint 后加重',
      '需评估 hip ROM 及排除 abdominal wall 及 hip joint 源 pain'
    ],
    staging: 'Grade I–III 肌纤维 tear；需单独评估 tendon 部分撕裂 vs 完全 avulsion； chronic 分为 tendinopathy 与 post-traumatic fibrosis。',
    imagingKeys: [
      ['adductor longus origin 高信号', 'T2/STIR 沿 pubic ramus 附着处 edema，tendon 内高信号提示 tendinopathy 或 partial tear'],
      ['肌腱连续性中断', '完全 tear 时 tendon stump 回缩、fluid cleft 及 surrounding hematoma，需测量断端间距'],
      ['osteitis pubis 及 symphysis 改变', 'symphysis 骨髓 edema 及 cortical irregularity 提示合并 pubic bone stress，影响 treatment 策略']
    ],
    modalities: [
      ['MRI', '首选，评估 tendon/muscle 受累、symphysis edema 及 concomitant pathology'],
      ['US', 'dynamic 内收试验下可见 tendon tear、hypoechoic 区及 neovascularization'],
      ['X线', '评估 symphysis widening、 osteitis pubis 及 avulsion fragment']
    ],
    mgmt: [
      '急性 partial tear：protected ROM 及 progressive adductor strengthening',
      '完全 tendon avulsion（尤其运动员）：early surgical reattachment',
      '合并 osteitis pubis：load management 及 core stability 训练',
      'refractory chronic groin 需 multidisciplinary 评估（hernia、hip、adductor）'
    ],
    ddx: ['athletic pubalgia / sports hernia', 'hip labral tear / FAI', 'osteitis pubis 孤立表现'],
    pitfalls: ['仅 label groin pain 为 adductor 而未排除 hip 及 abdominal 源', '低估 tendon avulsion 需手术', 'symphysis edema 误读为 infection'],
    pearls: ['adductor longus origin 为 groin pull 经典部位', 'MRI tendon involvement 决定 recovery 时间', 'chronic groin 常为多因素需系统评估']
  },

  'gluteus-min': {
    overview: '臀中/小肌肌腱病变致 lateral hip pain，常被误诊为 trochanteric bursitis；MRI 可显示 tendon tear、 tendinopathy 及肌肉 atrophy。',
    epi: '多见于长跑者、中年女性及 elderly；gluteus medius 较 minimus 更常报告 tear；单腿 stance 及 stair climbing 为典型诱因。',
    pathophys: 'repetitive microtrauma 或 acute fall 导致 abductor tendon 部分 tear 或 tendinopathy； chronic 未治可进展为 tendon retraction、 fatty infiltration 及 Trendelenburg gait。',
    clinical: [
      '大转子外侧 pain，side-lying 及 night pain 常见',
      '单腿 stance Trendelenburg 征阳性',
      'Hip abduction 抗阻 weakness， stair climbing 困难',
      '局部 tenderness over greater trochanter 及 abductor tendon',
      '与 lumbar radiculopathy 鉴别：pain 多局限 lateral hip 而非 dermatomal'
    ],
    staging: '按 tendon 完整性：tendinopathy、partial tear、full-thickness tear；Goutallier 分级评估 muscle fatty infiltration 及 surgical candidacy。',
    imagingKeys: [
      ['abductor tendon tear 及 signal 改变', 'coronal oblique MRI 见 gluteus medius/minimus tendon 不连续或 T2 高 signal tendinopathy'],
      ['greater trochanter bursal fluid', 'bursitis 常 secondary，需区分 primary bursitis vs tendon tear 为主因'],
      ['muscle atrophy 与 fatty infiltration', 'chronic tear 见 muscle volume 减小及 T1 高 signal fatty replacement，提示 repair 预后差']
    ],
    modalities: [
      ['MRI', '首选，coronal oblique 序列最佳显示 abductor tendon 及 tear 范围'],
      ['US', '可评估 tendon thickness、 tear 及 bursal distension，适合 injection guidance'],
      ['X线', '评估 hip OA、 calcific tendinopathy 及 greater trochanter  morphology']
    ],
    mgmt: [
      'Conservative：PT 侧重 hip abductor 及 core strengthening',
      'US/MRI-guided corticosteroid injection 于 bursa（非 tendon 内）',
      'Full-thickness tear 伴 functional deficit：open 或 endoscopic tendon repair',
      'Advanced fatty infiltration：可能需 tendon transfer 或 THA 评估'
    ],
    ddx: ['孤立 trochanteric bursitis', 'hip OA / referred pain', 'lumbar radiculopathy L5/S1'],
    pitfalls: ['仅 diagnose bursitis 而 miss underlying tendon tear', '未用 coronal oblique 漏诊 partial tear', '将 hip OA 疼痛误归因于 bursitis alone'],
    pearls: ['Trendelenburg + MRI tendon tear 为关键组合', 'bursitis 常为 secondary finding', 'coronal oblique MRI 为 abductor 评估必扫序列']
  },

  subscap: {
    overview: '肩胛下肌为 rotator cuff 前侧结构，tear 较 supraspinatus 少见但功能重要；upper 60% tear 影响 internal rotation，常合并 LHB subluxation。',
    epi: '见于 trauma（fall on outstretched hand）、chronic cuff degeneration 及 anterior shoulder dislocation 后；upper subscapularis tear 临床意义最大。',
    pathophys: 'subscapularis tendon 自 lesser tuberosity 撕脱或 intra-substance tear；upper fiber tear 可致 LHB 失去 pulley 约束而 anterior subluxation，加速 anterior instability 及 cuff 功能丧失。',
    clinical: [
      'anterior shoulder pain，internal rotation 抗阻 weakness',
      'lift-off test、belly-press test、bear hug test 阳性',
      'LHB subluxation 时 anterior shoulder "snapping"',
      'massive tear 可致 increased external rotation（terrible triad 组分）',
      'night pain 及 overhead activity 受限'
    ],
    staging: 'Partial vs full-thickness；Lafosse 分型及 fatty infiltration（Goutallier）；需评估 LHB 及 pulley integrity。',
    imagingKeys: [
      ['subscapularis tendon discontinuity', 'sagittal oblique T2 见 fluid cleft 跨越 tendon，upper fiber 最常受累'],
      ['LHB subluxation 及 pulley lesion', 'LHB 脱位至 subscapularis 浅面，SGHL/CHL pulley tear 为 associated finding'],
      ['muscle retraction 与 fatty infiltration', 'chronic tear 见 muscle belly 回缩及 T1 高 signal fatty infiltration，影响 repair 可行性']
    ],
    modalities: [
      ['MRI', '首选，sagittal oblique 及 axial 评估 subscap tear、LHB 及 pulley'],
      ['US', 'anterior cuff 评估 sensitivity 低于 MRI，operator-dependent'],
      ['CT arthrography', 'tear 轮廓及 glenoid 骨性 detail，MRI contraindication 时备选']
    ],
    mgmt: [
      'Symptomatic partial tear：PT 及 activity modification',
      'Full-thickness 或 functional deficit： arthroscopic/open repair',
      'LHB subluxation 常同期 tenodesis/tenotomy',
      'Massive irreparable：latissimus dorsi transfer 或 reverse TSA 评估'
    ],
    ddx: ['孤立 supraspinatus tear', 'frozen shoulder / adhesive capsulitis', 'anterior labral tear 孤立'],
    pitfalls: ['仅关注 supraspinatus 漏诊 subscap upper tear', '忽略 LHB subluxation 为 subscap tear 线索', 'fatty infiltration 未评导致 unrealistic repair 期望'],
    pearls: ['lift-off test 为 subscap 功能关键 clinical test', 'sagittal oblique MRI 显示 upper subscap 最佳', 'LHB subluxation 强烈提示 subscap 及 pulley 损伤']
  },

  infraspinatus: {
    overview: '冈下肌为 posterior rotator cuff 主要 external rotator，tear 常 extension 自 supraspinatus 或 isolated；MRI 评估 tear size、retraction 及 muscle quality。',
    epi: '多见于 elderly degenerative cuff disease；isolated infraspinatus tear 相对少见；overhead 及 throwing athlete 亦可见 acute tear。',
    pathophys: 'cuff 退变或 trauma 致 infraspinatus tendon 部分/完全 tear；posterior extension 影响 external rotation strength；chronic 可致 muscle atrophy 及 superior migration 加剧。',
    clinical: [
      'posterior shoulder pain，night pain 常见',
      'external rotation 抗阻 weakness（尤其 0° abduction 位）',
      'massive tear 可伴 drop arm 及 overhead weakness',
      'hornblower sign 阳性提示 teres minor/infraspinatus 功能丧失',
      '常合并 supraspinatus 及 subscapularis tear'
    ],
    staging: 'Cofield 按 tear size（small/medium/large/massive）；Goutallier 评估 fatty infiltration；retraction 按 Patte stage 分级。',
    imagingKeys: [
      ['infraspinatus fiber discontinuity', 'T2 高 signal fluid cleft 跨越 tendon insertion 于 greater tuberosity posterior facet'],
      ['tear retraction 及 size 测量', 'sagittal oblique 测量 AP dimension 及 retraction至 glenoid level，指导 repair strategy'],
      ['muscle atrophy 与 fatty infiltration', 'T1 见 muscle volume 减小及 fatty streaking，Goutallier grade≥2 提示 repair 后 re-tear 风险高']
    ],
    modalities: [
      ['MRI', '金标准，评估 tear 形态、retraction、muscle quality 及 concomitant cuff tears'],
      ['US', 'posterior cuff 可见 hypoechoic defect，适合 follow-up 及 injection guidance'],
      ['X线', '评估 AC joint OA、 acromial spur 及 humeral head superior migration']
    ],
    mgmt: [
      'Small/medium symptomatic tear： arthroscopic repair',
      'Partial tear 及 low demand：PT 及 corticosteroid injection 可选',
      'Massive irreparable：reverse TSA 或 tendon transfer 评估',
      'Post-op progressive ROM 及 rotator cuff strengthening protocol'
    ],
    ddx: ['PM tear（极罕见）', 'posterior labral tear 孤立', 'quadrilateral space syndrome'],
    pitfalls: ['isolated infraspinatus tear 诊断需排除 infraspinatus 为主的其他 pathology', '忽略 fatty infiltration 对 repair 预后影响', '将 normal variant 小裂隙误判为 tear'],
    pearls: ['external rotation weakness 为关键 clinical clue', 'tear size + retraction + Goutallier 决定 surgical plan', 'posterior cuff 常需与 supraspinatus 一并评估']
  },

  'teres-minor': {
    overview: '小圆肌为 posterior cuff 组分，isolated tear 罕见；external rotation 功能与 infraspinatus 重叠，需与 quadrilateral space syndrome 鉴别。',
    epi: '多见于 posterior cuff extension tear 或 trauma；isolated teres minor tear 极少；overhead athlete 及 elderly 均可受累。',
    pathophys: 'teres minor tendon 自 greater tuberosity inferior facet 撕脱或 intra-substance tear；isolated 功能 deficit 可表现为 hornblower sign 阳性；与 axillary nerve 病变需鉴别。',
    clinical: [
      'posterior shoulder pain，external rotation 轻度 weakness',
      'isolated teres minor tear：hornblower sign 可阳性',
      'quadrilateral space syndrome：night pain 及 paresthesia lateral arm',
      '通常合并 infraspinatus 或其他 cuff tear',
      'trauma 后 acute posterior pain 及 ROM 受限'
    ],
    staging: 'Partial vs full-thickness tear；需记录是否 isolated 或 extension from larger cuff tear；quadrilateral space 需单独评估 nerve/vessel。',
    imagingKeys: [
      ['teres minor tendon discontinuity', 'MRI axial/sagittal oblique 见 inferior facet insertion 区 fluid cleft 或 fiber 中断'],
      ['hornblower 相关 muscle edema', 'acute tear 见 teres minor muscle belly T2 高 signal edema，chronic 见 atrophy'],
      ['quadrilateral space 结构评估', '需排除 axillary nerve edema、 fibrosis 及 space 内 mass 导致 secondary teres minor 异常 signal']
    ],
    modalities: [
      ['MRI', '首选，评估 teres minor tear、quadrilateral space 及 axillary nerve'],
      ['US', 'posterior cuff 评估 limited，teres minor 深在不易完整显示'],
      ['X线', '通常 normal，排除 posterior dislocation sequela']
    ],
    mgmt: [
      'Isolated partial tear：conservative PT 及 ROM 维护',
      'Symptomatic full-thickness： arthroscopic repair（常同期其他 cuff repair）',
      'Quadrilateral space syndrome：decompression 及 activity modification',
      'Axillary nerve injury：EMG 确认及 nerve 专项 rehab'
    ],
    ddx: ['infraspinatus tear', 'axillary nerve palsy / quadrilateral space syndrome', 'posterior labral tear'],
    pitfalls: ['isolated teres minor tear 为 diagnosis of exclusion', '将 quadrilateral space syndrome 误为 pure muscle tear', 'US 漏诊 deep posterior cuff'],
    pearls: ['isolated teres minor tear 极罕见，需全面 cuff 评估', 'hornblower sign 提示 posterior cuff 功能丧失', 'MRI 需包括 quadrilateral space 区域']
  },

  deltoid: {
    overview: '三角肌撕裂多见于 direct trauma 或 post-surgical dehiscence，影响 shoulder abduction 及 contour；MRI 可定位 tear 平面及评估 retraction。',
    epi: '相对 rare；见于 high-energy trauma、 iatrogenic（post-surgery）及 steroid injection 后；anterior/middle fibers 较 posterior 更易 tear。',
    pathophys: 'direct blow 或 eccentric overload 致 deltoid muscle fiber 或 musculotendinous junction tear；complete tear 可致 visible deformity 及 abduction paralysis（需排除 axillary nerve injury）。',
    clinical: [
      'acute shoulder pain 及 swelling  post-trauma',
      'shoulder contour 改变，abduction weakness 明显',
      'Palpable gap 或 hematoma over deltoid',
      '需评估 axillary nerve：sensation over regimental badge area',
      'post-surgical：wound dehiscence 及 sudden loss of abduction'
    ],
    staging: 'Partial vs complete tear；按 fiber involvement（anterior/middle/posterior）；需评估 associated fracture 及 nerve injury。',
    imagingKeys: [
      ['deltoid fiber gap 及 hematoma', 'T2/STIR 见 muscle 内高信号 hematoma 伴 fiber discontinuity，可定位 tear level'],
      ['muscle retraction 及断端间距', 'complete tear 时 muscle belly 回缩，测量间距指导 surgical repair timing'],
      ['axillary nerve 及 adjacent 结构', 'MRI neurogram 或 STIR 见 nerve edema 提示 concomitant axillary neuropathy，改变 management']
    ],
    modalities: [
      ['MRI', '首选，评估 tear 范围、hematoma、retraction 及 nerve 状态'],
      ['US', 'dynamic abduction 可见 fiber gap，适合 bedside 及 follow-up'],
      ['X线', '排除 humerus/neck fracture 及 shoulder dislocation']
    ],
    mgmt: [
      'Partial tear： sling、early gentle ROM 及 progressive strengthening',
      'Acute complete tear（尤其 young/active）：early surgical repair',
      'Axillary nerve injury：EMG 及 nerve 专项 management',
      'Chronic tear with functional deficit： reconstruction 或 tendon transfer 评估'
    ],
    ddx: ['rotator cuff tear', 'axillary nerve palsy', 'shoulder dislocation / fracture'],
    pitfalls: ['focus on cuff 而 miss deltoid tear', '未评估 axillary nerve 导致 missed concomitant neuropathy', 'delayed repair 因 retraction 及 fibrosis 困难'],
    pearls: ['contour change + abduction weakness 提示 deltoid tear', 'early complete tear repair 预后最佳', '必须排除 axillary nerve injury']
  },

  'biceps-long': {
    overview: '肱二头肌长头腱（LHB）病变包括 tendinopathy、partial/complete tear 及 instability；与 SLAP、 pulley lesion 密切相关，anterior shoulder pain 常见。',
    epi: 'overhead athlete（游泳、投掷）、elderly degenerative rupture；LHB tendinopathy 常与 rotator cuff 及 SLAP 共存；pulley lesion 见于 younger patient。',
    pathophys: 'LHB 在 bicipital groove 内反复 microtrauma 致 tendinopathy 或 tear；SGHL/CHL pulley disruption 致 LHB instability 及 groove 外 subluxation；SLAP tear 累及 biceps anchor。',
    clinical: [
      'anterior shoulder pain，overhead 及 lifting 加重',
      'Speed test、Yergason test 可阳性',
      'Complete LHB rupture：groove 空虚、 Popeye deformity（需与 distal rupture 区分）',
      'LHB instability：groove 处 clicking 及 anterior pain',
      '合并 cuff/SLAP 时 night pain 及 weakness'
    ],
    staging: 'Partial vs complete LHB tear；SLAP Snyder I–IV 分型；pulley lesion 按 Habermeyer 分级；groove tendinopathy 按 severity。',
    imagingKeys: [
      ['LHB groove 内 signal 及形态', 'T2 高 signal tendinopathy、tenosynovitis 或 partial tear；groove 外 tendon 提示 instability'],
      ['pulley lesion（SGHL/CHL）', 'coronal oblique 见 pulley 不连续及 LHB medial subluxation，为 anterior pain 重要 cause'],
      ['SLAP 及 biceps anchor', 'superior labrum fluid cleft 延伸至 biceps anchor，MRA  sensitivity 更高']
    ],
    modalities: [
      ['MRI', '评估 LHB tear、tendinopathy、pulley 及 SLAP；MR arthrography 提高 SLAP sensitivity'],
      ['US', 'dynamic 扫查 LHB groove stability 及 tendon integrity，适合 injection guidance'],
      ['X线', 'groove spurring、 calcification 及 humeral head 形态']
    ],
    mgmt: [
      'Conservative tendinopathy：PT、activity modification 及 injection',
      'Symptomatic LHB tear / instability：tenodesis 或 tenotomy（常 arthroscopic）',
      'SLAP II 年轻 athlete：labral repair ± biceps tenodesis',
      'Pulley lesion 伴 instability：arthroscopic pulley repair'
    ],
    ddx: ['subscapularis tear', 'AC joint pathology', 'anterior impingement 孤立'],
    pitfalls: ['Popeye deformity 误归因 LHB 而实为 distal biceps rupture', 'miss pulley lesion 导致 persistent instability', 'normal sublabral recess 误判 SLAP'],
    pearls: ['groove 外 LHB 为 pulley tear 关键征象', 'tenodesis 为 active patient 常用方案', 'MRA 提高 SLAP 及 anchor 评估 accuracy']
  },

  'biceps-dist': {
    overview: '远端肱二头肌 tendon rupture 见于 eccentric load（weightlifting），致 Popeye deformity 及 supination weakness；early repair 预后最佳。',
    epi: '40–50 岁 male 多见，weightlifting 及 manual labor；smoking 及 steroid use 为 risk factor；complete rupture 远多于 partial。',
    pathophys: 'distal biceps tendon 自 radial tuberosity avulsion；lacertus fibrosus 可部分代偿使 partial tear 或 complete tear 临床表现不典型；chronic 未修可致 supination/endurance 永久 loss。',
    clinical: [
      'antecubital sudden pop 及 acute pain post-eccentric load',
      'Popeye deformity：proximal muscle belly 隆起',
      'Supination weakness，hook test 阳性（complete tear）',
      'Partial tear：pain 及 weakness 较轻，hook test 可能假阴性',
      'Ecchymosis 沿 medial forearm 分布'
    ],
    staging: 'Complete vs partial tear；需评估 lacertus fibrosus integrity 及 tendon retraction；chronic >4–6 weeks 为 delayed presentation。',
    imagingKeys: [
      ['distal tendon gap 及 retraction', 'MRI/Sagittal 见 radial tuberosity 无 tendon 附着，retracted stump 于 mid-arm'],
      ['muscle edema 及 hematoma', 'acute T2 高 signal edema 沿 biceps muscle，antecubital fossa hematoma'],
      ['partial tear 及 lacertus 状态', 'T2 见 tendon 部分 continuity 及 peritendinous edema，lacertus 完整可 mask complete tear clinically']
    ],
    modalities: [
      ['MRI', '评估 complete/partial tear、retraction 及 muscle quality，pre-op planning'],
      ['US', 'dynamic 可见 tendon discontinuity，hook test adjunct 及 guided assessment'],
      ['X线', '通常 normal；rare radial tuberosity avulsion fragment']
    ],
    mgmt: [
      'Complete tear（active patient）：early surgical repair（<3 weeks 理想）',
      'Partial tear symptomatic：conservative 或 repair  individualized',
      'Chronic rupture：tendon graft reconstruction',
      'Post-op protected supination/pronation ROM 及 progressive strengthening'
    ],
    ddx: ['partial tear / tendinopathy', 'brachialis injury', 'antecubital bursitis'],
    pitfalls: ['hook test 假阴性致 missed complete tear', 'delayed repair 因 retraction 及 scarring 需 graft', '将 brachialis tear 误为 biceps'],
    pearls: ['hook test 为 complete tear 重要 bedside test', 'early repair（<3 weeks）恢复 supination strength 最佳', 'MRI 对 partial tear 及 retraction 评估 essential']
  },

  triceps: {
    overview: '肱三头肌 rupture 相对 rare，见于 weightlifting 或 fall on outstretched hand；extension weakness 及 posterior arm gap 为线索，可合并 olecranon avulsion。',
    epi: 'male weightlifter、fall trauma 及 anabolic steroid use；olecranon insertion avulsion 与 musculotendinous junction tear 均可发生。',
    pathophys: 'eccentric flexion force 或 direct trauma 致 triceps tendon/muscle tear；complete tear 致 extension 功能丧失；olecranon avulsion 可伴 bony fragment。',
    clinical: [
      'posterior arm acute pain 及 swelling post-trauma',
      'Active extension weakness against gravity',
      'Palpable gap above olecranon（complete tear）',
      'Ecchymosis posterior arm，passive flexion 疼痛',
      'Olecranon avulsion：extension block 及 palpable fragment'
    ],
    staging: 'Partial vs complete tear；musculotendinous vs olecranon insertion avulsion；需评估 associated olecranon fracture 及 ulnar nerve。',
    imagingKeys: [
      ['triceps tendon discontinuity', 'MRI sagittal 见 olecranon 上方 tendon 中断及 fluid-filled gap'],
      ['olecranon avulsion fragment', 'X线/CT 见 olecranon tip avulsion，MRI 见 bone edema 及 tendon-bone interface tear'],
      ['muscle retraction 及 hematoma', 'complete tear 见 muscle belly 回缩及 posterior compartment hematoma']
    ],
    modalities: [
      ['MRI', '评估 tear level、complete/partial 及 associated olecranon injury'],
      ['US', 'dynamic extension 可见 tendon gap，bedside 辅助诊断'],
      ['X线', 'olecranon avulsion fragment 及 associated fracture']
    ],
    mgmt: [
      'Complete tear：early surgical repair（direct suture 或 anchor）',
      'Partial tear：conservative 或 repair 依 function demand',
      'Olecranon avulsion：ORIF 固定 bony fragment 及 tendon',
      'Post-op extension ROM 及 progressive strengthening protocol'
    ],
    ddx: ['olecranon fracture 孤立', 'posterior arm contusion', 'olecranon bursitis'],
    pitfalls: ['rare 病变易 misdiagnose 为 contusion', 'miss olecranon avulsion fragment on X线', 'delayed presentation 因 retraction 增加 repair 难度'],
    pearls: ['extension weakness against gravity 为 complete tear 关键 sign', 'X线必查 olecranon avulsion', 'complete tear 应 early surgical repair']
  },

  'pec-major': {
    overview: '胸大肌 rupture 多见于 bench press eccentric overload，sternal head 最常 tear；致 chest asymmetry、adduction weakness 及 cosmetic concern。',
    epi: 'weightlifter 20–40 岁 male 为主；sternocostal head musculotendinous junction 最常见；steroid use 为 risk factor。',
    pathophys: 'eccentric stretch during bench press 致 sternal head tendon 自 humerus insertion 撕脱；complete tear 见 muscle retraction 及 ecchymosis；clavicular head 较少单独 tear。',
    clinical: [
      'bench press 时 sudden pop 及 anterior chest pain',
      'Chest bruising 及 asymmetric contour（"gap" sign）',
      'Horizontal adduction 及 internal rotation weakness',
      'Palpable defect over lateral chest wall',
      'Cosmetic deformity 为 common surgical indication'
    ],
    staging: 'Partial vs complete tear；按 head involvement（sternal vs clavicular）；需测量 retraction 及 muscle quality。',
    imagingKeys: [
      ['pectoralis muscle retraction 及 gap', 'MRI axial 见 sternal head 回缩至 chest wall，humerus insertion 空虚'],
      ['sternocostal head tear 定位', 'T2 高 signal 沿 tear plane，区分 musculotendinous vs humeral insertion avulsion'],
      ['associated hematoma 及 edema', 'acute T2 高 signal hematoma 沿 tear plane 延伸至 axilla，有助于确定 injury acuity']
    ],
    modalities: [
      ['MRI', '首选，评估 tear 范围、retraction 及 pre-op planning'],
      ['US', '可见 muscle-tendon gap 及 hematoma，适合 athlete bedside 评估'],
      ['X线', '通常 normal，排除 rib fracture 及 humeral avulsion fragment']
    ],
    mgmt: [
      'Complete sternal head tear（athlete/high demand）：early surgical repair',
      'Partial tear 或 low demand：conservative PT 及 activity modification',
      'Chronic tear：reconstruction with graft 或 accept deformity',
      'Post-op protected ROM 及 progressive chest strengthening'
    ],
    ddx: ['pectoralis minor strain', 'rib fracture / costochondritis', ' anterior shoulder pathology'],
    pitfalls: ['focus on shoulder cuff 而 miss pec tear', 'delayed repair 因 retraction 及 scar 困难', 'partial tear 低估 cosmetic 及 functional impact'],
    pearls: ['bench press eccentric 为 classic mechanism', 'MRI retraction 测量指导 surgery timing', 'young athlete complete tear 应 early repair']
  },

  extensor: {
    overview: '伸指/伸腕肌腱撕裂可因 open laceration、closed trauma 或 RA attrition 所致；zone-specific 定位决定 treatment，US dynamic 评估 essential。',
    epi: 'trauma（glass/knife injury）、RA attrition over ulnar head（ECU/EIP）、sport-related closed rupture；zone I–VIII 分布决定 prognosis。',
    pathophys: 'direct laceration 或 chronic attrition 致 extensor tendon discontinuity；sagittal band rupture 致 extensor subluxation；closed rupture 常见于 inflammatory 或 steroid-related。',
    clinical: [
      'Drop finger：MCP 或 IP 无法主动 extension',
      'Open injury：visible tendon transaction 及 wound',
      'RA attrition：gradual loss of extension over ulnar styloid',
      'Extensor subluxation：MCP flexion 时 tendon 偏位',
      'Associated fracture / dislocation 需同步评估'
    ],
    staging: 'Verdan zone I–VIII 定位 tear level；partial vs complete；chronic vs acute；RA 需评估 overall joint destruction。',
    imagingKeys: [
      ['extensor tendon discontinuity', 'MRI/US 见 tendon gap 及 retracted stump，定位 zone 及是否 multi-level involvement'],
      ['sagittal band rupture 及 subluxation', 'dynamic US 见 MCP flexion 时 extensor 脱位至 ulnar/radial，致 extension lag'],
      ['associated bone/joint injury', 'X线/MRI 见 phalanx fracture、 dislocation 或 RA erosive change 为 tear 原因或合并症']
    ],
    modalities: [
      ['US', 'dynamic extension 测试 tendon continuity，首选 closed injury 及 RA attrition 评估'],
      ['MRI', 'occult closed rupture、deep level tear 及 associated soft tissue/bone injury'],
      ['X线', 'fracture、 dislocation 及 RA joint destruction']
    ],
    mgmt: [
      'Acute open laceration：primary tendon repair within 7–10 days',
      'Closed rupture：splinting 及 early repair 或 tendon transfer（chronic）',
      'RA attrition：medical management + tendon reconstruction/transfer',
      'Sagittal band rupture：repair 防止 chronic subluxation']
    ,
    ddx: ['radial/ posterior interosseous nerve palsy', 'swan neck deformity（非 tear）', 'joint contracture / stiffness'],
    pitfalls: ['multi-level extensor injury 仅修一处', 'miss sagittal band rupture 致 chronic subluxation', 'nerve palsy 误为 tendon rupture'],
    pearls: ['US dynamic test 为 closed rupture 关键', 'zone 定位决定 repair approach', 'RA attrition 需 systemic + local treatment']
  },

  plantaris: {
    overview: 'Plantaris tendon rupture 可为 tennis leg 组成部分或 isolated injury；细腱于 medial gastroc 区域 rupture，symptoms 可 mild 至 moderate。',
    epi: 'middle-aged recreational athlete；约 7–20% 人群 plantaris absent；常与 gastrocnemius tear 合并，亦可 isolated。',
    pathophys: 'plantaris 为细 long tendon，rapid dorsiflexion 时承受 stretch 致 midsubstance 或 proximal rupture；hematoma 沿 medial calf fascial plane tracking。',
    clinical: [
      'Sudden medial calf pain，可较 gastroc tear 轻',
      'Localized tenderness medial gastroc region',
      'Plantarflexion 通常保留（与 Achilles rupture 鉴别）',
      'Swelling 及 ecchymosis 可变，isolated 时 milder',
      '常合并 gastrocnemius tear 的 classic tennis leg presentation'
    ],
    staging: 'Isolated vs combined with gastroc/soleus tear；partial vs complete plantaris rupture；需评估 DVT。',
    imagingKeys: [
      ['plantaris tendon gap', 'MRI/US 见 thin tendon discontinuity，proximal stump 回缩呈 coiled "serpent" 征'],
      ['gastrocnemius association', 'combined injury 见 medial gastroc junction edema 及 plantaris fluid tracking 平行分布'],
      ['fascial plane fluid tracking', 'T2 高信号沿 medial fascial plane 延伸，区别于 soleus deep tear 及 DVT']
    ],
    modalities: [
      ['US', '首选，high-resolution 显示 plantaris gap 及 coiled stump，同时 Doppler 排除 DVT'],
      ['MRI', 'combined injury 评估 gastroc/soleus 范围及 occult plantaris rupture'],
      ['X线', '通常 normal，排除 calcific myonecrosis']
    ],
    mgmt: [
      'Conservative management 为主，同 gastroc strain protocol',
      'Heel wedge 及 progressive calf rehabilitation',
      'Exclude DVT before aggressive mobilization',
      'Symptoms 通常 4–8 周缓解，rarely 需 surgery'
    ],
    ddx: ['DVT', 'gastrocnemius tear alone', 'soleus deep tear'],
    pitfalls: ['plantaris absent 为 normal variant 勿误判 pathology', '未 exclude DVT', 'ignore combined gastroc injury 仅 label plantaris'],
    pearls: ['plantaris coiled stump 为 US 特征征', '常与 gastroc tear 并存', 'conservative treatment 几乎 always sufficient']
  },

  'supraspinatus-calc': {
    overview: '肩袖钙化性肌腱炎为 hydroxyapatite 沉积于 supraspinatus 等 tendon，resorptive phase 可致 acute severe pain；X线 及 US 为关键诊断手段。',
    epi: '30–50 岁多见，diabetic 及 thyroid disorder 关联；supraspinatus 最常见，亦可见 infraspinatus、 subscapularis；女性略多。',
    pathophys: 'calcium hydroxyapatite 沉积经历 formative→resting→resorptive→post-calcific 阶段；resorptive phase 因 granulomatous reaction 致 acute inflammatory pain 及 bursitis。',
    clinical: [
      'Resting/resorptive phase：acute severe shoulder pain，ROM 明显受限',
      'Formative/resting phase：chronic mild discomfort 或 asymptomatic',
      'Localized tenderness over greater tuberosity',
      'Night pain 及 overhead activity  intolerance（resorptive phase）',
      '可 mimic septic bursitis 或 acute cuff tear clinically'
    ],
    staging: 'Gärtner 分型：I formative、II resting、III resorptive（cloud-like）、IV post-calcific；需记录 calcification size 及 bursal extension。',
    imagingKeys: [
      ['supraspinatus calcific focus', 'X线/CT 见 tendon 内 dense calcification，typical 5–15 mm；US 为 hyperechoic with shadowing'],
      ['resorptive phase cloud sign', 'X线 calcification 边缘模糊呈 cloud-like；MRI 见 surrounding edema 及 bursitis'],
      ['bursal extension 及 subacromial bursitis', 'MRI 见 subacromial-subdeltoid bursa distension 及 calcification 邻近 bursal reaction']
    ],
    modalities: [
      ['X线', '首选筛查，显示 calcification size、location 及 cloud sign（resorptive phase）'],
      ['US', 'hyperechoic deposit、shadowing 及 needle lavage guidance；dynamic 评估 bursitis'],
      ['MRI', 'resorptive phase edema 范围、bursitis 及 exclude cuff tear/infection']
    ],
    mgmt: [
      'Acute resorptive phase：NSAID、rest 及 subacromial injection',
      'US-guided needle lavage/barbotage 为 effective minimally invasive treatment',
      'Refractory：arthroscopic calcification debridement',
      'Chronic asymptomatic calcification：observe，无需 routine excision']
    ,
    ddx: ['septic bursitis / septic arthritis', 'acute cuff tear', 'gouty tophus deposition'],
    pitfalls: ['resorptive phase severe pain 误疑 infection 而过度 antibiotic', '仅 MRI 无 X线 漏诊 calcification', '将 normal enthesophyte 误为 calcific tendinitis'],
    pearls: ['X线 为 calcific tendinitis 首选 diagnostic test', 'resorptive phase（cloud sign）疼痛最重', 'US-guided lavage 循证有效且微创']
  },

  mallet: {
    overview: 'Mallet finger 为 extensor tendon terminal slip rupture at DIP，分 bony 及 soft tissue 型；continuous DIP extension splinting 为 cornerstone treatment。',
    epi: 'ball sports、work-related finger stub 及 crush injury；male 略多；ring finger 最常见；bony avulsion 约占 50%。',
    pathophys: 'forced flexion of extended DIP 致 terminal extensor tendon avulsion；large bony fragment 可致 volar subluxation 及 joint incongruity； untreated 致 swan neck deformity。',
    clinical: [
      'DIP 主动 extension 不能，resting flexion deformity',
      'Dorsal DIP tenderness 及 swelling post-trauma',
      'Bony type：lateral X线 见 dorsal avulsion fragment',
      'Volar subluxation 提示 unstable injury 需 surgery 评估',
      'Open injury 需排除 nail bed / germinal matrix involvement']
    ,
    staging: 'Soft tissue vs bony mallet；fragment >30–50% articular surface 或 volar subluxation 为 surgical indication；chronic >8 weeks 为 delayed。',
    imagingKeys: [
      ['DIP flexion deformity 及 extensor lag', 'clinical 为主；US/MRI 见 terminal tendon discontinuity at middle phalanx base dorsum'],
      ['bony avulsion fragment size', 'lateral X线 测量 fragment 占 joint surface 比例，>30–50% 考虑 ORIF'],
      ['volar subluxation of DIP', 'lateral X线 见 middle phalanx base 向 palmar 移位，提示 unstable bony mallet 需 surgery']
    ],
    modalities: [
      ['X线', '首选，评估 bony avulsion fragment size 及 volar subluxation'],
      ['US', 'extensor terminal tendon gap 及 avulsion site，适合 soft tissue mallet 确认'],
      ['MRI', 'occult bony injury、 tendon retraction 及 associated phalangeal fracture']
    ],
    mgmt: [
      'Continuous DIP extension splinting 6–8 weeks（soft tissue 及 most bony）',
      'Large bony fragment 或 volar subluxation：ORIF with pin/screw',
      'Open injury：tendon repair ± fracture fixation',
      'Chronic mallet：fusion 或 tendon reconstruction 依 function/cosmetic demand']
    ,
    ddx: ['swan neck deformity（其他 cause）', 'DIP fracture unrelated to extensor avulsion', 'DIP joint arthritis'],
    pitfalls: ['splint 仅 immobilize PIP 而非 DIP', 'skin necrosis from excessive splint pressure', 'volar subluxation 未识别致 chronic incongruity'],
    pearls: ['splint 必须 continuous DIP extension（允许 PIP 活动）', 'bony fragment >30–50% 或 subluxation 考虑 ORIF', 'compliance 为 treatment success 关键']
  },

  'volar-plate': {
    overview: '掌侧板（volar plate）损伤为 PIP joint hyperextension 所致 avulsion，常合并 collateral ligament sprain；需评估 PIP stability 及 subluxation。',
    epi: 'ball sports finger jamming、fall on hand 及 fight bite mechanism；middle finger 常见；PIP joint 最常受累。',
    pathophys: 'hyperextension 致 volar plate proximal attachment avulsion 及 possible avulsion fracture；collateral ligament 同步 injury； unstable PIP 可致 dorsal subluxation 及 chronic swan neck。',
    clinical: [
      'PIP joint swelling 及 dorsal tenderness post-jamming',
      'PIP flexion contracture（chronic）及 lateral instability',
      'Collateral stress test 阳性提示 combined ligament injury',
      'Unstable PIP：dorsal subluxation 及 extension block',
      'Chronic：swan neck deformity 及 grip weakness']
    ,
    staging: 'Stable vs unstable PIP；avulsion fracture size；collateral ligament grade I–III；chronic swan neck sequela。',
    imagingKeys: [
      ['volar plate avulsion 及 edema', 'MRI 见 volar plate proximal attachment T2 高 signal tear 及 surrounding edema'],
      ['collateral ligament injury', 'coronal/coronal oblique MRI 见 RCL/UCL sprain 或 tear 伴 PIP joint effusion'],
      ['PIP volar/dorsal subluxation', 'lateral X线 及 MRI 见 middle phalanx base 相对于 proximal phalanx 移位，提示 unstable injury']
    ],
    modalities: [
      ['X线', 'volar plate avulsion fragment 及 PIP alignment/sub luxation 评估'],
      ['MRI', 'volar plate、 collateral ligament 及 occult fracture 全面评估，unstable injury pre-op'],
      ['US', 'dynamic stability testing 及 volar plate tear，适合 selected cases']
    ],
    mgmt: [
      'Stable injury：buddy splint 或 extension block splint 1–3 weeks + early ROM',
      'Unstable PIP subluxation：surgical volar plate repair ± collateral reconstruction',
      'Large avulsion fragment：ORIF',
      'Chronic swan neck：reconstruction 及 PT']
    ,
    ddx: ['central slip injury / boutonniere', 'PIP fracture-dislocation', 'simple PIP sprain'],
    pitfalls: ['miss collateral ligament combined injury', 'stable vs unstable 判断不足致 chronic subluxation', 'over-splinting 致 stiffness'],
    pearls: ['MRI 为 unstable PIP 最佳 pre-op assessment', 'volar plate + collateral 常合并损伤', 'early protected motion 对 stable injury 重要']
  },

  'central-slip': {
    overview: 'Central slip（central band）extensor injury at PIP zone III 可致 boutonniere deformity if missed；splint PIP extension/MCP flexion 为 acute treatment 核心。',
    epi: 'PIP laceration、puncture wound、RA 及 blunt trauma；zone III 为 anatomic danger zone；delayed diagnosis 致 permanent boutonniere。',
    pathophys: 'central slip disruption 致 lateral bands 向 volar migrate；PIP 失去 dorsal extension force 而 flex；chronic 形成 boutonniere（PIP flex + DIP hyperextension）。',
    clinical: [
      'PIP swelling post-trauma 或 laceration over dorsum',
      'PIP extension lag（主动 extension 不足）',
      'Late：boutonniere deformity（PIP flexion + DIP extension）',
      'Open injury：visible central slip transaction',
      'RA patient：multiple tendon involvement 及 ulnar drift']
    ,
    staging: 'Acute vs chronic boutonniere；partial vs complete central slip tear；open vs closed injury。',
    imagingKeys: [
      ['central slip discontinuity', 'MRI 见 middle phalanx base dorsum central band T2 高 signal tear 或 fiber 中断'],
      ['lateral band volar subluxation', 'sagittal MRI 见 lateral bands 移位至 PIP 轴心 palmar侧，为 boutonniere 早期 sign'],
      ['boutonniere deformity 相关 change', 'chronic 见 PIP flexion contracture 及 DIP hyperextension 相关 soft tissue adaptation']
    ],
    modalities: [
      ['MRI', 'occult closed central slip tear 及 boutonniere 早期 lateral band migration'],
      ['US', 'extensor mechanism over PIP dynamic assessment，closed injury adjunct'],
      ['X线', 'associated phalanx fracture 及 PIP alignment']
    ],
    mgmt: [
      'Acute closed tear：splint PIP full extension（MCP free flexion）6 weeks',
      'Open laceration：primary central slip repair',
      'Chronic boutonniere：reconstruction（central slip advancement、 lateral band procedure）',
      'RA：medical management + selective tendon reconstruction']
    ,
    ddx: ['volar plate injury', 'simple PIP sprain', 'boutonniere from other cause（RA）'],
    pitfalls: ['miss central slip 致 preventable boutonniere', 'splint 错误 immobilize MCP 而非 PIP extension', 'closed injury 因 swelling 低估 extensor injury'],
    pearls: ['splint PIP extension + MCP flexion 为 classic protocol', 'boutonniere 为 missed central slip 的 sequela', 'MRI 对 occult closed tear 有价值']
  },

  mortons: {
    overview: 'Morton 神经瘤为 plantar digital nerve 纤维增生及 perineural fibrosis，第三 web space 最常见；metatarsalgia 及 burning pain 为典型表现。',
    epi: '40–60 岁 female 多见，tight/narrow shoes 及 forefoot overload；第二、三 web space 最常见（third  classic）；bilateral 可发生。',
    pathophys: 'interdigital nerve 于 transverse metatarsal ligament 下方 entrapment 及 repetitive trauma 致 perineural fibrosis 及 pseudo-tumor formation；非 true neoplasm。',
    clinical: [
      'Forefoot burning/ shooting pain radiating to toes',
      'Mulder click：squeezing metatarsal heads 时 palpable/painful click',
      'Pain worsened by narrow shoes 及 walking',
      'Numbness between affected toes',
      'Relief with shoe removal 及 massaging forefoot']
    ,
    staging: '按 US/MRI 测量 "neuroma" size（通常 <10 mm）；grade symptom severity；bilateral vs unilateral。',
    imagingKeys: [
      ['interdigital pseudo-mass', 'US 见 web space hypoechoic ovoid mass；MRI T1 低、T2 中高 signal 于 metatarsal head level'],
      ['Mulder click 相关 displacement', 'dynamic US 见 squeezing metatarsal heads 时 mass 向 dorsum 移动（Mulder sign 影像对应）'],
      ['third web space 经典定位', ' lesion 位于 third intermetatarsal space（M3–M4 web），需与 second space 及 stress fracture 定位区分']
    ],
    modalities: [
      ['US', '首选 diagnostic imaging，dynamic Mulder maneuver 提高 accuracy，引导 injection'],
      ['MRI', 'occult neuroma、 size 测量及 pre-operative planning，排除 stress fracture'],
      ['X线', 'exclude metatarsal stress fracture 及 MTP joint OA']
    ],
    mgmt: [
      'Conservative：wider toe box shoes、 metatarsal pad 及 orthotics',
      'US-guided corticosteroid injection',
      'Refractory：neurectomy 或 minimally invasive decompression',
      'Avoid repeated high-heel/narrow shoe use']
    ,
    ddx: ['metatarsalgia / MTP synovitis', 'metatarsal stress fracture', 'interdigital bursitis'],
    pitfalls: ['clinical diagnosis 为主，imaging 为 confirmatory', 'second/third space 定位错误', 'stress fracture 未排除'],
    pearls: ['Mulder click 为 highly specific clinical test', 'US 为 cost-effective diagnostic tool', 'third web space 为 classic location']
  },

  'os-trigonum': {
    overview: 'Os trigonum 为 lateral tubercle of talus 未融合 accessory ossicle，symptomatic 时致 posterior ankle impingement 及 FHL tenosynovitis，舞者多见。',
    epi: '7–25% 人群 incidental os trigonum；symptomatic 见于 dancers、soccer players 及 repetitive plantarflexion athlete；bilateral 可发生。',
    pathophys: 'Stieda process 未与 talus body 融合形成 os trigonum；repetitive forced plantarflexion 致 ossicle 与 posterior tibia/sustentaculum 撞击；FHL tendon 于 retromalleolar groove 受刺激。',
    clinical: [
      'Posterior ankle pain worsened by plantarflexion（demi-pointe、downhill）',
      'Posterior ankle swelling 及 tenderness behind malleolus',
      'Pain with forced plantarflexion test（passive PF）',
      'FHL tenosynovitis：great toe flexion pain 及 swelling',
      'Incidental os trigonum 可无 symptom']
    ,
    staging: 'Symptomatic vs incidental；按 edema at ossicle interface 及 FHL tenosynovitis severity；fragment mobility on dynamic imaging。',
    imagingKeys: [
      ['os trigonum fragment 及 location', 'lateral X线/CT 见 talus posterior lateral tubercle 独立 ossicle，与 talus body 间 fibrous/cartilaginous synchondrosis'],
      ['posterior impingement edema', 'MRI STIR 见 os trigonum–talus interface 及 posterior soft tissue edema，symptomatic 标志'],
      ['FHL tenosynovitis', 'MRI 见 FHL tendon retromalleolar segment fluid 及 thickening，posterior impingement 常见 associated finding']
    ],
    modalities: [
      ['X线', 'lateral view 显示 os trigonum，初筛及 follow-up'],
      ['MRI', '评估 symptomatic edema、FHL tenosynovitis 及 exclude other posterior ankle pathology'],
      ['CT', 'pre-operative assessment fragment size、 articulation 及 bone impingement']
    ],
    mgmt: [
      'Conservative：activity modification、 NSAID 及 posterior ankle injection',
      'Physical therapy：FHL stretching 及 ankle mobilization',
      'Refractory：arthroscopic os trigonum excision（Hindfoot endoscopy）',
      'Treat associated FHL tenosynovitis concurrently']
    ,
    ddx: ['Achilles tendinopathy', 'posterior tibial tendinopathy', 'talar fracture / posterior process fracture'],
    pitfalls: ['incidental os trigonum 过度 treatment', 'symptomatic 但未见 interface edema 时 consider other cause', 'miss FHL tenosynovitis as main pain generator'],
    pearls: ['plantarflexion pain 为 clinical hallmark', 'MRI interface edema 区分 symptomatic vs incidental', 'arthroscopic excision 对 refractory case 有效']
  },

  'stress-tib-ant': {
    overview: '胫骨前缘应力反应/骨折属 shin splints 谱系 anterior 型，runners 多见；MRI 对 early bone marrow edema 敏感，X线 早期常阴性。',
    epi: 'runners、dancers 及 military recruits；tibial anterior compartment 过度 use；female athlete triad 及 bone density 低为 risk factor。',
    pathophys: 'repetitive tibialis anterior/anterior compartment muscle traction 及 tibial bending stress 致 anterior cortex periosteal reaction→ marrow edema→ linear stress fracture；progression 风险需 monitor。',
    clinical: [
      'Anterior shin pain worsened by running/activity',
      'Tenderness along anterolateral tibial border',
      'Pain with resisted dorsiflexion 及 hopping',
      'Night pain 及 activity limitation in advanced cases',
      'Palpable periosteal thickening in chronic cases']
    ,
    staging: 'Fredericson MRI 分级：grade 1 periosteal edema→ grade 4 visible fracture line；需区分 medial tibial stress syndrome。',
    imagingKeys: [
      ['anterior tibial cortex marrow edema', 'MRI STIR 见 anterior/anterolateral tibial cortex 及 marrow T2 高 signal，early 最 sensitive finding'],
      ['periosteal reaction 及 edema', 'T2 见 periosteal high signal 及 thickening，plain film 可能仅 late 显示'],
      ['linear stress fracture line', 'T1/T2 见 cortical low signal line 或 "dreaded black line"，提示 high-grade injury 需 prolonged rest']
    ],
    modalities: [
      ['MRI', 'early detection gold standard，grading 及 assess fracture line progression'],
      ['X线', 'often negative early；late 见 periosteal reaction 或 faint fracture line'],
      ['CT', 'fracture line 及 cortical detail，pre-op 或 uncertain MRI 时']
    ],
    mgmt: [
      'Load modification 及 cross-training 维持 fitness',
      'Gradual return-to-run protocol after pain-free',
      'Visible fracture line：walking boot 及 extended rest（6–12 weeks）',
      'Address risk factors：bone density、 biomechanics 及 training error']
    ,
    ddx: ['medial tibial stress syndrome', 'chronic exertional compartment syndrome', 'infection / osteomyelitis（rare）'],
    pitfalls: ['X线 negative 即排除 early stress injury', 'anterior vs medial location 混淆', 'progression to complete fracture 因 premature return'],
    pearls: ['MRI 为 early stress reaction 最 sensitive', 'anterior cortex location 为 key differentiator', 'Fredericson grading 指导 return-to-activity']
  },

  compartment: {
    overview: '骨筋膜室综合征分 acute（trauma/post-fracture 急诊）及 chronic exertional（CECS）；acute 为 surgical emergency，clinical + compartment pressure 为诊断核心。',
    epi: 'Acute：tibia/fracture、 crush injury 及 revascularization；CECS：runners、cyclists 及 military；anterior leg compartment 最常见。',
    pathophys: 'fascial compartment 内 pressure 升高→ capillary perfusion 下降→ muscle/nerve ischemia；acute 可 rapid progression 至 irreversible necrosis；CECS 为 exercise-induced reversible ischemia。',
    clinical: [
      'Acute：pain out of proportion、 pain with passive stretch、 paresthesia、 pallor',
      'Acute late：paralysis、 pulselessness（late/unreliable sign）',
      'CECS：exercise-induced pain/swelling relieved by rest， recurrent predictable pattern',
      'Anterior compartment：foot drop、dorsum numbness（deep peroneal nerve）',
      'Tight firm compartment 及 severe pain on palpation']
    ,
    staging: 'Acute：time-critical，no imaging delay；CECS：Pedowitz criteria（pre/post exercise pressure differential）；late myonecrosis on MRI。',
    imagingKeys: [
      ['diffuse muscle edema（non-acute）', 'MRI T2 见 compartment 内 muscle diffuse edema，CECS post-exercise 或 late acute sequela'],
      ['fascial boundary 及 compartment anatomy', 'MRI cross-section 确认 affected compartment（anterior/lateral/deep posterior/superficial posterior）'],
      ['late muscle necrosis 及 enhancement pattern', 'contrast MRI 见 non-enhancing necrotic muscle 及 fascial enhancement，acute sequela 评估']
    ],
    modalities: [
      ['Clinical + pressure measurement', 'acute 诊断 gold standard；intracompartmental pressure ≥30 mmHg 或 delta 异常'],
      ['MRI', 'CECS 评估及 late sequela；非 acute 首选 diagnostic 辅助'],
      ['X线', 'fracture 等 acute cause 评估，排除 underlying bone injury']
    ],
    mgmt: [
      'Acute：emergent fasciotomy 所有 affected compartments（含 foot if needed）',
      'CECS：elective fasciotomy after pressure test confirmation',
      'Avoid tight dressings/casts  post-trauma 并 monitor',
      'Late sequelae：debridement、 skin graft 及 functional rehabilitation']
    ,
    ddx: ['cellulitis / necrotizing fasciitis', 'DVT', 'neurogenic/radicular pain'],
    pitfalls: ['acute 等待 MRI 延误 fasciotomy', 'miss foot compartment involvement', 'CECS 与 stress fracture/shin splints 混淆'],
    pearls: ['acute compartment syndrome 为 clinical emergency', 'pain + passive stretch pain 为 early reliable sign', 'never delay fasciotomy for imaging in acute setting']
  },

  myositis: {
    overview: '软组织/myositis 涵盖 infectious pyomyositis 及 autoimmune myositis；MRI 显示 muscle edema 模式，需与 trauma、rhabdomyolysis 及 denervation 鉴别。',
    epi: 'Pyomyositis：immunocompromised、tropical region 及 IVDU；autoimmune：polymyositis/dermatomyositis 中年；diabetic 及 post-viral 亦见。',
    pathophys: 'Infectious：hematogenous seeding 或 contiguous spread 致 muscle abscess 及 inflammatory edema；Autoimmune：T-cell mediated muscle fiber inflammation 致 symmetric proximal weakness 及 elevated CK。',
    clinical: [
      'Muscle pain、 swelling 及 tenderness',
      'Fever 及 leukocytosis（infectious）',
      'Symmetric proximal weakness（autoimmune）',
      'Elevated CK、 ESR/CRP 及 autoantibodies（autoimmune）',
      'Skin rash（dermatomyositis：heliotrope、 Gottron papules）']
    ,
    staging: 'Pyomyositis：early inflammatory→ suppurative→ late abscess；Autoimmune：active inflammation vs chronic fibrosis；需 biopsy 确诊 autoimmune。',
    imagingKeys: [
      ['diffuse muscle edema pattern', 'MRI STIR 见 muscle T2 高 signal，pyomyositis 可为 focal/multifocal；autoimmune 常 symmetric proximal'],
      ['abscess ring enhancement', 'contrast MRI 见 rim-enhancing fluid collection 伴 surrounding edema，pyomyositis suppurative stage 特征'],
      ['fascial plane fluid 及 subcutaneous edema', 'T2 见 fascial thickening 及 subcutaneous edema 提示 infectious/inflammatory spread，引导 aspiration']
    ],
    modalities: [
      ['MRI', '评估 edema 范围、abscess 及 guide aspiration/biopsy site'],
      ['US', 'abscess 定位、 aspiration guidance 及 exclude DVT'],
      ['CT', 'gas-forming infection 及 deep abscess drainage planning']
    ],
    mgmt: [
      'Pyomyositis：IV antibiotics + US/CT-guided drainage',
      'Autoimmune：immunosuppression（steroid、 DMARD）及 malignancy screening',
      'Supportive：pain control 及 PT after inflammation control',
      'Biopsy：autoimmune diagnosis 及 exclude inclusion body myositis']
    ,
    ddx: ['focal muscle strain/trauma', 'rhabdomyolysis', 'denervation edema'],
    pitfalls: ['autoimmune 未 biopsy 误治 infection', 'abscess 未 drainage 仅 antibiotic', 'bilateral symmetric 误为 trauma'],
    pearls: ['diffuse edema + fever = pyomyositis until proven otherwise', 'MRI guides aspiration site', 'dermatomyositis 需 malignancy workup']
  },

  'rhabdo-trauma': {
    overview: '创伤性横纹肌溶解由 crush/eccentric extreme exercise 致 muscle necrosis，CK 显著升高及 myoglobinuria；需 aggressive hydration 并 monitor AKI 与 compartment syndrome。',
    epi: 'Crush injury、 prolonged immobilization、 extreme eccentric exercise 及 seizure；drug/alcohol 及 statin 为 contributing factor；multi-trauma 患者高风险。',
    pathophys: 'Muscle cell membrane rupture 致 myoglobin、 CK 及 potassium release；myoglobin 致 AKI（tubular obstruction 及 toxicity）；compartment pressure 可 concurrent elevation。',
    clinical: [
      'Dark tea-colored urine（myoglobinuria）',
      'Severe muscle pain、 swelling 及 weakness',
      'CK 显著升高（often >10,000 U/L）',
      'AKI：oliguria、 rising creatinine',
      'Compartment syndrome signs 需 parallel assessment']
    ,
    staging: '按 CK peak、 renal function 及 compartment status；severity score 指导 ICU vs ward management。',
    imagingKeys: [
      ['diffuse muscle T2 edema', 'MRI STIR 见 affected compartment muscle diffuse high signal，non-focal 区别于 strain'],
      ['muscle necrosis non-enhancement', 'contrast MRI 见 necrotic muscle 无 enhancement 或 patchy pattern，late finding'],
      ['fascial swelling 及 compartment edema', 'T2 见 fascial thickening 及 interstitial edema，提示 compartment pressure 升高 risk']
    ],
    modalities: [
      ['MRI', '评估 necrosis 范围及 late sequela，非 acute 初始诊断必需'],
      ['US', 'compartment assessment 及 guide monitoring，bedside adjunct'],
      ['X线', 'fracture/crush injury 等 underlying cause']
    ],
    mgmt: [
      'Aggressive IV fluid resuscitation（target high UOP）及 alkalinization 争议',
      'Monitor CK、 electrolytes 及 renal function q6h early',
      'Treat concurrent compartment syndrome with fasciotomy',
      'Dialysis for refractory AKI/hyperkalemia']
    ,
    ddx: ['compartment syndrome without rhabdo', 'myositis/infection', 'hematoma/contusion'],
    pitfalls: ['AKI prevention 不足（fluid 延迟）', 'miss concurrent compartment syndrome', 'MRI 延误 acute compartment fasciotomy'],
    pearls: ['CK + dark urine 为 classic combination', 'aggressive early hydration 降低 AKI risk', 'always assess compartment pressure concurrently']
  },

  denervation: {
    overview: '肌肉失神经支配 MRI 显示 acute/subacute muscle edema 及 chronic fatty atrophy，pattern 沿 specific nerve territory 分布；需 EMG 确认及 identify nerve injury site。',
    epi: 'Trauma（brachial plexus、peripheral nerve laceration）、 surgery、 entrapment 及 radiculopathy；按 nerve distribution 累及 specific muscle group。',
    pathophys: 'Denervation 后 muscle fiber 失 neurotrophic support→ acute/subacute T2 edema（1–6 months）→ chronic fatty infiltration 及 volume loss（Goutallier pattern on MRI）。',
    clinical: [
      'Specific muscle group weakness 按 nerve/myotome distribution',
      'Numbness/paresthesia in nerve sensory territory',
      'Trauma 或 surgery history pointing to nerve injury',
      'Muscle atrophy 及 fasciculation（chronic）',
      'Pain less prominent than primary nerve lesion symptoms']
    ,
    staging: 'Acute（<1 month edema）→ subacute edema → chronic fatty atrophy；Seddon neuropraxia/axonotmesis/neurotmesis 指导 prognosis。',
    imagingKeys: [
      ['acute denervation muscle edema', 'MRI STIR 见 specific nerve territory muscle T2 高 signal，无 mass lesion，pattern 为 key'],
      ['chronic fatty atrophy', 'T1 见 affected muscle volume 减小及 fatty infiltration，与 contralateral 对比明显'],
      ['nerve distribution pattern', '按 myotome 或 peripheral nerve territory 累及（如 supraspinatus/infraspinatus= suprascapular），定位 nerve injury level']
    ],
    modalities: [
      ['MRI', 'acute edema 及 chronic atrophy pattern，定位 nerve territory 及 exclude mass'],
      ['EMG/NCS', 'confirm denervation、 localize level 及 assess prognosis'],
      ['US', 'nerve continuity、 neuroma 及 entrapment site assessment']
    ],
    mgmt: [
      'Treat underlying nerve injury：repair、 decompression 或 graft',
      'Rehab：maintain ROM 及 prevent contracture',
      'Chronic irreversible：tendon transfer 或 orthotic',
      'Painful neuroma：excision 及 relocation']
    ,
    ddx: ['myositis（often symmetric/bilateral）', 'disuse atrophy（less edema, non-territorial）', 'primary muscle disease'],
    pitfalls: ['MRI pattern 未按 nerve territory 解读', 'EMG timing 过早（<3 weeks 可能 normal）', 'bilateral symmetric 误为 denervation'],
    pearls: ['MRI acute edema pattern 高度 specific for denervation territory', 'fatty atrophy 为 irreversible late sign', 'EMG 与 MRI 互补 confirm diagnosis']
  },

  'tendon-xanthoma': {
    overview: '肌腱黄瘤为 familial hypercholesterolemia（FH） tendon lipid 沉积，Achilles 及 patellar tendon 弥漫性 thickening 为 classic imaging sign；为 systemic metabolic disease marker。',
    epi: 'FH heterozygous 及 homozygous；young adult 即可见 tendon thickening；Achilles、 extensor tendons  of hand 及 patellar tendon 常见；premature CAD 家族史。',
    pathophys: 'LDL receptor defect 致 chronic hyperLDL→ macrophage lipid accumulation 于 tendon xanthomatous infiltration；tendon 弥漫 thickening 非 focal tendinopathy。',
    clinical: [
      'Painless tendon thickening（Achilles、 patellar）',
      'Family history of hypercholesterolemia 及 premature CAD',
      'Cutaneous xanthoma（ eyelid xanthelasma、 tuberous）',
      'Elevated LDL-C from young age',
      'Premature atherosclerotic cardiovascular disease']
    ,
    staging: 'FH diagnostic criteria（LDL level、 tendon xanthoma、 family history）；tendon thickening 按 MRI/US 测量 thickness vs age-matched normal。',
    imagingKeys: [
      ['diffusely thickened tendon', 'MRI/US 见 Achilles 或 patellar tendon 弥漫性增厚（常 >8–10 mm Achilles），非 focal nodular'],
      ['intermediate signal infiltration', 'MRI T1/T2 见 tendon 内 intermediate signal xanthomatous infiltration，区别于 fluid signal tendinopathy'],
      ['bilateral Achilles/patellar involvement', '双侧对称 tendon thickening 为 FH 高度 suggestive pattern，需 lipid panel 确认']
    ],
    modalities: [
      ['MRI', 'tendon thickening 定量、 infiltration signal 及 bilateral assessment'],
      ['US', 'hypoechoic diffuse thickening，无 focal tear，适合 screening 及 follow-up thickness'],
      ['X线', 'soft tissue swelling over Achilles/patellar region，间接 sign；非 primary diagnostic']
    ],
    mgmt: [
      'High-intensity statin 及 LDL-lowering therapy（primary treatment）',
      'CAD screening 及 cardiovascular risk management',
      'Family cascade screening for FH',
      'Tendon 本身 rarely 需 surgery，focus on systemic lipid control']
    ,
    ddx: ['focal tendinopathy/tendinitis（painful, focal）', 'tendon tear with thickening', 'gouty tendon deposition（different signal/history）'],
    pitfalls: ['focal tendinopathy 误为 xanthoma 或 vice versa', '未 recognize 为 FH systemic marker 漏筛 family', 'unilateral  thickening 降低 FH specificity'],
    pearls: ['bilateral Achilles thickening in young adult = xanthoma/FH until proven otherwise', 'treat systemic lipids not tendon locally', 'screen first-degree relatives']
  }
};

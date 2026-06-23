/**
 * 第二批疾病 · 离线影像图库（仅使用 image-attrib-registry.js 中 154 张已授权图）
 * 每项为文件名或 { file, caption, site, modified }
 */

function cap(mod, text) {
  return `${mod} · ${text}`;
}

/** @type {Record<string, (string|object)[]>} */
export const CURATED_GALLERIES = {
  // —— 骨肿瘤 ——
  'cc-chondro': [
    { file: 'Chondrosarcoma femoris sin.jpg', caption: cap('X线', '股骨软骨肉瘤溶骨性破坏') },
    { file: 'Chondrosarkom proximaler Femur - 87jw - CT und Roe - 001.jpg', caption: cap('CT', '股骨近端软骨肉瘤') }
  ],
  'dediff-chondro': [
    { file: 'Chondrosarkom proximaler Femur - 87jw - CT und Roe - 001.jpg', caption: cap('CT', '软骨肉瘤骨破坏范围') }
  ],
  'mesench-chondro': [
    { file: 'Chondrosarcoma femoris sin.jpg', caption: cap('X线', '软骨源性肿瘤溶骨改变') }
  ],
  'peri-chondro': [
    { file: 'Chondrosarkom (Großzeh).jpg', caption: cap('X线', '骨膜性软骨肉瘤样骨破坏') }
  ],
  plasmacytoma: [
    { file: 'Plasmozytom multiple Osteolysen Unterarm.png', caption: cap('X线', '多发溶骨性骨破坏') },
    { file: 'Left femur with myeloma.jpg', caption: cap('X线', '股骨弥漫溶骨性病变') }
  ],
  parosteo: [
    { file: 'Osteosarcoma1.jpg', caption: cap('X线', '骨表面成骨性骨破坏') },
    { file: 'Osteogenic sarcoma2.jpg', caption: cap('X线', '成骨性骨肉瘤样表现') }
  ],
  telosteo: [
    { file: 'Osteosarcoma of the tibia.png', caption: cap('X线', '胫骨溶骨性骨破坏伴软组织成分') }
  ],
  periosteo: [
    { file: 'Osteogenic sarcoma2.jpg', caption: cap('X线', '骨膜反应性成骨') }
  ],
  'lgc-osteo': [
    { file: 'Osteosarcoma1.jpg', caption: cap('X线', '中心性低度恶性骨破坏') }
  ],
  hme: [
    { file: 'Multiple kartilaginaere Exostosen Knie - Roe ap 001.jpg', caption: cap('X线', '膝部多发骨软骨瘤') },
    { file: 'Osteochondroma X-ray.jpg', caption: cap('X线', '干骺端外生骨疣') },
    { file: 'Osteochondroma right scapula.jpg', caption: cap('X线', '肩胛骨骨软骨瘤') }
  ],
  maffucci: [
    { file: 'Multiple kartilaginaere Exostosen Knie - Roe ap 001.jpg', caption: cap('X线', '多发骨软骨瘤') },
    { file: 'Vertebral hemangioma 01.jpg', caption: cap('MRI', '椎体血管瘤样改变') }
  ],
  'skelet-hemang': [
    { file: 'Wirbelkoerperhaemangiom - MRT sagittal T1 T2 STIR.jpg', caption: cap('MRI', '椎体血管瘤 T1/T2 特征') },
    { file: 'Vertebral Hemangioma.jpg', caption: cap('CT', '椎体栅栏状骨梁') },
    { file: 'Vertebral hemangioma 01.jpg', caption: cap('MRI', '椎体血管瘤') }
  ],
  'ewing-extra': [
    { file: 'Ewing sarcoma tibia child.jpg', caption: cap('X线', '儿童 Ewing 肉瘤骨破坏') },
    { file: "Ewing's sarcoma MRI nci-vol-1832-300.jpg", caption: cap('MRI', 'Ewing 肉瘤髓内病变') }
  ],

  // —— 创伤 ——
  radialhead: [
    {
      file: 'X-ray of ventral dislocation of the radial head with calcification of annular ligament.jpg',
      caption: cap('X线', '桡骨头脱位伴环状韧带钙化')
    }
  ],
  mason: [
    {
      file: 'X-ray of ventral dislocation of the radial head with calcification of annular ligament.jpg',
      caption: cap('X线', '桡骨头骨折/脱位评估')
    }
  ],
  pilon: [
    { file: 'Lateral Tibial Plateau fracture XRay with Depression.jpg', caption: cap('X线', '胫骨平台塌陷骨折') },
    { file: 'Tibial Plateau Fracture.jpg', caption: cap('X线', '胫骨平台骨折') }
  ],
  tibialshaft: [
    { file: 'X-ray of occult metaphyseal stress fracture of the tibia.jpg', caption: cap('X线', '胫骨应力性骨折') },
    { file: 'T1 and DP fat sat MRI of a stress fracture.jpg', caption: cap('MRI', '胫骨应力反应骨髓水肿') }
  ],
  'burst-lumbar': [
    { file: 'Bone fracture L1, L2 and L4, X-ray, L, case 01.png', caption: cap('X线', '多节段椎体压缩/爆裂') },
    { file: 'L4 Compression Fracture Arrow.png', caption: cap('X线', '椎体压缩骨折') },
    { file: 'L1 2 vertebral fracture.jpg', caption: cap('X线', '椎体骨折') }
  ],
  chance: [
    { file: 'Bone fracture L1, L2 and L4, X-ray, L, case 01.png', caption: cap('X线', '椎体水平骨折线') }
  ],
  odontoid: [
    { file: 'Crowned dens - 95jw - CT axial und coronar - 001.jpg', caption: cap('CT', '齿突区骨化/骨折评估') }
  ],
  segond: [
    { file: 'Unhappy Triad des Kniegelenks 53M - MR - 001 - Annotation.jpg', caption: cap('MRI', 'Segond 骨折合并韧带损伤'), modified: true },
    { file: 'VKB-Riss MRT T1 PDW sag.jpg', caption: cap('MRI', 'ACL 撕裂') }
  ],
  'stress-tib-ant': [
    { file: 'X-ray of occult metaphyseal stress fracture of the tibia.jpg', caption: cap('X线', '胫骨前缘应力骨折') },
    { file: 'T1 and DP fat sat MRI of a stress fracture.jpg', caption: cap('MRI', '应力性骨髓水肿') }
  ],

  // —— 关节 / 炎症 ——
  'erosive-oa': [
    { file: 'Rheumatoide Arthritis der Hand 65W - CR ap - 001.jpg', caption: cap('X线', '手部侵蚀性关节破坏') },
    { file: 'RheumatoideArthritisAP.jpg', caption: cap('X线', '类风湿关节炎关节侵蚀') }
  ],
  sapho: [
    { file: 'Sacroiliitis MRI ar1934-5.gif', caption: cap('MRI', '骶髂关节炎症') },
    { file: 'Psoriasisarthritis distales Interphalangealgelenk 79M - CR seitlich - 001.jpg', caption: cap('X线', '附着点炎/骨侵蚀') }
  ],

  // —— 肌肉 / 肌腱 ——
  infraspinatus: [
    {
      file: '2 MRI. Complete tear and rupture of the supraspinatus tendon. Wide transmural damage (2.4 x 2.4 cm)..jpg',
      caption: cap('MRI', '肩袖肌腱撕裂')
    }
  ],
  subscap: [
    {
      file: '1 MRI. Complete tear and rupture of the supraspinatus tendon. Wide transmural damage (2.4 x 2.4 cm)..jpg',
      caption: cap('MRI', '肩袖肌腱损伤')
    }
  ],
  'myositis-oss': [
    {
      file: 'Stieda-Pellegrini-Schatten bei einliegen 85M - CR ap - 001 - Annotation.jpg',
      caption: cap('X线', 'Pellegrini-Stieda 骨化'),
      modified: true
    }
  ],

  // —— 脊柱 ——
  discitis: [
    { file: 'Spondylodiscitis LWK 34 82M - MR und CT - 001.jpg', caption: cap('MRI/CT', '椎体终板破坏与椎间盘炎') }
  ],
  'epidural-abscess': [
    { file: 'Spondylodiscitis LWK 34 82M - MR und CT - 001.jpg', caption: cap('MRI/CT', '椎体感染伴硬膜外蔓延') }
  ],
  'oss-flavum': [
    { file: 'Ligamenta flava Hypertrophie - MRT T2 axial.jpg', caption: cap('MRI', '黄韧带增厚') }
  ],
  spondylolisthesis: [
    { file: 'LumbarSpinalStenosis case1 2 7.png', caption: cap('MRI', '腰椎滑脱/椎管狭窄') },
    { file: 'Lumbar spinal stenosis 3 9.png', caption: cap('MRI', '椎管狭窄') }
  ],
  'facet-arthropathy': [
    { file: 'Lumbar spinal stenosis 3 9.png', caption: cap('MRI', '小关节退变伴椎管狭窄') }
  ],
  modic: [
    { file: 'Lumbar Spine 111353-rgbcb.png', caption: cap('MRI', '终板 Modic 样信号改变') }
  ],
  'thoracic-disc': [
    { file: 'CT SCAN DISC HERNIATION.JPG', caption: cap('CT', '椎间盘突出') },
    { file: 'L4-l5-disc-herniation.png', caption: cap('MRI', '椎间盘突出压迫') }
  ],
  atlantoaxial: [
    { file: 'Crowned dens - 95jw - CT axial und coronar - 001.jpg', caption: cap('CT', '齿突周围骨化/不稳') }
  ],
  'odontoid-hypo': [
    { file: 'Crowned dens - 95jw - CT axial und coronar - 001.jpg', caption: cap('CT', '齿突发育/骨化异常') }
  ],

  // —— 运动医学 / 儿童 ——
  'acetabular-dysplasia': [
    { file: 'X-ray of hip dysplasia in adult.jpg', caption: cap('X线', '髋臼发育不良') },
    { file: 'Alpha angle measured in 45 degrees Dunn view.jpg', caption: cap('X线', 'Cam 畸形 Alpha 角') },
    { file: 'Alpha and beta angles on neonatal hip ultrasonography.jpg', caption: cap('超声', '婴儿髋臼发育角') }
  ],
  'subchondral-insufficiency': [
    { file: 'Crescent sign annotated.jpg', caption: cap('X线', '新月征（软骨下骨折）'), modified: true }
  ],
  'osteonecrosis-knee': [
    { file: 'Crescent sign annotated.jpg', caption: cap('X线', '新月征'), modified: true }
  ],
  'discoid-meniscus': [
    { file: 'Ligamentum wrisberg sag.png', caption: cap('MRI', 'Wrisberg 型盘状半月板') }
  ],
  'meniscal-cyst': [
    { file: 'Meniscal Tear MRI.jpg', caption: cap('MRI', '半月板撕裂') },
    {
      file: 'Korbhenkelriss Aussenmeniskus Hinterhorn - 14jm - MRT - T1 sagittal - 017.jpg',
      caption: cap('MRI', '桶柄状半月板撕裂')
    }
  ],
  'acl-ganglion': [
    { file: 'Knee MRI 113746 rgbcb.png', caption: cap('MRI', '膝关节内病变') },
    { file: 'MRT VKB-Riss T1.jpg', caption: cap('MRI', 'ACL 区信号异常') }
  ],
  preiser: [
    { file: 'Scaphoid non-union advanced collapse 80M - CR ap - 001.jpg', caption: cap('X线', '舟骨缺血性改变') },
    { file: 'Scaphoid fracture - barely visible on initial X-ray.jpg', caption: cap('X线', '舟骨骨折') }
  ],
  'hip-labral': [
    { file: 'X-ray of coxa profunda.jpg', caption: cap('X线', '髋臼过深/Cam 相关') }
  ],
  'loose-body-knee': [
    { file: 'Knee MRI 113746 rgbcb.png', caption: cap('MRI', '关节内游离体/碎片') }
  ],
  patellofemoral: [
    { file: 'Knee plain X-ray weight bearing.jpg', caption: cap('X线', '负重位髌股关节') },
    { file: 'Knee osteoathritis stages II nad III.jpg', caption: cap('X线', '膝关节退变') }
  ],
  'os-trigonum': [
    { file: 'Snowboarders ankle - CT coronar.jpg', caption: cap('CT', '后踝/距骨后突撞击') },
    { file: 'CT scan of calcaneal fracture.jpg', caption: cap('CT', '后踝区骨性结构') }
  ],
  'bone-marrow-edema': [
    { file: 'T1 and DP fat sat MRI of a stress fracture.jpg', caption: cap('MRI', '骨髓水肿') }
  ],
  'transient-osteoporosis': [
    { file: 'DXA femoral neck with osteoporosis.jpg', caption: cap('DXA', '股骨颈骨密度降低') }
  ],
  essex: [
    {
      file: 'X-ray of ventral dislocation of the radial head with calcification of annular ligament.jpg',
      caption: cap('X线', '桡骨头脱位（Essex-Lopresti 评估）')
    }
  ],

  // —— 注册库精准配对（第二批空图库补充）——
  tgct: [
    { file: 'Riesenzelltumor PDfs cor.jpg', caption: cap('MRI', '腱鞘巨细胞瘤 PD 加权') },
    { file: 'Riesenzelltumor T1 cor.jpg', caption: cap('MRI', 'T1 冠状位') }
  ],
  sinding: [
    {
      file: 'Avulsionsfraktur unterer Patellapol 12M - CR und CT - 001.jpg',
      caption: cap('X线/CT', '髌骨下极撕脱（Sinding-Larsen）')
    }
  ],
  maisonneuve: [
    { file: 'Trimalleolar Ankle Fracture.jpg', caption: cap('X线', '踝关节骨折（复合损伤评估）') },
    { file: 'X-ray of bimalleolar fracture.jpg', caption: cap('X线', '双踝骨折') }
  ],
  'ac-joint': [
    { file: 'Clavicle Fracture Left.jpg', caption: cap('X线', '锁骨/肩锁区骨折') },
    { file: 'Typische mittlere Klavikulafraktur mit verkippten Kleinfragmenten 39W - CR - 001.jpg', caption: cap('X线', '锁骨中段骨折') }
  ],
  supracondylar: [
    { file: 'Proxhumerousfracture(surgneck,lesserandgreatertroch).png', caption: cap('X线', '肱骨近端/髁上区骨折') },
    { file: 'Subcapital humerus fracture.jpg', caption: cap('X线', '肱骨近端骨折') }
  ],
  'polyostotic-fd': [
    { file: 'Evidence of Bone Repair, Fibrous Dysplasia.jpg', caption: cap('X线', '多骨性纤维结构不良') },
    { file: 'Dysplasia fibrosa.jpg', caption: cap('X线', '纤维结构不良骨改变') }
  ],
  'fd-mazabraud': [
    { file: 'Evidence of Bone Repair, Fibrous Dysplasia.jpg', caption: cap('X线', '纤维结构不良成分') },
    { file: 'Vertebral hemangioma 01.jpg', caption: cap('MRI', '血管瘤成分') }
  ],

  // —— 注册库剩余图 · 人工确认配对 ——
  'supraspinatus-calc': [
    {
      file: 'Tendinitis calcarea infraspinatus 50M - MR PDW FS axial und Roentgen Y-View - 001.jpg',
      caption: cap('MRI/X线', '冈下肌钙化性肌腱炎')
    }
  ]
};

/**
 * 在线补充且已人工确认正确的图库（离线重建时保留）
 * @type {Record<string, (string|object)[]>}
 */
export const ONLINE_VERIFIED_GALLERIES = {
  "knee": [
    "VKB-Riss MRT T1 PDW sag.jpg",
    "MRT VKB-Riss T1.jpg",
    "openi__PMC2698113_kjr-5-47-g001.png",
    "openi__PMC2698113_kjr-5-47-g004.png",
    "openi__PMC3685708_167_2012_2153_Fig3_HTML.png",
    "openi__PMC4519562_gr1.png"
  ],
  "hip": [
    "X-ray of hip osteoarthritis.jpg",
    "Severe (Tönnis grade 3) osteoarthritis of the hip.jpg",
    "0910 Oateoarthritis Hip A.png"
  ],
  "tumor": [
    "Osteosarcoma1.jpg",
    "Osteosarcoma of the tibia.png",
    "Osteogenic sarcoma2.jpg",
    "openi__PMC4058257_SARCOMA2014-967848.003.png",
    "openi__PMC455689_1477-7819-2-22-3.png",
    "openi__PMC4043681_pone.0097381.g001.png",
    "openi__PMC3742567_OL-06-01-0023-g01.png",
    "openi__PMC4800413_srep23335-f3.png",
    "openi__PMC4616474_medi-94-e913-g005.png"
  ],
  "spine": [
    "L4-l5-disc-herniation.png",
    "openi__PMC3939372_asj-8-69-g001.png",
    "openi__PMC4124929_kjs-11-52-g003.png",
    "openi__PMC3941755_kjs-10-155-g003.png",
    "openi__PMC3941734_kjs-10-41-g002.png",
    "openi__PMC4764540_asj-10-52-g002.png",
    "openi__PMC5018346_CRIOR2016-5963924.001.png"
  ],
  "wrist": [
    "Scaphoid fracture - barely visible on initial X-ray.jpg",
    "X-ray of scaphoid fracture.png",
    "Scaphoid non-union advanced collapse 80M - CR ap - 001.jpg",
    "openi__PMC3163770_10195_2011_143_Fig5_HTML.png",
    "openi__PMC5069367_CRIOR2016-7049130.001.png",
    "openi__PMC3445150_10.1177_1941738109347981-fig7.png",
    "openi__PMC2856398_IJOrtho-44-208-g001.png",
    "openi__PMC4893284_12891_2016_1107_Fig2_HTML.png",
    "openi__PMC5016915_iort-87-533.F02.png",
    "openi__PMC5025579_13018_2016_432_Fig1_HTML.png",
    "openi__PMC4490651_13018_2015_221_Fig3_HTML.png"
  ],
  "shoulder": [
    "2 MRI. Complete tear and rupture of the supraspinatus tendon. Wide transmural damage (2.4 x 2.4 cm)..jpg",
    "1 MRI. Complete tear and rupture of the supraspinatus tendon. Wide transmural damage (2.4 x 2.4 cm)..jpg",
    "Subacromial Impingement with Supraspinatus Rupture.jpg",
    "openi__PMC2814028_330_2009_1561_Fig3_HTML.png",
    "openi__PMC2814028_330_2009_1561_Fig1_HTML.png",
    "openi__PMC4410471_IJSS-9-47-g006.png"
  ],
  "ankle": [
    "Bimalleolar fracture legend.jpg",
    "openi__PMC3860673_traumamon-18-90-g002.png",
    "openi__PMC3683434_CRIM.ORTHOPEDICS2013-928938.003.png",
    "openi__PMC4175856_IJOrtho-48-445-g001.png",
    "openi__PMC3800518_11751_2013_177_Fig1_HTML.png",
    "openi__PMC3671789_ETM-05-05-1375-g01.png"
  ],
  "hand": [
    "Rheumatoide Arthritis der Hand 65W - CR ap - 001.jpg",
    "RheumatoideArthritisAP.jpg",
    "Rheumatoide Arthritis mit ausgedehnten Osteolysen Daumen 57W - CR ap und seitlich - 001.jpg",
    "openi__PMC2374457_ar2378-1.png",
    "openi__PMC3846932_13244_2013_293_Fig1_HTML.png"
  ],
  "infect": [
    "Osteomyelitis of Tibia in Child.jpg",
    "Ostermyelitis Tibia.jpg",
    "OsteomylitisMark.png",
    "openi__PMC4126137_IJRI-24-225-g023.png"
  ],
  "radius": [
    "Colles' Fracture of Radius.jpg",
    "Collesfracture.jpg",
    "Colles fracture.JPG",
    "openi__PMC4902418_medi-95-e3683-g003.png",
    "openi__PMC3445150_10.1177_1941738109347981-fig5.png"
  ],
  "femneck": [
    "Hueftgelenk-Oberschenkelhalsbruch.jpg",
    "Mediale Schenkelhalsfraktur links 83W - CR ap - 001 - Annotation.jpg",
    "Transzervikale Femurfraktur links 56M - CR ap - 001.jpg",
    "openi__PMC2656981_10195_2008_25_Fig2_HTML.png"
  ],
  "vertfx": [
    "L4 Compression Fracture Arrow.png",
    "openi__PMC4995318_BMRI2016-3878063.001.png",
    "openi__PMC2271083_256_2008_452_Fig2_HTML.png",
    "openi__PMC5411207_medi-96-e6549-g002.png",
    "openi__PMC4783626_rjw02502.png"
  ],
  "meniscus": [
    "Korbhenkelriss Aussenmeniskus Hinterhorn - 14jm - MRT - T1 sagittal - 017.jpg",
    "Innenmeniskushinterhornriß T2 sag.jpg",
    "openi__PMC3807709_CRIM.RADIOLOGY2013-813232.001.png",
    "openi__PMC4877349_13244_2016_483_Fig16_HTML.png",
    "openi__PMC5035687_1413-7852-aob-24-04-00179-gf1.png"
  ],
  "cervical": [
    "X-ray of cervical spondylosis.jpg",
    "Cervical kyphosis and spondylosis.png",
    "Cervical Xray Lateral View.jpg",
    "openi__PMC3954355_rcse9406-e184-01.png",
    "openi__PMC3621852_ebsj02041-1.png"
  ],
  "gout": [
    "Gicht - Roe - multiple Arrosionen Destruktionen.png",
    "Gicht-Arrosion am proximalen Interphalangealgelenk D4 92M - CR ap - 001 - Annotation.jpg",
    "Gichtarthritis Grosszehengrundgelenk 94W - CR pa - 001.jpg"
  ],
  "avn": [
    "X-ray of idiopathic avascular necrosis of the femoral head - Anteroposterior.jpg",
    "X-ray of idiopathic avascular necrosis of the femoral head - Lateral.jpg",
    "Crescent sign annotated.jpg",
    "openi__PMC3945237_CHSJ-35-1-023-fig9.png",
    "openi__PMC4623543_icrp-2-040-g002.png",
    "openi__PMC4987321_cios-8-339-g003.png",
    "openi__PMC4329529_cios-7-22-g004.png",
    "openi__PMC4909725_gr2.png",
    "openi__PMC3443992_CRIM.ID2012-464527.001.png"
  ],
  "gct": [
    "Riesenzelltumor RÖ ap.jpg",
    "openi__PMC4901023_gr2.png",
    "openi__PMC4999374_10195_2016_397_Fig5_HTML.png",
    "openi__PMC3302920_asj-6-71-g005.png",
    "openi__PMC4825212_usg-15051-f27.png",
    "openi__PMC5036340_IJRI-26-386-g019.png",
    "openi__PMC4158256_CRIE2014-729387.001.png",
    "openi__PMC4245664_gr1.png"
  ],
  "osteochondroma": [
    "Osteochondroma X-ray.jpg",
    "Osteochondroma MRI.JPEG",
    "Osteochondroma right scapula.jpg",
    "openi__PMC3866668_IJNM-28-226-g003.png"
  ],
  "hemangioma": [
    "Vertebral Hemangioma.jpg",
    "Vertebral hemangioma 01.jpg",
    "Wirbelkoerperhaemangiom - MRT sagittal T1 T2 STIR.jpg",
    "openi__PMC3977372_IJOrtho-48-163-g004.png",
    "openi__PMC3836896_10-1055-s-0033-1357356-i1300006cr-1.png"
  ],
  "as": [
    "Bamboo spine ankylosing spondylitis.jpg",
    "Chalk stick fracture bei Morbus Bechterew 55M - CT koronar und sagittal - 001.jpg",
    "Iliosakrale Ankylose und Bambusstab bei Morbus Bechterew.jpg",
    "openi__PMC4813060_IJRI-26-108-g021.png",
    "openi__PMC4478831_SJA-9-327-g001.png"
  ],
  "humerus": [
    "Subcapital humerus fracture.jpg",
    "Surgical neck fracture of humerus.jpg",
    "Proxhumerousfracture(surgneck,lesserandgreatertroch).png",
    "openi__PMC5122252_IJOrtho-50-590-g001.png",
    "openi__PMC3445283_IJPVM-3-660-g003.png",
    "openi__PMC5040563_JOCR-6-24-g002.png",
    "openi__PMC4788826_12893_2016_125_Fig2_HTML.png"
  ],
  "clavicle": [
    "Clavicle fracture.jpg",
    "Clavicle Fracture Left.jpg",
    "openi__PMC4129962_CRIEM2014-689157.001.png",
    "openi__PMC5245927_JOCR-6-19-g002.png",
    "Typische mittlere Klavikulafraktur mit verkippten Kleinfragmenten 39W - CR - 001.jpg",
    "openi__PMC4842357_CRIEM2016-2409894.001.png",
    "openi__PMC4332647_10.1177_1941738114566381-fig3.png",
    "openi__PMC3590704_IJSS-6-126-g002.png",
    "openi__PMC4332647_10.1177_1941738114566381-fig6.png"
  ],
  "pelvis": [
    "Open-Book-Verletzung durch Turmspringen 45M - CR - 001 - Annotation.jpg",
    "Open-Book-Verletzung durch Turmspringen 45M - CR - 001.jpg",
    "Diastasis symphysis pubis 1300500.JPG",
    "openi__PMC2916892_1471-2474-11-153-3.png",
    "openi__PMC5070616_medscimonit-22-3764-g002.png",
    "openi__PMC2916002_1471-2318-10-51-1.png",
    "openi__PMC3495273_68_2012_224_Fig3_HTML.png",
    "openi__PMC4446891_12891_2015_581_Fig1_HTML.png",
    "openi__PMC4863865_1413-7852-aob-24-03-00155-gf3.png"
  ],
  "calcaneus": [
    "T1 MRI of calcaneal fracture.jpg",
    "CT scan of calcaneocuboid joint with calcaneal fracture.jpg",
    "CalFrac.png",
    "openi__PMC4812034_gr2.png",
    "openi__PMC5242061_13018_2017_511_Fig3_HTML.png",
    "openi__PMC4908218_gr1.png",
    "openi__PMC4946135_12891_2016_1122_Fig2_HTML.png",
    "openi__PMC4946135_12891_2016_1122_Fig1_HTML.png"
  ],
  "pcl": [
    "Ligamento Cruzado Posterior.jpg",
    "Ligamentum wrisberg sag.png",
    "Knee MRI 113746 rgbcb.png",
    "openi__PMC4781763_kjr-17-239-g003.png",
    "openi__PMC4781763_kjr-17-239-g002.png",
    "openi__PMC4639655_CRIOR2015-527428.004.png",
    "openi__PMC3468909_TOORTHJ-6-424_F1.png",
    "openi__PMC4667120_cios-7-505-g003.png"
  ],
  "elbow": [
    "Ellbogenluxation ap.jpg",
    "Ellbogenluxation seitlich.jpg",
    "Radiographie d'une luxation postérieur du coude gauche sans fracture.jpg",
    "openi__PMC4483365_PAMJ-20-265-g002.png",
    "openi__PMC2564908_1757-1626-1-168-1.png",
    "openi__PMC4546717_PAMJ-21-128-g002.png",
    "openi__PMC2564908_1757-1626-1-168-2.png",
    "openi__PMC5343091_gr2.png",
    "openi__PMC3783806_JNSBM-4-479-g001.png"
  ],
  "kneeoa": [
    "Osteoarthritis on X-ray.jpg",
    "Knee plain X-ray weight bearing.jpg",
    "Knee osteoathritis stages II nad III.jpg",
    "openi__PMC5112538_1414-431X-bjmbr-1414-431X20165181-gf002.png",
    "openi__PMC4258494_ksrr-26-253-g002.png",
    "openi__PMC4546968_CRIOR2015-294187.004.png"
  ],
  "osteoporosis": [
    "X-ray of hip osteoporosis.jpg",
    "Morbus Fabry MRT Osteoporosis 01.jpg",
    "STIR MRI of transient osteoporosis.jpg",
    "-2022-01-10 The Mammography, DEXA (osteoporosis diagnosis) and MRI Unit, Cromer Hospital.JPG",
    "Ausgepraegte Osteoporose mit betonten vertikalen Spongiosatrabekeln der BWK 85W - CT - 001.jpg",
    "openi__PMC3438046_2045-709X-20-16-5.png",
    "openi__PMC4899855_gr6.png"
  ],
  "achilles": [
    "Achilles insertional calcific tendinosis.jpg",
    "Achilles tendon tendonitis.jpg",
    "Calcaneal spur 001.jpg",
    "openi__PMC3482552_1741-7015-10-95-2.png"
  ],
  "ewing": [
    "Ewing's sarcoma MRI nci-vol-1832-300.jpg",
    "Ewing sarcoma tibia child.jpg",
    "Ewing sarcoma tibia child (cropped).jpg",
    "openi__PMC5057447_12957_2016_1006_Fig2_HTML.png",
    "openi__PMC2768632_IJRI-18-106-g003.png",
    "openi__PMC3738111_bjc2013356f3.png",
    "openi__PMC5256956_RCR2-4-0181-g001.png"
  ],
  "myeloma": [
    "Multiple myeloma skull CT arrows.PNG",
    "Left femur with myeloma.jpg",
    "Plasmozytom multiple Osteolysen Unterarm.png",
    "openi__PMC4956620_13244_2016_492_Fig7_HTML.png",
    "openi__PMC4956620_13244_2016_492_Fig8_HTML.png",
    "openi__PMC2042033_256_2007_323_Fig3_HTML.png",
    "openi__PMC5077718_10-1055-s-0035-1569460-i1500128-1.png",
    "openi__PMC5117116_fonc-06-00245-g001.png",
    "openi__PMC4263805_13244_2014_344_Fig8_HTML.png",
    "openi__PMC3866931_1475-2867-13-122-1.png"
  ],
  "metastasis": [
    "Radiography pelvis with bone metastasis 01.jpg",
    "Osteolytische Metastase eines Nierenzellkarzinoms im proximalen Femur rechts 68W - CR und CT - 001.jpg",
    "Femurmetastase Mammakarzinom pathologische Fraktur 68W - CR - 001.jpg",
    "openi__PMC4387986_rado-49-02-115f3.png",
    "openi__PMC3735565_pone.0070192.g006.png"
  ],
  "septic": [
    "SepticArth2011.jpg",
    "BioFix Hueftspacer bei septischer Pfannenlockerung 65W - CR ap - 001.jpg",
    "SepticArth2011 (cropped).jpg",
    "openi__PMC4908226_gr2.png"
  ],
  "ddh": [
    "Congenitaldislocation10.JPG",
    "Alpha and beta angles on neonatal hip ultrasonography.jpg",
    "X-ray of hip dysplasia in adult.jpg",
    "openi__PMC3162200_cios-3-202-g004.png"
  ],
  "mcl": [
    "Brain injury with herniation MRI.jpg",
    "Stieda-Pellegrini-Schatten bei einliegen 85M - CR ap - 001 - Annotation.jpg",
    "openi__PMC2682408_12178_2008_9026_Fig4_HTML.png",
    "openi__PMC2684213_12178_2007_9016_Fig4_HTML.png",
    "openi__PMC2684213_12178_2007_9016_Fig2_HTML.png",
    "openi__PMC4545864_13018_2015_273_Fig7_HTML.png"
  ],
  "tibplat": [
    "Lateral Tibial Plateau fracture XRay with Depression.jpg",
    "Lateral Tibial Plateau fracture XRay with Depression 2.jpg",
    "Lateral Tibial Plateau fracture CT with Depression 8.jpg",
    "Lateral Tibial Plateau fracture CT with Depression 3.jpg",
    "Subtle tibia fracture - X-ray.jpg",
    "Tibial Plateau Fracture.jpg",
    "openi__PMC4897230_ISRN2014-589538.001.png",
    "openi__PMC4650348_12880_2015_91_Fig1_HTML.png",
    "openi__PMC4487494_gr1.png",
    "openi__PMC5003498_traumamon-21-02-26733-g001.png",
    "openi__PMC4900201_gr2.png",
    "openi__PMC4900201_gr3.png"
  ],
  "patella": [
    "Patellaquerfraktur 83W - CR ap und CT sagittal und Volumen Rendering - 001.jpg",
    "Zuggurtungs-Osteosynthese bei Patella-Querfraktur.png",
    "openi__PMC4557262_IJMR-142-95-g004.png",
    "openi__PMC2740036_1757-1626-0002-0000007210-001.png",
    "openi__PMC3210283_11999_2011_1913_Fig2_HTML.png",
    "openi__PMC3210283_11999_2011_1913_Fig4_HTML.png"
  ],
  "stressfx": [
    "X-ray of stress fracture of the hip.jpg",
    "openi__PMC4546041_12891_2015_649_Fig1_HTML.png",
    "openi__PMC3872236_CRIM.ORTHOPEDICS2013-350236.002.png",
    "openi__PMC4336392_gr1.png",
    "openi__PMC3872236_CRIM.ORTHOPEDICS2013-350236.003.png",
    "openi__PMC2896580_10195_2010_96_Fig2_HTML.png",
    "openi__PMC3445081_10.1177_1941738109357300-fig2.png"
  ],
  "monteggia": [
    "Monteggia-Fraktur - Roe ap und seitlich - Annotation.jpg",
    "Monteggia-Fraktur 23W - CR ap - 001.jpg",
    "openi__PMC4519440_12245_2015_75_Fig4_HTML.png",
    "openi__PMC4315476_PAMJ-19-51-g001.png",
    "openi__PMC4315476_PAMJ-19-51-g003.png",
    "openi__PMC2987958_1752-1947-4-344-1.png",
    "openi__PMC3332319_11751_2011_125_Fig1_HTML.png",
    "openi__PMC2762552_IJO-43-389-g004.png",
    "openi__PMC2427046_1752-1947-2-190-1.png",
    "openi__PMC5337779_or-2017-1-7030-g002.png",
    "openi__PMC3090656_CRIM2011-682454.001.png",
    "openi__PMC2762552_IJO-43-389-g001.png",
    "openi__PMC1636036_1749-799X-1-12-1.png",
    "openi__PMC5011183_gr1.png",
    "openi__PMC1636036_1749-799X-1-12-3.png",
    "openi__PMC4275958_gr2.png",
    "openi__PMC4999371_10195_2015_389_Fig7_HTML.png"
  ],
  "lisfranc": [
    "openi__PMC2527576_1752-1947-2-266-2.png",
    "openi__PMC2527576_1752-1947-2-266-1.png",
    "openi__PMC3438872_10.1177_1941738110385203-fig7.png",
    "openi__PMC3497949_10.1177_1941738112459489-fig4.png",
    "openi__PMC5095961_13018_2016_471_Fig2_HTML.png",
    "openi__PMC5360672_11751_2016_273_Fig3_HTML.png",
    "openi__PMC3658402_10.1177_1941738113477991-fig5.png",
    "openi__PMC3658402_10.1177_1941738113477991-fig6.png",
    "openi__PMC3920919_CRIM.MEDICINE2014-130979.001.png",
    "openi__PMC3920919_CRIM.MEDICINE2014-130979.002.png"
  ],
  "talus": [
    "Occult stress fracture of the talus on 1 month follow-up T1 MRI.jpg",
    "Occult stress fracture of the talus on 1 month follow-up X-ray.jpg",
    "Subtle anterior talar fracture - X-ray.jpg",
    "Subtle anterior talar fracture - CT.jpg",
    "Avulsionsfraktur am vorderen Talus - Ligamentum talonaviculare 86W - CR seitlich - 001 - Annotation.jpg",
    "Talus Fraktur.jpg",
    "Talar Fractures.jpg",
    "openi__PMC2739475_IJO-42-319-g001.png",
    "openi__PMC2769472_1757-1626-0002-0000008793-003.png",
    "openi__PMC3752195_10.1177_1941738113497671-fig1.png"
  ],
  "spinalstenosis": [
    "LumbarSpinalStenosis case1 2 7.png",
    "Lumbar spinal stenosis 3 9.png",
    "Ligamenta flava Hypertrophie - MRT T2 axial.jpg",
    "openi__PMC3410134_JFCM-12-3-g003.png",
    "openi__PMC4432379_kjs-9-18-g002.png",
    "openi__PMC4518521_13104_2015_1272_Fig1_HTML.png",
    "openi__PMC3779778_asj-7-236-g002.png"
  ],
  "handoaa": [
    "Klassische Heberden-Arthrose und deformierende Rhizarthrose 77W - CR ap - 001.jpg",
    "Heberden-Arthrose 81W - CR ap - 001.jpg",
    "openi__PMC4468627_ABJS-3-94_F2.png"
  ],
  "hipimp": [
    "X-ray of pincer impingement.jpg",
    "Alpha angle measured in 45 degrees Dunn view.jpg",
    "X-ray of coxa profunda.jpg"
  ],
  "cppd": [
    "Chondrocalcinosis - annotated.jpg",
    "Chondrokalzinose Kniegelenk 95W - CR 2 Ebenen - 001.jpg",
    "Crowned dens - 95jw - CT axial und coronar - 001.jpg"
  ],
  "psa": [
    "Psoriasisarthritis distales Interphalangealgelenk 79M - CR seitlich - 001.jpg",
    "Artrite psoriasica Rx Mano Sn.PNG",
    "openi__PMC1526607_ar1934-1.png",
    "openi__PMC3259357_13244_2010_61_Fig18_HTML.png",
    "openi__PMC2797402_10067_2009_1292_Fig6_HTML.png"
  ],
  "chondrosarcoma": [
    "Mrichondrosarcoma.jpg",
    "Chondrosarcoma femoris sin.jpg",
    "Chondrosarkom proximaler Femur - 87jw - CT und Roe - 001.jpg",
    "Chondrosarkom (Großzeh).jpg",
    "openi__PMC3751216_402_2013_1800_Fig4_HTML.png",
    "openi__PMC3506041_cro-0005-0566-g01.png",
    "openi__PMC4399585_10-1055-s-0034-1395267-i18s2a5ra-4.png",
    "openi__PMC5354284_pone.0173665.g003.png",
    "openi__PMC4105778_ORT-85-438-g006.png",
    "openi__PMC4845606_SAJC-5-3-g001.png"
  ],
  "scfe": [
    "Trethowan's sign seen in SCFE.jpg",
    "X-ray of epiphysiolysis progressing to osteonecrosis.jpg",
    "Slipped capital femoral epiphysis.jpg"
  ],
  "perthes": [
    "LeggCalvePerthes2.jpg",
    "Radiografia leg-calvé-perthes.jpg",
    "Morbus Perthes rechts 6W - CR ap - 001.jpg",
    "openi__PMC5008506_medi-94-e2221-g002.png",
    "openi__PMC4292318_IJOrtho-49-1-g006.png"
  ],
  "ostoidoma": [
    "Osteoidosteom Roentgen-MRT.png",
    "Osteoidosteom MRT FS Oedem.jpg",
    "openi__PMC4316764_12891_2015_456_Fig2_HTML.png",
    "openi__PMC4920061_poljradiol-81-295-g001.png",
    "openi__PMC4897034_gr1.png",
    "openi__PMC4035489_13244_2014_332_Fig1_HTML.png",
    "openi__PMC4995670_13256_2016_1016_Fig1_HTML.png",
    "openi__PMC4531450_IJRI-25-261-g009.png",
    "openi__PMC3683463_CRIM.ORTHOPEDICS2013-254825.002.png"
  ],
  "ostoblastoma": [
    "openi__PMC2651735_ci09000104.png",
    "openi__PMC4931792_IJRI-26-279-g005.png",
    "openi__PMC3362015_TSWJ2012-290930.003.png",
    "openi__PMC4931792_IJRI-26-279-g004.png",
    "openi__PMC4898178_gr2.png",
    "openi__PMC4898178_gr3.png",
    "openi__PMC4035489_13244_2014_332_Fig2_HTML.png",
    "openi__PMC2684952_12178_2008_9042_Fig4_HTML.png"
  ],
  "fibrodysplasia": [
    "Dysplasia fibrosa.jpg",
    "openi__PMC3800513_11751_2013_174_Fig2_HTML.png"
  ],
  "abc": [
    "openi__PMC3359959_1750-1172-7-S1-S1-9.png",
    "openi__PMC4142887_11832_2014_588_Fig1_HTML.png",
    "openi__PMC4263798_13244_2014_356_Fig13_HTML.png",
    "openi__PMC5094822_rb-49-05-0322-g08.png",
    "openi__PMC3618005_1477-7819-11-54-1.png",
    "openi__PMC4849243_sicotj-1-32-fig4.png",
    "openi__PMC4918480_IJNM-31-185-g002.png"
  ],
  "ubc": [
    "openi__PMC4033795_10195_2013_272_Fig1_HTML.png",
    "openi__PMC4546294_12891_2015_668_Fig2_HTML.png",
    "openi__PMC4404065_12891_2015_543_Fig8_HTML.png",
    "openi__PMC3392819_ar3727-3.png",
    "openi__PMC2804006_1757-1626-2-9357-1.png",
    "openi__PMC3953525_ksrr-26-48-g001.png",
    "openi__PMC5058867_medi-95-e4168-g004.png"
  ],
  "enchondroma": [
    "openi__PMC3866668_IJNM-28-226-g002.png",
    "openi__PMC4636526_330_2015_3764_Fig1_HTML.png",
    "openi__PMC5044927_medi-95-e4966-g004.png",
    "openi__PMC5044927_medi-95-e4966-g005.png",
    "openi__PMC4546792_PAMJ-21-133-g001.png",
    "openi__PMC3443572_CRIM.RADIOLOGY2012-278920.001.png"
  ],
  "chondroblastoma": [
    "openi__PMC4263798_13244_2014_356_Fig10_HTML.png",
    "openi__PMC4435649_12957_2015_573_Fig2_HTML.png",
    "openi__PMC4263798_13244_2014_356_Fig11_HTML.png",
    "openi__PMC4898171_gr5a.png",
    "openi__PMC4898171_gr5b.png",
    "openi__PMC4898171_gr2.png",
    "openi__PMC3700752_1752-1947-7-164-1.png",
    "openi__PMC2684952_12178_2008_9042_Fig3_HTML.png"
  ],
  "nof": [
    "openi__PMC4901151_gr2.png",
    "openi__PMC4901151_gr5.png",
    "openi__PMC4901151_gr3.png",
    "openi__PMC3389949_poljradiol-76-4-32-g003.png",
    "openi__PMC4263798_13244_2014_356_Fig4_HTML.png"
  ],
  "lchbone": [
    "openi__PMC4114718_OL-08-03-1075-g01.png",
    "openi__PMC4114718_OL-08-03-1075-g02.png",
    "openi__PMC3905351_TONIJ-7-53_F1.png",
    "openi__PMC3935260_JCIS-3-60-g007.png",
    "openi__PMC3542424_277_2012_1555_Fig1_HTML.png"
  ],
  "chordoma": [
    "Chordoma3.JPG",
    "openi__PMC5315072_40487_2016_16_Fig1_HTML.png"
  ],
  "lymphomabone": [
    "CT of primary B-cell lymphoma left ilium.jpg",
    "MRI of primary B-cell lymphoma left ilium.jpg",
    "openi__PMC4705053_br-50-256-g002.png"
  ],
  "adamantinoma": [
    "openi__PMC4210480_13104_2014_3260_Fig1_HTML.png",
    "openi__PMC4918021_13256_2016_974_Fig1_HTML.png",
    "openi__PMC4581416_12957_2015_694_Fig3_HTML.png"
  ],
  "fibrosarcomabone": [
    "openi__PMC2365455_ci08001410.png"
  ],
  "hemangioendo": [
    "openi__PMC3569672_ci12004512.png",
    "openi__PMC5265858_medi-95-e4348-g004.png",
    "openi__PMC4474347_12876_2015_299_Fig1_HTML.png",
    "openi__PMC4474347_12876_2015_299_Fig2_HTML.png",
    "openi__PMC4474347_12876_2015_299_Fig3_HTML.png",
    "openi__PMC4474347_12876_2015_299_Fig4_HTML.png",
    "openi__PMC4719254_JOCR-3-34-g002.png",
    "openi__PMC4719254_JOCR-3-34-g003.png"
  ],
  "osteoma": [
    "openi__PMC4582165_acb-48-213-g002.png",
    "openi__PMC4582165_acb-48-213-g004.png",
    "openi__PMC3014836_CRIM2010-682081.003.png",
    "openi__PMC4035839_0392-100X-34-205-g002.png",
    "openi__PMC4341844_CRIOT2015-590783.002.png",
    "openi__PMC4873984_40349_2016_59_Fig1_HTML.png",
    "openi__PMC4531450_IJRI-25-261-g012.png",
    "openi__PMC4531450_IJRI-25-261-g002.png",
    "openi__PMC3875572_pone.0085359.g002.png"
  ],
  "osteopoikilosis": [
    "openi__PMC4531461_IJRI-25-322-g003.png",
    "openi__PMC4921644_CRIDM2016-2483041.003.png"
  ],
  "cortdesmoid": [
    "openi__PMC3337871_kjr-13-342-g001.png",
    "openi__PMC5110481_13244_2016_527_Fig11_HTML.png",
    "openi__PMC4126137_IJRI-24-225-g008.png",
    "openi__PMC3583030_TOORTHJ-7-40_F1.png"
  ],
  "iolipoma": [
    "openi__PMC3678437_CRIM.NM2013-519341.001.png"
  ],
  "browntumor": [
    "X-ray of brown tumors in the pelvis and a hip fracture in renal osteodystrophy.jpg",
    "openi__PMC3683216_IJEM-17-329-g001.png",
    "openi__PMC4126137_IJRI-24-225-g019.png",
    "openi__PMC4336398_gr5.png"
  ],
  "ossifying-fibroma": [
    "Panoramic radiograph showing a radiolucency around the distal root of the first mandibular molar.png",
    "openi__PMC5394153_234_2017_1798_Fig6_HTML.png",
    "openi__PMC4312691_jced-6-e588-g001.png",
    "openi__PMC4598389_TODENTJ-9-340_F2.png",
    "openi__PMC4697011_isd-45-253-g004.png"
  ],
  "paget": [
    "openi__PMC4531461_IJRI-25-322-g005.png",
    "openi__PMC2887900_1752-1947-4-166-1.png",
    "openi__PMC2887900_1752-1947-4-166-3.png",
    "openi__PMC5288610_JOCR-6-103-g004.png",
    "openi__PMC3800309_IJNM-28-121-g001.png",
    "openi__PMC4898074_gr1.png",
    "openi__PMC3800309_IJNM-28-121-g002.png",
    "openi__PMC4379677_IJNM-30-151-g002.png",
    "openi__PMC1934928_256_2006_270_Fig19_HTML.png",
    "openi__PMC4178943_GMS-12-13-g-002.png",
    "openi__PMC3179308_jbmr0026-0920-f3.png",
    "openi__PMC4178943_GMS-12-13-g-003.png",
    "openi__PMC4178943_GMS-12-13-g-005.png"
  ],
  "galeazzi": [
    "Galeazzi-Fraktur Roentgen ap und seitlich - Annotation.jpg",
    "Galeazzi-Fraktur Roentgen ap und seitlich - 002 - Annotation.jpg",
    "Galeazzi Fracture of Distal Radius.jpg",
    "Galeazzi-Fraktur Roentgen ap und seitlich.jpg",
    "Galeazzi-Fraktur Roentgen ap und seitlich - 002.jpg",
    "openi__PMC4519440_12245_2015_75_Fig3_HTML.png",
    "openi__PMC4432366_kjs-9-85-g001.png",
    "openi__PMC3632846_umj0082-0026-f2.png",
    "openi__PMC3632846_umj0082-0026-f9.png",
    "openi__PMC3491781_IJOrtho-46-493-g009.png",
    "openi__PMC3632846_umj0082-0026-f3.png",
    "openi__PMC2947735_IJOrtho-44-448-g002.png",
    "openi__PMC3285057_1752-1947-5-589-1.png",
    "openi__PMC3270608_IJOrtho-46-65-g003.png",
    "openi__PMC4719264_JOCR-4-25-g002.png",
    "openi__PMC4137524_IJOrtho-48-426-g002.png",
    "openi__PMC3285057_1752-1947-5-589-3.png",
    "openi__PMC3285057_1752-1947-5-589-4.png",
    "openi__PMC4137524_IJOrtho-48-426-g001.png",
    "openi__PMC4719264_JOCR-4-25-g001.png"
  ],
  "bennett": [
    "Bennet's fracture X-ray (1).jpg",
    "Bennet's fracture X-ray (2).jpg",
    "Bennet's fracture X-ray (3).jpg",
    "Bennetts Fracture.jpg",
    "Bennet's Fracture of the 1st Metacarpal.jpg",
    "openi__PMC4519440_12245_2015_75_Fig8_HTML.png",
    "openi__PMC4484322_PAMJ-20-268-g001.png",
    "openi__PMC4519440_12245_2015_75_Fig7_HTML.png",
    "openi__PMC4147470_IJPS-47-271-g001.png",
    "openi__PMC4147470_IJPS-47-271-g002.png",
    "openi__PMC3137866_IJRI-21-98-g016.png",
    "openi__PMC5155252_WJO-7-776-g001.png",
    "openi__PMC2823151_JETS-03-82-g009.png"
  ],
  "boxer": [
    "Boxers fracture-lateral xray.JPG",
    "Hand in gips (Fifth Metacarpal Fracture).jpg",
    "Hand in gips (Fifth Metacarpal Fracture) 3.jpg",
    "Hand in gips (Fifth Metacarpal Fracture) 2.jpg",
    "Boxers fracture.JPG",
    "Neck Fracture of the Fourth Metacarpal Bone.png",
    "openi__PMC2684218_12178_2007_9014_Fig5_HTML.png",
    "openi__PMC3632846_umj0082-0026-f5.png"
  ],
  "scapholunate": [
    "Scapholunate dissociation and SLAC wrist.jpg",
    "Scapholunate dissociation and SLAC wrist lateral.jpg",
    "Scapholunate advanced collapse wrist posteroanterior.jpg",
    "openi__PMC4141341_13244_2014_337_Fig2_HTML.png",
    "openi__PMC3052427_10195_2011_131_Fig3_HTML.png",
    "openi__PMC4041640_1471-2474-15-172-3.png"
  ],
  "triquetrum": [
    "Mehrfragmentaere dorsale Triquetrum-Fraktur 41M - CR seitlich CT axial - 001.jpg",
    "Typische dorsale Absprengung aus dem Os triquetrum 70M - CR und CT - 001 - Annotation.jpg",
    "Dorsale Triquetrumabsprengung - CT VRT with arrow.png",
    "Triquetrum Fraktur.jpg",
    "openi__PMC3664678_cios-5-98-g005.png",
    "openi__PMC3664678_cios-5-98-g003.png"
  ],
  "jefferson": [
    "CT of Jefferson fracture.jpg",
    "Jeffersonfraktur - 84jm- CT axial - 001.jpg",
    "openi__PMC5265194_13244_2016_530_Fig17_HTML.png",
    "openi__PMC2989524_IJOrtho-41-305-g001.png",
    "openi__PMC3309376_arm-35-934-g001.png",
    "openi__PMC3445174_10.1177_1941738109343160-fig5.png",
    "openi__PMC3948906_13244_2013_304_Fig6_HTML.png",
    "openi__PMC2698165_kjr-5-219-g001.png",
    "openi__PMC4686406_asj-9-966-g004.png",
    "openi__PMC3589859_JETS-6-47-g001.png",
    "openi__PMC4430563_kjs-9-358-g001.png",
    "openi__PMC3977369_IJOrtho-48-145-g002.png",
    "openi__PMC2972617_cln-65-10-953-g004.png",
    "openi__PMC3589859_JETS-6-47-g003.png",
    "openi__PMC5296845_IJOrtho-51-28-g005.png",
    "openi__PMC4564635_CRIEM2015-320357.001.png",
    "openi__PMC3977369_IJOrtho-48-145-g006.png",
    "openi__PMC3445174_10.1177_1941738109343160-fig4.png",
    "openi__PMC5265194_13244_2016_530_Fig8_HTML.png",
    "openi__PMC5265194_13244_2016_530_Fig7_HTML.png"
  ],
  "hangman": [
    "CT of hangman's fracture.jpg",
    "Hangman's fracture.JPG",
    "Hangman's fracture.jpg",
    "openi__PMC4869415_traumamon-21-01-31984-g002.png",
    "openi__PMC5265194_13244_2016_530_Fig20_HTML.png",
    "openi__PMC3570178_ETM-05-03-0667-g00.png",
    "openi__PMC3570178_ETM-05-03-0667-g01.png",
    "openi__PMC3980557_JCVJS-4-59-g009.png",
    "openi__PMC3980557_JCVJS-4-59-g011.png",
    "openi__PMC5402328_SNI-8-43-g003.png",
    "openi__PMC2938496_JETS-3-292-g001.png",
    "openi__PMC3980557_JCVJS-4-59-g007.png",
    "openi__PMC3445174_10.1177_1941738109343160-fig6.png"
  ],
  "olecranon": [
    "Olecranon Fracture X-Ray.jpg",
    "openi__PMC4122682_11751_2014_197_Fig1_HTML.png",
    "openi__PMC4719344_JOCR-5-19-g001.png",
    "openi__PMC2265682_1749-799X-3-9-6.png",
    "openi__PMC3470946_1752-1947-6-273-2.png",
    "openi__PMC4602312_srep15120-f2.png",
    "openi__PMC3977122_CRIS2014-723756.001.png",
    "openi__PMC3087701_1752-1947-5-142-1.png",
    "openi__PMC4625882_40001_2015_184_Fig2_HTML.png"
  ],
  "hillsachs": [
    "MRI. Hill Sachs lesion..jpg",
    "Inverse Hill-Sachs-Laesion - posterior shoulder dislocation - CT axial und Roe 001 - Annotation.jpg",
    "Inverse Hill-Sachs-Laesion - posterior shoulder dislocation - CT axial und Roe 001.jpg",
    "openi__PMC3781863_oajsm-1-137Fig6.png",
    "openi__PMC3137866_IJRI-21-98-g012.png",
    "openi__PMC4124833_AORTH2014-640952.002.png",
    "Hill sachs Delle.jpg",
    "openi__PMC4736246_13037_2016_92_Fig1_HTML.png",
    "openi__PMC3785059_TOORTHJ-7-338_F3.png",
    "openi__PMC4736246_13037_2016_92_Fig3_HTML.png",
    "openi__PMC4321679_CRIOR2015-789203.001.png",
    "openi__PMC1950517_1752-1947-1-41-3.png",
    "openi__PMC5117164_10.1177_2325967116670376-fig2.png",
    "openi__PMC5114256_cios-8-428-g005.png",
    "openi__PMC4987320_cios-8-333-g005.png",
    "openi__PMC3435933_10.1177_1941738112438040-fig4.png",
    "openi__PMC4983660_CRIOR2016-4170923.001.png",
    "openi__PMC4719412_JOCR-5-81-g001.png"
  ],
  "bankart": [
    "MRI. Bony Bankart lesion at the inferior glenoid..jpg",
    "Knoecherne Bankartlaesion 55jm - MRT PDwFS paracoronar - 001 - Annotation.jpg",
    "openi__PMC3137866_IJRI-21-98-g002.png",
    "openi__PMC2657334_10195_2008_27_Fig1_HTML.png",
    "openi__PMC2657334_10195_2008_27_Fig2_HTML.png",
    "openi__PMC2824094_cios-2-39-g001.png",
    "openi__PMC3720992_256_2013_1644_Fig8_HTML.png",
    "openi__PMC3445168_10.1177_1941738111400562-fig7.png",
    "openi__PMC3720992_256_2013_1644_Fig11_HTML.png",
    "openi__PMC5400211_10.1177_2325967117694338-fig2.png",
    "openi__PMC3785059_TOORTHJ-7-338_F2.png",
    "openi__PMC3781863_oajsm-1-137Fig3.png",
    "openi__PMC5117164_10.1177_2325967116670376-fig1.png"
  ],
  "proxfibula": [
    "openi__PMC4512960_12245_2015_76_Fig3_HTML.png",
    "openi__PMC3613077_RRP2013-370169.008.png",
    "openi__PMC3085975_SHORTS-11-00901.png",
    "openi__PMC4719410_JOCR-5-75-g005.png",
    "openi__PMC4719410_JOCR-5-75-g004.png",
    "openi__PMC4620947_gr3.png",
    "openi__PMC3368108_256_2011_1284_Fig2_HTML.png",
    "openi__PMC3673860_1752-1947-7-146-2.png"
  ],
  "hemarthrosis": [
    "openi__PMC3384927_APM2012-201271.003.png",
    "openi__PMC3590945_MIRT-20-38-g6.png"
  ],
  "charcot": [
    "Charcot-Fuß Grad 0, aktives Stadium. MRT, T-2 Wichtung.jpg",
    "openi__PMC3161273_2123fig2.png"
  ],
  "dish": [
    "Ossifikation Ligamentum longitudinale posterius HWS bei DISH - CT axial - 001.jpg",
    "Ossifikation Ligamentum longitudinale posterius HWS bei DISH - CT coronar und sagittal - 001.jpg",
    "Ossifikation Ligamentum longitudinale posterius HWS bei DISH - CT axial und sagittal - 001.jpg",
    "openi__PMC4933853_CRIEM2016-7657652.004.png",
    "openi__PMC3420730_CRIM.OTOLARYNGOLOGY2012-123825.001.png",
    "openi__PMC3893600_1471-2407-14-9-2.png",
    "openi__PMC3893600_1471-2407-14-9-1.png",
    "openi__PMC3092929_198_2010_1409_Fig3_HTML.png",
    "openi__PMC2989211_586_2010_1280_Fig2_HTML.png",
    "openi__PMC2989211_586_2010_1280_Fig3_HTML.png"
  ],
  "synov-chondro": [
    "PD MRI of synovial chondromatosis of the knee.jpg",
    "X-ray of synovial chondromatosis.jpg",
    "Synovialchondromatose in einer Baker-Zyste 62M - CR seitlich MR T2 axial - 001.jpg",
    "openi__PMC4703909_or-2015-4-5705-g001.png",
    "openi__PMC5094822_rb-49-05-0322-g01.png",
    "openi__PMC2780648_776_2006_Article_1037_Fig5.png",
    "openi__PMC4818305_gr1.png"
  ],
  "pvns": [
    "openi__PMC3645342_ci13002203.png",
    "openi__PMC4898176_gr5.png",
    "openi__PMC3661378_2045-3329-3-8-4.png",
    "openi__PMC3661378_2045-3329-3-8-3.png",
    "openi__PMC5367600_eor-1-260-g002.png"
  ],
  "shoulder-oa": [
    "X-ray of post-traumatic sternoclavicular osteoarthritis.jpg",
    "openi__PMC2840816_IJSS-02-41-g001.png",
    "openi__PMC4766148_40064_2016_1874_Fig7_HTML.png",
    "openi__PMC4772418_IJSS-10-48-g001.png",
    "openi__PMC3874228_10.1177_1941738113514344-fig2.png",
    "openi__PMC4766148_40064_2016_1874_Fig6_HTML.png",
    "openi__PMC3978388_CRIOR2014-760219.002.png",
    "openi__PMC4041961_kjae-66-398-g002.png",
    "openi__PMC4772413_IJSS-10-28-g003.png",
    "openi__PMC2769433_1757-1626-0002-0000008388-003.png"
  ],
  "ankle-oa": [
    "X-ray of ankle osteoarthritis.jpg",
    "Ankle Joint Arthritis xray.jpg",
    "openi__PMC4875581_40634_2016_48_Fig3_HTML.png",
    "openi__PMC3913429_rjt12403.png",
    "openi__PMC4337000_WJNM-14-10-g009.png",
    "openi__PMC4484349_TOORTHJ-9-114_F1.png",
    "openi__PMC3203855_1471-2474-12-233-3.png",
    "openi__PMC3478506_256_2012_1421_Fig1_HTML.png"
  ],
  "oci": [
    "openi__PMC4126143_IJRI-24-271-g016.png"
  ],
  "lipoma": [
    "T1 MRI of thenar intramuscular lipoma.jpg",
    "Ultrasonography of a lipoma.jpg",
    "Lipoma ultrasound 110322120428 1206230.jpg",
    "Lipoma ultrasound 110322120428 1206550.jpg",
    "Lipoma ultrasound 110322120428 1207150.jpg",
    "openi__PMC2895296_IJSS-3-13-g002.png",
    "openi__PMC3511498_pone.0050234.g003.png",
    "openi__PMC3259409_13244_2010_19_Fig3_HTML.png",
    "openi__PMC3447439_poljradiol-77-3-9-g001.png"
  ],
  "angiolipoma": [
    "openi__PMC4697921_rjv16501.png",
    "openi__PMC2718203_kjr-1-212-g001.png",
    "openi__PMC3772264_kjr-14-810-g001.png",
    "openi__PMC3772264_kjr-14-810-g003.png",
    "openi__PMC4619514_13104_2015_1593_Fig4_HTML.png"
  ],
  "schwannoma": [
    "openi__PMC2995979_ymj-51-938-g001.png",
    "openi__PMC4125423_ccrep-7-2014-071f1.png",
    "openi__PMC1783662_1471-2490-7-1-1.png",
    "openi__PMC3663832_1477-7819-11-108-2.png",
    "openi__PMC3384824_kjr-13-425-g006.png"
  ],
  "neurofibroma": [
    "Neurofibroma pelvis.jpg",
    "openi__PMC3064649_1752-1947-5-106-3.png"
  ],
  "hemangioma-st": [
    "openi__PMC3259397_13244_2011_73_Fig3_HTML.png",
    "openi__PMC2974233_kjr-11-692-g001.png",
    "openi__PMC3362730_kjped-55-164-g001.png",
    "openi__PMC3590343_kjr-14-294-g001.png",
    "openi__PMC4931792_IJRI-26-279-g009.png"
  ],
  "lymphangioma": [
    "openi__PMC3579993_13244_2012_201_Fig12_HTML.png",
    "openi__PMC4437906_10.1177_2047981614564911-fig3.png",
    "openi__PMC2893317_kjr-11-457-g005.png",
    "openi__PMC3424852_JCIS-2-33-g009.png",
    "openi__PMC3835813_CRIM.UROLOGY2013-136459.001.png",
    "openi__PMC4998379_medi-95-e3109-g004.png"
  ],
  "ganglion": [
    "openi__PMC2275269_1749-7221-3-4-1.png",
    "Ganglionzyste am hinteren Kreuzband 49M - MR PDW FS sagittal - 001.jpg",
    "Ganglionzyste am hinteren Kreuzband 49M - MR PDW FS axial - 001.jpg",
    "openi__PMC4678247_ksrr-27-255-g004.png"
  ],
  "baker": [
    "Grosse lobulierte Baker-Zyste an typischer Stelle 26W - MR - 001.jpg",
    "openi__PMC3199937_ARTH2011-751593.001.png",
    "openi__PMC4805620_13244_2016_463_Fig8_HTML.png",
    "openi__PMC3474218_CRIM.RADIOLOGY2012-292414.001.png",
    "openi__PMC3675245_13244_2013_240_Fig1_HTML.png",
    "openi__PMC3047824_12245_2009_157_Fig3_HTML.png",
    "openi__PMC3526764_ksrr-24-249-g001.png",
    "openi__PMC5237725_CRIOR2017-4293104.004.png"
  ],
  "elastofibroma": [
    "Elastofibroma dorsi im PET-CT 50W - PET-CT - 001 - Annotation.jpg",
    "openi__PMC1797045_1477-7819-5-15-2.png",
    "openi__PMC4735540_KITP-12-26546-g001.png",
    "openi__PMC2276598_SRCM2008-756565.001.png",
    "openi__PMC4000866_kjtcs-47-111-g002.png",
    "openi__PMC4275815_gr1.png",
    "openi__PMC4083310_or-2014-2-5329-g005.png",
    "openi__PMC2276598_SRCM2008-756565.002.png",
    "openi__PMC2276598_SRCM2008-756565.003.png"
  ],
  "lipoblastoma": [
    "openi__PMC2651735_ci09000101.png"
  ],
  "fibroma-sheath": [
    "openi__PMC4667124_cios-7-523-g002.png",
    "openi__PMC4035494_13244_2014_334_Fig3_HTML.png"
  ],
  "soft-chondroma": [
    "openi__PMC5094822_rb-49-05-0322-g02.png",
    "openi__PMC3970453_CRIM2014-414861.004.png",
    "openi__PMC4113653_ETM-08-03-0841-g00.png",
    "openi__PMC3789040_OL-06-03-0817-g00.png"
  ],
  "granular-cell": [
    "openi__PMC4866422_13256_2016_896_Fig2_HTML.png",
    "openi__PMC4866422_13256_2016_896_Fig1_HTML.png",
    "openi__PMC4274649_CRIPU2014-807430.004.png",
    "openi__PMC4274649_CRIPU2014-807430.002.png",
    "openi__PMC3576319_1757-2215-5-33-2.png",
    "openi__PMC4274649_CRIPU2014-807430.001.png",
    "openi__PMC4274649_CRIPU2014-807430.003.png",
    "openi__PMC4600547_CRIS2015-568940.001.png",
    "openi__PMC4453127_JCIS-5-27-g009.png"
  ],
  "leiomyoma": [
    "openi__PMC2713885_kjr-3-199-g001.png",
    "openi__PMC3890726_kjim-21-199-g001.png",
    "openi__PMC2718110_kjr-2-132-g003.png",
    "openi__PMC2718110_kjr-2-132-g001.png",
    "openi__PMC2718110_kjr-2-132-g004.png",
    "openi__PMC2718110_kjr-2-132-g002.png"
  ],
  "myxoma": [
    "openi__PMC1450266_1471-2369-7-4-1.png",
    "openi__PMC3743382_IJEM-17-740-g003.png",
    "openi__PMC2918864_cro0002-0150-f01.png",
    "openi__PMC3433341_1477-7819-10-132-2.png"
  ],
  "nodular-fasciitis": [
    "openi__PMC4484290_usg-14068-f8.png"
  ],
  "desmoid": [
    "MRI desmoid T1 fl2d FS.jpg",
    "openi__PMC3637375_1752-1947-7-100-1.png",
    "openi__PMC4006838_pone.0096391.g003.png",
    "openi__PMC4006838_pone.0096391.g002.png",
    "openi__PMC2270274_1477-7819-6-17-1.png",
    "openi__PMC4635752_medi-94-e1547-g006.png",
    "openi__PMC4635752_medi-94-e1547-g004.png",
    "openi__PMC4954860_JoU-2016-0016-g011.png",
    "openi__PMC3119586_ijgm-4-443f1.png"
  ],
  "alt": [
    "openi__PMC2584648_1757-1626-1-296-1.png",
    "openi__PMC2203997_1477-7819-5-131-1.png",
    "openi__PMC3872425_SRCM2013-982784.001.png",
    "openi__PMC3872425_SRCM2013-982784.002.png",
    "openi__PMC5247384_40792_2017_291_Fig1_HTML.png",
    "openi__PMC1526433_1477-7819-4-33-2.png",
    "openi__PMC1526433_1477-7819-4-33-3.png"
  ],
  "myxoid-lps": [
    "HG mixoid liposarcoma, MRI, 2019, 8, 08.png",
    "HG mixoid liposarcoma, MRI, 2019, 10, 11.png",
    "HG mixoid liposarcoma, MRI, 2019, 8, 11.png",
    "HG mixoid liposarcoma, MRI, 2019, 10, 13.png",
    "openi__PMC3599544_2045-3329-2-25-5.png",
    "openi__PMC2678127_1477-7819-7-42-3.png",
    "openi__PMC4421890_JCIS-5-24-g008.png",
    "openi__PMC3645342_ci13002209.png",
    "openi__PMC3838803_CRIM.ONCMED2013-692754.001.png"
  ],
  "synovialsarcoma": [
    "openi__PMC4197924_rju01403.png",
    "openi__PMC4499550_kjr-16-853-g005.png",
    "openi__PMC4570935_RRP2015-752054.008.png",
    "openi__PMC4628455_bjr.20140843.g005.png",
    "openi__PMC4628455_bjr.20140843.g004.png",
    "openi__PMC4412097_13569_2015_27_Fig1_HTML.png",
    "openi__PMC4301506_OL-09-02-0661-g03.png",
    "openi__PMC4301506_OL-09-02-0661-g02.png",
    "openi__PMC4484290_usg-14068-f1.png",
    "openi__PMC4895864_gr1b.png",
    "openi__PMC4895864_gr1a.png"
  ],
  "dfsp": [
    "openi__PMC3948907_13244_2013_294_Fig5_HTML.png",
    "openi__PMC4673335_BMRI2015-642549.002.png",
    "openi__PMC4616540_medi-94-e1001-g001.png",
    "openi__PMC4616540_medi-94-e1001-g002.png",
    "openi__PMC4616540_medi-94-e1001-g003.png",
    "openi__PMC4616540_medi-94-e1001-g004.png",
    "openi__PMC4616540_medi-94-e1001-g005.png"
  ],
  "asps": [
    "openi__PMC3931484_1477-7819-12-36-1.png",
    "openi__PMC3931484_1477-7819-12-36-2.png",
    "openi__PMC2955565_1477-7819-8-84-2.png",
    "openi__PMC2955565_1477-7819-8-84-1.png",
    "openi__PMC4023058_kjr-15-381-g001.png",
    "openi__PMC2718140_kjr-1-56-g002.png",
    "openi__PMC4665696_ol-10-05-2777-g00.png"
  ],
  "hemangiopericytoma": [
    "openi__PMC2627159_kjr-8-336-g012.png",
    "openi__PMC3659647_CRIM.OTOLARYNGOLOGY2013-796713.002.png",
    "openi__PMC4931792_IJRI-26-279-g019.png",
    "openi__PMC3457717_CRIM2012-628756.001.png",
    "openi__PMC4550184_ott-8-2169Fig2.png",
    "openi__PMC4550184_ott-8-2169Fig4.png",
    "openi__PMC5056333_WJCO-7-414-g001.png",
    "openi__PMC2590878_ci08003001.png",
    "openi__PMC3195266_fneur-02-00064-g004.png",
    "openi__PMC2661536_ci09000301.png"
  ],
  "sft": [
    "openi__PMC1523192_1471-2482-6-10-2.png",
    "openi__PMC4850662_13098_2016_148_Fig2_HTML.png",
    "openi__PMC4899879_gr1.png",
    "openi__PMC4899879_gr2.png",
    "openi__PMC3424684_SNI-3-83-g001.png",
    "openi__PMC3700998_OL-05-06-1783-g00.png",
    "openi__PMC3637805_2045-3329-3-1-1.png",
    "openi__PMC3637805_2045-3329-3-1-2.png"
  ],
  "plantar-fibroma": [
    "openi__PMC5265197_13244_2016_533_Fig6_HTML.png",
    "openi__PMC3395298_SRCM2012-215810.001.png",
    "openi__PMC3395298_SRCM2012-215810.007.png",
    "openi__PMC3395298_SRCM2012-215810.010.png"
  ],
  "quad-tear": [
    "openi__PMC3341810_ksrr-23-244-g003.png",
    "openi__PMC4473788_PAMJ-18-55-g004.png",
    "openi__PMC4473788_PAMJ-18-55-g003.png",
    "openi__PMC4719250_JOCR-3-22-g003.png",
    "openi__PMC4719250_JOCR-3-22-g004.png",
    "openi__PMC3161952_1752-1947-5-331-1.png",
    "openi__PMC4369576_rjv02602.png",
    "openi__PMC2967677_wjem11_4p306f1.png",
    "openi__PMC2967677_wjem11_4p306f2.png",
    "openi__PMC4764314_PAMJ-22-243-g003.png",
    "openi__PMC5093266_CRIOR2016-4713137.001.png"
  ],
  "hamstring": [
    "Hamstring tear STIR cor annotatios.jpg",
    "MRT Hamstring 01.jpg",
    "openi__PMC3483739_RRP2012-230679.015.png",
    "openi__PMC3948506_10195_2013_253_Fig11_HTML.png"
  ],
  "calf-tear": [
    "Partialruptur Caput mediale Musculus gastrocnemius 89M - MR PDW FS sagittal - 001.jpg",
    "Partialruptur Caput mediale Musculus gastrocnemius 89M - MR PDW FS axial - 001.jpg"
  ],
  "adductor": [
    "openi__PMC3402660_167_2011_1775_Fig6_HTML.png",
    "openi__PMC3402660_167_2011_1775_Fig3_HTML.png"
  ],
  "gluteus-min": [
    "openi__PMC4212357_10.1177_1941738114552801-fig13.png"
  ],
  "deltoid": [
    "openi__PMC4559781_kjr-16-1096-g001.png",
    "openi__PMC4799583_CMJ-129-361-g001.png",
    "openi__PMC3745690_IJOrtho-47-364-g004.png"
  ],
  "biceps-long": [
    "openi__PMC4553284_cios-7-351-g001.png",
    "openi__PMC4239113_pone.0113803.g001.png"
  ],
  "biceps-dist": [
    "MRI. rupture of the distal biceps tendon..jpg",
    "Bizepssehnenruptur distal MRT PDW FS.jpg",
    "openi__PMC3861966_aob-21-076-g01.png",
    "openi__PMC3861966_aob-21-076-g02.png",
    "openi__PMC4764315_PAMJ-22-258-g003.png",
    "openi__PMC4897327_gr1.png"
  ],
  "triceps": [
    "openi__PMC4558418_CRIOR2015-903690.001.png",
    "openi__PMC4900026_gr2.png",
    "openi__PMC4900026_gr3.png",
    "openi__PMC3445134_10.1177_1941738111398613-fig2.png",
    "openi__PMC4900026_gr1.png",
    "openi__PMC5367525_eor-1-255-g003.png",
    "openi__PMC4063199_ISRN.ORTHOPEDICS2011-869703.005.png",
    "openi__PMC4063199_ISRN.ORTHOPEDICS2011-869703.004.png"
  ],
  "pec-major": [
    "openi__PMC3199274_1758-2555-3-20-1.png",
    "openi__PMC4878628_1679-4508-eins-13-4-0541-gf02.png",
    "openi__PMC5155096_RRP2016-4801474.009.png",
    "openi__PMC5065674_WJO-7-670-g003.png",
    "openi__PMC4878628_1679-4508-eins-13-4-0541-gf01.png",
    "openi__PMC5065674_WJO-7-670-g002.png",
    "openi__PMC5288615_JOCR-6-17-g002.png"
  ],
  "extensor": [
    "openi__PMC5040576_JOCR-6-63-g002.png",
    "openi__PMC4579745_JoU-2012-0006-g004.png",
    "openi__PMC2599799_11751_2008_46_Fig2_HTML.png",
    "openi__PMC5036340_IJRI-26-386-g009.png",
    "openi__PMC5072972_medi-95-e5145-g002.png"
  ],
  "plantaris": [
    "openi__PMC3352606_JCIS-2-19-g003.png",
    "openi__PMC3352606_JCIS-2-19-g002.png"
  ],
  "mallet": [
    "Mallet Finger with fracture fragment.jpg",
    "openi__PMC4573865_gr1.png",
    "openi__PMC5025579_13018_2016_432_Fig14_HTML.png",
    "openi__PMC4825212_usg-15051-f6.png",
    "openi__PMC2684218_12178_2007_9014_Fig3_HTML.png"
  ],
  "volar-plate": [
    "openi__PMC4894366_eplasty16ic22_fig2.png",
    "openi__PMC4825212_usg-15051-f18.png",
    "openi__PMC5036340_IJRI-26-386-g018.png",
    "openi__PMC4825212_usg-15051-f21.png",
    "openi__PMC4654092_arm-39-838-g003.png",
    "openi__PMC4825212_usg-15051-f19.png",
    "openi__PMC4894366_eplasty16ic22_fig3.png"
  ],
  "central-slip": [
    "openi__PMC4242053_PAMJ-18-230-g003.png"
  ],
  "mortons": [
    "openi__PMC3691490_40261_2013_90_Fig1_HTML.png",
    "openi__PMC3377144_IJOrtho-46-321-g001.png",
    "openi__PMC5143741_CRIOR2016-9575917.001.png",
    "openi__PMC3483739_RRP2012-230679.022.png"
  ],
  "compartment": [
    "openi__PMC5270429_NRR-11-1928-g001.png",
    "openi__PMC4721156_TI-22-104-g003.png"
  ],
  "myositis": [
    "Pyomyositis MRI.jpg",
    "Cor post gad MRI Tropical pyomyositis.JPG",
    "Cor T2 MRI tropical pyomyositis.JPG",
    "Pyomyositis multifokal - MRT Unterarm T1FSKM und T2.jpg",
    "CT pyomyositis.jpg",
    "Tropical pyomyositis CT.JPG",
    "Axial T1 FS Post Gad tropical pyomyositis.JPG",
    "openi__PMC4492329_kjhbps-18-29-g001.png",
    "openi__PMC3464078_DFA-3-18754-g004.png",
    "openi__PMC4781764_kjr-17-245-g003.png"
  ],
  "rhabdo-trauma": [
    "openi__PMC4643462_gr2.png",
    "openi__PMC3096912_1865-1380-4-20-1.png"
  ],
  "denervation": [
    "openi__PMC1435340_ci04000102.png",
    "openi__PMC4109127_CRIOR2014-589021.003.png",
    "openi__PMC3016827_jsls-8-4-391-g01.png"
  ],
  "tendon-xanthoma": [
    "openi__PMC4898210_gr2.png",
    "openi__PMC5383536_jat-24-189-g004.png",
    "openi__PMC4498853_ccr30003-0411-f1.png",
    "openi__PMC4369972_omu06601.png",
    "openi__PMC4369972_omu06602.png",
    "openi__PMC4264335_13023_2014_179_Fig5_HTML.png",
    "openi__PMC4264335_13023_2014_179_Fig6_HTML.png"
  ],
  "spondylolysis": [
    "openi__PMC4936246_13018_2016_402_Fig1_HTML.png"
  ],
  "schmorl": [
    "Mrt-schmorl.jpg",
    "openi__PMC4564749_jkns-58-147-g001.png",
    "openi__PMC4564749_jkns-58-147-g002.png",
    "openi__PMC5397788_12891_2017_1512_Fig2_HTML.png"
  ],
  "syringomyelia": [
    "Syringomyelia (with arrow).png",
    "openi__PMC4048985_rju05405.png",
    "openi__PMC4330226_asj-9-99-g003.png"
  ],
  "chiari": [
    "MRI of human brain with type-1 Arnold-Chiari malformation and herniated cerebellum.jpg",
    "MRI of human brain with type-1 Arnold-Chiari malformation and herniated cerebellum es.jpg",
    "Sagittal MRI scan of brain of patient with Chiari malformation.jpg",
    "openi__PMC3981373_cp-2011-3-e57-g003.png",
    "openi__PMC4279813_12887_2014_294_Fig1_HTML.png",
    "openi__PMC4900115_gr5.png",
    "openi__PMC4322850_CRINM2015-487931.003.png",
    "openi__PMC4900115_gr4.png",
    "openi__PMC4085908_JCVJS-5-3-g008.png"
  ],
  "meniscoid": [
    "Cervical Spine MRI showing disc herniation.jpg",
    "C6-C7-disc-herniation-cevical-mri-scan.jpg",
    "C6-C7-disc-herniation-cevical-mri-scan-cropped.jpg",
    "openi__PMC3976942_CRIA2014-718690.001.png",
    "openi__PMC3976942_CRIA2014-718690.002.png",
    "openi__PMC3445165_10.1177_1941738111403866-fig1.png",
    "openi__PMC4872569_JCVJS-7-91-g003.png",
    "openi__PMC2672132_jkms-24-302-g001.png"
  ],
  "opll": [
    "Ossifikation Ligamentum longitudinale posterius HWS CT sagittal.jpg",
    "Ossifikation Ligamentum longitudinale posterius HWS CT axial.jpg",
    "openi__PMC4335137_pjab-90-405-g001.png",
    "openi__PMC4431003_kjs-9-205-g002.png",
    "openi__PMC4612692_rmdopen2015000068f01.png"
  ],
  "blount": [
    "Morbus Blount 6W - CR ap und seitlich - 001.jpg"
  ],
  "rickets": [
    "RicketsChestXray.jpg",
    "openi__PMC3888043_JPN-8-228-g002.png",
    "openi__PMC3276020_JNSBM-2-222-g002.png"
  ],
  "osteochondritis": [
    "CT and projectional radiography of osteochondritis dissecans - annotated.jpg",
    "Osteochondrosis dissecans.jpg",
    "openi__PMC1887528_1546-0096-5-8-5.png",
    "openi__PMC4799307_gr9.png",
    "openi__PMC3445128_10.1177_1941738109334216-fig2.png"
  ],
  "slap": [
    "MRI. 2 SLAP II lesion.jpg",
    "MRI. 1 SLAP II lesion.jpg",
    "MRI. SLAP III lesion.jpg",
    "openi__PMC3137866_IJRI-21-98-g008.png",
    "openi__PMC5155252_WJO-7-776-g002.png",
    "openi__PMC3143955_or-2010-1-e6-g001.png",
    "openi__PMC3137866_IJRI-21-98-g020.png",
    "openi__PMC4567363_rb-48-04-0242-g10.png",
    "openi__PMC3438869_10.1177_1941738110370023-fig2.png",
    "openi__PMC4325385_IJSS-9-13-g009.png",
    "openi__PMC4582534_JoU-2012-0018-g009.png",
    "openi__PMC5380796_gr1.png",
    "openi__PMC3745270_amjcaserep-14-308-g001.png"
  ],
  "glenohumeral-oa": [
    "openi__PMC3590703_IJSS-6-121-g001.png"
  ],
  "elbow-oa": [
    "XRay ElbowOsteoarthritis RL AP.jpg",
    "XRay ElbowOsteoarthritis RL Lateral.jpg",
    "openi__PMC4775494_1413-7852-aob-24-02-00077-gf04.png",
    "openi__PMC3678412_ARTH2013-473259.001.png",
    "openi__PMC4775494_1413-7852-aob-24-02-00077-gf02.png",
    "openi__PMC4963533_ncomms12359-f5.png",
    "openi__PMC4869438_traumamon-21-01-20201-g001.png",
    "openi__PMC4869438_traumamon-21-01-20201-g002.png",
    "openi__PMC4431329_annrheumdis-2013-205095f02.png"
  ],
  "radioulnar-synostosis": [
    "openi__PMC3761981_JCN-1-46-g002.png",
    "openi__PMC4245278_bpb-24-71-g001.png"
  ],
  "madelung": [
    "openi__PMC2904904_256_2009_842_Fig9_HTML.png",
    "openi__PMC4296059_AMS-10-21248-g002.png",
    "openi__PMC3288494_cios-4-45-g011.png",
    "openi__PMC4125598_cpe-23-065-g001.png",
    "openi__PMC4623345_apem-20-162-g001.png",
    "openi__PMC4001364_1471-2350-15-42-1.png",
    "openi__PMC3510273_kjped-55-430-g004.png",
    "openi__PMC4993032_eplasty16ic34_fig1.png",
    "openi__PMC3830315_IJEM-17-231-g003.png",
    "openi__PMC3288494_cios-4-45-g013.png"
  ],
  "kienbock": [
    "openi__PMC4844492_JOCR-2-11-g001.png",
    "RM-malattia di Kienbock.png",
    "openi__PMC2895881_256_2009_775_Fig13_HTML.png",
    "openi__PMC4195980_13018_2014_86_Fig6_HTML.png",
    "openi__PMC3158122_1752-1947-5-325-1.png",
    "openi__PMC2904904_256_2009_842_Fig6_HTML.png",
    "openi__PMC4195980_13018_2014_86_Fig2_HTML.png",
    "openi__PMC4623538_icrp-2-019-g001.png",
    "openi__PMC4623538_icrp-2-019-g002.png",
    "openi__PMC4764308_PAMJ-22-246-g002.png",
    "openi__PMC4400708_JRMS-20-146-g001.png",
    "openi__PMC4764308_PAMJ-22-246-g001.png",
    "openi__PMC3556749_IJMS-36-133-g004.png"
  ],
  "osgood": [
    "Radiograph of human knee with Osgood–Schlatter disease.png",
    "Osgood-Schlatter disease X-ray.JPEG",
    "openi__PMC4844496_JOCR-2-24-g001.png",
    "openi__PMC4844496_JOCR-2-24-g004.png",
    "openi__PMC2645398_1546-0096-7-4-2.png",
    "openi__PMC1887528_1546-0096-5-8-4.png",
    "openi__PMC3445246_10.1177_1941738109334214-fig9.png",
    "openi__PMC4844496_JOCR-2-24-g002.png",
    "openi__PMC4844496_JOCR-2-24-g003.png",
    "openi__PMC4779807_ksrr-28-62-g002.png",
    "openi__PMC4588527_10.1177_2325967114542084-fig2.png",
    "openi__PMC4588527_10.1177_2325967114542084-fig1.png",
    "openi__PMC4877349_13244_2016_483_Fig15_HTML.png",
    "openi__PMC4779807_ksrr-28-62-g001.png",
    "openi__PMC3533382_bjsports-2012-091471f01.png",
    "openi__PMC3533382_bjsports-2012-091471f02.png",
    "openi__PMC3182988_1546-0096-9-25-2.png",
    "openi__PMC3354353_IJRI-22-27-g004.png",
    "openi__PMC2645398_1546-0096-7-4-6.png",
    "openi__PMC4332644_10.1177_1941738114559380-fig17.png"
  ],
  "reactive": [
    "Inflammation of the infrapatellar fat (Hoffa's disease) x-ray of ligament ossification.png",
    "openi__PMC3580506_ar4032-1.png",
    "openi__PMC3841660_IJSTD-34-107-g007.png",
    "openi__PMC3841660_IJSTD-34-107-g006.png"
  ],
  "sle-arth": [
    "openi__PMC4794578_CRIRH2016-6502373.002.png"
  ],
  "still": [
    "openi__PMC4604672_JMH-6-125-g003.png",
    "openi__PMC4604672_JMH-6-125-g005.png",
    "openi__PMC3341832_ksrr-23-171-g003.png",
    "openi__PMC3341832_ksrr-23-171-g002.png"
  ],
  "bicipital": [
    "openi__PMC3872097_TSWJ2013-948323.001.png"
  ],
  "pleo-lps": [
    "openi__PMC3759080_IJNM-27-213-g014.png",
    "openi__PMC4421890_JCIS-5-24-g009.png",
    "openi__PMC4404658_12957_2015_548_Fig7_HTML.png",
    "openi__PMC3948907_13244_2013_294_Fig1_HTML.png",
    "openi__PMC1665230_ci05008903.png",
    "openi__PMC4617075_medi-94-e1142-g002.png",
    "openi__PMC5240485_kjr-18-94-g005.png"
  ],
  "leiomyosarcoma": [
    "openi__PMC4931792_IJRI-26-279-g030.png",
    "openi__PMC2705766_SRCM2009-385164.001.png",
    "openi__PMC3948907_13244_2013_294_Fig2_HTML.png",
    "openi__PMC4949497_gr1.png",
    "openi__PMC4435649_12957_2015_573_Fig7_HTML.png"
  ],
  "rhabdo": [
    "openi__PMC4063592_OL-08-01-0155-g02.png",
    "openi__PMC3975940_1471-2431-14-57-3.png",
    "openi__PMC4559794_kjr-16-973-g001.png",
    "openi__PMC4090749_12410_2014_9281_Fig6_HTML.png"
  ],
  "fibrosarcoma-st": [
    "openi__PMC3519030_LI-29-384-g002.png",
    "openi__PMC4484290_usg-14068-f12.png"
  ],
  "mpnst": [
    "openi__PMC3759080_IJNM-27-213-g013.png",
    "openi__PMC3638275_jkns-53-190-g004.png"
  ],
  "angiosarcoma": [
    "openi__PMC2914389_cro0002-0242-f03.png",
    "openi__PMC3395753_jbc-15-255-g001.png",
    "openi__PMC3090329_1749-8090-6-47-1.png",
    "openi__PMC4900109_gr2.png",
    "openi__PMC4167269_12957_2014_1758_Fig1_HTML.png",
    "openi__PMC3980516_gr1.png",
    "openi__PMC3667310_IJD-58-242d-g004.png",
    "openi__PMC4167269_12957_2014_1758_Fig3_HTML.png"
  ],
  "epithelioid-sarcoma": [
    "openi__PMC2527488_1477-7819-6-84-3.png",
    "openi__PMC1820783_1477-7819-5-28-2.png",
    "openi__PMC3652053_CRIM.PATHOLOGY2013-312786.001.png"
  ],
  "clearcell-sarcoma": [
    "openi__PMC4435645_12957_2015_588_Fig1_HTML.png",
    "openi__PMC4435645_12957_2015_588_Fig4_HTML.png",
    "openi__PMC2861760_247_2010_1584_Fig8_HTML.png",
    "openi__PMC1513593_1471-2490-6-11-2.png"
  ],
  "myxofibrosarcoma": [
    "openi__PMC4387989_rado-49-02-135f5.png",
    "openi__PMC5317028_eplasty17e05_fig2.png",
    "openi__PMC4763425_13569_2016_41_Fig1_HTML.png"
  ],
  "lgfm": [
    "openi__PMC4738115_aps-43-110-g001.png"
  ],
  "extraskeletal-osteo": [
    "openi__PMC3184056_1746-6148-7-55-2.png",
    "openi__PMC3354355_IJRI-22-35-g009.png",
    "openi__PMC3184056_1746-6148-7-55-1.png",
    "openi__PMC4052020_IJOrtho-48-238-g008.png",
    "openi__PMC3977165_rt-2014-1-5029-g001.png"
  ],
  "infantile-fibrosarcoma": [
    "openi__PMC4559794_kjr-16-973-g003.png",
    "openi__PMC4569597_13244_2015_418_Fig8_HTML.png"
  ],
  "kaposi": [
    "openi__PMC5295157_WJH-9-171-g005.png",
    "openi__PMC3458788_ci12003114.png"
  ],
  "hip-flexor": [
    "openi__PMC4748163_10.1177_2151458515627309-fig1.png"
  ],
  "gluteus-med": [
    "openi__PMC5155096_RRP2016-4801474.013.png"
  ],
  "piriformis": [
    "openi__PMC4721019_13104_2015_1818_Fig3_HTML.png",
    "openi__PMC4090635_iranjradiol-11-11075-g002.png"
  ],
  "biceps-fem": [
    "openi__PMC4752668_bjsports-2015-095136f04.png"
  ],
  "tib-post": [
    "openi__PMC2698172_kjr-5-274-g003.png"
  ],
  "lat-dorsi": [
    "MRI. Partial tear of the long bizeps tendon..jpg",
    "MRI. tear of the distal biceps tendon..jpg",
    "Proton density MRI of a grade 2 medial meniscal tear.jpg",
    "Sagittal T1 MRI of labral tear.jpg",
    "The Tears of Saint Peter MET Ribera Xray 1nocap.jpg",
    "The Tears of Saint Peter MET Ribera Xray 2nocap.jpg"
  ],
  "supraspinatus": [
    "openi__PMC3249025_277_2011_1220_Fig1_HTML.png",
    "openi__PMC3698891_IJRI-22-284-g007.png",
    "openi__PMC3675373_2036-7902-5-2-2.png"
  ],
  "adhesive-caps": [
    "MRI. Suspicion of frozen shoulder due to minor intraarticularly injectable contrast agent. No contrast agent at the bursa subacromialis and subdeltoidea. Major articular-sided partial tear of the supraspinatus tendon..jpg"
  ],
  "dequervain": [
    "openi__PMC3259322_13244_2011_76_Fig10_HTML.png",
    "openi__PMC5061638_kjpain-29-217-g013.png"
  ],
  "bunion": [
    "X-rays showing effect of bunion splints on angle of Hallux valgus in patients.jpg",
    "openi__PMC4769042_PAMJ-22-299-g003.png"
  ],
  "pubic-symphysis": [
    "openi__PMC4207289_medscimonit-20-1913-g001.png",
    "openi__PMC4306730_776_2014_653_Fig5_HTML.png"
  ],
  "hip-synovitis": [
    "Ultrasonography of joint effusion in transient synovitis of the hip.jpg",
    "CT of pigmented villonodular synovitis.jpg"
  ],
  "shoulder-instability": [
    "3-D CT reconstruction of Bankart lesion which occurred post anterior shoulder dislocation.jpg",
    "openi__PMC2840822_IJSS-02-56-g001.png",
    "openi__PMC2840822_IJSS-02-56-g002.png",
    "openi__PMC3743032_IJSS-7-59-g005.png"
  ],
  "tfcc-degen": [
    "openi__PMC5303600_BMRI2017-5870875.002.png",
    "openi__PMC2776148_247_2009_1428_Fig2_HTML.png",
    "openi__PMC3162198_cios-3-184-g002.png"
  ],
  "chronic-sinusitis": [
    "openi__PMC3491309_IJHG-18-263-g006.png"
  ],
  "nasal-polyp": [
    "openi__PMC4086581_ijcpd-06-104-g004.png",
    "openi__PMC3730472_IJSTD-34-35-g006.png"
  ],
  "subglottic-stenosis": [
    "Bronchial stenosis CT.JPG",
    "openi__PMC3350016_CRIM.RADIOLOGY2011-501396.001.png"
  ],
  "peritonsillar-abscess": [
    "Contrast-enhanced ultrasound of liver abscess.jpg",
    "Ultrasound showing segment VI liver abscess.png",
    "CT of abscess and THAD.jpg",
    "Emphysematous liver abscess as shown on CT and ultrasound in axial view.png",
    "BrodieAbscessRadiograph.jpg",
    "Abscessed tooth periapical radiograph.jpg",
    "Brain Abscess at MRI (T1 + contrast) -- showing a small ring-enhancing lesion with mild surrounding edema adjacent to the ventricular catheter and ventricular dilatation..jpg",
    "Brain abscess - MRI T1 KM axial.jpg",
    "Brain abscess simple brain CT.jpg"
  ],
  "tracheal-stenosis": [
    "openi__PMC5388364_cureus-0009-00000001090-i05.png"
  ],
  "tracheal-tumor": [
    "Neuroendokriner Tumor des Ileums mit mesenterialer Lymphknotenmetastase 84M - CT - 001 - Annotation.jpg",
    "Neuroendokriner Tumor des Pankreas 71W - CT KM pv - 001.jpg",
    "Neuroendokriner Tumor des Ileums mit mesenterialer Lymphknotenmetastase 84M - CT - 001.jpg",
    "Solitaerer fibroeser Tumor des Omentum 30M - CT - 001.jpg",
    "Oblique hand radiograph showing tumoral calcinosis.jpg",
    "Post contrast T1 weighted MRI demonstrates intense enhancement of both the eye and the endolymphatic sac tumor..jpg",
    "Brain Tumor MRI.jpg",
    "Anterior Pancoast tumor CT.jpg"
  ],
  "tracheobronchomalacia": [
    "Tracheobronchial rupture 3D CT 2.jpg",
    "Tracheobronchial rupture 3D CT 3.JPG",
    "Tracheobronchial rupture 3D CT 3.jpg",
    "Tracheobronchial rupture 3D CT.jpg",
    "openi__PMC4813059_IJRI-26-103-g004.png"
  ],
  "lobar-pneumonia": [
    "X-ray of cyst in pneumocystis pneumonia 1.jpg",
    "CT of bilateral pneumothoraces by pneumocystis pneumonia cysts.jpg",
    "X-ray of cyst in pneumocystis pneumonia 2.jpg",
    "X-ray of pneumothorax in pneumocystis pneumonia.jpg",
    "X-ray of ground glass opacities of pneumocystis pneumonia.jpg"
  ],
  "klebsiella-pneumonia": [
    "openi__PMC3935260_JCIS-3-60-g016.png",
    "openi__PMC3289185_ASJSM-1-223-g001.png"
  ],
  "lung-abscess": [
    "openi__PMC4705328_kjped-58-478-g001.png",
    "openi__PMC3677011_CRIM.EM2013-154861.004.png",
    "openi__PMC5054769_cln-71-10-562-g004.png",
    "openi__PMC3686064_CRIM.ID2013-190183.001.png"
  ],
  "miliary-tb": [
    "openi__PMC3759643_kjpathol-47-399-g001.png"
  ],
  "endobronchial-tb": [
    "openi__PMC5295150_WJH-9-161-g001.png"
  ],
  "invasive-aspergillosis": [
    "CT of part solid lung nodule.png",
    "CT of lung nodule with bubble-like lucencies.png",
    "CT of spiculated lung nodule with bubble-like lucencies.png",
    "CT of a lung nodule abutting a cystic airspace.png",
    "CT of lung nodule with vascular convergence.png",
    "CT-Standard-Dose-2.50-Lung-Calcified-Nodule.jpg"
  ],
  "chronic-pulmonary-aspergillosis": [
    "CT of lung nodule with vascular convergence (crop).png"
  ],
  "alpha1-antitrypsin": [
    "Pancreatic calcifications with pancreatic atrophy, CT.png",
    "openi__PMC3670638_cro-0006-0256-g02.png",
    "openi__PMC4782897_medi-95-e2959-g001.png",
    "openi__PMC3514369_1756-0500-5-622-1.png",
    "openi__PMC3868055_259fig2.png"
  ],
  "ppfe": [
    "openi__PMC3484289_kjr-13-694-g003.png",
    "openi__PMC5045080_rrw053f02.png"
  ],
  "sarcoidosis": [
    "Chest X-ray of sarcoidosis nodules.png",
    "openi__PMC3830191_12149_2013_750_Fig3_HTML.png"
  ],
  "gpa": [
    "openi__PMC4744318_PJMS-31-1545-g001.png",
    "openi__PMC2968771_crn0002-0101-f01.png"
  ],
  "chronic-eosinophilic-pneumonia": [
    "X-ray of refractory pneumothorax in pneumocystis pneumonia.jpg",
    "openi__PMC4983070_13256_2016_1005_Fig5_HTML.png",
    "openi__PMC4983070_13256_2016_1005_Fig1_HTML.png"
  ],
  "cteph": [
    "openi__PMC3743204_ymj-54-1293-g001.png"
  ],
  "fat-embolism": [
    "openi__PMC3270288_kjtcs-44-437-g002.png",
    "openi__PMC4166065_ATM-9-193-g018.png",
    "openi__PMC3651075_jocmr-05-239-g001.png"
  ],
  "central-lung-cancer": [
    "CT of a lung nodule with a notch sign.png"
  ],
  "lepidic-adenocarcinoma": [
    "Coronal MRI showing right parotid adenoid cystic carcinoma with perineural spread of tumor.jpg",
    "CT and MRI of papillary thyroid carcinoma arising from a thyroglossal duct cyst.jpg"
  ],
  "pneumothorax": [
    "Apical pneumothorax shown on CT and chest X-ray with left first rib fracture.png",
    "X-ray and CT of ground glass opacities and pneumothorax in pneumocystis pneumonia.jpg",
    "Lateral X-ray of pneumothorax in inspiration - annotated.jpg",
    "X-ray subtle pneumothorax in inspiration - annotated.jpg"
  ],
  "pleural-effusion": [
    "Figure-1-Chest-radiograph-showing-a-whole-consolidation-and--or-pleural-effusion-of-the-right-lung.jpg",
    "openi__PMC3891406_kjim-20-105-g001.png",
    "openi__PMC4666196_12957_2015_741_Fig1_HTML.png",
    "openi__PMC3818024_imcrj-6-077Fig1.png",
    "openi__PMC2929421_crg0004-0229-f03.png",
    "openi__PMC4521309_SNI-6-330-g001.png",
    "openi__PMC3296633_1752-1947-5-558-1.png"
  ],
  "solitary-fibrous-tumor-pleura": [
    "Scrotal ultrasonography of adenomatoid tumor at epididymis.jpg"
  ],
  "thymic-cyst": [
    "Choroidal fissure cyst - CT - axial.jpg",
    "Intracranial Epidermoid Cyst - MRI scans 10.5 years apart.jpg",
    "Choroidal fissure cyst - CT - coronar.jpg",
    "Trichromatic Color MRI of ovarian cysts.jpg",
    "Renal cyst MRI.jpg",
    "CT urography of peripelvic cysts.jpg",
    "Trichromatic Color MRI of ovarian cysts (cropped for endometrioma).jpg",
    "Non-contrast CT of peripelvic cysts.jpg",
    "CT scan of epidermoid cyst.jpg",
    "CT of peripelvic cysts with non-contrast and urography.jpg",
    "Contrast-enhanced computed tomography image of the pelvic cavity with cyst.jpg",
    "Gingival cyst of adult radiograph.jpg",
    "Renal cyst ultrasound 110302161003 1613550.jpg",
    "Renal cyst ultrasound 110316115548 1208010.jpg",
    "Renal cyst ultrasound 110329152631 1532010.jpg",
    "Renal cyst ultrasound 3.jpg",
    "Renal cyst ultrasound 2.jpg",
    "Ultrasound of testicular cysts.png",
    "Sebaceous cyst in malar region, CT.jpg"
  ],
  "mediastinal-lymphoma": [
    "openi__PMC3579993_13244_2012_201_Fig23_HTML.png"
  ],
  "mediastinal-gct": [
    "Mediastinal structures on chest X-ray, annotated.jpg",
    "openi__PMC4050947_IJA-58-215-g001.png"
  ],
  "bochdalek-hernia": [
    "Bochdalek-Hernie links 77W - CR seitlich CT sagittal und axial - 001 - Annotation.jpg",
    "openi__PMC5198190_MIS2016-9032380.005.png",
    "openi__PMC5198190_MIS2016-9032380.004.png",
    "openi__PMC3519026_LI-29-373-g001.png",
    "openi__PMC3781611_TJH-29-430-g1.png",
    "openi__PMC4902355_medi-95-e3707-g001.png",
    "openi__PMC3519026_LI-29-373-g002.png",
    "openi__PMC3523457_JMAS-8-158-g001.png"
  ],
  "cpam": [
    "openi__PMC2809071_1752-1947-3-9329-2.png",
    "openi__PMC4288834_ajcr-6-3.f1.png"
  ],
  "pulmonary-sequestration": [
    "B lines on a lung ultrasound of a patient with fibrosis.jpg"
  ],
  "congenital-lobar-emphysema": [
    "openi__PMC3935260_JCIS-3-60-g004.png"
  ],
  "swyer-james": [
    "openi__PMC5256677_gr1.png",
    "openi__PMC5256677_gr2.png",
    "openi__PMC2891799_1752-1947-4-153-2.png",
    "openi__PMC3896808_1749-8090-9-13-1.png",
    "openi__PMC3023754_1752-1947-5-2-2.png"
  ],
  "traumatic-diaphragmatic-hernia": [
    "openi__PMC4478306_cro-0008-0238-g01.png",
    "openi__PMC3168564_GASTROENTEROLOGY2011-871958.004.png",
    "openi__PMC2936927_1752-1947-4-289-2.png",
    "openi__PMC3649317_jscr-2011-10-3fig2.png"
  ],
  "ards": [
    "openi__PMC3079651_1471-2334-11-79-2.png"
  ],
  "cardiogenic-pulmonary-edema": [
    "openi__PMC4750569_gr4.png",
    "openi__PMC4098927_1476-7120-12-25-11.png"
  ],
  "acute-respiratory-failure": [
    "Acute hemorrhagic Leukoencephalitis in a patient with Multiple sclerosis (MRI).png"
  ],
  "chronic-respiratory-failure": [
    "CT scan showing chronic Infarct at the right corona radiata.png",
    "CT scan showing chronic infarct at the left high parietal region.jpg",
    "Jaw lesions - Chronic osteomyelitis - Cone beam CT.jpg"
  ],
  "dig-barrett-esophagus": [
    "openi__PMC3134058_crg0005-0355-f01.png"
  ],
  "dig-zenker-diverticulum": [
    "openi__PMC5051033_gr-08-319-g001.png",
    "openi__PMC2713885_kjr-3-199-g017.png"
  ],
  "dig-epiphrenic-diverticulum": [
    "openi__PMC3259399_13244_2010_17_Fig8_HTML.png",
    "openi__PMC5370493_CRIC2017-9614835.003.png"
  ],
  "dig-boerhaave": [
    "openi__PMC2713885_kjr-3-199-g011.png",
    "openi__PMC3616304_SHORTS-12-05301.png",
    "openi__PMC4216456_rju11001.png"
  ],
  "dig-mallory-weiss": [
    "Mallory Weiss Tear.tif",
    "openi__PMC2740079_1757-1626-0002-0000008000-001.png",
    "openi__PMC3521945_ce-45-417-g002.png"
  ],
  "dig-chronic-atrophic-gastritis": [
    "openi__PMC2893317_kjr-11-457-g009.png"
  ],
  "dig-gastric-ulcer": [
    "openi__PMC4362012_EUS-4-78-g003.png"
  ],
  "dig-duodenal-ulcer": [
    "openi__PMC4143653_jvms-76-1073-g002.png",
    "openi__PMC4058548_ce-47-270-g002.png"
  ],
  "dig-gastric-malt-lymphoma": [
    "openi__PMC4700158_GRP2015-104794.002.png",
    "openi__PMC2852701_gnl-3-81-g001.png",
    "openi__PMC3190488_IJRI-21-176-g010.png"
  ],
  "dig-gastric-gist": [
    "openi__PMC3384824_kjr-13-425-g007.png",
    "openi__PMC4152631_IJMPO-35-143-g010.png",
    "openi__PMC4152631_IJMPO-35-143-g012.png",
    "openi__PMC4480761_oncotarget-06-8397-g001.png",
    "openi__PMC3204477_jgc-11-55-g001.png",
    "openi__PMC3848548_gnl-7-642-g002.png"
  ],
  "dig-duodenal-diverticulum": [
    "openi__PMC4392365_gr1.png",
    "openi__PMC4433139_vim-0031-0007-g18.png",
    "openi__PMC3649234_jscr-2011-4-1fig3.png",
    "openi__PMC4481078_13256_2015_608_Fig1_HTML.png"
  ],
  "dig-duodenal-atresia-stomach": [
    "openi__PMC4929374_crg-0010-0161-g01.png",
    "openi__PMC4143653_jvms-76-1073-g001.png"
  ],
  "dig-mechanical-obstruction": [
    "Upright abdominal X-ray demonstrating a bowel obstruction.jpg",
    "openi__PMC3296441_JSTCR-3-91-g001.png"
  ],
  "dig-paralytic-ileus": [
    "Upright X-ray demonstrating small bowel obstruction.jpg"
  ],
  "dig-gallstone-ileus": [
    "openi__PMC3075183_crg0002-0144-f01.png"
  ],
  "dig-small-bowel-lymphoma": [
    "openi__PMC4915683_pone.0157880.g005.png"
  ],
  "dig-colorectal-cancer": [
    "openi__PMC5240498_kjr-18-132-g001.png"
  ],
  "dig-fap": [
    "openi__PMC4765038_12957_2016_806_Fig2_HTML.png",
    "openi__PMC4765038_12957_2016_806_Fig3_HTML.png"
  ],
  "dig-colonic-lipoma": [
    "Paracaval lipoma - Lipomatoese Impression der Vena cava am Zwerchfelldurchtritt - 78jw - CT axial und cor - 001.jpg"
  ],
  "dig-appendiceal-mucocele": [
    "Ultrasonographies of mature cystic teratomas.jpg",
    "Scrotal ultrasonography of epidermoid cyst.jpg"
  ],
  "dig-cirrhosis": [
    "openi__PMC3443279_13244_2012_179_Fig2_HTML.png"
  ],
  "dig-portal-vein-thrombosis": [
    "Doppler ultrasound in long-axis view of axillary and subclavian vein thrombosis - annotated.jpg",
    "openi__PMC3726297_2191-219X-3-56-4.png",
    "openi__PMC3726297_2191-219X-3-56-3.png"
  ],
  "dig-hepatic-infarction": [
    "openi__PMC5413775_edmcr-2017-160144-g003.png"
  ],
  "dig-hepatic-hemangioma": [
    "Contrast-enhanced ultrasound of hepatic hemangioma.jpg",
    "openi__PMC3614658_IJBS-3-302_F4.png",
    "openi__PMC4366028_rb-48-01-0043-g06.png",
    "openi__PMC4701372_usg-15022-f3.png"
  ],
  "dig-hepatic-cyst": [
    "openi__PMC3088851_kjr-12-341-g002.png",
    "openi__PMC4024151_270_2013_761_Fig1_HTML.png",
    "openi__PMC4336409_gr2.png"
  ],
  "dig-fnh": [
    "openi__PMC5409908_40792_2017_332_Fig1_HTML.png",
    "openi__PMC5409908_40792_2017_332_Fig4_HTML.png"
  ],
  "dig-hepatic-adenoma": [
    "openi__PMC2727979_ci07908406.png",
    "openi__PMC4493249_pghn-18-144-g001.png"
  ],
  "dig-cholangiocarcinoma": [
    "openi__PMC4602766_medi-94-e499-g003.png",
    "openi__PMC4654861_13000_2015_439_Fig1_HTML.png",
    "openi__PMC3075136_crg0002-0155-f02.png",
    "openi__PMC4167505_poljradiol-79-315-g003.png",
    "openi__PMC5266338_cmh-2016-0077f1.png",
    "openi__PMC5313520_kjr-18-323-g007.png",
    "openi__PMC4768450_IJPC-22-50-g001.png",
    "openi__PMC3875121_CRIM.GM2013-946835.004.png",
    "openi__PMC3875121_CRIM.GM2013-946835.001.png"
  ],
  "dig-hepatic-metastasis": [
    "openi__PMC3033353_1477-7819-9-3-2.png"
  ],
  "dig-acute-cholecystitis": [
    "openi__PMC3679415_464_2013_2787_Fig3_HTML.png",
    "openi__PMC4347268_kjr-16-325-g011.png",
    "openi__PMC3679415_464_2013_2787_Fig5_HTML.png",
    "openi__PMC4306086_s12245-014-0043-2-7.png",
    "openi__PMC5043169_crg-0010-0452-g01.png"
  ],
  "dig-chronic-cholecystitis": [
    "openi__PMC3964274_gnl-8-219-g003.png"
  ],
  "dig-emphysematous-cholecystitis": [
    "Acute cholecystitis as seen on ultrasound axial view.jpg",
    "CT of cholecystitis.jpg",
    "Leberabszesse bei Cholecystitis 71M - CT KM pv - 001.jpg",
    "Emphysematoese Cholecystitis 72W - CT und Sonografie - 001.jpg",
    "Gangraenoese Cholecystitis 36W - CT KM pv - 001.jpg",
    "openi__PMC3964274_gnl-8-219-g005.png"
  ],
  "dig-cholangitis": [
    "openi__PMC4546713_PAMJ-21-122-g001.png"
  ],
  "dig-gb-empyema": [
    "Ultrasound image of liver segment VIII lesion with biliary stent.jpg"
  ],
  "dig-mirizzi": [
    "openi__PMC2600648_1752-1947-2-351-1.png",
    "openi__PMC5126496_CG-CGCR160101F003.png",
    "openi__PMC3015902_jsls-13-1-104-g05.png"
  ],
  "dig-choledochal-cyst": [
    "openi__PMC3977170_rt-2014-1-5173-g001.png",
    "openi__PMC5350537_GRP2017-2403012.005.png",
    "openi__PMC4294280_gr18.png"
  ],
  "dig-acute-pancreatitis": [
    "openi__PMC4444795_13244_2015_393_Fig4_HTML.png",
    "openi__PMC5260084_12893_2017_204_Fig3_HTML.png"
  ],
  "dig-chronic-pancreatitis": [
    "openi__PMC4332457_CRIONM2015-767365.001.png",
    "openi__PMC3959389_AnnGastroenterol-25-133-g004.png"
  ],
  "dig-autoimmune-pancreatitis": [
    "openi__PMC4586910_10.1177_2324709615576988-fig2.png"
  ],
  "dig-pancreatic-pseudocyst": [
    "Ultrasound of pseudocyst at the neck of the pancreas.jpg",
    "Serous cystadenoma of the pancreatic head..jpg",
    "openi__PMC4900332_10.1177_2058460116647213-fig1.png",
    "openi__PMC4900332_10.1177_2058460116647213-fig2.png",
    "openi__PMC3325852_1749-7922-7-7-1.png",
    "openi__PMC4213478_13104_2013_3263_Fig3_HTML.png",
    "openi__PMC3016185_jsls-12-2-183-g01.png",
    "openi__PMC4430898_12880_2015_55_Fig1_HTML.png",
    "openi__PMC3303907_kjr-13-232-g001.png",
    "openi__PMC5228696_medi-96-e5808-g001.png"
  ],
  "dig-ipmn": [
    "openi__PMC5284342_jim-2016-000167f04.png",
    "openi__PMC4462811_NAJMS-7-160-g004.png",
    "openi__PMC3259323_13244_2011_102_Fig7_HTML.png",
    "openi__PMC3820567_SCIENTIFICA2012-893632.006.png"
  ],
  "dig-pancreatic-adenocarcinoma": [
    "openi__PMC3608242_1477-7819-11-37-1.png",
    "openi__PMC4979799_medi-95-e4374-g002.png",
    "openi__PMC5298959_fonc-07-00018-g001.png"
  ],
  "dig-pancreatic-net": [
    "Neuroendokriner Tumor des Pankreas 71W - CT KM pv - 001 - Annotation.jpg",
    "openi__PMC4504632_medi-94-e0946-g001.png",
    "openi__PMC3513322_pone.0049707.g003.png",
    "openi__PMC4929393_crg-0010-0174-g01.png",
    "openi__PMC2776527_pone.0007977.g001.png",
    "openi__PMC3398090_crg-0006-0415-g03.png"
  ],
  "dig-pancreatic-metastasis": [
    "openi__PMC3835140_1477-7819-11-289-1.png"
  ],
  "dig-annular-pancreas": [
    "openi__PMC4433139_vim-0031-0007-g04.png"
  ],
  "dig-splenomegaly": [
    "CT Spleen Rupture.jpg",
    "Axial-contrast-enhanced-CT-image-at-bone-window-demonstrates-small-and-calcified-spleen-of-a-patient-with-sickle-cell-di.jpg"
  ],
  "dig-splenic-infarction": [
    "openi__PMC5423006_13256_2017_1274_Fig5_HTML.png",
    "openi__PMC4992048_464_2015_4720_Fig2_HTML.png"
  ],
  "dig-splenic-rupture": [
    "openi__PMC4779351_MA-70-69-g001.png",
    "openi__PMC4289345_13256_2014_3020_Fig1_HTML.png"
  ],
  "dig-splenic-cyst": [
    "openi__PMC3859258_RRP2013-219297.011.png",
    "openi__PMC2827097_1757-1626-0002-0000008730-1.png",
    "openi__PMC3016124_jsls-10-2-239-g02.png"
  ],
  "dig-splenic-hemangioma": [
    "openi__PMC2943678_ci10002604.png",
    "openi__PMC2394533_1752-1947-2-147-1.png",
    "openi__PMC3902560_JMAS-10-42-g001.png"
  ],
  "dig-splenic-lymphoma": [
    "openi__PMC2943678_ci10002602.png",
    "openi__PMC4656954_JMedLife-08-467-g001.png"
  ],
  "dig-splenic-metastasis": [
    "openi__PMC4135132_CRIOG2014-798948.003.png",
    "openi__PMC5039297_CRIS2016-6450765.002.png"
  ],
  "dig-splenic-abscess": [
    "openi__PMC3200071_HEMATOLOGY2011-864257.005.png",
    "openi__PMC2938719_JMAS-6-83-g001.png"
  ],
  "dig-omental-infarction": [
    "Cerebral infarction after 4 hours on T2 MRI.jpg",
    "Cerebral infarction after 4 hours on ADC MRI.jpg",
    "FSE T2 MRI of cerebral infarction.png",
    "FLAIR MRI of cerebral infarction.png",
    "DWE MRI of cerebral infarction.png",
    "T2-star MRI of cerebral infarction.png"
  ],
  "dig-gi-perforation": [
    "01-Sigmadivertikulitis CT ax 001 Perforation - Annotation.png",
    "Duenndarmdivertikulitis mit Perforation und Abszess 86W - CT - 001 - Annotation.jpg"
  ],
  "dig-rectus-hematoma": [
    "CT of rectus sheath hematoma.jpg",
    "CT of rectus sheath hematomas.png",
    "CT of rectus sheath hematomas, follow-up.png",
    "Subcutaneous septated hematoma, ultrasound.png",
    "Traumatic subgaleal hematoma, CT image.png",
    "Ct-scan of the brain with an subdural hematoma.jpg"
  ],
  "dig-traumatic-diaphragmatic-hernia": [
    "Diaphragmatic rupture spleen herniation.jpg"
  ],
  "dig-esophageal-atresia-tef": [
    "openi__PMC3668800_crg-0006-0510-g05.png",
    "openi__PMC3957965_MIRT-23-12-g2.png",
    "openi__PMC3669509_455_2013_9446_Fig4_HTML.png",
    "openi__PMC5369895_medi-96-e6307-g002.png",
    "openi__PMC3383077_0392-100X-32-93-g004.png",
    "openi__PMC5177722_kjped-59-S88-g002.png",
    "openi__PMC3977129_roj-32-31-g001.png"
  ],
  "dig-congenital-hps": [
    "Projectional radiograph of cervical foraminal stenosis, annotated.jpg",
    "Internal carotid artery stenosis in ultrasound near occlusion.jpg",
    "Projectional radiograph of cervical foraminal stenosis.jpg"
  ],
  "dig-nec": [
    "openi__PMC4262875_WJNM-13-170-g006.png",
    "openi__PMC2966439_pone.0013774.g006.png"
  ],
  "dig-hepatic-laceration": [
    "openi__PMC3018996_JMedLife-03-289-g0020.png",
    "openi__PMC4573864_gr1.png"
  ],
  "circ-acute-mi": [
    "openi__PMC4503326_res-117-254-g008.png"
  ],
  "circ-coronary-stenosis": [
    "TOF MRI angiography of right middle cerebral artery stenosis.png",
    "openi__PMC4939062_13019_2016_492_Fig2_HTML.png",
    "openi__PMC3491208_jcen-14-157-g001.png",
    "openi__PMC3368870_pone.0038430.g002.png",
    "openi__PMC2799649_kjr-11-4-g009.png",
    "openi__PMC4404546_asj-9-286-g002.png",
    "openi__PMC3587676_jthc-8-58-g002.png",
    "openi__PMC3529896_TSWJ2012-192150.003.png",
    "openi__PMC4546352_pone.0135897.g004.png",
    "openi__PMC3529896_TSWJ2012-192150.002.png",
    "openi__PMC5072342_12968_2016_294_Fig3_HTML.png",
    "openi__PMC5023919_medi-95-e4813-g001.png",
    "openi__PMC4734988_jmd-15048f1.png"
  ],
  "circ-coronary-aneurysm": [
    "openi__PMC4899849_gr1.png",
    "openi__PMC4407295_13256_2015_553_Fig1_HTML.png",
    "openi__PMC3765104_1477-7819-11-187-1.png"
  ],
  "circ-takotsubo": [
    "openi__PMC5210410_JAH3-5-e004474-g002.png",
    "openi__PMC5210410_JAH3-5-e004474-g004.png",
    "openi__PMC3075173_crg0002-0091-f03.png",
    "openi__PMC4710870_gcsp-2015-04-055-g006.png",
    "openi__PMC4345916_medscimonit-21-171-g004.png"
  ],
  "circ-as": [
    "openi__PMC4805621_13244_2016_470_Fig4_HTML.png",
    "openi__PMC3893874_SCIENTIFICA2013-270579.002.png",
    "openi__PMC2627207_kjr-9-439-g010.png",
    "openi__PMC4902555_medi-95-e3710-g001.png",
    "openi__PMC3252017_330_2007_731_Fig8_HTML.png",
    "openi__PMC3384834_kjr-13-500-g001.png",
    "openi__PMC4731441_11748_2014_378_Fig1_HTML.png",
    "openi__PMC3866928_1757-7241-21-87-2.png",
    "openi__PMC4986963_pone.0160634.g001.png",
    "openi__PMC4347262_kjr-16-239-g009.png",
    "openi__PMC4161727_gr1.png",
    "openi__PMC4896976_12410_2016_9383_Fig4_HTML.png",
    "openi__PMC4894938_399_2016_437_Fig6_HTML.png"
  ],
  "circ-ps": [
    "openi__PMC5148912_12887_2016_750_Fig2_HTML.png",
    "openi__PMC3599844_1532-429X-15-21-6.png",
    "openi__PMC4686709_CRIPU2015-290391.001.png",
    "openi__PMC3924741_ogs-57-11-g001.png",
    "openi__PMC2957642_kcj-40-442-g003.png",
    "openi__PMC4499562_kjr-16-942-g001.png",
    "openi__PMC4499942_12872_2015_67_Fig1_HTML.png",
    "openi__PMC4499562_kjr-16-942-g002.png",
    "openi__PMC4857415_12883_2016_585_Fig1_HTML.png",
    "openi__PMC3161725_PC-1-286-g004.png",
    "openi__PMC2718109_kjr-2-121-g006.png",
    "openi__PMC4832514_12890_2016_209_Fig5_HTML.png",
    "openi__PMC3686659_1532-429X-15-51-2.png",
    "openi__PMC4184730_rcr20002-0039-f1.png",
    "openi__PMC4141338_13244_2014_340_Fig6_HTML.png",
    "openi__PMC3855812_pone.0082826.g001.png",
    "openi__PMC3766814_trd-75-79-g001.png",
    "openi__PMC4279845_kjtcvs-47-556f1.png"
  ],
  "circ-pericardial-effusion": [
    "openi__PMC4855741_gr2.png",
    "openi__PMC4157198_IJNM-29-182-g001.png"
  ],
  "circ-pericardial-cyst": [
    "CT Scan of thorax with pericardial cyst - 1757-1626-1-26-1-l.jpg",
    "openi__PMC3424852_JCIS-2-33-g005.png",
    "openi__PMC4652288_ATM-10-231-g034.png",
    "openi__PMC2491596_1757-1626-1-26-2.png",
    "openi__PMC4090749_12410_2014_9281_Fig10_HTML.png",
    "openi__PMC3104539_APC-4-68-g001.png",
    "openi__PMC4724686_SaudiMedJ-37-90-g003.png",
    "openi__PMC4407940_PAMJ-19-366-g001.png",
    "openi__PMC3961027_aapm-04-01-9137-g002.png"
  ],
  "circ-pericardial-tumor": [
    "openi__PMC3354357_IJRI-22-40-g006.png",
    "openi__PMC1828367_ci07000505.png"
  ],
  "circ-cardiac-fibroma": [
    "openi__PMC4747971_40792_2015_43_Fig3_HTML.png"
  ],
  "circ-angiosarcoma": [
    "openi__PMC2651440_kjr-10-164-g009.png"
  ],
  "circ-cardiac-metastasis": [
    "openi__PMC3913413_umj0082-0193-f2.png"
  ],
  "circ-aortic-dissection": [
    "openi__PMC4945697_10237_2015_729_Fig14_HTML.png",
    "openi__PMC3423040_1749-8090-7-38-2.png",
    "openi__PMC3090327_1749-8090-6-45-1.png",
    "openi__PMC3420482_CRIM.NM2012-706780.001.png",
    "openi__PMC2850870_wjem-11-98f2.png",
    "openi__PMC3137850_IJRI-21-124-g012.png",
    "openi__PMC3369971_kcj-42-360-g001.png",
    "openi__PMC3390433_kcj-42-437-g002.png",
    "openi__PMC3734007_1475-925X-12-65-1.png"
  ],
  "circ-aortic-rupture": [
    "openi__PMC3026392_TOCMJ-4-221_F2.png",
    "openi__PMC5400449_rjx022f02.png"
  ],
  "circ-cteph": [
    "openi__PMC3530858_CRIM.PULMONOLOGY2012-104195.001.png"
  ],
  "circ-pulmonary-aneurysm": [
    "openi__PMC3590341_kjr-14-283-g001.png",
    "openi__PMC4857578_LI-33-345-g002.png"
  ],
  "circ-pavm": [
    "openi__PMC4502207_LI-32-384-g003.png"
  ],
  "circ-acute-embolism": [
    "openi__PMC3264878_246_2011_150_Fig2_HTML.png",
    "openi__PMC3958606_kcj-44-118-g002.png",
    "openi__PMC3542936_CRIM.EM2012-794019.001.png",
    "openi__PMC3759771_kjim-28-619-g001.png"
  ],
  "circ-peripheral-aneurysm": [
    "Ultrasonography of abdominal aortic aneurysm in axial plane, annotated.jpg",
    "Ultrasonography of abdominal aortic aneurysm in sagittal plane, annotated.jpg"
  ],
  "circ-renal-artery-stenosis": [
    "openi__PMC2699201_umj7802-129-f5.png",
    "openi__PMC4919591_gr2.png",
    "openi__PMC4975703_gr5.png",
    "openi__PMC4767855_772_2015_60_Fig1_HTML.png",
    "openi__PMC5073393_rb-49-04-0257-g07.png",
    "openi__PMC4423501_fped-03-00040-g001.png",
    "openi__PMC4936255_12882_2016_291_Fig1_HTML.png",
    "openi__PMC3521621_CRIM2012-839795.001.png",
    "openi__PMC2855432_467_2009_1320_Fig2_HTML.png",
    "openi__PMC3422853_SHORTS-12-03201.png",
    "openi__PMC4982311_12883_2016_660_Fig1_HTML.png",
    "openi__PMC4228160_12893_2014_524_Fig1_HTML.png",
    "openi__PMC3368357_CRIM2012-151767.001.png",
    "openi__PMC2855432_467_2009_1320_Fig1_HTML.png",
    "openi__PMC2933468_kcj-40-414-g001.png",
    "openi__PMC4561942_CRIN2015-313610.001.png"
  ],
  "circ-subclavian-steal": [
    "openi__PMC4392371_gr1.png",
    "openi__PMC4547108_10.1177_1941738114532225-fig4.png"
  ],
  "circ-fmd": [
    "Developmental venous anomaly MRT axial T2 01 - Annotation.jpg"
  ],
  "circ-pe-venous": [
    "CTA Chest With Massive Pulmonary Embolism and Complete Occlusion.jpg"
  ],
  "circ-may-thurner": [
    "openi__PMC4764802_rjw00301.png",
    "openi__PMC5113228_brs-41-e1284-g003.png",
    "openi__PMC5073393_rb-49-04-0257-g12.png",
    "openi__PMC3750277_1752-1947-7-172-1.png"
  ],
  "nerv-wadwea": [
    "CT of cerebral infarction.png",
    "CT perfusion with flow and volume maps in cerebral infarction.png",
    "CT and MR perfusion of cerebral infarction.png"
  ],
  "nerv-h3l09o": [
    "Effective T2-weighted MRI of hemosiderin deposits after subarachnoid hemorrhage.png"
  ],
  "nerv-66ap6g": [
    "Neurocysticercosis brain CT.jpg"
  ],
  "nerv-pres": [
    "Pre-operative ultrasound of present case. Cysts in the right mediastinum testis (black arrow).jpg",
    "openi__PMC5142428_40644_2016_99_Fig1_HTML.png"
  ],
  "nerv-cadasil": [
    "openi__PMC4123979_pone.0104533.g001.png",
    "openi__PMC3451763_10194_2008_79_Fig1_HTML.png"
  ],
  "nerv-95z8s1": [
    "MRI. Partial rupture of the cranial subscapularis tendon at the insertion site..jpg",
    "CT. Bony Bankart lesion at the antero-inferior glenoid. Clearly dislocated at the cranial part. Humeral head is still centered..jpg"
  ],
  "nerv-b3ptoe": [
    "openi__PMC3108342_PRI2011-340763.001.png",
    "openi__PMC2671744_ceo-1-174-g002.png",
    "openi__PMC3876594_CRIM.OTOLARYNGOLOGY2013-742910.001.png"
  ],
  "nerv-rathke": [
    "openi__PMC3467375_jkns-52-152-g001.png",
    "openi__PMC4376809_13244_2015_401_Fig11_HTML.png",
    "openi__PMC3912769_AJNS-8-183-g001.png",
    "openi__PMC4608689_pone.0139609.g004.png",
    "openi__PMC4531716_kjim-16-2-132-14f2.png",
    "openi__PMC4027854_edmcr-2014-140010-g001.png",
    "openi__PMC3603050_IJEM-16-288-g002.png",
    "openi__PMC4355814_CRINM2015-645370.001.png",
    "openi__PMC4608689_pone.0139609.g002.png"
  ],
  "nerv-dpx7pt": [
    "MRI brain tumor.jpg",
    "CT brain tumor.jpg"
  ],
  "nerv-fza208": [
    "Mild encephalitis with reversible lesion in the splenium 6jm Noro-MRT T2ax und sag - 001.jpg"
  ],
  "nerv-k2wj4b": [
    "openi__PMC3154259_pone.0022766.g003.png"
  ],
  "nerv-2v2x4z": [
    "Brain MRI of a patient with late-onset LAMA2-MD showing white matter abnormalities (hyperintensities) in T2.jpg"
  ],
  "nerv-marchiafava-bignami": [
    "openi__PMC2914367_crn0002-0019-f02.png",
    "openi__PMC4031867_rbti-25-01-0068-g01.png",
    "openi__PMC4031867_rbti-25-01-0068-g02.png",
    "openi__PMC4190267_CRIRA2014-609708.005.png",
    "openi__PMC3932574_IJRI-23-321-g009.png",
    "openi__PMC5030413_CRINM2016-5848572.001.png",
    "openi__PMC2914367_crn0002-0019-f01.png",
    "openi__PMC4602730_medi-94-e512-g004.png",
    "openi__PMC3932574_IJRI-23-321-g008.png"
  ],
  "nerv-xr3x48": [
    "openi__PMC3952324_er-2-2-43-5f3.png"
  ],
  "nerv-wernicke": [
    "openi__PMC4279011_kjped-57-496-g001.png",
    "openi__PMC3608667_pone.0059657.g001.png",
    "openi__PMC4411977_fpsyg-06-00435-g0001.png",
    "openi__PMC4655340_awv281f1p.png"
  ],
  "nerv-melas": [
    "openi__PMC3242024_kcj-41-674-g001.png",
    "openi__PMC5128397_gr2.png",
    "openi__PMC4369985_omu01001.png",
    "openi__PMC5128397_gr4.png",
    "openi__PMC5121148_gr1.png"
  ],
  "nerv-j4mkz0": [
    "Epidurales Haematom bei Schaedelfraktur 8monW - CT - 001.jpg",
    "Epidural hematoma arrow.png",
    "Epidural hematoma.png",
    "EpiduralHematoma.jpg"
  ],
  "nerv-wuiesb": [
    "openi__PMC5107272_Neurosciences-21-161-g001.png",
    "openi__PMC4898078_gr1.png",
    "openi__PMC4702153_10.1177_1941738115588745-fig1.png"
  ],
  "nerv-chiari-i-ii-iii": [
    "openi__PMC5108132_JPN-11-244-g001.png"
  ],
  "nerv-dandy-walker": [
    "openi__PMC4999355_Figure8Dandy-WalkerAnnotated.png",
    "openi__PMC4049013_crn-0006-0156-g01.png",
    "openi__PMC4963583_CRIPS2016-9104306.001.png",
    "openi__PMC4286217_PAMJ-19-15-g001.png",
    "openi__PMC5121365_gr1.png"
  ],
  "nerv-i-ii": [
    "openi__PMC3913834_gr1.png"
  ],
  "nerv-sturge-weber": [
    "openi__PMC3087993_JPN-5-138-g002.png",
    "openi__PMC3689472_11255_2012_243_Fig1_HTML.png",
    "openi__PMC4142469_JCIS-4-31-g026.png",
    "openi__PMC3350061_CRIM.OPHMED2011-785686.002.png",
    "openi__PMC3644771_AIAN-16-118-g001.png",
    "openi__PMC4504628_medi-94-e1025-g004.png",
    "openi__PMC3467913_JPBS-4-349-g004.png",
    "openi__PMC4274733_poljradiol-79-479-g023.png",
    "openi__PMC4557590_cln-70-09-654-g009.png",
    "openi__PMC2806399_1757-1626-2-9394-5.png",
    "openi__PMC4720800_kjr-17-127-g007.png",
    "openi__PMC5355446_fneur-08-00087-g001.png",
    "openi__PMC3173907_JPN-6-19-g007.png",
    "openi__PMC4017012_jcn-10-101-g001.png",
    "openi__PMC3299362_IJPED2012-527891.006.png"
  ],
  "nerv-6r4fa6": [
    "CT LUMBAR DISC HERNATION.JPG"
  ],
  "nerv-tsiaa0": [
    "openi__PMC2759899_1471-2377-9-50-1.png"
  ],
  "nerv-36k48k": [
    "openi__PMC4507376_jcn-11-227-g001.png"
  ],
  "nerv-lzggn": [
    "openi__PMC5400808_NEURIMMINFL2016011692FF3.png"
  ],
  "uro-wkqj05": [
    "Cortical solid mass of renal cell carcinoma.jpg",
    "Renal cell carcinoma with both cystic and solid components.jpg"
  ],
  "uro-v1v742": [
    "openi__PMC3852211_CRIM.UROLOGY2013-893242.001.png",
    "openi__PMC3392784_ci12001904.png"
  ],
  "uro-vun8yj": [
    "Renal cyst ultrasound 110303120332 1218020.jpg",
    "CT of sclerotic lesions in the skull in renal osteodystrophy.jpg",
    "Renal cyst ultrasound 110316115548 1203320.jpg",
    "Axial CT scan of left renal cortical cyst.png",
    "Renal cyst ultrasound 110316115548 1205200.jpg",
    "Renal cyst ultrasound 110321134902 1351400.jpg"
  ],
  "uro-i6chge": [
    "openi__PMC3347651_NAJMS-2-238-g001.png",
    "openi__PMC3601018_1471-2369-14-38-2.png",
    "openi__PMC3991456_FVVinObGyn-3-165-174-g002.png",
    "openi__PMC2702047_kjr-10-377-g002.png",
    "openi__PMC4530564_40348_2015_19_Fig2_HTML.png",
    "openi__PMC5051146_gr-08-197-g002.png",
    "openi__PMC2702047_kjr-10-377-g001.png"
  ],
  "uro-9ipfk8": [
    "CT scan autosomal dominant polycystic kidney disease.jpg",
    "Advanced polycystic kidney disease with multiple cysts.jpg",
    "openi__PMC3037000_UA-3-39-g001.png",
    "openi__PMC3601018_1471-2369-14-38-4.png",
    "openi__PMC4421341_sfp005fig2.png",
    "openi__PMC3764724_IJN-23-392-g001.png",
    "openi__PMC4432427_sfs12101.png"
  ],
  "uro-fkt1ja": [
    "Aneurysma der rechten Nierenarterie in der Aufzweigung im Hilus 76M - CT KM arteriell - 001 - Annotation.jpg",
    "Verkalktes teilthrombosiertes Aneurysma der linken Nierenarterie 98W - CT KM pv - 001 - Annotation.jpg"
  ],
  "uro-cx9mb0": [
    "openi__PMC3571875_1752-1947-7-37-1.png",
    "openi__PMC3545894_1752-1947-7-12-1.png",
    "openi__PMC3959401_AnnGastroenterol-25-173-g002.png"
  ],
  "uro-lmua4g": [
    "Pelvic MRI image Sagittal T2-weighted yellow arrow left ovarian cyst; green arrow supposed urachal cyst; red arrow urinary bladder.png"
  ],
  "uro-u9xw6f": [
    "openi__PMC5030335_gr3.png"
  ],
  "uro-uzvuoy": [
    "Scrotal ultrasonography of tubular ectasia mimicking a tumor.jpg"
  ],
  "uro-720q34": [
    "openi__PMC3150819_10396_2010_297_Fig1_HTML.png"
  ],
  "uro-m6vtdl": [
    "Lipoma ultrasound 110322120428 1207350.jpg"
  ],
  "fem-c152m3": [
    "openi__PMC1574334_1477-7800-3-22-1.png"
  ],
  "fem-wt0trx": [
    "CT Ovarian Cyst.jpg"
  ],
  "fem-had3m2": [
    "Haemorrhagic ovarian cyst ultrasound.jpg",
    "CT of peritoneal carcinomatosis with ascites and ovarian mass.jpg"
  ],
  "fem-krukenberg": [
    "Torquiertes eingeblutetes Ovar bei Krukenbergtumor 53W - CT KM pv - 001.jpg",
    "Krukenberg-Tumor bei Magenkarzinom 40W - CT KM pv - 001.jpg",
    "openi__PMC3458788_ci12003104.png",
    "openi__PMC3307215_JCIS-2-6-g004.png"
  ],
  "fem-zg3ce7": [
    "openi__PMC4484292_usg-15010-f8.png"
  ],
  "fem-eyd8tu": [
    "CT of ankylosing spine and fracture.png"
  ],
  "fem-i4vixt": [
    "MRI. Edema of the infraspinatus tendon..jpg"
  ],
  "endo-eui15a": [
    "Ultrasonography and CT of a poorly differentiated invasive thyroid mass.jpg"
  ],
  "endo-smlfxu": [
    "openi__PMC4028530_kjim-29-383-g001.png"
  ],
  "endo-29ikdr": [
    "openi__PMC3922279_edmcr-2013-130019-g003.png",
    "openi__PMC3881208_cmj-49-125-g002.png",
    "openi__PMC4976193_CRIE2016-3016201.001.png",
    "openi__PMC3462668_1472-6823-12-14-2.png",
    "openi__PMC4295148_CRIE2014-213283.001.png",
    "openi__PMC4290639_CRIPA2014-753694.001.png",
    "openi__PMC4315945_edmcr-2015-140100-g001.png"
  ],
  "endo-rathke": [
    "openi__PMC3888040_JPN-8-217-g003.png",
    "openi__PMC4944348_JPGM-62-135-g001.png"
  ],
  "hn-p3vtm5": [
    "CT of mildly compressed hip fracture, annotated.png",
    "Subtle tibia fracture - T1 MRI.jpg",
    "T2 MRI of tibial fracture.jpg",
    "Lateral Tibial Plateau fracture CT with Depression 5.jpg",
    "T1 MRI of proximal metaphyseal fracture of the tibia.jpg",
    "Lateral Tibial Plateau fracture CT with Depression 6.jpg",
    "T2 weighted and fat-suppressed MRI of stress fracture of the radius.jpg",
    "openi__PMC3288499_cios-4-83-g007.png"
  ],
  "hn-1hw7wh": [
    "Lateral Tibial Plateau fracture CT with Depression.jpg",
    "T1 MRI of subcapital insufficiency fracture.jpg",
    "Lateral Tibial Plateau fracture CT with Depression 7.jpg",
    "Scintigraphy, sagittal T1 MRI, and coronal PD fat sat MRI of subchondral fracture.jpg",
    "CT of a pertrochanteric fracture.jpg",
    "T1 TSE MRI of hip fracture.jpg",
    "CT of subtle compressive hip fracture.jpg",
    "X-ray of periosteal reaction of a stress fracture of the radius.jpg",
    "Radiograph of Barton's fracture.jpg"
  ],
  "brs-64doy1": [
    "T1 MRI of avascular necrosis of the femoral head.jpg",
    "MRI brain T1-weighted sequence showing parasagittal cortical laminar necrosis.jpg"
  ],
  "brs-932xlx": [
    "Scrotal ultrasonography of lipoma.jpg",
    "Scrotal ultrasonography of liposarcoma mimicking a lipoma.jpg"
  ],
  "hem-fobzsc": [
    "openi__PMC5007396_kjr-17-695-g005.png"
  ],
  "hem-c740b0": [
    "Ausgedehntes extraossaeres Rezidiv eines multiple Myeloms 71W - CT - 001 - Annotation.jpg"
  ],
  "hem-emx4uw": [
    "Cerebral infarction after 4 hours on DWI MRI.jpg",
    "openi__PMC2713880_kjr-3-163-g002.png",
    "openi__PMC2713880_kjr-3-163-g003.png",
    "openi__PMC4213756_cvja-18-171-g001.png",
    "openi__PMC3194783_kjr-12-757-g002.png",
    "openi__PMC4610332_ijp-25-2660-g001.png"
  ],
  "sys-erdheim-chester": [
    "openi__PMC4141342_13244_2014_331_Fig7_HTML.png",
    "openi__PMC4563377_10.1177_2058460115592273-fig3.png",
    "openi__PMC4563377_10.1177_2058460115592273-fig4.png",
    "openi__PMC4917079_amjcaserep-17-360-g005.png",
    "openi__PMC4141342_13244_2014_331_Fig6_HTML.png",
    "openi__PMC5063637_cureus-0008-000000000781-i02.png"
  ],
  "sys-rtqwqi": [
    "openi__PMC3432362_CRIM2012-965304.002.png",
    "openi__PMC4821299_EPJ-08-1874-g002.png",
    "openi__PMC4315945_edmcr-2015-140100-g002.png",
    "openi__PMC4811064_CRIM2016-8579812.001.png",
    "openi__PMC4811064_CRIM2016-8579812.002.png"
  ],
  "sys-von-hippel-lindau": [
    "openi__PMC3665139_IJNM-27-119-g002.png",
    "openi__PMC3862244_jscr-2012-6-11fig1.png",
    "openi__PMC4433139_vim-0031-0007-g05.png"
  ]
};

/** 离线自动匹配时的额外关键词（type → 检索词） */
export const EXTRA_SEARCH = {
  monteggia: ['Monteggia fracture radiograph'],
  galeazzi: ['Galeazzi fracture radiograph'],
  jefferson: ['Jefferson fracture atlas C1'],
  hangman: ['hangman fracture C2'],
  lipoma: ['lipoma MRI soft tissue'],
  tgct: ['tenosynovial giant cell tumor MRI'],
  pvns: ['pigmented villonodular synovitis MRI'],
  dfsp: ['dermatofibrosarcoma protuberans MRI'],
  charcot: ['Charcot foot radiograph'],
  dish: ['DISH spine radiograph'],
  blount: ['Blount disease tibia'],
  rickets: ['rickets radiograph metaphysis'],
  ostoblastoma: ['osteoblastoma radiograph spine'],
  abc: ['aneurysmal bone cyst radiograph'],
  ubc: ['unicameral bone cyst radiograph'],
  enchondroma: ['enchondroma radiograph hand'],
  chondroblastoma: ['chondroblastoma radiograph epiphysis'],
  nof: ['non ossifying fibroma radiograph'],
  lchbone: ['eosinophilic granuloma bone radiograph'],
  adamantinoma: ['adamantinoma tibia radiograph'],
  osteoma: ['osteoma radiograph skull'],
  melorheostosis: ['melorheostosis radiograph'],
  osteopoikilosis: ['osteopoikilosis radiograph'],
  paget: ['Paget disease bone radiograph'],
  bennett: ['Bennett fracture thumb radiograph'],
  boxer: ['boxer fracture fifth metacarpal'],
  triquetrum: ['triquetrum fracture radiograph'],
  supracondylar: ['supracondylar humerus fracture pediatric'],
  olecranon: ['olecranon fracture radiograph'],
  maisonneuve: ['Maisonneuve fracture ankle'],
  proxfibula: ['proximal fibula fracture radiograph'],
  hemarthrosis: ['hemophilic arthropathy knee radiograph'],
  schwannoma: ['schwannoma soft tissue MRI extremity'],
  'supraspinatus-calc': ['calcific tendinitis supraspinatus radiograph'],
  sft: ['solitary fibrous tumor soft tissue MRI'],
  synovialsarcoma: ['synovial sarcoma MRI'],
  desmoid: ['desmoid tumor MRI'],
  alt: ['atypical lipomatous tumor MRI'],
  wdlps: ['well differentiated liposarcoma MRI'],
  compartment: ['compartment syndrome MRI'],
  spondylolysis: ['spondylolysis pars defect radiograph'],
  opll: ['ossification posterior longitudinal ligament CT'],
  osgood: ['Osgood Schlatter radiograph'],
  sinding: ['Sinding Larsen Johansson radiograph'],
  madelung: ['Madelung deformity radiograph'],
  'radioulnar-synostosis': ['radioulnar synostosis radiograph'],
  mortons: ['Morton neuroma MRI foot'],
  kienbock: ['Kienbock disease lunate radiograph'],
  preiser: ['Preiser disease scaphoid osteonecrosis'],
  'shoulder-oa': ['shoulder osteoarthritis radiograph'],
  'glenohumeral-oa': ['glenohumeral osteoarthritis radiograph'],
  'ankle-oa': ['ankle osteoarthritis radiograph'],
  'elbow-oa': ['elbow osteoarthritis radiograph'],
  'ac-joint': ['acromioclavicular joint osteoarthritis'],
  browntumor: ['brown tumor hyperparathyroidism radiograph'],
  'ossifying-fibroma': ['ossifying fibroma jaw radiograph'],
  'polyostotic-fd': ['polyostotic fibrous dysplasia radiograph'],
  'fd-mazabraud': ['Mazabraud syndrome fibrous dysplasia'],
  hemangioendo: ['epithelioid hemangioendothelioma bone MRI'],
  fibrosarcomabone: ['fibrosarcoma bone radiograph'],
  cortdesmoid: ['cortical desmoid radiograph femur'],
  striata: ['osteopathia striata radiograph'],
  iolipoma: ['intraosseous lipoma radiograph'],
  angiolipoma: ['angiolipoma MRI'],
  leiomyoma: ['leiomyoma soft tissue MRI'],
  myxoma: ['intramuscular myxoma MRI'],
  'nodular-fasciitis': ['nodular fasciitis MRI'],
  'plantar-fibroma': ['plantar fibromatosis MRI'],
  lipoblastoma: ['lipoblastoma MRI pediatric'],
  'hemangiopericytoma': ['hemangiopericytoma MRI'],
  'granular-cell': ['granular cell tumor MRI'],
  'quad-tear': ['quadriceps tear MRI'],
  hamstring: ['hamstring tear MRI'],
  adductor: ['adductor tear MRI'],
  'gluteus-min': ['gluteus minimus tear MRI'],
  plantaris: ['plantaris tear MRI'],
  extensor: ['extensor tendon tear hand MRI'],
  'biceps-long': ['long head biceps rupture MRI'],
  triceps: ['triceps tendon rupture MRI'],
  'pec-major': ['pectoralis major tear MRI'],
  'teres-minor': ['teres minor tear MRI'],
  deltoid: ['deltoid tear MRI'],
  'volar-plate': ['volar plate injury finger MRI'],
  'central-slip': ['central slip extensor injury'],
  mallet: ['mallet finger radiograph'],
  'rhabdo-trauma': ['traumatic rhabdomyolysis MRI'],
  denervation: ['muscle denervation MRI'],
  'tendon-xanthoma': ['tendon xanthoma MRI'],
  syringomyelia: ['syringomyelia MRI spine'],
  chiari: ['Chiari malformation MRI'],
  meniscoid: ['cervical disc herniation MRI'],
  schmorl: ['Schmorl node MRI'],
  oci: ['osteitis condensans ilii radiograph'],
  'bone-marrow-edema': ['bone marrow edema MRI'],
  'transient-osteoporosis': ['transient osteoporosis hip MRI'],
  'subchondral-insufficiency': ['subchondral insufficiency fracture knee'],
  'osteonecrosis-knee': ['osteonecrosis femoral condyle MRI'],
  osteochondritis: ['osteochondritis dissecans knee radiograph'],
  'discoid-meniscus': ['discoid meniscus MRI'],
  'meniscal-cyst': ['meniscal cyst MRI knee'],
  'acl-ganglion': ['ACL ganglion cyst MRI'],
  slap: ['SLAP lesion shoulder MRI'],
  'hip-labral': ['hip labral tear MRI'],
  'loose-body-knee': ['loose body knee radiograph'],
  patellofemoral: ['patellofemoral arthritis radiograph'],
  'os-trigonum': ['os trigonum syndrome MRI ankle'],
  'stress-tib-ant': ['shin splints MRI tibia'],
  myositis: ['pyomyositis MRI'],
  'myositis-oss': ['myositis ossificans radiograph'],
  'soft-chondroma': ['soft tissue chondroma MRI'],
  'fibroma-sheath': ['fibroma of tendon sheath MRI'],
  elastofibroma: ['elastofibroma dorsi MRI'],
  baker: ['Baker cyst MRI knee'],
  ganglion: ['ganglion cyst wrist MRI'],
  'hemangioma-st': ['soft tissue hemangioma MRI'],
  lymphangioma: ['lymphangioma MRI'],
  asps: ['alveolar soft part sarcoma MRI'],
  'synov-chondro': ['synovial chondromatosis knee MRI'],
  'erosive-oa': ['erosive osteoarthritis hand radiograph'],
  sapho: ['SAPHO syndrome radiograph'],
  'facet-arthropathy': ['facet arthropathy lumbar MRI'],
  modic: ['Modic change MRI spine'],
  spondylolisthesis: ['spondylolisthesis radiograph lateral'],
  'thoracic-disc': ['thoracic disc herniation MRI'],
  discitis: ['discitis MRI spine'],
  'epidural-abscess': ['epidural abscess spine MRI'],
  'oss-flavum': ['ligamentum flavum hypertrophy MRI'],
  atlantoaxial: ['atlantoaxial instability radiograph'],
  'odontoid-hypo': ['hypoplastic dens radiograph'],
  odontoid: ['odontoid fracture CT'],
  chance: ['chance fracture thoracolumbar'],
  'burst-lumbar': ['burst fracture lumbar spine'],
  tibialshaft: ['tibial shaft fracture radiograph'],
  pilon: ['pilon fracture tibia radiograph'],
  segond: ['Segond fracture radiograph knee'],
  radialhead: ['radial head fracture radiograph'],
  mason: ['Mason type radial head fracture'],
  essex: ['Essex Lopresti injury radiograph'],
  hillsachs: ['Hill Sachs lesion MRI'],
  bankart: ['Bankart lesion MRI shoulder'],
  scapholunate: ['scapholunate dissociation radiograph'],
  lymphomabone: ['primary bone lymphoma MRI'],
  plasmacytoma: ['plasmacytoma bone radiograph'],
  parosteo: ['parosteal osteosarcoma radiograph'],
  telosteo: ['telangiectatic osteosarcoma radiograph'],
  periosteo: ['periosteal osteosarcoma radiograph'],
  'lgc-osteo': ['low grade central osteosarcoma'],
  'cc-chondro': ['clear cell chondrosarcoma'],
  'dediff-chondro': ['dedifferentiated chondrosarcoma'],
  'mesench-chondro': ['mesenchymal chondrosarcoma'],
  'peri-chondro': ['periosteal chondrosarcoma'],
  hme: ['hereditary multiple exostoses radiograph'],
  maffucci: ['Maffucci syndrome radiograph'],
  'skelet-hemang': ['vertebral hemangioma MRI'],
  'ewing-extra': ['extraosseous Ewing sarcoma MRI']
};

/** 禁止用于任何疾病的文件（示意图/设备/非诊断图） */
export const BLOCKED_FILES = new Set([
  'Figure 6. Diagram of the bony pathology of both cam and pincer impingement..png',
  'Living anatomy and pathology; (1910) (14571590259).jpg',
  'A treatise on orthopedic surgery (1903) (14741748206).jpg',
  'Bone density scanner.jpg',
  '722 Feature Osteoprosis of Spine.jpg',
  'Knee_Cor_140234_t2me2d.png',
  // 在线补充曾误判（非目标疾病影像）
  'Anteroposterior (A) and lateral (B) radiographs nine months post-fixation showing proximal tibia and fibula transverse metaphyseal arrest lines and distal femoral intraepiphyseal arrest.jpg',
  'Vestibular-schwannoma-003.jpg',
  'Acoustic schwannoma.jpg',
  'CT showing fibrous tumor of the pleura.jpg',
  'Chest radiograph showing fibrous tumor of the pleura.jpg',
  'Calcific tendinitis of the longus colli muscles 45M - MR - 001.jpg',
  'Calcific tendinitis of the longus colli muscles 45M - MR - 001 - Annotation.jpg',
  'Hip-knee-ankle angle.png'
]);

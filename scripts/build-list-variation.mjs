/**
 * 生成 list-variation.mjs：按临床复杂度调整 mgmt/ddx/pitfalls/pearls 条数（不固定 3/4 条）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'data', 'site-data.json'), 'utf8'));
const outPath = path.join(root, 'data', 'batch2-details', 'enrichments', 'list-variation.mjs');

/** 简单/ incidental：列表可更短 */
const SIMPLE = new Set([
  'osteoma', 'osteopoikilosis', 'striata', 'cortdesmoid', 'iolipoma', 'skelet-hemang',
  'ganglion', 'baker', 'elastofibroma', 'leiomyoma', 'fibroma-sheath', 'granular-cell',
  'plantaris', 'schmorl', 'modic', 'boxer', 'olecranon', 'segond', 'meniscal-cyst',
  'acl-ganglion', 'loose-body-knee', 'osgood', 'sinding', 'lipoblastoma', 'angiolipoma'
]);

/** 复杂：列表应更详 */
const COMPLEX = new Set([
  'pilon', 'maisonneuve', 'jefferson', 'hangman', 'chance', 'burst-lumbar', 'odontoid',
  'charcot', 'hemarthrosis', 'pvns', 'discitis', 'epidural-abscess', 'atlantoaxial',
  'compartment', 'essex', 'bankart', 'hillsachs', 'synovialsarcoma', 'wdlps', 'alt',
  'paget', 'hme', 'maffucci', 'polyostotic-fd', 'fibrodysplasia', 'meniscoid', 'oss-flavum',
  'opll', 'osteochondritis', 'oci', 'subchondral-insufficiency', 'osteonecrosis-knee',
  'hip-labral', 'patellofemoral', 'slap', 'rhabdo-trauma', 'myositis', 'dediff-chondro',
  'mesench-chondro', 'chordoma', 'lgc-osteo'
]);

/** 复杂病种追加条目（在现有 3 条基础上追加，去重后写入） */
const EXTRA = {
  pilon: {
    mgmt: ['高能量损伤须排除同侧距骨/跟骨/胫骨平台骨折', '软组织 blister 分期决定手术窗口'],
    ddx: ['Tillaux 骨折（青少年）', '三踝骨折（低能量）'],
    pitfalls: ['忽视距下关节受累', '内踝/后踝骨折块常需联合固定'],
    pearls: ['CT 3D 重建为术前金标准', 'Rüedi-Allgöwer 指导固定策略']
  },
  charcot: {
    mgmt: ['足科/内分泌/影像多学科随访', '活动期禁止负重直至炎症指标及皮温下降'],
    ddx: ['痛风性关节炎：结晶、间歇发作', 'RA 足：对称、侵蚀模式不同'],
    pitfalls: ['单足片不足以评估对侧', '支具需长程佩戴防再骨折'],
    pearls: ['Eichenholtz 0 期为活动性炎症期', '中足 Lisfranc 区最易塌陷']
  },
  jefferson: {
    mgmt: ['不稳定（横韧带断裂）：C1–2 融合', '儿童可用 Halo；评估 VAI 与椎动脉'],
    ddx: ['Rotatory C1–2 subluxation（儿童）', 'C2 齿状突骨折（机制不同）'],
    pitfalls: ['开口位投照角度不当假阴性', '仅看 C1 忽略 C2–3  disc 损伤'],
    pearls: ['Spence 规则：侧块总外移>7 mm', 'CT 是分型与稳定性评估首选']
  },
  pvns: {
    mgmt: ['复发者考虑低剂量放疗或重复滑膜切除', '关节外延伸者需开放完整切除'],
    ddx: ['hemophilic synovitis：凝血病史', '滑膜肉瘤：实性肿块、无含铁血黄素模式'],
    pitfalls: ['局限型与弥漫型治疗策略不同', 'GRE/SWI 序列必扫'],
    pearls: ['弥漫型=TGCT 病理命名', 'blooming 伪影是 MRI 指纹征']
  },
  discitis: {
    mgmt: ['血培养+骨活检指导抗生素', '不稳定或巨大脓肿：减压+内固定'],
    ddx: ['Modic I 型终板炎：无全身感染', '转移瘤：椎间盘常保留'],
    pitfalls: ['已开始抗生素后培养阳性率下降', '须评估硬膜外脓肿范围'],
    pearls: ['MRI 最早；T1 低 T2 高+增强', '儿童 disc 血供丰富更易受累']
  },
  'epidural-abscess': {
    mgmt: ['全脊柱 MRI（20–40% 多节段）', '神经功能进行性下降=急诊手术'],
    ddx: ['硬膜外血肿：创伤/抗凝', '硬膜外转移：已知原发瘤'],
    pitfalls: ['仅扫 symptomatic level 漏诊', '延迟减压可致不可逆瘫痪'],
    pearls: ['三联：背痛+发热+神经缺损', '增强 MRI 显示脓肿壁强化']
  },
  meniscoid: {
    mgmt: ['根型：颈托、理疗、药物', '脊髓型或进行性肌力下降：减压融合', '避免暴力推拿'],
    ddx: ['颈椎管狭窄症（多节段）', '脊髓肿瘤：强化肿块', '肌萎缩侧索硬化：无根性痛'],
    pitfalls: ['本库 type=meniscoid 指颈椎间盘疝', '须轴位+矢状位联合读片'],
    pearls: ['脊髓 T2 高信号提示预后不良', 'C5–6/C6–7 最常见']
  },
  'oss-flavum': {
    mgmt: ['OLF 为后方压迫，通常后路减压', '合并 OPLL 需分别评估前后侵占', '无症状可随访'],
    ddx: ['黄韧带肥厚（非骨化）', '硬膜外脂肪增多', '后纵韧带骨化（OPLL）'],
    pitfalls: ['切勿与 OPLL 混称', 'MRI 不能替代 CT 定量骨化'],
    pearls: ['OLF=黄韧带；OPLL=后纵韧带', '胸椎下段亚洲人群多见']
  },
  osteochondritis: {
    mgmt: ['骨骼未成熟+稳定：制动 6–12 周', '不稳定：内固定/骨软骨移植', '游离体：取出或固定'],
    ddx: ['急性骨软骨骨折：明确外伤', 'Normal 变异：对侧对称'],
    pitfalls: ['膝典型部位为 MFC 外侧面', 'MRI 液相 cleft=不稳定'],
    pearls: ['Berndt-Harty 用于距骨 OCD', '未成熟骨骼愈合潜力更大']
  },
  compartment: {
    mgmt: ['急性：紧急筋膜切开，6 小时内预后最佳', 'CECS：测压>35 mmHg 或休息压差支持诊断'],
    ddx: ['深静脉血栓：D-二聚体/超声', '蜂窝织炎：皮肤红斑为主'],
    pitfalls: ['足/compartment 也要评估', '急性勿等 MRI'],
    pearls: ['Pain out of proportion 是红旗', '被动伸趾痛（小腿）']
  },
  maisonneuve: {
    mgmt: ['下胫腓联合螺钉/Endobutton 固定', '内侧三角韧带/内踝骨折一并处理', '腓骨近端通常不需 ORIF'],
    ddx: ['单纯 Weber B/C 踝骨折', '下胫腓联合损伤无近端腓骨骨折'],
    pitfalls: [' ankle X 线必须包含全长胫腓', 'Syndesmosis 复位不良致慢性不稳'],
    pearls: ['触诊腓骨近端为必查步骤', 'MRI 评估 deltoid/联合韧带']
  },
  'burst-lumbar': {
    mgmt: ['TLICS≥4 倾向手术', '神经进行性损害：减压+融合', '骨质疏松：骨水泥增强螺钉'],
    ddx: ['Chance 骨折：水平经后柱', '转移瘤：多节段、原发灶'],
    pitfalls: ['PLC 损伤 MRI 评估', 'retropulsion % 决定 canal compromise'],
    pearls: ['Denis 三柱+TLICS 并用', 'CT 看骨性侵占']
  },
  paget: {
    mgmt: ['双膦酸盐/地诺单抗抑制骨转换', '畸形：截骨矫形', '恶变：广泛切除'],
    ddx: ['转移瘤 blastic：多灶、已知原发', '骨纤维结构不良：年轻、磨玻璃'],
    pitfalls: ['ALP 升高但可正常于 monostotic', '新发疼痛+肿块=恶变警报'],
    pearls: ['Blade of grass lytic phase', '1% 继发骨肉瘤风险']
  },
  synovialsarcoma: {
    mgmt: ['广泛切除+放疗', '化疗用于高级别/转移', '肺 CT 分期'],
    ddx: ['PVNS：含铁血黄素、关节内', 'GCT 腱鞘：手指小结节'],
    pitfalls: ['非真正滑膜来源', 'calcification 非特异'],
    pearls: ['SS18-SSX 融合检测', '青少年 periarticular 实性肿块须活检']
  },
  wdlps: {
    mgmt: ['腹膜后：多学科+完整切除', '监测去分化转化', '放疗用于切缘阳性'],
    ddx: ['Myxoid LPS：黏液信号、无脂肪', 'Hibernoma：棕色脂肪信号'],
    pitfalls: [' superficial 肢体极少 WDLPS', '不完整切除高复发'],
    pearls: ['ALT=WDLPS 同一实体', '厚分隔>2 mm 为警报']
  }
};

function uniq(arr) {
  const seen = new Set();
  return arr.filter(x => {
    const s = String(x).trim();
    if (!s || seen.has(s)) return false;
    seen.add(s);
    return true;
  });
}

function sliceList(arr, n) {
  return uniq(arr).slice(0, n);
}

function appendList(arr, extra = []) {
  return uniq([...(arr || []), ...extra]);
}

const batch2 = site.diseases.filter(d => Number(d.entryBatch) === 2);
const variation = {};

for (const d of batch2) {
  const det = site.diseaseDetails[d.type] || {};
  const patch = {};
  const ex = EXTRA[d.type] || {};

  if (SIMPLE.has(d.type)) {
    if (det.ddx?.length) patch.ddx = sliceList(det.ddx, 2);
    if (det.pitfalls?.length) patch.pitfalls = sliceList(det.pitfalls, 2);
    if (det.pearls?.length) patch.pearls = sliceList(det.pearls, 2);
    if (det.mgmt?.length > 3) patch.mgmt = sliceList(det.mgmt, 3);
  } else if (COMPLEX.has(d.type)) {
    if (det.mgmt?.length || ex.mgmt) patch.mgmt = appendList(det.mgmt, ex.mgmt).slice(0, 7);
    if (det.ddx?.length || ex.ddx) patch.ddx = appendList(det.ddx, ex.ddx).slice(0, 7);
    if (det.pitfalls?.length || ex.pitfalls) patch.pitfalls = appendList(det.pitfalls, ex.pitfalls).slice(0, 7);
    if (det.pearls?.length || ex.pearls) patch.pearls = appendList(det.pearls, ex.pearls).slice(0, 7);
  } else if (ex.mgmt || ex.ddx || ex.pitfalls || ex.pearls) {
    if (ex.mgmt) patch.mgmt = appendList(det.mgmt, ex.mgmt).slice(0, 6);
    if (ex.ddx) patch.ddx = appendList(det.ddx, ex.ddx).slice(0, 6);
    if (ex.pitfalls) patch.pitfalls = appendList(det.pitfalls, ex.pitfalls).slice(0, 6);
    if (ex.pearls) patch.pearls = appendList(det.pearls, ex.pearls).slice(0, 6);
  } else {
    // 中等复杂度：随机化 3–5 条（按 type 哈希稳定）
    const h = [...d.type].reduce((a, c) => a + c.charCodeAt(0), 0);
    const nDdx = 3 + (h % 3); // 3–5
    const nPit = 2 + (h % 3); // 2–4
    const nPrl = 3 + ((h >> 2) % 2); // 3–4
    if (det.ddx?.length) patch.ddx = appendList(det.ddx, []).slice(0, nDdx);
    if (det.pitfalls?.length) patch.pitfalls = appendList(det.pitfalls, []).slice(0, nPit);
    if (det.pearls?.length) patch.pearls = appendList(det.pearls, []).slice(0, nPrl);
  }

  if (Object.keys(patch).length) variation[d.type] = patch;
}

function toJs(obj, indent = 0) {
  const sp = '  '.repeat(indent);
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]';
    return `[\n${obj.map(v => `${sp}  ${JSON.stringify(v)}`).join(',\n')}\n${sp}]`;
  }
  if (obj && typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (!entries.length) return '{}';
    return `{\n${entries
      .map(([k, v]) => {
        const key = /^[a-zA-Z_][\w$]*$/.test(k) ? k : JSON.stringify(k);
        return `${sp}  ${key}: ${toJs(v, indent + 1)}`;
      })
      .join(',\n')}\n${sp}}`;
  }
  return JSON.stringify(obj);
}

const header = `/** 列表字段条数变化层：简单病 2–3 条，复杂病 5–7 条，由 scripts/build-list-variation.mjs 生成 */\nexport default `;
fs.writeFileSync(outPath, header + toJs(variation) + ';\n', 'utf8');

const stats = { types: Object.keys(variation).length, ddx: [], pit: [], prl: [] };
for (const v of Object.values(variation)) {
  if (v.ddx) stats.ddx.push(v.ddx.length);
  if (v.pitfalls) stats.pit.push(v.pitfalls.length);
  if (v.pearls) stats.prl.push(v.pearls.length);
}
console.log('wrote', outPath);
console.log('types', stats.types);
console.log('ddx lengths', [...new Set(stats.ddx)].sort().join(','));
console.log('pitfalls lengths', [...new Set(stats.pit)].sort().join(','));
console.log('pearls lengths', [...new Set(stats.prl)].sort().join(','));

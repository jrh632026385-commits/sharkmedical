/**
 * 从 data/doc-remaining-systems-extract.txt 生成 data/doc-remaining-systems-source.mjs
 * node scripts/parse-doc-remaining-systems.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const extractPath = path.join(root, 'data', 'doc-remaining-systems-extract.txt');
const outPath = path.join(root, 'data', 'doc-remaining-systems-source.mjs');

const SYSTEMS = [
  {
    label: '神经系统', sys: 'nervous', prefix: 'nerv', batch: 7, batchLabel: '第七批录入（神经系统）',
    groups: ['脑血管疾病', '颅内肿瘤', '感染与炎症', '脱髓鞘与白质病变', '神经变性与代谢', '颅脑外伤', '先天与发育畸形', '脊柱脊髓']
  },
  {
    label: '泌尿生殖系统', sys: 'urogenital', prefix: 'uro', batch: 7, batchLabel: '第七批录入（泌尿生殖）',
    groups: ['肾脏', '输尿管', '膀胱', '尿道前列腺', '男性生殖器', '肾上腺']
  },
  {
    label: '女性生殖系统与产科', sys: 'female-repro', prefix: 'fem', batch: 7, batchLabel: '第七批录入（女性生殖）',
    groups: ['子宫', '卵巢', '输卵管盆腔', '产科']
  },
  {
    label: '内分泌系统', sys: 'endocrine', prefix: 'endo', batch: 7, batchLabel: '第七批录入（内分泌）',
    groups: ['甲状腺', '甲状旁腺', '肾上腺', '垂体下丘脑', '胰腺内分泌与骨改变']
  },
  {
    label: '头颈部与五官', sys: 'head-neck', prefix: 'hn', batch: 7, batchLabel: '第七批录入（头颈五官）',
    groups: ['眼与眼眶', '耳与颞骨', '鼻与鼻窦', '咽喉口腔', '涎腺', '颈部与颌骨']
  },
  {
    label: '乳腺', sys: 'breast', prefix: 'brs', batch: 7, batchLabel: '第七批录入（乳腺）',
    groups: ['良性', '炎症', '恶性']
  },
  {
    label: '血液与淋巴系统', sys: 'hematolymph', prefix: 'hem', batch: 7, batchLabel: '第七批录入（血液淋巴）',
    groups: ['淋巴瘤', '髓系与浆细胞', '贫血相关骨改变', '脾与网状内皮', '淋巴管']
  },
  {
    label: '全身性与多系统', sys: 'systemic', prefix: 'sys', batch: 7, batchLabel: '第七批录入（全身多系统）',
    groups: ['肿瘤播散', '肉芽肿与免疫', '代谢与沉积', '结缔组织与血管炎', '感染播散', '遗传性肿瘤综合征']
  }
];

const GROUP_META = {
  脑血管疾病: { key: 'cerebrovascular', desc: '脑梗死、脑出血、动脉瘤与脑血管畸形', region: '脑/脑血管', zone: 'cerebrovascular', mods: 'CT · MRI · DSA · CTA' },
  颅内肿瘤: { key: 'intracranial-tumor', desc: '胶质瘤、脑膜瘤、垂体瘤与转移瘤', region: '颅内', zone: 'intracranial', mods: 'MRI · CT · PET-CT' },
  '感染与炎症': { key: 'infection-inflammation', desc: '脑脓肿、脑膜炎、脑炎与寄生虫', region: '脑/脑膜', zone: 'infection', mods: 'MRI · CT · 核素' },
  '脱髓鞘与白质病变': { key: 'demyelination', desc: '多发性硬化、ADEM 与白质营养不良', region: '脑白质', zone: 'white-matter', mods: 'MRI · CT' },
  '神经变性与代谢': { key: 'neurodegeneration', desc: '痴呆、帕金森病与代谢性脑病', region: '脑/基底节', zone: 'degeneration', mods: 'MRI · PET-CT · CT' },
  颅脑外伤: { key: 'head-trauma', desc: '血肿、挫裂伤、DAI 与颅骨骨折', region: '颅脑', zone: 'trauma', mods: 'CT · MRI · X线' },
  '先天与发育畸形': { key: 'congenital', desc: 'Chiari、Dandy-Walker 与神经管畸形', region: '颅脑/脊髓', zone: 'congenital', mods: 'MRI · CT · 超声' },
  脊柱脊髓: { key: 'spine-cord', desc: '椎间盘突出、脊髓肿瘤与脊髓炎', region: '脊柱/脊髓', zone: 'spine', mods: 'MRI · CT · X线' },

  肾脏: { key: 'kidney', desc: '肾肿瘤、囊肿、感染与先天畸形', region: '肾脏', zone: 'kidney', mods: '超声 · CT · MRI' },
  输尿管: { key: 'ureter', desc: '结石、肿瘤与先天性异常', region: '输尿管', zone: 'ureter', mods: 'CT · 超声 · IVU' },
  膀胱: { key: 'bladder', desc: '膀胱肿瘤、结石与炎症', region: '膀胱', zone: 'bladder', mods: 'CT · 超声 · 膀胱镜' },
  尿道前列腺: { key: 'urethra-prostate', desc: '前列腺增生/癌、尿道与精囊病变', region: '前列腺/尿道', zone: 'prostate', mods: '超声 · MRI · CT' },
  男性生殖器: { key: 'male-genital', desc: '睾丸肿瘤、扭转与附睾病变', region: '睾丸/附睾', zone: 'testis', mods: '超声 · MRI · CT' },
  肾上腺: { key: 'adrenal', desc: '肾上腺腺瘤、嗜铬细胞瘤与转移', region: '肾上腺', zone: 'adrenal', mods: 'CT · MRI · 核素' },

  子宫: { key: 'uterus', desc: '子宫肌瘤、内膜癌与宫颈病变', region: '子宫', zone: 'uterus', mods: '超声 · MRI · CT' },
  卵巢: { key: 'ovary', desc: '卵巢囊肿/肿瘤与扭转', region: '卵巢', zone: 'ovary', mods: '超声 · MRI · CT' },
  输卵管盆腔: { key: 'fallopian-pelvis', desc: '输卵管积水、盆腔炎与内膜异位', region: '盆腔', zone: 'pelvis', mods: '超声 · MRI · CT' },
  产科: { key: 'obstetrics', desc: '异位妊娠、胎儿畸形与胎盘异常', region: '子宫/胎儿', zone: 'obstetric', mods: '超声 · MRI · CT' },

  甲状腺: { key: 'thyroid', desc: '甲状腺结节、肿瘤与炎症', region: '甲状腺', zone: 'thyroid', mods: '超声 · CT · 核素' },
  甲状旁腺: { key: 'parathyroid', desc: '甲状旁腺腺瘤与增生', region: '甲状旁腺', zone: 'parathyroid', mods: '超声 · 核素 · CT' },
  垂体下丘脑: { key: 'pituitary-hypothalamus', desc: '垂体腺瘤、颅咽管瘤与下丘脑病变', region: '垂体/下丘脑', zone: 'pituitary', mods: 'MRI · CT' },
  '胰腺内分泌与骨改变': { key: 'pancreatic-endocrine', desc: '胰岛细胞瘤与内分泌性骨改变', region: '胰腺/骨', zone: 'endocrine-bone', mods: 'CT · MRI · 核素' },

  '眼与眼眶': { key: 'eye-orbit', desc: '眼眶肿瘤、炎症与眼内病变', region: '眼眶/眼球', zone: 'orbit', mods: 'MRI · CT · 超声' },
  '耳与颞骨': { key: 'ear-temporal', desc: '胆脂瘤、听神经瘤与颞骨骨折', region: '颞骨/内耳', zone: 'ear', mods: 'CT · MRI' },
  '鼻与鼻窦': { key: 'nose-sinus', desc: '鼻窦炎、鼻息肉与鼻窦肿瘤', region: '鼻/鼻窦', zone: 'sinus', mods: 'CT · MRI' },
  咽喉口腔: { key: 'pharynx-oral', desc: '鼻咽癌、喉癌与口腔癌', region: '口咽/喉', zone: 'pharynx', mods: 'MRI · CT · 内镜' },
  涎腺: { key: 'salivary', desc: '涎腺结石、肿瘤与炎症', region: '涎腺', zone: 'salivary', mods: 'CT · MRI · 超声' },
  颈部与颌骨: { key: 'neck-jaw', desc: '颈部淋巴结、鳃裂囊肿与颌骨病变', region: '颈部/颌骨', zone: 'neck', mods: 'CT · MRI · 超声' },

  良性: { key: 'benign', desc: '纤维腺瘤、囊肿与良性增生', region: '乳腺', zone: 'benign', mods: '钼靶 · 超声 · MRI' },
  炎症: { key: 'inflammation', desc: '乳腺炎、脓肿与肉芽肿性乳腺炎', region: '乳腺', zone: 'inflammation', mods: '超声 · 钼靶 · MRI' },
  恶性: { key: 'malignant', desc: '浸润性癌、原位癌与特殊类型乳腺癌', region: '乳腺', zone: 'malignant', mods: '钼靶 · 超声 · MRI · PET-CT' },

  淋巴瘤: { key: 'lymphoma', desc: '霍奇金与非霍奇金淋巴瘤', region: '淋巴结/结外', zone: 'lymphoma', mods: 'PET-CT · CT · MRI' },
  '髓系与浆细胞': { key: 'myeloid-plasma', desc: '白血病、骨髓瘤与髓外造血', region: '骨髓/软组织', zone: 'myeloid', mods: 'MRI · CT · PET-CT' },
  '贫血相关骨改变': { key: 'anemia-bone', desc: '地中海贫血、镰状细胞与贮积病骨改变', region: '骨骼', zone: 'anemia-bone', mods: 'X线 · MRI · CT' },
  '脾与网状内皮': { key: 'spleen-reticulo', desc: '脾肿大、脾梗死与组织细胞增生', region: '脾/网状内皮', zone: 'spleen', mods: '超声 · CT · MRI' },
  淋巴管: { key: 'lymphatic', desc: '淋巴管瘤、乳糜胸与淋巴水肿', region: '淋巴管', zone: 'lymphatic', mods: 'MRI · CT · 核素' },

  肿瘤播散: { key: 'metastasis', desc: '多发转移、脑膜癌病与腹膜转移', region: '全身', zone: 'metastasis', mods: 'PET-CT · CT · MRI' },
  '肉芽肿与免疫': { key: 'granulomatous', desc: '结节病、IgG4 与组织细胞病', region: '多器官', zone: 'granuloma', mods: 'CT · MRI · PET-CT' },
  '代谢与沉积': { key: 'metabolic-deposit', desc: '淀粉样变、血色病与贮积症', region: '多器官', zone: 'metabolic', mods: 'MRI · CT · 核素' },
  '结缔组织与血管炎': { key: 'connective', desc: 'SLE、血管炎与硬皮病器官受累', region: '多器官', zone: 'connective', mods: 'CT · MRI · 超声' },
  感染播散: { key: 'disseminated-infection', desc: '脓毒性栓塞、粟粒性结核与播散性真菌', region: '全身', zone: 'infection', mods: 'CT · MRI · 核素' },
  遗传性肿瘤综合征: { key: 'hereditary-tumor', desc: 'NF、VHL 与 TSC 等综合征', region: '多器官', zone: 'hereditary', mods: 'MRI · CT · 超声' }
};

function normalizeText(raw) {
  return raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+/g, '\n').trim();
}

function parseByMarkers(text) {
  const result = [];
  for (let si = 0; si < SYSTEMS.length; si++) {
    const sysDef = SYSTEMS[si];
    const sysStart = text.indexOf(sysDef.label);
    if (sysStart < 0) throw new Error(`system not found: ${sysDef.label}`);
    const sysEnd = si + 1 < SYSTEMS.length
      ? text.indexOf(SYSTEMS[si + 1].label, sysStart + sysDef.label.length)
      : text.length;
    if (sysEnd < 0) throw new Error(`system end not found: ${sysDef.label}`);

    const groups = [];
    let cursor = sysStart + sysDef.label.length;

    for (let gi = 0; gi < sysDef.groups.length; gi++) {
      const groupLabel = sysDef.groups[gi];
      const gIdx = text.indexOf(groupLabel, cursor);
      if (gIdx < 0 || gIdx >= sysEnd) throw new Error(`group not found: ${groupLabel} in ${sysDef.label}`);
      const start = gIdx + groupLabel.length;
      let end = sysEnd;
      for (let gj = gi + 1; gj < sysDef.groups.length; gj++) {
        const nextIdx = text.indexOf(sysDef.groups[gj], start);
        if (nextIdx >= 0 && nextIdx < sysEnd) {
          end = nextIdx;
          break;
        }
      }
      const diseaseLine = text.slice(start, end).trim().replace(/^[、,，]+/, '');
      const meta = GROUP_META[groupLabel];
      const diseases = diseaseLine.split(/[、,，]/).map(s => s.trim()).filter(Boolean);
      groups.push({
        key: meta.key,
        label: groupLabel,
        desc: meta.desc,
        region: meta.region,
        zone: meta.zone,
        mods: meta.mods,
        diseases
      });
      cursor = start;
    }
    result.push({ sys: sysDef.sys, prefix: sysDef.prefix, batch: sysDef.batch, batchLabel: sysDef.batchLabel, groups });
  }
  return result;
}

const text = normalizeText(fs.readFileSync(extractPath, 'utf8'));
const DOC_SYSTEMS = parseByMarkers(text);

const file = `/** 剩余 8 系统疾病源数据 · 由 scripts/parse-doc-remaining-systems.mjs 从 Word 提取文本生成 */
export const DOC_SYSTEMS = ${JSON.stringify(DOC_SYSTEMS, null, 2)};
`;

fs.writeFileSync(outPath, file, 'utf8');

let total = 0;
for (const s of DOC_SYSTEMS) {
  const n = s.groups.reduce((a, g) => a + g.diseases.length, 0);
  total += n;
  console.log(`  ${s.sys}: ${n} (${s.groups.length} groups)`);
}
console.log('parse-doc-remaining-systems done');
console.log('  total diseases:', total);
console.log('  wrote:', outPath);

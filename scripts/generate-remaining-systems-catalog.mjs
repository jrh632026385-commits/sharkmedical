/**
 * 从 data/doc-remaining-systems-source.mjs 生成 8 个 *-catalog.mjs
 * node scripts/generate-remaining-systems-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOC_SYSTEMS } from '../data/doc-remaining-systems-source.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

const usedTypes = new Set();

function hashSlug(title) {
  let h = 2166136261;
  for (let i = 0; i < title.length; i++) {
    h ^= title.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h).toString(36).slice(0, 10);
}

function toSlug(title) {
  const asciiParts = [...title.matchAll(/[A-Za-z][A-Za-z0-9/+-]*/g)].map(m =>
    m[0].toLowerCase().replace(/\//g, '-').replace(/[^a-z0-9-]/g, '')
  ).filter(Boolean);
  if (asciiParts.length) return asciiParts.join('-').slice(0, 36);
  return hashSlug(title);
}

function inferSubcat(title, groupKey) {
  const t = title + groupKey;
  if (/癌|肉瘤|淋巴瘤|转移|恶性|浸润|原位/.test(t)) return 'malignant';
  if (/腺瘤|囊肿|良性|错构|脂肪瘤|纤维瘤|多形性|Warthin|畸胎|错构/.test(t)) return 'benign';
  if (/炎|脓肿|感染|结核|脑膜炎|肺炎|蜂窝/.test(t)) return 'infection';
  if (/结石|钙化/.test(t)) return 'stone';
  if (/出血|血肿|梗死|栓塞|血栓|盗血|狭窄|夹层|动脉瘤|瘘|畸形|动静脉/.test(t)) return 'vascular';
  if (/创伤|骨折|损伤|脱位|扭转|破裂/.test(t)) return 'trauma';
  if (/先天|发育|畸形|异位|不全|闭锁|缺如|Chiari|Dandy|无脑|巨脑|灰质|脑裂|积水|膨出|融合|重复/.test(t)) return 'congenital';
  if (/脱髓鞘|硬化|白质|ADEM|视神经脊髓/.test(t)) return 'demyelination';
  if (/痴呆|帕金森|萎缩|变性|共济失调|亨廷顿|ALS|Wernicke|Leigh|MELAS|代谢|沉积|铁/.test(t)) return 'degeneration';
  if (/Graves|桥本|甲状|垂体|肾上腺|内分泌|胰岛素|胃泌素|肢端|骨质疏松|骨软化/.test(t)) return 'endocrine';
  if (/妊娠|胎儿|胎盘|羊水|葡萄胎|绒毛|异位妊娠|稽留|双胎|前置/.test(t)) return 'obstetric';
  if (/结节|增生|息肉|纤维囊|硬化性腺|Paget|叶状/.test(t)) return 'tumor';
  return 'general';
}

function inferSev(title, subcat) {
  if (subcat === 'malignant' || /急|压塞|扭转|破裂|出血|梗死|栓塞|坏死|疝|穿孔/.test(title)) return ['high', '高危·影像'];
  if (subcat === 'benign' || subcat === 'congenital' || /囊肿$|结节$|增生$/.test(title)) return ['low', '慢性·随访'];
  return ['mid', '影像·评估'];
}

function buildDesc(title, region, groupLabel, mods) {
  return `${title}属于${groupLabel}，${region}相关病变；${mods.split(' · ')[0]}/${mods.split(' · ')[1] || 'MRI'} 等影像用于定位、定性及并发症评估。`;
}

function defaultSigns(title, subcat) {
  if (subcat === 'malignant') return ['占位/浸润', '强化异常', '分期评估'];
  if (subcat === 'vascular') return ['血管形态异常', '灌注/信号改变', '并发症征象'];
  if (subcat === 'infection') return ['炎症/积液', '强化模式', '范围评估'];
  if (subcat === 'trauma') return ['结构中断/血肿', '周围水肿', '继发改变'];
  if (subcat === 'congenital') return ['解剖发育异常', '继发改变', '多序列评估'];
  return [`${title}典型征象`, '解剖定位', '鉴别要点'];
}

function makeType(prefix, title) {
  let base = `${prefix}-${toSlug(title)}`.replace(/--+/g, '-').slice(0, 48);
  let type = base;
  let i = 2;
  while (usedTypes.has(type)) {
    type = `${base}-${i++}`;
  }
  usedTypes.add(type);
  return type;
}

function sysKeyToConst(sys) {
  return sys.toUpperCase().replace(/-/g, '_');
}

function generateCatalog(system) {
  const constPrefix = sysKeyToConst(system.sys);
  const navGroups = {};
  const navOrder = [];
  const rows = [];

  for (const group of system.groups) {
    navOrder.push(group.key);
    navGroups[group.key] = { label: group.label, icon: '', desc: group.desc };
    for (const title of group.diseases) {
      const subcat = inferSubcat(title, group.key);
      const [sev, sevtext] = inferSev(title, subcat);
      const type = makeType(system.prefix, title);
      const desc = buildDesc(title, group.region, group.label, group.mods);
      const signs = defaultSigns(title, subcat);
      rows.push([
        group.key, type, title, title, group.region, subcat,
        group.mods, sev, sevtext, desc, ...signs
      ]);
    }
  }

  const file = `/** ${system.sys} · ${navOrder.length} 类导航 + 疾病目录（无图库） — 由 scripts/generate-remaining-systems-catalog.mjs 生成 */
export const ${constPrefix}_NAV_GROUPS = ${JSON.stringify(navGroups, null, 2)};

export const ${constPrefix}_NAV_ORDER = ${JSON.stringify(navOrder, null, 2)};

/** [navGroup, type, title, sub, region, subcat, mod, sev, sevtext, desc, ...signs] */
export const ${constPrefix}_DISEASE_ROWS = ${JSON.stringify(rows, null, 2)};
`;

  const outPath = path.join(dataDir, `${system.sys}-catalog.mjs`);
  fs.writeFileSync(outPath, file, 'utf8');
  return { sys: system.sys, groups: navOrder.length, diseases: rows.length, path: outPath };
}

const summary = [];
for (const system of DOC_SYSTEMS) {
  summary.push(generateCatalog(system));
}

console.log('generate-remaining-systems-catalog done');
for (const s of summary) {
  console.log(`  ${s.sys}: ${s.diseases} diseases, ${s.groups} nav groups -> ${path.basename(s.path)}`);
}
console.log('  total:', summary.reduce((a, s) => a + s.diseases, 0));

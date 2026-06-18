import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const outPath = path.join(root, 'data', 'site-data.json');

function extractLiteral(expr) {
  expr = expr.trim();
  const open = expr[0];
  const close = open === '[' ? ']' : open === '{' ? '}' : null;
  if (!close) return expr;
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === open) depth++;
    else if (expr[i] === close) {
      depth--;
      if (depth === 0) return expr.slice(0, i + 1);
    }
  }
  return expr;
}

function sliceConst(html, name, nextMarker) {
  const re = new RegExp(`(?:const|let) ${name}=`);
  const start = html.search(re);
  if (start === -1) throw new Error(`无法在 index.html 中找到 ${name}`);
  const end = html.indexOf(nextMarker, start + 1);
  if (end === -1) throw new Error(`无法定位 ${name} 的结束位置（缺少 ${nextMarker}）`);
  const chunk = html.slice(start, end).trim();
  const expr = chunk.replace(new RegExp(`^(?:const|let) ${name}=`), '').trim();
  return extractLiteral(expr);
}

function evalConst(expr, sandbox) {
  vm.runInNewContext(expr, sandbox, { timeout: 5000 });
}

const html = fs.readFileSync(htmlPath, 'utf8');
const sandbox = {
  I(f, c, o) {
    o = o || {};
    return { file: f, caption: c, site: o.site || '', ann: o.ann || [], modified: o.modified };
  },
  mkAnn(site, ...pts) {
    return {
      site,
      ann: pts.map(p => ({ x: p[0], y: p[1], lx: p[2], ly: p[3], label: p[4] }))
    };
  },
  wikiImg(filename, width) {
    width = width || 800;
    const f = String(filename || '').replace(/ /g, '_');
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=${width}`;
  }
};
vm.createContext(sandbox);

const blocks = [
  ['diseaseGalleries', 'let galleryAnnTpl='],
  ['galleryAnnTpl', 'const diseaseImages='],
  ['diseases', '/* ---------- disease taxonomy'],
  ['TAXONOMY', 'const CAT_ORDER='],
  ['NAV_GROUPS', 'const NAV_ORDER='],
  ['taxByType', 'diseases.forEach'],
  ['filmData', 'function renderFilmMedia'],
  ['detailMap', 'const detailExtended='],
  ['detailExtended', '/* ---------- mini SVG']
];

for (const [name, next] of blocks) {
  const expr = sliceConst(html, name, next);
  evalConst(`${name}=${expr}`, sandbox);
}

function mergeDiseaseDetails(dm, de) {
  const out = {};
  const keys = new Set([...Object.keys(dm || {}), ...Object.keys(de || {})]);
  for (const k of keys) {
    out[k] = { ...(dm[k] || {}), ...(de[k] || {}) };
  }
  return out;
}

let imageAttribRegistry = {};
const attribPath = path.join(root, 'image-attrib-registry.js');
if (fs.existsSync(attribPath)) {
  const attribSandbox = { window: { IMAGE_ATTRIB_REGISTRY: {} } };
  vm.createContext(attribSandbox);
  vm.runInContext(fs.readFileSync(attribPath, 'utf8'), attribSandbox, { timeout: 5000 });
  imageAttribRegistry = attribSandbox.window.IMAGE_ATTRIB_REGISTRY || {};
}

const siteData = {
  version: 1,
  updatedAt: new Date().toISOString(),
  diseaseGalleries: sandbox.diseaseGalleries,
  galleryAnnTpl: sandbox.galleryAnnTpl,
  diseases: sandbox.diseases,
  diseaseDetails: mergeDiseaseDetails(sandbox.detailMap, sandbox.detailExtended),
  imageAttribRegistry,
  TAXONOMY: sandbox.TAXONOMY,
  NAV_GROUPS: sandbox.NAV_GROUPS,
  taxByType: sandbox.taxByType,
  filmData: sandbox.filmData
};

/** 保留 site-data.json 中后台录入的扩展疾病（如第二批），避免 build 时被 index 内嵌 50 条覆盖 */
if (fs.existsSync(outPath)) {
  try {
    const prev = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    const byType = new Map((siteData.diseases || []).map(d => [d.type, d]));
    for (const d of prev.diseases || []) {
      if (!d?.type) continue;
      byType.set(d.type, { ...byType.get(d.type), ...d });
    }
    siteData.diseases = [...byType.values()];
    siteData.taxByType = { ...(siteData.taxByType || {}), ...(prev.taxByType || {}) };
    siteData.diseaseGalleries = { ...(siteData.diseaseGalleries || {}), ...(prev.diseaseGalleries || {}) };
    siteData.diseaseDetails = { ...mergeDiseaseDetails(siteData.diseaseDetails, prev.diseaseDetails || {}) };
    if (prev.imageAttribRegistry) {
      siteData.imageAttribRegistry = { ...siteData.imageAttribRegistry, ...prev.imageAttribRegistry };
    }
  } catch {
    /* keep html export only */
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('已导出 site-data.json');
console.log(`  疾病: ${siteData.diseases.length} 条`);
console.log(`  图库类型: ${Object.keys(siteData.diseaseGalleries).length} 组`);
console.log(`  疾病详情: ${Object.keys(siteData.diseaseDetails).length} 条`);
console.log(`  影像授权: ${Object.keys(siteData.imageAttribRegistry).length} 条`);
console.log(`  胶片库: ${Object.keys(siteData.filmData).length} 个模态`);

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
  ['filmData', 'function renderFilmMedia']
];

for (const [name, next] of blocks) {
  const expr = sliceConst(html, name, next);
  evalConst(`${name}=${expr}`, sandbox);
}

const siteData = {
  version: 1,
  updatedAt: new Date().toISOString(),
  diseaseGalleries: sandbox.diseaseGalleries,
  galleryAnnTpl: sandbox.galleryAnnTpl,
  diseases: sandbox.diseases,
  TAXONOMY: sandbox.TAXONOMY,
  NAV_GROUPS: sandbox.NAV_GROUPS,
  taxByType: sandbox.taxByType,
  filmData: sandbox.filmData
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(siteData, null, 2), 'utf8');

console.log('已导出 site-data.json');
console.log(`  疾病: ${siteData.diseases.length} 条`);
console.log(`  图库类型: ${Object.keys(siteData.diseaseGalleries).length} 组`);
console.log(`  胶片库: ${Object.keys(siteData.filmData).length} 个模态`);

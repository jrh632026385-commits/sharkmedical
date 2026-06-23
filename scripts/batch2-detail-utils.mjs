/** 第二批疾病详情规范化：影像要点、模态描述、占位符过滤
 * 列表字段（clinical/mgmt/ddx/pitfalls/pearls）保留源数据全部条目，不截断、不补齐固定条数。
 */
import { polishChinese, polishDetail } from './chinese-polish.mjs';
const GENERIC_RE =
  /重要影像识别要点|典型影像线索|为重要影像识别要点|需结合临床与多模态综合判断|可显示.*的特征性改变,建议结合临床与对侧对比/;

export function isGenericText(s) {
  const t = String(s || '').trim();
  if (!t) return true;
  return GENERIC_RE.test(t);
}

export function toChineseDesc(text) {
  return polishChinese(text);
}

export function pickLabels(disease, raw, max = 3) {
  const rawPairs = (raw.imagingKeys || []).filter(([l]) => String(l || '').trim());
  if (rawPairs.length >= max) {
    return rawPairs.slice(0, max).map(r => String(r[0]).trim());
  }
  const signs = (disease.signs || []).map(s => String(s).trim()).filter(Boolean);
  const labels = [];
  for (const s of signs) {
    if (!labels.includes(s)) labels.push(s);
    if (labels.length >= max) break;
  }
  for (const [l] of rawPairs) {
    const label = String(l).trim();
    if (label && !labels.includes(label)) labels.push(label);
    if (labels.length >= max) break;
  }
  while (labels.length < max) labels.push(`影像要点${labels.length + 1}`);
  return labels.slice(0, max);
}

export function buildImagingKeys(disease, raw) {
  const rawPairs = (raw.imagingKeys || []).filter(([l]) => String(l || '').trim());
  const modalityTexts = (raw.modalities || [])
    .map(([m, d]) => {
      const desc = toChineseDesc(d);
      return desc ? `${m}：${desc}` : '';
    })
    .filter(Boolean);

  // 源内容已有 ≥3 条影像要点时，优先保留其标签与描述
  if (rawPairs.length >= 3) {
    return rawPairs.slice(0, 3).map(([label, desc], i) => {
      let d = String(desc || '').trim();
      if (isGenericText(d) || d.length < 12) {
        d = modalityTexts[i] || modalityTexts[0] || '';
      }
      if (isGenericText(d) || d.length < 12) {
        const ov = String(raw.overview || disease.desc || '');
        const parts = ov.split(/[。；;]/).filter(p => p.length > 8);
        d = parts[i % parts.length] || parts[0] || ov.slice(0, 100);
      }
      return [String(label).trim(), d.trim()];
    });
  }

  const labels = pickLabels(disease, raw, 3);
  const rawMap = new Map(
    rawPairs
      .filter(([l, d]) => l && !isGenericText(d))
      .map(([l, d]) => [String(l).trim(), String(d).trim()])
  );

  return labels.map((label, i) => {
    if (rawMap.has(label) && !isGenericText(rawMap.get(label))) {
      return [label, rawMap.get(label)];
    }
    let desc = modalityTexts[i] || modalityTexts[0] || '';
    if (isGenericText(desc) || desc.length < 12) {
      const ov = String(raw.overview || disease.desc || '');
      if (ov.length > 20) {
        const parts = ov.split(/[。；;]/).filter(p => p.length > 8);
        desc = parts[i % parts.length] || parts[0] || ov.slice(0, 120);
      }
    }
    if (isGenericText(desc) || desc.length < 8) {
      desc = `${label}是${disease.title}影像评估的重要线索，应结合${disease.mod || '多模态'}与临床表现综合判读。`;
    }
    return [label, desc.trim()];
  });
}

export function parseMods(modStr) {
  return String(modStr || '')
    .split(/[·\/,，、]/)
    .map(s => s.trim())
    .filter(Boolean);
}

function fuzzyMod(name, target) {
  const a = String(name).toLowerCase();
  const b = String(target).toLowerCase();
  if (a.includes(b) || b.includes(a)) return true;
  if ((a.includes('mri') && b.includes('mri')) || (a.includes('ct') && b.includes('ct'))) return true;
  if ((a.includes('x') || a.includes('线') || a.includes('平片')) && (b.includes('x') || b.includes('线') || b.includes('平片')))
    return true;
  if ((a.includes('us') || a.includes('超声') || a.includes('b超')) && (b.includes('us') || b.includes('超声')))
    return true;
  return false;
}

export function buildModalities(disease, raw) {
  const mods = parseMods(disease.mod);
  const rawMods = raw.modalities || [];
  const out = [];
  for (const m of mods) {
    const hit = rawMods.find(([name]) => fuzzyMod(name, m));
    let desc = hit ? toChineseDesc(hit[1]) : '';
    if (isGenericText(desc) || desc.length < 12) {
      const ov = String(raw.overview || disease.desc || '');
      desc = `${m}用于评估${disease.title}的骨/软组织改变、病变范围及合并损伤，应结合临床与对侧对比。`;
      if (ov.length > 30 && desc.length < 40) desc = `${m}：${ov.slice(0, 100)}…`;
    }
    out.push([m, desc.trim()]);
  }
  if (!out.length && rawMods.length) {
    return rawMods.map(([m, d]) => [m, toChineseDesc(d)]).filter(([, d]) => d);
  }
  return out;
}

export function normalizeDetail(disease, raw) {
  const base = {
    overview: String(raw.overview || disease.desc || '').trim(),
    epi: String(raw.epi || '').trim(),
    pathophys: String(raw.pathophys || '').trim(),
    clinical: Array.isArray(raw.clinical) ? raw.clinical.filter(Boolean) : [],
    staging: String(raw.staging || '').trim(),
    imagingKeys: buildImagingKeys(disease, raw),
    modalities: buildModalities(disease, raw),
    mgmt: Array.isArray(raw.mgmt) ? raw.mgmt.filter(Boolean) : [],
    ddx: Array.isArray(raw.ddx) ? raw.ddx.filter(Boolean) : [],
    pitfalls: Array.isArray(raw.pitfalls) ? raw.pitfalls.filter(Boolean) : [],
    pearls: (raw.pearls || []).filter(p => !String(p).includes('图库待补充'))
  };
  return polishDetail(base);
}

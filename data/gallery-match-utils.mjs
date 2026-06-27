/**
 * 疾病影像图库匹配 · 以「影像图与疾病精准对应」为核心评分（箭头/标注非必需）
 */
/** 0 = 不限制张数，仅由评分门槛控制质量 */
export const MAX_GALLERY_IMAGES = Number(process.env.MAX_GALLERY_IMAGES || 0);
/** 同一 PMC 文章最多保留图数，避免单篇病例报告刷屏 */
export const MAX_IMAGES_PER_PMC = Number(process.env.MAX_IMAGES_PER_PMC || 2);

export const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|histolog|microscop|patholog|pathology slide|biopsy specimen|autopsy|gross specimen|flowchart|graph abstract|staining|immunohist|ihc\b|h&e|he stain|papanicolaou|pap smear|western blot|gel electrophoresis|photo of patient|portrait|clinical photo|clinical photograph|intraoperative photo|surgical field photograph|dermoscop|fundus photo|skin photograph|table \d|figure \d legend only|anatomy chart|logo|icon|synpic|synthetic|phantom|simulat|specimen photograph|macroscopic appearance|light microscop|electron microscop|confocal microscop|cytolog|smear slide|tissue section|paraffin section|frozen section|ki-?67|cd20\b|cd3\b|her2\b/i;

/** 临床照片、病理切片、示意图等非放射影像（caption / 原文 title 常见表述） */
export const NON_RADIOLOGY =
  /clinical photograph|clinical photo|clinical appearance|clinical image|photograph of the|photograph shows|photo of the patient|patient photograph|intraoperative finding|intraoperative view|intraoperative photo|gross specimen|gross appearance|microphotograph|microscopic image|microscopic view|light microscopy|electron microscopy|histopatholog|histologic|histological|pathology specimen|pathology slide|pathological examination|tissue sample|biopsy specimen|dermoscopic|dermoscopy|ophthalmoscopic|fundus photograph|skin photograph|cutaneous photograph|he stain|h&e|ihc stain|immunohist|immunohistochemistry|main theories explaining|illustration of the|illustration of|hands and arm deformities|boutonniere deformity|first visit photograph|wide resection of the tu|evaluation of the extent of the pathological|second surgical intervention|external appearance and imaging|photo of the patient.?s dorsal|finger injuries , \(a\)|post.?mortem|autopsy|surgical specimen|resected specimen|macroscopic|microscopic appearance|cytology smear|pap smear|cell block|specimen photo|operative photograph|operative photo|clinical presentation|clinical feature|physical examination|bedside photo|wound photo|incision photo|laparotomy photo|open surgery photo/i;

export const MODALITY_ZH = /x线|ct|mri|超声|钼靶|dexa|dxa|核素|pet|骨扫描|fluoroscop|影像/i;

export const RAD_FILENAME =
  /\bCR\b|_CR_|_MR_|\bMR\b|MRT|Rö|Roe|DXA|XRay|X-ray|xray|radiograph|sonograph|ultrasound|tomograph|fluoroscop|bone scan|scintigraph|PDW|PD fs|T1|T2|STIR/i;

export const OPENI_BLOCK =
  /synpic|_small|thumbnail|thumb\.|\.gif$/i;

export const IMAGING_WORDS =
  /radiograph|x-ray|xray|roentgen|computed tomography|\bct\b|\bmri\b|mrt|ultrasound|sonograph|magnetic resonance|fluoroscop|dexa|bone scan|arthrograph|mammograph|mammogram/i;

export const PATHOLOGY_WORDS =
  /fracture|fraktur|luxation|disloc|lesion|tumor|tumour|sarcoma|sarkom|lipoma|hemangioma|osteoma|chondro|meniscus|spondyl|disc|ligament|tendon|arthritis|ruptur|myeloma|exostos|osteochondroma|edema|effusion|calcif|erosion|destruc|lytic|sclerotic|displace|sublux|abscess|infarct|necrosis|osteoly|osteobl|narrowing|widening|collapse|disruption|tear|avulsion|fragment|mass|nodule|cyst|hematoma|synovitis|osteophyte|sclerosis|osteopenia|osteoporosis|instability|impingement|herniat|stenosis|myositis|fibrosis|ossific|plaque|deposit|infiltrat/i;

export const MIN_SCORE = {
  openi: Number(process.env.MIN_SCORE_OPENI || 32),
  wikimedia: Number(process.env.MIN_SCORE_WIKI || 22),
  radiopaediaCommons: Number(process.env.MIN_SCORE_RAD || 24)
};

const GENERIC_DISEASE_TOKENS = new Set([
  'ct', 'mri', 'x线', '超声', '影像', 'radiograph', 'fracture', '骨折', '肿瘤', 'tumor', 'tumour',
  'lesion', '病变', 'infection', '炎症', 'arthritis', '关节炎', 'edema', '水肿', 'mass', '肿块',
  'pain', 'painful', 'acute', 'chronic', '慢性', '急性', 'bilateral', 'left', 'right', '左侧', '右侧',
  'patient', 'case', 'figure', 'image', 'scan', 'finding', 'sign', '征象', '表现', 'stage', 'grade',
  'type', 'view', 'ap', 'lateral', 'axial', 'coronal', 'sagittal', 'malignant', 'benign', 'primary',
  'secondary', 'metast', '转移', 'necrosis', '坏死', 'effusion', '积液', 'calcif', '钙化', 'erosion',
  '破坏', 'narrowing', '狭窄', 'thickening', '增厚'
]);

export function isImagingModalityText(text) {
  return IMAGING_WORDS.test(text) || MODALITY_ZH.test(text) || RAD_FILENAME.test(text);
}

export function specificDiseaseTokens(disease) {
  return diseaseTokens(disease).filter(
    t => t.length >= 3 && !GENERIC_DISEASE_TOKENS.has(t) && !/^(the|and|with|for|was|are)$/i.test(t)
  );
}

/** 宁缺毋滥：必须同时满足「影像学模态」+「该疾病名/特征」 */
export function passesStrictDiseaseMatch(textRaw, disease, detail = null) {
  const text = String(textRaw || '').toLowerCase();
  if (!text.trim()) return false;
  if (BLOCK_WORDS.test(text) || NON_RADIOLOGY.test(text)) return false;
  if (!isImagingModalityText(text)) return false;

  const { tokenHits, enHit, titleHit } = diseaseMatchStrength(text, disease);
  const featureHits = countImagingFeatureHits(text, disease, detail);
  const specificHits = countTokenHits(text, specificDiseaseTokens(disease));

  if (titleHit || enHit) return true;
  if (specificHits >= 2) return true;
  if (specificHits >= 1 && featureHits >= 1) return true;
  if (featureHits >= 2 && tokenHits >= 1) return true;
  return false;
}

export function galleryCapacity(existingCount, max = MAX_GALLERY_IMAGES) {
  if (max <= 0) return Infinity;
  return Math.max(0, max - existingCount);
}

export function hasVisiblePathology(text) {
  const t = String(text || '').toLowerCase();
  if (PATHOLOGY_WORDS.test(t)) return true;
  if (
    /demonstrat|showing|reveals|visible|明显|可见|破坏|骨折线|移位|水肿|狭窄|增厚|缺失|effusion|edema|deform|malalign|step-off|displaced|lytic|sclerotic|mass|lesion|fracture|tumor|rupture|tear|calcif|erosion|collapse|narrowing|widening|instability|impingement|herniat|stenosis|infiltrat|necrosis|abscess|hematoma|synovitis|osteophyte|fragment|avulsion|disloc|luxation|sublux|osteoly|osteobl|osteopenia|osteoporosis|myositis|fibrosis|ossific|plaque|deposit|nodule|cyst|hemangioma|lipoma|chondro|meniscus|spondyl|disc|ligament|tendon|arthritis|myeloma|exostos|osteochondroma|sign|finding|征象|表现/.test(
      t
    )
  )
    return true;
  return false;
}

/** 疾病名/别名在文本中的命中强度（影像-疾病匹配核心） */
export function diseaseMatchStrength(text, disease) {
  const t = String(text || '').toLowerCase();
  if (!t.trim()) return { tokenHits: 0, enHit: false, strong: false };
  const tokens = diseaseTokens(disease);
  const tokenHits = countTokenHits(t, tokens);
  const enPhrase = String(disease.en || disease.sub || '')
    .trim()
    .toLowerCase();
  let enHit = enPhrase.length >= 5 && t.includes(enPhrase);
  if (!enHit && enPhrase) {
    const enToks = enPhrase
      .split(/[\s/(),-]+/)
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length >= 4);
    const matched = enToks.filter(tok => t.includes(tok));
    if (enToks.length >= 2) enHit = matched.length >= 2;
    else if (enToks.length === 1) enHit = matched.length === 1;
  }
  const titleHit = disease.title && t.includes(String(disease.title).toLowerCase());
  const strong = tokenHits >= 2 || enHit || titleHit;
  return { tokenHits, enHit, titleHit: !!titleHit, strong };
}

export function diseaseTokens(disease) {
  const raw = [
    disease.type,
    disease.sub,
    disease.region,
    disease.en,
    disease.title,
    ...(disease.signs || [])
  ]
    .filter(Boolean)
    .join(' ');
  return raw
    .split(/[\s/(),·\-、，]+/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length >= 3);
}

export function countTokenHits(text, tokens) {
  let hits = 0;
  for (const tok of tokens) {
    const minLen = /[\u4e00-\u9fff]/.test(tok) ? 2 : 4;
    if (tok.length >= minLen && text.includes(tok)) hits++;
  }
  return hits;
}

/** 中文影像学特征 → 英文检索/匹配词 */
export const FEATURE_EN_MAP = {
  双线征: 'double line sign',
  新月征: 'crescent sign',
  头塌陷: 'femoral head collapse',
  塌陷: 'collapse',
  骨髓水肿: 'bone marrow edema',
  肥皂泡: 'soap bubble',
  偏心性: 'eccentric',
  溶骨: 'lytic',
  成角: 'angulation',
  断端重叠: 'overlapping fragments',
  向上移位: 'superior displacement',
  中段骨折: 'midshaft fracture',
  关节间隙变窄: 'joint space narrowing',
  硬化边: 'sclerotic margin',
  悬挂边缘: 'overhanging margin',
  痛风石: 'tophus',
  穿凿样: 'punched out',
  偏心溶骨: 'eccentric lytic',
  骨端受累: 'metaphyseal',
  双边征: 'double line sign',
  晕征: 'halo sign',
  反晕征: 'reverse halo sign',
  磨玻璃: 'ground glass',
  树芽征: 'tree in bud',
  空气支气管征: 'air bronchogram',
  粟粒: 'miliary'
};

/**
 * 从 signs / imagingKeys / modalities 提取影像学特征词
 * @returns {{ text: string, en: string }[]}
 */
export function extractImagingFeatures(disease, detail = null) {
  const out = [];
  const seen = new Set();
  const add = (s, en = '') => {
    const t = String(s || '').trim();
    if (!t || t.length < 2 || t.length > 40 || seen.has(t)) return;
    if (/^(早期|晚期|进展期|典型|常见|主要|辅助)$/.test(t)) return;
    seen.add(t);
    out.push({ text: t, en: en || FEATURE_EN_MAP[t] || '' });
  };

  for (const s of disease?.signs || []) add(s);

  for (const row of detail?.imagingKeys || []) {
    if (!Array.isArray(row)) continue;
    add(row[0]);
    const body = String(row[1] || '');
    for (const m of body.matchAll(/[''""「」]([^'""「」]+)[''""「」]/g)) add(m[1]);
    for (const seg of body.split(/[，,、；;。.]/)) {
      const t = seg.replace(/^(MRI|CT|X线|T1|T2|超声|平片)\s*/i, '').trim();
      if (t.length >= 2 && t.length <= 24) add(t);
    }
  }

  for (const row of detail?.modalities || []) {
    if (!Array.isArray(row)) continue;
    const body = String(row[1] || '');
    for (const m of body.matchAll(/[''""「」]([^'""「」]+)[''""「」]/g)) add(m[1]);
  }

  return out;
}

/** 候选图文本与影像学特征命中数 */
export function countImagingFeatureHits(text, disease, detail = null) {
  const t = String(text || '').toLowerCase();
  let hits = 0;
  for (const f of extractImagingFeatures(disease, detail)) {
    if (f.text.length >= 2 && t.includes(f.text.toLowerCase())) hits++;
    if (f.en && f.en.length >= 4 && t.includes(f.en.toLowerCase())) hits++;
  }
  return hits;
}

/** 用影像学特征构造补充检索词 */
export function buildImagingFeatureQueries(disease, detail = null) {
  const en = String(disease?.en || disease?.sub || '').trim();
  const title = String(disease?.title || '').trim();
  const queries = [];
  for (const f of extractImagingFeatures(disease, detail).slice(0, 10)) {
    if (en && f.en) queries.push(`${en} ${f.en}`);
    if (en && f.text) queries.push(`${en} ${f.text}`);
    if (title && f.text) queries.push(`${title} ${f.text}`);
    if (f.en) queries.push(`${f.en} ${en}`.trim());
  }
  return [...new Set(queries.filter(q => q && q.length >= 4))];
}

/**
 * 精准匹配：疾病名 + 影像学特征；箭头/标注非必需
 * @param {object|null} detail diseaseDetails[type]
 */
export function scorePathologyMatch(textRaw, disease, extraQueries = [], detail = null) {
  const text = String(textRaw || '').toLowerCase();
  if (!text.trim()) return -100;
  if (BLOCK_WORDS.test(text)) return -100;

  const tokens = diseaseTokens(disease);
  const { tokenHits, enHit, strong, titleHit } = diseaseMatchStrength(text, disease);
  const featureHits = countImagingFeatureHits(text, disease, detail);
  let score = 0;

  const hasImagingMod = isImagingModalityText(text);
  const diseaseLinked = tokenHits >= 1 || enHit || featureHits >= 1;

  if (!diseaseLinked) {
    return -50;
  }

  if (!passesStrictDiseaseMatch(text, disease, detail)) {
    if (specificDiseaseTokens(disease).length === 0 && (enHit || titleHit) && hasImagingMod) {
      /* 无可用特异性 token 时仍允许英文名/中文名命中 */
    } else {
      return -40;
    }
  }

  if (tokenHits >= 1) score += 10 + tokenHits * 8;
  if (enHit) score += 14;
  for (const tok of tokens) {
    if (tok.length >= 8 && text.includes(tok)) score += 8;
  }

  if (featureHits >= 1) score += 12 + featureHits * 14;
  if (featureHits >= 2) score += 16;

  for (const q of extraQueries) {
    for (const w of String(q).toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && text.includes(w)) score += 10;
    }
  }

  if (hasImagingMod) score += 12;
  else score -= 15;

  if (PATHOLOGY_WORDS.test(text)) score += 6;
  if (/arrow|arrowhead|annotat|标注/.test(text)) score += 2;
  if (/displaced|angulation|comminut|step-off|joint space|marrow edema|bone marrow/.test(text)) score += 3;
  if (/comparison normal|normal wrist|normal knee|control image|healthy volunteer/.test(text) && !PATHOLOGY_WORDS.test(text))
    score -= 12;
  if (/case report|case series|typical appearance|classic finding/.test(text)) score += 4;

  if ((strong || featureHits >= 1) && hasImagingMod) score += 10;

  if (score > 0 && tokenHits === 0 && !enHit && featureHits === 0 && !IMAGING_WORDS.test(text)) score -= 18;

  return score;
}

export function itemGalleryText(item) {
  return `${item?.file || ''} ${item?.caption || ''} ${item?.site || ''} ${item?.attrib?.title || ''}`;
}

/**
 * 是否为放射/超声/核医学等影像学图（排除临床照片、示意图、组织学切片等）
 */
export function isRadiologyImage(item) {
  const text = itemGalleryText(item);

  if (BLOCK_WORDS.test(text) || NON_RADIOLOGY.test(text)) return false;
  if (!isImagingModalityText(text)) return false;
  return true;
}

export function inferModality(text) {
  const s = String(text || '').toLowerCase();
  if (/mri|mrt|magnetic resonance/.test(s)) return 'MRI';
  if (/dsa|digital subtraction angiograph|cta\b|ct angiograph/.test(s)) return 'DSA';
  if (/\bct\b|computed tomography/.test(s)) return 'CT';
  if (/ultrasound|sonograph|us\b|b超|超声/.test(s)) return '超声';
  if (/endoscop|内镜|colonoscop|gastroscop|bronchoscop/.test(s)) return '内镜';
  if (/mammograph|钼靶/.test(s)) return '钼靶';
  if (/ecg|electrocardiogram|心电图/.test(s)) return '心电图';
  if (/dexa|dxa|bone densit/.test(s)) return 'DXA';
  if (/pet|scintigraph|nuclear|核素|骨扫描/.test(s)) return '核素';
  if (/radiograph|x-ray|xray|roentgen|fluoroscop|x线|平片|胸片/.test(s)) return 'X线';
  return '影像';
}

function normalizeModalityToken(m) {
  const raw = String(m || '').trim();
  if (!raw || /临床/.test(raw)) return '';
  const u = raw.toUpperCase();
  if (/MRI|磁共振|MRA|MRCP/.test(u)) return 'MRI';
  if (/^CT$|CTA|CTPA|CT\(|CT肺|冠脉CTA|心脏CTA|主动脉CTA/.test(u)) return 'CT';
  if (/DSA/.test(u)) return 'DSA';
  if (/超声|US|B超|多普勒|FAST/.test(u)) return '超声';
  if (/X线|胸片|平片|DR|钼靶/.test(u)) return /钼靶/.test(u) ? '钼靶' : 'X线';
  if (/DEXA|DXA|骨密度/.test(u)) return 'DXA';
  if (/PET|核素|通气灌注|V\/Q|IVU|骨扫描/.test(u)) return '核素';
  if (/内镜|膀胱镜|结肠镜|支气管镜/.test(u)) return '内镜';
  if (/心电图/.test(u)) return '心电图';
  if (/造影|钡/.test(u)) return '造影';
  const inferred = inferModality(raw);
  return inferred === '影像' ? '' : inferred;
}

/** 从 disease.mod 与详情 modalities 解析目标模态 */
export function parseTargetModalities(disease, diseaseDetails = null) {
  const tokens = [];
  const modStr = String(disease?.mod || '');
  tokens.push(...modStr.split(/[·\/,，、]/).map(s => s.trim()).filter(Boolean));
  const detail = diseaseDetails?.[disease?.type];
  if (detail?.modalities?.length) {
    for (const row of detail.modalities) {
      if (Array.isArray(row) && row[0]) tokens.push(String(row[0]).trim());
    }
  }
  const out = [];
  for (const m of tokens) {
    const norm = normalizeModalityToken(m);
    if (norm) out.push(norm);
  }
  const uniq = [...new Set(out)];
  if (uniq.length) return uniq;
  return ['MRI', 'X线', 'CT'];
}

export function inferModalityFromCandidate(row) {
  const parts = [
    row.modalityHint,
    row.file,
    row.fileId,
    row.caption,
    row.articleTitle,
    row.hit?.imageCaption,
    row.hit?.articleTitle,
    row.meta?.title
  ].filter(Boolean);
  return inferModality(parts.join(' '));
}

/** 按目标模态选取：先保证每种目标模态至少 1 张，再轮询均衡；qualityOnly 时不为凑满张数降标 */
export function pickModalityBalanced(ranked, max, targetMods, minScore = 0, globalSeen = null, qualityOnly = false) {
  const cap = max <= 0 ? Infinity : max;
  const mods = targetMods?.length ? targetMods : ['MRI', 'X线', 'CT'];
  const sorted = dedupeByPmcArticle(
    ranked.filter(r => {
      const key = r.file || r.fileId || r.hit?.fileId;
      if (!key || r.score < minScore) return false;
      if (globalSeen?.has(key)) return false;
      return true;
    })
  ).sort((a, b) => b.score - a.score);

  const picks = [];
  const localSeen = new Set();
  const keyOf = r => r.file || r.fileId || r.hit?.fileId;
  const available = r => {
    const key = keyOf(r);
    return key && !localSeen.has(key) && !globalSeen?.has(key);
  };
  const tryAdd = row => {
    const key = keyOf(row);
    if (!key || localSeen.has(key) || globalSeen?.has(key)) return false;
    localSeen.add(key);
    picks.push(row);
    return true;
  };

  // 1. 必须覆盖：每种目标模态至少 1 张（有候选时）
  for (const mod of mods) {
    if (picks.length >= cap) break;
    const hit = sorted.find(r => available(r) && inferModalityFromCandidate(r) === mod);
    if (hit) tryAdd(hit);
  }

  // 2. 模态轮询追加，优先补齐各模态数量
  for (let round = 0; picks.length < cap && round < mods.length * 12; round++) {
    let added = false;
    for (const mod of mods) {
      if (picks.length >= cap) break;
      const hit = sorted.find(r => available(r) && inferModalityFromCandidate(r) === mod);
      if (hit && tryAdd(hit)) added = true;
    }
    if (!added) break;
  }

  // 3. 仍未满额时用剩余高分图填充（qualityOnly 时宁缺毋滥，不凑数）
  if (!qualityOnly) {
    for (const row of sorted) {
      if (picks.length >= cap) break;
      tryAdd(row);
    }
  }
  return picks;
}

/** 检查已选图是否覆盖全部目标模态 */
export function missingTargetModalities(picks, targetMods) {
  const mods = targetMods?.length ? targetMods : ['MRI', 'X线', 'CT'];
  const have = new Set(picks.map(p => inferModalityFromCandidate(p)));
  return mods.filter(m => !have.has(m));
}

/** 截断至 max 张，优先保留各目标模态代表图 */
export function trimGalleryByModality(items, max, targetMods) {
  if (max <= 0 || !items?.length || items.length <= max) return items || [];
  const ranked = items.map((it, i) => ({
    file: it.file,
    caption: it.caption,
    score: items.length - i,
    _item: it
  }));
  const picks = pickModalityBalanced(ranked, max, targetMods, 0, null);
  const out = [];
  const seen = new Set();
  for (const p of picks) {
    const it = p._item || items.find(x => x.file === p.file);
    if (it && !seen.has(it.file)) {
      seen.add(it.file);
      out.push(it);
    }
  }
  return out.length ? out : items.slice(0, max);
}

export function dedupeByPmcArticle(ranked, perArticle = MAX_IMAGES_PER_PMC) {
  const counts = new Map();
  const out = [];
  for (const row of ranked.sort((a, b) => b.score - a.score)) {
    const file = row.file || row.fileId || row.hit?.fileId || '';
    const m = String(file).match(/PMC\d+/i);
    const key = m ? m[0].toUpperCase() : file;
    const n = counts.get(key) || 0;
    if (m && n >= perArticle) continue;
    counts.set(key, n + 1);
    out.push(row);
  }
  return out;
}

export function pickTopRanked(ranked, max = MAX_GALLERY_IMAGES, minScore = 0) {
  const cap = max <= 0 ? Infinity : max;
  const out = [];
  const seen = new Set();
  for (const row of dedupeByPmcArticle(ranked)) {
    if (row.score < minScore) continue;
    const key = row.file || row.fileId || row.hit?.fileId;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(row);
    if (out.length >= cap) break;
  }
  return out;
}

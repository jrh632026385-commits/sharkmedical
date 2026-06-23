/**
 * 疾病影像图库匹配 · 精准度与病理可见性评分（Open-i / Wikimedia / Radiopaedia-Commons 共用）
 */
/** 0 = 不限制张数，仅由评分门槛控制质量 */
export const MAX_GALLERY_IMAGES = Number(process.env.MAX_GALLERY_IMAGES || 0);
/** 同一 PMC 文章最多保留图数，避免单篇病例报告刷屏 */
export const MAX_IMAGES_PER_PMC = Number(process.env.MAX_IMAGES_PER_PMC || 2);

export const BLOCK_WORDS =
  /diagram|schema|schematic|illustration|drawing|histolog|microscop|flowchart|graph abstract|staining|immunohist|western blot|gel electrophoresis|photo of patient|portrait|table \d|figure \d legend only|anatomy chart|logo|icon|synpic|synthetic|phantom|simulat/i;

/** 临床照片、示意图、组织学等非放射影像（caption / 原文 title 常见表述） */
export const NON_RADIOLOGY =
  /clinical photograph|clinical photo|clinical appearance|photograph of the|photograph shows|photo of the patient|patient photograph|intraoperative finding|gross specimen|microphotograph|h&e|he stain|immunohist|main theories explaining|illustration of the|illustration of|hands and arm deformities|boutonniere deformity|first visit photograph|wide resection of the tu|evaluation of the extent of the pathological|second surgical intervention|external appearance and imaging|photo of the patient.?s dorsal|finger injuries , \(a\)/i;

export const MODALITY_ZH = /x线|ct|mri|超声|dexa|dxa|核素|pet|骨扫描|fluoroscop|影像/i;

export const RAD_FILENAME =
  /\bCR\b|_CR_|_MR_|\bMR\b|MRT|Rö|Roe|DXA|XRay|X-ray|xray|radiograph|sonograph|ultrasound|tomograph|fluoroscop|bone scan|scintigraph|PDW|PD fs|T1|T2|STIR/i;

export const OPENI_BLOCK =
  /synpic|_small|thumbnail|thumb\.|\.gif$/i;

export const IMAGING_WORDS =
  /radiograph|x-ray|xray|roentgen|computed tomography|\bct\b|\bmri\b|mrt|ultrasound|sonograph|magnetic resonance|fluoroscop|dexa|bone scan|arthrograph/i;

export const PATHOLOGY_WORDS =
  /fracture|fraktur|luxation|disloc|lesion|tumor|tumour|sarcoma|sarkom|lipoma|hemangioma|osteoma|chondro|meniscus|spondyl|disc|ligament|tendon|arthritis|ruptur|myeloma|exostos|osteochondroma|edema|effusion|calcif|erosion|destruc|lytic|sclerotic|displace|sublux|abscess|infarct|necrosis|osteoly|osteobl|narrowing|widening|collapse|disruption|tear|avulsion|fragment|mass|nodule|cyst|hematoma|synovitis|osteophyte|sclerosis|osteopenia|osteoporosis|instability|impingement|herniat|stenosis|myositis|fibrosis|ossific|plaque|deposit|infiltrat/i;

export const MIN_SCORE = {
  openi: Number(process.env.MIN_SCORE_OPENI || 26),
  wikimedia: Number(process.env.MIN_SCORE_WIKI || 16),
  radiopaediaCommons: Number(process.env.MIN_SCORE_RAD || 20)
};

export function galleryCapacity(existingCount, max = MAX_GALLERY_IMAGES) {
  if (max <= 0) return Infinity;
  return Math.max(0, max - existingCount);
}

export function hasVisiblePathology(text) {
  const t = String(text || '').toLowerCase();
  if (PATHOLOGY_WORDS.test(t)) return true;
  if (
    /arrow|annotat|demonstrat|showing|reveals|visible|明显|可见|破坏|骨折线|移位|水肿|狭窄|增厚|缺失|effusion|edema|deform|malalign|step-off|displaced|lytic|sclerotic|mass|lesion|fracture|tumor|rupture|tear|calcif|erosion|collapse|narrowing|widening|instability|impingement|herniat|stenosis|infiltrat|necrosis|abscess|hematoma|synovitis|osteophyte|fragment|avulsion|disloc|luxation|sublux|osteoly|osteobl|osteopenia|osteoporosis|myositis|fibrosis|ossific|plaque|deposit|nodule|cyst|hemangioma|lipoma|chondro|meniscus|spondyl|disc|ligament|tendon|arthritis|myeloma|exostos|osteochondroma/.test(
      t
    )
  )
    return true;
  return false;
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
    if (tok.length >= 4 && text.includes(tok)) hits++;
  }
  return hits;
}

/**
 * 精准匹配 + 病理/影像征象可见性
 * @returns {number} score, -100 = reject
 */
export function scorePathologyMatch(textRaw, disease, extraQueries = []) {
  const text = String(textRaw || '').toLowerCase();
  if (!text.trim()) return -100;
  if (BLOCK_WORDS.test(text)) return -100;

  const tokens = diseaseTokens(disease);
  let score = 0;
  const tokenHits = countTokenHits(text, tokens);
  if (tokenHits === 0) {
    if (IMAGING_WORDS.test(text) && (RAD_FILENAME.test(text) || PATHOLOGY_WORDS.test(text))) return 12;
    return -50;
  }
  if (tokenHits === 1) score += 8;
  else score += 8 + tokenHits * 6;

  for (const tok of tokens) {
    if (tok.length >= 8 && text.includes(tok)) score += 6;
  }

  for (const q of extraQueries) {
    for (const w of String(q).toLowerCase().split(/\s+/)) {
      if (w.length >= 5 && text.includes(w)) score += 10;
    }
  }

  if (IMAGING_WORDS.test(text)) score += 10;
  else score -= 18;

  if (PATHOLOGY_WORDS.test(text)) score += 8;

  if (/arrow|arrowhead|annotat|标注|white arrow|black arrow|red arrow/.test(text)) score += 5;
  if (/displaced|angulation|comminut|step-off|joint space|marrow edema|bone marrow/.test(text)) score += 4;
  if (/comparison normal|normal wrist|normal knee|control image|healthy volunteer/.test(text) && !PATHOLOGY_WORDS.test(text))
    score -= 12;
  if (/case report|case series|typical appearance|classic finding/.test(text)) score += 3;

  if (score > 0 && !hasVisiblePathology(text)) score -= 22;
  if (score > 0 && tokenHits === 1 && !PATHOLOGY_WORDS.test(text)) score -= 12;

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
  const file = String(item?.file || '');

  if (BLOCK_WORDS.test(text) || NON_RADIOLOGY.test(text)) return false;
  if (/Diagram|Wellcome|schematic|diagram|synpic|flowchart|anatomy chart/i.test(file)) {
    if (!RAD_FILENAME.test(text) && !/fracture|fraktur|legend/i.test(file)) return false;
  }
  if (
    (/annotated|annotation|legend/i.test(file) || /【标注】/.test(text)) &&
    !NON_RADIOLOGY.test(text) &&
    !BLOCK_WORDS.test(text)
  ) {
    return true;
  }

  const hasModality = IMAGING_WORDS.test(text) || MODALITY_ZH.test(text);
  if (hasModality || RAD_FILENAME.test(text)) return true;

  if (file.startsWith('openi__')) return false;

  if (
    /fraktur|fracture|luxation|osteo|arthritis|arthrosis|hemangioma|meniscus|spondyl|myeloma|sarcoma|tumor|tumour|dissecans|syringomy|chondro|calcin|calcif|erosion|arthrop|verteb|pelvis|femur|tibia|patella|clavic|scaphoid|humer|radius|ulna|fibula|ankle|knee|hip|shoulder|wrist|hand|foot|spine|disc|ligament|tendon|menisc/i.test(
      file
    )
  ) {
    return true;
  }

  return false;
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
    row.file,
    row.fileId,
    row.hit?.imageCaption,
    row.hit?.articleTitle,
    row.meta?.title
  ].filter(Boolean);
  return inferModality(parts.join(' '));
}

/** 按目标模态均衡选取，优先高分且覆盖各模态 */
export function pickModalityBalanced(ranked, max, targetMods, minScore = 0, globalSeen = null) {
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
  const tryAdd = row => {
    const key = keyOf(row);
    if (!key || localSeen.has(key) || globalSeen?.has(key)) return false;
    localSeen.add(key);
    picks.push(row);
    return true;
  };

  for (const mod of mods) {
    if (picks.length >= cap) break;
    const hit = sorted.find(r => !localSeen.has(keyOf(r)) && inferModalityFromCandidate(r) === mod);
    if (hit) tryAdd(hit);
  }
  // 按目标模态轮询填充，尽量在 max 张内均衡覆盖各模态
  for (let round = 0; picks.length < cap && round < mods.length * 8; round++) {
    let added = false;
    for (const mod of mods) {
      if (picks.length >= cap) break;
      const hit = sorted.find(r => !localSeen.has(keyOf(r)) && inferModalityFromCandidate(r) === mod);
      if (hit && tryAdd(hit)) added = true;
    }
    if (!added) break;
  }
  for (const row of sorted) {
    if (picks.length >= cap) break;
    tryAdd(row);
  }
  return picks;
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

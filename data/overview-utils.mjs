/**
 * 疾病介绍（overview）与 PDF 摘抄清理工具
 */
export function stripChapterTag(text) {
  return String(text || '')
    .replace(/^【[^】]+】\s*/, '')
    .trim();
}

export function cleanPdfSnippet(s) {
  let t = stripChapterTag(s);
  t = t
    .replace(/《骨肌系统影像诊断》[^。；\n]*/g, '')
    .replace(/《骨科学》[^。；\n]*/g, '')
    .replace(/《骨与关节影像诊断学》[^。；\n]*/g, '')
    .replace(/《骨伤科影像学》[^。；\n]*/g, '')
    .replace(/《骨关节损伤影像诊断一点通》[^。；\n]*/g, '')
    .replace(/\d+\s*骨肌系统影像诊断\s*/g, '')
    .replace(/第[一二三四五六七八九十\d]+章[^。；]{0,40}/g, '')
    .replace(/【(?:临床概述|影像表现|鉴别诊断|典型病例|影像检查策略|标注)】\s*/g, '')
    .replace(/【影像表现】\s*\d*\.?\s*/g, '')
    .replace(/\d+\.\s*(?:X\s*线|CT|MRI|超声)(?:及\s*CT|\s*及\s*MRI)?(?:表现)?\s*/g, '')
    .replace(/-- \d+ 308 --/g, '')
    .replace(/\(\s*--\s*\d+[^)]*\)/g, '')
    .replace(/[A-Z]\s*～\s*[A-Z]\.\s*/g, '')
    .replace(/P\d+\s*[:：]?\s*/gi, '')
    .replace(/^\d+\s+/, '')
    .replace(/^[（(][\d一二三四五六七八九十]+[）)]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return t;
}

export function cleanOverviewText(s) {
  return cleanPdfSnippet(s);
}

export function isPdfJunk(t) {
  const s = String(t || '').trim();
  if (!s || s.length < 8) return true;
  if (/^[\d\s]+$/.test(s)) return true;
  if (/【(?:影像|临床|典型|鉴别)/.test(s)) return true;
  if (/骨肌系统影像诊断/.test(s)) return true;
  if (/-- \d+ 308 --/.test(s)) return true;
  if (/^[A-Z]\s*～\s*[A-Z]\./.test(s)) return true;
  if (/～\s*[A-Z]\./.test(s) && /MRI|WI|T1WI|T2WI/.test(s)) return true;
  if (/病例一|病例二/.test(s) && /患者/.test(s)) return true;
  if (/^[\d]+\s+第/.test(s)) return true;
  if (/(T1（T1|T2（T2|加权）加权)/.test(s)) return true;
  if (/（[A-Z]{2,6}（[A-Z]{2,6}（/.test(s)) return true;
  if (/^估病灶/.test(s)) return true;
  if (/^亦有研究认为，MRI/.test(s)) return true;
  if (/^\.?\s*脊柱\s*X\s*线/.test(s)) return true;
  if (/^\.?\s*病例一|^\.?\s*病例二/.test(s)) return true;
  if (/（箭）|（弯箭）|（箭头）/.test(s)) return true;
  if (/苏格兰犬|犬戴项圈|^侧骨折/.test(s)) return true;
  if (/^X\s*线平片是诊断.*的首选方法/.test(s) && /肩关节|肱骨近端/.test(s)) return true;
  if (/踝关节骨折主要有\s*3\s*种分型/.test(s)) return true;
  if (/大体上呈|凝胶状、质软/.test(s)) return true;
  return false;
}

export function isFigureCaption(t) {
  const s = String(t || '');
  return /（箭）|（弯箭）|（箭头）|苏格兰犬|犬戴项圈|^侧骨折/.test(s);
}

export function isGenericImagingFallback(t) {
  return /^结合 X 线\/CT\/MRI 评估主要形态学改变。?$/.test(String(t || '').trim());
}

export function isGoodImagingDesc(t) {
  const s = String(t || '').trim();
  if (!s || s.length < 10) return false;
  if (isPdfJunk(s) || isFigureCaption(s)) return false;
  if (isGenericImagingFallback(s)) return false;
  return true;
}

export function isGoodBaikeOverview(t) {
  if (!t || t.length < 18 || t.length > 220) return false;
  if (isPdfJunk(t)) return false;
  if (/^[\d（(ⅠⅡⅢ]/.test(t)) return false;
  if (/【|骨肌系统影像诊断|第.{0,6}章|P\d+/i.test(t)) return false;
  if (/^MRI |^X\s*线 |^CT /.test(t)) return false;
  return /是|指|为|常见于|好发|所致|引起|表现为|病变|综合征|骨折|肿瘤|炎|损伤|脱位|坏死/.test(
    t
  );
}

export function firstGoodSentence(text) {
  const parts = cleanPdfSnippet(text)
    .split(/(?<=[。；;])\s*/)
    .map(s => s.trim())
    .filter(s => s.length >= 12 && !isPdfJunk(s));
  return parts[0] || '';
}

export function cleanImagingDesc(s) {
  let t = cleanPdfSnippet(s);
  t = t.replace(/^\.+\s*/, '').replace(/^（\d+）\s*/g, '').replace(/^[（(]\d+[）)]\s*/g, '');
  const sentence = firstGoodSentence(t);
  if (sentence) t = sentence;
  if (!isGoodImagingDesc(t)) return '';
  return t.slice(0, 180).trim();
}

export function cleanPearls(pearls) {
  return (pearls || [])
    .map(p => cleanPdfSnippet(String(p).trim()))
    .filter(p => p && p.length >= 6)
    .filter(p => !/《骨肌系统影像诊断》P\d+/.test(p))
    .filter(p => !/^第[一二三四五六七八九十\d]+章/.test(p))
    .filter(p => !/骨肌系统影像诊断/.test(p))
    .filter(p => !/【影像表现】/.test(p))
    .filter(p => !/-- \d+ 308 --/.test(p))
    .filter(p => !/病例一|病例二/.test(p))
    .filter(p => !isPdfJunk(p));
}

const IMAGING_FALLBACK = {
  直接征象: '结合 X 线/CT/MRI 评估主要形态学改变。',
  间接征象: '注意间接征象及对侧对比。',
  关键组合: '多模态综合判断，避免单模态过度解读。'
};

export function cleanImagingKeys(keys, fallbackKeys) {
  const labels = ['直接征象', '间接征象', '关键组合'];
  const primByLabel = Object.fromEntries((keys || []).map(r => [r[0], r[1]]));
  const fallByLabel = Object.fromEntries((fallbackKeys || []).map(r => [r[0], r[1]]));
  const primPos = (keys || []).map(r => r[1]);
  const fallPos = (fallbackKeys || []).map(r => r[1]);

  return labels.map((label, idx) => {
    const candidates = [
      fallByLabel[label],
      fallPos[idx],
      primByLabel[label],
      primPos[idx]
    ];
    for (const c of candidates) {
      const desc = cleanImagingDesc(c || '');
      if (isGoodImagingDesc(desc)) return [label, desc];
    }
    for (const c of candidates) {
      const desc = cleanImagingDesc(c || '');
      if (desc && !isPdfJunk(desc) && !isFigureCaption(desc)) return [label, desc];
    }
    return [label, IMAGING_FALLBACK[label]];
  });
}

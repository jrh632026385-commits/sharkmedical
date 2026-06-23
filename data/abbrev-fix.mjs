/**
 * 缩写嵌套折叠与误标注修复（供 fix-abbrev / polish / clean-pdf 共用）
 */

export const LITERAL_FIXES = [
  ['AC（肩锁关节）L（前交叉韧带）', 'ACL'],
  ['AC（肩锁关节）L', 'ACL'],
  ['PD（质子密度加权）-FS（脂肪抑制）（质子密度脂肪抑制）', 'PD-FS'],
  ['PD（质子密度加权）-FS（质子密度脂肪抑制）', 'PD-FS'],
  ['T2（T2（T2加权）加权）', 'T2加权'],
  ['T2（T2加权）', 'T2加权'],
  ['T2（T2加权加权）', 'T2加权'],
  ['T1（T1（T1加权）加权）', 'T1加权'],
  ['T1（T1加权）', 'T1加权'],
  ['T1（T1加权加权）', 'T1加权'],
  ['NSAID（非甾体抗炎药）s', 'NSAIDs'],
  ['MRI（磁共振成像）', 'MRI'],
  ['CT（计算机断层扫描）', 'CT'],
  ['MR（磁共振）I（磁共振成像）', 'MRI'],
  ['MR（磁共振）（磁共振血管成像）', 'MRA'],
  ['MR（磁共振）SA（耐甲氧西林金黄色葡萄球菌）', 'MRSA'],
  ['MR（磁共振）C（医学研究委员会分级）', 'MRC'],
  ['MR（磁共振） 关节造影', 'MRI 关节造影'],
  ['MR（磁共振）', 'MRI'],
  ['APL（急性早幼粒细胞白血病）', 'APL（拇长展肌）'],
  ['TFCC（三角纤维软骨复合体））', 'TFCC）'],
  ['TGCT（腱鞘巨细胞瘤），局限型', 'TGCT，局限型'],
  ['TGCT（腱鞘巨细胞瘤） 谱系', 'TGCT 谱系'],
  ['T2（T2加权）加权', 'T2加权'],
  ['T2加权加权*', 'T2*'],
  ['T2加权加权', 'T2加权'],
  ['T1（T1加权）加权', 'T1加权'],
  ['T1加权加权', 'T1加权'],
  ['T2（T2加权）加权/T2（T2加权）加权*', 'T2/T2*'],
  ['T2加权/T2加权*', 'T2/T2*'],
  ['WDLPS/ALT（丙氨酸转氨酶）', 'WDLPS/ALT'],
  ['ALT（丙氨酸转氨酶）', 'ALT（非典型脂肪瘤）'],
  ['TGCT（腱鞘巨细胞瘤））', 'TGCT）'],
  ['肿瘤（TGCT（腱鞘巨细胞瘤））', '肿瘤（TGCT）'],
  ['弥漫型 TGCT（腱鞘巨细胞瘤）', '弥漫型 TGCT'],
  ['局限型 TGCT（腱鞘巨细胞瘤）', '局限型 TGCT'],
  ['HME（多发性骨软骨瘤））', 'HME）'],
  ['PVNS（色素沉着绒毛结节性滑膜炎））', 'PVNS）'],
  ['Pivot 移位', 'Pivot shift 试验']
];

/** 折叠嵌套缩写标注，最多 40 轮防死循环 */
export function collapseNestedGloss(text) {
  let s = String(text);
  for (let i = 0; i < 40; i++) {
    const prev = s;
    s = s.replace(/T2\/T2（T2加权）\/T2（T2加权）/g, 'T2/T2*');
    s = s.replace(/T2（T2（T2加权）加权）/g, 'T2加权');
    s = s.replace(/T2（T2加权加权）/g, 'T2加权');
    s = s.replace(/T2（T2加权）/g, 'T2加权');
    s = s.replace(/T1（T1（T1加权）加权）/g, 'T1加权');
    s = s.replace(/T1（T1加权加权）/g, 'T1加权');
    s = s.replace(/T1（T1加权）/g, 'T1加权');
    // ASIA（ASIA（… / EXT1（EXT1（… / USP6（USP6（…
    s = s.replace(/([A-Z][A-Z0-9-]{1,14})（\1（/g, '$1（');
    s = s.replace(/([A-Z][A-Z0-9-]{1,14})（\1([^（）]{1,80})）/g, '$1（$2）');
    s = s.replace(/([A-Z][A-Z0-9-]{1,14})（\1(?:基因突变|基因)?）/g, '$1');
    s = s.replace(/([A-Z][A-Z0-9-]{1,14})（\1（([^（）]{1,80})））/g, '$1（$2）');
    s = s.replace(/([A-Z][A-Z0-9-]{1,14})（\1（([^（）]{1,48})）(?:\2）)+/g, '$1（$2）');
    s = s.replace(/（([^（）]{1,80})）(?:\1）)+/g, '（$1）');
    s = s.replace(/（([^（）]{1,48})）（\1）/g, '（$1）');
    if (s === prev) break;
  }
  return s;
}

export function fixText(text) {
  if (text == null) return '';
  let s = String(text);
  for (const [bad, good] of LITERAL_FIXES) {
    s = s.split(bad).join(good);
  }
  return collapseNestedGloss(s);
}

export function fixDetail(det) {
  const out = {};
  for (const [k, v] of Object.entries(det)) {
    if (typeof v === 'string') {
      out[k] = fixText(v);
    } else if (Array.isArray(v)) {
      out[k] = v.map(item =>
        Array.isArray(item) ? item.map(cell => fixText(cell)) : fixText(item)
      );
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * 生成 data/circulatory-catalog.mjs
 * node scripts/generate-circulatory-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'data', 'circulatory-catalog.mjs');

const CIRCULATORY_NAV_GROUPS = {
  'coronary-ischemic': { label: '冠状动脉与缺血性心脏病', icon: '', desc: '粥样硬化、心绞痛、心肌梗死与心肌缺血' },
  cardiomyopathy: { label: '心肌疾病(心肌病)', icon: '', desc: '扩张型、肥厚型、限制型心肌病及心肌炎' },
  valve: { label: '心脏瓣膜病', icon: '', desc: '二尖瓣、主动脉瓣等狭窄/关闭不全与心内膜炎' },
  pericardium: { label: '心包疾病', icon: '', desc: '心包炎、积液、压塞与心包肿瘤' },
  'cardiac-tumor': { label: '心脏肿瘤', icon: '', desc: '黏液瘤、纤维瘤、肉瘤与心腔血栓' },
  congenital: { label: '先天性心脏病', icon: '', desc: '分流、发绀型与复杂梗阻畸形' },
  aortic: { label: '主动脉疾病', icon: '', desc: '动脉瘤、夹层、壁内血肿与主动脉炎' },
  'pulmonary-vascular': { label: '肺循环血管疾病', icon: '', desc: '肺栓塞、CTEPH 与肺动脉高压' },
  'peripheral-arterial': { label: '外周动脉疾病', icon: '', desc: '下肢闭塞、颈动脉狭窄与动脉栓塞' },
  venous: { label: '静脉系统疾病', icon: '', desc: '深静脉血栓、腔静脉综合征与门静脉血栓' },
  'heart-failure': { label: '心力衰竭与功能性改变', icon: '', desc: '充血性心衰、肺水肿与室壁瘤' }
};

const CIRCULATORY_NAV_ORDER = [
  'coronary-ischemic', 'cardiomyopathy', 'valve', 'pericardium', 'cardiac-tumor',
  'congenital', 'aortic', 'pulmonary-vascular', 'peripheral-arterial', 'venous', 'heart-failure'
];

/** navKey, [[type, title, region, subcat, sev, sevtext, desc, ...signs]] */
const CATALOG = [
  ['coronary-ischemic', '冠脉CTA · 心脏MRI · SPECT · DSA · 心电图', 'coronary', [
    ['circ-coronary-atherosclerosis', '冠状动脉粥样硬化', '冠状动脉', 'atherosclerosis', 'mid', '慢性·粥样', '冠状动脉管壁粥样斑块致管腔狭窄，冠脉 CTA 见非钙化/钙化/混合斑块与节段性狭窄；心电图可示缺血或正常。', '管壁斑块', '节段性狭窄', '钙化积分增高'],
    ['circ-stable-angina', '稳定型心绞痛', '冠状动脉/心肌', 'angina', 'mid', '慢性·缺血', '固定程度冠脉狭窄致劳力性心肌缺血，运动负荷 SPECT/MRI 见可逆灌注缺损；静息心电图可正常或陈旧改变。', '可逆灌注缺损', '冠脉狭窄', '运动试验阳性'],
    ['circ-acute-mi', '急性心肌梗死', '心肌', 'infarction', 'high', '急性·梗死', '急性冠脉闭塞致心肌坏死，心脏 MRI 延迟强化呈透壁/心内膜下分布；心电图 ST 抬高或新发 LBBB。', '延迟强化', 'ST 段抬高', '室壁运动异常'],
    ['circ-old-mi', '陈旧性心肌梗死', '心肌', 'scar', 'mid', '陈旧·瘢痕', '既往梗死后心肌纤维化，MRI 延迟强化呈固定透壁/心内膜下瘢痕；心电图见病理性 Q 波。', '固定延迟强化', 'Q 波', '室壁变薄'],
    ['circ-coronary-calcium', '冠状动脉钙化', '冠状动脉', 'calcification', 'low', '慢性·钙化', '冠脉钙化积分反映粥样负荷，CT/冠脉 CTA 见高密度钙化；与心血管风险分层相关。', '钙化积分', '高密度斑', 'Agatston 评分'],
    ['circ-coronary-stenosis', '冠状动脉狭窄', '冠状动脉', 'stenosis', 'mid', '狭窄·缺血', '冠脉管腔显著狭窄，CTA/DSA 测量直径狭窄率与长度；FFR/IVUS 辅助功能学评估。', '管腔狭窄', 'DSA 确认', '血流储备下降'],
    ['circ-myocardial-ischemia', '心肌缺血', '心肌', 'ischemia', 'mid', '缺血·可逆', '心肌供氧失衡，负荷 SPECT/PET 或 MRI 灌注见可逆性缺损；心电图负荷试验可诱发 ST 改变。', '可逆灌注缺损', 'ST 压低', '室壁运动减低'],
    ['circ-coronary-aneurysm', '冠状动脉瘤', '冠状动脉', 'aneurysm', 'mid', '瘤样·扩张', '冠脉局部瘤样扩张，CTA/DSA 见囊状或梭形扩张；需排除川崎病、动脉粥样硬化。', '瘤样扩张', '管壁不规则', '血栓形成风险'],
    ['circ-anomalous-origin', '冠状动脉起源异常', '冠状动脉', 'anomaly', 'mid', '先天·走行', '冠脉开口或走行异常，CTA 清晰显示异常起源与壁内/心间走行；与猝死风险相关。', '异常开口', '壁内走行', 'CTA 三维重建'],
    ['circ-myocardial-bridge', '心肌桥', '冠状动脉', 'bridge', 'low', '先天·压迫', '冠脉节段走行于心肌内，CTA/CT 见收缩期管腔受压；可致局部缺血或正常。', '壁内走行', '收缩期受压', '局部狭窄'],
    ['circ-ischemic-cmp', '缺血性心肌病', '心肌/心室', 'ischemic-cmp', 'high', '慢性·重构', '反复缺血致心室扩大与收缩功能下降，MRI 见多节段延迟强化与整体 LVEF 降低；冠脉多支病变。', '多节段瘢痕', 'LVEF 降低', '心室扩大']
  ]],
  ['cardiomyopathy', '心脏MRI · 超声心动图 · 心电图', 'myocardium', [
    ['circ-dcm', '扩张型心肌病', '心肌/心室', 'dcm', 'high', '扩张·收缩↓', '心室扩大伴收缩功能减低，MRI 见非缺血性延迟强化模式；超声 LVEF 明显下降。', '心室扩大', 'LVEF 降低', '非缺血性强化'],
    ['circ-hcm', '肥厚型心肌病', '心肌/室间隔', 'hcm', 'high', '肥厚·梗阻', '不对称室间隔肥厚，MRI 见心肌纤维化与 SAM 征；心电图左室肥厚与深 Q 波。', '室间隔肥厚', 'SAM 征', '深 Q 波'],
    ['circ-rcm', '限制型心肌病', '心肌/心室', 'rcm', 'high', '限制·舒张↓', '心室舒张受限、心房扩大，MRI 见心肌增厚或浸润信号；与缩窄性心包炎鉴别。', '舒张功能受限', '心房扩大', '心包正常'],
    ['circ-arvc', '致心律失常性右室心肌病(ARVC)', '右心室', 'arvc', 'high', 'ARVC·猝死', '右室心肌被纤维脂肪替代，MRI 见右室扩大、脂肪浸润与延迟强化；心电图 epsilon 波。', '右室扩大', '脂肪浸润', 'epsilon 波'],
    ['circ-ncm', '心肌致密化不全', '左心室', 'ncm', 'mid', '致密化·海绵', '左室小梁增多、非致密化/致密化比值增高，MRI/超声见典型双层层结构；可合并心衰或血栓。', '小梁增多', 'NC/C 比值↑', '双层层结构'],
    ['circ-takotsubo', '应激性心肌病(Takotsubo)', '心尖/心室', 'takotsubo', 'high', '急性·心尖球', '应激后心尖球样运动异常，冠脉通常无显著狭窄；MRI 见水肿无典型冠脉分布瘢痕。', '心尖球样改变', '冠脉无阻塞', '一过性 LVEF↓'],
    ['circ-myocarditis', '心肌炎', '心肌', 'myocarditis', 'high', '急性·炎症', '心肌炎症致水肿与功能下降，MRI T2/STIR 高信号与延迟强化；心电图 ST-T 改变。', '心肌水肿', '延迟强化', 'ST-T 改变'],
    ['circ-amyloid', '心肌淀粉样变', '心肌', 'amyloid', 'high', '浸润·淀粉样', '淀粉样蛋白沉积致限制性 physiology，MRI 弥漫延迟强化与 T1 mapping 异常；心电图低电压。', '弥漫强化', 'T1 延长', '低电压'],
    ['circ-cardiac-sarcoid', '心脏结节病', '心肌', 'sarcoid', 'mid', '肉芽肿·结节', '心肌非干酪样肉芽肿，MRI 斑片状延迟强化（非冠脉分布）；可致传导阻滞。', '斑片延迟强化', '传导阻滞', '非冠脉分布'],
    ['circ-iron-overload', '心肌铁过载', '心肌', 'iron', 'high', '铁沉积·T2*', '反复输血或血色病致心肌铁沉积，MRI T2* 缩短；需监测心功能与去铁治疗。', 'T2* 缩短', '铁沉积', '舒张功能异常']
  ]],
  ['valve', '超声心动图 · 心脏MRI · CT · 心电图', 'valve', [
    ['circ-ms', '二尖瓣狭窄', '二尖瓣', 'stenosis', 'mid', '狭窄·左房↑', '瓣叶增厚融合致瓣口面积减小，超声见瓣口减小与左房扩大；心电图左房肥大。', '瓣口面积减小', '左房扩大', '舒张期隆隆音'],
    ['circ-mr', '二尖瓣关闭不全', '二尖瓣', 'regurgitation', 'mid', '反流·容量负荷', '瓣叶或腱索病变致反流，超声彩色多普勒见反流束；左室/左房扩大。', '反流束', '左室扩大', '全收缩期杂音'],
    ['circ-as', '主动脉瓣狭窄', '主动脉瓣', 'stenosis', 'high', '狭窄·压力负荷', '瓣叶钙化融合致跨瓣压差升高，超声/CT 评估瓣口面积；心电图左室肥厚。', '跨瓣压差↑', '瓣叶钙化', '左室肥厚'],
    ['circ-ar', '主动脉瓣关闭不全', '主动脉瓣', 'regurgitation', 'mid', '反流·舒张负荷', '瓣叶关闭不全致舒张期反流，超声见舒张期反流束与左室扩大。', '舒张期反流', '左室扩大', '周围脉压差增大'],
    ['circ-tricuspid', '三尖瓣病变', '三尖瓣', 'regurgitation', 'mid', '三尖瓣·反流', '三尖瓣狭窄或关闭不全，超声评估瓣叶与右心扩大；常继发于肺高压。', '三尖瓣反流', '右室扩大', '颈静脉怒张'],
    ['circ-ps', '肺动脉瓣狭窄', '肺动脉瓣', 'stenosis', 'mid', '狭窄·右室↑', '瓣叶融合致右室压力负荷，超声/CT 见瓣口狭窄与右室肥厚。', '瓣口狭窄', '右室肥厚', '收缩期喷射音'],
    ['circ-bicuspid-aov', '二叶式主动脉瓣', '主动脉瓣', 'bicuspid', 'mid', '先天·二叶', '先天二叶主动脉瓣，超声/CT 见两瓣叶；易早发狭窄/关闭不全与主动脉扩张。', '两瓣叶', '主动脉扩张', '早发钙化'],
    ['circ-endocarditis', '感染性心内膜炎(赘生物)', '瓣膜/心内膜', 'endocarditis', 'high', '感染·赘生物', '瓣膜赘生物伴发热与血培养阳性，超声/TEE 见摆动团块；MRI 辅助脓肿评估。', '瓣膜赘生物', 'TEE 敏感', '血培养阳性'],
    ['circ-valve-calcification', '瓣膜钙化', '主动脉瓣/二尖瓣', 'calcification', 'mid', '退变·钙化', '老年退行性瓣叶钙化，CT/超声见高密度/强回声钙化；与狭窄程度相关。', '瓣叶钙化', 'CT 密度↑', '跨瓣流速增快'],
    ['circ-mvp', '二尖瓣脱垂', '二尖瓣', 'prolapse', 'low', '脱垂·腱索', '瓣叶收缩期脱入左房，超声见瓣叶超过瓣环连线；可合并反流。', '瓣叶脱垂', '超过瓣环线', '收缩期喀喇音']
  ]],
  ['pericardium', '超声心动图 · 心脏MRI · CT · 心电图', 'pericardium', [
    ['circ-acute-pericarditis', '急性心包炎', '心包', 'inflammation', 'mid', '急性·心包', '心包急性炎症，超声见少量积液；心电图广泛 ST 抬高与 PR 压低。', '心包积液', 'ST 抬高', 'PR 段压低'],
    ['circ-constrictive-pericarditis', '缩窄性心包炎', '心包', 'constriction', 'high', '缩窄·约束', '心包增厚纤维化约束心室舒张，MRI/CT 见心包增厚与强化；与 RCM 鉴别。', '心包增厚', '舒张受限', 'Kussmaul 征'],
    ['circ-pericardial-effusion', '心包积液', '心包', 'effusion', 'mid', '积液·心包', '心包腔液体积聚，超声见无回声区；大量时可压塞。', '无回声区', '舒张期塌陷', '积液量评估'],
    ['circ-cardiac-tamponade', '心脏压塞', '心包', 'tamponade', 'high', '急症·压塞', '心包积液致心室充盈受限，超声见 RA/RV 舒张期塌陷；需紧急引流。', 'RA 塌陷', 'RV 塌陷', '脉压变窄'],
    ['circ-pericardial-cyst', '心包囊肿', '心包', 'cyst', 'low', '良性·囊肿', '心包旁囊性病变，CT/MRI 见边界清、无强化囊性灶；多为偶然发现。', '囊性灶', '无强化', '边界清晰'],
    ['circ-pericardial-defect', '心包缺如', '心包', 'defect', 'low', '先天·缺如', '部分或完全心包缺失，CT/MRI 见心脏移位或疝出；左心包缺如多见。', '心包不连续', '心脏移位', '偶然发现'],
    ['circ-pericardial-calcification', '心包钙化', '心包', 'calcification', 'mid', '钙化·缩窄', '心包层状钙化，CT 敏感；可致缩窄性生理。', '层状钙化', 'CT 高密度', '舒张受限'],
    ['circ-pericardial-tumor', '心包肿瘤', '心包', 'tumor', 'high', '肿瘤·心包', '原发性或转移性心包肿瘤，MRI/CT 见软组织肿块与积液；需活检。', '软组织肿块', '心包增厚', '积液']
  ]],
  ['cardiac-tumor', '心脏MRI · 超声心动图 · CT · 心电图', 'cardiac', [
    ['circ-atrial-myxoma', '心房黏液瘤', '左心房', 'benign', 'high', '良性·黏液瘤', '最常见原发性心脏肿瘤，MRI/超声见带蒂左房肿块；可致梗阻与栓塞。', '左房带蒂肿块', '随心动摆动', '舒张期梗阻'],
    ['circ-papillary-fibroelastoma', '乳头状弹力纤维瘤', '瓣膜/心内膜', 'benign', 'mid', '良性·瓣膜', '小带蒂瓣膜表面肿瘤，TEE 见典型毛虫样；栓塞风险。', '带蒂小团块', 'TEE 清晰', '栓塞风险'],
    ['circ-rhabdomyoma', '心脏横纹肌瘤', '心肌', 'benign', 'mid', '良性·结节硬化', '儿童最常见心脏肿瘤，MRI/超声见多发心肌内结节；与结节性硬化相关。', '心肌内结节', '多发', 'TSC 关联'],
    ['circ-cardiac-fibroma', '心脏纤维瘤', '心肌/室间隔', 'benign', 'mid', '良性·纤维', '儿童实体性心脏肿瘤，MRI 见边界清、低信号肿块；可致流出道梗阻。', '边界清肿块', '低信号', '流出道梗阻'],
    ['circ-angiosarcoma', '心脏血管肉瘤', '右心房/心包', 'malignant', 'high', '恶性·肉瘤', '最常见原发性心脏恶性肿瘤，MRI/CT 见浸润性肿块与心包积液。', '浸润性肿块', '心包积液', '快速进展'],
    ['circ-cardiac-metastasis', '心脏转移瘤', '心肌/心包', 'metastasis', 'high', '转移·心包', '黑色素瘤、肺癌等转移至心脏，MRI/CT 见多发结节或心包增厚。', '多发结节', '心包增厚', '已知原发'],
    ['circ-cardiac-thrombus', '心腔内血栓', '心腔/心耳', 'thrombus', 'high', '血栓·栓塞', '房颤或心梗后心腔内血栓，超声/ MRI 见附壁低回声/充盈缺损；栓塞风险高。', '附壁团块', '心耳血栓', '充盈缺损']
  ]],
  ['congenital', '心脏MRI · 心脏CTA · 超声心动图 · 心电图', 'congenital', [
    ['circ-asd', '房间隔缺损(ASD)', '房间隔', 'shunt-lr', 'mid', '分流·左向右', '房间隔缺损致左向右分流，超声/CTA 见缺损与右心负荷；心电图右束支阻滞。', '房间隔缺损', '右心扩大', '左向右分流'],
    ['circ-vsd', '室间隔缺损(VSD)', '室间隔', 'shunt-lr', 'mid', '分流·左向右', '室间隔缺损，超声见缺损口与左向右分流；大小决定自然史。', 'VSD 口', '左向右分流', '左室容量负荷'],
    ['circ-pda', '动脉导管未闭(PDA)', '动脉导管', 'shunt-lr', 'mid', '分流·PDA', '动脉导管未闭，超声/CTA 见主肺动脉与降主动脉间分流；连续杂音。', '导管分流', '左心扩大', '连续杂音'],
    ['circ-avsd', '房室间隔缺损', '房室间隔', 'shunt-lr', 'high', '复杂·AVSD', '房室间隔共同通道缺损，超声/MRI 评估共同瓣与分流；常合并 Down 综合征。', '共同房室瓣', '大分流', '复杂畸形'],
    ['circ-tof', '法洛四联症', '右心室/肺动脉', 'shunt-rl', 'high', '发绀·四联', 'VSD+肺动脉狭窄+右室肥厚+主动脉骑跨，CTA/MRI 明确解剖；发绀型 CHD。', '肺动脉狭窄', '主动脉骑跨', '右室肥厚'],
    ['circ-tga', '大动脉转位', '大动脉', 'shunt-rl', 'high', '发绀·TGA', '主动脉与肺动脉位置互换，需 PDA/ASD 混合血；CTA/MRI 术前规划。', '大动脉转位', '平行大动脉', '新生儿发绀'],
    ['circ-truncus', '永存动脉干', '圆锥动脉干', 'shunt-rl', 'high', '发绀·Truncus', '单一动脉干发出冠脉、肺动脉与体循环，CTA 评估肺动脉起源。', '单一动脉干', 'VSD', '发绀'],
    ['circ-tricuspid-atresia', '三尖瓣闭锁', '三尖瓣', 'shunt-rl', 'high', '发绀·闭锁', '三尖瓣未发育，右室发育不全；依赖 ASD/PDA/VSD 分流。', '三尖瓣闭锁', '右室小', '发绀'],
    ['circ-tapvr', '肺静脉异位引流', '肺静脉', 'shunt-rl', 'high', '发绀·PAPVR', '肺静脉未连左房，CTA/MRI 见异常回流路径；梗阻型为急症。', '异位回流', '左房未接收', '发绀'],
    ['circ-coarctation', '主动脉缩窄', '主动脉峡部', 'obstructive', 'mid', '梗阻·缩窄', '主动脉峡部狭窄，CTA/MRI 见狭窄与侧支；上下肢血压差。', '峡部狭窄', '侧支形成', '血压差'],
    ['circ-pulmonary-stenosis-chd', '肺动脉狭窄', '肺动脉', 'obstructive', 'mid', '梗阻·肺动脉', '先天性肺动脉瓣或瓣下狭窄，超声/CTA 评估压差与右室肥厚。', '瓣口狭窄', '右室肥厚', '喷射性杂音'],
    ['circ-aortic-interruption', '主动脉弓离断', '主动脉弓', 'obstructive', 'high', '梗阻·离断', '主动脉弓完全离断，依赖 PDA 供血；新生儿循环崩溃。', '弓离断', 'PDA 依赖', '急症'],
    ['circ-single-ventricle', '单心室', '心室', 'complex', 'high', '复杂·单心室', '功能性单心室，MRI/CTA 评估大动脉关系与肺血流；Fontan 路径规划。', '单心室', '大动脉关系', 'Fontan 候选'],
    ['circ-ebstein', 'Ebstein畸形', '三尖瓣', 'complex', 'high', '复杂·Ebstein', '三尖瓣隔叶下移致右房化右室，超声/MRI 见典型解剖；可合并 WPW。', '瓣叶下移', '右房化右室', '三尖瓣反流']
  ]],
  ['aortic', '主动脉CTA · MRA · 心电图', 'aorta', [
    ['circ-thoracic-aneurysm', '胸主动脉瘤', '胸主动脉', 'aneurysm', 'high', '瘤·胸主', '胸主动脉局部扩张，CTA 测量最大径与累及分支；破裂风险与尺寸相关。', '局部扩张', '最大径测量', '壁血栓'],
    ['circ-abdominal-aneurysm', '腹主动脉瘤', '腹主动脉', 'aneurysm', 'high', '瘤·腹主', '腹主动脉瘤，CTA 为筛查与随访金标准；>5.5cm 干预指征。', '梭形扩张', '最大径', '附壁血栓'],
    ['circ-aortic-dissection', '主动脉夹层(Stanford A/B型)', '主动脉', 'dissection', 'high', '急症·夹层', '内膜撕裂致真假腔，CTA 见内膜片与撕裂口；A 型需紧急手术。', '内膜片', '真假双腔', '撕裂口'],
    ['circ-imh', '壁内血肿', '主动脉壁', 'imh', 'high', '急症·IMH', '主动脉壁内出血无明确内膜片，CTA 见新月形高密度；可进展为夹层。', '壁内血肿', '新月形高密度', '无内膜片'],
    ['circ-pau', '穿透性溃疡', '主动脉壁', 'ulcer', 'high', '溃疡·PAU', '粥样斑块穿透内弹力层，CTA 见龛影；可合并 IMH/夹层。', '龛影', '壁内血肿', '高危斑块'],
    ['circ-coarctation-aortic', '主动脉缩窄', '主动脉峡部', 'stenosis', 'mid', '缩窄·峡部', '同先天性缩窄，成人可因未诊继发高血压；CTA/MRA 评估侧支。', '峡部狭窄', '肋间动脉侧支', '上下肢压差'],
    ['circ-marfan-aorta', '马凡综合征(主动脉根部扩张)', '主动脉根部', 'connective', 'high', '遗传·马凡', 'FBN1 突变致主动脉根扩张，CTA/MRI 序列监测 Z 评分；夹层风险。', '根扩张', 'Z 评分', '瓣环扩张'],
    ['circ-aortitis', '主动脉炎(大动脉炎)', '主动脉/大分支', 'inflammation', 'mid', '炎症·大动脉炎', '大动脉炎致管壁增厚与狭窄，CTA/MRI 见壁强化与狭窄；青年女性多见。', '壁增厚强化', '节段性狭窄', 'ESR 升高'],
    ['circ-aortic-rupture', '主动脉破裂', '主动脉', 'rupture', 'high', '急症·破裂', '动脉瘤或夹层破裂，CTA 见对比剂外渗或纵隔/腹腔积血；生命威胁。', '对比剂外渗', '积血', '休克']
  ]],
  ['pulmonary-vascular', 'CTPA · 肺通气灌注 · 心电图', 'pulmonary', [
    ['circ-pe', '肺栓塞', '肺动脉', 'embolism', 'high', '急症·栓塞', '肺动脉血栓栓塞，CTPA 见充盈缺损；心电图 S1Q3T3 或窦速。', '充盈缺损', '肺动脉截断', '右心负荷'],
    ['circ-cteph', '慢性血栓栓塞性肺动脉高压(CTEPH)', '肺动脉', 'hypertension', 'high', '慢性·CTEPH', '陈旧肺栓塞致肺血管重塑与高压，CTPA/VQ 见不匹配灌注缺损；可手术取栓。', '不匹配灌注', '肺动脉扩张', 'mPAP 升高'],
    ['circ-pah', '肺动脉高压', '肺动脉', 'hypertension', 'high', '高压·PAH', '肺动脉平均压升高，超声/CT 见右室扩大与肺动脉增宽；需右心导管确诊。', '肺动脉增宽', '右室扩大', 'mPAP≥25'],
    ['circ-pulmonary-aneurysm', '肺动脉瘤', '肺动脉', 'aneurysm', 'mid', '瘤·肺动脉', '肺动脉局部扩张，CTA 见囊状扩张；与 PAH/结缔组织病相关。', '囊状扩张', 'CTA 测量', '破裂罕见'],
    ['circ-pavm', '肺动静脉畸形', '肺实质', 'malformation', 'mid', '畸形·PAVM', '肺动静脉直接交通，CTA 见供血/引流血管与结节；可致低氧与栓塞。', '供血动脉', '引流静脉', '结节样畸形']
  ]],
  ['peripheral-arterial', 'CTA · MRA · 多普勒超声 · DSA · 心电图', 'peripheral', [
    ['circ-pad', '下肢动脉粥样硬化闭塞症', '下肢动脉', 'atherosclerosis', 'mid', '慢性·PAD', '下肢动脉粥样硬化致间歇性跛行，CTA/超声见狭窄/闭塞与侧支。', '管腔狭窄', '侧支循环', 'ABI 降低'],
    ['circ-acute-embolism', '急性动脉栓塞', '外周动脉', 'embolism', 'high', '急症·栓塞', '心源性或动脉源栓子致急性缺血，DSA/CTA 见突然截断；6h 黄金期。', '突然截断', '无侧支', '6P 征'],
    ['circ-peripheral-aneurysm', '动脉瘤(髂/股/腘动脉)', '髂/股/腘动脉', 'aneurysm', 'mid', '瘤·外周', '外周动脉瘤，CTA/超声见局部扩张与血栓；腘动脉瘤易破裂。', '局部扩张', '附壁血栓', '最大径'],
    ['circ-carotid-stenosis', '颈动脉狭窄', '颈动脉', 'stenosis', 'high', '狭窄·卒中', '颈动脉粥样狭窄，超声/CTA 评估 NASCET 狭窄率；与 TIA/卒中相关。', '斑块狭窄', 'NASCET 率', '溃疡斑'],
    ['circ-renal-artery-stenosis', '肾动脉狭窄', '肾动脉', 'stenosis', 'mid', '狭窄·肾高压', '肾动脉狭窄致继发性高血压，CTA/MRA/DSA 见狭窄；肾萎缩。', '肾动脉狭窄', '肾萎缩', '继发性高血压'],
    ['circ-mesenteric-stenosis', '肠系膜动脉狭窄', '肠系膜动脉', 'stenosis', 'high', '狭窄·缺血', '肠系膜上动脉狭窄致慢性肠缺血，CTA 见狭窄与侧支；餐后腹痛。', 'SMA 狭窄', '侧支扩张', '餐后痛'],
    ['circ-subclavian-steal', '锁骨下动脉盗血综合征', '锁骨下动脉', 'steal', 'mid', '盗血·椎基底', '锁骨下动脉狭窄致椎动脉逆向血流，超声/CTA 见盗血；上肢血压低。', '椎动脉逆流', '锁骨下狭窄', '双上肢压差'],
    ['circ-raynaud', '雷诺现象', '指/趾动脉', 'vasospasm', 'low', '痉挛·雷诺', '血管痉挛致发作性苍白-紫绀-潮红，主要临床诊断；排除硬皮病。', '发作性痉挛', '冷诱发', '指端变色'],
    ['circ-buerger', '血栓闭塞性脉管炎(Buerger病)', '中小动脉', 'inflammation', 'high', '炎症·吸烟', '中小动脉炎症与血栓，DSA 见节段性闭塞与螺旋侧支；青年吸烟者。', '节段性闭塞', '螺旋侧支', '吸烟史'],
    ['circ-fmd', '纤维肌发育不良', '肾/颈/椎动脉', 'dysplasia', 'mid', '串珠·FMD', '动脉壁纤维增生致串珠样狭窄，CTA/MRA 典型串珠征；青年女性多见。', '串珠样狭窄', '非粥样', '多支受累']
  ]],
  ['venous', '多普勒超声 · CT/MR静脉成像 · 心电图', 'venous', [
    ['circ-dvt', '深静脉血栓(DVT)', '深静脉', 'thrombosis', 'high', '急性·DVT', '深静脉血栓形成，超声见静脉不可压与充盈缺损；CT/MRV 评估范围。', '静脉不可压', '充盈缺损', 'D-二聚体↑'],
    ['circ-pe-venous', '肺栓塞(静脉来源)', '肺动脉/深静脉', 'embolism', 'high', '栓塞·DVT源', 'DVT 脱落致 PE，CTPA+下肢超声联合评估；同源治疗。', 'PE 充盈缺损', 'DVT 同源', '抗凝'],
    ['circ-ivc-filter', '下腔静脉滤器相关', '下腔静脉', 'device', 'mid', '滤器·IVC', 'IVC 滤器置入或并发症，CT 见滤器位置与穿透/血栓；随访评估。', '滤器位置', '穿透', 'IVC 血栓'],
    ['circ-svc-syndrome', '上腔静脉综合征', '上腔静脉', 'obstruction', 'high', '梗阻·SVC', 'SVC 受压或血栓致头颈上肢静脉回流障碍，CT/MRV 见梗阻点；面颈水肿。', 'SVC 梗阻', '侧支形成', '面颈水肿'],
    ['circ-varicose', '静脉曲张', '浅静脉', 'varicose', 'low', '慢性·曲张', '浅静脉瓣功能不全致曲张，超声见反流与扩张；美容或症状性。', '静脉反流', '浅静脉扩张', 'CEAP 分级'],
    ['circ-budd-chiari', '布加综合征', '肝静脉/IVC', 'obstruction', 'high', '梗阻·布加', '肝静脉或 IVC 梗阻致肝淤血，MRI/MRV 见梗阻与侧支；腹水与肝大。', '肝静脉梗阻', '侧支', '肝淤血'],
    ['circ-portal-thrombosis', '门静脉血栓', '门静脉', 'thrombosis', 'high', '血栓·门脉', '门静脉血栓，CT/MRI 见充盈缺损；与肝硬化/感染相关。', '门静脉充盈缺损', '侧支', '门脉高压'],
    ['circ-may-thurner', 'May-Thurner综合征', '左髂静脉', 'compression', 'mid', '压迫·髂静脉', '左髂静脉受右髂动脉压迫致 DVT 风险，CT/MRV 见狭窄与侧支。', '髂静脉受压', '左 DVT 好发', '支架指征'],
    ['circ-venous-malformation', '静脉畸形', '静脉', 'malformation', 'low', '畸形·低流', '先天性静脉畸形或低流量畸形，MRI 见静脉 lake 与引流；与 VM 分类相关。', '静脉 lake', '慢流', 'T2 高信号']
  ]],
  ['heart-failure', 'X线 · 超声心动图 · 心脏MRI · 心电图', 'heart', [
    ['circ-chf', '充血性心力衰竭', '心脏/全身', 'failure', 'high', '慢性·心衰', '心输出量不足与淤血，超声见 LVEF 降低与结构改变；胸片肺淤血。', 'LVEF 降低', '肺淤血', 'BNP 升高'],
    ['circ-lhf-ped', '左心衰(肺水肿)', '左心/肺', 'failure', 'high', '急性·肺水肿', '左心衰竭致肺毛细血管压升高，胸片蝶翼状肺水肿；超声 B 线。', '蝶翼肺水肿', 'Kerley B 线', '端坐呼吸'],
    ['circ-rhf', '右心衰', '右心', 'failure', 'high', '右心·淤血', '右室功能不全致体循环淤血，超声见右室扩大与 TR；颈静脉怒张。', '右室扩大', 'TR 加重', '肝淤血'],
    ['circ-cardiomegaly', '心脏扩大', '心脏', 'dilation', 'mid', '扩大·重构', '心脏各腔或整体扩大，胸片 CTR 增大；超声评估病因与功能。', 'CTR 增大', '各腔扩大', '病因多样'],
    ['circ-ventricular-aneurysm', '室壁瘤', '左心室', 'aneurysm', 'high', '梗死后·瘤', '心梗后室壁瘤样膨出，MRI/超声见矛盾运动与薄壁；血栓风险。', '矛盾运动', '薄壁膨出', '延迟强化'],
    ['circ-mural-thrombus', '附壁血栓', '心腔', 'thrombus', 'high', '血栓·附壁', '心梗或心衰后心腔内附壁血栓，超声/MRI 见附壁充盈缺损；抗凝。', '附壁充盈缺损', '心尖好发', '栓塞风险']
  ]]
];

const rows = [];
for (const [navKey, modStr, zoneDefault, diseases] of CATALOG) {
  for (const [type, title, region, subcat, sev, sevtext, desc, ...signs] of diseases) {
    rows.push([navKey, type, title, title, region, subcat, modStr, sev, sevtext, desc, ...signs]);
  }
}

const file = `/** 循环系统 · 11 类导航 + 疾病目录（无图库） — 由 scripts/generate-circulatory-catalog.mjs 生成 */
export const CIRCULATORY_NAV_GROUPS = ${JSON.stringify(CIRCULATORY_NAV_GROUPS, null, 2)};

export const CIRCULATORY_NAV_ORDER = ${JSON.stringify(CIRCULATORY_NAV_ORDER, null, 2)};

/** [navGroup, type, title, sub, region, subcat, mod, sev, sevtext, desc, ...signs] */
export const CIRCULATORY_DISEASE_ROWS = ${JSON.stringify(rows, null, 2)};
`;

fs.writeFileSync(outPath, file, 'utf8');
console.log('generate-circulatory-catalog done');
console.log('  nav groups:', CIRCULATORY_NAV_ORDER.length);
console.log('  diseases:', rows.length);

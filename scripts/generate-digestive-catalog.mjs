/**
 * 生成 data/digestive-catalog.mjs
 * 运行：node scripts/generate-digestive-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'data', 'digestive-catalog.mjs');

const DIGESTIVE_NAV_GROUPS = {
  'oral-salivary': { label: '口腔、涎腺与咽部', icon: '', desc: '涎腺、舌、口底及口咽相关病变' },
  esophagus: { label: '食管疾病', icon: '', desc: '食管炎症、动力障碍、肿瘤与急症' },
  'stomach-duodenum': { label: '胃与十二指肠', icon: '', desc: '胃炎、消化性溃疡、胃癌及上消化道梗阻' },
  'small-bowel': { label: '小肠疾病', icon: '', desc: '克罗恩病、肠梗阻、缺血及小肠肿瘤' },
  'colorectal-appendix': { label: '结直肠与阑尾', icon: '', desc: '炎症性肠病、结直肠癌、憩室及阑尾病变' },
  liver: { label: '肝脏疾病', icon: '', desc: '脂肪肝、肝硬化、肝肿瘤及代谢性肝病' },
  biliary: { label: '胆道系统', icon: '', desc: '胆石、胆囊炎、胆管炎及胆道肿瘤' },
  pancreas: { label: '胰腺疾病', icon: '', desc: '胰腺炎、胰腺囊肿及胰腺肿瘤' },
  spleen: { label: '脾脏疾病', icon: '', desc: '脾肿大、脾梗死、脾肿瘤及脾破裂' },
  peritoneum: { label: '腹膜、网膜与肠系膜', icon: '', desc: '腹膜炎、腹水、腹膜肿瘤及肠系膜病变' },
  'vascular-acute': { label: '消化道血管与急腹症', icon: '', desc: '肠缺血、疝、穿孔及血管急症' },
  anorectal: { label: '肛门直肠', icon: '', desc: '肛瘘、脓肿、直肠脱垂及肛管直肠肿瘤' },
  'abdominal-wall': { label: '腹壁与膈肌', icon: '', desc: '腹壁疝、膈疝及腹壁血肿' },
  'congenital-ped': { label: '先天性与小儿', icon: '', desc: '消化道闭锁、旋转不良及新生儿急腹症' },
  'infection-parasite': { label: '感染性与寄生虫', icon: '', desc: '腹腔结核、阿米巴、包虫及血吸虫' },
  'trauma-iatrogenic': { label: '医源性与创伤', icon: '', desc: '实质脏器挫裂伤及术后并发症' }
};

const DIGESTIVE_NAV_ORDER = [
  'oral-salivary', 'esophagus', 'stomach-duodenum', 'small-bowel', 'colorectal-appendix',
  'liver', 'biliary', 'pancreas', 'spleen', 'peritoneum', 'vascular-acute',
  'anorectal', 'abdominal-wall', 'congenital-ped', 'infection-parasite', 'trauma-iatrogenic'
];

/** [type, title, sub, region, subcat, mod, sev, sevtext, desc, ...signs] */
const DISEASES = {
  'oral-salivary': [
    ['dig-sialolithiasis', '涎腺结石', 'Sialolithiasis', '涎腺导管', 'stone', 'CT · 超声 · 内镜', 'mid', '慢性·阻塞', '涎腺导管内钙化结石致反复肿胀，超声/CT 见强回声或高密度灶；内镜可定位结石与导管狭窄。', '导管扩张', '强回声结石', '进食后肿胀'],
    ['dig-acute-sialadenitis', '急性涎腺炎', 'Acute Sialadenitis', '涎腺', 'infection', 'CT · 超声 · 内镜', 'high', '急性·感染', '涎腺急性化脓性炎症，CT/超声见腺体肿大、周围脂肪浸润；内镜可见导管口脓性分泌物。', '腺体肿大', '脂肪浸润', '发热疼痛'],
    ['dig-chronic-sialadenitis', '慢性涎腺炎', 'Chronic Sialadenitis', '涎腺', 'infection', 'CT · 超声 · 内镜', 'low', '慢性·反复', '反复涎腺肿胀与导管扩张，CT 见腺体萎缩或纤维化；内镜评估导管通畅与结石。', '腺体萎缩', '导管扩张', '反复肿胀'],
    ['dig-pleomorphic-adenoma', '涎腺多形性腺瘤', 'Pleomorphic Adenoma', '涎腺', 'benign', 'MRI · CT · 超声', 'low', '良性·混合瘤', '涎腺最常见良性肿瘤，MRI/CT 见边界清、分叶状软组织肿块；超声可引导穿刺。', '边界清肿块', '分叶状', '缓慢生长'],
    ['dig-warthin-tumor', '腮腺Warthin瘤', 'Warthin Tumor', '腮腺', 'benign', 'CT · MRI · 超声', 'low', '良性·Warthin', '腮腺内常见良性肿瘤，CT/MRI 见囊实性、可多发；超声见低回声区。', '囊实性肿块', '多发倾向', '吸烟相关'],
    ['dig-salivary-carcinoma', '涎腺癌', 'Salivary Gland Carcinoma', '涎腺', 'malignant', 'CT · MRI · 内镜', 'high', '恶性·涎腺', '涎腺恶性肿瘤，增强 CT/MRI 评估浸润与淋巴结；内镜/活检确诊组织学类型。', '浸润性肿块', '淋巴结肿大', '面神经受累'],
    ['dig-tongue-cancer', '舌癌', 'Tongue Cancer', '舌', 'malignant', 'CT · MRI · 内镜', 'high', '恶性·舌', '舌鳞癌等，MRI 评估浸润深度与淋巴结；内镜直接观察原发灶并活检。', '舌部溃疡肿块', '浸润深度', '淋巴结转移'],
    ['dig-floor-mouth-cancer', '口底癌', 'Floor of Mouth Cancer', '口底', 'malignant', 'CT · MRI · 内镜', 'high', '恶性·口底', '口底鳞癌，CT/MRI 评估下颌骨侵犯与淋巴结；内镜+活检确诊。', '口底肿块', '骨侵犯', '淋巴结肿大'],
    ['dig-peritonsillar-abscess', '扁桃体周脓肿', 'Peritonsillar Abscess', '口咽', 'infection', 'CT · 超声 · 内镜', 'high', '急性·脓肿', '扁桃体周围间隙化脓，CT 见低密度区；超声/内镜辅助定位引流。', '低密度脓肿', '扁桃体偏移', '张口受限'],
    ['dig-retropharyngeal-abscess', '咽后脓肿', 'Retropharyngeal Abscess', '咽后间隙', 'infection', 'CT · MRI · 内镜', 'high', '急症·深部', '咽后间隙化脓可致气道梗阻，CT 见咽后低密度区；内镜需谨慎评估。', '咽后低密度', '气道受压', '颈项强直']
  ],
  esophagus: [
    ['dig-reflux-esophagitis', '反流性食管炎', 'Reflux Esophagitis', '食管', 'inflammation', '内镜 · 上消化道造影', 'mid', '慢性·反流', 'GERD 致食管黏膜炎症，内镜见糜烂、溃疡；钡餐评估反流与裂孔疝。', '黏膜糜烂', '溃疡', '烧心反流'],
    ['dig-eosinophilic-esophagitis', '嗜酸性食管炎', 'Eosinophilic Esophagitis', '食管', 'immune', '内镜 · 活检', 'mid', '免疫·EoE', '食管嗜酸性浸润，内镜见环状沟、纵行裂隙与白色渗出；活检确诊。', '环状沟', '纵行裂隙', '吞咽困难'],
    ['dig-infectious-esophagitis', '感染性食管炎(念珠菌/疱疹)', 'Infectious Esophagitis', '食管', 'infection', '内镜 · 活检', 'high', '感染·免疫低下', '念珠菌/疱疹等感染，内镜见白色伪膜或溃疡；免疫抑制患者多见。', '白色伪膜', '溃疡', '吞咽痛'],
    ['dig-caustic-esophagitis', '腐蚀性食管炎', 'Caustic Esophagitis', '食管', 'injury', '内镜 · 上消化道造影', 'high', '急症·腐蚀', '强酸碱摄入致食管坏死狭窄，早期内镜评估损伤分级；后期造影评估狭窄。', '黏膜坏死', '狭窄', '摄入史'],
    ['dig-barrett-esophagus', 'Barrett食管', 'Barrett Esophagus', '食管远端', 'metaplasia', '内镜 · 活检', 'mid', '癌前·Barrett', '远端食管柱状上皮化生，内镜见鲑鱼色黏膜；四象限活检监测异型增生。', '柱状上皮化生', '鲑鱼色黏膜', '长期反流'],
    ['dig-achalasia', '贲门失弛缓症', 'Achalasia', '食管下段/贲门', 'motility', '上消化道造影 · 内镜 · 测压', 'mid', '动力·失弛缓', 'LES 松弛障碍，钡餐见鸟嘴征与食管扩张；内镜排除伪失弛缓。', '鸟嘴征', '食管扩张', '吞咽困难'],
    ['dig-diffuse-esophageal-spasm', '弥漫性食管痉挛', 'Diffuse Esophageal Spasm', '食管', 'motility', '上消化道造影 · 测压 · 内镜', 'mid', '动力·痉挛', '食管不协调收缩，钡餐见螺旋/串珠样改变；测压确诊。', '串珠样改变', '螺旋样收缩', '胸痛吞咽'],
    ['dig-scleroderma-esophagus', '硬皮病食管', 'Scleroderma Esophagus', '食管', 'motility', '上消化道造影 · 内镜', 'mid', 'CTD·硬皮病', '平滑肌萎缩致低动力与反流，钡餐见扩张与反流；内镜评估 Barrett。', '食管低动力', '扩张', '广泛反流'],
    ['dig-hiatal-hernia', '食管裂孔疝(滑动型/食管旁型)', 'Hiatal Hernia', '食管裂孔', 'hernia', '上消化道造影 · CT · 内镜', 'low', '慢性·疝', '胃底疝入纵隔，钡餐/CT 区分滑动与食管旁型；内镜评估反流与 Barrett。', '胃底疝入', '裂孔扩大', '反流症状'],
    ['dig-zenker-diverticulum', 'Zenker憩室', 'Zenker Diverticulum', '咽食管连接部', 'diverticulum', '上消化道造影 · 内镜', 'mid', '憩室·Zenker', 'Killian 三角区后壁憩室，钡餐见钡剂潴留囊袋；内镜评估与排除肿瘤。', '钡剂潴留', '后壁囊袋', '吞咽困难'],
    ['dig-epiphrenic-diverticulum', '膈上憩室', 'Epiphrenic Diverticulum', '食管远端', 'diverticulum', '上消化道造影 · CT · 内镜', 'low', '憩室·远端', '食管远端侧壁憩室，钡餐/CT 见囊袋状突出；常伴动力障碍。', '侧壁囊袋', '钡剂潴留', '动力障碍'],
    ['dig-esophageal-web', '食管蹼', 'Esophageal Web', '食管', 'structural', '上消化道造影 · 内镜', 'low', '结构·蹼', '食管黏膜薄膜状狭窄，钡餐需侧位片显示；内镜可扩张治疗。', '薄膜状狭窄', '侧位可见', '吞咽困难'],
    ['dig-schatzki-ring', 'Schatzki环', 'Schatzki Ring', '食管远端', 'structural', '上消化道造影 · 内镜', 'low', '结构·环', '远端食管黏膜环致间歇性梗阻，钡餐见环状狭窄；内镜确认并扩张。', '环状狭窄', '间歇梗阻', '食物嵌顿'],
    ['dig-esophageal-cancer', '食管癌', 'Esophageal Cancer', '食管', 'malignant', 'CT · PET-CT · 内镜', 'high', '恶性·食管', '鳞癌/腺癌，增强 CT/PET-CT 分期；内镜活检与 EUS 评估浸润。', '管壁增厚肿块', '管腔狭窄', '淋巴结肿大'],
    ['dig-esophageal-leiomyoma', '食管平滑肌瘤', 'Esophageal Leiomyoma', '食管', 'benign', 'CT · 上消化道造影 · 内镜', 'low', '良性·肌瘤', '食管壁内平滑肌瘤，CT 见均匀强化壁内肿块；EUS 评估起源层。', '壁内肿块', '均匀强化', '缓慢生长'],
    ['dig-esophageal-gist', '食管间质瘤', 'Esophageal GIST', '食管', 'tumor', 'CT · 内镜 · EUS', 'mid', 'GIST·食管', '食管壁间质瘤，增强 CT 见强化肿块；EUS 引导活检。', '壁内强化肿块', 'EUS 起源', '出血风险'],
    ['dig-esophageal-varices', '食管静脉曲张', 'Esophageal Varices', '食管', 'vascular', '内镜 · CT', 'high', '门脉高压·曲张', '门静脉高压致食管静脉扩张，内镜为诊断与套扎金标准；CT 评估门脉侧支。', '曲张静脉', '红色征', '门脉高压'],
    ['dig-esophageal-fb', '食管异物', 'Esophageal Foreign Body', '食管', 'emergency', 'X线 · CT · 内镜', 'high', '急症·异物', '异物嵌顿致梗阻或穿孔，胸片/CT 定位；内镜取出为首选。', '异物影', '嵌顿', '吞咽困难'],
    ['dig-boerhaave', '食管穿孔(Boerhaave综合征)', 'Boerhaave Syndrome', '食管', 'emergency', 'CT · 上消化道造影 · 内镜', 'high', '急症·穿孔', '自发性全层食管破裂，CT 见纵隔/胸腔积气积液；造影见对比剂外漏。', '纵隔积气', '胸腔积液', '剧烈呕吐后'],
    ['dig-mallory-weiss', 'Mallory-Weiss综合征', 'Mallory-Weiss Syndrome', '食管胃连接部', 'bleeding', '内镜', 'mid', '急性·撕裂', '贲门黏膜纵向撕裂致出血，内镜见撕裂口与活动性出血；内镜下止血。', '黏膜撕裂', '活动性出血', '呕血黑便']
  ],
  'stomach-duodenum': [
    ['dig-acute-gastritis', '急性胃炎', 'Acute Gastritis', '胃', 'inflammation', '内镜 · 超声', 'mid', '急性·炎症', '急性胃黏膜炎症，内镜见充血水肿、糜烂；超声评估壁增厚。', '黏膜充血', '糜烂', '上腹痛'],
    ['dig-chronic-atrophic-gastritis', '慢性萎缩性胃炎', 'Chronic Atrophic Gastritis', '胃', 'inflammation', '内镜 · 活检', 'low', '慢性·萎缩', '胃黏膜萎缩伴肠化/异型增生，内镜见苍白萎缩黏膜；活检监测癌前病变。', '黏膜萎缩', '肠化生', 'Hp 相关'],
    ['dig-erosive-gastritis', '糜烂性胃炎', 'Erosive Gastritis', '胃', 'inflammation', '内镜', 'mid', '急性·糜烂', '胃黏膜浅表糜烂，内镜见出血性糜烂灶；评估 NSAID/酒精/应激因素。', '出血性糜烂', '黏膜水肿', '黑便呕血'],
    ['dig-gastric-ulcer', '胃溃疡', 'Gastric Ulcer', '胃', 'ulcer', '内镜 · 上消化道造影', 'mid', '溃疡·胃', '胃壁溃疡，内镜见溃疡缘与基底；造影见龛影；需活检排除恶性。', '溃疡龛影', '黏膜皱襞集中', '上腹痛'],
    ['dig-duodenal-ulcer', '十二指肠溃疡', 'Duodenal Ulcer', '十二指肠', 'ulcer', '内镜 · 上消化道造影', 'mid', '溃疡·十二指肠', '十二指肠球部溃疡，内镜直接观察；造影见球部龛影与激惹。', '球部龛影', '黏膜皱襞集中', '空腹痛'],
    ['dig-gastric-cancer', '胃癌', 'Gastric Cancer', '胃', 'malignant', 'CT · 内镜 · PET-CT', 'high', '恶性·胃', '胃腺癌等，增强 CT 评估浸润与转移；内镜活检+EUS 分期。', '胃壁增厚肿块', '淋巴结肿大', '溃疡型/浸润型'],
    ['dig-early-gastric-cancer', '早期胃癌', 'Early Gastric Cancer', '胃', 'malignant', '内镜 · EUS · CT', 'high', '恶性·早期', '局限于黏膜/黏膜下层，内镜+NBI/染色精查；EUS 评估深度。', '黏膜隆起/凹陷', '边界清', '可内镜切除'],
    ['dig-gastric-malt-lymphoma', '胃淋巴瘤(MALT)', 'Gastric MALT Lymphoma', '胃', 'lymphoma', '内镜 · CT · PET-CT', 'mid', '淋巴·MALT', '低度 B 细胞 MALT 淋巴瘤，内镜见多发浅表溃疡/结节；CT 评估胃壁增厚。', '浅表溃疡', '胃壁增厚', 'Hp 相关'],
    ['dig-gastric-gist', '胃间质瘤(GIST)', 'Gastric GIST', '胃', 'gist', 'CT · 内镜 · EUS', 'mid', 'GIST·胃', '胃壁间质瘤，增强 CT 见强化壁内/外生肿块；EUS 评估起源与风险。', '壁内强化肿块', '外生性生长', 'EUS 分层'],
    ['dig-gastric-net', '胃神经内分泌肿瘤', 'Gastric NET', '胃', 'net', '内镜 · CT · 核素', 'mid', 'NET·胃', '胃神经内分泌肿瘤，内镜见黏膜下或息肉样；CT/核素显像评估转移。', '息肉样病变', '黏膜下肿块', '高 gastrin 型'],
    ['dig-gastric-polyp', '胃息肉', 'Gastric Polyp', '胃', 'polyp', '内镜', 'low', '良性·息肉', '胃内息肉性病变，内镜观察形态并活检；评估大小与恶变风险。', '息肉样隆起', '表面黏膜', '偶然发现'],
    ['dig-fundic-gland-polyp', '胃底腺息肉', 'Fundic Gland Polyp', '胃底', 'polyp', '内镜', 'low', '良性·胃底腺', '胃底腺息肉，内镜见多发小息肉；PPI 相关或 FAP 背景。', '多发小息肉', '胃底分布', 'PPI 相关'],
    ['dig-pyloric-obstruction', '幽门梗阻', 'Pyloric Obstruction', '幽门/胃出口', 'obstruction', '上消化道造影 · CT · 内镜', 'high', '梗阻·出口', '胃出口机械性梗阻，造影见大量潴留与狭窄；内镜查病因（溃疡/肿瘤）。', '胃潴留', '出口狭窄', '呕吐宿食'],
    ['dig-gastric-volvulus', '胃扭转', 'Gastric Volvulus', '胃', 'volvulus', '上消化道造影 · CT · 内镜', 'high', '急症·扭转', '胃沿轴扭转致梗阻缺血，造影见双液平/鸟嘴征；CT 评估扭转类型。', '双液平', '鸟嘴征', '突发上腹痛'],
    ['dig-gastric-bezoar', '胃石', 'Gastric Bezoar', '胃', 'obstruction', 'CT · 内镜', 'mid', '梗阻·胃石', '胃内不可消化团块，CT 见胃内混杂密度团；内镜碎石/取出。', '胃内团块', '混杂密度', '进食纤维史'],
    ['dig-duodenal-diverticulum', '十二指肠憩室', 'Duodenal Diverticulum', '十二指肠', 'diverticulum', '上消化道造影 · CT · 内镜', 'low', '憩室·十二指肠', '十二指肠壁外突憩室，钡餐/CT 见囊袋；内镜评估开口与出血。', '囊袋状外突', '钡剂潴留', '偶然发现'],
    ['dig-duodenal-atresia-stomach', '十二指肠闭锁', 'Duodenal Atresia', '十二指肠', 'congenital', '超声 · X线 · 上消化道造影', 'high', '先天·闭锁', '新生儿十二指肠梗阻，腹部 X 线见双泡征；造影确认闭锁水平。', '双泡征', '近端扩张', '胆汁性呕吐']
  ],
  'small-bowel': [
    ['dig-crohn-disease', '克罗恩病', 'Crohn Disease', '小肠/全消化道', 'ibd', 'CT · MR enterography · 内镜', 'mid', 'IBD·克罗恩', '节段性全层炎症，CTE/MRE 见跳跃病变、肠壁增厚与梳状征；内镜+活检。', '跳跃病变', '肠壁增厚', '梳状征'],
    ['dig-intestinal-tb', '肠结核', 'Intestinal TB', '小肠/回盲部', 'infection', 'CT · 内镜 · 活检', 'mid', '结核·肠', '回盲部为主结核，CT 见壁增厚、淋巴结钙化；内镜活检找干酪样肉芽肿。', '回盲部增厚', '淋巴结肿大', '干酪样坏死'],
    ['dig-radiation-enteritis', '放射性肠炎', 'Radiation Enteritis', '小肠', 'injury', 'CT · MR enterography · 内镜', 'mid', '医源性·放疗', '放疗后小肠壁增厚、狭窄与瘘，CTE 见固定节段改变；内镜评估狭窄。', '肠壁增厚', '固定狭窄', '放疗史'],
    ['dig-eosinophilic-gastroenteritis', '嗜酸性胃肠炎', 'Eosinophilic Gastroenteritis', '小肠/胃', 'immune', 'CT · 内镜 · 活检', 'mid', '免疫·嗜酸', '嗜酸性浸润致壁增厚，CT 见靶征/分层强化；内镜活检嗜酸性增多。', '肠壁增厚', '分层强化', '外周嗜酸增多'],
    ['dig-mechanical-obstruction', '机械性肠梗阻', 'Mechanical Bowel Obstruction', '小肠', 'obstruction', 'X线 · CT · 超声', 'high', '急症·梗阻', '肠腔机械性阻塞，X 线见气液平；CT 定位梗阻点与病因。', '气液平', '肠袢扩张', '过渡点'],
    ['dig-paralytic-ileus', '麻痹性肠梗阻', 'Paralytic Ileus', '小肠', 'obstruction', 'X线 · CT', 'mid', '功能性·麻痹', '术后/电解质紊乱致肠蠕动消失，X 线/CT 见弥漫扩张无过渡点。', '弥漫扩张', '无过渡点', '术后/低钾'],
    ['dig-intussusception', '肠套叠', 'Intussusception', '小肠/回盲部', 'obstruction', '超声 · CT · 造影', 'high', '急症·套叠', '肠管套入致梗阻，超声见靶环/假肾征；空气/造影复位或手术。', '靶环征', '假肾征', '阵发性腹痛'],
    ['dig-small-bowel-volvulus', '小肠扭转', 'Small Bowel Volvulus', '小肠', 'volvulus', 'CT · X线', 'high', '急症·扭转', '小肠扭转致闭袢梗阻缺血，CT 见漩涡征与肠壁增厚/无强化。', '漩涡征', '闭袢扩张', '剧烈腹痛'],
    ['dig-smas', '肠系膜上动脉综合征', 'SMA Syndrome', '十二指肠', 'vascular', '上消化道造影 · CT · 内镜', 'mid', '血管·压迫', 'SMA 与主动脉夹角过小压迫十二指肠，造影见近端扩张；CT 测量角度。', '近端扩张', '锐角压迫', '消瘦餐后痛'],
    ['dig-meckel-diverticulum', 'Meckel憩室', 'Meckel Diverticulum', '回肠远端', 'congenital', '核素 · CT · 内镜', 'mid', '先天·憩室', '卵黄管残留憩室，Tc-99m 扫描见异位胃黏膜；CT 见盲端结构。', '异位胃黏膜', '盲端憩室', '下消化道出血'],
    ['dig-gallstone-ileus', '胆石性肠梗阻', 'Gallstone Ileus', '小肠', 'obstruction', 'CT · X线', 'high', '急症·胆石', '胆肠瘘致大结石梗阻，CT 见 Rigler 三联征（胆道气、肠梗阻、异位结石）。', 'Rigler 三联征', '异位结石', '老年女性'],
    ['dig-ischemic-enteropathy', '缺血性肠病', 'Ischemic Enteropathy', '小肠', 'ischemia', 'CT · 血管成像', 'high', '缺血·肠', '肠系膜缺血致肠壁增厚/ pneumatosis，CTA 评估血管闭塞。', '肠壁增厚', '肠 pneumatosis', '乳酸升高'],
    ['dig-mesenteric-ischemia', '肠系膜缺血', 'Mesenteric Ischemia', '小肠/结肠', 'ischemia', 'CTA · CT', 'high', '急症·缺血', 'SMA/SMV 血栓或栓塞，CTA 见充盈缺损；CT 见肠壁强化减低。', '血管充盈缺损', '肠壁强化减低', '代谢性酸中毒'],
    ['dig-small-bowel-adenocarcinoma', '小肠腺癌', 'Small Bowel Adenocarcinoma', '小肠', 'malignant', 'CT · MR enterography · 内镜', 'high', '恶性·小肠', '小肠腺癌，CTE 见肿块/狭窄；胶囊/深部内镜活检。', '肿块狭窄', '肠壁增厚', '梗阻/出血'],
    ['dig-small-bowel-lymphoma', '小肠淋巴瘤', 'Small Bowel Lymphoma', '小肠', 'lymphoma', 'CT · MR enterography · 内镜', 'high', '恶性·淋巴', '小肠淋巴瘤，CT 见壁弥漫增厚或肿块；内镜活检。', '壁弥漫增厚', '肿块', 'B 症状'],
    ['dig-small-bowel-carcinoid', '小肠类癌', 'Small Bowel Carcinoid', '小肠', 'net', 'CT · 核素 · 内镜', 'mid', 'NET·类癌', '小肠神经内分泌肿瘤，CT 见肠壁肿块与肠系膜放射状条索；核素显像。', '肠壁肿块', '系膜条索', '类癌综合征'],
    ['dig-small-bowel-gist', 'GIST', 'Small Bowel GIST', '小肠', 'gist', 'CT · 内镜 · EUS', 'mid', 'GIST·小肠', '小肠间质瘤，增强 CT 见强化壁内/外生肿瘤；内镜/EUS 评估。', '强化肿块', '外生性', '出血倾向']
  ],
  'colorectal-appendix': [
    ['dig-ulcerative-colitis', '溃疡性结肠炎', 'Ulcerative Colitis', '结肠', 'ibd', '结肠镜 · CT', 'mid', 'IBD·溃结', '连续性黏膜炎症自直肠向上，结肠镜见糜烂溃疡；CT 评估并发症。', '连续性炎症', '黏膜糜烂', '里急后重'],
    ['dig-crohn-colitis', '克罗恩结肠炎', 'Crohn Colitis', '结肠', 'ibd', '结肠镜 · CT', 'mid', 'IBD·结肠', '结肠节段性克罗恩，结肠镜见跳跃、纵行溃疡；CT 见壁增厚。', '纵行溃疡', '跳跃病变', '肛周病变'],
    ['dig-ischemic-colitis', '缺血性结肠炎', 'Ischemic Colitis', '结肠', 'ischemia', 'CT · 结肠镜', 'high', '缺血·结肠', '结肠血供不足致黏膜缺血，CT 见节段性壁增厚；结肠镜见苍白/溃疡。', '节段性增厚', '黏膜苍白', '左半结肠'],
    ['dig-pseudomembranous-colitis', '伪膜性肠炎', 'Pseudomembranous Colitis', '结肠', 'infection', 'CT · 结肠镜', 'high', '感染·CDI', '艰难梭菌致伪膜，结肠镜见黄白色伪膜；CT 见结肠壁增厚。', '伪膜', '壁增厚', '抗生素后腹泻'],
    ['dig-diverticulitis', '憩室炎', 'Diverticulitis', '结肠', 'inflammation', 'CT · 结肠镜', 'mid', '炎症·憩室', '憩室穿孔/炎症，CT 见憩室旁脂肪浸润与壁增厚；急性期避免内镜。', '脂肪浸润', '壁增厚', '左下腹痛'],
    ['dig-radiation-proctitis', '放射性直肠炎', 'Radiation Proctitis', '直肠', 'injury', '结肠镜 · MRI', 'mid', '医源性·放疗', '盆腔放疗后直肠黏膜损伤，结肠镜见 telangiectasia/溃疡；MRI 评估纤维化。', 'telangiectasia', '黏膜溃疡', '盆腔放疗史'],
    ['dig-colorectal-cancer', '结直肠癌', 'Colorectal Cancer', '结直肠', 'malignant', 'CT · 结肠镜 · MRI', 'high', '恶性·结直肠', '结肠/直肠腺癌，结肠镜活检；CT/MRI 分期与评估 MS 征。', '肿块/狭窄', '淋巴结肿大', 'Apple core 征'],
    ['dig-colonic-adenoma', '结肠腺瘤性息肉', 'Colonic Adenoma', '结肠', 'polyp', '结肠镜', 'low', '癌前·腺瘤', '腺瘤性息肉，结肠镜见带蒂/广基息肉并切除；病理分级异型增生。', '带蒂息肉', '广基隆起', '筛查发现'],
    ['dig-fap', '家族性腺瘤性息肉病(FAP)', 'FAP', '结肠', 'polyposis', '结肠镜 · CT', 'high', '遗传·息肉病', 'APC 突变致成百上千腺瘤，结肠镜见弥漫息肉；CT 评估 desmoid 等。', '弥漫腺瘤', '数百息肉', 'APC 突变'],
    ['dig-colonic-lipoma', '结肠脂肪瘤', 'Colonic Lipoma', '结肠', 'benign', 'CT · 结肠镜', 'low', '良性·脂肪瘤', '结肠壁脂肪瘤，CT 见脂肪密度（-80~-120 HU）；结肠镜见黄色黏膜下。', '脂肪密度', '黏膜下隆起', '质软'],
    ['dig-appendiceal-mucocele', '阑尾黏液囊肿', 'Appendiceal Mucocele', '阑尾', 'cyst', 'CT · 超声', 'mid', '良性·黏液', '阑尾腔黏液潴留扩张，CT 见囊性阑尾扩张；避免穿刺以防播散。', '囊性扩张', '阑尾增粗', '右下象限包块'],
    ['dig-appendiceal-carcinoid', '阑尾类癌', 'Appendiceal Carcinoid', '阑尾', 'net', 'CT · 病理', 'low', 'NET·阑尾', '阑尾神经内分泌肿瘤，常偶然病理发现；CT 见阑尾增粗/肿块。', '阑尾增粗', '小肿块', '偶然切除'],
    ['dig-acute-appendicitis', '急性阑尾炎', 'Acute Appendicitis', '阑尾', 'infection', '超声 · CT', 'high', '急性·阑尾', '阑尾炎症，超声/CT 见阑尾增粗、周围脂肪浸润；McBurney 点压痛。', '阑尾增粗', '脂肪浸润', '转移性右下腹痛'],
    ['dig-sigmoid-volvulus', '乙状结肠扭转', 'Sigmoid Volvulus', '乙状结肠', 'volvulus', 'X线 · CT · 结肠镜', 'high', '急症·扭转', '乙状结肠扭转致闭袢梗阻，X 线见咖啡豆征；CT 确认；内镜减压。', '咖啡豆征', '闭袢扩张', '腹胀便秘'],
    ['dig-cecal-volvulus', '盲肠扭转', 'Cecal Volvulus', '盲肠', 'volvulus', 'X线 · CT', 'high', '急症·扭转', '盲肠扭转，X 线见扩张盲肠偏离中线；CT 见扭转点。', '扩张盲肠', '偏离中线', '右下腹痛'],
    ['dig-toxic-megacolon', '中毒性巨结肠', 'Toxic Megacolon', '结肠', 'emergency', 'X线 · CT · 结肠镜', 'high', '急症·巨结肠', 'IBD/感染致结肠急性扩张，X 线/CT 见横结肠>6cm；结肠镜慎用。', '结肠扩张', '壁变薄', '中毒表现'],
    ['dig-colorectal-obstruction', '肠梗阻', 'Large Bowel Obstruction', '结直肠', 'obstruction', 'X线 · CT · 结肠镜', 'high', '梗阻·结肠', '结直肠机械性梗阻，CT 定位梗阻点（肿瘤/狭窄）；结肠镜查病因。', '近端扩张', '过渡点', '停止排气排便'],
    ['dig-pneumatosis-cystoides', '肠气囊肿症', 'Pneumatosis Cystoides Intestinalis', '结肠/小肠', 'gas', 'CT · X线', 'mid', '气囊肿·肠', '肠壁/黏膜下含气囊腔，CT 见沿线分布低密度囊；评估缺血/portal venous gas。', '肠壁气囊', 'portal venous gas', '可伴缺血']
  ],
  liver: [
    ['dig-fatty-liver', '脂肪肝', 'Fatty Liver', '肝', 'metabolic', '超声 · CT · MRI', 'low', '代谢·脂肪', '肝细胞脂肪变性，超声/CT/MRI 见肝实质脂肪浸润；MRI 定量评估。', '肝实质低回声', '脂肪浸润', '代谢综合征'],
    ['dig-cirrhosis', '肝硬化', 'Cirrhosis', '肝', 'fibrosis', '超声 · CT · MRI', 'high', '慢性·硬化', '肝纤维化结节化，超声/CT 见表面结节、脾大与侧支；内镜查静脉曲张。', '表面结节', '脾大', '侧支循环'],
    ['dig-portal-hypertension', '门静脉高压', 'Portal Hypertension', '门静脉', 'vascular', '超声 · CT · 内镜', 'high', '门脉·高压', '门静脉压力升高，超声/CT 见脾大、腹水与侧支；内镜评估食管胃静脉曲张。', '脾大', '侧支开放', '静脉曲张'],
    ['dig-hemochromatosis', '血色病', 'Hemochromatosis', '肝', 'metabolic', 'MRI · 活检', 'mid', '遗传·铁沉积', '铁过载致肝/多器官沉积，MRI 见 T2* 减低；肝活检定量铁。', 'T2* 减低', '肝铁沉积', '转铁蛋白饱和度升高'],
    ['dig-wilson-disease', '肝豆状核变性(Wilson病)', 'Wilson Disease', '肝/基底节', 'metabolic', 'MRI · 超声', 'mid', '遗传·铜沉积', '铜代谢障碍，MRI 见基底节异常；超声/CT 评估肝硬化。', '基底节异常', '肝硬化', 'K-F 环'],
    ['dig-budd-chiari', '布加综合征', 'Budd-Chiari Syndrome', '肝静脉', 'vascular', '超声 · CT · MRI', 'high', '血管·肝静脉', '肝静脉流出道阻塞，增强 CT/MRI 见肝静脉血栓与肝淤血；超声 doppler。', '肝静脉血栓', '肝淤血', '腹水'],
    ['dig-portal-vein-thrombosis', '门静脉血栓', 'Portal Vein Thrombosis', '门静脉', 'vascular', '超声 · CT', 'high', '血栓·门脉', '门静脉内血栓，增强 CT 见充盈缺损；超声 doppler 评估血流。', '充盈缺损', '门静脉扩张', '急慢性腹痛'],
    ['dig-hepatic-infarction', '肝梗死', 'Hepatic Infarction', '肝', 'ischemia', 'CT · MRI', 'high', '缺血·梗死', '肝动脉供血区梗死，CT 见楔形低强化区；评估血管栓塞/炎。', '楔形低强化', '肝动脉供血区', '转氨酶升高'],
    ['dig-hepatic-hemangioma', '肝血管瘤', 'Hepatic Hemangioma', '肝', 'benign', '超声 · MRI · CT', 'low', '良性·血管瘤', '肝最常见良性肿瘤，超声高回声；MRI 典型 T2 高信号与渐进强化。', 'T2 高信号', '渐进强化', '边界清'],
    ['dig-hepatic-cyst', '肝囊肿', 'Hepatic Cyst', '肝', 'benign', '超声 · CT · MRI', 'low', '良性·囊肿', '单纯肝囊肿，超声/CT 见水样密度无强化囊；MRI 确认。', '水样密度', '无强化', '偶然发现'],
    ['dig-polycystic-liver', '多囊肝', 'Polycystic Liver Disease', '肝', 'congenital', '超声 · CT · MRI', 'mid', '遗传·多囊', '多发肝囊肿，常伴多囊肾；MRI 评估囊肿负荷。', '多发囊肿', '肝增大', '常伴多囊肾'],
    ['dig-fnh', '肝局灶性结节性增生(FNH)', 'FNH', '肝', 'benign', 'MRI · CT', 'low', '良性·FNH', '中央瘢痕与辐轮状强化，MRI 见 T2 中央瘢痕；增强动脉期均匀强化。', '中央瘢痕', '辐轮状强化', '年轻女性'],
    ['dig-hepatic-adenoma', '肝细胞腺瘤', 'Hepatic Adenoma', '肝', 'benign', 'MRI · CT', 'mid', '良性·腺瘤', '口服避孕药相关，MRI 见异质性强化；有出血/恶变风险。', '异质性强化', '出血', '停药随访'],
    ['dig-hepatic-abscess', '肝脓肿', 'Hepatic Abscess', '肝', 'infection', '超声 · CT', 'high', '急性·脓肿', '细菌性/阿米巴肝脓肿，CT 见环形强化低密度灶；超声引导穿刺。', '环形强化', '低密度灶', '发热右上腹痛'],
    ['dig-hepatic-echinococcosis', '肝包虫病', 'Hepatic Echinococcosis', '肝', 'parasite', '超声 · CT · MRI', 'mid', '寄生虫·包虫', '棘球蚴囊性病变，CT 见囊壁钙化与 daughter cyst；超声水纹征。', '囊壁钙化', 'daughter cyst', '流行区接触'],
    ['dig-hepatic-tb', '肝结核', 'Hepatic TB', '肝', 'infection', 'CT · 超声', 'mid', '结核·肝', '肝结核结节/脓肿，CT 见低密度灶伴钙化；结合肺结核与免疫。', '低密度灶', '钙化', '结核接触史'],
    ['dig-hcc', '肝细胞癌(HCC)', 'HCC', '肝', 'malignant', 'CT · MRI · 超声', 'high', '恶性·HCC', '肝硬化背景肝细胞癌，LI-RADS 评估；增强 MRI/CT 动脉期强化洗脱。', '动脉期强化', '洗脱', '肝硬化背景'],
    ['dig-cholangiocarcinoma', '肝内胆管细胞癌', 'Intrahepatic Cholangiocarcinoma', '肝内胆管', 'malignant', 'CT · MRI · PET-CT', 'high', '恶性·胆管', '肝内胆管癌，增强 CT/MRI 见延迟强化肿块；CA19-9 升高。', '延迟强化', '胆管扩张', 'CA19-9 升高'],
    ['dig-hepatic-metastasis', '肝转移瘤', 'Hepatic Metastases', '肝', 'metastasis', 'CT · MRI · PET-CT', 'high', '转移·多发', '多发肝转移，CT 见牛眼征/靶征；PET-CT 分期。', '多发低密度', '牛眼征', '原发肿瘤史'],
    ['dig-hepatoblastoma', '肝母细胞瘤', 'Hepatoblastoma', '肝', 'malignant', '超声 · CT · MRI', 'high', '恶性·儿童', '儿童肝恶性肿瘤，CT 见大块肝内肿块；AFP 显著升高。', '肝内大肿块', 'AFP 升高', '儿童'],
    ['dig-hepatic-angiosarcoma', '肝血管肉瘤', 'Hepatic Angiosarcoma', '肝', 'malignant', 'CT · MRI', 'high', '恶性·血管', '高度恶性血管源性肿瘤，CT 见多发出血坏死肿块；氯乙烯/ Thorotrast 暴露。', '出血坏死', '多发肿块', '预后极差']
  ],
  biliary: [
    ['dig-cholelithiasis', '胆囊结石', 'Cholelithiasis', '胆囊', 'stone', '超声 · CT', 'mid', '结石·胆囊', '胆囊内结石，超声见强回声伴声影；CT 见高密度结石。', '强回声声影', '高密度结石', '胆绞痛'],
    ['dig-acute-cholecystitis', '急性胆囊炎', 'Acute Cholecystitis', '胆囊', 'infection', '超声 · CT · 内镜', 'high', '急性·胆囊', '胆囊急性炎症，超声见壁增厚、周围积液；CT 评估并发症。', '壁增厚', '周围积液', 'Murphy 征阳性'],
    ['dig-chronic-cholecystitis', '慢性胆囊炎', 'Chronic Cholecystitis', '胆囊', 'inflammation', '超声 · CT', 'low', '慢性·胆囊', '反复炎症致壁增厚纤维化，超声见胆囊萎缩/壁厚；常伴结石。', '壁增厚', '胆囊萎缩', '反复右上腹痛'],
    ['dig-emphysematous-cholecystitis', '气肿性胆囊炎', 'Emphysematous Cholecystitis', '胆囊', 'infection', 'CT · 超声', 'high', '急症·气肿', '产气菌感染致胆囊/壁内气体，CT 见胆囊内气体；糖尿病高危。', '胆囊内气体', '壁内气体', '糖尿病'],
    ['dig-choledocholithiasis', '胆总管结石', 'Choledocholithiasis', '胆总管', 'stone', '超声 · MRCP · ERCP', 'high', '结石·胆总管', '胆总管结石致梗阻，MRCP/ERCP 见充盈缺损；超声见胆管扩张。', '充盈缺损', '胆管扩张', '黄疸'],
    ['dig-cholangitis', '急性化脓性胆管炎', 'Acute Cholangitis', '胆管', 'infection', '超声 · CT · ERCP', 'high', '急症·胆管炎', '胆管感染梗阻，超声/CT 见胆管扩张；ERCP 减压引流。', '胆管扩张', '壁增厚', 'Charcot 三联征'],
    ['dig-gb-empyema', '胆囊积脓', 'Gallbladder Empyema', '胆囊', 'infection', '超声 · CT', 'high', '化脓·积脓', '胆囊内脓液潴留，超声/CT 见胆囊扩张伴浑浊内容；需紧急引流/切除。', '胆囊扩张', '浑浊内容', '持续发热'],
    ['dig-gallbladder-polyp', '胆囊息肉', 'Gallbladder Polyp', '胆囊', 'polyp', '超声 · CT', 'low', '良性·息肉', '胆囊黏膜息肉样隆起，超声随访大小；>1cm 或增大考虑切除。', '息肉样隆起', '无声影', '随访大小'],
    ['dig-adenomyomatosis', '胆囊腺肌症', 'Adenomyomatosis', '胆囊', 'benign', '超声 · MRI', 'low', '良性·腺肌', 'Rokitansky-Aschoff 窦，超声见彗星尾/壁增厚；MRI 确认。', '彗星尾征', '壁增厚', 'R-A 窦'],
    ['dig-psc', '原发性硬化性胆管炎', 'PSC', '胆管', 'immune', 'MRCP · 内镜', 'mid', '免疫·PSC', '胆管进行性纤维化狭窄，MRCP 见串珠样狭窄；ERCP 活检/测压。', '串珠样狭窄', '胆管不规则', 'IBD 伴发'],
    ['dig-mirizzi', 'Mirizzi综合征', 'Mirizzi Syndrome', '胆囊/肝总管', 'obstruction', 'CT · MRCP · ERCP', 'high', '梗阻·Mirizzi', '胆囊颈大结石压迫肝总管，MRCP 见外压性狭窄；ERCP 鉴别肿瘤。', '外压性狭窄', '胆囊颈结石', '黄疸'],
    ['dig-gallbladder-cancer', '胆囊癌', 'Gallbladder Cancer', '胆囊', 'malignant', 'CT · MRI · PET-CT', 'high', '恶性·胆囊', '胆囊恶性肿瘤，增强 CT 见壁不规则增厚/肿块；常晚期发现。', '壁增厚肿块', '淋巴结肿大', '长期结石'],
    ['dig-cholangiocarcinoma-extra', '胆管癌(肝门部/远端)', 'Cholangiocarcinoma', '胆管', 'malignant', 'MRCP · CT · ERCP', 'high', '恶性·胆管', 'Klatskin/远端胆管癌，MRCP 见胆管截断；ERCP 刷检/支架。', '胆管截断', '延迟强化', 'CA19-9 升高'],
    ['dig-periampullary-cancer', '壶腹周围癌', 'Periampullary Cancer', '壶腹周围', 'malignant', 'CT · MRCP · ERCP · 内镜', 'high', '恶性·壶腹', '壶腹/胰头/远端胆管癌，增强 CT/MRCP 评估；内镜活检。', '壶腹肿块', '胆管胰管扩张', '无痛黄疸'],
    ['dig-choledochal-cyst', '先天性胆管囊肿', 'Choledochal Cyst', '胆管', 'congenital', 'MRCP · 超声 · CT', 'mid', '先天·囊肿', '胆管囊性扩张 Todani 分型，MRCP 金标准；评估恶变风险。', '胆管囊性扩张', 'MRCP 分型', '儿童/青年'],
    ['dig-caroli', 'Caroli病', 'Caroli Disease', '肝内胆管', 'congenital', 'MRCP · CT', 'mid', '先天·Caroli', '肝内胆管囊性扩张，MRCP 见 central dot sign；常伴 ARPKD。', 'central dot sign', '囊性扩张', '肝纤维化'],
    ['dig-biliary-atresia', '胆道闭锁', 'Biliary Atresia', '肝外胆管', 'congenital', '超声 · 核素 · 手术', 'high', '先天·闭锁', '新生儿肝外胆管闭锁，超声见三角核征/无胆囊；核素排泄扫描。', '三角核征', '无胆囊', '持续性黄疸']
  ],
  pancreas: [
    ['dig-acute-pancreatitis', '急性胰腺炎', 'Acute Pancreatitis', '胰腺', 'inflammation', 'CT · 超声 · MRI', 'high', '急性·胰腺', '胰腺急性炎症，增强 CT 见胰腺肿大、周围渗出；Balthazar 评分。', '胰腺肿大', '周围渗出', '淀粉酶升高'],
    ['dig-chronic-pancreatitis', '慢性胰腺炎', 'Chronic Pancreatitis', '胰腺', 'inflammation', 'CT · MRCP · 内镜', 'mid', '慢性·胰腺', '胰腺纤维化与钙化，CT 见钙化/胰管扩张；MRCP/EUS 评估。', '胰腺钙化', '胰管扩张', '反复腹痛'],
    ['dig-autoimmune-pancreatitis', '自身免疫性胰腺炎', 'Autoimmune Pancreatitis', '胰腺', 'immune', 'CT · MRCP · 内镜', 'mid', '免疫·AIP', 'IgG4 相关胰腺弥漫肿大，CT 见腊肠样；ERCP/EUS 活检。', '腊肠样肿大', '延迟强化', 'IgG4 升高'],
    ['dig-groove-pancreatitis', '沟槽状胰腺炎', 'Groove Pancreatitis', '胰头沟', 'inflammation', 'CT · MRCP', 'mid', '慢性·沟槽', '胰头沟/十二指肠壁炎症，CT 见沟槽区假肿块；与胰头癌鉴别。', '沟槽假肿块', '十二指肠壁增厚', '酗酒史'],
    ['dig-pancreatic-pseudocyst', '胰腺假性囊肿', 'Pancreatic Pseudocyst', '胰腺', 'cyst', 'CT · 超声 · 内镜', 'mid', '并发症·假囊', '胰腺炎后纤维包裹积液，CT 见无上皮囊腔；EUS 引流。', '无强化囊腔', '纤维壁', '胰腺炎后'],
    ['dig-serous-cystadenoma', '浆液性囊腺瘤', 'Serous Cystadenoma', '胰腺', 'benign', 'CT · MRI · EUS', 'low', '良性·浆液', '微囊/寡囊良性肿瘤，CT 见蜂巢样；MRI 无实性成分。', '蜂巢样', '微囊', '老年女性'],
    ['dig-mucinous-cystadenoma', '黏液性囊腺瘤', 'Mucinous Cystadenoma', '胰腺', 'benign', 'CT · MRI · EUS', 'mid', '良性·黏液', '单囊/分隔囊伴黏液，MRI 见囊内黏液；EUS 穿刺 CEA。', '分隔囊', '囊内黏液', '恶变潜能'],
    ['dig-ipmn', '导管内乳头状黏液性肿瘤(IPMN)', 'IPMN', '胰管', 'premalignant', 'MRCP · CT · 内镜', 'mid', '癌前·IPMN', '胰管黏液性肿瘤，MRCP 见胰管扩张与充盈缺损；EUS 监测。', '胰管扩张', '充盈缺损', '主/分支型'],
    ['dig-spn', '实性假乳头状瘤(SPN)', 'SPN', '胰腺', 'tumor', 'CT · MRI', 'mid', '低度·SPN', '年轻女性常见，CT 见大囊实性肿块伴出血；完整切除预后好。', '囊实性肿块', '出血', '年轻女性'],
    ['dig-pancreatic-adenocarcinoma', '胰腺导管腺癌', 'Pancreatic Ductal Adenocarcinoma', '胰腺', 'malignant', 'CT · MRI · EUS', 'high', '恶性·胰癌', '胰头/体尾腺癌，增强 CT 见低密度肿块伴双管征；EUS 活检。', '低密度肿块', '双管征', 'CA19-9 升高'],
    ['dig-pancreatic-net', '胰腺神经内分泌肿瘤', 'Pancreatic NET', '胰腺', 'net', 'CT · MRI · 核素', 'mid', 'NET·胰腺', '胰腺神经内分泌肿瘤，增强 CT 明显强化；核素显像功能型。', '明显强化', '边界清', '激素综合征'],
    ['dig-pancreatic-metastasis', '胰腺转移瘤', 'Pancreatic Metastases', '胰腺', 'metastasis', 'CT · MRI', 'high', '转移·胰腺', '肾癌/黑色素瘤等转移，CT 见多发强化结节；原发史。', '多发结节', '强化', '原发肿瘤史'],
    ['dig-pancreas-divisum', '胰腺分裂', 'Pancreas Divisum', '胰管', 'congenital', 'MRCP · ERCP', 'low', '先天·分裂', '背胰与腹胰管未融合，MRCP 见 Santorini 管引流为主；ERCP 确诊。', 'Santorini 引流', '背胰管短', '复发性胰腺炎'],
    ['dig-annular-pancreas', '环状胰腺', 'Annular Pancreas', '十二指肠', 'congenital', '上消化道造影 · CT · MRCP', 'mid', '先天·环状', '胰腺组织环绕十二指肠，造影见双轨征；CT/MRCP 确认。', '双轨征', '十二指肠狭窄', '新生儿呕吐']
  ],
  spleen: [
    ['dig-splenomegaly', '脾肿大', 'Splenomegaly', '脾', 'enlargement', '超声 · CT · MRI', 'mid', '体征·脾大', '脾体积增大，超声/CT 测量长径；评估门脉高压/血液病/感染。', '脾体积增大', '长径>12cm', '全血细胞减少'],
    ['dig-splenic-infarction', '脾梗死', 'Splenic Infarction', '脾', 'ischemia', 'CT · 超声', 'mid', '缺血·梗死', '脾动脉供血区楔形低强化，增强 CT 典型；超声见低回声楔形体。', '楔形低强化', '低回声区', '左上腹痛'],
    ['dig-splenic-rupture', '脾破裂', 'Splenic Rupture', '脾', 'trauma', 'CT · 超声 · FAST', 'high', '急症·破裂', '脾实质撕裂伴腹腔积血，增强 CT/FAST 见脾周血肿；分级指导治疗。', '脾周血肿', '实质撕裂', '左肩痛'],
    ['dig-splenic-cyst', '脾囊肿', 'Splenic Cyst', '脾', 'benign', '超声 · CT · MRI', 'low', '良性·囊肿', '脾内水样囊性病变，超声/CT 无强化；MRI 确认。', '水样密度', '无强化', '偶然发现'],
    ['dig-splenic-hemangioma', '脾血管瘤', 'Splenic Hemangioma', '脾', 'benign', '超声 · CT · MRI', 'low', '良性·血管瘤', '脾最常见良性肿瘤，增强 CT 渐进/均匀强化；MRI T2 高信号。', '渐进强化', 'T2 高信号', '边界清'],
    ['dig-splenic-hamartoma', '脾错构瘤', 'Splenic Hamartoma', '脾', 'benign', 'CT · MRI', 'low', '良性·错构', '脾红/白髓混合错构，增强 CT 见均质强化结节；与淋巴瘤鉴别。', '均质强化', '边界清', '偶然发现'],
    ['dig-splenic-lymphoma', '脾淋巴瘤', 'Splenic Lymphoma', '脾', 'lymphoma', 'CT · PET-CT', 'high', '恶性·淋巴', '脾弥漫/结节性淋巴瘤，CT 见脾大或低密度结节；PET 高摄取。', '脾大', '低密度结节', 'B 症状'],
    ['dig-splenic-metastasis', '脾转移瘤', 'Splenic Metastases', '脾', 'metastasis', 'CT · MRI', 'high', '转移·脾', '脾转移相对少见，CT 见多发低强化结节；黑色素瘤/卵巢癌等。', '多发低强化', '脾大', '原发肿瘤史'],
    ['dig-accessory-spleen', '副脾', 'Accessory Spleen', '脾', 'congenital', 'CT · 核素 · 超声', 'low', '先天·副脾', '异位脾组织，增强 CT 与脾同步强化；核素扫描摄取。', '同步强化', '脾门/胰尾', '与淋巴结鉴别'],
    ['dig-splenic-abscess', '脾脓肿', 'Splenic Abscess', '脾', 'infection', 'CT · 超声', 'high', '急性·脓肿', '脾内化脓，CT 见环形强化低密度；超声引导穿刺。', '环形强化', '低密度灶', '发热左上腹痛']
  ],
  peritoneum: [
    ['dig-peritonitis', '腹膜炎', 'Peritonitis', '腹膜', 'infection', 'CT · 超声 · X线', 'high', '急症·腹膜炎', '腹膜急性炎症，CT 见游离气体/积液与壁增厚；超声评估积液。', '游离气体', '腹腔积液', '板状腹'],
    ['dig-tb-peritonitis', '结核性腹膜炎', 'Tuberculous Peritonitis', '腹膜', 'infection', 'CT · 超声 · 腹腔镜', 'mid', '结核·腹膜', '腹膜结核，CT 见腹膜增厚、大网膜饼及 ascites；腹腔镜活检。', '腹膜增厚', '大网膜饼', '低热腹水'],
    ['dig-ascites', '腹水', 'Ascites', '腹腔', 'fluid', '超声 · CT', 'mid', '体征·腹水', '腹腔游离液体，超声定量与引导穿刺；CT 查病因（肝硬化/肿瘤）。', '游离液体', '液平', '移动性浊音'],
    ['dig-peritoneal-carcinomatosis', '腹膜转移癌', 'Peritoneal Carcinomatosis', '腹膜', 'metastasis', 'CT · PET-CT · 腹腔镜', 'high', '转移·腹膜', '腹膜种植转移，CT 见大网膜结节/饼及 ascites；PET 评估范围。', '大网膜结节', '腹膜增厚', '原发 GI/卵巢'],
    ['dig-pseudomyxoma', '腹膜假黏液瘤', 'Pseudomyxoma Peritonei', '腹膜', 'tumor', 'CT · MRI', 'high', '肿瘤·黏液', '阑尾/卵巢黏液肿瘤腹膜播散，CT 见低密度 ascites 与分隔。', '低密度 ascites', '分隔', '果冻样腹水'],
    ['dig-mesenteric-panniculitis', '肠系膜脂膜炎', 'Mesenteric Panniculitis', '肠系膜', 'inflammation', 'CT · MRI', 'low', '慢性·脂膜炎', '肠系膜脂肪浸润与假包膜，CT 见脂肪密度内血管束与假包膜。', '脂肪浸润', '假包膜', '血管束'],
    ['dig-mesenteric-cyst', '肠系膜囊肿', 'Mesenteric Cyst', '肠系膜', 'cyst', 'CT · 超声 · MRI', 'low', '良性·囊肿', '肠系膜水样囊，CT/MRI 无强化；与淋巴管瘤鉴别。', '水样囊', '无强化', '偶然发现'],
    ['dig-omental-infarction', '网膜梗死', 'Omental Infarction', '网膜', 'ischemia', 'CT · 超声', 'mid', '缺血·网膜', '网膜扭转/梗死，CT 见饼状脂肪密度伴周围浸润。', '饼状脂肪密度', '周围浸润', '右下腹痛'],
    ['dig-retroperitoneal-fibrosis', '腹膜后纤维化', 'Retroperitoneal Fibrosis', '腹膜后', 'fibrosis', 'CT · MRI', 'mid', '慢性·纤维化', '腹膜后纤维组织包绕主动脉/输尿管，CT 见软组织包绕；IgG4 相关。', '软组织包绕', '输尿管扩张', '少尿/肾积水'],
    ['dig-retroperitoneal-tumor', '腹膜后肿瘤(脂肪肉瘤/平滑肌肉瘤)', 'Retroperitoneal Sarcoma', '腹膜后', 'malignant', 'CT · MRI · PET-CT', 'high', '恶性·肉瘤', '腹膜后脂肪/平滑肌肉瘤等，CT 见巨大异质性肿块；MRI 评估侵犯。', '巨大肿块', '异质性', '占满后腹膜']
  ],
  'vascular-acute': [
    ['dig-gi-perforation', '消化道穿孔(气腹)', 'GI Perforation', '腹腔', 'emergency', 'X线 · CT', 'high', '急症·穿孔', '空腔脏器穿孔致游离气腹，立位片/CT 见膈下游离气体；定位穿孔源。', '游离气腹', '膈下气体', '突发剧痛'],
    ['dig-sma-embolism', '肠系膜动脉栓塞', 'SMA Embolism', '肠系膜动脉', 'emergency', 'CTA · CT', 'high', '急症·栓塞', 'SMA 栓塞致肠缺血，CTA 见充盈缺损；CT 见肠壁强化减低。', '充盈缺损', '肠壁强化减低', '房颤史'],
    ['dig-smv-thrombosis', '肠系膜静脉血栓', 'SMV Thrombosis', '肠系膜静脉', 'emergency', 'CT · CTA', 'high', '血栓·SMV', 'SMV 血栓致肠充血水肿，增强 CT 见 vein 充盈缺损与肠壁增厚。', '静脉充盈缺损', '肠壁增厚', '高凝/门脉高压'],
    ['dig-ischemic-bowel-necrosis', '缺血性肠坏死', 'Ischemic Bowel Necrosis', '小肠/结肠', 'emergency', 'CT · CTA', 'high', '急症·坏死', '肠缺血进展至坏死/穿孔，CT 见 pneumatosis、portal venous gas。', 'pneumatosis', 'portal venous gas', '乳酸酸中毒'],
    ['dig-abdominal-aortic-aneurysm', '腹主动脉瘤', 'Abdominal Aortic Aneurysm', '腹主动脉', 'vascular', '超声 · CTA · MRI', 'high', '血管·AAA', '腹主动脉扩张>3cm，CTA 测量径线与破裂征；超声筛查。', '主动脉扩张', '附壁血栓', '搏动性包块'],
    ['dig-internal-hernia', '内疝', 'Internal Hernia', '腹腔', 'hernia', 'CT', 'high', '急症·内疝', '肠袢通过内疝环致梗阻缺血，CT 见闭袢与 mesenteric 血管 swirl。', '闭袢梗阻', 'swirl 征', '术后/先天'],
    ['dig-external-hernia', '腹外疝(腹股沟疝/股疝/脐疝/切口疝)', 'External Hernia', '腹壁', 'hernia', '超声 · CT', 'mid', '疝·腹外', '腹壁缺损致肠/脂肪疝出，超声/CT 见疝囊与内容物；嵌顿评估。', '疝囊', '内容物', '可复性包块']
  ],
  anorectal: [
    ['dig-anal-fistula', '肛瘘', 'Anal Fistula', '肛管', 'fistula', 'MRI · 超声 · 内镜', 'mid', '慢性·瘘管', '肛周瘘管，MRI/超声评估 Parks 分型与括约肌关系；直肠镜查内口。', '瘘管轨迹', '内口', '反复流脓'],
    ['dig-perianal-abscess', '肛周脓肿', 'Perianal Abscess', '肛周', 'infection', '超声 · MRI · CT', 'high', '急性·脓肿', '肛周间隙化脓，超声/MRI 见液性区；切开引流。', '液性区', '周围浸润', '肿痛发热'],
    ['dig-rectal-prolapse', '直肠脱垂', 'Rectal Prolapse', '直肠', 'prolapse', '排粪造影 · MRI · 结肠镜', 'mid', '脱垂·直肠', '直肠全层/黏膜脱垂，排粪造影/MRI 动态评估；结肠镜排除肿瘤。', '直肠脱出', '排粪造影', '排便后脱出'],
    ['dig-rectal-cancer', '直肠癌', 'Rectal Cancer', '直肠', 'malignant', 'MRI · 结肠镜 · CT', 'high', '恶性·直肠', '直肠腺癌，MRI 评估 mesorectal fascia 与分期；结肠镜活检。', '壁增厚肿块', 'mesorectal 侵犯', '里急后重'],
    ['dig-anal-cancer', '肛管癌', 'Anal Cancer', '肛管', 'malignant', 'MRI · 结肠镜 · PET-CT', 'high', '恶性·肛管', '鳞癌为主，MRI 评估括约肌侵犯；结肠镜/活检。', '肛管肿块', '淋巴结肿大', 'HPV 相关'],
    ['dig-pilonidal-sinus', '藏毛窦', 'Pilonidal Sinus', '骶尾部', 'infection', '超声 · MRI', 'low', '慢性·藏毛', '骶尾沟毛发嵌入致窦道/脓肿，MRI 见窦道轨迹；与肛瘘鉴别。', '窦道', '毛发嵌入', '青年男性']
  ],
  'abdominal-wall': [
    ['dig-abdominal-wall-hernia', '腹壁疝', 'Abdominal Wall Hernia', '腹壁', 'hernia', '超声 · CT', 'mid', '疝·腹壁', '腹壁薄弱区疝出，超声/CT 见缺损与疝囊；评估嵌顿。', '腹壁缺损', '疝囊', '可复性隆起'],
    ['dig-rectus-hematoma', '腹直肌血肿', 'Rectus Sheath Hematoma', '腹直肌', 'hematoma', '超声 · CT', 'mid', '出血·血肿', '腹直肌鞘内出血，CT 见梭形血肿不跨越中线；抗凝相关。', '梭形血肿', '不跨中线', '抗凝史'],
    ['dig-diaphragmatic-hernia', '膈疝(Bochdalek/Morgagni)', 'Diaphragmatic Hernia', '膈', 'hernia', 'X线 · CT', 'mid', '先天·膈疝', 'Bochdalek/Morgagni 膈缺损，CT 见腹腔内容物疝入胸腔。', '膈缺损', '胸腔内肠袢', '新生儿/成人'],
    ['dig-traumatic-diaphragmatic-hernia', '创伤性膈疝', 'Traumatic Diaphragmatic Hernia', '膈', 'trauma', 'CT · X线', 'high', '创伤·膈疝', '钝/穿透伤致膈破裂，CT 见膈连续中断与疝入内容物。', '膈中断', '疝入内容', '创伤史']
  ],
  'congenital-ped': [
    ['dig-esophageal-atresia-tef', '食管闭锁与气管食管瘘', 'Esophageal Atresia with TEF', '食管/气管', 'congenital', 'X线 · 造影', 'high', '先天·闭锁', '新生儿食管闭锁伴 TEF，胸片见鼻胃管卷曲；造影确认瘘口。', '鼻胃管卷曲', 'TEF', '泡沫样分泌物'],
    ['dig-congenital-hps', '肥厚性幽门狭窄', 'Hypertrophic Pyloric Stenosis', '幽门', 'congenital', '超声 · 上消化道造影', 'high', '先天·幽门', '幽门环肌肥厚致梗阻，婴儿多见；超声见靶环/肌厚>3mm，造影见线形狭窄。', '肌厚>3mm', '靶环征', '喷射性呕吐'],
    ['dig-intestinal-malrotation', '肠旋转不良', 'Intestinal Malrotation', '小肠', 'congenital', '上消化道造影 · CT', 'high', '先天·旋转', '中肠旋转异常，造影见十二指肠位置异常；CT 见 SMA/SMV 关系倒置。', 'SMA/SMV 倒置', '十二指肠异常', '新生儿'],
    ['dig-midgut-volvulus', '中肠扭转', 'Midgut Volvulus', '小肠', 'congenital', '上消化道造影 · CT · 超声', 'high', '急症·扭转', '旋转不良基础上扭转，CT 见 whirl 征；需紧急手术。', 'whirl 征', '闭袢', '胆汁性呕吐'],
    ['dig-duodenal-atresia-ped', '十二指肠闭锁', 'Duodenal Atresia (Pediatric)', '十二指肠', 'congenital', '超声 · X线 · 造影', 'high', '先天·闭锁', '胎儿/新生儿双泡征，超声产前诊断；造影确认水平。', '双泡征', '产前超声', 'Down 关联'],
    ['dig-hirschsprung', '先天性巨结肠(Hirschsprung病)', 'Hirschsprung Disease', '结肠', 'congenital', '造影 · 活检', 'high', '先天·巨结肠', '远端无 ganglion 细胞致功能性梗阻，造影见狭窄-扩张过渡；直肠活检。', '狭窄-扩张', '过渡区', '延迟胎便'],
    ['dig-anal-atresia', '肛门闭锁', 'Anal Atresia', '肛门', 'congenital', 'X线 · 超声 · MRI', 'high', '先天·闭锁', '肛门直肠发育畸形，倒置位片测 fistula 距离；MRI 评估 fistula。', '直肠盲端', 'fistula 距离', '无肛门开口'],
    ['dig-nec', '坏死性小肠结肠炎', 'Necrotizing Enterocolitis', '小肠/结肠', 'congenital', 'X线 · 超声 · CT', 'high', '急症·NEC', '早产儿肠壁坏死，X 线见 pneumatosis 与 portal venous gas。', 'pneumatosis', 'portal venous gas', '早产儿'],
    ['dig-biliary-atresia-ped', '胆道闭锁', 'Biliary Atresia (Pediatric)', '肝外胆管', 'congenital', '超声 · 核素 · 手术', 'high', '先天·闭锁', '新生儿持续性黄疸，超声三角核征；核素无排泄需 Kasai。', '三角核征', '核素无排泄', '持续性黄疸'],
  ],
  'infection-parasite': [
    ['dig-amebic-liver-abscess', '阿米巴肝脓肿', 'Amebic Liver Abscess', '肝', 'parasite', '超声 · CT', 'high', '寄生虫·阿米巴', '溶组织阿米巴肝脓肿，CT 见单发右叶低密度；血清学+流行病学。', '右叶低密度', '环形强化', '旅行/暴露史'],
    ['dig-schistosomiasis', '血吸虫病(肝/肠)', 'Schistosomiasis', '肝/肠', 'parasite', '超声 · CT · 结肠镜', 'mid', '寄生虫·血吸虫', '血吸虫卵沉积致肝纤维化/肠壁增厚，CT 见管道钙化；结肠镜见息肉样。', '管道钙化', '肝纤维化', '疫水接触'],
    ['dig-clonorchiasis', '华支睾吸虫病', 'Clonorchiasis', '肝胆', 'parasite', '超声 · CT · ERCP', 'mid', '寄生虫·吸虫', '华支睾吸虫致胆管扩张与炎症，CT/MRCP 见肝内胆管扩张；生食鱼史。', '肝内胆管扩张', '胆管炎症', '生食淡水鱼'],
    ['dig-abdominal-tuberculosis', '腹腔结核', 'Abdominal Tuberculosis', '腹腔', 'infection', 'CT · 腹腔镜 · 超声', 'mid', '结核·腹腔', '腹膜/淋巴结/肠道结核综合表现，CT 见 ascites、淋巴结与 omental 增厚；腹腔镜活检。', 'ascites', '淋巴结肿大', '腹膜增厚']
  ],
  'trauma-iatrogenic': [
    ['dig-hepatic-laceration', '肝挫裂伤', 'Hepatic Laceration', '肝', 'trauma', 'CT · FAST · 超声', 'high', '创伤·肝', '钝/穿透伤致肝裂伤，增强 CT AAST 分级；FAST 床旁评估。', '肝裂伤', '肝周血肿', '右季肋痛'],
    ['dig-pancreatic-trauma', '胰腺创伤', 'Pancreatic Trauma', '胰腺', 'trauma', 'CT · MRCP', 'high', '创伤·胰腺', '胰腺钝性/穿透伤，增强 CT 见胰管断裂与周围 fluid；MRCP 评估胰管。', '胰管断裂', '周围积液', '安全带征'],
    ['dig-anastomotic-leak', '术后吻合口瘘', 'Anastomotic Leak', '吻合口', 'iatrogenic', 'CT · 造影 · 内镜', 'high', '医源性·瘘', 'GI 术后吻合口漏，CT 见对比剂外渗/周围积液；内镜评估。', '对比剂外渗', '周围积液', '术后发热'],
    ['dig-postop-bile-leak', '术后胆漏', 'Postoperative Bile Leak', '胆道', 'iatrogenic', '超声 · CT · MRCP', 'high', '医源性·胆漏', '胆道术后胆汁漏，MRCP/核素示踪定位；经皮/内镜引流。', '胆汁积聚', 'MRCP 定位', '胆红素升高']
  ]
};

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function rowToArray(navGroup, d) {
  return [navGroup, ...d];
}

function formatRow(row) {
  const items = row.map(v => `'${esc(v)}'`);
  return `  [${items.join(', ')}]`;
}

function buildOutput(rows) {
  const groupLines = Object.entries(DIGESTIVE_NAV_GROUPS)
    .map(([k, v]) => `  '${k}': { label: '${esc(v.label)}', icon: '', desc: '${esc(v.desc)}' }`)
    .join(',\n');
  const orderLine = DIGESTIVE_NAV_ORDER.map(k => `'${k}'`).join(', ');
  const rowLines = rows.map(formatRow).join(',\n');
  return `/** 消化系统 · 16 类导航 + 疾病目录（无图库） — 由 scripts/generate-digestive-catalog.mjs 生成 */
export const DIGESTIVE_NAV_GROUPS = {
${groupLines}
};

export const DIGESTIVE_NAV_ORDER = [
  ${orderLine}
];

/** [navGroup, type, title, sub, region, subcat, mod, sev, sevtext, desc, ...signs] */
export const DIGESTIVE_DISEASE_ROWS = [
${rowLines}
];
`;
}

function validate(rows) {
  const types = new Set();
  for (const row of rows) {
    const [, type, title] = row;
    if (!type.startsWith('dig-')) throw new Error(`type must have dig- prefix: ${type}`);
    if (types.has(type)) throw new Error(`duplicate type: ${type}`);
    types.add(type);
    if (row.length < 12) throw new Error(`row needs 2-3 signs: ${title}`);
  }
  if (rows.length < 185 || rows.length > 195) throw new Error(`expected ~190 diseases, got ${rows.length}`);
}

let allRows = [];
for (const nav of DIGESTIVE_NAV_ORDER) {
  const list = DISEASES[nav];
  if (!list) throw new Error(`missing diseases for ${nav}`);
  allRows.push(...list.map(d => rowToArray(nav, d)));
}

validate(allRows);
fs.writeFileSync(outPath, buildOutput(allRows), 'utf8');
console.log('generate-digestive-catalog done');
console.log('  path:', outPath);
console.log('  nav groups:', DIGESTIVE_NAV_ORDER.length);
console.log('  diseases:', allRows.length);

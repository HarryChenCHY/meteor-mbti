export const QUIZ_TOPICS = [
  { id: 'solar-system', name: '太阳系', icon: '☀️', skin: 'flame', skinName: '烈焰陨石', skinColor: '#ff6b35' },
  { id: 'stellar-evolution', name: '恒星演化', icon: '⭐', skin: 'stellar', skinName: '星核陨石', skinColor: '#ffd700' },
  { id: 'galaxy-universe', name: '星系与宇宙', icon: '🌌', skin: 'deep', skinName: '深空陨石', skinColor: '#4a9eff' },
  { id: 'space-exploration', name: '航天探索史', icon: '🚀', skin: 'pioneer', skinName: '先驱陨石', skinColor: '#a8ff78' },
  { id: 'astronomical-observation', name: '天文观测', icon: '🔭', skin: 'crystal', skinName: '晶眸陨石', skinColor: '#e0c3fc' },
  { id: 'astrophysics', name: '宇宙物理', icon: '⚛️', skin: 'quantum', skinName: '量子陨石', skinColor: '#ff9a9e' },
];

export const DIFFICULTIES = [
  { key: 'easy', name: '初级', pass: 9, total: 12 },
  { key: 'medium', name: '中级', pass: 9, total: 12 },
  { key: 'hard', name: '高级', pass: 9, total: 12 },
];

export const QUIZ_QUESTIONS = [
  // ============ 太阳系 - 初级 ============
  { id: 'ss-easy-001', topic: 'solar-system', difficulty: 'easy', q: '太阳系中最大的行星是？', opts: ['土星', '木星', '天王星', '海王星'], ans: 1, explanation: '木星是太阳系最大的行星,质量约为地球的318倍。' },
  { id: 'ss-easy-002', topic: 'solar-system', difficulty: 'easy', q: '太阳系中距离太阳最近的行星是？', opts: ['金星', '水星', '火星', '地球'], ans: 1, explanation: '水星是离太阳最近的行星,平均距离约5800万公里。' },
  { id: 'ss-easy-003', topic: 'solar-system', difficulty: 'easy', q: '光从太阳到达地球大约需要多长时间？', opts: ['8分钟', '80分钟', '8秒', '8小时'], ans: 0, explanation: '太阳到地球约1.5亿公里,光速传播约8分20秒。' },
  { id: 'ss-easy-004', topic: 'solar-system', difficulty: 'easy', q: '月球绕地球公转一周大约需要多少天？', opts: ['7天', '14天', '27天', '30天'], ans: 2, explanation: '月球公转周期约27.3天(恒星月)。' },
  { id: 'ss-easy-005', topic: 'solar-system', difficulty: 'easy', q: '以下哪颗不是太阳系的八大行星之一？', opts: ['水星', '冥王星', '金星', '火星'], ans: 1, explanation: '冥王星于2006年被重新归类为矮行星。' },
  { id: 'ss-easy-006', topic: 'solar-system', difficulty: 'easy', q: '地球的天然卫星是？', opts: ['火卫一', '月球', '木卫二', '土卫六'], ans: 1, explanation: '月球是地球唯一的天然卫星。' },
  { id: 'ss-easy-007', topic: 'solar-system', difficulty: 'easy', q: '被称为"红色行星"的是？', opts: ['金星', '水星', '火星', '木星'], ans: 2, explanation: '火星表面富含氧化铁,呈现红色。' },
  { id: 'ss-easy-008', topic: 'solar-system', difficulty: 'easy', q: '太阳系中拥有最壮观光环的行星是？', opts: ['木星', '土星', '天王星', '海王星'], ans: 1, explanation: '土星的光环由冰和岩石碎片组成,极为显著。' },
  { id: 'ss-easy-009', topic: 'solar-system', difficulty: 'easy', q: '一年有约365天是因为？', opts: ['地球自转一周', '地球绕太阳公转一周', '月球绕地球一周', '太阳自转一周'], ans: 1, explanation: '地球公转周期约365.25天。' },
  { id: 'ss-easy-010', topic: 'solar-system', difficulty: 'easy', q: '一天有24小时是因为？', opts: ['地球自转一周', '地球公转一周', '月相变化', '太阳活动'], ans: 0, explanation: '地球自转一周约24小时,形成昼夜更替。' },
  { id: 'ss-easy-011', topic: 'solar-system', difficulty: 'easy', q: '太阳的主要成分是？', opts: ['岩石', '氢和氦', '铁', '水'], ans: 1, explanation: '太阳约74%氢、24%氦,核聚变释放能量。' },
  { id: 'ss-easy-012', topic: 'solar-system', difficulty: 'easy', q: '太阳系外缘的小行星密集带位于哪两颗行星之间？', opts: ['地球与火星', '火星与木星', '木星与土星', '土星与天王星'], ans: 1, explanation: '主小行星带位于火星和木星轨道之间。' },
  { id: 'ss-easy-013', topic: 'solar-system', difficulty: 'easy', q: '太阳系中体积最大的卫星是？', opts: ['月球', '木卫三', '土卫六', '木卫四'], ans: 1, explanation: '木卫三(甘尼米德)直径约5268公里,比水星还大。' },
  { id: 'ss-easy-014', topic: 'solar-system', difficulty: 'easy', q: '哈雷彗星回归周期约为？', opts: ['约76年', '约36年', '约150年', '约5年'], ans: 0, explanation: '哈雷彗星周期约76年,上次回归是1986年。' },
  { id: 'ss-easy-015', topic: 'solar-system', difficulty: 'easy', q: '地球大气层中含量最多的气体是？', opts: ['氧气', '二氧化碳', '氮气', '氩气'], ans: 2, explanation: '氮气约占大气78%,氧气约占21%。' },

  // ============ 太阳系 - 中级 ============
  { id: 'ss-medium-001', topic: 'solar-system', difficulty: 'medium', q: '太阳系中自转最快的行星是？', opts: ['木星', '地球', '火星', '水星'], ans: 0, explanation: '木星自转一周仅约9小时55分,是八大行星中最快的。' },
  { id: 'ss-medium-002', topic: 'solar-system', difficulty: 'medium', q: '金星上的一天比一年还长,这是因为？', opts: ['金星距离太阳很近', '金星自转极慢且方向相反', '金星没有大气', '金星轨道是椭圆形'], ans: 1, explanation: '金星自转周期约243天,公转约225天,且自转方向与多数行星相反。' },
  { id: 'ss-medium-003', topic: 'solar-system', difficulty: 'medium', q: '哪颗行星拥有太阳系中最大的火山？', opts: ['地球', '金星', '火星', '水星'], ans: 2, explanation: '火星上的奥林帕斯山高约21公里,是太阳系最大的火山。' },
  { id: 'ss-medium-004', topic: 'solar-system', difficulty: 'medium', q: '木星的"大红斑"是什么？', opts: ['一座巨大火山', '一场持续数百年的反气旋风暴', '一片陨石坑', '一个引力异常区域'], ans: 1, explanation: '大红斑是木星上一个持续至少350年的巨大反气旋风暴。' },
  { id: 'ss-medium-005', topic: 'solar-system', difficulty: 'medium', q: '柯伊伯带主要位于哪里？', opts: ['火星轨道附近', '海王星轨道之外', '木星轨道内侧', '太阳与水星之间'], ans: 1, explanation: '柯伊伯带位于海王星轨道之外,是众多冰质天体的家园。' },
  { id: 'ss-medium-006', topic: 'solar-system', difficulty: 'medium', q: '土卫六(泰坦)的特别之处在于？', opts: ['它是唯一拥有浓厚大气的卫星', '它会发光', '它比月球大10倍', '它有金属表面'], ans: 0, explanation: '土卫六是唯一拥有浓厚大气层的卫星,主要由氮气组成。' },
  { id: 'ss-medium-007', topic: 'solar-system', difficulty: 'medium', q: '太阳的核聚变主要发生在哪里？', opts: ['表面', '日冕', '核心', '光球层'], ans: 2, explanation: '太阳的核心温度高达1500万K,氢核聚变为氦释放能量。' },
  { id: 'ss-medium-008', topic: 'solar-system', difficulty: 'medium', q: '太阳黑子是？', opts: ['太阳上的大型陨石坑', '太阳表面温度较低的区域', '太阳爆发的火山', '太阳磁场断裂'], ans: 1, explanation: '黑子是磁场强烈、温度比周围低约1500K的区域,因而显得较暗。' },
  { id: 'ss-medium-009', topic: 'solar-system', difficulty: 'medium', q: '行星轨道开普勒第三定律描述的是？', opts: ['行星轨道是椭圆', '相同时间扫过相同面积', '公转周期平方与轨道半长轴立方成正比', '所有行星速度相同'], ans: 2, explanation: '开普勒第三定律:T²∝a³,公转周期的平方与轨道半长轴的立方成正比。' },
  { id: 'ss-medium-010', topic: 'solar-system', difficulty: 'medium', q: '木卫二(欧罗巴)被认为可能存在生命的原因是？', opts: ['表面有大气', '冰壳下可能存在液态海洋', '靠近太阳', '有火山活动'], ans: 1, explanation: '木卫二冰壳下被推测有液态水海洋,是地外生命候选地之一。' },
  { id: 'ss-medium-011', topic: 'solar-system', difficulty: 'medium', q: '海王星被发现的方式是？', opts: ['偶然观测', '通过对天王星轨道扰动的预测', '哈勃望远镜发现', '探测器拍摄'], ans: 1, explanation: '勒维耶根据天王星轨道异常预测了海王星位置,1846年被观测证实。' },
  { id: 'ss-medium-012', topic: 'solar-system', difficulty: 'medium', q: '"地球的姐妹星"通常指？', opts: ['火星', '金星', '水星', '月球'], ans: 1, explanation: '金星与地球大小、质量、组成相近,被称为地球的姐妹星。' },
  { id: 'ss-medium-013', topic: 'solar-system', difficulty: 'medium', q: '矮行星谷神星位于？', opts: ['柯伊伯带', '主小行星带', '太阳与水星之间', '海王星轨道外'], ans: 1, explanation: '谷神星是主小行星带中最大的天体,被归为矮行星。' },
  { id: 'ss-medium-014', topic: 'solar-system', difficulty: 'medium', q: '日冕最显著时通常出现在什么时候？', opts: ['日落时', '满月时', '日全食时', '日出时'], ans: 2, explanation: '日全食时月球遮住光球,日冕的暗弱光辉才容易被肉眼看到。' },
  { id: 'ss-medium-015', topic: 'solar-system', difficulty: 'medium', q: '太阳风的主要成分是？', opts: ['中子', '光子', '带电粒子(质子和电子)', '岩石碎片'], ans: 2, explanation: '太阳风是从日冕喷出的高速带电粒子流,以质子和电子为主。' },

  // ============ 太阳系 - 高级 ============
  { id: 'ss-hard-001', topic: 'solar-system', difficulty: 'hard', q: '罗氏极限描述的是？', opts: ['卫星因潮汐力被撕裂的最近距离', '行星最大轨道', '光不能逃脱的距离', '地球磁层边界'], ans: 0, explanation: '罗氏极限是天体被主星潮汐力解体的临界距离,土星环可能源于此。' },
  { id: 'ss-hard-002', topic: 'solar-system', difficulty: 'hard', q: '木星的伽利略卫星不包括？', opts: ['木卫一(伊奥)', '木卫二(欧罗巴)', '木卫三(甘尼米德)', '土卫六(泰坦)'], ans: 3, explanation: '伽利略1610年发现的四颗木卫:伊奥、欧罗巴、甘尼米德、卡里斯托。' },
  { id: 'ss-hard-003', topic: 'solar-system', difficulty: 'hard', q: '日球层顶(Heliopause)指的是？', opts: ['太阳光球层边缘', '太阳风与星际介质压力平衡的边界', '行星轨道最远处', '太阳系黑洞边界'], ans: 1, explanation: '日球层顶是太阳风与星际介质压力达到平衡的边界,旅行者1号已穿越。' },
  { id: 'ss-hard-004', topic: 'solar-system', difficulty: 'hard', q: '小行星带没有形成行星的主要原因是？', opts: ['物质太少', '木星引力扰动', '距离太阳太远', '碰撞频繁'], ans: 1, explanation: '木星强大引力阻止了主带物质聚合成行星。' },
  { id: 'ss-hard-005', topic: 'solar-system', difficulty: 'hard', q: '金星表面温度比水星更高的主要原因是？', opts: ['离太阳更近', '没有自转', '浓密的二氧化碳大气产生强烈温室效应', '内部熔岩活动'], ans: 2, explanation: '金星96.5% CO₂大气产生剧烈温室效应,表面温度可达462°C。' },
  { id: 'ss-hard-006', topic: 'solar-system', difficulty: 'hard', q: '太阳系中拉格朗日点 L1、L2、L3 都是？', opts: ['稳定平衡点', '不稳定平衡点', '黑洞', '行星轨道交点'], ans: 1, explanation: 'L1/L2/L3 是不稳定平衡点,L4/L5 是稳定的。詹姆斯·韦伯位于日地L2。' },
  { id: 'ss-hard-007', topic: 'solar-system', difficulty: 'hard', q: '土卫二(恩克拉多斯)南极喷出的羽流主要由什么组成？', opts: ['甲烷', '水冰和盐分', '氨气', '岩石粉尘'], ans: 1, explanation: '土卫二南极喷流含水冰和盐分,提示冰下存在液态海洋。' },
  { id: 'ss-hard-008', topic: 'solar-system', difficulty: 'hard', q: '太阳的日震学(Helioseismology)研究的是？', opts: ['太阳地震', '太阳内部振荡模式以推断结构', '太阳黑子周期', '日冕加热'], ans: 1, explanation: '日震学通过观测太阳表面振荡反演内部结构,如同地震波探查地球。' },
  { id: 'ss-hard-009', topic: 'solar-system', difficulty: 'hard', q: '彗星的两条尾巴中,通常较直且呈蓝色的是？', opts: ['尘埃尾', '离子尾', '钠尾', '反尾'], ans: 1, explanation: '离子尾因太阳风电离作用呈直线状蓝色;尘埃尾较弯曲呈白色。' },
  { id: 'ss-hard-010', topic: 'solar-system', difficulty: 'hard', q: '海王星上层大气的甲烷使其呈何种颜色？', opts: ['红色', '蓝色', '绿色', '黄色'], ans: 1, explanation: '海王星大气中的甲烷强烈吸收红光,反射蓝光使其呈深蓝色。' },
  { id: 'ss-hard-011', topic: 'solar-system', difficulty: 'hard', q: '天王星的自转轴倾角约为？', opts: ['23°', '45°', '98°', '0°'], ans: 2, explanation: '天王星倾角约98°,几乎"躺"着自转,可能源于早期巨大撞击。' },
  { id: 'ss-hard-012', topic: 'solar-system', difficulty: 'hard', q: '奥尔特云被认为是？', opts: ['火星卫星残骸', '太阳系最外围的彗星储库', '银河系中心结构', '行星形成失败区'], ans: 1, explanation: '奥尔特云距太阳约2000-200000 AU,为长周期彗星的来源。' },
  { id: 'ss-hard-013', topic: 'solar-system', difficulty: 'hard', q: '行星的"霜线"(Frost Line)是指？', opts: ['行星表面冰盖边界', '原行星盘中挥发物可凝结成冰的距离', '彗星的尾巴边界', '日地轨道交点'], ans: 1, explanation: '霜线之外水、甲烷等可凝结为冰,影响类地行星与气态巨行星的分布。' },
  { id: 'ss-hard-014', topic: 'solar-system', difficulty: 'hard', q: '水星轨道的近日点进动现象主要由什么解释？', opts: ['牛顿引力', '广义相对论', '量子修正', '太阳风扰动'], ans: 1, explanation: '水星近日点每世纪多进动约43角秒,爱因斯坦广义相对论给出精确解释。' },
  { id: 'ss-hard-015', topic: 'solar-system', difficulty: 'hard', q: '木卫一(伊奥)成为太阳系火山活动最剧烈天体的原因是？', opts: ['内部放射性元素丰富', '木星与其他卫星的潮汐加热', '太阳辐射加热', '大气层保温'], ans: 1, explanation: '木卫一受木星与其他伽利略卫星共振潮汐加热,内部熔融剧烈喷发。' },
];

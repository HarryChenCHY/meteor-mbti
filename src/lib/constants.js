export const MBTI_LIST = ['INTJ-建筑师','INTP-逻辑学家','ENTJ-指挥官','ENTP-辩论家','INFJ-提倡者','INFP-调停者','ENFJ-主人公','ENFP-竞选者','ISTJ-物流师','ISFJ-守卫者','ESTJ-总经理','ESFJ-执政官','ISTP-鉴赏家','ISFP-探险家','ESTP-企业家','ESFP-表演者'];
export const SIGNS = ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'];
export const BLOODS = ['A型','B型','O型','AB型'];
export const STYLES = ['偏可爱','偏神秘','偏酷感','偏治愈'];
export const FORMS = ['更像陨石','更像宇宙精灵'];
export const RENDERS = ['3D的手办感','卡通插画感'];
export const PTYPES = ['守护型','探索型','预言型','社交型'];

export const MOCK_RESULT = {
  name:'星陨·织梦者',id:'MTR-2026-AX7721',planetCode:'PLN-Ψ-4019',mbti:'INFP',sign:'双鱼座',star:'织女星·Vega',
  desc:'一颗来自梦境星云边缘的温柔陨石，表面覆盖着淡紫色星尘与透明晶体。它拥有强烈的共情能力，能感知主人情绪的细微波动。在宇宙的漫长旅途中，它收集了无数星球的故事碎片，编织成只属于你的星空絮语。',
  stage:'初始期·胚芽形态',skills:['星语感应Lv.1','梦境编织Lv.1','星尘护盾Lv.0'],tags:['温柔','梦幻','直觉','治愈','内省'],
  trajectory:['梦境星云→','星尘走廊→','织女星域→','你的身边'],
  bindDesc:'你是它在茫茫宇宙中唯一的引力锚点。当你快乐时，它表面的晶体会折射出彩虹色的光芒；当你低落时，它会轻轻发出温暖的紫色脉冲。',
  broadcast:'今日宇宙播报：织女星域气温宜人，适合冥想与创作。你的陨石正在吸收来自天琴座的灵感粒子，创造力+15%。',
  future:'近期宇宙能量暗示你将遇到一个志同道合的灵魂。保持开放的心态，星光会为你指引方向。'
};

export const MOCK_ARCHIVE = {
  nickname:'星尘旅人',avatar:'🌙',meteorName:'星陨·织梦者',
  skills:[{name:'星语感应',lv:2},{name:'梦境编织',lv:1},{name:'星尘护盾',lv:1}],
  timeline:[
    {date:'2026-03-20',event:'陨石诞生于梦境星云'},
    {date:'2026-03-22',event:'首次星语感应成功'},
    {date:'2026-03-25',event:'完成3次天文答题，星尘护盾觉醒'}
  ],
  recentDivine:'今天适合仰望猎户座方向，灵感会在繁星间流淌。'
};

export const SHOP_ITEMS = [
  {id:'S1',name:'星陨专属徽章',desc:'限量铸造的星陨宇宙金属徽章，附官方编号证书',cost:200,left:23,icon:'🏅',cat:'周边'},
  {id:'S2',name:'星图明信片套装',desc:'精选12张宇宙星图明信片，可寄送给好友',cost:150,left:67,icon:'📮',cat:'周边'},
  {id:'S3',name:'定制陨石笔记本',desc:'封面印有你的陨石名称与编号的定制笔记本',cost:300,left:18,icon:'📓',cat:'周边'},
  {id:'S4',name:'天文馆优先入场券',desc:'跳过排队直接进入展馆，有效期30天',cost:500,left:134,icon:'🎟️',cat:'特权'},
  {id:'S5',name:'天文讲座专属席位',desc:'下一期天文讲座前排席位，含茶歇',cost:600,left:7,icon:'🎓',cat:'特权'},
  {id:'S6',name:'望远镜一日租用券',desc:'专业天文望远镜租用权，含技术指导',cost:800,left:3,icon:'🔭',cat:'特权'},
  {id:'S7',name:'陨石真实样品',desc:'来自太阳系的真实陨石碎片，含鉴定证书',cost:1000,left:2,icon:'🪨',cat:'限定'},
  {id:'S8',name:'星陨角色手办',desc:'3D打印专属陨石角色手办，1:1精细还原',cost:1200,left:5,icon:'🌟',cat:'限定'}
];

export const CAT_COLORS = {'周边':'border-white/20 text-white/60','特权':'border-white/25 text-white/70','限定':'border-white/30 text-white/80'};

export const STAGE_THRESHOLDS = [0,100,300,600,1000];
export const STAGES = ['胚芽形态','星核形态','星云形态','恒星形态','超新星形态'];
export const STAGE_COLORS = ['from-violet-900 to-slate-900','from-cyan-900 to-blue-950','from-pink-900 to-purple-950','from-amber-900 to-orange-950','from-white to-cyan-200'];

export const STAGE_SKINS = [
  {stage:0,name:'胚芽形态',threshold:0,rarity:'普通',rarityColor:'text-white/40 border-white/15',
   desc:'初生的陨石核心，带着宇宙最原始的星尘微光，朦胧而神秘，等待宇宙能量的唤醒',
   colors:'from-indigo-500 to-purple-700'},
  {stage:1,name:'星核形态',threshold:100,rarity:'进阶',rarityColor:'text-sky-300/80 border-sky-400/25',
   desc:'冰蓝色星核开始活跃，稳定的能量脉冲从核心向外层扩散，内部开始出现晶状结构',
   colors:'from-cyan-400 to-blue-700'},
  {stage:2,name:'星云形态',threshold:300,rarity:'稀有',rarityColor:'text-purple-300/80 border-purple-400/25',
   desc:'陨石被绚丽的星云物质包裹，粉紫色的宇宙雾气在表面旋舞，显露出独特的人格纹路',
   colors:'from-pink-500 to-purple-700'},
  {stage:3,name:'恒星形态',threshold:600,rarity:'史诗',rarityColor:'text-amber-300/80 border-amber-400/25',
   desc:'金色恒星级能量爆发，轨道粒子环绕运行，光芒足以照亮方圆星域，人格力量完全绽放',
   colors:'from-amber-400 to-orange-600'},
  {stage:4,name:'超新星形态',threshold:1000,rarity:'传说',rarityColor:'text-white/90 border-white/30',
   desc:'超新星爆发！白热化的宇宙能量将陨石升华为传说级存在，双轨道环绕，星光粒子漫天，华丽无极',
   colors:'from-white via-cyan-200 to-purple-400'},
];

export const PAGE_TITLES = {home:'星陨宇宙',create:'创建陨石',generating:'铸造中',result:'诞生结果',archive:'宇宙档案',cultivate:'陨石培育',quiz:'天文挑战',shop:'积分商城',skins:'皮肤图鉴'};
export const MORE_MENU = [{key:'archive',label:'宇宙档案',icon:'📂'},{key:'cultivate',label:'养成',icon:'🌱'},{key:'skins',label:'皮肤图鉴',icon:'🎨'}];
export const MOBILE_TABS = [{key:'home',icon:'🏠',label:'首页'},{key:'create',icon:'✨',label:'创建'},{key:'quiz',icon:'📝',label:'答题'},{key:'shop',icon:'🎁',label:'商城'},{key:'__more__',icon:'⋯',label:'更多'}];

export function getStage(energy) {
  for (let i = STAGE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (energy >= STAGE_THRESHOLDS[i]) return Math.min(i, 4);
  }
  return 0;
}

export function getStageProgress(energy) {
  const s = getStage(energy);
  if (s >= 4) return 100;
  return Math.round((energy - STAGE_THRESHOLDS[s]) / (STAGE_THRESHOLDS[s + 1] - STAGE_THRESHOLDS[s]) * 100);
}

export function isMoreTabPage(p) {
  return ['archive','cultivate','generating','result','skins'].includes(p);
}

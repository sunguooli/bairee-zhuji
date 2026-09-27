// 百日筑基 · CET-6 学习计划数据层
// 计划起始日：2026-09-28（第 1 天），第 100 天：2027-01-05

export const START_DATE = new Date(2026, 8, 28) // 2026-09-28
export const TOTAL_DAYS = 100

export function dayOfPlan(now: Date = new Date()): number {
  const ms = now.getTime() - START_DATE.getTime()
  return Math.floor(ms / 86_400_000) + 1
}

export function dateOfDay(day: number): Date {
  return new Date(START_DATE.getTime() + (day - 1) * 86_400_000)
}

export function fmt(d: Date): string {
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export type Phase = {
  id: number
  name: string
  subtitle: string
  startDay: number
  endDay: number
  goal: string
  color: string
  daily: Task[]
  notes: string[]
}

export type Task = { id: string; label: string; minutes: number; detail?: string }

export const PHASES: Phase[] = [
  {
    id: 1,
    name: '筑基期',
    subtitle: '词汇一轮 · 长难句 · 磨耳朵',
    startDay: 1,
    endDay: 30,
    goal: '六级新增词汇过完一轮，能独立拆解长难句，听力适应六级语速。',
    color: 'amber',
    daily: [
      { id: 'p1-vocab', label: '六级词汇 80 个', minutes: 40, detail: '旧词复习优先于新词（第 1/3/7/15 天回头复习）' },
      { id: 'p1-sentence', label: '长难句拆解 5 句', minutes: 40, detail: '用真题阅读长句，自己切分主谓宾再对解析' },
      { id: 'p1-listen', label: '听力磨耳朵', minutes: 40, detail: '盲听 1 遍 → 看原文听 1 遍 → 跟读 1 遍' },
      { id: 'p1-reading', label: '真题精读 1 篇', minutes: 30, detail: '每个生词、每个长句都搞懂，不是做题是拆文章' },
      { id: 'p1-review', label: '当日复盘', minutes: 20, detail: '回顾全部笔记，标记没记住的内容' },
    ],
    notes: ['前 30 天不刷完整套题', '第 7/14/21/28 天减量复习 + 周测', '第 30 天阶段自测（23 年 6 月真题听力+阅读）'],
  },
  {
    id: 2,
    name: '专项期',
    subtitle: '听力 / 阅读 / 写作 / 翻译 逐项突破',
    startDay: 31,
    endDay: 70,
    goal: '四大题型形成自己的解题套路，弱项额外加量。',
    color: 'emerald',
    daily: [],
    notes: ['按周日历轮换主攻项', '写作翻译必须动笔，积累输出肌肉记忆', '第 50 天中期检查：比第 30 天提升 ≥10 个百分点'],
  },
  {
    id: 3,
    name: '真题期',
    subtitle: '近 10 套真题精做',
    startDay: 71,
    endDay: 90,
    goal: '2021–2025 年真题全部精做完，错题不再错第二次。',
    color: 'sky',
    daily: [
      { id: 'p3-exam', label: '隔天 1 套完整真题（计时 130 分钟）', minutes: 130 },
      { id: 'p3-error', label: '逐题写错因（词汇/定位/理解/时间）', minutes: 40 },
      { id: 'p3-listen', label: '听力错题段精听 + 阅读错题段精读', minutes: 30 },
      { id: 'p3-output', label: '写作 / 翻译动笔各 1 篇（非做题日）', minutes: 60 },
    ],
    notes: ['四步流程：做题 → 对答案 → 写错因 → 精听精读', '同一错因出现 3 次，回炉对应专项训练', '翻译写作每套都写，写完可发给 Kimi 批改'],
  },
  {
    id: 4,
    name: '冲刺期',
    subtitle: '全真模考 · 模板固化',
    startDay: 91,
    endDay: 100,
    goal: '状态调整到考试模式，只巩固不新学。',
    color: 'rose',
    daily: [],
    notes: ['模考严格按 15:00–17:25 考试时段', '第 98 天词汇收尾，不学新词', '第 100 天（考前一天）不学习，检查耳机电池准考证'],
  },
]

export function phaseOfDay(day: number): Phase {
  if (day < 1) return PHASES[0]
  return PHASES.find((p) => day >= p.startDay && day <= p.endDay) ?? PHASES[3]
}

// 专项期（第 31–70 天）周日历轮换
export const WEEKLY_ROTATION: { day: string; focus: string; tasks: string; tip: string }[] = [
  { day: '周一', focus: '听力', tasks: '1 套完整听力（25 min 限时）+ 逐句精听错题段 + 跟读', tip: '六级听力只放一遍且题文不同序，必须先读选项预判' },
  { day: '周二', focus: '阅读', tasks: '选词填空 2 篇 + 长篇匹配 1 篇（限时）+ 仔细阅读 1 篇精读', tip: '选词填空性价比最低，10 min 内做完即可' },
  { day: '周三', focus: '听力', tasks: '同周一', tip: '新闻/讲座语速快，是拉分主战场' },
  { day: '周四', focus: '写作', tasks: '真题作文 1 篇（30 min 限时）→ 对照范文改写 → 积累 5 个句型', tip: '只准备现象解释/观点对比/问题解决三类框架' },
  { day: '周五', focus: '阅读', tasks: '仔细阅读 2 篇（限时 18 min/篇）+ 错因归类', tip: '仔细阅读占 20%，答案严格来自原文定位' },
  { day: '周六', focus: '翻译', tasks: '汉译英 1 篇（30 min）→ 对照参考译文学官方译法', tip: '提前积累中国文化/经济/社会类高频词固定译法' },
  { day: '周日', focus: '复盘', tasks: '整理本周错题本 + 复习本周错词', tip: '做题不复盘，等于做了一半' },
]

// 每日固定底线（任何阶段都要做）
export const DAILY_BASELINE: Task[] = [
  { id: 'base-vocab', label: '词汇不断线', minutes: 30, detail: '哪怕再忙也要完成（后期可为 50 个复习量）' },
  { id: 'base-listen', label: '听力输入 ≥20 min', minutes: 20, detail: '碎片时间也算：健身、通勤时听播客/BBC' },
]

// 检查点
export const MILESTONES = [
  { day: 30, title: '筑基自测', metric: '2023 年 6 月真题听力+阅读', target: '正确率 ≥ 40%' },
  { day: 50, title: '中期检查', metric: '听力+阅读各 1 套', target: '比第 30 天提升 ≥ 10 个百分点' },
  { day: 90, title: '真题期验收', metric: '近 3 套真题平均分', target: '≥ 445 分（425 及格线 + 20 安全垫）' },
  { day: 100, title: '考前模考', metric: '全真模考稳定分', target: '480+ 即具备较大通过把握' },
]

// 个人档案
export const PROFILE = {
  name: '小E',
  cet4: {
    total: 430,
    listening: 136,
    reading: 149,
    writing: 145,
    // 各单项满分：听力 248.5 / 阅读 248.5 / 写译 213
    maxL: 248.5,
    maxR: 248.5,
    maxW: 213,
  },
  target: 480,
  passLine: 425,
  schedule: [
    { label: '实习准备', hours: '3–4 h', note: '优先级最高，不可挪用' },
    { label: '健身', hours: '1–2 h', note: '保留——同时是听力碎片时间' },
    { label: '六级备考', hours: '2–2.5 h', note: '整块时间：晚上或下午' },
    { label: '碎片时间', hours: '约 1 h', note: '通勤/吃饭时听播客、复习错词' },
  ],
}

// 方法论（含来源）
export const METHODS = [
  {
    title: '听写精听法：听一句，写一句',
    tag: '听力',
    body: '拿两三套真题，收起题目答案，听一句暂停写一句，听不清就倒回去直到听懂。整篇听完后对照原文修改，分析没听出的原因（语音/语境/背景）。精听几套后再大量泛听，听力实力会上一个台阶。基础越差，提升空间越大。',
    source: '洛阳师范学院公共外语教研部备考经验',
    url: 'https://sites.lynu.edu.cn/ggwy/info/1137/3496.htm',
  },
  {
    title: '单词复习节奏：当晚 + 1/2/4/7/15/30 天',
    tag: '词汇',
    body: '背单词最重要的不是一次背多认真，而是按时复习。当天背的单词当天晚上必须复习，之后在第 1、2、4、7、15、30 天回头复习。可根据自己的学习能力和单词书调整参数，生成专属背诵计划表。',
    source: 'GitHub · SeA-xiAoD/Kill_vocabulary（源自杨鹏《17 天搞定 GRE 单词》法则）',
    url: 'https://github.com/SeA-xiAoD/Kill_vocabulary',
  },
  {
    title: '分模块分阶段练，不一开始整套刷',
    tag: '策略',
    body: '备考初期直接做整套真题既耗时又难以定位薄弱环节。正确做法是分模块突破——一段时间内集中攻克一个题型，归纳题型与常见错误，直到考前再转向整套模拟。单项练习也要严格控制时间。',
    source: '中国石油大学（北京）六级 633 分经验分享',
    url: 'https://www.cup.edu.cn/news/xg/425adfc690dc4b3191898c55c697efcc.htm',
  },
  {
    title: '先题后文 + 同义替换预判',
    tag: '阅读',
    body: '做阅读先看题干和选项，带着问题回原文定位；注意选项与原文之间的同义替换，这是出题的核心套路。选词填空分值低耗时高，控制在 10 分钟内，不必追求全对；仔细阅读每篇控制在 9 分钟。',
    source: '中国石油大学（北京）/ 滨州医学院四六级经验贴',
    url: 'https://www.byytfy.com/system/2024/11/01/030022425.shtml',
  },
  {
    title: '真题里整理词汇，而不是只背词汇书',
    tag: '词汇',
    body: '把真题阅读里所有不认识的单词整理成表，标注原文语境，每天早晚复习。这样记的单词都和考试直接相关。词汇书的词要在听力和阅读语境中复现才算真正掌握。',
    source: '中国石油大学（北京）四级 596 分经验（同样适用于六级）',
    url: 'https://www.cup.edu.cn/news/xg/425adfc690dc4b3191898c55c697efcc.htm',
  },
  {
    title: '翻译长句拆分 + 高频词官方译法',
    tag: '翻译',
    body: '把复杂中文拆成简单英文短句，再用连接词串联，避免语法错误。考前积累固定表达（如 reform and opening-up、intangible cultural heritage），比临场造句有效得多。遇到不会的词转换成简单表达即可。',
    source: '滨州医学院四六级经验贴',
    url: 'https://www.byytfy.com/system/2024/11/01/030022425.shtml',
  },
  {
    title: '长线备考，别压缩到最后一个月',
    tag: '策略',
    body: '六级相较四级难度有明显提升，尤其听力和写译。但凡时间充裕，不要把备考压缩到一个月，最好留出 2–3 个月系统训练，单词从现在开始背。',
    source: '知乎 · 低分飘过四级，一个月怎么备考六级？',
    url: 'https://www.zhihu.com/question/428771431/answer/2429535759',
  },
  {
    title: '健身/通勤时间 = 听力输入时间',
    tag: '碎片时间',
    body: 'TED 演讲、BBC《六分钟英语》、英文播客都是磨耳朵素材。不追求完全听懂，常听即可让听力变简单。你的健身 1–2 小时正好覆盖每日听力输入，一举两得。',
    source: '中国石油大学（北京）六级 625 分经验',
    url: 'https://www.cup.edu.cn/news/xg/425adfc690dc4b3191898c55c697efcc.htm',
  },
]

// 资源
export const RESOURCES = [
  {
    name: 'Kill_vocabulary · 背单词计划生成器',
    desc: '输入自己的复习周期、日学习时间和单词书，按艾宾浩斯节奏生成专属背单词计划表，打印出来打卡。',
    url: 'https://github.com/SeA-xiAoD/Kill_vocabulary',
  },
  {
    name: 'vocabularyTools · 真题生词标注工具',
    desc: '给定词库范围，自动标注英文文本中的生词并生成可点读单词表，解决“查文章生词浪费大量时间”的问题。',
    url: 'https://github.com/Carlos-yyt/vocabularyTools',
  },
  {
    name: 'GitHub 四六级词表合集',
    desc: '四六级、考研、SAT 单词的 txt / json 文件合集，可导入各类背单词软件自定义学习。',
    url: 'https://github.com/topics/toefl',
  },
  {
    name: '知乎：低分飘过四级如何备考六级',
    desc: '与你处境最接近的问题，高赞回答给出了从四级低分到六级过关的具体路径参考。',
    url: 'https://www.zhihu.com/question/428771431',
  },
]

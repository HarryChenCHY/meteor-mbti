# 天文知识问答系统设计规格

**日期：** 2026-05-21  
**项目：** 星陨人格宇宙 (Meteor MBTI Universe)  
**状态：** 已用户批准，待实现

---

## 1. 目标

将现有的 8 题静态 Mock 问答升级为：
- 270 题真实天文题库（6主题 × 3难度 × 15题）
- 分主题 + 分难度的闯关结构
- 通关专属陨石皮肤解锁机制
- 进度持久化（localStorage）

---

## 2. 题库结构

### 六大主题

| id | 主题名 | 图标 | 通关高级解锁皮肤 |
|----|--------|------|----------------|
| `solar-system` | 太阳系 | ☀️ | 烈焰陨石 (`flame`) |
| `stellar-evolution` | 恒星演化 | ⭐ | 星核陨石 (`stellar`) |
| `galaxy-universe` | 星系与宇宙 | 🌌 | 深空陨石 (`deep`) |
| `space-exploration` | 航天探索史 | 🚀 | 先驱陨石 (`pioneer`) |
| `astronomical-observation` | 天文观测 | 🔭 | 晶眸陨石 (`crystal`) |
| `astrophysics` | 宇宙物理 | ⚛️ | 量子陨石 (`quantum`) |

### 难度档位

每个主题三档，初级默认开放，依次解锁：

| 难度 | key | 题目池 | 每轮抽取 | 通关分 |
|------|-----|--------|----------|--------|
| 初级 | `easy` | 15题 | 12题 | 9/12 |
| 中级 | `medium` | 15题 | 12题 | 9/12 |
| 高级 | `hard` | 15题 | 12题 | 9/12 |

### 题目数据格式

```js
{
  id: 'ss-easy-001',          // topic-difficulty-序号
  topic: 'solar-system',
  difficulty: 'easy',
  q: '题目文字',
  opts: ['选项A', '选项B', '选项C', '选项D'],
  ans: 0,                     // 正确答案下标 0-3
  explanation: '简短解析'
}
```

---

## 3. 计分规则

| 事件 | 能量奖励 |
|------|---------|
| 答对一题 | +20 |
| 连续答对 3 题 | 额外 +10 |
| 本轮通关（答对 9/12） | 额外 +50 |
| 高级通关（首次） | 额外 +100 + 解锁专属皮肤 |

---

## 4. 进度数据结构（localStorage）

key: `meteor_quiz_progress`

```js
{
  topics: {
    'solar-system': {
      easy: 'passed',       // 'locked' | 'unlocked' | 'passed'
      medium: 'unlocked',
      hard: 'locked'
    },
    // ...其余5个主题，初始 easy: 'unlocked', medium: 'locked', hard: 'locked'
  },
  unlockedSkins: ['flame'],  // 已解锁的皮肤 id 数组
  stats: {
    totalAnswered: 0,
    totalCorrect: 0,
    topicBest: {}            // { 'solar-system-easy': 11, ... } 最高分记录
  }
}
```

---

## 5. 页面结构

现有 `/quiz/page.jsx` 使用 `view` state 在同一路由内切换四个视图，无需新路由。

### View 1: TopicView（主题选择）

- 6 张 GlowCard 排成 2×3 网格
- 每张卡显示：主题图标、主题名、进度（已通关几档/3）
- 进度环或进度条可视化
- 点击进入 DifficultyView

### View 2: DifficultyView（难度选择）

- 返回按钮 → TopicView
- 主题名 + 图标标题
- 3 个难度按钮，每个显示：难度名、状态（可挑战/已通关/已锁定）
- 锁定状态显示解锁条件（"通关初级可解锁"）
- 点击可用难度 → SessionView

### View 3: SessionView（答题）

- 沿用现有答题 UI，增强：
  - 顶部显示主题名 + 难度标签
  - 底部进度点（12个）
  - 答对/答错即时反馈 + 解析文字（`explanation` 字段）
  - 连击提示（"🔥 连续 N 题正确！"）

### View 4: ResultView（结算）

- 显示本轮得分 / 12
- 通关条件提示（达标 / 未达标）
- 若首次解锁新皮肤：全屏皮肤展示动画
- 按钮：再挑战 / 换难度 / 返回主题

---

## 6. 文件改动清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/lib/quiz-data.js` | 新建 | 270 题题库 + QUIZ_TOPICS 配置 |
| `src/lib/quiz-progress.jsx` | 新建 | 进度 Context（localStorage持久化）|
| `src/app/quiz/page.jsx` | 重写 | 四视图结构替换现有单视图 |
| `src/app/layout.jsx` | 修改 | 添加 QuizProgressProvider |
| `src/lib/constants.js` | 修改 | 删除 MOCK_QUIZ，保留其余常量 |

---

## 7. 皮肤系统集成

`unlockedSkins` 数组写入 localStorage，`/skins` 页面读取后高亮对应皮肤卡片。  
皮肤展示名称映射：

```js
const SKIN_META = {
  flame:   { name: '烈焰陨石', color: '#ff6b35', topic: '太阳系' },
  stellar: { name: '星核陨石', color: '#ffd700', topic: '恒星演化' },
  deep:    { name: '深空陨石', color: '#4a9eff', topic: '星系与宇宙' },
  pioneer: { name: '先驱陨石', color: '#a8ff78', topic: '航天探索史' },
  crystal: { name: '晶眸陨石', color: '#e0c3fc', topic: '天文观测' },
  quantum: { name: '量子陨石', color: '#ff9a9e', topic: '宇宙物理' },
};
```

---

## 8. 范围边界

**本次不包含：**
- 后端/数据库（全部本地状态）
- 用户账号系统
- 排行榜
- 题目编辑后台

---

## 9. 自检结果

- ✅ 无占位符 / TODO
- ✅ 各章节数据结构一致
- ✅ 范围聚焦，可单计划覆盖
- ✅ 所有需求均有明确定义

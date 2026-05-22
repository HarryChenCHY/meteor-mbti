# 天文知识问答系统 实现计划

> **面向 AI 代理的工作者：** 必需子技能：superpowers:executing-plans

**目标：** 将 8 题静态 Mock 升级为 270 题真实题库，支持分主题+分难度闯关，通关解锁专属陨石皮肤。

**架构：** quiz-data.js 存 270 题，quiz-progress.jsx 管理 localStorage 进度，quiz/page.jsx 用 view state 切换四个视图。

**技术栈：** Next.js 15, React, localStorage, Tailwind CSS

---

### 任务 1：创建 quiz-data.js（题库 + 主题配置）

**文件：** 创建 `src/lib/quiz-data.js`

- [ ] 写入 QUIZ_TOPICS 配置数组（6个主题元数据）和 QUIZ_QUESTIONS 数组（270题）

### 任务 2：创建 quiz-progress.jsx（进度 Context）

**文件：** 创建 `src/lib/quiz-progress.jsx`

- [ ] 实现 localStorage 读写、进度状态、解锁逻辑

### 任务 3：layout.jsx 注入 Provider

**文件：** 修改 `src/app/layout.jsx`

- [ ] 在 EnergyProvider 内层包裹 QuizProgressProvider

### 任务 4：重写 quiz/page.jsx（四视图）

**文件：** 修改 `src/app/quiz/page.jsx`

- [ ] TopicView → DifficultyView → SessionView → ResultView

### 任务 5：constants.js 删除 MOCK_QUIZ

**文件：** 修改 `src/lib/constants.js`

- [ ] 删除 MOCK_QUIZ export

### 任务 6：验证 + commit

- [ ] npm run build 通过，git commit

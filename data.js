/**
 * 网站内容集中配置文件 —— 日常更新只需要改这一个文件。
 *
 * profile      顶部个人信息与联系方式
 * proof        首屏的代表性成果卡片（建议 4 张）
 * filters      时间线的筛选分类（id 需要和 timeline 里的 type 对应）
 * timeline     教育 / 实习 / 项目 / 开源，按时间倒序排列
 * skills       专业技能分组
 * achievements 个人荣誉
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: "韩仪",
    label: "AGENT ENGINEERING PORTFOLIO · 2027",
    tagline: "Agent Harness × Agent Memory",
    summary: "美国东北大学计算机硕士在读，聚焦 Agent Harness、分层记忆与评测驱动的自进化闭环。",
    intro:
      "深度参与中关村科学城 EvoWork 自进化 Agent Harness 从零到一建设；独立完成 GraphRAG + DeepSearch 多智能体跨文档问答系统；作为核心作者持续建设开源 Agent 框架 learn-workbuddy，负责 Harness、分层 Memory 与 RAG / Context 等核心机制的设计、实现与评测。",
    status: "2027 应届生 · 求职意向：Agent 开发工程师",
    location: "北京",
    email: "han.yi5@northeastern.edu",
    phone: "18810135918",
    github: "https://github.com/hanyi-0918",
    // 首屏第二个按钮：跳到 timeline 里 id 为 target 的那条
    heroJump: { label: "开源项目", target: "workbuddy" },
    // TODO: 放一张头像到 assets/portrait.jpg，然后把下面改成 "./assets/portrait.jpg"
    portrait: ""
  },

  proof: [
    {
      label: "EvoWork · 技能自进化",
      value: "52 → 80%",
      title: "任务成功率",
      note: "6 轮迭代 · 60 Case 隔离测试集门控",
      tone: "amber",
      target: "evowork"
    },
    {
      label: "长程任务 Context 治理",
      value: "−54%",
      title: "单任务 Token",
      note: "12.3k → 5.6k · 成功率 71% → 76%",
      tone: "teal",
      target: "evowork"
    },
    {
      label: "GraphRAG 跨文档问答",
      value: "0.43 → 0.82",
      title: "F1 分数",
      note: "四级多智能体 · Plan-Execute-Report",
      tone: "violet",
      target: "graphrag"
    },
    {
      label: "learn-workbuddy",
      value: "250+",
      title: "GitHub Stars",
      note: "核心作者 · Harness / Memory / RAG",
      tone: "coral",
      target: "workbuddy"
    }
  ],

  filters: [
    { id: "all", label: "全部" },
    { id: "education", label: "教育背景" },
    { id: "project", label: "项目经历" },
    { id: "work", label: "实习经历" },
    { id: "opensource", label: "开源项目" }
  ],

  timeline: [,
    {
      id: "edu-bisu",
      type: "education",
      period: "2020.09 – 2024.07",
      title: "北京第二外国语学院",
      org: "国际经济与贸易 · 本科",
      role: "校级奖学金",
      summary: "本科阶段获校级奖学金，托福 100。",
      tags: ["国际经济与贸易", "校级奖学金"],
      details: []
    },,
    {
      id: "edu-neu",
      type: "education",
      period: "2024.12 – 2027.07",
      title: "美国东北大学 Northeastern University",
      org: "计算机科学 · 硕士",
      role: "GPA 4.0 / 4.0",
      summary: "主要方向为 Agent Harness 与 Agent Memory。",
      tags: ["Computer Science", "GPA 4.0"],
      details: []
    },,
    {
      id: "graphrag",
      type: "project",
      period: "2026.04 – 至今",
      title: "GraphRAG + DeepSearch 多智能体跨文档问答系统",
      org: "个人项目",
      role: "独立开发",
      summary:
        "针对同行业美国企业财报分散、核心指标口径不一，以及传统 RAG 难以完成跨文档对比与多步推理的问题，独立实现知识图谱构建、多级检索、Agent 编排与自动化评测全链路。",
      tags: ["GraphRAG", "Neo4j", "Multi-Agent", "评测体系"],
      metrics: [
        { value: "0.43 → 0.82", label: "F1（对比 NaiveRAG 基线）" },
        { value: "2,746", label: "Chunks / 200 篇文档" },
        { value: "1,005", label: "实体 · 44 个社区" }
      ],
      background:
        "同行业美国企业的财报分散在大量文档里，核心指标口径还不一致。传统 RAG 依赖单一向量召回，做跨文档对比和多步推理时证据链经常断在中间 —— NaiveRAG 基线 F1 只有 0.43。",
      flow: [
        { title: "文档摄取", text: "200 篇财报切分为 2,746 Chunks" },
        { title: "实体关系抽取", text: "构建 1,005 个实体的图结构" },
        { title: "消歧对齐", text: "统一跨文档的指标口径" },
        { title: "社区检测", text: "Leiden 算法划出 44 个社区" },
        { title: "三级检索", text: "Local / Global / DeepSearch" }
      ],
      approach: [
        "四级架构按问题复杂度分层：NaiveRAG 处理单点事实，GraphAgent 走图谱关系，DeepResearch 做多步推理，FusionAgent 以 Plan-Execute-Report 范式和三执行器并行调度收口。",
        "知识图谱以 Neo4j 持久化并支持断点续跑，200 篇文档的构建过程可中断、可恢复，不用每次从头再来。",
        "Local / Global / DeepSearch 三级检索按查询意图路由，避免所有问题都走最贵的那条路径。",
        "规则评分 + LLM-as-a-Judge 双层评测覆盖 EM、F1、检索精确率等 10+ 指标，让每次迭代可归因、可对比。"
      ],
      star: {
        S: "跨文档财报问答需要同时处理实体对齐、关系聚合与多步推理，单一向量检索难以稳定覆盖证据链，F1 停在 0.43。",
        T: "在可复现的评测体系下，把跨文档对比与多步推理的准确率做上去，并让每次迭代的收益可归因。",
        A: "独立实现知识图谱构建、多级检索、Agent 编排与自动化评测全链路，设计四级多智能体架构与三级检索策略。",
        R: "F1 由 0.43 提升至 0.82；完成 200 篇文档、2,746 Chunks、1,005 个实体与 44 个社区的图谱构建。"
      },
      tradeoff:
        "图谱构建（抽取 + 消歧 + 社区检测）的离线成本远高于直接切块入库，换来的是跨文档证据链可追溯。所以单点事实类问题仍然走 NaiveRAG，不强行上图谱。",
      details: [
        {
          heading: "多智能体架构",
          text:
            "设计 NaiveRAG、GraphAgent、DeepResearch、FusionAgent 四级架构；FusionAgent 采用 Plan-Execute-Report 范式与三执行器并行调度，将 F1 由 NaiveRAG 基线 0.43 提升至 0.82。"
        },
        {
          heading: "知识图谱与检索",
          text:
            "构建「文档摄取 → 实体关系抽取 → 消歧对齐 → Leiden 社区检测」Pipeline，以 Neo4j 持久化并支持断点续跑；处理 200 篇文档、2,746 Chunks、1,005 个实体与 44 个社区，实现 Local / Global / DeepSearch 三级检索。"
        },
        {
          heading: "评测体系",
          text:
            "搭建规则评分 + LLM-as-a-Judge 双层评测体系，覆盖 EM、F1、检索精确率等 10+ 指标，实现可归因、可对比的 Agent 迭代评估。"
        }
      ]
    },
    {
      id: "evowork",
      type: "work",
      period: "2026.06 – 2026.09",
      title: "EvoWork｜自进化 Agent Harness",
      org: "北京中关村科学城创新发展有限公司 · 产品五处",
      role: "Agent 开发工程师（实习）",
      summary:
        "从零独立实现 Runtime、Memory、Skills 自进化、Eval 与安全五大子系统，打通「评测驱动 → 失败归因 → 技能进化 → 回归验证」的 Agent 自改进闭环。",
      tags: ["Agent Harness", "Context Engineering", "LLM-as-Judge", "权限模型"],
      metrics: [
        { value: "52 → 80%", label: "任务成功率" },
        { value: "−54%", label: "单任务 Token" },
        { value: "−45%", label: "LLM 交互轮次" }
      ],
      background:
        "Agent 的能力改进通常靠人工调 Prompt、加工具，缺少可归因、可回归的验证路径 —— 改完不知道是真的变好，还是这一轮碰巧。EvoWork 把 Runtime、Memory、Skills、Eval 与安全拆成五个可独立演进的子系统，让每一次改进都必须先过固定测试集的门控。",
      flow: [
        { title: "评测驱动", text: "固定任务集 + 60 Case 隔离集" },
        { title: "失败归因", text: "轨迹分析定位失败原因" },
        { title: "技能提案", text: "生成可审查的技能修订" },
        { title: "沙箱回归", text: "成功率门控与副作用检查" },
        { title: "确认集成", text: "确认后才进入技能库" }
      ],
      approach: [
        "Dispatch Table 动态注册把工具发现与执行路由从核心循环里抽出来，新增工具平均约 30 行即可接入；Batch Tool Calling 合并无依赖调用，Interrupt 保存可恢复状态。",
        "Episodic JSONL 保留可回放事件，Semantic Vector 负责语义召回；Context 四操作（Write / Select / Compress / Isolate）按任务阶段主动控制上下文规模，工具结果外部化避免灌满窗口。",
        "技能提案先进隔离沙箱，必须通过 60 Case 测试集的成功率门控并经人工确认才集成 —— 自进化不直接写生产技能库。",
        "三级权限模型、Dry-run 副作用预览与成本守卫统一放在执行边界上，在工具真正产生副作用之前完成校验。"
      ],
      star: {
        S: "多工具、长程任务下 Agent Loop 的交互轮次和 Token 迅速膨胀，失败原因难以定位，任何改进都无法被稳定验证。",
        T: "构建可扩展、可恢复、可评测且受安全边界约束的 Agent Runtime，并让失败能转化为可回归的技能改进。",
        A: "从零实现五大子系统，以动态工具注册、批量调用、双层记忆、主动压缩、隔离评测与确认门控组成自改进闭环。",
        R: "120 任务 × 3 轮评测下 LLM 交互轮次降低 45%、端到端耗时降低 38%；长程任务单任务 Token 由 12.3k 降至 5.6k；6 轮进化后成功率由 52% 提升至 80%，高危操作 100% 进入审批流程。"
      },
      tradeoff:
        "技能进化不会自动写入生产技能库 —— 沙箱回归和人工确认多花一步时间，但把错误提案和能力回退挡在隔离环境里，不会污染已经稳定的技能。",
      details: [
        {
          heading: "系统设计",
          text:
            "从零独立实现 Runtime、Memory、Skills 自进化、Eval 与安全五大子系统，打通「评测驱动 → 失败归因 → 技能进化 → 回归验证」的 Agent 自改进闭环。"
        },
        {
          heading: "Runtime 与工具调度",
          text:
            "设计 Dispatch Table 动态注册、Batch Tool Calling 与 Interrupt 中断恢复机制，新增工具平均约 30 行即可接入核心循环。在 120 任务 × 3 轮评测中，多工具任务 LLM 交互轮次降低 45%，端到端耗时降低 38%。"
        },
        {
          heading: "Memory 与 Context Engineering",
          text:
            "构建 Episodic JSONL + Semantic Vector 双层记忆，实现 Context 四操作（Write / Select / Compress / Isolate）与工具结果外部化。80 组平均 40+ 轮长程任务中，单任务 Token 从 12.3k 降至 5.6k（−54%），成功率由 71% 提升至 76%。"
        },
        {
          heading: "Eval 驱动的技能自进化",
          text:
            "实现「轨迹分析 → 失败归因 → 新技能提案 → 沙箱回归 → 确认集成」闭环，以 60 Case 隔离测试集作为成功率门控。6 轮迭代后成功率由 52% 提升至 80%，失败自动归因覆盖率 85%，技能提案回归通过率 60%。"
        },
        {
          heading: "安全与权限",
          text:
            "实现三级权限模型、Dry-run 副作用预览与成本守卫。文件删除、网络外发、超预算等高危操作 100% 进入审批流程，单任务成本上限 0.5 美元，实际运行未出现越权调用。"
        }
      ]
    },,
    {
      id: "workbuddy",
      type: "opensource",
      period: "2026.07 – 至今",
      title: "learn-workbuddy｜Agent 工程学习项目",
      org: "开源项目 · 核心作者",
      role: "GitHub 250+ Stars",
      summary:
        "主导 Agent Harness、分层 Memory 与 RAG / Context 关键章节设计，负责机制设计、可运行参考实现及离线评测。",
      tags: ["Tool-use Loop", "Memory Scope", "BM25", "离线评测"],
      link: { label: "github.com/adongwanai/learn-workbuddy", href: "https://github.com/adongwanai/learn-workbuddy" },
      metrics: [
        { value: "250+", label: "GitHub Stars" },
        { value: "1.00", label: "Recall@K · MRR" },
        { value: "0", label: "Scope / Permission Leak" }
      ],
      background:
        "桌面 Agent 的运行循环、权限、记忆与上下文常常被揉成一整块，学习者很难单独理解或验证其中任何一部分。项目把这些工程边界拆成可运行的章节，我负责 Harness、分层 Memory 与 RAG / Context 三章的机制设计、参考实现与离线评测。",
      flow: [
        { title: "Agent Harness", text: "有界 Loop、工具注册、权限与结构化错误" },
        { title: "Layered Memory", text: "session / workspace / user 三层作用域" },
        { title: "RAG / Context", text: "来源、作用域、评分与入选原因" },
        { title: "离线回归", text: "Recall@K / MRR 与泄漏负例" }
      ],
      approach: [
        "工具注册、Schema 校验、权限决策（allow / ask / deny）和错误结构全部收敛到统一调用边界；未知工具、非法参数与执行异常归一为结构化错误，Agent 拿到的永远是可处理的形状。",
        "append-only JSONL Transcript 让会话可回放、可崩溃恢复。",
        "记忆按 session transcript、workspace log / curated view、user profile / preferences 三层划分所有权与生命周期，基于稳定 Scope ID、追加写与原子持久化实现跨会话、跨重启恢复。",
        "用跨用户文件复制、跨 workspace 召回这类负例验证作用域隔离，而不是只测正向路径 —— 泄漏防护要能被证伪才算数。",
        "检索候选保留来源行号、作用域、评分、匹配词及入选 / 拒绝原因，让召回结果可解释而不是黑盒。"
      ],
      star: {
        S: "Agent 的运行循环、权限、记忆与检索耦合在一起，既难以教学拆解，也难以单独回归验证。",
        T: "把关键工程边界拆成可独立运行、可测试、可回放的章节实现。",
        A: "主导 Harness、分层 Memory 与 RAG / Context 三章，统一工具协议与错误结构，建立三层记忆作用域并搭建检索回归。",
        R: "10 个异构候选、6 条离线路由用例上取得 Recall@K = 1.00、MRR = 1.00，Scope / Permission Leak Rate 均为 0；仓库累计 250+ Stars。"
      },
      tradeoff:
        "统一的工具协议和权限边界让每个工具都要多写一层 Schema 与权限声明，接入成本比裸调用高；换来的是错误可归一、权限可审计、会话可回放。",
      details: [
        {
          heading: "Agent Harness",
          text:
            "实现最大轮次约束的 Tool-use Loop；以统一 ToolRegistry 管理工具 Schema 与执行路由，完成参数校验和 allow / ask / deny 权限决策；将未知工具、非法参数及执行异常归一为结构化错误，并通过 append-only JSONL Transcript 支持会话回放与崩溃恢复。"
        },
        {
          heading: "Memory",
          text:
            "划分 session transcript、workspace log / curated view、user profile / preferences 的所有权与生命周期；基于稳定 Scope ID、追加写与原子持久化实现跨会话、跨重启恢复，并以跨用户文件复制、跨 workspace 召回等负例验证作用域隔离和泄漏防护。"
        },
        {
          heading: "RAG / Context",
          text:
            "实现 Markdown 结构化切块、增量索引、BM25 召回、来源校验、安全门禁及预算化上下文组装；为候选保留来源行号、作用域、评分、匹配词及入选 / 拒绝原因。在 10 个异构候选、6 条离线路由用例上取得 Recall@K = 1.00、MRR = 1.00，Scope / Permission Leak Rate 均为 0。"
        }
      ]
    }
  ],

  skills: [
    {
      tone: "violet", kicker: "Agent & Harness",
      title: "Agent 与 Harness 工程",
      items: ["Agent Loop", "ReAct", "Tool Use", "Subagent / Multi-Agent", "状态机与任务编排", "MCP 开发与集成"]
    },
    {
      tone: "teal", kicker: "Memory & Context",
      title: "Memory 与 Context Engineering",
      items: ["短期 / 长期记忆", "Episodic / Semantic", "混合检索", "KV / 前缀缓存", "Stable / Dynamic Prompt", "主动压缩"]
    },
    {
      tone: "blue", kicker: "RAG & Evaluation",
      title: "RAG 与评测",
      items: ["Agentic RAG", "RRF", "Cross-Encoder Rerank", "LLM-as-Judge", "EM / F1", "检索精确率", "隔离测试集"]
    },
    {
      tone: "amber", kicker: "Engineering",
      title: "工程能力",
      items: ["Python", "Git", "Neo4j", "向量检索", "Docker", "Codex / Cursor / Claude Code", "Skill-Driven Development"]
    }
  ],

  achievements: [
    { tone: "coral",  label: "竞赛获奖", value: "特等奖",  text: "全国大学生旅游创新大赛" },
    { tone: "teal",   label: "学业荣誉", value: "4.0",     text: "硕士 GPA 4.0 / 4.0 · 本科校级奖学金" },
    { tone: "blue",   label: "语言能力", value: "100",     text: "托福 TOEFL iBT" },
    { tone: "violet", label: "社交媒体", value: "100 万+", text: "全网播放量 · B 站粉丝 1450+ · 个人网站访问 3 万+" }
  ]
};

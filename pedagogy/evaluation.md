# 科学主张与 schema 评估

## 本轮验收与工作安排

本轮完成标准是四个指定交付存在，研究节点各自带来源与限制，内部边没有悬空端点，跨图谱不伪造 ID，且独立审核后的实质问题得到记录或修订。它不包含学习效果验证。

工作安排采用 pstack 的研究与核验步骤，并按 Ponytail 限制范围。先检查邻近材料，再核对一手来源，生成图谱，独立审查，最后运行结构校验。全部写入限于 `pedagogy/`。不修改根目录、`content/` 或 `prototype/`，不提交、推送或部署。图谱规模以覆盖指定问题为限，不添加理论百科或第二套网站。

数据形状先固定为独立节点、带依据的边和未确认的内容匹配。检查先覆盖节点类型、来源、命名空间与端点，再审查最易混淆的科学主张。核验原则采用 Prove It Works，直接读取生成的 JSON 并运行可重复校验。Model the Domain 原则使理论、实践、效应与设计推论保留独立字段。

## i+1、最近发展区与支架

| 对象 | 在本图谱中的地位 | 不允许的推导 |
| --- | --- | --- |
| Krashen 的 Input Hypothesis / i+1 | 二语习得假说。`i` 指当前习得能力，`+1` 指假设的发展上下一步结构。 | 不等于 CEFR 加一级、词汇难度加一、固定正确率或已验证的可计算推荐规则。 |
| Vygotsky 的 ZPD | 社会文化发展框架中的理论构念。关注独立完成与帮助下完成之间的区别。 | 不等于输入复杂度，也不等于一个固定数值区间。 |
| Scaffolding | 按学习者表现提供支持的教学做法。本轮来源是 Wood、Bruner、Ross 的辅导研究。 | 不等于 ZPD 本身，也不是所有提示、模板或“下一步知识”的统称。 |
| 本地 plus-one 支架 | 项目设计术语，可对应一个待验证的教学选择。 | 不能倒推为 Krashen 或 Vygotsky 已验证了该界面。 |

Krashen 原书甚至反对把教学组织成刻意瞄准 i+1 的每日语法结构序列。保留原作者主张，同时限制其操作化含义。[Krashen 1982，第 II 章，pp.20–22](https://sdkrashen.com/content/books/principles_and_practice.pdf)

ZPD 的经典定义可见 Vygotsky 1978 pp.86–87。本轮独立审核者核对到原文的索引摘录，直接打开大学存档 PDF 超时。其与 scaffolding 的连接在本图中标为设计解释，未设等同关系。Wood 等人的原始任务是幼儿搭建结构，不能单凭它证明成人二语写作支架的效果。[Vygotsky 原文大学存档](https://home.fau.edu/musgrove/web/vygotsky1978.pdf)，[Wood 等 1976](https://doi.org/10.1111/j.1469-7610.1976.tb00381.x)

## 必须保留的研究边界

| 区分 | 图谱中的处理 | 设计时的观察方式 |
| --- | --- | --- |
| Attention 与 noticing | 注意涉及多个过程。Schmidt 的有意识察觉主张保留为有争议的假说，并保留 Truscott 的反驳来源。 | 点击高亮不能单独证明察觉，更不能证明习得。 |
| Output 与 acquisition | 产出可能让学习者发现表达问题。产出次数不是习得量。 | 保存原句、修改及原因，另外安排延迟任务。 |
| Interaction 与一般点击交互 | 研究关注有意义的会话、协商与参与。 | 单人拖卡、LLM 解释、对话轮数都不能自动满足这一定义。 |
| Feedback uptake 与持久改变 | 即时修正是一个结果，延迟使用是另一个结果。 | 将当场修正和新任务中的表现分别记录。 |
| Retrieval 与 recognition | 回忆练习要求从记忆产生答案。选择题也可能调用检索，但不能把选对一项直接算作无提示回忆。 | 记录提示和选项是否可见。 |
| Spacing 与固定排程 | 间隔效应是特定比较下的保持结果。最佳间隔随目标保持期和任务变化。 | 记录学习间隔、复习形式与延迟测验时间。 |
| Transfer 与熟题保持 | 换题后的成功需要明确距离和测量。 | 区分新句、新主题、新体裁、新交际情境及跨语言任务。 |
| Skill acquisition 与无条件转化 | 技能习得框架允许练习中的程序化与自动化，但并不证明所有规则都会变成隐性知识。 | 记录速度、正确率、提示与双任务条件，避免只看一个反应时。 |

这些边界分别来自 [Tomlin 与 Villa 1994](https://doi.org/10.1017/S0272263100012870)、[Schmidt 1990](https://doi.org/10.1093/applin/11.2.129)、[Truscott 1998](https://doi.org/10.1191/026765898674803209)、[Swain 与 Lapkin 1995](https://doi.org/10.1093/applin/16.3.371)、[Mackey 1999](https://research.lancaster-university.uk/en/publications/input-interaction-and-second-language-development-an-empirical-st/)、[Lyster 与 Ranta 1997](https://doi.org/10.1017/S0272263197001034)、[Karpicke 与 Roediger 2008](https://pubmed.ncbi.nlm.nih.gov/18276894/)、[Cepeda 等 2008](https://www.evullab.org/pdf/CepedaVulRohrerWixtedPashler-PS-2008.pdf)、[Butler 2010](https://pubmed.ncbi.nlm.nih.gov/20804289/) 和 [DeKeyser 1997](https://doi.org/10.1017/S0272263197002040)。表中观察方式是本项目设计推论。

## 显性、隐性、陈述与程序不是一条轴

至少要分别记录教学方式、学习过程、知识的可意识访问性，以及记忆系统的理论解释。显性教学不意味着只能产生显性测验收益。反馈实验表明，不同类型的测验可能都出现收益，但仍需保留测量解释的限制。[Ellis、Loewen 与 Erlam 2006](https://doi.org/10.1017/S0272263106060141)

Ellis 2005 的多个任务共同用于构念评估。单个限时判断或一次流利产出不能成为“隐性知识检测器”。陈述与程序在技能习得理论中也可指知识表征，在 Ullman 模型中则指具有神经认知主张的记忆系统。两种用法不能因为中文术语相同就互换。[Ellis 2005](https://doi.org/10.1017/S0272263105050096)，[Ullman 2004](https://pubmed.ncbi.nlm.nih.gov/15037131/)

## 邻近材料的取用与纠偏

本轮阅读 `language-learning-asset-library/docs/ontology.md`、C33 与 C59 的 `SKILL.md`，以及 sibling `language-learning-studio-sop-kit` 的 `writing-scaffolding/SKILL.md`、`sentence-explorer/SKILL.md`。还阅读 `pedagogical-grounding-engine/README.md` 与 `references/kg-vocabulary.md`。

资产中的尝试、解释、产出、撤除支持与换材料再用，为候选关联提供活动描述。Grounding engine 的主张到设计的追溯方式，为 `basis` 与设计推论标记提供本地参考。它们不是外部研究证据。

本地 `writing-scaffolding` 将 plus-one 归于 ZPD 与策略教学，`sentence-explorer` 将 i+1 用于知识提示。初版没有沿用这些术语的等同关系。C33 与 C59 的固定分类、词语轻重和步骤约束也是各自的产品契约，不能据此认定其分类是完整语言学本体。

C59 材料中“英语必须摆出显性连接标记”的普遍断言不成立。英语也有隐含语篇关系，PDTB 官方文档明确记录这种现象。当前图谱只允许“该活动要求学习者显式表达所选关系”的设计说明。它不接受“汉语不需要逻辑、英语需要逻辑”或固定民族思维方式的推导。[PDTB 2.0 官方说明](https://catalog.ldc.upenn.edu/LDC2008T05)

这些问题在本目录中标注，没有修改源资产。日语任务只保留语义匹配建议，须由内容图谱确认真实表达、语用条件与 ID。

## Schema 的可用性与已知限制

节点采用固定五类，以满足原型读取契约。`mechanism` 中有两个显式 subtype 例外，一个是知识构念的区别，一个是迁移结果构念。它们不是已证实的因果机制。类型与证据强弱分开。

`evidenceStatus` 是人工编辑标签，不承担证据合成评分。`basis` 只说明边的依据类别。不同边可以来自不同任务，不可因共享一个节点就拼成一条已验证的因果链。图中没有声称所有输入经 noticing、输出、反馈再到程序化的单一路径。

来源附着于节点与具体边。`role` 区分原始理论、实验、构念测量与批判。`access` 保留本轮访问深度。摘要核实支持有限的结论，不能替代方法、样本与统计结果的全文复核。出版年使用原始年份，不采用网页搬迁或在线回溯的日期。

跨图谱候选不具有内容 ID。实际关联当前保持为空，从结构上避免把猜测的 `kt:` ID 当成已存在节点。候选可以用于搜索与人工匹配，不能作为可导航的实际边。

## 独立审核与校验记录

独立 sub-agent `pedagogy_review` 使用本 chat 同一模型进行来源与概念审核。技能默认的外部模型在当前环境不可用，因此这不是跨模型审核，也不等于学科专家评审。

已收到独立检查清单。它要求拆开 i+1、ZPD 与 scaffolding，限制 noticing 的必要性断言，区分 uptake 与长期习得，并防止把显性教学、隐性知识和程序记忆混为一谈。这些意见已用于初稿。

独立审核随后读取完整初稿，结论为有条件通过。两项必要修正已落实。Vygotsky 访问记录在所有节点和边中统一改为原文索引摘录，并记录 PDF 访问超时。首个预测续句候选移除了不能由其任务保证的检索练习关联。其余主要概念区别、来源范围和 subtype 例外得到认可。修订后的访问元数据一致性也由校验器检查。

结构校验输出为 `PASS: 21 nodes, 21 internal edges, 17 sources, 4 pending candidates, 0 actual cross-graph edges`。另在临时副本中分别注入悬空边、重复节点 ID、空来源、错误节点类型、伪造的实际跨图谱边与候选中的伪造内容 ID。六种错误都被拒绝，原始文件没有被这些负例修改。

新增的来源元数据一致性检查和构念 subtype 检查也分别用错误副本验证。两种错误都被拒绝，累计八类负例。最终再次读取真实文件，结构校验仍通过。

独立 sub-agent 审阅了文档与 JSON，没有审阅随后加入的校验脚本。脚本的执行结果由主 agent 核对。源码没有代码注释。审核并未宣称逐篇全文方法复核。`decisions.tsv` 前四行误填的预估时间戳已由追加记录作废，只可使用其后的实际记录时间。决定内容仍保留，不用那些时间戳推断事件顺序。

## 2026-11-17 增补：年龄、阅读与多模态

本轮为按年龄分段的教学建议和绘本、多模态材料设计增补 18 个节点与 20 条内部边。新节点为 `ped:age-rate-vs-attainment`、`ped:age-instructed-settings`、`ped:age-implicit-explicit`、`ped:young-learner-characteristics`、`ped:total-physical-response`、`ped:adolescent-motivation-autonomy`、`ped:andragogy`、`ped:adult-l2-constraints`、`ped:simple-view-of-reading`、`ped:learning-to-read-vs-reading-to-learn`、`ped:dialogic-reading`、`ped:extensive-reading`、`ped:l2-reading-threshold`、`ped:multimedia-learning`、`ped:dual-coding`、`ped:picture-superiority-vocabulary`、`ped:seductive-details` 和 `ped:embodied-gesture-learning`。

核实方式：每条来源都打开了 ERIC 记录、DOI 的 Crossref 元数据或出版社公开页面。多数来源只读到摘要，记为 `official_index_abstract`（ERIC）、`publisher_abstract_via_crossref_metadata` 或 `scholarly_index_abstract`（OpenAlex）。只读到书目记录的来源（Asher 1969、Dörnyei 2009、Muñoz 2006 专著目录、Clark 与 Paivio 1991）在 `accessNote` 中说明，节点主张不依赖其正文。全文只读了 Macedonia 2014 短综述；Cameron 2001 只读第一章公开节选。

新增 `evidenceStatus` 值 `practitioner_literature_description`，用于教师教育文献的概括描述。两个学习者群体节点放入 `mechanism`，标 `subtype: learner_population_description`，它们不是因果机制。

未能核实、因此没有写入的内容：

- Alderson 1984 的门槛论述（无可打开的在线记录），门槛节点改用 Clarke 1980、Cummins 1979、Bernhardt 与 Kamil 1995 和 Jeon 与 Yamashita 2014。
- Chall 1983 专著与 Knowles 1980 修订版正文；分别以 1976 年会议论文和 1970 年版的 ERIC 摘要代替。
- Pinter 的教材类专著；只用了其 2007 年课堂研究的摘要。
- Boers 等 2017 图片注释研究（出版社拒绝访问且无可读摘要），改用 Acha 2009 与 Boers 2022 综述说明图片不一定有帮助。
- 固定的“注意力时长”分钟数、儿童“整体记忆语块”、成人“时间有限”“目标驱动”的研究出处。这些在节点中写明为未核实的通行描述或设计假设，不作为研究结论。
- `ped:cognitive-load-young-learners` 未单独建立；儿童处理图文时的工作记忆限制只见 Acha 2009 一项，写入图片注释节点的限制。

新边中的 `design_inference` 均写明来源不证明本项目效果。本轮没有进行独立 sub-agent 审核，也没有修改 `content-links.json` 候选。结构校验输出为 `PASS: 39 nodes, 41 internal edges, 67 sources, 4 pending candidates, 0 actual cross-graph edges`。

## 后续研究边界

尚未建立效应量、偏倚风险与研究质量的系统编码，也未实现学习者模型、难度计算器或复习调度器。尚未通过课堂实验验证 C33、C59 或日语对应活动。研究目录的 `shared` 不保证跨语言效果相等。

下一轮若要做产品评价，先限定学习者、语言结构、对照条件和延迟结果。将提示下成功、撤除提示后的表现及新任务表现分开，再决定是否扩充图谱。

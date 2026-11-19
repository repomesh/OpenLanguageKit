# 语言教学原语（Pedagogical Primitives）

知识点回答"要学会什么"，原语回答"学习者对什么对象做什么动作、系统怎样回应、留下什么证据、证据最多能说明什么"。这一层把 `curriculum/{en,ja,zh}` 的知识点接到可复用的教学互动上。

## 三个层次

| 层 | 文件 | 是什么 |
| --- | --- | --- |
| 原语 | `primitives.json` | 跨语言的教学设计契约，规定动作、回应、检查、证据和边界。不是按钮或组件，也不是一节课 |
| 实现 | `implementations[]` | 原语在某种语言里的可运行版本。现有实现是 `edu-ai-builders/language-learning-asset-library` 的英语 asset（`cNN-*`），这里只引用、不复制 |
| 绑定 | `../{lang}/primitive-map.json` | 每个知识点用哪几个原语，以及这一次具体比较什么、用什么材料、检查什么 |

`status` 的取值：

- `implemented-en`：有可运行的英语实现。
- `partial`：现有实现只覆盖一部分，比如只有阅读方向。
- `spec`：只有契约，还没有任何实现。这类原语就是"需要新建"的缺口。

## 原语契约字段

| 字段 | 说明 |
| --- | --- |
| `id` `name` `nameEn` `family` `oneLine` | 标识。`family` 是学习困难所在的领域，见 `families` |
| `difficulty` | 解决的具体困难，写到能观察的程度。不是"语法不好"，而是"读的时候跳过词尾" |
| `object` | 学习者从头到尾持续处理的那个对象：一段录音、一份自己的稿子、一张场景图。整个原语都作用在它上面 |
| `requires` | 进入前学习者必须已有的东西；没有就退到 `fallback` |
| `learnerAction` | 通常三步：①结构摆出来，学习者必须动手改它；②锁定的分类，逐题判断，最后一类是"反向那一半"；③自己产出，被可执行检查卡住 |
| `systemResponse` | 每个动作之后系统改变了什么：载体上的什么东西变了，不是"显示对错" |
| `ui` | `screen`（一屏上有什么、怎么排）、`interactions`（键盘与触屏操作）、`childVariant`、`adultVariant`、`accessibility` |
| `trigger` | `kcSignals`：知识点的哪些特征把它路由到这里；`learnerSignals`：学习者的行为或老师的原话；`contraindications`：什么情况下不该用 |
| `check` | `rules`：可执行的检查，要求两头同时卡（既卡太弱，也卡投机）；`independence`：怎样区分独立完成和看过提示或答案后的完成 |
| `evidence` | `events`：用 asset library 的 evidence-event 词表；`retained`：留在载体上的痕迹；`licensed`：这些证据最多能支持什么判断，形如 `{claim, maxStrength: suspected/tentative/supported, minObservations}`；`prohibited`：不许据此推出的判断 |
| `scaffold` | `hints`：由轻到重的提示阶梯；`fade`：什么时候撤掉支持 |
| `reverseHalf` | 反向那一半：教一个倾向，就要给出它的边界或反例 |
| `failureModes` | `{failure, mitigation, test}`：会怎样失效、怎样防、用什么对抗样例测 |
| `stacksWith` | 纵向叠合：哪些原语可以在同一个对象、同一次操作里一起起作用，以及怎样起作用 |
| `next` `fallback` | 顺下去接哪个；做不动退到哪个（`null` 表示没有更浅的一步） |
| `languages` | `en` `ja` `zh` 各自的参数：对立集合、材料来源、语言特有的陷阱 |

## 绑定文件

`curriculum/{lang}/primitive-map.json`：

```json
{"lang": "ja", "map": [
  {"kc": "kt:ja-wa-ga-contrast", "uses": [
    {"primitive": "prim:choose-by-intent", "role": "primary",
     "binding": "对立集合 は/が；材料是一问一答和民间故事开头；检查新信息位置是否选が、对比句是否选は"}
  ]}
]}
```

- 每个知识点至少一个 `primary`，最多三个原语。
- `binding` 只写这个知识点特有的部分：比较什么、用什么材料、检查什么。原语契约里已经写过的通用内容不要重复。

## 按年龄段的教学法

`age-bands.json`（英文版 `age-bands.en.json`）把学习者分成三个年龄段：12 岁以下（`child`，细分为未识字的 5–7 岁和已识字的 8–12 岁）、12 岁到大学（`youth`）、成人（`adult`）。

- `bands[].dimensions`：每个年龄段 11 个方面的做法（一次练习多长、进度和重复、先听说还是先读写、规则讲不讲、反馈、自主权、动机、图和声音和文字怎么用、阅读的定位、和谁一起学、证据给谁看）。每条有“这样做 / 避免 / 依据”。`basis: literature` 表示 `refs` 里的研究节点直接讨论了这一点；`design_inference` 表示是设计判断，没有被直接验证。
- `variants`：每个原语在三个年龄段各自怎么做。`fit` 取 `core`（适合作主要活动）、`adapt`（要调整）、`defer`（这个年龄暂不适合，`instead` 指出先用哪个原语）。
- 年龄界线是规划用的约定。学习者的识字情况、学习经验和目标优先，可以跨段取用。
- 规划器把对应年龄段写进蓝图的 `ageBand`，把每个原语的做法写进 `ageVariant`。

## 年龄怎样变成设计（age-design.json）

`age-bands.json` 说每个年龄段“怎么做”，`age-design.json` 说“为什么这样做、变的是哪个量、变在哪一层、拿什么检验”。十个概念，每个走同一条链：

1. **研究怎么说**（`construct.claim`，`refs` 指向 `pedagogy/graph.json`，`basis` 标明是文献还是设计推断）；
2. **我们怎么理解**（`understood`）和这个理解的**边界**（`limits`）；
3. **设计变量**（`variables`）：每个变量在三个年龄段各取什么值，属于哪一层（`kc` 知识点、`plan` 课程方案、`block` 练习页面）；
4. **记录什么来检验**（`measures`）：`source: block` 表示练习页面的证据事件里已经有，`host` 表示要由承载它的 app 记录。

年龄不只改变练习页面。`layers` 写明三层各自不变的和变的：知识点的语言事实不变，变的是选哪些、先后、用不用术语；课程方案的先修关系不变，变的是一次多久、一周多少、回访几成（`planDefaults`，规划器直接取用）；练习页面的契约和证据规则不变，变的是任务怎么给出、一屏多少、规律说不说、反馈怎么措辞。

`blocks.<积木>` 逐个写明一个页面实际变了哪几个量（只写页面真的做了的）。不是每个积木都要分年龄：差别确实大的才分，分了就在这里写清楚。`build.py` 据此生成 `blocks/age-design.js`，页面用 `KTBlock.ageWhy(slug, band)` 显示“这一版和其他年龄的版本有什么不同，为什么”。规划器把当前年龄段的取值写进蓝图的 `ageDesign`。

这些取值是设计起点，没有在学习者身上验证过。

## 工作流

`workflows.json`（英文版 `workflows.en.json`）为一个教学场景把几个原语排成一次完整的活动，并写明图、声音、文字在每一步各自做什么。原语契约里的检查、证据和反向那一半不变。

同一个场景可以因目的不同而有不止一个工作流。绘本阅读现在有两个：`wf:picture-book-learn-to-read`（学习阅读：听得懂但读不出，练解码）和 `wf:picture-book-read-to-learn`（通过阅读学习：读得出但词汇和理解跟不上）。两者的材料、节奏、图的作用都不同，先分清是哪一种再做。

## 图片的用途和图片指令

`image-roles.json`（英文版 `image-roles.en.json`）列出图片在教学里的八种用途。每种写明图上必须有什么、不能有什么、能不能用图片模型生成、在三个年龄段各放在页面什么位置、适用于哪些原语。纯装饰的图没有用途。图片里不生成文字，文字由页面排版。真实材料（菜单、表格）用 HTML 做；空间和方向图用代码画。

`blueprint/image-brief.js` 把用途、年龄段和事实清单变成给图片模型的提示语、摆放位置和验收清单。它不调用任何图片服务；生成的图要由人逐条核对之后才能用。

```sh
node blueprint/image-brief.js --list
node blueprint/image-brief.js --role book-page --band child --setting "a vegetable garden" \
  --characters "a small white rabbit with a blue scarf" --facts "the rabbit pulls a carrot out of the ground" --frame 2/6
```

## 检查

```sh
python3 curriculum/primitives/check.py   # 契约字段、引用、三种语言的绑定覆盖 -> coverage.md
```

## 来源与边界

- 契约形式综合了四处来源：
  - asset library 的 `ontology.md`：三步结构、锁定分类、反向那一半、两头同时卡。
  - asset library 的 `runtime/asset-index.json`：material、signal、next、fallback。
  - EduOS 的 `primitive.yaml`：适用条件、可推出的判断及其最大强度、被禁止的反馈。
  - math-viz-kit 的原语候选写法。
- 这是一套候选的设计语言，不是经过验证的分类，也不声称已有学习效果。
- `spec` 状态的原语没有经过实际学习者使用。

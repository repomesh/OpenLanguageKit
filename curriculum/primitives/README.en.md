# Pedagogical primitives for language teaching (Pedagogical Primitives)

> English translation of [README.md](README.md). The Chinese file is the source; if the two differ, it wins.

A knowledge point answers "what must be learned"; a primitive answers "what action the learner performs on what object, how the system responds, what evidence is left, and the most that evidence can show". This layer connects the knowledge points of `curriculum/{en,ja,zh}` to reusable teaching interactions.

## Three layers

| Layer | File | What it is |
| --- | --- | --- |
| Primitive | `primitives.json` | A cross-language teaching-design contract that specifies the action, the response, the check, the evidence and the boundaries. It is not a button or a component, and not a lesson |
| Implementation | `implementations[]` | A runnable version of a primitive in one language. The existing implementations are the English assets (`cNN-*`) of `edu-ai-builders/language-learning-asset-library`; they are only referenced here, not copied |
| Binding | `../{lang}/primitive-map.json` | Which primitives each knowledge point uses, and what exactly is compared, what material is used and what is checked this time |

Values of `status`:

- `implemented-en`: there is a runnable English implementation.
- `partial`: the existing implementation covers only part of it, for example only the reading direction.
- `spec`: contract only, with no implementation at all yet. These primitives are the gaps that "need to be built".

## Primitive contract fields

| Field | Description |
| --- | --- |
| `id` `name` `nameEn` `family` `oneLine` | Identification. `family` is the area where the learning difficulty lies; see `families` |
| `difficulty` | The specific difficulty it addresses, written down to something observable. Not "weak grammar" but "skips word endings when reading" |
| `object` | The object the learner keeps working on from start to finish: a recording, a draft of their own, a scene picture. The whole primitive acts on it |
| `requires` | What the learner must already have before entering; without it, fall back to `fallback` |
| `learnerAction` | Usually three steps: (1) a structure is laid out and the learner must change it by hand; (2) locked categories, judged item by item, the last category being "the reverse half"; (3) the learner's own production, held by an executable check |
| `systemResponse` | What the system changes after each action: what changes on the object, not "show right or wrong" |
| `ui` | `screen` (what is on one screen and how it is laid out), `interactions` (keyboard and touch operations), `childVariant`, `adultVariant`, `accessibility` |
| `trigger` | `kcSignals`: which features of a knowledge point route it here; `learnerSignals`: learner behaviour or a teacher's own words; `contraindications`: when it should not be used |
| `check` | `rules`: executable checks, required to hold both ends at once (catching both too-weak answers and gaming); `independence`: how to tell independent completion from completion after seeing a hint or the answer |
| `evidence` | `events`: uses the asset library's evidence-event vocabulary; `retained`: the traces left on the object; `licensed`: the most these pieces of evidence can support, in the form `{claim, maxStrength: suspected/tentative/supported, minObservations}`; `prohibited`: judgments that must not be inferred from them |
| `scaffold` | `hints`: the hint ladder, from light to heavy; `fade`: when support is withdrawn |
| `reverseHalf` | The reverse half: when you teach a tendency, you must give its boundary or counterexamples |
| `failureModes` | `{failure, mitigation, test}`: how it can fail, how to prevent that, and which adversarial cases to test with |
| `stacksWith` | Vertical stacking: which primitives can work together on the same object in the same operation, and how |
| `next` `fallback` | Which one follows next; which one to fall back to when the learner cannot do it (`null` means there is no shallower step) |
| `languages` | Parameters for each of `en` `ja` `zh`: contrast sets, sources of material, language-specific traps |

## Binding files

`curriculum/{lang}/primitive-map.json`:

```json
{"lang": "ja", "map": [
  {"kc": "kt:ja-wa-ga-contrast", "uses": [
    {"primitive": "prim:choose-by-intent", "role": "primary",
     "binding": "对立集合 は/が；材料是一问一答和民间故事开头；检查新信息位置是否选が、对比句是否选は"}
  ]}
]}
```

(The `binding` text in this example reads: "contrast set は/が; the material is question-and-answer pairs and folk-tale openings; check whether が is chosen in the new-information position and は in contrastive sentences".)

- Each knowledge point has at least one `primary` and at most three primitives.
- `binding` states only what is specific to this knowledge point: what is compared, what material is used, what is checked. Do not repeat general content already written in the primitive contract.

## Teaching method by age band

`age-bands.en.json` (Chinese original: `age-bands.json`) puts learners in three bands: under 12 (`child`, split into pre-literate 5–7 and literate 8–12), 12 to university (`youth`), and adults (`adult`).

- `bands[].dimensions`: for each band, practice on 11 points (session length, pace and repetition, listening and speaking first or reading and writing, whether rules are explained, feedback, autonomy, motivation, how pictures, sound and text are used, the role of reading, who the learner works with, who sees the evidence). Each has do / avoid / basis. `basis: literature` means the research nodes in `refs` discuss the point directly; `design_inference` means a design judgement that has not been tested directly.
- `variants`: how each primitive is done in each band. `fit` is `core` (a natural main activity), `adapt` (works with changes) or `defer` (not yet right for this band; `instead` names the primitive to use first).
- The age boundaries are planning conventions. The learner's literacy, learning experience and goals come first, and practices can be borrowed across bands.
- The planner writes the band into the blueprint as `ageBand` and each primitive's version as `ageVariant`.

## How age becomes design (age-design.json)

`age-bands.en.json` says what to do for each band; `age-design.en.json` says why, which quantity changes, on which layer, and what checks it. Ten constructs, each one chain:

1. **What research says** (`construct.claim`; `refs` point into `pedagogy/graph.json`; `basis` says literature or design inference);
2. **How we read it** (`understood`) and the **limits** of that reading (`limits`);
3. **Design variables** (`variables`): the value of each in the three bands, and its layer (`kc` knowledge points, `plan` course plan, `block` practice page);
4. **What is recorded to check it** (`measures`): `source: block` means the page's evidence events already hold it, `host` means the app hosting the page must record it.

Age changes more than the practice page. `layers` states what stays and what changes on each: the language facts of a knowledge point stay, while which points are chosen, their order and the use of terminology change; prerequisites stay in a course plan, while session length, weekly load and the share kept for revisiting change (`planDefaults`, used directly by the planner); a page's contract and evidence rules stay, while how the task is given, how much is on a screen, whether a rule is stated and how feedback is worded change.

`blocks.<slug>` lists which variables one page really changes (only what the page does). Not every block needs age versions: split only where the difference is substantive, and write it down here when you do. `build.py` generates `blocks/age-design.js` from it, and a page shows "How this version differs from the other ages, and why" with `KTBlock.ageWhy(slug, band)`. The planner writes the current band's values into `ageDesign` in the blueprint.

These values are design starting points and have not been tested with learners.

## Workflows

`workflows.en.json` (Chinese original: `workflows.json`) arranges several primitives into one complete activity for a teaching scenario, and says what the picture, the sound and the text each do at every step. The check, evidence and reverse half in the primitive contracts do not change.

One scenario can have more than one workflow, depending on purpose. Picture-book reading has two: `wf:picture-book-learn-to-read` (understands by ear but cannot read it: decoding practice) and `wf:picture-book-read-to-learn` (can read the words but vocabulary and understanding lag). Material, pace and the job of the pictures differ between them; decide which it is first.

## Picture roles and image briefs

`image-roles.en.json` (Chinese original: `image-roles.json`) lists eight roles a picture can have in teaching. Each says what the picture must show, what it must not, whether it may come from an image model, where it goes on the page in each band, and which primitives it serves. A purely decorative picture has no role. No text is generated inside a picture; the page sets the text. Real documents (menus, forms) are built as HTML; spatial and direction diagrams are drawn by code.

`blueprint/image-brief.js` turns a role, a band and a fact list into a prompt for an image model, a placement and an acceptance checklist. It calls no image service; a generated picture is used only after a person has checked it line by line.

```sh
node blueprint/image-brief.js --list
node blueprint/image-brief.js --role book-page --band child --setting "a vegetable garden" \
  --characters "a small white rabbit with a blue scarf" --facts "the rabbit pulls a carrot out of the ground" --frame 2/6
```

## Checks

```sh
python3 curriculum/primitives/check.py   # 契约字段、引用、三种语言的绑定覆盖 -> coverage.md
```

(The comment says: contract fields, references, and binding coverage for the three languages -> coverage.md.)

## Sources and boundaries

- The form of the contract combines four sources:
  - The asset library's `ontology.md`: the three-step structure, locked categories, the reverse half, holding both ends at once.
  - The asset library's `runtime/asset-index.json`: material, signal, next, fallback.
  - EduOS's `primitive.yaml`: conditions of applicability, licensed judgments and their maximum strength, prohibited feedback.
  - The way math-viz-kit writes its primitive candidates.
- This is a candidate design language, not a validated taxonomy, and it does not claim any existing learning effect.
- Primitives with `spec` status have not been used by actual learners.

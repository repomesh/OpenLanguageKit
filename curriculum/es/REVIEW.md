# Spanish (es) — review notes

Course: Spanish for English-speaking learners, A1–A2, instruction language English (`path.json` → `"instructionLang": "en"`).
Source: Instituto Cervantes, *Plan curricular del Instituto Cervantes. Niveles de referencia para el español* (PCIC, 2006), A1–A2 inventories, read on 2026-11-17 from the 2011 Internet Archive snapshot of cvc.cervantes.es (the live site redirected to a maintenance page). See `sources.json` → `scope` for what was read in each inventory and where we stopped.

Numbers: 485 source units (481 PCIC + 4 supplements), 159 KCs (A1 88, A2 71), 30 path units (A1 14, A2 16), 3 tracks.

## 1. What a native-speaker teacher should check

**Variety decisions (highest priority).** The course describes a general standard Spanish and marks Peninsular / Latin American differences in `boundaries` and `forms`. Please check that each statement is accurate and not over-simplified:

- `kt:es-subject-pronouns-prodrop`, `kt:es-soc-tu-usted`, `kt:es-imperative-affirmative`: vosotros (Spain) vs ustedes (everywhere else); voseo is recognition-only.
- `kt:es-direct-object-pronouns`, `kt:es-indirect-object-pronouns`: leísmo (le for a male person / for usted) described as accepted in Spain for masculine singular persons; laísmo described as non-standard and not taught.
- `kt:es-preterito-perfecto`, `kt:es-perfecto-vs-indefinido`: the claim that most of Latin America (and Canarias, Galicia, Asturias) uses the preterite for today's events. This affects how mastery is assessed; tests must declare the variety they assume.
- Vocabulary pairs: `kt:es-lex-media-tech` (móvil/celular, ordenador/computadora), `kt:es-fn-directions-a2` (coger/tomar, girar/doblar), `kt:es-fn-telephone` and `kt:es-fn-attention-getters` (¿Diga?/¿Aló?/¿Bueno?), `kt:es-fn-celebrations-wishes` (enhorabuena/felicitaciones), `kt:es-lex-work-study` (tomar un examen), `kt:es-por-para-basic` (en la mañana).
- `kt:es-deixis-llevar-traer`: we teach a speaker-centred core and note that usage towards the listener's place varies by region.

**Content that needs a teacher's eye.**

- All Spanish example sentences are original; a native speaker should read them for naturalness, especially the colloquial ones (¡Uf!, Bueno, vale, Te dejo, que tengo que irme).
- `commonErrors` are labelled `EN:` (English-speaking learners) and, in 4 places, `ZH:` (only where we were confident, mainly object omission). Teachers of English-speaking learners should confirm frequency and add missing high-frequency errors.
- `kt:es-fn-feelings`: warning about *excitado* — check the wording is appropriate for a school audience.
- `kt:es-cult-society-arts`, `kt:es-soc-intercultural`, `kt:es-soc-greeting-customs`: cultural statements are general and hedged; please check that nothing reads as a stereotype and that examples are not only from Spain.
- `kt:es-lex-body-health`: the emergency number 112 is stated for the EU only; other countries need local numbers.

**Placement decisions.**

- `kt:es-future-simple-recognition` is placed at A2 for recognition only (`placementNote`): PCIC lists the future as an exponent of Funciones 3.10 at A2, not in Gramática 9.1 A1–A2.
- Pronunciación y prosodia is a single A1–A2 band in PCIC; we registered each heading once at A1 and spread the KCs across A1 (a1-01, a1-02, a1-03, a1-14). A teacher may prefer some prosody work later.
- Several A2 items appear as fixed chunks before their grammar is taught (e.g. *me gustaría*, *¡que te mejores!*, *se me ha olvidado*, imperatives in advice). This is noted in each KC's `boundaries`.

## 2. Uncertainties and what is unverified

- **Access.** The live CVC pages were unavailable (maintenance redirect); everything was read from the 2011 Wayback snapshot. If the 2006 text has since been corrected online, locators may need re-checking.
- **Verification levels.** 387 units are `content_checked` (Gramática, Pronunciación, Ortografía, Funciones, Tácticas, Géneros, Nociones generales: the A1/A2 cells were read). 94 are `index_checked`:
  - Nociones específicas (40): registered at chapter × level as requested; cell contents were skimmed, not read item by item.
  - Referentes culturales (18) and Saberes y comportamientos (24): these inventories are organised by phases, not CEFR levels; we registered the *fase de aproximación* headings with `level: null`. Items inside (named people, events, works) were not read in detail.
  - Habilidades y actitudes interculturales (4) and Procedimientos de aprendizaje (8): ungraded, headings only.
- **Supplements (4, `unverified`).** `sup:act-listening`, `sup:act-spoken-production`, `sup:act-mediation` point to the CEFR (2001) / Companion Volume (2020), which were not obtained this round; section numbers must be verified. `sup:lex-cognates-false-friends` is an editorial addition for English speakers.
- **Depth.** Units stop at x.y headings (Gramática 9.1, Funciones 2.9, Nociones generales 5.7) and at chapter level for Nociones específicas. Sub-bullets (e.g. Gramática 9.1.1 Presente) are not registered, so one unit can be covered by several KCs and coverage per sub-bullet is not measured.
- **Example glosses.** English glosses are natural translations, not word-for-word; where Spanish and English diverge (tense use, articles) the gloss follows English usage.

## 3. Schema misfits

- PCIC phases (aproximación / profundización / consolidación) and ungraded inventories do not map to CEFR levels; these units use `level: null` and the id suffix `@fase-aproximacion` or `@sin-nivel`.
- The Pronunciación inventory's A1–A2 band is registered at A1 with id suffix `@A1-A2`.
- Géneros 2.1 is a single worked sample (conversación transaccional) rather than a list; registered once at A2.

## 4. Gaps

- **B1 and above are not built.** Out-of-scope items are named in `boundaries` (present subjunctive, negative imperative, conditional, por/para in full, preterite/imperfect in complex narration, reported speech with tense changes, cuando + subjunctive).
- PCIC's *profundización* and *consolidación* phases of the cultural inventories are not registered.
- No audio or pronunciation models are attached; phonology KCs describe contrasts but assessment depends on a teacher or a speech tool.
- Tracks: the child track omits 12 adult or abstract KCs and the adult track omits 5; the teen/student track covers everything. Track stage sizes (13–34 KCs) are editorial estimates and have not been tested with real classes.
- No vocabulary values were added to SCHEMA.md; all notions and itemTypes come from the existing vocabularies. Notions that fitted only loosely: past-time reference uses `time-location`; sequence connectors use `sequence` + `discourse-organisation`.

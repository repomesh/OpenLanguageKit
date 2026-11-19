# French (fr) — review notes

Scope: A1 and A2 only, metropolitan standard French, instruction language English (`path.json` → `instructionLang: "en"`).
Denominator: *Inventaire linguistique des contenus clés aux niveaux du CECR* (Eaquals & CIEP, 2015), read from the full PDF on 2026-11-17.
Numbers: 309 source units (291 `content_checked`, 18 supplements `unverified`), 183 KCs (A1 109, A2 74), 31 path units, 3 tracks.

## 1. How the denominator was built

| origin | what it is | A1 | A2 |
|---|---|---|---|
| `annex_e` | every entry of Annexe E (key content by level), pp. 56–58 | 79 | 81 |
| `annex_d_less_key` | Annexe D rows whose A1/A2 cell is lightly shaded (« moins clé ») and that are not already key at or below that level | 17 | 26 |
| `annex_c` | Annexe C text types with a shaded A1/A2 cell (key or less key noted in the locator) | 42 | 15 |
| `scenario` | Annexe B scenario competences and strategies not already covered by Annexe E | 13 | 14 |
| `annex_f_only` | Annexe F realisation headings with no Annexe D/E counterpart | 2 | 2 |
| `supplement` | `sup:*` gaps with rationale (pronunciation, orthography, writing, mediation, varieties, classroom language) | — | — |

Annexe C and D level cells are shading only; they were read visually from rendered page images. A teacher should spot-check the shading reading for Annexe D pp. 44–54 and Annexe C pp. 40–43 (light vs dark is sometimes hard to tell in the PDF rendering).

## 2. Placement decisions to confirm

24 KCs carry a `placementNote`. The main patterns:

- **Pronunciation in A1** (`phon-linking`, `phon-prosody`): the Inventaire names « liaisons, rythme, intonation » only in the A2 scenario; they are placed in A1 because elision and intonation questions are needed from the first sentences.
- **Annexe D « moins clé » at A1, key at A2 in Annexe E** — introduced at A2: comparison, agreement/disagreement, outing suggestions, telephone, polite interruption, presenting a country, education, health (prescriptions), physical states.
- **Text types shaded from A1** (press headings, horoscopes, adverts, sports news, user manuals) — grouped into A2 activity KCs (`act-read-press`, `act-listen-media`, `fn-instructions-device`).
- **Nominalisation**: listed in the A1 scenario (Annexe B) and as « moins clé » at A2 in Annexe D; introduced at A2.

## 3. Items for a native-speaker teacher

- **Irregular verbs at A1**: which irregular presents belong in `g-present-irregular` (currently aller, faire, prendre, venir, finir, partir/sortir/dormir; the modals pouvoir/vouloir/devoir plus savoir are in `g-modals`). Annexe E lists devoir/pouvoir/vouloir and Annexe F's examples add savoir; check whether savoir vs connaître belongs at A1 or A2.
- **Feminine job titles** (`lex-jobs`): forms such as *autrice/auteure*, *professeure*, *cheffe* differ between France, Belgium, Switzerland and Québec; current examples use forms common in France — confirm.
- **Numbers** (`lex-numbers-70-plus`, `soc-varieties`): septante/nonante (Belgium, Switzerland), huitante (Vaud, Valais, Fribourg); confirm the canton list before using it in drills.
- **Meals** (déjeuner/dîner/souper) and Québec vocabulary in `soc-varieties`: recognition only; confirm examples are idiomatic.
- **Typography** (`orth-punctuation`): Swiss and Québec spacing rules before ? ! ; were stated from general knowledge — check against a style guide.
- **Spoken register** (`soc-spoken-register`, `g-on`): which reduced forms (j'sais pas, y a) are fine to show at A2.
- **Il faut que + subjonctif** (`g-il-faut-subjunctive`): Annexe D places it at A2 « moins clé »; the KC limits it to a few chunks — confirm the chunk list.
- **Common errors labelled (ZH)** (7 entries in A1 pronunciation/orthography and early grammar KCs) were added only where the error pattern is well attested; a teacher of Chinese-speaking learners should check them.
- **Examples**: all French examples and English glosses are original; a native speaker should read every example once for naturalness, especially in A2 functional KCs (complaints, formal email, telephone).

## 4. Source uncertainties

- **Annexe D duplicate row**: Annexe D, Discours · Fonctions interactives, shows « Interrompre poliment pour faire répéter » where Annexe F's corresponding heading is « Interpeller » (registered separately as `inv-f:interpeller-a1/-a2`). It was registered as printed; it may be a layout duplication.
- **Annexe F** typographic status (italic headings that may mark non-key content) was not checked item by item; only four headings without Annexe D/E counterparts were registered.
- **Annexe E A2 grammar** entries 11+ are on p. 58; column order on pp. 56–57 was fixed from page images.
- The Inventaire says its lists are « non exhaustifs » and do not cover orthography or pronunciation in detail (§5); the 18 `sup:*` units fill this and cite the CEFR 2001 by section only. **The CEFR 2001 was not re-read in this round** (`accessStatus: unavailable`, all supplements `unverified`).
- France Éducation International's mirror was not needed (the Eaquals PDF parsed).

## 5. Known gaps

- **B1 and above are not built.** Several KCs mark their upper boundary as B1 (full subjunctive, reported speech, passé simple production, literary reading, derivation).
- No `legacyIds`: French has no v1 content slice to inherit citations from.
- Primitive bindings reference the `fr-alphabet` and `fr-blend` block packs only implicitly (through `prim:sound-spelling-blend` / `prim:sound-contrast`); no French artifacts are registered for specific KCs yet.
- Tracks select and reorder only; required prerequisites of pulled-forward KCs are added to the same stage automatically (adult track: 18 such pulls in stages 2 and 4).

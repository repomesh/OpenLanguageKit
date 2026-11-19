/* Blueprint planner: a learner profile -> a course plan an app can be built from.
 * Runs in the browser (index.html) and in Node (blueprint/plan.js); both produce the same blueprint.
 *
 *   const planner = KTPlanner({ curriculum, primitives, catalog, science, profiles });
 *   planner.rankTracks({ lang: 'ja', age: '8-12', start: 'zero' })
 *   planner.diagnosis('ja', 'ja-hobby')                 // can-do probes per stage (self-report, not a test)
 *   planner.plan({ lang, track, age, who, startStage, minutesPerDay, daysPerWeek, device, theme, outLang })
 *
 * outLang ('zh' | 'en') is the language of everything the planner itself writes (PLAN.md, the prompt, notes,
 * invariants, labels). Default: the course's instructionLang when that is 'en' (Spanish, French), otherwise 'zh'.
 * Course content (knowledge points, bindings, track texts) is passed through in whatever language it is stored in.
 *
 * The planner only selects and schedules what the curriculum already contains. It never invents
 * knowledge points, difficulty numbers or mastery estimates; every scheduling number is a stated assumption. */
(function (global) {
  'use strict';
  var SCHEMA = 'language-atlas-blueprint/1';
  var LANGS = { en: '英语', ja: '日语', zh: '中文', es: '西班牙语', fr: '法语' };
  var AGES = { '5-7': '5–7 岁', '8-12': '8–12 岁', '13-17': '13–17 岁', '18-22': '18–22 岁（大学）', adult: '成人' };
  // Track profiles know four audiences; a university-age learner is matched to tracks as an adult.
  function trackAge(a) { return a === '18-22' ? 'adult' : a; }
  var WHO = { self: '我自己', child: '我的孩子', students: '我的学生' };
  var DEVICES = { phone: '手机', tablet: '平板', web: '网页', print: '打印和纸笔' };
  var LANGS_EN = { en: 'English', ja: 'Japanese', zh: 'Chinese', es: 'Spanish', fr: 'French' };
  var AGES_EN = { '5-7': 'ages 5–7', '8-12': 'ages 8–12', '13-17': 'ages 13–17', '18-22': 'ages 18–22 (university)', adult: 'adult' };
  var WHO_EN = { self: 'myself', child: 'my child', students: 'my students' };
  var DEVICES_EN = { phone: 'phone', tablet: 'tablet', web: 'web', print: 'print and paper' };
  // primitives.json names its families in Chinese only; used unless the bundle carries `familiesEn`.
  var FAMILIES_EN = { perceive: 'Perception and pronunciation', decode: 'Script and decoding', lexis: 'Words and chunks', form: 'Grammar forms',
    structure: 'Sentences and texts', listen: 'Listening for information', interact: 'Interaction and appropriateness', produce: 'Producing and revising', transfer: 'Transfer' };
  var COMPONENT_ZH = { grammatical: '语法', lexical: '词汇', topic: '话题', phonological: '语音', orthographic: '拼写与文字',
    functional: '功能', discourse: '语篇', sociolinguistic: '社会语言', strategic: '策略', activity: '听说读写活动' };

  function KTPlanner(o) {
    var C = o.curriculum || {};
    var P = o.primitives || { primitives: [], families: {} };
    var CAT = o.catalog;
    var SCI = o.science || { families: {}, planning: [], nodes: {} };
    var PROFILES = o.profiles || {};
    var PRIM = {}; P.primitives.forEach(function (p) { PRIM[p.id] = p; });
    var AGEB_ZH = P.ageBands || { bands: [], variants: {}, dimensionLabels: {} };
    var AGEB_EN = P.ageBandsEn || AGEB_ZH;   // English age data, bundled by curriculum/build.py; falls back to the Chinese
    var CAT_EN = o.catalogEn || CAT;         // a catalog built with lang: 'en', for English page titles
    /** The age band (teaching method) for an age group: child | youth | adult, with the sub-band that applies. */
    function ageBand(age, ol) {
      var AGEB = ol === 'en' ? AGEB_EN : AGEB_ZH;
      var b = AGEB.bands.find(function (x) { return x.ages.indexOf(age) >= 0; });
      if (!b) return null;
      var sub = (b.subBands || []).find(function (x) { return x.ages.indexOf(age) >= 0; }) || null;
      return { id: b.id, label: b.label, summary: b.summary, subBand: sub ? { id: sub.id, note: sub.note } : null,
        dimensions: Object.keys(b.dimensions).map(function (k) { var d = b.dimensions[k]; return { id: k, label: AGEB.dimensionLabels[k] || k, do: d.do, avoid: d.avoid, basis: d.basis, refs: d.refs || [] }; }) };
    }
    var AGED_ZH = P.ageDesign || { layers: [], constructs: [], planDefaults: {} };
    var AGED_EN = P.ageDesignEn || AGED_ZH;
    /** The age-design chain for one band: every construct with this band's value of each design variable. */
    function ageDesign(bandId, ol) {
      var AGED = ol === 'en' ? AGED_EN : AGED_ZH;
      if (!bandId || !AGED.constructs.length) return null;
      return { note: AGED.note, layers: AGED.layers, constructs: AGED.constructs.map(function (c) {
        return { id: c.id, label: c.label, question: c.question, answer: c.answer ? c.answer[bandId] : '', claim: c.construct.claim, understood: c.construct.understood, limits: c.construct.limits,
          basis: c.construct.basis, refs: c.construct.refs,
          variables: c.variables.map(function (v) { return { id: v.id, label: v.label, layer: v.layer, value: v.values[bandId] }; }),
          measures: c.measures };
      }) };
    }
    function ageVariant(primId, bandId, ol) { var v = ((ol === 'en' ? AGEB_EN : AGEB_ZH).variants || {})[primId]; return v && bandId ? v[bandId] || null : null; }
    /** Output language of a plan: profile.outLang if given, else the course's instruction language when it is English, else Chinese. */
    function outLangOf(profile, lang) {
      if (profile && (profile.outLang === 'en' || profile.outLang === 'zh')) return profile.outLang;
      return C[lang] && C[lang].path && C[lang].path.instructionLang === 'en' ? 'en' : 'zh';
    }
    function primName(p, ol) { return ol === 'en' ? p.nameEn || p.name : p.name; }
    function primOneLine(p, ol) { return ol === 'en' ? p.oneLineEn || p.oneLine : p.oneLine; }
    function familyLabel(f, ol) { return ol === 'en' ? (P.familiesEn || {})[f] || FAMILIES_EN[f] || P.families[f] : P.families[f]; }
    var api = { SCHEMA: SCHEMA, LANGS: LANGS, AGES: AGES, WHO: WHO, DEVICES: DEVICES, LANGS_EN: LANGS_EN, outLang: function (lang, outLang) { return outLangOf({ outLang: outLang }, lang); } };

    function kcIndex(lang) { var m = {}; C[lang].kcs.forEach(function (k) { m[k.id] = k; }); return m; }
    function track(lang, id) { return (C[lang].tracks || []).find(function (t) { return t.id === id; }); }
    function primaryOf(k) { var u = (k.primitives || []).find(function (x) { return x.role === 'primary'; }); return u ? { use: u, prim: PRIM[u.primitive] } : null; }
    function coverageCount(kcs, lang) {
      var n = { block: 0, impl: 0, borrow: 0, spec: 0 };
      kcs.forEach(function (k) { n[CAT ? CAT.coverage(k, lang) : 'spec']++; });
      return n;
    }

    api.languages = function () { return Object.keys(C).filter(function (l) { return (C[l].tracks || []).length; }); };

    /** Tracks of one language, best fit first. Fit = age band match, then starting point match. */
    api.rankTracks = function (profile) {
      var lang = profile.lang;
      return (C[lang].tracks || []).map(function (t, order) {
        var p = PROFILES[t.id] || { ages: [], start: 'zero' };
        var ageFit = profile.age ? p.ages.indexOf(trackAge(profile.age)) >= 0 : false;
        var BANDS = ['5-7', '8-12', '13-17', 'adult'], at = BANDS.indexOf(trackAge(profile.age));
        // how many age bands away the nearest intended audience is (0 = fits); used to order tracks that do not fit
        var ageGap = at < 0 || !p.ages.length ? 0 : Math.min.apply(null, p.ages.map(function (a) { return Math.abs(BANDS.indexOf(a) - at); }));
        var startFit = profile.start ? p.start === profile.start : false;
        var kc = kcIndex(lang), all = [];
        t.stages.forEach(function (s) { s.kcs.forEach(function (id) { if (kc[id]) all.push(kc[id]); }); });
        return { id: t.id, title: t.title, learner: t.learner, goal: t.goal, entry: t.entry, adapt: t.adapt, assumes: t.assumes,
          stages: t.stages.map(function (s) { return { title: s.title, band: s.band, kcs: s.kcs.length }; }),
          kcCount: all.length, coverage: coverageCount(all, lang), ages: p.ages, start: p.start,
          fit: (ageFit ? 2 : 0) + (startFit ? 1 : 0), ageFit: ageFit, ageGap: ageGap, startFit: startFit, order: order };
      }).sort(function (a, b) { return b.fit - a.fit || a.ageGap - b.ageGap || a.order - b.order; });
    };

    /** Can-do probes for finding a starting stage. Up to `per` knowledge points per stage, spread over components.
     *  This is a self-report (or a parent's / teacher's observation). It is not a calibrated placement test. */
    api.diagnosis = function (lang, trackId, per) {
      var t = track(lang, trackId), kc = kcIndex(lang); per = per || 4;
      if (!t) return [];
      return t.stages.map(function (s, i) {
        var list = s.kcs.map(function (id) { return kc[id]; }).filter(function (k) { return k && (k.mastery || []).length; });
        var seen = {}, picked = [];
        // one per component first, in path order; then fill by even spacing
        list.forEach(function (k) { if (picked.length < per && !seen[k.component]) { seen[k.component] = 1; picked.push(k); } });
        for (var j = 0; picked.length < Math.min(per, list.length) && j < list.length; j += Math.max(1, Math.floor(list.length / per))) {
          if (picked.indexOf(list[j]) < 0) picked.push(list[j]);
        }
        picked.sort(function (a, b) { return list.indexOf(a) - list.indexOf(b); });
        return { stage: i, title: s.title, band: s.band, probes: picked.map(function (k) {
          var e = (k.examples || [])[0];
          return { kc: k.id, label: k.label, canDo: k.mastery[0], example: e ? e[lang] : null, gloss: e ? (lang === 'zh' ? e.en : e.zh || e.en) : null, itemTypes: k.itemTypes || [] };
        }) };
      });
    };

    /** answers: { '<stage>:<kc>': 'yes' | 'unsure' | 'no' }. Start at the first stage where fewer than 3 in 4 probes are 'yes'. */
    api.placement = function (lang, trackId, answers) {
      var stages = api.diagnosis(lang, trackId), start = 0, detail = [];
      for (var i = 0; i < stages.length; i++) {
        var probes = stages[i].probes, answered = 0, yes = 0;
        probes.forEach(function (p) { var a = answers[i + ':' + p.kc]; if (a) answered++; if (a === 'yes') yes++; });
        detail.push({ stage: i, yes: yes, answered: answered, of: probes.length });
        if (!answered || yes / probes.length < 0.75) { start = i; break; }
        start = Math.min(i + 1, stages.length - 1);
      }
      return { startStage: start, basis: 'self-report', detail: detail };
    };

    function compactKC(k, lang) {
      return { id: k.id, label: k.label, component: k.component, unit: k.unit,
        mastery: k.mastery || [], examples: (k.examples || []).slice(0, 2), commonErrors: (k.commonErrors || []).slice(0, 2),
        itemTypes: k.itemTypes || [], prerequisites: (k.prerequisites || []).filter(function (p) { return p.strength === 'required'; }).map(function (p) { return p.id; }) };
    }

    api.plan = function (profile) {
      var lang = profile.lang, t = track(lang, profile.track);
      if (!C[lang] || !t) throw new Error('unknown language or track: ' + lang + ' / ' + profile.track);
      var kc = kcIndex(lang);
      var ol = outLangOf(profile, lang), en = ol === 'en';
      function T(zh, enText) { return en ? enText : zh; }
      var band = ageBand(profile.age || 'adult', ol);
      var startStage = Math.max(0, Math.min(t.stages.length - 1, +profile.startStage || 0));
      var minutesPerDay = +profile.minutesPerDay || 15, daysPerWeek = +profile.daysPerWeek || 5;
      var child = profile.age === '5-7' || profile.age === '8-12';
      // Planning assumption, not a measurement: one knowledge point takes about two short encounters.
      // Age changes the plan, not only the pages: time per knowledge point, share of the week kept for revisiting and
      // the length of one sitting come from age-design.json (planDefaults), all stated as assumptions.
      var PD = (AGED_ZH.planDefaults || {})[band ? band.id : 'adult'] || {};
      var minutesPerKc = +profile.minutesPerKc || PD.minutesPerKc || (child ? 25 : 30);
      var reviewShare = PD.reviewShare || 0.2, sessionMinutes = PD.sessionMinutes || 30;
      var perWeek = Math.max(1, Math.floor(minutesPerDay * daysPerWeek * (1 - reviewShare) / minutesPerKc));

      var steps = [], primUse = {}, agenda = [], week = 1, prevWeek = [];
      t.stages.forEach(function (s, si) {
        if (si < startStage) return;
        var list = s.kcs.map(function (id) { return kc[id]; }).filter(Boolean);
        list.forEach(function (k) {
          var pr = primaryOf(k), cov = CAT ? CAT.coverage(k, lang) : 'spec';
          var arts = CAT ? (en ? CAT_EN : CAT).artifactsForKC(k, lang) : [];
          var page = arts.find(function (a) { return a.kind === 'block' && !a.reference; }) ||
            (lang === 'en' && pr && pr.prim ? arts.find(function (a) { return a.kind === 'asset' && a.primitive === pr.prim.id; }) : null);
          steps.push({ stage: si, kc: compactKC(k, lang), coverage: cov,
            primitive: pr && pr.prim ? { id: pr.prim.id, name: primName(pr.prim, ol), family: pr.prim.family, binding: pr.use.binding, age: ageVariant(pr.prim.id, band && band.id, ol) } : null,
            support: (k.primitives || []).filter(function (u) { return u.role !== 'primary' && PRIM[u.primitive]; }).map(function (u) { return { id: u.primitive, name: primName(PRIM[u.primitive], ol), binding: u.binding }; }),
            page: page ? { title: page.title, kind: page.kind, src: page.src, id: page.id } : null });
          if (pr && pr.prim) {
            var e = primUse[pr.prim.id] || (primUse[pr.prim.id] = { n: 0, ready: 0, first: steps.length });
            e.n++; if (page) e.ready++;
          }
        });
        for (var i = 0; i < list.length; i += perWeek) {
          var focus = list.slice(i, i + perWeek);
          agenda.push({ week: week++, stage: si, stageTitle: s.title, band: s.band,
            focus: focus.map(function (k) { return k.id; }), labels: focus.map(function (k) { return k.label; }),
            review: prevWeek.map(function (k) { return k.id; }), coverage: coverageCount(focus, lang) });
          prevWeek = focus;
        }
      });

      var prims = Object.keys(primUse).map(function (id) {
        var p = PRIM[id], u = primUse[id];
        return { id: id, name: primName(p, ol), nameEn: p.nameEn, family: p.family, familyLabel: familyLabel(p.family, ol), oneLine: primOneLine(p, ol), status: p.status,
          kcCount: u.n, kcsWithPage: u.ready, firstUsedAtStep: u.first,
          difficulty: p.difficulty, object: p.object, requires: p.requires, learnerAction: p.learnerAction, systemResponse: p.systemResponse,
          ui: p.ui, check: p.check, evidence: p.evidence, scaffold: p.scaffold, reverseHalf: p.reverseHalf,
          implementations: p.implementations || [], ageVariant: ageVariant(id, band && band.id, ol) };
      }).sort(function (a, b) { return b.kcCount - a.kcCount; });

      var all = steps.map(function (s) { return kc[s.kc.id]; });
      var families = {}; prims.forEach(function (p) { families[p.family] = 1; });
      var science = Object.keys(families).map(function (f) {
        return { family: f, label: familyLabel(f, ol), references: (SCI.families[f] || []).map(function (r) {
          var n = SCI.nodes[r.ped] || {}; return { id: r.ped, label: n.label, evidenceStatus: n.evidenceStatus, why: r.note, limitation: n.limitation };
        }) };
      });

      return {
        schema: SCHEMA,
        profile: { who: profile.who || 'self', age: profile.age || 'adult', lang: lang, start: profile.start || (startStage ? 'some' : 'zero'),
          minutesPerDay: minutesPerDay, daysPerWeek: daysPerWeek, device: profile.device || 'web', theme: profile.theme || '', need: profile.need || '', l1: profile.l1 || 'zh', outLang: ol },
        ageFit: !PROFILES[t.id] || PROFILES[t.id].ages.indexOf(trackAge(profile.age || 'adult')) >= 0,
        ageBand: band,
        ageDesign: ageDesign(band && band.id, ol),
        track: { id: t.id, title: t.title, learner: t.learner, goal: t.goal, entry: t.entry, adapt: t.adapt, assumes: t.assumes,
          stages: t.stages.map(function (s, i) { return { index: i, title: s.title, band: s.band, kcs: s.kcs.length, included: i >= startStage }; }) },
        start: { stage: startStage, basis: profile.startBasis || (startStage ? 'chosen' : 'default') },
        assumptions: { minutesPerKc: minutesPerKc, reviewShare: reviewShare, kcsPerWeek: perWeek, sessionMinutes: sessionMinutes,
          sessionsPerDay: Math.max(1, Math.ceil(minutesPerDay / sessionMinutes)),
          note: T('每个知识点约 ' + minutesPerKc + ' 分钟、每周留 ' + Math.round(reviewShare * 100) + '% 的时间回访、一次不超过 ' + sessionMinutes + ' 分钟' +
            (minutesPerDay > sessionMinutes ? '（每天 ' + minutesPerDay + ' 分钟要分成 ' + Math.ceil(minutesPerDay / sessionMinutes) + ' 次）' : '') +
            '，这些数按年龄段取自 age-design.json 的 planDefaults，都是规划用的假设，不是实测的学习时间。用起来以后按学习者的实际表现调整。',
            'About ' + minutesPerKc + ' minutes per knowledge point, ' + Math.round(reviewShare * 100) + '% of each week kept for revisiting, and no more than ' + sessionMinutes + ' minutes in one sitting' +
            (minutesPerDay > sessionMinutes ? ' (so ' + minutesPerDay + ' minutes a day is split into ' + Math.ceil(minutesPerDay / sessionMinutes) + ' sittings)' : '') +
            '. These numbers come from planDefaults in age-design.json for this age band. They are planning assumptions, not measured learning times; adjust them once you see how the learner actually does.') },
        summary: { kcs: steps.length, weeks: agenda.length, coverage: coverageCount(all, lang),
          primitives: prims.length, primitivesToBuild: prims.filter(function (p) { return p.kcsWithPage < p.kcCount; }).length,
          deferredForAge: prims.filter(function (p) { return p.ageVariant && p.ageVariant.fit === 'defer'; }).map(function (p) { return p.id; }) },
        agenda: agenda,
        steps: steps,
        primitives: prims,
        diagnosis: { method: 'self-report', note: T('找起点用的是"能不能做到"的自评或家长、老师的观察，不是标定过的分级测验。要做真正的诊断题，按每个知识点的 itemTypes 和主要原语的 check.rules 出题，并保留第一次作答。',
          'The starting point comes from "can you do this?" answers by the learner, or from what a parent or teacher has seen. It is not a calibrated placement test. To write real diagnostic items, use each knowledge point\'s itemTypes and its main primitive\'s check.rules, and keep the first attempt.'),
          stages: api.diagnosis(lang, t.id).filter(function (s) { return s.stage >= startStage; }) },
        science: { basis: SCI.basis || 'design_inference', note: T('这些是设计所依据的研究想法，不表示这门课的效果已经验证。引用前先读 pedagogy/graph.json 里对应节点的 evidenceStatus 和 limitations。',
          'These are the research ideas the design leans on. They do not show that this course has been tested and works. Before citing one, read the evidenceStatus and limitations of its node in pedagogy/graph.json.'),
          families: science, planning: (SCI.planning || []).map(function (r) { var n = SCI.nodes[r.ped] || {}; return { rule: r.rule, id: r.ped, label: n.label, evidenceStatus: n.evidenceStatus, why: r.note }; }) },
        invariants: en ? INVARIANTS_EN : INVARIANTS,
        readNext: en ? ['BLUEPRINT.en.md', 'curriculum/SCHEMA.en.md', 'curriculum/' + lang + '/graph.json', 'curriculum/primitives/README.en.md', 'curriculum/primitives/primitives.json', 'blocks/README.en.md', 'blocks/registry.js', 'pedagogy/graph.json']
          : ['BLUEPRINT.md', 'curriculum/SCHEMA.md', 'curriculum/' + lang + '/graph.json', 'curriculum/primitives/README.md', 'curriculum/primitives/primitives.json', 'blocks/README.md', 'blocks/registry.js', 'pedagogy/graph.json']
      };
    };

    /** A short request a person can paste into a coding AI. Written in the blueprint's output language. */
    api.agentPrompt = function (bp, repo) {
      var p = bp.profile, ol = p.outLang === 'en' ? 'en' : 'zh';
      // the command reproduces the blueprint: name the output language only when it is not the course's default
      var flag = p.outLang && ol !== outLangOf({}, p.lang) ? ' --out-lang ' + ol : '';
      if (ol === 'en') return [
        'Please help me build a language-learning app.\n',
        '',
        p.need ? 'In my own words: ' + p.need + '\n' : '',
        'Learner: ' + WHO_EN[p.who] + ', ' + AGES_EN[p.age] + '.',
        'Language: ' + LANGS_EN[p.lang] + ', following the course plan "' + bp.track.title + '", starting at "' + bp.track.stages[bp.start.stage].title + '".',
        (bp.ageFit === false ? 'Note: this route was not planned for this age. Keep the knowledge points and their order, but redo the examples, the pacing and the interface for this age, and tell me what you changed.' : ''),
        'Time: ' + p.minutesPerDay + ' minutes a day, ' + p.daysPerWeek + ' days a week.',
        'Device: ' + DEVICES_EN[p.device] + '.' + (p.theme ? '\nThemes and style I like: ' + p.theme + '.' : ''),
        '',
        'Please use the public repository OpenLanguageKit as the source for the course and the teaching design (CC BY-NC 4.0: free for non-commercial use; commercial use needs a separate licence): ' + (repo || 'https://github.com/ywEdAi/OpenLanguageKit'),
        '1. Read BLUEPRINT.en.md in the repository root first and follow its steps.',
        '2. Generate the same blueprint I have with this command (or use the blueprint.json I attached):',
        '   node blueprint/plan.js --lang ' + p.lang + ' --track ' + bp.track.id + ' --age ' + p.age + ' --who ' + p.who + ' --start-stage ' + bp.start.stage +
          ' --minutes ' + p.minutesPerDay + ' --days ' + p.daysPerWeek + ' --device ' + p.device + flag + ' --out my-plan',
        (p.need ? '   If my own words ask for something the route does not cover, tell me what is missing and how you plan to fill it. Do not quietly leave it out.\n' : '') +
        '3. Give me a plan first: what the first two weeks cover, which pedagogical primitive each knowledge point uses, which pages can be used as they are and which have to be built. Start writing code only after I say yes.',
        '4. The interface, the story and the game mechanics are yours to design, but the invariants in the blueprint must hold (learning evidence and check rules cannot be changed).',
        (bp.ageBand ? '5. Follow the blueprint\'s ageBand (' + bp.ageBand.label + ') for how long one practice lasts, whether rules are explained, how feedback is given and how pictures and text are used; build each primitive the way its ageVariant says. A primitive marked defer does not suit this age: tell me what you plan to use instead before you build.' +
          (bp.ageDesign ? ' The blueprint\'s ageDesign lists the design variables for this age one by one, each with its value, its basis and what to record. Check every page against it before you build, and afterwards tell me how you handled each variable; a measure marked host has to be recorded by the app.' : '') : '')
      ].filter(function (l) { return l !== ''; }).join('\n').replace(/\.\nPlease use/, '.\n\nPlease use');
      return [
        '请帮我做一个语言学习应用。',
        '',
        p.need ? '我的原话：' + p.need + '\n' : '',
        '学习者：' + WHO[p.who] + '，' + AGES[p.age] + '。',
        '要学：' + LANGS[p.lang] + '，课程方案「' + bp.track.title + '」，从「' + bp.track.stages[bp.start.stage].title + '」开始。',
        (bp.ageFit === false ? '注意：这条路线不是为这个年龄排的。知识点和顺序可以沿用，例句、节奏和界面请按这个年龄重新安排，并告诉我你改了什么。' : ''),
        '时间：每天 ' + p.minutesPerDay + ' 分钟，每周 ' + p.daysPerWeek + ' 天。',
        '设备：' + DEVICES[p.device] + '。' + (p.theme ? '\n喜欢的主题和风格：' + p.theme + '。' : ''),
        '',
        '请使用 OpenLanguageKit 这个公开仓库（CC BY-NC 4.0，非商业用途免费，商用需另行授权）作为课程和教学设计的来源：' + (repo || 'https://github.com/ywEdAi/OpenLanguageKit'),
        '1. 先读仓库根目录的 BLUEPRINT.md，按里面的步骤做。',
        '2. 用下面的命令生成和我一样的蓝图（或直接使用我附上的 blueprint.json）：',
        '   node blueprint/plan.js --lang ' + p.lang + ' --track ' + bp.track.id + ' --age ' + p.age + ' --who ' + p.who + ' --start-stage ' + bp.start.stage +
          ' --minutes ' + p.minutesPerDay + ' --days ' + p.daysPerWeek + ' --device ' + p.device + flag + ' --out my-plan',
        (p.need ? '   我的原话里有路线没覆盖的要求时，先告诉我差在哪里、你打算怎么补，不要悄悄忽略。\n' : '') +
        '3. 先给我一份计划：前两周学什么、每个知识点用哪个教学原语、哪些页面可以直接用、哪些需要新做。我确认之后再开始写代码。',
        '4. 界面、故事和玩法可以自由设计，但必须遵守蓝图里的 invariants（学习证据和检查规则不能改）。',
        (bp.ageBand ? '5. 按蓝图里的 ageBand（' + bp.ageBand.label + '）来安排一次练习的长度、讲不讲规则、反馈方式和图与文字的用法；每个教学原语按它的 ageVariant 来做。标为 defer 的原语不适合这个年龄，先告诉我你打算用什么代替。' +
          (bp.ageDesign ? '蓝图的 ageDesign 逐条列出了这个年龄的设计变量取值、依据和要记录的东西：做每个页面之前先对照它，做完后告诉我每个变量你是怎么落实的；标为 host 的测量要由 app 来记录。' : '') : '')
      ].filter(function (l) { return l !== ''; }).join('\n').replace(/。\n请使用/, '。\n\n请使用');
    };

    api.markdown = function (bp) {
      if (bp.profile.outLang === 'en') return markdownEn(bp);
      var p = bp.profile, L = [];
      L.push('# 学习蓝图：' + bp.track.title, '');
      L.push('- 学习者：' + WHO[p.who] + '，' + AGES[p.age], '- 语言：' + LANGS[p.lang], '- 目标：' + bp.track.goal,
        '- 起点：' + bp.track.stages[bp.start.stage].title + '（' + bp.start.basis + '）',
        '- 时间：每天 ' + p.minutesPerDay + ' 分钟 × 每周 ' + p.daysPerWeek + ' 天，约 ' + bp.summary.weeks + ' 周，共 ' + bp.summary.kcs + ' 个知识点',
        '- 设备：' + DEVICES[p.device] + (p.theme ? '；主题：' + p.theme : ''), '', '> ' + bp.assumptions.note, '');
      var c = bp.summary.coverage;
      L.push('## 现在有什么', '', '| 有现成页面 | 可直接用 | 可借用改写 | 只有设计契约 |', '| --- | --- | --- | --- |', '| ' + [c.block, c.impl, c.borrow, c.spec].join(' | ') + ' |', '');
      L.push('## 每周日程', '', '| 周 | 阶段 | 新学 | 回访 |', '| --- | --- | --- | --- |');
      bp.agenda.forEach(function (w) { L.push('| ' + w.week + ' | ' + w.band + ' ' + w.stageTitle + ' | ' + w.labels.join('；') + ' | ' + (w.review.length ? '上周的 ' + w.review.length + ' 个' : '—') + ' |'); });
      L.push('', '## 要用到的教学原语（按用到的知识点数排序）', '', '| 原语 | 做什么 | 知识点 | 已有页面 |', '| --- | --- | --- | --- |');
      bp.primitives.forEach(function (x) { L.push('| ' + x.name + ' `' + x.id + '` | ' + x.oneLine + ' | ' + x.kcCount + ' | ' + x.kcsWithPage + ' |'); });
      if (bp.ageBand) {
        L.push('', '## 这个年龄怎么教：' + bp.ageBand.label, '', bp.ageBand.summary + (bp.ageBand.subBand ? ' ' + bp.ageBand.subBand.note : ''), '',
          '下面是按年龄段整理的做法。标“设计推断”的没有被直接验证；标“文献”的也要看 pedagogy/graph.json 里对应节点的适用范围。', '', '| 方面 | 这样做 | 避免 | 依据 |', '| --- | --- | --- | --- |');
        bp.ageBand.dimensions.forEach(function (d) { L.push('| ' + d.label + ' | ' + d.do + ' | ' + d.avoid + ' | ' + (d.basis === 'literature' ? '文献' : '设计推断') + ' |'); });
        if (bp.ageDesign) {
          var LAYER = { kc: '知识点', plan: '课程方案', block: '练习页面' };
          L.push('', '### 年龄改变的是哪些量、为什么、怎么检验', '',
            '年龄不只改变练习页面。同一门课在三层上都会变：', '');
          bp.ageDesign.layers.forEach(function (y) { L.push('- **' + y.label + '**：不变的是——' + y.stays + ' 变的是——' + y.changes); });
          L.push('', '| 设计变量 | 这个年龄的取值 | 落在哪一层 | 依据（怎么理解的） | 记录什么来检验 |', '| --- | --- | --- | --- | --- |');
          bp.ageDesign.constructs.forEach(function (c) {
            c.variables.forEach(function (v, i) {
              L.push('| ' + v.label + ' `' + v.id + '` | ' + v.value + ' | ' + LAYER[v.layer] + ' | ' + (i ? '同上' : c.understood + '（' + (c.basis === 'literature' ? '文献' : '设计推断') + '：' + c.refs.join('、') + '）') +
                ' | ' + (i ? '同上' : c.measures.map(function (m) { return m.label + (m.source === 'host' ? '（要由 app 记录）' : ''); }).join('；')) + ' |');
            });
          });
        }
        var withV = bp.primitives.filter(function (x) { return x.ageVariant; });
        if (withV.length) {
          var FIT = { core: '适合', adapt: '要调整', defer: '暂不适合' };
          L.push('', '### 每种练习在这个年龄怎么做', '', '| 原语 | 合适程度 | 怎么做 | 留意 |', '| --- | --- | --- | --- |');
          withV.forEach(function (x) { var v = x.ageVariant; L.push('| ' + x.name + ' | ' + FIT[v.fit] + (v.instead && PRIM[v.instead] ? '，改用' + PRIM[v.instead].name : '') + ' | ' + v.how + ' | ' + v.watch + ' |'); });
        }
      }
      L.push('', '## 找起点', '', bp.diagnosis.note, '');
      bp.diagnosis.stages.forEach(function (s) { L.push('### ' + s.band + ' ' + s.title, ''); s.probes.forEach(function (q) { L.push('- [ ] ' + q.canDo + (q.example ? '（例：' + q.example + '）' : '')); }); L.push(''); });
      L.push('## 设计依据', '', bp.science.note, '');
      bp.science.families.forEach(function (f) { L.push('- **' + f.label + '**：' + f.references.map(function (r) { return r.label + '（' + r.why + '）'; }).join('；')); });
      L.push('', '## 不能改的规则', ''); bp.invariants.forEach(function (r) { L.push('- **' + r.title + '**：' + r.rule); });
      L.push('', '## 知识点清单', '');
      var stage = -1;
      bp.steps.forEach(function (s, i) {
        if (s.stage !== stage) { stage = s.stage; L.push('### ' + bp.track.stages[stage].band + ' ' + bp.track.stages[stage].title, ''); }
        L.push((i + 1) + '. **' + s.kc.label + '** `' + s.kc.id + '` — ' + (s.kc.mastery[0] || '') + (s.primitive ? '｜' + s.primitive.name + '：' + s.primitive.binding : '') + (s.page ? '｜页面：' + s.page.title : ''));
      });
      return L.join('\n') + '\n';
    };

    /** PLAN.md in English: the same sections, in the same order, as the Chinese renderer above. */
    function markdownEn(bp) {
      var p = bp.profile, L = [];
      function basis(b) { return b === 'literature' ? 'literature' : 'design inference'; }
      L.push('# Learning blueprint: ' + bp.track.title, '');
      L.push('- Learner: ' + WHO_EN[p.who] + ', ' + AGES_EN[p.age], '- Language: ' + LANGS_EN[p.lang], '- Goal: ' + bp.track.goal,
        '- Starting point: ' + bp.track.stages[bp.start.stage].title + ' (' + bp.start.basis + ')',
        '- Time: ' + p.minutesPerDay + ' minutes a day × ' + p.daysPerWeek + ' days a week, about ' + bp.summary.weeks + ' weeks, ' + bp.summary.kcs + ' knowledge points in all',
        '- Device: ' + DEVICES_EN[p.device] + (p.theme ? '; theme: ' + p.theme : ''), '', '> ' + bp.assumptions.note, '');
      var c = bp.summary.coverage;
      L.push('## What exists today', '', 'Knowledge points in this plan, by how much of a learning page already exists for each.', '',
        '| Page ready | Usable as is | Can be borrowed and adapted | Design contract only |', '| --- | --- | --- | --- |', '| ' + [c.block, c.impl, c.borrow, c.spec].join(' | ') + ' |', '');
      L.push('## Weekly schedule', '', '| Week | Stage | New | Revisit |', '| --- | --- | --- | --- |');
      bp.agenda.forEach(function (w) { L.push('| ' + w.week + ' | ' + w.band + ' ' + w.stageTitle + ' | ' + w.labels.join('; ') + ' | ' + (w.review.length ? 'last week\'s ' + w.review.length : '—') + ' |'); });
      L.push('', '## Practice types this plan uses (pedagogical primitives, most used first)', '', '| Practice type | What it does | Knowledge points | With a page |', '| --- | --- | --- | --- |');
      bp.primitives.forEach(function (x) { L.push('| ' + x.name + ' `' + x.id + '` | ' + x.oneLine + ' | ' + x.kcCount + ' | ' + x.kcsWithPage + ' |'); });
      if (bp.ageBand) {
        L.push('', '## How to teach at this age: ' + bp.ageBand.label, '', bp.ageBand.summary + (bp.ageBand.subBand ? ' ' + bp.ageBand.subBand.note : ''), '',
          'The practices below are organised by age band. Those marked "design inference" have not been tested directly; for those marked "literature", still check the scope of the matching node in pedagogy/graph.json.', '',
          '| Aspect | Do | Avoid | Basis |', '| --- | --- | --- | --- |');
        bp.ageBand.dimensions.forEach(function (d) { L.push('| ' + d.label + ' | ' + d.do + ' | ' + d.avoid + ' | ' + basis(d.basis) + ' |'); });
        if (bp.ageDesign) {
          var LAYER = { kc: 'Knowledge point', plan: 'Course plan', block: 'Practice page' };
          L.push('', '### What age changes, why, and how to check it', '',
            'Age changes more than the practice page. The same course changes at three layers:', '');
          bp.ageDesign.layers.forEach(function (y) { L.push('- **' + y.label + '.** What stays: ' + y.stays + ' What changes: ' + y.changes); });
          L.push('', '| Design variable | Value at this age | Layer | Basis (how we read it) | What to record to check it |', '| --- | --- | --- | --- | --- |');
          bp.ageDesign.constructs.forEach(function (c) {
            c.variables.forEach(function (v, i) {
              L.push('| ' + v.label + ' `' + v.id + '` | ' + v.value + ' | ' + LAYER[v.layer] + ' | ' + (i ? 'as above' : c.understood + ' (' + basis(c.basis) + ': ' + c.refs.join(', ') + ')') +
                ' | ' + (i ? 'as above' : c.measures.map(function (m) { return m.label + (m.source === 'host' ? ' (the app has to record this)' : ''); }).join('; ')) + ' |');
            });
          });
        }
        var withV = bp.primitives.filter(function (x) { return x.ageVariant; });
        if (withV.length) {
          var FIT = { core: 'Fits', adapt: 'Needs adapting', defer: 'Not suitable yet' };
          L.push('', '### How each practice type is done at this age', '', '| Practice type | Fit | How | Watch for |', '| --- | --- | --- | --- |');
          withV.forEach(function (x) { var v = x.ageVariant; L.push('| ' + x.name + ' | ' + FIT[v.fit] + (v.instead && PRIM[v.instead] ? '; use ' + primName(PRIM[v.instead], 'en') + ' instead' : '') + ' | ' + v.how + ' | ' + v.watch + ' |'); });
        }
      }
      L.push('', '## Finding the starting point', '', bp.diagnosis.note, '');
      bp.diagnosis.stages.forEach(function (s) { L.push('### ' + s.band + ' ' + s.title, ''); s.probes.forEach(function (q) { L.push('- [ ] ' + q.canDo + (q.example ? ' (e.g. ' + q.example + ')' : '')); }); L.push(''); });
      L.push('## What the design rests on', '', bp.science.note, '');
      bp.science.families.forEach(function (f) { L.push('- **' + f.label + '**: ' + f.references.map(function (r) { return r.label + ' (' + r.why + ')'; }).join('; ')); });
      L.push('', '## Rules that cannot be changed', ''); bp.invariants.forEach(function (r) { L.push('- **' + r.title + '.** ' + r.rule); });
      L.push('', '## Knowledge points', '');
      var stage = -1;
      bp.steps.forEach(function (s, i) {
        if (s.stage !== stage) { stage = s.stage; L.push('### ' + bp.track.stages[stage].band + ' ' + bp.track.stages[stage].title, ''); }
        L.push((i + 1) + '. **' + s.kc.label + '** `' + s.kc.id + '` — ' + (s.kc.mastery[0] || '') + (s.primitive ? ' | ' + s.primitive.name + ': ' + s.primitive.binding : '') + (s.page ? ' | Page: ' + s.page.title : ''));
      });
      return L.join('\n') + '\n';
    }

    return api;
  }

  // Rules every app built from a blueprint keeps, whatever it looks like. They come from the primitive contracts.
  var INVARIANTS = [
    { id: 'first-attempt', title: '第一次作答不能被覆盖', rule: '每道题第一次作答要在任何提示、重放或答案之前保存；之后的作答记为重试。' },
    { id: 'assisted', title: '独立完成和提示后完成分开记', rule: '用过提示、看过答案或放慢重听之后答对，记为"提示后完成"，不算独立答对。自评单独计数，不算作答。' },
    { id: 'two-sided-check', title: '检查同时卡两头', rule: '每个原语的 check.rules 既要卡住答得太弱，也要卡住投机（全选一边、猜、照抄）。不能只保留容易实现的那一半。' },
    { id: 'reverse-half', title: '保留反向那一半', rule: '教一条规律，就要给出它在哪里不成立（reverseHalf）。不能为了界面简洁删掉。' },
    { id: 'licensed-claims', title: '只说证据支持的话', rule: '给学习者或家长的结论不能超过 evidence.licensed 的 maxStrength 和 minObservations；evidence.prohibited 里的推断不能出现，也不能显示掌握概率或等级分数。' },
    { id: 'no-fake-speech-scoring', title: '不给发音打分', rule: '没有经过验证的语音评测时，只放音、录音和并排对照；由真人听者或学习者自己判断。' },
    { id: 'scripted-interaction', title: '交际回合预先写好', rule: '互动类原语的对方回应来自预先写好并经人工检查的分支。如果接入生成式模型，要标明，并且不把它的回应当作判分依据。' },
    { id: 'child-variant', title: '儿童版不是缩小的成人版', rule: '按原语 ui.childVariant 做：选项更少、目标更大、用图和声音，不加积分和连胜压力。' },
    { id: 'age-band', title: '按年龄段的教学法来做', rule: '蓝图的 ageBand 写明这个年龄的一次练习多长、讲不讲规则、怎样反馈、图和文字怎么用；每个原语的 ageVariant 写明它在这个年龄怎么做。标为 defer 的原语不要硬做，用 instead 指的原语或先告诉使用者。年龄界线是约定，学习者的识字情况和目标优先。蓝图的 ageDesign 把每个年龄的做法写成设计变量（取值、依据、落在知识点 / 课程方案 / 练习页面哪一层、记录什么来检验）：每个变量都要落实或说明为什么不落实；标为 host 的测量由 app 记录，自评不算掌握的证据。' },
    { id: 'review-lists', title: '待核对的内容不进练习', rule: '数据包 review 列表里的条目和 curriculum/REVIEW.md 里的条目，在母语者或教师核对之前不要出成题。' },
    { id: 'stable-ids', title: '用稳定的 id 记证据', rule: '每条学习证据带知识点 id（kt:…）和原语 id（prim:…），以后才能和课程对上。' }
  ];

  var INVARIANTS_EN = [
    { id: 'first-attempt', title: 'The first attempt is never overwritten', rule: 'Save the first answer to every item before any hint, replay or answer is shown. Later answers are recorded as retries.' },
    { id: 'assisted', title: 'Independent and assisted are counted apart', rule: 'A correct answer after a hint, a revealed answer or a slowed replay is recorded as "assisted", not as independently correct. Self-ratings are counted separately and are not attempts.' },
    { id: 'two-sided-check', title: 'Checks hold both ends', rule: 'Each primitive\'s check.rules must catch answers that are too weak and also catch gaming (always choosing one side, guessing, copying). Do not keep only the half that is easy to build.' },
    { id: 'reverse-half', title: 'Keep the reverse half', rule: 'When you teach a pattern, also show where it stops working (reverseHalf). Do not drop this to make the screen simpler.' },
    { id: 'licensed-claims', title: 'Say only what the evidence supports', rule: 'What you tell a learner or a parent must stay within the maxStrength and minObservations of evidence.licensed. Nothing listed in evidence.prohibited may appear, and no mastery probabilities or level scores are shown.' },
    { id: 'no-fake-speech-scoring', title: 'No pronunciation scoring', rule: 'Without a validated speech assessor, only play, record and compare side by side. A human listener or the learner decides.' },
    { id: 'scripted-interaction', title: 'Interaction turns are written in advance', rule: 'In interaction primitives, the other speaker\'s replies come from branches written in advance and checked by a person. If you connect a generative model, label it, and do not use its replies as the basis for judging an answer.' },
    { id: 'child-variant', title: 'A child version is not a small adult version', rule: 'Follow the primitive\'s ui.childVariant: fewer choices, bigger targets, pictures and sound, and no points or streak pressure.' },
    { id: 'age-band', title: 'Teach the way the age band says', rule: 'The blueprint\'s ageBand says, for this age, how long one practice lasts, whether rules are explained, how feedback is given and how pictures and text are used; each primitive\'s ageVariant says how it is done at this age. Do not force a primitive marked defer: use the primitive named in instead, or tell the person first. Age boundaries are a convention; the learner\'s literacy and goals come first. The blueprint\'s ageDesign turns each age\'s practice into design variables (the value, the basis, whether it sits in the knowledge point, the course plan or the practice page, and what to record to check it): carry out every variable or say why not. A measure marked host is recorded by the app, and self-report is not evidence of mastery.' },
    { id: 'review-lists', title: 'Unreviewed content stays out of practice', rule: 'Do not turn items in a data pack\'s review list, or items in curriculum/REVIEW.md, into exercises until a native speaker or a teacher has checked them.' },
    { id: 'stable-ids', title: 'Record evidence with stable ids', rule: 'Every evidence record carries the knowledge point id (kt:…) and the primitive id (prim:…), so that it can be matched to the course later.' }
  ];

  KTPlanner.INVARIANTS = INVARIANTS;
  KTPlanner.INVARIANTS_EN = INVARIANTS_EN;
  KTPlanner.COMPONENT_ZH = COMPONENT_ZH;
  global.KTPlanner = KTPlanner;
})(typeof window !== 'undefined' ? window : globalThis);

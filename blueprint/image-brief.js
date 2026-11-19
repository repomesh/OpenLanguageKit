#!/usr/bin/env node
/* Image brief: a teaching role + an age band + a fact list -> a prompt for any image model, where the picture
 * goes on the page, and the checklist a person uses to accept or reject the result.
 *
 * This file calls no image service. It writes the instruction; you send it to the model you use.
 *
 *   const brief = KTImageBrief({ roles }).brief({ role: 'scene-facts', band: 'child',
 *     facts: ['a red ball under the table', 'two cats on the sofa'], setting: 'a living room' });
 *
 *   node blueprint/image-brief.js --role scene-facts --band child --setting "a living room" \
 *     --facts "a red ball under the table; two cats on the sofa"
 *   node blueprint/image-brief.js --list
 *
 * Rules that hold for every brief: the picture carries no text (the page sets the text); nothing decorative;
 * a generated picture is used only after every line of `acceptance` has been checked by a person.
 * Prompts are written in English because image models follow English most reliably; `facts` should be given
 * in English too (they describe the picture, they are not the sentences the learner sees). */
(function (global) {
  'use strict';
  function KTImageBrief(o) {
    var R = o.roles || { roles: [], styleByBand: {}, generatable: {} };
    var byId = {}; R.roles.forEach(function (r) { byId[r.id] = r; });
    // Why each kind of sentence is in a prompt. `from` names the rule it comes from; `refs` are nodes in pedagogy/graph.json.
    var WHY = {
      style: { from: 'age band (styleByBand)', why: 'The drawing style follows the age band so the picture reads as made for this learner; it stays plain in every band because interesting but irrelevant detail pulls attention away from what is being learned.', whyZh: '画风跟着年龄段走，让学习者觉得这是给自己看的；每个年龄段都保持简洁，因为有趣但无关的细节会把注意力从要学的东西上带走。', refs: ['ped:seductive-details', 'ped:young-learner-characteristics'] },
      single: { from: 'role: meaning-anchor', why: 'The picture stands for one word. A second object gives the learner a second thing the word might mean.', whyZh: '这张图只代表一个词。多一样东西，学习者就多一个“这个词可能指它”的选项。', refs: ['ped:picture-superiority-vocabulary', 'ped:dual-coding'] },
      setting: { from: 'author input', why: 'A familiar setting lets the learner spend effort on the language and not on working out where things are.', whyZh: '熟悉的场景让学习者把力气花在语言上，不用先弄清这是哪里。', refs: ['ped:comprehensible-input'] },
      frame: { from: 'role: sequence-frames / book-page', why: 'The learner retells the story from the pictures, one event per picture. If two things change at once, the picture no longer says which event to tell.', whyZh: '学习者要看着图一张一件事地讲。同一张图里变了两样，就看不出该讲哪件事。', refs: ['ped:multimedia-learning', 'ped:output-hypothesis'] },
      characters: { from: 'role rule: consistency across the set', why: 'If a character looks different from page to page, the learner has to work out whether it is the same person; that effort is not language learning.', whyZh: '角色每页长得不一样，学习者就得先判断是不是同一个人，这份力气和学语言无关。', refs: ['ped:seductive-details', 'ped:attention'] },
      facts: { from: 'fact list (the sentences the page will check)', why: 'Each listed fact is a sentence the learner will hear, say or be checked on. A fact that is missing or ambiguous in the picture cannot be checked, and a wrong answer cannot be told from a right one.', whyZh: '清单上的每条事实都是学习者要听、要说或要被检查的一句话。图上缺了或画得模糊，页面就没法检查，也分不出答对和答错。', refs: ['ped:multimedia-learning', 'ped:corrective-feedback'] },
      contrast: { from: 'role: contrast-pair', why: 'The learner should notice one difference in meaning. Any other difference between the two pictures is a second explanation for why the sentences differ.', whyZh: '要让学习者注意到的只是一处意思上的差别。两张图之间多出任何别的差别，都会成为“两句话为什么不同”的另一种解释。', refs: ['ped:noticing-hypothesis', 'ped:attention'] },
      textArea: { from: 'role: book-page + placement for the band', why: 'The page sets the text next to the part of the picture it describes, and has to be able to show, hide and fade reading aids and make each word tappable. That needs real text on a clean area, not letters painted into the picture.', whyZh: '文字由页面排在它所描述的画面旁边，还要能显示、隐藏、逐步撤掉注音，并让每个词可以点。这需要干净区域上的真文字，不能是画进图里的字。', refs: ['ped:multimedia-learning', 'ped:learning-to-read-vs-reading-to-learn'] },
      nothingExtra: { from: 'role: scene-facts', why: 'An extra cat or a second red thing makes a true sentence look false and a false one look true.', whyZh: '多一只猫或第二样红色的东西，会让对的句子看起来不对，错的句子看起来对。', refs: ['ped:seductive-details'] },
      culture: { from: 'role: culture-context', why: 'The picture is evidence about how people live now. A costume or a stereotype teaches something untrue.', whyZh: '这张图是“现在的人怎样生活”的依据。穿戏服或套刻板印象，教的就是不真实的东西。', refs: [] },
      hold: { from: 'workflow step', why: 'This step asks the learner to predict or infer. Showing the outcome gives the answer away.', whyZh: '这一步要学习者预测或推断，把结果画出来就等于给了答案。', refs: ['ped:retrieval-practice'] },
      noText: { from: 'rule for every brief', why: 'Text inside a picture cannot be read aloud, tapped, glossed or faded by the page, and image models often misspell it, which puts wrong language in front of the learner.', whyZh: '画在图里的字，页面没法朗读、点按、加注或撤除；图像模型还常常拼错，等于把错误的语言放到学习者面前。', refs: ['ped:multimedia-learning'] },
      avoid: { from: 'author input', why: 'Named by the author for this picture.', whyZh: '作者针对这张图写明的。', refs: [] },
      aspect: { from: 'page layout', why: 'Fits the place the page gives the picture for this band.', whyZh: '配合页面给这个年龄段留的图片位置。', refs: [] }
    };
    var api = { roles: function () { return R.roles.map(function (r) { return { id: r.id, label: r.label, purpose: r.purpose, generatable: r.generatable }; }); } };

    /** q: { workflow, step (ids from workflows.json: when the picture is used), hold (what this picture must not give away), role, band: child|youth|adult, facts[], subject, setting, characters[], frame: {index, total, change}, textArea, style, avoid[], aspect } */
    api.brief = function (q) {
      var r = byId[q.role];
      if (!r) throw new Error('unknown image role: ' + q.role + ' (have ' + Object.keys(byId).join(', ') + ')');
      var band = q.band || 'adult', facts = (q.facts || []).filter(Boolean), chars = (q.characters || []).filter(Boolean);
      var out = { role: r.id, label: r.label, band: band, generatable: r.generatable, generatableNote: R.generatable[r.generatable] || '',
        placement: r.placement[band] || '', mustShow: r.mustShow, mustNot: r.mustNot, refs: r.refs || [], primitives: r.primitives || [] };
      if (r.generatable === 'no' || r.generatable === 'prefer-drawn') {
        out.prompt = null;
        out.acceptance = r.mustShow.slice();
        return out;
      }
      // Every sentence of the prompt is added with the reason it is there. `trace` keeps the pairs, so a reader
      // (or a coding AI) can see which teaching decision each instruction comes from and drop none by accident.
      var L = [], trace = [];
      function add(text, key, extra) {
        var w = WHY[key] || {};
        L.push(text);
        trace.push({ says: text, why: (w.why || '') + (extra ? ' ' + extra : ''), whyZh: w.whyZh || '', from: w.from || key, refs: w.refs || [] });
      }
      add((q.style || R.styleByBand[band] || 'clean illustration') + '.', 'style', 'Band: ' + band + '.');
      if (r.id === 'meaning-anchor') add('A single subject: ' + (q.subject || facts[0] || '[subject]') + '. Centered, nothing else in the picture, plain background.', 'single');
      if (r.id === 'scene-facts' || r.id === 'culture-context') add('Scene: ' + (q.setting || '[setting]') + '.', 'setting');
      if (r.id === 'sequence-frames' || r.id === 'book-page') {
        if (q.setting) add('Setting: ' + q.setting + '.', 'setting');
        if (q.frame) add('This is picture ' + q.frame.index + ' of ' + q.frame.total + ' in one story' + (q.frame.change ? '. The one thing that changes here: ' + q.frame.change : '') + '.', 'frame');
      }
      if (chars.length) add('Characters (keep them identical in every picture of this set): ' + chars.join('; ') + '.', 'characters');
      if (facts.length && r.id !== 'meaning-anchor') add('The picture must show exactly these, each clearly visible and unambiguous: ' + facts.map(function (f, i) { return '(' + (i + 1) + ') ' + f; }).join('; ') + '.', 'facts');
      if (r.id === 'contrast-pair') add('This is one of two pictures that must be identical except for: ' + (q.subject || '[the one difference]') + '. Make the second by editing the first, not from scratch.', 'contrast');
      if (r.id === 'book-page' || q.textArea) add('Leave a clean, empty area ' + (q.textArea || (band === 'child' ? 'along the bottom third' : 'on one side')) + ' for text that will be added later.', 'textArea', 'Placement for this band: ' + (r.placement[band] || '') );
      if (r.id === 'scene-facts') add('Add nothing that could be confused with the listed things. Exact counts. Clear positions.', 'nothingExtra');
      if (r.id === 'culture-context') add('Everyday, present-day clothes and surroundings. No costume, no stereotype.', 'culture');
      if (q.hold) add('Do not show: ' + q.hold + '.', 'hold');
      add('No text, letters, numbers, captions, speech bubbles, logos or watermarks anywhere in the picture.', 'noText');
      (q.avoid || []).forEach(function (a) { add('Avoid: ' + a + '.', 'avoid'); });
      if (q.aspect) add('Aspect ratio ' + q.aspect + '.', 'aspect');
      out.trace = trace;
      // When in the activity the picture is used, and what it has to do at that moment (from workflows.json).
      if (q.workflow && q.step) {
        var wf = ((o.workflows || {}).workflows || []).filter(function (w) { return w.id === q.workflow; })[0];
        var st = wf && wf.steps.filter(function (x) { return x.id === q.step; })[0];
        if (st) out.timing = { workflow: wf.id, step: st.id, label: st.label, does: st.does, primitive: st.primitive, text: st.media.text, pictureWhy: st.media.pictureWhy || '' };
      }
      out.prompt = L.join(' ');
      out.acceptance = facts.map(function (f) { return 'Shows: ' + f; }).concat(r.mustShow, ['No text of any kind inside the picture', 'Nothing in it contradicts the sentences the learner will read or hear'],
        chars.length ? ['Characters match the other pictures of the set'] : [], r.generatable === 'yes-then-annotate' ? ['Each fact has been located on the picture (hit area) before the page uses it for checking'] : []);
      if (out.timing && out.timing.pictureWhy) out.acceptance.push('Does its job in step \u201c' + out.timing.label + '\u201d: ' + out.timing.pictureWhy);
      out.alt = 'Write the alt text from the fact list after the picture is accepted' + (facts.length ? ': ' + facts.join('; ') : '') + '.';
      return out;
    };
    return api;
  }
  global.KTImageBrief = KTImageBrief;

  if (typeof module !== 'undefined' && require.main === module) {
    var fs = require('fs'), path = require('path');
    var args = {}, a = process.argv.slice(2);
    for (var i = 0; i < a.length; i++) if (a[i].slice(0, 2) === '--') { var k = a[i].slice(2); args[k] = a[i + 1] && a[i + 1].slice(0, 2) !== '--' ? a[++i] : true; }
    var file = path.join(__dirname, '../curriculum/primitives', args.lang === 'zh' ? 'image-roles.json' : 'image-roles.en.json');
    var gen = KTImageBrief({ roles: JSON.parse(fs.readFileSync(file, 'utf8')),
      workflows: JSON.parse(fs.readFileSync(path.join(__dirname, '../curriculum/primitives', args.lang === 'zh' ? 'workflows.json' : 'workflows.en.json'), 'utf8')) });
    if (args.list || !args.role) { gen.roles().forEach(function (r) { console.log(r.id.padEnd(18) + r.generatable.padEnd(20) + r.label + ' — ' + r.purpose); });
      if (!args.list) console.log('\nusage: node blueprint/image-brief.js --role <id> --band child|youth|adult [--facts "a; b; c"] [--subject "…"] [--setting "…"] [--characters "a; b"] [--frame 2/5] [--change "…"] [--aspect 4:3] [--workflow wf:picture-book-read-to-learn --step predict] [--hold "the boat stuck at the weir"] [--explain] [--lang zh]'); }
    else {
      var split = function (s) { return typeof s === 'string' ? s.split(';').map(function (x) { return x.trim(); }).filter(Boolean) : []; };
      var fr = typeof args.frame === 'string' ? args.frame.split('/') : null;
      try { var res = gen.brief({ workflow: args.workflow, step: args.step, hold: args.hold, role: args.role, band: args.band, facts: split(args.facts), subject: args.subject, setting: args.setting, characters: split(args.characters),
        frame: fr ? { index: +fr[0], total: +fr[1], change: args.change } : null, aspect: args.aspect, style: args.style, avoid: split(args.avoid) });
        if (args.explain && res.prompt) {   // readable form: when the picture is used, then each sentence with its reason
          if (res.timing) console.log('WHEN  step "' + res.timing.label + '" (' + res.timing.primitive + '): ' + res.timing.does + '\n      text in this step: ' + res.timing.text + '\n      what the picture must do now: ' + res.timing.pictureWhy + '\n');
          res.trace.forEach(function (t, i) { console.log((i + 1) + '. ' + t.says + '\n   why: ' + (args.lang === 'zh' && t.whyZh ? t.whyZh : t.why) + '\n   from: ' + t.from + (t.refs.length ? '  [' + t.refs.join(', ') + ']' : '') + '\n'); });
          console.log('ACCEPT only if:'); res.acceptance.forEach(function (x) { console.log(' - ' + x); });
        } else console.log(JSON.stringify(res, null, 1)); }
      catch (e) { console.error(e.message); process.exit(1); }
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);

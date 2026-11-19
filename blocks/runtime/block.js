/* Language building blocks — shared runtime. No dependencies; works from file:// and inside an iframe.
 *
 *   const B = KTBlock.init({ id: 'sound-grid', primitive: 'prim:sound-spelling-blend', title: '音节表' });
 *   B.params.get('set')                          // URL parameters: set, mode, variant, kc, focus
 *   B.emit('select', { item: 'ka' })             // evidence event (asset-library vocabulary)
 *   B.hint('ka'); B.reveal('ka')                 // marks the item as assisted
 *   B.attempt('ka', { correct: true, response }) // keeps the FIRST attempt; later ones are retries
 *   B.speak('か', 'ja-JP')                       // browser speech synthesis (playback only, never scoring)
 *   B.lang                                       // interface language: 'zh' | 'en'
 *   B.L('再听', 'Listen again')                  // pick an interface string
 *   B.t(cell, 'note')                            // pick a data-pack field: cell.noteEn in English if present, else cell.note
 *
 * Interface language (the language of instructions, not the language being taught):
 *   ?lang=en|zh in the block URL → localStorage 'atlas-lang' (set by the OpenLangKit site switch; read only, in
 *   try/catch) → navigator.language (zh* → zh, anything else → en). <html lang> is set to match.
 * Data packs carry English next to the Chinese as parallel fields: "<field>En" beside "<field>" (titleEn, noteEn,
 * reviewEn …; arrays and maps are parallel too), and "en" beside a gloss stored under "zh". Missing English falls
 * back to the Chinese. Text in the language being taught is never translated.
 *
 * Every event is also posted to the parent window as {source: 'kt-block', kind, ...} so a host page
 * (the workspace, or your own app) can show evidence live without reaching into the block.
 */
(function (global) {
  'use strict';
  var EVENTS = ['view', 'select', 'highlight', 'drag', 'drop', 'connect', 'disconnect', 'reorder', 'submit',
    'revise', 'request_hint', 'reveal', 'compare', 'explain', 'retry', 'complete'];
  var allowed = new Set(EVENTS);

  /* ---- interface language ---- */
  function detectLang() {
    var m = /[?&]lang=(en|zh)(?:&|#|$)/.exec((global.location && global.location.search) || '');
    if (m) return m[1];
    try { var s = global.localStorage.getItem('atlas-lang'); if (s === 'en' || s === 'zh') return s; } catch (e) { /* storage blocked */ }
    return /^zh/i.test((global.navigator && global.navigator.language) || '') ? 'zh' : 'en';
  }
  var LANG = detectLang(), EN = LANG === 'en';
  try { global.document.documentElement.lang = EN ? 'en' : 'zh-CN'; } catch (e) { /* no document */ }
  /** Interface string: L('中文', 'English'). A missing English text falls back to the Chinese. */
  function L(zh, en) { return EN && en != null ? en : zh; }
  /** Data-pack field in the interface language: obj[key + 'En'] (or obj.en when key is 'zh') in English mode,
   *  falling back to obj[key]. Parallel arrays and maps fall back item by item. */
  function t(obj, key) {
    if (!obj) return undefined;
    var zh = obj[key];
    if (!EN) return zh;
    var en = obj[key === 'zh' ? 'en' : key + 'En'];
    if (en === null || en === undefined) return zh;
    if (Array.isArray(zh) && Array.isArray(en)) return zh.map(function (v, i) { return en[i] === null || en[i] === undefined ? v : en[i]; });
    if (zh && typeof zh === 'object' && typeof en === 'object') {
      var out = {};
      Object.keys(zh).forEach(function (k) { out[k] = en[k] === null || en[k] === undefined ? zh[k] : en[k]; });
      return out;
    }
    return en;
  }

  function post(msg) {
    msg.source = 'kt-block';
    try { if (global.parent && global.parent !== global) global.parent.postMessage(msg, '*'); } catch (e) { /* cross-origin host */ }
  }

  function storage(key, value) {
    try {
      if (value === undefined) return JSON.parse(global.localStorage.getItem(key) || 'null');
      global.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { return null; }
  }

  function init(meta) {
    var params = new URLSearchParams(global.location.search);
    var variant = params.get('variant') === 'child' ? 'child' : 'adult';   // from the URL only: a choice made in one block must not silently switch another
    document.documentElement.dataset.variant = variant;
    var events = [];
    var items = {};          // itemId -> {first, attempts, assisted, independentCorrect}
    var listeners = [];

    function item(id) {
      return items[id] || (items[id] = { id: id, first: null, attempts: 0, assisted: false, correct: false });
    }

    var api = {
      meta: meta,
      params: params,
      variant: variant,
      kc: params.get('kc'),
      lang: LANG,
      L: L,
      t: t,
      emit: function (type, payload) {
        if (!allowed.has(type)) throw new Error('Unsupported evidence event: ' + type);
        var ev = { block: meta.id, primitive: meta.primitive, kc: api.kc, event_type: type, t: Date.now(), payload: payload || {} };
        events.push(ev);
        listeners.forEach(function (fn) { fn(ev); });
        post({ kind: 'event', event: ev, summary: api.summary() });
        return ev;
      },
      on: function (fn) { listeners.push(fn); },
      hint: function (id, level) {
        item(id).assisted = true;
        return api.emit('request_hint', { item: id, level: level || 1 });
      },
      reveal: function (id) {
        item(id).assisted = true;
        return api.emit('reveal', { item: id });
      },
      /** Record an answer. Only the first attempt per item counts as the first attempt; it is never overwritten.
       *  result: {correct, response, selfReport?}. selfReport = the learner judged themselves (e.g. recall then flip);
       *  it is counted separately and never as independent correct. */
      attempt: function (id, result) {
        var it = item(id);
        it.attempts += 1;
        var first = it.first === null;
        if (first) it.first = { correct: !!result.correct, response: result.response, assisted: it.assisted, selfReport: !!result.selfReport, t: Date.now() };
        if (result.correct) it.correct = true;
        api.emit(first ? 'submit' : 'retry', { item: id, correct: !!result.correct, response: result.response, assisted: it.assisted, selfReport: !!result.selfReport, firstAttempt: first });
        return it;
      },
      /** One status per item, derived from the first attempt, so a block's colours and the evidence summary agree:
       *  null | 'revealed' (answer shown before any attempt) | 'self-yes' | 'self-no' | 'wrong' (first attempt wrong,
       *  whatever happened after) | 'assisted' (first attempt right after a hint/reveal) | 'independent'. */
      status: function (id) {
        var it = items[id];
        if (!it) return null;
        if (!it.first) return it.assisted ? 'revealed' : null;
        if (it.first.selfReport) return it.first.correct ? 'self-yes' : 'self-no';
        if (!it.first.correct) return 'wrong';
        return it.first.assisted ? 'assisted' : 'independent';
      },
      items: function () { return Object.keys(items).map(function (k) { return items[k]; }); },
      summary: function () {
        var st = api.items().map(function (i) { return api.status(i.id); });
        var n = function (k) { return st.filter(function (x) { return x === k; }).length; };
        return {
          attempted: n('independent') + n('assisted') + n('wrong'),
          independentCorrect: n('independent'),
          assistedCorrect: n('assisted'),
          firstWrong: n('wrong'),
          selfReported: n('self-yes') + n('self-no'),
          selfYes: n('self-yes'),
          revealedOnly: n('revealed'),
          eventCount: events.length
        };
      },
      events: function () { return events.slice(); },
      reset: function () { items = {}; post({ kind: 'reset' }); },
      setVariant: function (v) {
        api.variant = v;
        document.documentElement.dataset.variant = v;
        storage('kt-block-variant', v);
      },
      speak: speak,
      speakSequence: speakSequence,
      /** True only if a voice for this language is installed (voices load asynchronously; false before they arrive). */
      canSpeak: function (lang) { if (!('speechSynthesis' in global)) return false; loadVoices(); return !!pickVoice(lang); },
      store: storage
    };
    post({ kind: 'ready', meta: meta, params: Object.fromEntries(params), lang: LANG });
    return api;
  }

  /* ---- speech: playback only ---- */
  var voices = [];
  function loadVoices() { try { voices = global.speechSynthesis.getVoices(); } catch (e) { voices = []; } }
  if ('speechSynthesis' in global) {
    loadVoices();
    global.speechSynthesis.onvoiceschanged = loadVoices;
  }
  function pickVoice(lang) {
    if (!voices.length) return null;
    var exact = voices.filter(function (v) { return v.lang.replace('_', '-') === lang; });
    var near = voices.filter(function (v) { return v.lang.slice(0, 2) === lang.slice(0, 2); });
    var pool = exact.length ? exact : near;
    return pool.find(function (v) { return v.localService; }) || pool[0] || null;
  }
  /** Speak text. `opts.audio` (a URL to a recording) always wins over synthesis.
   *  Returns false if nothing can play, otherwise a Promise that resolves when playback ends
   *  (so blocks can chain "slow, then normal" without guessing timings). */
  function speak(text, lang, opts) {
    opts = opts || {};
    if (opts.audio) {
      var a = new Audio(opts.audio);
      if (opts.rate) a.playbackRate = opts.rate;
      return new Promise(function (resolve) { a.onended = a.onerror = function () { resolve(); }; a.play().catch(function () { resolve(); }); });
    }
    if (!('speechSynthesis' in global)) return false;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    var v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = opts.rate || (document.documentElement.dataset.variant === 'child' ? 0.75 : 0.9);
    if (!opts.queue) global.speechSynthesis.cancel();
    var done = new Promise(function (resolve) { u.onend = u.onerror = function () { resolve(); }; });
    global.speechSynthesis.speak(u);
    return done;
  }
  /** Speak several items one after another: [{text, rate, audio, pause}] → Promise. */
  function speakSequence(items, lang) {
    if (!('speechSynthesis' in global) && !items.some(function (i) { return i.audio; })) return false;
    if ('speechSynthesis' in global) global.speechSynthesis.cancel();
    return items.reduce(function (p, it) {
      return p.then(function () {
        var r = speak(it.text, lang, { rate: it.rate, audio: it.audio, queue: true });
        return Promise.resolve(r).then(function () { return new Promise(function (res) { setTimeout(res, it.pause || 0); }); });
      });
    }, Promise.resolve());
  }

  /* ---- small DOM helpers shared by blocks ---- */
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    [].concat(children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    });
    return el;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* ---- interface icons: small inline SVGs (24 × 24, stroked in the text colour) used instead of emoji, so that
   *      buttons and status marks look the same on every system and follow the light / dark palette.
   *      icon(name, label) returns an <svg> element; with a label it is announced (role="img"), without one it is
   *      decoration next to visible text. iconHtml() gives the same as a string; iconSvg() is for use inside
   *      another <svg> (a scene), placed with its centre at x, y. ---- */
  var ICONS = {
    speaker: '<path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6"/><path d="M18 6.5a8 8 0 0 1 0 11"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h13l-3 4 3 4H5"/>',
    hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 10.5v-4a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-4.8-2.4L3.6 16a1.6 1.6 0 0 1 2.5-2L8 15.5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    warn: '<path d="M12 4L2.5 20h19L12 4z"/><path d="M12 10v4.5"/><path d="M12 17.4v.1"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.6a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8"/><path d="M12 16.9v.1"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3v-6z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5z"/>',
    snail: '<path d="M2.5 19.5H17a4 4 0 0 0 4-4V10"/><path d="M21 10V6.5"/><path d="M18 11V8"/><circle cx="10" cy="13" r="5.5"/><path d="M10 10.5a2.5 2.5 0 1 0 2.5 2.5"/>',
    ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6"/><path d="M10 10a2 2 0 0 1 4 0c0 1.2-1.5 1.6-1.5 3"/>',
    repeat: '<path d="M4 11V9a3 3 0 0 1 3-3h11"/><path d="M15 3l3 3-3 3"/><path d="M20 13v2a3 3 0 0 1-3 3H6"/><path d="M9 21l-3-3 3-3"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5v.1"/><path d="M15 9.5v.1"/>',
    meh: '<circle cx="12" cy="12" r="9"/><path d="M8.5 15h7"/><path d="M9 9.5v.1"/><path d="M15 9.5v.1"/>',
    frown: '<circle cx="12" cy="12" r="9"/><path d="M8.5 16a4.5 4.5 0 0 1 7 0"/><path d="M9 9.5v.1"/><path d="M15 9.5v.1"/>',
    hourglass: '<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>',
    arrowRight: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
    box: '<path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16V8z"/><path d="M3.5 8l8.5 4.5L20.5 8"/><path d="M12 12.5v8"/>',
    brush: '<path d="M18.5 3.5a1.9 1.9 0 0 1 2 2L12.5 14l-2.5-2.5 8.5-8z"/><path d="M9.5 12.5c-2.3 0-3.8 1.4-3.8 3.3 0 1.5-1 2.5-2.2 3 1 1 2.4 1.5 3.9 1.5 2.5 0 4.4-1.6 4.4-4"/>',
    pencil: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/><path d="M14.5 6.5l3 3"/>',
    clap: '<ellipse cx="9.5" cy="14.5" rx="3.6" ry="6" transform="rotate(-24 9.5 14.5)"/><ellipse cx="14.5" cy="14.5" rx="3.6" ry="6" transform="rotate(24 14.5 14.5)"/><path d="M12 2.5V5"/><path d="M6.5 3.5l1.2 2"/><path d="M17.5 3.5l-1.2 2"/>',
    thumbUp: '<path d="M7 11v9H4v-9h3z"/><path d="M7 11l4-7a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.4l-1.2 6a2 2 0 0 1-2 1.6H7"/>',
    thumbDown: '<g transform="rotate(180 12 12)"><path d="M7 11v9H4v-9h3z"/><path d="M7 11l4-7a2 2 0 0 1 3 2l-1 4h5a2 2 0 0 1 2 2.4l-1.2 6a2 2 0 0 1-2 1.6H7"/></g>',
    scissors: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 17"/><path d="M8 15.5L20 7"/>',
    tree: '<circle cx="12" cy="9" r="6"/><path d="M12 15v6"/><path d="M9 21h6"/>',
    leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19l8-8"/>',
    chat: '<path d="M4 5h16v11H10l-4 4v-4H4V5z"/>',
    pin: '<path d="M12 21s-6-6.2-6-11a6 6 0 0 1 12 0c0 4.8-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
    person: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20.5a7 7 0 0 1 14 0"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17.5 14.5a5 5 0 0 1 4 5.5"/>',
    doer: '<circle cx="10" cy="7.5" r="3.5"/><path d="M3 20.5a7 7 0 0 1 14 0"/><path d="M19 10V3.5"/><path d="M16.5 6l2.5-2.5L21.5 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 11.9v.2"/>',
    receive: '<path d="M12 3v9"/><path d="M8 8.5l4 4 4-4"/><path d="M4 15v4.5h16V15"/>',
    gift: '<rect x="4" y="10.5" width="16" height="9.5" rx="1"/><path d="M3 7h18v3.5H3z"/><path d="M12 7v13"/><path d="M12 7C10.5 3 6 3.5 7.5 6.2 8.3 7 12 7 12 7z"/><path d="M12 7c1.5-4 6-3.5 4.5-.8C15.7 7 12 7 12 7z"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    area: '<rect x="3.5" y="6" width="17" height="12" rx="2" stroke-dasharray="3 3"/><circle cx="12" cy="12" r="2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
    from: '<circle cx="6" cy="12" r="3"/><path d="M9 12h11"/><path d="M16 8l4 4-4 4"/>',
    route: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h7a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h7"/>',
    wrench: '<path d="M20 7.5a4.5 4.5 0 0 1-6.2 4.2L7 18.5a2 2 0 0 1-2.8-2.8l6.8-6.8A4.5 4.5 0 0 1 16.5 4L14 6.5l1 2.5 2.5 1L20 7.5z"/>',
    thought: '<path d="M7 15a4 4 0 0 1-.5-8 5 5 0 0 1 9.5-1 4 4 0 0 1 1 9H7z"/><path d="M7 18.5v.1"/><path d="M4.5 21v.1"/>',
    ruler: '<rect x="2.5" y="8" width="19" height="8" rx="1"/><path d="M6.5 8v3"/><path d="M10 8v4"/><path d="M13.5 8v3"/><path d="M17 8v4"/>'
  };
  var ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false"';
  function iconEsc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function iconHtml(name, label) {
    return '<svg class="kb-ic" ' + ICON_ATTRS + ' ' + (label ? 'role="img" aria-label="' + iconEsc(label) + '"' : 'aria-hidden="true"') + '>' + (ICONS[name] || '') + '</svg>';
  }
  function icon(name, label) { var t = document.createElement('template'); t.innerHTML = iconHtml(name, label); return t.content.firstChild; }
  function iconSvg(name, x, y, size, color) {
    return '<svg x="' + (x - size / 2) + '" y="' + (y - size / 2) + '" width="' + size + '" height="' + size + '" ' + ICON_ATTRS + ' aria-hidden="true"' + (color ? ' style="color:' + color + '"' : '') + '>' + (ICONS[name] || '') + '</svg>';
  }

  /** "Why this age version": a collapsible table of the design variables this block changes with age — each band's
   *  value side by side (the current one marked), the learning-science reading behind it, and what is recorded to
   *  check it. Data: window.KT_AGE (blocks/age-design.js, generated from curriculum/primitives/age-design.json).
   *  ageWhy(slug, band) returns an element, or null when the block has no entry. band: child | youth | adult. */
  function ageSpec(slug) { var A = global.KT_AGE && (global.KT_AGE[LANG] || global.KT_AGE.zh); return A && A.blocks ? A.blocks[slug] || null : null; }
  function ageWhy(slug, band) {
    var A = global.KT_AGE && (global.KT_AGE[LANG] || global.KT_AGE.zh), spec = A && A.blocks && A.blocks[slug];
    if (!spec) return null;
    var vars = {}, cons = {};
    A.constructs.forEach(function (c) { c.variables.forEach(function (v) { vars[v.id] = v; cons[v.id] = c; }); });
    var three = spec.rows.some(function (r) { return r.youth; });
    var cols = three ? [['child', L('12 岁以下', 'Under 12')], ['youth', L('12 岁到大学', '12 to university')], ['adult', L('成人', 'Adult')]]
                     : [['child', L('儿童版', 'Child version')], ['default', L('标准版', 'Standard version')]];
    var cur = three ? band : (band === 'child' ? 'child' : 'default');
    var used = [];
    var rows = spec.rows.map(function (r) {
      var v = vars[r.variable], c = cons[r.variable]; if (!v) return null;
      if (used.indexOf(c) < 0) used.push(c);
      return h('tr', {}, [h('th', { scope: 'row' }, [v.label, h('small', { text: c.label })])].concat(cols.map(function (k) {
        return h('td', { class: k[0] === cur ? 'on' : '', text: r[k[0]] || '—' });
      })));
    }).filter(Boolean);
    var why = used.map(function (c) {
      return h('li', {}, [h('b', { text: c.label + L('：', ': ') }), c.construct.understood + ' ',
        h('small', { text: (c.construct.basis === 'literature' ? L('依据：文献', 'Basis: literature') : L('依据：设计推断', 'Basis: design inference')) + ' · ' + c.construct.refs.join(', ') + L('。边界：', '. Limits: ') + c.construct.limits })]);
    });
    var meas = [];
    used.forEach(function (c) { c.measures.forEach(function (m) {
      meas.push(h('li', {}, [h('b', { text: m.label }), L('：', ': ') + m.reads + ' ', h('small', { text: m.source === 'host' ? L('这个页面不记录，要由承载它的 app 记录。', 'Not recorded by this page; the app that hosts it must record it.') : L('来自这个页面的学习证据。', 'From this page’s learning evidence.') })]));
    }); });
    return h('details', { class: 'kb-age' }, [
      h('summary', { text: L('这一版和其他年龄的版本有什么不同，为什么', 'How this version differs from the other ages, and why') }),
      h('p', { text: spec.summary }),
      h('p', { class: 'kb-age-note', text: L('练的是同一批知识点、同一种练习，检查和证据的规则不变。随年龄变的是下面这几样：', 'The knowledge points, the kind of practice and the rules for checking and evidence are the same. What changes with age:') }),
      h('div', { class: 'kb-age-scroll' }, [h('table', {}, [
        h('thead', {}, [h('tr', {}, [h('th', { text: L('变的是什么', 'What changes') })].concat(cols.map(function (k) { return h('th', { class: k[0] === cur ? 'on' : '', text: k[1] + (k[0] === cur ? L('（现在看的）', ' (shown now)') : '') }); })))]),
        h('tbody', {}, rows)])]),
      h('h3', { text: L('为什么这样分', 'Why it is split this way') }), h('ul', {}, why),
      h('h3', { text: L('记录什么来检验', 'What is recorded to check it') }), h('ul', {}, meas),
      h('p', { class: 'kb-age-note', text: L('年龄界线是约定，识字情况和目标优先；这些取值是设计起点，没有在学习者身上验证过。', 'Age lines are conventions; literacy and goals come first. These values are design starting points and have not been tested with learners here.') })
    ]);
  }

  /** Standard chrome: header with title, mode tabs, child/adult switch; evidence drawer at the bottom. */
  function chrome(B, opts) {
    var header = h('header', { class: 'kb-head' }, [
      h('div', { class: 'kb-title' }, [h('h1', { text: opts.title }), opts.subtitle ? h('p', { text: opts.subtitle }) : null]),
      h('div', { class: 'kb-tools' }, [
        opts.modes ? h('div', { class: 'kb-modes', role: 'tablist' }, opts.modes.map(function (m) {
          return h('button', { role: 'tab', 'aria-selected': m.id === opts.mode ? 'true' : 'false', dataset: { mode: m.id },
            onclick: function () { opts.onMode(m.id); } }, m.label);
        })) : null,
        // The child switch is offered only where age-design.json documents a real difference for this block
        // (when blocks/age-design.js is not loaded, it stays as before).
        // A page passes childSwitch: false when the open data pack has no child content (e.g. a language pack
        // without child scenarios): then there is no switch and no age panel.
        opts.childSwitch === false || (global.KT_AGE && !ageSpec(B.meta.id)) ? null : h('label', { class: 'kb-variant' }, [
          h('input', { type: 'checkbox', checked: B.variant === 'child', onchange: function (e) { B.setVariant(e.target.checked ? 'child' : 'adult'); if (opts.onVariant) opts.onVariant(); renderAge(); } }),
          L(' 儿童版', ' Child version')
        ])
      ])
    ]);
    var log = h('ol', { class: 'kb-log' });
    var sum = h('p', { class: 'kb-sum' });
    var evidence = h('details', { class: 'kb-evidence' }, [h('summary', { text: L('学习证据', 'Learning evidence') }), sum, log]);
    // blocks with a child / standard pair get the "how this version differs, and why" panel above the evidence
    // drawer; blocks with three bands place KTBlock.ageWhy themselves.
    var ageBox = h('div', { class: 'kb-age-box' }), drawer = h('div', { class: 'kb-foot' }, [ageBox, evidence]);
    function renderAge() {
      var spec = ageSpec(B.meta.id); if (opts.childSwitch === false || !spec || spec.rows.some(function (r) { return r.youth; })) return;
      var open = ageBox.firstChild && ageBox.firstChild.open; ageBox.innerHTML = '';
      var el = ageWhy(B.meta.id, B.variant === 'child' ? 'child' : 'adult'); if (el) { el.open = !!open; ageBox.append(el); }
    }
    renderAge();
    function render() {
      var s = B.summary();
      sum.textContent = EN
        ? 'First attempts: ' + s.attempted + ' (independent correct ' + s.independentCorrect + ', assisted correct ' + s.assistedCorrect + ', wrong ' + s.firstWrong + '). ' +
          (s.selfReported ? 'Self-rated: ' + s.selfReported + ' (rated as right: ' + s.selfYes + '), not counted as attempts. ' : '') + (s.revealedOnly ? 'Answer shown without an attempt: ' + s.revealedOnly + '.' : '')
        : '第一次作答 ' + s.attempted + ' 题：独立答对 ' + s.independentCorrect + '，提示后答对 ' + s.assistedCorrect + '，第一次答错 ' + s.firstWrong + '。' +
          (s.selfReported ? '自评 ' + s.selfReported + ' 题（自认为想对 ' + s.selfYes + '），不算作答。' : '') + (s.revealedOnly ? '没作答直接看答案 ' + s.revealedOnly + ' 题。' : '');
    }
    B.on(function (ev) {
      log.insertBefore(h('li', {}, [h('code', { text: ev.event_type }), ' ', JSON.stringify(ev.payload)]), log.firstChild);
      if (log.children.length > 60) log.removeChild(log.lastChild);
      render();
    });
    render();
    return { header: header, drawer: drawer, setMode: function (id) {
      header.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.mode === id ? 'true' : 'false'); });
    } };
  }

  global.KTBlock = { init: init, events: EVENTS, lang: LANG, L: L, t: t, h: h, shuffle: shuffle, chrome: chrome, ageWhy: ageWhy, icon: icon, iconHtml: iconHtml, iconSvg: iconSvg, speak: speak, speakSequence: speakSequence };
  global.KT_DATA = global.KT_DATA || {};
})(typeof window !== 'undefined' ? window : globalThis);

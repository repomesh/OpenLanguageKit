/* Book + language packs for blocks/picture-book.html (prim:reading-aid-fade; the two picture-book workflows in
 * curriculum/primitives/workflows.json also use prim:picture-describe, prim:oral-to-print, prim:sound-spelling-blend,
 * prim:carry-across, prim:predict-next, prim:context-guess, prim:reference-chain and prim:sequence-retell).
 *
 * TWO books, each drawn once and written natively in each language (not translated word for word):
 *   paper-boat — an eight-page picture book for children (band=child);
 *   last-bus   — a seven-page illustrated story for teenagers and adults (band=youth | adult): a young woman in her first
 *                week in a new city misses the last bus; the pictures carry real street print (stop sign, timetable, shop
 *                signs, a notice, the bus display), drawn as blank panels that the page fills from the pack (signs).
 * Each book has TWO texts per language for the same pages, because the two workflows are different teaching:
 *   learn  — learning to read: one or two short sentences a page, a repeated pattern, a few target words to decode,
 *            a reading aid (pinyin for zh, furigana for ja, a listen button for en) that fades word by word;
 *   read   — reading to learn: longer and a little richer, one or two new words a page (most guessable from the picture
 *            or the words around them, at least two NOT guessable), and pictures that show things the text leaves out.
 *
 *   KT_SCENES[id] = { cover: {svg, alt, imageBrief}, pages: [{ id, svg, alt, spots[], ask, imageBrief }], predict[], infer[], retell[] }
 *     - svg is original inline SVG (no text inside the picture: the page sets the text). spots = tappable parts of the
 *       picture for the picture walk, in viewBox units (320 x 240); the word each spot says is in the language pack.
 *     - imageBrief = the inputs for blueprint/image-brief.js (role book-page) if someone wants generated illustrations:
 *         node blueprint/image-brief.js --role book-page --band child --setting "<setting>" --facts "<a; b>" \
 *           --characters "<a; b>" --frame 3/8 --change "<change>"
 *       Facts and characters are written in English on purpose (image models follow English best).
 *     - predict / infer / retell are written in the interface language (with …En); {boy} is replaced by the pack's name.
 *
 *   KT_DATA[id] = { scene, lang, speech, title, bookTitle, names{…}, aid, aidLabel, spots{}, pages[], targets[],
 *                   reverse[], words[], review[], older }
 *     - the top-level fields are the children's book; older = the same fields for the youth/adult book (scene last-bus),
 *       plus learnNote (who the learning-to-read set assumes). The page merges older over the top level for those bands.
 *     - names: {boy} or {name}/{dest} placeholders in the scene's predict / infer / retell texts.
 *     - scene pages may have signs[] = {id, x, y, w, h, size, ink, t?} (blank panels in viewBox units); the pack page gives
 *       the words: signs{id: text} (\n = line break). t is a language-neutral default (a clock).
 *     - older targets also carry rule/ruleEn (the spelling or character pattern, shown up front to adults and after the
 *       attempt to teenagers) and l1/l1En (a comparison with the learner's first language or script).
 *     - pages[i] = { id, learn: [token…], read: [token…], find: [{w, say}], image? }
 *         image (optional): a relative URL to a picture (e.g. "img/p3.png"); when present it is shown INSTEAD of the SVG.
 *         No image files ship with this block and nothing calls an image service.
 *     - token = a string. {base|ruby} puts a reading aid over base (pinyin / furigana); <…> marks a target word of the
 *       learn-to-read text (its id is found in targets[] by the base text); [[…]] marks a new word of the read-to-learn
 *       text (found in words[]). Everything else is plain text. Tokens are shown with spaces in English and in the
 *       Japanese learn-to-read text (分かち書き), without spaces otherwise.
 *     - targets[] = { id, w, r, say, audioOnly?, options: [{t?, say, ok?, type}], hint: {show, note, noteEn} }
 *         options are the readings the learner chooses from; type names the trap (tone, same-part, other-reading,
 *         look-alike, vowel, blend, meaning = guessed from the picture, story = a word remembered from the page).
 *         audioOnly: the options are played, not written (English, and a kana word, where writing them gives it away).
 *     - reverse[] = new sentences (no picture) that reuse a target: { target, tokens[] }.
 *     - words[] = new words of the read-to-learn text: { id, w, r?, page, clue: [picture|context|parts|none], gloss,
 *         glossEn, why, whyEn }. clue "none" = the page cannot tell you; the right move is to look it up.
 * Interface-language fields have a parallel …En field. Target-language text is never translated.
 * The drawings are original (authored here as SVG, no external image data); the story is original. */

(function (g) { g.KT_SCENES = g.KT_SCENES || {}; g.KT_DATA = g.KT_DATA || {}; })(typeof window !== 'undefined' ? window : globalThis);
KT_SCENES["paper-boat"] = (function () {
  var INK = '#2b2d3a', SKY = '#e3f0fb', GRASS = '#cfe7c6', GRASSD = '#a9d39b', WATER = '#9fd0ee', WATERD = '#6fb3df', PATH = '#ecdcb8',
    STONE = '#c3bcb0', STONED = '#958d81', COAT = '#f4c542', COATD = '#cf9d1c', PANTS = '#3d4f86', BOOT = '#4f9a5b', SKIN = '#f6d2b5',
    HAIR = '#6b4226', BOAT = '#3f6fd1', BOATL = '#86a8ec', BOATD = '#2d55a8', DUCKL = '#cfc8ba', ORANGE = '#f29a2e', FROG = '#6cb85a',
    FROGD = '#4a8f3d', WOOD = '#9a6a43', WOODD = '#74502f', CARD = '#a0694a', CAP = '#6e5a46', GREY = '#d6d6d6', TROUSER = '#5c5f6b';
  function wrap(bg, body) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img"><rect width="320" height="240" fill="' + bg + '"/>' + body + '</svg>'; }
  function g(x, y, s, f, body) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s * (f || 1)) + ' ' + s + ')">' + body + '</g>'; }
  function arm(a, b, col, edge) { var d = 'M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1]; return '<path d="' + d + '" stroke="' + edge + '" stroke-width="7" stroke-linecap="round"/><path d="' + d + '" stroke="' + col + '" stroke-width="4.6" stroke-linecap="round"/><circle cx="' + b[0] + '" cy="' + b[1] + '" r="3.2" fill="' + SKIN + '"/>'; }
  /* the boy: yellow raincoat, blue trousers, green boots, brown hair. Feet at (x, y), facing right unless o.face = -1.
     o.arm: down | point | reach | hold | wave; o.mouth: smile | open | flat; o.crouch */
  function boy(x, y, o) {
    o = o || {};
    var B = o.crouch ? -14 : -24, T = B - 28, out = '';
    if (o.crouch) out += '<rect x="-10" y="-8" width="10" height="8" rx="2" fill="' + BOOT + '"/><path d="M-8 ' + (B - 2) + ' h17 v8 h-17z" fill="' + PANTS + '"/><rect x="3" y="' + (B - 2) + '" width="7" height="12" fill="' + PANTS + '"/><rect x="2" y="-6" width="12" height="6" rx="2" fill="' + BOOT + '"/>';
    else out += '<rect x="-8" y="' + B + '" width="7" height="17" fill="' + PANTS + '"/><rect x="1" y="' + B + '" width="7" height="17" fill="' + PANTS + '"/><rect x="-9" y="-8" width="9" height="8" rx="2" fill="' + BOOT + '"/><rect x="1" y="-8" width="10" height="8" rx="2" fill="' + BOOT + '"/>';
    if (o.arm === 'hold') out += arm([-3, T + 6], [13, T + 15], COAT, COATD);
    out += '<path d="M-12 ' + B + ' L12 ' + B + ' L9 ' + T + ' Q0 ' + (T - 4) + ' -9 ' + T + 'Z" fill="' + COAT + '" stroke="' + COATD + '" stroke-width="1.2"/>' +
      '<circle cx="3" cy="' + (T + 9) + '" r="1.3" fill="' + COATD + '"/><circle cx="3" cy="' + (T + 17) + '" r="1.3" fill="' + COATD + '"/>' +
      '<circle cx="0" cy="' + (T - 10) + '" r="11" fill="' + SKIN + '"/>' +
      '<path d="M-11 ' + (T - 11) + ' a11 11 0 0 1 22 -1 q-5 -3 -10 -2 q-7 -1 -12 3z" fill="' + HAIR + '"/>' +
      '<circle cx="5.5" cy="' + (T - 11) + '" r="1.7" fill="' + INK + '"/><circle cx="6" cy="' + (T - 6) + '" r="2.3" fill="#f5a9a0" opacity=".6"/>';
    var my = T - 4.5;
    out += o.mouth === 'open' ? '<ellipse cx="7.5" cy="' + my + '" rx="2.2" ry="2.8" fill="#b4413c"/>' :
      o.mouth === 'flat' ? '<path d="M5 ' + my + ' h5" stroke="' + INK + '" stroke-width="1.4" stroke-linecap="round"/>' :
      '<path d="M4.5 ' + (my - 1) + ' q3 2.6 6 0" fill="none" stroke="' + INK + '" stroke-width="1.4" stroke-linecap="round"/>';
    var sh = [4, T + 5], hand = o.arm === 'point' ? [24, T + 14] : o.arm === 'reach' ? [22, B + 12] : o.arm === 'hold' ? [17, T + 12] : o.arm === 'wave' ? [13, T - 13] : [6, B - 3];
    out += arm(sh, hand, COAT, COATD);
    if (o.arm === 'point') out += '<path d="M' + hand[0] + ' ' + hand[1] + ' l5 2" stroke="' + SKIN + '" stroke-width="2.4" stroke-linecap="round"/>';
    return g(x, y, o.s || 1, o.face, out);
  }
  /* the grandfather: flat brown cap, grey hair and moustache, brown cardigan. o.arm: down | call | wave */
  function grandpa(x, y, o) {
    o = o || {};
    var out = '<rect x="-9" y="-34" width="8" height="28" fill="' + TROUSER + '"/><rect x="1" y="-34" width="8" height="28" fill="' + TROUSER + '"/>' +
      '<rect x="-11" y="-7" width="11" height="7" rx="2" fill="#3a3330"/><rect x="1" y="-7" width="12" height="7" rx="2" fill="#3a3330"/>' +
      '<path d="M-14 -34 L14 -34 L11 -66 Q0 -70 -11 -66Z" fill="' + CARD + '" stroke="#7d4f35" stroke-width="1.2"/><path d="M0 -67 V-34" stroke="#7d4f35" stroke-width="1"/>' +
      '<circle cx="0" cy="-77" r="11.5" fill="' + SKIN + '"/><path d="M-11.5 -76 q0 8 4 9 v-9z M11 -76 q1 6 -2 8z" fill="' + GREY + '"/>' +
      '<path d="M-12.5 -80 q12 -15 25 0z" fill="' + CAP + '"/><rect x="4" y="-82" width="14" height="3.4" rx="1.7" fill="' + CAP + '"/>' +
      '<circle cx="5.5" cy="-78" r="1.6" fill="' + INK + '"/><path d="M3 -71.5 q5 3 10 0" stroke="' + GREY + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    var hand = o.arm === 'call' ? [13, -72] : o.arm === 'wave' ? [17, -97] : [7, -38];
    out += arm([4, -60], hand, CARD, '#7d4f35');
    if (o.arm === 'call') out += '<path d="M21 -79 q4 5 0 10 M27 -82 q6 8 0 16" stroke="#7a7f85" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    if (o.arm === 'wave') out += '<path d="M10 -104 q-3 -4 0 -8 M24 -104 q3 -4 0 -8" stroke="#7a7f85" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    return g(x, y, o.s || 1, o.face, out);
  }
  function ripple(w) { return '<path d="M' + (-w) + ' 1 q' + (w / 3) + ' -3 ' + (2 * w / 3) + ' 0 t' + (2 * w / 3) + ' 0 t' + (2 * w / 3) + ' 0" fill="none" stroke="' + WATERD + '" stroke-width="1.6" stroke-linecap="round"/>'; }
  /* the white duck with orange beak; y = water line. o.pose: swim | down (head under, tail up) | push (neck stretched forward and low) */
  function duck(x, y, o) {
    o = o || {};
    var out;
    if (o.pose === 'down') {
      out = '<g transform="rotate(38)"><ellipse cx="-2" cy="-7" rx="15" ry="9" fill="#fff" stroke="' + DUCKL + '" stroke-width="1.4"/><path d="M-15 -9 l-7 -5 l3 9z" fill="#fff" stroke="' + DUCKL + '" stroke-width="1.2"/><ellipse cx="-3" cy="-9" rx="8" ry="4" fill="#f1ede4"/></g>' +
        '<path d="M-14 -24 l-4 -6 M-10 -26 l-1 -7" stroke="' + ORANGE + '" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="12" cy="1" rx="9" ry="2.6" fill="none" stroke="' + WATERD + '" stroke-width="1.4"/><ellipse cx="12" cy="1" rx="15" ry="4.2" fill="none" stroke="' + WATERD + '" stroke-width="1" opacity=".6"/>';
    } else {
      var hx = o.pose === 'push' ? 19 : 12, hy = o.pose === 'push' ? -12 : -20;
      out = '<path d="M-14 -9 l-6 -7 l3 10z" fill="#fff" stroke="' + DUCKL + '" stroke-width="1.2"/>' +
        '<ellipse cx="0" cy="-7" rx="15" ry="9" fill="#fff" stroke="' + DUCKL + '" stroke-width="1.4"/><ellipse cx="-2" cy="-8" rx="8" ry="4" fill="#f1ede4"/>' +
        '<path d="M7 -10 L' + hx + ' ' + hy + '" stroke="#fff" stroke-width="8" stroke-linecap="round"/>' +
        '<circle cx="' + hx + '" cy="' + hy + '" r="6.5" fill="#fff" stroke="' + DUCKL + '" stroke-width="1.2"/>' +
        '<path d="M' + (hx + 5) + ' ' + (hy - 1) + ' q7 0 8 2 q-4 2 -8 1z" fill="' + ORANGE + '"/><circle cx="' + (hx + 2) + '" cy="' + (hy - 2) + '" r="1.4" fill="' + INK + '"/>' + ripple(18);
    }
    return g(x, y, o.s || 1, o.face, out);
  }
  function frog(x, y, o) {
    o = o || {};
    var out = '<ellipse cx="0" cy="-9" rx="14" ry="10" fill="' + FROG + '"/><ellipse cx="0" cy="-6" rx="8" ry="5" fill="#a8dc8f"/>' +
      '<circle cx="-6" cy="-18" r="5" fill="' + FROG + '"/><circle cx="6" cy="-18" r="5" fill="' + FROG + '"/>' +
      '<circle cx="-6" cy="-18.5" r="3" fill="#fff"/><circle cx="6" cy="-18.5" r="3" fill="#fff"/><circle cx="-6" cy="-18.5" r="1.5" fill="' + INK + '"/><circle cx="6" cy="-18.5" r="1.5" fill="' + INK + '"/>' +
      '<path d="M-6 -11 q6 3 12 0" stroke="' + FROGD + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="-11" cy="-1" rx="6" ry="3" fill="' + FROGD + '"/><ellipse cx="11" cy="-1" rx="6" ry="3" fill="' + FROGD + '"/>';
    return g(x, y, o.s || 1, 1, out);
  }
  /* the blue paper boat; y = water line. o.soggy: sail drooping, darker, dripping; o.tilt (deg) */
  function boat(x, y, o) {
    o = o || {};
    var hull = o.soggy ? '#355ea8' : BOAT;
    var out = '<g' + (o.tilt ? ' transform="rotate(' + o.tilt + ')"' : '') + '>' +
      (o.soggy ? '<path d="M-10 -10 Q-4 -24 9 -21 Q5 -15 10 -10Z" fill="#6f8fd0" stroke="' + BOATD + '" stroke-width="1.2"/>' : '<path d="M-10 -10 L0 -28 L10 -10Z" fill="' + BOATL + '" stroke="' + BOATD + '" stroke-width="1.2"/><path d="M0 -28 V-10" stroke="' + BOATD + '" stroke-width="1" opacity=".55"/>') +
      '<path d="M-22 -10 L22 -10 L15 0 L-15 0Z" fill="' + hull + '" stroke="' + BOATD + '" stroke-width="1.2"/><path d="M-22 -10 L-15 0 M22 -10 L15 0" stroke="' + BOATD + '" stroke-width="1" opacity=".55"/>' +
      (o.soggy ? '<path d="M-8 3 v4 M2 3 v6 M10 2 v3" stroke="' + WATERD + '" stroke-width="2" stroke-linecap="round"/>' : '') + '</g>' + (o.held ? '' : ripple(24));
    return g(x, y, o.s || 1, 1, out);
  }
  function stream(y) {
    return '<path d="M0 ' + y + ' q80 -6 160 0 t160 0 V240 H0Z" fill="' + WATER + '"/>' +
      '<g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".75"><path d="M18 ' + (y + 22) + ' h22 M96 ' + (y + 40) + ' h28 M200 ' + (y + 28) + ' h24 M262 ' + (y + 52) + ' h30 M40 ' + (y + 60) + ' h18"/></g>';
  }
  function land(y) { return '<path d="M0 ' + y + ' q90 -14 180 -4 t140 2 V240 H0Z" fill="' + GRASS + '"/>'; }
  function path(y) { return '<path d="M0 ' + y + ' q160 -6 320 0 v10 q-160 -6 -320 0z" fill="' + PATH + '"/>'; }
  function hills() { return '<path d="M0 92 Q60 62 130 84 T260 76 T320 84 V110 H0Z" fill="' + GRASSD + '" opacity=".7"/>'; }
  function reeds(x0, x1, base, top) {
    var out = '<g stroke-linecap="round">';
    for (var x = x0, i = 0; x <= x1; x += 9, i++) {
      var h = top + (i % 3) * 10, lean = (i % 2 ? 5 : -4);
      out += '<path d="M' + x + ' ' + base + ' q' + lean + ' -' + (base - h) / 2 + ' ' + lean * 1.6 + ' -' + (base - h) + '" stroke="#5f9e4f" stroke-width="3" fill="none"/>';
      if (i % 2 === 0) out += '<rect x="' + (x + lean * 1.6 - 3) + '" y="' + (h - 2) + '" width="6" height="16" rx="3" fill="#8a5a36"/>';
    }
    return out + '</g>';
  }
  function branch(x1, y1, x2, y2) {
    return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="' + WOODD + '" stroke-width="11" stroke-linecap="round"/><path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="' + WOOD + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M' + ((x1 * 2 + x2) / 3) + ' ' + ((y1 * 2 + y2) / 3) + ' l-6 -18 M' + ((x1 + x2 * 2) / 3) + ' ' + ((y1 + y2 * 2) / 3) + ' l10 -14" stroke="' + WOOD + '" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="' + ((x1 * 2 + x2) / 3 - 6) + '" cy="' + ((y1 * 2 + y2) / 3 - 20) + '" rx="6" ry="3.5" fill="#7bb36a"/><ellipse cx="' + ((x1 + x2 * 2) / 3 + 11) + '" cy="' + ((y1 + y2 * 2) / 3 - 16) + '" rx="6" ry="3.5" fill="#7bb36a"/>';
  }
  function cloud(x, y, s) { return g(x, y, s || 1, 1, '<g fill="#fff"><ellipse cx="0" cy="0" rx="20" ry="9"/><ellipse cx="12" cy="-6" rx="12" ry="8"/><ellipse cx="-10" cy="-4" rx="10" ry="7"/></g>'); }

  var cover = wrap(SKY, cloud(56, 30) + hills() + land(108) + path(132) + stream(164) + reeds(276, 316, 214, 150) +
    boy(52, 140, { s: .7, arm: 'wave', mouth: 'smile' }) + boat(160, 206, { s: 1.6 }) + duck(246, 210, { s: .9, face: -1 }));

  var p1 = wrap('#f7ecd9',
    '<rect x="0" y="206" width="320" height="34" fill="#e3cfb0"/>' +
    '<rect x="196" y="26" width="100" height="94" rx="4" fill="#dcefff" stroke="' + WOOD + '" stroke-width="5"/>' +
    '<circle cx="278" cy="50" r="13" fill="#ffd772"/>' + cloud(232, 64, .9) + cloud(268, 92, .6) +
    '<path d="M246 26 V120 M196 73 H296" stroke="' + WOOD + '" stroke-width="4"/>' +
    '<g fill="#8fbde6"><ellipse cx="210" cy="44" rx="1.6" ry="2.6"/><ellipse cx="226" cy="98" rx="1.6" ry="2.6"/><ellipse cx="262" cy="108" rx="1.6" ry="2.6"/><ellipse cx="284" cy="84" rx="1.6" ry="2.6"/></g>' +
    boy(116, 208, { arm: 'hold', mouth: 'smile', s: 1.3 }) +
    '<rect x="40" y="166" width="210" height="10" rx="3" fill="' + WOOD + '"/><rect x="52" y="176" width="8" height="34" fill="' + WOODD + '"/><rect x="230" y="176" width="8" height="34" fill="' + WOODD + '"/>' +
    boat(146, 150, { s: .9, held: true }));

  var p2 = wrap(SKY, cloud(250, 30, .8) + hills() + land(106) +
    '<g fill="#d9b98c" stroke="' + WOODD + '" stroke-width="1"><rect x="6" y="112" width="6" height="52"/><rect x="92" y="112" width="6" height="52"/><rect x="0" y="122" width="40" height="5"/><rect x="0" y="144" width="40" height="5"/>' +
    '<rect x="40" y="116" width="8" height="46"/><rect x="51" y="116" width="8" height="46"/><rect x="62" y="116" width="8" height="46"/><rect x="73" y="116" width="8" height="46"/><rect x="40" y="128" width="41" height="5"/></g>' +
    grandpa(62, 178, { arm: 'call', s: .95 }) + stream(182) +
    boy(186, 186, { crouch: true, arm: 'reach', mouth: 'smile', s: 1.05 }) + boat(226, 206, { s: .8 }));

  var p3 = wrap(SKY, cloud(270, 28, .7) + hills() + land(96) + path(104) + boy(36, 112, { s: .55, mouth: 'smile' }) + stream(166) +
    '<path d="M76 116 H254 V176 H218 Q166 106 114 176 H76Z" fill="' + STONE + '" stroke="' + STONED + '" stroke-width="1.5"/>' +
    '<rect x="72" y="108" width="186" height="10" rx="2" fill="' + STONED + '"/>' +
    '<g stroke="' + STONED + '" stroke-width="1" fill="none"><path d="M76 134 H112 M222 134 H254 M76 154 H104 M228 154 H254 M94 116 V134 M236 116 V134 M150 116 V128 M186 116 V128"/></g>' +
    '<path d="M114 176 Q166 106 218 176Z" fill="#53687a" opacity=".35"/>' + boat(160, 200, { s: .8 }) +
    '<rect x="114" y="176" width="104" height="12" fill="' + WATERD + '" opacity=".35"/>');

  var p4 = wrap(SKY, hills() + land(94) + path(100) + boy(126, 108, { s: .55, mouth: 'smile' }) + stream(150) +
    '<ellipse cx="150" cy="202" rx="36" ry="11" fill="' + STONE + '" stroke="' + STONED + '" stroke-width="1.5"/>' + frog(150, 196, { s: 1.15 }) +
    boat(244, 206, { s: .8 }));

  var p5 = wrap(SKY, cloud(80, 26, .7) + hills() + land(94) + path(100) + boy(52, 108, { s: .55, mouth: 'smile' }) + stream(150) +
    reeds(256, 316, 220, 128) + duck(226, 206, { pose: 'down', s: 1.05 }) + boat(104, 206, { s: .8 }));

  var p6 = wrap(SKY, hills() + land(100) + stream(170) +
    boy(252, 166, { s: .8, arm: 'point', mouth: 'open', face: -1 }) +
    duck(58, 214, { s: .7 }) + boat(178, 214, { s: .8, tilt: -10 }) + branch(326, 176, 168, 226));

  var p7 = wrap(SKY, hills() + land(100) + stream(170) +
    boy(276, 166, { s: .75, mouth: 'smile', face: -1 }) + branch(326, 176, 246, 200) +
    '<g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M168 212 h-14 M170 220 h-18"/></g>' +
    boat(214, 222, { s: .8, tilt: 6 }) + duck(176, 226, { pose: 'push', s: .85 }));

  var p8 = wrap(SKY, cloud(150, 26, .8) + hills() + land(100) + path(112) + grandpa(272, 122, { s: .55, arm: 'wave', face: -1 }) +
    '<ellipse cx="196" cy="204" rx="176" ry="44" fill="' + WATER + '"/>' +
    '<g fill="#7bb36a"><path d="M232 186 a9 5 0 1 0 1 0z"/><path d="M276 214 a11 6 0 1 0 1 0z"/><path d="M300 190 a8 4 0 1 0 1 0z"/></g>' +
    boy(64, 206, { crouch: true, arm: 'hold', mouth: 'smile', s: 1.05 }) + boat(104, 178, { s: .72, soggy: true, held: true }) +
    duck(156, 214, { s: .9, face: -1 }));

  var CH = { boy: 'a boy of about seven in a yellow raincoat, blue trousers and green rubber boots, short brown hair',
    grandpa: 'his grandfather: grey hair and moustache, flat brown cap, brown cardigan, grey trousers',
    duck: 'a white duck with an orange beak', boat: 'a small blue paper boat with one pointed sail' };
  var SET = 'a narrow stream running from a country garden to a small pond, just after rain, soft morning light';
  function brief(n, facts, chars, change) { return { setting: n === 1 ? 'indoors at a wooden table by a window, the morning just after rain' : SET, characters: chars.map(function (c) { return CH[c]; }), facts: facts, frame: n + '/8', change: change }; }

  return {
    title: 'paper-boat',
    cover: { svg: cover, alt: '封面：小河上漂着一只蓝色纸船，旁边有一只白鸭子，男孩在岸边的小路上招手', altEn: 'Cover: a blue paper boat on a stream, a white duck beside it, the boy waving from the path on the bank',
      imageBrief: { setting: SET, characters: [CH.boy, CH.duck, CH.boat], facts: ['the blue paper boat floating on the stream, large, in the centre', 'the white duck on the water near the boat', 'the boy, small, on the path beside the stream, waving'], frame: 'cover', change: 'cover: introduces the boy, the boat and the duck' } },
    pages: [
      { id: 'p1', svg: p1, alt: '屋里，男孩站在木桌后面，手里拿着一只刚折好的蓝色纸船；窗外雨停了，云散开，玻璃上还有几滴水', altEn: 'Indoors, the boy stands at a wooden table holding a blue paper boat he has just folded; outside the window the rain has stopped and the clouds are parting',
        spots: [{ id: 'boy', x: 92, y: 98, w: 44, h: 108 }, { id: 'boat', x: 124, y: 122, w: 44, h: 30 }, { id: 'window', x: 194, y: 24, w: 104, h: 98 }],
        ask: '他手里拿着什么？他要拿它去做什么？', askEn: 'What is he holding? What is he going to do with it?',
        imageBrief: brief(1, ['the boy stands behind a wooden table, holding a small blue paper boat he has just folded', 'a window behind: the rain has stopped, the sun and clouds show, a few drops are still on the glass'], ['boy', 'boat'], 'the boy has just made the paper boat') },
      { id: 'p2', svg: p2, alt: '男孩蹲在小河边，把纸船放到水上；爷爷站在左边的木门口，一只手放在嘴边喊话', altEn: 'The boy crouches on the bank and sets the boat on the water; Grandpa stands at the wooden gate on the left, a hand by his mouth, calling out',
        spots: [{ id: 'gate', x: 0, y: 110, w: 100, h: 56 }, { id: 'grandpa', x: 40, y: 92, w: 40, h: 88 }, { id: 'boy', x: 160, y: 128, w: 44, h: 60 }, { id: 'boat', x: 206, y: 182, w: 40, h: 28 }, { id: 'water', x: 0, y: 212, w: 200, h: 28 }],
        ask: '爷爷在做什么？小船放到水里以后会怎么样？', askEn: 'What is Grandpa doing? What will happen to the boat on the water?',
        imageBrief: brief(2, ['the boy crouches on the bank of a narrow stream, setting the paper boat on the water', 'his grandfather stands at a wooden garden gate on the left, one hand beside his mouth, calling out', 'the boat is on the water, just leaving the boy’s hand'], ['boy', 'grandpa', 'boat'], 'the boat goes onto the water') },
      { id: 'p3', svg: p3, alt: '纸船漂到一座旧石桥的桥洞下面；男孩小小的，在后面岸上的小路上走', altEn: 'The boat floats into the shadow under the arch of an old stone bridge; the boy, small, walks along the path on the bank behind',
        spots: [{ id: 'bridge', x: 76, y: 106, w: 180, h: 40 }, { id: 'boat', x: 140, y: 176, w: 42, h: 28 }, { id: 'boy', x: 24, y: 70, w: 26, h: 44 }, { id: 'water', x: 0, y: 206, w: 320, h: 34 }],
        ask: '小船到了哪儿？男孩在哪儿？', askEn: 'Where is the boat now? Where is the boy?',
        imageBrief: brief(3, ['an old stone bridge with one arch over the stream', 'the paper boat floating into the shadow under the arch', 'the boy, small, walking along a path on the bank behind'], ['boy', 'boat'], 'the boat is carried under the bridge') },
      { id: 'p4', svg: p4, alt: '一只青蛙蹲在河里一块扁扁的石头上，一动不动；纸船从旁边漂过；男孩在后面的小路上', altEn: 'A frog sits quite still on a flat stone in the stream; the boat floats past it; the boy is on the path behind',
        spots: [{ id: 'frog', x: 132, y: 168, w: 38, h: 30 }, { id: 'stone', x: 112, y: 196, w: 76, h: 18 }, { id: 'boat', x: 224, y: 182, w: 42, h: 28 }, { id: 'boy', x: 114, y: 66, w: 26, h: 44 }],
        ask: '石头上是谁？它在看什么？', askEn: 'Who is on the stone? What is it looking at?',
        imageBrief: brief(4, ['a frog sitting still on a flat stone in the stream', 'the paper boat floating past the stone', 'the boy, small, on the path along the bank'], ['boy', 'boat'], 'the boat passes the frog') },
      { id: 'p5', svg: p5, alt: '芦苇旁边，一只白鸭子把头扎进水里，尾巴朝上；纸船朝鸭子漂过去；男孩在后面的小路上', altEn: 'By the reeds a white duck has its head under water and its tail up; the boat floats towards it; the boy is on the path behind',
        spots: [{ id: 'duck', x: 204, y: 176, w: 40, h: 34 }, { id: 'reeds', x: 250, y: 124, w: 70, h: 96 }, { id: 'boat', x: 84, y: 182, w: 42, h: 28 }, { id: 'boy', x: 40, y: 66, w: 26, h: 44 }],
        ask: '鸭子在做什么？', askEn: 'What is the duck doing?',
        imageBrief: brief(5, ['a white duck in the stream next to tall reeds, head under the water and tail up', 'the paper boat floating towards the duck', 'the boy, small, on the path along the bank'], ['boy', 'duck', 'boat'], 'the boat passes the duck') },
      { id: 'p6', svg: p6, alt: '一根倒下的树枝横在河里，纸船歪着卡在树枝上；男孩在岸边指着小船，张着嘴；鸭子在后面不远处游着', altEn: 'A fallen branch lies across the stream and the boat is caught against it, tilted; the boy on the bank points at it with his mouth open; the duck swims a little way behind',
        spots: [{ id: 'boat', x: 156, y: 190, w: 42, h: 30 }, { id: 'branch', x: 200, y: 172, w: 120, h: 40 }, { id: 'boy', x: 232, y: 98, w: 38, h: 70 }, { id: 'duck', x: 42, y: 192, w: 34, h: 26 }],
        ask: '出了什么事？他在喊什么？', askEn: 'What has happened? What is he shouting?',
        imageBrief: brief(6, ['a fallen branch lying across the stream', 'the paper boat caught against the branch, tilted', 'the boy on the bank close by, pointing at the boat, mouth open in surprise', 'the white duck swimming a little way upstream'], ['boy', 'duck', 'boat'], 'the boat is stuck') },
      { id: 'p7', svg: p7, alt: '白鸭子从后面用嘴顶着纸船，纸船从树枝的一头绕了过去；男孩在岸边看着，笑了', altEn: 'The white duck pushes the boat from behind with its beak, and the boat slides round the end of the branch; the boy watches from the bank, smiling',
        spots: [{ id: 'duck', x: 158, y: 204, w: 40, h: 30 }, { id: 'boat', x: 196, y: 198, w: 40, h: 28 }, { id: 'branch', x: 246, y: 172, w: 74, h: 34 }, { id: 'boy', x: 258, y: 100, w: 36, h: 68 }],
        ask: '是谁在帮小船？', askEn: 'Who is helping the boat?',
        imageBrief: brief(7, ['the white duck pushing the paper boat from behind with its beak', 'the boat sliding round the end of the branch', 'the boy on the bank, watching, smiling'], ['boy', 'duck', 'boat'], 'the duck frees the boat') },
      { id: 'p8', svg: p8, alt: '小河流进一个圆圆的池塘；男孩蹲在池塘边，手里拿着湿透、软塌塌的纸船；鸭子在旁边的水上；爷爷在远处高处的小路上招手', altEn: 'The stream ends in a small round pond; the boy crouches at the edge holding the wet, drooping boat; the duck is on the water beside him; Grandpa waves from the path far above',
        spots: [{ id: 'boy', x: 40, y: 136, w: 44, h: 70 }, { id: 'boat', x: 86, y: 156, w: 38, h: 26 }, { id: 'duck', x: 134, y: 190, w: 40, h: 30 }, { id: 'grandpa', x: 254, y: 58, w: 30, h: 64 }, { id: 'pond', x: 190, y: 210, w: 120, h: 30 }],
        ask: '小船最后到了哪儿？谁在那儿？', askEn: 'Where does the boat end up? Who is there?',
        imageBrief: brief(8, ['a small round pond where the stream ends', 'the boy crouching at the edge, holding the wet, drooping paper boat', 'the white duck on the pond beside him', 'the grandfather, far off on the path above, waving'], ['boy', 'grandpa', 'duck', 'boat'], 'the boy has his boat back') }
    ],
    /* read-to-learn: predictions are recorded with or without a stated basis, never right or wrong */
    predict: [
      { at: 'cover', q: '看封面和书名：这本书会讲什么？', qEn: 'Look at the cover and the title: what will this book be about?',
        choices: ['一只纸船顺着小河漂下去', '一个男孩去河边钓鱼', '一只鸭子找不到家了'], choicesEn: ['A paper boat floats off down a stream', 'A boy goes fishing by the river', 'A duck has lost its home'] },
      { at: 'p3', q: '小船放到水上了。接下来会怎么样？', qEn: 'The boat is on the water. What happens next?',
        choices: ['小船顺着水漂走了', '小船一下子沉下去了', '{boy}把小船拿回了家'], choicesEn: ['The boat floats away with the water', 'The boat sinks at once', '{boy} takes the boat back home'],
        book: '小船顺着水漂走，漂到了桥下。', bookEn: 'The boat floats away and goes under a bridge.' },
      { at: 'p6', q: '翻页之前：下一页会发生什么？', qEn: 'Before you turn the page: what happens next?',
        choices: ['小船被什么东西挡住了', '小船一下子漂进了池塘', '鸭子把小船吃掉了'], choicesEn: ['Something stops the boat', 'The boat goes straight into a pond', 'The duck eats the boat'],
        book: '小船撞上一根树枝，卡住了。', bookEn: 'The boat hits a branch and gets stuck.' },
      { at: 'p7', q: '翻页之前：小船怎么才能再漂起来？', qEn: 'Before you turn the page: how will the boat get going again?',
        choices: ['{boy}下水把它拿出来', '有谁帮了它一下', '它一直卡在那里'], choicesEn: ['{boy} wades in and takes it out', 'Someone gives it a push', 'It stays stuck there'],
        book: '后面有谁轻轻推了它一下，它又漂走了。', bookEn: 'Something gives it a push from behind and it floats off again.' }
    ],
    /* read-to-learn inference questions: the text never answers them; the picture and earlier pages do */
    infer: [
      { id: 'who-freed', q: '是谁让卡住的小船又漂起来的？', qEn: 'Who set the stuck boat free?',
        options: [{ t: '鸭子', tEn: 'the duck', ok: true }, { t: '{boy}', tEn: '{boy}' }, { t: '青蛙', tEn: 'the frog' }, { t: '一阵风', tEn: 'a gust of wind' }],
        pages: ['p7'], why: '第 7 页的文字只说“有什么”或“有谁”推了它，没说是谁；画上是鸭子在后面用嘴顶着小船。', whyEn: 'The text on page 7 only says "something" or "someone"; the picture shows the duck pushing the boat with its beak.' },
      { id: 'how-there', q: '小船漂到池塘时，{boy}怎么已经在池塘边了？', qEn: 'How was {boy} already at the pond when the boat got there?',
        options: [{ t: '他一路沿着河边的小路跟着小船走', tEn: 'He followed the boat along the path by the stream', ok: true }, { t: '爷爷开车送他过去', tEn: 'Grandpa drove him there' }, { t: '他一直就在池塘边', tEn: 'He had been at the pond all along' }],
        pages: ['p3', 'p4', 'p5', 'p6', 'p7'], why: '文字从没说他跟着走；第 3 到 7 页的画上，他都在河边的小路或岸上，离小船不远。', whyEn: 'The text never says he followed it; on pages 3 to 7 the pictures show him on the path or the bank, not far from the boat.' },
      { id: 'who-shouts', q: '第 6 页里那一声叫喊，是谁喊的？', qEn: 'On page 6, who cries out?',
        options: [{ t: '{boy}', tEn: '{boy}', ok: true }, { t: '青蛙', tEn: 'the frog' }, { t: '爷爷', tEn: 'Grandpa' }, { t: '鸭子', tEn: 'the duck' }],
        pages: ['p6'], why: '文字只写了那一声喊，没写是谁；画上{boy}站在岸边，指着小船，张着嘴。爷爷这一页不在。', whyEn: 'The text gives only the cry, not who said it; the picture shows {boy} on the bank pointing at the boat with his mouth open. Grandpa is not on this page.' }
    ],
    retell: ['讲到开头：{boy}折了一只纸船，放到小河里', '讲到路上：桥下、青蛙、鸭子', '讲到麻烦：小船被树枝卡住了', '讲出是谁帮了忙', '讲到结尾：在池塘边拿回了小船', '用上了 2 到 3 个这本书里新遇到的词'],
    retellEn: ['The beginning: {boy} folded a paper boat and put it on the stream', 'On the way: the bridge, the frog, the duck', 'The problem: the boat got stuck on a branch', 'Who helped', 'The end: he got the boat back at the pond', 'Used 2 or 3 words that were new in this book']
  };
})();

KT_SCENES["last-bus"] = (function () {
  /* Book for the youth and adult bands: a young woman in her first week in a new city misses the last bus at night.
     Flat, muted, adult proportions; real-world print (stop sign, timetable, shop signs, a notice, the bus display) is
     drawn as BLANK panels here and the words are laid over them by the page from the language pack (signs[]), so the
     same drawing carries English, Chinese or Japanese print. */
  var INK = '#1d1f2a', NIGHT = '#1f2842', NIGHT2 = '#2a3557', BLD = '#333d5c', BLD2 = '#3d4868', LIT = '#f1d27a', ROAD = '#353a4f', PAVE = '#565c74',
    KERB = '#80869b', SKIN = '#e2b896', HAIR = '#1b1a20', JACKET = '#3f7d5c', JACKETD = '#2e5e45', JEANS = '#34405e', SHOE = '#25252e', PACK = '#4a4e5b',
    BUS = '#b8443b', BUSD = '#8e322b', GLASS = '#22283a', APRON = '#8c3a3a', SHIRT = '#d8d3c6', GREYH = '#c9c9c9', TROUSER = '#4d5160';
  function wrap(bg, body) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img"><rect width="320" height="240" fill="' + bg + '"/>' + body + '</svg>'; }
  function g(x, y, s, f, body) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s * (f || 1)) + ' ' + s + ')">' + body + '</g>'; }
  function limb(a, b, col, edge, hand) { var d = 'M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1]; return '<path d="' + d + '" stroke="' + edge + '" stroke-width="6.4" stroke-linecap="round"/><path d="' + d + '" stroke="' + col + '" stroke-width="4.4" stroke-linecap="round"/>' + (hand ? '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="2.6" fill="' + SKIN + '"/>' : ''); }
  /* Ana: about twenty, green jacket, dark jeans, black ponytail, dark backpack. Feet at (x, y), facing right unless face = -1.
     o.arm: down | reach | phone | cup | wave | head | step; o.mouth: open | flat | smile */
  function ana(x, y, o) {
    o = o || {};
    var out = '<rect x="-15" y="-76" width="9" height="27" rx="3" fill="' + PACK + '"/>' +
      '<rect x="-7" y="-44" width="6" height="40" fill="' + JEANS + '"/><rect x="1" y="-44" width="6" height="40" fill="' + JEANS + '"/>' +
      '<rect x="-8" y="-5" width="8" height="5" rx="2" fill="' + SHOE + '"/><rect x="1" y="-5" width="10" height="5" rx="2" fill="' + SHOE + '"/>';
    if (o.arm === 'cup' || o.arm === 'wave') out += limb([-2, -72], [10, -56], JACKET, JACKETD, true);
    out += '<path d="M-10 -42 L10 -42 L8 -77 Q0 -80 -8 -77Z" fill="' + JACKET + '" stroke="' + JACKETD + '" stroke-width="1"/><path d="M1 -77 V-42" stroke="' + JACKETD + '" stroke-width="1"/>' +
      '<path d="M-5 -77 L-7 -50" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="-2" y="-82" width="5" height="5" fill="' + SKIN + '"/><circle cx="1" cy="-88" r="8" fill="' + SKIN + '"/>' +
      '<path d="M-7.5 -88 a8.4 8.4 0 0 1 16.5 -2.5 q-5 -3.5 -10 -2 q-4 1 -6.5 4.5z" fill="' + HAIR + '"/><path d="M-7 -91 q-7 2 -6 13 q3 -4 4 -9z" fill="' + HAIR + '"/>' +
      '<circle cx="5" cy="-89" r="1.1" fill="' + INK + '"/>';
    var my = -83.5;
    out += o.mouth === 'open' ? '<ellipse cx="6.2" cy="' + my + '" rx="1.4" ry="1.9" fill="#8f3a36"/>' : o.mouth === 'flat' ? '<path d="M4.5 ' + my + ' h3.6" stroke="' + INK + '" stroke-width="1.2" stroke-linecap="round"/><path d="M3 -92.2 l3.5 .8" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>' :
      '<path d="M4.2 ' + (my - .6) + ' q2 1.6 4 0" fill="none" stroke="' + INK + '" stroke-width="1.2" stroke-linecap="round"/>';
    var hand = { reach: [17, -60], phone: [16, -80], cup: [13, -60], wave: [13, -104], head: [3, -98], step: [12, -52] }[o.arm] || [4, -46];
    out += limb([3, -73], hand, JACKET, JACKETD, true);
    if (o.arm === 'cup' || o.arm === 'wave') out += '<path d="M8 -61 h7 l-1 9 h-5z" fill="#f4f1ea" stroke="#b8b1a0" stroke-width=".8"/><path d="M10 -64 q-1.5 -3 0 -5 M13 -64 q1.5 -3 0 -5" stroke="#d9d9d9" stroke-width="1" fill="none" opacity=".8"/>';
    return g(x, y, o.s || 1, o.face, out);
  }
  /* the shopkeeper: about sixty, glasses, short grey hair, dark-red apron over a pale shirt. o.arm: point | wave | down */
  function keeper(x, y, o) {
    o = o || {};
    var out = '<rect x="-8" y="-44" width="7" height="40" fill="' + TROUSER + '"/><rect x="1" y="-44" width="7" height="40" fill="' + TROUSER + '"/>' +
      '<rect x="-9" y="-5" width="9" height="5" rx="2" fill="' + SHOE + '"/><rect x="1" y="-5" width="10" height="5" rx="2" fill="' + SHOE + '"/>' +
      '<path d="M-12 -42 L12 -42 L10 -80 Q0 -84 -10 -80Z" fill="' + SHIRT + '" stroke="#a9a397" stroke-width="1"/>' +
      '<path d="M-9 -40 L9 -40 L8 -72 L-6 -72Z" fill="' + APRON + '"/><path d="M-6 -72 L-3 -80 M8 -72 L5 -80" stroke="' + APRON + '" stroke-width="1.6"/>' +
      '<rect x="-2" y="-86" width="5" height="6" fill="' + SKIN + '"/><circle cx="1" cy="-92" r="8.6" fill="' + SKIN + '"/>' +
      '<path d="M-8 -93 a9 9 0 0 1 17 -3 q-6 -3 -11 -1.5 q-3 1 -6 4.5z" fill="' + GREYH + '"/>' +
      '<circle cx="4.5" cy="-93" r="2.6" fill="none" stroke="' + INK + '" stroke-width=".9"/><path d="M7 -93 h2 M-1 -93 h3" stroke="' + INK + '" stroke-width=".9"/><circle cx="4.5" cy="-93" r=".9" fill="' + INK + '"/>' +
      '<path d="M3.5 -87.3 q2.2 1.4 4.4 0" fill="none" stroke="' + INK + '" stroke-width="1.1" stroke-linecap="round"/>';
    var hand = { point: [17, -106], wave: [12, -112] }[o.arm] || [5, -47];
    out += limb([3, -77], hand, SHIRT, '#a9a397', true);
    if (o.arm === 'point') out += '<path d="M17 -106 l3 -4" stroke="' + SKIN + '" stroke-width="2" stroke-linecap="round"/>';
    return g(x, y, o.s || 1, o.face, out);
  }
  function lamp(x, y0, y1) { return '<circle cx="' + (x + 9) + '" cy="' + (y1 + 4) + '" r="26" fill="#f6e3a1" opacity=".16"/><rect x="' + (x - 1.5) + '" y="' + y1 + '" width="3" height="' + (y0 - y1) + '" fill="#6b7086"/><path d="M' + x + ' ' + y1 + ' h12" stroke="#6b7086" stroke-width="3"/><path d="M' + (x + 5) + ' ' + (y1 + 1) + ' h10 l-2 5 h-6z" fill="#f6e3a1"/>'; }
  function skyline(base, seed) {
    var out = '', x = -4, i = seed || 0, H = [62, 96, 74, 118, 84, 102, 70, 90];
    while (x < 330) {
      var w = 30 + (i * 7) % 22, ht = H[i % H.length], top = base - ht;
      out += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + ht + '" fill="' + (i % 2 ? BLD : BLD2) + '"/>';
      for (var wy = top + 8; wy < base - 10; wy += 14) for (var wx = x + 5; wx < x + w - 6; wx += 9) if ((wx * 3 + wy + i) % 5 === 0) out += '<rect x="' + wx + '" y="' + wy + '" width="4" height="6" fill="' + LIT + '" opacity=".8"/>';
      x += w + 2; i++;
    }
    return out;
  }
  function street(roadY, paveY) {
    return '<rect x="0" y="' + roadY + '" width="320" height="' + (paveY - roadY) + '" fill="' + ROAD + '"/>' +
      '<g stroke="#c9ccd6" stroke-width="2" opacity=".55"><path d="M10 ' + ((roadY + paveY) / 2) + ' h24 M64 ' + ((roadY + paveY) / 2) + ' h24 M118 ' + ((roadY + paveY) / 2) + ' h24 M172 ' + ((roadY + paveY) / 2) + ' h24 M226 ' + ((roadY + paveY) / 2) + ' h24 M280 ' + ((roadY + paveY) / 2) + ' h24"/></g>' +
      '<rect x="0" y="' + paveY + '" width="320" height="3" fill="' + KERB + '"/><rect x="0" y="' + (paveY + 3) + '" width="320" height="' + (240 - paveY) + '" fill="' + PAVE + '"/>';
  }
  function rain(n, op) { var out = '<g stroke="#b9c7e6" stroke-width="1" opacity="' + (op || .5) + '">'; for (var k = 0; k < n; k++) { var x = (k * 37) % 320, y = (k * 53) % 220; out += '<path d="M' + x + ' ' + y + ' l-2 7"/>'; } return out + '</g>'; }
  function wheel(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#1c1c22"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * .45) + '" fill="#777"/>'; }
  function plate(x, y, w, h, fill, edge) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="' + fill + '" stroke="' + (edge || '#fff') + '" stroke-width="1.5"/>'; }

  /* bus stop with sign plate (blank) and timetable panel (blank) */
  function stop(x, yFoot) { return '<rect x="' + (x - 2) + '" y="50" width="4" height="' + (yFoot - 50) + '" fill="#8a90a3"/>' + plate(x - 30, 46, 60, 26, '#1f6fb2') + plate(x - 26, 82, 52, 40, '#f2f0e6', '#9aa0b0'); }

  var cover = wrap(NIGHT, skyline(150, 1) + street(150, 186) + lamp(196, 214, 60) + stop(70, 214) +
    '<g transform="translate(286 154)"><rect x="-26" y="-34" width="34" height="30" rx="3" fill="' + BUS + '"/><rect x="-22" y="-30" width="26" height="10" fill="' + GLASS + '"/><circle cx="-22" cy="-10" r="2.5" fill="#ff5a4a"/><circle cx="4" cy="-10" r="2.5" fill="#ff5a4a"/></g>' +
    ana(206, 222, { s: 1.15, arm: 'down', mouth: 'flat' }));

  var s1 = wrap(NIGHT, skyline(150, 0) + street(150, 190) + lamp(14, 222, 52) + stop(64, 224) +
    '<rect x="198" y="72" width="4" height="152" fill="#8a90a3"/><rect x="178" y="52" width="44" height="22" rx="3" fill="#121318" stroke="#8a90a3" stroke-width="2"/>' +
    '<g transform="translate(248 186)"><rect x="0" y="-82" width="96" height="78" rx="6" fill="' + BUS + '" stroke="' + BUSD + '" stroke-width="2"/><rect x="8" y="-74" width="62" height="26" rx="3" fill="' + GLASS + '"/>' +
    '<rect x="6" y="-26" width="10" height="7" rx="2" fill="#ff5a4a"/><circle cx="11" cy="-22.5" r="10" fill="#ff5a4a" opacity=".25"/><rect x="34" y="-18" width="22" height="7" fill="#d8d8d0"/>' + wheel(18, -2, 7) + '</g>' +
    '<g stroke="#c9ccd6" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M222 120 h16 M216 136 h22 M224 152 h14"/></g>' +
    ana(136, 226, { s: 1.15, arm: 'reach', mouth: 'open' }));

  var s2 = wrap(NIGHT2, skyline(132, 3) + street(132, 160) + lamp(258, 200, 40) +
    '<rect x="0" y="163" width="320" height="77" fill="' + PAVE + '"/>' +
    ana(118, 316, { s: 2.25, arm: 'phone', mouth: 'flat' }) +
    '<g transform="translate(152 64)"><rect x="0" y="0" width="40" height="70" rx="6" fill="' + INK + '" stroke="#5a5f70" stroke-width="2"/><rect x="4" y="7" width="32" height="56" rx="2" fill="#07080b"/>' +
    '<rect x="11" y="28" width="16" height="9" rx="1.5" fill="none" stroke="#e0483e" stroke-width="1.8"/><rect x="27" y="30.5" width="2.5" height="4" fill="#e0483e"/><rect x="13" y="30" width="2.5" height="5" fill="#e0483e"/></g>');

  var s3 = wrap(NIGHT, '<rect x="0" y="40" width="320" height="150" fill="' + BLD2 + '"/>' +
    '<rect x="0" y="58" width="104" height="16" fill="#2a3047"/><rect x="8" y="82" width="88" height="100" fill="#20253a"/><g stroke="#3a4260" stroke-width="2"><path d="M8 96 h88 M8 110 h88 M8 124 h88 M8 138 h88 M8 152 h88 M8 166 h88"/></g>' +
    '<rect x="110" y="58" width="104" height="16" fill="#2a3047"/><rect x="116" y="82" width="56" height="100" fill="#272d44"/>' +
    '<g fill="#59607a"><rect x="122" y="150" width="20" height="3"/><rect x="128" y="153" width="3" height="16"/><rect x="146" y="150" width="20" height="3"/><rect x="152" y="153" width="3" height="16"/>' +
    '<path d="M124 150 v-14 h7 v14 M134 150 v-14 h7 v14 M148 150 v-14 h7 v14 M158 150 v-14 h7 v14" stroke="#59607a" stroke-width="2" fill="none"/></g>' +
    '<rect x="176" y="96" width="34" height="86" fill="#2b3149" stroke="#59607a" stroke-width="2"/><path d="M188 90 L180 112 M198 90 L206 112" stroke="#8a90a3" stroke-width="1"/>' + plate(178, 110, 30, 18, '#f4efe4', '#b9433a') +
    '<rect x="220" y="58" width="100" height="16" fill="#2a3047"/><rect x="226" y="82" width="90" height="100" fill="#20253a"/><g stroke="#3a4260" stroke-width="2"><path d="M226 96 h90 M226 110 h90 M226 124 h90 M226 138 h90 M226 152 h90 M226 166 h90"/></g>' +
    '<rect x="0" y="186" width="320" height="3" fill="' + KERB + '"/><rect x="0" y="189" width="320" height="51" fill="' + PAVE + '"/>' + lamp(104, 224, 30) +
    ana(262, 230, { s: 1.1, arm: 'step', mouth: 'flat' }));

  var s4 = wrap(NIGHT, skyline(140, 5) +
    '<g transform="translate(270 108)"><rect x="0" y="0" width="50" height="34" fill="#4a4f66"/><rect x="5" y="6" width="40" height="24" fill="' + LIT + '"/><rect x="5" y="0" width="40" height="5" fill="#2c8a5a"/><circle cx="25" cy="18" r="34" fill="' + LIT + '" opacity=".14"/></g>' +
    street(142, 184) + '<g stroke="#e8c33a" stroke-width="2.4" fill="none"><path d="M20 182 V150 H250 V182"/><path d="M60 166 h30 M120 166 h30 M180 166 h30" stroke-dasharray="4 4"/></g>' +
    '<rect x="96" y="66" width="4" height="152" fill="#8a90a3"/>' + plate(66, 44, 64, 24, '#f2c230', '#2a2a2a') + rain(46, .45) +
    ana(160, 224, { s: 1.15, arm: 'head', mouth: 'flat', face: -1 }));

  var s5 = wrap(NIGHT, '<rect x="0" y="0" width="320" height="140" fill="' + NIGHT + '"/>' + skyline(124, 2) +
    '<rect x="132" y="44" width="188" height="140" fill="#4a4f66"/>' + plate(144, 56, 168, 24, '#2c8a5a', '#d8efe1') +
    '<rect x="148" y="90" width="110" height="90" fill="' + LIT + '"/><g fill="#c98f4a" opacity=".85"><rect x="154" y="104" width="98" height="4"/><rect x="154" y="128" width="98" height="4"/><rect x="154" y="152" width="98" height="4"/></g>' +
    '<g opacity=".9"><rect x="158" y="94" width="8" height="10" fill="#d0574a"/><rect x="170" y="96" width="7" height="8" fill="#4a7fd0"/><rect x="182" y="93" width="9" height="11" fill="#5aa05a"/><rect x="198" y="118" width="8" height="10" fill="#e0a53a"/><rect x="214" y="120" width="10" height="8" fill="#d0574a"/><rect x="230" y="142" width="8" height="10" fill="#4a7fd0"/></g>' +
    '<rect x="266" y="96" width="34" height="84" fill="#f6e3a1" stroke="#2c2f3d" stroke-width="2"/>' +
    '<circle cx="230" cy="130" r="90" fill="' + LIT + '" opacity=".08"/>' +
    '<rect x="0" y="184" width="320" height="56" fill="' + ROAD + '"/><g fill="#d8dbe3" opacity=".8"><rect x="34" y="188" width="10" height="48"/><rect x="54" y="188" width="10" height="48"/><rect x="74" y="188" width="10" height="48"/><rect x="94" y="188" width="10" height="48"/><rect x="114" y="188" width="10" height="48"/></g>' +
    rain(40, .4) + ana(90, 232, { s: 1.05, arm: 'step', mouth: 'smile' }));

  var s6 = wrap('#eee5d0', '<rect x="0" y="196" width="320" height="44" fill="#c9b79a"/>' +
    '<g><rect x="6" y="40" width="96" height="150" fill="#d9c9a8"/><g fill="#b39a74"><rect x="6" y="76" width="96" height="4"/><rect x="6" y="114" width="96" height="4"/><rect x="6" y="152" width="96" height="4"/></g>' +
    '<g><rect x="12" y="58" width="12" height="18" fill="#d0574a"/><rect x="28" y="62" width="10" height="14" fill="#4a7fd0"/><rect x="42" y="56" width="14" height="20" fill="#5aa05a"/><rect x="62" y="60" width="12" height="16" fill="#e0a53a"/><rect x="80" y="62" width="14" height="14" fill="#7a5aa0"/>' +
    '<rect x="14" y="98" width="16" height="16" fill="#e0a53a"/><rect x="36" y="96" width="10" height="18" fill="#d0574a"/><rect x="52" y="100" width="18" height="14" fill="#4a7fd0"/><rect x="76" y="94" width="12" height="20" fill="#5aa05a"/>' +
    '<rect x="12" y="136" width="20" height="16" fill="#4a7fd0"/><rect x="38" y="134" width="12" height="18" fill="#5aa05a"/><rect x="56" y="138" width="16" height="14" fill="#d0574a"/><rect x="78" y="132" width="14" height="20" fill="#e0a53a"/></g></g>' +
    '<rect x="186" y="38" width="66" height="50" fill="#fbfaf5" stroke="#cfc8b6" stroke-width="1"/><g fill="#e6dcb8" opacity=".9"><rect x="182" y="35" width="10" height="5" transform="rotate(-20 187 37)"/><rect x="246" y="35" width="10" height="5" transform="rotate(20 251 37)"/></g>' +
    keeper(270, 208, { arm: 'point', face: -1, s: 1.15 }) +
    '<rect x="150" y="160" width="170" height="80" fill="#8a6b4a"/><rect x="150" y="156" width="170" height="6" fill="#a7835c"/>' +
    '<rect x="292" y="130" width="22" height="26" rx="2" fill="#3a3d48"/><rect x="295" y="134" width="16" height="9" fill="#9fd4a3"/>' +
    '<g transform="translate(196 150)"><rect x="0" y="0" width="12" height="6" rx="1.5" fill="' + INK + '"/></g><path d="M208 153 q16 6 30 -2 q12 -6 20 4" stroke="#f4f1ea" stroke-width="1.6" fill="none"/>' +
    '<rect x="199" y="151.5" width="6" height="3" fill="#6fd27a"/>' +
    ana(112, 232, { s: 1.15, arm: 'cup', mouth: 'smile' }));

  var s7 = wrap(NIGHT, skyline(140, 4) + street(140, 196) +
    '<g><rect x="0" y="96" width="62" height="100" fill="#4a4f66"/><rect x="10" y="118" width="34" height="78" fill="' + LIT + '"/><circle cx="27" cy="150" r="40" fill="' + LIT + '" opacity=".1"/></g>' +
    keeper(28, 196, { arm: 'wave', s: .72 }) +
    '<g><rect x="104" y="90" width="214" height="98" rx="8" fill="' + BUS + '" stroke="' + BUSD + '" stroke-width="2"/><rect x="104" y="90" width="20" height="62" rx="6" fill="' + GLASS + '"/>' +
    '<rect x="132" y="118" width="58" height="34" rx="2" fill="' + GLASS + '"/><rect x="250" y="100" width="20" height="34" rx="2" fill="' + GLASS + '"/><rect x="274" y="100" width="20" height="34" rx="2" fill="' + GLASS + '"/><rect x="298" y="100" width="18" height="34" rx="2" fill="' + GLASS + '"/>' +
    '<rect x="132" y="94" width="58" height="18" rx="2" fill="#111" stroke="#555" stroke-width="1"/>' +
    '<rect x="200" y="104" width="40" height="82" fill="#f6e3a1"/><rect x="240" y="104" width="5" height="82" fill="' + BUSD + '"/>' + wheel(150, 190, 10) + wheel(286, 190, 10) + '</g>' +
    ana(222, 198, { s: 1.0, arm: 'wave', mouth: 'smile', face: -1 }));

  var CH = { ana: 'a young woman of about twenty in a green jacket, dark jeans and a dark backpack, black hair in a ponytail',
    keeper: 'the shopkeeper: a man of about sixty with glasses, short grey hair, a pale shirt and a dark-red apron' };
  var SET = 'a city street at night, the first week in a new city';
  function brief(n, facts, chars, change, setting) { return { setting: setting || SET, characters: chars.map(function (c) { return CH[c]; }), facts: facts, frame: n + '/7', change: change }; }
  var PRINT = 'blank panel (no letters); the page lays the words over it';

  return {
    title: 'last-bus',
    cover: { svg: cover, alt: '封面：夜里的城市街道，一个背着双肩包的年轻女子站在公交站旁，远处一辆公交车开走了', altEn: 'Cover: a city street at night; a young woman with a backpack stands by a bus stop while a bus drives off in the distance',
      signs: [{ id: 'stop', x: 40, y: 46, w: 60, h: 26, size: 10, ink: '#ffffff' }, { id: 'timetable', x: 44, y: 82, w: 52, h: 40, size: 8.5, ink: '#1d1f2a' }],
      imageBrief: { setting: SET, characters: [CH.ana], facts: ['the young woman standing under a street lamp near a bus stop, looking down the road', 'a bus far away down the road, driving off', 'the bus-stop sign plate and timetable as a ' + PRINT], frame: 'cover', change: 'cover: introduces Ana and the night street' } },
    pages: [
      { id: 's1', svg: s1, alt: '夜里的公交站。站牌和时刻表在左边的杆子上，旁边街钟亮着时间；女子张着嘴伸手，一辆公交车的车尾和红色尾灯正从右边开出画面', altEn: 'A bus stop at night. The stop sign and timetable are on the pole on the left, a street clock shows the time; the young woman reaches out, mouth open, as the back of a bus with red tail-lights leaves the picture on the right',
        signs: [{ id: 'stop', x: 34, y: 46, w: 60, h: 26, size: 10, ink: '#ffffff' }, { id: 'timetable', x: 38, y: 82, w: 52, h: 40, size: 8.5, ink: '#1d1f2a' }, { id: 'clock', x: 178, y: 52, w: 44, h: 22, size: 12, ink: '#ffb340', t: '23:15' }],
        spots: [{ id: 'ana', x: 118, y: 126, w: 40, h: 100 }, { id: 'bus', x: 246, y: 102, w: 74, h: 88 }, { id: 'clock', x: 176, y: 50, w: 48, h: 26 }, { id: 'lights', x: 250, y: 156, w: 22, h: 16 }],
        ask: '这是什么地方？时刻表和街钟告诉你什么？', askEn: 'Where is this? What do the timetable and the clock tell you?',
        imageBrief: brief(1, ['a bus stop on a city street at night: a pole with a sign plate and a timetable panel, both as a ' + PRINT, 'a street clock on a post with a digital display (shown as a ' + PRINT + ')', 'the young woman reaching out towards the road, mouth open', 'the back of a red bus with glowing tail-lights leaving the picture on the right'], ['ana'], 'the last bus has just left') },
      { id: 's2', svg: s2, alt: '近景：女子举着手机，皱着眉；手机屏幕全黑，只有一个红色的空电池图标', altEn: 'Close up: the young woman holds up her phone, frowning; the screen is black except for a red empty-battery symbol',
        spots: [{ id: 'phone', x: 150, y: 62, w: 44, h: 74 }, { id: 'ana', x: 60, y: 96, w: 86, h: 144 }],
        ask: '她的手机怎么了？', askEn: 'What is wrong with her phone?',
        imageBrief: brief(2, ['close up of the young woman holding up her phone, frowning', 'the phone screen black except for a red empty-battery symbol', 'an empty street and a street lamp behind her'], ['ana'], 'her phone battery is empty') },
      { id: 's3', svg: s3, alt: '一排店铺都黑着灯；中间咖啡馆的门上挂着一块小牌子，店里的椅子倒扣在桌子上；女子从右边走过', altEn: 'A row of shops, all dark; a small sign hangs on the door of the café in the middle, and inside the chairs are upside down on the tables; the young woman walks past on the right',
        signs: [{ id: 'closed', x: 178, y: 110, w: 30, h: 18, size: 6.5, ink: '#b9433a' }],
        spots: [{ id: 'cafe', x: 116, y: 80, w: 94, h: 104 }, { id: 'chairs', x: 120, y: 132, w: 50, h: 40 }, { id: 'ana', x: 246, y: 128, w: 36, h: 102 }],
        ask: '这些店怎么样？咖啡馆里的椅子说明什么？', askEn: 'What are the shops like? What do the chairs in the café tell you?',
        imageBrief: brief(3, ['a row of shop fronts at night, every one dark, shutters down on two of them', 'a café in the middle: chairs upside down on the tables, a small hanging sign on the door as a ' + PRINT, 'the young woman walking past on the pavement'], ['ana'], 'everything is closed') },
      { id: 's4', svg: s4, alt: '空空的出租车停靠区，杆子上有一块黄色牌子；开始下小雨；女子举起一只手，四处张望；马路对面远处有一扇亮着的窗', altEn: 'An empty taxi rank with a yellow sign on a pole; a light rain is starting; the young woman has one arm raised and is looking around; far across the road one window is lit',
        signs: [{ id: 'taxi', x: 66, y: 44, w: 64, h: 24, size: 10, ink: '#1d1f2a' }],
        spots: [{ id: 'taxi', x: 64, y: 42, w: 68, h: 28 }, { id: 'rain', x: 0, y: 0, w: 60, h: 40 }, { id: 'ana', x: 140, y: 120, w: 40, h: 104 }, { id: 'light', x: 268, y: 100, w: 52, h: 44 }],
        ask: '这里有车吗？天气怎么样？远处那扇亮着的窗是什么？', askEn: 'Are there any cars here? What is the weather doing? What is the lit window in the distance?',
        imageBrief: brief(4, ['an empty taxi rank: yellow road markings, no cars', 'a sign on a pole for the taxi rank as a ' + PRINT, 'a light rain starting', 'the young woman with one arm raised, looking around for a taxi', 'far across the road, one small lit shop window'], ['ana'], 'no taxis either; it starts to rain') },
      { id: 's5', svg: s5, alt: '马路对面一家小店灯火通明，招牌在上方，橱窗里是货架；女子正从斑马线上朝它走去；还在下小雨', altEn: 'Across the road a small shop is brightly lit, with its sign above and shelves in the window; the young woman is crossing the zebra crossing towards it; it is still drizzling',
        signs: [{ id: 'open', x: 144, y: 56, w: 168, h: 24, size: 11, ink: '#ffffff' }],
        spots: [{ id: 'shop', x: 140, y: 52, w: 176, h: 130 }, { id: 'crossing', x: 30, y: 186, w: 98, h: 52 }, { id: 'ana', x: 72, y: 128, w: 40, h: 104 }],
        ask: '她要去哪儿？这家店和别的店有什么不一样？', askEn: 'Where is she going? How is this shop different from the others?',
        imageBrief: brief(5, ['a small brightly lit corner shop at night, shelves of goods in the window', 'the shop sign above the window as a ' + PRINT, 'the young woman crossing a zebra crossing towards the shop', 'light rain'], ['ana'], 'she finds somewhere open') },
      { id: 's6', svg: s6, alt: '店里：左边是货架；柜台后面戴眼镜、系红围裙的店主指着墙上的一张告示；女子捧着一杯热茶，笑了；她的手机放在柜台上，连着充电线，屏幕上有一小格绿色电量', altEn: 'Inside the shop: shelves on the left; behind the counter the shopkeeper, with glasses and a red apron, points at a notice on the wall; the young woman holds a hot cup of tea and smiles; her phone lies on the counter on a charging cable, with a little green on the screen',
        signs: [{ id: 'notice', x: 186, y: 38, w: 66, h: 50, size: 7, ink: '#1d1f2a' }],
        spots: [{ id: 'keeper', x: 246, y: 84, w: 44, h: 72 }, { id: 'notice', x: 184, y: 36, w: 70, h: 54 }, { id: 'cup', x: 116, y: 150, w: 24, h: 24 }, { id: 'phone', x: 190, y: 144, w: 70, h: 16 }, { id: 'till', x: 290, y: 128, w: 26, h: 30 }],
        ask: '谁在帮她？他在指什么？', askEn: 'Who is helping her? What is he pointing at?',
        imageBrief: brief(6, ['inside a small shop: shelves of goods on the left, a wooden counter with a till', 'the shopkeeper behind the counter pointing at a notice taped on the wall (the notice as a ' + PRINT + ')', 'the young woman holding a hot paper cup of tea, smiling', 'her phone on the counter on a charging cable, a little green on its screen'], ['ana', 'keeper'], 'she gets help', 'inside a small all-night shop, warm light') },
      { id: 's7', svg: s7, alt: '一辆公交车停在站上，车门开着，车头上方的显示屏亮着；女子一手拿着茶杯，正上车，回头向左边店门口招手的店主挥手', altEn: 'A bus stands at the stop with its door open and the display above the front lit; the young woman, cup in hand, is getting on and turns to wave back at the shopkeeper waving from the shop door on the left',
        signs: [{ id: 'dest', x: 132, y: 94, w: 58, h: 18, size: 7.5, ink: '#ffb340' }],
        spots: [{ id: 'bus', x: 104, y: 88, w: 216, h: 104 }, { id: 'ana', x: 200, y: 100, w: 40, h: 98 }, { id: 'keeper', x: 12, y: 112, w: 34, h: 86 }],
        ask: '她坐上了什么车？她在向谁挥手？', askEn: 'What is she getting on? Who is she waving to?',
        imageBrief: brief(7, ['a red bus at a stop at night, front door open and lit inside', 'the destination display above the front as a ' + PRINT, 'the young woman, a paper cup in one hand, stepping on and turning to wave', 'the shopkeeper, small, waving from the lit shop door on the left'], ['ana', 'keeper'], 'she gets a bus home') }
    ],
    spotLabels: { ana: { t: '女子', tEn: 'the young woman' }, bus: { t: '公交车', tEn: 'the bus' }, clock: { t: '街钟', tEn: 'the clock' }, lights: { t: '尾灯', tEn: 'the tail-lights' },
      phone: { t: '手机', tEn: 'the phone' }, cafe: { t: '咖啡馆', tEn: 'the café' }, chairs: { t: '椅子', tEn: 'the chairs' }, taxi: { t: '出租车牌子', tEn: 'the taxi sign' },
      rain: { t: '雨', tEn: 'the rain' }, light: { t: '亮着的窗', tEn: 'the lit window' }, shop: { t: '小店', tEn: 'the shop' }, crossing: { t: '斑马线', tEn: 'the crossing' },
      keeper: { t: '店主', tEn: 'the shopkeeper' }, notice: { t: '告示', tEn: 'the notice' }, cup: { t: '茶', tEn: 'the tea' }, till: { t: '收银机', tEn: 'the till' } },
    signLabels: { stop: { t: '站牌', tEn: 'stop sign' }, timetable: { t: '时刻表', tEn: 'timetable' }, clock: { t: '街钟', tEn: 'clock' }, closed: { t: '门上的牌子', tEn: 'door sign' },
      taxi: { t: '出租车牌子', tEn: 'taxi sign' }, open: { t: '招牌', tEn: 'shop sign' }, notice: { t: '告示', tEn: 'notice' }, dest: { t: '车头显示屏', tEn: 'bus display' } },
    predict: [
      { at: 'cover', q: '看封面和书名：这个故事会讲什么？', qEn: 'Look at the cover and the title: what will this story be about?',
        choices: ['在陌生城市里，深夜回不了家', '一个公交司机上班的第一天', '城里的一场派对'], choicesEn: ['Getting home late at night in a city you don’t know', 'A bus driver’s first day at work', 'A party in the city'] },
      { at: 's3', q: '末班车走了，手机也没电了。她接下来会怎么做？', qEn: 'The last bus has gone and her phone is dead. What will she do next?',
        choices: ['沿着街走，找人帮忙', '在车站等到天亮', '朋友开车来接她'], choicesEn: ['Walk along the street and look for help', 'Wait at the stop until morning', 'A friend drives over to fetch her'],
        book: '她沿着大街走，想找一个还开着的地方。', bookEn: 'She walks along the street, looking for somewhere still open.' },
      { at: 's5', q: '翻页之前：她会在哪儿找到帮助？', qEn: 'Before you turn the page: where will she find help?',
        choices: ['一家还开着的小店', '出租车停靠区', '回到公交站'], choicesEn: ['A shop that is still open', 'The taxi rank', 'Back at the bus stop'],
        book: '马路对面有一家整夜开着的小店。', bookEn: 'Across the road a shop is open all night.' },
      { at: 's7', q: '翻页之前：她最后怎么回家？', qEn: 'Before you turn the page: how will she get home in the end?',
        choices: ['坐夜班车', '一路走回去', '店主开车送她'], choicesEn: ['On a night bus', 'She walks all the way', 'The shopkeeper drives her'],
        book: '她坐上了 N2 夜班车。', bookEn: 'She gets on the N2 night bus.' }
    ],
    infer: [
      { id: 'how-late', q: '{name}错过末班车，大概晚了多久？', qEn: 'About how late was {name} for the last bus?',
        options: [{ t: '五分钟左右', tEn: 'About five minutes', ok: true }, { t: '半个小时左右', tEn: 'About half an hour' }, { t: '一个小时左右', tEn: 'About an hour' }, { t: '没晚，是车没停', tEn: 'She was not late; the bus did not stop' }],
        pages: ['s1'], why: '文字只说她晚了一步；第 1 页时刻表上的末班车是 23:10，街钟是 23:15。', whyEn: 'The text only says she just missed it; on page 1 the timetable gives the last bus as 23:10 and the street clock shows 23:15.' },
      { id: 'who-helped', q: '是谁给了{name}充电线和热茶？', qEn: 'Who gave {name} the charging cable and the tea?',
        options: [{ t: '小店的店主', tEn: 'The man who runs the shop', ok: true }, { t: '公交司机', tEn: 'The bus driver' }, { t: '她打电话叫来的朋友', tEn: 'A friend she phoned' }, { t: '出租车司机', tEn: 'A taxi driver' }],
        pages: ['s6'], why: '文字没说是谁；第 6 页的画上，柜台后面系围裙的店主在帮她，她的手机连着柜台上的充电线。她也打不了电话：手机没电（第 2 页）。', whyEn: 'The text does not say who; the picture on page 6 shows the shopkeeper in his apron helping her, with her phone on a cable on his counter. She could not have phoned anyone: her phone was dead (page 2).' },
      { id: 'where-home', q: '{name}大概住在哪儿附近？', qEn: 'Where does {name} probably live?',
        options: [{ t: '{dest}附近', tEn: 'Near {dest}', ok: true }, { t: '那家小店楼上', tEn: 'Above the shop' }, { t: '第 1 页的公交站旁边', tEn: 'Next to the bus stop on page 1' }],
        pages: ['s7'], why: '文字只说她上了车；第 7 页车头的显示屏写着这趟车开往{dest}，她要坐它回家。', whyEn: 'The text only says she got on; on page 7 the display on the bus says it goes to {dest}, and she takes it home.' }
    ],
    retell: ['开头：来这座城市的第一个星期，{name}错过了末班车', '麻烦一个接一个：手机没电、店都关了、没有出租车', '谁帮了她、怎么帮的', '结尾：怎么回的家', '用上了 2 到 3 个这个故事里新遇到的词'],
    retellEn: ['The beginning: in her first week in the city, {name} missed the last bus', 'One problem after another: dead phone, shops closed, no taxis', 'Who helped her, and how', 'The end: how she got home', 'Used 2 or 3 words that were new in this story']
  };
})();

KT_DATA["picture-book-en"] = {
 "id": "picture-book-en",
 "scene": "paper-boat",
 "lang": "en",
 "speech": "en-US",
 "title": "绘本阅读：英语",
 "titleEn": "Picture-book reading: English",
 "subtitle": "一本原创绘本，两种读法：学认字和借读书学语言。",
 "subtitleEn": "One original picture book, two ways to read it: learning to read, and reading to learn.",
 "bookTitle": "The Blue Paper Boat",
 "names": {
  "boy": "Sam",
  "boyEn": "Sam"
 },
 "aid": "listen",
 "aidLabel": "“听”按钮",
 "aidLabelEn": "a listen button",
 "spots": {
  "boy": {
   "w": "Sam"
  },
  "boat": {
   "w": "boat"
  },
  "window": {
   "w": "window"
  },
  "gate": {
   "w": "gate"
  },
  "grandpa": {
   "w": "Grandpa"
  },
  "water": {
   "w": "water"
  },
  "bridge": {
   "w": "bridge"
  },
  "frog": {
   "w": "frog"
  },
  "stone": {
   "w": "stone"
  },
  "duck": {
   "w": "duck"
  },
  "reeds": {
   "w": "reeds"
  },
  "branch": {
   "w": "branch"
  },
  "pond": {
   "w": "pond"
  }
 },
 "pages": [
  {
   "id": "p1",
   "learn": [
    "Sam",
    "makes",
    "a",
    "<boat>."
   ],
   "read": [
    "The",
    "rain",
    "had",
    "stopped",
    "at",
    "last.",
    "Sam",
    "folded",
    "a",
    "sheet",
    "of",
    "blue",
    "paper",
    "into",
    "a",
    "boat",
    "and",
    "ran",
    "his",
    "thumb",
    "along",
    "every",
    "[[crease]]."
   ],
   "find": [
    {
     "w": "Sam"
    },
    {
     "w": "boat"
    }
   ]
  },
  {
   "id": "p2",
   "learn": [
    "Sam",
    "puts",
    "the",
    "<boat>",
    "on",
    "the",
    "water."
   ],
   "read": [
    "Down",
    "at",
    "the",
    "stream,",
    "he",
    "set",
    "the",
    "boat",
    "gently",
    "on",
    "the",
    "water.",
    "“Mind",
    "the",
    "[[weir]]!”",
    "Grandpa",
    "called",
    "from",
    "the",
    "gate."
   ],
   "find": [
    {
     "w": "water"
    },
    {
     "w": "puts"
    }
   ]
  },
  {
   "id": "p3",
   "learn": [
    "The",
    "<boat>",
    "goes",
    "<under>",
    "the",
    "bridge."
   ],
   "read": [
    "The",
    "[[current]]",
    "carried",
    "it",
    "under",
    "the",
    "old",
    "stone",
    "bridge,",
    "into",
    "the",
    "shadow",
    "and",
    "out",
    "into",
    "the",
    "sun",
    "again."
   ],
   "find": [
    {
     "w": "under"
    },
    {
     "w": "bridge"
    }
   ]
  },
  {
   "id": "p4",
   "learn": [
    "The",
    "<boat>",
    "goes",
    "<past>",
    "the",
    "<frog>."
   ],
   "read": [
    "It",
    "[[drifted]]",
    "past",
    "a",
    "frog",
    "on",
    "a",
    "flat",
    "stone.",
    "The",
    "frog",
    "did",
    "not",
    "even",
    "blink."
   ],
   "find": [
    {
     "w": "frog"
    },
    {
     "w": "goes"
    }
   ]
  },
  {
   "id": "p5",
   "learn": [
    "The",
    "<boat>",
    "goes",
    "<past>",
    "the",
    "<duck>."
   ],
   "read": [
    "Near",
    "the",
    "[[reeds]],",
    "a",
    "duck",
    "was",
    "looking",
    "for",
    "food,",
    "head",
    "down",
    "and",
    "tail",
    "up."
   ],
   "find": [
    {
     "w": "duck"
    },
    {
     "w": "past"
    }
   ]
  },
  {
   "id": "p6",
   "learn": [
    "Oh",
    "no!",
    "The",
    "<boat>",
    "is",
    "<stuck>."
   ],
   "read": [
    "Then",
    "the",
    "boat",
    "bumped",
    "into",
    "a",
    "fallen",
    "branch",
    "and",
    "stuck",
    "[[fast]].",
    "“Oh",
    "no!”"
   ],
   "find": [
    {
     "w": "stuck"
    },
    {
     "w": "no"
    }
   ]
  },
  {
   "id": "p7",
   "learn": [
    "The",
    "<duck>",
    "pushes",
    "the",
    "<boat>."
   ],
   "read": [
    "Something",
    "gave",
    "it",
    "a",
    "[[nudge]]",
    "from",
    "behind,",
    "and",
    "off",
    "it",
    "went",
    "again."
   ],
   "find": [
    {
     "w": "pushes"
    },
    {
     "w": "duck"
    }
   ]
  },
  {
   "id": "p8",
   "learn": [
    "Sam",
    "gets",
    "the",
    "<boat>.",
    "“Thank",
    "you,",
    "<duck>!”"
   ],
   "read": [
    "At",
    "the",
    "pond,",
    "Sam",
    "scooped",
    "up",
    "the",
    "[[soggy]]",
    "boat.",
    "“Thank",
    "you,”",
    "he",
    "said",
    "to",
    "the",
    "duck.",
    "“Come",
    "and",
    "have",
    "some",
    "[[parkin]]!”",
    "Grandpa",
    "called",
    "from",
    "the",
    "path."
   ],
   "find": [
    {
     "w": "thank"
    },
    {
     "w": "gets"
    }
   ]
  }
 ],
 "targets": [
  {
   "id": "boat",
   "w": "boat",
   "say": "boat",
   "audioOnly": true,
   "options": [
    {
     "say": "boat",
     "ok": true
    },
    {
     "say": "bat",
     "type": "vowel"
    },
    {
     "say": "boot",
     "type": "vowel"
    }
   ],
   "hint": {
    "show": "b · oa · t",
    "note": "oa 两个字母合起来读一个音，和 coat、road 里一样。",
    "noteEn": "oa is two letters for one sound, as in coat and road."
   }
  },
  {
   "id": "under",
   "w": "under",
   "say": "under",
   "audioOnly": true,
   "options": [
    {
     "say": "under",
     "ok": true
    },
    {
     "say": "over",
     "type": "meaning"
    },
    {
     "say": "thunder",
     "type": "blend"
    }
   ],
   "hint": {
    "show": "un · der",
    "note": "两拍：先读 un，再读 der。",
    "noteEn": "Two beats: un, then der."
   }
  },
  {
   "id": "past",
   "w": "past",
   "say": "past",
   "audioOnly": true,
   "options": [
    {
     "say": "past",
     "ok": true
    },
    {
     "say": "pest",
     "type": "vowel"
    },
    {
     "say": "path",
     "type": "look-alike"
    }
   ],
   "hint": {
    "show": "p · a · st",
    "note": "最后是 s 和 t 两个音连在一起。",
    "noteEn": "At the end, s and t run together."
   }
  },
  {
   "id": "frog",
   "w": "frog",
   "say": "frog",
   "audioOnly": true,
   "options": [
    {
     "say": "frog",
     "ok": true
    },
    {
     "say": "fog",
     "type": "blend"
    },
    {
     "say": "from",
     "type": "look-alike"
    }
   ],
   "hint": {
    "show": "fr · o · g",
    "note": "开头 f 和 r 两个音都要读出来。",
    "noteEn": "At the start, say both f and r."
   }
  },
  {
   "id": "duck",
   "w": "duck",
   "say": "duck",
   "audioOnly": true,
   "options": [
    {
     "say": "duck",
     "ok": true
    },
    {
     "say": "dock",
     "type": "vowel"
    },
    {
     "say": "bird",
     "type": "meaning"
    }
   ],
   "hint": {
    "show": "d · u · ck",
    "note": "ck 两个字母读一个音。",
    "noteEn": "ck is two letters for one sound."
   }
  },
  {
   "id": "stuck",
   "w": "stuck",
   "say": "stuck",
   "audioOnly": true,
   "options": [
    {
     "say": "stuck",
     "ok": true
    },
    {
     "say": "stick",
     "type": "vowel"
    },
    {
     "say": "stop",
     "type": "look-alike"
    }
   ],
   "hint": {
    "show": "st · u · ck",
    "note": "和 duck 结尾一样。",
    "noteEn": "It ends like duck."
   }
  }
 ],
 "reverse": [
  {
   "target": "frog",
   "tokens": [
    "A",
    "<frog>",
    "can",
    "jump."
   ]
  },
  {
   "target": "stuck",
   "tokens": [
    "The",
    "door",
    "is",
    "<stuck>."
   ]
  },
  {
   "target": "under",
   "tokens": [
    "The",
    "cat",
    "is",
    "<under>",
    "the",
    "bed."
   ]
  },
  {
   "target": "past",
   "tokens": [
    "We",
    "walk",
    "<past>",
    "the",
    "shop."
   ]
  },
  {
   "target": "boat",
   "tokens": [
    "Dad",
    "has",
    "a",
    "red",
    "<boat>."
   ]
  },
  {
   "target": "duck",
   "tokens": [
    "A",
    "<duck>",
    "can",
    "swim."
   ]
  }
 ],
 "words": [
  {
   "id": "crease",
   "w": "crease",
   "page": "p1",
   "clue": [
    "context"
   ],
   "gloss": "折痕：纸折过以后留下的线",
   "glossEn": "the line left where paper has been folded",
   "why": "前面说 folded（折），又说用拇指沿着每一条……按过去：说的是折出来的线。",
   "whyEn": "\"folded\" and \"ran his thumb along every …\" tell you it is the folded line."
  },
  {
   "id": "weir",
   "w": "weir",
   "page": "p2",
   "clue": [
    "none"
   ],
   "gloss": "拦河的矮坝：横在河上、让水从上面流过的低墙",
   "glossEn": "a low wall built across a river, with the water flowing over it",
   "why": "“Mind the …!” 只告诉你要当心它，画上也没有。它到底是什么，这一页看不出来，要查。",
   "whyEn": "\"Mind the …!\" only tells you it is something to be careful of, and it is not in the picture. What it is, this page cannot tell you: look it up."
  },
  {
   "id": "current",
   "w": "current",
   "page": "p3",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "水流：河里朝一个方向流动的水",
   "glossEn": "the water in a river or stream moving one way",
   "why": "它“把小船带到桥下”（carried it），画上的水有流动的线。",
   "whyEn": "It \"carried it\" under the bridge, and the picture shows the water flowing."
  },
  {
   "id": "drifted",
   "w": "drifted",
   "page": "p4",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "（被水或风带着）慢慢漂",
   "glossEn": "moved slowly, carried by water or air",
   "why": "小船自己不会走，从青蛙旁边经过，画上是漂在水上。",
   "whyEn": "A paper boat cannot move by itself; it goes past the frog, and the picture shows it floating."
  },
  {
   "id": "reeds",
   "w": "reeds",
   "page": "p5",
   "clue": [
    "picture"
   ],
   "gloss": "芦苇：水边长的高高的草",
   "glossEn": "tall grass-like plants growing at the edge of water",
   "why": "“Near the …” 说的是鸭子旁边的东西；画上鸭子旁边是一丛高草。",
   "whyEn": "\"Near the …\" names something next to the duck; in the picture that is a clump of tall plants."
  },
  {
   "id": "fast",
   "w": "fast",
   "page": "p6",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "（这里）牢牢地，动不了；不是“快”",
   "glossEn": "here: firmly, so it cannot move (not \"quickly\")",
   "why": "认识的词，这里讲不通“快”：撞上树枝、卡住、“Oh no!”，画上小船歪着不动。",
   "whyEn": "A word you know that does not make sense as \"quickly\" here: it bumped into a branch, stuck, \"Oh no!\", and the picture shows it caught."
  },
  {
   "id": "nudge",
   "w": "nudge",
   "page": "p7",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "轻轻一推",
   "glossEn": "a small, gentle push",
   "why": "“from behind”，然后小船又走了；画上鸭子在后面顶着它。",
   "whyEn": "\"from behind\", and then off it went; the picture shows the duck pushing it."
  },
  {
   "id": "soggy",
   "w": "soggy",
   "page": "p8",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "湿透了、软塌塌的",
   "glossEn": "very wet and soft",
   "why": "刚从池塘里捞起来的纸船；画上帆塌下来，还在滴水。",
   "whyEn": "A paper boat just taken out of a pond; in the picture the sail droops and it drips."
  },
  {
   "id": "parkin",
   "w": "parkin",
   "page": "p8",
   "clue": [
    "none"
   ],
   "gloss": "帕金蛋糕：英格兰北部一种加姜和燕麦的黏蛋糕",
   "glossEn": "a sticky cake made with ginger and oats, from the north of England",
   "why": "“Come and have some …” 只告诉你是可以吃或喝的东西；到底是什么，这一页看不出来，要查。",
   "whyEn": "\"Come and have some …\" only tells you it is something to eat or drink; what exactly, this page cannot tell you: look it up."
  }
 ],
 "review": [
  "weir 和 parkin 是英式英语里的词，故意选来做“看不出来、要查”的词；请确认 “Mind the weir!” 和 “Come and have some parkin!” 对英国读者自然。",
  "stuck fast 里 fast 表示“牢牢地”，请确认对低年级读者不太偏。",
  "听音选项靠浏览器语音合成：bat／boot、fog／from、pest／past 这几对合成后是否听得清，最好换成真人录音。",
  "学认字文本中 pushes、Thank 不是目标词，只出现在“听音找词”里；请确认对五到七岁的孩子可以接受。"
 ],
 "reviewEn": [
  "weir and parkin are British English words chosen on purpose as \"cannot tell from the page, look it up\" words; please confirm that \"Mind the weir!\" and \"Come and have some parkin!\" sound natural to British readers.",
  "fast in \"stuck fast\" means firmly; please confirm it is not too unusual for young readers.",
  "The listening options rely on browser speech synthesis: check that bat / boot, fog / from and pest / past are clearly different when synthesised, or replace them with recordings.",
  "In the learning-to-read text, pushes and Thank are not target words and only appear in \"hear a word, find it\"; please confirm this is acceptable for five- to seven-year-olds."
 ],
 "older": {
  "scene": "last-bus",
  "title": "图文故事阅读：英语",
  "titleEn": "Illustrated story reading: English",
  "subtitle": "给青少年和成人的一个原创图文故事，两种读法：学认字和借读书学语言。故事里有真实的街头文字：站牌、时刻表、店招、告示。",
  "subtitleEn": "An original illustrated story for teenagers and adults, read two ways: learning to read, and reading to learn. The pictures carry real street print: a stop sign, a timetable, shop signs, a notice.",
  "bookTitle": "The Last Bus",
  "names": {
   "name": "Ana",
   "nameEn": "Ana",
   "dest": "Park Road",
   "destEn": "Park Road"
  },
  "learnNote": "这一套假定你已经能读另一种语言或文字：目标词是招牌和告示上的词，拼写规律直接告诉你；不要求一个字母一个字母地拼。",
  "learnNoteEn": "This assumes you already read another language or script: the target words are the ones on signs and notices, and the spelling patterns are named for you; you are not asked to sound out every letter.",
  "cover": {
   "signs": {
    "stop": "Bus stop",
    "timetable": "Last bus\n23:10"
   }
  },
  "spots": {
   "ana": {
    "w": "Ana"
   },
   "bus": {
    "w": "bus"
   },
   "clock": {
    "w": "clock"
   },
   "lights": {
    "w": "tail-lights"
   },
   "phone": {
    "w": "phone"
   },
   "cafe": {
    "w": "café"
   },
   "chairs": {
    "w": "chairs"
   },
   "taxi": {
    "w": "taxi"
   },
   "rain": {
    "w": "rain"
   },
   "light": {
    "w": "a light"
   },
   "shop": {
    "w": "shop"
   },
   "crossing": {
    "w": "crossing"
   },
   "keeper": {
    "w": "shopkeeper"
   },
   "notice": {
    "w": "notice"
   },
   "cup": {
    "w": "tea"
   },
   "till": {
    "w": "till"
   }
  },
  "pages": [
   {
    "id": "s1",
    "signs": {
     "stop": "Bus stop",
     "timetable": "Last bus\n23:10"
    },
    "learn": [
     "Ana",
     "is",
     "at",
     "the",
     "<bus>",
     "<stop>.",
     "The",
     "<last>",
     "<bus>",
     "has",
     "gone."
    ],
    "read": [
     "It",
     "was",
     "Ana's",
     "first",
     "week",
     "in",
     "the",
     "city.",
     "She",
     "reached",
     "the",
     "stop",
     "just",
     "in",
     "time",
     "to",
     "see",
     "the",
     "[[tail-lights]]",
     "of",
     "the",
     "last",
     "bus",
     "[[vanish]]",
     "round",
     "the",
     "corner."
    ],
    "find": [
     {
      "w": "gone"
     },
     {
      "w": "stop"
     }
    ]
   },
   {
    "id": "s2",
    "learn": [
     "It",
     "is",
     "<night>.",
     "Her",
     "phone",
     "is",
     "dead."
    ],
    "read": [
     "She",
     "took",
     "out",
     "her",
     "phone",
     "to",
     "call",
     "a",
     "taxi.",
     "The",
     "screen",
     "stayed",
     "black:",
     "the",
     "battery",
     "was",
     "[[flat]]."
    ],
    "find": [
     {
      "w": "phone"
     },
     {
      "w": "dead"
     }
    ]
   },
   {
    "id": "s3",
    "signs": {
     "closed": "Closed"
    },
    "learn": [
     "The",
     "café",
     "is",
     "<closed>."
    ],
    "read": [
     "She",
     "walked",
     "along",
     "the",
     "high",
     "street.",
     "Every",
     "shop",
     "was",
     "dark.",
     "In",
     "the",
     "café,",
     "the",
     "chairs",
     "were",
     "[[stacked]]",
     "on",
     "the",
     "tables."
    ],
    "find": [
     {
      "w": "café"
     },
     {
      "w": "the"
     }
    ]
   },
   {
    "id": "s4",
    "signs": {
     "taxi": "Taxi"
    },
    "learn": [
     "There",
     "are",
     "no",
     "taxis",
     "at",
     "<night>."
    ],
    "read": [
     "At",
     "the",
     "taxi",
     "[[rank]]",
     "there",
     "was",
     "nobody",
     "at",
     "all,",
     "and",
     "it",
     "began",
     "to",
     "[[drizzle]]."
    ],
    "find": [
     {
      "w": "taxis"
     },
     {
      "w": "no"
     }
    ]
   },
   {
    "id": "s5",
    "signs": {
     "open": "Open 24 hours"
    },
    "learn": [
     "A",
     "shop",
     "is",
     "<open>!",
     "It",
     "is",
     "<open>",
     "all",
     "<night>."
    ],
    "read": [
     "Across",
     "the",
     "road,",
     "one",
     "shop",
     "window",
     "was",
     "still",
     "bright.",
     "Ana",
     "[[dashed]]",
     "over."
    ],
    "find": [
     {
      "w": "shop"
     },
     {
      "w": "all"
     }
    ]
   },
   {
    "id": "s6",
    "signs": {
     "notice": "Night bus N2\nevery 30 min"
    },
    "learn": [
     "The",
     "man",
     "says,",
     "“Take",
     "the",
     "<night>",
     "<bus>.”"
    ],
    "read": [
     "Inside",
     "it",
     "was",
     "warm.",
     "A",
     "cable",
     "for",
     "her",
     "phone,",
     "a",
     "cup",
     "of",
     "tea,",
     "and",
     "a",
     "notice",
     "[[taped]]",
     "by",
     "the",
     "[[till]].",
     "“Get",
     "off",
     "at",
     "the",
     "old",
     "[[gasworks]],”",
     "someone",
     "said."
    ],
    "find": [
     {
      "w": "man"
     },
     {
      "w": "take"
     }
    ]
   },
   {
    "id": "s7",
    "signs": {
     "dest": "N2  Park Road"
    },
    "learn": [
     "Ana",
     "gets",
     "on",
     "the",
     "<bus>.",
     "“Thank",
     "you!”"
    ],
    "read": [
     "Twenty",
     "minutes",
     "later",
     "the",
     "N2",
     "pulled",
     "up.",
     "“I'll",
     "call",
     "out",
     "when",
     "we",
     "reach",
     "the",
     "[[roundabout]],”",
     "said",
     "the",
     "driver."
    ],
    "find": [
     {
      "w": "gets"
     },
     {
      "w": "thank"
     }
    ]
   }
  ],
  "targets": [
   {
    "id": "bus",
    "w": "bus",
    "say": "bus",
    "audioOnly": true,
    "options": [
     {
      "say": "bus",
      "ok": true
     },
     {
      "say": "boss",
      "type": "vowel"
     },
     {
      "say": "bush",
      "type": "vowel"
     }
    ],
    "hint": {
     "show": "b · u · s",
     "note": "u 夹在两个辅音中间，读短音，和 cup、sun 一样。",
     "noteEn": "u between two consonants is short, as in cup and sun."
    },
    "rule": "短元音：两个辅音夹一个元音，这个元音读短音——bus、cup、stop、last。",
    "ruleEn": "Short vowel: one vowel between consonants is short: bus, cup, stop, last.",
    "l1": "拼音的 u 读“乌”；英语 bus 里的 u 不是这个音，是一个短促的“呃／阿”。",
    "l1En": "In many languages u is always \"oo\"; in bus it is a short \"uh\"."
   },
   {
    "id": "stop",
    "w": "stop",
    "say": "stop",
    "audioOnly": true,
    "options": [
     {
      "say": "stop",
      "ok": true
     },
     {
      "say": "step",
      "type": "vowel"
     },
     {
      "say": "top",
      "type": "blend"
     }
    ],
    "hint": {
     "show": "st · o · p",
     "note": "s 和 t 连着读，中间不加元音。",
     "noteEn": "s and t run together, with no vowel between."
    },
    "rule": "辅音连缀：st、cl、tr 这样的两个辅音连着读，中间不加元音——stop、last、closed。",
    "ruleEn": "Consonant clusters: st, cl, tr are said together with no vowel between: stop, last, closed.",
    "l1": "汉语音节不以两个辅音开头，容易读成“斯-塔普”；s 和 t 之间不要加音。",
    "l1En": "If your language does not start syllables with two consonants, you may add a vowel (\"es-top\", \"si-top\"); leave it out."
   },
   {
    "id": "last",
    "w": "last",
    "say": "last",
    "audioOnly": true,
    "options": [
     {
      "say": "last",
      "ok": true
     },
     {
      "say": "lost",
      "type": "vowel"
     },
     {
      "say": "late",
      "type": "look-alike"
     }
    ],
    "hint": {
     "show": "l · a · st",
     "note": "最后的 t 要读出来，很轻。",
     "noteEn": "Say the t at the end, lightly."
    },
    "rule": "词尾的辅音连缀也要读全：last、past、first——t 轻，但不省。",
    "ruleEn": "Clusters at the end are said in full too: last, past, first; the t is light but there.",
    "l1": "汉语音节大多以元音或 n、ng 结尾，词尾的 st 容易丢掉 t。",
    "l1En": "Languages whose syllables end in vowels tend to drop the final t; keep it."
   },
   {
    "id": "closed",
    "w": "closed",
    "say": "closed",
    "audioOnly": true,
    "options": [
     {
      "say": "closed",
      "ok": true
     },
     {
      "say": "cold",
      "type": "blend"
     },
     {
      "say": "clock",
      "type": "look-alike"
     }
    ],
    "hint": {
     "show": "cl · o_e · d",
     "note": "close 结尾的 e 不读，但让 o 读字母本身的音；加上 -d。",
     "noteEn": "The e at the end of close is silent but makes o say its name; then add -d."
    },
    "rule": "不发音的 e：o_e 读“欧”——close、home、phone；词尾 -ed 读 /d/、/t/ 或 /ɪd/。",
    "ruleEn": "Silent e: o_e says \"oh\": close, home, phone. -ed at the end is /d/, /t/ or /ɪd/.",
    "l1": "拼音每个字母都读；英语词尾的 e 常常不读，只改变前面元音的读法。",
    "l1En": "English has letters you do not say: the final e of close and phone changes the o and is silent."
   },
   {
    "id": "open",
    "w": "open",
    "say": "open",
    "audioOnly": true,
    "options": [
     {
      "say": "open",
      "ok": true
     },
     {
      "say": "oven",
      "type": "look-alike"
     },
     {
      "say": "pen",
      "type": "blend"
     }
    ],
    "hint": {
     "show": "o · pen",
     "note": "分成两拍：o 在音节末尾，读字母 O 本身的音。",
     "noteEn": "Two beats: o ends the first syllable, so it says its name."
    },
    "rule": "元音在音节末尾时读字母本身的音：o-pen、ba-con、ti-ger。",
    "ruleEn": "A vowel at the end of a syllable says its name: o-pen, ba-con, ti-ger.",
    "l1": "open 的 o 像“欧”，不是拼音 o 的“喔”。",
    "l1En": "The o in open is \"oh\", not a short o."
   },
   {
    "id": "night",
    "w": "night",
    "say": "night",
    "audioOnly": true,
    "options": [
     {
      "say": "night",
      "ok": true
     },
     {
      "say": "nut",
      "type": "vowel"
     },
     {
      "say": "light",
      "type": "look-alike"
     }
    ],
    "hint": {
     "show": "n · igh · t",
     "note": "igh 三个字母读一个音“爱”，gh 不读。",
     "noteEn": "igh is three letters for one sound, \"eye\"; the gh is silent."
    },
    "rule": "igh 读“爱”，gh 不读：night、light、high、right。",
    "ruleEn": "igh says \"eye\" and gh is silent: night, light, high, right.",
    "l1": "一个音用三个字母写，拼音里没有这样的写法：把 igh 当成一个整体记。",
    "l1En": "One sound written with three letters: learn igh as one unit."
   }
  ],
  "reverse": [
   {
    "target": "night",
    "tokens": [
     "<Night>",
     "bus",
     "every",
     "30",
     "minutes"
    ]
   },
   {
    "target": "closed",
    "tokens": [
     "Road",
     "<closed>"
    ]
   },
   {
    "target": "stop",
    "tokens": [
     "Next",
     "<stop>:",
     "Park",
     "Road"
    ]
   },
   {
    "target": "last",
    "tokens": [
     "<Last>",
     "train",
     "00:20"
    ]
   },
   {
    "target": "open",
    "tokens": [
     "<Open>",
     "7",
     "days"
    ]
   },
   {
    "target": "bus",
    "tokens": [
     "No",
     "<bus>",
     "on",
     "Sundays"
    ]
   }
  ],
  "words": [
   {
    "id": "taillights",
    "w": "tail-lights",
    "page": "s1",
    "clue": [
     "picture",
     "context"
    ],
    "gloss": "尾灯：车尾的红灯",
    "glossEn": "the red lights at the back of a vehicle",
    "why": "“the … of the last bus”，画上车尾有两盏红灯；tail（尾巴）+ lights（灯）。",
    "whyEn": "\"the … of the last bus\", and the picture shows two red lights on the back of the bus; tail + lights."
   },
   {
    "id": "vanish",
    "w": "vanish",
    "page": "s1",
    "clue": [
     "context",
     "picture"
    ],
    "gloss": "消失，不见了",
    "glossEn": "to disappear",
    "why": "“just in time to see … round the corner”：车拐过弯去，看不见了；画上车正开出画面。",
    "whyEn": "\"just in time to see … round the corner\": the bus goes round the corner out of sight; the picture shows it leaving the frame."
   },
   {
    "id": "flat",
    "w": "flat",
    "page": "s2",
    "clue": [
     "context",
     "picture"
    ],
    "gloss": "（电池）没电了；不是“平的”",
    "glossEn": "here: (of a battery) empty, not \"level\"",
    "why": "认识的词，这里讲不通“平”：屏幕一直是黑的、the battery was …；画上是空电池的标志。",
    "whyEn": "A word you know that does not mean \"level\" here: the screen stayed black, the battery was …; the picture shows an empty-battery symbol."
   },
   {
    "id": "stacked",
    "w": "stacked",
    "page": "s3",
    "clue": [
     "picture"
    ],
    "gloss": "（一个个）摞起来放着",
    "glossEn": "put one on top of another",
    "why": "“the chairs were … on the tables”，画上椅子倒放在桌子上。",
    "whyEn": "\"the chairs were … on the tables\", and the picture shows them upside down on the tables."
   },
   {
    "id": "rank",
    "w": "rank",
    "page": "s4",
    "clue": [
     "context",
     "picture"
    ],
    "gloss": "（出租车）停靠排队的地方",
    "glossEn": "a place where taxis wait in a line",
    "why": "“At the taxi …”是一个地方；画上是黄线围出的停车位和一块出租车的牌子。",
    "whyEn": "\"At the taxi …\" is a place; the picture shows a marked bay and a taxi sign."
   },
   {
    "id": "drizzle",
    "w": "drizzle",
    "page": "s4",
    "clue": [
     "picture",
     "context"
    ],
    "gloss": "下毛毛雨",
    "glossEn": "to rain lightly",
    "why": "“it began to …”说的是天气；画上开始飘细雨。",
    "whyEn": "\"it began to …\" is weather, and the picture shows a light rain starting."
   },
   {
    "id": "dashed",
    "w": "dashed",
    "page": "s5",
    "clue": [
     "context"
    ],
    "gloss": "飞快地跑（过去）",
    "glossEn": "ran quickly",
    "why": "又冷又下雨，对面终于有亮着的店：“Ana … over”只能是很快地过去。",
    "whyEn": "Cold, raining, and at last a lit shop across the road: \"Ana … over\" can only mean she went over quickly."
   },
   {
    "id": "taped",
    "w": "taped",
    "page": "s6",
    "clue": [
     "picture"
    ],
    "gloss": "用胶带贴着",
    "glossEn": "stuck up with tape",
    "why": "“a notice … by the till”，画上告示的两个角贴着胶带。",
    "whyEn": "\"a notice … by the till\", and the picture shows tape on its corners."
   },
   {
    "id": "till",
    "w": "till",
    "page": "s6",
    "clue": [
     "picture"
    ],
    "gloss": "收银机（英式）；这里不是“直到”",
    "glossEn": "a cash register (British); not \"until\" here",
    "why": "认识的 till（直到）这里讲不通：by the …是一个东西；画上柜台一头是收银机。",
    "whyEn": "till meaning \"until\" does not fit: \"by the …\" is a thing; the picture shows the cash register at the end of the counter."
   },
   {
    "id": "gasworks",
    "w": "gasworks",
    "page": "s6",
    "clue": [
     "none"
    ],
    "gloss": "煤气厂（旧时生产煤气的工厂，常用作地名标志）",
    "glossEn": "a gasworks: a works where gas used to be made, often used as a landmark",
    "why": "“Get off at the old …”只告诉你这是路上一个能下车的地方；gas + works 拆开也只给个大概，画上没有。到底是什么，这一页看不出来，要查。",
    "whyEn": "\"Get off at the old …\" only tells you it is a place to get off; gas + works gives only a rough idea, and it is not in the picture. What it is, this page cannot tell you: look it up."
   },
   {
    "id": "roundabout",
    "w": "roundabout",
    "page": "s7",
    "clue": [
     "none"
    ],
    "gloss": "环岛：几条路交汇、车绕着中间转的路口",
    "glossEn": "a road junction where traffic goes round a central island",
    "why": "“when we reach the …”只告诉你是路上的一个地方；round + about 拆开反而会带偏，画上也没有。这一页看不出来，要查。",
    "whyEn": "\"when we reach the …\" only tells you it is a place on the way; round + about can mislead you, and it is not in the picture. This page cannot tell you: look it up."
   }
  ],
  "review": [
   "成人学认字（英语）：这一套假定学习者已经能读另一种文字；目标词按招牌上的高频词和拼写规律选（短元音、辅音连缀、不发音的 e、igh），没有逐个拼读；这样的选择是否合适，请老师确认。",
   "gasworks、roundabout 作为“看不出来、要查”的词，taxi rank、till（收银机）、flat（没电）都是英式用法；请确认对目标读者自然。",
   "“规律”和“和母语比”这两栏是按说中文的学习者写的（界面是英文时按一般情况写），请确认说法准确，特别是 bus 的 u、last 的 a 在英美发音不同。",
   "合成语音：bus／boss／bush、closed／cold／clock、night／nut／light 是否听得清。"
  ],
  "reviewEn": [
   "Adult learning to read (English): this set assumes the learner already reads another script; targets were chosen as frequent sign words and spelling patterns (short vowel, clusters, silent e, igh), without letter-by-letter blending. Please confirm this choice suits the learners.",
   "gasworks and roundabout as \"look it up\" words; taxi rank, till (cash register) and flat (battery) are British usages. Please confirm they read naturally for the intended readers.",
   "The \"pattern\" and \"compared with your first language\" lines are written for Chinese-speaking learners (in the English interface, for learners in general); please check them, especially the u in bus and the a in last, which differ between British and American speech.",
   "Speech synthesis: are bus / boss / bush, closed / cold / clock and night / nut / light clearly different?"
  ]
 }
};

KT_DATA["picture-book-zh"] = {
 "id": "picture-book-zh",
 "scene": "paper-boat",
 "lang": "zh",
 "speech": "zh-CN",
 "title": "绘本阅读：汉语",
 "titleEn": "Picture-book reading: Chinese",
 "subtitle": "一本原创绘本，两种读法：学认字和借读书学语言。注音是拼音。",
 "subtitleEn": "One original picture book, two ways to read it: learning to read, and reading to learn. The reading aid is pinyin.",
 "bookTitle": "蓝色的纸船",
 "names": {
  "boy": "冬冬",
  "boyEn": "Dongdong"
 },
 "aid": "pinyin",
 "aidLabel": "拼音",
 "aidLabelEn": "pinyin",
 "spots": {
  "boy": {
   "w": "冬冬"
  },
  "boat": {
   "w": "小船"
  },
  "window": {
   "w": "窗户"
  },
  "gate": {
   "w": "门"
  },
  "grandpa": {
   "w": "爷爷"
  },
  "water": {
   "w": "小河"
  },
  "bridge": {
   "w": "桥"
  },
  "frog": {
   "w": "青蛙"
  },
  "stone": {
   "w": "石头"
  },
  "duck": {
   "w": "鸭子"
  },
  "reeds": {
   "w": "芦苇"
  },
  "branch": {
   "w": "树枝"
  },
  "pond": {
   "w": "池塘"
  }
 },
 "pages": [
  {
   "id": "p1",
   "learn": [
    "{冬冬|Dōngdong}",
    "{做|zuò}",
    "{了|le}",
    "{一|yì}",
    "{只|zhī}",
    "{小|xiǎo}",
    "<{船|chuán}>。"
   ],
   "read": [
    "雨",
    "终于",
    "停",
    "了。",
    "冬冬",
    "把",
    "一张",
    "蓝纸",
    "折成",
    "一只",
    "小船，",
    "又",
    "用",
    "手指",
    "把",
    "每一道",
    "[[{折痕|zhéhén}]]",
    "都",
    "压",
    "平。"
   ],
   "find": [
    {
     "w": "冬冬"
    },
    {
     "w": "船"
    }
   ]
  },
  {
   "id": "p2",
   "learn": [
    "{冬冬|Dōngdong}",
    "{把|bǎ}",
    "{小|xiǎo}",
    "<{船|chuán}>",
    "{放|fàng}",
    "{进|jìn}",
    "<{水|shuǐ}>",
    "{里|li}。"
   ],
   "read": [
    "冬冬",
    "来到",
    "[[{小溪|xiǎoxī}]]",
    "边，",
    "把",
    "小船",
    "轻轻",
    "放",
    "在",
    "水面",
    "上。",
    "爷爷",
    "在",
    "院门口",
    "喊：",
    "“小心",
    "[[{水闸|shuǐzhá}]]！”"
   ],
   "find": [
    {
     "w": "水"
    },
    {
     "w": "放"
    }
   ]
  },
  {
   "id": "p3",
   "learn": [
    "{小|xiǎo}",
    "<{船|chuán}>",
    "{漂|piāo}",
    "{呀|ya}",
    "{漂|piāo}，",
    "{漂|piāo}",
    "{到|dào}",
    "<{桥|qiáo}>",
    "<{下|xià}>。"
   ],
   "read": [
    "溪水",
    "推",
    "着",
    "小船，",
    "从",
    "旧",
    "石桥",
    "底下",
    "[[{钻|zuān}]]",
    "了",
    "过去。"
   ],
   "find": [
    {
     "w": "桥"
    },
    {
     "w": "漂"
    }
   ]
  },
  {
   "id": "p4",
   "learn": [
    "{小|xiǎo}",
    "<{船|chuán}>",
    "{漂|piāo}",
    "{呀|ya}",
    "{漂|piāo}，",
    "{漂|piāo}",
    "{到|dào}",
    "{青蛙|qīngwā}",
    "{身边|shēnbiān}。"
   ],
   "read": [
    "小船",
    "漂过",
    "一块",
    "扁扁",
    "的",
    "石头。",
    "石头",
    "上",
    "[[{蹲|dūn}]]",
    "着",
    "一只",
    "青蛙，",
    "连",
    "眼睛",
    "都",
    "没",
    "[[{眨|zhǎ}]]",
    "一下。"
   ],
   "find": [
    {
     "w": "青蛙"
    },
    {
     "w": "身边"
    }
   ]
  },
  {
   "id": "p5",
   "learn": [
    "{小|xiǎo}",
    "<{船|chuán}>",
    "{漂|piāo}",
    "{呀|ya}",
    "{漂|piāo}，",
    "{漂|piāo}",
    "{到|dào}",
    "<{鸭子|yāzi}>",
    "{身边|shēnbiān}。"
   ],
   "read": [
    "[[{芦苇|lúwěi}]]",
    "旁边，",
    "一只",
    "鸭子",
    "正",
    "把",
    "头",
    "扎进",
    "水里",
    "找",
    "吃的，",
    "尾巴",
    "[[{翘|qiào}]]",
    "得",
    "高高",
    "的。"
   ],
   "find": [
    {
     "w": "鸭子"
    },
    {
     "w": "小"
    }
   ]
  },
  {
   "id": "p6",
   "learn": [
    "{哎呀|āiyā}，",
    "{小|xiǎo}",
    "<{船|chuán}>",
    "<{停|tíng}>",
    "{了|le}，",
    "{不|bú}",
    "{动|dòng}",
    "{了|le}。"
   ],
   "read": [
    "忽然，",
    "小船",
    "撞",
    "上",
    "了",
    "一根",
    "横",
    "在",
    "水里",
    "的",
    "树枝，",
    "[[{卡住|qiǎzhù}]]",
    "了。",
    "“哎呀！”"
   ],
   "find": [
    {
     "w": "停"
    },
    {
     "w": "动"
    }
   ]
  },
  {
   "id": "p7",
   "learn": [
    "<{鸭子|yāzi}>",
    "{推一推|tuī yi tuī}，",
    "{小|xiǎo}",
    "<{船|chuán}>",
    "{又|yòu}",
    "{漂|piāo}",
    "{走|zǒu}",
    "{了|le}。"
   ],
   "read": [
    "不知",
    "是",
    "谁",
    "从",
    "后面",
    "轻轻",
    "[[{顶|dǐng}]]",
    "了",
    "它",
    "一下，",
    "小船",
    "又",
    "漂",
    "走",
    "了。"
   ],
   "find": [
    {
     "w": "推一推"
    },
    {
     "w": "又"
    }
   ]
  },
  {
   "id": "p8",
   "learn": [
    "{冬冬|Dōngdong}",
    "{拿|ná}",
    "{到|dào}",
    "{了|le}",
    "{小|xiǎo}",
    "<{船|chuán}>。",
    "“{谢谢|xièxie}",
    "{你|nǐ}，",
    "<{鸭子|yāzi}>！”"
   ],
   "read": [
    "冬冬",
    "在",
    "池塘",
    "边",
    "把",
    "湿透",
    "的",
    "小船",
    "[[{捞|lāo}]]",
    "了",
    "上来。",
    "“谢谢",
    "你！”",
    "他",
    "对",
    "鸭子",
    "说。",
    "爷爷",
    "在",
    "小路",
    "上",
    "喊：",
    "“快",
    "来",
    "吃",
    "[[{糍粑|cíbā}]]！”"
   ],
   "find": [
    {
     "w": "谢谢"
    },
    {
     "w": "拿"
    }
   ]
  }
 ],
 "targets": [
  {
   "id": "chuan",
   "w": "船",
   "r": "chuán",
   "say": "船",
   "options": [
    {
     "t": "chuán",
     "say": "船",
     "ok": true
    },
    {
     "t": "yán",
     "say": "沿",
     "type": "same-part"
    },
    {
     "t": "chuǎn",
     "say": "喘",
     "type": "tone"
    }
   ],
   "hint": {
    "show": "舟 ＋ 右边",
    "note": "左边的“舟”就是船的意思。右边那一部分在“沿”“铅”里也有，但这里不按它读。",
    "noteEn": "The left part 舟 means boat. The right part also appears in 沿 and 铅, but it does not give the sound here."
   }
  },
  {
   "id": "shui",
   "w": "水",
   "r": "shuǐ",
   "say": "水",
   "options": [
    {
     "t": "shuǐ",
     "say": "水",
     "ok": true
    },
    {
     "t": "yǒng",
     "say": "永",
     "type": "look-alike"
    },
    {
     "t": "shuì",
     "say": "睡",
     "type": "tone"
    }
   ],
   "hint": {
    "show": "水 ≈ 流动的水",
    "note": "这个字像一道流动的水。想想“喝水”。",
    "noteEn": "The character looks like flowing water. Think of 喝水, to drink water."
   }
  },
  {
   "id": "qiao",
   "w": "桥",
   "r": "qiáo",
   "say": "桥",
   "options": [
    {
     "t": "qiáo",
     "say": "桥",
     "ok": true
    },
    {
     "t": "jiāo",
     "say": "娇",
     "type": "same-part"
    },
    {
     "t": "qiǎo",
     "say": "巧",
     "type": "tone"
    }
   ],
   "hint": {
    "show": "木 ＋ 乔",
    "note": "左边“木”：从前的桥是木头搭的。右边“乔”读 qiáo，就是读音。",
    "noteEn": "Left, 木 wood: bridges used to be made of wood. Right, 乔 is read qiáo, which gives the sound."
   }
  },
  {
   "id": "xia",
   "w": "下",
   "r": "xià",
   "say": "下",
   "options": [
    {
     "t": "xià",
     "say": "下",
     "ok": true
    },
    {
     "t": "shàng",
     "say": "上",
     "type": "look-alike"
    },
    {
     "t": "bù",
     "say": "不",
     "type": "look-alike"
    }
   ],
   "hint": {
    "show": "一 ＋ 卜",
    "note": "上面一横，下面挂着一竖：在下面。和“上”正好倒过来。",
    "noteEn": "A line on top with a stroke hanging below it: underneath. It is 上 (above) turned upside down."
   }
  },
  {
   "id": "ya",
   "w": "鸭子",
   "r": "yāzi",
   "say": "鸭子",
   "options": [
    {
     "t": "yāzi",
     "say": "鸭子",
     "ok": true
    },
    {
     "t": "jiǎzi",
     "say": "甲子",
     "type": "same-part"
    },
    {
     "t": "gēzi",
     "say": "鸽子",
     "type": "meaning"
    }
   ],
   "hint": {
    "show": "甲 ＋ 鸟 → 鸭",
    "note": "右边是“鸟”：和鸟有关。左边“甲”提示韵母，但声母不一样。",
    "noteEn": "Right, 鸟 bird: it is a bird. Left, 甲 hints at the vowel, but the first sound is different."
   }
  },
  {
   "id": "ting",
   "w": "停",
   "r": "tíng",
   "say": "停",
   "options": [
    {
     "t": "tíng",
     "say": "停",
     "ok": true
    },
    {
     "t": "tīng",
     "say": "听",
     "type": "tone"
    },
    {
     "t": "liàng",
     "say": "亮",
     "type": "look-alike"
    }
   ],
   "hint": {
    "show": "亻 ＋ 亭",
    "note": "左边“亻”是人，右边“亭”读 tíng，就是读音。",
    "noteEn": "Left, 亻 person; right, 亭 is read tíng, which gives the sound."
   }
  }
 ],
 "reverse": [
  {
   "target": "chuan",
   "tokens": [
    "{河|hé}",
    "{上|shang}",
    "{有|yǒu}",
    "{一|yì}",
    "{条|tiáo}",
    "<{船|chuán}>。"
   ]
  },
  {
   "target": "shui",
   "tokens": [
    "{我|wǒ}",
    "{想|xiǎng}",
    "{喝|hē}",
    "<{水|shuǐ}>。"
   ]
  },
  {
   "target": "qiao",
   "tokens": [
    "{这|zhè}",
    "{座|zuò}",
    "<{桥|qiáo}>",
    "{很|hěn}",
    "{长|cháng}。"
   ]
  },
  {
   "target": "xia",
   "tokens": [
    "{小猫|xiǎomāo}",
    "{在|zài}",
    "{桌子|zhuōzi}",
    "<{下|xià}>",
    "{面|mian}。"
   ]
  },
  {
   "target": "ya",
   "tokens": [
    "{河里|hé li}",
    "{有|yǒu}",
    "{三|sān}",
    "{只|zhī}",
    "<{鸭子|yāzi}>。"
   ]
  },
  {
   "target": "ting",
   "tokens": [
    "{车|chē}",
    "<{停|tíng}>",
    "{在|zài}",
    "{门口|ménkǒu}。"
   ]
  }
 ],
 "words": [
  {
   "id": "zhehen",
   "w": "折痕",
   "r": "zhéhén",
   "page": "p1",
   "clue": [
    "parts",
    "context"
   ],
   "gloss": "纸折过以后留下的印子",
   "glossEn": "the line left where paper has been folded",
   "why": "“折”就是折纸的折，“痕”是留下的印子；前面又说“折成一只小船”。",
   "whyEn": "折 is \"fold\", as in folding paper, and 痕 is a mark left behind; the sentence before says he folded a boat."
  },
  {
   "id": "xiaoxi",
   "w": "小溪",
   "r": "xiǎoxī",
   "page": "p2",
   "clue": [
    "picture",
    "parts"
   ],
   "gloss": "很小的河",
   "glossEn": "a very small river; a stream",
   "why": "“溪”有三点水，和水有关；画上冬冬蹲在一条窄窄的小河边。",
   "whyEn": "溪 has the water radical 氵; the picture shows him by a narrow stream."
  },
  {
   "id": "shuizha",
   "w": "水闸",
   "r": "shuǐzhá",
   "page": "p2",
   "clue": [
    "none"
   ],
   "gloss": "建在河上、能开能关、控制水流的闸门",
   "glossEn": "a gate built across a river that can be opened and shut to control the water",
   "why": "“水”只告诉你和水有关，“小心”只告诉你要当心它，画上也没有。它到底是什么，这一页看不出来，要查。",
   "whyEn": "水 only tells you it has to do with water, and 小心 only that it is something to be careful of; it is not in the picture. What it is, this page cannot tell you: look it up."
  },
  {
   "id": "zuan",
   "w": "钻",
   "r": "zuān",
   "page": "p3",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "从窄小的地方穿过去",
   "glossEn": "to go through a narrow or low space",
   "why": "“从桥底下……了过去”，画上小船正从桥洞下面穿过。",
   "whyEn": "\"from under the bridge … through\", and the picture shows the boat going through under the arch."
  },
  {
   "id": "dun",
   "w": "蹲",
   "r": "dūn",
   "page": "p4",
   "clue": [
    "picture"
   ],
   "gloss": "两腿弯着，身体放低，像坐又没坐下",
   "glossEn": "to crouch, sitting low on bent legs",
   "why": "“石头上……着一只青蛙”，画上青蛙弯着腿伏在石头上。",
   "whyEn": "\"on the stone … a frog\", and the picture shows the frog low on its bent legs."
  },
  {
   "id": "zha",
   "w": "眨",
   "r": "zhǎ",
   "page": "p4",
   "clue": [
    "parts",
    "context"
   ],
   "gloss": "眼睛很快地闭一下又睁开",
   "glossEn": "to blink",
   "why": "“目”字旁和眼睛有关，前面又是“眼睛都没……一下”。",
   "whyEn": "The radical 目 is the eye, and the words before are \"did not even … its eyes once\"."
  },
  {
   "id": "luwei",
   "w": "芦苇",
   "r": "lúwěi",
   "page": "p5",
   "clue": [
    "picture"
   ],
   "gloss": "水边长的高高的草",
   "glossEn": "reeds: tall plants by the water",
   "why": "“……旁边，一只鸭子”，画上鸭子旁边是一丛高草；两个字都是草字头。",
   "whyEn": "\"next to the …, a duck\": in the picture that is a clump of tall plants; both characters have the grass radical."
  },
  {
   "id": "qiao4",
   "w": "翘",
   "r": "qiào",
   "page": "p5",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "一头向上抬起来",
   "glossEn": "to stick up at one end",
   "why": "头扎进水里，尾巴“……得高高的”；画上尾巴朝上。",
   "whyEn": "Head in the water, tail \"… up high\"; the picture shows the tail pointing up."
  },
  {
   "id": "qiazhu",
   "w": "卡住",
   "r": "qiǎzhù",
   "page": "p6",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "被夹住或挡住，动不了（这里“卡”读 qiǎ）",
   "glossEn": "caught so that it cannot move (卡 is read qiǎ here)",
   "why": "撞上树枝，然后“哎呀！”；画上小船歪在树枝边不动。",
   "whyEn": "It hit a branch, then \"哎呀!\"; the picture shows the boat caught against the branch."
  },
  {
   "id": "ding",
   "w": "顶",
   "r": "dǐng",
   "page": "p7",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "用头往前推",
   "glossEn": "to push with the head",
   "why": "“从后面轻轻……了它一下”，小船就又漂走了；画上鸭子在后面用嘴推着它。",
   "whyEn": "\"gently … it from behind\", and the boat floats off; the picture shows the duck pushing it with its beak."
  },
  {
   "id": "lao",
   "w": "捞",
   "r": "lāo",
   "page": "p8",
   "clue": [
    "picture",
    "parts"
   ],
   "gloss": "从水里拿上来",
   "glossEn": "to take something out of water",
   "why": "提手旁和手的动作有关，“……了上来”；画上冬冬手里拿着湿船。",
   "whyEn": "The hand radical 扌 means an action with the hand, \"… up\"; the picture shows him holding the wet boat."
  },
  {
   "id": "ciba",
   "w": "糍粑",
   "r": "cíbā",
   "page": "p8",
   "clue": [
    "none"
   ],
   "gloss": "糯米蒸熟后捣成的一种黏黏的食物",
   "glossEn": "a sticky food made of steamed, pounded glutinous rice",
   "why": "“快来吃……”和米字旁只告诉你是用米做的吃的；到底是什么样的东西，这一页看不出来，要查。",
   "whyEn": "\"Come and eat …\" and the rice radical 米 only tell you it is something to eat made with rice; what it is like, this page cannot tell you: look it up."
  }
 ],
 "review": [
  "拼音按“一、不”标实际变调（yì zhī、bú dòng、yí xià），三声变调不标（xiǎo chuán、bǎ xiǎo）——这是多数小学语文课本的写法，请确认。",
  "轻声：冬冬 Dōngdong、水里 shuǐ li、河上 hé shang、河里 hé li、下面 xià mian、推一推 tuī yi tuī、鸭子 yāzi、谢谢 xièxie、桌子 zhuōzi。",
  "哎呀 注 āiyā；“漂到青蛙身边”“漂到鸭子身边”对孩子是否自然（也可说“漂过青蛙旁边”）。",
  "纸船用“一只小船”（也常见“一条”）；鸭子用嘴推，写成“推一推”（学认字）和“顶了它一下”（借读书学语言），请确认“顶”可以用在鸭嘴上。",
  "选项干扰项：船—沿（同一右部件）、鸭子—甲子（“甲子”词典注 jiǎzǐ，这里按轻声 jiǎzi 只作读音干扰）、停—亮（字形相近）是否合适。",
  "“糍粑”“水闸”作为“这一页看不出来、要查”的词：米字旁、三点水只给出类别，请确认不会被老师认为是“可以猜”的词。",
  "“卡住”的“卡”读 qiǎ；“院门口”“扎进水里找吃的”是否自然。"
 ],
 "reviewEn": [
  "Pinyin marks the spoken tone changes of 一 and 不 (yì zhī, bú dòng, yí xià) but not third-tone sandhi (xiǎo chuán, bǎ xiǎo), as most primary-school textbooks do; please confirm.",
  "Neutral tones: 冬冬 Dōngdong, 水里 shuǐ li, 河上 hé shang, 河里 hé li, 下面 xià mian, 推一推 tuī yi tuī, 鸭子 yāzi, 谢谢 xièxie, 桌子 zhuōzi.",
  "哎呀 is given as āiyā; are 漂到青蛙身边 and 漂到鸭子身边 natural for children (漂过青蛙旁边 is an alternative)?",
  "The paper boat is 一只小船 (一条 is also common); the duck pushing with its beak is 推一推 (learning to read) and 顶了它一下 (reading to learn); please confirm 顶 works for a duck's beak.",
  "Distractors: 船 vs 沿 (same right-hand part), 鸭子 vs 甲子 (dictionaries give jiǎzǐ; jiǎzi is used here only as a sound trap), 停 vs 亮 (look alike): are these suitable?",
  "糍粑 and 水闸 as \"cannot tell from the page, look it up\" words: the radicals 米 and 氵 only give a category; please confirm a teacher would not count them as guessable.",
  "卡 in 卡住 is read qiǎ; are 院门口 and 扎进水里找吃的 natural?"
 ],
 "older": {
  "scene": "last-bus",
  "title": "图文故事阅读：汉语",
  "titleEn": "Illustrated story reading: Chinese",
  "subtitle": "给青少年和成人的一个原创图文故事，两种读法：学认字和借读书学语言。故事里有真实的街头文字。注音是拼音。",
  "subtitleEn": "An original illustrated story for teenagers and adults, read two ways: learning to read, and reading to learn. The pictures carry real street print. The reading aid is pinyin.",
  "bookTitle": "末班车之后",
  "names": {
   "name": "安娜",
   "nameEn": "Anna",
   "dest": "公园路",
   "destEn": "公园路 (Gongyuan Road)"
  },
  "learnNote": "这一套给已经能读另一种文字的学习者：从街上招牌、告示里的字开始；拼音先帮你读，再一个字一个字撤掉。",
  "learnNoteEn": "For learners who already read another script: start from the characters on street signs and notices; pinyin helps you read at first, then comes off character by character.",
  "cover": {
   "signs": {
    "stop": "公交站",
    "timetable": "末班车\n23:10"
   }
  },
  "spots": {
   "ana": {
    "w": "安娜"
   },
   "bus": {
    "w": "公交车"
   },
   "clock": {
    "w": "钟"
   },
   "lights": {
    "w": "尾灯"
   },
   "phone": {
    "w": "手机"
   },
   "cafe": {
    "w": "咖啡馆"
   },
   "chairs": {
    "w": "椅子"
   },
   "taxi": {
    "w": "出租车"
   },
   "rain": {
    "w": "雨"
   },
   "light": {
    "w": "灯光"
   },
   "shop": {
    "w": "小店"
   },
   "crossing": {
    "w": "斑马线"
   },
   "keeper": {
    "w": "店主"
   },
   "notice": {
    "w": "告示"
   },
   "cup": {
    "w": "茶"
   },
   "till": {
    "w": "收银机"
   }
  },
  "pages": [
   {
    "id": "s1",
    "signs": {
     "stop": "公交站",
     "timetable": "末班车\n23:10"
    },
    "learn": [
     "{安娜|Ānnà}",
     "{到|dào}",
     "{了|le}",
     "<{车|chē}>",
     "<{站|zhàn}>，",
     "{末班|mòbān}",
     "<{车|chē}>",
     "{已经|yǐjīng}",
     "<{开|kāi}>",
     "{走|zǒu}",
     "{了|le}。"
    ],
    "read": [
     "这是",
     "安娜",
     "来到",
     "这座",
     "城市",
     "的",
     "第一个",
     "星期。",
     "她",
     "跑到",
     "车站",
     "时，",
     "末班车",
     "的",
     "[[{尾灯|wěidēng}]]",
     "正",
     "在",
     "[[{拐角|guǎijiǎo}]]",
     "一闪，",
     "就",
     "不见",
     "了。"
    ],
    "find": [
     {
      "w": "安娜"
     },
     {
      "w": "站"
     }
    ]
   },
   {
    "id": "s2",
    "learn": [
     "<{夜|yè}>",
     "{深|shēn}",
     "{了|le}，",
     "{手机|shǒujī}",
     "{没|méi}",
     "{电|diàn}",
     "{了|le}。"
    ],
    "read": [
     "她",
     "掏出",
     "手机",
     "想",
     "叫车，",
     "屏幕",
     "却",
     "[[{漆黑|qīhēi}]]",
     "一片——",
     "没电",
     "了。"
    ],
    "find": [
     {
      "w": "手机"
     },
     {
      "w": "电"
     }
    ]
   },
   {
    "id": "s3",
    "signs": {
     "closed": "休息中"
    },
    "learn": [
     "{咖啡馆|kāfēiguǎn}",
     "<{关|guān}>",
     "{门|mén}",
     "{了|le}。"
    ],
    "read": [
     "她",
     "沿着",
     "大街",
     "走。",
     "店铺",
     "都",
     "[[{打烊|dǎyàng}]]",
     "了，",
     "咖啡馆",
     "里",
     "的",
     "椅子",
     "都",
     "[[{倒扣|dàokòu}]]",
     "在",
     "桌上。"
    ],
    "find": [
     {
      "w": "门"
     },
     {
      "w": "咖啡馆"
     }
    ]
   },
   {
    "id": "s4",
    "signs": {
     "taxi": "出租车"
    },
    "learn": [
     "{出租|chūzū}",
     "<{车|chē}>",
     "<{站|zhàn}>",
     "{没有|méiyǒu}",
     "<{车|chē}>。"
    ],
    "read": [
     "出租车",
     "[[{候车点|hòuchēdiǎn}]]",
     "一个",
     "人",
     "也",
     "没有，",
     "天上",
     "还",
     "飘起",
     "了",
     "[[{毛毛雨|máomaoyǔ}]]。"
    ],
    "find": [
     {
      "w": "出租"
     },
     {
      "w": "没有"
     }
    ]
   },
   {
    "id": "s5",
    "signs": {
     "open": "24小时营业"
    },
    "learn": [
     "{有|yǒu}",
     "{一|yì}",
     "{家|jiā}",
     "{店|diàn}",
     "{还|hái}",
     "<{开|kāi}>",
     "{着|zhe}！",
     "<{夜|yè}>",
     "{里|li}",
     "{也|yě}",
     "<{开|kāi}>。"
    ],
    "read": [
     "马路",
     "对面，",
     "还有",
     "一扇",
     "窗户",
     "亮着。",
     "安娜",
     "[[{一溜烟|yíliùyān}]]",
     "跑",
     "了",
     "过去。"
    ],
    "find": [
     {
      "w": "店"
     },
     {
      "w": "也"
     }
    ]
   },
   {
    "id": "s6",
    "signs": {
     "notice": "夜班车 N2\n每30分钟一班"
    },
    "learn": [
     "{店主|diànzhǔ}",
     "{说|shuō}：",
     "“{坐|zuò}",
     "<{夜|yè}>",
     "{班|bān}",
     "<{车|chē}>",
     "{吧|ba}。”"
    ],
    "read": [
     "店里",
     "很",
     "暖和。",
     "一根",
     "充电线，",
     "一杯",
     "热茶，",
     "一块",
     "[[{萨其马|sàqímǎ}]]。",
     "收银台",
     "旁边",
     "[[{贴|tiē}]]",
     "着",
     "告示：",
     "夜班车",
     "通宵",
     "运行。"
    ],
    "find": [
     {
      "w": "店主"
     },
     {
      "w": "坐"
     }
    ]
   },
   {
    "id": "s7",
    "signs": {
     "dest": "N2 公园路"
    },
    "learn": [
     "{安娜|Ānnà}",
     "{坐|zuò}",
     "{上|shàng}",
     "{了|le}",
     "{去|qù}",
     "{公园|gōngyuán}",
     "<{路|lù}>",
     "{的|de}",
     "<{车|chē}>。"
    ],
    "read": [
     "二十",
     "分钟",
     "后，",
     "N2",
     "来",
     "了。",
     "司机",
     "说：",
     "“到",
     "[[{环岛|huándǎo}]]",
     "我",
     "叫",
     "你。”"
    ],
    "find": [
     {
      "w": "公园"
     },
     {
      "w": "去"
     }
    ]
   }
  ],
  "targets": [
   {
    "id": "che",
    "w": "车",
    "r": "chē",
    "say": "车",
    "options": [
     {
      "t": "chē",
      "say": "车",
      "ok": true
     },
     {
      "t": "dōng",
      "say": "东",
      "type": "look-alike"
     },
     {
      "t": "chè",
      "say": "彻",
      "type": "tone"
     }
    ],
    "hint": {
     "show": "车 ≈ 从上往下看的一辆车",
     "note": "中间一竖是车轴，上下是车轮。",
     "noteEn": "The vertical stroke is the axle; the wheels sit above and below it."
    },
    "rule": "象形字：字形像东西本身（车、门、山、水）。形状能帮你记意思，读音要另外记。",
    "ruleEn": "Pictographs: the shape looks like the thing (车 car, 门 door, 山, 水). The shape helps with the meaning; the sound has to be learned.",
    "l1": "字母文字看拼写就能读出来；汉字的形状大多不直接告诉你读音，所以先靠拼音，再一个字一个字撤。",
    "l1En": "In an alphabet the spelling tells you the sound; a character's shape mostly does not, so pinyin carries you at first and then comes off one character at a time."
   },
   {
    "id": "zhan",
    "w": "站",
    "r": "zhàn",
    "say": "站",
    "options": [
     {
      "t": "zhàn",
      "say": "站",
      "ok": true
     },
     {
      "t": "diàn",
      "say": "店",
      "type": "same-part"
     },
     {
      "t": "zhān",
      "say": "沾",
      "type": "tone"
     }
    ],
    "hint": {
     "show": "立 ＋ 占",
     "note": "左边“立”是站着；右边“占”读 zhàn，提示读音。",
     "noteEn": "Left, 立 standing; right, 占 is read zhàn and gives the sound."
    },
    "rule": "形声字：一边表意思，一边提示读音（站＝立＋占）。大多数汉字是这样，但提示常常只是相近：店 diàn 里也有“占”。",
    "ruleEn": "Sound-meaning characters: one part gives the meaning, the other hints at the sound (站 = 立 + 占). Most characters work like this, but the hint is often only close: 店 diàn also contains 占.",
    "l1": "像英语的词根：能帮你猜，但不保证。",
    "l1En": "Like a word root in English: it helps you guess, but it is no guarantee."
   },
   {
    "id": "ye",
    "w": "夜",
    "r": "yè",
    "say": "夜",
    "options": [
     {
      "t": "yè",
      "say": "夜",
      "ok": true
     },
     {
      "t": "yé",
      "say": "爷",
      "type": "tone"
     },
     {
      "t": "wǎn",
      "say": "晚",
      "type": "meaning"
     }
    ],
    "hint": {
     "show": "亠 ＋ 亻 ＋ 夕",
     "note": "里面有“夕”（傍晚），和夜里有关。",
     "noteEn": "It contains 夕, evening: it has to do with night."
    },
    "rule": "一个意思常有几个字（夜、晚）：靠图或意思猜，容易选成另一个字，要看字形。",
    "ruleEn": "One meaning often has several characters (夜, 晚): guessing from the picture or the meaning easily picks the other one, so look at the shape.",
    "l1": "英语 night／evening 也是两个词，但拼写不同一眼就分得开；汉字要看部件。",
    "l1En": "English night and evening are told apart by spelling at a glance; with characters you look at the parts."
   },
   {
    "id": "kai",
    "w": "开",
    "r": "kāi",
    "say": "开",
    "options": [
     {
      "t": "kāi",
      "say": "开",
      "ok": true
     },
     {
      "t": "jǐng",
      "say": "井",
      "type": "look-alike"
     },
     {
      "t": "kǎi",
      "say": "凯",
      "type": "tone"
     }
    ],
    "hint": {
     "show": "一 ＋ 廾",
     "note": "上面一横像门闩，下面两只手把它拿开。",
     "noteEn": "The top stroke is like a door bar; the two hands below lift it off."
    },
    "rule": "告示上最常见的一对：开／关。门上写“开”能进，写“关”不能。",
    "ruleEn": "The commonest pair on signs: 开 open / 关 closed.",
    "l1": "和英语 Open／Closed 一样是招牌词，先认整个字，不必拆。",
    "l1En": "Like Open / Closed in English, these are sign words: recognise them whole."
   },
   {
    "id": "guan",
    "w": "关",
    "r": "guān",
    "say": "关",
    "options": [
     {
      "t": "guān",
      "say": "关",
      "ok": true
     },
     {
      "t": "tiān",
      "say": "天",
      "type": "look-alike"
     },
     {
      "t": "guàn",
      "say": "惯",
      "type": "tone"
     }
    ],
    "hint": {
     "show": "丷 ＋ 天",
     "note": "和“天”只差上面两点。",
     "noteEn": "It differs from 天 only by the two dots on top."
    },
    "rule": "长得像的字只差一两笔（关／天、开／井）：读之前先看清上面那一部分。",
    "ruleEn": "Look-alike characters differ by a stroke or two (关 / 天, 开 / 井): check the top part before you read.",
    "l1": "像英语 b／d、p／q：差别小，但意思完全不同。",
    "l1En": "Like b / d or p / q: a small difference, a completely different word."
   },
   {
    "id": "lu",
    "w": "路",
    "r": "lù",
    "say": "路",
    "options": [
     {
      "t": "lù",
      "say": "路",
      "ok": true
     },
     {
      "t": "gè",
      "say": "各",
      "type": "same-part"
     },
     {
      "t": "lǔ",
      "say": "鲁",
      "type": "tone"
     }
    ],
    "hint": {
     "show": "⻊ ＋ 各",
     "note": "左边是脚（⻊），走的地方；右边“各”在这里不提示读音。",
     "noteEn": "Left, ⻊ foot: somewhere you walk; the right part 各 does not give the sound here."
    },
    "rule": "路名、站名里最常见的字之一：某某路、某某路口。",
    "ruleEn": "One of the commonest characters in street and stop names: …路, …路口.",
    "l1": "相当于英语地名里的 Road／Street，放在名字后面。",
    "l1En": "Like Road or Street in English names, but it comes after the name."
   }
  ],
  "reverse": [
   {
    "target": "guan",
    "tokens": [
     "{随手|suíshǒu}",
     "<{关|guān}>",
     "{门|mén}"
    ]
   },
   {
    "target": "ye",
    "tokens": [
     "<{夜|yè}>",
     "{间|jiān}",
     "{营业|yíngyè}"
    ]
   },
   {
    "target": "zhan",
    "tokens": [
     "{地铁|dìtiě}",
     "<{站|zhàn}>"
    ]
   },
   {
    "target": "lu",
    "tokens": [
     "{人民|Rénmín}",
     "<{路|lù}>"
    ]
   },
   {
    "target": "kai",
    "tokens": [
     "{每天|měitiān}",
     "<{开|kāi}>",
     "{放|fàng}"
    ]
   },
   {
    "target": "che",
    "tokens": [
     "{停|tíng}",
     "<{车|chē}>",
     "{场|chǎng}"
    ]
   }
  ],
  "words": [
   {
    "id": "weideng",
    "w": "尾灯",
    "r": "wěidēng",
    "page": "s1",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "车尾的灯",
    "glossEn": "tail-lights",
    "why": "“尾”是尾巴、后面，“灯”是灯；画上车尾有两盏红灯。",
    "whyEn": "尾 is tail or back, 灯 is light; the picture shows two red lights on the back of the bus."
   },
   {
    "id": "guaijiao",
    "w": "拐角",
    "r": "guǎijiǎo",
    "page": "s1",
    "clue": [
     "parts",
     "context"
    ],
    "gloss": "路转弯的地方",
    "glossEn": "a corner where the road turns",
    "why": "“拐”是转弯，“角”是角落；车“在……一闪就不见了”，是转过去了。",
    "whyEn": "拐 is turn, 角 is corner; the bus \"flashed at the … and was gone\": it went round it."
   },
   {
    "id": "qihei",
    "w": "漆黑",
    "r": "qīhēi",
    "page": "s2",
    "clue": [
     "parts",
     "context"
    ],
    "gloss": "非常黑，一点光也没有",
    "glossEn": "pitch-black",
    "why": "有“黑”字；后面说“没电了”，屏幕当然是黑的。",
    "whyEn": "It contains 黑, black; then \"the battery was dead\", so the screen is black."
   },
   {
    "id": "dayang",
    "w": "打烊",
    "r": "dǎyàng",
    "page": "s3",
    "clue": [
     "context",
     "picture"
    ],
    "gloss": "（商店）晚上关门，停止营业",
    "glossEn": "(of a shop) to close for the night",
    "why": "“店铺都……了”，画上店都黑着，咖啡馆门上挂着牌子、椅子倒扣：是关门了。两个字拆开帮不上忙。",
    "whyEn": "\"the shops had all …\": the picture shows them dark, with a sign on the café door and chairs upside down. The parts do not help here."
   },
   {
    "id": "daokou",
    "w": "倒扣",
    "r": "dàokòu",
    "page": "s3",
    "clue": [
     "picture"
    ],
    "gloss": "翻过来扣着放",
    "glossEn": "placed upside down",
    "why": "“椅子都……在桌上”，画上椅子腿朝上放在桌上。",
    "whyEn": "\"the chairs were … on the tables\"; the picture shows them legs up on the tables."
   },
   {
    "id": "houchedian",
    "w": "候车点",
    "r": "hòuchēdiǎn",
    "page": "s4",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "等车的地方",
    "glossEn": "a place to wait for a vehicle",
    "why": "“候”是等，“车”“点”是车和地点；画上是画了线的停车位和出租车牌子。",
    "whyEn": "候 is wait, 车 vehicle, 点 point or place; the picture shows the marked bay and the taxi sign."
   },
   {
    "id": "maomaoyu",
    "w": "毛毛雨",
    "r": "máomaoyǔ",
    "page": "s4",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "很细很小的雨",
    "glossEn": "drizzle",
    "why": "“雨”加上“毛毛”（像细毛一样）；画上飘着细雨。",
    "whyEn": "雨 rain with 毛毛, fine as hair; the picture shows a light rain."
   },
   {
    "id": "yiliuyan",
    "w": "一溜烟",
    "r": "yíliùyān",
    "page": "s5",
    "clue": [
     "context"
    ],
    "gloss": "（跑得）飞快",
    "glossEn": "(running) very fast",
    "why": "又冷又下雨，对面终于有亮着的店，“……跑了过去”：是很快地跑。字面的“一道烟”帮不上忙。",
    "whyEn": "Cold, raining, at last a lit shop: \"… ran over\" means ran fast. The literal \"a wisp of smoke\" does not help."
   },
   {
    "id": "saqima",
    "w": "萨其马",
    "r": "sàqímǎ",
    "page": "s6",
    "clue": [
     "none"
    ],
    "gloss": "一种油炸面条粘成块的甜点心",
    "glossEn": "a sweet made of fried strips of dough stuck together with syrup",
    "why": "“一块……”只告诉你是一样东西，跟茶放在一起，可能能吃；三个字是译音，拆开没用，画上也没有。到底是什么，这一页看不出来，要查。",
    "whyEn": "\"a piece of …\" only tells you it is a thing, perhaps food since it comes with tea; the three characters spell a sound, so the parts are no use, and it is not in the picture. This page cannot tell you: look it up."
   },
   {
    "id": "tie",
    "w": "贴",
    "r": "tiē",
    "page": "s6",
    "clue": [
     "picture",
     "context"
    ],
    "gloss": "（把纸）粘在墙上",
    "glossEn": "to stick (paper) on a wall",
    "why": "“旁边……着告示”，画上告示的两个角粘着胶带。",
    "whyEn": "\"a notice … beside the till\"; the picture shows tape on its corners."
   },
   {
    "id": "huandao",
    "w": "环岛",
    "r": "huándǎo",
    "page": "s7",
    "clue": [
     "none"
    ],
    "gloss": "几条路交汇、车绕着中间转的路口",
    "glossEn": "a roundabout",
    "why": "“到……我叫你”只告诉你是路上的一个地方；“环”“岛”拆开会把你带偏（环形的岛？），画上也没有。这一页看不出来，要查。",
    "whyEn": "\"when we get to the … I'll call you\" only tells you it is a place on the way; the parts 环 ring and 岛 island lead you astray, and it is not in the picture. This page cannot tell you: look it up."
   }
  ],
  "review": [
   "成人学认字（汉语）：目标字 车、站、夜、开、关、路 按招牌高频字选；“规律”“和母语比”两栏的说法（象形、形声、长得像的字）请老师确认是否准确、是否对成人太简单。",
   "拼音：末班 mòbān、坐上 zuòshàng（也常读轻声 shang）、一溜烟 yíliùyān、毛毛雨 máomaoyǔ 的轻声；“到了车站”的“了” le。",
   "招牌用词：咖啡馆门上的“休息中”、出租车站牌“出租车”、“24小时营业”、“夜班车 N2 每30分钟一班”、车头“N2 公园路”是否像真实的中国街头。",
   "萨其马、环岛 作为“这一页看不出来、要查”的词；“打烊”的字面也帮不上忙但能从图猜，请确认归类合适。",
   "“出租车站”（学认字文本）一般说“出租车停靠点／候车点”，为了重复“车站”两个目标字用了简化说法，请确认可以接受。"
  ],
  "reviewEn": [
   "Adult learning to read (Chinese): the targets 车 站 夜 开 关 路 were chosen as frequent sign characters; please check the \"pattern\" and \"compared with your first language\" lines (pictographs, sound-meaning characters, look-alikes) for accuracy and for whether they are too simple for adults.",
   "Pinyin: 末班 mòbān, 坐上 zuòshàng (often neutral shang), 一溜烟 yíliùyān, the neutral tone in 毛毛雨 máomaoyǔ, and le in 到了车站.",
   "Sign wording: 休息中 on the café door, 出租车 on the taxi sign, 24小时营业, 夜班车 N2 每30分钟一班, and N2 公园路 on the bus: do they look like real Chinese street print?",
   "萨其马 and 环岛 as \"look it up\" words; the parts of 打烊 do not help either, but it can be guessed from the picture. Please confirm the classification.",
   "出租车站 in the learning-to-read text would usually be 出租车停靠点 / 候车点; the simpler form was used to repeat the two targets 车 and 站. Please confirm it is acceptable."
  ]
 }
};

KT_DATA["picture-book-ja"] = {
 "id": "picture-book-ja",
 "scene": "paper-boat",
 "lang": "ja",
 "speech": "ja-JP",
 "title": "绘本阅读：日语",
 "titleEn": "Picture-book reading: Japanese",
 "subtitle": "一本原创绘本，两种读法：学认字和借读书学语言。注音是振假名。",
 "subtitleEn": "One original picture book, two ways to read it: learning to read, and reading to learn. The reading aid is furigana.",
 "bookTitle": "あおい かみの ふね",
 "names": {
  "boy": "そうた",
  "boyEn": "Sota"
 },
 "aid": "furigana",
 "aidLabel": "振假名",
 "aidLabelEn": "furigana",
 "spots": {
  "boy": {
   "w": "そうた"
  },
  "boat": {
   "w": "ふね"
  },
  "window": {
   "w": "まど"
  },
  "gate": {
   "w": "もん"
  },
  "grandpa": {
   "w": "おじいちゃん"
  },
  "water": {
   "w": "かわ"
  },
  "bridge": {
   "w": "はし"
  },
  "frog": {
   "w": "かえる"
  },
  "stone": {
   "w": "いし"
  },
  "duck": {
   "w": "あひる"
  },
  "reeds": {
   "w": "あし"
  },
  "branch": {
   "w": "えだ"
  },
  "pond": {
   "w": "いけ"
  }
 },
 "pages": [
  {
   "id": "p1",
   "learn": [
    "そうたは",
    "{紙|かみ}で",
    "<{船|ふね}>を",
    "つくりました。"
   ],
   "read": [
    "やっと",
    "雨が",
    "やんだ。",
    "そうたは",
    "青い",
    "紙で",
    "船を",
    "折り、",
    "[[{折り目|おりめ}]]を",
    "一つずつ",
    "指で",
    "ぎゅっと",
    "おさえた。"
   ],
   "find": [
    {
     "w": "そうた"
    },
    {
     "w": "船",
     "say": "ふね"
    }
   ]
  },
  {
   "id": "p2",
   "learn": [
    "そうたは",
    "<{船|ふね}>を",
    "<{川|かわ}>に",
    "うかべました。"
   ],
   "read": [
    "小川の",
    "[[ほとり]]で、",
    "そうたは",
    "船を",
    "そっと",
    "水に",
    "うかべた。",
    "「[[{堰|せき}]]に",
    "気を",
    "つけるんだぞ！」と、",
    "門の",
    "ところから",
    "おじいちゃんが",
    "言った。"
   ],
   "find": [
    {
     "w": "川",
     "say": "かわ"
    },
    {
     "w": "うかべました"
    }
   ]
  },
  {
   "id": "p3",
   "learn": [
    "<{船|ふね}>は",
    "ながれて、",
    "<{橋|はし}>の",
    "<{下|した}>を",
    "とおりました。"
   ],
   "read": [
    "船は",
    "流れに",
    "のって、",
    "古い",
    "石の",
    "橋の",
    "下を",
    "[[くぐりぬけた]]。"
   ],
   "find": [
    {
     "w": "橋",
     "say": "はし"
    },
    {
     "w": "とおりました"
    }
   ]
  },
  {
   "id": "p4",
   "learn": [
    "<{船|ふね}>は",
    "ながれて、",
    "<かえる>の",
    "よこを",
    "とおりました。"
   ],
   "read": [
    "平たい",
    "石の",
    "上に",
    "かえるが",
    "いて、",
    "[[まばたき]]",
    "一つ",
    "しないで",
    "船を",
    "見ていた。"
   ],
   "find": [
    {
     "w": "かえる"
    },
    {
     "w": "よこ"
    }
   ]
  },
  {
   "id": "p5",
   "learn": [
    "<{船|ふね}>は",
    "ながれて、",
    "あひるの",
    "よこを",
    "とおりました。"
   ],
   "read": [
    "[[あし]]の",
    "しげみの",
    "そばで、",
    "あひるが",
    "水に",
    "頭を",
    "[[つっこんで]]、",
    "えさを",
    "さがしていた。"
   ],
   "find": [
    {
     "w": "あひる"
    },
    {
     "w": "ながれて"
    }
   ]
  },
  {
   "id": "p6",
   "learn": [
    "あっ！",
    "<{船|ふね}>が",
    "<{止|と}まりました>。"
   ],
   "read": [
    "ところが、",
    "船は",
    "川に",
    "横たわった",
    "木の",
    "枝に",
    "[[ひっかかって]]、",
    "動かなくなった。",
    "「あっ！」"
   ],
   "find": [
    {
     "w": "止まりました",
     "say": "とまりました"
    },
    {
     "w": "あっ"
    }
   ]
  },
  {
   "id": "p7",
   "learn": [
    "あひるが",
    "<{船|ふね}>を",
    "おしました。",
    "<{船|ふね}>は",
    "また",
    "ながれて",
    "いきました。"
   ],
   "read": [
    "すると、",
    "だれかが",
    "うしろから",
    "船を",
    "ちょんと",
    "[[つついた]]。",
    "船は",
    "また",
    "流れはじめた。"
   ],
   "find": [
    {
     "w": "おしました"
    },
    {
     "w": "また"
    }
   ]
  },
  {
   "id": "p8",
   "learn": [
    "そうたは",
    "<{船|ふね}>を",
    "つかまえました。",
    "「あひるさん、",
    "ありがとう！」"
   ],
   "read": [
    "池に",
    "つくと、",
    "そうたは",
    "[[びしょぬれ]]の",
    "船を",
    "すくいあげた。",
    "「ありがとう」と",
    "あひるに",
    "言うと、",
    "小道の",
    "上から",
    "おじいちゃんの",
    "声が",
    "した。",
    "「[[かきもち]]が",
    "あるぞ。",
    "早く",
    "おいで！」"
   ],
   "find": [
    {
     "w": "ありがとう"
    },
    {
     "w": "つかまえました"
    }
   ]
  }
 ],
 "targets": [
  {
   "id": "fune",
   "w": "船",
   "r": "ふね",
   "say": "ふね",
   "options": [
    {
     "t": "ふね",
     "say": "ふね",
     "ok": true
    },
    {
     "t": "ふな",
     "say": "ふな",
     "type": "other-reading"
    },
    {
     "t": "せん",
     "say": "せん",
     "type": "other-reading"
    }
   ],
   "hint": {
    "show": "ふ＿",
    "note": "第一个音是「ふ」，一共两个音。",
    "noteEn": "The first sound is ふ; it has two sounds in all."
   }
  },
  {
   "id": "kawa",
   "w": "川",
   "r": "かわ",
   "say": "かわ",
   "options": [
    {
     "t": "かわ",
     "say": "かわ",
     "ok": true
    },
    {
     "t": "せん",
     "say": "せん",
     "type": "other-reading"
    },
    {
     "t": "がわ",
     "say": "がわ",
     "type": "other-reading"
    }
   ],
   "hint": {
    "show": "か＿",
    "note": "三道竖线像流动的水。第一个音是「か」。",
    "noteEn": "Three lines like flowing water. The first sound is か."
   }
  },
  {
   "id": "hashi",
   "w": "橋",
   "r": "はし",
   "say": "はし",
   "options": [
    {
     "t": "はし",
     "say": "はし",
     "ok": true
    },
    {
     "t": "きょう",
     "say": "きょう",
     "type": "other-reading"
    },
    {
     "t": "ばし",
     "say": "ばし",
     "type": "other-reading"
    }
   ],
   "hint": {
    "show": "は＿",
    "note": "左边是「木」。第一个音是「は」，一共两个音。",
    "noteEn": "The left part is 木, wood. The first sound is は; two sounds in all."
   }
  },
  {
   "id": "shita",
   "w": "下",
   "r": "した",
   "say": "した",
   "options": [
    {
     "t": "した",
     "say": "した",
     "ok": true
    },
    {
     "t": "しも",
     "say": "しも",
     "type": "other-reading"
    },
    {
     "t": "か",
     "say": "か",
     "type": "other-reading"
    }
   ],
   "hint": {
    "show": "し＿",
    "note": "一横下面挂着一竖：在下面。第一个音是「し」。",
    "noteEn": "A stroke hanging below a line: underneath. The first sound is し."
   }
  },
  {
   "id": "tomaru",
   "w": "止まりました",
   "r": "とまりました",
   "say": "とまりました",
   "options": [
    {
     "t": "とまりました",
     "say": "とまりました",
     "ok": true
    },
    {
     "t": "しまりました",
     "say": "しまりました",
     "type": "other-reading"
    },
    {
     "t": "とおりました",
     "say": "とおりました",
     "type": "story"
    }
   ],
   "hint": {
    "show": "と＿りました",
    "note": "「止」在这里读一个音，后面是「まりました」。",
    "noteEn": "止 is one sound here, followed by まりました."
   }
  },
  {
   "id": "kaeru",
   "w": "かえる",
   "r": "かえる",
   "say": "かえる",
   "audioOnly": true,
   "options": [
    {
     "say": "かえる",
     "ok": true
    },
    {
     "say": "かえろ",
     "type": "look-alike"
    },
    {
     "say": "あひる",
     "type": "story"
    }
   ],
   "hint": {
    "show": "か・え・る",
    "note": "一个假名一个音，三个连起来读。注意「る」和「ろ」。",
    "noteEn": "One kana, one sound; blend the three. Watch る and ろ."
   }
  }
 ],
 "reverse": [
  {
   "target": "fune",
   "tokens": [
    "{大|おお}きい",
    "<{船|ふね}>が",
    "{見|み}えます。"
   ]
  },
  {
   "target": "kawa",
   "tokens": [
    "この",
    "<{川|かわ}>は",
    "ひろいです。"
   ]
  },
  {
   "target": "hashi",
   "tokens": [
    "<{橋|はし}>を",
    "わたりましょう。"
   ]
  },
  {
   "target": "shita",
   "tokens": [
    "つくえの",
    "<{下|した}>に",
    "ねこが",
    "います。"
   ]
  },
  {
   "target": "tomaru",
   "tokens": [
    "バスが",
    "<{止|と}まりました>。"
   ]
  },
  {
   "target": "kaeru",
   "tokens": [
    "いけに",
    "<かえる>が",
    "います。"
   ]
  }
 ],
 "words": [
  {
   "id": "orime",
   "w": "折り目",
   "r": "おりめ",
   "page": "p1",
   "clue": [
    "parts",
    "context"
   ],
   "gloss": "折过的地方留下的线",
   "glossEn": "the line where something has been folded",
   "why": "「折」就是前面「船を折り」的折，「目」在这里是一道线；还要用手指按住它。",
   "whyEn": "折 is the same \"fold\" as in 船を折り just before, and 目 here is a line; he presses it with his finger."
  },
  {
   "id": "hotori",
   "w": "ほとり",
   "page": "p2",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "（河、池塘的）边上",
   "glossEn": "the edge or bank of a river or pond",
   "why": "「小川の……で」把船放到水上，画上他蹲在河边。",
   "whyEn": "\"at the … of the stream\" he puts the boat on the water, and the picture shows him at the edge."
  },
  {
   "id": "seki",
   "w": "堰",
   "r": "せき",
   "page": "p2",
   "clue": [
    "none"
   ],
   "gloss": "拦河的低坝，挡住或调节河水",
   "glossEn": "a weir: a low wall across a river that holds back or controls the water",
   "why": "「……に気をつける」只告诉你要当心它，画上也没有；せき 还和“咳嗽”同音。它到底是什么，这一页看不出来，要查。",
   "whyEn": "\"be careful of the …\" only tells you to watch out for it, and it is not in the picture; せき also sounds like the word for a cough. What it is, this page cannot tell you: look it up."
  },
  {
   "id": "kugurinuketa",
   "w": "くぐりぬけた",
   "page": "p3",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "从下面钻过去了",
   "glossEn": "went through underneath",
   "why": "「橋の下を……」，画上小船正从桥洞下面穿过。",
   "whyEn": "\"under the bridge …\", and the picture shows the boat going through under the arch."
  },
  {
   "id": "mabataki",
   "w": "まばたき",
   "page": "p4",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "眨眼",
   "glossEn": "a blink",
   "why": "「……一つしないで」看着船：一动不动地看；画上青蛙睁着眼睛。",
   "whyEn": "\"without a single …\" while watching the boat: watching without moving; the picture shows the frog's open eyes."
  },
  {
   "id": "ashi",
   "w": "あし",
   "page": "p5",
   "clue": [
    "picture"
   ],
   "gloss": "芦苇（不是“脚”）",
   "glossEn": "reeds (not \"foot\")",
   "why": "「……のしげみ」是一丛植物，画上鸭子旁边是高高的草。同音的“脚”在这里讲不通。",
   "whyEn": "\"a thicket of …\" is a clump of plants, and the picture shows tall plants by the duck. あし meaning \"foot\" makes no sense here."
  },
  {
   "id": "tsukkonde",
   "w": "つっこんで",
   "page": "p5",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "把（头）扎进去",
   "glossEn": "pushing (its head) into",
   "why": "「水に頭を……」找吃的，画上鸭子头在水下、尾巴朝上。",
   "whyEn": "\"… its head into the water\" to look for food; the picture shows the head under water and the tail up."
  },
  {
   "id": "hikkakatte",
   "w": "ひっかかって",
   "page": "p6",
   "clue": [
    "context",
    "picture"
   ],
   "gloss": "被挂住、卡住",
   "glossEn": "got caught on something",
   "why": "碰到树枝以后「動かなくなった」，画上小船歪在树枝边。",
   "whyEn": "After the branch, \"it stopped moving\"; the picture shows the boat caught against the branch."
  },
  {
   "id": "tsutsuita",
   "w": "つついた",
   "page": "p7",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "轻轻地戳、啄",
   "glossEn": "poked or pecked lightly",
   "why": "「うしろから……」以后船又流走了；画上鸭子在后面用嘴碰着船。",
   "whyEn": "After \"… from behind\" the boat floats on; the picture shows the duck touching it with its beak."
  },
  {
   "id": "bishonure",
   "w": "びしょぬれ",
   "page": "p8",
   "clue": [
    "picture",
    "context"
   ],
   "gloss": "湿透了",
   "glossEn": "soaking wet",
   "why": "从池子里捞起来的纸船；画上帆塌下来，还在滴水。",
   "whyEn": "A paper boat lifted out of a pond; in the picture the sail droops and it drips."
  },
  {
   "id": "kakimochi",
   "w": "かきもち",
   "page": "p8",
   "clue": [
    "none"
   ],
   "gloss": "把年糕切成薄片晒干，再烤或炸成的点心",
   "glossEn": "a snack of thin dried rice-cake slices, toasted or fried",
   "why": "「……があるぞ。早くおいで」只告诉你是爷爷叫他来吃或拿的东西；もち 这个音也许让你想到年糕，但到底是什么，这一页看不出来，要查。",
   "whyEn": "\"There's … — come quickly\" only tells you it is something Grandpa wants him to come for; もち may make you think of rice cake, but what it is, this page cannot tell you: look it up."
  }
 ],
 "review": [
  "学认字文本用分かち書き（词组之间空格），汉字只用 船・川・橋・下・止・紙，都带振假名；请确认对六七岁孩子合适。",
  "小河里的鸭子用「あひる」（家鸭），画也画成白鸭；如果老师认为野外小河应该是「かも」，要改画和文本。",
  "「船を川にうかべました」「船は ながれて、橋の 下を とおりました」「あひるさん、ありがとう」是否自然；纸船也可以叫「かみぶね」。",
  "读音干扰项：ふな（船旅）、せん（音读）、がわ（小川）、ばし（石橋）、しも、か、しまりました——请确认作为“同一个字的别的读法”合适。",
  "橋（はし）和箸、端同音，音高不同；浏览器合成的音高可能不对。",
  "「堰」是常用汉字表外的字，只在借读书学语言文本里出现并带振假名；「かきもち」有地区差别（也叫おかき），作为“要查”的词是否合适。",
  "「まばたき一つしないで船を見ていた」「ちょんとつついた」「横たわった木の枝にひっかかって」是否自然。"
 ],
 "reviewEn": [
  "The learning-to-read text uses 分かち書き (spaces between phrases) and only the kanji 船・川・橋・下・止・紙, all with furigana; please confirm this suits six- and seven-year-olds.",
  "The duck in the stream is あひる (a domestic duck) and is drawn white; if a teacher thinks a wild stream needs かも, both the drawing and the text must change.",
  "Are 船を川にうかべました, 船は ながれて、橋の 下を とおりました and あひるさん、ありがとう natural? A paper boat can also be かみぶね.",
  "Reading distractors: ふな (船旅), せん (on reading), がわ (小川), ばし (石橋), しも, か, しまりました — please confirm they are fair as \"other readings of the same character\".",
  "橋 (はし) shares its sound with 箸 and 端, with a different pitch; browser speech synthesis may get the pitch wrong.",
  "堰 is outside the jōyō list and appears only in the reading-to-learn text with furigana; かきもち varies by region (also おかき): is it suitable as a \"look it up\" word?",
  "Are まばたき一つしないで船を見ていた, ちょんとつついた and 横たわった木の枝にひっかかって natural?"
 ],
 "older": {
  "scene": "last-bus",
  "title": "图文故事阅读：日语",
  "titleEn": "Illustrated story reading: Japanese",
  "subtitle": "给青少年和成人的一个原创图文故事，两种读法：学认字和借读书学语言。故事里有真实的街头文字。注音是振假名。",
  "subtitleEn": "An original illustrated story for teenagers and adults, read two ways: learning to read, and reading to learn. The pictures carry real street print. The reading aid is furigana.",
  "bookTitle": "終バスのあとで",
  "names": {
   "name": "アナ",
   "nameEn": "Ana",
   "dest": "公園前",
   "destEn": "公園前 (Kōen-mae)"
  },
  "learnNote": "这一套给已经能读另一种文字、会平假名的学习者：从招牌上的片假名和汉字开始；读音先用平假名标在上面，再一个词一个词撤掉。",
  "learnNoteEn": "For learners who already read another script and know hiragana: start from the katakana and kanji on signs; the reading is shown above in hiragana at first, then comes off word by word.",
  "cover": {
   "signs": {
    "stop": "バス停",
    "timetable": "終バス\n23:10"
   }
  },
  "spots": {
   "ana": {
    "w": "アナ"
   },
   "bus": {
    "w": "バス"
   },
   "clock": {
    "w": "とけい"
   },
   "lights": {
    "w": "テールランプ"
   },
   "phone": {
    "w": "スマホ"
   },
   "cafe": {
    "w": "カフェ"
   },
   "chairs": {
    "w": "いす"
   },
   "taxi": {
    "w": "タクシー"
   },
   "rain": {
    "w": "あめ"
   },
   "light": {
    "w": "あかり"
   },
   "shop": {
    "w": "みせ"
   },
   "crossing": {
    "w": "おうだんほどう"
   },
   "keeper": {
    "w": "みせのひと"
   },
   "notice": {
    "w": "はりがみ"
   },
   "cup": {
    "w": "おちゃ"
   },
   "till": {
    "w": "レジ"
   }
  },
  "pages": [
   {
    "id": "s1",
    "signs": {
     "stop": "バス停",
     "timetable": "終バス\n23:10"
    },
    "learn": [
     "アナは",
     "<{バス|ばす}>{停|てい}に",
     "つきました。",
     "{終|しゅう}<{バス|ばす}>は",
     "もう",
     "いません。"
    ],
    "read": [
     "新しい",
     "町に",
     "来て",
     "まだ",
     "一週間。",
     "バス停に",
     "着いた",
     "とき、",
     "終バスの",
     "[[テールランプ]]が",
     "角を",
     "曲がって",
     "[[{消|き}えていった]]。"
    ],
    "find": [
     {
      "w": "つきました"
     },
     {
      "w": "もう"
     }
    ]
   },
   {
    "id": "s2",
    "learn": [
     "<{夜|よる}>です。",
     "スマホが",
     "うごきません。"
    ],
    "read": [
     "スマホで",
     "タクシーを",
     "呼ぼうと",
     "したが、",
     "画面は",
     "真っ暗。",
     "[[{電池切|でんちぎ}れ]]だ。"
    ],
    "find": [
     {
      "w": "スマホ"
     },
     {
      "w": "うごきません"
     }
    ]
   },
   {
    "id": "s3",
    "signs": {
     "closed": "準備中"
    },
    "learn": [
     "<{店|みせ}>は",
     "みんな",
     "しまって",
     "います。"
    ],
    "read": [
     "[[{大通|おおどお}り]]を",
     "歩いた。",
     "店は",
     "どこも",
     "暗く、",
     "カフェの",
     "いすは",
     "テーブルの",
     "上に",
     "[[{逆|さか}さま]]に",
     "のせてあった。"
    ],
    "find": [
     {
      "w": "みんな"
     },
     {
      "w": "しまって"
     }
    ]
   },
   {
    "id": "s4",
    "signs": {
     "taxi": "タクシー\nのりば"
    },
    "learn": [
     "<{タクシー|たくしー}>も",
     "いません。"
    ],
    "read": [
     "タクシー",
     "[[{乗|の}り{場|ば}]]には",
     "だれも",
     "いない。",
     "[[{小雨|こさめ}]]まで",
     "降ってきた。"
    ],
    "find": [
     {
      "w": "いません"
     },
     {
      "w": "タクシー"
     }
    ]
   },
   {
    "id": "s5",
    "signs": {
     "open": "24時間営業"
    },
    "learn": [
     "あっ、",
     "あいている",
     "<{店|みせ}>が",
     "あります。",
     "24<{時間|じかん}>",
     "あいています。"
    ],
    "read": [
     "道の",
     "向こうに、",
     "一つだけ",
     "明るい",
     "窓が",
     "あった。",
     "アナは",
     "[[{小走|こばし}り]]で",
     "向かった。"
    ],
    "find": [
     {
      "w": "あっ"
     },
     {
      "w": "あります"
     }
    ]
   },
   {
    "id": "s6",
    "signs": {
     "notice": "深夜バス N2\n30分おき"
    },
    "learn": [
     "<{店|みせ}>の",
     "ひとが",
     "「<{夜|よる}>の",
     "<{バス|ばす}>が",
     "ありますよ」と",
     "いいました。"
    ],
    "read": [
     "店の",
     "中は",
     "あたたかかった。",
     "充電の",
     "コードと、",
     "熱い",
     "お茶と、",
     "[[たい{焼|や}き]]。",
     "レジの",
     "横には",
     "深夜バスの",
     "[[{貼|は}り{紙|がみ}]]。"
    ],
    "find": [
     {
      "w": "ひと"
     },
     {
      "w": "いいました"
     }
    ]
   },
   {
    "id": "s7",
    "signs": {
     "dest": "N2 公園前"
    },
    "learn": [
     "アナは",
     "{公園|こうえん}<{前|まえ}>ゆきの",
     "<{バス|ばす}>に",
     "のりました。"
    ],
    "read": [
     "二十分後、",
     "N2が",
     "来た。",
     "「[[ロータリー]]に",
     "着いたら",
     "声を",
     "かけますね」と",
     "運転手が",
     "言った。"
    ],
    "find": [
     {
      "w": "アナ"
     },
     {
      "w": "のりました"
     }
    ]
   }
  ],
  "targets": [
   {
    "id": "basu",
    "w": "バス",
    "r": "ばす",
    "say": "バス",
    "options": [
     {
      "t": "ばす",
      "say": "ばす",
      "ok": true
     },
     {
      "t": "ぱす",
      "say": "ぱす",
      "type": "look-alike"
     },
     {
      "t": "はす",
      "say": "はす",
      "type": "look-alike"
     }
    ],
    "hint": {
     "show": "バ ＝ ハ ＋ ゛",
     "note": "゛（浊点）让 ハ 变成 バ；゜ 让它变成 パ。",
     "noteEn": "The ゛ mark turns ハ into バ; ゜ turns it into パ."
    },
    "rule": "片假名写外来词和很多招牌上的词（バス＝bus，タクシー＝taxi），和平假名一一对应，也有 ゛ ゜。",
    "ruleEn": "Katakana writes loanwords and many sign words (バス bus, タクシー taxi); it maps one to one onto hiragana, with the same ゛ and ゜ marks.",
    "l1": "很多片假名词来自英语，读出来常常能猜到意思。",
    "l1En": "Many katakana words come from English, so once read aloud they are often easy to understand."
   },
   {
    "id": "yoru",
    "w": "夜",
    "r": "よる",
    "say": "よる",
    "options": [
     {
      "t": "よる",
      "say": "よる",
      "ok": true
     },
     {
      "t": "や",
      "say": "や",
      "type": "other-reading"
     },
     {
      "t": "ひる",
      "say": "ひる",
      "type": "meaning"
     }
    ],
    "hint": {
     "show": "よ＿",
     "note": "第一个音是 よ，一共两个音。",
     "noteEn": "The first sound is よ; two sounds in all."
    },
    "rule": "一个汉字常有两种读法：单独用时多用训读（夜＝よる），在词里多用音读（今夜＝こんや）。",
    "ruleEn": "A kanji often has two readings: on its own it usually takes the native reading (夜 = よる), inside compounds the Chinese-derived one (今夜 = こんや).",
    "l1": "中文一个字一般一个读音；日语同一个字要看它在哪儿。",
    "l1En": "In Chinese a character usually has one reading; in Japanese it depends on where it stands."
   },
   {
    "id": "mise",
    "w": "店",
    "r": "みせ",
    "say": "みせ",
    "options": [
     {
      "t": "みせ",
      "say": "みせ",
      "ok": true
     },
     {
      "t": "てん",
      "say": "てん",
      "type": "other-reading"
     },
     {
      "t": "いえ",
      "say": "いえ",
      "type": "meaning"
     }
    ],
    "hint": {
     "show": "み＿",
     "note": "第一个音是 み；在“書店”“店員”里读 てん。",
     "noteEn": "The first sound is み; in 書店 and 店員 it is read てん."
    },
    "rule": "店 单独用读 みせ；在“書店（しょてん）”“店員（てんいん）”这样的词里读 てん。",
    "ruleEn": "店 alone is みせ; in compounds like 書店 (しょてん) and 店員 (てんいん) it is てん.",
    "l1": "对会中文的人：音读 てん 和中文 diàn 相近，训读 みせ 要另外记。",
    "l1En": "For Chinese readers: the on reading てん is close to diàn; the native reading みせ has to be learned."
   },
   {
    "id": "takushi",
    "w": "タクシー",
    "r": "たくしー",
    "say": "タクシー",
    "options": [
     {
      "t": "たくしー",
      "say": "たくしー",
      "ok": true
     },
     {
      "t": "たくし",
      "say": "たくし",
      "type": "blend"
     },
     {
      "t": "だくしー",
      "say": "だくしー",
      "type": "look-alike"
     }
    ],
    "hint": {
     "show": "タ・ク・シ・ー",
     "note": "ー 表示前面的音拉长。",
     "noteEn": "ー means the sound before it is long."
    },
    "rule": "长音：片假名用 ー 表示拉长（タクシー、コーヒー）。",
    "ruleEn": "Long vowels: katakana marks them with ー (タクシー, コーヒー).",
    "l1": "ー 不是一个字母，是“拉长”的记号；少了它，词就变了。",
    "l1En": "ー is not a letter but a \"make it long\" mark; drop it and the word changes."
   },
   {
    "id": "jikan",
    "w": "時間",
    "r": "じかん",
    "say": "じかん",
    "options": [
     {
      "t": "じかん",
      "say": "じかん",
      "ok": true
     },
     {
      "t": "ときま",
      "say": "ときま",
      "type": "other-reading"
     },
     {
      "t": "じま",
      "say": "じま",
      "type": "other-reading"
     }
    ],
    "hint": {
     "show": "じ・かん",
     "note": "两个字都用音读：時＝じ，間＝かん。",
     "noteEn": "Both take the on reading: 時 = じ, 間 = かん."
    },
    "rule": "两个汉字连成一个词时，多用音读（時間、営業）。",
    "ruleEn": "When two kanji form one word, they usually take the on reading (時間, 営業).",
    "l1": "对会中文的人：音读和中文读音常有对应（間 jiān ↔ かん），可以借来猜。",
    "l1En": "For Chinese readers: on readings often correspond to Chinese sounds (間 jiān ↔ かん) and can be used to guess."
   },
   {
    "id": "mae",
    "w": "前",
    "r": "まえ",
    "say": "まえ",
    "options": [
     {
      "t": "まえ",
      "say": "まえ",
      "ok": true
     },
     {
      "t": "ぜん",
      "say": "ぜん",
      "type": "other-reading"
     },
     {
      "t": "うしろ",
      "say": "うしろ",
      "type": "meaning"
     }
    ],
    "hint": {
     "show": "ま＿",
     "note": "第一个音是 ま；在“午前（ごぜん）”里读 ぜん。",
     "noteEn": "The first sound is ま; in 午前 (ごぜん) it is ぜん."
    },
    "rule": "站名、地名常是“某某前”：駅前、公園前＝车站前、公园前。",
    "ruleEn": "Stop and place names are often \"…前\": 駅前, 公園前 = in front of the station, the park.",
    "l1": "中文说“公园前”也懂，但日语读 まえ，不读 ぜん。",
    "l1En": "Chinese readers will understand 公園前 at once, but it is read まえ, not ぜん."
   }
  ],
  "reverse": [
   {
    "target": "jikan",
    "tokens": [
     "{営業|えいぎょう}<{時間|じかん}>",
     "10:00〜20:00"
    ]
   },
   {
    "target": "takushi",
    "tokens": [
     "<{タクシー|たくしー}>のりば"
    ]
   },
   {
    "target": "mae",
    "tokens": [
     "{駅|えき}<{前|まえ}>"
    ]
   },
   {
    "target": "yoru",
    "tokens": [
     "<{夜|よる}>9{時|じ}まで"
    ]
   },
   {
    "target": "basu",
    "tokens": [
     "<{バス|ばす}>のりば"
    ]
   },
   {
    "target": "mise",
    "tokens": [
     "この",
     "<{店|みせ}>は",
     "カードが",
     "つかえます"
    ]
   }
  ],
  "words": [
   {
    "id": "teruranpu",
    "w": "テールランプ",
    "page": "s1",
    "clue": [
     "picture",
     "context"
    ],
    "gloss": "尾灯",
    "glossEn": "tail-lights",
    "why": "“終バスの……”是车上的东西；画上车尾有两盏红灯。读出来是 tail lamp。",
    "whyEn": "\"the last bus's …\" is part of the bus; the picture shows two red lights at the back. Read aloud it is \"tail lamp\"."
   },
   {
    "id": "kieteitta",
    "w": "消えていった",
    "r": "きえていった",
    "page": "s1",
    "clue": [
     "context",
     "picture"
    ],
    "gloss": "消失了，看不见了",
    "glossEn": "disappeared",
    "why": "“角を曲がって……”：拐过弯去，就看不见了；画上车正开出画面。",
    "whyEn": "\"turned the corner and …\": out of sight; the picture shows the bus leaving the frame."
   },
   {
    "id": "denchigire",
    "w": "電池切れ",
    "r": "でんちぎれ",
    "page": "s2",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "电池没电了",
    "glossEn": "the battery has run out",
    "why": "“電池”是电池，“切れ”是断了、用完了；画上是空电池的标志。",
    "whyEn": "電池 is battery, 切れ is cut or run out; the picture shows an empty-battery symbol."
   },
   {
    "id": "oodoori",
    "w": "大通り",
    "r": "おおどおり",
    "page": "s3",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "大街",
    "glossEn": "a main street",
    "why": "“大”和“通”（通行的路）；画上是一整排店的大街。",
    "whyEn": "大 big and 通 a way through; the picture shows a whole row of shops along a street."
   },
   {
    "id": "sakasama",
    "w": "逆さま",
    "r": "さかさま",
    "page": "s3",
    "clue": [
     "picture"
    ],
    "gloss": "倒过来，上下颠倒",
    "glossEn": "upside down",
    "why": "“いすはテーブルの上に……にのせてあった”，画上椅子腿朝上放在桌上。",
    "whyEn": "\"the chairs had been put … on the tables\"; the picture shows them legs up."
   },
   {
    "id": "noriba",
    "w": "乗り場",
    "r": "のりば",
    "page": "s4",
    "clue": [
     "parts",
     "context"
    ],
    "gloss": "上车的地方",
    "glossEn": "a place to get on (a taxi, a bus)",
    "why": "“乗り”是乘坐，“場”是地方；“タクシー……”就是坐出租车的地方。",
    "whyEn": "乗り is riding, 場 a place; \"taxi …\" is where you get a taxi."
   },
   {
    "id": "kosame",
    "w": "小雨",
    "r": "こさめ",
    "page": "s4",
    "clue": [
     "parts",
     "picture"
    ],
    "gloss": "小雨，毛毛雨",
    "glossEn": "light rain",
    "why": "“小”和“雨”；画上飘着细雨。",
    "whyEn": "小 small and 雨 rain; the picture shows a light rain."
   },
   {
    "id": "kobashiri",
    "w": "小走り",
    "r": "こばしり",
    "page": "s5",
    "clue": [
     "parts",
     "context"
    ],
    "gloss": "小步快跑",
    "glossEn": "a quick little run, a trot",
    "why": "“走り”是跑（不是中文的“走”），“小”是小步；又冷又下雨，她要快点过去。",
    "whyEn": "走り is running (not walking, as in Chinese 走), 小 small steps; it is cold and raining, so she hurries over."
   },
   {
    "id": "taiyaki",
    "w": "たい焼き",
    "r": "たいやき",
    "page": "s6",
    "clue": [
     "none"
    ],
    "gloss": "鲷鱼烧：鱼形的烤点心，里面一般是红豆馅",
    "glossEn": "taiyaki: a fish-shaped cake, usually filled with sweet bean paste",
    "why": "“焼き”只告诉你是烤的东西，跟茶放在一起，可能能吃；“たい”是什么、长什么样，这一页看不出来，画上也没有，要查。",
    "whyEn": "焼き only tells you it is something grilled, perhaps food since it comes with tea; what たい is and what it looks like, this page cannot tell you, and it is not in the picture: look it up."
   },
   {
    "id": "harigami",
    "w": "貼り紙",
    "r": "はりがみ",
    "page": "s6",
    "clue": [
     "picture",
     "parts"
    ],
    "gloss": "贴在墙上的告示",
    "glossEn": "a notice stuck on a wall",
    "why": "“貼り”是贴，“紙”是纸；画上墙上贴着一张纸。",
    "whyEn": "貼り is stick, 紙 paper; the picture shows a sheet stuck on the wall."
   },
   {
    "id": "rotari",
    "w": "ロータリー",
    "page": "s7",
    "clue": [
     "none"
    ],
    "gloss": "（车站前的）环形交通广场",
    "glossEn": "a roundabout or bus loop (often in front of a station)",
    "why": "“……に着いたら”只告诉你是路上的一个地方；读出来是 rotary，也只给个大概，画上没有。到底是什么样的地方，这一页看不出来，要查。",
    "whyEn": "\"when we get to the …\" only tells you it is a place on the way; read aloud it is \"rotary\", which gives only a rough idea, and it is not in the picture. This page cannot tell you: look it up."
   }
  ],
  "review": [
   "成人学认字（日语）：假定学习者会平假名；片假名词 バス、タクシー 上面用平假名标读音（ばす、たくしー），这种注法不常见，请确认是否合适，还是改成不注、只放音。",
   "招牌用词：バス停、終バス 23:10、准备中（準備中）、タクシーのりば、24時間営業、深夜バス N2 30分おき、N2 公園前 是否像真实的日本街头。",
   "学认字文本：「スマホが うごきません」「24時間 あいています」「公園前ゆきの バス」是否自然；“ゆき”也可读“いき”。",
   "たい焼き、ロータリー 作为“这一页看不出来、要查”的词；电池切れ、乗り場、小雨、小走り 的“拆字能猜”是否成立（小走り 对会中文的人反而会误导）。",
   "干扰项：ぱす／はす、や／ひる、てん／いえ、たくし／だくしー、ときま／じま、ぜん／うしろ 是否合适。"
  ],
  "reviewEn": [
   "Adult learning to read (Japanese): assumes the learner knows hiragana; the katakana words バス and タクシー carry their reading in hiragana (ばす, たくしー), which is unusual. Please confirm, or switch them to no aid and audio only.",
   "Sign wording: バス停, 終バス 23:10, 準備中, タクシーのりば, 24時間営業, 深夜バス N2 30分おき and N2 公園前: do they look like real Japanese street print?",
   "Learning-to-read text: are スマホが うごきません, 24時間 あいています and 公園前ゆきの バス natural? ゆき can also be read いき.",
   "たい焼き and ロータリー as \"look it up\" words; do the \"parts help\" classifications hold for 電池切れ, 乗り場, 小雨 and 小走り (for Chinese readers 小走り may mislead)?",
   "Distractors: ぱす / はす, や / ひる, てん / いえ, たくし / だくしー, ときま / じま, ぜん / うしろ: are they fair?"
  ]
 }
};

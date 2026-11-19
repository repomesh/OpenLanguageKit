/* Data pack for blocks/listen-and-do.html (prim:listen-and-do): listen-and-do-fr.
 * Format: see the header of data/listen-and-do.js. The scenes and the answers are the same as in the English pack;
 * only the instructions and the word cards differ.
 * Gendered noun phrases in step 3: compose.gender {noun: m | f}, compose.art {m, f} (np key "art"), and size / colour
 * cards given as {m, f} agree with the chosen noun.
 * All sentences are original. Not yet checked by a native-speaking teacher: see `review`.
 */
KT_DATA["listen-and-do-fr"] = {
  "id": "listen-and-do-fr",
  "lang": "fr",
  "speech": "fr-FR",
  "join": " ",
  "title": "听指令做动作（法语）",
  "titleEn": "Listen and do (French)",
  "subtitle": "听一句指令，在画面上做一个动作。先只做不判，再回放对照差在哪，最后自己拼一条指令让页面照做。",
  "subtitleEn": "Hear an instruction and do it in the picture. First just act, with no marking; then replay and find what differs; finally build an instruction yourself and let the page carry it out literally.",
  "voiceNote": "指令由浏览器语音合成朗读，一个说话人、安静环境：在这里听懂，不等于在嘈杂的教室或街上也听得懂。",
  "voiceNoteEn": "Instructions are read by browser speech synthesis: one speaker, no background noise. Understanding them here does not mean you will in a noisy classroom or street.",
  "kcs": ["kt:fr-g-imperative", "kt:fr-fn-directions"],
  "items": [
    {"id": "r1", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["la petite balle", "ballSmall"], ["dans la boîte.", "box-in"]], "steps": [{"t": "move", "obj": "ballSmall", "spot": "box-in"}]},
    {"id": "r2", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Colorie"], ["la grande balle", "ballBig"], ["en rouge.", "c:red"]], "steps": [{"t": "colour", "obj": "ballBig", "color": "red"}]},
    {"id": "r3", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["le livre", "book"], ["sous la table.", "table-under"]], "steps": [{"t": "move", "obj": "book", "spot": "table-under"}]},
    {"id": "r4", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["le crayon", "pencil"], ["sur la chaise.", "chair-on"]], "steps": [{"t": "move", "obj": "pencil", "spot": "chair-on"}]},
    {"id": "r5", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Colorie"], ["la petite balle", "ballSmall"], ["en bleu.", "c:blue"]], "steps": [{"t": "colour", "obj": "ballSmall", "color": "blue"}]},
    {"id": "r6", "scene": "room", "child": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["la tasse bleue", "cupBlue"], ["sur la table.", "table-on"]], "steps": [{"t": "move", "obj": "cupBlue", "spot": "table-on"}]},
    {"id": "r7", "scene": "room", "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["la tasse rouge", "cupRed"], ["sous la chaise.", "chair-under"]], "steps": [{"t": "move", "obj": "cupRed", "spot": "chair-under"}]},
    {"id": "r8", "scene": "room", "rev": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Ne touche pas"], ["la tasse rouge.", "cupRed"], ["Mets"], ["la tasse bleue", "cupBlue"], ["à côté de la boîte.", "box-next"]], "steps": [{"t": "move", "obj": "cupBlue", "spot": "box-next"}], "forbid": ["cupRed"], "note": "前半句是“别碰红杯子”：红杯子一下也不能动。", "noteEn": "The first part says not to touch the red cup: it must not move at all."},
    {"id": "r9", "scene": "room", "rev": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Si la porte est ouverte,", "door"], ["mets"], ["le livre", "book"], ["sur la chaise.", "chair-on"]], "steps": [{"t": "move", "obj": "book", "spot": "chair-on"}], "cond": {"fact": "door-open"}, "note": "门是关着的，条件不成立，所以什么都不用做。", "noteEn": "The door is closed, so the condition is not met and nothing should be done."},
    {"id": "r10", "scene": "room", "kcs": ["kt:fr-g-imperative"], "seg": [["Si la fenêtre est ouverte,", "window"], ["mets"], ["le crayon", "pencil"], ["dans la boîte.", "box-in"]], "steps": [{"t": "move", "obj": "pencil", "spot": "box-in"}], "cond": {"fact": "window-open"}, "note": "窗户开着，条件成立，要照做。", "noteEn": "The window is open, so the condition is met and you do it."},
    {"id": "r11", "scene": "room", "rev": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["la grande balle", "ballBig"], ["près de la main gauche du garçon.", "boy-left"]], "steps": [{"t": "move", "obj": "ballBig", "spot": "boy-left"}], "note": "男孩面朝你，他的左手在你的右边。", "noteEn": "The boy faces you, so his left hand is on your right."},
    {"id": "r12", "scene": "room", "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["le crayon", "pencil"], ["sous la chaise,", "chair-under"], ["puis mets"], ["le livre", "book"], ["sur la table.", "table-on"]], "steps": [{"t": "move", "obj": "pencil", "spot": "chair-under"}, {"t": "move", "obj": "book", "spot": "table-on"}], "order": true},
    {"id": "r13", "scene": "room", "kcs": ["kt:fr-g-imperative"], "seg": [["Colorie d'abord"], ["la petite balle", "ballSmall"], ["en vert,", "c:green"], ["puis mets-la"], ["sur la table.", "table-on"]], "steps": [{"t": "colour", "obj": "ballSmall", "color": "green"}, {"t": "move", "obj": "ballSmall", "spot": "table-on"}], "order": true},
    {"id": "r14", "scene": "room", "kcs": ["kt:fr-g-imperative"], "seg": [["Mets"], ["la grande balle", "ballBig"], ["sous la table.", "table-under"]], "steps": [{"t": "move", "obj": "ballBig", "spot": "table-under"}]},
    {"id": "r15", "scene": "room", "rev": true, "kcs": ["kt:fr-g-imperative"], "seg": [["Ne déplace pas"], ["le livre.", "book"], ["Colorie"], ["la grande balle", "ballBig"], ["en jaune.", "c:yellow"]], "steps": [{"t": "colour", "obj": "ballBig", "color": "yellow"}], "forbid": ["book"], "note": "书不能动，只给大球涂色。", "noteEn": "Leave the book where it is; only colour the big ball."},
    {"id": "m1", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Allez tout droit et"], ["prenez la première rue à gauche.", "c1"], ["C'est sur votre droite."]], "answer": "W1N"},
    {"id": "m2", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Prenez la deuxième rue à droite.", "c2"], ["C'est sur votre gauche."]], "answer": "E2N"},
    {"id": "m3", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Continuez tout droit,"], ["après le deuxième carrefour.", "c2"], ["C'est sur votre droite."]], "answer": "M2R"},
    {"id": "m4", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Prenez la première rue à droite.", "c1"], ["C'est sur votre droite."]], "answer": "E1S"},
    {"id": "m5", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Passez le premier carrefour.", "c1"], ["C'est sur votre gauche."]], "answer": "M1L"},
    {"id": "m6", "scene": "map", "rev": true, "kcs": ["kt:fr-fn-directions", "kt:fr-g-imperative"], "seg": [["Ne tournez pas au premier carrefour.", "c1"], ["Tournez à gauche au deuxième carrefour.", "c2"], ["C'est sur votre gauche."]], "answer": "W2S", "note": "第一个路口不拐。往左拐以后，你的左边是下面那一排。", "noteEn": "No turn at the first corner. After turning left, your left is the lower row."},
    {"id": "m7", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["Tournez à droite au deuxième carrefour.", "c2"], ["C'est le bâtiment sur votre droite."]], "answer": "E2S"},
    {"id": "m8", "scene": "map", "kcs": ["kt:fr-fn-directions"], "seg": [["C'est sur votre gauche,"], ["avant le premier carrefour.", "c1"]], "answer": "M0L"}
  ],
  "compose": {
    "put": "Mets {np} {place}.",
    "colour": "Colorie {np} {colour}.",
    "np": ["art", "size", "noun", "color"],
    "npJoin": " ",
    "gender": {"ball": "f", "cup": "f", "book": "m", "pencil": "m"},
    "art": {"m": "le", "f": "la"},
    "nouns": {"ball": "balle", "cup": "tasse", "book": "livre", "pencil": "crayon"},
    "sizes": {"big": {"m": "grand", "f": "grande"}, "small": {"m": "petit", "f": "petite"}},
    "colorAdj": {"red": "rouge", "blue": {"m": "bleu", "f": "bleue"}, "yellow": "jaune", "green": {"m": "vert", "f": "verte"}},
    "colorTo": {"red": "en rouge", "blue": "en bleu", "yellow": "en jaune", "green": "en vert"},
    "places": {"box-in": "dans la boîte", "box-next": "à côté de la boîte", "table-on": "sur la table", "table-under": "sous la table", "chair-on": "sur la chaise", "chair-under": "sous la chaise", "boy-left": "près de la main gauche du garçon", "boy-right": "près de la main droite du garçon"}
  },
  "review": ["房间里的指令用 tu（Mets、Colorie、Ne touche pas），地图上的指路用 vous（Allez、Prenez、Tournez）：前者像对孩子或朋友说，后者像路人指路；请确认这样混用是否合适", "la grande balle：说球时 la grosse balle 可能更自然；这里用 grande 是为了和 petite 配对", "Ne touche pas la tasse rouge 与 Ne touche pas à la tasse rouge：这里用前一种", "Ne déplace pas le livre 与 Ne bouge pas le livre：这里用 déplacer", "près de la main gauche du garçon：是否都按男孩自己的左右理解（这里假定是）", "Continuez tout droit, après le deuxième carrefour（m3）：是否说 Continuez tout droit et passez le deuxième carrefour 更清楚", "Colorie … en rouge：语音合成读 Colorie 是否正确"],
  "reviewEn": ["Room instructions use tu (Mets, Colorie, Ne touche pas) and street directions use vous (Allez, Prenez, Tournez): the first as said to a child or friend, the second as a passer-by would; please confirm the mix is acceptable", "la grande balle: la grosse balle may be more natural for a ball; grande is used to pair with petite", "Ne touche pas la tasse rouge vs Ne touche pas à la tasse rouge: the first is used", "Ne déplace pas le livre vs Ne bouge pas le livre: déplacer is used", "près de la main gauche du garçon: is it always read from the boy's own point of view (assumed here)?", "Continuez tout droit, après le deuxième carrefour (m3): would Continuez tout droit et passez le deuxième carrefour be clearer?", "Colorie … en rouge: does speech synthesis read Colorie correctly?"]
};

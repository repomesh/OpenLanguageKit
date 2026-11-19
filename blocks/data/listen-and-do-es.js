/* Data pack for blocks/listen-and-do.html (prim:listen-and-do): listen-and-do-es.
 * Format: see the header of data/listen-and-do.js. The scenes and the answers are the same as in the English pack;
 * only the instructions and the word cards differ.
 * Gendered noun phrases in step 3: compose.gender {noun: m | f}, compose.art {m, f} (np key "art"), and size / colour
 * cards given as {m, f} agree with the chosen noun.
 * All sentences are original. Not yet checked by a native-speaking teacher: see `review`.
 */
KT_DATA["listen-and-do-es"] = {
  "id": "listen-and-do-es",
  "lang": "es",
  "speech": "es-ES",
  "join": " ",
  "title": "听指令做动作（西班牙语）",
  "titleEn": "Listen and do (Spanish)",
  "subtitle": "听一句指令，在画面上做一个动作。先只做不判，再回放对照差在哪，最后自己拼一条指令让页面照做。",
  "subtitleEn": "Hear an instruction and do it in the picture. First just act, with no marking; then replay and find what differs; finally build an instruction yourself and let the page carry it out literally.",
  "voiceNote": "指令由浏览器语音合成朗读，一个说话人、安静环境：在这里听懂，不等于在嘈杂的教室或街上也听得懂。",
  "voiceNoteEn": "Instructions are read by browser speech synthesis: one speaker, no background noise. Understanding them here does not mean you will in a noisy classroom or street.",
  "kcs": ["kt:es-place-expressions", "kt:es-fn-directions-basic"],
  "items": [
    {"id": "r1", "scene": "room", "child": true, "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["la pelota pequeña", "ballSmall"], ["en la caja.", "box-in"]], "steps": [{"t": "move", "obj": "ballSmall", "spot": "box-in"}]},
    {"id": "r2", "scene": "room", "child": true, "kcs": [], "seg": [["Pinta"], ["la pelota grande", "ballBig"], ["de rojo.", "c:red"]], "steps": [{"t": "colour", "obj": "ballBig", "color": "red"}]},
    {"id": "r3", "scene": "room", "child": true, "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["el libro", "book"], ["debajo de la mesa.", "table-under"]], "steps": [{"t": "move", "obj": "book", "spot": "table-under"}]},
    {"id": "r4", "scene": "room", "child": true, "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["el lápiz", "pencil"], ["encima de la silla.", "chair-on"]], "steps": [{"t": "move", "obj": "pencil", "spot": "chair-on"}]},
    {"id": "r5", "scene": "room", "child": true, "kcs": [], "seg": [["Pinta"], ["la pelota pequeña", "ballSmall"], ["de azul.", "c:blue"]], "steps": [{"t": "colour", "obj": "ballSmall", "color": "blue"}]},
    {"id": "r6", "scene": "room", "child": true, "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["la taza azul", "cupBlue"], ["encima de la mesa.", "table-on"]], "steps": [{"t": "move", "obj": "cupBlue", "spot": "table-on"}]},
    {"id": "r7", "scene": "room", "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["la taza roja", "cupRed"], ["debajo de la silla.", "chair-under"]], "steps": [{"t": "move", "obj": "cupRed", "spot": "chair-under"}]},
    {"id": "r8", "scene": "room", "rev": true, "kcs": ["kt:es-place-expressions"], "seg": [["No toques"], ["la taza roja.", "cupRed"], ["Pon"], ["la taza azul", "cupBlue"], ["al lado de la caja.", "box-next"]], "steps": [{"t": "move", "obj": "cupBlue", "spot": "box-next"}], "forbid": ["cupRed"], "note": "前半句是“别碰红杯子”：红杯子一下也不能动。", "noteEn": "The first part says not to touch the red cup: it must not move at all."},
    {"id": "r9", "scene": "room", "rev": true, "kcs": ["kt:es-place-expressions"], "seg": [["Si la puerta está abierta,", "door"], ["pon"], ["el libro", "book"], ["encima de la silla.", "chair-on"]], "steps": [{"t": "move", "obj": "book", "spot": "chair-on"}], "cond": {"fact": "door-open"}, "note": "门是关着的，条件不成立，所以什么都不用做。", "noteEn": "The door is closed, so the condition is not met and nothing should be done."},
    {"id": "r10", "scene": "room", "kcs": ["kt:es-place-expressions"], "seg": [["Si la ventana está abierta,", "window"], ["pon"], ["el lápiz", "pencil"], ["en la caja.", "box-in"]], "steps": [{"t": "move", "obj": "pencil", "spot": "box-in"}], "cond": {"fact": "window-open"}, "note": "窗户开着，条件成立，要照做。", "noteEn": "The window is open, so the condition is met and you do it."},
    {"id": "r11", "scene": "room", "rev": true, "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["la pelota grande", "ballBig"], ["junto a la mano izquierda del niño.", "boy-left"]], "steps": [{"t": "move", "obj": "ballBig", "spot": "boy-left"}], "note": "男孩面朝你，他的左手在你的右边。", "noteEn": "The boy faces you, so his left hand is on your right."},
    {"id": "r12", "scene": "room", "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["el lápiz", "pencil"], ["debajo de la silla,", "chair-under"], ["y después pon"], ["el libro", "book"], ["encima de la mesa.", "table-on"]], "steps": [{"t": "move", "obj": "pencil", "spot": "chair-under"}, {"t": "move", "obj": "book", "spot": "table-on"}], "order": true},
    {"id": "r13", "scene": "room", "kcs": ["kt:es-place-expressions"], "seg": [["Primero pinta"], ["la pelota pequeña", "ballSmall"], ["de verde,", "c:green"], ["y después ponla"], ["encima de la mesa.", "table-on"]], "steps": [{"t": "colour", "obj": "ballSmall", "color": "green"}, {"t": "move", "obj": "ballSmall", "spot": "table-on"}], "order": true},
    {"id": "r14", "scene": "room", "kcs": ["kt:es-place-expressions"], "seg": [["Pon"], ["la pelota grande", "ballBig"], ["debajo de la mesa.", "table-under"]], "steps": [{"t": "move", "obj": "ballBig", "spot": "table-under"}]},
    {"id": "r15", "scene": "room", "rev": true, "kcs": [], "seg": [["No muevas"], ["el libro.", "book"], ["Pinta"], ["la pelota grande", "ballBig"], ["de amarillo.", "c:yellow"]], "steps": [{"t": "colour", "obj": "ballBig", "color": "yellow"}], "forbid": ["book"], "note": "书不能动，只给大球涂色。", "noteEn": "Leave the book where it is; only colour the big ball."},
    {"id": "m1", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Sigue todo recto y"], ["gira en la primera calle a la izquierda.", "c1"], ["Está a la derecha."]], "answer": "W1N"},
    {"id": "m2", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Gira en la segunda calle a la derecha.", "c2"], ["Está a la izquierda."]], "answer": "E2N"},
    {"id": "m3", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Sigue todo recto y"], ["pasa el segundo cruce.", "c2"], ["Está a la derecha."]], "answer": "M2R"},
    {"id": "m4", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Gira en la primera calle a la derecha.", "c1"], ["Está a la derecha."]], "answer": "E1S"},
    {"id": "m5", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Pasa el primer cruce.", "c1"], ["Está a la izquierda."]], "answer": "M1L"},
    {"id": "m6", "scene": "map", "rev": true, "kcs": ["kt:es-fn-directions-basic"], "seg": [["No gires en el primer cruce.", "c1"], ["Gira a la izquierda en el segundo cruce.", "c2"], ["Está a la izquierda."]], "answer": "W2S", "note": "第一个路口不拐。往左拐以后，你的左边是下面那一排。", "noteEn": "No turn at the first corner. After turning left, your left is the lower row."},
    {"id": "m7", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Gira a la derecha en el segundo cruce.", "c2"], ["Es el edificio de la derecha."]], "answer": "E2S"},
    {"id": "m8", "scene": "map", "kcs": ["kt:es-fn-directions-basic"], "seg": [["Está a la izquierda,"], ["antes del primer cruce.", "c1"]], "answer": "M0L"}
  ],
  "compose": {
    "put": "Pon {np} {place}.",
    "colour": "Pinta {np} {colour}.",
    "np": ["art", "noun", "size", "color"],
    "npJoin": " ",
    "gender": {"ball": "f", "cup": "f", "book": "m", "pencil": "m"},
    "art": {"m": "el", "f": "la"},
    "nouns": {"ball": "pelota", "cup": "taza", "book": "libro", "pencil": "lápiz"},
    "sizes": {"big": "grande", "small": {"m": "pequeño", "f": "pequeña"}},
    "colorAdj": {"red": {"m": "rojo", "f": "roja"}, "blue": "azul", "yellow": {"m": "amarillo", "f": "amarilla"}, "green": "verde"},
    "colorTo": {"red": "de rojo", "blue": "de azul", "yellow": "de amarillo", "green": "de verde"},
    "places": {"box-in": "en la caja", "box-next": "al lado de la caja", "table-on": "encima de la mesa", "table-under": "debajo de la mesa", "chair-on": "encima de la silla", "chair-under": "debajo de la silla", "boy-left": "junto a la mano izquierda del niño", "boy-right": "junto a la mano derecha del niño"}
  },
  "review": ["指令用 tú 的命令式（pon、pinta、gira、sigue、pasa）；否定命令式 No toques、No muevas、No gires 是虚拟式形式，超出 A1，这里只要求听懂", "encima de la mesa／en la mesa／sobre la mesa：这里统一用 encima de，请确认对初学者是否最自然", "junto a la mano izquierda del niño：是否都按男孩自己的左右理解（这里假定是）", "cruce 与 esquina：地图题用 el primer／segundo cruce，有的地区更常说 esquina", "todo recto 是西班牙的说法，拉美不少地方说 derecho；这里没有练", "Pinta … de rojo 与 Colorea … de rojo：这里用 pinta", "Es el edificio de la derecha（m7）与 Está a la derecha 的区别是否需要说明"],
  "reviewEn": ["Instructions use the tú imperative (pon, pinta, gira, sigue, pasa); the negative imperatives No toques, No muevas, No gires are subjunctive forms beyond A1 and are only to be understood here", "encima de la mesa / en la mesa / sobre la mesa: encima de is used throughout; please confirm it is the most natural choice for beginners", "junto a la mano izquierda del niño: is it always read from the boy's own point of view (assumed here)?", "cruce vs esquina: the map items say el primer / segundo cruce; some regions prefer esquina", "todo recto is the usual form in Spain; much of Latin America says derecho, which is not practised here", "Pinta … de rojo vs Colorea … de rojo: pinta is used here", "Es el edificio de la derecha (m7) vs Está a la derecha: does the difference need a note?"]
};

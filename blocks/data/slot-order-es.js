/* Data pack for blocks/slot-order.html (prim:slot-order): slot-order-es.
 * Format: see the header of data/slot-order.js. The contrast track (l1) is English order, because the Spanish
 * course is explained in English. Glosses: gloss (Chinese) and glossEn (English).
 * All sentences were written for this pack. Not yet checked by a native-speaking teacher: see `review`.
 */
KT_DATA["slot-order-es"] = {
  "id": "slot-order-es",
  "lang": "es",
  "speech": "es-ES",
  "joiner": " ",
  "title": "西班牙语语序槽位",
  "titleEn": "Spanish word-order slots",
  "subtitle": "西班牙语的疑问词后面紧跟动词，no 直接放在动词前面，“谁的”要说成“东西 + de + 人”。先自己排，再看每个词块属于哪个槽。",
  "subtitleEn": "In Spanish the verb comes right after the question word, no goes directly before the verb, and “whose” is said as thing + de + owner. Order the chunks yourself first, then see which slot each one belongs to.",
  "review": ["Es de mi padre el coche、No habla francés Ana 这类把成分挪到句末的说法在口语里可能出现，页面按常规语序判为不对", "¿Vive aquí tu madre? 与 ¿Tu madre vive aquí? 判为“换了位置也对”，请确认两句的差别怎么向初学者说明", "Llega el tren 与 El tren llega：说明里写“主语在后常用来报告发生了什么”，请确认", "Hoy no trabajo 与 No trabajo hoy：判为“换了位置也对”", "Tengo una de español clase 是为练习造的错句，学习者是否真会这样说不确定（更常见的错误可能是 una español clase）", "带 por qué 的问句（¿Por qué Luis estudia español? 也可以说）没有放进练习"],
  "l1": {"label": "英语语序", "labelEn": "English order"},
  "slots": {
    "Q": {"label": "疑问词", "labelEn": "question word", "color": "t4"},
    "S": {"label": "主语", "labelEn": "subject", "color": "t1"},
    "NEG": {"label": "no（否定）", "labelEn": "no (negation)", "color": "t4"},
    "PRON": {"label": "宾语代词（me、lo…）", "labelEn": "object pronoun (me, lo …)", "color": "t3"},
    "V": {"label": "动词", "labelEn": "verb", "color": "t2"},
    "O": {"label": "宾语", "labelEn": "object", "color": "t0"},
    "N": {"label": "东西（名词）", "labelEn": "thing (noun)", "color": "t1"},
    "DE": {"label": "de＋所有者或类别", "labelEn": "de + owner or kind", "color": "t3"}
  },
  "rules": [
    {"id": "q-first", "a": ["Q"], "b": "*", "types": ["wh"], "text": "疑问词放在问句最前面", "textEn": "The question word goes first in the question"},
    {"id": "q-v", "a": ["V"], "b": ["S", "N", "DE"], "types": ["wh"], "text": "有疑问词的问句：动词紧跟疑问词，主语放在动词后面", "textEn": "Questions with a question word: the verb comes right after the question word, and the subject follows the verb"},
    {"id": "neg-v", "a": ["NEG"], "b": ["PRON", "V"], "text": "no 直接放在动词前面（有宾语代词时放在代词前面）", "textEn": "no goes directly before the verb (before the object pronoun, if there is one)"},
    {"id": "pron-v", "a": ["PRON"], "b": ["V"], "text": "宾语代词（me、te、lo…）放在变位动词前面", "textEn": "Object pronouns (me, te, lo …) go before the conjugated verb"},
    {"id": "s-v", "a": ["S"], "b": ["NEG", "PRON", "V", "O"], "types": ["stmt"], "text": "陈述句的常规顺序：主语在 no 和动词前面", "textEn": "Neutral statement order: the subject comes before no and the verb"},
    {"id": "v-o", "a": ["NEG", "PRON", "V"], "b": ["O", "N", "DE"], "types": ["stmt"], "text": "宾语跟在动词后面", "textEn": "The object follows the verb"},
    {"id": "n-de", "a": ["N"], "b": ["DE"], "text": "东西在前，de＋所有者（或类别）在后；西班牙语没有 's", "textEn": "The thing comes first and de + owner (or kind) after it; Spanish has no 's"}
  ],
  "sentences": [
    {"id": "s1", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿Dónde", "Q"], ["vive", "V"], ["Marta", "S"]], "end": "?", "l1": [0, 2, 1], "gloss": "玛尔塔住在哪儿？", "glossEn": "Where does Marta live?", "note": "动词紧跟疑问词，主语在动词后面：¿Dónde vive Marta? 英语要加 does，西班牙语不加任何词。", "noteEn": "The verb comes right after the question word and the subject follows it: ¿Dónde vive Marta? English adds does; Spanish adds nothing."},
    {"id": "s2", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿Cuándo", "Q"], ["llega", "V"], ["el tren", "S"]], "end": "?", "l1": [0, 2, 1], "gloss": "火车什么时候到？", "glossEn": "When does the train arrive?"},
    {"id": "s3", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿Qué", "Q"], ["estudia", "V"], ["tu hermana", "S"]], "end": "?", "l1": [0, 2, 1], "gloss": "你姐姐（妹妹）学什么？", "glossEn": "What does your sister study?"},
    {"id": "s4", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿Cómo", "Q"], ["se llama", "V"], ["tu profesor", "S"]], "end": "?", "l1": [0, 2, 1], "gloss": "你的老师叫什么名字？", "glossEn": "What is your teacher called?"},
    {"id": "s5", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿Cuántos años", "Q"], ["tiene", "V"], ["tu hija", "S"]], "end": "?", "gloss": "你女儿几岁了？", "glossEn": "How old is your daughter?", "note": "cuántos 和后面的名词一起算疑问词：¿Cuántos años…?", "noteEn": "cuántos and its noun together are the question word: ¿Cuántos años…?"},
    {"id": "s6", "kc": "kt:es-interrogatives-basic", "type": "wh", "chunks": [["¿De dónde", "Q"], ["es", "V"], ["tu profesora", "S"]], "end": "?", "gloss": "你的老师是哪里人？", "glossEn": "Where is your teacher from?", "note": "介词 de 跟疑问词一起放在最前面，不能像英语那样留在句末。", "noteEn": "The preposition de goes to the front with the question word; it cannot stay at the end as in English."},
    {"id": "s7", "kc": "kt:es-negation-word-order", "type": "stmt", "chunks": [["Ana", "S"], ["no", "NEG"], ["habla", "V"], ["francés", "O"]], "end": ".", "gloss": "安娜不会说法语。", "glossEn": "Ana does not speak French."},
    {"id": "s8", "kc": "kt:es-negation-word-order", "type": "stmt", "chunks": [["Mis padres", "S"], ["no", "NEG"], ["tienen", "V"], ["coche", "O"]], "end": ".", "gloss": "我父母没有车。", "glossEn": "My parents do not have a car."},
    {"id": "s9", "kc": "kt:es-negation-word-order", "type": "stmt", "chunks": [["Marta", "S"], ["no", "NEG"], ["me", "PRON"], ["escucha", "V"]], "end": ".", "l1": [0, 1, 3, 2], "gloss": "玛尔塔不听我说话。", "glossEn": "Marta does not listen to me.", "note": "no 在宾语代词前面，代词在动词前面：no me escucha。", "noteEn": "no comes before the object pronoun, and the pronoun before the verb: no me escucha."},
    {"id": "s10", "kc": "kt:es-negation-word-order", "type": "stmt", "chunks": [["Mi hermano", "S"], ["no", "NEG"], ["lo", "PRON"], ["sabe", "V"]], "end": ".", "l1": [0, 1, 3, 2], "gloss": "我哥哥（弟弟）不知道这件事。", "glossEn": "My brother does not know it."},
    {"id": "s11", "kc": "kt:es-de-possession", "type": "stmt", "chunks": [["Es", "V"], ["el coche", "N"], ["de mi padre", "DE"]], "end": ".", "l1": [0, 2, 1], "gloss": "这是我爸爸的车。", "glossEn": "It is my father's car."},
    {"id": "s12", "kc": "kt:es-de-possession", "type": "stmt", "chunks": [["Busco", "V"], ["la mochila", "N"], ["de Lucía", "DE"]], "end": ".", "l1": [0, 2, 1], "gloss": "我在找露西亚的背包。", "glossEn": "I am looking for Lucía's backpack."},
    {"id": "s13", "kc": "kt:es-de-possession", "type": "stmt", "chunks": [["Tengo", "V"], ["una clase", "N"], ["de español", "DE"]], "end": ".", "l1": [0, 2, 1], "gloss": "我有一节西班牙语课。", "glossEn": "I have a Spanish class.", "note": "表示类别也用 de：una clase de español，不能把两个名词直接放在一起。", "noteEn": "A kind is also given with de: una clase de español. Two nouns cannot simply stand side by side."},
    {"id": "s14", "kc": "kt:es-de-possession", "type": "wh", "chunks": [["¿Dónde", "Q"], ["está", "V"], ["la llave", "N"], ["del hotel", "DE"]], "end": "?", "l1": [0, 1, 3, 2], "gloss": "酒店的钥匙在哪儿？", "glossEn": "Where is the hotel key?", "note": "de + el 合写成 del：la llave del hotel。", "noteEn": "de + el contracts to del: la llave del hotel."}
  ],
  "judge": [
    {"id": "j1", "kc": "kt:es-interrogatives-basic", "text": "¿Dónde Marta vive?", "verdict": "bad", "rule": "q-v", "note": "动词要紧跟疑问词：¿Dónde vive Marta?", "noteEn": "The verb must come right after the question word: ¿Dónde vive Marta?"},
    {"id": "j2", "kc": "kt:es-interrogatives-basic", "text": "¿Dónde vive Marta?", "verdict": "ok", "note": "疑问词—动词—主语，对。", "noteEn": "Question word – verb – subject: right."},
    {"id": "j3", "kc": "kt:es-interrogatives-basic", "text": "¿Cuándo el tren llega?", "verdict": "bad", "rule": "q-v", "note": "主语放在动词后面：¿Cuándo llega el tren?", "noteEn": "The subject goes after the verb: ¿Cuándo llega el tren?"},
    {"id": "j4", "kc": "kt:es-negation-word-order", "text": "Ana habla no francés.", "verdict": "bad", "rule": "neg-v", "note": "no 要直接放在动词前面：Ana no habla francés.", "noteEn": "no goes directly before the verb: Ana no habla francés."},
    {"id": "j5", "kc": "kt:es-negation-word-order", "text": "Ana no habla francés.", "verdict": "ok", "note": "看上去和英语的顺序一样（主语—否定—动词—宾语），这里确实是对的。", "noteEn": "It looks just like English order (subject – negation – verb – object), and here that is right."},
    {"id": "j6", "kc": "kt:es-negation-word-order", "text": "Lo no sé.", "verdict": "bad", "rule": "neg-v", "note": "no 放在宾语代词前面：No lo sé.", "noteEn": "no goes before the object pronoun: No lo sé."},
    {"id": "j7", "kc": "kt:es-negation-word-order", "text": "No lo sé.", "verdict": "ok", "note": "no—代词—动词，对。", "noteEn": "no – pronoun – verb: right."},
    {"id": "j8", "kc": "kt:es-negation-word-order", "text": "Llega el tren.", "verdict": "alt", "base": "El tren llega.", "note": "主语放在动词后面也对，常用来报告“发生了什么”：新的信息（el tren）放在后面。", "noteEn": "The subject after the verb is also right; it is common when reporting what is happening, with the new information (el tren) last."},
    {"id": "j9", "kc": "kt:es-negation-word-order", "text": "Hoy no trabajo.", "verdict": "alt", "base": "No trabajo hoy.", "note": "时间放句首也对，只是把“今天”提出来当话头。", "noteEn": "Time at the front is also right; it just puts “today” forward as the starting point."},
    {"id": "j10", "kc": "kt:es-negation-word-order", "text": "¿Vive aquí tu madre?", "verdict": "alt", "base": "¿Tu madre vive aquí?", "note": "一般疑问句里主语可以留在动词前，也可以放到后面，两种都对；只靠语调和 ¿? 表示是问句。", "noteEn": "In a yes/no question the subject may stay before the verb or move after it; both are right. Only the intonation and ¿? show it is a question."},
    {"id": "j11", "kc": "kt:es-de-possession", "text": "Tengo una de español clase.", "verdict": "bad", "rule": "n-de", "note": "名词在前，de＋类别在后：Tengo una clase de español.", "noteEn": "The noun comes first and de + kind after it: Tengo una clase de español."},
    {"id": "j12", "kc": "kt:es-de-possession", "text": "Es el coche de mi padre.", "verdict": "ok", "note": "东西 + de + 所有者，对。", "noteEn": "Thing + de + owner: right."}
  ],
  "own": {
    "prompt": "写一句否定句，说说你认识的一个人不做什么，至少有三种槽位（比如 主语、no、动词、宾语）。用 / 把词块隔开，例如：Mi hermana / no / come / carne",
    "promptEn": "Write a negative sentence about something a person you know does not do, with at least three kinds of slot (e.g. subject, no, verb, object). Separate the chunks with /, for example: Mi hermana / no / come / carne",
    "sep": "/",
    "min": 3,
    "type": "stmt",
    "checks": {"NEG": {"re": "^no$", "why": "否定槽里只放 no", "whyEn": "The negation slot holds only no"}, "PRON": {"re": "^(me|te|lo|la|le|nos|os|los|las|les|se)$", "why": "宾语代词槽里要是 me、te、lo、la、nos 这样的词", "whyEn": "An object-pronoun slot needs a word like me, te, lo, la, nos"}, "DE": {"re": "^(de|del)\\s", "why": "这个槽要以 de 或 del 开头", "whyEn": "This slot starts with de or del"}, "Q": {"re": "^¿?\\s*(de |a |con |para )?(qué|quién|quiénes|dónde|cómo|cuándo|cuánto|cuánta|cuántos|cuántas|por qué)", "why": "疑问词槽里要有带重音符号的疑问词（qué、dónde、cómo……）", "whyEn": "A question-word slot needs a question word with its accent (qué, dónde, cómo …)"}}
  }
};

/* Data pack for blocks/slot-order.html (prim:slot-order): slot-order-fr.
 * Format: see the header of data/slot-order.js. The contrast track (l1) is English order, because the French
 * course is explained in English. Glosses: gloss (Chinese) and glossEn (English).
 * All sentences were written for this pack. Not yet checked by a native-speaking teacher: see `review`.
 */
KT_DATA["slot-order-fr"] = {
  "id": "slot-order-fr",
  "lang": "fr",
  "speech": "fr-FR",
  "joiner": " ",
  "title": "法语语序槽位",
  "titleEn": "French word-order slots",
  "subtitle": "法语的否定是 ne 和 pas 把动词夹在中间，me／te／se 放在动词前面，est-ce que 后面用陈述语序，形容词大多放在名词后面。先自己排，再看每个词块属于哪个槽。",
  "subtitleEn": "French wraps the verb in ne … pas, puts me / te / se before the verb, keeps statement order after est-ce que, and puts most adjectives after the noun. Order the chunks yourself first, then see which slot each one belongs to.",
  "review": ["口语里常省略 ne（Je parle pas italien），页面没有把这种说法放进判句", "Tu habites où ? 判为语序正确（口语问句），Où habites-tu ?（倒装）没有放进练习", "Marie a une voiture petite 判为不对；petit 放在名词后面在特定语境里可能出现", "Le samedi, nous ne travaillons pas／Demain, est-ce que tu viens ?／Le matin, je me lève tôt 判为“换了位置也对”", "Est-ce que parlez-vous anglais ? 判为违反“est-ce que 后面不倒装”", "所有排序句都避开了元音开头的动词，所以没有练 n'、m'、qu' 的省音写法", "un bon restaurant italien、une petite voiture rouge：两个形容词一前一后的例子是否对 A1 合适"],
  "l1": {"label": "英语语序", "labelEn": "English order"},
  "slots": {
    "Q": {"label": "疑问词", "labelEn": "question word", "color": "t4"},
    "EST": {"label": "est-ce que", "labelEn": "est-ce que", "color": "t3"},
    "S": {"label": "主语", "labelEn": "subject", "color": "t1"},
    "NE": {"label": "ne", "labelEn": "ne", "color": "t4"},
    "PRON": {"label": "me／te／se（代词式动词的代词）", "labelEn": "me / te / se (reflexive pronoun)", "color": "t3"},
    "V": {"label": "变位动词", "labelEn": "conjugated verb", "color": "t2"},
    "PAS": {"label": "pas／jamais", "labelEn": "pas / jamais", "color": "t4"},
    "R": {"label": "宾语和其他", "labelEn": "object and the rest", "color": "t0"},
    "DET": {"label": "冠词", "labelEn": "article", "color": "t0"},
    "A1": {"label": "名词前的形容词", "labelEn": "adjective before the noun", "color": "t3"},
    "N": {"label": "名词", "labelEn": "noun", "color": "t1"},
    "A2": {"label": "名词后的形容词", "labelEn": "adjective after the noun", "color": "t2"}
  },
  "rules": [
    {"id": "ne-v", "a": ["NE"], "b": ["PRON", "V", "PAS"], "text": "ne 放在动词前面（有 me、te、se 时放在它们前面）", "textEn": "ne goes before the verb (and before me, te, se if there is one)"},
    {"id": "v-pas", "a": ["V"], "b": ["PAS"], "text": "pas／jamais 紧跟在变位动词后面", "textEn": "pas / jamais comes straight after the conjugated verb"},
    {"id": "pron-v", "a": ["PRON"], "b": ["V"], "text": "me、te、se 放在动词前面", "textEn": "me, te, se go before the verb"},
    {"id": "s-first", "a": ["S"], "b": ["NE", "PRON", "V", "PAS"], "types": ["stmt", "est", "whest", "situ"], "text": "主语在动词（和 ne）前面：陈述句、est-ce que 问句和口语问句都不倒装", "textEn": "The subject comes before the verb (and ne): statements, est-ce que questions and spoken questions do not invert"},
    {"id": "v-r", "a": ["V", "PAS"], "b": ["R", "DET", "A1", "N", "A2"], "types": ["stmt", "est", "whest"], "text": "宾语和其他成分放在动词（和 pas）后面", "textEn": "The object and the rest come after the verb (and pas)"},
    {"id": "est-first", "a": ["EST"], "b": ["S", "NE", "PRON", "V", "PAS", "R"], "types": ["est", "whest"], "text": "est-ce que 放在主语前面，后面接陈述语序", "textEn": "est-ce que goes before the subject and is followed by statement order"},
    {"id": "q-est", "a": ["Q"], "b": "*", "types": ["whest"], "text": "疑问词放在 est-ce que 前面", "textEn": "The question word goes before est-ce que"},
    {"id": "q-last", "a": ["S", "V"], "b": ["Q"], "types": ["situ"], "text": "口语问句：语序和陈述句一样，疑问词留在句末", "textEn": "Spoken question: statement order, with the question word left at the end"},
    {"id": "det-first", "a": ["DET"], "b": ["A1", "N", "A2"], "text": "冠词在名词短语的最前面", "textEn": "The article opens the noun phrase"},
    {"id": "a1-n", "a": ["A1"], "b": ["N"], "text": "petit、grand、bon、joli 这类常用的短形容词放在名词前面", "textEn": "Short, frequent adjectives such as petit, grand, bon, joli go before the noun"},
    {"id": "n-a2", "a": ["N"], "b": ["A2"], "text": "颜色、国籍和大多数形容词放在名词后面", "textEn": "Colours, nationalities and most other adjectives go after the noun"}
  ],
  "sentences": [
    {"id": "f1", "kc": "kt:fr-g-negation-ne-pas", "type": "stmt", "chunks": [["Je", "S"], ["ne", "NE"], ["parle", "V"], ["pas", "PAS"], ["italien", "R"]], "end": ".", "l1": [0, 3, 2, 4], "gloss": "我不会说意大利语。", "glossEn": "I do not speak Italian.", "note": "ne 和 pas 把变位动词夹在中间：ne parle pas。英语只有一个 not，放在动词前面。", "noteEn": "ne and pas go on either side of the conjugated verb: ne parle pas. English has a single not, before the verb."},
    {"id": "f2", "kc": "kt:fr-g-negation-ne-pas", "type": "stmt", "chunks": [["Marie", "S"], ["ne", "NE"], ["mange", "V"], ["jamais", "PAS"], ["de viande", "R"]], "end": ".", "l1": [0, 3, 2, 4], "gloss": "玛丽从不吃肉。", "glossEn": "Marie never eats meat.", "note": "jamais 占的是 pas 的位置：ne mange jamais。", "noteEn": "jamais takes the place of pas: ne mange jamais."},
    {"id": "f3", "kc": "kt:fr-g-negation-ne-pas", "type": "stmt", "chunks": [["Vous", "S"], ["ne", "NE"], ["regardez", "V"], ["pas", "PAS"], ["la télévision", "R"]], "end": ".", "l1": [0, 3, 2, 4], "gloss": "你们不看电视。", "glossEn": "You do not watch television."},
    {"id": "f4", "kc": "kt:fr-g-reflexive-verbs", "type": "stmt", "chunks": [["Je", "S"], ["me", "PRON"], ["lève", "V"], ["tôt", "R"]], "end": ".", "l1": [0, 2, 3], "gloss": "我起得早。", "glossEn": "I get up early.", "note": "代词式动词的 me 放在主语和动词之间：je me lève。", "noteEn": "The pronoun of a pronominal verb goes between the subject and the verb: je me lève."},
    {"id": "f5", "kc": "kt:fr-g-reflexive-verbs", "type": "stmt", "chunks": [["Les enfants", "S"], ["se", "PRON"], ["brossent", "V"], ["les dents", "R"]], "end": ".", "l1": [0, 2, 3], "gloss": "孩子们刷牙。", "glossEn": "The children brush their teeth."},
    {"id": "f6", "kc": "kt:fr-g-reflexive-verbs", "type": "stmt", "chunks": [["Elle", "S"], ["ne", "NE"], ["se", "PRON"], ["couche", "V"], ["jamais", "PAS"], ["tard", "R"]], "end": ".", "l1": [0, 4, 3, 5], "gloss": "她从不晚睡。", "glossEn": "She never goes to bed late.", "note": "否定时 ne 在 se 前面，jamais 在动词后面：ne se couche jamais。", "noteEn": "In the negative, ne comes before se and jamais after the verb: ne se couche jamais."},
    {"id": "f7", "kc": "kt:fr-g-yes-no-questions", "type": "est", "chunks": [["Est-ce que", "EST"], ["vous", "S"], ["parlez", "V"], ["anglais", "R"]], "end": " ?", "gloss": "您会说英语吗？", "glossEn": "Do you speak English?", "note": "est-ce que 加在陈述句前面就成了问句，后面的语序不变。问号前面有一个空格。", "noteEn": "est-ce que in front of a statement makes it a question; the order after it does not change. French puts a space before the question mark."},
    {"id": "f8", "kc": "kt:fr-g-yes-no-questions", "type": "est", "chunks": [["Est-ce que", "EST"], ["tu", "S"], ["viens", "V"], ["demain", "R"]], "end": " ?", "gloss": "你明天来吗？", "glossEn": "Are you coming tomorrow?"},
    {"id": "f9", "kc": "kt:fr-g-question-words", "type": "whest", "chunks": [["Où", "Q"], ["est-ce que", "EST"], ["tu", "S"], ["habites", "V"]], "end": " ?", "l1": [0, 2, 3], "gloss": "你住在哪儿？", "glossEn": "Where do you live?"},
    {"id": "f10", "kc": "kt:fr-g-question-words", "type": "whest", "chunks": [["Quand", "Q"], ["est-ce que", "EST"], ["vous", "S"], ["partez", "V"]], "end": " ?", "gloss": "你们什么时候出发？", "glossEn": "When are you leaving?"},
    {"id": "f11", "kc": "kt:fr-g-question-words", "type": "situ", "chunks": [["Ça", "S"], ["coûte", "V"], ["combien", "Q"]], "end": " ?", "l1": [2, 0, 1], "gloss": "这个多少钱？", "glossEn": "How much does it cost?", "note": "口语里常把疑问词留在句末，语序和陈述句一样：Ça coûte combien ?", "noteEn": "In speech the question word is often left at the end, with statement order: Ça coûte combien ?"},
    {"id": "f12", "kc": "kt:fr-g-adjective-position", "type": "stmt", "chunks": [["Marie", "S"], ["a", "V"], ["une", "DET"], ["petite", "A1"], ["voiture", "N"], ["rouge", "A2"]], "end": ".", "l1": [0, 1, 2, 3, 5, 4], "gloss": "玛丽有一辆红色的小汽车。", "glossEn": "Marie has a small red car.", "note": "petite 在名词前，颜色 rouge 在名词后：une petite voiture rouge。", "noteEn": "petite goes before the noun and the colour rouge after it: une petite voiture rouge."},
    {"id": "f13", "kc": "kt:fr-g-adjective-position", "type": "stmt", "chunks": [["Paul", "S"], ["cherche", "V"], ["un", "DET"], ["bon", "A1"], ["restaurant", "N"], ["italien", "A2"]], "end": ".", "l1": [0, 1, 2, 3, 5, 4], "gloss": "保罗在找一家好的意大利餐厅。", "glossEn": "Paul is looking for a good Italian restaurant."},
    {"id": "f14", "kc": "kt:fr-g-adjective-position", "type": "stmt", "chunks": [["Elle", "S"], ["porte", "V"], ["un", "DET"], ["pull", "N"], ["noir", "A2"]], "end": ".", "l1": [0, 1, 2, 4, 3], "gloss": "她穿着一件黑色的毛衣。", "glossEn": "She is wearing a black jumper."}
  ],
  "judge": [
    {"id": "j1", "kc": "kt:fr-g-negation-ne-pas", "text": "Je ne parle pas italien.", "verdict": "ok", "note": "ne—动词—pas，对。", "noteEn": "ne – verb – pas: right."},
    {"id": "j2", "kc": "kt:fr-g-negation-ne-pas", "text": "Je ne pas parle italien.", "verdict": "bad", "rule": "v-pas", "note": "pas 要放在变位动词后面：Je ne parle pas italien.", "noteEn": "pas goes after the conjugated verb: Je ne parle pas italien."},
    {"id": "j3", "kc": "kt:fr-g-reflexive-verbs", "text": "Elle se ne couche jamais tard.", "verdict": "bad", "rule": "ne-v", "note": "ne 在 se 前面：Elle ne se couche jamais tard.", "noteEn": "ne comes before se: Elle ne se couche jamais tard."},
    {"id": "j4", "kc": "kt:fr-g-reflexive-verbs", "text": "Je lève me tôt.", "verdict": "bad", "rule": "pron-v", "note": "me 放在动词前面：Je me lève tôt.", "noteEn": "me goes before the verb: Je me lève tôt."},
    {"id": "j5", "kc": "kt:fr-g-question-words", "text": "Tu habites où ?", "verdict": "ok", "note": "口语问句：陈述语序，疑问词在句末。和 Où est-ce que tu habites ? 一样是对的，只是更随意。", "noteEn": "A spoken question: statement order with the question word last. It is as correct as Où est-ce que tu habites ?, only more casual."},
    {"id": "j6", "kc": "kt:fr-g-adjective-position", "text": "Marie a une petite voiture.", "verdict": "ok", "note": "看上去和英语一样（形容词在名词前），这里确实对：petit 属于放在名词前的那一小批形容词。", "noteEn": "It looks just like English (adjective before the noun), and here that is right: petit is one of the few adjectives that go before the noun."},
    {"id": "j7", "kc": "kt:fr-g-adjective-position", "text": "Marie a une rouge voiture.", "verdict": "bad", "rule": "n-a2", "note": "颜色放在名词后面：une voiture rouge.", "noteEn": "Colours go after the noun: une voiture rouge."},
    {"id": "j8", "kc": "kt:fr-g-adjective-position", "text": "Marie a une voiture petite.", "verdict": "bad", "rule": "a1-n", "note": "petit 放在名词前面：une petite voiture.", "noteEn": "petit goes before the noun: une petite voiture."},
    {"id": "j9", "kc": "kt:fr-g-yes-no-questions", "text": "Est-ce que parlez-vous anglais ?", "verdict": "bad", "rule": "s-first", "note": "est-ce que 后面不倒装：Est-ce que vous parlez anglais ?（或者不用 est-ce que：Parlez-vous anglais ?）", "noteEn": "No inversion after est-ce que: Est-ce que vous parlez anglais ? (or without est-ce que: Parlez-vous anglais ?)"},
    {"id": "j10", "kc": "kt:fr-g-negation-ne-pas", "text": "Le samedi, nous ne travaillons pas.", "verdict": "alt", "base": "Nous ne travaillons pas le samedi.", "note": "时间放句首也对，只是把“星期六”提出来当话头。", "noteEn": "Time at the front is also right; it just puts “on Saturdays” forward as the starting point."},
    {"id": "j11", "kc": "kt:fr-g-yes-no-questions", "text": "Demain, est-ce que tu viens ?", "verdict": "alt", "base": "Est-ce que tu viens demain ?", "note": "把 demain 提到最前面也对，强调问的是“明天”。", "noteEn": "Putting demain first is also right; it stresses that the question is about tomorrow."},
    {"id": "j12", "kc": "kt:fr-g-reflexive-verbs", "text": "Le matin, je me lève tôt.", "verdict": "alt", "base": "Je me lève tôt le matin.", "note": "时间放句首也对，常用来对比（早上怎样，晚上怎样）。", "noteEn": "Time at the front is also right; it is often used for a contrast (mornings like this, evenings like that)."}
  ],
  "own": {
    "prompt": "写一句否定句，说说你自己不做什么，至少有三种槽位（比如 主语、ne、动词、pas、宾语）。动词请选辅音开头的。用 / 把词块隔开，例如：Je / ne / regarde / pas / la télévision",
    "promptEn": "Write a negative sentence about something you do not do, with at least three kinds of slot (e.g. subject, ne, verb, pas, object). Choose a verb that starts with a consonant. Separate the chunks with /, for example: Je / ne / regarde / pas / la télévision",
    "sep": "/",
    "min": 3,
    "type": "stmt",
    "checks": {"NE": {"re": "^(ne|n')$", "why": "这个槽里只放 ne（或 n'）", "whyEn": "This slot holds only ne (or n')"}, "PAS": {"re": "^(pas|jamais|plus|rien)$", "why": "这个槽里要是 pas、jamais 这样的词", "whyEn": "This slot needs a word like pas or jamais"}, "PRON": {"re": "^(me|te|se|nous|vous|m'|t'|s')$", "why": "这个槽里要是 me、te、se、nous、vous", "whyEn": "This slot needs me, te, se, nous or vous"}, "EST": {"re": "^est-ce qu", "why": "这个槽里要是 est-ce que", "whyEn": "This slot needs est-ce que"}}
  }
};

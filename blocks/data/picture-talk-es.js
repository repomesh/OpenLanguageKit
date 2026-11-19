/* Spanish language pack for blocks/picture-talk.html (prim:picture-describe): picture-es.
 * It reuses the park scene, KT_SCENES["park"] in data/picture-talk.js (the registry entry names that file under
 * `scenes`, and the page loads it first). Format: see the header of data/picture-talk.js; `gEn` / `agEn` are the
 * English glosses next to the Chinese `g` / `ag`.
 * parse / structures / traps are regular expressions over a controlled vocabulary; \b is avoided next to accented
 * letters. All sentences are original. Not yet checked by a native-speaking teacher: see `review`. */
KT_DATA["picture-es"] = {
  "review": [
    "所有西班牙语句子、问句和判断题由编写者自拟，还没有经过母语教师核对",
    "动作用一般现在时（Un perro duerme、Tres niños juegan al fútbol），没有用 estar + gerundio；请确认对 A1 的看图描述是否自然",
    "“在……上”统一用 encima de；页面把 en la mesa、sobre la mesa 也当作“在上面”，en el árbol／en el lago 同样按“在上面”核对",
    "Un hombre monta en bicicleta（西班牙说法；也说 va en bici、anda en bicicleta）",
    "La niña se pone un sombrero（动作）与 La niña lleva un sombrero（状态）的对比是否适合初学者",
    "推断的标记只认 creo que、a lo mejor、quizá(s)、tal vez、parece；quizá 后面用直陈式还是虚拟式没有涉及",
    "taza 与 café：学习者写 un café 时页面也算提到了杯子",
    "niño／niña 与 chico／chica：三个踢球的孩子统称 los niños，看书的是 el niño，戴帽子的是 la niña",
    "颜色（roja、gris、amarillo）只出现在范例句和词卡里，场景清单里没有颜色，页面不核对",
    "机器语音读整句的停顿不一定自然；任何一句都可以加 audio 换成真人录音"
  ],
  "id": "picture-es",
  "lang": "es",
  "speech": "es-ES",
  "scene": "park",
  "title": "看图说话：公园（西班牙语）",
  "titleEn": "Picture talk: the park (Spanish)",
  "subtitle": "一幅图，四件事：听句子指图、先自己说或写再对图核对、判断别人说得对不对、对着图提问。页面听不到你的声音，口头说的部分由你自己或搭档判断。",
  "subtitleEn": "One picture, four things to do: hear a sentence and point to it, say or write first and then check against the picture, judge whether someone else's description is right, and ask questions about the picture. The page cannot hear your voice; the spoken parts are judged by you or a partner.",
  "kcs": ["kt:es-hay-existence", "kt:es-act-describe-a1"],
  "readingLabel": null,
  "inferWords": "creo que, a lo mejor",
  "els": {
    "tree": {"name": "árbol", "names": ["árbol"], "say": "el árbol", "models": [{"t": "Hay un árbol grande en el parque.", "s": "hay", "g": "公园里有一棵大树。", "gEn": "There is a big tree in the park.", "x": ["está", "una"]}]},
    "bird": {"name": "pájaro", "names": ["pájaro"], "say": "el pájaro", "models": [{"t": "Hay un pájaro en el árbol.", "s": "hay", "g": "树上有一只鸟。", "gEn": "There is a bird in the tree.", "x": ["debajo", "una"]}, {"t": "El pájaro está en el árbol.", "s": "estar", "g": "鸟在树上。", "gEn": "The bird is in the tree.", "x": ["es"]}]},
    "dog": {"name": "perro", "names": ["perro"], "say": "el perro", "models": [{"t": "Un perro duerme debajo del árbol.", "s": "verb", "g": "一只狗在树下睡觉。", "gEn": "A dog is sleeping under the tree.", "x": ["encima", "duermen"]}, {"t": "Hay un perro debajo del árbol.", "s": "hay", "g": "树下有一只狗。", "gEn": "There is a dog under the tree.", "x": ["está"]}]},
    "bike": {"name": "bicicleta", "names": ["bicicleta", "bici"], "say": "la bicicleta", "models": [{"t": "Hay una bicicleta roja al lado del árbol.", "s": "hay", "g": "树旁边有一辆红色的自行车。", "gEn": "There is a red bike next to the tree.", "x": ["rojo", "un"]}]},
    "kids": {"name": "niños", "names": ["niños", "chicos"], "say": "los niños", "models": [{"t": "Hay tres niños.", "s": "hay", "g": "有三个孩子。", "gEn": "There are three children.", "x": ["niño", "están"]}, {"t": "Tres niños juegan al fútbol.", "s": "verb", "g": "三个孩子在踢足球。", "gEn": "Three children are playing football.", "x": ["juega", "a"]}]},
    "bench": {"name": "banco", "names": ["banco"], "say": "el banco", "models": [{"t": "Hay un banco al lado del lago.", "s": "hay", "g": "湖边有一张长椅。", "gEn": "There is a bench next to the lake.", "x": ["una", "de"]}]},
    "woman": {"name": "mujer", "names": ["mujer", "señora"], "say": "la mujer", "models": [{"t": "Una mujer está sentada en un banco.", "s": "estar", "g": "一位女士坐在长椅上。", "gEn": "A woman is sitting on a bench.", "x": ["sentado", "es"]}]},
    "lake": {"name": "lago", "names": ["lago"], "say": "el lago", "models": [{"t": "Hay un lago en el parque.", "s": "hay", "g": "公园里有一个湖。", "gEn": "There is a lake in the park.", "x": ["una", "es"]}]},
    "ducks": {"name": "patos", "names": ["patos", "pato"], "say": "los patos", "models": [{"t": "Hay dos patos en el lago.", "s": "hay", "g": "湖上有两只鸭子。", "gEn": "There are two ducks on the lake.", "x": ["pato", "están"]}]},
    "table": {"name": "mesa", "names": ["mesa"], "say": "la mesa", "models": [{"t": "Hay una mesa cerca del árbol.", "s": "hay", "g": "树附近有一张桌子。", "gEn": "There is a table near the tree.", "x": ["un", "es"]}]},
    "cup": {"name": "taza", "names": ["taza", "café"], "say": "la taza", "models": [{"t": "Hay una taza encima de la mesa.", "s": "hay", "g": "桌子上有一个杯子。", "gEn": "There is a cup on the table.", "x": ["debajo", "un"]}]},
    "cat": {"name": "gato", "names": ["gato"], "say": "el gato", "models": [{"t": "El gato está debajo de la mesa.", "s": "estar", "g": "猫在桌子下面。", "gEn": "The cat is under the table.", "x": ["encima", "es"]}, {"t": "El gato es gris.", "s": "ser", "g": "猫是灰色的。", "gEn": "The cat is grey.", "x": ["está", "grises"]}]},
    "boy": {"name": "niño", "names": ["niño", "chico"], "say": "el niño", "models": [{"t": "Un niño lee un libro.", "s": "verb", "g": "一个男孩在看书。", "gEn": "A boy is reading a book.", "x": ["leen", "una"]}]},
    "girl": {"name": "niña", "names": ["niña", "chica"], "say": "la niña", "models": [{"t": "Una niña habla por teléfono.", "s": "verb", "g": "一个女孩在打电话。", "gEn": "A girl is talking on the phone.", "x": ["hablan", "en"]}, {"t": "Lleva un sombrero amarillo.", "s": "verb", "g": "她戴着一顶黄色的帽子。", "gEn": "She is wearing a yellow hat.", "x": ["amarilla", "llevan"]}]}
  },
  "modelOrder": ["tree", "dog", "bird", "bike", "table", "cup", "cat", "bench", "woman", "lake", "ducks", "kids", "boy", "girl"],
  "absent": [
    {"id": "horse", "t": "Hay un caballo al lado del lago.", "g": "湖边有一匹马。", "gEn": "There is a horse next to the lake.", "why": "图上没有马。", "whyEn": "There is no horse in the picture."},
    {"id": "man", "t": "Un hombre monta en bicicleta.", "g": "一个男人在骑自行车。", "gEn": "A man is riding a bike.", "why": "图上有自行车，但没有人在骑，它停在树旁边。", "whyEn": "There is a bike in the picture, but nobody is riding it; it is parked next to the tree."}
  ],
  "judgeCats": [{"id": "ok", "label": "说得对", "labelEn": "Correct"}, {"id": "place", "label": "位置不对", "labelEn": "Wrong position"}, {"id": "count", "label": "数量不对", "labelEn": "Wrong number"}, {"id": "state", "label": "动作和状态弄混了", "labelEn": "Action and state mixed up"}, {"id": "infer", "label": "图上看不出来（没有，或只是推断）", "labelEn": "Cannot be seen in the picture (not there, or only an inference)"}],
  "judge": [
    {"id": "j1", "t": "Hay dos patos en el lago.", "el": "ducks", "v": "ok", "why": "两只鸭子，在湖上，都对得上。", "whyEn": "Two ducks, on the lake: it all matches.", "child": true},
    {"id": "j2", "t": "El gato está encima de la mesa.", "el": "cat", "v": "place", "claim": {"prep": "on", "ref": "table"}, "why": "猫在桌子下面：debajo de la mesa。半透明的那只是“按这句话它应该在的地方”。", "whyEn": "The cat is under the table: debajo de la mesa. The see-through one shows where it would be if this sentence were true.", "fix": "El gato está debajo de la mesa.", "child": true},
    {"id": "j3", "t": "Hay cuatro niños.", "el": "kids", "v": "count", "why": "数一数：三个，不是四个。", "whyEn": "Count them: three, not four.", "fix": "Hay tres niños.", "child": true},
    {"id": "j4", "t": "La niña se pone un sombrero.", "el": "girl", "v": "state", "why": "se pone 是“正在把帽子戴上”这个动作；图上帽子已经在头上了，是状态，用 lleva。", "whyEn": "se pone is the action of putting the hat on; in the picture the hat is already on her head, which is a state, so use lleva.", "fix": "La niña lleva un sombrero."},
    {"id": "j5", "t": "La mujer está cansada.", "el": "woman", "v": "infer", "why": "累不累从图上看不出来，这是推断。要说就用 creo que 标出来，不能当事实说。", "whyEn": "You cannot tell from the picture whether she is tired; this is an inference. If you say it, mark it with creo que; do not state it as fact.", "fix": "Creo que la mujer está cansada."},
    {"id": "j6", "t": "Un perro duerme debajo del árbol.", "el": "dog", "v": "ok", "why": "狗、在睡觉、在树下，都对得上。", "whyEn": "A dog, sleeping, under the tree: it all matches.", "child": true},
    {"id": "j7", "t": "Un hombre monta en la bicicleta.", "el": "bike", "v": "infer", "why": "图上没有男人，也没有人在骑车。图上没有的不能当事实说。", "whyEn": "There is no man in the picture, and nobody is riding the bike. What is not in the picture cannot be stated as fact.", "fix": "Hay una bicicleta al lado del árbol."}
  ],
  "questions": [
    {"id": "q1", "el": "dog", "intent": "问狗在哪儿", "intentEn": "Ask where the dog is", "k": ["¿Dónde", "está", "el perro", "?"], "a": "Está debajo del árbol.", "ag": "在树下。", "agEn": "It is under the tree.", "fact": {"type": "where", "el": "dog", "prep": "under", "ref": "tree"}, "child": true},
    {"id": "q2", "el": "cat", "intent": "问猫在哪儿", "intentEn": "Ask where the cat is", "k": ["¿Dónde", "está", "el gato", "?"], "a": "Está debajo de la mesa.", "ag": "在桌子下面。", "agEn": "It is under the table.", "fact": {"type": "where", "el": "cat", "prep": "under", "ref": "table"}, "child": true},
    {"id": "q3", "el": "ducks", "intent": "问有几只鸭子", "intentEn": "Ask how many ducks there are", "k": ["¿Cuántos", "patos", "hay", "?"], "a": "Hay dos.", "ag": "有两只。", "agEn": "There are two.", "fact": {"type": "count", "el": "ducks", "n": 2}, "child": true},
    {"id": "q4", "el": "kids", "intent": "问有几个孩子", "intentEn": "Ask how many children there are", "k": ["¿Cuántos", "niños", "hay", "?"], "a": "Hay tres.", "ag": "有三个。", "agEn": "There are three.", "fact": {"type": "count", "el": "kids", "n": 3}},
    {"id": "q5", "el": "boy", "intent": "问男孩在做什么", "intentEn": "Ask what the boy is doing", "k": ["¿Qué", "hace", "el niño", "?"], "a": "Lee un libro.", "ag": "他在看书。", "agEn": "He is reading a book.", "fact": {"type": "doing", "el": "boy", "act": "read"}, "child": true},
    {"id": "q6", "el": "kids", "intent": "问孩子们在做什么", "intentEn": "Ask what the children are doing", "k": ["¿Qué", "hacen", "los niños", "?"], "a": "Juegan al fútbol.", "ag": "他们在踢足球。", "agEn": "They are playing football.", "fact": {"type": "doing", "el": "kids", "act": "play-football"}},
    {"id": "q7", "el": "bird", "intent": "问树上有没有鸟", "intentEn": "Ask whether there is a bird in the tree", "k": ["¿Hay", "un pájaro", "en el árbol", "?"], "a": "Sí, hay un pájaro en el árbol.", "ag": "有，树上有一只鸟。", "agEn": "Yes, there is a bird in the tree.", "fact": {"type": "exists", "el": "bird", "prep": "in", "ref": "tree", "value": true}},
    {"id": "q8", "el": "dog", "intent": "问长椅上有没有狗", "intentEn": "Ask whether there is a dog on the bench", "k": ["¿Hay", "un perro", "en el banco", "?"], "a": "No. El perro está debajo del árbol.", "ag": "没有。狗在树下。", "agEn": "No. The dog is under the tree.", "fact": {"type": "exists", "el": "dog", "prep": "on", "ref": "bench", "value": false}},
    {"id": "q9", "el": "cup", "intent": "问杯子在哪儿", "intentEn": "Ask where the cup is", "k": ["¿Dónde", "está", "la taza", "?"], "a": "Está encima de la mesa.", "ag": "在桌子上。", "agEn": "It is on the table.", "fact": {"type": "where", "el": "cup", "prep": "on", "ref": "table"}}
  ],
  "askTip": "西班牙语的问句前面有 ¿，动词紧跟在疑问词后面：¿Dónde está el perro?，不是 ¿Dónde el perro está?。问有没有用 ¿Hay…?",
  "askTipEn": "A Spanish question opens with ¿, and the verb comes straight after the question word: ¿Dónde está el perro?, not ¿Dónde el perro está? To ask whether something is there, use ¿Hay…?",
  "parse": {"order": "prep-ref", "det": "(?:del|al|el|la|los|las|un|una)\\s+", "preps": {"on": ["encima de", "encima", "sobre", "en"], "under": ["debajo de", "debajo", "bajo"], "in": ["dentro de", "dentro"], "next_to": ["al lado de", "al lado", "junto a", "junto"]}, "numbers": {"dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6, "2": 2, "3": 3, "4": 4, "5": 5}, "inferMark": "(?:^|[^a-záéíóúñ])(creo que|a lo mejor|quiz[áa]s?|tal vez|parece|puede que)"},
  "structures": [
    {"id": "hay", "label": "Hay …", "re": "(?:^|[^a-záéíóúñ])hay\\s"},
    {"id": "estar", "label": "… está / están + lugar", "re": "\\best[áa]n?\\s+(en|encima|debajo|sobre|dentro|al lado|junto|cerca|sentad[oa]s?)\\b"},
    {"id": "verb", "label": "… + verbo (duerme, lee, juegan)", "re": "\\b(duerme|duermen|lee|leen|juega|juegan|habla|hablan|lleva|llevan|come|comen|corre|corren|nada|nadan|mira|miran)\\b"}
  ],
  "isPosition": "(encima|debajo|dentro|sobre|al lado|junto a|cerca|delante|detr[áa]s|entre|izquierda|derecha|\\ben (el|la|los|las|un|una)\\b)",
  "isAction": "\\b(duerme|duermen|lee|leen|juega|juegan|habla|hablan|come|comen|corre|corren|nada|nadan|\\w+ndo)\\b",
  "traps": [
    {"re": "\\bhay\\s+(el|la|los|las)\\b", "msg": "hay 引出的是新出现的东西，后面用 un／una 或数字，不用 el／la（*Hay el perro → Hay un perro）。", "msgEn": "hay introduces something new, so it takes un / una or a number, not el / la (*Hay el perro → Hay un perro)."},
    {"re": "\\b(es|son)\\s+(en|encima|debajo|al lado|dentro|sobre|junto)\\b", "msg": "说东西在哪儿用 estar，不用 ser：El gato está debajo de la mesa。", "msgEn": "To say where something is, use estar, not ser: El gato está debajo de la mesa."},
    {"re": "\\b(de el|a el)\\b", "msg": "de + el 要合写成 del，a + el 合写成 al：debajo del árbol、al lado del lago。", "msgEn": "de + el is written del, and a + el is written al: debajo del árbol, al lado del lago."},
    {"re": "\\bun\\s+(mesa|taza|bicicleta|mujer)\\b|\\buna\\s+(perro|gato|lago|banco|libro|sombrero|parque)\\b", "msg": "看一下 un／una：la mesa、la taza、la bicicleta 是阴性，el perro、el gato、el lago、el banco 是阳性。", "msgEn": "Check un / una: la mesa, la taza, la bicicleta are feminine; el perro, el gato, el lago, el banco are masculine."}
  ],
  "frames": ["Hay un / una … encima de / debajo de / al lado de …", "Hay dos / tres …", "El / La … está …", "Un / Una … + verbo"],
  "areaHint": ["左边还有什么？", "上面还有什么？", "右边的水上呢？", "最前面的人在做什么？"],
  "areaHintEn": ["What else is on the left?", "What else is at the top?", "What about on the water on the right?", "What are the people at the very front doing?"],
  "partner": "和搭档玩：一个人看着图问，另一个人回答；或者一个人描述，另一个人不看图，照着画或摆。口头说的页面听不到，不记分。",
  "partnerEn": "Play with a partner: one looks at the picture and asks, the other answers; or one describes while the other, without looking at the picture, draws or arranges it from the description. The page cannot hear what is said aloud and keeps no score for it."
};

/* French language pack for blocks/picture-talk.html (prim:picture-describe): picture-fr.
 * It reuses the park scene, KT_SCENES["park"] in data/picture-talk.js (the registry entry names that file under
 * `scenes`, and the page loads it first). Format: see the header of data/picture-talk.js; `gEn` / `agEn` are the
 * English glosses next to the Chinese `g` / `ag`.
 * parse / structures / traps are regular expressions over a controlled vocabulary; \b is avoided next to accented
 * letters. All sentences are original. Not yet checked by a native-speaking teacher: see `review`. */
KT_DATA["picture-fr"] = {
  "review": [
    "所有法语句子、问句和判断题由编写者自拟，还没有经过母语教师核对",
    "动作用一般现在时（Un chien dort、Trois enfants jouent au football），没有用 être en train de",
    "问数量用 Combien de canards est-ce qu'il y a ?；口语里的 Il y a combien de canards ? 和书面的 Combien de canards y a-t-il ? 没有收，词卡排成这两种会被判为不对",
    "问动作用 Que fait le garçon ?；Qu'est-ce que le garçon fait ? 没有收",
    "页面在问句末尾自己加问号，问号前没有法语排版要求的空格",
    "鸟的位置 dans l'arbre；sur l'arbre 页面也算对。鸭子 sur le lac；dans le lac 页面也算对",
    "Un homme fait du vélo 与 Un homme est à vélo",
    "La fille met un chapeau（动作）与 La fille porte un chapeau（状态）的对比是否适合初学者",
    "推断的标记只认 peut-être、je pense、je crois、on dirait、sans doute、probablement、a l'air",
    "tasse 与 café：学习者写 un café 时页面也算提到了杯子",
    "三个踢球的孩子统称 les enfants，看书的是 le garçon，戴帽子的是 la fille",
    "颜色（rouge、gris、jaune）只出现在范例句和词卡里，场景清单里没有颜色，页面不核对",
    "机器语音读整句的停顿和联诵不一定自然；任何一句都可以加 audio 换成真人录音"
  ],
  "id": "picture-fr",
  "lang": "fr",
  "speech": "fr-FR",
  "scene": "park",
  "title": "看图说话：公园（法语）",
  "titleEn": "Picture talk: the park (French)",
  "subtitle": "一幅图，四件事：听句子指图、先自己说或写再对图核对、判断别人说得对不对、对着图提问。页面听不到你的声音，口头说的部分由你自己或搭档判断。",
  "subtitleEn": "One picture, four things to do: hear a sentence and point to it, say or write first and then check against the picture, judge whether someone else's description is right, and ask questions about the picture. The page cannot hear your voice; the spoken parts are judged by you or a partner.",
  "kcs": ["kt:fr-g-il-y-a", "kt:fr-g-place-prepositions", "kt:fr-fn-describe-places"],
  "readingLabel": null,
  "inferWords": "peut-être, je pense que",
  "els": {
    "tree": {"name": "arbre", "names": ["arbre"], "say": "l'arbre", "models": [{"t": "Il y a un grand arbre dans le parc.", "s": "ilya", "g": "公园里有一棵大树。", "gEn": "There is a big tree in the park.", "k": ["Il y a", "un", "grand", "arbre", "dans", "le parc"], "x": ["grande", "est"]}]},
    "bird": {"name": "oiseau", "names": ["oiseau"], "say": "l'oiseau", "models": [{"t": "Il y a un oiseau dans l'arbre.", "s": "ilya", "g": "树上有一只鸟。", "gEn": "There is a bird in the tree.", "k": ["Il y a", "un", "oiseau", "dans", "l'arbre"], "x": ["sous", "une"]}, {"t": "L'oiseau est dans l'arbre.", "s": "etre", "g": "鸟在树上。", "gEn": "The bird is in the tree.", "k": ["L'oiseau", "est", "dans", "l'arbre"], "x": ["sont"]}]},
    "dog": {"name": "chien", "names": ["chien"], "say": "le chien", "models": [{"t": "Un chien dort sous l'arbre.", "s": "verb", "g": "一只狗在树下睡觉。", "gEn": "A dog is sleeping under the tree.", "k": ["Un", "chien", "dort", "sous", "l'arbre"], "x": ["sur", "dorment"]}, {"t": "Il y a un chien sous l'arbre.", "s": "ilya", "g": "树下有一只狗。", "gEn": "There is a dog under the tree.", "k": ["Il y a", "un", "chien", "sous", "l'arbre"], "x": ["est"]}]},
    "bike": {"name": "vélo", "names": ["vélo"], "say": "le vélo", "models": [{"t": "Il y a un vélo rouge à côté de l'arbre.", "s": "ilya", "g": "树旁边有一辆红色的自行车。", "gEn": "There is a red bike next to the tree.", "k": ["Il y a", "un", "vélo", "rouge", "à côté de", "l'arbre"], "x": ["une", "sous"]}]},
    "kids": {"name": "enfants", "names": ["enfants"], "say": "les enfants", "models": [{"t": "Il y a trois enfants.", "s": "ilya", "g": "有三个孩子。", "gEn": "There are three children.", "k": ["Il y a", "trois", "enfants"], "x": ["enfant", "sont"]}, {"t": "Trois enfants jouent au football.", "s": "verb", "g": "三个孩子在踢足球。", "gEn": "Three children are playing football.", "k": ["Trois", "enfants", "jouent", "au", "football"], "x": ["joue", "à"]}]},
    "bench": {"name": "banc", "names": ["banc"], "say": "le banc", "models": [{"t": "Il y a un banc à côté du lac.", "s": "ilya", "g": "湖边有一张长椅。", "gEn": "There is a bench next to the lake.", "k": ["Il y a", "un", "banc", "à côté", "du", "lac"], "x": ["de", "une"]}]},
    "woman": {"name": "femme", "names": ["femme", "dame"], "say": "la femme", "models": [{"t": "Une femme est assise sur un banc.", "s": "etre", "g": "一位女士坐在长椅上。", "gEn": "A woman is sitting on a bench.", "k": ["Une", "femme", "est", "assise", "sur", "un banc"], "x": ["assis", "dans"]}]},
    "lake": {"name": "lac", "names": ["lac"], "say": "le lac", "models": [{"t": "Il y a un lac dans le parc.", "s": "ilya", "g": "公园里有一个湖。", "gEn": "There is a lake in the park.", "k": ["Il y a", "un", "lac", "dans", "le parc"], "x": ["une", "est"]}]},
    "ducks": {"name": "canards", "names": ["canards", "canard"], "say": "les canards", "models": [{"t": "Il y a deux canards sur le lac.", "s": "ilya", "g": "湖上有两只鸭子。", "gEn": "There are two ducks on the lake.", "k": ["Il y a", "deux", "canards", "sur", "le lac"], "x": ["canard", "sous"]}]},
    "table": {"name": "table", "names": ["table"], "say": "la table", "models": [{"t": "Il y a une table près de l'arbre.", "s": "ilya", "g": "树附近有一张桌子。", "gEn": "There is a table near the tree.", "k": ["Il y a", "une", "table", "près de", "l'arbre"], "x": ["un", "est"]}]},
    "cup": {"name": "tasse", "names": ["tasse", "café"], "say": "la tasse", "models": [{"t": "Il y a une tasse sur la table.", "s": "ilya", "g": "桌子上有一个杯子。", "gEn": "There is a cup on the table.", "k": ["Il y a", "une", "tasse", "sur", "la table"], "x": ["sous", "un"]}]},
    "cat": {"name": "chat", "names": ["chat"], "say": "le chat", "models": [{"t": "Le chat est sous la table.", "s": "etre", "g": "猫在桌子下面。", "gEn": "The cat is under the table.", "k": ["Le chat", "est", "sous", "la table"], "x": ["sur", "sont"]}, {"t": "Le chat est gris.", "s": "etre", "g": "猫是灰色的。", "gEn": "The cat is grey.", "k": ["Le chat", "est", "gris"], "x": ["sont", "grise"]}]},
    "boy": {"name": "garçon", "names": ["garçon"], "say": "le garçon", "models": [{"t": "Un garçon lit un livre.", "s": "verb", "g": "一个男孩在看书。", "gEn": "A boy is reading a book.", "k": ["Un", "garçon", "lit", "un", "livre"], "x": ["lisent", "une"]}]},
    "girl": {"name": "fille", "names": ["fille"], "say": "la fille", "models": [{"t": "Une fille parle au téléphone.", "s": "verb", "g": "一个女孩在打电话。", "gEn": "A girl is talking on the phone.", "k": ["Une", "fille", "parle", "au", "téléphone"], "x": ["parlent", "à"]}, {"t": "Elle porte un chapeau jaune.", "s": "verb", "g": "她戴着一顶黄色的帽子。", "gEn": "She is wearing a yellow hat.", "k": ["Elle", "porte", "un", "chapeau", "jaune"], "x": ["portent", "une"]}]}
  },
  "modelOrder": ["tree", "dog", "bird", "bike", "table", "cup", "cat", "bench", "woman", "lake", "ducks", "kids", "boy", "girl"],
  "absent": [
    {"id": "horse", "t": "Il y a un cheval à côté du lac.", "g": "湖边有一匹马。", "gEn": "There is a horse next to the lake.", "why": "图上没有马：Il n'y a pas de cheval。", "whyEn": "There is no horse in the picture: Il n'y a pas de cheval."},
    {"id": "man", "t": "Un homme fait du vélo.", "g": "一个男人在骑自行车。", "gEn": "A man is riding a bike.", "why": "图上有自行车，但没有人在骑，它停在树旁边。", "whyEn": "There is a bike in the picture, but nobody is riding it; it is parked next to the tree."}
  ],
  "judgeCats": [{"id": "ok", "label": "说得对", "labelEn": "Correct"}, {"id": "place", "label": "位置不对", "labelEn": "Wrong position"}, {"id": "count", "label": "数量不对", "labelEn": "Wrong number"}, {"id": "state", "label": "动作和状态弄混了", "labelEn": "Action and state mixed up"}, {"id": "infer", "label": "图上看不出来（没有，或只是推断）", "labelEn": "Cannot be seen in the picture (not there, or only an inference)"}],
  "judge": [
    {"id": "j1", "t": "Il y a deux canards sur le lac.", "el": "ducks", "v": "ok", "why": "两只鸭子，在湖上，都对得上。", "whyEn": "Two ducks, on the lake: it all matches.", "child": true},
    {"id": "j2", "t": "Le chat est sur la table.", "el": "cat", "v": "place", "claim": {"prep": "on", "ref": "table"}, "why": "猫在桌子下面：sous la table。半透明的那只是“按这句话它应该在的地方”。", "whyEn": "The cat is under the table: sous la table. The see-through one shows where it would be if this sentence were true.", "fix": "Le chat est sous la table.", "child": true},
    {"id": "j3", "t": "Il y a quatre enfants.", "el": "kids", "v": "count", "why": "数一数：三个，不是四个。", "whyEn": "Count them: three, not four.", "fix": "Il y a trois enfants.", "child": true},
    {"id": "j4", "t": "La fille met un chapeau.", "el": "girl", "v": "state", "why": "met 是“正在把帽子戴上”这个动作；图上帽子已经在头上了，是状态，用 porte。", "whyEn": "met is the action of putting the hat on; in the picture the hat is already on her head, which is a state, so use porte.", "fix": "La fille porte un chapeau."},
    {"id": "j5", "t": "La femme est fatiguée.", "el": "woman", "v": "infer", "why": "累不累从图上看不出来，这是推断。要说就用 peut-être 标出来，不能当事实说。", "whyEn": "You cannot tell from the picture whether she is tired; this is an inference. If you say it, mark it with peut-être; do not state it as fact.", "fix": "La femme est peut-être fatiguée."},
    {"id": "j6", "t": "Un chien dort sous l'arbre.", "el": "dog", "v": "ok", "why": "狗、在睡觉、在树下，都对得上。", "whyEn": "A dog, sleeping, under the tree: it all matches.", "child": true},
    {"id": "j7", "t": "Un homme fait du vélo.", "el": "bike", "v": "infer", "why": "图上没有男人，也没有人在骑车。图上没有的不能当事实说。", "whyEn": "There is no man in the picture, and nobody is riding the bike. What is not in the picture cannot be stated as fact.", "fix": "Il y a un vélo à côté de l'arbre."}
  ],
  "questions": [
    {"id": "q1", "el": "dog", "intent": "问狗在哪儿", "intentEn": "Ask where the dog is", "k": ["Où", "est", "le chien", "?"], "a": "Il est sous l'arbre.", "ag": "在树下。", "agEn": "It is under the tree.", "fact": {"type": "where", "el": "dog", "prep": "under", "ref": "tree"}, "child": true},
    {"id": "q2", "el": "cat", "intent": "问猫在哪儿", "intentEn": "Ask where the cat is", "k": ["Où", "est", "le chat", "?"], "a": "Il est sous la table.", "ag": "在桌子下面。", "agEn": "It is under the table.", "fact": {"type": "where", "el": "cat", "prep": "under", "ref": "table"}, "child": true},
    {"id": "q3", "el": "ducks", "intent": "问有几只鸭子", "intentEn": "Ask how many ducks there are", "k": ["Combien", "de canards", "est-ce qu'il y a", "?"], "a": "Il y a deux canards.", "ag": "有两只鸭子。", "agEn": "There are two ducks.", "fact": {"type": "count", "el": "ducks", "n": 2}, "child": true},
    {"id": "q4", "el": "kids", "intent": "问有几个孩子", "intentEn": "Ask how many children there are", "k": ["Combien", "d'enfants", "est-ce qu'il y a", "?"], "a": "Il y a trois enfants.", "ag": "有三个孩子。", "agEn": "There are three children.", "fact": {"type": "count", "el": "kids", "n": 3}},
    {"id": "q5", "el": "boy", "intent": "问男孩在做什么", "intentEn": "Ask what the boy is doing", "k": ["Que", "fait", "le garçon", "?"], "a": "Il lit un livre.", "ag": "他在看书。", "agEn": "He is reading a book.", "fact": {"type": "doing", "el": "boy", "act": "read"}, "child": true},
    {"id": "q6", "el": "kids", "intent": "问孩子们在做什么", "intentEn": "Ask what the children are doing", "k": ["Que", "font", "les enfants", "?"], "a": "Ils jouent au football.", "ag": "他们在踢足球。", "agEn": "They are playing football.", "fact": {"type": "doing", "el": "kids", "act": "play-football"}},
    {"id": "q7", "el": "bird", "intent": "问树上有没有鸟", "intentEn": "Ask whether there is a bird in the tree", "k": ["Est-ce qu'il y a", "un oiseau", "dans l'arbre", "?"], "a": "Oui, il y a un oiseau dans l'arbre.", "ag": "有，树上有一只鸟。", "agEn": "Yes, there is a bird in the tree.", "fact": {"type": "exists", "el": "bird", "prep": "in", "ref": "tree", "value": true}},
    {"id": "q8", "el": "dog", "intent": "问长椅上有没有狗", "intentEn": "Ask whether there is a dog on the bench", "k": ["Est-ce qu'il y a", "un chien", "sur le banc", "?"], "a": "Non, il n'y a pas de chien sur le banc. Le chien est sous l'arbre.", "ag": "没有，长椅上没有狗。狗在树下。", "agEn": "No, there is no dog on the bench. The dog is under the tree.", "fact": {"type": "exists", "el": "dog", "prep": "on", "ref": "bench", "value": false}},
    {"id": "q9", "el": "cup", "intent": "问杯子在哪儿", "intentEn": "Ask where the cup is", "k": ["Où", "est", "la tasse", "?"], "a": "Elle est sur la table.", "ag": "在桌子上。", "agEn": "It is on the table.", "fact": {"type": "where", "el": "cup", "prep": "on", "ref": "table"}}
  ],
  "askTip": "用 où 提问时动词放在名词前面：Où est le chien ?。问有没有，用 Est-ce qu'il y a… 开头；问有几个，用 Combien de… est-ce qu'il y a ?",
  "askTipEn": "With où, the verb comes before the noun: Où est le chien ? To ask whether something is there, begin with Est-ce qu'il y a…; to ask how many, use Combien de… est-ce qu'il y a ?",
  "parse": {"order": "prep-ref", "det": "(?:(?:le|la|les|un|une|du|des|de la)\\s+|(?:de\\s+|d['’])?l['’])", "preps": {"on": ["sur"], "under": ["sous", "en dessous de", "en dessous"], "in": ["dans"], "next_to": ["à côté de", "à côté", "près de", "près", "au bord de", "au bord"]}, "numbers": {"deux": 2, "trois": 3, "quatre": 4, "cinq": 5, "six": 6, "2": 2, "3": 3, "4": 4, "5": 5}, "inferMark": "(peut-[êe]tre|je pense|je crois|on dirait|sans doute|probablement|a l['’]air)"},
  "structures": [
    {"id": "ilya", "label": "Il y a …", "re": "\\bil\\s+(n['’]\\s*)?y\\s+a\\b"},
    {"id": "etre", "label": "… est / sont + lieu", "re": "\\b(est|sont)\\s+(sur|sous|dans|à côté|près|devant|derrière|entre|assise?s?)"},
    {"id": "verb", "label": "… + verbe (dort, lit, jouent)", "re": "\\b(dort|dorment|lit|lisent|joue|jouent|parle|parlent|porte|portent|mange|mangent|court|courent|nage|nagent|regarde|regardent|fait|font)\\b"}
  ],
  "isPosition": "(\\bsur\\b|\\bsous\\b|\\bdans\\b|à côté|près d|devant|derrière|\\bentre\\b|gauche|droite|au bord)",
  "isAction": "\\b(dort|dorment|lit|lisent|joue|jouent|parle|parlent|mange|mangent|court|courent|nage|nagent|en train de)\\b",
  "traps": [
    {"re": "\\bil\\s+y\\s+a\\s+(le|la|les)\\s|\\bil\\s+y\\s+a\\s+l['’]", "msg": "il y a 引出的是新出现的东西，后面用 un／une／des 或数字，不用 le／la／les（*Il y a le chien → Il y a un chien）。", "msgEn": "il y a introduces something new, so it takes un / une / des or a number, not le / la / les (*Il y a le chien → Il y a un chien)."},
    {"re": "\\bn['’]\\s*y\\s+a\\s+pas\\s+(un|une|des)\\b", "msg": "il n'y a pas 后面的 un／une／des 要变成 de：Il n'y a pas de cheval。", "msgEn": "After il n'y a pas, un / une / des become de: Il n'y a pas de cheval."},
    {"re": "\\bde\\s+le\\b|(?:^|\\s)à\\s+le\\b", "msg": "de + le 要合写成 du，à + le 合写成 au：à côté du lac、au téléphone。", "msgEn": "de + le is written du, and à + le is written au: à côté du lac, au téléphone."},
    {"re": "\\b(le|la|de)\\s+(arbre|oiseau|enfant)", "msg": "在元音前 le／la／de 要省音：l'arbre、l'oiseau、près de l'arbre。", "msgEn": "Before a vowel, le / la / de drop their vowel: l'arbre, l'oiseau, près de l'arbre."},
    {"re": "\\bun\\s+(table|tasse|femme|fille)\\b|\\bune\\s+(chien|chat|lac|banc|livre|chapeau|parc|oiseau|arbre)\\b", "msg": "看一下 un／une：la table、la tasse 是阴性，le chien、le chat、le lac、le banc 是阳性。", "msgEn": "Check un / une: la table, la tasse are feminine; le chien, le chat, le lac, le banc are masculine."}
  ],
  "frames": ["Il y a un / une … sur / sous / à côté de …", "Il y a deux / trois …", "Le / La … est sur / sous / dans …", "Un / Une … + verbe"],
  "areaHint": ["左边还有什么？", "上面还有什么？", "右边的水上呢？", "最前面的人在做什么？"],
  "areaHintEn": ["What else is on the left?", "What else is at the top?", "What about on the water on the right?", "What are the people at the very front doing?"],
  "partner": "和搭档玩：一个人看着图问，另一个人回答；或者一个人描述，另一个人不看图，照着画或摆。口头说的页面听不到，不记分。",
  "partnerEn": "Play with a partner: one looks at the picture and asks, the other answers; or one describes while the other, without looking at the picture, draws or arranges it from the description. The page cannot hear what is said aloud and keeps no score for it."
};

/* Data for blocks/space-3d.html (prim:viewpoint-direction, with prim:listen-and-do for placing things):
 * KT_SCENES["space-3d"] (language-neutral scenes) and the packs space-3d-en, space-3d-ja, space-3d-zh.
 * Generated from a script; every target-language sentence is original.
 *
 * Scenes (KT_SCENES["space-3d"].scenes[id]) — one data object drawn either in 3D (Three.js) or as 2D drawings:
 *   coordinates in metres: x to the east (right on the map), z to the south (down on the map; the default camera
 *   looks from the south). face = the way a thing faces, in degrees: 0 north, 90 east, 180 south (toward the
 *   default camera), 270 west. Only things with a front of their own have a face (people, animals, the “you”
 *   figure, cars, buildings, doors, windows, posters, screens). Trees, balls, cups have none: that is the point
 *   of the “in front / behind / left / right” mode.
 *   title {zh,en}; big? (child scenes: things drawn larger); areas [{id, x, z, w, d, tone 1-4, label}];
 *   things [{id, kind, x, z, face?, color?, w?, d?, small?, label?}] — kinds: person, you, bear, rabbit, cat, apple,
 *     ball, cake, cup, phone, poster, window, door, laptop, file, screen, tower, umbrella, car, hotel, table.
 *     People and animals take their name from the pack's names; other things show label in the interface language.
 *     {aki} etc. in a label are replaced with the pack's names.
 *   path {thing, to: [x, z]}  what moves (come / go mode), from where the thing stands.
 *   slots {name: [x, z]}       positions offered in “Your turn” (make-here, make-come).
 *
 * Pack format
 *   speech, title(En), subtitle(En), kcs[], scenes ("space-3d"), names {figure id: name in the target language}
 *   demo   {speaker, listener, far}   the demonstrative for each zone, shown in the live readout after an answer.
 *   motion {to, away, selfToListener} the motion verb, likewise.
 *   dirs {front, back, left, right}, relFmt ("{dir} the {ref}" / "{ref}の{dir}"), refNames — readout in the frame mode.
 *   rules {here, come, frame} {zh,en}      the rule: shown at once for adults, after the first try for youth, never
 *                                          for children.
 *   compare {here, come, frame} {zh,en}    first-language comparison note (adults).
 *   items  mode "here" | "come": {id, mode, bands[], kc[], scene, speaker, listener, target (here), situation {zh,en},
 *            q (target-language sentence with ＿＿), r? (pinyin), forms [{t, ok?, also?, at?, say?}], extra? {zh,en},
 *            rev? (reverse half), swap?}
 *            at = what the listener would think if you said this form: "speaker" | "listener" | "far" (here: the
 *            zone the word points to) or "start" | "end" | a thing / area id (come: where the speaker would have to
 *            stand). say {zh,en} overrides the generic explanation. also = also acceptable (counted as right).
 *            swap {speaker, listener, situation, q, ans: change | same, forms} — the same thing or the same motion,
 *            told by the other person or from the other place. ans "same" is the reverse half: the word does not
 *            follow the change of speaker (far from both; near both; English / Chinese 来 toward a listener).
 *          mode "frame", kind "place": {viewer, ref, mover, word: front|back|left|right, frames: ["relative"] |
 *            ["intrinsic"] | both, q (full target-language sentence)} — the learner puts the mover on one of four
 *            numbered spots around ref. The page computes the right spot(s) from the geometry: relative = seen from
 *            the viewer's position; intrinsic = ref's own face. Two frames = ambiguous: the learner then says whether
 *            the other spot could also be meant (yes for both-frame items, no for one-frame items).
 *          mode "frame", kind "pick": {viewer, ref, mover, options [{t, ok?}]} — which sentence is true from the
 *            viewer's eyes. Looking through the viewer's eyes before answering is the reveal (counts as help).
 *          bands: which of child / youth / adult get the item.
 *   make   step 3 (“Your turn”): demoForms [{t, zone[]}], motionForms [{t, orient: to|away}], ignore[] (zh: words
 *          that contain 来 / 去 / 那 but are not the form), dirWords, refWords, words (true = match whole words, en),
 *          placeholder {here, come, frame}.
 *   review / reviewEn   items a native teacher should check.
 */

(function (g) { g.KT_SCENES = g.KT_SCENES || {}; g.KT_DATA = g.KT_DATA || {}; })(typeof window !== 'undefined' ? window : globalThis);

KT_SCENES["space-3d"] = {
 "figLabels": {
  "you": {
   "zh": "你",
   "en": "you"
  },
  "cat": {
   "zh": "猫",
   "en": "cat"
  }
 },
 "scenes": {
  "br-face": {
   "title": {
    "zh": "小熊和小兔面对面",
    "en": "Bear and Rabbit face to face"
   },
   "big": true,
   "things": [
    {
     "id": "bear",
     "kind": "bear",
     "x": -1.8,
     "z": 0,
     "face": 90
    },
    {
     "id": "rabbit",
     "kind": "rabbit",
     "x": 1.8,
     "z": 0,
     "face": 270
    },
    {
     "id": "apple",
     "kind": "apple",
     "x": -1.15,
     "z": 0.45,
     "label": {
      "zh": "苹果",
      "en": "apple"
     }
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 1.15,
     "z": 0.45,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 0,
     "z": -3.2,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    }
   ]
  },
  "br-side": {
   "title": {
    "zh": "小熊和小兔并排站",
    "en": "Bear and Rabbit side by side"
   },
   "big": true,
   "things": [
    {
     "id": "bear",
     "kind": "bear",
     "x": -0.7,
     "z": 1.2,
     "face": 0
    },
    {
     "id": "rabbit",
     "kind": "rabbit",
     "x": 0.7,
     "z": 1.2,
     "face": 0
    },
    {
     "id": "cake",
     "kind": "cake",
     "x": 0,
     "z": 0.3,
     "label": {
      "zh": "蛋糕",
      "en": "cake"
     }
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 0,
     "z": -3.4,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    }
   ]
  },
  "two-room": {
   "title": {
    "zh": "客厅：两人隔着几步",
    "en": "Living room, a few steps apart"
   },
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -2,
     "z": 0.3,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 2,
     "z": 0.3,
     "face": 270,
     "color": "#4f81bd"
    },
    {
     "id": "cup",
     "kind": "cup",
     "x": -1.45,
     "z": 0.75,
     "label": {
      "zh": "杯子",
      "en": "cup"
     }
    },
    {
     "id": "phone",
     "kind": "phone",
     "x": 1.45,
     "z": 0.75,
     "label": {
      "zh": "手机",
      "en": "phone"
     }
    },
    {
     "id": "poster",
     "kind": "poster",
     "x": 0,
     "z": -3.7,
     "face": 180,
     "label": {
      "zh": "海报",
      "en": "poster"
     }
    }
   ]
  },
  "door-window": {
   "title": {
    "zh": "教室：门口和窗边",
    "en": "Classroom: by the door and by the window"
   },
   "areas": [
    {
     "id": "doorside",
     "x": -3.2,
     "z": 1.2,
     "w": 1.8,
     "d": 1.8,
     "tone": 1,
     "label": {
      "zh": "门口",
      "en": "by the door"
     }
    },
    {
     "id": "windowside",
     "x": 2.9,
     "z": -1.6,
     "w": 1.8,
     "d": 1.8,
     "tone": 2,
     "label": {
      "zh": "窗边",
      "en": "by the window"
     }
    }
   ],
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -3.2,
     "z": 1.2,
     "face": 70,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 2.6,
     "z": -1.6,
     "face": 250,
     "color": "#4f81bd"
    },
    {
     "id": "window",
     "kind": "window",
     "x": 3.7,
     "z": -1.6,
     "face": 270,
     "label": {
      "zh": "窗户",
      "en": "window"
     }
    },
    {
     "id": "toilet",
     "kind": "door",
     "x": 0.4,
     "z": -4.0,
     "face": 180,
     "label": {
      "zh": "洗手间",
      "en": "toilet"
     }
    }
   ]
  },
  "meeting": {
   "title": {
    "zh": "会议室",
    "en": "Meeting room"
   },
   "things": [
    {
     "id": "table",
     "kind": "table",
     "x": 0,
     "z": 0,
     "w": 2.6,
     "d": 1.2
    },
    {
     "id": "aki",
     "kind": "person",
     "x": -1.9,
     "z": 0,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 1.9,
     "z": 0,
     "face": 270,
     "color": "#4f81bd"
    },
    {
     "id": "laptop",
     "kind": "laptop",
     "x": -1.1,
     "z": 0.1,
     "label": {
      "zh": "笔记本电脑",
      "en": "laptop"
     }
    },
    {
     "id": "file",
     "kind": "file",
     "x": 1.1,
     "z": -0.15,
     "label": {
      "zh": "文件",
      "en": "file"
     }
    },
    {
     "id": "screen",
     "kind": "screen",
     "x": 0,
     "z": -3.8,
     "face": 180,
     "label": {
      "zh": "屏幕",
      "en": "screen"
     }
    }
   ]
  },
  "side-window": {
   "title": {
    "zh": "窗前并排站着",
    "en": "Side by side at the window"
   },
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -0.55,
     "z": 1.6,
     "face": 0,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 0.55,
     "z": 1.6,
     "face": 0,
     "color": "#4f81bd"
    },
    {
     "id": "table",
     "kind": "table",
     "x": 0,
     "z": 0.75,
     "w": 1.2,
     "d": 0.6
    },
    {
     "id": "brochure",
     "kind": "file",
     "x": 0,
     "z": 0.7,
     "label": {
      "zh": "小册子",
      "en": "brochure"
     }
    },
    {
     "id": "tower",
     "kind": "tower",
     "x": 0.6,
     "z": -3.8,
     "label": {
      "zh": "大楼",
      "en": "tower block"
     }
    }
   ]
  },
  "cat-rooms": {
   "title": {
    "zh": "厨房和客厅",
    "en": "Kitchen and living room"
   },
   "big": true,
   "areas": [
    {
     "id": "kitchen",
     "x": -2.1,
     "z": 0,
     "w": 4,
     "d": 6,
     "tone": 1,
     "label": {
      "zh": "厨房",
      "en": "kitchen"
     }
    },
    {
     "id": "living",
     "x": 2.1,
     "z": 0,
     "w": 4,
     "d": 6,
     "tone": 2,
     "label": {
      "zh": "客厅",
      "en": "living room"
     }
    }
   ],
   "things": [
    {
     "id": "bear",
     "kind": "bear",
     "x": -2.8,
     "z": -1.2,
     "face": 90
    },
    {
     "id": "rabbit",
     "kind": "rabbit",
     "x": 2.8,
     "z": -1.2,
     "face": 270
    },
    {
     "id": "cat",
     "kind": "cat",
     "x": 2,
     "z": 1.2,
     "face": 270,
     "label": {
      "zh": "猫",
      "en": "cat"
     }
    }
   ],
   "path": {
    "thing": "cat",
    "to": [
     -2,
     1.2
    ]
   }
  },
  "ball-roll": {
   "title": {
    "zh": "球滚过去",
    "en": "The ball rolls"
   },
   "big": true,
   "things": [
    {
     "id": "bear",
     "kind": "bear",
     "x": -2.2,
     "z": 0,
     "face": 90
    },
    {
     "id": "rabbit",
     "kind": "rabbit",
     "x": 2.2,
     "z": 0,
     "face": 270
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": -1.4,
     "z": 0.3,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ],
   "path": {
    "thing": "ball",
    "to": [
     1.4,
     0.3
    ]
   }
  },
  "call-door": {
   "title": {
    "zh": "门口有人叫你",
    "en": "Someone calls from the front door"
   },
   "areas": [
    {
     "id": "hall",
     "x": -2.6,
     "z": 0,
     "w": 3,
     "d": 5,
     "tone": 1,
     "label": {
      "zh": "门口",
      "en": "front door"
     }
    },
    {
     "id": "room",
     "x": 2,
     "z": 0,
     "w": 4,
     "d": 5,
     "tone": 2,
     "label": {
      "zh": "房间",
      "en": "room"
     }
    }
   ],
   "things": [
    {
     "id": "mum",
     "kind": "person",
     "x": -3.2,
     "z": 0,
     "face": 90,
     "color": "#9b59b6"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 2.6,
     "z": 0,
     "face": 270,
     "color": "#4f81bd"
    }
   ],
   "path": {
    "thing": "ben",
    "to": [
     -2.2,
     0
    ]
   }
  },
  "home-school": {
   "title": {
    "zh": "家和学校",
    "en": "Home and school"
   },
   "big": true,
   "areas": [
    {
     "id": "home",
     "x": -2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 1,
     "label": {
      "zh": "家",
      "en": "home"
     }
    },
    {
     "id": "school",
     "x": 2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 2,
     "label": {
      "zh": "学校",
      "en": "school"
     }
    }
   ],
   "things": [
    {
     "id": "mum",
     "kind": "person",
     "x": -3.6,
     "z": -1,
     "face": 90,
     "color": "#9b59b6"
    },
    {
     "id": "kid",
     "kind": "person",
     "x": -2.4,
     "z": 0.2,
     "face": 90,
     "color": "#2e8b57",
     "small": true
    },
    {
     "id": "umbrella",
     "kind": "umbrella",
     "x": -1.8,
     "z": 1.0,
     "label": {
      "zh": "伞",
      "en": "umbrella"
     }
    },
    {
     "id": "teacher",
     "kind": "person",
     "x": 3.6,
     "z": -1,
     "face": 270,
     "color": "#b7791f"
    }
   ],
   "path": {
    "thing": "umbrella",
    "to": [
     2.0,
     1.0
    ]
   }
  },
  "come-home": {
   "title": {
    "zh": "放学了",
    "en": "After school"
   },
   "areas": [
    {
     "id": "home",
     "x": -2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 1,
     "label": {
      "zh": "家",
      "en": "home"
     }
    },
    {
     "id": "school",
     "x": 2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 2,
     "label": {
      "zh": "学校",
      "en": "school"
     }
    }
   ],
   "things": [
    {
     "id": "mum",
     "kind": "person",
     "x": -3.4,
     "z": -0.6,
     "face": 90,
     "color": "#9b59b6"
    },
    {
     "id": "kid",
     "kind": "person",
     "x": 2.4,
     "z": 0.6,
     "face": 270,
     "color": "#2e8b57",
     "small": true
    },
    {
     "id": "teacher",
     "kind": "person",
     "x": 3.6,
     "z": -1.2,
     "face": 270,
     "color": "#b7791f"
    }
   ],
   "path": {
    "thing": "kid",
    "to": [
     -2.0,
     0.6
    ]
   }
  },
  "trip": {
   "title": {
    "zh": "出差",
    "en": "A business trip"
   },
   "areas": [
    {
     "id": "tokyo",
     "x": -2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 1,
     "label": {
      "zh": "东京办公室",
      "en": "Tokyo office"
     }
    },
    {
     "id": "osaka",
     "x": 2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 2,
     "label": {
      "zh": "大阪办公室",
      "en": "Osaka office"
     }
    }
   ],
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -3.4,
     "z": -1.2,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 3.4,
     "z": -1.2,
     "face": 270,
     "color": "#4f81bd"
    },
    {
     "id": "tanaka",
     "kind": "person",
     "x": -2.2,
     "z": 0.8,
     "face": 90,
     "color": "#7a7f85"
    }
   ],
   "path": {
    "thing": "tanaka",
    "to": [
     2.2,
     0.8
    ]
   }
  },
  "party": {
   "title": {
    "zh": "周六的聚会",
    "en": "A party on Saturday"
   },
   "areas": [
    {
     "id": "akihome",
     "x": -2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 1,
     "label": {
      "zh": "{aki}家",
      "en": "{aki}'s home"
     }
    },
    {
     "id": "benhome",
     "x": 2.7,
     "z": 0,
     "w": 3.6,
     "d": 5,
     "tone": 2,
     "label": {
      "zh": "{ben}家（聚会）",
      "en": "{ben}'s home (party)"
     }
    }
   ],
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -3.2,
     "z": 0.4,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 3.4,
     "z": -0.6,
     "face": 270,
     "color": "#4f81bd"
    },
    {
     "id": "cake",
     "kind": "cake",
     "x": 3.2,
     "z": 1.2,
     "label": {
      "zh": "蛋糕",
      "en": "cake"
     }
    }
   ],
   "path": {
    "thing": "aki",
    "to": [
     2.0,
     0.6
    ]
   }
  },
  "bear-tree": {
   "title": {
    "zh": "你、树和小熊",
    "en": "You, a tree and Bear"
   },
   "big": true,
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": -1.6,
     "z": -0.3,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    },
    {
     "id": "bear",
     "kind": "bear",
     "x": 1.6,
     "z": -0.3,
     "face": 90
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 3.4,
     "z": 2.6,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "bear-far-e": {
   "title": {
    "zh": "小熊在树的另一边",
    "en": "Bear on the other side of the tree"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 0,
     "z": 0,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    },
    {
     "id": "bear",
     "kind": "bear",
     "x": 0,
     "z": -3.4,
     "face": 180
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 1.4,
     "z": 0,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "bear-far-n": {
   "title": {
    "zh": "小熊在树的另一边",
    "en": "Bear on the other side of the tree"
   },
   "big": true,
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 0,
     "z": 0,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    },
    {
     "id": "bear",
     "kind": "bear",
     "x": 0,
     "z": -3.4,
     "face": 180
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 0,
     "z": -1.4,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "car-side": {
   "title": {
    "zh": "路边：一辆车横着停",
    "en": "Roadside: a car parked sideways"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "car",
     "kind": "car",
     "x": -1.2,
     "z": 0,
     "face": 270,
     "label": {
      "zh": "车",
      "en": "car"
     }
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 2.4,
     "z": -0.6,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 3.6,
     "z": 2.6,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "car-facing": {
   "title": {
    "zh": "车头朝着你",
    "en": "A car facing you"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "car",
     "kind": "car",
     "x": 0,
     "z": -0.2,
     "face": 180,
     "label": {
      "zh": "车",
      "en": "car"
     }
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 3.4,
     "z": 2.6,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "ben-facing": {
   "title": {
    "zh": "{ben}面朝着你",
    "en": "{ben} facing you"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 0,
     "z": -0.2,
     "face": 180,
     "color": "#4f81bd"
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 3.4,
     "z": 2.6,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  },
  "taxi-hotel": {
   "title": {
    "zh": "坐出租车到酒店",
    "en": "A taxi to the hotel"
   },
   "things": [
    {
     "id": "hotel",
     "kind": "hotel",
     "x": 0,
     "z": -1.2,
     "face": 0,
     "w": 3.2,
     "d": 2.2,
     "label": {
      "zh": "酒店（门朝北）",
      "en": "hotel (door on the far side)"
     }
    },
    {
     "id": "taxi",
     "kind": "car",
     "x": -3.2,
     "z": 2.6,
     "face": 90,
     "label": {
      "zh": "出租车",
      "en": "taxi"
     },
     "color": "#e0b030"
    }
   ]
  },
  "meeting-lr": {
   "title": {
    "zh": "会议桌两边",
    "en": "Across the meeting table"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 1.5,
     "face": 0
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 0,
     "z": -1.5,
     "face": 180,
     "color": "#4f81bd"
    },
    {
     "id": "table",
     "kind": "table",
     "x": 0,
     "z": 0,
     "w": 1.6,
     "d": 1.4
    },
    {
     "id": "window",
     "kind": "window",
     "x": -3.8,
     "z": 0,
     "face": 90,
     "label": {
      "zh": "窗户",
      "en": "window"
     }
    },
    {
     "id": "door",
     "kind": "door",
     "x": 3.8,
     "z": 0,
     "face": 270,
     "label": {
      "zh": "门",
      "en": "door"
     }
    }
   ]
  },
  "make-here": {
   "title": {
    "zh": "自己摆：谁说话，东西在哪",
    "en": "Your turn: who speaks, where the thing is"
   },
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -2,
     "z": 0.3,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "ben",
     "kind": "person",
     "x": 2,
     "z": 0.3,
     "face": 270,
     "color": "#4f81bd"
    },
    {
     "id": "cup",
     "kind": "cup",
     "x": -1.45,
     "z": 0.75,
     "label": {
      "zh": "杯子",
      "en": "cup"
     }
    }
   ],
   "slots": {
    "nearA": [
     -1.45,
     0.75
    ],
    "nearB": [
     1.45,
     0.75
    ],
    "far": [
     0,
     -3.6
    ]
   }
  },
  "make-come": {
   "title": {
    "zh": "自己摆：说话的人在哪，猫往哪儿走",
    "en": "Your turn: where the speaker is, which way the cat goes"
   },
   "areas": [
    {
     "id": "kitchen",
     "x": -2.1,
     "z": 0,
     "w": 4,
     "d": 6,
     "tone": 1,
     "label": {
      "zh": "厨房",
      "en": "kitchen"
     }
    },
    {
     "id": "living",
     "x": 2.1,
     "z": 0,
     "w": 4,
     "d": 6,
     "tone": 2,
     "label": {
      "zh": "客厅",
      "en": "living room"
     }
    }
   ],
   "things": [
    {
     "id": "aki",
     "kind": "person",
     "x": -2.8,
     "z": -1.2,
     "face": 90,
     "color": "#c0504d"
    },
    {
     "id": "cat",
     "kind": "cat",
     "x": 2,
     "z": 1.2,
     "face": 270,
     "label": {
      "zh": "猫",
      "en": "cat"
     }
    }
   ],
   "path": {
    "thing": "cat",
    "to": [
     -2,
     1.2
    ]
   },
   "slots": {
    "kitchen": [
     -2.8,
     -1.2
    ],
    "living": [
     2.8,
     -1.2
    ]
   }
  },
  "make-frame": {
   "title": {
    "zh": "自己摆：球放在哪儿",
    "en": "Your turn: where the ball goes"
   },
   "things": [
    {
     "id": "you",
     "kind": "you",
     "x": 0,
     "z": 3.6,
     "face": 0
    },
    {
     "id": "car",
     "kind": "car",
     "x": -1.2,
     "z": 0,
     "face": 270,
     "label": {
      "zh": "车",
      "en": "car"
     }
    },
    {
     "id": "tree",
     "kind": "tree",
     "x": 2.4,
     "z": -0.6,
     "label": {
      "zh": "树",
      "en": "tree"
     }
    },
    {
     "id": "ball",
     "kind": "ball",
     "x": 3.6,
     "z": 2.6,
     "label": {
      "zh": "球",
      "en": "ball"
     }
    }
   ]
  }
 }
};

KT_DATA["space-3d-en"] = {
 "id": "space-3d-en",
 "lang": "en",
 "speech": "en-US",
 "scenes": "space-3d",
 "title": "空间与视点（英语）：this／that、come／go、前后左右",
 "titleEn": "Space and viewpoint (English): this / that, come / go, front / behind / left / right",
 "subtitle": "在可以转动的场景里换到说话人、听话人或别人的眼睛，看哪个词跟着视点变、哪个不变。",
 "subtitleEn": "Turn the scene and look through the speaker’s, the listener’s or someone else’s eyes: see which word changes with the viewpoint and which does not.",
 "kcs": [
  "kt:en-demonstratives",
  "kt:en-adverbs-place-manner",
  "kt:en-lex-basic-verbs",
  "kt:en-prepositions-place"
 ],
 "names": {
  "aki": "Amy",
  "ben": "Ben",
  "mum": "Mum",
  "kid": "Leo",
  "teacher": "Ms Hill",
  "tanaka": "Mr Tanaka",
  "bear": "Bear",
  "rabbit": "Rabbit",
  "you": "you"
 },
 "demo": {
  "speaker": "this",
  "listener": "that",
  "far": "that"
 },
 "motion": {
  "to": "come",
  "away": "go",
  "selfToListener": "come"
 },
 "dirs": {
  "front": "in front of",
  "back": "behind",
  "left": "to the left of",
  "right": "to the right of"
 },
 "relFmt": "{dir} the {ref}",
 "refNames": {
  "tree": "tree",
  "car": "car",
  "bear": "Bear",
  "ben": "Ben",
  "hotel": "hotel",
  "table": "table"
 },
 "rules": {
  "here": {
   "zh": "this／here：离说话人近。that／there：离说话人远——在听话人身边也好，离两个人都远也好，都是 that。",
   "en": "this / here: near the speaker. that / there: away from the speaker, whether it is by the listener or far from both."
  },
  "come": {
   "zh": "come／bring：朝说话人所在的地方，也可以朝听话人所在的地方（I'm coming、Can I come to your party?）。go／take：朝别处。",
   "en": "come / bring: toward where the speaker is, and also toward where the listener is (I'm coming, Can I come to your party?). go / take: anywhere else."
  },
  "frame": {
   "zh": "树、球没有自己的前后左右，按看的人说（相对参照）。车、人、房子有自己的前面，in front of the car 一般按车头说（固有参照），也可以按看的人说，所以 left of the car 有两种理解。on Ben's left 只按 Ben 自己说。",
   "en": "A tree or a ball has no front or left of its own: you say it from the viewer (relative frame). A car, a person or a building has its own front: in front of the car usually means at the car’s front (intrinsic frame), but can also be said from the viewer, so left of the car has two readings. On Ben’s left is Ben’s own left only."
  }
 },
 "compare": {
  "here": {
   "zh": "和汉语一样只分两级：this≈这，that≈那。",
   "en": "If your first language has three steps (Japanese ko / so / a, Korean i / geu / jeo), note that English has two: what is by the listener is that."
  },
  "come": {
   "zh": "汉语有人叫你时也说“来了”，和 I'm coming 一样；但“我去你家”在英语里常说 I'll come to your place。",
   "en": "Some languages (Japanese, for one) cannot use come for moving toward the listener; English can: I'm coming, I'll come to your place."
  },
  "frame": {
   "zh": "和汉语“树的左边、车的前边”一样，也有同样的歧义。",
   "en": "Many languages have the same two readings of “left of the car”."
  }
 },
 "make": {
  "demoForms": [
   {
    "t": "this",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "these",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "here",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "that",
    "zone": [
     "listener",
     "far"
    ]
   },
   {
    "t": "those",
    "zone": [
     "listener",
     "far"
    ]
   },
   {
    "t": "there",
    "zone": [
     "listener",
     "far"
    ]
   }
  ],
  "motionForms": [
   {
    "t": "come",
    "orient": "to"
   },
   {
    "t": "comes",
    "orient": "to"
   },
   {
    "t": "came",
    "orient": "to"
   },
   {
    "t": "coming",
    "orient": "to"
   },
   {
    "t": "bring",
    "orient": "to"
   },
   {
    "t": "brings",
    "orient": "to"
   },
   {
    "t": "brought",
    "orient": "to"
   },
   {
    "t": "bringing",
    "orient": "to"
   },
   {
    "t": "go",
    "orient": "away"
   },
   {
    "t": "goes",
    "orient": "away"
   },
   {
    "t": "went",
    "orient": "away"
   },
   {
    "t": "going",
    "orient": "away"
   },
   {
    "t": "gone",
    "orient": "away"
   },
   {
    "t": "take",
    "orient": "away"
   },
   {
    "t": "takes",
    "orient": "away"
   },
   {
    "t": "took",
    "orient": "away"
   },
   {
    "t": "taking",
    "orient": "away"
   },
   {
    "t": "taken",
    "orient": "away"
   }
  ],
  "dirWords": {
   "front": [
    "in front of"
   ],
   "back": [
    "behind"
   ],
   "left": [
    "left"
   ],
   "right": [
    "right"
   ]
  },
  "refWords": {
   "tree": [
    "tree"
   ],
   "car": [
    "car"
   ]
  },
  "words": true,
  "placeholder": {
   "here": {
    "zh": "例：Is that your cup?",
    "en": "e.g. Is that your cup?"
   },
   "come": {
    "zh": "例：The cat came into the kitchen.",
    "en": "e.g. The cat came into the kitchen."
   },
   "frame": {
    "zh": "例：The ball is behind the tree.",
    "en": "e.g. The ball is behind the tree."
   }
  }
 },
 "items": [
  {
   "id": "h-apple",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "apple",
   "situation": {
    "zh": "Bear在跟Rabbit说话，说的是自己身边的苹果。",
    "en": "Bear is talking to Rabbit about the apple next to Bear."
   },
   "q": "＿＿ is my apple.",
   "forms": [
    {
     "t": "This",
     "ok": true
    },
    {
     "t": "That",
     "at": "listener"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在Rabbit说话，说的是同一个苹果。",
     "en": "Now Rabbit speaks about the same apple."
    },
    "q": "＿＿ is Bear's apple.",
    "ans": "change",
    "forms": [
     {
      "t": "That",
      "ok": true
     },
     {
      "t": "This",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-ball",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "ball",
   "situation": {
    "zh": "Bear问Rabbit：Rabbit身边的球是不是Rabbit的？",
    "en": "Bear asks Rabbit about the ball next to Rabbit."
   },
   "q": "Is ＿＿ your ball?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在Rabbit回答。",
     "en": "Now Rabbit answers."
    },
    "q": "Yes, ＿＿ is my ball.",
    "ans": "change",
    "forms": [
     {
      "t": "this",
      "ok": true
     },
     {
      "t": "that",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-tree",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "tree",
   "situation": {
    "zh": "Bear问Rabbit：远处那棵树是什么树？",
    "en": "Bear asks Rabbit about the tree far away."
   },
   "q": "What tree is ＿＿?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在Rabbit回答。树离两个人都远。",
     "en": "Now Rabbit answers. The tree is far from both of them."
    },
    "q": "＿＿ is an apple tree.",
    "ans": "same",
    "forms": [
     {
      "t": "That",
      "ok": true
     },
     {
      "t": "This",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-cake",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "br-side",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "cake",
   "situation": {
    "zh": "Bear和Rabbit并排站着，蛋糕就在两个人前面。Bear说：",
    "en": "Bear and Rabbit stand side by side; the cake is right in front of both. Bear says:"
   },
   "q": "＿＿ cake looks yummy!",
   "forms": [
    {
     "t": "This",
     "ok": true
    },
    {
     "t": "That",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在Rabbit说。蛋糕离两个人一样近。",
     "en": "Now Rabbit speaks. The cake is just as near to both."
    },
    "q": "Yes, ＿＿ cake looks yummy!",
    "ans": "same",
    "forms": [
     {
      "t": "this",
      "ok": true
     },
     {
      "t": "that",
      "at": "far"
     }
    ]
   }
  },
  {
   "id": "h-phone",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "phone",
   "situation": {
    "zh": "Amy和Ben在客厅里，隔着几步。Amy问Ben手边的手机：",
    "en": "Amy and Ben are a few steps apart in the living room. Amy asks about the phone by Ben:"
   },
   "q": "Is ＿＿ your new phone?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben回答，说的是同一部手机。",
     "en": "Ben answers about the same phone."
    },
    "q": "Yes, I got ＿＿ last month.",
    "ans": "change",
    "forms": [
     {
      "t": "this",
      "ok": true
     },
     {
      "t": "that",
      "at": "listener"
     }
    ]
   },
   "extra": {
    "zh": "英语只分两级：this 离说话人近，that 是其余的。",
    "en": "English has two steps: this near the speaker, that for the rest."
   }
  },
  {
   "id": "h-cup",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "ben",
   "listener": "aki",
   "target": "cup",
   "situation": {
    "zh": "Ben问Amy身边的杯子是谁的。",
    "en": "Ben asks whose cup is next to Amy."
   },
   "q": "Whose cup is ＿＿?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "aki",
    "listener": "ben",
    "situation": {
     "zh": "Amy回答。",
     "en": "Amy answers."
    },
    "q": "＿＿ is mine.",
    "ans": "change",
    "forms": [
     {
      "t": "This",
      "ok": true
     },
     {
      "t": "That",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-poster",
   "mode": "here",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "poster",
   "situation": {
    "zh": "Amy问墙上的海报，海报离两个人都远。",
    "en": "Amy asks about the poster on the far wall, far from both of them."
   },
   "q": "What's ＿＿ poster?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben回答。",
     "en": "Ben answers."
    },
    "q": "＿＿'s a film poster.",
    "ans": "same",
    "forms": [
     {
      "t": "That",
      "ok": true
     },
     {
      "t": "This",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-cold",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-adverbs-place-manner"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "window",
   "situation": {
    "zh": "Amy在门口，Ben坐在窗边。Amy问Ben那边冷不冷。",
    "en": "Amy is by the door, Ben sits by the window. Amy asks if it is cold where Ben is."
   },
   "q": "Is it cold over ＿＿?",
   "forms": [
    {
     "t": "there",
     "ok": true
    },
    {
     "t": "here",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben回答。",
     "en": "Ben answers."
    },
    "q": "Yes, it's cold over ＿＿.",
    "ans": "change",
    "forms": [
     {
      "t": "here",
      "ok": true
     },
     {
      "t": "there",
      "at": "listener"
     }
    ]
   },
   "extra": {
    "zh": "说地方用 here／there。",
    "en": "For places use here / there."
   }
  },
  {
   "id": "h-toilet",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-adverbs-place-manner"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "toilet",
   "situation": {
    "zh": "Ben问洗手间在哪儿，Amy指着远处的门回答。",
    "en": "Ben asks where the toilet is; Amy points at the far door."
   },
   "q": "The toilet is over ＿＿.",
   "forms": [
    {
     "t": "there",
     "ok": true
    },
    {
     "t": "here",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben看着那扇门确认。",
     "en": "Ben looks at that door and checks."
    },
    "q": "Over ＿＿? Thanks!",
    "ans": "same",
    "forms": [
     {
      "t": "there",
      "ok": true
     },
     {
      "t": "here",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-file",
   "mode": "here",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "meeting",
   "speaker": "aki",
   "listener": "ben",
   "target": "file",
   "situation": {
    "zh": "开会时，Amy请对面的Ben把他手边的文件递过来。",
    "en": "In a meeting, Amy asks Ben, across the table, to pass the file by his hand."
   },
   "q": "Could you pass me ＿＿ file?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben拿起文件确认。",
     "en": "Ben picks up the file and checks."
    },
    "q": "＿＿ one?",
    "ans": "change",
    "forms": [
     {
      "t": "This",
      "ok": true
     },
     {
      "t": "That",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-brochure",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "brochure",
   "situation": {
    "zh": "Amy和Ben并排站着，一起看两人面前的小册子。",
    "en": "Amy and Ben stand side by side, both looking at the brochure in front of them."
   },
   "q": "＿＿ brochure is really clear.",
   "forms": [
    {
     "t": "This",
     "ok": true
    },
    {
     "t": "That",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben接着说。小册子离两个人一样近。",
     "en": "Ben replies. The brochure is just as near to both."
    },
    "q": "Yes, ＿＿ one is much better.",
    "ans": "same",
    "forms": [
     {
      "t": "this",
      "ok": true
     },
     {
      "t": "that",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "两个人站在一起、面对同一样东西，近处的东西两个人都说 this。",
    "en": "Two people standing together both say this for what is near them."
   }
  },
  {
   "id": "h-tower",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-demonstratives"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "tower",
   "situation": {
    "zh": "Amy指着窗外远处的大楼问。",
    "en": "Amy points at the tower block far outside the window."
   },
   "q": "What's ＿＿ building?",
   "forms": [
    {
     "t": "that",
     "ok": true
    },
    {
     "t": "this",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben回答。",
     "en": "Ben answers."
    },
    "q": "＿＿'s the town hall.",
    "ans": "same",
    "forms": [
     {
      "t": "That",
      "ok": true
     },
     {
      "t": "This",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "c-ball",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "ball-roll",
   "speaker": "rabbit",
   "listener": "bear",
   "situation": {
    "zh": "Bear把球滚向Rabbit。Rabbit说：",
    "en": "Bear rolls the ball to Rabbit. Rabbit says:"
   },
   "q": "The ball is ＿＿!",
   "forms": [
    {
     "t": "coming",
     "ok": true
    },
    {
     "t": "going",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "bear",
    "listener": "rabbit",
    "situation": {
     "zh": "同一个球，现在Bear说。",
     "en": "The same ball; now Bear speaks."
    },
    "q": "The ball is ＿＿ to Rabbit.",
    "ans": "change",
    "forms": [
     {
      "t": "going",
      "ok": true
     },
     {
      "t": "coming",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat-child",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。Bear在厨房里说：",
    "en": "The cat runs from the living room into the kitchen. Bear, in the kitchen, says:"
   },
   "q": "The cat ＿＿ into the kitchen!",
   "forms": [
    {
     "t": "came",
     "ok": true
    },
    {
     "t": "went",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的Rabbit说。",
     "en": "The same cat; now Rabbit, in the living room, speaks."
    },
    "q": "The cat ＿＿ into the kitchen.",
    "ans": "change",
    "forms": [
     {
      "t": "went",
      "ok": true
     },
     {
      "t": "came",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat",
   "mode": "come",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。Bear在厨房里，跟Rabbit打电话说：",
    "en": "The cat runs from the living room into the kitchen. Bear, in the kitchen, tells Rabbit on the phone:"
   },
   "q": "The cat ＿＿ into the kitchen.",
   "forms": [
    {
     "t": "came",
     "ok": true
    },
    {
     "t": "went",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的Rabbit跟别人说。",
     "en": "The same cat; now Rabbit, in the living room, tells someone."
    },
    "q": "The cat ＿＿ into the kitchen.",
    "ans": "change",
    "forms": [
     {
      "t": "went",
      "ok": true
     },
     {
      "t": "came",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-call",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "call-door",
   "speaker": "ben",
   "listener": "mum",
   "situation": {
    "zh": "Mum在门口叫Ben。Ben在房间里，一边朝门口走一边回答：",
    "en": "Mum calls Ben from the front door. Ben, in the room, answers while walking to the door:"
   },
   "q": "I'm ＿＿!",
   "forms": [
    {
     "t": "coming",
     "ok": true
    },
    {
     "t": "going",
     "at": "start",
     "say": {
      "zh": "I'm going 听起来像你要离开、去别的地方。",
      "en": "“I'm going” sounds as if you are leaving for somewhere else."
     }
    }
   ],
   "swap": {
    "speaker": "mum",
    "listener": "ben",
    "situation": {
     "zh": "还是同一段路。现在门口的Mum对别人说Ben的事。",
     "en": "The same walk. Now Mum, at the door, tells someone about Ben."
    },
    "q": "Ben's ＿＿.",
    "ans": "same",
    "forms": [
     {
      "t": "coming",
      "ok": true
     },
     {
      "t": "going",
      "at": "start"
     }
    ]
   },
   "extra": {
    "zh": "英语的 come 可以以听话的人为准：朝对方走过去，也说 I'm coming。",
    "en": "English come can be anchored on the listener: walking toward them you say I'm coming."
   },
   "rev": true
  },
  {
   "id": "c-umbrella",
   "mode": "come",
   "bands": [
    "child",
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "home-school",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "早上在家，Mum对要去上学的Leo说：",
    "en": "In the morning at home, Mum says to Leo, who is leaving for school:"
   },
   "q": "＿＿ your umbrella to school.",
   "forms": [
    {
     "t": "Take",
     "ok": true
    },
    {
     "t": "Bring",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "teacher",
    "listener": "kid",
    "situation": {
     "zh": "前一天在学校，Ms Hill对Leo说（伞同样是从家到学校）：",
     "en": "The day before, at school, Ms Hill says to Leo (the umbrella goes from home to school all the same):"
    },
    "q": "＿＿ your umbrella tomorrow.",
    "ans": "change",
    "forms": [
     {
      "t": "Bring",
      "ok": true
     },
     {
      "t": "Take",
      "at": "start"
     }
    ]
   }
  },
  {
   "id": "c-home",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "come-home",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "Leo还在学校。在家的Mum打电话说：",
    "en": "Leo is still at school. Mum, at home, says on the phone:"
   },
   "q": "＿＿ home early!",
   "forms": [
    {
     "t": "Come",
     "ok": true
    },
    {
     "t": "Go",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "teacher",
    "listener": "kid",
    "situation": {
     "zh": "同一段路。现在学校里的Ms Hill对Leo说：",
     "en": "The same way home. Now Ms Hill, at school, says to Leo:"
    },
    "q": "It's getting dark. ＿＿ home now.",
    "ans": "change",
    "forms": [
     {
      "t": "Go",
      "ok": true
     },
     {
      "t": "Come",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-trip",
   "mode": "come",
   "bands": [
    "adult",
    "youth"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "trip",
   "speaker": "aki",
   "listener": "ben",
   "situation": {
    "zh": "田中从东京出差到大阪。东京办公室的Amy对同事说：",
    "en": "Tanaka travels from Tokyo to Osaka for work. Amy, in the Tokyo office, tells a colleague:"
   },
   "q": "Mr Tanaka ＿＿ to Osaka yesterday.",
   "forms": [
    {
     "t": "went",
     "ok": true
    },
    {
     "t": "came",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "同一趟出差。现在大阪办公室的Ben说：",
     "en": "The same trip. Now Ben, in the Osaka office, says:"
    },
    "q": "Mr Tanaka ＿＿ to Osaka yesterday.",
    "ans": "change",
    "forms": [
     {
      "t": "came",
      "ok": true
     },
     {
      "t": "went",
      "at": "start"
     }
    ]
   }
  },
  {
   "id": "c-party",
   "mode": "come",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:en-lex-basic-verbs"
   ],
   "scene": "party",
   "speaker": "aki",
   "listener": "ben",
   "situation": {
    "zh": "Ben周六在家开聚会。Amy在自己家里打电话问Ben：",
    "en": "Ben is having a party at home on Saturday. Amy, at home, phones Ben and asks:"
   },
   "q": "Can I ＿＿ to your party on Saturday?",
   "forms": [
    {
     "t": "come",
     "ok": true
    },
    {
     "t": "go",
     "also": true,
     "say": {
      "zh": "也能说，只是 come 把你放到了对方那边，更亲切。",
      "en": "Also possible; come puts you on the host’s side and sounds warmer."
     }
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "Ben在自己家回答。",
     "en": "Ben answers from his home."
    },
    "q": "Of course, please ＿＿!",
    "ans": "same",
    "forms": [
     {
      "t": "come",
      "ok": true
     },
     {
      "t": "go",
      "at": "start"
     }
    ]
   },
   "extra": {
    "zh": "客人和主人都可以说 come：客人朝听话人所在的地方去，也用 come。",
    "en": "Guest and host can both say come: the guest is moving toward where the listener is."
   },
   "rev": true
  },
  {
   "id": "f-bear-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "bear",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "Put the ball in front of Bear."
  },
  {
   "id": "f-tree-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "front",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "Put the ball in front of the tree."
  },
  {
   "id": "f-tree-back",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "back",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "Put the ball behind the tree."
  },
  {
   "id": "f-car-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "你站在路边，车横着停在你前面。按这句话把球放好：",
    "en": "You stand at the roadside; a car is parked sideways in front of you. Put the ball where the sentence says:"
   },
   "q": "Put the ball in front of the car."
  },
  {
   "id": "f-tree-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "left",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "还是这条路边，你站在原地。按这句话把球放好：",
    "en": "The same roadside; you stay where you are. Put the ball where the sentence says:"
   },
   "q": "Put the ball to the left of the tree."
  },
  {
   "id": "f-car-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "car-facing",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "一辆车车头朝着你停着。按这句话把球放好：",
    "en": "A car is parked facing you. Put the ball where the sentence says:"
   },
   "q": "Put the ball to the left of the car."
  },
  {
   "id": "f-ben-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "ben-facing",
   "viewer": "you",
   "ref": "ben",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "Ben面朝着你站着。按这句话把球放好：",
    "en": "Ben stands facing you. Put the ball where the sentence says:"
   },
   "q": "Put the ball on Ben's left."
  },
  {
   "id": "f-hotel",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "taxi-hotel",
   "viewer": "taxi",
   "ref": "hotel",
   "mover": "taxi",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你坐出租车，车从酒店背面的路开过来。酒店的大门在另一边。你对司机说：",
    "en": "You are in a taxi coming along the road behind the hotel. The hotel entrance is on the other side. You tell the driver:"
   },
   "q": "Could you stop in front of the hotel, please?"
  },
  {
   "id": "f-pick-fb",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "bear-far-n",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "Bear站在树的另一边，朝你这边看。哪句话对Bear来说是对的？",
    "en": "Bear stands on the other side of the tree, looking toward you. Which sentence is true for Bear?"
   },
   "options": [
    {
     "t": "The ball is in front of the tree.",
     "ok": true
    },
    {
     "t": "The ball is behind the tree."
    }
   ]
  },
  {
   "id": "f-pick-lr",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "bear-far-e",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "Bear站在树的另一边，朝你这边看。哪句话对Bear来说是对的？",
    "en": "Bear stands on the other side of the tree, looking toward you. Which sentence is true for Bear?"
   },
   "options": [
    {
     "t": "The ball is to the left of the tree.",
     "ok": true
    },
    {
     "t": "The ball is to the right of the tree."
    },
    {
     "t": "The ball is behind the tree."
    }
   ]
  },
  {
   "id": "f-pick-room",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:en-prepositions-place"
   ],
   "scene": "meeting-lr",
   "viewer": "ben",
   "ref": "table",
   "mover": "window",
   "situation": {
    "zh": "会议桌对面的Ben说了一句话。哪句话从Ben的位置说是对的？",
    "en": "Ben, across the meeting table, says one of these. Which is true from where Ben sits?"
   },
   "options": [
    {
     "t": "The window is on my right.",
     "ok": true
    },
    {
     "t": "The window is on my left."
    },
    {
     "t": "The door is on my right."
    }
   ]
  }
 ],
 "review": [
  "“It’s cold over here / over there”中 here／there 前加 over 是否自然",
  "Can I come / go to your party? 两种都接受（go 标为也可以）",
  "Put the ball in front of the car：车横着停时，按车头和按看的人两种理解都接受",
  "Could you stop in front of the hotel? 只接受酒店大门那边，不接受面对出租车的那边——请确认",
  "to the left of Ben（不说 on Ben’s left）的两种理解没有出题，只在规则里提到"
 ],
 "reviewEn": [
  "Is over in “Is it cold over there? / Yes, it’s cold over here” natural?",
  "Can I come / go to your party?: both accepted (go marked as also possible)",
  "Put the ball in front of the car (car side-on): both the car’s-front and the viewer’s reading are accepted",
  "Could you stop in front of the hotel? accepts only the entrance side, not the side facing the taxi: please confirm",
  "to the left of Ben (rather than on Ben’s left) is ambiguous; it is only mentioned in the rule, not drilled"
 ]
};

KT_DATA["space-3d-ja"] = {
 "id": "space-3d-ja",
 "lang": "ja",
 "speech": "ja-JP",
 "scenes": "space-3d",
 "title": "空间与视点（日语）：こそあ、行く／来る、前後左右",
 "titleEn": "Space and viewpoint (Japanese): ko-so-a, 行く / 来る, front / behind / left / right",
 "subtitle": "在可以转动的场景里换到说话人、听话人或别人的眼睛，看哪个词跟着视点变、哪个不变。",
 "subtitleEn": "Turn the scene and look through the speaker’s, the listener’s or someone else’s eyes: see which word changes with the viewpoint and which does not.",
 "kcs": [
  "kt:ja-demonstrative-things",
  "kt:ja-demonstrative-modifiers",
  "kt:ja-demonstrative-places",
  "kt:ja-lex-daily-verbs",
  "kt:ja-teiku-tekuru",
  "kt:ja-spatial-nouns"
 ],
 "names": {
  "aki": "あき",
  "ben": "ベン",
  "mum": "お母さん",
  "kid": "ゆうと",
  "teacher": "先生",
  "tanaka": "田中さん",
  "bear": "くまさん",
  "rabbit": "うさぎさん",
  "you": "わたし"
 },
 "demo": {
  "speaker": "これ",
  "listener": "それ",
  "far": "あれ"
 },
 "motion": {
  "to": "来る",
  "away": "行く",
  "selfToListener": "行く"
 },
 "dirs": {
  "front": "前",
  "back": "後ろ",
  "left": "左",
  "right": "右"
 },
 "relFmt": "{ref}の{dir}",
 "refNames": {
  "tree": "木",
  "car": "車",
  "bear": "くまさん",
  "ben": "ベンさん",
  "hotel": "ホテル",
  "table": "テーブル"
 },
 "rules": {
  "here": {
   "zh": "こ：说话人身边。そ：听话人身边。あ：离两个人都远。两个人站在一起看同一边时，近处两人都用こ。东西用 これ／それ／あれ，名词前用 この／その／あの，地方用 ここ／そこ／あそこ。",
   "en": "こ: by the speaker. そ: by the listener. あ: far from both. When two people stand together facing the same way, both use こ for what is near. Things: これ / それ / あれ; before a noun: この / その / あの; places: ここ / そこ / あそこ."
  },
  "come": {
   "zh": "来る：朝说话人所在的地方（或说话人一方）。行く：朝别处，包括朝听话人那儿（今行きます）。持ってくる／持っていく、帰ってくる 同理。",
   "en": "来る: toward where the speaker is (or the speaker’s side). 行く: anywhere else, including toward the listener (今行きます). The same holds for 持ってくる / 持っていく and 帰ってくる."
  },
  "frame": {
   "zh": "木、ボール没有自己的前后左右，按看的人说。車、人、建筑有自己的前面：車の前 一般指车头那边，也可以按看的人说，所以 車の左 有两种理解。〜から見て左 把视点说清楚。",
   "en": "A tree or a ball has no front or left of its own: say it from the viewer. A car, a person or a building has its own front: 車の前 usually means the car’s front, but can be said from the viewer, so 車の左 has two readings. 〜から見て左 makes the viewpoint explicit."
  }
 },
 "compare": {
  "here": {
   "zh": "汉语只有“这／那”两级；日语多一级：对方身边的东西用 それ，不用 あれ。",
   "en": "English has two steps, this / that; Japanese adds one: what is by the listener is それ, not あれ."
  },
  "come": {
   "zh": "汉语“来了！”（朝叫你的人走去）在日语里要说 今行きます。",
   "en": "English I’m coming (walking to someone who calls you) is 今行きます in Japanese."
  },
  "frame": {
   "zh": "和汉语“树的左边、车的前边”一样，也有同样的歧义。",
   "en": "Like English “left of the car”, 車の左 has two readings."
  }
 },
 "make": {
  "demoForms": [
   {
    "t": "これ",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "この",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "ここ",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "こちら",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "それ",
    "zone": [
     "listener"
    ]
   },
   {
    "t": "その",
    "zone": [
     "listener"
    ]
   },
   {
    "t": "そこ",
    "zone": [
     "listener"
    ]
   },
   {
    "t": "そちら",
    "zone": [
     "listener"
    ]
   },
   {
    "t": "あれ",
    "zone": [
     "far"
    ]
   },
   {
    "t": "あの",
    "zone": [
     "far"
    ]
   },
   {
    "t": "あそこ",
    "zone": [
     "far"
    ]
   },
   {
    "t": "あちら",
    "zone": [
     "far"
    ]
   }
  ],
  "motionForms": [
   {
    "t": "来",
    "orient": "to"
   },
   {
    "t": "きま",
    "orient": "to"
   },
   {
    "t": "きた",
    "orient": "to"
   },
   {
    "t": "きて",
    "orient": "to"
   },
   {
    "t": "くる",
    "orient": "to"
   },
   {
    "t": "こない",
    "orient": "to"
   },
   {
    "t": "行きま",
    "orient": "away"
   },
   {
    "t": "行った",
    "orient": "away"
   },
   {
    "t": "行って",
    "orient": "away"
   },
   {
    "t": "行く",
    "orient": "away"
   },
   {
    "t": "行か",
    "orient": "away"
   },
   {
    "t": "行こ",
    "orient": "away"
   },
   {
    "t": "行け",
    "orient": "away"
   },
   {
    "t": "いきま",
    "orient": "away"
   },
   {
    "t": "いった",
    "orient": "away"
   },
   {
    "t": "いって",
    "orient": "away"
   },
   {
    "t": "いく",
    "orient": "away"
   },
   {
    "t": "いか",
    "orient": "away"
   },
   {
    "t": "いこ",
    "orient": "away"
   }
  ],
  "dirWords": {
   "front": [
    "前",
    "まえ"
   ],
   "back": [
    "後ろ",
    "うしろ"
   ],
   "left": [
    "左",
    "ひだり"
   ],
   "right": [
    "右",
    "みぎ"
   ]
  },
  "refWords": {
   "tree": [
    "木"
   ],
   "car": [
    "車",
    "くるま"
   ]
  },
  "words": false,
  "placeholder": {
   "here": {
    "zh": "例：それはあきさんのカップですか。",
    "en": "e.g. それはあきさんのカップですか。"
   },
   "come": {
    "zh": "例：猫が台所に来ました。",
    "en": "e.g. 猫が台所に来ました。"
   },
   "frame": {
    "zh": "例：ボールは木の後ろにあります。",
    "en": "e.g. ボールは木の後ろにあります。"
   }
  }
 },
 "items": [
  {
   "id": "h-apple",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "apple",
   "situation": {
    "zh": "くまさん在跟うさぎさん说话，说的是自己身边的苹果。",
    "en": "くまさん is talking to うさぎさん about the apple next to くまさん."
   },
   "q": "＿＿は わたしの りんごです。",
   "forms": [
    {
     "t": "これ",
     "ok": true
    },
    {
     "t": "それ",
     "at": "listener"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在うさぎさん说话，说的是同一个苹果。",
     "en": "Now うさぎさん speaks about the same apple."
    },
    "q": "＿＿は くまさんの りんごです。",
    "ans": "change",
    "forms": [
     {
      "t": "それ",
      "ok": true
     },
     {
      "t": "これ",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-ball",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "ball",
   "situation": {
    "zh": "くまさん问うさぎさん：うさぎさん身边的球是不是うさぎさん的？",
    "en": "くまさん asks うさぎさん about the ball next to うさぎさん."
   },
   "q": "＿＿は うさぎさんの ボール？",
   "forms": [
    {
     "t": "それ",
     "ok": true
    },
    {
     "t": "これ",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在うさぎさん回答。",
     "en": "Now うさぎさん answers."
    },
    "q": "うん、＿＿は わたしの ボールだよ。",
    "ans": "change",
    "forms": [
     {
      "t": "これ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-tree",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "tree",
   "situation": {
    "zh": "くまさん问うさぎさん：远处那棵树是什么树？",
    "en": "くまさん asks うさぎさん about the tree far away."
   },
   "q": "＿＿は なんの 木？",
   "forms": [
    {
     "t": "あれ",
     "ok": true
    },
    {
     "t": "それ",
     "at": "listener"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在うさぎさん回答。树离两个人都远。",
     "en": "Now うさぎさん answers. The tree is far from both of them."
    },
    "q": "＿＿は さくらの 木だよ。",
    "ans": "same",
    "forms": [
     {
      "t": "あれ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-cake",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "br-side",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "cake",
   "situation": {
    "zh": "くまさん和うさぎさん并排站着，蛋糕就在两个人前面。くまさん说：",
    "en": "くまさん and うさぎさん stand side by side; the cake is right in front of both. くまさん says:"
   },
   "q": "＿＿、おいしそうだね！",
   "forms": [
    {
     "t": "これ",
     "ok": true
    },
    {
     "t": "あれ",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在うさぎさん说。蛋糕离两个人一样近。",
     "en": "Now うさぎさん speaks. The cake is just as near to both."
    },
    "q": "うん、＿＿、おいしそう！",
    "ans": "same",
    "forms": [
     {
      "t": "これ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-phone",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "phone",
   "situation": {
    "zh": "あき和ベン在客厅里，隔着几步。あき问ベン手边的手机：",
    "en": "あき and ベン are a few steps apart in the living room. あき asks about the phone by ベン:"
   },
   "q": "＿＿は新しいスマホですか。",
   "forms": [
    {
     "t": "それ",
     "ok": true
    },
    {
     "t": "これ",
     "at": "speaker"
    },
    {
     "t": "あれ",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン回答，说的是同一部手机。",
     "en": "ベン answers about the same phone."
    },
    "q": "はい、＿＿は先月買いました。",
    "ans": "change",
    "forms": [
     {
      "t": "これ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     },
     {
      "t": "あれ",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "问的是对方身边的东西，回答的人要换成自己的角度：それ → これ。",
    "en": "Asked about something by the listener, the answer switches to the answerer’s own side: それ → これ."
   }
  },
  {
   "id": "h-cup",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "two-room",
   "speaker": "ben",
   "listener": "aki",
   "target": "cup",
   "situation": {
    "zh": "ベン问あき身边的杯子是谁的。",
    "en": "ベン asks whose cup is next to あき."
   },
   "q": "＿＿はだれのカップですか。",
   "forms": [
    {
     "t": "それ",
     "ok": true
    },
    {
     "t": "これ",
     "at": "speaker"
    },
    {
     "t": "あれ",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "aki",
    "listener": "ben",
    "situation": {
     "zh": "あき回答。",
     "en": "あき answers."
    },
    "q": "＿＿は私のです。",
    "ans": "change",
    "forms": [
     {
      "t": "これ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     },
     {
      "t": "あれ",
      "at": "far"
     }
    ]
   }
  },
  {
   "id": "h-poster",
   "mode": "here",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:ja-demonstrative-things"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "poster",
   "situation": {
    "zh": "あき问墙上的海报，海报离两个人都远。",
    "en": "あき asks about the poster on the far wall, far from both of them."
   },
   "q": "＿＿は何のポスターですか。",
   "forms": [
    {
     "t": "あれ",
     "ok": true
    },
    {
     "t": "それ",
     "at": "listener"
    },
    {
     "t": "これ",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン回答。",
     "en": "ベン answers."
    },
    "q": "＿＿は映画のポスターです。",
    "ans": "same",
    "forms": [
     {
      "t": "あれ",
      "ok": true
     },
     {
      "t": "それ",
      "at": "listener"
     },
     {
      "t": "これ",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-cold",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-places"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "window",
   "situation": {
    "zh": "あき在门口，ベン坐在窗边。あき问ベン那边冷不冷。",
    "en": "あき is by the door, ベン sits by the window. あき asks if it is cold where ベン is."
   },
   "q": "＿＿は寒いですか。",
   "forms": [
    {
     "t": "そこ",
     "ok": true
    },
    {
     "t": "ここ",
     "at": "speaker"
    },
    {
     "t": "あそこ",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン回答。",
     "en": "ベン answers."
    },
    "q": "はい、＿＿は寒いです。",
    "ans": "change",
    "forms": [
     {
      "t": "ここ",
      "ok": true
     },
     {
      "t": "そこ",
      "at": "listener"
     },
     {
      "t": "あそこ",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "说地方用 ここ／そこ／あそこ，不用 これ／それ／あれ。",
    "en": "For places use ここ / そこ / あそこ, not これ / それ / あれ."
   }
  },
  {
   "id": "h-toilet",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-places"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "toilet",
   "situation": {
    "zh": "ベン问洗手间在哪儿，あき指着远处的门回答。",
    "en": "ベン asks where the toilet is; あき points at the far door."
   },
   "q": "トイレは＿＿です。",
   "forms": [
    {
     "t": "あそこ",
     "ok": true
    },
    {
     "t": "そこ",
     "at": "listener"
    },
    {
     "t": "ここ",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン看着那扇门确认。",
     "en": "ベン looks at that door and checks."
    },
    "q": "＿＿ですね。ありがとうございます。",
    "ans": "same",
    "forms": [
     {
      "t": "あそこ",
      "ok": true
     },
     {
      "t": "そこ",
      "at": "listener"
     },
     {
      "t": "ここ",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-file",
   "mode": "here",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-modifiers"
   ],
   "scene": "meeting",
   "speaker": "aki",
   "listener": "ben",
   "target": "file",
   "situation": {
    "zh": "开会时，あき请对面的ベン把他手边的文件递过来。",
    "en": "In a meeting, あき asks ベン, across the table, to pass the file by his hand."
   },
   "q": "＿＿資料、取っていただけますか。",
   "forms": [
    {
     "t": "その",
     "ok": true
    },
    {
     "t": "この",
     "at": "speaker"
    },
    {
     "t": "あの",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン拿起文件确认。",
     "en": "ベン picks up the file and checks."
    },
    "q": "はい、＿＿資料ですね。",
    "ans": "change",
    "forms": [
     {
      "t": "この",
      "ok": true
     },
     {
      "t": "その",
      "at": "listener"
     },
     {
      "t": "あの",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "后面直接接名词时用 この／その／あの。",
    "en": "Directly before a noun use この / その / あの."
   }
  },
  {
   "id": "h-brochure",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-modifiers"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "brochure",
   "situation": {
    "zh": "あき和ベン并排站着，一起看两人面前的小册子。",
    "en": "あき and ベン stand side by side, both looking at the brochure in front of them."
   },
   "q": "＿＿パンフレット、よくできていますね。",
   "forms": [
    {
     "t": "この",
     "ok": true
    },
    {
     "t": "その",
     "at": "listener"
    },
    {
     "t": "あの",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン接着说。小册子离两个人一样近。",
     "en": "ベン replies. The brochure is just as near to both."
    },
    "q": "ええ、＿＿パンフレットはわかりやすいです。",
    "ans": "same",
    "forms": [
     {
      "t": "この",
      "ok": true
     },
     {
      "t": "その",
      "at": "listener"
     },
     {
      "t": "あの",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "两个人站在一起、面对同一样东西时，近处的东西两个人都用 こ。",
    "en": "When two people stand together facing the same thing, both use こ for what is near them."
   }
  },
  {
   "id": "h-tower",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-demonstrative-modifiers"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "tower",
   "situation": {
    "zh": "あき指着窗外远处的大楼问。",
    "en": "あき points at the tower block far outside the window."
   },
   "q": "＿＿ビルは何ですか。",
   "forms": [
    {
     "t": "あの",
     "ok": true
    },
    {
     "t": "その",
     "at": "listener"
    },
    {
     "t": "この",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン回答。",
     "en": "ベン answers."
    },
    "q": "＿＿ビルは市役所です。",
    "ans": "same",
    "forms": [
     {
      "t": "あの",
      "ok": true
     },
     {
      "t": "その",
      "at": "listener"
     },
     {
      "t": "この",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "c-ball",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "ball-roll",
   "speaker": "rabbit",
   "listener": "bear",
   "situation": {
    "zh": "くまさん把球滚向うさぎさん。うさぎさん说：",
    "en": "くまさん rolls the ball to うさぎさん. うさぎさん says:"
   },
   "q": "ボールが＿＿！",
   "forms": [
    {
     "t": "きた",
     "ok": true
    },
    {
     "t": "いった",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "bear",
    "listener": "rabbit",
    "situation": {
     "zh": "同一个球，现在くまさん说。",
     "en": "The same ball; now くまさん speaks."
    },
    "q": "ボールが うさぎさんの ほうへ＿＿。",
    "ans": "change",
    "forms": [
     {
      "t": "いった",
      "ok": true
     },
     {
      "t": "きた",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat-child",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。くまさん在厨房里说：",
    "en": "The cat runs from the living room into the kitchen. くまさん, in the kitchen, says:"
   },
   "q": "ねこが＿＿よ！",
   "forms": [
    {
     "t": "きた",
     "ok": true
    },
    {
     "t": "いった",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的うさぎさん说。",
     "en": "The same cat; now うさぎさん, in the living room, speaks."
    },
    "q": "ねこが だいどころに＿＿よ。",
    "ans": "change",
    "forms": [
     {
      "t": "いった",
      "ok": true
     },
     {
      "t": "きた",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat",
   "mode": "come",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。くまさん在厨房里，跟うさぎさん打电话说：",
    "en": "The cat runs from the living room into the kitchen. くまさん, in the kitchen, tells うさぎさん on the phone:"
   },
   "q": "猫が台所に＿＿。",
   "forms": [
    {
     "t": "来ました",
     "ok": true
    },
    {
     "t": "行きました",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的うさぎさん跟别人说。",
     "en": "The same cat; now うさぎさん, in the living room, tells someone."
    },
    "q": "猫が台所に＿＿。",
    "ans": "change",
    "forms": [
     {
      "t": "行きました",
      "ok": true
     },
     {
      "t": "来ました",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-call",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "call-door",
   "speaker": "ben",
   "listener": "mum",
   "situation": {
    "zh": "お母さん在门口叫ベン。ベン在房间里，一边朝门口走一边回答：",
    "en": "お母さん calls ベン from the front door. ベン, in the room, answers while walking to the door:"
   },
   "q": "はーい、今＿＿！",
   "forms": [
    {
     "t": "行きます",
     "ok": true
    },
    {
     "t": "来ます",
     "at": "mum",
     "say": {
      "zh": "来ます 说的是有人朝“你”这边来；这里是你朝对方走。",
      "en": "来ます means someone moves to where *you* are; here you are moving to the other person."
     }
    }
   ],
   "swap": {
    "speaker": "mum",
    "listener": "ben",
    "situation": {
     "zh": "还是同一段路。现在门口的お母さん对别人说ベン的事。",
     "en": "The same walk. Now お母さん, at the door, tells someone about ベン."
    },
    "q": "ベンが今＿＿。",
    "ans": "change",
    "forms": [
     {
      "t": "来ます",
      "ok": true
     },
     {
      "t": "行きます",
      "at": "start"
     }
    ]
   },
   "extra": {
    "zh": "日语里朝对方走过去用 行きます：来る 只用于朝说话人这边来。英语 I'm coming、汉语“来了”在这里都以对方为准。",
    "en": "In Japanese, moving toward the listener is 行きます; 来る only means toward the speaker. English I'm coming and Chinese 来了 take the listener as the anchor here."
   },
   "rev": true
  },
  {
   "id": "c-umbrella",
   "mode": "come",
   "bands": [
    "child",
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-teiku-tekuru"
   ],
   "scene": "home-school",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "早上在家，お母さん对要去上学的ゆうと说：",
    "en": "In the morning at home, お母さん says to ゆうと, who is leaving for school:"
   },
   "q": "傘を学校に持って＿＿ね。",
   "forms": [
    {
     "t": "いって",
     "ok": true
    },
    {
     "t": "きて",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "teacher",
    "listener": "kid",
    "situation": {
     "zh": "前一天在学校，先生对ゆうと说（伞同样是从家到学校）：",
     "en": "The day before, at school, 先生 says to ゆうと (the umbrella goes from home to school all the same):"
    },
    "q": "明日、傘を持って＿＿ください。",
    "ans": "change",
    "forms": [
     {
      "t": "きて",
      "ok": true
     },
     {
      "t": "いって",
      "at": "start"
     }
    ]
   }
  },
  {
   "id": "c-home",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-teiku-tekuru"
   ],
   "scene": "come-home",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "ゆうと还在学校。在家的お母さん打电话说：",
    "en": "ゆうと is still at school. お母さん, at home, says on the phone:"
   },
   "q": "早く帰って＿＿ね。",
   "forms": [
    {
     "t": "きて",
     "ok": true
    },
    {
     "t": "いって",
     "at": "start"
    }
   ],
   "extra": {
    "zh": "说话的人在家：回到“我”这儿，用 帰ってくる。",
    "en": "The speaker is at home: coming back to where I am is 帰ってくる."
   }
  },
  {
   "id": "c-trip",
   "mode": "come",
   "bands": [
    "adult",
    "youth"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "trip",
   "speaker": "aki",
   "listener": "ben",
   "situation": {
    "zh": "田中从东京出差到大阪。东京办公室的あき对同事说：",
    "en": "Tanaka travels from Tokyo to Osaka for work. あき, in the Tokyo office, tells a colleague:"
   },
   "q": "田中さんは昨日大阪に＿＿。",
   "forms": [
    {
     "t": "行きました",
     "ok": true
    },
    {
     "t": "来ました",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "同一趟出差。现在大阪办公室的ベン说：",
     "en": "The same trip. Now ベン, in the Osaka office, says:"
    },
    "q": "田中さんは昨日大阪に＿＿。",
    "ans": "change",
    "forms": [
     {
      "t": "来ました",
      "ok": true
     },
     {
      "t": "行きました",
      "at": "start"
     }
    ]
   }
  },
  {
   "id": "c-party",
   "mode": "come",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:ja-lex-daily-verbs"
   ],
   "scene": "party",
   "speaker": "aki",
   "listener": "ben",
   "situation": {
    "zh": "ベン周六在家开聚会。あき在自己家里打电话问ベン：",
    "en": "ベン is having a party at home on Saturday. あき, at home, phones ベン and asks:"
   },
   "q": "土曜日のパーティーに＿＿もいいですか。",
   "forms": [
    {
     "t": "行って",
     "ok": true
    },
    {
     "t": "来て",
     "at": "benhome",
     "say": {
      "zh": "来て もいいですか 是问“别人可以来我这儿吗”。",
      "en": "来てもいいですか asks whether someone may come to *your* place."
     }
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "ベン在自己家回答。",
     "en": "ベン answers from his home."
    },
    "q": "ぜひ＿＿ください。",
    "ans": "change",
    "forms": [
     {
      "t": "来て",
      "ok": true
     },
     {
      "t": "行って",
      "at": "start"
     }
    ]
   },
   "extra": {
    "zh": "日语去对方那儿用 行く，对方请你来用 来る。",
    "en": "Going to the other person is 行く; the host inviting you says 来る."
   },
   "rev": true
  },
  {
   "id": "f-bear-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "bear",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "ボールを くまさんの まえに おいてね。"
  },
  {
   "id": "f-tree-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "front",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "ボールを 木の まえに おいてね。"
  },
  {
   "id": "f-tree-back",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "back",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "ボールを 木の うしろに おいてね。"
  },
  {
   "id": "f-car-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "你站在路边，车横着停在你前面。按这句话把球放好：",
    "en": "You stand at the roadside; a car is parked sideways in front of you. Put the ball where the sentence says:"
   },
   "q": "ボールを車の前に置いてください。"
  },
  {
   "id": "f-tree-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "left",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "还是这条路边，你站在原地。按这句话把球放好：",
    "en": "The same roadside; you stay where you are. Put the ball where the sentence says:"
   },
   "q": "ボールを木の左に置いてください。"
  },
  {
   "id": "f-car-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "car-facing",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "一辆车车头朝着你停着。按这句话把球放好：",
    "en": "A car is parked facing you. Put the ball where the sentence says:"
   },
   "q": "ボールを車の左に置いてください。"
  },
  {
   "id": "f-ben-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "ben-facing",
   "viewer": "you",
   "ref": "ben",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "ベン面朝着你站着。按这句话把球放好：",
    "en": "ベン stands facing you. Put the ball where the sentence says:"
   },
   "q": "ボールをベンさんから見て左に置いてください。"
  },
  {
   "id": "f-hotel",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "taxi-hotel",
   "viewer": "taxi",
   "ref": "hotel",
   "mover": "taxi",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你坐出租车，车从酒店背面的路开过来。酒店的大门在另一边。你对司机说：",
    "en": "You are in a taxi coming along the road behind the hotel. The hotel entrance is on the other side. You tell the driver:"
   },
   "q": "ホテルの前で止めてください。"
  },
  {
   "id": "f-pick-fb",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "bear-far-n",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "くまさん站在树的另一边，朝你这边看。哪句话对くまさん来说是对的？",
    "en": "くまさん stands on the other side of the tree, looking toward you. Which sentence is true for くまさん?"
   },
   "options": [
    {
     "t": "ボールは 木の まえに あります。",
     "ok": true
    },
    {
     "t": "ボールは 木の うしろに あります。"
    }
   ]
  },
  {
   "id": "f-pick-lr",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "bear-far-e",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "くまさん站在树的另一边，朝你这边看。哪句话对くまさん来说是对的？",
    "en": "くまさん stands on the other side of the tree, looking toward you. Which sentence is true for くまさん?"
   },
   "options": [
    {
     "t": "ボールは木の左にあります。",
     "ok": true
    },
    {
     "t": "ボールは木の右にあります。"
    },
    {
     "t": "ボールは木の後ろにあります。"
    }
   ]
  },
  {
   "id": "f-pick-room",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:ja-spatial-nouns"
   ],
   "scene": "meeting-lr",
   "viewer": "ben",
   "ref": "table",
   "mover": "window",
   "situation": {
    "zh": "会议桌对面的ベン说了一句话。哪句话从ベン的位置说是对的？",
    "en": "ベン, across the meeting table, says one of these. Which is true from where ベン sits?"
   },
   "options": [
    {
     "t": "窓は私の右側にあります。",
     "ok": true
    },
    {
     "t": "窓は私の左側にあります。"
    },
    {
     "t": "ドアは私の右側にあります。"
    }
   ]
  }
 ],
 "review": [
  "两人并排时，面前的东西两人都用 これ／この（融合型）；稍远一点用 それ 的说法没有出题",
  "说话人和听话人隔开几步时，听话人手边的东西用 それ（h-phone、h-cup、h-file）",
  "はーい、今行きます：朝叫你的人走过去只接受 行きます；九州等方言里可以说 来る，没有收",
  "ぜひ来てください／パーティーに行ってもいいですか 的对比是否自然",
  "車の前 横着停时两种理解都接受；ホテルの前で止めてください 只接受大门那边",
  "ボールをベンさんから見て左に置いてください 是否自然（也可说 ベンさんの左手側）",
  "儿童题用普通体（きた／いった、おいてね），成人题用丁寧体",
  "“自己摆”里按 来／き／行／い 等片段查找动词，可能误认（如 いい、きれい）",
  "不在练习范围：指不在眼前、双方都知道的东西的 あ（あの店、覚えてる？），和文章里指代前文的 そ／あ"
 ],
 "reviewEn": [
  "Side by side, both use これ / この for what is just in front (the “fused” field); the use of それ for something a little further away is not drilled",
  "With the two a few steps apart, what is by the listener is それ (h-phone, h-cup, h-file)",
  "はーい、今行きます: only 行きます is accepted for walking to someone who called; dialects (e.g. Kyushu) that use 来る here are not covered",
  "Is the contrast ぜひ来てください / パーティーに行ってもいいですか natural?",
  "車の前 (car side-on): both readings accepted; ホテルの前で止めてください: only the entrance side accepted",
  "Is ボールをベンさんから見て左に置いてください natural (ベンさんの左手側 is also possible)?",
  "Child items use plain forms (きた / いった, おいてね); the others use です / ます",
  "In “Your turn”, verbs are found by fragments such as 来 / き / 行 / い, which can misfire (e.g. いい, きれい)",
  "Out of scope: あ for something both know that is not present (あの店、覚えてる？) and そ / あ referring back in a text"
 ]
};

KT_DATA["space-3d-zh"] = {
 "id": "space-3d-zh",
 "lang": "zh",
 "speech": "zh-CN",
 "scenes": "space-3d",
 "title": "空间与视点（汉语）：这／那、来／去、前后左右",
 "titleEn": "Space and viewpoint (Chinese): 这 / 那, 来 / 去, front / behind / left / right",
 "subtitle": "在可以转动的场景里换到说话人、听话人或别人的眼睛，看哪个词跟着视点变、哪个不变。",
 "subtitleEn": "Turn the scene and look through the speaker’s, the listener’s or someone else’s eyes: see which word changes with the viewpoint and which does not.",
 "kcs": [
  "kt:zh-demonstratives",
  "kt:zh-directional-simple",
  "kt:zh-locatives"
 ],
 "names": {
  "aki": "小安",
  "ben": "小文",
  "mum": "妈妈",
  "kid": "乐乐",
  "teacher": "老师",
  "tanaka": "田中",
  "bear": "小熊",
  "rabbit": "小兔",
  "you": "我"
 },
 "demo": {
  "speaker": "这",
  "listener": "那",
  "far": "那"
 },
 "motion": {
  "to": "来",
  "away": "去",
  "selfToListener": "来"
 },
 "dirs": {
  "front": "前边",
  "back": "后边",
  "left": "左边",
  "right": "右边"
 },
 "relFmt": "{ref}的{dir}",
 "refNames": {
  "tree": "树",
  "car": "车",
  "bear": "小熊",
  "ben": "小文",
  "hotel": "酒店",
  "table": "桌子"
 },
 "rules": {
  "here": {
   "zh": "“这／这儿”：离说话人近。“那／那儿”：离说话人远，在听话人身边也用“那”。后面接名词要加量词：这个、那份。",
   "en": "这 / 这儿: near the speaker. 那 / 那儿: away from the speaker, including by the listener. Before a noun add a measure word: 这个, 那份."
  },
  "come": {
   "zh": "“来”：朝说话人所在的地方。“去”：朝别处。有人叫你、你朝他走过去时常说“来了”。处所放在“来／去”前面：回家去、进教室来。",
   "en": "来: toward where the speaker is. 去: anywhere else. Answering someone who calls you, you usually say 来了 while walking to them. The place goes before 来 / 去: 回家去, 进教室来."
  },
  "frame": {
   "zh": "树、球没有自己的前后左右，按看的人说。车、人、房子有自己的前面：“车的前边”一般指车头那边，也可以按看的人说，所以“车的左边”有两种理解。“左手边”只按那个人自己说。",
   "en": "A tree or a ball has no front or left of its own: say it from the viewer. A car, a person or a house has its own front: 车的前边 usually means the car’s front, but can be said from the viewer, so 车的左边 has two readings. 左手边 is the person’s own left only."
  }
 },
 "compare": {
  "here": {
   "zh": "和英语 this／that 一样只分两级；日语分三级。",
   "en": "Two steps, like English this / that; Japanese has three."
  },
  "come": {
   "zh": "和英语 come／go 大体一样；英语 Can I come to your party? 汉语一般说“我可以去你的聚会吗？”。",
   "en": "Mostly like English come / go; English Can I come to your party? is usually 我可以去你的聚会吗 in Chinese."
  },
  "frame": {
   "zh": "和英语 left of the car 一样有歧义。",
   "en": "Ambiguous in the same way as English left of the car."
  }
 },
 "make": {
  "demoForms": [
   {
    "t": "这儿",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "这里",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "这",
    "zone": [
     "speaker"
    ]
   },
   {
    "t": "那儿",
    "zone": [
     "listener",
     "far"
    ]
   },
   {
    "t": "那里",
    "zone": [
     "listener",
     "far"
    ]
   },
   {
    "t": "那",
    "zone": [
     "listener",
     "far"
    ]
   }
  ],
  "motionForms": [
   {
    "t": "来",
    "orient": "to"
   },
   {
    "t": "去",
    "orient": "away"
   }
  ],
  "ignore": [
   "后来",
   "起来",
   "原来",
   "未来",
   "过去的",
   "那么",
   "那就"
  ],
  "dirWords": {
   "front": [
    "前"
   ],
   "back": [
    "后"
   ],
   "left": [
    "左"
   ],
   "right": [
    "右"
   ]
  },
  "refWords": {
   "tree": [
    "树"
   ],
   "car": [
    "车"
   ]
  },
  "words": false,
  "placeholder": {
   "here": {
    "zh": "例：那是你的杯子吗？",
    "en": "e.g. 那是你的杯子吗？"
   },
   "come": {
    "zh": "例：小猫到厨房来了。",
    "en": "e.g. 小猫到厨房来了。"
   },
   "frame": {
    "zh": "例：球在树的后边。",
    "en": "e.g. 球在树的后边。"
   }
  }
 },
 "items": [
  {
   "id": "h-apple",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "apple",
   "situation": {
    "zh": "小熊在跟小兔说话，说的是自己身边的苹果。",
    "en": "小熊 is talking to 小兔 about the apple next to 小熊."
   },
   "q": "＿＿是我的苹果。",
   "forms": [
    {
     "t": "这",
     "ok": true
    },
    {
     "t": "那",
     "at": "listener"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在小兔说话，说的是同一个苹果。",
     "en": "Now 小兔 speaks about the same apple."
    },
    "q": "＿＿是小熊的苹果。",
    "ans": "change",
    "forms": [
     {
      "t": "那",
      "ok": true
     },
     {
      "t": "这",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-ball",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "ball",
   "situation": {
    "zh": "小熊问小兔：小兔身边的球是不是小兔的？",
    "en": "小熊 asks 小兔 about the ball next to 小兔."
   },
   "q": "＿＿是你的球吗？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在小兔回答。",
     "en": "Now 小兔 answers."
    },
    "q": "对，＿＿是我的球。",
    "ans": "change",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "listener"
     }
    ]
   }
  },
  {
   "id": "h-tree",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "br-face",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "tree",
   "situation": {
    "zh": "小熊问小兔：远处那棵树是什么树？",
    "en": "小熊 asks 小兔 about the tree far away."
   },
   "q": "＿＿是什么树？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在小兔回答。树离两个人都远。",
     "en": "Now 小兔 answers. The tree is far from both of them."
    },
    "q": "＿＿是苹果树。",
    "ans": "same",
    "forms": [
     {
      "t": "那",
      "ok": true
     },
     {
      "t": "这",
      "at": "speaker"
     }
    ]
   }
  },
  {
   "id": "h-cake",
   "mode": "here",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "br-side",
   "speaker": "bear",
   "listener": "rabbit",
   "target": "cake",
   "situation": {
    "zh": "小熊和小兔并排站着，蛋糕就在两个人前面。小熊说：",
    "en": "小熊 and 小兔 stand side by side; the cake is right in front of both. 小熊 says:"
   },
   "q": "＿＿是我们的蛋糕！",
   "forms": [
    {
     "t": "这",
     "ok": true
    },
    {
     "t": "那",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "现在小兔说。蛋糕离两个人一样近。",
     "en": "Now 小兔 speaks. The cake is just as near to both."
    },
    "q": "对，＿＿是我们的蛋糕！",
    "ans": "same",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "far"
     }
    ]
   }
  },
  {
   "id": "h-phone",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "phone",
   "situation": {
    "zh": "小安和小文在客厅里，隔着几步。小安问小文手边的手机：",
    "en": "小安 and 小文 are a few steps apart in the living room. 小安 asks about the phone by 小文:"
   },
   "q": "＿＿是你的新手机吗？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文回答，说的是同一部手机。",
     "en": "小文 answers about the same phone."
    },
    "q": "对，＿＿是上个月买的。",
    "ans": "change",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "listener"
     }
    ]
   },
   "extra": {
    "zh": "汉语只分两级：离说话人近用“这”，其余都用“那”。",
    "en": "Chinese has two steps only: 这 near the speaker, 那 for everything else."
   },
   "r": "Nà shì nǐ de xīn shǒujī ma?"
  },
  {
   "id": "h-cup",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "ben",
   "listener": "aki",
   "target": "cup",
   "situation": {
    "zh": "小文问小安身边的杯子是谁的。",
    "en": "小文 asks whose cup is next to 小安."
   },
   "q": "＿＿是谁的杯子？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "aki",
    "listener": "ben",
    "situation": {
     "zh": "小安回答。",
     "en": "小安 answers."
    },
    "q": "＿＿是我的。",
    "ans": "change",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "listener"
     }
    ]
   },
   "r": "Nà shì shéi de bēizi?"
  },
  {
   "id": "h-poster",
   "mode": "here",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "two-room",
   "speaker": "aki",
   "listener": "ben",
   "target": "poster",
   "situation": {
    "zh": "小安问墙上的海报，海报离两个人都远。",
    "en": "小安 asks about the poster on the far wall, far from both of them."
   },
   "q": "＿＿是什么海报？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文回答。",
     "en": "小文 answers."
    },
    "q": "＿＿是电影海报。",
    "ans": "same",
    "forms": [
     {
      "t": "那",
      "ok": true
     },
     {
      "t": "这",
      "at": "speaker"
     }
    ]
   },
   "r": "Nà shì shénme hǎibào?"
  },
  {
   "id": "h-cold",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "window",
   "situation": {
    "zh": "小安在门口，小文坐在窗边。小安问小文那边冷不冷。",
    "en": "小安 is by the door, 小文 sits by the window. 小安 asks if it is cold where 小文 is."
   },
   "q": "你＿＿冷吗？",
   "forms": [
    {
     "t": "那儿",
     "ok": true
    },
    {
     "t": "这儿",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文回答。",
     "en": "小文 answers."
    },
    "q": "我＿＿很冷。",
    "ans": "change",
    "forms": [
     {
      "t": "这儿",
      "ok": true
     },
     {
      "t": "那儿",
      "at": "listener"
     }
    ]
   },
   "extra": {
    "zh": "说地方用“这儿／那儿”（或“这里／那里”）。",
    "en": "For places use 这儿 / 那儿 (or 这里 / 那里)."
   },
   "r": "Nǐ nàr lěng ma?"
  },
  {
   "id": "h-toilet",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "door-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "toilet",
   "situation": {
    "zh": "小文问洗手间在哪儿，小安指着远处的门回答。",
    "en": "小文 asks where the toilet is; 小安 points at the far door."
   },
   "q": "洗手间在＿＿。",
   "forms": [
    {
     "t": "那儿",
     "ok": true
    },
    {
     "t": "这儿",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文看着那扇门确认。",
     "en": "小文 looks at that door and checks."
    },
    "q": "在＿＿啊，谢谢！",
    "ans": "same",
    "forms": [
     {
      "t": "那儿",
      "ok": true
     },
     {
      "t": "这儿",
      "at": "speaker"
     }
    ]
   },
   "r": "Xǐshǒujiān zài nàr."
  },
  {
   "id": "h-file",
   "mode": "here",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "meeting",
   "speaker": "aki",
   "listener": "ben",
   "target": "file",
   "situation": {
    "zh": "开会时，小安请对面的小文把他手边的文件递过来。",
    "en": "In a meeting, 小安 asks 小文, across the table, to pass the file by his hand."
   },
   "q": "请把＿＿份文件递给我。",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文拿起文件确认。",
     "en": "小文 picks up the file and checks."
    },
    "q": "是＿＿份吗？",
    "ans": "change",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "listener"
     }
    ]
   },
   "extra": {
    "zh": "后面接名词时加量词：那份文件、这份文件。",
    "en": "Before a noun add a measure word: 那份文件, 这份文件."
   },
   "r": "Qǐng bǎ nà fèn wénjiàn dì gěi wǒ."
  },
  {
   "id": "h-brochure",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "brochure",
   "situation": {
    "zh": "小安和小文并排站着，一起看两人面前的小册子。",
    "en": "小安 and 小文 stand side by side, both looking at the brochure in front of them."
   },
   "q": "＿＿本小册子做得很好。",
   "forms": [
    {
     "t": "这",
     "ok": true
    },
    {
     "t": "那",
     "at": "far"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文接着说。小册子离两个人一样近。",
     "en": "小文 replies. The brochure is just as near to both."
    },
    "q": "对，＿＿本写得很清楚。",
    "ans": "same",
    "forms": [
     {
      "t": "这",
      "ok": true
     },
     {
      "t": "那",
      "at": "far"
     }
    ]
   },
   "extra": {
    "zh": "两个人站在一起、面对同一样东西，近处的东西两个人都说“这”。",
    "en": "Two people standing together both say 这 for what is near them."
   },
   "r": "Zhè běn xiǎocèzi zuò de hěn hǎo."
  },
  {
   "id": "h-tower",
   "mode": "here",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-demonstratives"
   ],
   "scene": "side-window",
   "speaker": "aki",
   "listener": "ben",
   "target": "tower",
   "situation": {
    "zh": "小安指着窗外远处的大楼问。",
    "en": "小安 points at the tower block far outside the window."
   },
   "q": "＿＿座大楼是什么地方？",
   "forms": [
    {
     "t": "那",
     "ok": true
    },
    {
     "t": "这",
     "at": "speaker"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "小文回答。",
     "en": "小文 answers."
    },
    "q": "＿＿是市政府。",
    "ans": "same",
    "forms": [
     {
      "t": "那",
      "ok": true
     },
     {
      "t": "这",
      "at": "speaker"
     }
    ]
   },
   "r": "Nà zuò dàlóu shì shénme dìfang?"
  },
  {
   "id": "c-ball",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "ball-roll",
   "speaker": "rabbit",
   "listener": "bear",
   "situation": {
    "zh": "小熊把球滚向小兔。小兔说：",
    "en": "小熊 rolls the ball to 小兔. 小兔 says:"
   },
   "q": "球滚过＿＿了！",
   "forms": [
    {
     "t": "来",
     "ok": true
    },
    {
     "t": "去",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "bear",
    "listener": "rabbit",
    "situation": {
     "zh": "同一个球，现在小熊说。",
     "en": "The same ball; now 小熊 speaks."
    },
    "q": "球滚过＿＿了。",
    "ans": "change",
    "forms": [
     {
      "t": "去",
      "ok": true
     },
     {
      "t": "来",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat-child",
   "mode": "come",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。小熊在厨房里说：",
    "en": "The cat runs from the living room into the kitchen. 小熊, in the kitchen, says:"
   },
   "q": "小猫到厨房＿＿了！",
   "forms": [
    {
     "t": "来",
     "ok": true
    },
    {
     "t": "去",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的小兔说。",
     "en": "The same cat; now 小兔, in the living room, speaks."
    },
    "q": "小猫到厨房＿＿了。",
    "ans": "change",
    "forms": [
     {
      "t": "去",
      "ok": true
     },
     {
      "t": "来",
      "at": "end"
     }
    ]
   }
  },
  {
   "id": "c-cat",
   "mode": "come",
   "bands": [
    "youth"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "cat-rooms",
   "speaker": "bear",
   "listener": "rabbit",
   "situation": {
    "zh": "猫从客厅跑进厨房。小熊在厨房里，跟小兔打电话说：",
    "en": "The cat runs from the living room into the kitchen. 小熊, in the kitchen, tells 小兔 on the phone:"
   },
   "q": "小猫跑进厨房＿＿了。",
   "forms": [
    {
     "t": "来",
     "ok": true
    },
    {
     "t": "去",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "rabbit",
    "listener": "bear",
    "situation": {
     "zh": "同一只猫，现在客厅里的小兔跟别人说。",
     "en": "The same cat; now 小兔, in the living room, tells someone."
    },
    "q": "小猫跑进厨房＿＿了。",
    "ans": "change",
    "forms": [
     {
      "t": "去",
      "ok": true
     },
     {
      "t": "来",
      "at": "end"
     }
    ]
   },
   "r": "Xiǎomāo pǎojìn chúfáng lai le."
  },
  {
   "id": "c-call",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "call-door",
   "speaker": "ben",
   "listener": "mum",
   "situation": {
    "zh": "妈妈在门口叫小文。小文在房间里，一边朝门口走一边回答：",
    "en": "妈妈 calls 小文 from the front door. 小文, in the room, answers while walking to the door:"
   },
   "q": "＿＿了！",
   "forms": [
    {
     "t": "来",
     "ok": true
    },
    {
     "t": "去",
     "at": "start",
     "say": {
      "zh": "“去了”听起来像你要离开、去别的地方。",
      "en": "去了 sounds as if you are leaving for somewhere else."
     }
    }
   ],
   "swap": {
    "speaker": "mum",
    "listener": "ben",
    "situation": {
     "zh": "还是同一段路。现在门口的妈妈对别人说小文的事。",
     "en": "The same walk. Now 妈妈, at the door, tells someone about 小文."
    },
    "q": "小文＿＿了。",
    "ans": "same",
    "forms": [
     {
      "t": "来",
      "ok": true
     },
     {
      "t": "去",
      "at": "start"
     }
    ]
   },
   "extra": {
    "zh": "有人叫你，你朝他走过去，汉语常说“来了”。日语这里说 行きます。",
    "en": "When someone calls you and you walk to them, Chinese usually says 来了. Japanese says 行きます here."
   },
   "r": "Lái le!",
   "rev": true
  },
  {
   "id": "c-umbrella",
   "mode": "come",
   "bands": [
    "child",
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "home-school",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "早上在家，妈妈对要去上学的乐乐说：",
    "en": "In the morning at home, 妈妈 says to 乐乐, who is leaving for school:"
   },
   "q": "把伞带到学校＿＿。",
   "forms": [
    {
     "t": "去",
     "ok": true
    },
    {
     "t": "来",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "teacher",
    "listener": "kid",
    "situation": {
     "zh": "前一天在学校，老师对乐乐说（伞同样是从家到学校）：",
     "en": "The day before, at school, 老师 says to 乐乐 (the umbrella goes from home to school all the same):"
    },
    "q": "明天把伞带＿＿。",
    "ans": "change",
    "forms": [
     {
      "t": "来",
      "ok": true
     },
     {
      "t": "去",
      "at": "start"
     }
    ]
   },
   "r": "Bǎ sǎn dàidào xuéxiào qu."
  },
  {
   "id": "c-home",
   "mode": "come",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "come-home",
   "speaker": "mum",
   "listener": "kid",
   "situation": {
    "zh": "乐乐还在学校。在家的妈妈打电话说：",
    "en": "乐乐 is still at school. 妈妈, at home, says on the phone:"
   },
   "q": "早点儿回＿＿！",
   "forms": [
    {
     "t": "来",
     "ok": true
    },
    {
     "t": "去",
     "at": "start"
    }
   ],
   "swap": {
    "speaker": "teacher",
    "listener": "kid",
    "situation": {
     "zh": "同一段路。现在学校里的老师对乐乐说：",
     "en": "The same way home. Now 老师, at school, says to 乐乐:"
    },
    "q": "天黑了，快回＿＿吧。",
    "ans": "change",
    "forms": [
     {
      "t": "去",
      "ok": true
     },
     {
      "t": "来",
      "at": "end"
     }
    ]
   },
   "r": "Zǎo diǎnr huílai!"
  },
  {
   "id": "c-trip",
   "mode": "come",
   "bands": [
    "adult",
    "youth"
   ],
   "kc": [
    "kt:zh-directional-simple"
   ],
   "scene": "trip",
   "speaker": "aki",
   "listener": "ben",
   "situation": {
    "zh": "田中从东京出差到大阪。东京办公室的小安对同事说：",
    "en": "Tanaka travels from Tokyo to Osaka for work. 小安, in the Tokyo office, tells a colleague:"
   },
   "q": "田中昨天＿＿大阪了。",
   "forms": [
    {
     "t": "去",
     "ok": true
    },
    {
     "t": "来",
     "at": "end"
    }
   ],
   "swap": {
    "speaker": "ben",
    "listener": "aki",
    "situation": {
     "zh": "同一趟出差。现在大阪办公室的小文说：",
     "en": "The same trip. Now 小文, in the Osaka office, says:"
    },
    "q": "田中昨天＿＿大阪了。",
    "ans": "change",
    "forms": [
     {
      "t": "来",
      "ok": true
     },
     {
      "t": "去",
      "at": "start"
     }
    ]
   },
   "r": "Tiánzhōng zuótiān qù Dàbǎn le."
  },
  {
   "id": "f-bear-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "bear",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "把球放在小熊的前边。",
   "r": "Bǎ qiú fàng zài xiǎoxióng de qiánbian."
  },
  {
   "id": "f-tree-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "front",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "把球放在树的前边。",
   "r": "Bǎ qiú fàng zài shù de qiánbian."
  },
  {
   "id": "f-tree-back",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "child"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "bear-tree",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "back",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "你站在这儿看。按这句话把球放好：",
    "en": "You stand here and look. Put the ball where the sentence says:"
   },
   "q": "把球放在树的后边。",
   "r": "Bǎ qiú fàng zài shù de hòubian."
  },
  {
   "id": "f-car-front",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "front",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "你站在路边，车横着停在你前面。按这句话把球放好：",
    "en": "You stand at the roadside; a car is parked sideways in front of you. Put the ball where the sentence says:"
   },
   "q": "把球放在车的前边。",
   "r": "Bǎ qiú fàng zài chē de qiánbian."
  },
  {
   "id": "f-tree-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "car-side",
   "viewer": "you",
   "ref": "tree",
   "mover": "ball",
   "word": "left",
   "frames": [
    "relative"
   ],
   "situation": {
    "zh": "还是这条路边，你站在原地。按这句话把球放好：",
    "en": "The same roadside; you stay where you are. Put the ball where the sentence says:"
   },
   "q": "把球放在树的左边。",
   "r": "Bǎ qiú fàng zài shù de zuǒbian."
  },
  {
   "id": "f-car-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "car-facing",
   "viewer": "you",
   "ref": "car",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic",
    "relative"
   ],
   "situation": {
    "zh": "一辆车车头朝着你停着。按这句话把球放好：",
    "en": "A car is parked facing you. Put the ball where the sentence says:"
   },
   "q": "把球放在车的左边。",
   "r": "Bǎ qiú fàng zài chē de zuǒbian."
  },
  {
   "id": "f-ben-left",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "ben-facing",
   "viewer": "you",
   "ref": "ben",
   "mover": "ball",
   "word": "left",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "小文面朝着你站着。按这句话把球放好：",
    "en": "小文 stands facing you. Put the ball where the sentence says:"
   },
   "q": "把球放在小文的左手边。",
   "r": "Bǎ qiú fàng zài Xiǎowén de zuǒshǒubiān."
  },
  {
   "id": "f-hotel",
   "mode": "frame",
   "kind": "place",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "taxi-hotel",
   "viewer": "taxi",
   "ref": "hotel",
   "mover": "taxi",
   "word": "front",
   "frames": [
    "intrinsic"
   ],
   "situation": {
    "zh": "你坐出租车，车从酒店背面的路开过来。酒店的大门在另一边。你对司机说：",
    "en": "You are in a taxi coming along the road behind the hotel. The hotel entrance is on the other side. You tell the driver:"
   },
   "q": "师傅，请在酒店前面停车。",
   "r": "Shīfu, qǐng zài jiǔdiàn qiánmian tíngchē."
  },
  {
   "id": "f-pick-fb",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "child",
    "youth"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "bear-far-n",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "小熊站在树的另一边，朝你这边看。哪句话对小熊来说是对的？",
    "en": "小熊 stands on the other side of the tree, looking toward you. Which sentence is true for 小熊?"
   },
   "options": [
    {
     "t": "球在树的前边。",
     "ok": true
    },
    {
     "t": "球在树的后边。"
    }
   ]
  },
  {
   "id": "f-pick-lr",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "youth",
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "bear-far-e",
   "viewer": "bear",
   "ref": "tree",
   "mover": "ball",
   "situation": {
    "zh": "小熊站在树的另一边，朝你这边看。哪句话对小熊来说是对的？",
    "en": "小熊 stands on the other side of the tree, looking toward you. Which sentence is true for 小熊?"
   },
   "options": [
    {
     "t": "球在树的左边。",
     "ok": true
    },
    {
     "t": "球在树的右边。"
    },
    {
     "t": "球在树的后边。"
    }
   ]
  },
  {
   "id": "f-pick-room",
   "mode": "frame",
   "kind": "pick",
   "bands": [
    "adult"
   ],
   "kc": [
    "kt:zh-locatives"
   ],
   "scene": "meeting-lr",
   "viewer": "ben",
   "ref": "table",
   "mover": "window",
   "situation": {
    "zh": "会议桌对面的小文说了一句话。哪句话从小文的位置说是对的？",
    "en": "小文, across the meeting table, says one of these. Which is true from where 小文 sits?"
   },
   "options": [
    {
     "t": "窗户在我右边。",
     "ok": true
    },
    {
     "t": "窗户在我左边。"
    },
    {
     "t": "门在我右边。"
    }
   ]
  }
 ],
 "review": [
  "隔开几步时，对方手边的东西只接受“那”（h-phone、h-cup、h-file）；离得很近时汉语也可能说“这”，没有出题",
  "“来了！”（朝叫你的人走过去）只接受“来”；“我这就去”等说法没有收",
  "“我明天来看你／去看你”这类以听话人为准的“来”没有出题；英语 Can I come to your party? 的汉语对应在规则里只说“一般说去”",
  "“车的前边”横着停时两种理解都接受；“在酒店前面停车”只接受大门那边",
  "“树的前边”指树和看的人之间（和英语一样的“面对”理解）",
  "“自己摆”里按“来、去、这、那”查找，“后来、起来、那么”等已排除，其他词仍可能误认",
  "拼音按句末“来／去”轻读写（lai、qu）"
 ],
 "reviewEn": [
  "With the two a few steps apart, only 那 is accepted for what is by the listener (h-phone, h-cup, h-file); at very close range Chinese may also use 这, which is not drilled",
  "来了！ (walking to someone who calls you): only 来 is accepted; expressions such as 我这就去 are not covered",
  "Listener-anchored 来 (我明天来看你 vs 去看你) is not drilled; the rule only says Can I come to your party? is usually 去 in Chinese",
  "车的前边 (car side-on): both readings accepted; 在酒店前面停车: only the entrance side accepted",
  "树的前边 is taken to mean between the tree and the viewer (the same “facing” reading as English)",
  "In “Your turn”, forms are found by 来 / 去 / 这 / 那; 后来, 起来, 那么 etc. are excluded, other words may still misfire",
  "Pinyin writes sentence-final 来 / 去 in the neutral tone (lai, qu)"
 ]
};

#!/usr/bin/env python3
"""Validate pedagogical-primitive contracts and per-language KC bindings.

Writes curriculum/primitives/coverage.md. Exit code 1 on errors.
Usage: python3 curriculum/primitives/check.py [--allow-missing-contracts]
"""
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERE = ROOT / 'primitives'
CORE_LANGS = ['en', 'ja', 'zh']   # every primitive must say how it applies to these
LANGS = CORE_LANGS + sorted(d.parent.name for d in Path(__file__).resolve().parent.parent.glob('*/kcs.json') if d.parent.name not in CORE_LANGS)
EVENTS = set('view select highlight drag drop connect disconnect reorder submit revise request_hint reveal compare explain retry complete'.split())
STRENGTH = {'suspected', 'tentative', 'supported'}
STATUS = {'implemented', 'implemented-en', 'partial', 'spec'}
CONTRACT = {
    'status': str, 'difficulty': str, 'object': str, 'requires': str, 'learnerAction': list, 'systemResponse': list,
    'ui': dict, 'trigger': dict, 'check': dict, 'evidence': dict, 'scaffold': dict, 'reverseHalf': str,
    'failureModes': list, 'stacksWith': list, 'next': list, 'fallback': (str, type(None)), 'languages': dict,
}
SUB = {
    'ui': ['screen', 'interactions', 'childVariant', 'adultVariant', 'accessibility'],
    'trigger': ['kcSignals', 'learnerSignals', 'contraindications'],
    'check': ['rules', 'independence'],
    'evidence': ['events', 'retained', 'licensed', 'prohibited'],
    'scaffold': ['hints', 'fade'],
}
ASSET_INDEX = Path.home() / 'Documents/edu-ai-builders/language-learning-asset-library/runtime/asset-index.json'
BLOCKS = ROOT.parent / 'blocks'


def load_registry():
    """blocks/registry.js is `window.KT_REGISTRY = <json>;`."""
    text = (BLOCKS / 'registry.js').read_text()
    body = text[text.index('window.KT_REGISTRY =') + len('window.KT_REGISTRY ='):].strip().rstrip(';')
    return json.loads(body)


def check_registry(reg, kcs_by_lang, prims, errors):
    for bid, b in reg['blocks'].items():
        if not (BLOCKS / b['file']).exists():
            errors.append(f'blocks: {bid} file {b["file"]} missing')
        if b['primitive'] not in prims:
            errors.append(f'blocks: {bid} implements unknown {b["primitive"]}')
    for pid, pk in reg['packs'].items():
        if pk.get('block') not in reg['blocks']:
            errors.append(f'blocks: pack {pid} names unknown block {pk.get("block")}')
        if not (BLOCKS / pk['file']).exists():
            errors.append(f'blocks: pack {pid} file {pk["file"]} missing')
            continue
        text = (BLOCKS / pk['file']).read_text()
        start = max(text.find(f'KT_DATA["{pid}"]'), text.find(f"KT_DATA['{pid}']"))
        if start < 0:
            errors.append(f'blocks: pack {pid} not defined in {pk["file"]}')
            continue
        nxt = text.find('KT_DATA[', start + 9)
        segment = text[start:nxt if nxt > 0 else len(text)]
        if 'review' not in segment:
            errors.append(f'blocks: pack {pid} has no review list (items awaiting native-speaker check; [] if none)')
    for a in reg['artifacts']:
        page, _, query = a['href'].partition('?')
        block = next((bid for bid, b in reg['blocks'].items() if b['file'] == page), None)
        if not block:
            errors.append(f'blocks: artifact {a["id"]} uses unknown block page {page}')
        sets = [q[4:] for q in query.split('&') if q.startswith('set=')]
        if not sets or sets[0] not in reg['packs']:
            errors.append(f'blocks: artifact {a["id"]} uses unknown pack {sets}')
            continue
        pk = reg['packs'][sets[0]]
        if block and pk.get('block') != block:
            errors.append(f'blocks: artifact {a["id"]} opens pack {sets[0]} (for {pk.get("block")}) in {block}')
        if pk.get('lang') != a['lang']:
            errors.append(f'blocks: artifact {a["id"]} is {a["lang"]} but pack {sets[0]} is {pk.get("lang")}')
        for kc in a['kcs']:
            if kc not in kcs_by_lang.get(a['lang'], {}):
                errors.append(f'blocks: artifact {a["id"]} bound to unknown KC {kc}')



AGE_DIMS = ['session', 'pace', 'input', 'rules', 'feedback', 'autonomy', 'motivation', 'media', 'reading', 'social', 'evidence']
AGE_GROUPS = {'5-7', '8-12', '13-17', '18-22', 'adult'}


def check_age_bands(prims, errors, warns):
    """age-bands.json (Chinese original) and age-bands.en.json must have the same structure; refs must exist
    in pedagogy/graph.json; variants, once written, must cover every primitive in every band."""
    zh_path, en_path = HERE / 'age-bands.json', HERE / 'age-bands.en.json'
    if not zh_path.exists():
        return
    zh, en = json.loads(zh_path.read_text()), json.loads(en_path.read_text())
    ped = {n['id'] for n in json.loads((ROOT.parent / 'pedagogy/graph.json').read_text())['nodes']}

    def shape(o):
        if isinstance(o, dict):
            return {k: shape(v) for k, v in o.items()}
        if isinstance(o, list):
            return [shape(v) for v in o] if o and isinstance(o[0], (dict, list)) else list(o) if all(not isinstance(v, str) or re.fullmatch(r'[\w:.-]+', v) for v in o) else len(o)
        return o if isinstance(o, str) and re.fullmatch(r'(ped|prim):[\w-]+|[a-z_-]+|[\d-]+', o) else type(o).__name__
    if shape(zh) != shape(en):
        errors.append('age-bands: age-bands.json and age-bands.en.json differ in keys, ids or references')
    bands = [b['id'] for b in zh['bands']]
    covered = set()
    for b in zh['bands']:
        covered |= set(b['ages'])
        if not set(b['ages']) <= AGE_GROUPS:
            errors.append(f"age-bands: {b['id']} has unknown age group")
        if list(b['dimensions']) != AGE_DIMS:
            errors.append(f"age-bands: {b['id']} dimensions must be {AGE_DIMS}")
        for k, d in b['dimensions'].items():
            if not d.get('do') or not d.get('avoid') or d.get('basis') not in ('literature', 'design_inference'):
                errors.append(f"age-bands: {b['id']}.{k} needs do, avoid and a basis")
            if d.get('basis') == 'literature' and not d.get('refs'):
                errors.append(f"age-bands: {b['id']}.{k} says literature but cites nothing")
            for r in d.get('refs', []):
                if r not in ped:
                    errors.append(f"age-bands: {b['id']}.{k} cites unknown {r}")
    if covered != AGE_GROUPS:
        errors.append(f'age-bands: age groups not all covered: {sorted(AGE_GROUPS - covered)}')
    for name, doc in (('age-bands.json', zh), ('age-bands.en.json', en)):
        v = doc.get('variants', {})
        if not v:
            warns.append(f'{name}: variants not written yet')
            continue
        for pid in prims:
            if pid not in v:
                errors.append(f'{name}: no age variants for {pid}')
        for pid, per in v.items():
            if pid not in prims:
                errors.append(f'{name}: variants for unknown {pid}')
            if list(per) != bands:
                errors.append(f'{name}: {pid} must have variants for {bands}')
            for band, x in per.items():
                if x.get('fit') not in ('core', 'adapt', 'defer') or not x.get('how') or not x.get('watch'):
                    errors.append(f'{name}: {pid}.{band} needs fit, how and watch')
                if (x.get('fit') == 'defer') != bool(x.get('instead')):
                    errors.append(f'{name}: {pid}.{band} needs "instead" exactly when fit is defer')
                if x.get('instead') and (x['instead'] not in prims or x['instead'] == pid):
                    errors.append(f"{name}: {pid}.{band} instead points to unknown or same primitive")


def check_primitives_en(errors):
    """primitives.en.json mirrors primitives.json: same ids in the same order, same keys and list lengths (implementations excluded)."""
    en_path = HERE / 'primitives.en.json'
    if not en_path.exists():
        return
    zh = json.loads((HERE / 'primitives.json').read_text())['primitives']
    en = json.loads(en_path.read_text())['primitives']
    if [p['id'] for p in zh] != [p['id'] for p in en]:
        errors.append('primitives.en.json: ids differ from primitives.json'); return
    def shape(a, b, path):
        if isinstance(a, dict):
            if not isinstance(b, dict) or set(a) != set(b):
                errors.append(f'primitives.en.json: keys differ at {path}'); return
            for k in a: shape(a[k], b[k], path + '.' + k)
        elif isinstance(a, list):
            if not isinstance(b, list) or len(a) != len(b):
                errors.append(f'primitives.en.json: list length differs at {path}'); return
            for i, x in enumerate(a): shape(x, b[i], f'{path}[{i}]')
        elif isinstance(a, str) != isinstance(b, str):
            errors.append(f'primitives.en.json: type differs at {path}')
    for z, e in zip(zh, en):
        shape({k: v for k, v in z.items() if k != 'implementations'}, e, z['id'])
        for k in ('family', 'status', 'nameEn'):
            if z.get(k) != e.get(k): errors.append(f"primitives.en.json: {z['id']} {k} changed")


def check_age_design(reg, errors):
    """age-design.json: every construct is a full chain (claim, how we read it, limits, variables with a value for
    each band, a layer, at least one measure); refs exist in the pedagogy graph; per-block rows use known variables
    and known blocks. The English file must have the same shape."""
    zh_path, en_path = HERE / 'age-design.json', HERE / 'age-design.en.json'
    if not zh_path.exists():
        return
    zh = json.loads(zh_path.read_text())
    ped = {n['id'] for n in json.loads((HERE.parent.parent / 'pedagogy/graph.json').read_text())['nodes']}
    bands = ['child', 'youth', 'adult']
    if [l['id'] for l in zh.get('layers', [])] != ['kc', 'plan', 'block']:
        errors.append('age-design: layers must be kc, plan, block')
    for b in bands:
        d = zh.get('planDefaults', {}).get(b, {})
        if not all(isinstance(d.get(k), (int, float)) for k in ('sessionMinutes', 'minutesPerKc', 'reviewShare')):
            errors.append(f'age-design: planDefaults.{b} needs sessionMinutes, minutesPerKc, reviewShare')
    var_ids = {}
    for c in zh.get('constructs', []):
        cid = c.get('id')
        k = c.get('construct', {})
        if not (c.get('label') and c.get('question') and k.get('claim') and k.get('understood') and k.get('limits')):
            errors.append(f'age-design: {cid} needs label, question, claim, understood and limits')
        if k.get('basis') not in ('literature', 'design_inference'):
            errors.append(f'age-design: {cid} basis must be literature or design_inference')
        if not k.get('refs'):
            errors.append(f'age-design: {cid} cites nothing')
        for r in k.get('refs', []):
            if r not in ped:
                errors.append(f'age-design: {cid} cites unknown {r}')
        if not all(c.get('answer', {}).get(b) for b in bands):
            errors.append(f'age-design: {cid} needs a short answer for each band')
        if not c.get('variables') or not c.get('measures'):
            errors.append(f'age-design: {cid} needs variables and measures')
        for v in c.get('variables', []):
            if v.get('id') in var_ids:
                errors.append(f"age-design: variable {v.get('id')} defined twice")
            var_ids[v.get('id')] = cid
            if v.get('layer') not in ('kc', 'plan', 'block') or not all(v.get('values', {}).get(b) for b in bands):
                errors.append(f"age-design: {cid}.{v.get('id')} needs a layer and a value for each band")
        for m in c.get('measures', []):
            if m.get('source') not in ('block', 'host') or not (m.get('label') and m.get('how') and m.get('reads')):
                errors.append(f'age-design: {cid} measure needs label, how, reads and source block|host')
    for slug, spec in zh.get('blocks', {}).items():
        if slug not in reg.get('blocks', {}):
            errors.append(f'age-design: blocks.{slug} is not a registered block')
        if not spec.get('summary') or not spec.get('rows'):
            errors.append(f'age-design: blocks.{slug} needs summary and rows')
        for row in spec.get('rows', []):
            if row.get('variable') not in var_ids:
                errors.append(f"age-design: blocks.{slug} uses unknown variable {row.get('variable')}")
            if not (all(row.get(b) for b in bands) or (row.get('child') and row.get('default'))):
                errors.append(f"age-design: blocks.{slug}.{row.get('variable')} needs child/youth/adult or child/default")
    if not en_path.exists():
        errors.append('age-design: age-design.en.json is missing')
        return
    en = json.loads(en_path.read_text())

    def shape(x):
        if isinstance(x, dict):
            return {k: (v if k in ('id', 'variable', 'layer', 'source', 'basis', 'refs') or isinstance(v, (int, float)) else shape(v)) for k, v in x.items()}
        if isinstance(x, list):
            return [shape(v) for v in x]
        return type(x).__name__
    if shape(zh) != shape(en):
        errors.append('age-design: age-design.json and age-design.en.json differ in keys, ids or references')


def check_roles_and_workflows(prims, errors):
    """image-roles and workflows: Chinese original and English file agree in structure; primitive ids and
    research references exist; workflow steps name real primitives and real image roles."""
    ped = {n['id'] for n in json.loads((ROOT.parent / 'pedagogy/graph.json').read_text())['nodes']}

    def keys(o):
        if isinstance(o, dict):
            return {k: keys(v) for k, v in o.items()}
        if isinstance(o, list):
            return [keys(v) for v in o]
        return o if isinstance(o, str) and re.fullmatch(r'(ped|prim|wf):[\w-]+|[a-z]+(-[a-z]+)+', o) else None
    pairs = {}
    for name in ('image-roles', 'workflows'):
        zh_path = HERE / f'{name}.json'
        if not zh_path.exists():
            continue
        zh, en = json.loads(zh_path.read_text()), json.loads((HERE / f'{name}.en.json').read_text())
        if keys(zh) != keys(en):
            errors.append(f'{name}: {name}.json and {name}.en.json differ in keys, ids or references')
        pairs[name] = zh
    roles = {r['id']: r for r in pairs.get('image-roles', {}).get('roles', [])}
    for rid, r in roles.items():
        if r['generatable'] not in pairs['image-roles']['generatable']:
            errors.append(f'image-roles: {rid} has unknown generatable value')
        if set(r['placement']) != {'child', 'youth', 'adult'} or not r['mustShow'] or not r['mustNot']:
            errors.append(f'image-roles: {rid} needs mustShow, mustNot and placement for three bands')
        for x in r['primitives']:
            if x not in prims:
                errors.append(f'image-roles: {rid} names unknown {x}')
        for x in r['refs']:
            if x not in ped:
                errors.append(f'image-roles: {rid} cites unknown {x}')
    for w in pairs.get('workflows', {}).get('workflows', []):
        if set(w['pace']) != set(w['bands']):
            errors.append(f"workflows: {w['id']} needs a pace for each of its bands")
        for x in w['refs']:
            if x not in ped:
                errors.append(f"workflows: {w['id']} cites unknown {x}")
        for st in w['steps']:
            if st['primitive'] not in prims:
                errors.append(f"workflows: {w['id']}.{st['id']} names unknown {st['primitive']}")
            pic = st['media']['picture']
            if re.fullmatch(r'[a-z-]+', pic) and roles and pic not in roles:
                errors.append(f"workflows: {w['id']}.{st['id']} names unknown image role {pic}")

def main(allow_missing):
    errors, warns = [], []
    cat = json.loads((HERE / 'primitives.json').read_text())
    prims = {p['id']: p for p in cat['primitives']}
    assets = None
    if ASSET_INDEX.exists():
        assets = {a['id'] for a in json.loads(ASSET_INDEX.read_text())['assets']}

    reg = load_registry()
    artifact_ids = {a['id'] for a in reg['artifacts']}

    # 1. contracts
    for pid, p in prims.items():
        if p['family'] not in cat['families']:
            errors.append(f'{pid}: unknown family {p["family"]}')
        for impl in p['implementations']:
            if 'artifact' in impl:
                if impl['artifact'] not in artifact_ids:
                    errors.append(f'{pid}: implementation {impl["artifact"]} not in blocks/registry.js')
            elif assets is not None and impl['asset'] not in assets:
                errors.append(f'{pid}: implementation {impl["asset"]} not in asset library index')
        missing = [f for f in CONTRACT if f not in p]
        if missing:
            (warns if allow_missing else errors).append(f'{pid}: contract missing {", ".join(missing)}')
            continue
        for f, t in CONTRACT.items():
            if not isinstance(p[f], t):
                errors.append(f'{pid}: {f} has wrong type')
        for f, keys in SUB.items():
            for key in keys:
                if not p[f].get(key):
                    errors.append(f'{pid}: {f}.{key} empty')
        if p['status'] not in STATUS:
            errors.append(f'{pid}: status {p["status"]}')
        if p['status'] == 'spec' and p['implementations']:
            errors.append(f'{pid}: status spec but has implementations')
        if p['status'] != 'spec' and not p['implementations']:
            errors.append(f'{pid}: status {p["status"]} without implementations')
        for e in p['evidence'].get('events', []):
            if e not in EVENTS:
                errors.append(f'{pid}: evidence event {e} not in evidence-event vocabulary')
        for lic in p['evidence'].get('licensed', []):
            if lic.get('maxStrength') not in STRENGTH or not lic.get('claim') or not isinstance(lic.get('minObservations'), int):
                errors.append(f'{pid}: malformed licensed inference {lic}')
        refs = [s.get('id') for s in p['stacksWith']] + p['next'] + ([p['fallback']] if p['fallback'] else [])
        for r in refs:
            if r not in prims:
                errors.append(f'{pid}: references unknown primitive {r}')
            elif r == pid:
                errors.append(f'{pid}: references itself')
        for lang in CORE_LANGS:
            if not p['languages'].get(lang):
                errors.append(f'{pid}: languages.{lang} empty')
        if len(p['learnerAction']) < 2:
            errors.append(f'{pid}: learnerAction needs at least 2 steps')
        if not p['failureModes'] or any(not all(fm.get(k) for k in ('failure', 'mitigation', 'test')) for fm in p['failureModes']):
            errors.append(f'{pid}: failureModes need failure/mitigation/test')

    # 2. bindings
    use = {lang: defaultdict(lambda: {'primary': [], 'support': []}) for lang in LANGS}
    gaps = {}
    kcs_by_lang = {}
    for lang in LANGS:
        kcs = json.loads((ROOT / lang / 'kcs.json').read_text())['kcs']
        kcs_by_lang[lang] = {k['id']: k for k in kcs}
        path = ROOT / lang / 'primitive-map.json'
        if not path.exists():
            (warns if allow_missing else errors).append(f'{lang}: primitive-map.json missing')
            continue
        m = json.loads(path.read_text())
        gaps[lang] = m.get('gaps', [])
        seen = Counter(e['kc'] for e in m['map'])
        for kc in kcs_by_lang[lang]:
            if kc not in seen:
                errors.append(f'{lang}: {kc} has no primitive binding')
        for kc, n in seen.items():
            if kc not in kcs_by_lang[lang]:
                errors.append(f'{lang}: binding for unknown KC {kc}')
            if n > 1:
                errors.append(f'{lang}: {kc} bound {n} times')
        for e in m['map']:
            roles = Counter(u['role'] for u in e['uses'])
            if roles['primary'] != 1 or len(e['uses']) > 3 or set(roles) - {'primary', 'support'}:
                errors.append(f'{lang}: {e["kc"]} needs exactly one primary and at most 3 uses')
            if len({u['primitive'] for u in e['uses']}) != len(e['uses']):
                errors.append(f'{lang}: {e["kc"]} uses a primitive twice')
            for u in e['uses']:
                if u['primitive'] not in prims:
                    errors.append(f'{lang}: {e["kc"]} uses unknown {u["primitive"]}')
                    continue
                if not u.get('binding'):
                    errors.append(f'{lang}: {e["kc"]} → {u["primitive"]} has no binding')
                use[lang][u['primitive']][u['role']].append(e['kc'])
        for g in gaps[lang]:
            if g.get('kc') not in kcs_by_lang[lang]:
                errors.append(f'{lang}: gap entry for unknown KC {g.get("kc")}')

    check_registry(reg, kcs_by_lang, prims, errors)
    check_age_bands(prims, errors, warns)
    check_roles_and_workflows(prims, errors)
    check_age_design(reg, errors)
    check_primitives_en(errors)

    for pid in prims:
        if not any(use[lang][pid]['primary'] or use[lang][pid]['support'] for lang in LANGS):
            warns.append(f'{pid}: not bound to any KC')

    (HERE / 'coverage.md').write_text(report(cat, prims, use, gaps, kcs_by_lang))
    for w in warns:
        print('WARN ', w)
    for e in errors:
        print('ERROR', e)
    bound = {lang: sum(1 for kc in kcs_by_lang[lang] if any(kc in use[lang][p]['primary'] for p in prims)) for lang in LANGS}
    done = sum(1 for p in prims.values() if 'difficulty' in p)
    print(f'primitives: {len(prims)} ({done} with contracts); bound KCs: ' +
          ', '.join(f'{lang} {bound[lang]}/{len(kcs_by_lang[lang])}' for lang in LANGS) + f'; {len(errors)} errors, {len(warns)} warnings')
    return 1 if errors else 0


def report(cat, prims, use, gaps, kcs_by_lang):
    st = {'implemented': '有实现', 'implemented-en': '有英语实现', 'partial': '部分实现', 'spec': '仅契约'}
    out = ['# 教学原语覆盖报告', '', '由 `python3 curriculum/primitives/check.py` 生成，不要手改。', '',
           '每一格是"以它为主要原语的知识点数 / 作为辅助的知识点数"。', '']
    out.append('| 原语 | 领域 | 状态 | 实现 | en | ja | zh |')
    out.append('| --- | --- | --- | --- | ---: | ---: | ---: |')
    for pid, p in prims.items():
        impl = ', '.join(i['asset'].split('-')[0] if 'asset' in i else f"`{i['artifact']}`" for i in p['implementations']) or '—'
        cells = [f"{len(use[l][pid]['primary'])} / {len(use[l][pid]['support'])}" for l in LANGS]
        out.append(f"| {p['name']} `{pid}` | {cat['families'][p['family']]} | {st.get(p.get('status'), '未写契约')} | {impl} | " + ' | '.join(cells) + ' |')
    out += ['', '## 缺口：主要原语还没有任何实现的知识点', '',
            '这些知识点的核心困难落在只有契约的原语上，是新建实现的优先清单。', '']
    for lang in LANGS:
        rows = defaultdict(list)
        for pid, p in prims.items():
            if p.get('status') == 'spec':
                rows[pid] = use[lang][pid]['primary']
        total = sum(len(v) for v in rows.values())
        out.append(f'### {lang}：{total} / {len(kcs_by_lang[lang])} 个知识点')
        out.append('')
        for pid, kcs in sorted(rows.items(), key=lambda x: -len(x[1])):
            if kcs:
                labels = '、'.join(kcs_by_lang[lang][k]['label'] for k in kcs[:8]) + ('……' if len(kcs) > 8 else '')
                out.append(f"- **{prims[pid]['name']}**（{len(kcs)}）：{labels}")
        out.append('')
    out += ['## 绑定时发现的、现有原语都不太合适的知识点', '']
    for lang in LANGS:
        for g in gaps.get(lang, []):
            label = kcs_by_lang[lang].get(g['kc'], {}).get('label', g['kc'])
            out.append(f"- {lang} · {label}（`{g['kc']}`）：{g.get('reason', '')} 建议：{g.get('proposal', '')}")
    return '\n'.join(out) + '\n'


if __name__ == '__main__':
    sys.exit(main('--allow-missing-contracts' in sys.argv))

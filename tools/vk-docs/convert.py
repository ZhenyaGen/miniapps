"""Convert the VK developer-docs PDF export into a clean Markdown knowledge base.

The PDFs are print exports of dev.vk.com pages. Font metadata is stable across
the whole corpus, so headings, code blocks, inline code and table rows can be
recovered instead of flattening everything into prose.

Usage: python3 convert.py [raw-dir] [out-dir]
"""
import fitz, json, os, re, sys, collections

RAW = sys.argv[1] if len(sys.argv) > 1 else '_raw'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'docs/vk'

TRANSLIT = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i',
    'й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
    'у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'',
    'э':'e','ю':'yu','я':'ya',
}

CATEGORY = {
    'VK Bridge': 'vk-bridge',
    'Мини-приложения': 'mini-apps',
    'Мини-приложений': 'mini-apps',
    'О приложениях': 'mini-apps',
    'VK Games': 'vk-games',
    'Библиотеки': 'libraries',
    'Интеграция': 'integration',
    'VK Pay': 'vk-pay',
    'Использование API': 'api',
    'API ВКонтакте': 'api',
    'Описание методов API': 'api',
    'VK Captcha': 'captcha',
    'VK ID Captcha': 'captcha',
    'VK Testers': 'vk-testers',
    'Маски': 'masks',
    'Правила': 'rules',
    'Одноклассники': 'odnoklassniki',
    'Приложения в Одноклассниках': 'odnoklassniki',
    'VK Карты': 'vk-maps',
    'Стикеры в историях': 'stories',
    'Авторизация от VK': 'vk-id',
    'Поддержка': 'misc',
    'Документация': 'misc',
}

CATEGORY_TITLE = {
    'vk-bridge': 'VK Bridge — события и работа с платформой',
    'mini-apps': 'Мини-приложения — платформа, запуск, обучение',
    'vk-games': 'VK Games — игры, монетизация, продвижение',
    'libraries': 'Библиотеки и SDK (VKUI, VK Bridge, VK ID и др.)',
    'integration': 'Интеграция приложений с платформой',
    'api': 'API ВКонтакте — методы, авторизация, объекты',
    'vk-pay': 'VK Pay — платежи и подписки',
    'captcha': 'VK Captcha',
    'vk-testers': 'VK Testers — тестирование приложений',
    'masks': 'Маски',
    'rules': 'Правила платформы и модерация',
    'odnoklassniki': 'Одноклассники — запуск приложений в ОК',
    'vk-maps': 'VK Карты',
    'stories': 'Истории и стикеры',
    'vk-id': 'VK ID — авторизация от VK',
    'misc': 'Прочее',
}

CODE_LANGS = {
    'javascript': 'js', 'typescript': 'ts', 'json': 'json', 'html': 'html',
    'css': 'css', 'bash': 'bash', 'shell': 'bash', 'sh': 'bash', 'php': 'php',
    'python': 'python', 'java': 'java', 'kotlin': 'kotlin', 'swift': 'swift',
    'objective-c': 'objc', 'dart': 'dart', 'xml': 'xml', 'yaml': 'yaml',
    'sql': 'sql', 'jsx': 'jsx', 'tsx': 'tsx', 'text': 'text', 'c#': 'csharp',
    'go': 'go', 'ruby': 'ruby', 'c++': 'cpp', 'plaintext': 'text', 'curl': 'bash',
}

CHROME = {'EN', 'RU', 'На этой странице', 'Наверх'}

# Known defects of the source export, surfaced in the converted page.
SOURCE_NOTES = {
    'VK Bridge _ VKWebAppAddToHomeScreenInfo _ VK для разработчиков':
        'В исходном PDF на этой странице находится описание события '
        '`VKWebAppRecommend`, а не `VKWebAppAddToHomeScreenInfo`. Актуальное '
        'описание смотрите на [dev.vk.ru](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreenInfo).',
}
MONO = 'JetBrainsMono'


def is_code_span(span):
    """Code identifiers are set either in JetBrains Mono or in plain SegoeUI."""
    font = span['font']
    if font.startswith(MONO):
        return True
    return font == 'SegoeUI' and span['size'] <= 11.0


def slug(s, maxlen=60):
    s = s.replace('‑', '-').replace(' ', ' ').lower()
    out = []
    for ch in s:
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isalnum() and ch.isascii():
            out.append(ch)
        else:
            out.append('-')
    s = re.sub(r'-+', '-', ''.join(out)).strip('-')
    if len(s) > maxlen:
        s = s[:maxlen].rstrip('-')
    return s or 'page'


AWAY_RE = re.compile(r'https?://[^/]*vk\.(?:ru|com)/away\.php\?to=(.+)$')


def normalize_uri(uri):
    m = AWAY_RE.match(uri)
    if m:
        from urllib.parse import unquote
        uri = unquote(m.group(1).split('&cc_key')[0].split('&post')[0])
    return uri


def span_link(span, links):
    """URL of the link annotation covering this span, if any."""
    x0, y0, x1, y1 = span['bbox']
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    for rect, uri in links:
        if rect.x0 - 1 <= cx <= rect.x1 + 1 and rect.y0 - 2 <= cy <= rect.y1 + 2:
            return uri
    return None


def line_markdown(line, links=()):
    """Render one PDF text line: monospace runs -> backticks, annotations -> links."""
    parts = []
    for span in line['spans']:
        text = span['text']
        if not text:
            continue
        mono = is_code_span(span)
        uri = span_link(span, links) if links else None
        if parts and parts[-1][0] == mono and parts[-1][2] == uri:
            parts[-1][1] += text
        else:
            parts.append([mono, text, uri])
    out = []
    for mono, text, uri in parts:
        stripped = text.strip()
        if mono:
            if stripped:
                lead = ' ' if text[:1].isspace() else ''
                tail = ' ' if text[-1:].isspace() else ''
                tick = '``' if '`' in stripped else '`'
                body = f'{tick}{stripped}{tick}'
                if uri:
                    body = f'[{body}]({uri})'
                out.append(f'{lead}{body}{tail}')
        elif uri and stripped:
            lead = ' ' if text[:1].isspace() else ''
            tail = ' ' if text[-1:].isspace() else ''
            label = stripped.replace('[', '\\[').replace(']', '\\]')
            out.append(f'{lead}[{label}]({uri}){tail}')
        else:
            out.append(text)
    line = re.sub(r'[ \t]+', ' ', ''.join(out)).strip()
    # inline-code spans carry trailing spaces from the PDF: `Promise` , -> `Promise`,
    return re.sub(r'\s+([,.;:!?»)])', r'\1', line)


def parse_block(block, links=()):
    """Classify a PDF block and return a normalized record."""
    spans = [s for l in block['lines'] for s in l['spans'] if s['text'].strip()]
    if not spans:
        return None
    raw = ''.join(s['text'] for l in block['lines'] for s in l['spans'])
    plain = re.sub(r'\s+', ' ', raw).strip()
    if not plain or plain in CHROME:
        return None

    mono_chars = sum(len(s['text'].strip()) for s in spans if s['font'].startswith(MONO))
    all_chars = sum(len(s['text'].strip()) for s in spans) or 1
    max_size = max(s['size'] for s in spans)
    bold = any('Bold' in s['font'] or 'Medium' in s['font'] for s in spans)
    all_bold = all('Bold' in s['font'] or 'Medium' in s['font'] for s in spans)

    rec = {'x': block['bbox'][0], 'y': block['bbox'][1], 'y1': block['bbox'][3],
           'plain': plain, 'kind': 'text', 'lines': []}

    # code block: monospace, small size, not a lone inline reference
    if mono_chars / all_chars > 0.85 and max_size <= 10.8:
        rec['kind'] = 'code'
        rec['lines'] = [''.join(s['text'] for s in l['spans']).rstrip() for l in block['lines']]
        return rec

    if max_size <= 10.2 and plain.lower() in CODE_LANGS and bold:
        rec['kind'] = 'lang'
        rec['lang'] = CODE_LANGS[plain.lower()]
        return rec

    md_lines = [line_markdown(l, links) for l in block['lines']]
    md_lines = [l for l in md_lines if l]
    if not md_lines:
        return None

    if max_size >= 16.5:
        rec['kind'] = 'h1'
    elif max_size >= 14.0 and bold:
        rec['kind'] = 'h2'
    elif max_size >= 12.4 and bold:
        rec['kind'] = 'h3'
    elif plain == '•':
        rec['kind'] = 'bullet-marker'
    elif all_bold and len(md_lines) >= 2 and all(len(l) < 40 for l in md_lines):
        # bold multi-line block above a table = its header row
        rec['kind'] = 'thead'
    elif all_bold and len(md_lines) == 1 and len(plain) < 90:
        rec['kind'] = 'h4'

    rec['lines'] = md_lines
    return rec


def join_prose(lines):
    """Join soft-wrapped lines; keep bullets and numbered items on their own line."""
    out = []
    for ln in lines:
        if re.match(r'^(•|[-*–—]\s|\d+[.)]\s)', ln) or not out:
            out.append(ln)
        else:
            out[-1] = out[-1].rstrip() + ' ' + ln.lstrip()
    return [re.sub(r'^•\s*', '- ', l) for l in out]


def page_records(page):
    links = []
    for link in page.get_links():
        uri = link.get('uri')
        if not uri:
            continue
        rect = fitz.Rect(link['from'])
        # site logo in the page header overlaps real content on continuation pages
        if rect.y0 < 30 and rect.x0 < 30 and re.fullmatch(r'https?://dev\.vk\.(ru|com)(/ru)?/?', uri):
            continue
        links.append((rect, normalize_uri(uri)))
    recs = []
    for block in page.get_text('dict')['blocks']:
        if block.get('type') != 0:
            continue
        rec = parse_block(block, links)
        if rec:
            recs.append(rec)
    recs.sort(key=lambda r: (round(r['y'] / 6), r['x']))
    return recs


def render(recs):
    md = []
    pending_lang = None
    pending_header = None   # bold block that turned out to head a table
    table_cols = 0          # column count of the table currently being emitted
    i = 0
    n = len(recs)

    def flush_header():
        nonlocal pending_header
        if pending_header:
            md.append('**' + ' | '.join(pending_header) + '**')
            md.append('')
            pending_header = None

    while i < n:
        # group blocks sharing a horizontal band -> table row
        band = [recs[i]]
        j = i + 1
        while j < n and abs(recs[j]['y'] - recs[i]['y']) < 6:
            band.append(recs[j])
            j += 1

        is_row = len(band) > 1 and all(b['kind'] in ('text', 'h3', 'h4', 'thead') for b in band)
        # a whole table row can also land in one block, one cell per line
        if not is_row and len(band) == 1 and band[0]['kind'] in ('text', 'h4'):
            ncols = len(pending_header) if pending_header else table_cols
            lines = band[0]['lines']
            if ncols >= 2 and len(lines) == ncols and not any(l.startswith('•') for l in lines) \
                    and all(len(l) < 120 for l in lines):
                band = [dict(b, lines=[l]) for b, l in zip(band * ncols, lines)]
                is_row = True
            elif ncols == 2 and not any(l.startswith('•') for l in lines):
                # "`name` description…" collapsed into one block: split after the name
                joined = ' '.join(join_prose(lines))
                m = re.match(r'^(\[[^\]]+\]\([^)\s]+\)|`[^`]+`)\s+(\S.*)$', joined)
                if m:
                    band = [dict(band[0], lines=[m.group(1)]), dict(band[0], lines=[m.group(2)])]
                    is_row = True
        if is_row:
            cells = [' '.join(join_prose(b['lines'])) for b in band]
            ncols = len(pending_header) if pending_header else table_cols
            # a cell that swallowed the next column: "integer\nОписание…" -> two cells
            if ncols and len(cells) == ncols - 1 and len(band[-1]['lines']) > 1:
                last = band[-1]['lines']
                cells = cells[:-1] + [last[0], ' '.join(join_prose(last[1:]))]
            if pending_header:
                md.append('| ' + ' | '.join(c.replace('|', '\\|') for c in pending_header) + ' |')
                md.append('|' + '---|' * len(pending_header))
                table_cols = len(pending_header)
                pending_header = None
            elif not table_cols:
                table_cols = len(cells)
            md.append('| ' + ' | '.join(c.replace('|', '\\|') for c in cells) + ' |')
            i = j
            continue

        rec = band[0]
        kind = rec['kind']
        if kind == 'thead':
            flush_header()
            if md and md[-1].startswith('|'):
                md.append('')
            table_cols = 0
            pending_header = rec['lines']
            i = j
            continue
        if md and md[-1].startswith('|'):
            md.append('')
            table_cols = 0
        flush_header()
        if kind == 'lang':
            pending_lang = rec['lang']
            i = j
            continue
        if kind == 'code':
            lines = list(rec['lines'])
            k = j
            while k < n and recs[k]['kind'] == 'code' and recs[k]['y'] - recs[k - 1]['y1'] < 14:
                lines.extend(recs[k]['lines'])
                k += 1
            while lines and not lines[-1].strip():
                lines.pop()
            body = [l for l in lines]
            indents = [len(l) - len(l.lstrip(' ')) for l in body if l.strip()]
            shift = min(indents) if indents else 0
            body = [l[shift:] if l.strip() else '' for l in body]
            md.append('```' + (pending_lang or ''))
            md.extend(body)
            md.append('```')
            md.append('')
            pending_lang = None
            i = k
            continue
        if kind in ('h1', 'h2', 'h3', 'h4'):
            level = {'h1': '## ', 'h2': '## ', 'h3': '### ', 'h4': '#### '}[kind]
            md.append(level + ' '.join(rec['lines']))
            md.append('')
            i = j
            continue
        if kind == 'bullet-marker':
            i = j
            continue

        md.extend(join_prose(rec['lines']))
        md.append('')
        i = j
    flush_header()
    return md


def postprocess(md, title):
    # headerless tables still need a separator row to render as a table
    out = []
    i = 0
    while i < len(md):
        if md[i].startswith('| '):
            rows = []
            while i < len(md) and md[i].startswith('|'):
                rows.append(md[i])
                i += 1
            if len(rows) < 2 or not rows[1].startswith('|---'):
                cols = rows[0].count(' | ') + 1
                rows.insert(1, '|' + '---|' * cols)
            out.extend(rows)
            continue
        out.append(md[i])
        i += 1

    # drop the duplicated page title emitted as first heading/line
    while out and not out[0].strip():
        out.pop(0)
    if out and out[0].lstrip('# ').strip() == title.strip():
        out.pop(0)
        while out and not out[0].strip():
            out.pop(0)

    res = []
    blank = 0
    for ln in out:
        if ln.strip():
            blank = 0
            res.append(ln.rstrip())
        else:
            blank += 1
            if blank <= 1:
                res.append('')
    while res and not res[-1].strip():
        res.pop()
    return res


def convert(path, title):
    doc = fitz.open(path)
    recs = []
    prev_sig = None
    for page in doc:
        page_recs = page_records(page)
        sig = '\n'.join(r['plain'] for r in page_recs)
        if not sig or sig == prev_sig:
            continue
        prev_sig = sig
        recs.extend(page_recs)
    doc.close()
    return '\n'.join(postprocess(render(recs), title))


def main():
    manifest = json.load(open(os.path.join(RAW, '_manifest.json'), encoding='utf-8'))
    docs = [x for x in manifest if not x['dup']]

    used = set()
    index = collections.defaultdict(list)
    empty = []

    for x in docs:
        title_raw = os.path.splitext(os.path.basename(x['orig']))[0]
        parts = [p.strip() for p in title_raw.split(' _ ') if p.strip()]
        parts = [p for p in parts if not p.startswith('VK для')]
        if not parts:
            parts = ['VK для разработчиков']
        top = parts[0]
        if top in CATEGORY:
            cat = CATEGORY[top]
        elif re.fullmatch(r'[a-zA-Z.]+', top):
            cat = 'api'
        else:
            cat = 'misc'
        title = parts[-1]
        breadcrumb = ' → '.join(parts)

        name = slug(' '.join(parts[1:]) if len(parts) > 1 else parts[0])
        rel = f'{cat}/{name}.md'
        k = 2
        while rel in used:
            rel = f'{cat}/{name}-{k}.md'
            k += 1
        used.add(rel)

        body = convert(os.path.join(RAW, x['file']), title)
        if not body.strip():
            empty.append(title_raw)

        header = (
            f'# {title}\n\n'
            f'**Раздел:** {breadcrumb}  \n'
            f'**Источник:** документация VK для разработчиков (dev.vk.com)\n\n'
        )
        note_key = title_raw.replace(' ', ' ')
        if note_key in SOURCE_NOTES:
            header += f'> ⚠️ {SOURCE_NOTES[note_key]}\n\n'
        header += '---\n\n'
        path = os.path.join(OUT, rel)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header + body + '\n')
        index[cat].append({'category': cat, 'title': title, 'breadcrumb': breadcrumb,
                           'path': rel, 'parts': parts, 'chars': len(body)})

    flat = [e for cat in index for e in index[cat]]
    flat.sort(key=lambda e: e['path'])
    json.dump(flat, open(os.path.join(OUT, 'index.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
    print('written', sum(len(v) for v in index.values()), 'empty', len(empty))
    for e in empty:
        print('  EMPTY:', e)


if __name__ == '__main__':
    main()

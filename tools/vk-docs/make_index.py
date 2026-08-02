"""Build navigation files (README.md, vk-bridge/EVENTS.md) for the knowledge base.

Reads index.json written by convert.py.

Usage: python3 make_index.py [docs-dir]
"""
import json, os, re, sys, collections

OUT = sys.argv[1] if len(sys.argv) > 1 else 'docs/vk'

CATEGORY_TITLE = {
    'vk-bridge': 'VK Bridge',
    'mini-apps': 'Мини-приложения',
    'vk-games': 'VK Games',
    'libraries': 'Библиотеки и SDK',
    'integration': 'Интеграция',
    'api': 'API ВКонтакте',
    'vk-pay': 'VK Pay',
    'captcha': 'VK Captcha',
    'vk-testers': 'VK Testers',
    'masks': 'Маски',
    'rules': 'Правила и модерация',
    'odnoklassniki': 'Одноклассники',
    'vk-maps': 'VK Карты',
    'stories': 'Истории',
    'vk-id': 'VK ID',
    'misc': 'Прочее',
}

CATEGORY_NOTE = {
    'vk-bridge': 'JavaScript-мост между мини-приложением и клиентом ВКонтакте: все события `VKWebApp*`, их параметры, ответы и совместимость с платформами.',
    'mini-apps': 'Платформа VK Mini Apps целиком: первые шаги, параметры запуска, настройки приложения, каталог, монетизация, уведомления, аналитика и полный видеокурс.',
    'vk-games': 'Игры на платформе: запуск, экономика, реклама, лидерборды, продвижение и требования площадки.',
    'libraries': 'VKUI, `vk-mini-apps-router`, VK QR, серверные SDK (PHP, Java, Android, iOS) и другие open-source библиотеки ВКонтакте.',
    'integration': 'Подключение приложения к платформе: авторизация, подпись параметров запуска, вебхуки, сервер приложения.',
    'api': 'REST API ВКонтакте: формат запросов, ключи доступа, права, обработка ошибок и справочник методов по секциям.',
    'vk-pay': 'Платежи и подписки: VK Pay, внутренняя валюта, обработка заказов на стороне сервера.',
    'captcha': 'Защита от ботов: VK Captcha и VK ID Captcha.',
    'vk-testers': 'Тестирование приложений через VK Testers.',
    'masks': 'Разработка и публикация масок.',
    'rules': 'Правила платформы, модерация, оферты и юридические требования.',
    'odnoklassniki': 'Запуск и адаптация мини-приложений в Одноклассниках.',
    'vk-maps': 'VK Карты.',
    'stories': 'Истории и стикеры.',
    'vk-id': 'Авторизация от VK (VK ID).',
    'misc': 'Материалы, не попавшие в другие разделы.',
}

ORDER = ['mini-apps', 'vk-bridge', 'libraries', 'api', 'integration', 'vk-pay',
         'vk-games', 'odnoklassniki', 'captcha', 'vk-id', 'vk-testers', 'masks',
         'stories', 'vk-maps', 'rules', 'misc']

HIGHLIGHTS = [
    ('mini-apps/nachalo-raboty-pervye-shagi.md', 'Первые шаги — создание и подключение мини-приложения'),
    ('vk-bridge/bystryy-start.md', 'VK Bridge: быстрый старт'),
    ('vk-bridge/vvedenie.md', 'VK Bridge: обзор всех событий'),
    ('mini-apps/nachalo-raboty-paket-vk-mini-app.md', 'Пакет `@vkontakte/create-vk-mini-app`'),
    ('libraries/vkui.md', 'VKUI — библиотека компонентов'),
    ('api/klyuchi-dostupa-obschie-svedeniya.md', 'Ключи доступа и права'),
    ('api/format-zaprosov.md', 'Формат запросов к API ВКонтакте'),
    ('api/parametry-zapuska-prilozheniya.md', 'Параметры запуска приложения'),
    ('mini-apps/razrabotka-zapusk-podpis-parametrov-zapuska.md', 'Подпись параметров запуска (проверка на сервере)'),
    ('vk-bridge/EVENTS.md', 'Справочник всех событий VK Bridge'),
]


def esc(s):
    return s.replace('|', '\\|')


def first_paragraph(path, name, limit=170):
    """First meaningful sentence of a converted page, for use as a summary."""
    body = open(path, encoding='utf-8').read().split('---\n', 1)[-1]
    for para in body.split('\n\n'):
        para = ' '.join(para.split())
        if not para or para.startswith(('#', '|', '```', '**Раздел', 'Важно!',
                                        'Внимание', 'Обратите внимание', '- ', '>')):
            continue
        para = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', para).replace('`', '')
        if len(para) > limit:
            cut = para[:limit].rsplit(' ', 1)[0]
            para = cut + '…'
        return para
    return ''


def main():
    flat = json.load(open(os.path.join(OUT, 'index.json'), encoding='utf-8'))
    index = collections.defaultdict(list)
    for entry in flat:
        index[entry['category']].append(entry)
    total = len(flat)

    lines = [
        '# База знаний: разработка мини-приложений ВКонтакте',
        '',
        f'Полная выгрузка документации [dev.vk.ru](https://dev.vk.ru) — **{total} страниц** '
        'в Markdown: VK Bridge, VK Mini Apps, VKUI, API ВКонтакте, VK Games, VK Pay, '
        'интеграция, правила площадки и видеокурс по разработке.',
        '',
        'Исходники — PDF-экспорт страниц документации; при конвертации сохранены заголовки, '
        'таблицы, примеры кода и ссылки на оригинальные страницы `dev.vk.ru`.',
        '',
        '## С чего начать',
        '',
    ]
    existing = {e['path'] for v in index.values() for e in v} | {'vk-bridge/EVENTS.md'}
    for path, label in HIGHLIGHTS:
        if path in existing:
            lines.append(f'- [{label}]({path})')
    lines += ['', '## Разделы', '', '| Раздел | Страниц | Что внутри |', '|---|---|---|']
    for cat in ORDER:
        if cat not in index:
            continue
        title = CATEGORY_TITLE.get(cat, cat)
        lines.append(f'| [{title}](#{cat}) | {len(index[cat])} | {esc(CATEGORY_NOTE.get(cat, ""))} |')
    lines.append('')

    for cat in ORDER:
        if cat not in index:
            continue
        title = CATEGORY_TITLE.get(cat, cat)
        lines += ['---', '', f'<a id="{cat}"></a>', '', f'## {title}', '',
                  CATEGORY_NOTE.get(cat, ''), '']
        # group entries by their breadcrumb parent (everything but the leaf)
        groups = collections.OrderedDict()
        for e in sorted(index[cat], key=lambda e: (len(e['parts']), e['breadcrumb'])):
            parent = ' → '.join(e['parts'][:-1]) or title
            groups.setdefault(parent, []).append(e)
        for parent, items in groups.items():
            if len(groups) > 1:
                lines += [f'### {parent}', '']
            for e in sorted(items, key=lambda e: e['title'].lower()):
                lines.append(f'- [{e["title"]}]({e["path"]})')
            lines.append('')

    with open(os.path.join(OUT, 'README.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines).rstrip() + '\n')

    # VK Bridge event cheat sheet
    events = collections.OrderedDict()
    for e in sorted(index.get('vk-bridge', []), key=lambda e: e['title'].lower()):
        if re.fullmatch(r'VKWebApp\w+', e['title']):
            events[e['title']] = e['path']
    ev_lines = ['# VK Bridge: события', '',
                f'{len(events)} событий, для каждого — отдельная страница с параметрами, '
                'примером вызова, форматом ответа и совместимостью по платформам.',
                '', '| Событие | Назначение |', '|---|---|']
    for name, path in events.items():
        ev_lines.append(f'| [`{name}`]({os.path.basename(path)}) | {esc(first_paragraph(os.path.join(OUT, path), name))} |')
    ev_lines += ['', 'Остальные страницы раздела (быстрый старт, работа в фоне, '
                 'обработка результатов) — см. [README базы знаний](../README.md#vk-bridge).']
    with open(os.path.join(OUT, 'vk-bridge', 'EVENTS.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(ev_lines) + '\n')

    print('index built:', total, 'docs,', len(events), 'bridge events')


if __name__ == '__main__':
    main()

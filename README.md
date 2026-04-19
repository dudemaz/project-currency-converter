# Currency Converter

Веб‑приложение на **Vanilla JavaScript (ES Modules)** для конвертации валют по курсам **ЦБ РФ**: актуальные и архивные курсы, кеш в `localStorage`, история операций, кастомный UI селектов и даты.

## Live Demo

Демо: [http://64.188.61.83/](http://64.188.61.83/)

## Текущий статус

Проект на **финальной стадии**: основной функционал реализован и проверен.

### Реализовано

- загрузка актуальных курсов: `https://www.cbr-xml-daily.ru/daily_json.js`;
- архив по дате: `https://www.cbr-xml-daily.ru/archive/YYYY/MM/DD/daily_json.js`;
- **кеш курсов** в `localStorage`: объект `{ rates, time }`, при старте проверка **TTL 24 часа** (без cookie);
- конвертация суммы, вывод результата с `toFixed(4)`;
- **Choices.js** — кастомные `<select>` валют (поиск, единый вид);
- после перерисовки опций селектов выполняется **переинициализация Choices**, чтобы UI не расходился с DOM;
- **swap** валют с синхронизацией `Choices.setChoiceByValue`;
- **история** последних конвертаций в `localStorage` (до 10 записей);
  - новая запись: `historylist` → рендер + сохранение;
  - подгрузка при старте: `loadHistoryUI` → только `renderHistoryItem` (без повторного сохранения);
- загрузка курсов по выбранной дате и кнопка **«Вернуть актуальные курсы»**;
- индикатор актуальности/даты данных в `#DataCurrencyactually` (`textDataReturn`, `loadDataInSpan`);
- экран загрузки (**Whirl CSS**), фон **particles.js**, стили блока даты — `block-history-data.css`, анимации — `assets/magic.css`.

### Библиотека для даты

Для поля даты используется **Air Datepicker** (вместо нативного `type="date"`): единый вид в браузерах и формат **`yyyy-MM-dd`** для API.  
Документация: [Air Datepicker](https://air-datepicker.com/ru/docs)

## Как устроено приложение

1. **`js/main.js`** — точка входа: loader → кеш/API → `renderCurrencySelectsOptions` → `initSelectChoices` → `textDataReturn` → `initDatePicker` → `bindUiHandlers` → `loadHistoryUI`.
2. **`js/api/api.js`** — `LoadData(date?)`: fetch, проверка `response.ok` и наличия `Valute`.
3. **`js/storage/storage.js`** — сохранение/чтение курсов с TTL; `saveHistoryItem` для истории.
4. **`js/ui/ui.js`** — рендер валют, `currentresult`, `loadRates` (колбэк после загрузки для переинициализации Choices), `initDatePicker`, `loadHistoryUI`, `loadDataInSpan`.
5. **`js/ui/handlers.js`** — обработчики: конвертация, swap, модалка истории, загрузка по дате, возврат к актуальным, привязка обновления span к кнопкам.
6. **`js/ui/domlists.js`** — ссылки на DOM‑элементы.
7. **`js/features/`** — формула конвертации (`convert.js`), история (`historyLogic.js`: `renderHistoryItem`, `historylist`).
8. **`js/animation/background.js`** — инициализация `particles.js`.

## Структура репозитория

| Путь                               | Назначение                                                 |
| ---------------------------------- | ---------------------------------------------------------- |
| `index.html`                       | Разметка, CDN: Choices, Air Datepicker, particles, Whirl   |
| `css-files/style.css`              | Основные стили, импорты reset/fonts/variables/global и др. |
| `css-files/block-history-data.css` | Блок выбора даты и кнопок архива                           |
| `assets/magic.css`                 | Классы анимаций (путь от корня сайта)                      |
| `js/main.js`                       | Инициализация приложения                                   |
| `js/api/`                          | Запросы к API ЦБ                                           |
| `js/ui/`                           | DOM, рендер, обработчики, datepicker                       |
| `js/features/`                     | Конвертация, история                                       |
| `js/storage/`                      | `localStorage`                                             |
| `js/animation/`                    | Фон particles                                              |

## Технологии

- HTML5, CSS3, JavaScript (ES Modules)
- [Choices.js](https://github.com/Choices-js/Choices)
- [Air Datepicker 3.6](https://air-datepicker.com/ru/docs)
- [particles.js](https://github.com/VincentGarreau/particles.js/)
- [@jh3y/whirl](https://www.npmjs.com/package/@jh3y/whirl) — спиннер loader
- API ЦБ РФ: `daily_json.js` и архив `archive/{year}/{month}/{day}/daily_json.js`

## Локальный запуск

1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/dudemaz/project-currency-converter
   cd "project-currency converter"
   ```
2. Открыть проект через **локальный HTTP‑сервер** (Live Server и т.п.) — из‑за `fetch` и ES‑modules файл `index.html` с диска напрямую нежелателен.
3. Если не подгружается `assets/magic.css`, проверьте, что сервер отдаёт корень проекта как `/` (у абсолютного пути `/assets/magic.css`).

## Планы на развитие

- автотесты (unit/integration);
- замена `alert` на ненавязчивые уведомления в UI;
- расширение истории (сумма, дата операции);
- дальнейший рефакторинг и выравнивание нейминга.

## Кеш без cookie

TTL реализован через **timestamp в `localStorage`** вместе с курсами: при каждом старте сравнивается возраст записи с **24 часами**; отдельные cookie для этого не используются.

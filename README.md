# Currency Converter

Веб-проект на чистом JavaScript для конвертации валют с API ЦБ РФ и сохранением курса в `localStorage`.

## 🚀 Статус проекта

- Рабочий минимальный функционал:
  - выбор валют `from`, `to`
  - ввод суммы
  - расчёт конвертации (формула `(amount * from) / to`)
  - вывод результата
  - загрузка курсов с API: `https://www.cbr-xml-daily.ru/daily_json.js`
  - кеширование курсов в `localStorage`
- Незавершённые/планируемые фичи:
  - запись истории конвертаций (файл `js/historyLogic.js` уже содержит заготовку)
  - кнопка «swap» (`js/ui.js` уже есть логика, но не привязана)
  - улучшение UX (валидация, показа ошибок, список фаворитов)
  - работа с офлайн-фоллбэком

## 📁 Структура

- `index.html` — интерфейс
- `css-files/` — стили (reset, базовые, переменные, анимации)
- `js/`:
  - `main.js` — загрузка данных, инициализация
  - `api.js` — запрос к валютному API
  - `ui.js` — рендер селектов, текущий расчёт
  - `convert.js` — функция конвертации
  - `domlists.js` — DOM-узлы
  - `storage.js` — localStorage read/write
  - `historyLogic.js` — история конвертаций (за заготовка)

## ⚙️ Установка и запуск

1. Клонировать репозиторий:
   ```bash
   git clone <https://github.com/dudemaz/project-currency-converter>
   cd "project-currency converter"
   ```

2. Установить зависимости (опционально):
   ```bash
   npm install
   ```

3. Запустить локальный сервер (из-за fetch лучше не открывать файл напрямую):
   - VS Code Live Server (рекомендуется)
## 🛠 Как работает

1. `main.js`:
   - `loadFromLocalStorage` или `LoadData` из API
   - `renderCurrencySelectsOptions` заполняет списки валют
   - инициализирует `Choices.js` для селектов
   - слушает `input amount` и `click convert`
2. `ui.js`:
   - `currentresult` берёт значения и вызывает `convertCurrency`
   - форматирует `toFixed(4)`
3. `api.js`:
   - получает объект валют
   - проверяет `response.ok` и `data.Valute`
4. `storage.js`:
   - записывает `/читает` курсы в localStorage

## 🧪 Примеры

- Введите `100` в поле сумма
- Выберите `USD` → `EUR`
- Нажмите `Конвертировать`
- `result` покажет результат

## 🛠 До добавления

- Поддержка кнопки `swap` (`<span id="swap">→</span>` в `index.html`) — привязать событие и вызвать `ui.swapSelectOptions()`.
- История (`historyList`) — вызвать `historylist(from, to, result)` при каждом расчёте и добавлять запись в `#historyList`.
- Обработка ошибок сети / API (показ баннера/текста вместо `console.error`).
- Чистка `localStorage` по устареванию (введите время кэша ~1 час) думаю сделаю с помощью cookie.

## 🔮 Идеи развития

- Поддержка множества API валют с приоритетом (fallback)
- Автобновление курса каждые N минут
- Тёмная тема с переменными CSS
- Тесты (Jest или другой фреймворк)

## 📌 Заметки по зависимостям

В `package.json` есть:
- `@splinetool/react-spline`
- `dotenv`, `jquery`, `mouse-animations`

Сейчас проект работает без React/Spline, но `mouse-animations` может использоваться для визуальных эффектов через `js/mouse-animations.min.js`.


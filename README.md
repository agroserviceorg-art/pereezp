# Запуск сайту на Cloudflare Pages

Структура: `public/` це сайт, `functions/api/lead.js` це приймач заявок (адреса /api/lead).

## 1. Telegram-бот
1. У Telegram відкрийте @BotFather, надішліть /newbot. Збережіть токен.
2. Напишіть своєму боту будь-яке повідомлення (або додайте його в групу диспетчерів).
3. Відкрийте https://api.telegram.org/bot<ТОКЕН>/getUpdates і знайдіть "chat":{"id":...}. Це chat_id.

## 2. Розгортання (Функції не працюють при перетягуванні папки в панелі, потрібен один із двох способів)

### Спосіб A: через GitHub (зручно, оновлення автоматичні)
1. Завантажте цю папку в репозиторій на GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git, оберіть репозиторій.
3. Build command: порожньо. Build output directory: `public`.

### Спосіб B: через командний рядок (потрібен Node.js)
У папці проєкту виконайте:
```
npx wrangler login
npx wrangler pages deploy public --project-name=pereizd
```

## 3. Змінні
Проєкт → Settings → Variables and secrets, додайте (тип Secret):
- TELEGRAM_BOT_TOKEN = токен бота
- TELEGRAM_CHAT_ID = chat_id
Після цього зробіть новий деплой. Перевірте: надішліть тестову заявку з сайту.

## 4. Кілька сайтів
Кожен сайт це окремий Pages-проєкт. Один і той самий бот можна використовувати для всіх, змінні додаються в кожен проєкт окремо.

## 5. Замініть заглушки в public/index.html
- Контакти: https://t.me/your_username, телефон +380000000000, Viber.
- Тарифи: масив TRUCKS у скрипті.
- Лічильник: вставте код у <head> на місці коментаря. Події calc_start і lead_sent надсилаються автоматично в Plausible та GA4.

# 🛍️ EComm-CS -  eCommerce проект

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Strapi](https://img.shields.io/badge/Strapi-5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-green)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Описание

**EComm-CS** демонстрира интеграция между **Next.js** (frontend) и **Strapi** (backend), с пълна функционалност за онлайн магазин.

### ✨ Ключови характеристики

- ✅ **Пълен eCommerce функционалност** - продукти, категории, количка, плащане
- ✅ **Модерен UI/UX** - неокласически бутони, анимации, responsive дизайн
- ✅ **Тъмна/светла тема** - плавно превключване с запазване на избора
- ✅ **Странична количка** - с анимация и възможност за промяна на количество
- ✅ **Интеграция със Strapi** - лесно управление на продукти и категории
- ✅ **TypeScript** - типова безопасност и по-добро разработване

---

## 🚀 Технологии

### Frontend
- **Next.js 16** - React framework със сървърно рендиране
- **TypeScript** - типизиран JavaScript
- **TailwindCSS** - utility-first CSS framework
- **Zustand** - state management за количката
- **React Hot Toast** - известия

### Backend
- **Strapi 5** - headless CMS
- **REST API** - комуникация между frontend и backend

--- 

### ✨ Ключови характеристики

- ✅ **Пълен eCommerce функционалност** - продукти, категории, количка, плащане
- ✅ **Модерен UI/UX** - неокласически бутони, анимации, responsive дизайн
- ✅ **Тъмна/светла тема** - плавно превключване с запазване на избора
- ✅ **Странична количка** - с анимация и възможност за промяна на количество
- ✅ **Интеграция със Strapi** - лесно управление на продукти и категории
- ✅ **TypeScript** - типова безопасност и по-добро разработване

---

## 🚀 Технологии

### Frontend
- **Next.js 16** - React framework със сървърно рендиране
- **TypeScript** - типизиран JavaScript
- **TailwindCSS** - utility-first CSS framework
- **Zustand** - state management за количката
- **React Hot Toast** - известия

### Backend
- **Strapi 5** - headless CMS
- **SQLite** - база данни (безплатна, не изисква сървър)
- **REST API** - комуникация между frontend и backend

---

## 📁 Структура на проекта

```text 

EComm-CS/
├── backend/                 # Strapi backend
│   ├── src/
│   ├── config/
│   └── ...
├── frontend/                # Next.js frontend
│   ├── app/                 # Next.js App Router
│   │   ├── about/           # За нас страница
│   │   ├── auth/            # Вход/Регистрация
│   │   ├── cart/            # Количка
│   │   ├── categories/      # Категории
│   │   ├── checkout/        # Плащане
│   │   ├── contact/         # Контакти
│   │   ├── orders/          # Поръчки
│   │   ├── products/        # Продукти
│   │   ├── profile/         # Профил
│   │   ├── layout.tsx       # Основен layout
│   │   ├── page.tsx         # Начална страница
│   │   └── globals.css      # Глобални стилове
│   ├── components/          # React компоненти
│   │   ├── Header.tsx       # Навигация
│   │   ├── Footer.tsx       # Долен колонтитул
│   │   ├── ProductCard.tsx  # Карта за продукт
│   │   ├── SideCart.tsx     # Странична количка
│   │   └── ThemeProvider.tsx # Управление на теми
│   ├── lib/                  # API функции
│   │   └── api.ts
│   ├── store/                # Zustand store
│   │   └── cart.ts
│   └── public/               # Статични файлове
└── README.md

```

---

## 🛠️ Инсталация и стартиране

### Предварителни изисквания
- Node.js 18+ 
- npm или yarn
- Git

### 1. Клониране на проекта

```bash
git clone https://github.com/comnsense/EComm-CS.git
cd EComm-CS
```

2. Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

### Strapi ще стартира на http://localhost:1337

Първоначална настройка:

1. Отворете http://localhost:1337/admin
2. Създайте admin потребител
3. Създайте Collection Types:
   · Product (name, slug, description, price, stock, featured, images, category)
   · Category (name, slug)
4. Разрешете публичен достъп:
   · Settings → USERS & PERMISSIONS → Roles → Public
   · Разрешете: find, findOne за Product и Category

3. Frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

### Frontend ще стартира на http://localhost:3000

---

🎨 Дизайн и теми

Цветова схема

· Основен цвят: #8bc34a (зелен)
· Тъмна тема: тъмно синьо/черно
· Светла тема: светло сиво/бяло

Бутони

Проектът използва неокласически дизайн на бутоните:

· Меки сенки (neumorphism)
· Градиентни ефекти
· Плавни анимации при hover и клик
· Различни варианти за различните действия

---

📦 API Endpoints (Strapi)

```
Endpoint Метод Описание
/api/products GET Всички продукти
/api/products?filters[slug][$eq]=:slug GET Продукт по slug
/api/products?filters[featured][$eq]=true GET Препоръчани продукти
/api/products?filters[category][id][$eq]=:id GET Продукти по категория
/api/categories GET Всички категории
/api/categories?filters[slug][$eq]=:slug GET Категория по slug
```
---


###  🚀 Deployment

Backend (Strapi) - Render.com

1. Качете кода в GitHub
2. Регистрация в Render
3. Създайте Web Service, свържете с GitHub repo
4. Build Command: npm install && npm run build
5. Start Command: npm run start

Frontend (Next.js) - Vercel


   ```
   NEXT_PUBLIC_API_URL=https://xxxxx-backend-url.onrender.com/api
   ```

---

📄 Лиценз

Този проект е лицензиран под MIT License.

---

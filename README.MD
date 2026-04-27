# 🐾 Von Haus Lola Mora — Backend

Backend for the official website of a German Shepherd breeder based in Salta, Argentina.

## 🚀 Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file handling)

---

## ⚙️ Features

- 🔐 Authentication with JWT
- 📰 Article management (CRUD)
- 🖼️ Gallery management (CRUD)
- 👤 Admin panel
- 📦 Image upload (Base64)

---

## 🌍 Live API

👉 https://your-api.vercel.app

---

## 🧪 Endpoints

### Auth
- `POST /usuarios/login`

### Articles
- `GET /articulos/getArticles`
- `GET /articulos/:id`
- `POST /articulos/addArticle`
- `POST /articulos/editArticle/:id`
- `DELETE /articulos/deleteArticle/:id`

### Gallery
- `GET /gallery/cards`
- `POST /gallery/addCard`
- `POST /gallery/update/:id`
- `DELETE /gallery/delete/:id`

---

## 🔐 Environment Variables

```env
DB_URI=
JWT=
FRONT_URL=
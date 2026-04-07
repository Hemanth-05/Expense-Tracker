# 🚀 Deployment Guide – Expense Tracker

## 🧠 Overview

This project was developed locally and then deployed as a full-stack application using:

- **Frontend:** React + Vite → Vercel  
- **Backend:** Node.js + Express → Render  
- **Database:** PostgreSQL → Neon  
- **ORM:** Prisma  

The goal was to move from a development environment to a fully working production setup while maintaining proper architecture and communication between services.

---

## 🏗️ Architecture

Client (Vercel)
↓
Frontend (React + Vite)
↓ HTTP Requests
Backend API (Render)
↓ Prisma ORM
Database (Neon PostgreSQL)

---

## 🌍 Environment Variables


### Backend (Render)

- `DATABASE_URL` → Neon database connection string  
- `CLIENT_URL` → Vercel frontend URL (used for CORS)  
- `NODE_ENV=production`

---

### Frontend (Vercel)

- `VITE_API_URL` → Backend API base URL

---

## 🗄️ Database Setup (Neon)

### Steps:
1. Created a Neon PostgreSQL database
2. Copied connection string
3. Configured `DATABASE_URL`
4. Ran migrations:

```bash
npx prisma migrate deploy
````

5. Seeded default categories:

```bash
npx prisma db seed
```

---

## ⚙️ Backend Deployment (Render)

### Configuration:

* **Runtime:** Node
* **Build Command:**

  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy
  ```
* **Start Command:**

  ```bash
  npm start
  ```

### Key Changes:

* Server listens on:

  ```js
  process.env.PORT || 3000
  ```
* Prisma uses:

  ```prisma
  env("DATABASE_URL")
  ```

---

## 🌐 Frontend Deployment (Vercel)

### Configuration:

* **Root Directory:** `client`
* **Framework:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

### API Configuration:

All API calls use:

```js
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

---

## 🔐 CORS Configuration (Critical Fix)

### Problem:

Frontend showed:

* `Failed to fetch`
* CORS errors in browser

Backend endpoints worked directly in browser but failed from frontend.

---

### Root Cause:

Incorrect `CLIENT_URL`:

```
https://app.vercel.app/?query=params ❌
```

CORS only checks **origin**, not full URL.

---

### Fix:

```
https://app.vercel.app ✅
```

---

### Final CORS Setup:

```js
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
```

---

## 🧪 Debugging Process

* Verified backend endpoints directly in browser
* Used DevTools → Network tab
* Identified CORS errors despite 200 responses
* Compared frontend origin vs allowed origins
* Fixed mismatch in `CLIENT_URL`

---

## ⚡ Challenges Faced

* Incorrect database connection string formatting
* Prisma seed not executing initially
* Environment variables mismatch between local and production
* Backend sleeping (Render free tier cold starts)
* CORS misconfiguration due to query parameters in URL

---

## 🏁 Final Outcome

* Full-stack application successfully deployed
* Frontend ↔ Backend communication working
* Database connected and seeded
* Production-ready architecture implemented

---

## 💡 Key Learnings

* Deployment is primarily an **integration problem**
* CORS checks **origin only**, not full URLs
* Environment variables must be configured per environment
* Frontend and backend must explicitly trust each other
* Debugging production issues requires isolating each layer

---

## 📌 Tech Stack

* **Frontend:** React, Vite, CSS
* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Neon)
* **ORM:** Prisma
* **Hosting:** Vercel, Render

---

## 🔗 Live Application

* Frontend: (Add your Vercel URL here)
* Backend: (Add your Render URL here)

---

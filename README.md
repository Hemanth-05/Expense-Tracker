# Expense Tracker

![Status](https://img.shields.io/badge/status-live-success)

## 🔗 Live Application

- **Frontend:** https://expense-tracker-nine-alpha-57.vercel.app
- **Backend API:** https://expense-tracker-j6e0.onrender.com

## Overview

A production-ready full-stack expense tracking application that enables users to record, organize, and analyze their spending with real-time insights.

The goal of this project is to build a simple yet practical system that helps users understand where their money is going without relying on subscription-based expense tracking applications.

---

## Features (Version 1)

- Predefined expense categories loaded from database
- Create, update, and delete expenses (full CRUD support)
- Filter expenses by:
  - Month
  - Year
  - Category
  - Combined filters (e.g., month + category)
- View total spending based on applied filters
- Responsive UI with real-time data from backend API

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Frontend
- React (Vite)

### Tools & Platforms
- Git
- Postman
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- Neon (PostgreSQL Database)

---

## 🏗️ Architecture

The backend follows a layered architecture:

- Routes → API endpoints
- Controllers → Request/response handling
- Services → Business logic
- Repositories → Database access
- Middleware → Validation and cross-cutting concerns

The frontend communicates with the backend via REST APIs, and the backend interacts with PostgreSQL using Prisma ORM.

For detailed system design, see:
👉 [Product Requirements](./docs/product-requirements-V1.md)

## Project Status

✅ Version 1 is complete and deployed.

The application supports full expense tracking functionality including CRUD operations, filtering by time and category, and a responsive frontend interface connected to a production backend.

---

## 💡 Key Learnings

- Designed and deployed a full-stack application across multiple services
- Handled cross-origin communication (CORS) in a production environment
- Managed environment variables across frontend and backend deployments
- Built scalable backend architecture using layered design principles

---

## Future Improvements

Possible enhancements planned for future versions:

- Charts and visualizations (pie charts, bar charts)
- Custom date range filtering for expenses
- AI chatbot capable of answering questions about spending patterns

---

## Documentation

Detailed product requirements and system design are available in the project documentation.

- `docs/product-requirements-V1.md`

---

## 📦 Deployment

See detailed deployment guide here:

👉 [Deployment Notes](./docs/deployment.md)

---

## License

This project is intended for learning and experimentation purposes.

# Expense Tracker — V1 Product Requirement

## Table of Contents

1. [Product Goal](#1-product-goal)  
2. [Problem It Solves](#2-problem-it-solves)  
3. [Target User](#3-target-user)  
4. [What V1 Must Do](#4-what-v1-must-do)  
5. [What V1 Will Not Do](#5-what-v1-will-not-do)  
6. [Core Features (V1)](#6-core-features-v1)  
7. [User Stories](#7-user-stories)  
8. [Data Model](#8-data-model)  
9. [API Overview](#9-api-overview)  
10. [UI Plan](#10-ui-plan)  
11. [System Architecture](#11-system-architecture)  
12. [Project Structure](#12-project-structure)  
13. [Future Improvements](#13-future-improvements)  
14. [Document Information](#14-document-information)

## 1. Product Goal
Build a simple expense tracking application that helps the user understand where their money is going.

## 2. Problem It Solves
Many existing expense tracking applications restrict useful features behind premium subscriptions. For example, users may be able to view expenses for the last few months, but viewing a full year's spending or accessing detailed summaries often requires upgrading to a paid plan.

This creates friction for users who simply want to understand their spending habits without committing to a subscription.

To overcome this limitation, this project aims to build a personal expense tracking system that provides full access to essential features such as tracking expenses, categorizing spending, and viewing summaries by category, month, and year without any restrictions.

## 3. Target User
The target user for V1 is the product creator himself, to personally track and review expenses.

## 4. What V1 Must Do
By the end of V1, the application must allow the user to:

- Create categories
- Add expenses under a category
- View saved expenses
- See total spending by category
- See spending for a specific month
- See spending for a specific year

## 5. What V1 Will Not Do
V1 will not include:

- Charts or visual analytics
- Chatbot or AI features
- Advanced budgeting features
- Authentication or multiple users
- Notifications or reminders

## 6. Core Features (V1)

### Category Management
- The application will include a set of **default categories**
Example categories may include:
    - Groceries
    - Dining
    - Entertainment
    - Transport
    - Utilities
    - Shopping
    - Miscellaneous
- Users should be able to **create new custom categories**.
- Users should be able to **view the list of all available categories**.

### Expense Management
- Users should be able to **add a new expense**.
- Each expense must be associated with **one category**.
- Each expense should include:
  - Expense name
  - Amount
  - Category
  - Purchase date (optional)

#### Purchase Date Behavior
- The purchase date field should be optional when adding an expense.
- If the user provides a purchase date, that date should be saved as the expense date.
- If the user leaves the purchase date empty, the system should automatically use the date on which the expense is added.

### Expense Editing
- Users should be able to **update an existing expense**.
- Users should be able to **delete an existing expense**.

### Expense Viewing
- All recorded expenses should be **displayed in a list**.
- Users should be able to **view expenses grouped or filtered by category**.

### Spending Summary
- Users should be able to **view expenses for a specific month**  
  (e.g., March 2026, April 2026).
- Users should be able to **view expenses for a specific year**  
  (e.g., 2026, 2025).
- Users should be able to **select a category and see the total spending for that category**.

### Design Notes
- The `amount` field should use a decimal type to ensure accurate storage of money values.
- The `expenseDate` field should always be stored in the database, even if the user leaves the date input empty during expense creation.
- Category and Expense are the only required entities for Version 1.

## 7. User Stories

- As a user, I want the application to include default categories so that I can start tracking expenses immediately.
- As a user, I want to create a new category so that I can organize my expenses based on my needs.
- As a user, I want to add an expense under a category so that I can record where my money was spent.
- As a user, I want to optionally specify the purchase date so that I can record expenses that happened earlier.
- As a user, I want to view a list of all expenses so that I can review my spending history.
- As a user, I want to update an expense so that I can correct mistakes.
- As a user, I want to delete an expense so that I can remove incorrect entries.
- As a user, I want to view expenses for a specific month so that I can track monthly spending.
- As a user, I want to view expenses for a specific year so that I can analyze yearly spending.
- As a user, I want to see spending totals by category so that I can understand where most of my money goes.

## 8. Data Model

The application uses two main entities for Version 1:

- **Category**
- **Expense**

A category is used to organize expenses, and each expense belongs to exactly one category.

---

### Category

Represents an expense category such as Groceries, Entertainment, Transport, etc.

#### Fields
- **id** — Unique identifier for the category
- **name** — Name of the category
- **createdAt** — Date and time when the category was created

#### Notes
- The application should include a set of default categories.
- Users should also be able to create custom categories.
- Each category can be linked to multiple expenses.

---

### Expense

Represents a single recorded expense.

#### Fields
- **id** — Unique identifier for the expense
- **name** — Name or title of the expense
- **amount** — Amount spent
- **expenseDate** — Date of purchase
- **createdAt** — Date and time when the expense record was created
- **updatedAt** — Date and time when the expense record was last updated
- **categoryId** — Reference to the category under which the expense belongs

#### Notes
- Every expense must belong to exactly one category.
- The purchase date is optional from the user’s perspective when adding an expense.
- If the user provides a purchase date, that date should be stored as the expense date.
- If the user does not provide a purchase date, the system should automatically use the current date as the expense date.
- Expenses should support update and delete operations in Version 1.

---

### Relationship

The relationship between the entities is:

- **One Category → Many Expenses**
- **One Expense → One Category**

This means:
- A single category can contain multiple expenses.
- Each expense can belong to only one category.

---

### Example Relationship

- Category: **Groceries**
  - Expense: Kiwi — $2
  - Expense: Milk — $5
  - Expense: Bread — $3

In this example, all three expenses belong to the **Groceries** category.

## 9. API Overview

The backend will expose APIs for managing categories and expenses.

### Category Endpoints
- `GET /categories` — Fetch all available categories
- `POST /categories` — Create a new category
- `PATCH /categories/:id` — Update a user-created category

### Expense Endpoints
- `GET /expenses` — Fetch all recorded expenses
- `POST /expenses` — Create a new expense
- `PATCH /expenses/:id` — Update an existing expense
- `DELETE /expenses/:id` — Delete an existing expense

### Expense Filter Endpoints
- `GET /expenses/month/:yearMonth` — Fetch expenses for a specific month
- `GET /expenses/year/:year` — Fetch expenses for a specific year
- `GET /expenses/category/:categoryId` — Fetch expenses for a specific category

## 10. UI Plan

Version 1 will provide a simple and functional interface focused on recording and reviewing expenses.

### Main UI Sections

#### 1. Expense Entry Form
The application should include a form for adding a new expense with the following fields:

- Expense name
- Amount
- Category dropdown
- Optional purchase date
- Submit button

#### 2. Category Management
The application should allow the user to:

- View default categories in the category dropdown
- Create a new custom category
- Use newly created categories when adding expenses

#### 3. Expense List
The application should display all saved expenses in a list or table.

Each expense entry should show:

- Expense name
- Amount
- Category
- Purchase date

Each expense entry should also include:

- Edit action
- Delete action

#### 4. Monthly and Yearly View
The application should allow the user to view expenses for:

- A selected month
- A selected year

Examples:
- March 2026
- April 2026
- 2025
- 2026

#### 5. Category Spending View
The application should allow the user to select a category and view how much has been spent in that category.

### UI Design Notes
- The interface should remain simple and easy to use.
- Functionality is prioritized over advanced styling in Version 1.
- The UI should be designed in a way that makes future additions like charts and analytics easy to integrate.

## 11. System Architecture Overview

The Expense Tracking System will follow a **full-stack layered architecture**. Unlike the Hotel Booking API project, which was backend-only, this application will include both a **frontend** and a **backend**. This approach helps maintain separation of concerns, improves scalability, and makes the application easier to manage.

The system will be divided into the following layers:

### Frontend UI Layer
Responsible for rendering the user interface and handling user interactions such as adding expenses, selecting categories, and viewing summaries.

### API Communication Layer
Handles communication between the frontend and backend through HTTP requests. This layer is responsible for sending requests to the backend API and receiving responses.

### Backend Routing Layer
Defines API endpoints and maps incoming HTTP requests to the appropriate controller functions.

### Backend Middleware Layer
Handles cross-cutting concerns such as input validation, authentication, authorization, and request preprocessing before requests reach the controllers.

### Backend Controller Layer
Handles request and response orchestration. Controllers receive processed requests and delegate business logic execution to the service layer.

### Backend Service Layer
Contains the core business logic of the application. Services process data and coordinate operations between controllers and repositories.

### Backend Repository Layer
Encapsulates all database interactions. This layer communicates directly with the database using Prisma ORM.

### Database Layer
Stores persistent application data such as expenses and categories in PostgreSQL.

---

### Architectural Flow

Client / User  
↓  
Frontend UI Layer  
↓  
API Communication Layer  
↓  
Backend Routes  
↓  
Backend Middleware  
↓  
Backend Controllers  
↓  
Backend Services  
↓  
Backend Repositories  
↓  
Database (PostgreSQL)

This architecture promotes **modularity, readability, and maintainability** by clearly separating responsibilities across different layers of the application.

## 12. Project Structure

```
expense-tracker/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   └── config/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       └── utils/
│
└── prisma/
    └── schema.prisma
```

---

## 13. Future Improvements
Possible enhancements after Version 1:

- Add charts (e.g., pie charts, bar charts) to visualize spending patterns.
- Allow users to select a **custom date range** to view expenses within that period.
- Add an **AI chatbot** capable of answering questions about expenses by querying the stored data.


## 14. Document Information
**Product Version:** V1  
**Document Version:** 1.0  
**Status:** In Development
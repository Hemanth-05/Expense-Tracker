# Expense Tracker — V1 Product Requirement

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

## 7. Future Improvements
Possible enhancements after Version 1:

- Add charts (e.g., pie charts, bar charts) to visualize spending patterns.
- Allow users to select a **custom date range** to view expenses within that period.
- Add an **AI chatbot** capable of answering questions about expenses by querying the stored data.

## Data Model

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

---

### Design Notes
- The `amount` field should use a decimal type to ensure accurate storage of money values.
- The `expenseDate` field should always be stored in the database, even if the user leaves the date input empty during expense creation.
- Category and Expense are the only required entities for Version 1.


## Document Information
**Product Version:** V1  
**Document Version:** 1.0  
**Status:** In Development
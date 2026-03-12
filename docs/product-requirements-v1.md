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
  - Date

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


## Document Information
**Product Version:** V1  
**Document Version:** 1.0  
**Status:** In Development
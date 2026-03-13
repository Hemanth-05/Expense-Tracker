import { addExpense, getExpenses } from '../services/expenseService.js';

export async function createExpenseController(req, res, next) {
  try {
    const expense = await addExpense(req.validatedExpense);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

export async function getExpensesController(req, res, next) {
  try {
    const expenses = await getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

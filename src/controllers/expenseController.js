import { addExpense } from '../services/expenseService.js';

export async function createExpenseController(req, res, next) {
  try {
    const expense = await addExpense(req.validatedExpense);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

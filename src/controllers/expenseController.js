import { addExpense, deleteExpense, getExpenses } from '../services/expenseService.js';

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

export async function deleteExpenseController(req, res, next) {
  try {
    const deleted = await deleteExpense({ id: req.params.id });
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
}

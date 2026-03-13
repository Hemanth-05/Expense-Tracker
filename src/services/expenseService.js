import { createExpense } from '../repositories/expenseRepository.js';

export async function addExpense(payload) {
  const { name, amount, expenseDate, categoryId } = payload || {};

  let parsedExpenseDate = new Date();
  if (expenseDate !== undefined) {
    const parsed = new Date(expenseDate);
    if (Number.isNaN(parsed.getTime())) {
      const error = new Error('Invalid expenseDate: must be a valid date string');
      error.status = 400;
      throw error;
    }
    parsedExpenseDate = parsed;
  }

  const expense = await createExpense({
    name: name.trim(),
    amount,
    expenseDate: parsedExpenseDate,
    categoryId,
  });

  return expense;
}

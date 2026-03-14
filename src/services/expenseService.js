import { Prisma } from '@prisma/client';
import { createExpense, deleteExpenseById, getAllExpenses } from '../repositories/expenseRepository.js';

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

export async function getExpenses() {
  return getAllExpenses();
}

export async function deleteExpense(payload) {
  const { id } = payload || {};
  const expenseId = Number(id);

  if (!Number.isInteger(expenseId) || expenseId <= 0) {
    const error = new Error('Invalid expense id');
    error.status = 400;
    throw error;
  }

  try {
    const deleted = await deleteExpenseById(expenseId);
    return deleted;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFound = new Error('Expense not found');
      notFound.status = 404;
      throw notFound;
    }
    throw error;
  }
}

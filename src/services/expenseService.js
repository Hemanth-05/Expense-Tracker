import { Prisma } from '@prisma/client';
import {
  createExpense,
  deleteExpenseById,
  getAllExpenses,
  updateExpenseById,
} from '../repositories/expenseRepository.js';

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

export async function getExpenses(payload = {}) {
  const { month, year } = payload;

  if (month === undefined && year === undefined) {
    return getAllExpenses();
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const startOfNextMonth = new Date(year, month, 1);

  return getAllExpenses({
    expenseDate: {
      gte: startOfMonth,
      lt: startOfNextMonth,
    },
  });
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

export async function patchExpense(payload) {
  const { id, name, amount, expenseDate, categoryId } = payload || {};
  const expenseId = Number(id);

  if (!Number.isInteger(expenseId) || expenseId <= 0) {
    const error = new Error('Invalid expense id');
    error.status = 400;
    throw error;
  }

  const data = {};

  if (name !== undefined) {
    data.name = name;
  }

  if (amount !== undefined) {
    data.amount = amount;
  }

  if (categoryId !== undefined) {
    data.categoryId = categoryId;
  }

  if (expenseDate !== undefined) {
    const parsed = new Date(expenseDate);
    if (Number.isNaN(parsed.getTime())) {
      const error = new Error('Invalid expenseDate: must be a valid date string');
      error.status = 400;
      throw error;
    }
    data.expenseDate = parsed;
  }

  if (Object.keys(data).length === 0) {
    const error = new Error('At least one field required for update');
    error.status = 400;
    throw error;
  }

  try {
    const updated = await updateExpenseById({ id: expenseId, data });
    return updated;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const notFound = new Error('Expense not found');
      notFound.status = 404;
      throw notFound;
    }

    throw error;
  }
}

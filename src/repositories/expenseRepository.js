import prisma from '../prismaClient.js';

export async function createExpense({ name, amount, expenseDate, categoryId }) {
  return prisma.expense.create({
    data: {
      name,
      amount,
      expenseDate,
      categoryId,
    },
    select: {
      id: true,
      name: true,
      amount: true,
      expenseDate: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
  });
}

export async function getAllExpenses(where = {}) {
  return prisma.expense.findMany({
    where,
    orderBy: {
      expenseDate: 'desc',
    },
    select: {
      id: true,
      name: true,
      amount: true,
      expenseDate: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      }
    },
  });
}

export async function deleteExpenseById(id) {
  return prisma.expense.delete({
    where: { id },
    select: { id: true },
  });
}

export async function updateExpenseById({ id, data }) {
  return prisma.expense.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      amount: true,
      expenseDate: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

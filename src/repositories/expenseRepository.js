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

export async function getAllExpenses() {
  return prisma.expense.findMany({
    orderBy: {
      createdAt: 'desc',
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

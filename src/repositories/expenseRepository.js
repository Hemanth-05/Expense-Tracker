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

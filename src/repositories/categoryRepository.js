import prisma from '../prismaClient.js';

export async function getCategoryByName(name) {
  return prisma.category.findFirst({ where: { name } });
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({ where: { id } });
}

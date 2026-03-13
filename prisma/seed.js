import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  'Groceries',
  'Dining',
  'Transportation',
  'Entertainment',
  'Bills',
  'Shopping',
  'Miscellaneous',
];

async function main() {
  for (const name of defaultCategories) {
    const existing = await prisma.category.findFirst({
      where: { name },
    });

    if (!existing) {
      await prisma.category.create({ data: { name } });
    }
  }

  console.log('Seeded default categories.');
}

main()
  .catch((error) => {
    console.error('Error seeding categories:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

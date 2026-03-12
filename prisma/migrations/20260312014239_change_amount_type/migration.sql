/*
  Warnings:

  - You are about to drop the column `price` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "price",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL;

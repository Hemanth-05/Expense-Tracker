import express from 'express';
import {
  createExpenseController,
  deleteExpenseController,
  getExpensesController,
} from '../controllers/expenseController.js';
import { validateCreateExpense } from '../middlewear/expenseValidation.js';

const router = express.Router();

router.get('/', getExpensesController);
router.delete('/:id', deleteExpenseController);
router.post('/', validateCreateExpense, createExpenseController);

export default router;

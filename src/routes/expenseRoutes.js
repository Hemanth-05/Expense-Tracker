import express from 'express';
import { createExpenseController, getExpensesController } from '../controllers/expenseController.js';
import { validateCreateExpense } from '../middlewear/expenseValidation.js';

const router = express.Router();

router.get('/', getExpensesController);
router.post('/', validateCreateExpense, createExpenseController);

export default router;

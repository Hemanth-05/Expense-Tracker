import express from 'express';
import { createExpenseController } from '../controllers/expenseController.js';
import { validateCreateExpense } from '../middlewear/expenseValidation.js';

const router = express.Router();

router.post('/', validateCreateExpense, createExpenseController);

export default router;

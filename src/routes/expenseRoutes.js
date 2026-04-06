import express from 'express';
import {
  createExpenseController,
  deleteExpenseController,
  getExpensesController,
  patchExpenseController,
} from '../controllers/expenseController.js';
import {
  validateExpenseFilters,
  validateCreateExpense,
  validateUpdateExpense,
} from '../middlewear/expenseValidation.js';

const router = express.Router();

router.get('/', validateExpenseFilters, getExpensesController);
router.delete('/:id', deleteExpenseController);
router.post('/', validateCreateExpense, createExpenseController);
router.patch('/:id', validateUpdateExpense, patchExpenseController);

export default router;

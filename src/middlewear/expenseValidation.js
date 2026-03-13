import { body, validationResult } from 'express-validator';
import { getCategoryById } from '../repositories/categoryRepository.js';

function formatMissingFields(fields) {
  if (fields.length === 1) return fields[0];
  if (fields.length === 2) return `${fields[0]} and ${fields[1]}`;
  return `${fields.slice(0, -1).join(', ')}, and ${fields[fields.length - 1]}`;
}

function missingRequiredFieldValidator(req, res, next) {
  const body = req.body || {};
  const missing = [];

  if (body.name === undefined || body.name === null || (typeof body.name === 'string' && !body.name.trim())) {
    missing.push('name');
  }

  if (body.amount === undefined || body.amount === null || `${body.amount}`.trim() === '') {
    missing.push('amount');
  }

  if (body.categoryId === undefined || body.categoryId === null || `${body.categoryId}`.trim() === '') {
    missing.push('categoryId');
  }

  if (missing.length > 0) {
    const error = new Error(
      `Missing required fields: ${formatMissingFields(missing)}`
    );
    error.status = 400;
    return next(error);
  }

  return next();
}

async function categoryExists(value) {
  const category = await getCategoryById(value);
  if (!category) {
    throw new Error('Invalid categoryId: category does not exist');
  }
  return true;
}

export const validateCreateExpense = [
  missingRequiredFieldValidator,

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Invalid name: must be a non-empty string')
    .custom((value) => Number.isNaN(Number(value)))
    .withMessage('Invalid name: must not be only numeric'),

  body('amount')
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage('Invalid amount: must be a positive number'),

  body('categoryId')
    .toInt()
    .isInt({ gt: 0 })
    .withMessage('Invalid categoryId: must be a positive integer')
    .bail()
    .custom(categoryExists),

  body('expenseDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid expenseDate: must be a valid date')
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.status = 400;
      return next(error);
    }

    req.validatedExpense = {
      name: req.body.name.trim(),
      amount: req.body.amount,
      categoryId: req.body.categoryId,
      expenseDate: req.body.expenseDate,
    };

    return next();
  },
];

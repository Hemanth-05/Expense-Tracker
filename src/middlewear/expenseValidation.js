import { body, validationResult } from 'express-validator';
import { getCategoryById } from '../repositories/categoryRepository.js';

async function categoryExists(value) {
  const category = await getCategoryById(value);
  if (!category) {
    throw new Error('Invalid categoryId: category does not exist');
  }
  return true;
}

export const validateCreateExpense = [
  body('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('required')
    .trim()
    .notEmpty()
    .withMessage('required')
    .custom((value) => Number.isNaN(Number(value)))
    .withMessage('Invalid name: must not be only numeric'),

  body('amount')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('required')
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage('Invalid amount: must be a positive number'),

  body('categoryId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('required')
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
      const formattedErrors = errors.array();
      const missing = formattedErrors.filter((error) => error.msg === 'required').map((error) => error.path);
      if (missing.length > 0) {
        const orderedMissing = ['name', 'amount', 'categoryId'].filter((field) => missing.includes(field));
        const joined =
          orderedMissing.length === 1
            ? orderedMissing[0]
            : orderedMissing.length === 2
              ? `${orderedMissing[0]} and ${orderedMissing[1]}`
              : `${orderedMissing[0]}, ${orderedMissing[1]}, and ${orderedMissing[2]}`;
        const error = new Error(`Missing required fields: ${joined}`);
        error.status = 400;
        return next(error);
      }

      const error = new Error(formattedErrors[0].msg);
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

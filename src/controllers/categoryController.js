import { getCategories } from '../services/categoryService.js';

export async function getCategoriesController(req, res, next) {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

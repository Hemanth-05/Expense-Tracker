import { getAllCategories } from '../repositories/categoryRepository.js';

export async function getCategories() {
  return getAllCategories();
}

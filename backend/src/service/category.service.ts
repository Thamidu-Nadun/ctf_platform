import { NotFoundError, ConflictError } from "../libs/errors";
import * as categoryRepo from "../repo/category.repo";

export const getAllCategories = async () => {
  try {
    const categories = await categoryRepo.getAllCategories();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await categoryRepo.getCategoryById(id);
    if (!category) {
      throw new NotFoundError(`Category with ID ${id} not found`);
    }
    return category;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const existingCategory = await categoryRepo.getCategoryByName(name);
    if (existingCategory) {
      throw new ConflictError(`Category with name "${name}" already exists`);
    }

    const category = await categoryRepo.createCategory(name);
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id: number, name: string) => {
  try {
    const category = await categoryRepo.updateCategory(id, name);
    if (!category) {
      throw new NotFoundError(`Category with ID ${id} not found`);
    }
    return category;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const category = await categoryRepo.deleteCategory(id);
    return category;
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw error;
  }
};

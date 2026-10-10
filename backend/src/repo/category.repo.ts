import { CategoryTable } from "../db/schema/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getAllCategories = async () => {
  try {
    const categories = await db.query.CategoryTable.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await db.query.CategoryTable.findFirst({
      where: { id },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getCategoryByName = async (name: string) => {
  try {
    const category = await db.query.CategoryTable.findFirst({
      where: { name },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const category = await db.insert(CategoryTable).values({ name }).returning({
      id: CategoryTable.id,
      name: CategoryTable.name,
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const updateCategory = async (id: number, name: string) => {
  try {
    const updatedCategory = await db
      .update(CategoryTable)
      .set({ name })
      .where(eq(CategoryTable.id, id))
      .returning({
        id: CategoryTable.id,
        name: CategoryTable.name,
      });
    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const deletedCategory = await db
      .delete(CategoryTable)
      .where(eq(CategoryTable.id, id))
      .returning({
        id: CategoryTable.id,
        name: CategoryTable.name,
      });
    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

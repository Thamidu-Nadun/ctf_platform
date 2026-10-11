import { apiFetch } from "@/lib/auth";

export type Category = { id: number; name: string };
export type CategoryInput = { name: string };

export const getCategories = () => apiFetch<Category[]>("/category");

export const getCategory = (categoryId: number) =>
  apiFetch<Category>(`/category/${categoryId}`);

export const createCategory = (category: CategoryInput) =>
  apiFetch<Category[]>("/category", {
    method: "POST",
    body: JSON.stringify(category),
  });

export const updateCategory = (categoryId: number, category: CategoryInput) =>
  apiFetch<Category[]>(`/category/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });

export const deleteCategory = (categoryId: number) =>
  apiFetch<Category[]>(`/category/${categoryId}`, { method: "DELETE" });

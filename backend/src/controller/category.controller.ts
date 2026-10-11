import * as categoryService from "../service/category.service";
import type { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError, ConflictError } from "../libs/errors";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await categoryService.getAllCategories();
    res.status(200).json(items);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:categoryId", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      res.status(400).json({ message: "Category ID is required and must be a single value" });
      return;
    }
    const categoryIdNum = Number(categoryId);
    if (!/^\d+$/.test(categoryId) || !Number.isInteger(categoryIdNum) || categoryIdNum <= 0 || categoryIdNum > 2147483647) {
      res.status(400).json({ message: "Category ID must be a positive integer" });
      return;
    }
    const category = await categoryService.getCategoryById(categoryIdNum);
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    const { name } = req.body;
    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({ message: "Name is required and must be a non-empty string" });
      return;
    }
    const createdCategory = await categoryService.createCategory(name.trim());
    res.status(201).json(createdCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:categoryId", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      res.status(400).json({ message: "Category ID is required and must be a single value" });
      return;
    }
    const categoryIdNum = Number(categoryId);
    if (!/^\d+$/.test(categoryId) || !Number.isInteger(categoryIdNum) || categoryIdNum <= 0 || categoryIdNum > 2147483647) {
      res.status(400).json({ message: "Category ID must be a positive integer" });
      return;
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    const { name } = req.body;
    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({ message: "Name is required and must be a non-empty string" });
      return;
    }
    await categoryService.getCategoryById(categoryIdNum);
    const updatedCategory = await categoryService.updateCategory(categoryIdNum, name.trim());
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:categoryId", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || Array.isArray(categoryId)) {
      res.status(400).json({ message: "Category ID is required and must be a single value" });
      return;
    }
    const categoryIdNum = Number(categoryId);
    if (!/^\d+$/.test(categoryId) || !Number.isInteger(categoryIdNum) || categoryIdNum <= 0 || categoryIdNum > 2147483647) {
      res.status(400).json({ message: "Category ID must be a positive integer" });
      return;
    }
    await categoryService.getCategoryById(categoryIdNum);
    const deletedCategory = await categoryService.deleteCategory(categoryIdNum);
    res.status(200).json(deletedCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

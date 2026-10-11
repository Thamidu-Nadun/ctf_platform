import * as userService from "../service/user.service";
import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid data types" });
  }
  try {
    const user = await userService.loginUser(email, password);
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY || "default_secret",
      { expiresIn: "7d" },
    );
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ message: "Invalid data types" });
  }
  if (name.length > 256 || password.length > 256 || email.length > 256) {
    return res.status(400).json({ message: "Fields exceed maximum length" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    const user = await userService.createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

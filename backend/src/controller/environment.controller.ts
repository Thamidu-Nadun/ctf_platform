import * as environmentService from "../service/environment.service";
import type { Request, Response } from "express";
import { Router } from "express";
import type {
  EnvironmentReqDto,
  EnvironmentResDto,
} from "../models/environment.model";
import { NotFoundError, ConflictError } from "../libs/errors";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const environments = await environmentService.getAllEnvironments();
    res.json(environments);
  } catch (error) {
    console.error("Error fetching environments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      message: "Environment ID is required and must be a single value",
    });
  }
  const environmentIdNum = parseInt(id, 10);
  if (isNaN(environmentIdNum)) {
    return res.status(400).json({ message: "Environment ID must be a number" });
  }
  try {
    const environment =
      await environmentService.getEnvironmentById(environmentIdNum);
    res.json(environment);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      console.error(`Error fetching environment with ID ${id}:`, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  const environmentReq: EnvironmentReqDto = req.body;
  try {
    const createdEnvironment = await environmentService.createEnvironment(
      environmentReq.imageUrl,
      environmentReq.repoUrl,
    );
    res.status(201).json(createdEnvironment);
  } catch (error) {
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
    } else {
      console.error("Error creating environment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      message: "Environment ID is required and must be a single value",
    });
  }
  const environmentIdNum = parseInt(id, 10);
  if (isNaN(environmentIdNum)) {
    return res.status(400).json({ message: "Environment ID must be a number" });
  }
  try {
    const deletedEnvironment =
      await environmentService.deleteEnvironment(environmentIdNum);
    res.json(deletedEnvironment);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      console.error(`Error deleting environment with ID ${id}:`, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;

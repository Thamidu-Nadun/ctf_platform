import type { Request, Response } from "express";
import { Router } from "express";
import * as instanceService from "../service/instanceService";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  const instances = instanceService.getInstances();
  return res.status(200).json({
    statusCode: 200,
    message: "Instances retrieved successfully",
    data: instances,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing instance id" });
  }

  const instance = instanceService.getInstanceById(id);
  if (!instance) {
    return res.status(404).json({ error: "Instance not found" });
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Instance retrieved successfully",
    data: instance,
  });
});

router.post("/:challengeName", async (req: Request, res: Response) => {
  const { challengeName } = req.params;
  if (!challengeName || Array.isArray(challengeName)) {
    return res.status(400).json({ error: "Missing challenge name" });
  }

  try {
    const instance = await instanceService.createInstance(challengeName);
    return res.status(201).json({
      statusCode: 201,
      message: "Instance created successfully",
      data: instance,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing instance id" });
  }
  res.status(200).json({
    statusCode: 200,
    message: "Instance deleted successfully [TEMP]",
  });
});

export default router;

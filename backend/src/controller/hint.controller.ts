import type { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../libs/errors";
import * as hintService from "../service/hint.service";

const router: Router = Router();

const parseId = (value: unknown) => {
  if (
    (typeof value !== "string" && typeof value !== "number") ||
    (typeof value === "string" && !/^\d+$/.test(value))
  ) {
    return null;
  }
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

const getHintInput = (body: Request["body"]) => {
  const challengeId = parseId(body?.challengeId);
  const hintText = body?.hintText;
  const cost = body?.cost;
  if (
    !challengeId ||
    typeof hintText !== "string" ||
    !hintText.trim() ||
    hintText.length > 2000 ||
    !Number.isInteger(cost) ||
    cost < 0
  ) {
    return null;
  }
  return { challengeId, hintText, cost };
};

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.status(200).json(await hintService.getHints());
  } catch (error) {
    console.error("Error fetching hints:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/challenge/:challengeId", async (req: Request, res: Response) => {
  const challengeId = parseId(req.params.challengeId);
  if (!challengeId) {
    res
      .status(400)
      .json({ message: "Challenge ID must be a positive integer" });
    return;
  }

  try {
    res.status(200).json(await hintService.getHintsByChallengeId(challengeId));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error fetching hints for challenge ${challengeId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const input = getHintInput(req.body);
  if (!input) {
    res.status(400).json({
      message:
        "A positive challengeId, non-empty hintText, and non-negative cost are required",
    });
    return;
  }

  try {
    res
      .status(201)
      .json(
        await hintService.createHint(
          input.challengeId,
          input.hintText,
          input.cost,
        ),
      );
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Error creating hint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:hintId", async (req: Request, res: Response) => {
  const hintId = parseId(req.params.hintId);
  const hintText = req.body?.hintText;
  const cost = req.body?.cost;
  if (
    !hintId ||
    typeof hintText !== "string" ||
    !hintText.trim() ||
    hintText.length > 2000 ||
    !Number.isInteger(cost) ||
    cost < 0
  ) {
    res.status(400).json({
      message:
        "A positive hint ID, non-empty hintText, and non-negative cost are required",
    });
    return;
  }

  try {
    res.status(200).json(await hintService.updateHint(hintId, hintText, cost));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error updating hint ${hintId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:hintId", async (req: Request, res: Response) => {
  const hintId = parseId(req.params.hintId);
  if (!hintId) {
    res.status(400).json({ message: "Hint ID must be a positive integer" });
    return;
  }

  try {
    res.status(200).json(await hintService.deleteHint(hintId));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error deleting hint ${hintId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

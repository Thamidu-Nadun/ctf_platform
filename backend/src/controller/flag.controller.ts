import type { Request, Response } from "express";
import { Router } from "express";
import { ConflictError, NotFoundError } from "../libs/errors";
import * as flagService from "../service/flag.service";

const router: Router = Router();

const parseChallengeId = (value: string | string[] | undefined) => {
  if (!value || Array.isArray(value) || !/^\d+$/.test(value)) return null;
  const challengeId = Number(value);
  return Number.isSafeInteger(challengeId) && challengeId > 0
    ? challengeId
    : null;
};

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.status(200).json(await flagService.getFlags());
  } catch (error) {
    console.error("Error fetching flags:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:challengeId", async (req: Request, res: Response) => {
  const challengeId = parseChallengeId(req.params.challengeId);
  if (!challengeId) {
    res
      .status(400)
      .json({ message: "Challenge ID must be a positive integer" });
    return;
  }

  try {
    res.status(200).json(await flagService.getFlagByChallengeId(challengeId));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error fetching flag for challenge ${challengeId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const challengeId = parseChallengeId(req.body?.challengeId);
  const flagText = req.body?.flagText;
  if (
    !challengeId ||
    typeof flagText !== "string" ||
    !flagText.trim() ||
    flagText.length > 1000
  ) {
    res.status(400).json({
      message: "A positive challengeId and non-empty flagText are required",
    });
    return;
  }

  try {
    res.status(201).json(await flagService.createFlag(challengeId, flagText));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof ConflictError) {
      res.status(409).json({ message: error.message });
      return;
    }
    console.error("Error creating flag:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:challengeId", async (req: Request, res: Response) => {
  const challengeId = parseChallengeId(req.params.challengeId);
  const flagText = req.body?.flagText;
  if (
    !challengeId ||
    typeof flagText !== "string" ||
    !flagText.trim() ||
    flagText.length > 1000
  ) {
    res.status(400).json({
      message: "A positive challenge ID and non-empty flagText are required",
    });
    return;
  }

  try {
    res.status(200).json(await flagService.updateFlag(challengeId, flagText));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error updating flag for challenge ${challengeId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:challengeId", async (req: Request, res: Response) => {
  const challengeId = parseChallengeId(req.params.challengeId);
  if (!challengeId) {
    res
      .status(400)
      .json({ message: "Challenge ID must be a positive integer" });
    return;
  }

  try {
    res.status(200).json(await flagService.deleteFlag(challengeId));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error(`Error deleting flag for challenge ${challengeId}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

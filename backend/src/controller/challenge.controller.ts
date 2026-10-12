import * as challengeService from "../service/challenge.service";
import type { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError, ConflictError } from "../libs/errors";
import type { ChallengeReq } from "../models/challenge.model";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await challengeService.getChallenges();
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

router.get("/:challengeId", async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    if (!challengeId || Array.isArray(challengeId)) {
      res.status(400).json({
        message: "Challenge ID is required and must be a single value",
      });
      return;
    }
    const challengeIdNum = Number(challengeId);
    if (
      !/^\d+$/.test(challengeId) ||
      !Number.isInteger(challengeIdNum) ||
      challengeIdNum <= 0 ||
      challengeIdNum > 2147483647
    ) {
      res
        .status(400)
        .json({ message: "Challenge ID must be a positive integer" });
      return;
    }
    const challenge = await challengeService.getChallengeById(challengeIdNum);
    res.status(200).json(challenge);
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
    const challengeReq: ChallengeReq = req.body;
    if (
      typeof challengeReq.name !== "string" ||
      !challengeReq.name.trim() ||
      challengeReq.name.length > 256 ||
      typeof challengeReq.description !== "string" ||
      !challengeReq.description.trim() ||
      !["easy", "medium", "hard"].includes(challengeReq.level) ||
      !Number.isInteger(challengeReq.points) ||
      challengeReq.points < 0 ||
      challengeReq.points > 2147483647 ||
      typeof challengeReq.visibility !== "boolean" ||
      !Number.isInteger(challengeReq.eventId) ||
      challengeReq.eventId <= 0 ||
      challengeReq.eventId > 2147483647 ||
      !Number.isInteger(challengeReq.categoryId) ||
      challengeReq.categoryId <= 0 ||
      challengeReq.categoryId > 2147483647 ||
      !Array.isArray(challengeReq.assets) ||
      !challengeReq.assets.every(
        (asset) => typeof asset === "string" && asset.trim() !== "",
      )
    ) {
      res.status(400).json({
        message:
          "Valid name, description, level, points, visibility, eventId and categoryId are required",
      });
      return;
    }
    const createdChallenge =
      await challengeService.createChallenge(challengeReq);
    res.status(201).json(createdChallenge);
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

router.put("/:challengeId", async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    if (!challengeId || Array.isArray(challengeId)) {
      res.status(400).json({
        message: "Challenge ID is required and must be a single value",
      });
      return;
    }
    const challengeIdNum = Number(challengeId);
    if (
      !/^\d+$/.test(challengeId) ||
      !Number.isInteger(challengeIdNum) ||
      challengeIdNum <= 0 ||
      challengeIdNum > 2147483647
    ) {
      res
        .status(400)
        .json({ message: "Challenge ID must be a positive integer" });
      return;
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    const challengeReq: ChallengeReq = req.body;
    if (
      typeof challengeReq.name !== "string" ||
      !challengeReq.name.trim() ||
      challengeReq.name.length > 256 ||
      typeof challengeReq.description !== "string" ||
      !challengeReq.description.trim() ||
      !["easy", "medium", "hard"].includes(challengeReq.level) ||
      !Number.isInteger(challengeReq.points) ||
      challengeReq.points < 0 ||
      challengeReq.points > 2147483647 ||
      typeof challengeReq.visibility !== "boolean" ||
      !Number.isInteger(challengeReq.eventId) ||
      challengeReq.eventId <= 0 ||
      challengeReq.eventId > 2147483647 ||
      !Number.isInteger(challengeReq.categoryId) ||
      challengeReq.categoryId <= 0 ||
      challengeReq.categoryId > 2147483647 ||
      !Array.isArray(challengeReq.assets) ||
      !challengeReq.assets.every(
        (asset) => typeof asset === "string" && asset.trim() !== "",
      )
    ) {
      res.status(400).json({
        message:
          "Valid name, description, level, points, visibility, eventId and categoryId are required",
      });
      return;
    }
    await challengeService.getChallengeById(challengeIdNum);
    const updatedChallenge = await challengeService.updateChallenge(
      challengeIdNum,
      challengeReq,
    );
    res.status(200).json(updatedChallenge);
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

router.delete("/:challengeId", async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    if (!challengeId || Array.isArray(challengeId)) {
      res.status(400).json({
        message: "Challenge ID is required and must be a single value",
      });
      return;
    }
    const challengeIdNum = Number(challengeId);
    if (
      !/^\d+$/.test(challengeId) ||
      !Number.isInteger(challengeIdNum) ||
      challengeIdNum <= 0 ||
      challengeIdNum > 2147483647
    ) {
      res
        .status(400)
        .json({ message: "Challenge ID must be a positive integer" });
      return;
    }
    await challengeService.getChallengeById(challengeIdNum);
    const deletedChallenge =
      await challengeService.deleteChallenge(challengeIdNum);
    res.status(200).json(deletedChallenge);
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

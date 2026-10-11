import * as participantService from "../service/participant.service";
import type { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError, ConflictError } from "../libs/errors";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await participantService.getAllParticipants();
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

router.get("/:userId/:eventId", async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;
    if (!userId || Array.isArray(userId) || !userId.trim() || userId.length > 50) {
      res.status(400).json({ message: "User ID is required and must be a single non-empty string of at most 50 characters" });
      return;
    }
    if (!eventId || Array.isArray(eventId)) {
      res.status(400).json({ message: "Event ID is required and must be a single value" });
      return;
    }
    const eventIdNum = Number(eventId);
    if (!/^\d+$/.test(eventId) || !Number.isInteger(eventIdNum) || eventIdNum <= 0 || eventIdNum > 2147483647) {
      res.status(400).json({ message: "Event ID must be a positive integer" });
      return;
    }
    const participant = await participantService.getParticipantById(userId, eventIdNum);
    res.status(200).json(participant);
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
    const { userId, eventId } = req.body;
    if (
      typeof userId !== "string" || !userId.trim() || userId.length > 50 ||
      !Number.isInteger(eventId) || eventId <= 0 || eventId > 2147483647
    ) {
      res.status(400).json({ message: "A valid userId and positive integer eventId are required" });
      return;
    }
    const createdParticipant = await participantService.createParticipant(userId, eventId);
    res.status(201).json(createdParticipant);
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

router.put("/:userId/:eventId", async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;
    if (!userId || Array.isArray(userId) || !userId.trim() || userId.length > 50) {
      res.status(400).json({ message: "User ID is required and must be a single non-empty string of at most 50 characters" });
      return;
    }
    if (!eventId || Array.isArray(eventId)) {
      res.status(400).json({ message: "Event ID is required and must be a single value" });
      return;
    }
    const eventIdNum = Number(eventId);
    if (!/^\d+$/.test(eventId) || !Number.isInteger(eventIdNum) || eventIdNum <= 0 || eventIdNum > 2147483647) {
      res.status(400).json({ message: "Event ID must be a positive integer" });
      return;
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    const { joinedAt } = req.body;
    if ((typeof joinedAt !== "string" || !joinedAt.trim())) {
      res.status(400).json({ message: "joinedAt must be a valid date string" });
      return;
    }
    const joinedAtDate = new Date(joinedAt);
    if (Number.isNaN(joinedAtDate.getTime())) {
      res.status(400).json({ message: "joinedAt must be a valid date string" });
      return;
    }
    await participantService.getParticipantById(userId, eventIdNum);
    const updatedParticipant = await participantService.updateParticipant(userId, eventIdNum, joinedAtDate);
    res.status(200).json(updatedParticipant);
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

router.delete("/:userId/:eventId", async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;
    if (!userId || Array.isArray(userId) || !userId.trim() || userId.length > 50) {
      res.status(400).json({ message: "User ID is required and must be a single non-empty string of at most 50 characters" });
      return;
    }
    if (!eventId || Array.isArray(eventId)) {
      res.status(400).json({ message: "Event ID is required and must be a single value" });
      return;
    }
    const eventIdNum = Number(eventId);
    if (!/^\d+$/.test(eventId) || !Number.isInteger(eventIdNum) || eventIdNum <= 0 || eventIdNum > 2147483647) {
      res.status(400).json({ message: "Event ID must be a positive integer" });
      return;
    }
    await participantService.getParticipantById(userId, eventIdNum);
    const deletedParticipant = await participantService.deleteParticipant(userId, eventIdNum);
    res.status(200).json(deletedParticipant);
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

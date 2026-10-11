import * as submissionService from "../service/submission.service";
import type { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError, ConflictError } from "../libs/errors";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await submissionService.getAllSubmissions();
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

router.get("/:submissionId", async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    if (!submissionId || Array.isArray(submissionId)) {
      res.status(400).json({ message: "Submission ID is required and must be a single value" });
      return;
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(submissionId)) {
      res.status(400).json({ message: "Submission ID must be a valid UUID" });
      return;
    }
    const submission = await submissionService.getSubmissionById(submissionId);
    res.status(200).json(submission);
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
    const { userId, eventId, challengeId, points, submittedAt } = req.body;
    if (
      typeof userId !== "string" || !userId.trim() || userId.length > 50 ||
      !Number.isInteger(eventId) || eventId <= 0 || eventId > 2147483647 ||
      !Number.isInteger(challengeId) || challengeId <= 0 || challengeId > 2147483647 ||
      !Number.isInteger(points) || points < 0 || points > 2147483647
    ) {
      res.status(400).json({ message: "Valid userId, eventId, challengeId and non-negative integer points are required" });
      return;
    }
    if ((submittedAt !== undefined && (typeof submittedAt !== "string" || !submittedAt.trim()))) {
      res.status(400).json({ message: "submittedAt must be a valid date string" });
      return;
    }
    const submittedAtDate = submittedAt === undefined ? new Date() : new Date(submittedAt);
    if (Number.isNaN(submittedAtDate.getTime())) {
      res.status(400).json({ message: "submittedAt must be a valid date string" });
      return;
    }
    const createdSubmission = await submissionService.createSubmission(userId, eventId, challengeId, points, submittedAtDate);
    res.status(201).json(createdSubmission);
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

router.put("/:submissionId", async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    if (!submissionId || Array.isArray(submissionId)) {
      res.status(400).json({ message: "Submission ID is required and must be a single value" });
      return;
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(submissionId)) {
      res.status(400).json({ message: "Submission ID must be a valid UUID" });
      return;
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    const { userId, eventId, challengeId, points, submittedAt } = req.body;
    if (
      typeof userId !== "string" || !userId.trim() || userId.length > 50 ||
      !Number.isInteger(eventId) || eventId <= 0 || eventId > 2147483647 ||
      !Number.isInteger(challengeId) || challengeId <= 0 || challengeId > 2147483647 ||
      !Number.isInteger(points) || points < 0 || points > 2147483647
    ) {
      res.status(400).json({ message: "Valid userId, eventId, challengeId and non-negative integer points are required" });
      return;
    }
    if ((typeof submittedAt !== "string" || !submittedAt.trim())) {
      res.status(400).json({ message: "submittedAt must be a valid date string" });
      return;
    }
    const submittedAtDate = new Date(submittedAt);
    if (Number.isNaN(submittedAtDate.getTime())) {
      res.status(400).json({ message: "submittedAt must be a valid date string" });
      return;
    }
    await submissionService.getSubmissionById(submissionId);
    const updatedSubmission = await submissionService.updateSubmission(submissionId, userId, eventId, challengeId, points, submittedAtDate);
    res.status(200).json(updatedSubmission);
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

router.delete("/:submissionId", async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    if (!submissionId || Array.isArray(submissionId)) {
      res.status(400).json({ message: "Submission ID is required and must be a single value" });
      return;
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(submissionId)) {
      res.status(400).json({ message: "Submission ID must be a valid UUID" });
      return;
    }
    await submissionService.getSubmissionById(submissionId);
    const deletedSubmission = await submissionService.deleteSubmission(submissionId);
    res.status(200).json(deletedSubmission);
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

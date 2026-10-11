import * as eventService from "../service/event.service";
import type { Request, Response } from "express";
import { Router } from "express";
import type { EventReqDto, EventResDto } from "../models/event.model";
import { NotFoundError } from "../libs/errors";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const events: EventResDto[] = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:eventId", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId || Array.isArray(eventId)) {
      res
        .status(400)
        .json({ message: "Event ID is required and must be a single value" });
      return;
    }
    const eventIdNum = parseInt(eventId, 10);
    if (isNaN(eventIdNum)) {
      res.status(400).json({ message: "Event ID must be a number" });
      return;
    }
    const event: EventResDto = await eventService.getEventById(eventIdNum);
    res.status(200).json(event);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const eventReq: EventReqDto = req.body;
    const createdEvent = await eventService.createEvent(eventReq);
    res.status(201).json(createdEvent);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId || Array.isArray(eventId)) {
      res
        .status(400)
        .json({ message: "Event ID is required and must be a single value" });
      return;
    }
    const eventIdNum = parseInt(eventId, 10);
    if (isNaN(eventIdNum)) {
      res.status(400).json({ message: "Event ID must be a number" });
      return;
    }
    const deletedEvent = await eventService.deleteEvent(eventIdNum);
    res.status(200).json(deletedEvent);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

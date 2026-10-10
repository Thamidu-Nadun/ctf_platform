import { NotFoundError } from "../libs/errors";
import * as eventRepo from "../repo/event.repo";
import type { EventReqDto } from "../models/event.model";

export const getAllEvents = async () => {
  try {
    const events = await eventRepo.getAllEvents();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (id: number) => {
  try {
    const event = await eventRepo.getEventById(id);
    if (!event) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }
    return event;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (eventData: EventReqDto) => {
  try {
    const event = await eventRepo.createEvent(
      eventData.name,
      eventData.story,
      eventData.status,
      eventData.startDate,
      eventData.endDate,
    );
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (id: number, eventData: EventReqDto) => {
  try {
    const event = await eventRepo.updateEvent(
      id,
      eventData.name,
      eventData.story,
      eventData.status,
      eventData.startDate,
      eventData.endDate,
    );
    if (!event) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }
    return event;
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const event = await eventRepo.deleteEvent(id);
    return event;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw error;
  }
};

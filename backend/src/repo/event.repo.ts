import { eq } from "drizzle-orm";
import { EventTable } from "../db/schema/schema";
import { db } from "./../db/index";

export const getAllEvents = async () => {
  try {
    const events = await db.query.EventTable.findMany();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};
export const getEventById = async (id: number) => {
  try {
    const event = await db.query.EventTable.findFirst({
      where: { id },
    });
    return event;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};
export const createEvent = async (
  name: string,
  story: string,
  status: "upcoming" | "ongoing" | "ended",
  startDate: Date,
  endDate: Date,
) => {
  try {
    const event = await db
      .insert(EventTable)
      .values({
        name,
        story,
        status,
        startDate,
        endDate,
      })
      .returning({
        id: EventTable.id,
        name: EventTable.name,
        story: EventTable.story,
        status: EventTable.status,
        startDate: EventTable.startDate,
        endDate: EventTable.endDate,
      });
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};
export const updateEvent = async (
  id: number,
  name: string,
  stroy: string,
  status: "upcoming" | "ongoing" | "ended",
  startDate: Date,
  endDate: Date,
) => {
  try {
    const updatedEvent = await db
      .update(EventTable)
      .set({
        name,
        story: stroy,
        status,
        startDate,
        endDate,
      })
      .where(eq(EventTable.id, id))
      .returning({
        id: EventTable.id,
        name: EventTable.name,
        story: EventTable.story,
        status: EventTable.status,
        startDate: EventTable.startDate,
        endDate: EventTable.endDate,
      });
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};
export const deleteEvent = async (id: number) => {
  try {
    const deletedEvent = await db
      .delete(EventTable)
      .where(eq(EventTable.id, id))
      .returning({
        id: EventTable.id,
        name: EventTable.name,
        story: EventTable.story,
        status: EventTable.status,
        startDate: EventTable.startDate,
        endDate: EventTable.endDate,
      });
    return deletedEvent;
  } catch (error) {
    console.error("Error deleting event:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

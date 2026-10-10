import { db } from "./../db/index";
import { ParticipantTable } from "../db/schema/schema";
import { and, eq } from "drizzle-orm";

export const getAllParticipants = async () => {
  try {
    const participants = await db.query.ParticipantTable.findMany();
    return participants;
  } catch (error) {
    console.error("Error fetching participants:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getParticipantById = async (userId: string, eventId: number) => {
  try {
    const participant = await db.query.ParticipantTable.findFirst({
      where: { userId, eventId },
    });
    return participant;
  } catch (error) {
    console.error("Error fetching participant by ID:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const createParticipant = async (userId: string, eventId: number) => {
  try {
    const participant = await db
      .insert(ParticipantTable)
      .values({
        userId,
        eventId,
      })
      .returning({
        userId: ParticipantTable.userId,
        eventId: ParticipantTable.eventId,
        joinedAt: ParticipantTable.joinedAt,
      });
    return participant;
  } catch (error) {
    console.error("Error creating participant:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const updateParticipant = async (
  userId: string,
  eventId: number,
  joinedAt: Date,
) => {
  try {
    const participant = await db
      .update(ParticipantTable)
      .set({
        joinedAt,
      })
      .where(
        and(
          eq(ParticipantTable.userId, userId),
          eq(ParticipantTable.eventId, eventId),
        ),
      )
      .returning({
        userId: ParticipantTable.userId,
        eventId: ParticipantTable.eventId,
        joinedAt: ParticipantTable.joinedAt,
      });
    return participant;
  } catch (error) {
    console.error("Error updating participant:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const deleteParticipant = async (userId: string, eventId: number) => {
  try {
    const deletedParticipant = await db
      .delete(ParticipantTable)
      .where(
        and(
          eq(ParticipantTable.userId, userId),
          eq(ParticipantTable.eventId, eventId),
        ),
      )
      .returning({
        userId: ParticipantTable.userId,
        eventId: ParticipantTable.eventId,
        joinedAt: ParticipantTable.joinedAt,
      });
    return deletedParticipant;
  } catch (error) {
    console.error("Error deleting participant:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

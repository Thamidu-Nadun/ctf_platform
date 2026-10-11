import { NotFoundError } from "../libs/errors";
import * as participantRepo from "../repo/participant.repo";

export const getAllParticipants = async () => {
  try {
    const participants = await participantRepo.getAllParticipants();
    return participants;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error;
  }
};

export const getParticipantById = async (userId: string, eventId: number) => {
  try {
    const participant = await participantRepo.getParticipantById(
      userId,
      eventId,
    );
    if (!participant) {
      throw new NotFoundError(
        `Participant for user ${userId} in event ${eventId} not found`,
      );
    }
    return participant;
  } catch (error) {
    console.error(
      `Error fetching participant for user ${userId} in event ${eventId}:`,
      error,
    );
    throw error;
  }
};

export const createParticipant = async (userId: string, eventId: number) => {
  try {
    const participant = await participantRepo.createParticipant(
      userId,
      eventId,
    );
    return participant;
  } catch (error) {
    console.error("Error creating participant:", error);
    throw error;
  }
};

export const updateParticipant = async (
  userId: string,
  eventId: number,
  joinedAt: Date,
) => {
  try {
    const participant = await participantRepo.updateParticipant(
      userId,
      eventId,
      joinedAt,
    );
    if (!participant) {
      throw new NotFoundError(
        `Participant for user ${userId} in event ${eventId} not found`,
      );
    }
    return participant;
  } catch (error) {
    console.error(
      `Error updating participant for user ${userId} in event ${eventId}:`,
      error,
    );
    throw error;
  }
};

export const deleteParticipant = async (userId: string, eventId: number) => {
  try {
    const participant = await participantRepo.deleteParticipant(
      userId,
      eventId,
    );
    if (!participant) {
      throw new NotFoundError(
        `Participant for user ${userId} in event ${eventId} not found`,
      );
    }
    return participant;
  } catch (error) {
    console.error(
      `Error deleting participant for user ${userId} in event ${eventId}:`,
      error,
    );
    throw error;
  }
};

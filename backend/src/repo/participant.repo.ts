import { db } from "../db";
import { ParticipantTable } from "../db/schema/schema";

export const getAllParticipants = async () => {};
export const getParticipantById = async (userId: string, eventId: number) => {};
export const createParticipant = async (userId: string, eventId: number) => {};
export const updateParticipant = async (
  userId: string,
  eventId: number,
  joinedAt: Date,
) => {};
export const deleteParticipant = async (userId: string, eventId: number) => {};

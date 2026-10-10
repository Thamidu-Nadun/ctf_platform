import { db } from "../db";
import { SubmissionTable } from "../db/schema/schema";

export const getAllSubmissions = async () => {};
export const getSubmissionById = async (id: string) => {};
export const createSubmission = async (
  name: string,
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {};
export const updateSubmission = async (
  id: string,
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {};
export const deleteSubmission = async (id: string) => {};

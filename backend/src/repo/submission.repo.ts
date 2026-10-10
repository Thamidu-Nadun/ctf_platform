import { eq } from "drizzle-orm";
import { db } from "../db";
import { SubmissionTable } from "../db/schema/schema";

export const getAllSubmissions = async () => {
  try {
    const submissions = await db.query.SubmissionTable.findMany();
    return submissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  try {
    const submission = await db.query.SubmissionTable.findFirst({
      where: { id },
    });
    return submission;
  } catch (error) {
    console.error("Error fetching submission by ID:", error);
    throw error;
  }
};

export const createSubmission = async (
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {
  try {
    const createdSubmission = await db
      .insert(SubmissionTable)
      .values({
        userId,
        eventId,
        challengeId,
        points,
        submittedAt,
      })
      .returning({
        id: SubmissionTable.id,
        userId: SubmissionTable.userId,
        eventId: SubmissionTable.eventId,
        challengeId: SubmissionTable.challengeId,
        points: SubmissionTable.points,
        submittedAt: SubmissionTable.submittedAt,
      });
    return createdSubmission;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
};

export const updateSubmission = async (
  id: string,
  userId: string,
  eventId: number,
  challengeId: number,
  points: number,
  submittedAt: Date,
) => {
  try {
    const updatedSubmission = await db
      .update(SubmissionTable)
      .set({
        userId,
        eventId,
        challengeId,
        points,
        submittedAt,
      })
      .where(eq(SubmissionTable.id, id))
      .returning({
        id: SubmissionTable.id,
        userId: SubmissionTable.userId,
        eventId: SubmissionTable.eventId,
        challengeId: SubmissionTable.challengeId,
        points: SubmissionTable.points,
        submittedAt: SubmissionTable.submittedAt,
      });
    return updatedSubmission;
  } catch (error) {
    console.error("Error updating submission:", error);
    throw error;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const deletedSubmission = await db
      .delete(SubmissionTable)
      .where(eq(SubmissionTable.id, id))
      .returning({
        id: SubmissionTable.id,
        userId: SubmissionTable.userId,
        eventId: SubmissionTable.eventId,
        challengeId: SubmissionTable.challengeId,
        points: SubmissionTable.points,
        submittedAt: SubmissionTable.submittedAt,
      });
    return deletedSubmission;
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
};

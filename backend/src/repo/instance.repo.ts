import { eq } from "drizzle-orm";
import { db } from "../db";
import { InstanceTable } from "../db/schema/schema";

export const getAllInstances = async () => {
  try {
    const instances = await db.query.InstanceTable.findMany();
    return instances;
  } catch (error) {
    console.error("Error fetching instances:", error);
    throw error;
  }
};

export const getInstanceById = async (id: string) => {
  try {
    const instance = await db.query.InstanceTable.findFirst({
      where: { id },
    });
    return instance;
  } catch (error) {
    console.error(`Error fetching instance with id ${id}:`, error);
    throw error;
  }
};

/**
 * In here it uses composite key that includes userId, challengeId to get the instance. This is because we want to make sure that the user can only access their own instance for a specific challenge.
 * @param userId : string - The id of the user
 * @param challengeId : number - The id of the challenge
 * @returns InstanceTable | null
 */
export const getInstancesByUserAndChallengeId = async (
  userId: string,
  challengeId: number,
) => {
  try {
    const instance = await db.query.InstanceTable.findFirst({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
    });
    return instance;
  } catch (error) {
    console.error(
      `Error fetching instance for user ${userId} and challenge ${challengeId}:`,
      error,
    );
    throw error;
  }
};

export const createInstance = async (
  environmentId: number,
  challengeId: number,
  userId: string,
  status: "pending" | "running" | "stopped" | "error",
  createdAt: Date,
  expiresAt: Date,
  targetUrl: string,
) => {
  try {
    const [newInstance] = await db
      .insert(InstanceTable)
      .values({
        environmentId,
        challengeId,
        userId,
        status,
        createdAt,
        expiresAt,
        targetUrl,
      })
      .returning({
        id: InstanceTable.id,
        environmentId: InstanceTable.environmentId,
        challengeId: InstanceTable.challengeId,
        userId: InstanceTable.userId,
        status: InstanceTable.status,
        createdAt: InstanceTable.createdAt,
        expiresAt: InstanceTable.expiresAt,
        targetUrl: InstanceTable.targetUrl,
      });
    return newInstance;
  } catch (error) {
    console.error("Error creating instance:", error);
    throw error;
  }
};
export const updateInstance = async (
  id: string,
  environmentId: number,
  challengeId: number,
  userId: string,
  status: "pending" | "running" | "stopped" | "error",
  createdAt: Date,
  expiresAt: Date,
  targetUrl: string,
) => {
  try {
    const updatedInstance = await db
      .update(InstanceTable)
      .set({
        environmentId,
        challengeId,
        userId,
        status,
        createdAt,
        expiresAt,
        targetUrl,
      })
      .where(eq(InstanceTable.id, id))
      .returning({
        id: InstanceTable.id,
        environmentId: InstanceTable.environmentId,
        challengeId: InstanceTable.challengeId,
        userId: InstanceTable.userId,
        status: InstanceTable.status,
        createdAt: InstanceTable.createdAt,
        expiresAt: InstanceTable.expiresAt,
        targetUrl: InstanceTable.targetUrl,
      });
    return updatedInstance;
  } catch (error) {
    console.error(`Error updating instance with id ${id}:`, error);
    throw error;
  }
};

export const deleteInstance = async (id: string) => {
  try {
    const deletedInstance = await db
      .delete(InstanceTable)
      .where(eq(InstanceTable.id, id))
      .returning({
        id: InstanceTable.id,
        environmentId: InstanceTable.environmentId,
        challengeId: InstanceTable.challengeId,
        userId: InstanceTable.userId,
        status: InstanceTable.status,
        createdAt: InstanceTable.createdAt,
        expiresAt: InstanceTable.expiresAt,
        targetUrl: InstanceTable.targetUrl,
      });
    return deletedInstance;
  } catch (error) {
    console.error(`Error deleting instance with id ${id}:`, error);
    throw error;
  }
};

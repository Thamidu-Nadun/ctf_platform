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

export const createInstance = async (
  environmentId: number,
  challengeId: number,
  userId: string,
  status: "pending" | "running" | "stopped" | "error",
  createdAt: Date,
  expiresAt: Date,
) => {
  try {
    const newInstance = await db
      .insert(InstanceTable)
      .values({
        environmentId,
        challengeId,
        userId,
        status,
        createdAt,
        expiresAt,
      })
      .returning({
        id: InstanceTable.id,
        environmentId: InstanceTable.environmentId,
        challengeId: InstanceTable.challengeId,
        userId: InstanceTable.userId,
        status: InstanceTable.status,
        createdAt: InstanceTable.createdAt,
        expiresAt: InstanceTable.expiresAt,
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
      });
    return deletedInstance;
  } catch (error) {
    console.error(`Error deleting instance with id ${id}:`, error);
    throw error;
  }
};

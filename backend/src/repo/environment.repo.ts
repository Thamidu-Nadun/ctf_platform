import { eq } from "drizzle-orm";
import { EnvironmentTable } from "../db/schema/schema";
import { db } from "../db";

export const getAllEnvironments = async () => {
  try {
    const environments = await db.query.EnvironmentTable.findMany();
    return environments;
  } catch (error) {
    console.error("Error fetching environments:", error);
    throw error;
  }
};

export const getEnvironmentById = async (id: number) => {
  try {
    const environment = await db.query.EnvironmentTable.findFirst({
      where: { id },
    });
    return environment;
  } catch (error) {
    console.error(`Error fetching environment with id ${id}:`, error);
    throw error;
  }
};

export const createEnvironment = async (imageUrl: string, repoUrl: string) => {
  try {
    const newEnvironment = await db
      .insert(EnvironmentTable)
      .values({
        imageName: imageUrl,
        repoUrl: repoUrl,
      })
      .returning({
        id: EnvironmentTable.id,
        imageName: EnvironmentTable.imageName,
        repoUrl: EnvironmentTable.repoUrl,
      });
    return newEnvironment;
  } catch (error) {
    console.error("Error creating environment:", error);
    throw error;
  }
};

export const updateEnvironment = async (
  id: number,
  imageUrl: string,
  repoUrl: string,
) => {
  try {
    const updatedEnvironment = await db
      .update(EnvironmentTable)
      .set({
        imageName: imageUrl,
        repoUrl: repoUrl,
      })
      .where(eq(EnvironmentTable.id, id))
      .returning({
        id: EnvironmentTable.id,
        imageName: EnvironmentTable.imageName,
        repoUrl: EnvironmentTable.repoUrl,
      });
    return updatedEnvironment;
  } catch (error) {
    console.error(`Error updating environment with id ${id}:`, error);
    throw error;
  }
};

export const deleteEnvironment = async (id: number) => {
  try {
    const deletedEnvironment = await db
      .delete(EnvironmentTable)
      .where(eq(EnvironmentTable.id, id))
      .returning({
        id: EnvironmentTable.id,
        imageName: EnvironmentTable.imageName,
        repoUrl: EnvironmentTable.repoUrl,
      });
    return deletedEnvironment;
  } catch (error) {
    console.error(`Error deleting environment with id ${id}:`, error);
    throw error;
  }
};

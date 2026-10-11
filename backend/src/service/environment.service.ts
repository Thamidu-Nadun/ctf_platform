import { NotFoundError } from "../libs/errors";
import * as environmentRepo from "../repo/environment.repo";

export const getAllEnvironments = async () => {
  try {
    const environments = await environmentRepo.getAllEnvironments();
    return environments;
  } catch (error) {
    console.error("Error fetching environments:", error);
    throw error;
  }
};

export const getEnvironmentById = async (id: number) => {
  try {
    const environment = await environmentRepo.getEnvironmentById(id);
    if (!environment) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    return environment;
  } catch (error) {
    console.error(`Error fetching environment with ID ${id}:`, error);
    throw error;
  }
};

export const createEnvironment = async (imageUrl: string, repoUrl: string) => {
  try {
    const environment = await environmentRepo.createEnvironment(
      imageUrl,
      repoUrl,
    );
    return environment;
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
    const environment = await environmentRepo.updateEnvironment(
      id,
      imageUrl,
      repoUrl,
    );
    if (!environment) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    return environment;
  } catch (error) {
    console.error(`Error updating environment with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEnvironment = async (id: number) => {
  try {
    const environment = await environmentRepo.deleteEnvironment(id);
    if (!environment) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    return environment;
  } catch (error) {
    console.error(`Error deleting environment with ID ${id}:`, error);
    throw error;
  }
};

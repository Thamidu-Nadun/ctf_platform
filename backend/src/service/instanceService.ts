import type { InstanceInfo } from "../types/instance";
import { createInstance as createContainerInstance } from "../libs/instanceManager";
import { ConflictError, NotFoundError } from "../libs/errors";
import * as instanceRepo from "../repo/instance.repo";
import type { InstanceReq } from "../models/instance.model";

const challenges: string[] = ["the_endpoint", "ping_me"];
const instances: InstanceInfo[] = [];

const getInstances = async () => {
  try {
    const instances = await instanceRepo.getAllInstances();
    return instances;
  } catch (error) {
    console.error("Error fetching instances:", error);
    throw error;
  }
};

const getInstanceById = async (id: string) => {
  try {
    const instance = await instanceRepo.getInstanceById(id);
    if (!instance) {
      throw new NotFoundError(`Instance with ID ${id} not found`);
    }
    return instance;
  } catch (error) {
    console.error(`Error fetching instance with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new instance with the given challenge name.
 * @param challengeName : string - The name of the challenge to create an instance for. It's also the image name of the container.
 * @returns InstanceInfo
 * @deprecated use createInstance v2 instead
 */
const createInstance = async (challengeName: string): Promise<InstanceInfo> => {
  // Check whether the challenge name is valid
  if (!challenges.includes(challengeName)) {
    throw new Error(`Invalid challenge name: ${challengeName}`);
  }
  // Create a new container for the challenge
  const container = await createContainerInstance({
    imageName: challengeName,
  });
  // save the instance to the database
  const instance: InstanceInfo = {
    id: container.id,
    containerInfo: container,
  };
  console.log(`Container ${container.name} created successfully`);
  instances.push(instance);
  return {
    id: container.id,
    containerInfo: container,
  };
};

/**
 * This function creates a new instance for a specific user and challenge.
 * This is the version 2 of the createInstance function.
 * This function name will be createChallengeInstance or createInstance in the future.
 * @param instanceData : InstanceReq - The data required to create a new instance.
 * @returns createdInstance
 */
const createInstanceV2 = async (instanceData: InstanceReq) => {
  try {
    // Check if an instance already exists for the user and challenge
    const existingInstance =
      await instanceRepo.getInstancesByUserAndChallengeId(
        instanceData.userId,
        instanceData.challengeId,
      );
    if (existingInstance) {
      throw new ConflictError(
        `Instance for user ${instanceData.userId} and challenge ${instanceData.challengeId} already exists`,
      );
    }
    // Create a new instance in the database
    const time = new Date();
    const expiresAt = new Date(time.getTime() + 60 * 60 * 1000); // 1 hour from now
    const instance = await instanceRepo.createInstance(
      instanceData.environmentId,
      instanceData.challengeId,
      instanceData.userId,
      instanceData.status,
      time,
      expiresAt,
    );
    return instance;
  } catch (error) {
    console.error("Error creating instance:", error);
    throw error;
  }
};

const deleteInstance = async (id: string) => {
  try {
    const existingInstance = await instanceRepo.getInstanceById(id);
    if (!existingInstance) {
      throw new NotFoundError(`Instance with ID ${id} not found`);
    }

    const instance = await instanceRepo.deleteInstance(id);
    return instance;
  } catch (error) {
    console.error(`Error deleting instance with ID ${id}:`, error);
    throw error;
  }
};

export { getInstances, getInstanceById, createInstance, deleteInstance };

import type { InstanceInfo } from "../types/instance";
import { createInstance as createContainerInstance } from "../libs/instanceManager";

const challenges: string[] = ["the_endpoint", "ping_me"];
const instances: InstanceInfo[] = [];

const getInstances = (): InstanceInfo[] => {
  // TODO: return instances from database
  return instances;
};

const getInstanceById = (id: string): InstanceInfo | undefined => {
  // TODO: return instance from database
  return instances.find((instance) => instance.id === id);
};

/**
 * Creates a new instance with the given challenge name.
 * @param challengeName : string - The name of the challenge to create an instance for. It's also the image name of the container.
 * @returns InstanceInfo
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

const deleteInstance = (id: string): any => {
  // TODO: delete instance from database
};

export { getInstances, getInstanceById, createInstance, deleteInstance };

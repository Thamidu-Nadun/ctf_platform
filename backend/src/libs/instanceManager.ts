import { getDocker } from "../config/config";

type Container = {
  id: string;
  name: string;
  image: string;
  ports: string[];
  networks: string[];
  timeout: number;
};

// create a new container with the given name and image
type CreateContainerOptions = {
  imageName: string;
  timeout?: number;
};

const docker = getDocker();

/**
 * Creates a new container with the given image name and timeout.
 * @param opt : {imageName, timeout}
 * @returns Container
 */
const createInstance = async (
  opt: CreateContainerOptions,
): Promise<Container> => {
  const { imageName, timeout = 30000 } = opt;

  try {
    // 1. check if the image exists
    const isImageExists = await checkImageExists(imageName);
    console.log(`check whether ${imageName} is exist`);
    // 1.1 if it is not, pull the image
    if (!isImageExists) {
      console.log(`image ${imageName} is not exist, pull it`);
      await pullImage(imageName);
    }
  } catch (err) {
    throw new Error(`Failed to pull image: ${err}`);
  }
  try {
    // 2. if it is, create the container
    console.log(`create container with image ${imageName}`);
    const container = await createContainer(imageName);
    // return the container id
    return container;
  } catch (err) {
    throw new Error(`Failed to create container: ${err}`);
  }
};

/**
 * Creates a new container with the given image name and timeout.
 * @param imageName : string
 * @param timeout : number
 * @returns Container
 */
const createContainer = async (
  imageName: string,
  timeout: number = 30000,
): Promise<Container> => {
  try {
    const instanceName = `instance-${Date.now()}`;
    const container = await docker.createContainer({
      Image: imageName,
      name: instanceName,
      HostConfig: {
        NetworkMode: "ctf_network",
      },
    });
    return {
      id: container.id,
      name: instanceName,
      image: imageName,
      ports: [],
      networks: ["ctf_network"],
      timeout,
    };
  } catch (err) {
    throw new Error(`Failed to create container: ${err}`);
  }
};

/**
 * Checks if the given image exists in the local Docker registry.
 * @param imageName : string
 * @returns boolean
 */
const checkImageExists = async (imageName: string): Promise<boolean> => {
  try {
    await docker.getImage(imageName).inspect();
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Pulls the given image from the Docker registry.
 * @param imageName : string
 * @returns void
 */
const pullImage = async (imageName: string): Promise<void> => {
  const stream = await docker.pull(imageName);
  return new Promise((res, rej) => {
    docker.modem.followProgress(
      stream,
      (err: any, output: any) => {
        if (err) rej(err);
        else res(output);
      },
      (event: any) => {
        if (event.status) {
          console.log(event.status, event.progress || "");
        }
      },
    );
  });
};

export { createInstance };

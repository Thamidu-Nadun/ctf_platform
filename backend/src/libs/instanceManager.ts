import { getDocker } from "../config/config";
import type { DockerProgressEvent } from "../types/container";

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
  name: string;
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
  const { imageName, name, timeout = 30000 } = opt;
  console.log(`create instance with image ${imageName} and timeout ${timeout}`);
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
    throw new Error(`Failed to pull image: ${err}`, { cause: err });
  }
  try {
    // 2. if it is, create the container
    console.log(`create container with image ${imageName}`);
    const container = await createContainer(imageName, name, timeout);
    await docker.getContainer(container.id).start();
    // return the container id
    return container;
  } catch (err) {
    throw new Error(`Failed to create container: ${err}`, { cause: err });
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
  name: string,
  timeout: number = 30000,
): Promise<Container> => {
  try {
    const container = await docker.createContainer({
      Image: imageName,
      name: name,
      ExposedPorts: {
        "5000/tcp": {},
      },
      HostConfig: {
        NetworkMode: "ctf_network",
        PortBindings: {
          "5000/tcp": [{ HostPort: "" }],
        },
      },
    });
    return {
      id: container.id,
      name: name,
      image: imageName,
      ports: [],
      networks: ["ctf_network"],
      timeout,
    };
  } catch (err) {
    throw new Error(`Failed to create container: ${err}`, { cause: err });
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
    console.error(`Image ${imageName} does not exist: ${err}`);
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
      (err) => {
        if (err) rej(err);
        else res();
      },
      (event: DockerProgressEvent) => {
        if (event.status) {
          console.log(event.status, event.progress || "");
        }
      },
    );
  });
};

const getContainerTarget = async (name: string): Promise<string> => {
  const container = docker.getContainer(name);
  const inspection = await container.inspect();
  const port = inspection.NetworkSettings.Ports["5000/tcp"]?.[0]?.HostPort;
  if (!port) {
    throw new Error(`Container ${name} has no published port for 5000/tcp`);
  }
  return `http://127.0.0.1:${port}`;
};

export { createInstance, getContainerTarget };

type Container = {
  id: string;
  name: string;
  image: string;
  ports: string[];
  networks: string[];
  timeout: number;
};

type CreateContainerOptions = {
  imageName: string;
  timeout?: number;
};

type DockerProgressEvent = {
  status?: string;
  progress?: string;
};

export type { Container, CreateContainerOptions, DockerProgressEvent };

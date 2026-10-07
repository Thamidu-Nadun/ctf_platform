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

export type { Container, CreateContainerOptions };

import Docker from "dockerode";

const SOCKET_PATH = "/var/run/docker.sock";

export const getDocker = () => {
  const docker = new Docker();
  return docker;
};

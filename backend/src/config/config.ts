import Docker from "dockerode";
import s3 from "@aws-sdk/client-s3";
import "dotenv/config";

const SOCKET_PATH = "/var/run/docker.sock";

export const getDocker = () => {
  let docker: Docker;
  if (process.platform === "linux") {
    docker = new Docker({
      socketPath: SOCKET_PATH,
    });
  } else {
    docker = new Docker();
  }
  return docker;
};

export const getS3Client = () => {
  return new s3.S3Client({
    region: process.env.AWS_DEFAULT_REGION || "us-east-1",
    endpoint: process.env.AWS_ENDPOINT_URL || "http://localhost.floci.io:4566",
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
    },
  });
};

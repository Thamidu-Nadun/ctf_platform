import type { NextConfig } from "next";
const backendUrl = (process.env.API_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      { source: "/api/backend/:path*", destination: `${backendUrl}/:path*` },
      { source: "/api/:path*", destination: `${backendUrl}/:path*` },
    ];
  },
};
export default nextConfig;

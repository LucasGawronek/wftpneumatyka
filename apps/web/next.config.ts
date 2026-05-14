import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const strapiHostname = (() => {
  try {
    return new URL(strapiUrl).hostname;
  } catch {
    return "127.0.0.1";
  }
})();

const isLocalStrapiHost =
  strapiHostname === "127.0.0.1" || strapiHostname === "localhost" || strapiHostname === "::1";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production" && isLocalStrapiHost,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;

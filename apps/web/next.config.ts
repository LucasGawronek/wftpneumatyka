import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const parsedStrapiUrl = (() => {
  try {
    return new URL(strapiUrl);
  } catch {
    return null;
  }
})();
const strapiHostname = parsedStrapiUrl?.hostname || "127.0.0.1";

const isLocalStrapiHost =
  strapiHostname === "127.0.0.1" || strapiHostname === "localhost" || strapiHostname === "::1";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
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
];

if (parsedStrapiUrl && (parsedStrapiUrl.protocol === "http:" || parsedStrapiUrl.protocol === "https:")) {
  remotePatterns.push({
    protocol: parsedStrapiUrl.protocol.slice(0, -1) as "http" | "https",
    hostname: parsedStrapiUrl.hostname,
    port: parsedStrapiUrl.port || undefined,
  });
}

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production" && isLocalStrapiHost,
    remotePatterns,
  },
};

export default nextConfig;

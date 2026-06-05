import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project so Next.js doesn't pick up an
  // unrelated lockfile in a parent directory (silences the build warning).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;

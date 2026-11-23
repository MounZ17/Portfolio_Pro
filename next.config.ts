import type { NextConfig } from "next";

// Fully static export. Set BASE_PATH="/repo-name" when deploying to a GitHub Pages project URL.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

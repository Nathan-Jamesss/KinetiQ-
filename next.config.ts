import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/KinetiQ-',
  assetPrefix: '/KinetiQ-',
};

export default nextConfig;

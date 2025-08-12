import type {NextConfig} from "next";

import {createMDX} from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(config);

/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
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
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/avatar",
        permanent: true,
      },
      {
        source: "/components",
        destination: "/docs/components/avatar",
        permanent: true,
      },
      {
        source: "/handbook",
        destination: "/docs/handbook/styling",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(config);

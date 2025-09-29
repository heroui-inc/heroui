import type {NextConfig} from "next";

import {createMDX} from "fumadocs-mdx/next";

// TODO: remove it for next typegen
// validate environment variables
// import "./env";

const withMDX = createMDX();

const config: NextConfig = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "img.heroui.chat",
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
        destination: "/docs/introduction",
        permanent: true,
        source: "/docs",
      },
      {
        destination: "/docs/components/accordion",
        permanent: true,
        source: "/docs/components",
      },
      {
        destination: "/docs/components/accordion",
        permanent: true,
        source: "/components",
      },
      {
        destination: "/docs/handbook/styling",
        permanent: true,
        source: "/handbook",
      },
    ];
  },
  async rewrites() {
    return [
      {
        destination: "/llms.mdx/:path*",
        source: "/docs/:path*.mdx",
      },
    ];
  },
  trailingSlash: false,
  transpilePackages: ["@heroui/react", "@heroui/styles"],
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(config);

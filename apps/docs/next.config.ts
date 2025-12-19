import type {NextConfig} from "next";

import {createMDX} from "fumadocs-mdx/next";

// TODO: remove it for next typegen
// validate environment variables
// import "./env";

const withMDX = createMDX();

const config: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
        source: "/:path*",
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
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
      {
        hostname: "avatars.githubusercontent.com",
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
  reactCompiler: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: "/docs/introduction",
        permanent: true,
        source: "/docs",
      },
      {
        destination: "/docs/components-list",
        permanent: true,
        source: "/docs/components",
      },
      {
        destination: "/docs/components-list",
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

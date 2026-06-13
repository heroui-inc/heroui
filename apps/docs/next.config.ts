import type {NextConfig} from "next";

import {createMDX} from "fumadocs-mdx/next";

import {getRedirects} from "./next-redirects";

// TODO: remove it for next typegen
// validate environment variables
// import "./env";

const withMDX = createMDX();

const config: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: [
      "@heroui/react",
      "@gravity-ui/icons",
      "@iconify/react",
      "lucide-react",
      "motion",
      "fumadocs-ui",
      "fumadocs-core",
      "react-aria-components",
    ],
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
      {
        // Apple requires the AASA file to be served with `application/json`
        // exactly — any other content type (the default `application/octet-stream`
        // for extensionless files, or `text/plain`) causes silent rejection by
        // iOS, which then refuses to handle Universal Links for the domain.
        // The short cache window lets us roll out AASA changes without waiting
        // hours for stale CDN/iOS caches to expire.
        headers: [
          {key: "Content-Type", value: "application/json"},
          {key: "Cache-Control", value: "public, max-age=3600, must-revalidate"},
        ],
        source: "/.well-known/apple-app-site-association",
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
    return getRedirects();
  },
  async rewrites() {
    return [
      {
        destination: "/llms.mdx/:lang/:path*",
        source: "/:lang(en|cn)/docs/:path*.mdx",
      },
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

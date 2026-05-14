import type {MetadataRoute} from "next";

import {siteConfig} from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "/icons/web-app-manifest-192x192.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icons/web-app-manifest-512x512.png",
        type: "image/png",
      },
    ],
    name: "HeroUI",
    short_name: "HeroUI",
    start_url: "/",
    theme_color: "#000000",
  };
}

import baseConfig from "@heroui/standard/eslint/base.mjs";
import {defineConfig} from "eslint/config";

const config = defineConfig([
  {
    ignores: [
      "**/.temp",
      "**/.next",
      "**/.swc",
      "**/.turbo",
      "**/.cache",
      "**/.build",
      "**/.vercel",
      "**/.changeset",
      "**/.DS_Store",
      "**/dist",
      "**/build",
      "**/public/*",
      "**/node_modules/",
      "**/coverage",
      "**/__snapshots__",
      "**/.contentlayer/",
      "pnpm-lock.yaml",
      "!public/manifest.json",
      "!.vscode",
      "!scripts",
      "!.*.js",
      "!.*.cjs",
      "!.*.mjs",
      "!.*.ts",
      "!contentlayer.config.ts",
      "!next-sitemap.config.ts",
    ],
  },
  ...baseConfig,
]);

export default config;

import baseConfig from "@heroui/standard/eslint/base.mjs";
import {defineConfig} from "eslint/config";

const config = defineConfig([
  {
    ignores: [
      // Build outputs
      "**/.temp",
      "**/.next",
      "**/.swc",
      "**/.turbo",
      "**/.cache",
      "**/.build",
      "**/.vercel",
      "**/dist",
      "**/build",
      "**/storybook-static",
      ".rollup.cache",
      ".rollup.cache/**",
      // Dependencies
      "**/node_modules/",
      "**/public/*",
      // Generated files
      "pnpm-lock.yaml",
      "**/.contentlayer/",
      "**/.source/**",
      // Test coverage
      "**/coverage",
      "**/__snapshots__",
      // OS files
      "**/.DS_Store",
      "**/.changeset",
      // Exceptions - files we want to lint
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

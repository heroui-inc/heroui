import {defineConfig} from "vitest/config";

export default defineConfig({
  root: "packages/react",
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});

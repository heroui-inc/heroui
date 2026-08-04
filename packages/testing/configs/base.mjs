import {defineConfig} from "vitest/config";

/** Shared Vitest defaults; coverage opt-in via `test:coverage`. */
export const baseConfig = defineConfig({
  test: {
    coverage: {
      enabled: false,
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
    passWithNoTests: true,
  },
});

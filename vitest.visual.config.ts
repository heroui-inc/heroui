import {defineConfig} from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["./scripts/visual-test-setup.ts"],
    include: ["__visual_tests__/visual.test.ts"],
    maxConcurrency: 10,
    pool: "forks",
    setupFiles: ["./scripts/visual-test-matcher-setup.ts"],
    testTimeout: 600_000, // 10 minutes
  },
});

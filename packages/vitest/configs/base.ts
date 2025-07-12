import {defineConfig} from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: [
        [
          "json",
          {
            file: `../coverage.json`,
          },
        ],
      ],
    },
  },
});

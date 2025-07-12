import {defineProject, mergeConfig} from "vitest/config";

import {baseConfig} from "./base";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: "jsdom",
      globals: true,
    },
  }),
);

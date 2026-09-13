import baseReactConfig from "@heroui/standard/eslint/react.mjs";
import {defineConfig} from "eslint/config";

const config = defineConfig([
  ...baseReactConfig,
  {
    // Storybook `render:` functions are lowercase callbacks that the plugin cannot
    // recognise as components, so every hook call inside a story trips the rule.
    // Scoped here rather than package-wide so real conditional-hook bugs in
    // src/ and tests/ are still caught.
    files: ["**/*.stories.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
]);

export default config;

import conventional from "@commitlint/config-conventional";

/**
 * Commitlint config
 */
const commitLintConfig = {
  extends: ["@commitlint/config-conventional"],
  helpUrl: "https://github.com/heroui-inc/heroui/blob/main/CONTRIBUTING.md#commit-convention",
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    ...conventional.rules,
    "function-rules/header-max-length": [0],
    "type-enum": [
      2,
      "always",
      ["feat", "feature", "fix", "refactor", "docs", "build", "test", "ci", "chore"],
    ],
  },
};

export default commitLintConfig;

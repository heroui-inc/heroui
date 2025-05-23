module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 35000,
  collectCoverageFrom: ["packages/**/*.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  modulePathIgnorePatterns: ["<rootDir>/examples", "<rootDir>/tooling/cra-template*"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./scripts/setup-test.ts"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  testTimeout: 15000,
};

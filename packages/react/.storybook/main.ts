import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
  // TODO: Add welcome.mdx
  stories: ["../../react/src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
  core: {
    disableTelemetry: true,
  },
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    // See https://storybook.js.org/docs/api/main-config/main-config-typescript for more information about this option.
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;

import type {StorybookConfig} from "@storybook/react-vite";

import {dirname, join} from "path";

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    join(__dirname, "addons/i18n/register"),
    join(__dirname, "addons/strict-mode/register"),
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: [join(__dirname, "../public")],
  stories: [join(__dirname, "../../react/src/**/*.stories.@(ts|tsx)")],
};

export default config;

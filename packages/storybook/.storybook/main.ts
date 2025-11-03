import type {StorybookConfig} from "@storybook/react-vite";

import {sync as globSync} from "glob";
import {dirname, join as pathJoin} from "path";
import {readFileSync as fsReadFileSync} from "fs";

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(pathJoin(value, "package.json")));
};

const __STORYBOOK_READY_ONLY__ = process.env.STORYBOOK_READY_ONLY === 'true';

export const getStories = () => {
  if (!__STORYBOOK_READY_ONLY__)
    return [pathJoin(__dirname, "../../react/src/**/*.stories.@(ts|tsx)")];

  const readyStories = globSync(
    pathJoin(__dirname, "../../react/src/**/*.stories.@(ts|tsx)"),
  ).filter((file) => {
    const content = fsReadFileSync(file, "utf-8");

    return /title:\s*["']Components/.test(content);
  });

  return readyStories;
};

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("storybook-dark-mode"),
    pathJoin(__dirname, "addons/strict-mode/register"),
    pathJoin(__dirname, "addons/i18n/register"),
    pathJoin(__dirname, "addons/reduce-motion/register"),
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: [pathJoin(__dirname, "../public")],
  stories: ["./welcome.mdx", "./colors.stories.tsx", ...getStories()],
};

export default config;

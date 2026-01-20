import type {Preview} from "@storybook/react";

import {withInternationalization} from "./addons/i18n/decorator";
import {i18nGlobalType} from "./addons/i18n/preview";
import {withReactScan} from "./addons/react-scan/decorator";
import {reactScanGlobalType} from "./addons/react-scan/preview";
import {withReduceMotion} from "./addons/reduce-motion/decorator";
import {reduceMotionGlobalType} from "./addons/reduce-motion/preview";
import {withReactStrictMode} from "./addons/strict-mode/decorator";
import {strictModeGlobalType} from "./addons/strict-mode/preview";
import {withTheme} from "./addons/theme/decorator";
import {themeGlobalType} from "./addons/theme/preview";
import {DocsContainer} from "./components/docs-container";

import "./globals.css";

const parameters: Preview["parameters"] = {
  layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Welcome", "Color System", "Components Demo", "Colors Demo"],
    },
  },
  docs: {
    container: DocsContainer,
  },
};

const decorators: Preview["decorators"] = [
  withReactStrictMode,
  withTheme,
  withInternationalization,
  withReduceMotion,
  withReactScan,
];

const globalTypes = {
  ...i18nGlobalType,
  ...themeGlobalType,
  ...reduceMotionGlobalType,
  ...strictModeGlobalType,
  ...reactScanGlobalType,
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  tags: ["autodocs"],
};

export default preview;

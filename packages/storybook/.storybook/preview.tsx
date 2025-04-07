import type {Preview} from "@storybook/react";

import {configureActions} from "@storybook/addon-actions";
import React from "react";

import {withInternationalization} from "./addons/i18n/decorator";
import {withReactScan} from "./addons/react-scan/decorator";
import {withReactStrictMode} from "./addons/strict-mode/decorator";

import "../styles/globals.css";

configureActions({
  depth: 200,
});

const parameters: Preview["parameters"] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
};

const decorators: Preview["decorators"] = [
  withReactScan,
  withReactStrictMode,
  withInternationalization,
  (Story) => {
    return (
      <div
        className="bg-background text-foreground flex h-full w-full items-center justify-center"
        id="root"
      >
        <Story />
      </div>
    );
  },
];

const preview: Preview = {
  decorators,
  parameters,
  tags: ["autodocs"],
};

export default preview;

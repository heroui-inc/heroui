import type {Preview} from "@storybook/react";

import {addons} from "@storybook/preview-api";
import {configureActions} from "@storybook/addon-actions";
import {themes as theming} from "@storybook/theming";
import {DocsContainer} from '@storybook/blocks';
import React, { useEffect, useState } from "react";
import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode';

import {withInternationalization} from "./addons/i18n/decorator";
import {withReactScan} from "./addons/react-scan/decorator";
import {withReactStrictMode} from "./addons/strict-mode/decorator";
import {withReduceMotion} from "./addons/reduce-motion/decorator";

import "../styles/globals.css";

configureActions({
  depth: 200,
});

const channel = addons.getChannel()

const themes = {
  dark: {
    ...theming.dark,
    appBg: "#1B1B1B",
    appContentBg: "#1B1B1B",
    background: "#1B1B1B",
    barBg: "#1B1B1B",
    brandTitle: `<img src="/logo-light.svg" style="width: 120px; height: auto;"/>`,
  },
  light: {
    ...theming.light,
    appBg: "#FFFFFF",
    appContentBg: "#f4f4f4",
    background: "#f4f4f4",
    barBg: "#f4f4f4",
    brandTitle: `<img src="/logo-dark.svg" style="width: 120px; height: auto;"/>`,
  },
};

const ThemeContainer = (props) => {
  const [curTheme, setCurTheme] = useState<string>()

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, (value) => {
      setCurTheme(value ? 'dark' : 'light')
    })
  }, [])

  return (
    <DocsContainer
      theme={curTheme === 'dark' ? themes.dark : themes.light}
      context={props.context}
    >
      {props.children}
    </DocsContainer>
  );
};

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
      order: ["Welcome", "Color System", "Components"],
    },
  },
  darkMode: {
    classTarget: "html",
    current: "light",
    darkClass: "dark",
    lightClass: "light",
    stylePreview: true,
    dark: themes.dark,
    light: themes.light,
  },
  docs: {
    container: ThemeContainer
  }
};

const decorators: Preview["decorators"] = [
  withReactScan,
  withReactStrictMode,
  withInternationalization,
  withReduceMotion,
];

const preview: Preview = {
  decorators,
  parameters,
  tags: ["autodocs"],
};

export default preview;

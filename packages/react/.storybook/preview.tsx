import React from "react";
import {themes} from "@storybook/theming";
import type {Preview} from "@storybook/react";
import {withThemeByClassName} from "@storybook/addon-themes";

import "./style.css";

const decorators: Preview["decorators"] = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (Story, {globals: {locale, disableAnimation, labelPlacement}}) => {
    const direction =
      // @ts-ignore
      locale && new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "rtl" : undefined;

    return (
      <div lang={locale} className="h-screen max-h-[calc(100dvh-28px))] rounded w-full flex flex-col justify-center items-center bg-background text-foreground" dir={direction}>
        <Story />
      </div>
    );
  },
];

const commonTheme = {
  brandTitle: "HeroUI",
  brandUrl: "https://heroui.com",
  brandTarget: "_self",
};

const parameters: Preview["parameters"] = {
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      ...commonTheme,
      appBg: "#161616",
      barBg: "black",
      background: "black",
      appContentBg: "black",
      appBorderRadius: 14,
      brandImage: "/dark-logo.svg",
    },
    light: {
      ...themes.light,
      ...commonTheme,
      appBorderRadius: 14,
      brandImage: "/light-logo.svg",
    },
  },
};

const locales = [
  "ar-AE",
  "bg-BG",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-US",
  "es-ES",
  "et-EE",
  "fi-FI",
  "fr-FR",
  "he-IL",
  "hr-HR",
  "hu-HU",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "lt-LT",
  "lv-LV",
  "nb-NO",
  "nl-NL",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sk-SK",
  "sl-SI",
  "sr-SP",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "zh-CN",
  "zh-TW",
];

const globalTypes: Preview["globalTypes"] = {
  locale: {
    toolbar: {
      icon: "globe",
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, {type: "language"}).of(locale),
        // @ts-ignore
        right: new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "Right to Left" : undefined,
      })),
    },
  },
  disableAnimation: {
    name: "Disable Animation",
    description: "Disable all animations in the stories",
    toolbar: {
      icon: "photodrag",
      items: [
        {value: true, title: "True"},
        {value: false, title: "False"},
      ],
    },
  },
  labelPlacement: {
    name: "Label Placement",
    description: "Position of label.",
    toolbar: {
      icon: "component",
      items: [
        {value: "inside", title: "Inside"},
        {value: "outside", title: "Outside"},
        {value: "outside-left", title: "Outside Left"},
      ],
    },
  }
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  tags: ["autodocs"],
};

export default preview;

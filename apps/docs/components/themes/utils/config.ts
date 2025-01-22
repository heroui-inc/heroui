import {HeroUIPluginConfig} from "@heroui/theme";
import {readableColor} from "color2k";

import {Config, ThemeType} from "../types";

import {generateThemeColor} from "./colors";
function generateLayoutConfig(config: Config): HeroUIPluginConfig["layout"] {
  return {
    fontSize: {
      tiny: `${config.layout.fontSize.tiny}rem`,
      small: `${config.layout.fontSize.small}rem`,
      medium: `${config.layout.fontSize.medium}rem`,
      large: `${config.layout.fontSize.large}rem`,
    },
    lineHeight: {
      tiny: `${config.layout.lineHeight.tiny}rem`,
      small: `${config.layout.lineHeight.small}rem`,
      medium: `${config.layout.lineHeight.medium}rem`,
      large: `${config.layout.lineHeight.large}rem`,
    },
    radius: {
      small: `${config.layout.radius.small}rem`,
      medium: `${config.layout.radius.medium}rem`,
      large: `${config.layout.radius.large}rem`,
    },
    borderWidth: {
      small: `${config.layout.borderWidth.small}px`,
      medium: `${config.layout.borderWidth.medium}px`,
      large: `${config.layout.borderWidth.large}px`,
    },
    disabledOpacity: config.layout.otherParams.disabledOpacity,
    dividerWeight: config.layout.otherParams.dividerWeight,
    hoverOpacity: config.layout.otherParams.hoverOpacity,
  };
}

function generateThemeColorsConfig(config: Config, theme: ThemeType) {
  return {
    default: generateThemeColor(config[theme].defaultColor.default, "default", "light"),
    primary: generateThemeColor(config[theme].baseColor.primary, "primary", "light"),
    secondary: generateThemeColor(config[theme].baseColor.secondary, "secondary", "light"),
    success: generateThemeColor(config[theme].baseColor.success, "success", "light"),
    warning: generateThemeColor(config[theme].baseColor.warning, "warning", "light"),
    danger: generateThemeColor(config[theme].baseColor.danger, "danger", "light"),
    background: config[theme].layoutColor.background,
    foreground: generateThemeColor(config[theme].layoutColor.foreground, "foreground", "light"),
    content1: {
      DEFAULT: config[theme].contentColor.content1,
      foreground: readableColor(config[theme].contentColor.content1),
    },
    content2: {
      DEFAULT: config[theme].contentColor.content2,
      foreground: readableColor(config[theme].contentColor.content2),
    },
    content3: {
      DEFAULT: config[theme].contentColor.content3,
      foreground: readableColor(config[theme].contentColor.content3),
    },
    content4: {
      DEFAULT: config[theme].contentColor.content4,
      foreground: readableColor(config[theme].contentColor.content4),
    },
    focus: config[theme].layoutColor.focus,
    overlay: config[theme].layoutColor.overlay,
  };
}

/**
 * Generate plugin configuration
 */
export function generatePluginConfig(config: Config): HeroUIPluginConfig {
  return {
    themes: {
      light: {
        colors: generateThemeColorsConfig(config, "light"),
      },
      dark: {
        colors: generateThemeColorsConfig(config, "dark"),
      },
    },
    layout: generateLayoutConfig(config),
  };
}

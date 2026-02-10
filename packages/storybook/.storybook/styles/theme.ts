import {create, themes as storybookThemes} from "storybook/theming";

// HeroUI Colors (OKLCH -> Hex approximation)
const colors = {
  white: "#FFFFFF",
  black: "#000000",
  zinc: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
    950: "#09090B",
  },
  light: {
    background: "#f5f5f5",
    foreground: "#18181b",
    border: "#E4E4E7",
  },
  dark: {
    background: "#060607",
    foreground: "#fcfcfc",
    border: "#27272A",
  },
  accent: {
    DEFAULT: "#006FEE",
    foreground: "#FFFFFF",
  },
};

const fontBase = [
  "ui-sans-serif",
  "system-ui",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
].join(",");

const fontCode = [
  "ui-monospace",
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  '"Liberation Mono"',
  '"Courier New"',
  "monospace",
].join(",");

const lightTheme = create({
  ...storybookThemes.light,
  base: "light",
  brandTitle: `<img src="/logo-dark.svg" style="width: 120px; height: auto;" alt="HeroUI"/>`,
  // brandUrl: "https://heroui.com",
  brandTarget: "_self",
  // Colors
  colorPrimary: colors.accent.DEFAULT,
  colorSecondary: colors.accent.DEFAULT,
  // UI
  appBg: colors.light.background,
  appContentBg: colors.light.background,
  appPreviewBg: colors.light.background,
  appBorderColor: colors.light.border,
  appBorderRadius: 12,
  // Typography
  fontBase,
  fontCode,
  // Text
  textColor: colors.light.foreground,
  textInverseColor: colors.accent.foreground,
  textMutedColor: colors.zinc[500],
  // Toolbar
  barBg: colors.light.background,
  barTextColor: colors.zinc[500],
  barSelectedColor: colors.accent.DEFAULT,
  barHoverColor: colors.light.foreground,
  // Form colors
  inputBg: colors.white,
  inputBorder: colors.light.border,
  inputTextColor: colors.light.foreground,
  inputBorderRadius: 8,
});

const darkTheme = create({
  ...storybookThemes.dark,
  base: "dark",
  brandTitle: `<img src="/logo-light.svg" style="width: 120px; height: auto;" alt="HeroUI"/>`,
  // brandUrl: "https://heroui.com",
  brandTarget: "_self",
  // Colors
  colorPrimary: colors.accent.DEFAULT,
  colorSecondary: colors.accent.DEFAULT,
  // UI
  appBg: colors.dark.background,
  appContentBg: colors.dark.background,
  appPreviewBg: colors.dark.background,
  appBorderColor: colors.dark.border,
  appBorderRadius: 12,
  // Typography
  fontBase,
  fontCode,
  // Text
  textColor: colors.dark.foreground,
  textInverseColor: colors.accent.foreground,
  textMutedColor: colors.zinc[400],
  // Toolbar
  barBg: colors.dark.background,
  barTextColor: colors.zinc[400],
  barSelectedColor: colors.accent.DEFAULT,
  barHoverColor: colors.dark.foreground,
  // Form colors
  inputBg: colors.zinc[800],
  inputBorder: colors.dark.border,
  inputTextColor: colors.dark.foreground,
  inputBorderRadius: 8,
});

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

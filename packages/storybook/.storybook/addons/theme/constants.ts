import type {Theme} from "@heroui/react";

export const THEME_ADDON_ID = "heroui-theme-addon";
export const THEME_GLOBAL_TYPE_ID = "heroui-theme";
export const THEME_PARAM_KEY = "heroui-theme";

export interface ThemeOption {
  value: Theme | "system";
  title: string;
  description?: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "system",
    title: "System",
    description: "Use system color scheme preference",
  },
  {
    value: "light",
    title: "Light",
    description: "Light theme",
  },
  {
    value: "dark",
    title: "Dark",
    description: "Dark theme",
  },
  {
    value: "light-glass",
    title: "Light Glass",
    description: "Light theme with glassmorphism",
  },
  {
    value: "dark-glass",
    title: "Dark Glass",
    description: "Dark theme with glassmorphism",
  },
];

export const DEFAULT_THEME: Theme | "system" = "system";

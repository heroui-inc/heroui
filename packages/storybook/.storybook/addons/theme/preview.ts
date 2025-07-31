import {DEFAULT_THEME, THEME_GLOBAL_TYPE_ID, THEME_OPTIONS} from "./constants";

export const themeGlobalType = {
  [THEME_GLOBAL_TYPE_ID]: {
    name: "Theme",
    description: "HeroUI theme for components",
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: "paintbrush",
      items: THEME_OPTIONS.map((option) => ({
        value: option.value,
        title: option.title,
        left: option.value === "system" ? "🖥️" : undefined,
      })),
      showName: true,
      dynamicTitle: true,
    },
  },
};

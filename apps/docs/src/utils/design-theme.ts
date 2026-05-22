import type {ThemeId} from "@/app/themes/constants";

import {themeIds} from "@/app/themes/constants";

export const DEFAULT_DESIGN_THEME: ThemeId = "default";
export const DESIGN_THEME_STORAGE_KEY = "heroui-docs-design-theme";
export const DESIGN_THEME_CHANGE_EVENT = "heroui-docs-design-theme-change";

export function isDesignThemeId(value: string | null | undefined): value is ThemeId {
  return themeIds.includes(value as ThemeId);
}

export function getStoredDesignTheme(): ThemeId {
  if (typeof window === "undefined") {
    return DEFAULT_DESIGN_THEME;
  }

  const stored = window.localStorage.getItem(DESIGN_THEME_STORAGE_KEY);

  return isDesignThemeId(stored) ? stored : DEFAULT_DESIGN_THEME;
}

export function notifyDesignThemeChange(themeId: ThemeId) {
  window.dispatchEvent(
    new CustomEvent(DESIGN_THEME_CHANGE_EVENT, {
      detail: {themeId},
    }),
  );
}

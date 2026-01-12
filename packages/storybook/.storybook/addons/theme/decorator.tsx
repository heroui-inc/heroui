import type {Decorator} from "@storybook/react";

import React, {useEffect} from "react";
import {addons, useGlobals} from "storybook/preview-api";

import {THEME_ADDON_ID, THEME_EVENT_NAME, THEME_GLOBAL_TYPE_ID, ensureThemeKey} from "./constants";

/** Update preview iframe with theme (only preview uses CSS selectors) */
const updatePreviewTheme = (theme: string) => {
  const root = document.documentElement;

  root.setAttribute("data-theme", theme);
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

export const withTheme: Decorator = (Story, context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  const [globals] = useGlobals();
  const theme = ensureThemeKey(globals[THEME_GLOBAL_TYPE_ID] as string | undefined);

  // Update theme in memory and apply to preview/docs
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  useEffect(() => {
    updatePreviewTheme(theme);

    // Notify manager about theme change
    const channel = addons.getChannel();

    if (channel) {
      channel.emit(THEME_EVENT_NAME, {theme}, {source: THEME_ADDON_ID});
    }
  }, [theme]);

  // Listen for STORY_CHANGED and SET_STORIES events to ensure preview theme is applied
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  useEffect(() => {
    const channel = addons.getChannel();

    const handleEvent = () => {
      updatePreviewTheme(theme);
    };

    channel.on("STORY_CHANGED", handleEvent);
    channel.on("SET_STORIES", handleEvent);

    return () => {
      channel.removeListener("STORY_CHANGED", handleEvent);
      channel.removeListener("SET_STORIES", handleEvent);
    };
  }, [theme]);

  return <Story {...context} />;
};

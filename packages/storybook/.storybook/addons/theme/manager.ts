import {addons} from "storybook/manager-api";

import {
  DEFAULT_THEME,
  THEME_EVENT_NAME,
  THEME_GLOBAL_TYPE_ID,
  ensureThemeKey,
} from "../../addons/theme/constants";
import {themes} from "../../styles/theme";

// Register addon to hook into the manager lifecycle properly
addons.register("heroui-theme-manager", (api) => {
  let lastTheme = DEFAULT_THEME;

  const updateManagerTheme = (theme: string) => {
    const selectedTheme = themes[theme as keyof typeof themes] || themes.light;

    // Get current config to preserve other settings
    const currentConfig = (addons as any).getConfig?.() || {};

    addons.setConfig({
      ...currentConfig,
      theme: selectedTheme,
      enableShortcuts: currentConfig.enableShortcuts ?? false,
      sidebar: {
        ...currentConfig.sidebar,
        showRoots: currentConfig.sidebar?.showRoots ?? false,
      },
    });
  };

  const applyTheme = (theme: string) => {
    const next = ensureThemeKey(theme);

    lastTheme = next;
    updateManagerTheme(next);
  };

  // Initialize loop to ensure channel connection
  const init = () => {
    // Try to get channel from API first (more reliable in register callback), then fallback to addons
    const channel = api.getChannel() || addons.getChannel();

    if (!channel) {
      setTimeout(init, 100);

      return;
    }

    // Initialize with default
    applyTheme(DEFAULT_THEME);

    // Listen for custom theme event
    channel.on(THEME_EVENT_NAME, (event: {theme: string}) => {
      applyTheme(event?.theme);
    });

    // Listen for globals updates
    channel.on("GLOBALS_UPDATED", (payload: {globals?: Record<string, unknown>}) => {
      const theme = payload?.globals?.[THEME_GLOBAL_TYPE_ID] as string | undefined;

      if (theme) applyTheme(theme);
    });

    // Replay on lifecycle events to override defaults
    const replayEvents = [
      "STORIES_CONFIGURED",
      "SET_STORIES",
      "SELECT_STORY",
      "STORY_RENDERED",
      "DOCS_RENDERED",
    ] as const;

    replayEvents.forEach((eventName) => {
      channel.on(eventName, () => {
        applyTheme(lastTheme);
      });
    });

    // Also try to read initial globals from state if available
    try {
      const state = (api as any).getData?.();
      const initialGlobalTheme = state?.globals?.[THEME_GLOBAL_TYPE_ID];

      if (initialGlobalTheme) {
        applyTheme(initialGlobalTheme as string);
      }
    } catch (e) {
      // ignore
    }
  };

  init();
});

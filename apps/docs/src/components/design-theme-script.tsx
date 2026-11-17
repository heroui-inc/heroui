import {themeIds} from "@/app/[lang]/themes/constants";
import {
  DEFAULT_DESIGN_THEME,
  DESIGN_THEME_STORAGE_KEY,
  VIBRANT_STORAGE_KEY,
} from "@/utils/design-theme";

const designThemes = themeIds.filter((id) => id !== DEFAULT_DESIGN_THEME);

// Runs before first paint, so a saved design theme and vibrant palette show on the first frame
// instead of after hydration. `useDesignTheme` applies the same state again once it mounts.
const script = `(() => {
  const root = document.documentElement;

  try {
    const theme = localStorage.getItem(${JSON.stringify(DESIGN_THEME_STORAGE_KEY)});
    // next-themes' stored choice; the mode toggle reads it to pick its icon before it mounts.
    const mode = localStorage.getItem("theme");

    if (${JSON.stringify(designThemes)}.includes(theme)) root.setAttribute("data-design-theme", theme);
    if (localStorage.getItem(${JSON.stringify(VIBRANT_STORAGE_KEY)}) === "true") {
      root.setAttribute("data-vibrant-palette", "true");
    }
    if (mode === "dark" || mode === "light") root.setAttribute("data-color-mode", mode);
  } catch {}
})();`;

export function DesignThemeScript() {
  return <script dangerouslySetInnerHTML={{__html: script}} />;
}

/**
 * General base styles
 */

import type {PluginFunction} from "../imports";

const general: PluginFunction = ({addBase}) => {
  addBase({
    ":root": {
      // Layout tokens
      "--border-width": "1px",
      "--disabled-opacity": "0.5",
      "--radius": "0.75rem",
      "--radius-panel": "0.5rem",
      "--radius-panel-inner": "calc(var(--radius-panel) * 0.5)",
      "--font-size-base": "clamp(14px, 1vw + 0.5rem, 16px)",
    },
  });
};

export default general;

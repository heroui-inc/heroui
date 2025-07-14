/**
 * Glass effect utilities
 */

import type {PluginFunction} from "../imports";

const glass: PluginFunction = ({addUtilities}) => {
  addUtilities({
    ".glass": {
      "backdrop-filter": "blur(var(--blur, 10px))",
      "-webkit-backdrop-filter": "blur(var(--blur, 10px))",
    },
    ".glass-soft": {
      "backdrop-filter": "blur(var(--blur-soft, 5px))",
      "-webkit-backdrop-filter": "blur(var(--blur-soft, 5px))",
    },
    ".glass-strong": {
      "backdrop-filter": "blur(var(--blur-strong, 20px))",
      "-webkit-backdrop-filter": "blur(var(--blur-strong, 20px))",
    },
    ".glass-panel": {
      "backdrop-filter": "blur(var(--blur, 10px))",
      "-webkit-backdrop-filter": "blur(var(--blur, 10px))",
      "background-color": "var(--panel)",
      border: "1px solid",
      "border-color": "rgb(from var(--border) r g b / 20%)",
      "box-shadow": "var(--shadow-border)",
    },
    ".glass-surface": {
      "backdrop-filter": "blur(var(--blur, 10px))",
      "-webkit-backdrop-filter": "blur(var(--blur, 10px))",
      "background-color": "var(--surface)",
      border: "1px solid",
      "border-color": "rgb(from var(--border) r g b / 10%)",
    },
  });
};

export default glass;

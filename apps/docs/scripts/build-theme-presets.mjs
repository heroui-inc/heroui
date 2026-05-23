/**
 * Build script: generates docs theme-presets.css from the frontend's preset definitions.
 *
 * Usage: node apps/docs/scripts/build-theme-presets.mjs
 * Output: apps/docs/src/styles/theme-presets.css
 */

import {writeFileSync} from "fs";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../src/styles/theme-presets.css");

// ---------------------------------------------------------------------------
// Color math
// ---------------------------------------------------------------------------

function hexToOklch(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));

  const lr = toLinear(r),
    lg = toLinear(g),
    lb = toLinear(b);

  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
  const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb;

  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

  const l3 = Math.cbrt(l_),
    m3 = Math.cbrt(m_),
    s3 = Math.cbrt(s_);

  const okL = 0.2104542553 * l3 + 0.793617785 * m3 - 0.0040720468 * s3;
  const okA = 1.9779984951 * l3 - 2.428592205 * m3 + 0.4505937099 * s3;
  const okB = 0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3;

  const c = Math.sqrt(okA * okA + okB * okB);
  let h = (Math.atan2(okB, okA) * 180) / Math.PI;

  if (h < 0) h += 360;

  return {c, h, l: Math.max(0, Math.min(1, okL))};
}

function fmt(color) {
  return `oklch(${(color.l * 100).toFixed(2)}% ${color.c.toFixed(4)} ${color.h.toFixed(2)})`;
}

function adjustHue(color, newHue) {
  return {...color, h: newHue};
}

function adjustChroma(color, newChroma) {
  return {...color, c: Math.max(0, newChroma)};
}

// ---------------------------------------------------------------------------
// Default baseline neutral values (from generate-css-variables.ts)
// ---------------------------------------------------------------------------

const DEFAULTS = {
  dark: {
    background: {c: 0.005, h: 285.823, l: 0.12},
    border: {c: 0.006, h: 286.033, l: 0.28},
    default: {c: 0.006, h: 286.033, l: 0.274},
    foreground: {c: 0, h: 0, l: 0.9911},
    muted: {c: 0.015, h: 286.067, l: 0.705},
    overlay: {c: 0.0059, h: 285.89, l: 0.2103},
    scrollbar: {c: 0.015, h: 286.067, l: 0.705},
    segment: {c: 0.01, h: 285.93, l: 0.3964},
    separator: {c: 0.006, h: 286.033, l: 0.25},
    surface: {c: 0.0059, h: 285.89, l: 0.2103},
    surfaceSecondary: {c: 0.0037, h: 286.14, l: 0.257},
    surfaceTertiary: {c: 0.0024, h: 247.91, l: 0.2721},
  },
  light: {
    background: {c: 0, h: 0, l: 0.9702},
    border: {c: 0.004, h: 286.32, l: 0.9},
    default: {c: 0.001, h: 286.375, l: 0.94},
    foreground: {c: 0.0059, h: 285.89, l: 0.2103},
    muted: {c: 0.0138, h: 285.94, l: 0.5517},
    overlay: {c: 0, h: 0, l: 1},
    scrollbar: {c: 0.006, h: 286.286, l: 0.871},
    segment: {c: 0, h: 0, l: 1},
    separator: {c: 0.004, h: 286.32, l: 0.92},
    surface: {c: 0, h: 0, l: 1},
    surfaceSecondary: {c: 0.0013, h: 286.37, l: 0.9524},
    surfaceTertiary: {c: 0.0013, h: 286.37, l: 0.9373},
  },
};

const SEMANTIC_HUE_BLEND = 0.12;
const DEFAULT_ACCENT_HUE = 253.83;

function semanticHue(semanticDefault, baseHue) {
  let h = semanticDefault + (baseHue - DEFAULT_ACCENT_HUE) * SEMANTIC_HUE_BLEND;

  while (h < 0) h += 360;
  while (h >= 360) h -= 360;

  return h;
}

// ---------------------------------------------------------------------------
// Variable generators
// ---------------------------------------------------------------------------

function accentForeground(l, c, h) {
  if (l > 0.65) {
    return `oklch(15% ${Math.min(c * 0.2, 0.03).toFixed(4)} ${h.toFixed(2)})`;
  }

  return "oklch(99.11% 0 0)";
}

function genAccent(l, c, h, fgOverride) {
  const accent = fmt({c, h, l});
  const fg = fgOverride ?? accentForeground(l, c, h);

  return {
    "--accent": accent,
    "--accent-foreground": fg,
    "--focus": accent,
  };
}

function genNeutrals(hue, grayChroma, mode) {
  const defs = DEFAULTS[mode];
  const f = (color, chromaMul) => fmt(adjustChroma(adjustHue(color, hue), grayChroma * chromaMul));

  const bg = f(defs.background, 1);
  const fg = f(defs.foreground, 1);
  const muted = f(defs.muted, 2);
  const surface = f(defs.surface, mode === "dark" ? 2 : 0.5);
  const surfaceSec = f(defs.surfaceSecondary, 1.5);
  const surfaceTer = f(defs.surfaceTertiary, 1.5);
  const defaultBg = f(defs.default, 1);
  const border = f(defs.border, 1);
  const separator = f(defs.separator, 1);
  const overlay = f(defs.overlay, mode === "dark" ? 2 : 0.3);
  const scrollbar = f(defs.scrollbar, 1);
  const segment = f(defs.segment, 1);
  const fieldBg = surface;
  const fieldFg = fg;

  const defaultFg = mode === "dark" ? "oklch(99.11% 0 0)" : fmt({c: 0.0059, h: hue, l: 0.2103});

  return {
    "--background": bg,
    "--border": border,
    "--default": defaultBg,
    "--default-foreground": defaultFg,
    "--field-background": fieldBg,
    "--field-border": border,
    "--field-foreground": fieldFg,
    "--field-placeholder": muted,
    "--foreground": fg,
    "--link": fg,
    "--muted": muted,
    "--overlay": overlay,
    "--overlay-foreground": fg,
    "--scrollbar": scrollbar,
    "--segment": segment,
    "--segment-foreground": fg,
    "--separator": separator,
    "--surface": surface,
    "--surface-foreground": fg,
    "--surface-secondary": surfaceSec,
    "--surface-secondary-foreground": fg,
    "--surface-tertiary": surfaceTer,
    "--surface-tertiary-foreground": fg,
  };
}

function genSemanticFromHex(name, hex, baseHue, grayChroma) {
  const oklch = hexToOklch(hex);
  const h = semanticHue(oklch.h, baseHue);
  const boost = 1 + grayChroma * 2;
  const c = Math.min(oklch.c * boost, 0.35);
  const color = fmt({c, h, l: oklch.l});
  const fg = oklch.l > 0.67 ? fmt({c: 0.0059, h, l: 0.2103}) : "oklch(99.11% 0 0)";

  return {
    [`--${name}`]: color,
    [`--${name}-foreground`]: fg,
  };
}

function genSemanticFromOklch(name, oklchStr, fgOverride) {
  const lMatch = oklchStr.match(/oklch\(([\d.]+)/);
  const l = lMatch?.[1] ? parseFloat(lMatch[1]) : 0.5;
  let autoFg;

  if (l > 0.65) {
    const hMatch = oklchStr.match(/oklch\([\d.]+\s+[\d.]+\s+([\d.]+)/);
    const h = hMatch?.[1] ? parseFloat(hMatch[1]) : 0;
    const cMatch = oklchStr.match(/oklch\([\d.]+\s+([\d.]+)/);
    const c = cMatch?.[1] ? parseFloat(cMatch[1]) : 0;

    autoFg = `oklch(15% ${Math.min(c * 0.3, 0.05).toFixed(4)} ${h.toFixed(2)})`;
  } else {
    autoFg = "oklch(99.11% 0 0)";
  }
  const fg = fgOverride ?? autoFg;

  return {
    [`--${name}`]: oklchStr,
    [`--${name}-foreground`]: fg,
  };
}

// ---------------------------------------------------------------------------
// Radius map
// ---------------------------------------------------------------------------

const RADIUS_MAP = {
  "extra-large": "1rem",
  "extra-small": "0.125rem",
  large: "0.75rem",
  medium: "0.5rem",
  none: "0",
  small: "0.25rem",
};

// ---------------------------------------------------------------------------
// Preset definitions
// ---------------------------------------------------------------------------

const DEFAULT_SEMANTIC = {
  dangerHex: "#FF383C",
  successHex: "#17C964",
  warningHex: "#F5A524",
};

const PRESETS = [
  {
    accentHex: "#7DD3FC",
    base: 0.015,
    formRadius: "large",
    id: "sky",
    radius: "medium",
  },
  {
    accentHex: "#C084FC",
    base: 0.015,
    formRadius: "large",
    id: "lavender",
    radius: "medium",
  },
  {
    accentHex: "#86EFAC",
    base: 0.015,
    formRadius: "large",
    id: "mint",
    radius: "medium",
  },
  {
    accentHex: "#E50914",
    base: 0.008,
    formRadius: "extra-small",
    id: "netflix",
    radius: "extra-small",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.4964 0.1994 28.56)"},
        success: {color: "oklch(0.7677 0.1899 148.1)"},
        warning: {color: "oklch(0.8239 0.153 74.6)"},
      },
      light: {
        danger: {color: "oklch(0.4823 0.1938 27.64)"},
        success: {color: "oklch(0.5148 0.1337 146.82)"},
        warning: {color: "oklch(0.561 0.116571 78.9352)"},
      },
    },
  },
  {
    accentHex: "#000000",
    base: 0.005,
    darkAccent: {c: 0, h: 0, l: 0.9848},
    darkAccentHex: "#FBFBFB",
    formRadius: "small",
    id: "uber",
    radius: "small",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.7044 0.1872 23.19)"},
        success: {color: "oklch(0.6514 0.1321 156.22)"},
        warning: {color: "oklch(0.8803 0.1348 86.06)"},
      },
      light: {
        danger: {color: "oklch(0.573 0.2249 21.97)"},
        success: {color: "oklch(0.6277 0.1604 153.06)"},
        warning: {color: "oklch(0.8446 0.1525 80.6)"},
      },
    },
  },
  {
    accentHex: "#1ED760",
    base: 0.002,
    formRadius: "extra-small",
    id: "spotify",
    radius: "medium",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.5931 0.2338 25.42)"},
        success: {color: "oklch(0.7697 0.2124 148.67)"},
        warning: {color: "oklch(0.7921 0.1626 67.42)"},
      },
      light: {
        danger: {color: "oklch(0.5509 0.2166 25.29)"},
        success: {color: "oklch(0.6072 0.1647 149.02)"},
        warning: {color: "oklch(0.6972 0.1687 54.22)"},
      },
    },
  },
  {
    accentHex: "#4F44E0",
    base: 0.002,
    formRadius: "extra-small",
    id: "coinbase",
    radius: "medium",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.6545 0.2145 22.31)"},
        success: {color: "oklch(0.7574 0.180554 156.931)"},
        warning: {color: "oklch(0.8095 0.1119 61.69)"},
      },
      light: {
        danger: {color: "oklch(0.5507 0.2062 24)"},
        success: {color: "oklch(0.5438 0.1268 157.17)"},
        warning: {color: "oklch(0.8095 0.1119 61.69)"},
      },
    },
  },
  {
    accentHex: "#FF5A5F",
    base: 0,
    formRadius: "large",
    id: "airbnb",
    radius: "medium",
    semanticOverrides: {
      dark: {
        accentForeground: "oklch(0.9911 0 0)",
        danger: {color: "oklch(0.5392 0.1816 33.72)", foreground: "oklch(0.9911 0 0)"},
        success: {color: "oklch(0.652 0.114864 185.0749)", foreground: "oklch(0.9911 0 0)"},
        warning: {color: "oklch(0.8197 0.170602 78.4658)"},
      },
      light: {
        accentForeground: "oklch(0.9911 0 0)",
        danger: {color: "oklch(0.5392 0.1816 33.72)", foreground: "oklch(0.9911 0 0)"},
        success: {color: "oklch(0.5573 0.0947 199.48)", foreground: "oklch(0.9911 0 0)"},
        warning: {color: "oklch(0.6904 0.1972 38.75)", foreground: "oklch(0.9911 0 0)"},
      },
    },
  },
  {
    accentHex: "#5865F2",
    base: 0.01,
    formRadius: "large",
    id: "discord",
    radius: "small",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.6318 0.2075 24.57)"},
        success: {color: "oklch(0.8548 0.1967 150.16)"},
        warning: {color: "oklch(0.9218 0.1571 99.87)"},
      },
      light: {
        danger: {color: "oklch(0.5884 0.1993 24.39)"},
        success: {color: "oklch(0.532 0.1238 151.57)"},
        warning: {color: "oklch(0.9218 0.1571 99.87)"},
      },
    },
  },
  {
    accentHex: "#FF6600",
    base: 0.01,
    formRadius: "extra-large",
    id: "rabbit",
    radius: "medium",
    semanticOverrides: {
      dark: {
        danger: {color: "oklch(0.6291 0.2565 29.09)"},
        success: {color: "oklch(0.7113 0.2043 140.81)"},
      },
      light: {
        danger: {color: "oklch(0.6291 0.2565 29.09)"},
        success: {color: "oklch(0.7113 0.2043 140.81)"},
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Generate CSS for a single preset
// ---------------------------------------------------------------------------

function generatePresetCss(preset) {
  const lightAccent = hexToOklch(preset.accentHex);
  const darkAccent = preset.darkAccentHex ? hexToOklch(preset.darkAccentHex) : lightAccent;
  const hue = lightAccent.h;
  const grayChroma = preset.base;
  const so = preset.semanticOverrides;

  function modeVars(mode) {
    const accent = mode === "dark" ? darkAccent : lightAccent;
    const modeAccent = preset[`${mode}Accent`] ?? accent;
    const accentVars = genAccent(
      modeAccent.l,
      modeAccent.c,
      modeAccent.h,
      so?.[mode]?.accentForeground,
    );
    const neutrals = genNeutrals(hue, grayChroma, mode);

    let semantics = {};

    for (const name of ["success", "warning", "danger"]) {
      if (so?.[mode]?.[name]) {
        semantics = {
          ...semantics,
          ...genSemanticFromOklch(name, so[mode][name].color, so[mode][name].foreground),
        };
      } else {
        semantics = {
          ...semantics,
          ...genSemanticFromHex(name, DEFAULT_SEMANTIC[`${name}Hex`], hue, grayChroma),
        };
      }
    }

    const radius = {};

    if (preset.radius !== "medium") {
      radius["--radius"] = RADIUS_MAP[preset.radius];
    }
    if (preset.formRadius !== "large") {
      radius["--field-radius"] = RADIUS_MAP[preset.formRadius];
    }

    const charts = {
      "--chart-1": "oklch(from var(--accent) calc(l - 0.24) c h)",
      "--chart-2": "oklch(from var(--accent) calc(l - 0.12) c h)",
      "--chart-3": "var(--accent)",
      "--chart-4": "oklch(from var(--accent) calc(l + 0.12) c h)",
      "--chart-5": "oklch(from var(--accent) calc(l + 0.24) c h)",
    };

    return {...neutrals, ...accentVars, ...semantics, ...radius, ...charts};
  }

  const light = modeVars("light");
  const dark = modeVars("dark");

  const renderVars = (vars) =>
    Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

  return `/* ${preset.id.charAt(0).toUpperCase() + preset.id.slice(1)} theme */
[data-design-theme="${preset.id}"]:not(.dark):not([data-theme="dark"]) {
${renderVars(light)}
}

[data-design-theme="${preset.id}"].dark,
[data-design-theme="${preset.id}"][data-theme="dark"] {
  color-scheme: dark;
${renderVars(dark)}
}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const banner = `/* ============================================================================
   Auto-generated theme presets for docs.
   Run: node apps/docs/scripts/build-theme-presets.mjs
   ============================================================================ */\n`;

const body = PRESETS.map(generatePresetCss).join("\n\n");
const css = `${banner}@layer base {\n${body}\n}\n`;

writeFileSync(OUTPUT, css);
console.log(`✓ Generated ${PRESETS.length} theme presets → ${OUTPUT}`);

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Animation utilities for HeroUI
 * To be integrated with the main HeroUI plugin
 */

import type {PluginAPI} from "tailwindcss/plugin";

function filterDefault(values: Record<string, any>) {
  return Object.fromEntries(Object.entries(values).filter(([key]) => key !== "DEFAULT"));
}

export function setupAnimations({
  addUtilities,
  matchUtilities,
  theme,
}: Pick<PluginAPI, "addUtilities" | "matchUtilities" | "theme">) {
  // Add base animation utilities
  addUtilities({
    "@keyframes enter": theme("keyframes.enter"),
    "@keyframes exit": theme("keyframes.exit"),
    ".animate-in": {
      animationName: "enter",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-enter-opacity": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-translate-x": "initial",
      "--tw-enter-translate-y": "initial",
    },
    ".animate-out": {
      animationName: "exit",
      animationDuration: theme("animationDuration.DEFAULT"),
      "--tw-exit-opacity": "initial",
      "--tw-exit-scale": "initial",
      "--tw-exit-rotate": "initial",
      "--tw-exit-translate-x": "initial",
      "--tw-exit-translate-y": "initial",
    },
  });

  // Fade utilities
  matchUtilities(
    {
      "fade-in": (value: string) => ({"--tw-enter-opacity": value}),
      "fade-out": (value: string) => ({"--tw-exit-opacity": value}),
    },
    {values: theme("animationOpacity")},
  );

  // Zoom utilities
  matchUtilities(
    {
      "zoom-in": (value: string) => ({"--tw-enter-scale": value}),
      "zoom-out": (value: string) => ({"--tw-exit-scale": value}),
    },
    {values: theme("animationScale")},
  );

  // Spin utilities
  matchUtilities(
    {
      "spin-in": (value: string) => ({"--tw-enter-rotate": value}),
      "spin-out": (value: string) => ({"--tw-exit-rotate": value}),
    },
    {values: theme("animationRotate")},
  );

  // Slide utilities
  matchUtilities(
    {
      "slide-in-from-top": (value: string) => ({
        "--tw-enter-translate-y": `-${value}`,
      }),
      "slide-in-from-bottom": (value: string) => ({
        "--tw-enter-translate-y": value,
      }),
      "slide-in-from-left": (value: string) => ({
        "--tw-enter-translate-x": `-${value}`,
      }),
      "slide-in-from-right": (value: string) => ({
        "--tw-enter-translate-x": value,
      }),
      "slide-out-to-top": (value: string) => ({
        "--tw-exit-translate-y": `-${value}`,
      }),
      "slide-out-to-bottom": (value: string) => ({
        "--tw-exit-translate-y": value,
      }),
      "slide-out-to-left": (value: string) => ({
        "--tw-exit-translate-x": `-${value}`,
      }),
      "slide-out-to-right": (value: string) => ({
        "--tw-exit-translate-x": value,
      }),
    },
    {values: theme("animationTranslate")},
  );

  // Duration utilities
  matchUtilities(
    {duration: (value: string) => ({animationDuration: value})},
    {values: filterDefault(theme("animationDuration"))},
  );

  // Delay utilities
  matchUtilities(
    {delay: (value: string) => ({animationDelay: value})},
    {values: theme("animationDelay")},
  );

  // Ease utilities
  matchUtilities(
    {ease: (value: string) => ({animationTimingFunction: value})},
    {values: filterDefault(theme("animationTimingFunction"))},
  );

  // Play state utilities
  addUtilities({
    ".running": {animationPlayState: "running"},
    ".paused": {animationPlayState: "paused"},
  });

  // Fill mode utilities
  matchUtilities(
    {"fill-mode": (value: string) => ({animationFillMode: value})},
    {values: theme("animationFillMode")},
  );

  // Direction utilities
  matchUtilities(
    {direction: (value: string) => ({animationDirection: value})},
    {values: theme("animationDirection")},
  );

  // Repeat utilities
  matchUtilities(
    {repeat: (value: string) => ({animationIterationCount: value})},
    {values: theme("animationRepeat")},
  );
}

// Export theme values to be spread in the main plugin
export const animationThemeValues = {
  animationDelay: ({theme}: {theme: (path: string) => any}) => ({
    ...theme("transitionDelay"),
  }),
  animationDuration: ({theme}: {theme: (path: string) => any}) => ({
    0: "0ms",
    ...theme("transitionDuration"),
  }),
  animationTimingFunction: ({theme}: {theme: (path: string) => any}) => ({
    ...theme("transitionTimingFunction"),
    spring: "cubic-bezier(0.155, 1.105, 0.295, 1.12)",
  }),
  animationFillMode: {
    none: "none",
    forwards: "forwards",
    backwards: "backwards",
    both: "both",
  },
  animationDirection: {
    normal: "normal",
    reverse: "reverse",
    alternate: "alternate",
    "alternate-reverse": "alternate-reverse",
  },
  animationOpacity: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: 0,
    ...theme("opacity"),
  }),
  animationTranslate: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: "100%",
    ...theme("translate"),
  }),
  animationScale: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: 0,
    ...theme("scale"),
  }),
  animationRotate: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: "30deg",
    ...theme("rotate"),
  }),
  animationRepeat: {
    0: "0",
    1: "1",
    infinite: "infinite",
  },
  keyframes: {
    enter: {
      from: {
        opacity: "var(--tw-enter-opacity, 1)",
        transform:
          "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
      },
    },
    exit: {
      to: {
        opacity: "var(--tw-exit-opacity, 1)",
        transform:
          "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
      },
    },
  },
};

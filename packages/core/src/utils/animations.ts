/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Animation utilities for HeroUI Core
 */

import type {PluginAPI} from "tailwindcss/plugin";

export type PluginContext = Pick<
  PluginAPI,
  "addUtilities" | "matchUtilities" | "theme" | "addBase"
>;

function filterDefault(values: Record<string, any>) {
  return Object.fromEntries(Object.entries(values).filter(([key]) => key !== "DEFAULT"));
}

export function setupAnimations({addBase, addUtilities, matchUtilities, theme}: PluginContext) {
  // Add keyframes
  addBase({
    "@keyframes enter": theme("keyframes.enter"),
    "@keyframes exit": theme("keyframes.exit"),
  });

  // Add base animation utilities
  const animationUtilities = {
    ".animate-in": {
      "--tw-enter-opacity": "initial",
      "--tw-enter-rotate": "initial",
      "--tw-enter-scale": "initial",
      "--tw-enter-translate-x": "initial",
      "--tw-enter-translate-y": "initial",
      animationDuration: theme("animationDuration.DEFAULT"),
      animationName: "enter",
    },
    ".animate-out": {
      "--tw-exit-opacity": "initial",
      "--tw-exit-rotate": "initial",
      "--tw-exit-scale": "initial",
      "--tw-exit-translate-x": "initial",
      "--tw-exit-translate-y": "initial",
      animationDuration: theme("animationDuration.DEFAULT"),
      animationName: "exit",
    },
  };

  addUtilities(animationUtilities);

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
      "slide-in-from-bottom": (value: string) => ({
        "--tw-enter-translate-y": value,
      }),
      "slide-in-from-left": (value: string) => ({
        "--tw-enter-translate-x": `-${value}`,
      }),
      "slide-in-from-right": (value: string) => ({
        "--tw-enter-translate-x": value,
      }),
      "slide-in-from-top": (value: string) => ({
        "--tw-enter-translate-y": `-${value}`,
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
      "slide-out-to-top": (value: string) => ({
        "--tw-exit-translate-y": `-${value}`,
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
    ".paused": {animationPlayState: "paused"},
    ".running": {animationPlayState: "running"},
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
  animationDirection: {
    alternate: "alternate",
    "alternate-reverse": "alternate-reverse",
    normal: "normal",
    reverse: "reverse",
  },
  animationDuration: ({theme}: {theme: (path: string) => any}) => ({
    0: "0ms",
    ...theme("transitionDuration"),
  }),
  animationFillMode: {
    backwards: "backwards",
    both: "both",
    forwards: "forwards",
    none: "none",
  },
  animationOpacity: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: 0,
    ...theme("opacity"),
  }),
  animationRepeat: {
    0: "0",
    1: "1",
    infinite: "infinite",
  },
  animationRotate: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: "30deg",
    ...theme("rotate"),
  }),
  animationScale: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: 0,
    ...theme("scale"),
  }),
  animationTimingFunction: ({theme}: {theme: (path: string) => any}) => ({
    ...theme("transitionTimingFunction"),
    spring: "cubic-bezier(0.155, 1.105, 0.295, 1.12)",
  }),
  animationTranslate: ({theme}: {theme: (path: string) => any}) => ({
    DEFAULT: "100%",
    ...theme("translate"),
  }),
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Animation utilities from tw-animate-css
 * Integrated directly into HeroUI to avoid external dependencies
 */

import type {PluginFunction} from "../imports";

const animations: PluginFunction = ({addBase, addUtilities}) => {
  // Add CSS properties for animations
  if (addBase) {
    addBase({
      ":root": {
        "@property --tw-animation-delay": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "0s",
        },
        "@property --tw-animation-duration": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "0s",
        },
        "@property --tw-animation-iteration-count": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "1",
        },
        "@property --tw-animation-fill-mode": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "none",
        },
        "@property --tw-animation-direction": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "normal",
        },
        "@property --tw-animation-play-state": {
          syntax: '"*"',
          inherits: "false",
          "initial-value": "running",
        },
        "@property --tw-enter-opacity": {
          syntax: '"<number>"',
          inherits: "false",
          "initial-value": "0",
        },
        "@property --tw-enter-scale": {
          syntax: '"<number>"',
          inherits: "false",
          "initial-value": "0",
        },
        "@property --tw-enter-rotate": {
          syntax: '"<number>"',
          inherits: "false",
          "initial-value": "0",
        },
        "@property --tw-enter-translate-x": {
          syntax: '"<length>"',
          inherits: "false",
          "initial-value": "0",
        },
        "@property --tw-enter-translate-y": {
          syntax: '"<length>"',
          inherits: "false",
          "initial-value": "0",
        },
      },
    });
  }

  // Add keyframes
  addUtilities({
    "@keyframes enter": {
      from: {
        opacity: "var(--tw-enter-opacity, 1)",
        transform: `translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0)
          scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1))
          rotate(var(--tw-enter-rotate, 0))`,
      },
    },
    "@keyframes exit": {
      to: {
        opacity: "var(--tw-enter-opacity, 1)",
        transform: `translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0)
          scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1))
          rotate(var(--tw-enter-rotate, 0))`,
      },
    },
    "@keyframes fade-in": {
      from: {opacity: "0"},
      to: {opacity: "1"},
    },
    "@keyframes fade-out": {
      from: {opacity: "1"},
      to: {opacity: "0"},
    },
    "@keyframes zoom-in": {
      from: {transform: "scale(0.95)"},
      to: {transform: "scale(1)"},
    },
    "@keyframes zoom-out": {
      from: {transform: "scale(1)"},
      to: {transform: "scale(0.95)"},
    },
    "@keyframes spin-in": {
      from: {transform: "rotate(0deg)"},
      to: {transform: "rotate(360deg)"},
    },
    "@keyframes spin-out": {
      from: {transform: "rotate(360deg)"},
      to: {transform: "rotate(0deg)"},
    },
    "@keyframes slide-in-from-top": {
      from: {transform: "translateY(-100%)"},
      to: {transform: "translateY(0)"},
    },
    "@keyframes slide-in-from-bottom": {
      from: {transform: "translateY(100%)"},
      to: {transform: "translateY(0)"},
    },
    "@keyframes slide-in-from-left": {
      from: {transform: "translateX(-100%)"},
      to: {transform: "translateX(0)"},
    },
    "@keyframes slide-in-from-right": {
      from: {transform: "translateX(100%)"},
      to: {transform: "translateX(0)"},
    },
    "@keyframes slide-out-to-top": {
      from: {transform: "translateY(0)"},
      to: {transform: "translateY(-100%)"},
    },
    "@keyframes slide-out-to-bottom": {
      from: {transform: "translateY(0)"},
      to: {transform: "translateY(100%)"},
    },
    "@keyframes slide-out-to-left": {
      from: {transform: "translateX(0)"},
      to: {transform: "translateX(-100%)"},
    },
    "@keyframes slide-out-to-right": {
      from: {transform: "translateX(0)"},
      to: {transform: "translateX(100%)"},
    },
  });

  // Add animation utilities
  const animationUtilities: Record<string, any> = {
    ".animate-in": {
      animation: `enter var(--tw-animation-duration, 150ms) var(--tw-ease, ease)
        var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1)
        var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)`,
    },
    ".animate-out": {
      animation: `exit var(--tw-animation-duration, 150ms) var(--tw-ease, ease)
        var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1)
        var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none)`,
    },
    // Fade animations
    ".fade-in": {
      "--tw-enter-opacity": "0",
      animation: "fade-in",
    },
    ".fade-out": {
      "--tw-enter-opacity": "1",
      animation: "fade-out",
    },
    // Zoom animations
    ".zoom-in": {
      "--tw-enter-scale": "0.95",
      animation: "zoom-in",
    },
    ".zoom-out": {
      "--tw-enter-scale": "1.05",
      animation: "zoom-out",
    },
    // Scale variations
    ".zoom-in-50": {
      "--tw-enter-scale": "0.5",
      animation: "zoom-in",
    },
    ".zoom-in-75": {
      "--tw-enter-scale": "0.75",
      animation: "zoom-in",
    },
    ".zoom-in-90": {
      "--tw-enter-scale": "0.9",
      animation: "zoom-in",
    },
    ".zoom-in-95": {
      "--tw-enter-scale": "0.95",
      animation: "zoom-in",
    },
    ".zoom-in-100": {
      "--tw-enter-scale": "1",
      animation: "zoom-in",
    },
    ".zoom-in-105": {
      "--tw-enter-scale": "1.05",
      animation: "zoom-in",
    },
    ".zoom-in-110": {
      "--tw-enter-scale": "1.1",
      animation: "zoom-in",
    },
    ".zoom-in-125": {
      "--tw-enter-scale": "1.25",
      animation: "zoom-in",
    },
    ".zoom-in-150": {
      "--tw-enter-scale": "1.5",
      animation: "zoom-in",
    },
    ".zoom-out-50": {
      "--tw-enter-scale": "0.5",
      animation: "zoom-out",
    },
    ".zoom-out-75": {
      "--tw-enter-scale": "0.75",
      animation: "zoom-out",
    },
    ".zoom-out-90": {
      "--tw-enter-scale": "0.9",
      animation: "zoom-out",
    },
    ".zoom-out-95": {
      "--tw-enter-scale": "0.95",
      animation: "zoom-out",
    },
    ".zoom-out-100": {
      "--tw-enter-scale": "1",
      animation: "zoom-out",
    },
    ".zoom-out-105": {
      "--tw-enter-scale": "1.05",
      animation: "zoom-out",
    },
    ".zoom-out-110": {
      "--tw-enter-scale": "1.1",
      animation: "zoom-out",
    },
    ".zoom-out-125": {
      "--tw-enter-scale": "1.25",
      animation: "zoom-out",
    },
    ".zoom-out-150": {
      "--tw-enter-scale": "1.5",
      animation: "zoom-out",
    },
    // Spin animations
    ".spin-in": {
      "--tw-enter-rotate": "0deg",
      animation: "spin-in",
    },
    ".spin-out": {
      "--tw-enter-rotate": "360deg",
      animation: "spin-out",
    },
    // Slide animations
    ".slide-in-from-top": {
      "--tw-enter-translate-y": "-100%",
      animation: "slide-in-from-top",
    },
    ".slide-in-from-bottom": {
      "--tw-enter-translate-y": "100%",
      animation: "slide-in-from-bottom",
    },
    ".slide-in-from-left": {
      "--tw-enter-translate-x": "-100%",
      animation: "slide-in-from-left",
    },
    ".slide-in-from-right": {
      "--tw-enter-translate-x": "100%",
      animation: "slide-in-from-right",
    },
    ".slide-out-to-top": {
      "--tw-enter-translate-y": "0",
      animation: "slide-out-to-top",
    },
    ".slide-out-to-bottom": {
      "--tw-enter-translate-y": "0",
      animation: "slide-out-to-bottom",
    },
    ".slide-out-to-left": {
      "--tw-enter-translate-x": "0",
      animation: "slide-out-to-left",
    },
    ".slide-out-to-right": {
      "--tw-enter-translate-x": "0",
      animation: "slide-out-to-right",
    },
    // Duration utilities
    ".duration-75": {"--tw-animation-duration": "75ms"},
    ".duration-100": {"--tw-animation-duration": "100ms"},
    ".duration-150": {"--tw-animation-duration": "150ms"},
    ".duration-200": {"--tw-animation-duration": "200ms"},
    ".duration-300": {"--tw-animation-duration": "300ms"},
    ".duration-500": {"--tw-animation-duration": "500ms"},
    ".duration-700": {"--tw-animation-duration": "700ms"},
    ".duration-1000": {"--tw-animation-duration": "1000ms"},
    // Delay utilities
    ".delay-75": {"--tw-animation-delay": "75ms"},
    ".delay-100": {"--tw-animation-delay": "100ms"},
    ".delay-150": {"--tw-animation-delay": "150ms"},
    ".delay-200": {"--tw-animation-delay": "200ms"},
    ".delay-300": {"--tw-animation-delay": "300ms"},
    ".delay-500": {"--tw-animation-delay": "500ms"},
    ".delay-700": {"--tw-animation-delay": "700ms"},
    ".delay-1000": {"--tw-animation-delay": "1000ms"},
    // Ease utilities
    ".ease-linear": {"--tw-ease": "linear"},
    ".ease-in": {"--tw-ease": "ease-in"},
    ".ease-out": {"--tw-ease": "ease-out"},
    ".ease-in-out": {"--tw-ease": "ease-in-out"},
  };

  addUtilities(animationUtilities);
};

export default animations;

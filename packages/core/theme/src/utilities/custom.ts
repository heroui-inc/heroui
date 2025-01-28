export default {
  /**
   * Custom utilities
   */
  ".leading-inherit": {
    "line-height": "inherit",
  },
  ".bg-img-inherit": {
    "background-image": "inherit",
  },
  ".bg-clip-inherit": {
    "background-clip": "inherit",
  },
  ".text-fill-inherit": {
    "-webkit-text-fill-color": "inherit",
  },
  ".tap-highlight-transparent": {
    "-webkit-tap-highlight-color": "transparent",
  },
  ".input-search-cancel-button-none": {
    "&::-webkit-search-cancel-button": {
      "-webkit-appearance": "none",
    },
  },
  ".spinner-bar-animation": {
    "animation-delay": "calc(-1.2s + (0.1s * var(--bar-index)))",
    transform: "rotate(calc(30deg * var(--bar-index)))translate(140%)",
  },
};

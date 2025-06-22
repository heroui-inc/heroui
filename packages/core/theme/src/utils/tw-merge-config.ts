import {utilities} from "../utilities";

export const COMMON_UNITS = ["small", "medium", "large"];

export const twMergeConfig = {
  theme: {
    spacing: ["divider"],
    radius: COMMON_UNITS,
  },
  classGroups: {
    shadow: [{shadow: COMMON_UNITS}],
    opacity: [{opacity: ["disabled"]}],
    "font-size": [{text: ["tiny", ...COMMON_UNITS]}],
    "border-w": [{border: COMMON_UNITS}],
    "bg-image": [
      "bg-stripe-gradient-default",
      "bg-stripe-gradient-primary",
      "bg-stripe-gradient-secondary",
      "bg-stripe-gradient-success",
      "bg-stripe-gradient-warning",
      "bg-stripe-gradient-danger",
    ],
    transition: Object.keys(utilities)
      .filter((key) => key.includes(".transition"))
      .map((key) => key.replace(".", "")), // remove the dot from the key, .transition-background -> transition-background
  },
};

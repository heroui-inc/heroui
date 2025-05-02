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
  },
};

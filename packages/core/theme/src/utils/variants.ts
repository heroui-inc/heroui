const solid = {
  default: "vg-bg-default vg-text-default-foreground",
  primary: "vg-bg-primary vg-text-primary-foreground",
  secondary: "vg-bg-secondary vg-text-secondary-foreground",
  success: "vg-bg-success vg-text-success-foreground",
  warning: "vg-bg-warning vg-text-warning-foreground",
  danger: "vg-bg-danger vg-text-danger-foreground",
  foreground: "vg-bg-foreground vg-text-background",
};

const shadow = {
  default: "vg-shadow-lg vg-shadow-default/50 vg-bg-default vg-text-default-foreground",
  primary: "vg-shadow-lg vg-shadow-primary/40 vg-bg-primary vg-text-primary-foreground",
  secondary: "vg-shadow-lg vg-shadow-secondary/40 vg-bg-secondary vg-text-secondary-foreground",
  success: "vg-shadow-lg vg-shadow-success/40 vg-bg-success vg-text-success-foreground",
  warning: "vg-shadow-lg vg-shadow-warning/40 vg-bg-warning vg-text-warning-foreground",
  danger: "vg-shadow-lg vg-shadow-danger/40 vg-bg-danger vg-text-danger-foreground",
  foreground: "vg-shadow-lg vg-shadow-foreground/40 vg-bg-foreground vg-text-background",
};

const bordered = {
  default: "vg-bg-transparent vg-border-default vg-text-foreground",
  primary: "vg-bg-transparent vg-border-primary vg-text-primary",
  secondary: "vg-bg-transparent vg-border-secondary vg-text-secondary",
  success: "vg-bg-transparent vg-border-success vg-text-success",
  warning: "vg-bg-transparent vg-border-warning vg-text-warning",
  danger: "vg-bg-transparent vg-border-danger vg-text-danger",
  foreground: "vg-bg-transparent vg-border-foreground vg-text-foreground",
};

const flat = {
  default: "vg-bg-default/40 vg-text-default-700",
  primary: "vg-bg-primary/20 vg-text-primary-600",
  secondary: "vg-bg-secondary/20 vg-text-secondary-600",
  success: "vg-bg-success/20 vg-text-success-700 vg-dark:text-success",
  warning: "vg-bg-warning/20 vg-text-warning-700 vg-dark:text-warning",
  danger: "vg-bg-danger/20 vg-text-danger-600 vg-dark:text-danger-500",
  foreground: "vg-bg-foreground/10 vg-text-foreground",
};

const faded = {
  default: "vg-border-default vg-bg-default-100 vg-text-default-foreground",
  primary: "vg-border-default vg-bg-default-100 vg-text-primary",
  secondary: "vg-border-default vg-bg-default-100 vg-text-secondary",
  success: "vg-border-default vg-bg-default-100 vg-text-success",
  warning: "vg-border-default vg-bg-default-100 vg-text-warning",
  danger: "vg-border-default vg-bg-default-100 vg-text-danger",
  foreground: "vg-border-default vg-bg-default-100 vg-text-foreground",
};

const light = {
  default: "vg-bg-transparent vg-text-default-foreground",
  primary: "vg-bg-transparent vg-text-primary",
  secondary: "vg-bg-transparent vg-text-secondary",
  success: "vg-bg-transparent vg-text-success",
  warning: "vg-bg-transparent vg-text-warning",
  danger: "vg-bg-transparent vg-text-danger",
  foreground: "vg-bg-transparent vg-text-foreground",
};

const ghost = {
  default: "vg-border-default vg-text-default-foreground",
  primary: "vg-border-primary vg-text-primary",
  secondary: "vg-border-secondary vg-text-secondary",
  success: "vg-border-success vg-text-success",
  warning: "vg-border-warning vg-text-warning",
  danger: "vg-border-danger vg-text-danger",
  foreground: "vg-border-foreground vg-text-foreground vg-hover:!bg-foreground",
};

export const colorVariants = {
  solid,
  shadow,
  bordered,
  flat,
  faded,
  light,
  ghost,
};

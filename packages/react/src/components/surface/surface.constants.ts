import type {SurfaceVariants} from "@heroui/styles";

export type SurfaceContextValue = {
  variant?: SurfaceVariants["variant"];
};

/** Stable context value for surfaces that always use the default variant. */
export const defaultSurfaceContextValue: SurfaceContextValue = {variant: "default"};

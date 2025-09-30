import {tv} from "../utils/tv";
import {VariantProps} from "tailwind-variants";

/**
 * Form wrapper (stub for compatibility with @nextui-org/form package)
 */
export const form = tv({
  base: "vg-form",
  variants: {
    validationBehavior: {
      native: "",
      aria: "",
    },
  },
  defaultVariants: {
    validationBehavior: "aria",
  },
});

export type FormVariantProps = VariantProps<typeof form>;
export type FormSlots = "base";

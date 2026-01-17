import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  slots: {
    actions: "fieldset__actions",
    base: "fieldset",
    description: "fieldset__description",
    fieldGroup: "fieldset__field_group",
    legend: "fieldset__legend",
  },
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;

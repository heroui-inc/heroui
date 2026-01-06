import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  slots: {
    base: "fieldset",
    legend: "fieldset__legend",
    description: "fieldset__description",
    fieldGroup: "fieldset__field_group",
    actions: "fieldset__actions",
  },
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;

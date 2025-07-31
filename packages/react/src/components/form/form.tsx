"use client";

import type {FormVariants} from "./form.styles";
import type {FormProps as FormPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {Form as FormPrimitive} from "react-aria-components";

import {formVariants} from "./form.styles";

/* ------------------------------------------------------------------------------------------------
 * Form Context
 * --------------------------------------------------------------------------------------------- */
type FormContext = {
  slots?: ReturnType<typeof formVariants>;
};

const FormContext = createContext<FormContext>({});

/* ------------------------------------------------------------------------------------------------
 * Form Root
 * --------------------------------------------------------------------------------------------- */
interface FormRootProps extends FormPrimitiveProps, FormVariants {
  asChild?: boolean;
}

const FormRoot = React.forwardRef<React.ElementRef<typeof FormPrimitive>, FormRootProps>(
  ({asChild, children, className, isDisabled, ...rest}, ref) => {
    const slots = React.useMemo(() => formVariants({isDisabled}), [isDisabled]);

    if (asChild) {
      return (
        <FormContext.Provider value={{slots}}>
          <SlotPrimitive data-form-root className={slots?.base({className})} {...rest}>
            {children}
          </SlotPrimitive>
        </FormContext.Provider>
      );
    }

    return (
      <FormContext.Provider value={{slots}}>
        <FormPrimitive ref={ref} data-form-root className={slots.base({className})} {...rest}>
          {children}
        </FormPrimitive>
      </FormContext.Provider>
    );
  },
);

FormRoot.displayName = "HeroUI.Form";

/* ------------------------------------------------------------------------------------------------
 * Form Section
 * --------------------------------------------------------------------------------------------- */
type FormSectionProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({asChild, children, className, ...rest}, ref) => {
    const {slots} = useContext(FormContext);

    const Component = asChild ? SlotPrimitive : "div";

    return (
      <Component ref={ref} data-form-section className={slots?.section({className})} {...rest}>
        {children}
      </Component>
    );
  },
);

FormSection.displayName = "HeroUI.Form.Section";

/* ------------------------------------------------------------------------------------------------
 * Form Actions
 * --------------------------------------------------------------------------------------------- */
type FormActionsProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({asChild, children, className, ...rest}, ref) => {
    const {slots} = useContext(FormContext);

    const Component = asChild ? SlotPrimitive : "div";

    return (
      <Component ref={ref} data-form-actions className={slots?.actions({className})} {...rest}>
        {children}
      </Component>
    );
  },
);

FormActions.displayName = "HeroUI.Form.Actions";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */

const CompoundForm = Object.assign(FormRoot, {
  Section: FormSection,
  Actions: FormActions,
});

export default CompoundForm;

export type {FormRootProps, FormRootProps as FormProps, FormSectionProps, FormActionsProps};

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
          <SlotPrimitive className={slots?.base({className})} data-slot="form-root" {...rest}>
            {children}
          </SlotPrimitive>
        </FormContext.Provider>
      );
    }

    return (
      <FormContext.Provider value={{slots}}>
        <FormPrimitive
          ref={ref}
          className={slots.base({className})}
          data-slot="form-root"
          {...rest}
        >
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
      <Component
        ref={ref}
        className={slots?.section({className})}
        data-slot="form-section"
        {...rest}
      >
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
      <Component
        ref={ref}
        className={slots?.actions({className})}
        data-slot="form-actions"
        {...rest}
      >
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

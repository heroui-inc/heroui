"use client";

import type {
  FieldErrorVariants,
  FieldGroupVariants,
  FieldVariants,
  FieldsetVariants,
  LegendVariants,
} from "./fieldset.styles";
import type {FieldErrorProps as FieldErrorPrimitiveProps} from "react-aria-components";

import {Slot} from "@radix-ui/react-slot";
import React from "react";
import {FieldError as FieldErrorPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {
  fieldErrorVariants,
  fieldGroupVariants,
  fieldVariants,
  fieldsetVariants,
  legendVariants,
} from "./fieldset.styles";

/* -------------------------------------------------------------------------------------------------
 * Fieldset
 * -----------------------------------------------------------------------------------------------*/

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement>, FieldsetVariants {
  asChild?: boolean;
}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : "fieldset";

    return <Comp ref={ref} className={fieldsetVariants({className})} {...props} />;
  },
);

Fieldset.displayName = "HeroUI.Fieldset";

/* -------------------------------------------------------------------------------------------------
 * Legend
 * -----------------------------------------------------------------------------------------------*/

interface LegendProps extends React.HTMLAttributes<HTMLLegendElement>, LegendVariants {
  asChild?: boolean;
}

const Legend = React.forwardRef<HTMLLegendElement, LegendProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : "legend";

    return <Comp ref={ref} className={legendVariants({className})} data-slot="legend" {...props} />;
  },
);

Legend.displayName = "HeroUI.Legend";

/* -------------------------------------------------------------------------------------------------
 * FieldGroup
 * -----------------------------------------------------------------------------------------------*/

interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement>, FieldGroupVariants {
  asChild?: boolean;
}

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({asChild = false, className, spacing, ...props}, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={fieldGroupVariants({spacing, className})}
        data-slot="control"
        {...props}
      />
    );
  },
);

FieldGroup.displayName = "HeroUI.FieldGroup";

/* -------------------------------------------------------------------------------------------------
 * Field
 * -----------------------------------------------------------------------------------------------*/

interface FieldProps extends React.HTMLAttributes<HTMLDivElement>, FieldVariants {
  asChild?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({asChild = false, className, variant, ...props}, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={fieldVariants({variant, className})}
        data-slot="field"
        {...props}
      />
    );
  },
);

Field.displayName = "HeroUI.Field";

/* -------------------------------------------------------------------------------------------------
 * FieldError
 * -----------------------------------------------------------------------------------------------*/

interface FieldErrorProps extends FieldErrorPrimitiveProps, FieldErrorVariants {
  ref?: React.Ref<HTMLElement>;
}

const FieldError = React.forwardRef<React.ElementRef<typeof FieldErrorPrimitive>, FieldErrorProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <FieldErrorPrimitive
        ref={ref}
        data-visible
        className={composeTwRenderProps(className, fieldErrorVariants())}
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </FieldErrorPrimitive>
    );
  },
);

FieldError.displayName = "HeroUI.FieldError";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export {
  Fieldset,
  Legend,
  FieldGroup,
  Field,
  FieldError,
  type FieldsetProps,
  type LegendProps,
  type FieldGroupProps,
  type FieldProps,
  type FieldErrorProps,
};

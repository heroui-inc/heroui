"use client";

import type {
  DescriptionVariants,
  FieldErrorVariants,
  FieldGroupVariants,
  FieldVariants,
  FieldsetVariants,
  LabelVariants,
  LegendVariants,
} from "./field.styles";
import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps as GroupPrimitiveProps,
  InputProps as InputPrimitiveProps,
  LabelProps as LabelPrimitiveProps,
  TextAreaProps as TextAreaPrimitiveProps,
  TextProps as TextPrimitiveProps,
} from "react-aria-components";

import {Slot} from "@radix-ui/react-slot";
import React from "react";
import {
  FieldError as FieldErrorPrimitive,
  Group as GroupPrimitive,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  TextArea as TextAreaPrimitive,
  Text as TextPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {
  descriptionVariants,
  fieldErrorVariants,
  fieldGroupVariants,
  fieldVariants,
  fieldsetVariants,
  labelVariants,
  legendVariants,
} from "./field.styles";

/* -------------------------------------------------------------------------------------------------
 * Fieldset
 * -----------------------------------------------------------------------------------------------*/

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement>, FieldsetVariants {
  ref?: React.Ref<HTMLFieldSetElement>;
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
  ref?: React.Ref<HTMLLegendElement>;
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
 * Label
 * -----------------------------------------------------------------------------------------------*/

interface LabelProps extends LabelPrimitiveProps, LabelVariants {
  ref?: React.Ref<HTMLLabelElement>;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({children, className, isDisabled, isRequired, ...rest}, ref) => {
    return (
      <LabelPrimitive
        ref={ref}
        className={labelVariants({isRequired, isDisabled, className})}
        data-slot="field-label"
        {...rest}
      >
        {children}
      </LabelPrimitive>
    );
  },
);

FieldLabel.displayName = "HeroUI.Label";

/* -------------------------------------------------------------------------------------------------
 * Description
 * -----------------------------------------------------------------------------------------------*/

interface DescriptionProps extends TextPrimitiveProps, DescriptionVariants {
  ref?: React.Ref<HTMLElement>;
}

const FieldDescription = React.forwardRef<HTMLElement, DescriptionProps>(
  ({children, className, isDisabled, ...rest}, ref) => {
    return (
      <TextPrimitive
        ref={ref}
        className={descriptionVariants({isDisabled, className})}
        data-slot="field-description"
        slot="description"
        {...rest}
      >
        {children}
      </TextPrimitive>
    );
  },
);

FieldDescription.displayName = "HeroUI.Description";

/* -------------------------------------------------------------------------------------------------
 * Field
 * -----------------------------------------------------------------------------------------------*/

interface FieldProps extends React.HTMLAttributes<HTMLDivElement>, FieldVariants {
  ref?: React.Ref<HTMLDivElement>;
  asChild?: boolean;
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldProps>(
  ({asChild = false, className, ...rest}, ref) => {
    const Comp = asChild ? Slot : "div";

    return <Comp ref={ref} className={fieldVariants({className})} data-slot="field" {...rest} />;
  },
);

FieldRoot.displayName = "HeroUI.Field";

/* -------------------------------------------------------------------------------------------------
 * FieldGroup
 * -----------------------------------------------------------------------------------------------*/

interface FieldGroupProps extends GroupPrimitiveProps, FieldGroupVariants {
  ref?: React.Ref<HTMLDivElement>;
}

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({className, ...rest}, ref) => {
    return (
      <GroupPrimitive
        ref={ref}
        className={composeTwRenderProps(className, fieldGroupVariants({}))}
        data-slot="field-group"
        {...rest}
      />
    );
  },
);

FieldGroup.displayName = "HeroUI.FieldGroup";

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
        data-slot="field-error"
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </FieldErrorPrimitive>
    );
  },
);

FieldError.displayName = "HeroUI.FieldError";

/* -------------------------------------------------------------------------------------------------
 * FieldInput
 * -----------------------------------------------------------------------------------------------*/

interface FieldInputProps extends InputPrimitiveProps {
  ref?: React.Ref<HTMLInputElement>;
}

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  ({className, ...rest}, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        className={composeTwRenderProps(className, "")}
        data-slot="field-input"
        {...rest}
      />
    );
  },
);

FieldInput.displayName = "HeroUI.Field.Input";

/* -------------------------------------------------------------------------------------------------
 * FieldTextArea
 * -----------------------------------------------------------------------------------------------*/

interface FieldTextAreaProps extends TextAreaPrimitiveProps {
  ref?: React.Ref<HTMLTextAreaElement>;
}

const FieldTextArea = React.forwardRef<HTMLTextAreaElement, FieldTextAreaProps>(
  ({className, ...rest}, ref) => {
    return (
      <TextAreaPrimitive
        ref={ref}
        className={composeTwRenderProps(className, "")}
        data-slot="field-textarea"
        {...rest}
      />
    );
  },
);

FieldTextArea.displayName = "HeroUI.Field.TextArea";

/* -------------------------------------------------------------------------------------------------
 * Compound exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundField = Object.assign(FieldRoot, {
  Group: FieldGroup,
  Error: FieldError,
  Input: FieldInput,
  Label: FieldLabel,
  TextArea: FieldTextArea,
  Description: FieldDescription,
  Fieldset,
  Legend,
});

export {
  CompoundField as Field,
  Fieldset,
  Legend,
  FieldError,
  FieldGroup,
  FieldInput,
  FieldTextArea,
  FieldLabel as Label,
  FieldDescription as Description,
};

type FieldLabelProps = LabelProps;
type FieldDescriptionProps = DescriptionProps;

export type {
  FieldProps,
  FieldGroupProps,
  FieldErrorProps,
  FieldInputProps,
  FieldTextAreaProps,
  FieldsetProps,
  LegendProps,
  LabelProps,
  DescriptionProps,
  FieldLabelProps,
  FieldDescriptionProps,
};

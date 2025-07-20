"use client";

import type {TextFieldVariants} from "./text-field.styles";
import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  InputProps as InputPrimitiveProps,
  LabelProps as LabelPrimitiveProps,
  TextAreaProps as TextAreaPrimitiveProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps as TextPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  FieldError as FieldErrorPrimitive,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  TextArea as TextAreaPrimitive,
  TextField as TextFieldPrimitive,
  Text as TextPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {textFieldVariants} from "./text-field.styles";

/* -------------------------------------------------------------------------------------------------
 * TextField Context
 * -----------------------------------------------------------------------------------------------*/

interface TextFieldContext {
  slots?: ReturnType<typeof textFieldVariants>;
}

const TextFieldContext = createContext<TextFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * TextField
 * -----------------------------------------------------------------------------------------------*/

interface TextFieldRootProps extends TextFieldPrimitiveProps, TextFieldVariants {}

const TextFieldRoot = React.forwardRef<
  React.ElementRef<typeof TextFieldPrimitive>,
  TextFieldRootProps
>(({children, className, isDisabled, isInvalid, ...props}, ref) => {
  const slots = React.useMemo(
    () => textFieldVariants({isDisabled, isInvalid}),
    [isDisabled, isInvalid],
  );

  return (
    <TextFieldContext.Provider value={{slots}}>
      <TextFieldPrimitive
        ref={ref}
        data-text-field
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </TextFieldPrimitive>
    </TextFieldContext.Provider>
  );
});

TextFieldRoot.displayName = "HeroUI.TextField";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldLabelProps extends LabelPrimitiveProps {
  isRequired?: boolean;
}

const TextFieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive>,
  TextFieldLabelProps
>(({children, className, isRequired, ...props}, ref) => {
  const {slots} = useContext(TextFieldContext);

  return (
    <div data-text-field-label-wrapper className={slots?.labelWrapper()}>
      <LabelPrimitive
        ref={ref}
        data-text-field-label
        {...props}
        className={slots?.label({className})}
      >
        {children}
      </LabelPrimitive>
      {!!isRequired && (
        <span data-text-field-required className={slots?.required()}>
          *
        </span>
      )}
    </div>
  );
});

TextFieldLabel.displayName = "HeroUI.TextField.Label";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldInputProps extends InputPrimitiveProps {}

const TextFieldInput = React.forwardRef<
  React.ElementRef<typeof InputPrimitive>,
  TextFieldInputProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(TextFieldContext);

  return (
    <div data-text-field-input-wrapper className={slots?.inputWrapper()}>
      <InputPrimitive
        ref={ref}
        data-text-field-input
        {...props}
        className={composeTwRenderProps(className, slots?.input())}
      />
    </div>
  );
});

TextFieldInput.displayName = "HeroUI.TextField.Input";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldTextAreaProps extends TextAreaPrimitiveProps {}

const TextFieldTextArea = React.forwardRef<
  React.ElementRef<typeof TextAreaPrimitive>,
  TextFieldTextAreaProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(TextFieldContext);

  return (
    <div data-text-field-textarea-wrapper className={slots?.inputWrapper()}>
      <TextAreaPrimitive
        ref={ref}
        data-text-field-textarea
        {...props}
        className={composeTwRenderProps(className, slots?.textarea())}
      />
    </div>
  );
});

TextFieldTextArea.displayName = "HeroUI.TextField.TextArea";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldDescriptionProps extends TextPrimitiveProps {}

const TextFieldDescription = React.forwardRef<
  React.ElementRef<typeof TextPrimitive>,
  TextFieldDescriptionProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(TextFieldContext);

  return (
    <TextPrimitive
      ref={ref}
      data-text-field-description
      slot="description"
      {...props}
      className={slots?.description({className}) as string}
    />
  );
});

TextFieldDescription.displayName = "HeroUI.TextField.Description";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldErrorProps extends FieldErrorPrimitiveProps {}

const TextFieldError = React.forwardRef<
  React.ElementRef<typeof FieldErrorPrimitive>,
  TextFieldErrorProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(TextFieldContext);

  return (
    <FieldErrorPrimitive
      ref={ref}
      data-text-field-error
      {...props}
      className={composeTwRenderProps(className, slots?.error())}
    >
      {(renderProps) =>
        typeof props.children === "function" ? props.children(renderProps) : props.children
      }
    </FieldErrorPrimitive>
  );
});

TextFieldError.displayName = "HeroUI.TextField.Error";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundTextField = Object.assign(TextFieldRoot, {
  Label: TextFieldLabel,
  Input: TextFieldInput,
  TextArea: TextFieldTextArea,
  Description: TextFieldDescription,
  Error: TextFieldError,
});

export default CompoundTextField;

export type {
  TextFieldRootProps as TextFieldProps,
  TextFieldLabelProps,
  TextFieldInputProps,
  TextFieldTextAreaProps,
  TextFieldDescriptionProps,
  TextFieldErrorProps,
};

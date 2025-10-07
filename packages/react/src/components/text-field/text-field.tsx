"use client";

import type {TextFieldVariants} from "./text-field.styles";
import type {DescriptionProps} from "../description";
import type {FieldErrorProps} from "../field";
import type {InputProps} from "../input";
import type {LabelProps} from "../label";
import type {
  TextFieldProps as TextFieldPrimitiveProps,
  TextFieldRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {Description} from "../description";
import {FieldError} from "../field";
import {Input} from "../input";
import {Label} from "../label";

import {textFieldVariants} from "./text-field.styles";

const TextFieldContext = createContext<TextFieldRenderProps>({
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
});

/* -------------------------------------------------------------------------------------------------
 * TextField
 * -----------------------------------------------------------------------------------------------*/

interface TextFieldRootProps extends TextFieldPrimitiveProps, TextFieldVariants {}

const TextFieldRoot = React.forwardRef<
  React.ElementRef<typeof TextFieldPrimitive>,
  TextFieldRootProps
>(({children, className, ...props}, ref) => {
  const styles = React.useMemo(() => textFieldVariants({}), []);

  return (
    <TextFieldPrimitive
      ref={ref}
      data-slot="text-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => (
        <TextFieldContext.Provider value={values}>
          {typeof children === "function" ? children(values) : children}
        </TextFieldContext.Provider>
      )}
    </TextFieldPrimitive>
  );
});

TextFieldRoot.displayName = "HeroUI.TextField";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldLabelProps extends LabelProps {}

const TextFieldLabel = React.forwardRef<React.ElementRef<typeof Label>, TextFieldLabelProps>(
  ({...props}, ref) => {
    const {isDisabled, isInvalid, isRequired} = useContext(TextFieldContext);

    return (
      <Label
        ref={ref}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        {...props}
      >
        {props.children}
      </Label>
    );
  },
);

TextFieldLabel.displayName = "HeroUI.TextField.Label";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldInputProps extends InputProps {}

const TextFieldInput = Input;

TextFieldInput.displayName = "HeroUI.TextField.Input";

/* -----------------------------------------------------------------------------------------------*/

// TODO: Add TextArea

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldDescriptionProps extends DescriptionProps {}

const TextFieldDescription = Description;

TextFieldDescription.displayName = "HeroUI.TextField.Description";

/* -----------------------------------------------------------------------------------------------*/

interface TextFieldErrorProps extends FieldErrorProps {}

const TextFieldError = FieldError;

TextFieldError.displayName = "HeroUI.TextField.Error";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundTextField = Object.assign(TextFieldRoot, {
  Label: TextFieldLabel,
  Input: TextFieldInput,
  // TextArea: TextFieldTextArea, // TODO: Add TextArea
  Description: TextFieldDescription,
  Error: TextFieldError,
});

export default CompoundTextField;

export type {
  TextFieldRootProps as TextFieldProps,
  TextFieldLabelProps,
  TextFieldInputProps,
  TextFieldDescriptionProps,
  TextFieldErrorProps,
};

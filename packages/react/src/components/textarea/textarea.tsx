"use client";

import type {TextAreaVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {textAreaVariants} from "@heroui/styles";
import {memo, useContext, useMemo} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components/TextArea";

import {composeTwRenderProps} from "../../utils";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps
  extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = memo(function TextAreaRoot({
  className,
  fullWidth,
  variant,
  ...rest
}: TextAreaRootProps) {
  const textFieldContext = useContext(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;
  const styles = useMemo(
    () => textAreaVariants({fullWidth, variant: resolvedVariant}),
    [fullWidth, resolvedVariant],
  );

  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="textarea"
      {...rest}
    />
  );
});

TextAreaRoot.displayName = "HeroUI.TextArea";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};

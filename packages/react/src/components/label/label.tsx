"use client";

import type {LabelVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {labelVariants} from "@heroui/styles";
import {Label as LabelPrimitive} from "react-aria-components/Label";

/* -------------------------------------------------------------------------------------------------
 * Label Root
 * -----------------------------------------------------------------------------------------------*/
interface LabelRootProps extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

const LabelRoot = ({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => {
  return (
    <LabelPrimitive
      className={labelVariants({isRequired, isDisabled, isInvalid, className})}
      data-slot="label"
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
};

LabelRoot.displayName = "HeroUI.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps};

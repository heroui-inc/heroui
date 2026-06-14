"use client";

import type {LabelVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {labelVariants} from "@heroui/styles";
import {memo, useMemo} from "react";
import {Label as LabelPrimitive} from "react-aria-components/Label";

/* -------------------------------------------------------------------------------------------------
 * Label Root
 * -----------------------------------------------------------------------------------------------*/
interface LabelRootProps extends ComponentPropsWithRef<typeof LabelPrimitive>, LabelVariants {}

const LabelRoot = memo(function LabelRoot({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) {
  const styles = useMemo(
    () => labelVariants({isRequired, isDisabled, isInvalid, className}),
    [isRequired, isDisabled, isInvalid, className],
  );

  return (
    <LabelPrimitive className={styles} data-slot="label" {...rest}>
      {children}
    </LabelPrimitive>
  );
});

LabelRoot.displayName = "HeroUI.Label";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps};

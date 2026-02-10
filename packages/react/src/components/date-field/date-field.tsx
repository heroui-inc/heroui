"use client";

import type {DateFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components";

import {dateFieldVariants} from "@heroui/styles";
import React from "react";
import {DateField as DateFieldPrimitive} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * DateField Root
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateFieldPrimitive<T>>, DateFieldVariants {}

function DateFieldRoot<T extends DateValue>({
  children,
  className,
  fullWidth,
  ...props
}: DateFieldRootProps<T>) {
  const styles = React.useMemo(() => dateFieldVariants({fullWidth}), [fullWidth]);

  return (
    <DateFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="date-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </DateFieldPrimitive>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DateFieldRoot};

export type {DateFieldRootProps};

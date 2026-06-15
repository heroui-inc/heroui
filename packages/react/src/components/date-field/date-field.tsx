"use client";

import type {DateFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {dateFieldVariants} from "@heroui/styles";
import React, {memo, useMemo} from "react";
import {DateField as DateFieldPrimitive} from "react-aria-components/DateField";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * DateField Root
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateFieldPrimitive<T>>, DateFieldVariants {}

function DateFieldRootInner<T extends DateValue>({
  children,
  className,
  fullWidth,
  ...props
}: DateFieldRootProps<T>) {
  const styles = useMemo(() => dateFieldVariants({fullWidth}), [fullWidth]);

  return (
    <DateFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="date-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {typeof children === "function" ? (values) => children(values) : children}
    </DateFieldPrimitive>
  );
}

DateFieldRootInner.displayName = "HeroUI.DateField";

const DateFieldRoot = memo(DateFieldRootInner) as <T extends DateValue>(
  props: DateFieldRootProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DateFieldRoot};

export type {DateFieldRootProps};

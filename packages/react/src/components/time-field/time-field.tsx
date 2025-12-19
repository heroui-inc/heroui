"use client";

import type {TimeFieldVariants} from "./time-field.styles";
import type {ComponentPropsWithRef} from "react";
import type {TimeValue} from "react-aria-components";

import React from "react";
import {TimeField as TimeFieldPrimitive} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";

import {timeFieldVariants} from "./time-field.styles";

/* -------------------------------------------------------------------------------------------------
 * TimeField Root
 * -----------------------------------------------------------------------------------------------*/
interface TimeFieldRootProps<T extends TimeValue>
  extends ComponentPropsWithRef<typeof TimeFieldPrimitive<T>>, TimeFieldVariants {}

function TimeFieldRoot<T extends TimeValue>({
  children,
  className,
  fullWidth,
  ...props
}: TimeFieldRootProps<T>) {
  const styles = React.useMemo(() => timeFieldVariants({fullWidth}), [fullWidth]);

  return (
    <TimeFieldPrimitive
      data-required={dataAttr(props.isRequired)}
      data-slot="time-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </TimeFieldPrimitive>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TimeFieldRoot};

export type {TimeFieldRootProps};

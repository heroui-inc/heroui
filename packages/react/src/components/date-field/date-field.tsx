"use client";

import type {DateFieldVariants} from "./date-field.styles";
import type {ComponentPropsWithRef} from "react";
import type {
  DateInputProps as DateInputPrimitiveProps,
  DateSegmentProps as DateSegmentPrimitiveProps,
  DateValue,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment as DateSegmentPrimitive,
  Group as GroupPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {dateFieldVariants} from "./date-field.styles";

/* -------------------------------------------------------------------------------------------------
 * DateField Context
 * -----------------------------------------------------------------------------------------------*/
type DateFieldContext = {
  slots?: ReturnType<typeof dateFieldVariants>;
};

const DateFieldContext = createContext<DateFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * DateField Root
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateFieldPrimitive<T>>, DateFieldVariants {}

function DateFieldRoot<T extends DateValue>({
  children,
  className,
  isOnSurface,
  ...props
}: DateFieldRootProps<T>) {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  const slots = React.useMemo(
    () => dateFieldVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  return (
    <DateFieldContext value={{slots}}>
      <DateFieldPrimitive
        data-slot="date-field"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DateFieldPrimitive>
    </DateFieldContext>
  );
}

/* -------------------------------------------------------------------------------------------------
 * DateField Group
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const DateFieldGroup = ({children, className, ...props}: DateFieldGroupProps) => {
  const {slots} = useContext(DateFieldContext);

  return (
    <GroupPrimitive
      className={composeTwRenderProps(className, slots?.group())}
      data-slot="date-field-group"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </GroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateField Prefix
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldPrefixProps extends ComponentPropsWithRef<"div"> {}

const DateFieldPrefix = ({children, className, ...props}: DateFieldPrefixProps) => {
  const {slots} = useContext(DateFieldContext);

  return (
    <div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="date-field-prefix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateField Input
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldInputProps extends DateInputPrimitiveProps {
  isOnSurface?: boolean;
}

const DateFieldInput = ({className, isOnSurface, ...props}: DateFieldInputProps) => {
  const {slots} = useContext(DateFieldContext);
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <DateInputPrimitive
      className={composeTwRenderProps(className, slots?.input({isOnSurface: isOnSurfaceValue}))}
      data-slot="date-field-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateField Segment
 * -----------------------------------------------------------------------------------------------*/

interface DateFieldSegmentProps extends DateSegmentPrimitiveProps {
  className?: string;
}

const DateFieldSegment = ({className, segment, ...props}: DateFieldSegmentProps) => {
  const {slots} = useContext(DateFieldContext);

  return (
    <DateSegmentPrimitive
      className={composeSlotClassName(slots?.segment, className)}
      data-slot="date-field-segment"
      segment={segment}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateField Suffix
 * -----------------------------------------------------------------------------------------------*/
interface DateFieldSuffixProps extends ComponentPropsWithRef<"div"> {}

const DateFieldSuffix = ({children, className, ...props}: DateFieldSuffixProps) => {
  const {slots} = useContext(DateFieldContext);

  return (
    <div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="date-field-suffix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DateFieldRoot,
  DateFieldGroup,
  DateFieldInput,
  DateFieldSegment,
  DateFieldPrefix,
  DateFieldSuffix,
};

export type {
  DateFieldRootProps,
  DateFieldGroupProps,
  DateFieldInputProps,
  DateFieldSegmentProps,
  DateFieldPrefixProps,
  DateFieldSuffixProps,
};

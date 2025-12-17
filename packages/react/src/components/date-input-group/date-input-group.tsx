"use client";

import type {DateInputGroupVariants} from "./date-input-group.styles";
import type {ComponentPropsWithRef} from "react";
import type {
  DateInputProps as DateInputPrimitiveProps,
  DateSegmentProps as DateSegmentPrimitiveProps,
  DateInputProps as TimeInputPrimitiveProps,
  DateSegmentProps as TimeSegmentPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  DateInput as DateInputPrimitive,
  DateSegment as DateSegmentPrimitive,
  Group as GroupPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {dateInputGroupVariants} from "./date-input-group.styles";

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Context
 * -----------------------------------------------------------------------------------------------*/
type DateInputGroupContext = {
  slots?: ReturnType<typeof dateInputGroupVariants>;
};

const DateInputGroupContext = createContext<DateInputGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Root
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupRootProps
  extends ComponentPropsWithRef<typeof GroupPrimitive>, DateInputGroupVariants {}

const DateInputGroupRoot = ({
  children,
  className,
  isOnSurface,
  ...props
}: DateInputGroupRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  const slots = React.useMemo(
    () => dateInputGroupVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  return (
    <DateInputGroupContext value={{slots}}>
      <GroupPrimitive
        className={composeTwRenderProps(className, slots?.base())}
        data-slot="date-input-group"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </GroupPrimitive>
    </DateInputGroupContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Prefix
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupPrefixProps extends ComponentPropsWithRef<"div"> {}

const DateInputGroupPrefix = ({children, className, ...props}: DateInputGroupPrefixProps) => {
  const {slots} = useContext(DateInputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.prefix, className)}
      data-slot="date-input-group-prefix"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Input
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupInputProps
  extends
    DateInputPrimitiveProps,
    Partial<Omit<TimeInputPrimitiveProps, keyof DateInputPrimitiveProps>> {
  isOnSurface?: boolean;
}

const DateInputGroupInput = ({className, isOnSurface, ...props}: DateInputGroupInputProps) => {
  const {slots} = useContext(DateInputGroupContext);
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  // TimeInput and DateInput have compatible interfaces
  // React Aria Components will handle the correct primitive based on parent context (TimeField vs DateField)
  // We use DateInputPrimitive as the default, but it will work with TimeField context
  return (
    <DateInputPrimitive
      className={composeTwRenderProps(className, slots?.input({isOnSurface: isOnSurfaceValue}))}
      data-slot="date-input-group-input"
      {...(props as DateInputPrimitiveProps)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Segment
 * -----------------------------------------------------------------------------------------------*/

interface DateInputGroupSegmentProps
  extends
    DateSegmentPrimitiveProps,
    Partial<Omit<TimeSegmentPrimitiveProps, keyof DateSegmentPrimitiveProps>> {
  className?: string;
}

const DateInputGroupSegment = ({className, segment, ...props}: DateInputGroupSegmentProps) => {
  const {slots} = useContext(DateInputGroupContext);

  // TimeSegment and DateSegment have compatible interfaces
  // React Aria Components will handle the correct primitive based on parent context
  // We use DateSegmentPrimitive as the default, but it will work with TimeField context
  return (
    <DateSegmentPrimitive
      className={composeSlotClassName(slots?.segment, className)}
      data-slot="date-input-group-segment"
      segment={segment}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * DateInputGroup Suffix
 * -----------------------------------------------------------------------------------------------*/
interface DateInputGroupSuffixProps extends ComponentPropsWithRef<"div"> {}

const DateInputGroupSuffix = ({children, className, ...props}: DateInputGroupSuffixProps) => {
  const {slots} = useContext(DateInputGroupContext);

  return (
    <div
      className={composeSlotClassName(slots?.suffix, className)}
      data-slot="date-input-group-suffix"
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
  DateInputGroupRoot,
  DateInputGroupInput,
  DateInputGroupSegment,
  DateInputGroupPrefix,
  DateInputGroupSuffix,
};

export type {
  DateInputGroupRootProps,
  DateInputGroupInputProps,
  DateInputGroupSegmentProps,
  DateInputGroupPrefixProps,
  DateInputGroupSuffixProps,
};

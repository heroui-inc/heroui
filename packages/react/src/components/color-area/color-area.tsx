"use client";

import type {ColorAreaVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";

import {colorAreaVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  ColorArea as ColorAreaPrimitive,
  ColorThumb as ColorThumbPrimitive,
} from "react-aria-components/ColorArea";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorArea Context
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaContext {
  thumbClassName?: string;
}

const ColorAreaContext = createContext<ColorAreaContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorArea Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaRootProps
  extends ComponentPropsWithRef<typeof ColorAreaPrimitive>, ColorAreaVariants {}

const ColorAreaRoot = memo(function ColorAreaRoot({
  children,
  className,
  showDots,
  style,
  ...props
}: ColorAreaRootProps) {
  const slots = useMemo(() => colorAreaVariants({showDots}), [showDots]);
  const contextValue = useMemo<ColorAreaContext>(
    () => ({
      thumbClassName: slots.thumb(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <ColorAreaContext value={contextValue}>
      <ColorAreaPrimitive
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
        data-slot="color-area"
        style={(renderProps) => {
          const userStyle = typeof style === "function" ? style(renderProps) : style;

          return {
            "--color-area-background": renderProps.defaultStyle.background,
            ...userStyle,
          } as CSSProperties;
        }}
      >
        {children}
      </ColorAreaPrimitive>
    </ColorAreaContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ColorArea Thumb
 * -----------------------------------------------------------------------------------------------*/
interface ColorAreaThumbProps extends ComponentPropsWithRef<typeof ColorThumbPrimitive> {}

const ColorAreaThumb = memo(function ColorAreaThumb({
  className,
  style,
  ...props
}: ColorAreaThumbProps) {
  const {thumbClassName} = useContext(ColorAreaContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, thumbClassName),
    [className, thumbClassName],
  );

  return (
    <ColorThumbPrimitive
      className={resolvedClassName}
      data-slot="color-area-thumb"
      style={(renderProps) => {
        const userStyle = typeof style === "function" ? style(renderProps) : style;

        return {
          "--color-area-thumb-color": renderProps.defaultStyle.backgroundColor,
          ...userStyle,
        } as CSSProperties;
      }}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorAreaRoot, ColorAreaThumb};

export type {ColorAreaRootProps, ColorAreaThumbProps};

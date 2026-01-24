"use client";

import type {ColorSwatchVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";

import {colorSwatchVariants} from "@heroui/styles";
import {ColorSwatch as ColorSwatchPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorSwatch Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchRootProps
  extends ComponentPropsWithRef<typeof ColorSwatchPrimitive>, ColorSwatchVariants {}

const ColorSwatchRoot = ({className, shape, size, style, ...props}: ColorSwatchRootProps) => {
  return (
    <ColorSwatchPrimitive
      {...props}
      className={composeTwRenderProps(className, colorSwatchVariants({shape, size}))}
      data-slot="color-swatch"
      style={(renderProps) => {
        const userStyle = typeof style === "function" ? style(renderProps) : style;

        return {
          "--color-swatch-current": renderProps.color.toString("css"),
          ...userStyle,
        } as CSSProperties;
      }}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorSwatchRoot};

export type {ColorSwatchRootProps};

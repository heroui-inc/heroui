"use client";

import type {CloseButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {closeButtonVariants} from "@heroui/styles";
import {useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {CloseIcon} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Close Button Root
 * -----------------------------------------------------------------------------------------------*/
interface CloseButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, CloseButtonVariants {}

const CloseButtonRoot = ({
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonRootProps) => {
  const styles = useMemo(() => closeButtonVariants({variant}), [variant]);

  return (
    <ButtonPrimitive
      aria-label="Close"
      className={composeTwRenderProps(className, styles)}
      data-slot="close-button"
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) =>
        typeof children === "function"
          ? children(renderProps)
          : (children ?? <CloseIcon data-slot="close-button-icon" />)
      }
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CloseButtonRoot};

export type {CloseButtonRootProps};

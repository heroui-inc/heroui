"use client";

import type {CloseButtonVariants} from "./close-button.styles";
import type {ComponentPropsWithRef} from "react";

import {useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {CloseIcon} from "../icons";

import {closeButtonVariants} from "./close-button.styles";

/* -------------------------------------------------------------------------------------------------
 * Close Button Root
 * -----------------------------------------------------------------------------------------------*/
type CloseButtonRootProps = ComponentPropsWithRef<typeof ButtonPrimitive> & CloseButtonVariants;

const CloseButtonRoot = ({
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonRootProps) => {
  const styles = useMemo(
    () =>
      closeButtonVariants({
        variant,
        className: typeof className === "string" ? className : undefined,
      }),
    [variant, className],
  );

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

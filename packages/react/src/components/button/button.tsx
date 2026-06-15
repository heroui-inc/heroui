"use client";

import type {ButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {buttonVariants} from "@heroui/styles";
import {Children, Fragment, cloneElement, isValidElement, useContext} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {composeTwRenderProps} from "../../utils";
import {BUTTON_GROUP_CHILD, ButtonGroupContext} from "../button-group";

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

const wrapTextNodes = (node: ReactNode): ReactNode =>
  Children.map(node, (child) => {
    if (typeof child === "string") {
      return child.trim() === "" ? child : <span>{child}</span>;
    }

    if (typeof child === "number") {
      return <span>{child}</span>;
    }

    if (isValidElement<{children?: ReactNode}>(child) && child.type === Fragment) {
      return cloneElement(child, undefined, wrapTextNodes(child.props.children));
    }

    return child;
  });

const ButtonRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  isIconOnly,
  isPending,
  size,
  slot,
  style,
  variant,
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  ...rest
}: ButtonRootProps) => {
  const buttonGroupContext = useContext(ButtonGroupContext);

  // Only use context if this button is a direct child of ButtonGroup
  const shouldUseContext = isButtonGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
  const finalVariant = variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
  const finalIsDisabled =
    isDisabled ?? (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
  const finalFullWidth =
    fullWidth ?? (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

  const hasPendingState = typeof isPending === "boolean";

  const styles = buttonVariants({
    fullWidth: finalFullWidth,
    isIconOnly,
    size: finalSize,
    variant: finalVariant,
  });

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="button"
      isDisabled={finalIsDisabled}
      isPending={isPending}
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) => {
        const renderedChildren = typeof children === "function" ? children(renderProps) : children;

        if (!hasPendingState) {
          return renderedChildren;
        }

        return wrapTextNodes(renderedChildren);
      }}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps};

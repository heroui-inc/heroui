import type {ButtonVariants} from "./button.styles";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import React from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {buttonVariants} from "./button.styles";

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
}

const Button = React.forwardRef<React.ElementRef<typeof ButtonPrimitive>, ButtonProps>(
  ({children, className, variant, ...rest}, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        className={composeTwRenderProps(className, buttonVariants({variant}))}
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "HeroUI.Button";

export type {ButtonProps};
export {Button};

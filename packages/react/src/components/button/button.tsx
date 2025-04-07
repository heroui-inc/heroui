import type {ButtonVariants} from "./button.style";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {useMemo} from "react";
import {Button as ButtonPrimitive, composeRenderProps} from "react-aria-components";

import {buttonVariants} from "./button.style";

export interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({children, className, ref, variant, ...rest}: ButtonProps) => {
  const _className = useMemo(() => {
    return composeRenderProps(className, (className, renderProps) => {
      return buttonVariants({...renderProps, className, variant});
    });
  }, [className, variant]);

  return (
    <ButtonPrimitive ref={ref} className={_className} {...rest}>
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </ButtonPrimitive>
  );
};

Button.displayName = "HeroUI.Button";

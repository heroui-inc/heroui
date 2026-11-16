"use client";

import type {ButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {buttonVariants} from "@heroui/styles";
import {use, useMemo, useRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {useResolvedClassName} from "../../utils";
import {BUTTON_GROUP_CHILD, ButtonGroupContext} from "../button-group";

/* -------------------------------------------------------------------------------------------------
 * Native activation click
 * -----------------------------------------------------------------------------------------------*/
type ButtonPrimitiveProps = ComponentPropsWithRef<typeof ButtonPrimitive>;
type ButtonClickEvent = Parameters<NonNullable<ButtonPrimitiveProps["onClick"]>>[0];
type ButtonClickCaptureEvent = Parameters<NonNullable<ButtonPrimitiveProps["onClickCapture"]>>[0];
type ButtonKeyboardEvent = Parameters<NonNullable<ButtonPrimitiveProps["onKeyDown"]>>[0];

interface UseNativeActivationClickProps {
  isPending?: boolean;
  onClick?: ButtonPrimitiveProps["onClick"];
  onClickCapture?: ButtonPrimitiveProps["onClickCapture"];
  onKeyDown?: ButtonPrimitiveProps["onKeyDown"];
  onKeyUp?: ButtonPrimitiveProps["onKeyUp"];
  type?: ButtonPrimitiveProps["type"];
}

/**
 * React Aria's `usePress` does not keep `onClick` in step with the browser's native activation
 * for `submit` / `reset` buttons (whose keyboard default actions it leaves alone):
 * - Enter: the native click (and form submit) happens on keydown, but `onClick` fires on keyup.
 * - Space: `onClick` fires on keyup *and* again for the native click that follows it.
 *
 * For those buttons, call `onClick` exactly once, for the native click event, so it runs before
 * the form's default action like a native `<button type="submit">`.
 */
const useNativeActivationClick = ({
  isPending,
  onClick,
  onClickCapture,
  onKeyDown,
  onKeyUp,
  type,
}: UseNativeActivationClickProps) => {
  const isEnterDownRef = useRef(false);
  const currentClickRef = useRef<Event | null>(null);
  const handledClickRef = useRef<Event | null>(null);

  if (!onClick || isPending || (type !== "submit" && type !== "reset")) {
    return {onClick, onClickCapture, onKeyDown, onKeyUp};
  }

  const callOnce = (e: ButtonClickEvent) => {
    if (handledClickRef.current === e.nativeEvent) return;
    handledClickRef.current = e.nativeEvent;
    onClick(e);
  };

  return {
    onClick: (e: ButtonClickEvent) => {
      // Skip the synthetic click usePress dispatches on keyup; only the native click counts.
      if (e.nativeEvent !== currentClickRef.current) return;
      callOnce(e);
    },
    onClickCapture: (e: ButtonClickCaptureEvent) => {
      onClickCapture?.(e);
      currentClickRef.current = e.nativeEvent;

      // usePress ignores the native click during a keyboard press, so handle it here.
      if (isEnterDownRef.current) {
        isEnterDownRef.current = false;
        callOnce(e);
      }
    },
    onKeyDown: (e: ButtonKeyboardEvent) => {
      if (e.key === "Enter") isEnterDownRef.current = true;
      onKeyDown?.(e);
    },
    onKeyUp: (e: ButtonKeyboardEvent) => {
      if (e.key === "Enter") isEnterDownRef.current = false;
      onKeyUp?.(e);
    },
  };
};

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

const ButtonRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  isIconOnly,
  isPending,
  onClick,
  onClickCapture,
  onKeyDown,
  onKeyUp,
  size,
  slot,
  style,
  variant,
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  ...rest
}: ButtonRootProps) => {
  const buttonGroupContext = use(ButtonGroupContext);

  // Only use context if this button is a direct child of ButtonGroup
  const shouldUseContext = isButtonGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
  const finalVariant = variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
  const finalIsDisabled =
    isDisabled ?? (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
  const finalFullWidth =
    fullWidth ?? (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

  const styles = useMemo(
    () =>
      buttonVariants({
        fullWidth: finalFullWidth,
        isIconOnly,
        size: finalSize,
        variant: finalVariant,
      }),
    [finalFullWidth, finalSize, finalVariant, isIconOnly],
  );
  const resolvedClassName = useResolvedClassName(className, styles);
  const clickHandlers = useNativeActivationClick({
    isPending,
    onClick,
    onClickCapture,
    onKeyDown,
    onKeyUp,
    type: rest.type,
  });

  return (
    <ButtonPrimitive
      className={resolvedClassName}
      data-slot="button"
      isDisabled={finalIsDisabled}
      isPending={isPending}
      slot={slot}
      style={style}
      {...rest}
      {...clickHandlers}
    >
      {children}
    </ButtonPrimitive>
  );
};

ButtonRoot.displayName = "HeroUI.Button";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps};

"use client";

import type {ButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {buttonVariants} from "@heroui/styles";
import {use, useEffect, useMemo, useRef} from "react";
import {ButtonContext, Button as ButtonPrimitive} from "react-aria-components/Button";
import {useSlottedContext} from "react-aria-components/slots";

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

interface KeyboardPress {
  /** Whether the browser's native activation click for this press has been seen. */
  clicked: boolean;
  key: "Enter" | " ";
}

/**
 * React Aria's `usePress` does not keep `onClick` in step with the browser's native activation
 * for `submit` / `reset` buttons (whose keyboard default actions it leaves alone):
 * - Enter: the native click (and form submit) happens on keydown, but `onClick` fires on keyup.
 * - Space: `onClick` fires on keyup *and* again for the native click that follows it.
 *
 * For those buttons, keyboard activation calls `onClick` exactly once, for the native click, in
 * the capture phase so it runs before the form's default action like a native
 * `<button type="submit">`. Pointer and virtual clicks still reach `onClick` through `usePress`.
 *
 * If the native click never comes (its key event's default action was prevented), the synthetic
 * click `usePress` dispatches on keyup is used instead, so `onClick` stays in step with `onPress`.
 *
 * Relies on `usePress` (react-aria 3.53) dispatching that keyup click as an event the browser never
 * fires; `button.browser.test.tsx` covers the real event order.
 */
const useNativeActivationClick = ({
  isPending,
  onClick,
  onClickCapture,
  onKeyDown,
  onKeyUp,
  type,
}: UseNativeActivationClickProps) => {
  const pressRef = useRef<KeyboardPress | null>(null);
  const currentClickRef = useRef<Event | null>(null);
  const handledClickRef = useRef<Event | null>(null);
  const fallbackClickRef = useRef<ButtonClickEvent | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    },
    [],
  );

  if (!onClick || isPending || (type !== "submit" && type !== "reset")) {
    return {onClick, onClickCapture, onKeyDown, onKeyUp};
  }

  const callOnce = (e: ButtonClickEvent) => {
    if (handledClickRef.current === e.nativeEvent) return;
    handledClickRef.current = e.nativeEvent;
    onClick(e);
  };

  // Space activates after keyup, so wait for the browser's click before ending the press.
  const settle = (fallback?: ButtonClickEvent) => {
    if (fallback) fallbackClickRef.current = fallback;
    if (settleTimerRef.current) return;

    settleTimerRef.current = setTimeout(() => {
      const press = pressRef.current;
      const fallbackClick = fallbackClickRef.current;

      settleTimerRef.current = null;
      fallbackClickRef.current = null;
      pressRef.current = null;
      if (fallbackClick && !press?.clicked) callOnce(fallbackClick);
    });
  };

  return {
    onClick: (e: ButtonClickEvent) => {
      // A real click (pointer, virtual, or a keyboard click already handled in capture).
      if (e.nativeEvent === currentClickRef.current) {
        callOnce(e);

        return;
      }

      // The synthetic click usePress dispatches on keyup.
      const press = pressRef.current;

      if (press?.clicked) {
        pressRef.current = null;
      } else if (press?.key === " ") {
        settle(e);
      } else {
        // Enter's native click would already have happened on keydown, so it was prevented.
        pressRef.current = null;
        callOnce(e);
      }
    },
    onClickCapture: (e: ButtonClickCaptureEvent) => {
      onClickCapture?.(e);
      currentClickRef.current = e.nativeEvent;

      // usePress ignores the native click during a keyboard press, so handle it here. Keyboard
      // activation clicks have `detail === 0`, so a stale press can never claim a pointer click.
      const press = pressRef.current;

      if (press && e.detail === 0 && e.button === 0 && e.currentTarget.contains(e.target as Node)) {
        press.clicked = true;
        callOnce(e);
      }
    },
    onKeyDown: (e: ButtonKeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !e.repeat && e.target === e.currentTarget) {
        if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
        fallbackClickRef.current = null;
        pressRef.current = {clicked: false, key: e.key};
      }
      onKeyDown?.(e);
    },
    onKeyUp: (e: ButtonKeyboardEvent) => {
      if (pressRef.current?.key === e.key) settle();
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
  // RAC merges ButtonContext props inside the primitive; read them so context-set `type` /
  // `isPending` are seen here too (direct props win, as in RAC's mergeProps).
  const contextProps = useSlottedContext(ButtonContext, slot);
  const clickHandlers = useNativeActivationClick({
    isPending: isPending ?? contextProps?.isPending,
    onClick,
    onClickCapture,
    onKeyDown,
    onKeyUp,
    type: rest.type ?? contextProps?.type,
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

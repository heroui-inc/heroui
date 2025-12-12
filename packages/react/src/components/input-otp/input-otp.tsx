"use client";

import type {InputOTPVariants} from "./input-otp.styles";
import type {ComponentPropsWithRef} from "react";
import type {ValidationResult} from "react-aria-components";

import {OTPInput, OTPInputContext} from "input-otp";
import React, {createContext, useContext} from "react";
import {FieldErrorContext} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {SurfaceContext} from "../surface";

import {inputOTPVariants} from "./input-otp.styles";

/* -------------------------------------------------------------------------------------------------
 * Input OTP Context
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPContext {
  slots?: ReturnType<typeof inputOTPVariants>;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

const InputOTPContext = createContext<InputOTPContext>({
  isDisabled: false,
  isInvalid: false,
});

/* -------------------------------------------------------------------------------------------------
 * Input OTP Root
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPRootProps
  extends
    Omit<ComponentPropsWithRef<typeof OTPInput>, "disabled" | "containerClassName" | "render">,
    InputOTPVariants {
  isDisabled?: boolean;
  isInvalid?: boolean;
  validationErrors?: string[];
  validationDetails?: ValidityState;
  inputClassName?: string;
  children: React.ReactNode;
}

const InputOTPRoot = ({
  className,
  inputClassName,
  isDisabled = false,
  isInvalid = false,
  isOnSurface,
  validationDetails,
  validationErrors = [],
  ...props
}: InputOTPRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);
  const slots = React.useMemo(
    () => inputOTPVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  const validation = React.useMemo(
    () =>
      ({
        isInvalid,
        validationErrors,
        validationDetails,
      }) as ValidationResult,
    [isInvalid, validationErrors, validationDetails],
  );

  return (
    <InputOTPContext value={{slots, isDisabled, isInvalid}}>
      <FieldErrorContext value={validation}>
        <OTPInput
          // OTP Input package uses the `className` prop for the actual `input` element which is not visible to the user so no need to pass it to the base container
          className={slots.input({className: inputClassName})}
          containerClassName={slots.base({className})}
          data-disabled={dataAttr(isDisabled)}
          data-invalid={dataAttr(isInvalid)}
          data-slot="input-otp"
          disabled={isDisabled}
          {...props}
        />
      </FieldErrorContext>
    </InputOTPContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Input OTP Group
 * -----------------------------------------------------------------------------------------------*/

interface InputOTPGroupProps extends ComponentPropsWithRef<"div"> {}

const InputOTPGroup = ({className, ...props}: InputOTPGroupProps) => {
  const {slots} = useContext(InputOTPContext);

  return <div className={slots?.group({className})} data-slot="input-otp-group" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Input OTP Slot
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotProps extends ComponentPropsWithRef<"div"> {
  index: number;
}

const InputOTPSlot = ({className, index, ...props}: InputOTPSlotProps) => {
  const {isDisabled, isInvalid, slots} = useContext(InputOTPContext);

  const inputOTPContext = useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      {...props}
      className={slots?.slot({className})}
      data-active={dataAttr(isActive)}
      data-disabled={dataAttr(isDisabled)}
      data-filled={dataAttr(!!char)}
      data-invalid={dataAttr(isInvalid)}
      data-slot="input-otp-slot"
    >
      {char ? (
        <div className={slots?.slotValue()} data-slot="input-otp-slot-value">
          {char}
        </div>
      ) : null}
      {hasFakeCaret && isActive ? (
        <div className={slots?.caret()} data-slot="input-otp-caret" />
      ) : null}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Input OTP Separator
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSeparatorProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const InputOTPSeparator = ({className, ...props}: InputOTPSeparatorProps) => {
  const {slots} = useContext(InputOTPContext);

  return (
    <div className={slots?.separator({className})} data-slot="input-otp-separator" {...props} />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputOTPRoot, InputOTPGroup, InputOTPSlot, InputOTPSeparator};

export type {InputOTPRootProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps};

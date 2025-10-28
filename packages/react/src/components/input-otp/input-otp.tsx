"use client";

import type {InputOTPVariants} from "./input-otp.styles";
import type {ValidationResult} from "react-aria-components";

import {OTPInput, OTPInputContext} from "input-otp";
import React, {createContext, useContext} from "react";
import {FieldErrorContext} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";

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
  extends Omit<React.ComponentProps<typeof OTPInput>, "disabled" | "render">,
    InputOTPVariants {
  isDisabled?: boolean;
  isInvalid?: boolean;
  validationErrors?: string[];
  validationDetails?: ValidityState;
  children: React.ReactNode;
}

const InputOTPRoot = ({
  className,
  containerClassName,
  isDisabled = false,
  isInvalid = false,
  validationDetails,
  validationErrors = [],
  ...props
}: InputOTPRootProps) => {
  const slots = React.useMemo(() => inputOTPVariants(), []);

  const validation = React.useMemo(
    () =>
      ({
        isInvalid,
        validationErrors,
        validationDetails,
      }) as ValidationResult,
    [isInvalid],
  );

  return (
    <InputOTPContext value={{slots, isDisabled, isInvalid}}>
      <FieldErrorContext.Provider value={validation}>
        <OTPInput
          className={slots.base({className})}
          containerClassName={slots.container({className: containerClassName})}
          data-disabled={dataAttr(isDisabled)}
          data-invalid={dataAttr(isInvalid)}
          data-slot="input-otp"
          disabled={isDisabled}
          {...props}
        />
      </FieldErrorContext.Provider>
    </InputOTPContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Input OTP Group
 * -----------------------------------------------------------------------------------------------*/

interface InputOTPGroupProps extends React.ComponentProps<"div"> {}

const InputOTPGroup = ({className, ...props}: InputOTPGroupProps) => {
  const {slots} = useContext(InputOTPContext);

  return <div className={slots?.group({className})} data-slot="input-otp-group" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Input OTP Slot
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotProps extends React.ComponentProps<"div"> {
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
interface InputOTPSeparatorProps {
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

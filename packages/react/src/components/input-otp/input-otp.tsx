"use client";

import type {InputOTPVariants} from "./input-otp.styles";
import type {OTPInputProps} from "input-otp";

import {OTPInput} from "input-otp";
import React, {createContext, useContext} from "react";

import {inputOTPVariants} from "./input-otp.styles";
/* -------------------------------------------------------------------------------------------------
 * InputOTP Context
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPContext {
  slots?: ReturnType<typeof inputOTPVariants>;
}
const InputOTPContext = createContext<InputOTPContext>({});

/* -------------------------------------------------------------------------------------------------
 * InputOTP
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPProps extends Omit<OTPInputProps, "render">, InputOTPVariants {
  children?: React.ReactNode;
}
const InputOTP = ({children, className, isDisabled, isInvalid, ...props}: InputOTPProps) => {
  const slots = React.useMemo(
    () => inputOTPVariants({isDisabled, isInvalid}),
    [isDisabled, isInvalid],
  );

  return (
    <InputOTPContext.Provider value={{slots}}>
      <div className={slots.base({className})} data-slot="input-otp">
        <OTPInput
          disabled={isDisabled}
          {...props}
          containerClassName={slots.container()}
          render={({slots: otpSlots}) => (
            <>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === InputOTPGroup) {
                  return React.cloneElement(child as React.ReactElement<InputOTPGroupProps>, {
                    slots: otpSlots,
                  });
                }

                return child;
              })}
            </>
          )}
        />
      </div>
    </InputOTPContext.Provider>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotData {
  char?: string | null;
  isActive?: boolean;
  hasFakeCaret?: boolean;
}
interface InputOTPGroupProps {
  children?: React.ReactNode;
  className?: string;
  slots?: InputOTPSlotData[];
}
const InputOTPGroup = ({children, className, slots = [], ...props}: InputOTPGroupProps) => {
  const {slots: contextSlots} = useContext(InputOTPContext);

  return (
    <div className={contextSlots?.group({className})} data-slot="input-otp-group" {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === InputOTPSlot) {
          const slotData = slots[index];

          if (!slotData) return null;

          return React.cloneElement(child as React.ReactElement<InputOTPSlotProps>, {
            char: slotData.char ?? undefined,
            isActive: slotData.isActive,
            hasFakeCaret: slotData.hasFakeCaret,
            index,
          });
        }

        return child;
      })}
    </div>
  );
};

/* -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotProps {
  index?: number;
  char?: string;
  isActive?: boolean;
  hasFakeCaret?: boolean;
  className?: string;
}
const InputOTPSlot = ({char, className, hasFakeCaret, isActive, ...props}: InputOTPSlotProps) => {
  const {slots} = useContext(InputOTPContext);

  return (
    <div
      {...props}
      className={slots?.slot({className, isActive, isFilled: !!char})}
      data-active={isActive || undefined}
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

/* -----------------------------------------------------------------------------------------------*/
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

export {InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator};
export type {InputOTPProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps};

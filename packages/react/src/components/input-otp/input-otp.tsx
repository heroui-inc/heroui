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

interface InputOTPRootProps extends Omit<OTPInputProps, "render">, InputOTPVariants {
  children?: React.ReactNode;
}

const InputOTPRoot = React.forwardRef<HTMLInputElement, InputOTPRootProps>(
  ({children, className, isDisabled, isInvalid, ...props}, ref) => {
    const slots = React.useMemo(
      () => inputOTPVariants({isDisabled, isInvalid}),
      [isDisabled, isInvalid],
    );

    return (
      <InputOTPContext.Provider value={{slots}}>
        <div data-input-otp className={slots.base({className})}>
          <OTPInput
            ref={ref}
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
  },
);

InputOTPRoot.displayName = "HeroUI.InputOTP";

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

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({children, className, slots = []}, ref) => {
    const {slots: contextSlots} = useContext(InputOTPContext);

    return (
      <div ref={ref} data-input-otp-group className={contextSlots?.group({className})}>
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
  },
);

InputOTPGroup.displayName = "HeroUI.InputOTP.Group";

/* -----------------------------------------------------------------------------------------------*/

interface InputOTPSlotProps {
  index?: number;
  char?: string;
  isActive?: boolean;
  hasFakeCaret?: boolean;
  className?: string;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({char, className, hasFakeCaret, isActive, ...props}, ref) => {
    const {slots} = useContext(InputOTPContext);

    return (
      <div
        ref={ref}
        {...props}
        data-input-otp-slot
        className={slots?.slot({className, isActive, isFilled: !!char})}
        data-active={isActive || undefined}
      >
        {char ? (
          <div data-input-otp-slot-value className={slots?.slotValue()}>
            {char}
          </div>
        ) : null}
        {hasFakeCaret && isActive ? <div data-input-otp-caret className={slots?.caret()} /> : null}
      </div>
    );
  },
);

InputOTPSlot.displayName = "HeroUI.InputOTP.Slot";

/* -----------------------------------------------------------------------------------------------*/

interface InputOTPSeparatorProps {
  className?: string;
}

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(InputOTPContext);

    return (
      <div
        ref={ref}
        data-input-otp-separator
        className={slots?.separator({className})}
        {...props}
      />
    );
  },
);

InputOTPSeparator.displayName = "HeroUI.InputOTP.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundInputOTP = Object.assign(InputOTPRoot, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});

export type {
  InputOTPRootProps,
  InputOTPRootProps as InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
};

export default CompoundInputOTP;

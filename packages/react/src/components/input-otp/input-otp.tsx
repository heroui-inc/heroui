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
        <div className={slots.base({className})} data-slot="input-otp">
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
      <div ref={ref} className={contextSlots?.group({className})} data-slot="input-otp-group">
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
        className={slots?.separator({className})}
        data-slot="input-otp-separator"
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

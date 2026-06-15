"use client";

import type {InputOTPVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ValidationResult} from "react-aria-components/CheckboxGroup";

import {inputOTPVariants} from "@heroui/styles";
import {OTPInput, OTPInputContext} from "input-otp";
import React, {createContext, memo, useContext, useMemo} from "react";
import {FieldErrorContext} from "react-aria-components/FieldError";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Input OTP Context
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPContext {
  caretClassName?: string;
  groupClassName?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  separatorClassName?: string;
  slotClassName?: string;
  slotValueClassName?: string;
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

const InputOTPRoot = memo(function InputOTPRoot({
  className,
  inputClassName,
  isDisabled = false,
  isInvalid = false,
  validationDetails,
  validationErrors = [],
  variant,
  ...props
}: InputOTPRootProps) {
  const slots = useMemo(() => inputOTPVariants({variant}), [variant]);
  const contextValue = useMemo<InputOTPContext>(
    () => ({
      caretClassName: slots.caret(),
      groupClassName: slots.group(),
      isDisabled,
      isInvalid,
      separatorClassName: slots.separator(),
      slotClassName: slots.slot(),
      slotValueClassName: slots.slotValue(),
    }),
    [isDisabled, isInvalid, slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedInputClassName = useMemo(
    () => composeTwRenderProps(inputClassName, slots.input()) as string,
    [inputClassName, slots],
  );
  const resolvedContainerClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  const validation = useMemo(
    () =>
      ({
        isInvalid,
        validationErrors,
        validationDetails,
      }) as ValidationResult,
    [isInvalid, validationErrors, validationDetails],
  );

  return (
    <InputOTPContext value={contextValue}>
      <FieldErrorContext value={validation}>
        <OTPInput
          // OTP Input package uses the `className` prop for the actual `input` element which is not visible to the user so no need to pass it to the base container
          className={resolvedInputClassName}
          containerClassName={resolvedContainerClassName}
          data-disabled={dataAttr(isDisabled)}
          data-invalid={dataAttr(isInvalid)}
          data-slot="input-otp"
          disabled={isDisabled}
          {...props}
        />
      </FieldErrorContext>
    </InputOTPContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Input OTP Group
 * -----------------------------------------------------------------------------------------------*/

interface InputOTPGroupProps extends ComponentPropsWithRef<"div"> {}

const InputOTPGroup = memo(function InputOTPGroup({className, ...props}: InputOTPGroupProps) {
  const {groupClassName} = useContext(InputOTPContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, groupClassName) as string,
    [className, groupClassName],
  );

  return <div className={resolvedClassName} data-slot="input-otp-group" {...props} />;
});

/* -------------------------------------------------------------------------------------------------
 * Input OTP Slot
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotProps extends ComponentPropsWithRef<"div"> {
  index: number;
}

const InputOTPSlot = memo(function InputOTPSlot({className, index, ...props}: InputOTPSlotProps) {
  const {caretClassName, isDisabled, isInvalid, slotClassName, slotValueClassName} =
    useContext(InputOTPContext);

  const inputOTPContext = useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, slotClassName) as string,
    [className, slotClassName],
  );

  return (
    <div
      {...props}
      className={resolvedClassName}
      data-active={dataAttr(isActive)}
      data-disabled={dataAttr(isDisabled)}
      data-filled={dataAttr(!!char)}
      data-invalid={dataAttr(isInvalid)}
      data-slot="input-otp-slot"
    >
      {char ? (
        <div className={slotValueClassName} data-slot="input-otp-slot-value">
          {char}
        </div>
      ) : null}
      {hasFakeCaret && isActive ? (
        <div className={caretClassName} data-slot="input-otp-caret" />
      ) : null}
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Input OTP Separator
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSeparatorProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const InputOTPSeparator = memo(function InputOTPSeparator({
  className,
  ...props
}: InputOTPSeparatorProps) {
  const {separatorClassName} = useContext(InputOTPContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, separatorClassName) as string,
    [className, separatorClassName],
  );

  return <div className={resolvedClassName} data-slot="input-otp-separator" {...props} />;
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputOTPRoot, InputOTPGroup, InputOTPSlot, InputOTPSeparator};

export type {InputOTPRootProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps};

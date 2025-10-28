import type {ComponentProps} from "react";

import {InputOTPGroup, InputOTPRoot, InputOTPSeparator, InputOTPSlot} from "./input-otp";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const InputOTP = Object.assign(InputOTPRoot, {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});

export type InputOTP = {
  Props: ComponentProps<typeof InputOTPRoot>;
  RootProps: ComponentProps<typeof InputOTPRoot>;
  GroupProps: ComponentProps<typeof InputOTPGroup>;
  SlotProps: ComponentProps<typeof InputOTPSlot>;
  SeparatorProps: ComponentProps<typeof InputOTPSeparator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputOTPRoot, InputOTPGroup, InputOTPSlot, InputOTPSeparator};

export type {
  InputOTPRootProps,
  InputOTPRootProps as InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from "./input-otp";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputOTPVariants} from "./input-otp.styles";

export type {InputOTPVariants} from "./input-otp.styles";

//  ===================================
// 3rd party
//  ===================================
export {
  OTPInputContext,
  type OTPInputProps,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  type RenderProps,
  type SlotProps,
} from "input-otp";

import type {ComponentProps} from "react";

import {
  InputGroupInput,
  InputGroupPrefix,
  InputGroupRoot,
  InputGroupSuffix,
  InputGroupTextArea,
} from "./input-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  TextArea: InputGroupTextArea,
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
});

export type InputGroup = {
  Props: ComponentProps<typeof InputGroupRoot>;
  RootProps: ComponentProps<typeof InputGroupRoot>;
  InputProps: ComponentProps<typeof InputGroupInput>;
  TextAreaProps: ComponentProps<typeof InputGroupTextArea>;
  PrefixProps: ComponentProps<typeof InputGroupPrefix>;
  SuffixProps: ComponentProps<typeof InputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputGroupInput, InputGroupPrefix, InputGroupRoot, InputGroupSuffix, InputGroupTextArea};

export type {
  InputGroupRootProps,
  InputGroupRootProps as InputGroupProps,
  InputGroupInputProps,
  InputGroupTextAreaProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
} from "./input-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputGroupVariants} from "@heroui/styles";

export type {InputGroupVariants} from "@heroui/styles";

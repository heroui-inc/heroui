import type {ComponentProps} from "react";

import {InputGroupInput, InputGroupPrefix, InputGroupRoot, InputGroupSuffix} from "./input-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
});

export type InputGroup = {
  Props: ComponentProps<typeof InputGroupRoot>;
  RootProps: ComponentProps<typeof InputGroupRoot>;
  InputProps: ComponentProps<typeof InputGroupInput>;
  PrefixProps: ComponentProps<typeof InputGroupPrefix>;
  SuffixProps: ComponentProps<typeof InputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputGroupInput, InputGroupPrefix, InputGroupRoot, InputGroupSuffix};

export type {
  InputGroupRootProps,
  InputGroupRootProps as InputGroupProps,
  InputGroupInputProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
} from "./input-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputGroupVariants} from "./input-group.styles";

export type {InputGroupVariants} from "./input-group.styles";

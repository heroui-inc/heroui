export type {
  As,
  DOMElement,
  DOMElements,
  CapitalizedDOMElements,
  DOMAttributes,
  OmitCommonProps,
  RightJoinProps,
  MergeWithAs,
  InternalForwardRefRenderFunction,
  PropsOf,
  Merge,
  HTMLHeroUIProps,
  PropGetter,
  ExtendVariantProps,
  ExtendVariantWithSlotsProps,
  ExtendVariants,
  SharedSelection,
} from "@vezham/system-rsc";

export {
  forwardRef,
  toIterator,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  isHeroUIEl,
  extendVariants,
} from "@vezham/system-rsc";

export type {SupportedCalendars} from "./types";
export type {HeroUIProviderProps} from "./provider";
export type {ProviderContextProps} from "./provider-context";

export {HeroUIProvider} from "./provider";
export {ProviderContext, useProviderContext} from "./provider-context";

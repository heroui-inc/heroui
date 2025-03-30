import type {ClassValue, StringToBoolean, OmitUndefined, ClassProp} from "tailwind-variants";
import type {
  ForwardRefExoticComponent,
  JSXElementConstructor,
  PropsWithoutRef,
  RefAttributes,
  Ref,
} from "react";

type ElementRef<C extends JSXElementConstructor<any>> = C extends ForwardRefExoticComponent<infer P>
  ? P extends {ref?: Ref<infer R>}
    ? R
    : never
  : C extends new (...args: any) => any
  ? InstanceType<C>
  : never;

type SlotsClassValue<S> = {
  [K in keyof S]?: ClassValue;
};

type Variants<S> = {
  [K: string]: {[P: string]: S extends undefined ? ClassValue : SlotsClassValue<S>};
};

type ComponentProps<C> = C extends JSXElementConstructor<infer P> ? P : never;

type ComponentSlots<CP> = CP extends {classNames?: infer S} ? S : undefined;

type ValidateSubtype<T, U> = OmitUndefined<T> extends U ? "true" : "false";

type GetSuggestedValues<S> = S extends undefined ? ClassValue : SlotsClassValue<S>;

type SuggestedVariants<CP, S> = {
  [K in keyof CP]?: ValidateSubtype<CP[K], string> extends "true"
    ? {
        [K2 in Extract<CP[K], string | number | symbol>]?: GetSuggestedValues<S>;
      }
    : ValidateSubtype<CP[K], boolean> extends "true"
    ? {
        true?: GetSuggestedValues<S>;
        false?: GetSuggestedValues<S>;
      }
    : never;
};

type ComposeVariants<CP, S> = SuggestedVariants<CP, S> | Variants<S>;

type VariantValue<V, SV> = {
  [K in keyof V | keyof SV]?:
    | (K extends keyof V ? StringToBoolean<keyof V[K]> : never)
    | (K extends keyof V ? StringToBoolean<keyof V[K]>[] : never)
    | (K extends keyof SV
        ? ValidateSubtype<SV[K], object> extends "true"
          ? keyof OmitUndefined<SV[K]>
          : never
        : never);
};

type DefaultVariants<V, SV> = VariantValue<V, SV>;

type CompoundVariants<V, SV> = Array<VariantValue<V, SV> & ClassProp<ClassValue>>;

type Options = {
  /**
   * Whether to merge the class names with `tailwind-merge` library.
   * It avoids duplicate tailwind classes. (Recommended)
   * @see https://github.com/dcastil/tailwind-merge/blob/v1.8.1/README.md
   * @default true
   */
  twMerge?: boolean;
  /**
   * The config object for `tailwind-merge` library.
   * @see https://github.com/dcastil/tailwind-merge/blob/v1.8.1/docs/configuration.md
   */
  twMergeConfig?: any;
};

type MergedProps<CP, V> = CP & {
  [K in keyof V]?: StringToBoolean<Extract<keyof V[K], string | number | symbol>>;
};

export type ExtendVariantProps = {
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, boolean | string | Record<string, string>>>;
};

export type ExtendVariantWithSlotsProps = {
  variants?: Record<string, Record<string, string | Record<string, string>>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, boolean | string | Record<string, string>>>;
};

export type ExtendVariants = {
  <
    C extends JSXElementConstructor<any>,
    CP extends ComponentProps<C>,
    S extends ComponentSlots<CP>,
    V extends ComposeVariants<CP, S>,
    SV extends SuggestedVariants<CP, S>,
    DV extends DefaultVariants<V, SV>,
    CV extends CompoundVariants<V, SV>,
  >(
    BaseComponent: C,
    styles: {
      variants?: V;
      defaultVariants?: DV;
      compoundVariants?: CV;
      slots?: S;
    },
    opts?: Options,
  ): ForwardRefExoticComponent<PropsWithoutRef<MergedProps<CP, V>> & RefAttributes<ElementRef<C>>>;
};

// main function
export declare const extendVariants: ExtendVariants;

import type {ClassValue, StringToBoolean, OmitUndefined, ClassProp} from "tailwind-variants";
import type {ForwardRefExoticComponent, JSXElementConstructor, RefAttributes} from "react";
import type * as _heroui_system from "@heroui/system";

type SlotsClassValue<S> = {
  [K in keyof S]?: ClassValue;
};

type Variants<S> = {
  [K: string]: {[P: string]: GetSuggestedValues<S>};
};

type ComponentProps<C> = C extends JSXElementConstructor<infer P> ? P : never;

type ComponentSlots<CP> = CP extends {classNames?: infer S} ? S : undefined;

type ValidateSubtype<T, U> = OmitUndefined<T> extends U ? "true" : "false";

type GetSuggestedValues<S> = ClassValue | (S extends undefined ? never : SlotsClassValue<S>);

type SuggestedVariants<CP, S> = {
  [K in Exclude<keyof CP, "classNames" | "className" | "class">]?: ValidateSubtype<
    CP[K],
    string
  > extends "true"
    ? {[K2 in CP[K]]?: GetSuggestedValues<S>}
    : ValidateSubtype<CP[K], boolean> extends "true"
      ? {true?: GetSuggestedValues<S>; false?: GetSuggestedValues<S>}
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

type DefaultVariants<V, SV, S> = VariantValue<V, SV> & {
  classNames?: S extends undefined ? never : SlotsClassValue<S>;
};

type CompoundVariants<V, SV, S> = Array<VariantValue<V, SV> & ClassProp<GetSuggestedValues<S>>>;

type Options = {
  /**
   * Whether to merge the class names with `tailwind-merge` library.
   * It avoids to have duplicate tailwind classes. (Recommended)
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

export type ExtendVariantProps = {
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, boolean | string | Record<string, string>>>;
};

export type ExtendVariantWithSlotsProps = {
  variants?: Record<string, Record<string, string | Record<string, string>>>;
  defaultVariants?: Record<string, string | Record<string, string>>;
  compoundVariants?: Array<Record<string, boolean | string | Record<string, string>>>;
};

type InferRef<C> =
  C extends ForwardRefExoticComponent<RefAttributes<infer R>>
    ? R
    : C extends new (...args: any[]) => infer I
      ? I
      : any;

export type ExtendVariants = <
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  CP extends ComponentProps<C> = ComponentProps<C>,
  S extends ComponentSlots<CP> = ComponentSlots<CP>,
  V extends ComposeVariants<CP, S> = ComposeVariants<CP, S>,
  SV extends SuggestedVariants<CP, S> = SuggestedVariants<CP, S>,
  DV extends DefaultVariants<V, SV, S> = DefaultVariants<V, SV, S>,
  CV extends CompoundVariants<V, SV, ComponentSlots<CP>> = CompoundVariants<
    V,
    SV,
    ComponentSlots<CP>
  >,
>(
  BaseComponent: C,
  styles: {
    variants?: V;
    defaultVariants?: DV;
    compoundVariants?: CV;
    slots?: S;
  },
  opts?: Options,
) => _heroui_system.InternalForwardRefRenderFunction<
  C,
  {
    [K in Exclude<keyof (CP & V), "ref" | "as">]?:
      | (K extends keyof CP ? CP[K] : never)
      | (K extends keyof V ? StringToBoolean<keyof NonNullable<V[K]>> : never);
  }
>;

// main function
export declare const extendVariants: ExtendVariants;

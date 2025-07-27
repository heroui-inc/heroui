/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility for building component classes following BEM-style conventions
 * Ensures all class names are statically detectable by Tailwind CSS
 */

export interface ClassBuilderConfig<TVariants extends Record<string, Record<string, string>>> {
  base: string;
  variants?: TVariants;
  modifiers?: Record<string, boolean | undefined>;
}

/**
 * Builds component classes from base, variants, and modifiers
 * @example
 * const classes = buildComponentClasses({
 *   base: "button",
 *   variants: {
 *     size: sizeClasses,
 *     variant: variantClasses,
 *   },
 *   modifiers: {
 *     "icon-only": isIconOnly,
 *     "loading": isLoading,
 *   }
 * }, { size: "md", variant: "primary" });
 * // Returns: "button button--md button--primary button--icon-only"
 */
export function buildComponentClasses<
  TVariants extends Record<string, Record<string, string>>,
  TVariantKeys extends keyof TVariants,
>(
  config: ClassBuilderConfig<TVariants>,
  variantProps: {[K in TVariantKeys]?: keyof TVariants[K]},
): string {
  const classes: string[] = [config.base];

  // Add variant classes
  if (config.variants) {
    Object.entries(variantProps).forEach(([variantKey, variantValue]) => {
      if (variantValue && config.variants?.[variantKey]?.[variantValue as string]) {
        classes.push(config.variants[variantKey][variantValue as string]!);
      }
    });
  }

  // Add modifier classes
  if (config.modifiers) {
    Object.entries(config.modifiers).forEach(([modifier, enabled]) => {
      if (enabled) {
        classes.push(`${config.base}--${modifier}`);
      }
    });
  }

  return classes.join(" ");
}

/**
 * Creates a typed class builder for a specific component
 * @example
 * const getButtonClasses = createClassBuilder({
 *   base: "button",
 *   variants: {
 *     size: { sm: "button--sm", md: "button--md", lg: "button--lg" },
 *     variant: { primary: "button--primary", secondary: "button--secondary" },
 *   },
 * });
 *
 * const classes = getButtonClasses(
 *   { size: "md", variant: "primary" },
 *   { "icon-only": true }
 * );
 */
export function createClassBuilder<TVariants extends Record<string, Record<string, string>>>(
  config: Omit<ClassBuilderConfig<TVariants>, "modifiers">,
) {
  return (
    variantProps: {[K in keyof TVariants]?: keyof TVariants[K]},
    modifiers?: Record<string, boolean | undefined>,
  ) => {
    return buildComponentClasses(
      {
        ...config,
        modifiers,
      },
      variantProps,
    );
  };
}

/**
 * Extract variant props type from a class builder
 * @example
 * const getButtonClasses = createClassBuilder({
 *   base: "button",
 *   variants: {
 *     size: { sm: "button--sm", md: "button--md" },
 *     variant: { primary: "button--primary", secondary: "button--secondary" },
 *   },
 * });
 *
 * type ButtonVariants = VariantProps<typeof getButtonClasses>;
 * // Result: { size?: "sm" | "md"; variant?: "primary" | "secondary" }
 */
export type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];

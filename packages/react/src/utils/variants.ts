/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return {...acc, [key]: props[key]};
    } else {
      return acc;
    }
  }, {});

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({...acc, [key]: props[key as keyof T]}), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
};

/**
 * Utility for creating BEM-style class names with variants
 */

export type VariantConfig<T extends Record<string, any>> = {
  base: string;
  variants?: T;
  modifiers?: Record<string, boolean | undefined>;
};

/**
 * Creates a class name builder for components with variants
 * @param config - The variant configuration
 * @returns A function that builds the class name string
 *
 * @example
 * const getButtonClasses = createVariantBuilder({
 *   base: 'button',
 *   variants: {
 *     size: 'md',
 *     variant: 'primary'
 *   },
 *   modifiers: {
 *     'icon-only': isIconOnly
 *   }
 * });
 * // Returns: "button button--md button--primary button--icon-only"
 */
export function createVariantBuilder<T extends Record<string, string>>(baseClass: string) {
  return (
    config: {
      variants?: Partial<T>;
      modifiers?: Record<string, boolean | undefined>;
    } = {},
  ) => {
    const classes = [baseClass];

    // Add variant classes
    if (config.variants) {
      Object.values(config.variants).forEach((value) => {
        if (value) {
          classes.push(`${baseClass}--${value}`);
        }
      });
    }

    // Add modifier classes
    if (config.modifiers) {
      Object.entries(config.modifiers).forEach(([modifier, enabled]) => {
        if (enabled) {
          classes.push(`${baseClass}--${modifier}`);
        }
      });
    }

    return classes.join(" ");
  };
}

/**
 * Alternative API using a more declarative approach
 */
export interface VariantDefinition<V extends Record<string, readonly string[]>> {
  base: string;
  variants: V;
  defaults?: Partial<{[K in keyof V]: V[K][number]}>;
}

/**
 * Creates a typed variant class builder
 * @param definition - The variant definition
 * @returns A function that builds class names based on variant props
 *
 * @example
 * const buttonVariants = createVariants({
 *   base: 'button',
 *   variants: {
 *     size: ['sm', 'md', 'lg'] as const,
 *     variant: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'] as const,
 *   },
 *   defaults: {
 *     size: 'md',
 *     variant: 'primary'
 *   }
 * });
 *
 * const className = buttonVariants({
 *   size: 'lg',
 *   variant: 'danger',
 *   modifiers: { 'icon-only': true }
 * });
 * // Returns: "button button--lg button--danger button--icon-only"
 */
export function createVariants<V extends Record<string, readonly string[]>>(
  definition: VariantDefinition<V>,
) {
  type VariantProps = {
    [K in keyof V]?: V[K][number];
  } & {
    modifiers?: Record<string, boolean | undefined>;
  };

  return (props: VariantProps = {}) => {
    const classes = [definition.base];

    // Merge props with defaults, filtering out undefined values
    const mergedProps: Record<string, any> = {};

    // First apply defaults
    if (definition.defaults) {
      Object.entries(definition.defaults).forEach(([key, value]) => {
        mergedProps[key] = value;
      });
    }

    // Then apply provided props, but only if they're not undefined
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined) {
        mergedProps[key] = value;
      }
    });

    // Add variant classes
    Object.entries(mergedProps).forEach(([key, value]) => {
      if (key !== "modifiers" && value) {
        classes.push(`${definition.base}--${value}`);
      }
    });

    // Add modifier classes
    if (props.modifiers) {
      Object.entries(props.modifiers).forEach(([modifier, enabled]) => {
        if (enabled) {
          classes.push(`${definition.base}--${modifier}`);
        }
      });
    }

    return classes.join(" ");
  };
}

/**
 * Type helpers for extracting variant props from a variant definition
 */
export type VariantPropsOf<T extends ReturnType<typeof createVariants>> = T extends (
  props: infer P,
) => string
  ? P
  : never;

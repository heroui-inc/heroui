import * as React from "react";
import {tv, cn} from "@heroui/theme";

import {mapPropsVariants} from "./utils";

/**
 * Extracts slot names from variant configurations.
 * Traverses: variants -> variant groups -> variant configs -> slot names
 * @param {Object} variants - Nested object: { variantName: { value: { slotName: "...", ... } } }
 * @returns {Object} Map of slot names to empty strings
 */
function getSlots(variants) {
  if (!variants || typeof variants !== "object") return {};

  const acc = Object.create(null);

  for (const group of Object.values(variants)) {
    if (!group || typeof group !== "object") continue;

    for (const config of Object.values(group)) {
      // Skip non-objects, arrays (which would yield numeric indices), and String objects
      if (
        !config ||
        typeof config !== "object" ||
        Array.isArray(config) ||
        config instanceof String
      ) {
        continue;
      }

      for (const slotName of Object.keys(config)) {
        acc[slotName] = "";
      }
    }
  }

  return acc;
}

function getClassNamesWithProps({
  props = {},
  variants,
  slots,
  defaultVariants,
  compoundVariants,
  hasSlots,
  opts,
}) {
  const keys = [];

  if (defaultVariants && typeof defaultVariants === "object") {
    for (const key in defaultVariants) {
      const value = defaultVariants[key];
      const propValue = props?.[key];

      if (propValue && propValue !== value) {
        keys.push(key);
      }
    }
  }

  const customTv = tv(
    {
      variants,
      defaultVariants:
        defaultVariants && typeof defaultVariants === "object"
          ? // Do not apply default variants when the props variant is different
            Object.keys(defaultVariants)
              .filter((k) => !keys.includes(k))
              .reduce((o, k) => {
                o[k] = defaultVariants[k];

                return o;
              }, [])
          : defaultVariants,
      compoundVariants,
      ...(hasSlots && {slots}),
    },
    {
      twMerge: opts.twMerge ?? true,
      twMergeConfig: opts.twMergeConfig ?? {},
    },
  );

  const [baseProps, variantProps] = mapPropsVariants(props, customTv.variantKeys, false);

  const newProps = {
    ...defaultVariants,
    ...baseProps,
    className: cn(defaultVariants?.className, baseProps.className),
  };

  let classNames = {};

  const result = customTv(variantProps);

  // if no slots, the result is a string
  if (!hasSlots) {
    newProps.className = cn(result, newProps.className);
  }
  // if has slots, the result is an object with keys as slots functions
  else {
    Object.entries(result).forEach(([key, value]) => {
      const slotResult = value();

      if (typeof slotResult === "string") {
        classNames[key] = slotResult;
      }
    });

    Object.entries(props.classNames ?? {}).forEach(([key, value]) => {
      classNames[key] = cn(classNames[key], value);
    });
  }

  if (Object.keys(classNames).length !== 0) {
    newProps.classNames = classNames;
  }

  return newProps;
}

export function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const {variants, defaultVariants, compoundVariants, slots: directSlots} = styles || {};

  const inferredSlots = getSlots(variants);

  const slots = directSlots ? {...inferredSlots, ...directSlots} : inferredSlots;

  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0;

  const ForwardedComponent = React.forwardRef((originalProps = {}, ref) => {
    // Extract 'as' prop if present
    const {as: Component = BaseComponent, ...restProps} = originalProps;

    const newProps = React.useMemo(() =>
      getClassNamesWithProps(
        {
          slots,
          variants,
          compoundVariants,
          props: restProps, // Use restProps without 'as'
          defaultVariants,
          hasSlots,
          opts,
        },
        [restProps],
      ),
    );

    return React.createElement(Component, {...restProps, ...newProps, ref});
  });

  // Add collection node function for collection-based components
  if (BaseComponent.getCollectionNode) {
    ForwardedComponent.getCollectionNode = (itemProps) => {
      const newProps = getClassNamesWithProps({
        slots,
        variants,
        compoundVariants,
        props: itemProps,
        defaultVariants,
        hasSlots,
        opts,
      });

      return BaseComponent.getCollectionNode({...itemProps, ...newProps});
    };
  }

  // To make dev tools show a proper name
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;

  return ForwardedComponent;
}

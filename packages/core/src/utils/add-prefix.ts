/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Add prefix to CSS selectors and variables
 */

const defaultExcludedPrefixes = ["tw-", "color-", "size-", "radius-", "border", "depth", "noise"];

const shouldExcludeVariable = (variableName: string, excludedPrefixes: string[]): boolean => {
  if (variableName.startsWith("tw")) {
    return true;
  }

  return excludedPrefixes.some((excludedPrefix) => variableName.startsWith(excludedPrefix));
};

const prefixVariable = (
  variableName: string,
  prefix: string,
  excludedPrefixes: string[],
): string => {
  if (shouldExcludeVariable(variableName, excludedPrefixes)) {
    return variableName;
  }

  return `${prefix}${variableName}`;
};

const getPrefixedSelector = (selector: string, prefix: string): string => {
  if (!selector.startsWith(".")) return selector;

  // Handle complex selectors like .button--primary
  const parts = selector.slice(1).split("--");

  if (parts.length > 1) {
    return `.${prefix}${parts.join("--")}`;
  }

  return `.${prefix}${selector.slice(1)}`;
};

const getPrefixedKey = (key: string, prefix: string, excludedPrefixes: string[]): string => {
  if (!prefix) return key;

  // Handle CSS variables
  if (key.startsWith("--")) {
    const variableName = key.slice(2);

    return `--${prefixVariable(variableName, prefix, excludedPrefixes)}`;
  }

  // Skip media queries and attribute selectors
  if (key.startsWith("@") || key.startsWith("[")) {
    return key;
  }

  // Handle & selectors
  if (key.startsWith("&")) {
    // Complex selectors with :not(), :has(), etc.
    if (key.match(/:[a-z-]+\(/)) {
      return key.replace(/\.([\w-]+)/g, `.${prefix}$1`);
    }
    // Simple &. cases
    if (key.startsWith("&.")) {
      return `&.${prefix}${key.slice(2)}`;
    }

    // Other & cases (like &:hover)
    return key.replace(/\.([\w-]+)/g, `.${prefix}$1`);
  }

  // Handle pseudo-class selectors
  if (key.startsWith(":")) {
    return key.replace(/\.([\w-]+)/g, `.${prefix}$1`);
  }

  // Handle combinators (>, +, ~)
  if (key.includes(">") || key.includes("+") || key.includes("~")) {
    // For comma-separated selectors
    if (key.includes(",")) {
      return key
        .split(/\s*,\s*/)
        .map((part) => part.replace(/\.([\w-]+)/g, `.${prefix}$1`))
        .join(", ");
    }

    // For simple combinators
    let processedKey = key.replace(/\.([\w-]+)/g, `.${prefix}$1`);

    // Add space before combinators at the beginning
    if (
      processedKey.startsWith(">") ||
      processedKey.startsWith("+") ||
      processedKey.startsWith("~")
    ) {
      processedKey = ` ${processedKey}`;
    }

    return processedKey;
  }

  // Handle space-separated selectors
  if (key.includes(" ")) {
    return key
      .split(/\s+/)
      .map((part) => {
        if (part.startsWith(".")) {
          return getPrefixedSelector(part, prefix);
        }

        return part;
      })
      .join(" ");
  }

  // Handle selectors with pseudo-classes
  if (key.includes(":")) {
    const [selector, ...pseudo] = key.split(":");

    if (selector && selector.startsWith(".")) {
      return `${getPrefixedSelector(selector, prefix)}:${pseudo.join(":")}`;
    }

    return key.replace(/\.([\w-]+)/g, `.${prefix}$1`);
  }

  // Handle class selectors
  if (key.startsWith(".")) {
    return getPrefixedSelector(key, prefix);
  }

  return key;
};

const processStringValue = (value: string, prefix: string, excludedPrefixes: string[]): string => {
  if (!prefix) return value;

  // Replace CSS variables in var() statements
  return value.replace(/var\(--([^)]+)\)/g, (match, variableName) => {
    if (shouldExcludeVariable(variableName, excludedPrefixes)) {
      return match;
    }

    return `var(--${prefix}${variableName})`;
  });
};

const processValue = (value: any, prefix: string, excludedPrefixes: string[]): any => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string") {
        if (item.startsWith(".")) {
          return prefix ? `.${prefix}${item.slice(1)}` : item;
        }

        return processStringValue(item, prefix, excludedPrefixes);
      }

      return item;
    });
  } else if (typeof value === "object" && value !== null) {
    return addPrefix(value, prefix, excludedPrefixes);
  } else if (typeof value === "string") {
    return processStringValue(value, prefix, excludedPrefixes);
  }

  return value;
};

/**
 * Add prefix to CSS object
 * @param obj - CSS object to prefix
 * @param prefix - Prefix to add
 * @param excludedPrefixes - Prefixes to exclude from prefixing
 * @returns Prefixed CSS object
 */
export function addPrefix(
  obj: Record<string, any>,
  prefix: string,
  excludedPrefixes: string[] = defaultExcludedPrefixes,
): Record<string, any> {
  if (!prefix) return obj;

  return Object.entries(obj).reduce(
    (result, [key, value]) => {
      const newKey = getPrefixedKey(key, prefix, excludedPrefixes);

      result[newKey] = processValue(value, prefix, excludedPrefixes);

      return result;
    },
    {} as Record<string, any>,
  );
}

const defaultExcludedPrefixes: string[] = [
  "color-",
  "size-",
  "radius-",
  "border",
  "depth",
  "noise",
];

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

  return `.${prefix}${selector.slice(1)}`;
};

const getPrefixedKey = (key: string, prefix: string, excludedPrefixes: string[]): string => {
  const prefixAmpDot = prefix ? `&.${String(prefix)}` : "";

  if (!prefix) return key;

  if (key.startsWith("--")) {
    const variableName = key.slice(2);

    return `--${prefixVariable(variableName, String(prefix), excludedPrefixes)}`;
  }

  if (key.startsWith("@") || key.startsWith("[")) {
    return key;
  }

  if (key.startsWith("&")) {
    // If it's a complex selector with :not(), :has(), etc.
    if (key.match(/:[a-z-]+\(/)) {
      return key.replace(/\.([\w-]+)/g, `.${String(prefix)}$1`);
    }
    // For simple &. cases
    if (key.startsWith("&.")) {
      return `${prefixAmpDot}${key.slice(2)}`;
    }

    // For other & cases (like &:hover or &:not(...))
    return key.replace(/\.([\w-]+)/g, `.${String(prefix)}$1`);
  }

  if (key.startsWith(":")) {
    return key.replace(/\.([\w-]+)/g, `.${prefix}$1`);
  }

  if (
    key.includes(".") &&
    !key.includes(" ") &&
    !key.includes(">") &&
    !key.includes("+") &&
    !key.includes("~")
  ) {
    return key
      .split(".")
      .filter(Boolean)
      .map((part) => String(prefix) + part)
      .join(".")
      .replace(/^/, ".");
  }

  if (key.includes(">") || key.includes("+") || key.includes("~")) {
    // For comma-separated selectors
    if (key.includes(",")) {
      return key
        .split(/\s*,\s*/)
        .map((part) => {
          // Replace class names with prefixed versions for each part
          return part.replace(/\.([\w-]+)/g, `.${String(prefix)}$1`);
        })
        .join(", ");
    }

    // For simple combinators (not comma-separated)
    let processedKey = key.replace(/\.([\w-]+)/g, `.${String(prefix)}$1`);

    // Add a space before combinators at the beginning
    if (
      processedKey.startsWith(">") ||
      processedKey.startsWith("+") ||
      processedKey.startsWith("~")
    ) {
      processedKey = ` ${processedKey}`;
    }

    return processedKey;
  }

  if (key.includes(" ")) {
    return key
      .split(/\s+/)
      .map((part) => {
        if (part.startsWith(".")) {
          return getPrefixedSelector(part, String(prefix));
        }

        return part;
      })
      .join(" ");
  }

  if (key.includes(":")) {
    const [selector, ...pseudo] = key.split(":");

    if (selector && selector.startsWith(".")) {
      return `${getPrefixedSelector(selector, String(prefix))}:${pseudo.join(":")}`;
    }

    return key.replace(/\.([\w-]+)/g, `.${String(prefix)}$1`);
  }

  if (key.startsWith(".")) {
    return getPrefixedSelector(key, String(prefix));
  }

  return key;
};

interface ProcessableObject {
  [key: string]: ProcessableValue;
}

type ProcessableValue = string | ProcessableObject | ProcessableValue[];

export type AddPrefixFunction = (
  obj: ProcessableObject,
  prefix: string,
  excludedPrefixes?: string[],
) => ProcessableObject;

const processArrayValue = (
  value: ProcessableValue[],
  prefix: string,
  excludedPrefixes: string[],
): ProcessableValue[] => {
  return value.map((item) => {
    if (typeof item === "string") {
      if (item.startsWith(".")) {
        return prefix && typeof prefix === "string" ? `.${prefix}${item.slice(1)}` : item;
      }

      return processStringValue(item, prefix, excludedPrefixes);
    }

    return item;
  });
};

const processStringValue = (value: string, prefix: string, excludedPrefixes: string[]): string => {
  if (prefix === "") return value;

  return value.replace(/var\(--([^)]+)\)/g, (match, variableName) => {
    if (shouldExcludeVariable(variableName, excludedPrefixes)) {
      return match;
    }

    return `var(--${String(prefix)}${variableName})`;
  });
};

const processValue = (
  value: ProcessableValue,
  prefix: string,
  excludedPrefixes: string[],
): ProcessableValue => {
  if (Array.isArray(value)) {
    return processArrayValue(value as ProcessableValue[], prefix, excludedPrefixes);
  } else if (typeof value === "object" && value !== null) {
    return addPrefix(value as ProcessableObject, prefix, excludedPrefixes);
  } else if (typeof value === "string") {
    return processStringValue(value, prefix, excludedPrefixes);
  } else {
    return value;
  }
};

export const addPrefix = (
  obj: ProcessableObject,
  prefix: string,
  excludedPrefixes: string[] = defaultExcludedPrefixes,
): ProcessableObject => {
  return Object.entries(obj).reduce<ProcessableObject>((result, [key, value]) => {
    const newKey = getPrefixedKey(key, prefix, excludedPrefixes);

    result[newKey] = processValue(value, prefix, excludedPrefixes);

    return result;
  }, {});
};

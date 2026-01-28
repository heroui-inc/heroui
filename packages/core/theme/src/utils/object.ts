export function swapColorValues<T extends Object>(colors: T) {
  const swappedColors = {};
  const keys = Object.keys(colors);
  const length = keys.length;

  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i];
    const key2 = keys[length - 1 - i];

    // @ts-ignore
    swappedColors[key1] = colors[key2];
    // @ts-ignore
    swappedColors[key2] = colors[key1];
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)];

    // @ts-ignore
    swappedColors[middleKey] = colors[middleKey];
  }

  return swappedColors;
}

export function removeDefaultKeys<T extends Object>(obj: T) {
  const newObj = {};

  for (const key in obj) {
    if (key.endsWith("-DEFAULT")) {
      // @ts-ignore
      newObj[key.replace("-DEFAULT", "")] = obj[key];
      continue;
    }
    // @ts-ignore
    newObj[key] = obj[key];
  }

  return newObj;
}

function isBuffer(obj) {
  return (
    obj &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === "function" &&
    obj.constructor.isBuffer(obj)
  );
}

function keyIdentity(key) {
  return key;
}

export function flatten(target, opts) {
  opts = opts || {};

  const delimiter = opts.delimiter || ".";
  const maxDepth = opts.maxDepth;
  const transformKey = opts.transformKey || keyIdentity;
  const output = {};

  function step(object, prev, currentDepth) {
    currentDepth = currentDepth || 1;
    Object.keys(object).forEach(function (key) {
      const value = object[key];
      const isarray = opts.safe && Array.isArray(value);
      const type = Object.prototype.toString.call(value);
      const isbuffer = isBuffer(value);
      const isobject = type === "[object Object]" || type === "[object Array]";

      const newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);

      if (
        !isarray &&
        !isbuffer &&
        isobject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target, null, null);

  return output;
}

/**
 *
 * Flatten theme object and remove default keys
 *
 * @param obj theme object
 * @returns object with flattened keys
 */
export const flattenThemeObject = <TTarget>(obj: TTarget) =>
  removeDefaultKeys(
    flatten(obj, {
      safe: true,
      delimiter: "-",
    }) as Object,
  );

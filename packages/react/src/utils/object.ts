/* eslint-disable @typescript-eslint/no-explicit-any */
export type Extractable =
  | {
      [key: string]: any;
    }
  | undefined;

/**
 * Converts an object into a JSON string. Returns an empty string if the object
 * is not extractable or if a circular reference is detected during stringification.
 *
 * @param obj - The object to convert into a dependency string.
 *
 * @returns A JSON string representation of the object or an empty string if conversion fails.
 *
 * @example
 * objectToDeps({ key: 'value' }); // returns '{"key":"value"}'
 * objectToDeps(undefined); // returns ""
 */
export function objectToDeps(obj: Extractable) {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  try {
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
}

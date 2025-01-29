/**
 * Copy data to clipboard
 * @param data
 */
export function copyData(data: string) {
  navigator.clipboard.writeText(data);
}

/**
 * Stringify data
 *
 * @param data
 * @returns
 */
export function stringifyData(data: unknown) {
  return JSON.stringify(data, null, 2);
}

/**
 * Stringify data
 *
 * @param scaling
 * @returns className
 */
export function getClassName(scaling: number, baseWidth: number, baseHeight: number) {
  const add = (2 * scaling - 200) / 10;
  const width = Math.ceil(baseWidth + add);
  const height = Math.ceil(baseHeight + add);
  const className = `w-${width} h-${height}`;

  return className;
}

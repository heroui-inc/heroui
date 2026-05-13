/**
 * Calculates the foreground color for a given OKLCH string.
 */
export function calculateForeground(oklchString: string): string {
  // Parse OKLCH - format: oklch(L C H) or oklch(L% C H), hue can be "none" for achromatic colors
  const match = oklchString.match(/oklch\((\d+\.?\d*)%?\s+(\d+\.?\d*)\s+(\d+\.?\d*|none)/);

  if (!match || !match[1] || !match[2] || !match[3]) return "var(--snow)"; // fallback

  const l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = match[3] === "none" ? 0 : parseFloat(match[3]);

  // Normalize lightness if given as percentage (0-100) vs decimal (0-1)
  const lightness = l > 1 ? l / 100 : l;

  // OKLCH lightness is perceptually uniform, so 0.65 is a good threshold
  const foreground =
    lightness > 0.65
      ? `oklch(0.15 ${Math.min(c * 0.3, 0.05)} ${h})`
      : `oklch(0.98 ${Math.min(c * 0.1, 0.02)} ${h})`;

  return foreground;
}

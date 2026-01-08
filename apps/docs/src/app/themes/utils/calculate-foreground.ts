/**
 * Calculates the foreground color for a given HSL string.
 */
export function calculateForeground(hslString: string): string {
  // Parse HSL - adjust regex based on your format
  const match = hslString.match(/hsla?\((\d+\.?\d*),?\s*(\d+\.?\d*)%?,?\s*(\d+\.?\d*)%?/);

  if (!match || !match[1] || !match[2] || !match[3]) return "var(--snow)"; // fallback

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);

  const foreground =
    l > 64 ? `hsl(${h} ${Math.min(s * 1.2, 100)}% 15%)` : `hsl(${h} ${s * 0.3}% 98%)`;

  return foreground;
}

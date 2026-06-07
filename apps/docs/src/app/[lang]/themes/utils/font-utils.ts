/**
 * Utility functions for handling custom fonts
 */

/**
 * List of allowed CDN hosts for font imports.
 * Only fonts from these trusted sources will be loaded.
 */
const ALLOWED_FONT_CDN_HOSTS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "api.fontshare.com",
  "cdnfonts.com", // Matches www.cdnfonts.com, fonts.cdnfonts.com, etc.
];

/**
 * Allowed path prefixes for jsdelivr CDN (for Fontsource fonts only)
 * This prevents loading arbitrary code from jsdelivr while allowing Fontsource fonts
 */
const JSDELIVR_ALLOWED_PATHS = [
  "/fontsource/fonts/", // Fontsource direct path
  "/npm/@fontsource/", // Fontsource npm package
  "/npm/@fontsource-variable/", // Fontsource variable fonts
];

/**
 * Validates if a URL is from an allowed font CDN host and uses HTTPS.
 * This is a security check to prevent loading malicious resources.
 */
export function isValidFontCdnUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    // Must be HTTPS
    if (parsedUrl.protocol !== "https:") {
      return false;
    }

    // Special handling for jsdelivr - only allow Fontsource paths
    if (parsedUrl.hostname === "cdn.jsdelivr.net") {
      return JSDELIVR_ALLOWED_PATHS.some((prefix) => parsedUrl.pathname.startsWith(prefix));
    }

    // Must be from an allowed host
    return ALLOWED_FONT_CDN_HOSTS.some(
      (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

/**
 * Checks if a fontFamily value is a valid CDN URL (for custom fonts)
 * Only returns true if it's a valid URL from an allowed CDN host
 */
export function isCustomFontUrl(fontFamily: string): boolean {
  if (!fontFamily.startsWith("https://")) {
    return false;
  }

  return isValidFontCdnUrl(fontFamily);
}

/**
 * Extracts font family name from a font CDN URL
 * Supports Google Fonts, Fontshare, Fontsource, CDNfonts, and similar CDNs
 *
 * Examples:
 * - Google: https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400 -> "Roboto Mono"
 * - Fontshare: https://api.fontshare.com/v2/css?f[]=chillax@400&display=swap -> "Chillax"
 * - Fontsource: https://cdn.jsdelivr.net/npm/@fontsource/lato@latest/index.css -> "Lato"
 * - Fontsource: https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-400-normal.woff2 -> "Lato"
 * - CDNfonts: https://fonts.cdnfonts.com/css/stasiun -> "Stasiun"
 */
export function extractFontFamilyFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Google Fonts format: family=Font+Name or family=Font+Name:wght@...
    const familyParam = parsedUrl.searchParams.get("family");

    if (familyParam) {
      // Handle multiple families (take the first one)
      const firstFamily = familyParam.split("|")[0] ?? "";
      // Remove weight/style specifiers (everything after :)
      const familyName = firstFamily.split(":")[0] ?? "";

      // Replace + with space
      return familyName.replace(/\+/g, " ") || null;
    }

    // Fontshare format: f[]=fontname@weight (e.g., f[]=chillax@400)
    const fontshareParam = parsedUrl.searchParams.get("f[]");

    if (fontshareParam) {
      // Extract font name before @ (e.g., "chillax@400" -> "chillax")
      const fontName = fontshareParam.split("@")[0] ?? "";

      if (fontName) {
        // Capitalize first letter of each word
        return fontName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      }
    }

    // Fontsource npm format: /npm/@fontsource/font-name@version/...
    // or /npm/@fontsource-variable/font-name@version/...
    const fontsourceNpmMatch = parsedUrl.pathname.match(
      /\/npm\/@fontsource(?:-variable)?\/([^@/]+)/,
    );

    if (fontsourceNpmMatch?.[1]) {
      return fontsourceNpmMatch[1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // Fontsource direct format: /fontsource/fonts/font-name@version/... or /fontsource/fonts/font-name:vf@version/...
    const fontsourceDirectMatch = parsedUrl.pathname.match(/\/fontsource\/fonts\/([^@/:]+)/);

    if (fontsourceDirectMatch?.[1]) {
      return fontsourceDirectMatch[1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // CDNfonts page format: /font-name.font (e.g., https://www.cdnfonts.com/stasiun.font)
    const cdnfontsPageMatch = parsedUrl.pathname.match(/\/([^/]+)\.font$/);

    if (cdnfontsPageMatch?.[1]) {
      return cdnfontsPageMatch[1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // CDNfonts CSS format: /css/font-name (e.g., https://fonts.cdnfonts.com/css/stasiun)
    const cdnfontsCssMatch = parsedUrl.pathname.match(/\/css\/([^/?]+)/);

    if (cdnfontsCssMatch?.[1]) {
      return cdnfontsCssMatch[1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // Generic CSS file format: /path/font-name.css
    const pathMatch = url.match(/\/([^/]+)\.css/);

    if (pathMatch?.[1]) {
      return pathMatch[1].replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Font file extensions that require @font-face generation
 */
const FONT_FILE_EXTENSIONS = [".woff2", ".woff", ".ttf", ".otf", ".eot"];

/**
 * Checks if a URL points to a font file (vs a CSS stylesheet)
 */
export function isFontFileUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();

    return FONT_FILE_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  } catch {
    return false;
  }
}

/**
 * Generates @font-face CSS for a font file URL
 * Supports Fontsource variable fonts and static fonts
 */
function generateFontFaceCSS(fontFamily: string, url: string): string {
  // Detect variable fonts by URL patterns
  const isVariable = url.includes(":vf@") || url.includes("-wght-") || url.includes("-opsz-");

  // Determine format based on file extension and variable font status
  let format = "woff2";

  if (url.endsWith(".woff")) {
    format = "woff";
  } else if (url.endsWith(".ttf")) {
    format = "truetype";
  } else if (url.endsWith(".otf")) {
    format = "opentype";
  } else if (isVariable && url.endsWith(".woff2")) {
    format = "woff2-variations";
  }

  // Variable fonts support weight range, static fonts use 400
  const fontWeight = isVariable ? "100 900" : "400";

  return `
@font-face {
  font-family: '${fontFamily}';
  font-style: normal;
  font-display: swap;
  font-weight: ${fontWeight};
  src: url(${url}) format('${format}');
}
`.trim();
}

/**
 * Injects a font into the document.
 * - For CSS stylesheet URLs: injects a <link> element
 * - For font file URLs: generates @font-face CSS and injects a <style> element
 *
 * @param id - Unique identifier for this font
 * @param url - CDN URL for the font (stylesheet or font file)
 * @param fontFamily - Font family name (required for font files)
 * @returns The injected element
 */
export function injectFontLink(
  id: string,
  url: string,
  fontFamily?: string,
): HTMLLinkElement | HTMLStyleElement | null {
  if (typeof document === "undefined") return null;

  const elementId = `font-link-${id}`;
  const existingElement = document.getElementById(elementId);

  if (existingElement) {
    return existingElement as HTMLLinkElement | HTMLStyleElement;
  }

  // Check if this is a font file URL that needs @font-face generation
  if (isFontFileUrl(url)) {
    // For font files, we need the font family name to generate @font-face
    const family = fontFamily || extractFontFamilyFromUrl(url);

    if (!family) {
      console.warn("Could not determine font family for font file:", url);

      return null;
    }

    const styleElement = document.createElement("style");

    styleElement.id = elementId;
    styleElement.textContent = generateFontFaceCSS(family, url);
    document.head.appendChild(styleElement);

    return styleElement;
  }

  // For CSS stylesheet URLs, use a <link> element
  const linkElement = document.createElement("link");

  linkElement.id = elementId;
  linkElement.rel = "stylesheet";
  linkElement.href = url;
  document.head.appendChild(linkElement);

  return linkElement;
}

/**
 * Removes a font element by ID
 */
export function removeFontLink(id: string): void {
  if (typeof document === "undefined") return;

  const elementId = `font-link-${id}`;
  const existingElement = document.getElementById(elementId);

  if (existingElement) {
    existingElement.remove();
  }
}

/**
 * Gets font info from a URL for CSS generation.
 * Returns null if the URL is invalid or not from a trusted CDN.
 */
export function getCustomFontInfoFromUrl(url: string): {
  fontFamily: string;
  label: string;
  url: string;
  variable: string;
} | null {
  // Security: Validate URL is from a trusted CDN before processing
  if (!isValidFontCdnUrl(url)) {
    return null;
  }

  const fontFamily = extractFontFamilyFromUrl(url);

  if (!fontFamily) return null;

  const id = `custom-${fontFamily.toLowerCase().replace(/\s+/g, "-")}`;

  return {
    fontFamily,
    label: fontFamily,
    url,
    variable: `--font-${id}`,
  };
}

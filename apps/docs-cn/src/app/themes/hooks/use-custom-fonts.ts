"use client";

import {useCallback, useSyncExternalStore} from "react";

import {extractFontFamilyFromUrl} from "../utils/font-utils";

/**
 * Represents a custom font imported via CDN
 */
export interface CustomFont {
  /** Unique identifier for the font (e.g., "custom-roboto-mono") */
  id: string;
  /** Display label for the font */
  label: string;
  /** CDN URL for the font stylesheet */
  url: string;
  /** CSS variable name (e.g., "--font-custom-roboto-mono") */
  variable: string;
  /** Font family name to use in CSS */
  fontFamily: string;
}

const CUSTOM_FONTS_STORAGE_KEY = "theme-builder-custom-fonts";

// Module-level subscribers set - all hook instances subscribe to this
const subscribers = new Set<() => void>();

// Cached snapshot to avoid creating new arrays on every read
let cachedSnapshot: CustomFont[] = [];

// Stable empty array for server snapshot (avoids creating new reference each call)
const EMPTY_FONTS: CustomFont[] = [];

/**
 * Notify all subscribers that the fonts have changed
 */
function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

/**
 * Reads custom fonts from localStorage and updates cache
 */
function getCustomFontsFromStorage(): CustomFont[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CUSTOM_FONTS_STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored) as CustomFont[];
    }
  } catch {
    // Ignore errors
  }

  return [];
}

/**
 * Saves custom fonts to localStorage and notifies subscribers
 */
function saveCustomFontsToStorage(fonts: CustomFont[]) {
  try {
    localStorage.setItem(CUSTOM_FONTS_STORAGE_KEY, JSON.stringify(fonts));
    cachedSnapshot = fonts;
    notifySubscribers();
  } catch {
    // Ignore errors
  }
}

/**
 * Subscribe function for useSyncExternalStore
 */
function subscribe(callback: () => void): () => void {
  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };
}

/**
 * Get snapshot function for useSyncExternalStore
 * Returns a cached array to maintain referential equality when data hasn't changed
 */
function getSnapshot(): CustomFont[] {
  const current = getCustomFontsFromStorage();

  // Check if we need to update the cache
  // Compare by JSON string since arrays are always new references
  const currentJson = JSON.stringify(current);
  const cachedJson = JSON.stringify(cachedSnapshot);

  if (currentJson !== cachedJson) {
    cachedSnapshot = current;
  }

  return cachedSnapshot;
}

/**
 * Server snapshot - returns stable empty array to avoid hydration mismatches
 */
function getServerSnapshot(): CustomFont[] {
  return EMPTY_FONTS;
}

/**
 * Generates a unique ID for a custom font based on its family name
 */
function generateFontId(fontFamily: string, existingFonts: CustomFont[]): string {
  const baseId = `custom-${fontFamily.toLowerCase().replace(/\s+/g, "-")}`;
  const existingIds = new Set(existingFonts.map((f) => f.id));

  if (!existingIds.has(baseId)) {
    return baseId;
  }

  // Add a number suffix if the ID already exists
  let counter = 2;

  while (existingIds.has(`${baseId}-${counter}`)) {
    counter++;
  }

  return `${baseId}-${counter}`;
}

/**
 * Hook to manage custom fonts stored in localStorage
 * Uses useSyncExternalStore for automatic UI updates across all components
 */
export function useCustomFonts() {
  const customFonts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /**
   * Adds a new custom font from a CDN URL
   * @returns The new font if successful, or an error message if failed
   */
  const addCustomFont = useCallback(
    (url: string, customLabel?: string): {font: CustomFont} | {error: string} => {
      const currentFonts = getCustomFontsFromStorage();

      // Extract font family from URL
      const extractedFamily = extractFontFamilyFromUrl(url);

      if (!extractedFamily && !customLabel) {
        return {
          error:
            "Could not detect font family from URL. Please ensure the URL is a valid font stylesheet.",
        };
      }

      const fontFamily = customLabel || extractedFamily || "Custom Font";

      // Check if this URL is already added
      const existingByUrl = currentFonts.find((f) => f.url === url);

      if (existingByUrl) {
        return {error: `This font is already imported as "${existingByUrl.label}"`};
      }

      const id = generateFontId(fontFamily, currentFonts);
      const variable = `--font-${id}`;

      const newFont: CustomFont = {
        fontFamily,
        id,
        label: fontFamily,
        url,
        variable,
      };

      // Save and notify all subscribers
      saveCustomFontsToStorage([...currentFonts, newFont]);

      return {font: newFont};
    },
    [],
  );

  /**
   * Removes a custom font by ID
   */
  const removeCustomFont = useCallback((id: string) => {
    const currentFonts = getCustomFontsFromStorage();

    // Save and notify all subscribers
    saveCustomFontsToStorage(currentFonts.filter((f) => f.id !== id));
  }, []);

  /**
   * Gets a custom font by ID
   */
  const getCustomFont = useCallback((id: string): CustomFont | undefined => {
    return getCustomFontsFromStorage().find((f) => f.id === id);
  }, []);

  /**
   * Checks if a font ID is a custom font
   */
  const isCustomFont = useCallback((id: string): boolean => {
    return getCustomFontsFromStorage().some((f) => f.id === id);
  }, []);

  return {
    addCustomFont,
    customFonts,
    getCustomFont,
    isCustomFont,
    removeCustomFont,
  };
}

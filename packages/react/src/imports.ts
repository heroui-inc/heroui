/**
 * Central imports for all plugin parts
 */

import type {PluginAPI} from "tailwindcss/plugin";

// Base styles
import general from "./base/general";

// Utilities
import animations from "./utilities/animations";
import glass from "./utilities/glass";

// Type for plugin functions
export type PluginFunction = (api: PluginAPI & {prefix: string}) => void;

export type PluginGroup = Record<string, PluginFunction>;

export const base: PluginGroup = {
  general,
};

export const components: PluginGroup = {};

export const utilities: PluginGroup = {
  animations,
  glass,
};

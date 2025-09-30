import {tv as tvBase, TV} from "tailwind-variants";

import {twMergeConfig} from "./tw-merge-config";

const PREFIX = "vg-";

export const tv: TV = (options, config) => {
  // At RUNTIME, classes already have vg- prefix from babel
  // Configure tailwind-merge to strip prefix, merge, then add back
  return tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      theme: {
        ...config?.twMergeConfig?.theme,
        ...twMergeConfig.theme,
      },
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig.classGroups,
      },
      // Strip vg- prefix before parsing, so tailwind-merge can recognize the classes
      experimentalParseClassName: ({ className, parseClassName }) => {
        // Handle !important with prefix: !vg-outline-none
        if (className.startsWith('!')) {
          const rest = className.substring(1);
          if (rest.startsWith(PREFIX)) {
            return parseClassName('!' + rest.substring(PREFIX.length));
          }
          return parseClassName(className);
        }

        // Regular prefixed class: vg-text-red-500 -> text-red-500 (for parsing only)
        if (className.startsWith(PREFIX)) {
          return parseClassName(className.substring(PREFIX.length));
        }

        return parseClassName(className);
      },
    },
  });
};

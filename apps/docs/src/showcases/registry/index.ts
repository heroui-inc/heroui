import type {ShowcaseCategory} from "../types";

import {navigationShowcases} from "./navigation";

// Register all showcase categories here
// This is the central place to add new category imports
export const showcaseCategories: ShowcaseCategory[] = [
  {
    items: navigationShowcases,
    name: "Navigation",
  },
  // Add more categories as needed, e.g.:
  // {
  //   items: cardShowcases,
  //   name: "Cards",
  // },
];

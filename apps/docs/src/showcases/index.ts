export type {ShowcaseAuthor, Theme, ShowcaseItem, ShowcaseCategory} from "./types";

import type {ShowcaseCategory, ShowcaseItem} from "./types";

import {showcaseCategories} from "./registry";

const showcasesMap: Record<string, ShowcaseItem & {category: string}> = {};

showcaseCategories.forEach((category) => {
  category.items.forEach((item) => {
    showcasesMap[item.name] = {...item, category: category.name};
  });
});

export function getShowcase(name: string): (ShowcaseItem & {category: string}) | undefined {
  return showcasesMap[name];
}

export function getAllShowcases(): ShowcaseItem[] {
  return showcaseCategories.flatMap((category) => category.items);
}

export function getShowcaseCategories(): ShowcaseCategory[] {
  return showcaseCategories;
}

export function getShowcasesByCategory(categoryName: string): ShowcaseItem[] {
  const category = showcaseCategories.find((cat) => cat.name === categoryName);

  return category ? category.items : [];
}

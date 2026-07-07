"use client";

import {PlanetEarth, Rocket, ShoppingBag, SquareArticle} from "@gravity-ui/icons";
import {Tag, TagGroup} from "@heroui/react";

const tagClass =
  "group/tag gap-1.5 rounded-full border border-neutral-300/80 bg-white/80 px-2.5 py-1 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-colors data-[selected=true]:border-neutral-500 data-[selected=true]:bg-neutral-900 data-[selected=true]:text-neutral-50 dark:border-neutral-600/80 dark:bg-neutral-900/60 dark:text-neutral-200 dark:ring-white/10 dark:data-[selected=true]:border-neutral-400 dark:data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:text-neutral-900";

const iconClass =
  "size-4 shrink-0 text-neutral-500 group-data-[selected=true]/tag:text-current dark:text-neutral-400";

export function CustomStyles() {
  return (
    <TagGroup aria-label="主题" selectionMode="single">
      <TagGroup.List className="gap-2">
        <Tag className={tagClass} id="news">
          <SquareArticle className={iconClass} />
          资讯
        </Tag>
        <Tag className={tagClass} id="travel">
          <PlanetEarth className={iconClass} />
          旅行
        </Tag>
        <Tag className={tagClass} id="gaming">
          <Rocket className={iconClass} />
          游戏
        </Tag>
        <Tag className={tagClass} id="shopping">
          <ShoppingBag className={iconClass} />
          购物
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}

"use client";

import {PlanetEarth, Rocket, ShoppingBag, SquareArticle} from "@gravity-ui/icons";
import {Tag, TagGroup} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <TagGroup
      aria-label="标签"
      render={(props) => <div {...props} data-custom="foo" />}
      selectionMode="single"
    >
      <TagGroup.List>
        <Tag id="default-news">
          <SquareArticle />
          资讯
        </Tag>
        <Tag id="default-travel">
          <PlanetEarth />
          旅行
        </Tag>
        <Tag id="default-gaming">
          <Rocket />
          游戏
        </Tag>
        <Tag id="default-shopping">
          <ShoppingBag />
          购物
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}

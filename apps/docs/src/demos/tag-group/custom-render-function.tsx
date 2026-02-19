"use client";

import {PlanetEarth, Rocket, ShoppingBag, SquareArticle} from "@gravity-ui/icons";
import {Tag, TagGroup} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <TagGroup
      aria-label="Tags"
      render={(props) => <div {...props} data-custom="foo" />}
      selectionMode="single"
    >
      <TagGroup.List>
        <Tag id="default-news">
          <SquareArticle />
          News
        </Tag>
        <Tag id="default-travel">
          <PlanetEarth />
          Travel
        </Tag>
        <Tag id="default-gaming">
          <Rocket />
          Gaming
        </Tag>
        <Tag id="default-shopping">
          <ShoppingBag />
          Shopping
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}

"use client";

import {Tag, TagGroup} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TagGroupBasic() {
  return (
    <TagGroup
      aria-label="Tags"
      selectionMode="single"
      onRemove={(ids) => alert(`Remove ${[...ids]}`)}
    >
      <TagGroup.List>
        <Tag id="default-news">
          <Icon icon="gravity-ui:square-article" />
          News
        </Tag>
        <Tag id="default-travel">
          <Icon icon="gravity-ui:planet-earth" />
          Travel
        </Tag>
        <Tag id="default-gaming">
          <Icon icon="gravity-ui:rocket" />
          Gaming
        </Tag>
        <Tag id="default-shopping">
          <Icon icon="gravity-ui:shopping-bag" />
          Shopping
        </Tag>
      </TagGroup.List>
    </TagGroup>
  );
}

"use client";

import type {Key} from "@heroui/react";

import {Description, Label, Tag, TagGroup} from "@heroui/react";
import {useState} from "react";

export function TagGroupControlled() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set(["news", "travel"]));

  return (
    <div className="flex flex-col gap-3">
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(keys)}
      >
        <Label>Categories (controlled)</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
        <Description>
          Selected: {Array.from(selected).length > 0 ? Array.from(selected).join(", ") : "None"}
        </Description>
      </TagGroup>
    </div>
  );
}

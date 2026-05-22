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
        <Label>分类（受控）</Label>
        <TagGroup.List>
          <Tag id="news">资讯</Tag>
          <Tag id="travel">旅行</Tag>
          <Tag id="gaming">游戏</Tag>
          <Tag id="shopping">购物</Tag>
        </TagGroup.List>
        <Description>
          已选：{Array.from(selected).length > 0 ? Array.from(selected).join(", ") : "无"}
        </Description>
      </TagGroup>
    </div>
  );
}

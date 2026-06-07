"use client";

import type {Key} from "@heroui/react";

import {Description, Label, Tag, TagGroup} from "@heroui/react";
import {useState} from "react";

export function TagGroupSelectionModes() {
  const [singleSelected, setSingleSelected] = useState<Iterable<Key>>(new Set(["news"]));
  const [multipleSelected, setMultipleSelected] = useState<Iterable<Key>>(
    new Set(["news", "travel"]),
  );

  return (
    <div className="flex flex-col gap-8">
      <TagGroup
        selectedKeys={singleSelected}
        selectionMode="single"
        onSelectionChange={(keys) => setSingleSelected(keys)}
      >
        <Label>单选</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
          <Tag>购物</Tag>
        </TagGroup.List>
        <Description>选择一个分类</Description>
      </TagGroup>

      <TagGroup
        selectedKeys={multipleSelected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setMultipleSelected(keys)}
      >
        <Label>多选</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
          <Tag>购物</Tag>
        </TagGroup.List>
        <Description>选择多个分类</Description>
      </TagGroup>
    </div>
  );
}

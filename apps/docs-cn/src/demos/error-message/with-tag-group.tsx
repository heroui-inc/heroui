"use client";

import type {Key} from "@heroui/react";

import {Description, ErrorMessage, Label, Tag, TagGroup} from "@heroui/react";
import {useMemo, useState} from "react";

export function ErrorMessageWithTagGroup() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());

  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={(keys) => setSelected(keys)}
    >
      <Label>必选分类</Label>
      <TagGroup.List>
        <Tag id="news">新闻</Tag>
        <Tag id="travel">旅游</Tag>
        <Tag id="gaming">游戏</Tag>
        <Tag id="shopping">购物</Tag>
      </TagGroup.List>
      <Description>请至少选择一个分类</Description>
      <ErrorMessage>{!!isInvalid && <>请至少选择一个分类</>}</ErrorMessage>
    </TagGroup>
  );
}

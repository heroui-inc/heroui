"use client";

import type {Key} from "@heroui/react";

import {Description, ErrorMessage, Label, Tag, TagGroup} from "@heroui/react";
import {useMemo, useState} from "react";

export function TagGroupWithErrorMessage() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());

  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={(keys) => setSelected(keys)}
    >
      <Label>设施</Label>
      <TagGroup.List>
        <Tag id="laundry">洗衣</Tag>
        <Tag id="fitness">健身中心</Tag>
        <Tag id="parking">停车</Tag>
        <Tag id="pool">游泳池</Tag>
        <Tag id="breakfast">早餐</Tag>
      </TagGroup.List>
      <Description>
        {isInvalid ? "请至少选择一个分类" : "已选：" + Array.from(selected).join(", ")}
      </Description>
      <ErrorMessage>{!!isInvalid && <>请至少选择一个分类</>}</ErrorMessage>
    </TagGroup>
  );
}

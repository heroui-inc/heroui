"use client";

import type {Key} from "@heroui/react";

import {Description, ErrorMessage, Label, Tag, TagGroup} from "@heroui/react";
import {useState} from "react";

export function TagGroupWithErrorMessage() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());

  const isInvalid = Array.from(selected).length === 0;

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={(keys) => setSelected(keys)}
    >
      <Label>Required Categories</Label>
      <TagGroup.List>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
      </TagGroup.List>
      <Description>Select at least one category</Description>
      {!!isInvalid && <ErrorMessage>Please select at least one category</ErrorMessage>}
    </TagGroup>
  );
}

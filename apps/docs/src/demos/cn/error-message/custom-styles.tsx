"use client";

import type {Key} from "@heroui/react";

import {Description, ErrorMessage, Label, Tag, TagGroup} from "@heroui/react";
import {useMemo, useState} from "react";

export function CustomStyles() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());
  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

  return (
    <TagGroup
      className="w-full max-w-xs gap-1.5"
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={setSelected}
    >
      <Label>主题</Label>
      <TagGroup.List>
        <Tag id="api">API</Tag>
        <Tag id="design">设计</Tag>
        <Tag id="docs">文档</Tag>
      </TagGroup.List>
      <Description>请至少选择一个主题</Description>
      <ErrorMessage className="font-medium text-danger">
        {!!isInvalid && <>请至少选择一个主题</>}
      </ErrorMessage>
    </TagGroup>
  );
}

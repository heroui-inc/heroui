"use client";

import type {Key} from "@heroui/react";

import {Description, ErrorMessage, Label, Tag, TagGroup} from "@heroui/react";
import {useMemo, useState} from "react";

export function CustomStyles() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());
  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

  return (
    <TagGroup
      className="w-full max-w-xs gap-2"
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={setSelected}
    >
      <Label className="text-sm font-medium tracking-tight text-foreground">Topics</Label>
      <TagGroup.List className="gap-1.5">
        <Tag id="api">API</Tag>
        <Tag id="design">Design</Tag>
        <Tag id="docs">Docs</Tag>
      </TagGroup.List>
      <Description className="text-xs tracking-wide text-muted">
        Pick at least one topic
      </Description>
      <ErrorMessage className="text-xs font-medium tracking-wide text-danger">
        {!!isInvalid && <>Choose at least one topic</>}
      </ErrorMessage>
    </TagGroup>
  );
}

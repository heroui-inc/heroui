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
      <Label>Amenities</Label>
      <TagGroup.List>
        <Tag id="laundry">Laundry</Tag>
        <Tag id="fitness">Fitness center</Tag>
        <Tag id="parking">Parking</Tag>
        <Tag id="pool">Swimming pool</Tag>
        <Tag id="breakfast">Breakfast</Tag>
      </TagGroup.List>
      <Description>
        {isInvalid
          ? "Select at least one category"
          : "Selected: " + Array.from(selected).join(", ")}
      </Description>
      {!!isInvalid && <ErrorMessage>Please select at least one category</ErrorMessage>}
    </TagGroup>
  );
}

"use client";

import type {Key} from "@heroui/react";

import {Description, Form, Label, Tag, TagGroup} from "@heroui/react";
import {useState} from "react";

export function TagGroupOnFormField() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());

  return (
    <Form>
      <TagGroup
        isOnFormField
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(keys)}
      >
        <Label>Interests</Label>
        <TagGroup.List>
          <Tag id="technology">Technology</Tag>
          <Tag id="design">Design</Tag>
          <Tag id="music">Music</Tag>
          <Tag id="sports">Sports</Tag>
          <Tag id="travel">Travel</Tag>
        </TagGroup.List>
        <Description>
          {Array.from(selected).length > 0
            ? `Selected: ${Array.from(selected).join(", ")}`
            : "Select your interests"}
        </Description>
      </TagGroup>
    </Form>
  );
}

"use client";

import {Description, Form, Label, ListBox, Select, Surface, Tag, TagGroup} from "@heroui/react";

export function TagGroupVariants() {
  const items = [
    {id: "news", name: "News"},
    {id: "travel", name: "Travel"},
    {id: "gaming", name: "Gaming"},
  ];

  return (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single" variant="default">
        <Label>Default</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>

      <TagGroup selectionMode="single" variant="surface">
        <Label>Surface</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>

      <div className="flex w-sm items-center justify-center rounded-3xl bg-surface p-4">
        <Surface className="w-full">
          <TagGroup selectionMode="single" variant="on-surface">
            <Label>On Surface</Label>
            <TagGroup.List>
              <Tag>News</Tag>
              <Tag>Travel</Tag>
              <Tag>Gaming</Tag>
            </TagGroup.List>
            <Description>Tags on surface component</Description>
          </TagGroup>
        </Surface>
      </div>

      <Form className="w-100">
        <div className="flex flex-col gap-2">
          <Select
            className="w-full"
            defaultValue={["news", "travel"]}
            placeholder="Select items"
            selectionMode="multiple"
          >
            <Select.Trigger>
              <Select.Value className="no-truncate flex flex-wrap gap-2">
                {({defaultChildren, isPlaceholder, state}) => {
                  if (isPlaceholder || state.selectedItems.length === 0) {
                    return defaultChildren;
                  }

                  const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                  return (
                    <TagGroup variant="on-form-field">
                      <Label>On Form Field</Label>
                      <TagGroup.List className="flex flex-wrap gap-1">
                        {selectedItemsKeys.map((selectedItemKey) => {
                          const item = items.find((s) => s.id === selectedItemKey);

                          if (!item) return null;

                          return (
                            <Tag key={item.id} id={item.id}>
                              {item.name}
                            </Tag>
                          );
                        })}
                      </TagGroup.List>
                    </TagGroup>
                  );
                }}
              </Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {items.map((skill) => (
                  <ListBox.Item key={skill.id} id={skill.id} textValue={skill.name}>
                    {skill.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </Form>
    </div>
  );
}

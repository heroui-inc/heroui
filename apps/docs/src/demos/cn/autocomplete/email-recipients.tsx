"use client";

import type {Key} from "@heroui/react";

import {
  Autocomplete,
  Description,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  Tag,
  TagGroup,
  useFilter,
} from "@heroui/react";
import {useState} from "react";

export function EmailRecipients() {
  const emails = [
    {email: "alice@example.com", id: "alice@example.com", name: "Alice Johnson"},
    {email: "bob@example.com", id: "bob@example.com", name: "Bob Smith"},
    {email: "charlie@example.com", id: "charlie@example.com", name: "Charlie Brown"},
    {email: "diana@example.com", id: "diana@example.com", name: "Diana Prince"},
    {email: "eve@example.com", id: "eve@example.com", name: "Eve Wilson"},
  ];

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const {contains} = useFilter({sensitivity: "base"});

  const onRemoveTags = (keys: Set<Key>) => {
    setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="添加收件人"
      selectionMode="multiple"
      value={selectedKeys}
      onChange={(keys) => setSelectedKeys(keys as Key[])}
    >
      <Label>收件人</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({defaultChildren, isPlaceholder, state}) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            const selectedItemsKeys = state.selectedItems.map((item) => item.key);

            return (
              <TagGroup size="sm" onRemove={onRemoveTags}>
                <TagGroup.List>
                  {selectedItemsKeys.map((selectedItemKey) => {
                    const email = emails.find((e) => e.id === selectedItemKey);

                    if (!email) return null;

                    return (
                      <Tag key={email.id} id={email.id}>
                        {email.email}
                      </Tag>
                    );
                  })}
                </TagGroup.List>
              </TagGroup>
            );
          }}
        </Autocomplete.Value>
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="搜索邮箱…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox renderEmptyState={() => <EmptyState>未找到收件人</EmptyState>}>
            {emails.map((email) => (
              <ListBox.Item key={email.id} id={email.id} textValue={email.email}>
                <div className="flex flex-col">
                  <Label>{email.name}</Label>
                  <Description>{email.email}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}

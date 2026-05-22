"use client";

import type {Key} from "@heroui/react";

import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  Tag,
  TagGroup,
  useFilter,
} from "@heroui/react";
import {useState} from "react";

export function Variants() {
  const [selectedKey1, setSelectedKey1] = useState<Key | null>(null);
  const [selectedKey2, setSelectedKey2] = useState<Key | null>(null);
  const [selectedKeys1, setSelectedKeys1] = useState<Key[]>([]);
  const [selectedKeys2, setSelectedKeys2] = useState<Key[]>([]);
  const {contains} = useFilter({sensitivity: "base"});

  const items = [
    {id: "option1", name: "选项 1"},
    {id: "option2", name: "选项 2"},
    {id: "option3", name: "选项 3"},
    {id: "option4", name: "选项 4"},
  ];

  const onRemoveTags1 = (keys: Set<Key>) => {
    setSelectedKeys1((prev) => prev.filter((key) => !keys.has(key)));
  };

  const onRemoveTags2 = (keys: Set<Key>) => {
    setSelectedKeys2((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">单选变体</h3>
        <div className="flex flex-col gap-4">
          <Autocomplete
            className="w-[256px]"
            placeholder="请选择一项"
            selectionMode="single"
            value={selectedKey1}
            variant="primary"
            onChange={setSelectedKey1}
          >
            <Label>主色（primary）变体</Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.ClearButton />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <SearchField autoFocus name="search" variant="secondary">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="搜索…" />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>
                <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
                  {items.map((item) => (
                    <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                      {item.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
          <Autocomplete
            className="w-[256px]"
            placeholder="请选择一项"
            selectionMode="single"
            value={selectedKey2}
            variant="secondary"
            onChange={setSelectedKey2}
          >
            <Label>次色（secondary）变体</Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.ClearButton />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <SearchField autoFocus name="search" variant="secondary">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="搜索…" />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>
                <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
                  {items.map((item) => (
                    <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                      {item.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">多选变体</h3>
        <div className="flex flex-col gap-4">
          <Autocomplete
            className="w-[256px]"
            placeholder="选择多项"
            selectionMode="multiple"
            value={selectedKeys1}
            variant="primary"
            onChange={(keys) => setSelectedKeys1(keys as Key[])}
          >
            <Label>主色（primary）变体</Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value>
                {({defaultChildren, isPlaceholder, state}) => {
                  if (isPlaceholder || state.selectedItems.length === 0) {
                    return defaultChildren;
                  }

                  const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                  return (
                    <TagGroup size="sm" onRemove={onRemoveTags1}>
                      <TagGroup.List>
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
              </Autocomplete.Value>
              <Autocomplete.ClearButton />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <SearchField autoFocus name="search" variant="secondary">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="搜索…" />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>
                <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
                  {items.map((item) => (
                    <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                      {item.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
          <Autocomplete
            className="w-[256px]"
            placeholder="选择多项"
            selectionMode="multiple"
            value={selectedKeys2}
            variant="secondary"
            onChange={(keys) => setSelectedKeys2(keys as Key[])}
          >
            <Label>次色（secondary）变体</Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value>
                {({defaultChildren, isPlaceholder, state}) => {
                  if (isPlaceholder || state.selectedItems.length === 0) {
                    return defaultChildren;
                  }

                  const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                  return (
                    <TagGroup size="sm" variant="surface" onRemove={onRemoveTags2}>
                      <TagGroup.List>
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
              </Autocomplete.Value>
              <Autocomplete.ClearButton />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Popover>
              <Autocomplete.Filter filter={contains}>
                <SearchField autoFocus name="search" variant="secondary">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="搜索…" />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>
                <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
                  {items.map((item) => (
                    <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                      {item.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Autocomplete.Filter>
            </Autocomplete.Popover>
          </Autocomplete>
        </div>
      </div>
    </div>
  );
}

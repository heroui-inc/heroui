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

const TEAMMATES = [
  {id: "sarah", name: "Sarah Chen", role: "产品设计"},
  {id: "marcus", name: "Marcus Lee", role: "工程"},
  {id: "priya", name: "Priya Patel", role: "数据科学"},
  {id: "jordan", name: "Jordan Kim", role: "客户成功"},
  {id: "alex", name: "Alex Rivera", role: "市场营销"},
] as const;

export function CustomStyles() {
  const {contains} = useFilter({sensitivity: "base"});
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const onRemoveTags = (keys: Set<Key>) => {
    setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <div className="w-full max-w-sm pt-6">
      <Autocomplete
        className="w-full gap-1.5"
        placeholder="搜索团队成员..."
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys((keys ?? []) as Key[])}
      >
        <Label className="font-medium text-foreground">负责人</Label>
        <Description>任务更新时将通知以下人员。</Description>
        <Autocomplete.Trigger className="rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-accent/5 transition-[box-shadow,border-color] focus-within:border-accent/25 focus-within:ring-2 focus-within:ring-accent/15 dark:border-border/90 dark:bg-surface dark:ring-accent/10 dark:focus-within:border-accent/35">
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
                      const teammate = TEAMMATES.find((member) => member.id === selectedItemKey);

                      if (!teammate) return null;

                      return (
                        <Tag
                          key={teammate.id}
                          className="border border-accent/15 bg-accent/8 text-foreground dark:border-accent/25 dark:bg-accent/12"
                          id={teammate.id}
                        >
                          {teammate.name}
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
        <Autocomplete.Popover className="overflow-hidden rounded-xl border border-border/80 bg-surface shadow-xl ring-1 ring-black/3 dark:border-border/90 dark:bg-surface dark:ring-white/5">
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search" variant="secondary">
              <SearchField.Group className="border-b border-separator bg-surface-secondary/50">
                <SearchField.SearchIcon className="text-muted" />
                <SearchField.Input placeholder="按姓名或角色搜索..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox
              className="p-1.5"
              renderEmptyState={() => <EmptyState>未找到团队成员</EmptyState>}
            >
              {TEAMMATES.map((teammate) => (
                <ListBox.Item
                  key={teammate.id}
                  className="rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5 dark:data-[focused=true]:bg-accent/15 dark:data-[selected=true]:bg-accent/8"
                  id={teammate.id}
                  textValue={`${teammate.name} ${teammate.role}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{teammate.name}</span>
                    <span className="text-xs text-muted">{teammate.role}</span>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    </div>
  );
}

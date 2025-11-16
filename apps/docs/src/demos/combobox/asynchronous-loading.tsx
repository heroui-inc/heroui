"use client";

import {
  Collection,
  ComboBox,
  EmptyState,
  Input,
  Label,
  ListBox,
  ListBoxLoadMoreItem,
  Spinner,
} from "@heroui/react";
import {useAsyncList} from "@react-stately/data";

interface Character {
  name: string;
}

export function AsynchronousLoading() {
  const list = useAsyncList<Character>({
    async load({cursor, filterText, signal}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      const res = await fetch(cursor || `https://swapi.py4e.com/api/people/?search=${filterText}`, {
        signal,
      });
      const json = await res.json();

      return {
        cursor: json.next,
        items: json.results,
      };
    },
  });

  return (
    <ComboBox
      allowsEmptyCollection
      className="w-[256px]"
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
    >
      <Label>Pick a Character</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Star Wars characters..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox renderEmptyState={() => <EmptyState />}>
          <Collection items={list.items}>
            {(item) => (
              <ListBox.Item id={item.name} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </Collection>
          <ListBoxLoadMoreItem
            isLoading={list.loadingState === "loadingMore"}
            onLoadMore={list.loadMore}
          >
            <div className="flex items-center justify-center gap-2 py-2">
              <Spinner size="sm" />
              <span className="muted text-sm">Loading more...</span>
            </div>
          </ListBoxLoadMoreItem>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

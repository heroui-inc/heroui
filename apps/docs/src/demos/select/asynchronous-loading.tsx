"use client";

import {Label, ListBox, Select, Spinner} from "@heroui/react";
import {useAsyncList} from "@react-stately/data";
import {Collection, ListBoxLoadMoreItem} from "react-aria-components";

interface Pokemon {
  name: string;
}

export function AsynchronousLoading() {
  const list = useAsyncList<Pokemon>({
    async load({cursor, signal}) {
      const res = await fetch(cursor || `https://pokeapi.co/api/v2/pokemon`, {signal});
      const json = await res.json();

      return {
        cursor: json.next,
        items: json.results,
      };
    },
  });

  return (
    <Select className="w-[256px]" placeholder="Select a Pokemon">
      <Label>Pick a Pokemon</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <Collection items={list.items}>
            {(item: Pokemon) => (
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
              <span className="text-muted text-sm">Loading more...</span>
            </div>
          </ListBoxLoadMoreItem>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

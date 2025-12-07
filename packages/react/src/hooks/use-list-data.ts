/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * This file is based on the useListData hook from @react-stately/data package.
 * Original source: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/data/src/useListData.ts
 *
 * Why we copied this code instead of using @react-stately/data as a dependency:
 * We copied this implementation to avoid adding @react-stately/data as a dependency, which is a
 * large package that would significantly increase our bundle size. We maintain full attribution to
 * Adobe and comply with the Apache License 2.0 requirements.
 */

import type {Key, Selection} from "@react-types/shared";

import {useMemo, useState} from "react";

export interface ListOptions<T> {
  /** Initial items in the list. */
  initialItems?: T[];
  /** The keys for the initially selected items. */
  initialSelectedKeys?: "all" | Iterable<Key>;
  /** The initial text to filter the list by. */
  initialFilterText?: string;
  /** A function that returns a unique key for an item object. */
  getKey?: (item: T) => Key;
  /** A function that returns whether a item matches the current filter text. */
  filter?: (item: T, filterText: string) => boolean;
}

export interface ListData<T> {
  /** The items in the list. */
  items: T[];

  /** The keys of the currently selected items in the list. */
  selectedKeys: Selection;

  /** Sets the selected keys. */
  setSelectedKeys(keys: Selection): void;

  /** Adds the given keys to the current selected keys. */
  addKeysToSelection(keys: Selection): void;

  /** Removes the given keys from the current selected keys. */
  removeKeysFromSelection(keys: Selection): void;

  /** The current filter text. */
  filterText: string;

  /** Sets the filter text. */
  setFilterText(filterText: string): void;

  /**
   * Gets an item from the list by key.
   * @param key - The key of the item to retrieve.
   */
  getItem(key: Key): T | undefined;

  /**
   * Inserts items into the list at the given index.
   * @param index - The index to insert into.
   * @param values - The values to insert.
   */
  insert(index: number, ...values: T[]): void;

  /**
   * Inserts items into the list before the item at the given key.
   * @param key - The key of the item to insert before.
   * @param values - The values to insert.
   */
  insertBefore(key: Key, ...values: T[]): void;

  /**
   * Inserts items into the list after the item at the given key.
   * @param key - The key of the item to insert after.
   * @param values - The values to insert.
   */
  insertAfter(key: Key, ...values: T[]): void;

  /**
   * Appends items to the list.
   * @param values - The values to insert.
   */
  append(...values: T[]): void;

  /**
   * Prepends items to the list.
   * @param value - The value to insert.
   */
  prepend(...values: T[]): void;

  /**
   * Removes items from the list by their keys.
   * @param keys - The keys of the item to remove.
   */
  remove(...keys: Key[]): void;

  /**
   * Removes all items from the list that are currently
   * in the set of selected items.
   */
  removeSelectedItems(): void;

  /**
   * Moves an item within the list.
   * @param key - The key of the item to move.
   * @param toIndex - The index to move the item to.
   */
  move(key: Key, toIndex: number): void;

  /**
   * Moves one or more items before a given key.
   * @param key - The key of the item to move the items before.
   * @param keys - The keys of the items to move.
   */
  moveBefore(key: Key, keys: Iterable<Key>): void;

  /**
   * Moves one or more items after a given key.
   * @param key - The key of the item to move the items after.
   * @param keys - The keys of the items to move.
   */
  moveAfter(key: Key, keys: Iterable<Key>): void;

  /**
   * Updates an item in the list.
   * @param key - The key of the item to update.
   * @param newValue - The new value for the item, or a function that returns the new value based on the previous value.
   */
  update(key: Key, newValue: T | ((prev: T) => T)): void;
}

export interface ListState<T> {
  items: T[];
  selectedKeys: Selection;
  filterText: string;
}

interface CreateListOptions<T, C> extends ListOptions<T> {
  cursor?: C;
}

/**
 * Manages state for an immutable list data structure, and provides convenience methods to
 * update the data over time.
 */
export function useListData<T>(options: ListOptions<T>): ListData<T> {
  const {
    filter,
    getKey = (item: any) => item.id ?? item.key,
    initialFilterText = "",
    initialItems = [],
    initialSelectedKeys,
  } = options;

  // Store both items and filteredItems in state so we can go back to the unfiltered list
  const [state, setState] = useState<ListState<T>>({
    items: initialItems,
    selectedKeys: initialSelectedKeys === "all" ? "all" : new Set(initialSelectedKeys || []),
    filterText: initialFilterText,
  });

  const filteredItems = useMemo(
    () => (filter ? state.items.filter((item) => filter(item, state.filterText)) : state.items),
    [state.items, state.filterText, filter],
  );

  return {
    ...state,
    items: filteredItems,
    ...createListActions({getKey}, setState),
    getItem(key: Key) {
      return state.items.find((item) => getKey(item) === key);
    },
  };
}

export function createListActions<T, C>(
  opts: CreateListOptions<T, C>,
  dispatch: (updater: (state: ListState<T>) => ListState<T>) => void,
): Omit<ListData<T>, "items" | "selectedKeys" | "getItem" | "filterText"> {
  const {cursor, getKey} = opts;

  return {
    setSelectedKeys(selectedKeys: Selection) {
      dispatch((state) => ({
        ...state,
        selectedKeys,
      }));
    },
    addKeysToSelection(selectedKeys: Selection) {
      dispatch((state) => {
        if (state.selectedKeys === "all") {
          return state;
        }
        if (selectedKeys === "all") {
          return {
            ...state,
            selectedKeys: "all",
          };
        }

        return {
          ...state,
          selectedKeys: new Set([...state.selectedKeys, ...selectedKeys]),
        };
      });
    },
    removeKeysFromSelection(selectedKeys: Selection) {
      dispatch((state) => {
        if (selectedKeys === "all") {
          return {
            ...state,
            selectedKeys: new Set(),
          };
        }

        const selection: Selection =
          state.selectedKeys === "all"
            ? new Set(state.items.map(getKey!))
            : new Set(state.selectedKeys);

        for (const key of selectedKeys) {
          selection.delete(key);
        }

        return {
          ...state,
          selectedKeys: selection,
        };
      });
    },
    setFilterText(filterText: string) {
      dispatch((state) => ({
        ...state,
        filterText,
      }));
    },
    insert(index: number, ...values: T[]) {
      dispatch((state) => insert(state, index, ...values));
    },
    insertBefore(key: Key, ...values: T[]) {
      dispatch((state) => {
        let index = state.items.findIndex((item) => getKey?.(item) === key);

        if (index === -1) {
          if (state.items.length === 0) {
            index = 0;
          } else {
            return state;
          }
        }

        return insert(state, index, ...values);
      });
    },
    insertAfter(key: Key, ...values: T[]) {
      dispatch((state) => {
        let index = state.items.findIndex((item) => getKey?.(item) === key);

        if (index === -1) {
          if (state.items.length === 0) {
            index = 0;
          } else {
            return state;
          }
        }

        return insert(state, index + 1, ...values);
      });
    },
    prepend(...values: T[]) {
      dispatch((state) => insert(state, 0, ...values));
    },
    append(...values: T[]) {
      dispatch((state) => insert(state, state.items.length, ...values));
    },
    remove(...keys: Key[]) {
      dispatch((state) => {
        const keySet = new Set(keys);
        const items = state.items.filter((item) => !keySet.has(getKey!(item)));

        let selection: Selection = "all";

        if (state.selectedKeys !== "all") {
          selection = new Set(state.selectedKeys);
          for (const key of keys) {
            selection.delete(key);
          }
        }
        if (cursor == null && items.length === 0) {
          selection = new Set();
        }

        return {
          ...state,
          items,
          selectedKeys: selection,
        };
      });
    },
    removeSelectedItems() {
      dispatch((state) => {
        if (state.selectedKeys === "all") {
          return {
            ...state,
            items: [],
            selectedKeys: new Set(),
          };
        }

        const selectedKeys = state.selectedKeys;
        const items = state.items.filter((item) => !selectedKeys.has(getKey!(item)));

        return {
          ...state,
          items,
          selectedKeys: new Set(),
        };
      });
    },
    move(key: Key, toIndex: number) {
      dispatch((state) => {
        const index = state.items.findIndex((item) => getKey!(item) === key);

        if (index === -1) {
          return state;
        }

        const copy = state.items.slice();
        const [item] = copy.splice(index, 1);

        if (item !== undefined) {
          copy.splice(toIndex, 0, item);
        }

        return {
          ...state,
          items: copy,
        };
      });
    },
    moveBefore(key: Key, keys: Iterable<Key>) {
      dispatch((state) => {
        const toIndex = state.items.findIndex((item) => getKey!(item) === key);

        if (toIndex === -1) {
          return state;
        }

        // Find indices of keys to move. Sort them so that the order in the list is retained.
        const keyArray = Array.isArray(keys) ? keys : [...keys];
        const indices = keyArray
          .map((key) => state.items.findIndex((item) => getKey!(item) === key))
          .sort((a, b) => a - b);

        return move(state, indices, toIndex);
      });
    },
    moveAfter(key: Key, keys: Iterable<Key>) {
      dispatch((state) => {
        const toIndex = state.items.findIndex((item) => getKey!(item) === key);

        if (toIndex === -1) {
          return state;
        }

        const keyArray = Array.isArray(keys) ? keys : [...keys];
        const indices = keyArray
          .map((key) => state.items.findIndex((item) => getKey!(item) === key))
          .sort((a, b) => a - b);

        return move(state, indices, toIndex + 1);
      });
    },
    update(key: Key, newValue: T | ((prev: T) => T)) {
      dispatch((state) => {
        const index = state.items.findIndex((item) => getKey!(item) === key);

        if (index === -1) {
          return state;
        }

        const currentItem = state.items[index];

        if (currentItem === undefined) {
          return state;
        }

        let updatedValue: T;

        if (typeof newValue === "function") {
          updatedValue = (newValue as (prev: T) => T)(currentItem);
        } else {
          updatedValue = newValue;
        }

        return {
          ...state,
          items: [...state.items.slice(0, index), updatedValue, ...state.items.slice(index + 1)],
        };
      });
    },
  };
}

function insert<T>(state: ListState<T>, index: number, ...values: T[]): ListState<T> {
  return {
    ...state,
    items: [...state.items.slice(0, index), ...values, ...state.items.slice(index)],
  };
}

function move<T>(state: ListState<T>, indices: number[], toIndex: number): ListState<T> {
  // Shift the target down by the number of items being moved from before the target
  toIndex -= indices.filter((index) => index < toIndex).length;

  const moves = indices.map((from) => ({
    from,
    to: toIndex++,
  }));

  // Shift later from indices down if they have a larger index
  for (let i = 0; i < moves.length; i++) {
    const a = moves[i]!;

    for (let j = i; j < moves.length; j++) {
      const b = moves[j]!;

      if (b.from > a.from) {
        b.from--;
      }
    }
  }

  // Interleave the moves so they can be applied one by one rather than all at once
  for (let i = 0; i < moves.length; i++) {
    const a = moves[i]!;

    for (let j = moves.length - 1; j > i; j--) {
      const b = moves[j]!;

      if (b.from < a.to) {
        a.to++;
      } else {
        b.from++;
      }
    }
  }

  const copy = state.items.slice();

  for (const moveItem of moves) {
    const [item] = copy.splice(moveItem.from, 1);

    if (item !== undefined) {
      copy.splice(moveItem.to, 0, item);
    }
  }

  return {
    ...state,
    items: copy,
  };
}

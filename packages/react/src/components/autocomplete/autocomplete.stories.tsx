import type {Key} from "@heroui/react";
import type {Meta, StoryObj} from "@storybook/react";

import {useRef, useState} from "react";

import {useFilter} from "../../hooks/use-filter";
import {Label} from "../label";
import {ListBox} from "../listbox";
import {SearchField} from "../search-field";
import {Tag} from "../tag";
import {TagGroup} from "../tag-group";

import {Autocomplete} from "./index";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Pickers/Autocomplete",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const triggerRef = useRef<HTMLDivElement | null>(null);

    const {contains} = useFilter({sensitivity: "base"});

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    const items = [
      {id: "california", name: "California"},
      {id: "texas", name: "Texas"},
      {id: "florida", name: "Florida"},
      {id: "new-york", name: "New York"},
      {id: "illinois", name: "Illinois"},
      {id: "pennsylvania", name: "Pennsylvania"},
    ];

    const onRemoveTags = (keys: Set<Key>) => {
      setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
    };

    return (
      <Autocomplete
        className="w-[256px]"
        placeholder="Select countries"
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setSelectedKeys(keys as Key[])}
      >
        <Label>Countries to Visit</Label>
        <Autocomplete.Group ref={triggerRef}>
          <Autocomplete.Value>
            {({defaultChildren, isPlaceholder, state}) => {
              if (isPlaceholder || state.selectedItems.length === 0) {
                return defaultChildren;
              }

              const selectedItemsKeys = state.selectedItems.map((item) => item.key);

              return (
                <TagGroup onRemove={onRemoveTags}>
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
          </Autocomplete.Value>
          <Autocomplete.Indicator />
        </Autocomplete.Group>
        <Autocomplete.Popover className="w-[256px]" triggerRef={triggerRef}>
          <Autocomplete.Filter filter={contains}>
            <SearchField name="search">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input className="w-[280px]" placeholder="Search..." />
              </SearchField.Group>
            </SearchField>
            <ListBox>
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
    );
  },
};

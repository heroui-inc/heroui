"use client";

import {Label, ListBox, Select} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function SelectDemo() {
  const {demos} = useDictionary();
  const t = demos.select;
  const options = t.options;

  return (
    <Select isRequired className="w-[256px]" placeholder={t.placeholder}>
      <Label>{t.label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue={options.florida}>
            {options.florida}
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue={options.delaware}>
            {options.delaware}
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue={options.california}>
            {options.california}
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue={options.texas}>
            {options.texas}
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue={options.newYork}>
            {options.newYork}
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue={options.washington}>
            {options.washington}
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

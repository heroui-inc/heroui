import {Label, ListBox, Select} from "@heroui/react";

export function MultipleSelect() {
  return (
    <Select className="w-[256px]" placeholder="Select countries" selectionMode="multiple">
      <Label>Countries to Visit</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Content>
        <ListBox selectionMode="multiple">
          <ListBox.Item id="argentina" textValue="Argentina">
            Argentina
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="venezuela" textValue="Venezuela">
            Venezuela
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="japan" textValue="Japan">
            Japan
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="france" textValue="France">
            France
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="italy" textValue="Italy">
            Italy
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="spain" textValue="Spain">
            Spain
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="thailand" textValue="Thailand">
            Thailand
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-zealand" textValue="New Zealand">
            New Zealand
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="iceland" textValue="Iceland">
            Iceland
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Content>
    </Select>
  );
}

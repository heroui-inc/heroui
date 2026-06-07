import {Label, ListBox, Select} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <Select isDisabled className="w-[256px]" defaultValue="california" placeholder="Select one">
        <Label>State</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="Delaware">
              Delaware
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="California">
              California
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              Texas
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="New York">
              New York
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="washington" textValue="Washington">
              Washington
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <Select
        isDisabled
        className="w-[256px]"
        defaultValue={["argentina", "japan", "france"]}
        placeholder="Select countries"
        selectionMode="multiple"
      >
        <Label>Countries to Visit</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
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
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}

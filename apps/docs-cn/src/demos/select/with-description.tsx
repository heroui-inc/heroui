import {Description, Label, ListBox, Select} from "@heroui/react";

export function WithDescription() {
  return (
    <Select className="w-[256px]" placeholder="请选择">
      <Label>州</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="佛罗里达">
            佛罗里达
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="特拉华">
            特拉华
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="加利福尼亚">
            加利福尼亚
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="德克萨斯">
            德克萨斯
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="纽约">
            纽约
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="华盛顿">
            华盛顿
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
      <Description>请选择居住州</Description>
    </Select>
  );
}

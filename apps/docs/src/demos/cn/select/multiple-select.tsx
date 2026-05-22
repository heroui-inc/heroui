import {Label, ListBox, Select} from "@heroui/react";

export function MultipleSelect() {
  return (
    <Select className="w-[256px]" placeholder="请选择国家" selectionMode="multiple">
      <Label>拟访问国家</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox selectionMode="multiple">
          <ListBox.Item id="argentina" textValue="阿根廷">
            阿根廷
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="venezuela" textValue="委内瑞拉">
            委内瑞拉
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="japan" textValue="日本">
            日本
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="france" textValue="法国">
            法国
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="italy" textValue="意大利">
            意大利
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="spain" textValue="西班牙">
            西班牙
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="thailand" textValue="泰国">
            泰国
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-zealand" textValue="新西兰">
            新西兰
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="iceland" textValue="冰岛">
            冰岛
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

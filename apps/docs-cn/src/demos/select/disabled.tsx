import {Label, ListBox, Select} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <Select isDisabled className="w-[256px]" defaultValue="california" placeholder="请选择">
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
      </Select>
      <Select
        isDisabled
        className="w-[256px]"
        defaultValue={["argentina", "japan", "france"]}
        placeholder="请选择国家"
        selectionMode="multiple"
      >
        <Label>拟访问国家</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
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
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}

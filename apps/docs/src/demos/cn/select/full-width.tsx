import {Label, ListBox, Select} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <Select fullWidth placeholder="请选择">
        <Label>喜爱的动物</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="cat" textValue="猫">
              猫
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="dog" textValue="狗">
              狗
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="bird" textValue="鸟">
              鸟
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}

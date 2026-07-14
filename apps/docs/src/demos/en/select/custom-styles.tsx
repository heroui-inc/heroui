import {Label, ListBox, Select} from "@heroui/react";

const itemClass =
  "rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:text-foreground";

export function CustomStyles() {
  return (
    <Select className="w-56" placeholder="Pick a plan" variant="secondary">
      <Label className="font-medium text-foreground">Plan</Label>
      <Select.Trigger className="rounded-xl bg-default">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-xl border border-border bg-surface p-1 shadow-lg">
        <ListBox>
          <ListBox.Item className={itemClass} id="free" textValue="Free">
            Free
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="pro" textValue="Pro">
            Pro
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

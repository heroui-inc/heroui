import {Label, ListBox, Select} from "@heroui/react";

const itemClass =
  "rounded-lg data-[focused=true]:bg-neutral-100/80 data-[selected=true]:font-medium data-[selected=true]:text-neutral-900 dark:data-[focused=true]:bg-neutral-800/80 dark:data-[selected=true]:text-neutral-100";

const triggerClass =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-neutral-400/25 dark:ring-white/10 dark:focus-within:ring-neutral-500/30";

export function CustomStyles() {
  return (
    <Select className="w-64 gap-1.5" placeholder="Select one">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">State</Label>
      <Select.Trigger className={triggerClass}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-xl border border-border/80 bg-surface p-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <ListBox>
          <ListBox.Item className={itemClass} id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

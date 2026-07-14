import {ComboBox, Input, Label, ListBox} from "@heroui/react";

const itemClass =
  "rounded-lg data-[focused=true]:bg-muted/70 data-[selected=true]:font-medium data-[selected=true]:text-foreground";

export function CustomStyles() {
  return (
    <ComboBox className="w-64 gap-1.5">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Framework</Label>
      <ComboBox.InputGroup className="rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-neutral-400/25 dark:ring-white/10 dark:focus-within:ring-neutral-500/30">
        <Input placeholder="Search..." />
        <ComboBox.Trigger className="text-muted" />
      </ComboBox.InputGroup>
      <ComboBox.Popover className="rounded-xl border border-border/80 bg-surface p-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <ListBox>
          <ListBox.Item className={itemClass} id="react" textValue="React">
            React
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="vue" textValue="Vue">
            Vue
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="svelte" textValue="Svelte">
            Svelte
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

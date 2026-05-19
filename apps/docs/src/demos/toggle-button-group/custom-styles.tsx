import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

const toggleBase =
  "group rounded-none! text-muted transition-colors hover:bg-muted/50 group-data-[selected=true]:bg-neutral-600 group-data-[selected=true]:text-white dark:group-data-[selected=true]:bg-neutral-300 dark:group-data-[selected=true]:text-neutral-900";

const toggleStart = `${toggleBase} rounded-s-lg! rounded-e-none!`;

const toggleEnd = `${toggleBase} rounded-e-lg! rounded-s-none!`;

export function CustomStyles() {
  return (
    <ToggleButtonGroup
      className="rounded-xl border border-border bg-surface p-1 ring-1 ring-black/5 dark:ring-white/10 [&_.toggle-button:first-child]:rounded-s-lg! [&_.toggle-button:first-child]:rounded-e-none! [&_.toggle-button:last-child]:rounded-s-none! [&_.toggle-button:last-child]:rounded-e-lg! [&_.toggle-button:not(:first-child):not(:last-child)]:rounded-none!"
      selectionMode="multiple"
    >
      <ToggleButton isIconOnly aria-label="Bold" className={toggleStart} id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" className={toggleBase} id="italic">
        <ToggleButtonGroup.Separator />
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" className={toggleBase} id="underline">
        <ToggleButtonGroup.Separator />
        <Underline />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Strikethrough" className={toggleEnd} id="strikethrough">
        <ToggleButtonGroup.Separator />
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

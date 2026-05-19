import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

const toggleClass =
  "group rounded-md text-neutral-600 transition-colors group-data-[selected=true]:bg-neutral-900 group-data-[selected=true]:text-neutral-50 dark:text-neutral-400 dark:group-data-[selected=true]:bg-neutral-100 dark:group-data-[selected=true]:text-neutral-900";

export function CustomStyles() {
  return (
    <ToggleButtonGroup
      className="rounded-xl border border-border/80 bg-neutral-100/70 p-1 ring-1 ring-black/5 dark:bg-neutral-800/70 dark:ring-white/10"
      selectionMode="multiple"
    >
      <ToggleButton isIconOnly aria-label="Bold" className={toggleClass} id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" className={toggleClass} id="italic">
        <ToggleButtonGroup.Separator />
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" className={toggleClass} id="underline">
        <ToggleButtonGroup.Separator />
        <Underline />
      </ToggleButton>
      <ToggleButton
        isIconOnly
        aria-label="Strikethrough"
        className={toggleClass}
        id="strikethrough"
      >
        <ToggleButtonGroup.Separator />
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

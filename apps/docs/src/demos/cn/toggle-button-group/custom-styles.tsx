import {Bold, Italic, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

const toggleClass =
  "rounded-lg text-muted data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent-soft-foreground";

export function CustomStyles() {
  return (
    <ToggleButtonGroup
      aria-label="文本格式"
      className="gap-1 rounded-xl border border-border/80 bg-surface p-1 shadow-sm"
      selectionMode="multiple"
    >
      <ToggleButton isIconOnly aria-label="粗体" className={toggleClass} id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="斜体" className={toggleClass} id="italic">
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="下划线" className={toggleClass} id="underline">
        <Underline />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

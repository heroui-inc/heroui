import {Bold, Italic, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup, Toolbar} from "@heroui/react";

const toggleClass =
  "rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground";

export function CustomStyles() {
  return (
    <Toolbar
      aria-label="格式工具栏"
      className="gap-1 rounded-xl border border-border/80 bg-surface-secondary p-1.5"
    >
      <ToggleButtonGroup aria-label="文本样式" className="gap-0.5" selectionMode="multiple">
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
    </Toolbar>
  );
}

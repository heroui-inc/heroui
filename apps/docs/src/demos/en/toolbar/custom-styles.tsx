import {Bold, Italic, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup, Toolbar} from "@heroui/react";

export function CustomStyles() {
  return (
    <Toolbar
      aria-label="Text formatting"
      className="gap-2 rounded-xl border border-border bg-surface p-2 shadow-sm"
    >
      <ToggleButtonGroup aria-label="Text style" selectionMode="multiple">
        <ToggleButton
          isIconOnly
          aria-label="Bold"
          className="rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
          id="bold"
        >
          <Bold />
        </ToggleButton>
        <ToggleButton
          isIconOnly
          aria-label="Italic"
          className="rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
          id="italic"
        >
          <Italic />
        </ToggleButton>
        <ToggleButton
          isIconOnly
          aria-label="Underline"
          className="rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
          id="underline"
        >
          <Underline />
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

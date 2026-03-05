import {Bold, Italic, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Orientation() {
  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Horizontal</span>
        <ToggleButtonGroup orientation="horizontal" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Vertical</span>
        <ToggleButtonGroup orientation="vertical" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

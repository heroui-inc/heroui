import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Small</span>
        <ToggleButtonGroup selectionMode="multiple" size="sm">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Underline />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Medium (default)</span>
        <ToggleButtonGroup selectionMode="multiple" size="md">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Underline />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Large</span>
        <ToggleButtonGroup selectionMode="multiple" size="lg">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <Underline />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

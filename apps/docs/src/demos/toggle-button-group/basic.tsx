import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Basic() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
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
      <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
        <ToggleButtonGroup.Separator />
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

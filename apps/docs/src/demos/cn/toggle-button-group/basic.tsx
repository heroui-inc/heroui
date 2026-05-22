import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Basic() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="粗体" id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="斜体" id="italic">
        <ToggleButtonGroup.Separator />
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="下划线" id="underline">
        <ToggleButtonGroup.Separator />
        <Underline />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="删除线" id="strikethrough">
        <ToggleButtonGroup.Separator />
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

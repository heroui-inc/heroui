import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function WithoutSeparator() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="粗体" id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="斜体" id="italic">
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="下划线" id="underline">
        <Underline />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="删除线" id="strikethrough">
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

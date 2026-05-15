import {
  Bold,
  Italic,
  Strikethrough,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  Underline,
} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-full max-w-md space-y-3">
      <ToggleButtonGroup fullWidth selectionMode="multiple">
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
      <ToggleButtonGroup fullWidth selectionMode="single">
        <ToggleButton id="left">
          <TextAlignLeft />
          左对齐
        </ToggleButton>
        <ToggleButton id="center">
          <ToggleButtonGroup.Separator />
          <TextAlignCenter />
          居中
        </ToggleButton>
        <ToggleButton id="right">
          <ToggleButtonGroup.Separator />
          <TextAlignRight />
          右对齐
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

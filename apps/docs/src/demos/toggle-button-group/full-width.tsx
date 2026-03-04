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
      <ToggleButtonGroup fullWidth selectionMode="single">
        <ToggleButton id="left">
          <TextAlignLeft />
          Left
        </ToggleButton>
        <ToggleButton id="center">
          <TextAlignCenter />
          Center
        </ToggleButton>
        <ToggleButton id="right">
          <TextAlignRight />
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

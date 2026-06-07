import {Bold, Italic, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">全部按钮已禁用</span>
        <ToggleButtonGroup isDisabled selectionMode="multiple">
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
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">单个按钮已禁用</span>
        <ToggleButtonGroup selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="粗体" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isDisabled isIconOnly aria-label="斜体" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="下划线" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

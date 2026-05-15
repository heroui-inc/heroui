import {Bold, Italic, Strikethrough, Underline} from "@gravity-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@heroui/react";

export function Attached() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">附着（默认）</span>
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
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">分离</span>
        <ToggleButtonGroup isDetached selectionMode="multiple">
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
      </div>
    </div>
  );
}

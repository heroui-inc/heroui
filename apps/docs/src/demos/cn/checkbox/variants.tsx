import {Checkbox, Description} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">主要变体</p>
        <Checkbox id="primary" name="primary" variant="primary">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            主要复选框
          </Checkbox.Content>
          <Description>默认背景的标准样式</Description>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要变体</p>
        <Checkbox id="secondary" name="secondary" variant="secondary">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            次要复选框
          </Checkbox.Content>
          <Description>用于表面容器的低强调样式</Description>
        </Checkbox>
      </div>
    </div>
  );
}

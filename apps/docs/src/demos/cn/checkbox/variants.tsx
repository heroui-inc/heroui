import {Checkbox, Description, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">主要变体</p>
        <Checkbox id="primary" name="primary" variant="primary">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>主要复选框</Label>
          </Checkbox.Button>
          <Description>默认背景的标准样式</Description>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要变体</p>
        <Checkbox id="secondary" name="secondary" variant="secondary">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>次要复选框</Label>
          </Checkbox.Button>
          <Description>用于表面容器的低强调样式</Description>
        </Checkbox>
      </div>
    </div>
  );
}

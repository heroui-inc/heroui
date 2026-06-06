import {Checkbox, Label} from "@heroui/react";

export function FullRounded() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Label className="text-muted">圆角复选框</Label>
        <Checkbox
          className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-2"
          name="small-rounded"
        >
          <Checkbox.Content>
            <Checkbox.Control className="size-3 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            小尺寸
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox name="default-rounded">
          <Checkbox.Content>
            <Checkbox.Control className="size-4 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            默认尺寸
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox name="large-rounded">
          <Checkbox.Content>
            <Checkbox.Control className="size-5 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            大尺寸
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox
          className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-4"
          name="xl-rounded"
        >
          <Checkbox.Content>
            <Checkbox.Control className="size-6 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            特大尺寸
          </Checkbox.Content>
        </Checkbox>
      </div>
    </div>
  );
}

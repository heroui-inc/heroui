import {Checkbox, Label} from "@heroui/react";

export function FullRounded() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Label className="text-muted">Rounded checkboxes</Label>
        <Checkbox
          className="[&_[data-slot='checkbox-default-indicator--checkmark']]:size-2"
          name="small-rounded"
        >
          <Checkbox.Content>
            <Checkbox.Control className="size-3 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            Small size
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox name="default-rounded">
          <Checkbox.Content>
            <Checkbox.Control className="size-4 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            Default size
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox name="large-rounded">
          <Checkbox.Content>
            <Checkbox.Control className="size-5 rounded-full before:rounded-full">
              <Checkbox.Indicator />
            </Checkbox.Control>
            Large size
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
            Extra large size
          </Checkbox.Content>
        </Checkbox>
      </div>
    </div>
  );
}

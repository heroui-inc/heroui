import {Label, Switch, SwitchGroup} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <Switch.Root name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Notifications</Label>
      </Switch.Root>
      <Switch.Root name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Marketing</Label>
      </Switch.Root>
      <Switch.Root name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Social</Label>
      </Switch.Root>
    </SwitchGroup>
  );
}

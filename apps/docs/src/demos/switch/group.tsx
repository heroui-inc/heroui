import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <Switch.Root name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Allow Notifications</Label>
      </Switch.Root>
      <Switch.Root name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Marketing emails</Label>
      </Switch.Root>
      <Switch.Root name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Social media updates</Label>
      </Switch.Root>
    </SwitchGroup>
  );
}

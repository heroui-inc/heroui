import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <Switch name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Allow Notifications</Label>
      </Switch>
      <Switch name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Marketing emails</Label>
      </Switch>
      <Switch name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Social media updates</Label>
      </Switch>
    </SwitchGroup>
  );
}

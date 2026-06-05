import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <Switch name="notifications">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Allow Notifications</Label>
        </Switch.Button>
      </Switch>
      <Switch name="marketing">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Marketing emails</Label>
        </Switch.Button>
      </Switch>
      <Switch name="social">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Social media updates</Label>
        </Switch.Button>
      </Switch>
    </SwitchGroup>
  );
}

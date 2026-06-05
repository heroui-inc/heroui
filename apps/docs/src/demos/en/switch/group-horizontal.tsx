import {Label, Switch, SwitchGroup} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <Switch name="notifications">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Notifications</Label>
        </Switch.Button>
      </Switch>
      <Switch name="marketing">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Marketing</Label>
        </Switch.Button>
      </Switch>
      <Switch name="social">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Social</Label>
        </Switch.Button>
      </Switch>
    </SwitchGroup>
  );
}

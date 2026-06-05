import {Label, Switch} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Enable notifications</Label>
      </Switch.Button>
    </Switch>
  );
}

import {Label, Switch} from "@heroui/react";

export function Disabled() {
  return (
    <Switch isDisabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Label className="text-sm">Enable notifications</Label>
    </Switch>
  );
}

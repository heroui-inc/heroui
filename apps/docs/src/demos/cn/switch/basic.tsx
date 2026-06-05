import {Label, Switch} from "@heroui/react";

export function Basic() {
  return (
    <Switch>
      <Switch.Button>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">启用通知</Label>
      </Switch.Button>
    </Switch>
  );
}

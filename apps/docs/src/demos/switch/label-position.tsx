import {Label, Switch} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Label after</Label>
      </Switch>
      <Switch>
        <Label className="text-sm">Label before</Label>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
  );
}

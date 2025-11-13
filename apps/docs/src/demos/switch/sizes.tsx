import {Label, Switch} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-xs">Small</Label>
      </Switch>
      <Switch size="md">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-sm">Medium</Label>
      </Switch>
      <Switch size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label className="text-base">Large</Label>
      </Switch>
    </div>
  );
}

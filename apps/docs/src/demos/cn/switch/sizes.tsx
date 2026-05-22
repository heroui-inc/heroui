import {Label, Switch} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-xs">小</Label>
        </Switch.Content>
      </Switch>
      <Switch size="md">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">中</Label>
        </Switch.Content>
      </Switch>
      <Switch size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-base">大</Label>
        </Switch.Content>
      </Switch>
    </div>
  );
}

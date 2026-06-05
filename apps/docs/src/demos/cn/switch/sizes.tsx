import {Label, Switch} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-xs">小</Label>
        </Switch.Button>
      </Switch>
      <Switch size="md">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">中</Label>
        </Switch.Button>
      </Switch>
      <Switch size="lg">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-base">大</Label>
        </Switch.Button>
      </Switch>
    </div>
  );
}

import {Label, Switch} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-xs">Small</Label>
        </Switch.Button>
      </Switch>
      <Switch size="md">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Medium</Label>
        </Switch.Button>
      </Switch>
      <Switch size="lg">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-base">Large</Label>
        </Switch.Button>
      </Switch>
    </div>
  );
}

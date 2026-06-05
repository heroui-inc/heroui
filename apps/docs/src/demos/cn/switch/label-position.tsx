import {Label, Switch} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">标签在后</Label>
        </Switch.Button>
      </Switch>
      <Switch>
        <Switch.Button>
          <Label className="text-sm">标签在前</Label>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Button>
      </Switch>
    </div>
  );
}

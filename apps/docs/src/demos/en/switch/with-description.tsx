import {Description, Label, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Public profile</Label>
        </Switch.Button>
        <Description>Allow others to see your profile information</Description>
      </Switch>
    </div>
  );
}

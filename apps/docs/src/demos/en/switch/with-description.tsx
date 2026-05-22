import {Description, Label, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">Public profile</Label>
          <Description>Allow others to see your profile information</Description>
        </Switch.Content>
      </Switch>
    </div>
  );
}

import {Description, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Public profile
        </Switch.Content>
        <Description>Allow others to see your profile information</Description>
      </Switch>
    </div>
  );
}

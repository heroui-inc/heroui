import {Switch} from "@heroui/react";

export function LabelPosition() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Label after
        </Switch.Content>
      </Switch>
      <Switch>
        <Switch.Content>
          Label before
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  );
}

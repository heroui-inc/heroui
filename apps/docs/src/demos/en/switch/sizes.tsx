import {Switch} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex gap-6">
      <Switch size="sm">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Small
        </Switch.Content>
      </Switch>
      <Switch size="md">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Medium
        </Switch.Content>
      </Switch>
      <Switch size="lg">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Large
        </Switch.Content>
      </Switch>
    </div>
  );
}

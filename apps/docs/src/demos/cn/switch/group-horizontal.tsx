import {Label, Switch, SwitchGroup} from "@heroui/react";

export function GroupHorizontal() {
  return (
    <SwitchGroup className="overflow-x-auto" orientation="horizontal">
      <Switch name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">通知</Label>
        </Switch.Content>
      </Switch>
      <Switch name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">营销</Label>
        </Switch.Content>
      </Switch>
      <Switch name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">社交</Label>
        </Switch.Content>
      </Switch>
    </SwitchGroup>
  );
}

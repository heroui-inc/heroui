import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <Switch name="notifications">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">允许通知</Label>
        </Switch.Content>
      </Switch>
      <Switch name="marketing">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">营销邮件</Label>
        </Switch.Content>
      </Switch>
      <Switch name="social">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">社交媒体更新</Label>
        </Switch.Content>
      </Switch>
    </SwitchGroup>
  );
}

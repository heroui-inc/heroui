import {Label, Switch, SwitchGroup} from "@heroui/react";

export function Group() {
  return (
    <SwitchGroup>
      <Switch name="notifications">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">允许通知</Label>
        </Switch.Button>
      </Switch>
      <Switch name="marketing">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">营销邮件</Label>
        </Switch.Button>
      </Switch>
      <Switch name="social">
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">社交媒体更新</Label>
        </Switch.Button>
      </Switch>
    </SwitchGroup>
  );
}

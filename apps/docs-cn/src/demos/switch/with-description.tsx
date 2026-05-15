import {Description, Label, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className="text-sm">公开资料</Label>
          <Description>允许他人查看你的资料信息</Description>
        </Switch.Content>
      </Switch>
    </div>
  );
}

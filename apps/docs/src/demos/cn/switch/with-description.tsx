import {Description, Label, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Button>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">公开资料</Label>
        </Switch.Button>
        <Description>允许他人查看你的资料信息</Description>
      </Switch>
    </div>
  );
}

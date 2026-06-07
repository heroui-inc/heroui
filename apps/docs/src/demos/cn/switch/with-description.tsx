import {Description, Switch} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="max-w-sm">
      <Switch>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          公开资料
        </Switch.Content>
        <Description>允许他人查看你的资料信息</Description>
      </Switch>
    </div>
  );
}

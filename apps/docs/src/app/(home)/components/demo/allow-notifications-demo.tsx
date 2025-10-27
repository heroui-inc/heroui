import {Description, Label, Switch} from "@heroui/react";

export function AllowNotificationsDemo() {
  return (
    <div className="flex w-full justify-center">
      <Switch.Root defaultSelected>
        <div className="flex gap-8 p-4">
          <div className="-mt-0.5 flex flex-col justify-start gap-1">
            <Label className="w-fit text-sm font-medium">Allow notifications</Label>
            <Description>Receive push notifications from HeroUI</Description>
          </div>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </div>
      </Switch.Root>
    </div>
  );
}

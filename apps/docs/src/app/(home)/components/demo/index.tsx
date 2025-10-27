import {AlertDemo} from "./alert-demo";
import {AllowNotificationsDemo} from "./allow-notifications-demo";
import {AvatarGroupDemo} from "./avatar-group-demo";
import {ButtonsDemo} from "./buttons-demo";
import {XProfileDemo} from "./x-profile-demo";

export function DemoComponents() {
  return (
    <div className="mx-auto py-24">
      {/* Center */}
      <div className="flex flex-col gap-10">
        <AvatarGroupDemo />
        <ButtonsDemo />
        <XProfileDemo />
        <AlertDemo />
        <AllowNotificationsDemo />
      </div>
    </div>
  );
}

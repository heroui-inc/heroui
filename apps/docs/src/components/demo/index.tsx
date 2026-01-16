"use client";

import {AlertDemo} from "./alert-demo";
import {AlertDialogDemo} from "./alert-dialog-demo";
import {AllowNotificationsDemo} from "./allow-notifications-demo";
import {AvatarGroupDemo} from "./avatar-group-demo";
import {ButtonsDemo} from "./buttons-demo";
import {InputOTPDemo} from "./input-otp-demo";
import {ListBoxDemo} from "./listbox-demo";
import {LoginDemo} from "./login-demo";
import {SelectDemo} from "./select-demo";
import {SliderDemo} from "./slider-demo";
import {SubtleCardsDemo} from "./subtle-cards-demo";
import {TabsDemo1} from "./tabs-1-demo";
import {TabsDemo2} from "./tabs-2-demo";
import {TextfieldDemo} from "./textfield-demo";
import {UIComponentsDemo} from "./ui-components-demo";
import {XProfileDemo} from "./x-profile-demo";

export function DemoComponents() {
  return (
    <div className="mx-auto grid grid-cols-1 gap-8 xl:grid-cols-3">
      {/* Left */}
      <div className="flex flex-col items-center gap-10">
        <TextfieldDemo />
        <SelectDemo />
        <UIComponentsDemo />
        <SliderDemo />
        <TabsDemo1 />
        <TabsDemo2 />
        <ListBoxDemo />
      </div>
      {/* Center */}
      <div className="flex flex-col items-center gap-10">
        <AvatarGroupDemo />
        <InputOTPDemo />
        <ButtonsDemo />
        <XProfileDemo />
        <AlertDemo />
        <AllowNotificationsDemo />
      </div>
      {/* Right */}
      <div className="flex flex-col items-center gap-10">
        <LoginDemo />
        <SubtleCardsDemo />
        <AlertDialogDemo />
      </div>
    </div>
  );
}

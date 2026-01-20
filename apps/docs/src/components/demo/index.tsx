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
    <div className="mx-auto grid grid-cols-1 gap-8 min-[1200px]:grid-cols-3! md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr]">
      {/* Left */}
      <div className="order-2 flex max-w-[360px] flex-col items-center gap-10 md:order-1">
        <TextfieldDemo />
        <SelectDemo />
        <UIComponentsDemo />
        <SliderDemo />
        <TabsDemo1 />
        <TabsDemo2 />
        <ListBoxDemo />
      </div>
      {/* Center */}
      <div className="order-1 flex max-w-[360px] flex-col items-center gap-10 md:order-2">
        <AvatarGroupDemo />
        <InputOTPDemo />
        <ButtonsDemo />
        <XProfileDemo />
        <AlertDemo />
        <AllowNotificationsDemo />
      </div>
      {/* Right */}
      <div className="order-3 col-span-1 grid grid-cols-1 grid-rows-2 justify-items-center gap-5 md:col-span-2 md:grid-cols-2 md:grid-rows-[auto_auto] lg:col-span-1 lg:max-w-[360px] lg:grid-cols-1">
        <div className="row-span-2">
          <LoginDemo />
        </div>
        <div className="align-self-start w-full">
          <SubtleCardsDemo />
        </div>
        <AlertDialogDemo />
      </div>
    </div>
  );
}

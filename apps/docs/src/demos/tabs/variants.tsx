"use client";

import {Tabs} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-gray-600 mb-3">Default variant:</p>
        <Tabs className="w-full max-w-md">
          <Tabs.List aria-label="Default tabs">
            <Tabs.Tab id="home1">Home</Tabs.Tab>
            <Tabs.Tab id="profile1">Profile</Tabs.Tab>
            <Tabs.Tab id="settings1">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="home1" className="pt-4">
            Home content
          </Tabs.Panel>
          <Tabs.Panel id="profile1" className="pt-4">
            Profile content
          </Tabs.Panel>
          <Tabs.Panel id="settings1" className="pt-4">
            Settings content
          </Tabs.Panel>
        </Tabs>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-3">Line variant:</p>
        <Tabs variant="line" className="w-full max-w-md">
          <Tabs.List aria-label="Line tabs">
            <Tabs.Tab id="home2">Home</Tabs.Tab>
            <Tabs.Tab id="profile2">Profile</Tabs.Tab>
            <Tabs.Tab id="settings2">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="home2" className="pt-4">
            Home content
          </Tabs.Panel>
          <Tabs.Panel id="profile2" className="pt-4">
            Profile content
          </Tabs.Panel>
          <Tabs.Panel id="settings2" className="pt-4">
            Settings content
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
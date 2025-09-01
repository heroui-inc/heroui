"use client";

import {Tabs} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-sm text-gray-600">Default variant:</p>
        <Tabs className="w-full max-w-md">
          <Tabs.List aria-label="Default tabs">
            <Tabs.Tab id="home1">Home</Tabs.Tab>
            <Tabs.Tab id="profile1">Profile</Tabs.Tab>
            <Tabs.Tab id="settings1">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel className="pt-4" id="home1">
            Home content
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="profile1">
            Profile content
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="settings1">
            Settings content
          </Tabs.Panel>
        </Tabs>
      </div>

      <div>
        <p className="mb-3 text-sm text-gray-600">Line variant:</p>
        <Tabs className="w-full max-w-md" variant="line">
          <Tabs.List aria-label="Line tabs">
            <Tabs.Tab id="home2">Home</Tabs.Tab>
            <Tabs.Tab id="profile2">Profile</Tabs.Tab>
            <Tabs.Tab id="settings2">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel className="pt-4" id="home2">
            Home content
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="profile2">
            Profile content
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="settings2">
            Settings content
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

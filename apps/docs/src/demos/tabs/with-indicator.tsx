"use client";

import React from "react";

import {Tabs} from "@/components/ui/tabs";

export default function TabsWithIndicatorDemo() {
  return (
    <Tabs className="w-full max-w-md" defaultSelectedKey="tab1">
      <Tabs.List className="relative">
        <Tabs.Tab id="tab1">Account</Tabs.Tab>
        <Tabs.Tab id="tab2">Password</Tabs.Tab>
        <Tabs.Tab id="tab3">Team</Tabs.Tab>
        <Tabs.Indicator className="bg-primary absolute bottom-0 h-0.5" />
      </Tabs.List>
      <Tabs.Panel className="mt-4" id="tab1">
        Make changes to your account here.
      </Tabs.Panel>
      <Tabs.Panel className="mt-4" id="tab2">
        Change your password here.
      </Tabs.Panel>
      <Tabs.Panel className="mt-4" id="tab3">
        Manage your team settings here.
      </Tabs.Panel>
    </Tabs>
  );
}

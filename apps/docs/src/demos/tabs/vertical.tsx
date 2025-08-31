"use client";

import {Tabs} from "@heroui/react";

export function Vertical() {
  return (
    <Tabs orientation="vertical" className="w-full max-w-lg">
      <Tabs.List aria-label="Vertical tabs">
        <Tabs.Tab id="account">Account</Tabs.Tab>
        <Tabs.Tab id="security">Security</Tabs.Tab>
        <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab id="billing">Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="account" className="px-4">
        <h3 className="font-semibold mb-2">Account Settings</h3>
        <p className="text-sm text-gray-600">
          Manage your account information and preferences.
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="security" className="px-4">
        <h3 className="font-semibold mb-2">Security Settings</h3>
        <p className="text-sm text-gray-600">
          Configure two-factor authentication and password settings.
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="notifications" className="px-4">
        <h3 className="font-semibold mb-2">Notification Preferences</h3>
        <p className="text-sm text-gray-600">
          Choose how and when you want to receive notifications.
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="px-4">
        <h3 className="font-semibold mb-2">Billing Information</h3>
        <p className="text-sm text-gray-600">
          View and manage your subscription and payment methods.
        </p>
      </Tabs.Panel>
    </Tabs>
  );
}
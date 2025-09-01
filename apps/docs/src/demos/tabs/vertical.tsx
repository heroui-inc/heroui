"use client";

import {Tabs} from "@heroui/react";

export function Vertical() {
  return (
    <Tabs className="w-full max-w-lg" orientation="vertical">
      <Tabs.List aria-label="Vertical tabs">
        <Tabs.Tab id="account">Account</Tabs.Tab>
        <Tabs.Tab id="security">Security</Tabs.Tab>
        <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab id="billing">Billing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="px-4" id="account">
        <h3 className="mb-2 font-semibold">Account Settings</h3>
        <p className="text-sm text-gray-600">Manage your account information and preferences.</p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="security">
        <h3 className="mb-2 font-semibold">Security Settings</h3>
        <p className="text-sm text-gray-600">
          Configure two-factor authentication and password settings.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="notifications">
        <h3 className="mb-2 font-semibold">Notification Preferences</h3>
        <p className="text-sm text-gray-600">
          Choose how and when you want to receive notifications.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="billing">
        <h3 className="mb-2 font-semibold">Billing Information</h3>
        <p className="text-sm text-gray-600">
          View and manage your subscription and payment methods.
        </p>
      </Tabs.Panel>
    </Tabs>
  );
}

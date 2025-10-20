"use client";

import {Tab, TabIndicator, TabList, TabListWrapper, TabPanel, TabsRoot} from "@heroui/react";

export function Vertical() {
  return (
    <TabsRoot className="w-full max-w-lg" orientation="vertical">
      <TabListWrapper>
        <TabList aria-label="Vertical tabs">
          <Tab id="account">
            Account
            <TabIndicator />
          </Tab>
          <Tab id="security">
            Security
            <TabIndicator />
          </Tab>
          <Tab id="notifications">
            Notifications
            <TabIndicator />
          </Tab>
          <Tab id="billing">
            Billing
            <TabIndicator />
          </Tab>
        </TabList>
      </TabListWrapper>
      <TabPanel className="px-4" id="account">
        <h3 className="mb-2 font-semibold">Account Settings</h3>
        <p className="text-muted text-sm">Manage your account information and preferences.</p>
      </TabPanel>
      <TabPanel className="px-4" id="security">
        <h3 className="mb-2 font-semibold">Security Settings</h3>
        <p className="text-muted text-sm">
          Configure two-factor authentication and password settings.
        </p>
      </TabPanel>
      <TabPanel className="px-4" id="notifications">
        <h3 className="mb-2 font-semibold">Notification Preferences</h3>
        <p className="text-muted text-sm">Choose how and when you want to receive notifications.</p>
      </TabPanel>
      <TabPanel className="px-4" id="billing">
        <h3 className="mb-2 font-semibold">Billing Information</h3>
        <p className="text-muted text-sm">View and manage your subscription and payment methods.</p>
      </TabPanel>
    </TabsRoot>
  );
}

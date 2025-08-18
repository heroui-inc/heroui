"use client";

import {Accordion} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-2">
        <h3 className="text-muted text-sm font-medium">Default variant</h3>
        <Accordion className="w-full max-w-md">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Account Settings
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Manage your account settings, including profile information, security options, and
                privacy preferences.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Billing & Payments
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                View your billing history, manage payment methods, and update your subscription
                plan.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted text-sm font-medium">Outline variant</h3>
        <Accordion className="w-full max-w-md" variant="outline">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Account Settings
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Manage your account settings, including profile information, security options, and
                privacy preferences.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Billing & Payments
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                View your billing history, manage payment methods, and update your subscription
                plan.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

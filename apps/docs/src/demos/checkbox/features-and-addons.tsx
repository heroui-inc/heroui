import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";
import {Icon} from "@iconify/react";
import clsx from "clsx";

export function FeaturesAndAddOns() {
  const addOns = [
    {
      description: "Receive updates via email",
      icon: "gravity-ui:envelope",
      title: "Email Notifications",
      value: "email",
    },
    {
      description: "Get instant SMS notifications",
      icon: "gravity-ui:comment",
      title: "SMS Alerts",
      value: "sms",
    },
    {
      description: "Browser and mobile push alerts",
      icon: "gravity-ui:bell",
      title: "Push Notifications",
      value: "push",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
      <section className="flex w-full min-w-[320px] flex-col gap-4">
        <CheckboxGroup name="notification-preferences">
          <Label>Notification preferences</Label>
          <Description>Choose how you want to receive updates</Description>
          <div className="flex flex-col gap-2">
            {addOns.map((addon) => (
              <Checkbox
                key={addon.value}
                value={addon.value}
                className={clsx(
                  "bg-surface-tertiary group relative flex-col gap-4 rounded-3xl px-5 py-4 transition-all",
                  "data-[selected=true]:bg-accent/10",
                )}
              >
                <Checkbox.Control className="absolute right-4 top-3 size-5 rounded-full before:rounded-full">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content className="flex flex-row items-start justify-start gap-4">
                  <Icon className="text-accent size-5" icon={addon.icon} />
                  <div className="flex flex-col gap-1">
                    <Label>{addon.title}</Label>
                    <Description>{addon.description}</Description>
                  </div>
                </Checkbox.Content>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </section>
    </div>
  );
}

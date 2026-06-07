import {Bell, Comment, Envelope} from "@gravity-ui/icons";
import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";
import clsx from "clsx";

export function FeaturesAndAddOns() {
  const addOns = [
    {
      description: "通过邮件接收更新",
      icon: Envelope,
      title: "邮件通知",
      value: "email",
    },
    {
      description: "即时短信通知",
      icon: Comment,
      title: "短信提醒",
      value: "sms",
    },
    {
      description: "浏览器与移动端推送提醒",
      icon: Bell,
      title: "推送通知",
      value: "push",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
      <section className="flex w-full min-w-[320px] flex-col gap-4">
        <CheckboxGroup name="notification-preferences">
          <Label>通知偏好</Label>
          <Description>选择接收更新的方式</Description>
          <div className="flex flex-col gap-2">
            {addOns.map((addon) => (
              <Checkbox key={addon.value} value={addon.value} variant="secondary">
                <Checkbox.Content
                  className={clsx(
                    "group relative flex w-full flex-row items-start justify-start gap-4 rounded-3xl bg-surface px-5 py-4 transition-all",
                    "data-[selected=true]:bg-accent/10",
                  )}
                >
                  <Checkbox.Control className="absolute top-3 right-4 size-5 rounded-full before:rounded-full">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <addon.icon className="size-5 text-accent-soft-foreground" />
                  <div className="flex flex-col gap-1">
                    <span>{addon.title}</span>
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

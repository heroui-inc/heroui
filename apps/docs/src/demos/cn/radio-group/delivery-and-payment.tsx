import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import {Icon} from "@iconify/react";
import clsx from "clsx";

export function DeliveryAndPayment() {
  const deliveryOptions = [
    {
      description: "4–10 个工作日",
      price: "$5.00",
      title: "标准",
      value: "standard",
    },
    {
      description: "2–5 个工作日",
      price: "$16.00",
      title: "快递",
      value: "express",
    },
    {
      description: "1 个工作日",
      price: "$25.00",
      title: "极速",
      value: "super-fast",
    },
  ];

  const paymentOptions = [
    {
      description: "有效期至 2026/01",
      icon: "uim:master-card",
      title: "**** 8304",
      value: "mastercard",
    },
    {
      description: "有效期至 2026/01",
      icon: "streamline-logos:visa-logo-solid",
      title: "**** 0123",
      value: "visa",
    },
    {
      description: "使用 PayPal 支付",
      icon: "ic:baseline-paypal",
      title: "PayPal",
      value: "paypal",
    },
  ];

  return (
    <div
      className="flex w-full flex-col items-center gap-10"
      style={{
        // @ts-expect-error - Overrides default variables
        "--accent": "#006FEE",
        "--accent-foreground": "#fff",
        "--accent-hover": "#006FEE",
        "--border-width": "2px",
        "--border-width-field": "2px",
        "--focus": "#006FEE",
      }}
    >
      <section className="flex w-full max-w-lg flex-col gap-4">
        <RadioGroup defaultValue="express" name="delivery" variant="secondary">
          <Label>配送方式</Label>
          <div className="grid gap-x-4 md:grid-cols-3">
            {deliveryOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                <Radio.Content
                  className={clsx(
                    "group relative flex w-full flex-col gap-6 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                    "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
                  )}
                >
                  <Radio.Control className="absolute top-3 right-4 size-5">
                    <Radio.Indicator />
                  </Radio.Control>
                  <div className="flex flex-col gap-1">
                    <span>{option.title}</span>
                    <Description>{option.description}</Description>
                  </div>
                  <span className="text-sm font-semibold">{option.price}</span>
                </Radio.Content>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </section>
      <section className="flex w-full max-w-lg flex-col gap-4">
        <RadioGroup defaultValue="visa" name="payment" variant="secondary">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Label>支付方式</Label>
          </div>
          <div className="grid gap-x-4 md:grid-cols-2">
            {paymentOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                <Radio.Content
                  className={clsx(
                    "group relative flex w-full flex-row items-start justify-start gap-4 rounded-xl border border-transparent bg-surface px-5 py-4 transition-all",
                    "data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                  )}
                >
                  <Radio.Control className="absolute top-3 right-4 size-5">
                    <Radio.Indicator />
                  </Radio.Control>
                  <Icon className="size-6" icon={option.icon} />
                  <div className="flex flex-col gap-1">
                    <span>{option.title}</span>
                    <Description>{option.description}</Description>
                  </div>
                </Radio.Content>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </section>
    </div>
  );
}

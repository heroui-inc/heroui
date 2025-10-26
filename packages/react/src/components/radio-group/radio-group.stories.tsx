import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import clsx from "clsx";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {Radio} from "../radio";

import {RadioGroup} from "./index";

export default {
  argTypes: {},
  component: RadioGroup,
  title: "Components/Forms/RadioGroup",
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup defaultValue="premium" name="plan">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio.Root value="basic">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Basic Plan</Label>
            <Description>Includes 100 messages per month</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="premium">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Premium Plan</Label>
            <Description>Includes 200 messages per month</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="business">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Business Plan</Label>
            <Description>Unlimited messages</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
    </div>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup defaultValue="premium" name="plan">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio.Root value="basic">
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          <Radio.Content>
            <Label>Basic Plan</Label>
            <Description>Includes 100 messages per month</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="premium">
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          <Radio.Content>
            <Label>Premium Plan</Label>
            <Description>Includes 200 messages per month</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="business">
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          <Radio.Content>
            <Label>Business Plan</Label>
            <Description>Unlimited messages</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 px-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio.Root value="starter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Starter</Label>
            <Description>For side projects and small teams</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="pro">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Pro</Label>
            <Description>Advanced reporting and analytics</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Teams</Label>
            <Description>Share access with up to 10 teammates</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
    </div>
  ),
};

export const Validation: Story = {
  render: () => {
    return (
      <Form
        className="flex flex-col gap-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const value = formData.get("plan-validation");

          alert(`Your chosen plan is: ${value}`);
        }}
      >
        <RadioGroup isRequired name="plan-validation">
          <Label>Subscription plan</Label>
          <Radio.Root value="starter">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Starter</Label>
              <Description>For side projects and small teams</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="pro">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Pro</Label>
              <Description>Advanced reporting and analytics</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="teams">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Teams</Label>
              <Description>Share access with up to 10 teammates</Description>
            </Radio.Content>
          </Radio.Root>
          <FieldError>Choose a subscription before continuing.</FieldError>
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("pro");

    return (
      <div className="flex flex-col gap-3 px-4">
        <RadioGroup name="plan-controlled" value={value} onChange={setValue}>
          <Label>Subscription plan</Label>
          <Radio.Root value="starter">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Starter</Label>
              <Description>For side projects and small teams</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="pro">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Pro</Label>
              <Description>Advanced reporting and analytics</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="teams">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Teams</Label>
              <Description>Share access with up to 10 teammates</Description>
            </Radio.Content>
          </Radio.Root>
        </RadioGroup>
        <p className="text-muted mt-2 text-sm">
          Selected plan: <span className="font-medium">{value}</span>
        </p>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    const [selection, setSelection] = React.useState("pro");

    return (
      <div className="flex flex-col gap-3 px-4">
        <RadioGroup
          defaultValue="pro"
          name="plan-uncontrolled"
          onChange={(nextValue) => setSelection(nextValue)}
        >
          <Label>Subscription plan</Label>
          <Radio.Root value="starter">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Starter</Label>
              <Description>For side projects and small teams</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="pro">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Pro</Label>
              <Description>Advanced reporting and analytics</Description>
            </Radio.Content>
          </Radio.Root>
          <Radio.Root value="teams">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Teams</Label>
              <Description>Share access with up to 10 teammates</Description>
            </Radio.Content>
          </Radio.Root>
        </RadioGroup>
        <p className="text-muted mt-2 text-sm">
          Last chosen plan: <span className="font-medium">{selection}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
        <Label>Subscription plan</Label>
        <Description>Plan changes are temporarily paused while we roll out updates.</Description>
        <Radio.Root value="starter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Starter</Label>
            <Description>For side projects and small teams</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="pro">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Pro</Label>
            <Description>Advanced reporting and analytics</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Teams</Label>
            <Description>Share access with up to 10 teammates</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
    </div>
  ),
};

export const DeliveryAndPaymentExample: Story = {
  render: () => {
    const deliveryOptions = [
      {
        description: "4-10 business days",
        price: "$5.00",
        value: "standard",
        title: "Standard",
      },
      {
        description: "2-5 business days",
        price: "$16.00",
        value: "express",
        title: "Express",
      },
      {
        description: "1 business day",
        price: "$25.00",
        value: "super-fast",
        title: "Super Fast",
      },
    ];

    const paymentOptions = [
      {
        title: "**** 8304",
        value: "mastercard",
        description: "Exp. on 01/2026",
        icon: "uim:master-card",
      },
      {
        title: "**** 0123",
        value: "visa",
        description: "Exp. on 01/2026",
        icon: "streamline-logos:visa-logo-solid",
      },
      {
        title: "PayPal",
        description: "Pay with PayPal",
        value: "paypal",
        icon: "ic:baseline-paypal",
      },
    ];

    return (
      <div className="bg-background-secondary flex w-full flex-col items-center gap-10 px-4 py-8">
        <section className="flex w-full max-w-lg flex-col gap-4">
          <RadioGroup defaultValue="express" name="delivery">
            <Label>Delivery method</Label>
            <div className="grid gap-x-4 md:grid-cols-3">
              {deliveryOptions.map((option) => (
                <Radio.Root
                  key={option.value}
                  value={option.value}
                  className={clsx(
                    "bg-panel data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 group relative flex-col gap-4 rounded-xl px-5 py-4 transition-all",
                    "data-[focus-visible=true]:bg-accent/10",
                  )}
                >
                  <Radio.Control className="absolute right-4 top-3 size-5">
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <Label>{option.title}</Label>
                      <Description>{option.description}</Description>
                    </div>
                    <span className="text-sm font-semibold">{option.price}</span>
                  </Radio.Content>
                </Radio.Root>
              ))}
            </div>
          </RadioGroup>
        </section>
        <section className="flex w-full max-w-lg flex-col gap-4">
          <RadioGroup defaultValue="visa" name="payment">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Label>Payment method</Label>
            </div>
            <div className="grid gap-x-4 md:grid-cols-2">
              {paymentOptions.map((option) => (
                <Radio.Root
                  key={option.value}
                  value={option.value}
                  className={clsx(
                    "bg-panel group relative flex-col gap-4 rounded-xl px-5 py-4 transition-all",
                    "data-[selected=true]:bg-accent/10",
                  )}
                >
                  <Radio.Control className="absolute right-4 top-3 size-5">
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content className="flex flex-row items-start justify-start gap-4">
                    <Icon className="text-accent size-6" icon={option.icon} />
                    <div className="flex flex-col gap-1">
                      <Label>{option.title}</Label>
                      <Description>{option.description}</Description>
                    </div>
                  </Radio.Content>
                </Radio.Root>
              ))}
            </div>
          </RadioGroup>
        </section>
      </div>
    );
  },
};

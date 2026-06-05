import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";
import {cx} from "tailwind-variants";

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
  parameters: {
    layout: "centered",
  },
  title: "Components/Forms/RadioGroup",
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup defaultValue="premium" name="plan">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio value="basic">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Basic Plan</Label>
          </Radio.Button>
          <Description>Includes 100 messages per month</Description>
        </Radio>
        <Radio value="premium">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Premium Plan</Label>
          </Radio.Button>
          <Description>Includes 200 messages per month</Description>
        </Radio>
        <Radio value="business">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Business Plan</Label>
          </Radio.Button>
          <Description>Unlimited messages</Description>
        </Radio>
      </RadioGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Primary variant</p>
        <RadioGroup defaultValue="option1" name="primary-plan" variant="primary">
          <Radio value="option1">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Option 1</Label>
            </Radio.Button>
            <Description>Standard styling with default background</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Option 2</Label>
            </Radio.Button>
            <Description>Another option with primary styling</Description>
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary variant</p>
        <RadioGroup defaultValue="option1" name="secondary-plan" variant="secondary">
          <Radio value="option1">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Option 1</Label>
            </Radio.Button>
            <Description>Lower emphasis variant for use in surfaces</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Option 2</Label>
            </Radio.Button>
            <Description>Another option with secondary styling</Description>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const PerRadioInvalid: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup defaultValue="premium" name="plan-invalid">
        <Label>Plan selection</Label>
        <Radio isInvalid isRequired value="basic">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Basic Plan</Label>
          </Radio.Button>
          <FieldError>This plan is not available for your account</FieldError>
        </Radio>
        <Radio value="premium">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Premium Plan</Label>
          </Radio.Button>
          <Description>Includes 200 messages per month</Description>
        </Radio>
      </RadioGroup>
    </div>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <div className="px-4">
      <RadioGroup defaultValue="premium" name="plan-custom-indicator">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio value="basic">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator>
                {({isSelected}) =>
                  isSelected ? (
                    <span className="text-xs leading-none text-background">✓</span>
                  ) : null
                }
              </Radio.Indicator>
            </Radio.Control>
            <Label>Basic Plan</Label>
          </Radio.Button>
          <Description>Includes 100 messages per month</Description>
        </Radio>
        <Radio value="premium">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator>
                {({isSelected}) =>
                  isSelected ? (
                    <span className="text-xs leading-none text-background">✓</span>
                  ) : null
                }
              </Radio.Indicator>
            </Radio.Control>
            <Label>Premium Plan</Label>
          </Radio.Button>
          <Description>Includes 200 messages per month</Description>
        </Radio>
        <Radio value="business">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator>
                {({isSelected}) =>
                  isSelected ? (
                    <span className="text-xs leading-none text-background">✓</span>
                  ) : null
                }
              </Radio.Indicator>
            </Radio.Control>
            <Label>Business Plan</Label>
          </Radio.Button>
          <Description>Unlimited messages</Description>
        </Radio>
      </RadioGroup>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 px-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio value="starter">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Starter</Label>
          </Radio.Button>
          <Description>For side projects and small teams</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Pro</Label>
          </Radio.Button>
          <Description>Advanced reporting and analytics</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Teams</Label>
          </Radio.Button>
          <Description>Share access with up to 10 teammates</Description>
        </Radio>
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
          <Radio value="starter">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Starter</Label>
            </Radio.Button>
            <Description>For side projects and small teams</Description>
          </Radio>
          <Radio value="pro">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Pro</Label>
            </Radio.Button>
            <Description>Advanced reporting and analytics</Description>
          </Radio>
          <Radio value="teams">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Teams</Label>
            </Radio.Button>
            <Description>Share access with up to 10 teammates</Description>
          </Radio>
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
          <Radio value="starter">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Starter</Label>
            </Radio.Button>
            <Description>For side projects and small teams</Description>
          </Radio>
          <Radio value="pro">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Pro</Label>
            </Radio.Button>
            <Description>Advanced reporting and analytics</Description>
          </Radio>
          <Radio value="teams">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Teams</Label>
            </Radio.Button>
            <Description>Share access with up to 10 teammates</Description>
          </Radio>
        </RadioGroup>
        <p className="mt-2 text-sm text-muted">
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
          <Radio value="starter">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Starter</Label>
            </Radio.Button>
            <Description>For side projects and small teams</Description>
          </Radio>
          <Radio value="pro">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Pro</Label>
            </Radio.Button>
            <Description>Advanced reporting and analytics</Description>
          </Radio>
          <Radio value="teams">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>Teams</Label>
            </Radio.Button>
            <Description>Share access with up to 10 teammates</Description>
          </Radio>
        </RadioGroup>
        <p className="mt-2 text-sm text-muted">
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
        <Radio value="starter">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Starter</Label>
          </Radio.Button>
          <Description>For side projects and small teams</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Pro</Label>
          </Radio.Button>
          <Description>Advanced reporting and analytics</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Teams</Label>
          </Radio.Button>
          <Description>Share access with up to 10 teammates</Description>
        </Radio>
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
      <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
        <section className="flex w-full max-w-lg flex-col gap-4">
          <RadioGroup defaultValue="express" name="delivery">
            <Label>Delivery method</Label>
            <div className="grid gap-x-4 md:grid-cols-3">
              {deliveryOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  <Radio.Button
                    className={cx(
                      "group relative flex w-full flex-col gap-6 rounded-xl bg-surface-tertiary px-5 py-4 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                      "data-[focus-visible=true]:bg-accent/10",
                    )}
                  >
                    <Radio.Control className="absolute top-3 right-4 size-5">
                      <Radio.Indicator />
                    </Radio.Control>
                    <div className="flex flex-col gap-1">
                      <Label>{option.title}</Label>
                      <Description>{option.description}</Description>
                    </div>
                    <span className="text-sm font-semibold">{option.price}</span>
                  </Radio.Button>
                </Radio>
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
                <Radio key={option.value} value={option.value}>
                  <Radio.Button
                    className={cx(
                      "group relative flex w-full flex-row items-start justify-start gap-4 rounded-xl bg-surface-tertiary px-5 py-4 transition-all",
                      "data-[selected=true]:bg-accent/10",
                    )}
                  >
                    <Radio.Control className="absolute top-3 right-4 size-5">
                      <Radio.Indicator />
                    </Radio.Control>
                    <Icon className="size-6 text-accent" icon={option.icon} />
                    <div className="flex flex-col gap-1">
                      <Label>{option.title}</Label>
                      <Description>{option.description}</Description>
                    </div>
                  </Radio.Button>
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </section>
      </div>
    );
  },
};

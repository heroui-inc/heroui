import type {ChipProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Separator} from "../separator";

import {Chip} from "./index";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "default", "success", "warning", "danger"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "soft"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    //  TODO: Add sizes
  },
  component: Chip,
  title: "Components/DataDisplay/Chip",
} as Meta<typeof Chip>;

const defaultArgs: ChipProps = {
  children: "Label",
  color: "accent",
  variant: "secondary",
};

const Template = (props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip {...props}>Label</Chip>
  </div>
);

const SizesTemplate = (props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip {...props} size="sm">
      Small
    </Chip>
    <Chip {...props} size="md">
      Medium
    </Chip>
    <Chip {...props} size="lg">
      Large
    </Chip>
  </div>
);

const WithIconTemplate = (props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip {...props}>
      <Icon icon="gravity-ui:circle-dashed" />
      Label <Icon icon="gravity-ui:circle-dashed" />
    </Chip>
  </div>
);

const StatusesTemplate = (props: ChipProps) => {
  const variants = ["primary", "secondary", "tertiary", "soft"] as const;

  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <Chip {...props} variant={variant}>
            <Icon icon="gravity-ui:circle-fill" width={6} />
            Information
          </Chip>
          <Chip {...props} color="success" variant={variant}>
            <Icon icon="gravity-ui:circle-fill" width={6} />
            Completed
          </Chip>
          <Chip {...props} color="warning" variant={variant}>
            <Icon icon="gravity-ui:circle-fill" width={6} />
            Pending
          </Chip>
          <Chip {...props} color="danger" variant={variant}>
            <Icon icon="gravity-ui:circle-fill" width={6} />
            Failed
          </Chip>
        </div>
      ))}
    </div>
  );
};

const VariantsTemplate = (props: ChipProps) => {
  const sizes = ["lg", "md", "sm"] as const;
  const variants = ["primary", "secondary", "tertiary", "soft"] as const;
  const colors = ["accent", "default", "success", "warning", "danger"] as const;

  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <div className="flex flex-col gap-4">
            <h3 className="text-muted text-sm font-semibold capitalize">{size}</h3>
            {/* Color labels header */}
            <div className="flex items-center gap-3">
              <div className="w-24 shrink-0" />
              {colors.map((color) => (
                <div
                  key={color}
                  className="flex shrink-0 items-center justify-center"
                  style={{width: "130px"}}
                >
                  <span className="text-muted text-xs capitalize">{color}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {variants.map((variant) => (
                <div key={variant} className="flex items-center gap-3">
                  <div className="text-muted w-24 shrink-0 text-sm capitalize">{variant}</div>
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="flex shrink-0 items-center justify-center"
                      style={{width: "130px"}}
                    >
                      <Chip {...props} color={color} size={size} variant={variant}>
                        <Icon icon="gravity-ui:circle-dashed" />
                        Label <Icon icon="gravity-ui:circle-dashed" />
                      </Chip>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {index < sizes.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Sizes = {
  args: defaultArgs,
  render: SizesTemplate,
};

export const WithIcon = {
  args: defaultArgs,
  render: WithIconTemplate,
};

export const Statuses = {
  args: defaultArgs,
  render: StatusesTemplate,
};

export const Variants = {
  args: defaultArgs,
  render: VariantsTemplate,
};

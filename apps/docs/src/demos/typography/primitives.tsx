import {Typography} from "@heroui/react";

export const Primitives = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography.Heading level={1}>Dashboard</Typography.Heading>
      <Typography.Paragraph>
        Convenience primitives are thin wrappers over Typography, so you can choose explicit
        composition without learning a second styling system.
      </Typography.Paragraph>
      <Typography.Paragraph color="muted" size="sm">
        Paragraph supports base, sm, and xs sizes.
      </Typography.Paragraph>
      <Typography.Code>Typography.Code</Typography.Code>
    </div>
  );
};

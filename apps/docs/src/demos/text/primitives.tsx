import {Text} from "@heroui/react";

export const Primitives = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Text.Heading level={1}>Dashboard</Text.Heading>
      <Text.Paragraph>
        Convenience primitives are thin wrappers over Text, so you can choose explicit composition
        without learning a second styling system.
      </Text.Paragraph>
      <Text.Paragraph color="muted" size="sm">
        Paragraph supports base, sm, and xs sizes.
      </Text.Paragraph>
      <Text.Code>Text.Code</Text.Code>
    </div>
  );
};

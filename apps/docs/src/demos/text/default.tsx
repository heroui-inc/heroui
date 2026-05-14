import {Text} from "@heroui/react";

export const Default = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Text type="h1">Build better interfaces</Text>
      <Text type="h2">Typography that stays semantic</Text>
      <Text type="h3">Composable by default</Text>
      <Text type="h4">Small heading</Text>
      <Text>
        HeroUI Text uses React Aria Components Text as the primitive, with semantic typography
        types and render-prop polymorphism.
      </Text>
      <Text color="muted" type="body-sm">
        Smaller muted body copy for secondary descriptions.
      </Text>
      <Text type="code">pnpm add @heroui/react</Text>
    </div>
  );
};

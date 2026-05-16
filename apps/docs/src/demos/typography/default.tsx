import {Typography} from "@heroui/react";

export const Default = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography type="h1">Build better interfaces</Typography>
      <Typography type="h2">Typography that stays semantic</Typography>
      <Typography type="h3">Composable by default</Typography>
      <Typography type="h4">Small heading</Typography>
      <Typography>
        HeroUI Typography uses React Aria Components Text as the primitive, with semantic typography
        types and render-prop polymorphism.
      </Typography>
      <Typography color="muted" type="body-sm">
        Smaller muted body copy for secondary descriptions.
      </Typography>
      <Typography type="code">pnpm add @heroui/react</Typography>
    </div>
  );
};

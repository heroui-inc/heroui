import type {ComponentProps} from "react";

import {Code, Heading, Paragraph, Prose, TypographyRoot} from "./typography";

export const Typography = Object.assign(TypographyRoot, {
  Code,
  Heading,
  Paragraph,
  Prose,
  Root: TypographyRoot,
});

export type Typography = {
  CodeProps: ComponentProps<typeof Code>;
  HeadingProps: ComponentProps<typeof Heading>;
  ParagraphProps: ComponentProps<typeof Paragraph>;
  ProseProps: ComponentProps<typeof Prose>;
  Props: ComponentProps<typeof TypographyRoot>;
  RootProps: ComponentProps<typeof TypographyRoot>;
};

export {Code, Heading, Paragraph, Prose, TypographyRoot};

export type {
  CodeProps,
  HeadingProps,
  ParagraphProps,
  ProseProps,
  TypographyRootProps,
  TypographyRootProps as TypographyProps,
} from "./typography";

export {typographyVariants} from "@heroui/styles";

export type {TypographyVariants} from "@heroui/styles";

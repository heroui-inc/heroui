import type {ComponentProps} from "react";

import {Code, Heading, Paragraph, Prose, TextRoot} from "./text";

export const Text = Object.assign(TextRoot, {
  Code,
  Heading,
  Paragraph,
  Prose,
  Root: TextRoot,
});

export type Text = {
  CodeProps: ComponentProps<typeof Code>;
  HeadingProps: ComponentProps<typeof Heading>;
  ParagraphProps: ComponentProps<typeof Paragraph>;
  ProseProps: ComponentProps<typeof Prose>;
  Props: ComponentProps<typeof TextRoot>;
  RootProps: ComponentProps<typeof TextRoot>;
};

export {Code, Heading, Paragraph, Prose, TextRoot};

export type {
  CodeProps,
  HeadingProps,
  ParagraphProps,
  ProseProps,
  TextRootProps,
  TextRootProps as TextProps,
} from "./text";

export {textVariants} from "@heroui/styles";

export type {TextVariants} from "@heroui/styles";

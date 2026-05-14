"use client";

import type {TextVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {textVariants} from "@heroui/styles";
import {Text as TextPrimitive} from "react-aria-components/Text";

import {composeSlotClassName} from "../../utils/compose";

type TextType = NonNullable<TextVariants["type"]>;
type TextAlign = NonNullable<TextVariants["align"]>;
type TextColor = NonNullable<TextVariants["color"]>;
type TextWeight = NonNullable<TextVariants["weight"]>;

const defaultElementByType: Record<TextType, string> = {
  body: "p",
  "body-sm": "p",
  "body-xs": "p",
  code: "code",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

interface TextRootProps extends Omit<
  ComponentPropsWithRef<typeof TextPrimitive>,
  "className" | "elementType"
> {
  align?: TextAlign;
  children?: ReactNode;
  className?: string;
  color?: TextColor;
  type?: TextType;
  truncate?: boolean;
  weight?: TextWeight;
}

const TextRoot = ({
  align = "start",
  children,
  className,
  color = "default",
  truncate,
  type = "body",
  weight,
  ...props
}: TextRootProps) => {
  const slots = textVariants({align, color, truncate, type, weight});

  return (
    <TextPrimitive
      className={composeSlotClassName(slots.base, className)}
      data-slot="text"
      data-type={type}
      elementType={defaultElementByType[type]}
      {...props}
    >
      {children}
    </TextPrimitive>
  );
};

interface HeadingProps extends Omit<TextRootProps, "type"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = ({level = 1, ...props}: HeadingProps) => {
  return <TextRoot type={`h${level}` as TextType} {...props} />;
};

interface ParagraphProps extends Omit<TextRootProps, "type"> {
  size?: "base" | "sm" | "xs";
}

const Paragraph = ({size = "base", ...props}: ParagraphProps) => {
  const type = size === "base" ? "body" : (`body-${size}` as TextType);

  return <TextRoot type={type} {...props} />;
};

interface CodeProps extends Omit<TextRootProps, "type"> {}

const Code = (props: CodeProps) => {
  return <TextRoot type="code" {...props} />;
};

interface ProseProps extends Omit<ComponentPropsWithRef<"div">, "color"> {
  children: ReactNode;
}

const Prose = ({children, className, ...props}: ProseProps) => {
  const slots = textVariants();

  return (
    <div className={composeSlotClassName(slots.prose, className)} data-slot="prose" {...props}>
      {children}
    </div>
  );
};

export {Code, Heading, Paragraph, Prose, TextRoot};

export type {CodeProps, HeadingProps, ParagraphProps, ProseProps, TextRootProps};

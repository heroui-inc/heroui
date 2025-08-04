/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck

import type {MDXComponents} from "mdx/types";

import {Alert, Avatar, Button} from "@heroui/react";
import {Callout} from "fumadocs-ui/components/callout";
import {Card, Cards} from "fumadocs-ui/components/card";
import {Tab, Tabs} from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";

import {ComponentPreview} from "./components/component-preview";
import {Iconify} from "./components/iconify";
import * as AvatarExamples from "./examples/avatar-examples";
import * as ButtonExamples from "./examples/button-examples";
import * as ChipExamples from "./examples/chip-examples";
import * as LinkExamples from "./examples/link-examples";
import * as SpinnerExamples from "./examples/spinner-examples";

// Create icon components using gravity-ui icons
const AlertTriangle = (props: any) => <Iconify {...props} icon="circle-exclamation-fill" />;
const CheckCircle = (props: any) => <Iconify {...props} icon="circle-check-fill" />;
const XCircle = (props: any) => <Iconify {...props} icon="circle-xmark-fill" />;
const Info = (props: any) => <Iconify {...props} icon="circle-info-fill" />;
const X = (props: any) => <Iconify {...props} icon="xmark" />;
const Star = (props: any) => <Iconify {...props} icon="star-fill" />;

// Generic Icon component wrapper
const Icon = (props: any) => <Iconify {...props} />;

// Create preview wrapper component
function Preview({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-background my-6 flex items-center justify-center rounded-lg border p-6">
      {children}
    </div>
  );
}

// Create component grid for component listings
function ComponentGrid({children}: {children: React.ReactNode}) {
  return <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}

// Create component card for component listings
function ComponentCard({
  description,
  href,
  name,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <a className="hover:bg-muted/50 block rounded-lg border p-4 transition-colors" href={href}>
      <h3 className="mb-2 font-semibold">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </a>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Alert,
    AlertTriangle,
    Avatar,
    // Avatar Examples
    AvatarBasic: AvatarExamples.AvatarBasic,
    AvatarFallback: AvatarExamples.AvatarFallback,
    AvatarGroup: AvatarExamples.AvatarGroup,
    AvatarShapes: AvatarExamples.AvatarShapes,
    AvatarSizes: AvatarExamples.AvatarSizes,
    Button,
    // Button Examples
    ButtonBasic: ButtonExamples.ButtonBasic,
    ButtonDisabled: ButtonExamples.ButtonDisabled,
    ButtonIconOnly: ButtonExamples.ButtonIconOnly,
    ButtonLoading: ButtonExamples.ButtonLoading,
    ButtonSizes: ButtonExamples.ButtonSizes,
    ButtonSocial: ButtonExamples.ButtonSocial,
    ButtonVariants: ButtonExamples.ButtonVariants,
    ButtonWithIcons: ButtonExamples.ButtonWithIcons,
    Callout,
    Card,
    Cards,
    CheckCircle,
    // Chip Examples
    ChipBasic: ChipExamples.ChipBasic,
    ChipColors: ChipExamples.ChipColors,
    ChipStatuses: ChipExamples.ChipStatuses,
    ChipVariants: ChipExamples.ChipVariants,
    ChipWithIcon: ChipExamples.ChipWithIcon,
    ComponentCard,
    ComponentGrid,
    ComponentPreview,
    Icon,
    Info,
    // Link Examples
    LinkBasic: LinkExamples.LinkBasic,
    LinkDisabled: LinkExamples.LinkDisabled,
    LinkExternal: LinkExamples.LinkExternal,
    LinkVariants: LinkExamples.LinkVariants,
    Preview,
    // Spinner Examples
    SpinnerBasic: SpinnerExamples.SpinnerBasic,
    SpinnerColors: SpinnerExamples.SpinnerColors,
    SpinnerSizes: SpinnerExamples.SpinnerSizes,
    SpinnerWithLabel: SpinnerExamples.SpinnerWithLabel,
    Star,
    Tab,
    Tabs,
    X,
    XCircle,
    ...components,
  };
}

// Export for Next.js App Router
export const useMDXComponents = getMDXComponents;

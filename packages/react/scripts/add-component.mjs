#!/usr/bin/env node
/* eslint-disable no-console */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function addComponent(componentName) {
  if (!componentName) {
    console.error("❌ Please provide a component name");
    console.log("Usage: node scripts/add-component.mjs <component-name>");
    process.exit(1);
  }

  // Convert to kebab-case if needed
  const kebabName = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  const componentDir = path.join(rootDir, "src/components", kebabName);

  if (await fs.pathExists(componentDir)) {
    console.error(`❌ Component "${kebabName}" already exists`);
    process.exit(1);
  }

  console.log(`📦 Creating new component: ${kebabName}`);

  // Create component directory
  await fs.ensureDir(componentDir);

  // Create component files
  const componentContent = `"use client";

import React from "react";

import {${componentName}Variants, type ${componentName}VariantProps} from "./${kebabName}.styles";

export interface ${componentName}Props extends ${componentName}VariantProps {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({children, className, ...props}, ref) => {
    return (
      <div ref={ref} className={${componentName}Variants({className, ...props})}>
        {children}
      </div>
    );
  }
);

${componentName}.displayName = "HeroUI.${componentName}";
`;

  const stylesContent = `import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const ${componentName}Variants = tv({
  base: "inline-flex items-center justify-center",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      primary: "bg-primary text-primary-foreground",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type ${componentName}VariantProps = VariantProps<typeof ${componentName}Variants>;
`;

  const storiesContent = `import type {Meta, StoryObj} from "@storybook/react";

import {${componentName}} from "./${kebabName}";

const meta: Meta<typeof ${componentName}> = {
  title: "Components/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: "${componentName} Component",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <${componentName} variant="default">Default</${componentName}>
      <${componentName} variant="primary">Primary</${componentName}>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <${componentName} size="sm">Small</${componentName}>
      <${componentName} size="md">Medium</${componentName}>
      <${componentName} size="lg">Large</${componentName}>
    </div>
  ),
};
`;

  const indexContent = `export {${componentName}, type ${componentName}Props} from "./${kebabName}";
export {${componentName}Variants, type ${componentName}VariantProps} from "./${kebabName}.styles";
`;

  // Write files
  await fs.writeFile(path.join(componentDir, `${kebabName}.tsx`), componentContent);
  await fs.writeFile(path.join(componentDir, `${kebabName}.styles.ts`), stylesContent);
  await fs.writeFile(path.join(componentDir, `${kebabName}.stories.tsx`), storiesContent);
  await fs.writeFile(path.join(componentDir, "index.ts"), indexContent);

  // Update components index
  const componentsIndexPath = path.join(rootDir, "src/components/index.ts");
  const componentsIndex = await fs.readFile(componentsIndexPath, "utf-8");

  // Find the right place to insert (alphabetically)
  const lines = componentsIndex.split("\n");
  const exportLine = `export * from "./${kebabName}";`;

  let inserted = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('export * from "./') && lines[i] > exportLine) {
      lines.splice(i, 0, exportLine);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    // Insert before the icons section or at the end
    const iconsIndex = lines.findIndex((line) => line.includes("Icons"));

    if (iconsIndex > 0) {
      lines.splice(iconsIndex - 1, 0, exportLine);
    } else {
      lines.push(exportLine);
    }
  }

  await fs.writeFile(componentsIndexPath, lines.join("\n"));

  console.log(`✅ Component "${kebabName}" created successfully!`);
  console.log("\n📁 Created files:");
  console.log(`   - src/components/${kebabName}/${kebabName}.tsx`);
  console.log(`   - src/components/${kebabName}/${kebabName}.styles.ts`);
  console.log(`   - src/components/${kebabName}/${kebabName}.stories.tsx`);
  console.log(`   - src/components/${kebabName}/index.ts`);
  console.log("\n✏️  Updated src/components/index.ts");
  console.log("\n🎯 Next steps:");
  console.log("   1. Run 'pnpm build' to generate the export in package.json");
  console.log("   2. The component will be available as:");
  console.log(`      - import { ${componentName} } from "@heroui/react"`);
  console.log(`      - import { ${componentName} } from "@heroui/react/${kebabName}"`);
}

// Get component name from command line
const componentName = process.argv[2];

addComponent(componentName).catch((error) => {
  console.error("❌ Failed to create component:", error);
  process.exit(1);
});

export interface ComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

const componentsMap: Record<string, ComponentInfo> = {
  accordion: {
    category: "layout",
    description: "Collapsible content sections",
    href: "/docs/components/accordion",
    name: "accordion",
    title: "Accordion",
  },
  button: {
    category: "forms",
    description: "Allows a user to perform an action",
    href: "/docs/components/button",
    name: "button",
    title: "Button",
  },
  checkbox: {
    category: "forms",
    description: "Binary choice input control",
    href: "/docs/components/checkbox",
    name: "checkbox",
    title: "Checkbox",
  },
  description: {
    category: "forms",
    description: "Helper text for form fields",
    href: "/docs/components/description",
    name: "description",
    title: "Description",
  },
  disclosure: {
    category: "layout",
    description: "Single collapsible content section",
    href: "/docs/components/disclosure",
    name: "disclosure",
    title: "Disclosure",
  },
  disclosuregroup: {
    category: "layout",
    description: "Group of collapsible panels",
    href: "/docs/components/disclosure-group",
    name: "disclosuregroup",
    title: "DisclosureGroup",
  },
  fielderror: {
    category: "forms",
    description: "Inline validation messages for form fields",
    href: "/docs/components/field-error",
    name: "fielderror",
    title: "FieldError",
  },
  fieldset: {
    category: "forms",
    description: "Group related form controls with legends",
    href: "/docs/components/fieldset",
    name: "fieldset",
    title: "Fieldset",
  },
  input: {
    category: "forms",
    description: "Single-line text input built on React Aria",
    href: "/docs/components/input",
    name: "input",
    title: "Input",
  },
  label: {
    category: "forms",
    description: "Accessible label for form controls",
    href: "/docs/components/label",
    name: "label",
    title: "Label",
  },
  menu: {
    category: "display",
    description: "Dropdown menu for actions and navigation",
    href: "/docs/components/menu",
    name: "menu",
    title: "Menu",
  },
  popover: {
    category: "display",
    description: "Displays content in context with a trigger",
    href: "/docs/components/popover",
    name: "popover",
    title: "Popover",
  },
  radiogroup: {
    category: "forms",
    description: "Single selection from multiple options",
    href: "/docs/components/radio-group",
    name: "radiogroup",
    title: "RadioGroup",
  },
  switch: {
    category: "controls",
    description: "Toggle between two states",
    href: "/docs/components/switch",
    name: "switch",
    title: "Switch",
  },
  tabs: {
    category: "layout",
    description: "Organize content into tabbed views",
    href: "/docs/components/tabs",
    name: "tabs",
    title: "Tabs",
  },
  textarea: {
    category: "forms",
    description: "Multiline text input with focus management",
    href: "/docs/components/textarea",
    name: "textarea",
    title: "TextArea",
  },
  textfield: {
    category: "forms",
    description: "Composition-friendly fields with labels and validation",
    href: "/docs/components/text-field",
    name: "textfield",
    title: "TextField",
  },
  tooltip: {
    category: "display",
    description: "Contextual information on hover or focus",
    href: "/docs/components/tooltip",
    name: "tooltip",
    title: "Tooltip",
  },
};

// Define relationships between components
const componentRelationships: Record<string, string[]> = {
  accordion: ["disclosuregroup", "disclosure"],
  button: ["popover", "tooltip"],
  checkbox: ["label", "description"],
  disclosure: ["accordion", "disclosuregroup"],
  disclosuregroup: ["accordion", "disclosure"],
  fieldset: ["textfield", "label", "description"],
  input: ["textfield", "textarea"],
  popover: ["button", "tooltip"],
  radiogroup: ["label", "description"],
  switch: ["label", "description"],
  tabs: ["accordion"],
  textarea: ["textfield"],
  textfield: ["input", "textarea", "fieldset"],
  tooltip: ["button", "popover"],
};

/**
 * Get information about a specific component
 */
export function getComponentInfo(componentName: string): ComponentInfo | undefined {
  const normalizedName = componentName.toLowerCase().replace(/[-_\s]/g, "");

  return componentsMap[normalizedName];
}

/**
 * Get related components for a given component
 */
export function getRelatedComponents(componentName: string): ComponentInfo[] {
  const normalizedName = componentName.toLowerCase().replace(/[-_\s]/g, "");
  const relatedNames = componentRelationships[normalizedName] || [];

  return relatedNames
    .map((name) => componentsMap[name])
    .filter((name): name is ComponentInfo => name !== undefined);
}

/**
 * Get all components in a specific category
 */
export function getComponentsByCategory(category: string): ComponentInfo[] {
  return Object.values(componentsMap).filter((comp) => comp.category === category);
}

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
  alert: {
    category: "display",
    description: "Display important messages and notifications",
    href: "/docs/components/alert",
    name: "alert",
    title: "Alert",
  },
  avatar: {
    category: "display",
    description: "Display user profile images",
    href: "/docs/components/avatar",
    name: "avatar",
    title: "Avatar",
  },
  button: {
    category: "forms",
    description: "Allows a user to perform an action",
    href: "/docs/components/button",
    name: "button",
    title: "Button",
  },
  card: {
    category: "layout",
    description: "Content container with header, body, and footer",
    href: "/docs/components/card",
    name: "card",
    title: "Card",
  },
  checkbox: {
    category: "forms",
    description: "Binary choice input control",
    href: "/docs/components/checkbox",
    name: "checkbox",
    title: "Checkbox",
  },
  checkboxgroup: {
    category: "forms",
    description: "Group of checkboxes with shared state",
    href: "/docs/components/checkbox-group",
    name: "checkboxgroup",
    title: "CheckboxGroup",
  },
  chip: {
    category: "display",
    description: "Compact elements for tags and filters",
    href: "/docs/components/chip",
    name: "chip",
    title: "Chip",
  },
  closebutton: {
    category: "forms",
    description: "Button for dismissing overlays",
    href: "/docs/components/close-button",
    name: "closebutton",
    title: "CloseButton",
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
  dropdown: {
    category: "display",
    description: "Context menu with actions and options",
    href: "/docs/components/dropdown",
    name: "dropdown",
    title: "Dropdown",
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
  form: {
    category: "forms",
    description: "Form validation and submission handling",
    href: "/docs/components/form",
    name: "form",
    title: "Form",
  },
  input: {
    category: "forms",
    description: "Single-line text input built on React Aria",
    href: "/docs/components/input",
    name: "input",
    title: "Input",
  },
  inputotp: {
    category: "forms",
    description: "One-time password input",
    href: "/docs/components/input-otp",
    name: "inputotp",
    title: "InputOTP",
  },
  kbd: {
    category: "display",
    description: "Keyboard key display",
    href: "/docs/components/kbd",
    name: "kbd",
    title: "Kbd",
  },
  label: {
    category: "forms",
    description: "Accessible label for form controls",
    href: "/docs/components/label",
    name: "label",
    title: "Label",
  },
  link: {
    category: "navigation",
    description: "Styled anchor links",
    href: "/docs/components/link",
    name: "link",
    title: "Link",
  },
  listbox: {
    category: "display",
    description: "Scrollable list of selectable items",
    href: "/docs/components/listbox",
    name: "listbox",
    title: "Listbox",
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
  select: {
    category: "forms",
    description: "Dropdown select control",
    href: "/docs/components/select",
    name: "select",
    title: "Select",
  },
  separator: {
    category: "layout",
    description: "Visual divider between content",
    href: "/docs/components/separator",
    name: "separator",
    title: "Separator",
  },
  skeleton: {
    category: "display",
    description: "Loading placeholder",
    href: "/docs/components/skeleton",
    name: "skeleton",
    title: "Skeleton",
  },
  slider: {
    category: "forms",
    description: "Range selection slider",
    href: "/docs/components/slider",
    name: "slider",
    title: "Slider",
  },
  spinner: {
    category: "display",
    description: "Loading indicator",
    href: "/docs/components/spinner",
    name: "spinner",
    title: "Spinner",
  },
  surface: {
    category: "layout",
    description: "Base container surface",
    href: "/docs/components/surface",
    name: "surface",
    title: "Surface",
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
  alert: ["closebutton", "button", "spinner"],
  avatar: ["separator"],
  button: ["popover", "tooltip", "form", "alert", "closebutton", "dropdown"],
  card: ["surface", "avatar", "form", "button", "link", "closebutton"],
  checkbox: ["label", "checkboxgroup", "description", "button"],
  checkboxgroup: [
    "checkbox",
    "label",
    "fieldset",
    "surface",
    "description",
    "form",
    "button",
    "fielderror",
  ],
  chip: ["avatar", "closebutton", "separator"],
  closebutton: ["alert", "chip"],
  description: [
    "textfield",
    "input",
    "textarea",
    "checkbox",
    "radiogroup",
    "switch",
    "checkboxgroup",
    "slider",
    "select",
  ],
  disclosure: ["accordion", "disclosuregroup", "button"],
  disclosuregroup: ["accordion", "disclosure", "button", "separator"],
  dropdown: ["button", "popover", "separator", "listbox"],
  fielderror: ["textfield", "input", "textarea", "form"],
  fieldset: ["textfield", "label", "checkboxgroup", "surface"],
  form: [
    "button",
    "fieldset",
    "textfield",
    "input",
    "textarea",
    "label",
    "fielderror",
    "checkbox",
    "checkboxgroup",
    "radiogroup",
    "switch",
    "select",
    "slider",
    "inputotp",
  ],
  input: ["textfield", "textarea", "label", "fielderror", "form", "surface", "description"],
  inputotp: ["input", "form", "surface", "button", "link", "spinner"],
  kbd: [],
  label: [
    "input",
    "textarea",
    "fieldset",
    "checkbox",
    "checkboxgroup",
    "radiogroup",
    "switch",
    "slider",
    "select",
  ],
  link: [],
  listbox: ["select", "avatar", "kbd", "separator", "surface", "dropdown"],
  popover: ["button", "tooltip", "select", "avatar", "dropdown"],
  radiogroup: ["fieldset", "surface", "description", "form", "button", "fielderror"],
  select: [
    "listbox",
    "popover",
    "label",
    "fielderror",
    "form",
    "surface",
    "description",
    "spinner",
    "button",
    "separator",
    "avatar",
  ],
  separator: ["card", "chip", "avatar", "disclosuregroup", "listbox", "select", "dropdown"],
  skeleton: ["card", "avatar"],
  slider: ["label", "form", "description"],
  spinner: [],
  surface: [
    "checkboxgroup",
    "fieldset",
    "inputotp",
    "input",
    "radiogroup",
    "select",
    "textfield",
    "textarea",
    "card",
    "listbox",
  ],
  switch: ["label", "description", "button", "form"],
  tabs: [],
  textarea: ["textfield", "input", "label", "fielderror", "form", "surface", "description"],
  textfield: ["input", "textarea", "fieldset", "label", "fielderror", "surface", "description"],
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

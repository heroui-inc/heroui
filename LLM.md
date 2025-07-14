# HeroUI React Component Library - API Documentation

## Overview

HeroUI is a modern React UI library built with TypeScript, Tailwind CSS, and React Aria. It provides a comprehensive set of accessible, customizable components for building modern web applications.

**Repository:** https://github.com/heroui-inc/heroui  
**Documentation:** https://heroui.com/docs  
**Version:** 2.7.11  
**License:** MIT

## Installation

```bash
npm install @heroui/react
# or
pnpm add @heroui/react
# or
yarn add @heroui/react
```

## Basic Setup

```tsx
import {HeroUIProvider} from "@heroui/system";
import {Button} from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <Button color="primary">Click me</Button>
    </HeroUIProvider>
  );
}
```

## Core Architecture

### Main Packages

- **@heroui/react** - Main library export with all components
- **@heroui/system** - Provider system and React utilities  
- **@heroui/theme** - Theming system with Tailwind integration
- **@heroui/system-rsc** - React Server Components utilities

### Key Utilities

- **HeroUIProvider** - Main context provider for theme, animation, and i18n
- **tv (Tailwind Variants)** - Styling utility for component variants
- **extendVariants** - Utility for extending component variants
- **useDisclosure** - Hook for managing open/close state


## UI Components

### Layout & Navigation

#### Accordion
**Import:** `import {Accordion, AccordionItem} from "@heroui/react";`

```tsx
<Accordion>
  <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
    Content 1
  </AccordionItem>
  <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
    Content 2
  </AccordionItem>
</Accordion>
```

**Key Props:**
- `variant?: "light" | "shadow" | "bordered" | "splitted"`
- `selectionMode?: "none" | "single" | "multiple"`
- `isCompact?: boolean`
- `hideIndicator?: boolean`

#### Breadcrumbs
**Import:** `import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";`

```tsx
<Breadcrumbs>
  <BreadcrumbItem>Home</BreadcrumbItem>
  <BreadcrumbItem>Music</BreadcrumbItem>
  <BreadcrumbItem>Artist</BreadcrumbItem>
</Breadcrumbs>
```

#### Navbar
**Import:** `import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@heroui/react";`

```tsx
<Navbar>
  <NavbarBrand>
    <p className="font-bold text-inherit">ACME</p>
  </NavbarBrand>
  <NavbarContent className="hidden sm:flex gap-4" justify="center">
    <NavbarItem>
      <Link color="foreground" href="#">
        Features
      </Link>
    </NavbarItem>
  </NavbarContent>
</Navbar>
```

#### Tabs
**Import:** `import {Tabs, Tab} from "@heroui/react";`

```tsx
<Tabs aria-label="Options">
  <Tab key="photos" title="Photos">
    Photos content
  </Tab>
  <Tab key="music" title="Music">
    Music content
  </Tab>
</Tabs>
```

### Form Components

#### Button
**Import:** `import {Button, ButtonGroup} from "@heroui/react";`

```tsx
<Button color="primary" size="md" variant="solid">
  Click me
</Button>

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

**Key Props:**
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `size?: "sm" | "md" | "lg"`
- `variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost"`
- `isLoading?: boolean`
- `isDisabled?: boolean`
- `startContent?: ReactNode`
- `endContent?: ReactNode`

#### Input
**Import:** `import {Input, Textarea} from "@heroui/react";`

```tsx
<Input
  type="email"
  label="Email"
  placeholder="Enter your email"
  labelPlacement="outside"
/>

<Textarea
  label="Description"
  placeholder="Enter your description"
  className="max-w-xs"
/>
```

**Key Props:**
- `type?: string`
- `label?: ReactNode`
- `placeholder?: string`
- `labelPlacement?: "inside" | "outside" | "outside-left"`
- `variant?: "flat" | "bordered" | "faded" | "underlined"`
- `size?: "sm" | "md" | "lg"`
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `isRequired?: boolean`
- `isDisabled?: boolean`
- `isInvalid?: boolean`
- `errorMessage?: ReactNode`
- `description?: ReactNode`
- `startContent?: ReactNode`
- `endContent?: ReactNode`

#### Select
**Import:** `import {Select, SelectItem, SelectSection} from "@heroui/react";`

```tsx
<Select 
  label="Favorite Animal" 
  placeholder="Select an animal"
  className="max-w-xs"
>
  <SelectItem key="cat">Cat</SelectItem>
  <SelectItem key="dog">Dog</SelectItem>
  <SelectItem key="elephant">Elephant</SelectItem>
</Select>
```

#### Checkbox
**Import:** `import {Checkbox, CheckboxGroup} from "@heroui/react";`

```tsx
<Checkbox defaultSelected>Option</Checkbox>

<CheckboxGroup
  label="Select cities"
  color="secondary"
  defaultValue={["buenos-aires", "london"]}
>
  <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
  <Checkbox value="sydney">Sydney</Checkbox>
  <Checkbox value="london">London</Checkbox>
</CheckboxGroup>
```

#### Radio
**Import:** `import {Radio, RadioGroup} from "@heroui/react";`

```tsx
<RadioGroup
  label="Select your favorite city"
  defaultValue="london"
>
  <Radio value="buenos-aires">Buenos Aires</Radio>
  <Radio value="sydney">Sydney</Radio>
  <Radio value="london">London</Radio>
</RadioGroup>
```

#### Switch
**Import:** `import {Switch} from "@heroui/react";`

```tsx
<Switch defaultSelected>Airplane mode</Switch>
```

#### Slider
**Import:** `import {Slider} from "@heroui/react";`

```tsx
<Slider 
  label="Temperature" 
  step={1} 
  maxValue={100} 
  minValue={0} 
  defaultValue={40}
  className="max-w-md"
/>
```


### Data Display

#### Avatar
**Import:** `import {Avatar, AvatarGroup} from "@heroui/react";`

```tsx
<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

<AvatarGroup isBordered>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
</AvatarGroup>
```

**Key Props:**
- `src?: string`
- `alt?: string`
- `name?: string`
- `size?: "sm" | "md" | "lg"`
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `radius?: "none" | "sm" | "md" | "lg" | "full"`
- `isBordered?: boolean`
- `isDisabled?: boolean`

#### Badge
**Import:** `import {Badge} from "@heroui/react";`

```tsx
<Badge content="5" color="danger">
  <Button>Messages</Button>
</Badge>
```

**Key Props:**
- `content?: ReactNode`
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `size?: "sm" | "md" | "lg"`
- `variant?: "solid" | "flat" | "faded" | "shadow"`
- `placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left"`
- `shape?: "circle" | "rectangle"`
- `showOutline?: boolean`
- `isInvisible?: boolean`

#### Card
**Import:** `import {Card, CardHeader, CardBody, CardFooter} from "@heroui/react";`

```tsx
<Card className="max-w-[400px]">
  <CardHeader className="flex gap-3">
    <div className="flex flex-col">
      <p className="text-md">NextUI</p>
      <p className="text-small text-default-500">nextui.org</p>
    </div>
  </CardHeader>
  <CardBody>
    <p>Make beautiful websites regardless of your design experience.</p>
  </CardBody>
  <CardFooter>
    <Link href="https://github.com/nextui-org/nextui">
      Visit source code on GitHub.
    </Link>
  </CardFooter>
</Card>
```

**Key Props:**
- `shadow?: "none" | "sm" | "md" | "lg"`
- `radius?: "none" | "sm" | "md" | "lg"`
- `fullWidth?: boolean`
- `isHoverable?: boolean`
- `isPressable?: boolean`
- `isBlurred?: boolean`
- `isFooterBlurred?: boolean`

#### Chip
**Import:** `import {Chip} from "@heroui/react";`

```tsx
<Chip color="primary" variant="solid">
  Chip
</Chip>
```

**Key Props:**
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `size?: "sm" | "md" | "lg"`
- `variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot"`
- `radius?: "none" | "sm" | "md" | "lg" | "full"`
- `startContent?: ReactNode`
- `endContent?: ReactNode`
- `onClose?: () => void`

#### Code
**Import:** `import {Code} from "@heroui/react";`

```tsx
<Code color="primary">npm install @heroui/react</Code>
```

#### Image
**Import:** `import {Image} from "@heroui/react";`

```tsx
<Image
  width={300}
  alt="NextUI hero Image"
  src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
/>
```

#### Progress
**Import:** `import {Progress, CircularProgress} from "@heroui/react";`

```tsx
<Progress 
  aria-label="Loading..." 
  value={60} 
  className="max-w-md" 
/>

<CircularProgress 
  aria-label="Loading..." 
  value={70} 
/>
```

#### Skeleton
**Import:** `import {Skeleton} from "@heroui/react";`

```tsx
<Skeleton className="rounded-lg">
  <div className="h-24 rounded-lg bg-default-300"></div>
</Skeleton>
```

#### Snippet
**Import:** `import {Snippet} from "@heroui/react";`

```tsx
<Snippet>npm install @heroui/react</Snippet>
```

#### Spinner
**Import:** `import {Spinner} from "@heroui/react";`

```tsx
<Spinner color="primary" />
```

#### Table
**Import:** `import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";`

```tsx
<Table aria-label="Example static collection table">
  <TableHeader>
    <TableColumn>NAME</TableColumn>
    <TableColumn>ROLE</TableColumn>
    <TableColumn>STATUS</TableColumn>
  </TableHeader>
  <TableBody>
    <TableRow key="1">
      <TableCell>Tony Reichert</TableCell>
      <TableCell>CEO</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Key Props:**
- `selectionMode?: "none" | "single" | "multiple"`
- `selectionBehavior?: "toggle" | "replace"`
- `color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `layout?: "auto" | "fixed"`
- `hideHeader?: boolean`
- `isStriped?: boolean`
- `isCompact?: boolean`
- `removeWrapper?: boolean`

#### User
**Import:** `import {User} from "@heroui/react";`

```tsx
<User   
  name="Jane Doe"
  description="Product Designer"
  avatarProps={{
    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  }}
/>
```


### Overlays & Feedback

#### Modal
**Import:** `import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@heroui/react";`

```tsx
const {isOpen, onOpen, onOpenChange} = useDisclosure();

<>
  <Button onPress={onOpen}>Open Modal</Button>
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <p>Modal body content</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
</>
```

**Key Props:**
- `size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"`
- `placement?: "auto" | "top" | "center" | "bottom"`
- `backdrop?: "transparent" | "opaque" | "blur"`
- `scrollBehavior?: "inside" | "outside"`
- `isDismissable?: boolean`
- `isKeyboardDismissDisabled?: boolean`
- `hideCloseButton?: boolean`

#### Popover
**Import:** `import {Popover, PopoverTrigger, PopoverContent} from "@heroui/react";`

```tsx
<Popover placement="bottom" showArrow={true}>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="px-1 py-2">
      <div className="text-small font-bold">Popover Content</div>
      <div className="text-tiny">This is the popover content</div>
    </div>
  </PopoverContent>
</Popover>
```

#### Tooltip
**Import:** `import {Tooltip} from "@heroui/react";`

```tsx
<Tooltip content="I am a tooltip">
  <Button>Hover me</Button>
</Tooltip>
```

**Key Props:**
- `content?: ReactNode`
- `placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end"`
- `color?: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `size?: "sm" | "md" | "lg"`
- `delay?: number`
- `closeDelay?: number`
- `showArrow?: boolean`
- `isDisabled?: boolean`

#### Dropdown
**Import:** `import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection} from "@heroui/react";`

```tsx
<Dropdown>
  <DropdownTrigger>
    <Button variant="bordered">Open Menu</Button>
  </DropdownTrigger>
  <DropdownMenu aria-label="Static Actions">
    <DropdownItem key="new">New file</DropdownItem>
    <DropdownItem key="copy">Copy link</DropdownItem>
    <DropdownItem key="edit">Edit file</DropdownItem>
    <DropdownItem key="delete" className="text-danger" color="danger">
      Delete file
    </DropdownItem>
  </DropdownMenu>
</Dropdown>
```

#### Alert
**Import:** `import {Alert} from "@heroui/react";`

```tsx
<Alert 
  color="primary" 
  title="Heads up!" 
  description="This is an alert message."
/>
```

#### Toast
**Import:** `import {toast} from "@heroui/react";`

```tsx
// Usage
toast("Hello World!");
toast.success("Success message");
toast.error("Error message");
toast.warning("Warning message");
```

#### Drawer
**Import:** `import {Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter} from "@heroui/react";`

```tsx
<Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
  <DrawerContent>
    <DrawerHeader>Drawer Title</DrawerHeader>
    <DrawerBody>
      <p>Drawer content</p>
    </DrawerBody>
    <DrawerFooter>
      <Button color="danger" variant="light" onPress={onClose}>
        Close
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Date & Time

#### Calendar
**Import:** `import {Calendar, RangeCalendar} from "@heroui/react";`

```tsx
<Calendar aria-label="Date (No Selection)" />

<RangeCalendar aria-label="Date range (No Selection)" />
```

#### DateInput
**Import:** `import {DateInput, TimeInput} from "@heroui/react";`

```tsx
<DateInput 
  label="Birth date" 
  placeholderValue={new CalendarDate(1995, 11, 6)} 
/>

<TimeInput label="Event time" />
```

#### DatePicker
**Import:** `import {DatePicker, DateRangePicker} from "@heroui/react";`

```tsx
<DatePicker 
  label="Birth date" 
  className="max-w-[284px]" 
/>

<DateRangePicker 
  label="Stay duration" 
  className="max-w-xs" 
/>
```


### Specialized Components

#### Autocomplete
**Import:** `import {Autocomplete, AutocompleteItem, AutocompleteSection} from "@heroui/react";`

```tsx
<Autocomplete 
  label="Select an animal" 
  className="max-w-xs" 
  defaultItems={animals}
>
  {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
</Autocomplete>
```

#### Listbox
**Import:** `import {Listbox, ListboxItem, ListboxSection} from "@heroui/react";`

```tsx
<Listbox aria-label="Actions">
  <ListboxItem key="new">New file</ListboxItem>
  <ListboxItem key="copy">Copy link</ListboxItem>
  <ListboxItem key="edit">Edit file</ListboxItem>
</Listbox>
```

#### Menu
**Import:** `import {Menu, MenuItem, MenuSection} from "@heroui/react";`

```tsx
<Menu aria-label="Actions">
  <MenuItem key="new">New file</MenuItem>
  <MenuItem key="copy">Copy link</MenuItem>
  <MenuItem key="edit">Edit file</MenuItem>
</Menu>
```

#### Pagination
**Import:** `import {Pagination} from "@heroui/react";`

```tsx
<Pagination total={10} initialPage={1} />
```

**Key Props:**
- `total: number`
- `initialPage?: number`
- `page?: number`
- `siblings?: number`
- `boundaries?: number`
- `showControls?: boolean`
- `showShadow?: boolean`
- `isCompact?: boolean`
- `isDisabled?: boolean`
- `loop?: boolean`

#### InputOTP
**Import:** `import {InputOTP} from "@heroui/react";`

```tsx
<InputOTP length={6} />
```

#### NumberInput
**Import:** `import {NumberInput} from "@heroui/react";`

```tsx
<NumberInput
  label="Price"
  placeholder="0.00"
  startContent={
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small">$</span>
    </div>
  }
/>
```

### Utility Components

#### Divider
**Import:** `import {Divider} from "@heroui/react";`

```tsx
<Divider className="my-4" />
```

#### Kbd
**Import:** `import {Kbd} from "@heroui/react";`

```tsx
<Kbd keys={["command"]}>K</Kbd>
```

#### Link
**Import:** `import {Link} from "@heroui/react";`

```tsx
<Link href="#" color="primary">
  Link
</Link>
```

**Key Props:**
- `href?: string`
- `color?: "foreground" | "primary" | "secondary" | "success" | "warning" | "danger"`
- `size?: "sm" | "md" | "lg"`
- `underline?: "none" | "hover" | "always" | "active" | "focus"`
- `isExternal?: boolean`
- `showAnchorIcon?: boolean`
- `isDisabled?: boolean`
- `isBlock?: boolean`

#### ScrollShadow
**Import:** `import {ScrollShadow} from "@heroui/react";`

```tsx
<ScrollShadow className="w-[400px] h-[300px]">
  {/* Scrollable content */}
</ScrollShadow>
```

#### Spacer
**Import:** `import {Spacer} from "@heroui/react";`

```tsx
<Spacer y={4} />
```

## Custom Hooks

### State Management

#### useDisclosure
**Import:** `import {useDisclosure} from "@heroui/react";`

```tsx
const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
```

**Returns:**
- `isOpen: boolean`
- `onOpen: () => void`
- `onClose: () => void`
- `onOpenChange: (isOpen: boolean) => void`
- `isControlled: boolean`
- `getButtonProps: () => object`
- `getDisclosureProps: () => object`

### Utility Hooks

#### useClipboard
**Import:** `import {useClipboard} from "@heroui/react";`

```tsx
const {copy, copied, error, reset} = useClipboard({ timeout: 2000 });
```

#### useInfiniteScroll
**Import:** `import {useInfiniteScroll} from "@heroui/react";`

```tsx
const [loaderRef, scrollerRef] = useInfiniteScroll({
  hasMore: true,
  onLoadMore: loadMoreItems
});
```

#### useImage
**Import:** `import {useImage} from "@heroui/react";`

```tsx
const status = useImage({
  src: "image.jpg",
  onLoad: () => console.log("loaded"),
  onError: () => console.log("error")
});
```

#### usePagination
**Import:** `import {usePagination} from "@heroui/react";`

```tsx
const pagination = usePagination({
  total: 100,
  initialPage: 1,
  siblings: 1,
  boundaries: 1
});
```


## Theming & Customization

### Theme Configuration

#### Using tv (Tailwind Variants)
**Import:** `import {tv} from "@heroui/theme";`

```tsx
const button = tv({
  base: "inline-flex items-center justify-center rounded-medium",
  variants: {
    color: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground"
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md"
  }
});
```

#### Extending Components
**Import:** `import {extendVariants} from "@heroui/system";`

```tsx
const MyButton = extendVariants(Button, {
  variants: {
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]"
    },
    isMyCustomVariant: {
      true: "bg-[#84cc16] text-[#000] data-[hover=true]:bg-[#84cc16]/80"
    }
  },
  defaultVariants: {
    color: "olive"
  }
});

// Usage
<MyButton color="orange">Custom Button</MyButton>
```

### Provider Configuration

#### HeroUIProvider
**Import:** `import {HeroUIProvider} from "@heroui/system";`

```tsx
<HeroUIProvider
  theme={{
    layout: {
      fontSize: {
        tiny: "0.75rem",
        small: "0.875rem",
        medium: "1rem",
        large: "1.125rem"
      },
      radius: {
        small: "4px",
        medium: "6px",
        large: "8px"
      }
    }
  }}
  defaultTheme="dark"
  disableAnimation={false}
  disableRipple={false}
  skipFramerMotionAnimations={false}
  validationBehavior="aria"
>
  <App />
</HeroUIProvider>
```

**Provider Props:**
- `theme?: ThemeConfig`
- `defaultTheme?: "light" | "dark" | "system"`
- `disableAnimation?: boolean`
- `disableRipple?: boolean`
- `skipFramerMotionAnimations?: boolean`
- `validationBehavior?: "aria" | "native"`
- `locale?: string`
- `navigate?: (path: string) => void`

### Color System

#### Semantic Colors
```tsx
// Available color tokens
const colors = {
  // Base colors
  default: "default",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  danger: "danger",
  
  // Semantic colors
  foreground: "foreground",
  background: "background",
  divider: "divider",
  focus: "focus",
  content1: "content1",
  content2: "content2",
  content3: "content3",
  content4: "content4"
};
```

#### Custom CSS Variables
```css
:root {
  --heroui-primary: 212 100% 47%;
  --heroui-primary-foreground: 210 40% 98%;
  --heroui-secondary: 200 100% 40%;
  --heroui-secondary-foreground: 210 40% 98%;
  --heroui-success: 142 76% 36%;
  --heroui-success-foreground: 355 100% 97%;
  --heroui-warning: 38 92% 50%;
  --heroui-warning-foreground: 20 14.3% 4.1%;
  --heroui-danger: 0 84% 60%;
  --heroui-danger-foreground: 210 40% 98%;
}
```

## Accessibility Features

### ARIA Support
- All components include proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast mode support

### Keyboard Navigation
- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and toggles
- **Arrow Keys**: Navigate within components (menus, tabs, etc.)
- **Escape**: Close overlays and modals
- **Home/End**: Navigate to first/last items in lists

### Focus Management
- Automatic focus trapping in modals
- Focus restoration after overlay closure
- Skip links for better navigation
- Visible focus indicators

## Animation System

### Framer Motion Integration
**Import:** `import {motion} from "framer-motion";`

```tsx
// HeroUI components support Framer Motion props
<Button
  as={motion.button}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated Button
</Button>
```

### Transition Presets
**Import:** `import {TRANSITION_VARIANTS} from "@heroui/framer-utils";`

```tsx
const variants = {
  enter: TRANSITION_VARIANTS.scaleSpring.enter,
  exit: TRANSITION_VARIANTS.scaleSpring.exit
};
```

### Disabling Animations
```tsx
<HeroUIProvider disableAnimation={true}>
  <App />
</HeroUIProvider>
```

## Form Integration

### React Hook Form
```tsx
import {useForm, Controller} from "react-hook-form";
import {Input, Button} from "@heroui/react";

function MyForm() {
  const {control, handleSubmit} = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({field, fieldState}) => (
          <Input
            {...field}
            type="email"
            label="Email"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Form Validation
```tsx
<Input
  type="email"
  label="Email"
  isRequired
  validate={(value) => {
    if (!value.includes("@")) {
      return "Please enter a valid email";
    }
  }}
/>
```

## Server-Side Rendering (SSR)

### Next.js Integration
```tsx
// pages/_app.tsx
import {HeroUIProvider} from "@heroui/system";

function MyApp({Component, pageProps}) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
```

### RSC Support
HeroUI provides React Server Components support through `@heroui/system-rsc`:

```tsx
// Server Component
import {Button} from "@heroui/react";

export default function ServerComponent() {
  return (
    <div>
      <Button>Server-rendered Button</Button>
    </div>
  );
}
```

## TypeScript Support

### Component Props
```tsx
import type {ButtonProps} from "@heroui/react";

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

const MyButton: React.FC<MyButtonProps> = ({customProp, ...props}) => {
  return <Button {...props}>Custom Button</Button>;
};
```

### Generic Components
```tsx
import type {Selection} from "@heroui/react";

const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["2"]));

<Table
  selectionMode="multiple"
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
>
  {/* Table content */}
</Table>
```

## Performance Optimization

### Tree Shaking
```tsx
// Import only what you need
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";

// Instead of
import {Button, Input} from "@heroui/react";
```

### Bundle Size
- Core library: ~50KB gzipped
- Individual components: 2-10KB each
- Tree-shakeable imports
- Optimized for modern bundlers

### Lazy Loading
```tsx
import {lazy, Suspense} from "react";

const Modal = lazy(() => import("@heroui/modal").then(m => ({default: m.Modal})));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal>Content</Modal>
    </Suspense>
  );
}
```

## Migration & Compatibility

### From NextUI v1
- Component names remain mostly the same
- Props API has been simplified
- New theming system with Tailwind Variants
- Improved TypeScript support
- Better accessibility features

### Browser Support
- Chrome 91+
- Firefox 90+
- Safari 15+
- Edge 91+
- Mobile browsers (iOS Safari 15+, Chrome Mobile 91+)

## Resources

- **Documentation**: https://heroui.com/docs
- **Storybook**: https://storybook.heroui.com
- **GitHub**: https://github.com/heroui-inc/heroui
- **Discord**: https://discord.gg/9b6yyZKmH4
- **Twitter**: https://x.com/hero_ui

---

*This documentation covers HeroUI v2.7.11. For the latest updates and detailed examples, visit the official documentation at https://heroui.com/docs*

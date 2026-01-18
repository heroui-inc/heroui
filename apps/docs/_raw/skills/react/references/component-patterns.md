# HeroUI v3 Component Patterns

Detailed implementation patterns for building with HeroUI v3 components.

> **v3 Only**: These patterns are for HeroUI v3. Do NOT use v2 patterns (no `HeroUIProvider`, no `framer-motion`, no flat props like `<Card title="...">`).

---

## Render Props Pattern

HeroUI components support render props for custom rendering based on component state.

### Basic Render Props

```tsx
import { Button } from '@heroui/react';

function CustomButton() {
  return (
    <Button variant="primary">
      {({ isPressed, isHovered, isFocused, isDisabled }) => (
        <span className={`
          transition-transform
          ${isPressed ? 'scale-95' : ''}
          ${isHovered ? 'brightness-110' : ''}
        `}>
          {isPressed ? 'Pressing...' : 'Click me'}
        </span>
      )}
    </Button>
  );
}
```

### Available State Properties

| Property | Type | Description |
|----------|------|-------------|
| `isHovered` | boolean | Mouse is over the element |
| `isPressed` | boolean | Element is being pressed |
| `isFocused` | boolean | Element has focus |
| `isFocusVisible` | boolean | Focus should be visually indicated |
| `isDisabled` | boolean | Element is disabled |
| `isPending` | boolean | Element is in loading state |

### When to Use Render Props

- Custom visual feedback based on interaction state
- Conditional content rendering
- Complex animations tied to state
- Integrating with external animation libraries

---

## Data Attributes for Styling

All interactive components expose state via data attributes for CSS-based styling.

### Available Data Attributes

```css
/* Hover state */
.button[data-hovered="true"], .button:hover { }

/* Pressed/active state */
.button[data-pressed="true"], .button:active { }

/* Focus states */
.button[data-focused="true"] { }
.button[data-focus-visible="true"], .button:focus-visible { }

/* Disabled state */
.button[data-disabled="true"], .button[aria-disabled="true"] { }

/* Pending/loading state */
.button[data-pending] { }

/* Selected state (checkboxes, toggles) */
.checkbox[data-selected="true"] { }

/* Invalid state (form fields) */
.input[data-invalid="true"] { }
```

### Styling Example

```css
/* Button with data attribute styling */
.custom-button {
  background: var(--accent);
  transition: all 0.2s ease;
}

.custom-button[data-hovered="true"] {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.custom-button[data-pressed="true"] {
  transform: scale(0.97);
}

.custom-button[data-focus-visible="true"] {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

.custom-button[data-disabled="true"] {
  opacity: var(--disabled-opacity);
  cursor: not-allowed;
}
```

---

## BEM Class Customization

HeroUI uses BEM methodology for consistent class naming.

### Class Structure

```css
/* Block */
.button { }
.accordion { }

/* Element */
.accordion__trigger { }
.accordion__panel { }

/* Modifier */
.button--primary { }
.button--lg { }
.accordion--outline { }
```

### Global Customization

```css
@layer components {
  /* Override button styles */
  .button {
    @apply font-semibold;
  }

  .button--primary {
    @apply bg-accent hover:bg-accent-hover;
  }

  /* Add custom variant using theme variables */
  .button--custom {
    @apply bg-[var(--accent)] text-[var(--accent-foreground)];
  }
}
```

---

## Common Component Compositions

### Form with Validation

```tsx
import { useState } from 'react';
import {
  Form,
  TextField,
  TextArea,
  Input,
  Label,
  Description,
  FieldError,
  Button,
} from '@heroui/react';

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // Validate and submit
  };

  return (
    <Form onSubmit={handleSubmit} validationErrors={errors}>
      <TextField name="name" isRequired>
        <Label>Name</Label>
        <Input placeholder="Enter your name" />
        <Description>Your full name as it appears on documents</Description>
        <FieldError />
      </TextField>

      <TextField name="email" type="email" isRequired>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
        <FieldError />
      </TextField>

      <TextField name="message">
        <Label>Message</Label>
        <TextArea placeholder="How can we help?" />
        <FieldError />
      </TextField>

      <Button type="submit" variant="primary">
        Send Message
      </Button>
    </Form>
  );
}
```

### Modal with Form

```tsx
import { useState } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TextField,
  TextArea,
  Input,
  Label,
} from '@heroui/react';

function EditProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // Save logic
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger>
        <Button>Edit Profile</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <TextField name="displayName">
            <Label>Display Name</Label>
            <Input />
          </TextField>
          <TextField name="bio">
            <Label>Bio</Label>
            <TextArea />
          </TextField>
        </ModalBody>
        <ModalFooter>
          <Button variant="tertiary" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onPress={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

### Confirmation Dialog

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@heroui/react';

function DeleteConfirmation({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="danger">Delete Item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Delete Item</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete this item? This action cannot be undone.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="tertiary" slot="cancel">
            Cancel
          </Button>
          <Button variant="danger" onPress={onDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Tabs with Content

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@heroui/react';

function SettingsTabs() {
  return (
    <Tabs defaultSelectedKey="general">
      <TabList aria-label="Settings">
        <Tab id="general">General</Tab>
        <Tab id="security">Security</Tab>
        <Tab id="notifications">Notifications</Tab>
      </TabList>
      <TabPanel id="general">
        {/* General settings content */}
      </TabPanel>
      <TabPanel id="security">
        {/* Security settings content */}
      </TabPanel>
      <TabPanel id="notifications">
        {/* Notification settings content */}
      </TabPanel>
    </Tabs>
  );
}
```

### Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionIndicator,
  AccordionPanel,
  AccordionBody,
} from '@heroui/react';

function FAQ() {
  return (
    <Accordion>
      <AccordionItem id="1">
        <AccordionHeading>
          <AccordionTrigger>
            What is HeroUI?
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            HeroUI is a React component library built on Tailwind CSS v4 and React Aria.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem id="2">
        <AccordionHeading>
          <AccordionTrigger>
            Is HeroUI accessible?
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            Yes! HeroUI is built on React Aria and follows WCAG 2.1 AA guidelines.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
```

---

## Error Handling Patterns

### Form Field Errors

```tsx
<TextField
  name="email"
  isInvalid={!!errors.email}
  validationBehavior="aria"
>
  <Label>Email</Label>
  <Input />
  <FieldError>{errors.email}</FieldError>
</TextField>
```

### Server-Side Validation

```tsx
import { useState } from 'react';
import { Form, TextField, Input, Label, FieldError, Button } from '@heroui/react';

function RegistrationForm() {
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      await registerUser(Object.fromEntries(formData));
    } catch (err) {
      const error = err as { validationErrors?: Record<string, string> };
      if (error.validationErrors) {
        setServerErrors(error.validationErrors);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} validationErrors={serverErrors}>
      {/* Form fields */}
    </Form>
  );
}
```

### Alert for Global Errors

```tsx
import { useState } from 'react';
import { Alert, Form } from '@heroui/react';

function FormWithAlert() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Form fields */}
      </Form>
    </div>
  );
}
```

---

## Loading State Patterns

### Skeleton Placeholders

```tsx
import { Skeleton, Card } from '@heroui/react';

function UserCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center gap-4 p-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </Card>
  );
}
```

### Button Loading State

```tsx
import { Button, Spinner } from '@heroui/react';

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      variant="primary"
      isPending={isPending}
    >
      {isPending ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Saving...
        </>
      ) : (
        'Save'
      )}
    </Button>
  );
}
```

### Full-Page Loading

```tsx
import { Spinner } from '@heroui/react';

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
```

---

## Responsive Patterns

### Using Tailwind Utilities

```tsx
<Button className="text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6">
  Responsive Button
</Button>
```

### Mobile-First Layout

```tsx
import { Form, TextField, Input, Label } from '@heroui/react';

function ResponsiveForm() {
  return (
    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextField name="firstName" className="col-span-1">
        <Label>First Name</Label>
        <Input />
      </TextField>
      <TextField name="lastName" className="col-span-1">
        <Label>Last Name</Label>
        <Input />
      </TextField>
      <TextField name="email" className="col-span-1 md:col-span-2">
        <Label>Email</Label>
        <Input type="email" />
      </TextField>
    </Form>
  );
}
```

---

## Extending with Tailwind Variants

```tsx
import { Button, buttonVariants } from '@heroui/react';
import { tv } from 'tailwind-variants';

const customButtonVariants = tv({
  extend: buttonVariants,
  variants: {
    variant: {
      'custom-primary': 'bg-[var(--accent)] text-[var(--accent-foreground)]',
      'custom-secondary': 'border-2 border-[var(--accent)] text-[var(--accent)]',
    }
  }
});

function CustomButton({ variant, className, ...props }) {
  return <Button className={customButtonVariants({ variant, className })} {...props} />;
}

// Usage
<CustomButton variant="custom-primary">Action</CustomButton>
```

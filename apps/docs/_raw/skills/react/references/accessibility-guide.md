# HeroUI v3 Accessibility

HeroUI v3 is built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/), providing WCAG 2.1 AA accessibility out of the box. Just by using HeroUI components, your UI gets:

- **Keyboard navigation** - Full support for all interactive elements
- **ARIA attributes** - Automatic roles, labels, and relationships
- **Focus management** - Logical focus order, trapping in modals, restoration on close
- **Screen reader support** - Meaningful announcements and live regions

---

## Key Practices

### Always Provide Labels

```tsx
// Form fields need labels
<TextField>
  <Label>Email</Label>
  <Input />
</TextField>

// Icon-only buttons need aria-label
<Button aria-label="Close" isIconOnly>
  <CloseIcon />
</Button>

// TabList benefits from aria-label
<TabList aria-label="Settings">
  <Tab id="general">General</Tab>
</TabList>
```

### Use Compound Components Correctly

HeroUI's compound components automatically wire up ARIA relationships:

```tsx
// FieldError automatically sets aria-invalid and aria-describedby
<TextField isInvalid>
  <Label>Email</Label>
  <Input />
  <FieldError>Please enter a valid email</FieldError>
</TextField>

// Description automatically sets aria-describedby
<TextField>
  <Label>Password</Label>
  <Input type="password" />
  <Description>At least 8 characters</Description>
</TextField>
```

### Don't Rely on Color Alone

```tsx
// Good: Error indicated by isInvalid + FieldError text
<TextField isInvalid={hasError}>
  <Label>Email</Label>
  <Input />
  <FieldError>Invalid email address</FieldError>
</TextField>
```

---

## Learn More

- [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
- [HeroUI Design Principles](https://v3.heroui.com/docs/react/getting-started/design-principles.mdx)

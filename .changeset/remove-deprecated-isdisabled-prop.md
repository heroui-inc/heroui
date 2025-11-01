---
"@heroui/listbox": patch
"@heroui/autocomplete": patch
---

fix(listbox): remove deprecated isDisabled prop from ListboxItem

Remove deprecated `isDisabled` and `isSelected` props from `AriaOptionProps` inheritance in `ListboxItemBaseProps`. These props were deprecated in react-aria and should not be used on individual items.

Users should use the `disabledKeys` prop on the parent Listbox/Autocomplete component instead:

```jsx
// ❌ Before (deprecated)
<Autocomplete>
  <AutocompleteItem isDisabled>Item</AutocompleteItem>
</Autocomplete>

// ✅ After (correct)
<Autocomplete disabledKeys={["item-key"]}>
  <AutocompleteItem key="item-key">Item</AutocompleteItem>
</Autocomplete>
```

Fixes #5863

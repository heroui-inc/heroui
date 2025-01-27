---
"@heroui/calendar": major
---

### Changes
- Added support for customizing calendar cells.
  - You can now use `children` to customize the content of calendar cells.
  - The default structure of calendar cells has been updated to improve flexibility.

```jsx
<Calendar>
  {(date) => (
    <div style={{ backgroundColor: "lightblue" }}>
      <span>{date.day}</span>
    </div>
  )}
</Calendar>
```
import {Input, Label, TextField} from "@heroui/react";

const fieldClass =
  "rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-foreground/15 dark:ring-white/10";

export function CustomStyles() {
  return (
    <TextField className="w-full max-w-64 gap-1.5" name="email" type="email">
      <Label className="font-medium text-foreground">Email</Label>
      <Input
        className={`text-sm text-foreground placeholder:text-muted ${fieldClass}`}
        placeholder="you@email.com"
      />
    </TextField>
  );
}

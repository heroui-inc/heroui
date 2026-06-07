import {Input, Label} from "@heroui/react";

export function Types() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="input-type-email">Email</Label>
        <Input id="input-type-email" placeholder="jane@example.com" type="email" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="input-type-number">Age</Label>
        <Input id="input-type-number" min={0} placeholder="30" type="number" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="input-type-password">Password</Label>
        <Input id="input-type-password" placeholder="••••••••" type="password" />
      </div>
    </div>
  );
}

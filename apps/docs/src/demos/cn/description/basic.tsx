import {Description, Input, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">邮箱</Label>
      <Input
        aria-describedby="email-description"
        className="w-64"
        id="email"
        placeholder="you@example.com"
        type="email"
      />
      <Description id="email-description">我们不会将你的邮箱分享给任何人。</Description>
    </div>
  );
}

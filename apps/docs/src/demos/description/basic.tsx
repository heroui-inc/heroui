"use client";

import {Description, Input, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">Email</Label>
      <Input
        aria-describedby="email-description"
        className="w-64"
        id="email"
        placeholder="you@example.com"
        type="email"
      />
      <Description id="email-description">
        We'll never share your email with anyone else.
      </Description>
    </div>
  );
}

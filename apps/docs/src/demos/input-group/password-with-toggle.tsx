"use client";

import {Button, InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function PasswordWithToggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
          value={isVisible ? "87$2h.3diua" : "••••••••"}
        />
        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            <Icon className="size-4" icon={isVisible ? "gravity-ui:eye" : "gravity-ui:eye-slash"} />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}

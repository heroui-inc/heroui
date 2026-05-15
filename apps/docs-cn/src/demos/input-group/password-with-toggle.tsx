"use client";

import {Eye, EyeSlash} from "@gravity-ui/icons";
import {Button, InputGroup, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function PasswordWithToggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField className="w-full max-w-[280px]" name="password">
      <Label>密码</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
          value={isVisible ? "87$2h.3diua" : "••••••••"}
        />
        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "隐藏密码" : "显示密码"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}

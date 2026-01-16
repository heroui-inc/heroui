"use client";

import {Kbd, Label, Tooltip} from "@heroui/react";
import {useTheme} from "next-themes";

import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";
import {useKeyPress} from "@/hooks/use-key-press";

export function SwitchMode({label}: {label?: string}) {
  const {setTheme, theme} = useTheme();

  const handleModeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useKeyPress("s", handleModeSwitch);

  return (
    <div className="flex flex-col gap-1">
      {label ? <Label>{label}</Label> : null}
      <Tooltip>
        <Tooltip.Trigger>
          <ThemeToggle className="h-9" mode="light-dark" />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>
            Switch mode{" "}
            <Kbd>
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

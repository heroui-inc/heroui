import type {ThemeVariables} from "@/stores/theme-builder";

import {Lock, LockOpen} from "@gravity-ui/icons";
import {Label, cn} from "@heroui/react";
import {useState} from "react";

import {useThemeBuilder} from "@/stores/theme-builder";

interface ThemeBuilderLabelProps {
  label: string;
  variable: keyof ThemeVariables;
}

export function ThemeBuilderLabel({label, variable}: ThemeBuilderLabelProps) {
  const [isLabelHovered, setLabelHovered] = useState(false);
  const lockedVariables = useThemeBuilder((state) => state.lockedVariables);
  const toggleVariableLock = useThemeBuilder((state) => state.toggleVariableLock);
  const isLocked = lockedVariables[variable];

  const handleToggleLock = () => {
    toggleVariableLock(variable);
  };

  return (
    <div
      className="flex h-6 items-center gap-1"
      onMouseEnter={() => setLabelHovered(true)}
      onMouseLeave={() => setLabelHovered(false)}
    >
      <Label>{label}</Label>
      <div
        className={cn(
          "button button--icon-only button--ghost hidden size-6 rounded-full hover:flex",
          isLabelHovered && "flex",
          isLocked && "flex",
        )}
        onClick={handleToggleLock}
      >
        {isLocked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
      </div>
    </div>
  );
}

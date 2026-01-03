"use client";

import type {ThemeVariables} from "../constants";

import {Lock, LockOpen} from "@gravity-ui/icons";
import {Label, cn} from "@heroui/react";
import {useState} from "react";

import {useToggleLockedVariable} from "../hooks/use-toggle-locked-variable";

interface LockableLabelProps {
  label: string;
  variable: keyof ThemeVariables;
}

export function LockableLabel({label, variable}: LockableLabelProps) {
  const [isLabelHovered, setLabelHovered] = useState(false);
  const {isLocked, toggleLockedVariable} = useToggleLockedVariable(variable);

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
        onClick={toggleLockedVariable}
      >
        {isLocked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
      </div>
    </div>
  );
}

"use client";

import type {ThemeVariables} from "../constants";

import {CircleInfo, Lock, LockOpen} from "@gravity-ui/icons";
import {Label, Tooltip, cn} from "@heroui/react";
import {useState} from "react";

import {useToggleLockedVariable} from "../hooks/use-toggle-locked-variable";

interface LockableLabelProps {
  label: string;
  variable: keyof ThemeVariables;
  tooltip?: string;
}

export function LockableLabel({label, tooltip, variable}: LockableLabelProps) {
  const [isLabelHovered, setLabelHovered] = useState(false);
  const {isLocked, toggleLockedVariable} = useToggleLockedVariable(variable);

  return (
    <div
      className="flex h-6 items-center gap-1"
      onMouseEnter={() => setLabelHovered(true)}
      onMouseLeave={() => setLabelHovered(false)}
    >
      <Label>{label}</Label>
      {tooltip ? (
        <Tooltip closeDelay={0} delay={100}>
          <Tooltip.Trigger className="hidden xl:block">
            <CircleInfo className="size-4 text-muted" />
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            <p>{tooltip}</p>
          </Tooltip.Content>
        </Tooltip>
      ) : null}
      <Tooltip closeDelay={0} delay={100}>
        <Tooltip.Trigger>
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
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <p>{isLocked ? "Unlock" : "Lock"} value</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

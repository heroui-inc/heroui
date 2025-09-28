"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomStyles() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-[27px] bg-white shadow-sm ${isSelected ? "translate-x-5 shadow-lg" : ""}`}
            >
              <Switch.Icon>
                <Icon
                  className={`size-4 ${isSelected ? "text-cyan-600" : "text-blue-600"}`}
                  icon={isSelected ? "gravity-ui:check" : "gravity-ui:power"}
                />
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  );
}

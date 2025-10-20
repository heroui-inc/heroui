"use client";

import {Switch, SwitchControl, SwitchIcon, SwitchThumb} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomStyles() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <SwitchControl
            className={`h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <SwitchThumb
              className={`size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
            >
              <SwitchIcon>
                <Icon
                  className={`size-4 ${isSelected ? "text-cyan-600" : "text-blue-600"}`}
                  icon={isSelected ? "gravity-ui:check" : "gravity-ui:power"}
                />
              </SwitchIcon>
            </SwitchThumb>
          </SwitchControl>
        </>
      )}
    </Switch>
  );
}

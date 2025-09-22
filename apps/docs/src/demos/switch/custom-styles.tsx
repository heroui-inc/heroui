"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomStyles() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className="h-[31px] w-[51px] bg-blue-500 transition-all duration-300 data-[selected=true]:bg-cyan-500 data-[selected=true]:shadow-[0_0_12px_rgba(6,182,212,0.5)]"
            data-selected={isSelected}
          >
            <Switch.Thumb
              className="size-[27px] bg-white shadow-sm transition-all duration-300 data-[selected=true]:translate-x-5 data-[selected=true]:shadow-lg"
              data-selected={isSelected}
            >
              <Switch.Icon>
                <Icon
                  className={`size-4 transition-colors ${isSelected ? "text-cyan-600" : "text-blue-600"}`}
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

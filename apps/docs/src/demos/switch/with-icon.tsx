"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcon() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`bg-danger h-[32px] w-[54px] border-transparent ${isSelected ? "bg-success" : ""}`}
          >
            <Switch.Thumb className={`size-7 bg-white ${isSelected ? "translate-x-[23px]" : ""}`}>
              <Switch.Icon>
                <Icon
                  className={`size-4 transition-colors ${isSelected ? "text-success" : "text-danger"}`}
                  icon={isSelected ? "gravity-ui:lock-open" : "gravity-ui:lock"}
                />
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  );
}

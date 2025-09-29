"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcon() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className={`bg-danger h-[31px] w-[51px] border-transparent ${isSelected ? "bg-success" : ""}`}
          >
            <Switch.Thumb className={`size-[27px] bg-white ${isSelected ? "translate-x-5" : ""}`}>
              <Switch.Icon>
                <Icon
                  className={`size-4 ${isSelected ? "text-success" : "text-danger"}`}
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

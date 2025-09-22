"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcon() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className="bg-danger data-[selected=true]:bg-success h-[32px] w-[55px]"
            data-selected={isSelected}
          >
            <Switch.Thumb
              className="size-7 bg-white data-[selected=true]:translate-x-[23px]"
              data-selected={isSelected}
            >
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

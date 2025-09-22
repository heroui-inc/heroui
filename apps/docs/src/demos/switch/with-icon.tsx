"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcon() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control
            className="h-8 w-14 bg-red-200 data-[selected=true]:bg-green-200"
            data-selected={isSelected}
          >
            <Switch.Thumb
              className="size-7 bg-white data-[selected=true]:translate-x-6"
              data-selected={isSelected}
            >
              <Switch.Icon>
                <Icon
                  className={`size-4 transition-colors ${isSelected ? "text-green-700" : "text-red-700"}`}
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

"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcons() {
  const icons = {
    check: {
      off: "gravity-ui:power",
      on: "gravity-ui:check",
      selectedControlClass: "bg-green-500/80",
    },
    darkMode: {
      off: "gravity-ui:moon",
      on: "gravity-ui:sun",
      selectedControlClass: "",
    },
    microphone: {
      off: "gravity-ui:microphone",
      on: "gravity-ui:microphone-slash",
      selectedControlClass: "bg-red-500/80",
    },
    notification: {
      off: "gravity-ui:bell-slash",
      on: "gravity-ui:bell-fill",
      selectedControlClass: "bg-purple-500/80",
    },
    volume: {
      off: "gravity-ui:volume-fill",
      on: "gravity-ui:volume-slash-fill",
      selectedControlClass: "bg-blue-500/80",
    },
  };

  return (
    <div className="flex gap-3">
      {Object.entries(icons).map(([key, value]) => (
        <Switch key={key} defaultSelected size="lg">
          {({isSelected}) => (
            <>
              <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                <Switch.Thumb>
                  <Switch.Icon>
                    <Icon
                      className={`${isSelected ? "opacity-100" : "opacity-70"} size-3 text-inherit`}
                      icon={isSelected ? value.on : value.off}
                    />
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </>
          )}
        </Switch>
      ))}
    </div>
  );
}

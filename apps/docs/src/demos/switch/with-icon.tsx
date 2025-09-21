"use client";

import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcon() {
  return (
    <Switch>
      {({isSelected}) => (
        <>
          <Switch.Control>
            <Switch.Thumb>
              <Switch.Icon>
                <Icon icon="gravity-ui:circle-dashed" />
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
          <Switch.Label>{isSelected ? "Enabled" : "Disabled"}</Switch.Label>
        </>
      )}
    </Switch>
  );
}

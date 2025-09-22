"use client";

import {Label, Switch} from "@heroui/react";
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
          <Label>{isSelected ? "Enabled" : "Disabled"}</Label>
        </>
      )}
    </Switch>
  );
}

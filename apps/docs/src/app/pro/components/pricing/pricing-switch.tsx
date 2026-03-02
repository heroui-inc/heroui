"use client";

import {Switch} from "@heroui/react";

export function PricingSwitch({
  isAnnual,
  onChange,
}: {
  isAnnual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted"}`}>
        Perpetual
      </span>
      <Switch
        aria-label="Toggle annual pricing"
        isSelected={isAnnual}
        size="sm"
        onChange={onChange}
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
      <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted"}`}>
        Annual
      </span>
    </div>
  );
}

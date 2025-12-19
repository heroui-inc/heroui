import {CircleDashed} from "@gravity-ui/icons";
import {Chip, Separator} from "@heroui/react";
import React from "react";

export function ChipVariants() {
  const sizes = ["lg", "md", "sm"] as const;
  const variants = ["primary", "secondary", "tertiary", "soft"] as const;
  const colors = ["accent", "default", "success", "warning", "danger"] as const;

  return (
    <div className="flex flex-col gap-8 overflow-x-auto">
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted capitalize">{size}</h3>
            {/* Color labels header */}
            <div className="flex items-center gap-3">
              <div className="w-24 shrink-0" />
              {colors.map((color) => (
                <div
                  key={color}
                  className="flex shrink-0 items-center justify-center"
                  style={{width: "130px"}}
                >
                  <span className="text-xs text-muted capitalize">{color}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {variants.map((variant) => (
                <div key={variant} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-sm text-muted capitalize">{variant}</div>
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="flex shrink-0 items-center justify-center"
                      style={{width: "130px"}}
                    >
                      <Chip color={color} size={size} variant={variant}>
                        <CircleDashed />
                        Label <CircleDashed />
                      </Chip>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {index < sizes.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}

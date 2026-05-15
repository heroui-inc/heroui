import {CircleDashed} from "@gravity-ui/icons";
import {Chip, Separator} from "@heroui/react";
import React from "react";

const sizes = ["lg", "md", "sm"] as const;

const SIZE_LABELS: Record<(typeof sizes)[number], string> = {
  lg: "大",
  md: "中",
  sm: "小",
};

const variants = ["primary", "secondary", "tertiary", "soft"] as const;

const VARIANT_LABELS: Record<(typeof variants)[number], string> = {
  primary: "主要",
  secondary: "次要",
  soft: "柔和",
  tertiary: "第三",
};

const colors = ["accent", "default", "success", "warning", "danger"] as const;

const COLOR_LABELS: Record<(typeof colors)[number], string> = {
  accent: "强调",
  danger: "危险",
  default: "默认",
  success: "成功",
  warning: "警告",
};

export function ChipVariants() {
  return (
    <div className="flex flex-col gap-8 overflow-x-auto">
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted">{SIZE_LABELS[size]}</h3>
            <div className="flex items-center gap-3">
              <div className="w-24 shrink-0" />
              {colors.map((color) => (
                <div
                  key={color}
                  className="flex shrink-0 items-center justify-center"
                  style={{width: "130px"}}
                >
                  <span className="text-xs text-muted">{COLOR_LABELS[color]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {variants.map((variant) => (
                <div key={variant} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-sm text-muted">{VARIANT_LABELS[variant]}</div>
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="flex shrink-0 items-center justify-center"
                      style={{width: "130px"}}
                    >
                      <Chip color={color} size={size} variant={variant}>
                        <CircleDashed />
                        <Chip.Label>标签</Chip.Label>
                        <CircleDashed />
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

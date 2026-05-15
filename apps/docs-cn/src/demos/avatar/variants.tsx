import {Person} from "@gravity-ui/icons";
import {Avatar, Separator} from "@heroui/react";

const colors = ["accent", "default", "success", "warning", "danger"] as const;

const COLOR_LABELS: Record<(typeof colors)[number], string> = {
  accent: "强调",
  danger: "危险",
  default: "默认",
  success: "成功",
  warning: "警告",
};

const variants = [
  {content: "AG", label: "字母", type: "letter"},
  {content: "AG", label: "柔和字母", type: "letter-soft"},
  {content: <Person />, label: "图标", type: "icon"},
  {content: <Person />, label: "柔和图标", type: "icon-soft"},
  {
    content: [
      "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
      "https://img.heroui.chat/image/avatar?w=400&h=400&u=4",
      "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
      "https://img.heroui.chat/image/avatar?w=400&h=400&u=8",
      "https://img.heroui.chat/image/avatar?w=400&h=400&u=16",
    ],
    label: "图片",
    type: "img",
  },
] as const;

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      {/* 颜色列标题 */}
      <div className="flex items-center gap-3">
        <div className="w-24 shrink-0" />
        {colors.map((color) => (
          <div key={color} className="flex w-20 shrink-0 items-center justify-center">
            <span className="text-xs text-muted">{COLOR_LABELS[color]}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* 变体行 */}
      {variants.map((variant) => (
        <div key={variant.label} className="flex items-center gap-3">
          <div className="w-24 shrink-0 text-sm text-muted">{variant.label}</div>
          {colors.map((color, colorIndex) => (
            <div key={color} className="flex w-20 shrink-0 items-center justify-center">
              <Avatar color={color} variant={variant.type.includes("soft") ? "soft" : undefined}>
                {variant.type === "img" ? (
                  <>
                    <Avatar.Image
                      alt={`${COLOR_LABELS[color]} 头像`}
                      src={Array.isArray(variant.content) ? variant.content[colorIndex] : ""}
                    />
                    <Avatar.Fallback>{COLOR_LABELS[color].charAt(0)}</Avatar.Fallback>
                  </>
                ) : (
                  <Avatar.Fallback>{variant.content}</Avatar.Fallback>
                )}
              </Avatar>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import {Person} from "@gravity-ui/icons";
import {Avatar, Separator} from "@heroui/react";

export function Variants() {
  const colors = ["accent", "default", "success", "warning", "danger"] as const;
  const variants = [
    {content: "AG", label: "letter", type: "letter"},
    {content: "AG", label: "letter soft", type: "letter-soft"},
    {content: <Person />, label: "icon", type: "icon"},
    {content: <Person />, label: "icon soft", type: "icon-soft"},
    {
      content: [
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=4",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=8",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=16",
      ],
      label: "img",
      type: "img",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      {/* Color labels header */}
      <div className="flex items-center gap-3">
        <div className="w-24 shrink-0" />
        {colors.map((color) => (
          <div key={color} className="flex w-20 shrink-0 items-center justify-center">
            <span className="text-xs text-muted capitalize">{color}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Variant rows */}
      {variants.map((variant) => (
        <div key={variant.label} className="flex items-center gap-3">
          <div className="w-24 shrink-0 text-sm text-muted">{variant.label}</div>
          {colors.map((color, colorIndex) => (
            <div key={color} className="flex w-20 shrink-0 items-center justify-center">
              <Avatar color={color} variant={variant.type.includes("soft") ? "soft" : undefined}>
                {variant.type === "img" ? (
                  <>
                    <Avatar.Image
                      alt={`Avatar ${color}`}
                      src={Array.isArray(variant.content) ? variant.content[colorIndex] : ""}
                    />
                    <Avatar.Fallback>{color.charAt(0).toUpperCase()}</Avatar.Fallback>
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

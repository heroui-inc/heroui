import {Avatar, Badge, Separator} from "@heroui/react";
import React from "react";

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

export function BadgeVariants() {
  const variants = ["primary", "secondary", "soft"] as const;
  const colors = ["accent", "default", "success", "warning", "danger"] as const;

  return (
    <div className="flex flex-col gap-8">
      {variants.map((variant, index) => (
        <React.Fragment key={variant}>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted capitalize">{variant}</h3>
            <div className="flex items-center gap-6">
              {colors.map((color) => (
                <Badge.Anchor key={color}>
                  <Avatar>
                    <Avatar.Image src={AVATAR_URL} />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar>
                  <Badge color={color} size="sm" variant={variant}>
                    5
                  </Badge>
                </Badge.Anchor>
              ))}
            </div>
          </div>
          {index < variants.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}

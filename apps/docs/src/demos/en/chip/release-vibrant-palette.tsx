import {Chip, Separator} from "@heroui/react";

const variants = ["primary", "secondary", "tertiary", "soft"] as const;
const colors = ["accent", "default", "success", "warning", "danger"] as const;

function ChipMatrix({isVibrant, title}: {isVibrant?: boolean; title: string}) {
  return (
    <div className="flex flex-col gap-4" data-vibrant-palette={isVibrant ? "true" : undefined}>
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
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
                <Chip color={color} size="md" variant={variant}>
                  <Chip.Label className="capitalize">{color}</Chip.Label>
                </Chip>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChipVibrantPalette() {
  return (
    <div className="flex w-full flex-col gap-8 overflow-x-auto">
      <ChipMatrix title="Default palette" />
      <Separator />
      <ChipMatrix isVibrant title="Vibrant palette" />
    </div>
  );
}

"use client";

import {ChevronDown, Display, Moon, Palette, Sun} from "@gravity-ui/icons";
import {
  Button,
  Description,
  Label,
  ListBox,
  Popover,
  Separator,
  Switch,
  Tooltip,
  buttonVariants,
} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import Image from "next/image";
import {useTheme} from "next-themes";
import {useState} from "react";

import {DESIGN_THEMES, useDesignTheme} from "@/hooks/use-design-theme";
import {useDictionary} from "@/hooks/use-dictionary";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {cn} from "@/utils/cn";

const MODES = ["dark", "light", "system"] as const;

type Mode = (typeof MODES)[number];

const MODE_ICONS = {dark: Moon, light: Sun, system: Display} satisfies Record<Mode, unknown>;

const MODE_LABELS: Record<Mode, string> = {dark: "Dark", light: "Light", system: "System"};

// Before mount, `data-color-mode` (set by `DesignThemeScript` before paint) picks the icon.
const PRE_MOUNT_ICON_CLASSES: Record<Mode, string> = {
  dark: "hidden in-data-[color-mode=dark]:block",
  light: "hidden in-data-[color-mode=light]:block",
  system: "in-data-[color-mode=dark]:hidden in-data-[color-mode=light]:hidden",
};

function isMode(value: string | undefined): value is Mode {
  return MODES.includes(value as Mode);
}

/** One click cycles dark → light → system. */
function ModeToggle() {
  const {setTheme, theme} = useTheme();
  const mounted = useIsMounted();
  const mode: Mode = mounted && isMode(theme) ? theme : "system";
  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length]!;
  const Icon = MODE_ICONS[mode];

  return (
    <Tooltip delay={300}>
      <Tooltip.Trigger role="presentation" tabIndex={-1}>
        <Button
          isIconOnly
          aria-label={`${MODE_LABELS[mode]} mode. Switch to ${MODE_LABELS[next].toLowerCase()} mode`}
          className="docs-pill-segment h-7 w-[30px] min-w-0"
          size="sm"
          variant="ghost"
          onPress={() => setTheme(next)}
        >
          {mounted ? (
            <Icon className="size-3.5" />
          ) : (
            MODES.map((key) => {
              const ModeIcon = MODE_ICONS[key];

              return <ModeIcon key={key} className={cn("size-3.5", PRE_MOUNT_ICON_CLASSES[key])} />;
            })
          )}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="bottom">{MODE_LABELS[mode]}</Tooltip.Content>
    </Tooltip>
  );
}

function ThemePicker() {
  const dict = useDictionary().themes;
  const {active, builderHref, current, selectTheme, setVibrantPalette, vibrant} = useDesignTheme();
  const mounted = useIsMounted();
  const [open, setOpen] = useState(false);

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button
          aria-label={dict.designTheme}
          className="docs-pill-segment h-7 min-w-0 gap-1 px-2 data-[open=true]:bg-(--docs-control-open)"
          data-open={open}
          size="sm"
          variant="ghost"
        >
          <span
            aria-hidden
            className="relative size-4 shrink-0 overflow-hidden rounded-full bg-(--docs-track)"
          >
            {mounted ? (
              <Image
                alt=""
                className="size-full object-cover"
                height={16}
                placeholder="blur"
                src={current.image}
                width={16}
              />
            ) : null}
          </span>
          <ChevronDown
            className={cn("size-3 transition-transform duration-150", open && "rotate-180")}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        className="w-[280px] rounded-3xl bg-(--docs-popover)"
        offset={8}
        placement="bottom end"
      >
        <Popover.Dialog className="flex flex-col gap-4 px-4 pt-5 pb-4">
          <ListBox
            aria-label={dict.designTheme}
            // `overflow-visible`: the list box clips by default, which cut off the selected ring.
            className="grid grid-cols-4 gap-x-0 gap-y-4 overflow-visible p-0"
            items={DESIGN_THEMES}
            layout="grid"
            selectedKeys={new Set([active])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              if (keys === "all") return;
              const selected = [...keys][0];

              if (typeof selected === "string") selectTheme(selected);
            }}
          >
            {(item) => (
              <ListBox.Item
                key={item.id}
                id={item.id}
                textValue={item.label}
                className={cn(
                  // `m-0`: list items after the first get a top margin, which offsets grid rows.
                  "group m-0 flex h-auto min-h-0 flex-col items-center gap-2 rounded-xl p-0",
                  "hover:bg-transparent data-[hovered=true]:bg-transparent data-[selected=true]:bg-transparent",
                )}
              >
                <Image
                  alt=""
                  height={40}
                  placeholder="blur"
                  src={item.image}
                  width={40}
                  className={cn(
                    "size-10 shrink-0 rounded-full bg-(--docs-track) transition-shadow",
                    "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-(--docs-popover)",
                  )}
                />
                <span className="text-xs leading-4 font-medium text-(--docs-fg-muted) group-data-[selected=true]:text-foreground">
                  {item.label}
                </span>
              </ListBox.Item>
            )}
          </ListBox>
          <Separator className="bg-(--docs-divider)" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <Label className="text-[13px]">{dict.vibrantPalette}</Label>
              <Description className="text-xs">{dict.vibrantPaletteDescription}</Description>
            </div>
            <Switch isSelected={vibrant} size="sm" onChange={setVibrantPalette}>
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>
          <LinkRoot
            href={builderHref}
            className={buttonVariants({
              className:
                "h-9 rounded-full bg-(--docs-control) text-[13px] text-(--docs-fg) hover:bg-(--docs-control-hover)",
              fullWidth: true,
              size: "sm",
              variant: "tertiary",
            })}
          >
            <Palette className="size-4" />
            {dict.editTheme}
          </LinkRoot>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

/**
 * Appearance control: color mode on the left (click to cycle), design theme on
 * the right (opens the theme popover).
 */
export function AppearancePill({className}: {className?: string}) {
  return (
    <div
      className={cn("docs-pill flex h-8 items-center gap-0.5 p-0.5", className)}
      data-appearance-pill=""
    >
      <ModeToggle />
      <span aria-hidden className="h-3 w-px shrink-0 bg-(--docs-divider)" />
      <ThemePicker />
    </div>
  );
}

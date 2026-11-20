"use client";

import type {ButtonProps} from "@heroui/react";

import {BucketPaint, Palette} from "@gravity-ui/icons";
import {Button, Description, Label, ListBox, Popover, Switch, buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import Image from "next/image";
import {useCallback, useEffect, useState} from "react";

import {DESIGN_THEMES as THEMES, useDesignTheme} from "@/hooks/use-design-theme";
import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

export function DesignThemeSelector({
  triggerVariant = "tertiary",
}: {
  triggerVariant?: ButtonProps["variant"];
}) {
  const dict = useDictionary().themes;
  const {
    active,
    builderHref: themeBuilderHref,
    current,
    selectTheme,
    setVibrantPalette,
    vibrant,
  } = useDesignTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const handleSelect = useCallback(
    (keys: "all" | Set<React.Key>) => {
      if (keys === "all") return;
      const selected = [...keys][0];

      if (typeof selected === "string") selectTheme(selected);
    },
    [selectTheme],
  );

  const showAvatar = mounted && active !== "default";

  return (
    <>
      {/* Preload all theme images so they're cached before the popover opens */}
      <div aria-hidden className="pointer-events-none fixed size-0 overflow-hidden opacity-0">
        {THEMES.map((t) => (
          <Image
            key={t.id}
            priority
            alt=""
            height={36}
            placeholder="blur"
            src={t.image}
            width={36}
          />
        ))}
      </div>
      <Popover>
        <Popover.Trigger>
          <Button
            aria-label={dict.designTheme}
            size="sm"
            variant={triggerVariant}
            className={cn(
              "text-xs text-muted",
              showAvatar &&
                "max-sm:min-w-0 max-sm:border-0 max-sm:bg-transparent max-sm:px-0 sm:gap-1.5 sm:ps-2 sm:pe-2.5",
            )}
          >
            {showAvatar ? (
              <Image
                alt={current.label}
                className="size-5 shrink-0 rounded-full sm:size-3.5"
                height={20}
                placeholder="blur"
                src={current.image}
                width={20}
              />
            ) : (
              <BucketPaint className="size-3.5 text-foreground" />
            )}
            <span className="hidden sm:inline">{showAvatar ? current.label : dict.theme}</span>
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-[248px] rounded-3xl" placement="bottom">
          <Popover.Dialog className="p-4">
            <ListBox
              aria-label={dict.designTheme}
              className="grid grid-cols-4 gap-3"
              items={THEMES}
              layout="grid"
              selectedKeys={new Set([active])}
              selectionMode="single"
              onSelectionChange={handleSelect}
            >
              {(item) => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
                  className={cn(
                    "group relative flex w-10 flex-col items-center justify-center gap-1.5 p-0",
                    "hover:bg-transparent data-[hovered=true]:bg-transparent",
                  )}
                >
                  <Image
                    alt={item.label}
                    height={36}
                    placeholder="blur"
                    src={item.image}
                    width={36}
                    className={cn(
                      "size-9 rounded-full bg-surface",
                      "group-data-[selected=true]:ring-2 group-data-[selected=true]:ring-accent group-data-[selected=true]:ring-offset-2 group-data-[selected=true]:ring-offset-surface",
                    )}
                  />
                  <span className="text-[10px] font-medium text-muted capitalize group-data-[selected=true]:text-foreground">
                    {item.label}
                  </span>
                </ListBox.Item>
              )}
            </ListBox>
            <div className="mt-4 border-t border-separator pt-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label className="text-xs">{dict.vibrantPalette}</Label>
                  <Description className="text-[10px]">
                    {dict.vibrantPaletteDescription}
                  </Description>
                </div>
                <Switch isSelected={vibrant} onChange={setVibrantPalette}>
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              </div>
            </div>
            <LinkRoot
              href={themeBuilderHref}
              className={buttonVariants({
                className: "mt-3 rounded-full text-[13px] text-muted",
                fullWidth: true,
                size: "sm",
                variant: "outline",
              })}
            >
              <Palette className="size-4" />
              {dict.editTheme}
            </LinkRoot>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </>
  );
}

"use client";

import type {ComponentProps} from "react";

import {Button} from "@heroui/react";
import {Popover, PopoverContent, PopoverTrigger} from "fumadocs-ui/components/ui/popover";
import {useI18n} from "fumadocs-ui/contexts/i18n";

import {Languages} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";

export type LanguageSelectProps = ComponentProps<typeof Button>;

export function LanguageToggle(props: LanguageSelectProps): React.ReactElement {
  const context = useI18n();

  if (!context.locales) throw new Error("Missing `<I18nProvider />`");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          isIconOnly
          aria-label={context.text.chooseLanguage}
          size="sm"
          variant="tertiary"
          {...props}
        >
          {props.children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-x-hidden p-0">
        <p className="text-fd-muted-foreground mb-1 p-2 text-xs font-medium">
          {context.text.chooseLanguage}
        </p>
        {context.locales.map((item) => (
          <button
            key={item.locale}
            type="button"
            className={cn(
              "cursor-pointer p-2 text-start text-sm",
              item.locale === context.locale
                ? "bg-fd-primary/10 text-fd-primary font-medium"
                : "hover:bg-fd-accent hover:text-fd-accent-foreground",
            )}
            onClick={() => {
              context.onChange?.(item.locale);
            }}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function LanguageToggleText(props: ComponentProps<"span">) {
  const context = useI18n();
  const text = context.locales?.find((item) => item.locale === context.locale)?.name;

  return <span {...props}>{text}</span>;
}

// Adapter for use as a fumadocs `slots.languageSelect.root` slot (e.g. in HomeLayout).
// Render the same LanguageToggle component across pages
export function LanguageToggleSlot(_props: ComponentProps<"button">) {
  return (
    <LanguageToggle>
      <Languages className="text-fd-muted-foreground size-4.5" />
    </LanguageToggle>
  );
}

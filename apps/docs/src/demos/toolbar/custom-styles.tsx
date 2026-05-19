import {Bold, Copy, Italic, Scissors, Underline} from "@gravity-ui/icons";
import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@heroui/react";

export function CustomStyles() {
  return (
    <Toolbar
      aria-label="Text formatting"
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1.5 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
    >
      <ToggleButtonGroup aria-label="Text style" className="gap-0.5" selectionMode="multiple">
        <ToggleButton isIconOnly aria-label="Bold" id="bold">
          <Bold />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Italic" id="italic">
          <ToggleButtonGroup.Separator />
          <Italic />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Underline" id="underline">
          <ToggleButtonGroup.Separator />
          <Underline />
        </ToggleButton>
      </ToggleButtonGroup>
      <Separator className="mx-1 h-6 w-px bg-border" orientation="vertical" />
      <ButtonGroup className="gap-0.5" variant="tertiary">
        <Button isIconOnly aria-label="Copy">
          <Copy />
        </Button>
        <Button isIconOnly aria-label="Cut">
          <ButtonGroup.Separator />
          <Scissors />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}

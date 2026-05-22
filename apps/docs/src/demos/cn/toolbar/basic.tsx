import {Bold, Copy, Italic, Scissors, Underline} from "@gravity-ui/icons";
import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@heroui/react";

export function Basic() {
  return (
    <Toolbar aria-label="文本格式">
      <ToggleButtonGroup aria-label="文本样式" selectionMode="multiple">
        <ToggleButton isIconOnly aria-label="粗体" id="bold">
          <Bold />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="斜体" id="italic">
          <ToggleButtonGroup.Separator />
          <Italic />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="下划线" id="underline">
          <ToggleButtonGroup.Separator />
          <Underline />
        </ToggleButton>
      </ToggleButtonGroup>
      <Separator />
      <ButtonGroup variant="tertiary">
        <Button isIconOnly aria-label="复制">
          <Copy />
        </Button>
        <Button isIconOnly aria-label="剪切">
          <ButtonGroup.Separator />
          <Scissors />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}

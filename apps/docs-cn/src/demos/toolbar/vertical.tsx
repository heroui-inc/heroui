import {ArrowUturnCcwLeft, ArrowUturnCwRight, Bold, Italic, Underline} from "@gravity-ui/icons";
import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@heroui/react";

export function Vertical() {
  return (
    <Toolbar aria-label="工具" orientation="vertical">
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
        <Button isIconOnly aria-label="撤销">
          <ArrowUturnCcwLeft />
        </Button>
        <Button isIconOnly aria-label="重做">
          <ButtonGroup.Separator />
          <ArrowUturnCwRight />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}

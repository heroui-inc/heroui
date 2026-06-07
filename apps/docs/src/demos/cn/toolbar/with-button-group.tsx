import {
  ArrowUturnCcwLeft,
  ArrowUturnCwRight,
  Bold,
  Italic,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  Underline,
} from "@gravity-ui/icons";
import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@heroui/react";

export function WithButtonGroup() {
  return (
    <Toolbar aria-label="编辑器工具栏">
      <ButtonGroup variant="tertiary">
        <Button>
          <ArrowUturnCcwLeft />
          撤销
        </Button>
        <Button>
          <ButtonGroup.Separator />
          <ArrowUturnCwRight />
          重做
        </Button>
      </ButtonGroup>
      <Separator />
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
        <Button isIconOnly aria-label="左对齐">
          <TextAlignLeft />
        </Button>
        <Button isIconOnly aria-label="居中">
          <ButtonGroup.Separator />
          <TextAlignCenter />
        </Button>
        <Button isIconOnly aria-label="右对齐">
          <ButtonGroup.Separator />
          <TextAlignRight />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}

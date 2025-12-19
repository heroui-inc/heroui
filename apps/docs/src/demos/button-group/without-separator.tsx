import {Button, ButtonGroup} from "@heroui/react";

export function WithoutSeparator() {
  return (
    <ButtonGroup hideSeparator>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  );
}

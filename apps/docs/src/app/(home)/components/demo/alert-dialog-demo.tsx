import {Avatar, Button, Card, CloseButton} from "@heroui/react";

import {Iconify} from "@/components/iconify";

export function AlertDialogDemo() {
  return (
    <Card.Root className="h-[208px] w-[340px] items-start justify-center p-5">
      <Card.Header className="flex w-full items-start justify-center gap-2 px-1">
        <Avatar color="warning" variant="soft">
          <Avatar.Fallback>
            <Iconify className="text-lg" icon="gravity-ui:floppy-disk" />
          </Avatar.Fallback>
        </Avatar>
        <Card.Title>Unsaved changes</Card.Title>
        <Card.Description>Do you want to save or discard changes?</Card.Description>
        <CloseButton className="absolute right-3 top-3" />
      </Card.Header>
      <Card.Footer className="flex w-full items-center gap-2 px-0.5 pt-3">
        <Button className="w-full" variant="tertiary">
          Discard
        </Button>
        <Button className="w-full">Save changes</Button>
      </Card.Footer>
    </Card.Root>
  );
}

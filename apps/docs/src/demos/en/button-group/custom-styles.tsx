import {ChevronDown} from "@gravity-ui/icons";
import {Button, ButtonGroup, Description, Dropdown, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <ButtonGroup>
      <Button className="rounded-none bg-[#08872B] data-hovered:bg-[#0FBF3E]">
        Merge pull request
      </Button>
      <Dropdown>
        <Button
          isIconOnly
          aria-label="Merge options"
          className="rounded-none bg-[#08872B] data-hovered:bg-[#0FBF3E]"
        >
          <ButtonGroup.Separator />
          <ChevronDown className="size-4" />
        </Button>
        <Dropdown.Popover className="max-w-[290px] rounded-none" placement="bottom end">
          <Dropdown.Menu>
            <Dropdown.Item
              className="flex flex-col items-start gap-1 rounded-none"
              id="merge"
              textValue="Create a merge commit"
            >
              <Label>Create a merge commit</Label>
              <Description>
                All commits from this branch will be added to the base branch
              </Description>
            </Dropdown.Item>
            <Dropdown.Item
              className="flex flex-col items-start gap-1 rounded-none"
              id="squash-and-merge"
              textValue="Squash and merge"
            >
              <Label>Squash and merge</Label>
              <Description>
                The 14 commits from this branch will be combined into one commit in the base branch
              </Description>
            </Dropdown.Item>
            <Dropdown.Item
              className="flex flex-col items-start gap-1 rounded-none"
              id="rebase-and-merge"
              textValue="Rebase and merge"
            >
              <Label>Rebase and merge</Label>
              <Description>
                The 14 commits from this branch will be rebased and added to the base branch
              </Description>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}

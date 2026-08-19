import {ChevronDown} from "@gravity-ui/icons";
import {Button, ButtonGroup, Description, Dropdown, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <ButtonGroup>
      <Button className="rounded-none bg-[#08872B] data-hovered:bg-[#0FBF3E]">合并拉取请求</Button>
      <Dropdown>
        <Button
          isIconOnly
          aria-label="合并选项"
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
              textValue="创建合并提交"
            >
              <Label>创建合并提交</Label>
              <Description>此分支的所有提交将添加到基础分支</Description>
            </Dropdown.Item>
            <Dropdown.Item
              className="flex flex-col items-start gap-1 rounded-none"
              id="squash-and-merge"
              textValue="压缩并合并"
            >
              <Label>压缩并合并</Label>
              <Description>此分支的 14 个提交将在基础分支中合并为一个提交</Description>
            </Dropdown.Item>
            <Dropdown.Item
              className="flex flex-col items-start gap-1 rounded-none"
              id="rebase-and-merge"
              textValue="变基并合并"
            >
              <Label>变基并合并</Label>
              <Description>此分支的 14 个提交将变基后添加到基础分支</Description>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}

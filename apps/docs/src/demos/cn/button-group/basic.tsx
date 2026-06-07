import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CodeFork,
  Ellipsis,
  Picture,
  Pin,
  QrCode,
  Star,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  ThumbsDown,
  ThumbsUp,
  Video,
} from "@gravity-ui/icons";
import {Button, ButtonGroup, Chip, Description, Dropdown, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* 单个按钮与下拉菜单 */}
      <div className="flex flex-col gap-2">
        <ButtonGroup>
          <Button>合并拉取请求</Button>
          <Dropdown>
            <Button isIconOnly aria-label="更多选项">
              <ButtonGroup.Separator />
              <ChevronDown />
            </Button>
            <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="merge"
                  textValue="创建合并提交"
                >
                  <Label>创建合并提交</Label>
                  <Description>此分支上的所有提交都将加入基础分支</Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="squash-and-merge"
                  textValue="压缩并合并"
                >
                  <Label>压缩并合并</Label>
                  <Description>此分支上的 14 个提交将合并为一次提交并加入基础分支</Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="rebase-and-merge"
                  textValue="变基并合并"
                >
                  <Label>变基并合并</Label>
                  <Description>此分支上的 14 个提交将变基后加入基础分支</Description>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </ButtonGroup>
      </div>

      {/* 独立按钮 */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ButtonGroup variant="tertiary">
            <Button>
              <CodeFork className="size-3.5" />
              复刻
              <Chip color="accent" size="sm" variant="soft">
                24
              </Chip>
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <ChevronDown />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button isIconOnly>
              <QrCode />
            </Button>
            <Button>
              <ButtonGroup.Separator />
              扫码支付
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <ThumbsUp />
              <span className="text-xs font-semibold">2.4K</span>
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <ThumbsDown />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Star className="size-3.5" />
              星标
            </Button>
            <Button className="px-2">
              <ButtonGroup.Separator />
              <Chip color="accent" size="sm" variant="soft">
                104
              </Chip>
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Pin />
              已置顶
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <ChevronDown />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* 上一页 / 下一页 */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <ChevronLeft />
            上一页
          </Button>
          <Button>
            <ButtonGroup.Separator />
            下一页
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </div>

      {/* 内容类型选择 */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <Picture />
            照片
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Video />
            视频
          </Button>
          <Button isIconOnly aria-label="更多选项">
            <ButtonGroup.Separator />
            <Ellipsis />
          </Button>
        </ButtonGroup>
      </div>

      {/* 文本对齐 */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>左对齐</Button>
          <Button>
            <ButtonGroup.Separator />
            居中
          </Button>
          <Button>
            <ButtonGroup.Separator />
            右对齐
          </Button>
        </ButtonGroup>
      </div>

      {/* 仅图标：对齐 */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <TextAlignLeft />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <TextAlignCenter />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <TextAlignRight />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

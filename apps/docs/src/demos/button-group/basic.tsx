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
      {/* Single button with dropdown */}
      <div className="flex flex-col gap-2">
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Dropdown>
            <Button isIconOnly aria-label="More options">
              <ChevronDown />
            </Button>
            <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="merge"
                  textValue="Create a merge commit"
                >
                  <Label>Create a merge commit</Label>
                  <Description>
                    All commits from this branch will be added to the base branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="squash-and-merge"
                  textValue="Squash and merge"
                >
                  <Label>Squash and merge</Label>
                  <Description>
                    The 14 commits from this branch will be combined into one commit in the base
                    branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
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
      </div>

      {/* Individual buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ButtonGroup variant="tertiary">
            <Button>
              <CodeFork className="size-3.5" />
              Fork
              <Chip color="accent" size="sm" variant="soft">
                24
              </Chip>
            </Button>
            <Button isIconOnly>
              <ChevronDown />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button isIconOnly>
              <QrCode />
            </Button>
            <Button>Scan to pay</Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <ThumbsUp />
              <span className="text-xs font-semibold">2.4K</span>
            </Button>
            <Button isIconOnly>
              <ThumbsDown />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Star className="size-3.5" />
              Star
            </Button>
            <Button className="px-2">
              <Chip color="accent" size="sm" variant="soft">
                104
              </Chip>
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <Pin />
              Pinned
            </Button>
            <Button isIconOnly>
              <ChevronDown />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Previous/Next Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <ChevronLeft />
            Previous
          </Button>
          <Button>
            Next
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </div>

      {/* Content Selection Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <Picture />
            Photos
          </Button>
          <Button>
            <Video />
            Videos
          </Button>
          <Button isIconOnly aria-label="More options">
            <Ellipsis />
          </Button>
        </ButtonGroup>
      </div>

      {/* Text Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>

      {/* Icon-Only Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <TextAlignLeft />
          </Button>
          <Button isIconOnly>
            <TextAlignCenter />
          </Button>
          <Button isIconOnly>
            <TextAlignRight />
          </Button>
          <Button isIconOnly>
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

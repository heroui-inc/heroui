import {Button, ButtonGroup} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">小</p>
        <ButtonGroup size="sm" variant="secondary">
          <Button>第一项</Button>
          <Button>
            <ButtonGroup.Separator />
            第二项
          </Button>
          <Button>
            <ButtonGroup.Separator />
            第三项
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">中（默认）</p>
        <ButtonGroup size="md" variant="secondary">
          <Button>第一项</Button>
          <Button>
            <ButtonGroup.Separator />
            第二项
          </Button>
          <Button>
            <ButtonGroup.Separator />
            第三项
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">大</p>
        <ButtonGroup size="lg" variant="secondary">
          <Button>第一项</Button>
          <Button>
            <ButtonGroup.Separator />
            第二项
          </Button>
          <Button>
            <ButtonGroup.Separator />
            第三项
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

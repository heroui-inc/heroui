import {Button, ButtonGroup} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">主要</p>
        <ButtonGroup variant="primary">
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">次要</p>
        <ButtonGroup variant="secondary">
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">第三</p>
        <ButtonGroup variant="tertiary">
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">线框</p>
        <ButtonGroup variant="outline">
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">幽灵</p>
        <ButtonGroup variant="ghost">
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
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">危险</p>
        <ButtonGroup variant="danger">
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

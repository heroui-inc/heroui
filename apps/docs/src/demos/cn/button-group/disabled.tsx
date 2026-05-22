import {Button, ButtonGroup} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">全部禁用</p>
        <ButtonGroup isDisabled>
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
        <p className="text-sm text-muted">组已禁用，但单个按钮可覆盖</p>
        <ButtonGroup isDisabled>
          <Button>第一项</Button>
          <Button>
            <ButtonGroup.Separator />
            第二项
          </Button>
          <Button isDisabled={false}>
            <ButtonGroup.Separator />
            第三项（可用）
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

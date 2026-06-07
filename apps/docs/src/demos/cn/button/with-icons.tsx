import {Envelope, Globe, Plus, TrashBin} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Globe />
        搜索
      </Button>
      <Button variant="secondary">
        <Plus />
        添加成员
      </Button>
      <Button variant="tertiary">
        <Envelope />
        邮件
      </Button>
      <Button variant="danger">
        <TrashBin />
        删除
      </Button>
    </div>
  );
}

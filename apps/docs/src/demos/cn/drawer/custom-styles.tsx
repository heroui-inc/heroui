import {Button, Drawer} from "@heroui/react";

export function CustomStyles() {
  return (
    <Drawer>
      <Button variant="secondary">打开筛选</Button>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="border-l border-border/80 bg-surface">
            <Drawer.Header>
              <Drawer.Heading className="text-foreground">筛选</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p className="text-sm text-muted">按状态、负责人或日期缩小结果范围。</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                取消
              </Button>
              <Button slot="close">应用</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

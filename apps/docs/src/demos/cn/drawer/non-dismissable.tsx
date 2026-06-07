import {Button, Drawer} from "@heroui/react";

export function NonDismissable() {
  return (
    <Drawer>
      <Button variant="secondary">重要操作</Button>
      <Drawer.Backdrop isDismissable={false}>
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>确认操作</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>此抽屉无法通过点击外部或拖拽关闭。你必须使用下方按钮之一来完成操作。</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                取消
              </Button>
              <Button slot="close">确认</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

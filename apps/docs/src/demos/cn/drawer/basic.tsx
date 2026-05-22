import {Button, Drawer} from "@heroui/react";

export function Basic() {
  return (
    <Drawer>
      <Button variant="secondary">打开抽屉</Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>抽屉标题</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                这是一个基于 React Aria Modal 组件构建的抽屉。它会从屏幕边缘滑入，并通过流畅的 CSS
                过渡呈现动画效果。
              </p>
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

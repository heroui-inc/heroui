import {Button, Drawer, Input, Label, TextField} from "@heroui/react";

export function WithForm() {
  return (
    <Drawer>
      <Button variant="secondary">编辑资料</Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>编辑资料</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>姓名</Label>
                  <Input placeholder="输入你的姓名" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>邮箱</Label>
                  <Input placeholder="输入你的邮箱" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="bio">
                  <Label>简介</Label>
                  <Input placeholder="介绍一下你自己" variant="secondary" />
                </TextField>
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                取消
              </Button>
              <Button slot="close">保存更改</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

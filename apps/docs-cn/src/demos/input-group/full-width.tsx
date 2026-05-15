import {Envelope, Eye} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="email">
        <Label>邮箱地址</Label>
        <InputGroup fullWidth>
          <InputGroup.Prefix>
            <Envelope className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>密码</Label>
        <InputGroup fullWidth>
          <InputGroup.Input placeholder="输入密码" type="password" />
          <InputGroup.Suffix>
            <Eye className="size-4 text-muted" />
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  );
}

import {Envelope, Eye} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="email">
        <Label>Email address</Label>
        <InputGroup fullWidth>
          <InputGroup.Prefix>
            <Envelope className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>Password</Label>
        <InputGroup fullWidth>
          <InputGroup.Input placeholder="Enter password" type="password" />
          <InputGroup.Suffix>
            <Eye className="size-4 text-muted" />
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  );
}

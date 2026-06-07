"use client";

import {Description, InputGroup, Label, TextField} from "@heroui/react";

export function WithPrefixAndSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="10" name="price">
      <Label>设置价格</Label>
      <InputGroup>
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[200px]" type="number" />
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
      <Description>客户将支付的价格</Description>
    </TextField>
  );
}

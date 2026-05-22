"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import React from "react";

export function Uncontrolled() {
  const [selection, setSelection] = React.useState("pro");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        defaultValue="pro"
        name="plan-uncontrolled"
        onChange={(nextValue) => setSelection(nextValue)}
      >
        <Label>订阅套餐</Label>
        <Radio value="starter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>入门版</Label>
            <Description>适合副项目和小型团队</Description>
          </Radio.Content>
        </Radio>
        <Radio value="pro">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>专业版</Label>
            <Description>高级报表与分析</Description>
          </Radio.Content>
        </Radio>
        <Radio value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>团队版</Label>
            <Description>最多可与 10 名队友共享访问权限</Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>
      <p className="text-sm text-muted">
        上次选择的套餐： <span className="font-medium">{selection}</span>
      </p>
    </div>
  );
}

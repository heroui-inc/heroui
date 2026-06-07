"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("pro");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup name="plan-controlled" value={value} onChange={setValue}>
        <Label>订阅套餐</Label>
        <Radio value="starter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            入门版
          </Radio.Content>
          <Description>适合副项目和小型团队</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            专业版
          </Radio.Content>
          <Description>高级报表与分析</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            团队版
          </Radio.Content>
          <Description>最多可与 10 名队友共享访问权限</Description>
        </Radio>
      </RadioGroup>
      <p className="text-sm text-muted">
        已选套餐： <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}

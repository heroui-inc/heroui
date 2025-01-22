import {Code as NextUICode} from "@heroui/react";

import {NextUIRadius, NextUISize} from "../../types";
import {ShowcaseComponent} from "../showcase-component";

export function Code() {
  return (
    <ShowcaseComponent defaultVariant="solid" name="Code" radiuses={radiuses} sizes={sizes}>
      <NextUICode color="default">npm install @heroui/react</NextUICode>
      <NextUICode color="primary">npm install @heroui/react</NextUICode>
      <NextUICode color="secondary">npm install @heroui/react</NextUICode>
      <NextUICode color="success">npm install @heroui/react</NextUICode>
      <NextUICode color="warning">npm install @heroui/react</NextUICode>
      <NextUICode color="danger">npm install @heroui/react</NextUICode>
    </ShowcaseComponent>
  );
}

const radiuses: NextUIRadius[] = ["none", "sm", "md", "lg", "full"];
const sizes: NextUISize[] = ["sm", "md", "lg"];

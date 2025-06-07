import type {ForwardedRef} from "react";
import type {FormProps} from "./base-form";

import {useProviderContext} from "@heroui/system";
import {forwardRef} from "react";

import {Form as AriaForm} from "./base-form";

export const Form = forwardRef(function Form(props: FormProps, ref: ForwardedRef<HTMLFormElement>) {
  const globalContext = useProviderContext();
  const validationBehavior =
    props.validationBehavior ?? globalContext?.validationBehavior ?? "native";

  return <AriaForm {...props} ref={ref} validationBehavior={validationBehavior} />;
});

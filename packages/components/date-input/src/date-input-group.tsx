import type {HTMLAttributes, ReactElement, ReactNode} from "react";
import type {GroupDOMAttributes, HelpTextProps, ValidationResult} from "@react-types/shared";

import {useMemo} from "react";
import {forwardRef} from "@heroui/system";
import {dataAttr} from "@heroui/shared-utils";

export interface DateInputGroupProps extends ValidationResult, HelpTextProps {
  children?: ReactElement | ReactElement[];
  shouldLabelBeOutside?: boolean;
  labelPlacement?: "inside" | "outside" | "outside-left";
  label?: ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  groupProps?: GroupDOMAttributes;
  wrapperProps?: HTMLAttributes<HTMLElement>; // <- inner wrapper props
  helperWrapperProps?: HTMLAttributes<HTMLElement>;
  labelProps?: HTMLAttributes<HTMLElement>;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

export const DateInputGroup = forwardRef<"div", DateInputGroupProps>((props, ref) => {
  const {
    as,
    label,
    children,
    description,
    startContent,
    endContent,
    errorMessage: errorMessageProp,
    shouldLabelBeOutside,
    labelPlacement,
    isInvalid,
    groupProps,
    labelProps,
    wrapperProps,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
    ...otherProps
  } = props;

  const Component = as || "div";

  const labelContent = label ? <span {...labelProps}>{label}</span> : null;

  const errorMessage =
    typeof errorMessageProp === "function"
      ? errorMessageProp({
          isInvalid,
          validationErrors,
          validationDetails,
        })
      : errorMessageProp || validationErrors?.join(" ");

  const hasHelper = !!description || !!errorMessage;

  const helperWrapper = useMemo(() => {
    if (!hasHelper) return null;

    return (
      <div {...helperWrapperProps}>
        {isInvalid && errorMessage ? (
          <div {...errorMessageProps}>{errorMessage}</div>
        ) : description ? (
          <div {...descriptionProps}>{description}</div>
        ) : null}
      </div>
    );
  }, [
    hasHelper,
    errorMessage,
    description,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
  ]);

  const dateInputContent = (
    <div {...groupProps}>
      {!shouldLabelBeOutside ? labelContent : null}
      <div {...wrapperProps}>
        {startContent}
        {children}
        {endContent}
      </div>
    </div>
  );

  return (
    <Component {...otherProps} ref={ref} data-has-helper={dataAttr(hasHelper)}>
      {shouldLabelBeOutside ? labelContent : null}
      {labelPlacement === "outside-left" ? (
        <div>
          {dateInputContent}
          {helperWrapper}
        </div>
      ) : (
        <>
          {dateInputContent}
          {helperWrapper}
        </>
      )}
    </Component>
  );
});

DateInputGroup.displayName = "HeroUI.DateInputGroup";

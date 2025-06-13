import type {ReactElement} from "react";
import type {ButtonProps} from "@heroui/button";
import type {UseToastProps} from "./use-toast";

import {forwardRef} from "@heroui/system";
import {Button} from "@heroui/button";
import {
  CloseIcon,
  DangerIcon,
  InfoFilledIcon,
  SuccessIcon,
  WarningIcon,
} from "@heroui/shared-icons";
import {m} from "@heroui/motion";
import {cloneElement, isValidElement} from "react";
import {Spinner} from "@heroui/spinner";

import {useToast} from "./use-toast";

export interface ToastProps extends UseToastProps {}

const iconMap = {
  default: InfoFilledIcon,
  primary: InfoFilledIcon,
  secondary: InfoFilledIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    severity,
    Component,
    icon,
    loadingIcon,
    domRef,
    endContent,
    color,
    hideIcon,
    closeIcon,
    disableAnimation,
    progressBarRef,
    classNames,
    slots,
    getWrapperProps,
    isProgressBarVisible,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    getMotionDivProps,
    getCloseIconProps,
    getLoadingIconProps,
    isLoading,
  } = useToast({
    ...props,
    ref,
  });

  const customIcon =
    typeof icon === "function"
      ? icon(getIconProps())
      : isValidElement(icon) && cloneElement(icon as ReactElement, getIconProps());

  const IconComponent = severity ? iconMap[severity] : iconMap[color] || iconMap.default;

  const customLoadingIcon =
    typeof loadingIcon === "function"
      ? loadingIcon(getLoadingIconProps())
      : isValidElement(loadingIcon) &&
        cloneElement(loadingIcon as ReactElement, getLoadingIconProps());

  const loadingIconComponent = isLoading
    ? customLoadingIcon || (
        <Spinner
          aria-label="loadingIcon"
          classNames={{wrapper: getLoadingIconProps().className}}
          color={"current"}
        />
      )
    : null;

  const customCloseIcon =
    typeof closeIcon === "function"
      ? closeIcon({})
      : isValidElement(closeIcon) && cloneElement(closeIcon as ReactElement, {});

  const toastContent = (
    <Component ref={domRef} {...getToastProps()}>
      <div {...getContentProps()}>
        {hideIcon && !isLoading
          ? null
          : loadingIconComponent || customIcon || <IconComponent {...getIconProps()} />}
        <div {...getWrapperProps()}>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
        </div>
      </div>
      {isProgressBarVisible && (
        <div className={slots.progressTrack({class: classNames?.progressTrack})}>
          <div
            ref={progressBarRef}
            className={slots.progressIndicator({class: classNames?.progressIndicator})}
          />
        </div>
      )}
      <Button isIconOnly {...(getCloseButtonProps() as ButtonProps)}>
        {customCloseIcon || <CloseIcon {...getCloseIconProps()} />}
      </Button>
      {endContent}
    </Component>
  );

  return (
    <>
      {disableAnimation ? (
        toastContent
      ) : (
        <m.div {...getMotionDivProps()}>
          <m.div
            key={"inner-div"}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            transition={{duration: 0.25, ease: "easeOut", delay: 0.1}}
          >
            {toastContent}
          </m.div>
        </m.div>
      )}
    </>
  );
});

Toast.displayName = "HeroUI.Toast";

export default Toast;

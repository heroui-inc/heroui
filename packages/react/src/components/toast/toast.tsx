"use client";

import type {ToastContentValue} from "./toast-queue";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components";

import {toastVariants} from "@heroui/styles";
import React, {createContext, useCallback, useContext, useEffect, useMemo, useRef} from "react";
import {
  Text as TextPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
  UNSTABLE_ToastStateContext as ToastStateContext,
} from "react-aria-components";

import {useMeasuredHeight, useMediaQuery} from "../../hooks";
import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {Button} from "../button";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {Spinner} from "../spinner";

import {DEFAULT_GAP, DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_SCALE_FACTOR} from "./constants";
import {ToastQueue, toast as defaultToastQueue} from "./toast-queue";

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastContext = {
  slots?: ReturnType<typeof toastVariants>;
  placement?: ToastVariants["placement"];
  scaleFactor?: number;
  gap?: number;
  maxVisibleToasts?: number;
  heightsByKey?: Record<string, number>;
  onToastHeightChange?: (key: string, height: number) => void;
};

const ToastContext = createContext<ToastContext>({});

/* ------------------------------------------------------------------------------------------------
 * Toast
 * --------------------------------------------------------------------------------------------- */
interface ToastProps<T extends object = ToastContentValue>
  extends ToastPrimitiveProps<T>, ToastVariants {
  scaleFactor?: number;
}

const Toast = <T extends object = ToastContentValue>({
  children,
  className,
  placement,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  toast,
  variant,
  ...rest
}: ToastProps<T>) => {
  const {
    gap = DEFAULT_GAP,
    heightsByKey,
    maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
    onToastHeightChange,
    placement: contextPlacement,
    scaleFactor: contextScaleFactor,
    slots,
  } = useContext(ToastContext);

  const finalPlacement = placement ?? contextPlacement;
  const finalScaleFactor = scaleFactor ?? contextScaleFactor;

  const state = useContext(ToastStateContext)!;
  const visibleToasts = state.visibleToasts;
  const index = visibleToasts.indexOf(toast);
  const isFrontmost = index <= 0;
  const isBottom = finalPlacement?.startsWith("bottom");
  const isHidden = index >= maxVisibleToasts;
  const toastKey = toast?.key;
  const toastRef = useRef<HTMLDivElement | null>(null);
  const {height: toastHeight} = useMeasuredHeight(toastRef);

  useEffect(() => {
    if (toastKey && typeof toastHeight === "number") {
      onToastHeightChange?.(toastKey, toastHeight);
    }
  }, [toastKey, toastHeight, onToastHeightChange]);

  const style = useMemo<CSSProperties>(() => {
    if (isHidden) {
      return {
        viewTransitionName: `toast-${toast.key}`,
        scale: 1 - index * finalScaleFactor,
        zIndex: visibleToasts.length - index - 1,
        tabindex: isFrontmost ? 0 : -1,
        ...rest.style,
      };
    }

    const toastsHeightBefore = visibleToasts.slice(0, index).reduce((total, item) => {
      if (!item?.key || !heightsByKey) {
        return total;
      }

      return total + (heightsByKey[item.key] ?? 0);
    }, 0);

    const frontToastKey = visibleToasts[0]?.key;
    const frontHeight =
      (frontToastKey ? heightsByKey?.[frontToastKey] : undefined) ?? toastHeight ?? 0;
    const currentHeight = (toastKey ? heightsByKey?.[toastKey] : undefined) ?? toastHeight ?? 0;
    const naturalPosition = toastsHeightBefore + gap * index;
    const desiredPosition = frontHeight - currentHeight + gap * index;
    const translateY = (isBottom ? -1 : 1) * (desiredPosition - naturalPosition);

    return {
      viewTransitionName: `toast-${toast.key}`,
      translate: `0 ${translateY}px 0`,
      scale: 1 - index * finalScaleFactor,
      zIndex: visibleToasts.length - index - 1,
      tabindex: isFrontmost ? 0 : -1,
      ...(frontHeight
        ? ({
            "--front-height": `${frontHeight}px`,
          } as CSSProperties)
        : null),
      ...rest.style,
    };
  }, [
    finalScaleFactor,
    gap,
    heightsByKey,
    index,
    isBottom,
    isFrontmost,
    isHidden,
    rest.style,
    toast?.key,
    visibleToasts,
  ]);

  return (
    <ToastPrimitive
      ref={toastRef}
      aria-hidden={isHidden}
      className={composeTwRenderProps(className, slots?.toast({variant}))}
      data-frontmost={dataAttr(isFrontmost)}
      data-hidden={dataAttr(isHidden)}
      data-index={index}
      data-slot="toast"
      style={style}
      toast={toast}
      {...rest}
    >
      {children}
    </ToastPrimitive>
  );
};

Toast.displayName = "HeroUI.Toast";

/* ------------------------------------------------------------------------------------------------
 * Toast Content
 * --------------------------------------------------------------------------------------------- */
interface ToastContentProps extends ComponentPropsWithRef<typeof ToastContentPrimitive> {}

const ToastContent = ({children, className, ...rest}: ToastContentProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <ToastContentPrimitive
      className={composeSlotClassName(slots?.content, className)}
      data-slot="toast-content"
      {...rest}
    >
      {children}
    </ToastContentPrimitive>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Toast Indicator
 * --------------------------------------------------------------------------------------------- */
interface ToastIndicatorProps extends ComponentPropsWithRef<"div"> {
  variant?: ToastVariants["variant"];
}

const ToastIndicator = ({children, className, variant, ...rest}: ToastIndicatorProps) => {
  const {slots} = useContext(ToastContext);

  const getDefaultIcon = useCallback(() => {
    switch (variant) {
      case "accent":
        return <InfoIcon data-slot="toast-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="toast-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="toast-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="toast-default-icon" />;
      default:
        return <InfoIcon data-slot="toast-default-icon" />;
    }
  }, [variant]);

  return (
    <div
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="toast-indicator"
      {...rest}
    >
      {children ?? getDefaultIcon()}
    </div>
  );
};

ToastIndicator.displayName = "HeroUI.ToastIndicator";

/* ------------------------------------------------------------------------------------------------
 * Toast Title
 * --------------------------------------------------------------------------------------------- */
interface ToastTitleProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastTitle = ({children, className, ...rest}: ToastTitleProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <TextPrimitive
      className={composeSlotClassName(slots?.title, className)}
      data-slot="toast-title"
      slot="title"
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
};

ToastTitle.displayName = "HeroUI.ToastTitle";

/* ------------------------------------------------------------------------------------------------
 * Toast Description
 * --------------------------------------------------------------------------------------------- */
interface ToastDescriptionProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastDescription = ({children, className, ...rest}: ToastDescriptionProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <TextPrimitive
      className={composeSlotClassName(slots?.description, className)}
      data-slot="toast-description"
      slot="description"
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
};

ToastDescription.displayName = "HeroUI.ToastDescription";

/* ------------------------------------------------------------------------------------------------
 * Toast Close Button
 * --------------------------------------------------------------------------------------------- */
interface ToastCloseButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const ToastCloseButton = ({className, ...rest}: ToastCloseButtonProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.close())}
      data-slot="toast-close"
      slot="close"
      {...rest}
    />
  );
};

ToastCloseButton.displayName = "HeroUI.ToastCloseButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Action Button
 * --------------------------------------------------------------------------------------------- */
interface ToastActionButtonProps extends ComponentPropsWithRef<typeof Button> {}

const ToastActionButton = ({children, className, ...rest}: ToastActionButtonProps) => {
  const {slots} = useContext(ToastContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.action?.())}
      data-slot="toast-action-button"
      {...rest}
    >
      {children}
    </Button>
  );
};

ToastActionButton.displayName = "HeroUI.ToastActionButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Region
 * --------------------------------------------------------------------------------------------- */
type ToastRegionPrimitiveProps<T extends object = ToastContentValue> = ComponentPropsWithRef<
  typeof ToastRegionPrimitive<T>
>;

interface ToastProviderProps<T extends object = ToastContentValue> extends Omit<
  ToastRegionPrimitiveProps<T>,
  "queue" | "children"
> {
  children?: ToastRegionPrimitiveProps<T>["children"];
  /** The gap between toasts. @default 8 */
  gap?: number;
  /** The maximum number of toasts to display at a time (visual only). */
  maxVisibleToasts?: number;
  /** The scale factor for toasts. @default 0.05 */
  scaleFactor?: number;
  placement?: ToastVariants["placement"];
  queue?: ToastQueue<T>;
}

const ToastProvider = <T extends object = ToastContentValue>({
  children,
  className,
  gap = DEFAULT_GAP,
  maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
  placement = "bottom",
  queue: queueProp,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  ...rest
}: ToastProviderProps<T>) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [toastHeights, setToastHeights] = React.useState<Record<string, number>>({});

  const toastQueue = useMemo(() => {
    if (queueProp) {
      // Custom toast prop provided - use it (it already has its own maxVisibleToasts limit)
      return queueProp;
    }

    return defaultToastQueue.getQueue() as ToastQueue<T>;
  }, [queueProp]);

  const resolvedMaxVisibleToasts = useMemo(
    () => maxVisibleToasts ?? queueProp?.maxVisibleToasts,
    [maxVisibleToasts, queueProp?.maxVisibleToasts],
  );

  const handleToastHeightChange = useCallback((key: string, height: number) => {
    setToastHeights((prev) => {
      if (prev[key] === height) {
        return prev;
      }

      return {
        ...prev,
        [key]: height,
      };
    });
  }, []);

  const getDefaultChildren = useCallback(
    (renderProps: {toast: QueuedToast<T>}) => {
      const {actionProps, description, indicator, isLoading, title, variant} =
        (renderProps.toast.content as ToastContentValue) ?? {};

      return (
        <Toast
          placement={placement}
          scaleFactor={scaleFactor}
          toast={renderProps.toast}
          variant={variant}
        >
          {indicator === null ? null : isLoading ? (
            <ToastIndicator variant={variant}>
              <Spinner color="current" size="sm" />
            </ToastIndicator>
          ) : (
            <ToastIndicator variant={variant}>{indicator}</ToastIndicator>
          )}
          <ToastContent>
            {!!title && <ToastTitle>{title}</ToastTitle>}
            {!!description && <ToastDescription>{description}</ToastDescription>}
            {isMobile && actionProps?.children ? (
              <ToastActionButton {...actionProps}>{actionProps.children}</ToastActionButton>
            ) : null}
          </ToastContent>
          {!isMobile && actionProps?.children ? (
            <ToastActionButton {...actionProps}>{actionProps.children}</ToastActionButton>
          ) : null}
          <ToastCloseButton />
        </Toast>
      );
    },
    [isMobile, placement, scaleFactor],
  );

  return (
    <ToastRegionPrimitive<T>
      className={composeTwRenderProps(className, slots?.region())}
      data-slot="toast-region"
      queue={toastQueue}
      style={{
        // @ts-expect-error - CSS variables
        "--gap": `${gap}px`,
        "--scale-factor": scaleFactor,
        "--placement": placement,
      }}
      {...rest}
    >
      {(renderProps) => {
        const content = renderProps.toast.content as ToastContentValue;
        const renderPropsWithIsLoading = {
          ...renderProps,
          isLoading: content?.isLoading ?? false,
        };

        return (
          <ToastContext
            value={{
              slots,
              placement,
              scaleFactor,
              gap,
              maxVisibleToasts: resolvedMaxVisibleToasts,
              heightsByKey: toastHeights,
              onToastHeightChange: handleToastHeightChange,
            }}
          >
            {typeof children === "undefined"
              ? getDefaultChildren(renderProps)
              : typeof children === "function"
                ? children(renderPropsWithIsLoading)
                : children}
          </ToastContext>
        );
      }}
    </ToastRegionPrimitive>
  );
};

ToastProvider.displayName = "HeroUI.ToastProvider";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {
  ToastQueue,
  Toast,
  ToastActionButton,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastProvider,
  ToastTitle,
};

export type {
  ToastActionButtonProps,
  ToastCloseButtonProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
};

"use client";

import type {StatelyToastQueue, ToastContentValue} from "./toast-queue";
import type {DOMRenderProps} from "../../utils/dom";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef, ReactNode} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components/Toast";

import {toastVariants} from "@heroui/styles";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {Text as TextPrimitive} from "react-aria-components/Text";
import {
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
  UNSTABLE_ToastStateContext as ToastStateContext,
} from "react-aria-components/Toast";

import {useMeasuredHeight, useMediaQuery} from "../../hooks";
import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {Button} from "../button";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {Spinner} from "../spinner";

import {
  DEFAULT_GAP,
  DEFAULT_MAX_VISIBLE_TOAST,
  DEFAULT_SCALE_FACTOR,
  DEFAULT_TOAST_WIDTH,
} from "./constants";
import {ToastQueue, toast as defaultToastQueue} from "./toast-queue";

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastVariant = NonNullable<ToastVariants["variant"]>;

type ToastContext = {
  actionClassName?: string;
  closeClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
  gap?: number;
  heightsByKey?: Record<string, number>;
  indicatorClassName?: string;
  maxVisibleToasts?: number;
  onToastHeightChange?: (key: string, height: number) => void;
  onToastHeightRemove?: (key: string) => void;
  placement?: ToastVariants["placement"];
  scaleFactor?: number;
  titleClassName?: string;
  toastClassNames?: Record<ToastVariant, string>;
  width?: number | string;
};

const ToastContext = createContext<ToastContext>({});

/* ------------------------------------------------------------------------------------------------
 * Toast
 * --------------------------------------------------------------------------------------------- */
interface ToastProps<T extends object = ToastContentValue>
  extends ToastPrimitiveProps<T>, ToastVariants {
  scaleFactor?: number;
}

function ToastInner<T extends object = ToastContentValue>({
  children,
  className,
  placement,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  toast,
  variant,
  ...rest
}: ToastProps<T>) {
  const {
    gap = DEFAULT_GAP,
    heightsByKey,
    maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
    onToastHeightChange,
    onToastHeightRemove,
    placement: contextPlacement,
    scaleFactor: contextScaleFactor,
    toastClassNames,
  } = useContext(ToastContext);

  const finalPlacement = placement ?? contextPlacement;
  const finalScaleFactor = scaleFactor ?? contextScaleFactor;
  const toastClassName = toastClassNames?.[variant ?? "default"];
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, toastClassName),
    [className, toastClassName],
  );

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

  // Drop this toast's entry from the provider's height map when it unmounts
  // (or when its key changes). Keeps `toastHeights` bounded to currently
  // mounted toasts without reading external mutable state inside a setState
  // updater.
  useEffect(() => {
    if (!toastKey) return;

    return () => {
      onToastHeightRemove?.(toastKey);
    };
  }, [toastKey, onToastHeightRemove]);

  // ToastProps from react-aria-components does not expose tabIndex as a typed
  // prop, so set it imperatively on the underlying DOM node. Only the frontmost
  // toast is reachable via keyboard; stacked/hidden toasts are removed from
  // the tab order.
  useLayoutEffect(() => {
    const el = toastRef.current;

    if (el) {
      el.tabIndex = isFrontmost ? 0 : -1;
    }
  }, [isFrontmost]);

  const style = useMemo<CSSProperties>(() => {
    const frontToastKey = visibleToasts[0]?.key;

    const frontHeight =
      (frontToastKey ? heightsByKey?.[frontToastKey] : undefined) ?? toastHeight ?? 0;

    const offset = index * gap;
    const translateY = (isBottom ? -1 : 1) * offset;
    const scale = 1 - index * finalScaleFactor;

    return {
      scale: `${scale}`,
      translate: `0 ${translateY}px 0`,
      viewTransitionName: `toast-${String(toast.key).replace(/[^a-zA-Z0-9]/g, "-")}`,
      zIndex: visibleToasts.length - index,
      ...(frontHeight
        ? ({
            "--front-height": `${frontHeight}px`,
          } as CSSProperties)
        : null),
      opacity: isHidden ? 0 : 1,
      pointerEvents: isHidden ? "none" : "auto",
      ...rest.style,
    } as const;
  }, [
    finalScaleFactor,
    gap,
    heightsByKey,
    index,
    isBottom,
    isHidden,
    rest.style,
    toast?.key,
    toastHeight,
    visibleToasts,
  ]);

  return (
    <ToastPrimitive
      ref={toastRef}
      aria-hidden={isHidden}
      className={resolvedClassName}
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
}

ToastInner.displayName = "HeroUI.Toast";

const Toast = memo(ToastInner) as <T extends object = ToastContentValue>(
  props: ToastProps<T>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Toast Content
 * --------------------------------------------------------------------------------------------- */
interface ToastContentProps extends ComponentPropsWithRef<typeof ToastContentPrimitive> {}

const ToastContent = memo(function ToastContent({children, className, ...rest}: ToastContentProps) {
  const {contentClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return (
    <ToastContentPrimitive className={resolvedClassName} data-slot="toast-content" {...rest}>
      {children}
    </ToastContentPrimitive>
  );
});

/* ------------------------------------------------------------------------------------------------
 * Toast Indicator
 * --------------------------------------------------------------------------------------------- */
interface ToastIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  variant?: ToastVariants["variant"];
}

function ToastIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant,
  ...rest
}: ToastIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ToastIndicatorProps<E>>) {
  const {indicatorClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

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
    <dom.div className={resolvedClassName} data-slot="toast-indicator" {...(rest as any)}>
      {children ?? getDefaultIcon()}
    </dom.div>
  );
}

ToastIndicatorInner.displayName = "HeroUI.ToastIndicator";

const ToastIndicator = memo(ToastIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: ToastIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ToastIndicatorProps<E>>,
) => React.JSX.Element;

/* ------------------------------------------------------------------------------------------------
 * Toast Title
 * --------------------------------------------------------------------------------------------- */
interface ToastTitleProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastTitle = memo(function ToastTitle({children, className, ...rest}: ToastTitleProps) {
  const {titleClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, titleClassName) as string,
    [className, titleClassName],
  );

  return (
    <TextPrimitive className={resolvedClassName} data-slot="toast-title" slot="title" {...rest}>
      {children}
    </TextPrimitive>
  );
});

ToastTitle.displayName = "HeroUI.ToastTitle";

/* ------------------------------------------------------------------------------------------------
 * Toast Description
 * --------------------------------------------------------------------------------------------- */
interface ToastDescriptionProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastDescription = memo(function ToastDescription({
  children,
  className,
  ...rest
}: ToastDescriptionProps) {
  const {descriptionClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, descriptionClassName) as string,
    [className, descriptionClassName],
  );

  return (
    <TextPrimitive
      className={resolvedClassName}
      data-slot="toast-description"
      slot="description"
      {...rest}
    >
      {children}
    </TextPrimitive>
  );
});

ToastDescription.displayName = "HeroUI.ToastDescription";

/* ------------------------------------------------------------------------------------------------
 * Toast Close Button
 * --------------------------------------------------------------------------------------------- */
interface ToastCloseButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const ToastCloseButton = memo(function ToastCloseButton({
  className,
  ...rest
}: ToastCloseButtonProps) {
  const {closeClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, closeClassName),
    [className, closeClassName],
  );

  return (
    <CloseButton className={resolvedClassName} data-slot="toast-close" slot="close" {...rest} />
  );
});

ToastCloseButton.displayName = "HeroUI.ToastCloseButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Action Button
 * --------------------------------------------------------------------------------------------- */
interface ToastActionButtonProps extends ComponentPropsWithRef<typeof Button> {}

const ToastActionButton = memo(function ToastActionButton({
  children,
  className,
  ...rest
}: ToastActionButtonProps) {
  const {actionClassName} = useContext(ToastContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, actionClassName),
    [className, actionClassName],
  );

  return (
    <Button className={resolvedClassName} data-slot="toast-action-button" {...rest}>
      {children}
    </Button>
  );
});

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
  /** The width of the toast. @default 460 */
  width?: number | string;
}

function ToastProviderInner<T extends object = ToastContentValue>({
  children,
  className,
  gap = DEFAULT_GAP,
  maxVisibleToasts,
  placement = "bottom",
  queue: queueProp,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  width = DEFAULT_TOAST_WIDTH,
  ...rest
}: ToastProviderProps<T>) {
  const slots = useMemo(() => toastVariants({placement}), [placement]);
  const slotClassNames = useMemo(
    () => ({
      actionClassName: slots.action(),
      closeClassName: slots.close(),
      contentClassName: slots.content(),
      descriptionClassName: slots.description(),
      indicatorClassName: slots.indicator(),
      titleClassName: slots.title(),
      toastClassNames: {
        accent: slots.toast({variant: "accent"}),
        danger: slots.toast({variant: "danger"}),
        default: slots.toast({variant: "default"}),
        success: slots.toast({variant: "success"}),
        warning: slots.toast({variant: "warning"}),
      },
    }),
    [slots],
  );
  const regionClassName = useMemo(() => slots.region(), [slots]);
  const resolvedRegionClassName = useMemo(
    () => composeTwRenderProps(className, regionClassName),
    [className, regionClassName],
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [toastHeights, setToastHeights] = useState<Record<string, number>>({});

  const toastQueue = useMemo((): StatelyToastQueue<T> => {
    if (queueProp) {
      // Region consumes the underlying react-stately queue, not the HeroUI wrapper.
      return queueProp.getQueue();
    }

    return defaultToastQueue.getQueue() as StatelyToastQueue<T>;
  }, [queueProp]);

  const resolvedMaxVisibleToasts = useMemo(() => {
    const queueLimit =
      queueProp && "maxVisibleToasts" in queueProp ? queueProp.maxVisibleToasts : undefined;

    return maxVisibleToasts ?? queueLimit ?? DEFAULT_MAX_VISIBLE_TOAST;
  }, [maxVisibleToasts, queueProp]);

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

  // Removes a toast's height entry when it unmounts (called from each Toast's
  // effect cleanup). Keeps `toastHeights` bounded to currently mounted toasts.
  const handleToastHeightRemove = useCallback((key: string) => {
    setToastHeights((prev) => {
      if (!(key in prev)) {
        return prev;
      }

      const next = {...prev};

      delete next[key];

      return next;
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
      className={resolvedRegionClassName}
      data-slot="toast-region"
      queue={toastQueue}
      style={{
        // @ts-expect-error - CSS variables
        "--gap": `${gap}px`,
        "--placement": placement,
        "--scale-factor": scaleFactor,
        "--toast-width": typeof width === "number" ? `${width}px` : width,
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
              ...slotClassNames,
              gap,
              heightsByKey: toastHeights,
              maxVisibleToasts: resolvedMaxVisibleToasts,
              onToastHeightChange: handleToastHeightChange,
              onToastHeightRemove: handleToastHeightRemove,
              placement,
              scaleFactor,
              width,
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
}

ToastProviderInner.displayName = "HeroUI.ToastProvider";

const ToastProvider = memo(ToastProviderInner) as <T extends object = ToastContentValue>(
  props: ToastProviderProps<T>,
) => React.JSX.Element;

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

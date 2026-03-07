"use client";

import type {ToastContentValue} from "./toast-queue";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components";

import {toastVariants} from "@heroui/styles";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text as TextPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
  UNSTABLE_ToastStateContext as ToastStateContext,
} from "react-aria-components";
import {cx} from "tailwind-variants";

import {useIsDocumentHidden, useMeasuredHeight, useMediaQuery} from "../../hooks";
import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {Button} from "../button";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {Spinner} from "../spinner";

import {
  DEFAULT_GAP,
  DEFAULT_MAX_VISIBLE_TOAST,
  DEFAULT_MOBILE_OFFSET,
  DEFAULT_OFFSET,
  DEFAULT_SCALE_FACTOR,
  DEFAULT_TOAST_WIDTH,
  MOBILE_BREAKPOINT,
} from "./constants";
import {
  ToastQueue,
  toast as defaultToastQueue,
  toastQueue as defaultToastQueueInstance,
} from "./toast-queue";

/* ------------------------------------------------------------------------------------------------
 * Toast Offset
 * --------------------------------------------------------------------------------------------- */
export type ToastOffsetValue =
  | number
  | string
  | {
      top?: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
    };

function toPixelOrString(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function parseOffsetToCSS(offset: ToastOffsetValue): {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
} {
  if (typeof offset === "number") {
    const px = `${offset}px`;

    return {bottom: px, left: px, right: px, top: px};
  }

  if (typeof offset === "string") {
    return {bottom: offset, left: offset, right: offset, top: offset};
  }

  return {
    bottom: offset.bottom !== undefined ? toPixelOrString(offset.bottom) : undefined,
    left: offset.left !== undefined ? toPixelOrString(offset.left) : undefined,
    right: offset.right !== undefined ? toPixelOrString(offset.right) : undefined,
    top: offset.top !== undefined ? toPixelOrString(offset.top) : undefined,
  };
}

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastContext = {
  slots?: ReturnType<typeof toastVariants>;
  placement?: ToastVariants["placement"];
  width?: number | string;
  scaleFactor?: number;
  gap?: number;
  maxVisibleToasts?: number;
  heightsByKey?: Record<string, number>;
  onToastHeightChange?: (key: string, height: number) => void;
  expanded?: boolean;
  onToastMouseEnter?: () => void;
  onToastMouseLeave?: (event: React.MouseEvent) => void;
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
    expanded = false,
    gap = DEFAULT_GAP,
    heightsByKey,
    maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
    onToastHeightChange,
    onToastMouseEnter,
    onToastMouseLeave,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (toastKey && typeof toastHeight === "number") {
      onToastHeightChange?.(toastKey, toastHeight);
    }
  }, [toastKey, toastHeight, onToastHeightChange]);

  const style = useMemo<CSSProperties>(() => {
    const frontToastKey = visibleToasts[0]?.key;

    const frontHeight =
      (frontToastKey ? heightsByKey?.[frontToastKey] : undefined) ?? toastHeight ?? 0;

    let translateY: number;
    let scale: number;

    if (expanded) {
      const toastsHeightBefore = visibleToasts.reduce((prev, t, reducerIndex) => {
        if (reducerIndex >= index) return prev;
        const h = t.key ? heightsByKey?.[t.key] : undefined;

        return prev + (h ?? 0);
      }, 0);

      translateY = (isBottom ? -1 : 1) * (index * gap + toastsHeightBefore);
      scale = 1;
    } else {
      const offset = index * gap;

      translateY = (isBottom ? -1 : 1) * offset;
      scale = 1 - index * finalScaleFactor;
    }

    const isInteractive = expanded ? !isHidden : isFrontmost;

    return {
      tabindex: isFrontmost ? 0 : -1,
      zIndex: visibleToasts.length - index,
      ...(frontHeight
        ? ({
            "--front-height": `${frontHeight}px`,
          } as CSSProperties)
        : null),
      ...({
        "--toast-scale": `${scale}`,
        "--toast-translate-y": `${translateY}px`,
      } as CSSProperties),
      opacity: isHidden ? 0 : 1,
      pointerEvents: isHidden ? "none" : isInteractive ? "auto" : "none",
      ...rest.style,
    } as const;
  }, [
    expanded,
    finalScaleFactor,
    gap,
    heightsByKey,
    index,
    isBottom,
    isFrontmost,
    isHidden,
    rest.style,
    toast?.key,
    toastHeight,
    visibleToasts,
  ]);

  const handleMouseEnter = useCallback(() => {
    onToastMouseEnter?.();
  }, [onToastMouseEnter]);

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      onToastMouseLeave?.(event);
    },
    [onToastMouseLeave],
  );

  return (
    <ToastPrimitive
      ref={toastRef}
      aria-hidden={isHidden}
      className={composeTwRenderProps(className, slots?.toast({variant}))}
      data-expanded={dataAttr(expanded)}
      data-frontmost={dataAttr(isFrontmost)}
      data-hidden={dataAttr(isHidden)}
      data-index={index}
      data-mounted={dataAttr(mounted)}
      data-slot="toast"
      style={style}
      toast={toast}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  /** Always show expanded (no stacking). @default false */
  expand?: boolean;
  /** The gap between toasts. @default 12 */
  gap?: number;
  /** The maximum number of toasts to display at a time (visual only). */
  maxVisibleToasts?: number;
  /** Mobile offset applied when screen width < 600px. */
  mobileOffset?: ToastOffsetValue;
  /** Offset from viewport edges. */
  offset?: ToastOffsetValue;
  /** The scale factor for toasts. @default 0.05 */
  scaleFactor?: number;
  placement?: ToastVariants["placement"];
  queue?: ToastQueue<T>;
  /** The width of the toast. @default 460 */
  width?: number | string;
  /** Max visible toasts when expanded. @default 3 */
  visibleToasts?: number;
}

const ToastProvider = <T extends object = ToastContentValue>({
  children,
  className,
  expand = false,
  gap = DEFAULT_GAP,
  maxVisibleToasts,
  mobileOffset = DEFAULT_MOBILE_OFFSET,
  offset = DEFAULT_OFFSET,
  placement = "bottom",
  queue: queueProp,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  visibleToasts: visibleToastsProp,
  width = DEFAULT_TOAST_WIDTH,
  ...rest
}: ToastProviderProps<T>) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMobileOffset = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const [toastHeights, setToastHeights] = React.useState<Record<string, number>>({});
  const [isExpandedByHover, setIsExpandedByHover] = React.useState(false);
  const isDocumentHidden = useIsDocumentHidden();

  const pauseAllToasts = useCallback(() => {
    if (queueProp) {
      queueProp.pauseAll();
    } else {
      defaultToastQueue.pauseAll();
    }
  }, [queueProp]);

  const resumeAllToasts = useCallback(() => {
    if (queueProp) {
      queueProp.resumeAll();
    } else {
      defaultToastQueue.resumeAll();
    }
  }, [queueProp]);
  const toastQueue = useMemo(() => {
    if (queueProp) {
      return "getQueue" in queueProp ? queueProp.getQueue() : queueProp;
    }

    return defaultToastQueue.getQueue() as ToastQueue<T>;
  }, [queueProp]);

  const resolvedMaxVisibleToasts = useMemo(() => {
    const queueLimit =
      queueProp && "maxVisibleToasts" in queueProp ? queueProp.maxVisibleToasts : undefined;

    return maxVisibleToasts ?? visibleToastsProp ?? queueLimit ?? DEFAULT_MAX_VISIBLE_TOAST;
  }, [maxVisibleToasts, visibleToastsProp, queueProp]);

  const expanded = expand || isExpandedByHover;

  const offsetCSS = useMemo(() => parseOffsetToCSS(offset), [offset]);
  const mobileOffsetCSS = useMemo(() => parseOffsetToCSS(mobileOffset), [mobileOffset]);

  const offsetStyle = useMemo(() => {
    const active = isMobileOffset ? mobileOffsetCSS : offsetCSS;

    return {
      "--toast-mobile-offset-bottom": mobileOffsetCSS.bottom,
      "--toast-mobile-offset-left": mobileOffsetCSS.left,
      "--toast-mobile-offset-right": mobileOffsetCSS.right,
      "--toast-mobile-offset-top": mobileOffsetCSS.top,
      "--toast-offset-bottom": active.bottom,
      "--toast-offset-left": active.left,
      "--toast-offset-right": active.right,
      "--toast-offset-top": active.top,
    } as React.CSSProperties;
  }, [isMobileOffset, mobileOffsetCSS, offsetCSS]);

  useEffect(() => {
    if (isDocumentHidden) {
      pauseAllToasts();
    } else {
      resumeAllToasts();
    }
  }, [isDocumentHidden, pauseAllToasts, resumeAllToasts]);

  const queueForSubscription = queueProp ?? defaultToastQueueInstance;

  useEffect(() => {
    const unsubscribe = queueForSubscription.subscribe(() => {
      const count = queueForSubscription.visibleToasts.length;

      if (count <= 1) {
        setIsExpandedByHover(false);
      }
    });

    return unsubscribe;
  }, [queueForSubscription]);

  const handleHoverEnter = useCallback(() => {
    setIsExpandedByHover(true);
    pauseAllToasts();
  }, [pauseAllToasts]);

  const handleHoverLeave = useCallback(
    (event: React.MouseEvent) => {
      const relatedTarget = event.relatedTarget as Node | null;

      if (relatedTarget && typeof relatedTarget === "object") {
        const isMovingToToastOrWrapper =
          relatedTarget instanceof Element &&
          (relatedTarget.closest('[data-slot="toast"]') ||
            relatedTarget.closest('[data-slot="toast-region"]') ||
            relatedTarget.closest('[data-slot="toast-region-wrapper"]'));

        if (isMovingToToastOrWrapper) return;
      }
      setIsExpandedByHover(false);
      resumeAllToasts();
    },
    [resumeAllToasts],
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

  const wrapperClassName =
    typeof className === "string"
      ? cx(slots?.region(), "toast-region-wrapper", className)
      : cx(slots?.region(), "toast-region-wrapper");

  const toastRegionStyle = {
    ...offsetStyle,
    "--gap": `${gap}px`,
    "--placement": placement,
    "--scale-factor": scaleFactor,
    "--toast-region-min-height": `${Math.max(80, ...Object.values(toastHeights))}px`,
    "--toast-width": typeof width === "number" ? `${width}px` : width,
  } as React.CSSProperties;

  return (
    <div
      className={wrapperClassName}
      data-expanded={dataAttr(expanded)}
      data-slot="toast-region-wrapper"
      style={{position: "relative"}}
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      onMouseMove={handleHoverEnter}
    >
      <ToastRegionPrimitive<T>
        className={cx("toast-region-wrapper", slots?.region())}
        data-slot="toast-region-wrapper"
        queue={toastQueue}
        style={toastRegionStyle}
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
                expanded,
                gap,
                heightsByKey: toastHeights,
                maxVisibleToasts: resolvedMaxVisibleToasts,
                onToastHeightChange: handleToastHeightChange,
                onToastMouseEnter: handleHoverEnter,
                onToastMouseLeave: handleHoverLeave,
                placement,
                scaleFactor,
                slots,
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
    </div>
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

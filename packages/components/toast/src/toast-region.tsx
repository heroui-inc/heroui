import type {SlotsToClasses, ToastRegionSlots, ToastRegionVariantProps} from "@heroui/theme";

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useToastRegion, AriaToastRegionProps} from "@react-aria/toast";
import {QueuedToast, ToastState} from "@react-stately/toast";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {toastRegion} from "@heroui/theme";
import {clsx} from "@heroui/shared-utils";

import Toast from "./toast";
import {ToastProps, ToastPlacement} from "./use-toast";

export interface RegionProps {
  className?: string;
  classNames?: SlotsToClasses<ToastRegionSlots>;
}

interface ToastRegionProps<T> extends AriaToastRegionProps, ToastRegionVariantProps, RegionProps {
  toastQueue: ToastState<T>;
  placement?: ToastPlacement;
  maxVisibleToasts: number;
  toastOffset?: number;
  toastProps?: ToastProps;
}

export function ToastRegion<T extends ToastProps>({
  toastQueue,
  placement,
  disableAnimation,
  maxVisibleToasts,
  toastOffset,
  toastProps = {},
  className,
  classNames,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const {regionProps} = useToastRegion(props, toastQueue, ref);
  const {hoverProps, isHovered} = useHover({
    isDisabled: false,
  });

  const [isTouched, setIsTouched] = useState(false);

  const slots = useMemo(
    () =>
      toastRegion({
        disableAnimation,
      }),
    [disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  useEffect(() => {
    function handleTouchOutside(event: TouchEvent) {
      if (ref.current && !(ref.current as HTMLDivElement).contains(event.target as Node)) {
        setIsTouched(false);
      }
    }
    document.addEventListener("touchstart", handleTouchOutside);

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  const [heights, setHeights] = useState<number[]>([]);
  const total = toastQueue.visibleToasts?.length ?? 0;

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  return (
    <div
      {...mergeProps(regionProps, hoverProps)}
      ref={ref}
      className={slots.base({class: baseStyles})}
      data-placement={placement}
      onTouchStart={handleTouchStart}
    >
      {[...toastQueue.visibleToasts].reverse().map((toast: QueuedToast<ToastProps>, index) => {
        if (disableAnimation && total - index > maxVisibleToasts) {
          return null;
        }

        if (
          disableAnimation ||
          total - index <= 4 ||
          (isHovered && total - index <= maxVisibleToasts + 1)
        ) {
          return (
            <Toast
              key={toast.key}
              state={toastQueue}
              toast={toast}
              {...mergeProps(toastProps, toast.content)}
              disableAnimation={disableAnimation}
              heights={heights}
              index={index}
              isRegionExpanded={isHovered || isTouched}
              maxVisibleToasts={maxVisibleToasts}
              placement={placement}
              setHeights={setHeights}
              toastOffset={toastOffset}
              total={total}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

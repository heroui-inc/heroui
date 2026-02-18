import type {ToastOptions} from "@react-stately/toast";
import type {RegionProps} from "./toast-region";
import type {ToastProps, ToastPlacement} from "./use-toast";

import {ToastQueue, useToastQueue} from "@react-stately/toast";
import {useProviderContext} from "@heroui/system";
import {LazyMotion} from "framer-motion";

import {ToastRegion} from "./toast-region";

const loadFeatures = () => import("framer-motion").then((res) => res.domMax);

const toastQueues = new Map<ToastPlacement, ToastQueue<ToastProps>>();

export const getToastQueue = (placement: ToastPlacement = "bottom-right") => {
  if (!toastQueues.has(placement)) {
    toastQueues.set(
      placement,
      new ToastQueue({
        maxVisibleToasts: Infinity,
      }),
    );
  }

  return toastQueues.get(placement)!;
};

interface ToastProviderProps {
  maxVisibleToasts?: number;
  placement?: ToastPlacement;
  disableAnimation?: boolean;
  toastProps?: ToastProps;
  toastOffset?: number;
  regionProps?: RegionProps;
}

export const ToastProvider = ({
  placement = "bottom-right",
  disableAnimation: disableAnimationProp = false,
  maxVisibleToasts = 3,
  toastOffset = 0,
  toastProps = {},
  regionProps,
}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue(placement));
  const globalContext = useProviderContext();
  const disableAnimation = disableAnimationProp ?? globalContext?.disableAnimation ?? false;

  return (
    <LazyMotion features={loadFeatures}>
      {toastQueue.visibleToasts.length > 0 && (
        <ToastRegion
          disableAnimation={disableAnimation}
          maxVisibleToasts={maxVisibleToasts}
          placement={placement}
          toastOffset={toastOffset}
          toastProps={toastProps}
          toastQueue={toastQueue}
          {...regionProps}
        />
      )}
    </LazyMotion>
  );
};

export const addToast = (props: (ToastProps & ToastOptions) & {placement?: ToastPlacement}) => {
  const {placement = "bottom-right", ...toastProps} = props;
  const queue = getToastQueue(placement);

  return queue.add(toastProps);
};

const closingToasts = new Map<string, ReturnType<typeof setTimeout>>();

export const closeToast = (key: string, placement: ToastPlacement = "bottom-right") => {
  const queue = getToastQueue(placement);

  if (closingToasts.has(key)) {
    return;
  }

  const timeoutId = setTimeout(() => {
    closingToasts.delete(key);
    queue.close(key);
  }, 300);

  closingToasts.set(key, timeoutId);
};

export const closeAll = (placement?: ToastPlacement) => {
  if (placement) {
    const queue = getToastQueue(placement);
    const toasts = [...queue.visibleToasts];

    toasts.forEach((toast) => {
      closeToast(toast.key, placement);
    });
  } else {
    // Close all toasts in all placements
    toastQueues.forEach((queue, queuePlacement) => {
      const toasts = [...queue.visibleToasts];

      toasts.forEach((toast) => {
        closeToast(toast.key, queuePlacement);
      });
    });
  }
};

export const isToastClosing = (key: string) => closingToasts.has(key);

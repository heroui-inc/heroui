import type {ToastOptions} from "@react-stately/toast";
import type {RegionProps} from "./toast-region";
import type {ToastProps, ToastPlacement} from "./use-toast";

import {ToastQueue, useToastQueue} from "@react-stately/toast";
import {useProviderContext} from "@heroui/system";
import {LazyMotion} from "framer-motion";

import {ToastRegion} from "./toast-region";

const loadFeatures = () => import("framer-motion").then((res) => res.domMax);

let globalToastQueue: ToastQueue<ToastProps> | null = null;

interface ToastProviderProps {
  maxVisibleToasts?: number;
  placement?: ToastPlacement;
  disableAnimation?: boolean;
  toastProps?: ToastProps;
  toastOffset?: number;
  regionProps?: RegionProps;
}

export const getToastQueue = () => {
  if (!globalToastQueue) {
    globalToastQueue = new ToastQueue({
      maxVisibleToasts: Infinity,
    });
  }

  return globalToastQueue;
};

export const ToastProvider = ({
  placement = "bottom-right",
  disableAnimation: disableAnimationProp = false,
  maxVisibleToasts = 3,
  toastOffset = 0,
  toastProps = {},
  regionProps,
}: ToastProviderProps) => {
  const toastQueue = useToastQueue(getToastQueue());
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

export const addToast = ({...props}: ToastProps & ToastOptions) => {
  if (!globalToastQueue) {
    return null;
  }

  return globalToastQueue.add(props);
};

const closingToasts = new Map<string, ReturnType<typeof setTimeout>>();

export const closeToast = (key: string) => {
  if (!globalToastQueue) {
    return;
  }

  if (closingToasts.has(key)) {
    return;
  }

  const timeoutId = setTimeout(() => {
    closingToasts.delete(key);
    globalToastQueue?.close(key);
  }, 300);

  closingToasts.set(key, timeoutId);
};

export const closeAll = () => {
  if (!globalToastQueue) {
    return;
  }

  const toasts = [...globalToastQueue.visibleToasts];

  toasts.forEach((toast) => {
    closeToast(toast.key);
  });
};

export const isToastClosing = (key: string) => closingToasts.has(key);

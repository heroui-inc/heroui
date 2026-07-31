/* eslint-disable react-hooks/rules-of-hooks */
import type {Decorator} from "@storybook/react";

import React, {useEffect, useRef} from "react";
import {scan, setOptions} from "react-scan";
import {useGlobals} from "storybook/preview-api";

import {REACT_SCAN_GLOBAL_TYPE_ID, REACT_SCAN_STORAGE_KEY} from "./constants";

const canUseStorage = () => {
  try {
    const k = "__react_scan_sb_test__";

    localStorage.setItem(k, "1");
    localStorage.removeItem(k);

    return true;
  } catch {
    return false;
  }
};

const readStoredEnabled = (): boolean | null => {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(REACT_SCAN_STORAGE_KEY);

    if (!raw) return null;
    const parsed = JSON.parse(raw) as {enabled?: unknown};

    return typeof parsed.enabled === "boolean" ? parsed.enabled : null;
  } catch {
    return null;
  }
};

const writeStoredEnabled = (enabled: boolean) => {
  if (!canUseStorage()) return;
  try {
    const raw = localStorage.getItem(REACT_SCAN_STORAGE_KEY);
    const prev = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};

    localStorage.setItem(REACT_SCAN_STORAGE_KEY, JSON.stringify({...prev, enabled}));
  } catch {
    // ignore quota / private mode
  }
};

const isToolbarMounted = () =>
  typeof window !== "undefined" &&
  !!(window as Window & {__REACT_SCAN_TOOLBAR_CONTAINER__?: unknown})
    .__REACT_SCAN_TOOLBAR_CONTAINER__;

const applyEnabledToReactScan = (enabled: boolean) => {
  writeStoredEnabled(enabled);

  if (!isToolbarMounted()) {
    scan({
      showToolbar: true,
      dangerouslyForceRunInProduction: true,
      allowInIframe: true,
      enabled,
    });
  } else {
    setOptions({enabled});
  }
};

const bindStorageToGlobals = (
  getCurrentEnabled: () => boolean,
  updateGlobals: (globals: Record<string, string>) => void,
  isSyncingFromGlobals: () => boolean,
) => {
  const sync = () => {
    if (isSyncingFromGlobals()) return;
    const stored = readStoredEnabled();

    if (stored === null || stored === getCurrentEnabled()) return;
    updateGlobals({
      [REACT_SCAN_GLOBAL_TYPE_ID]: stored ? "true" : "false",
    });
  };

  const onStorage = (e: StorageEvent) => {
    if (e.key === REACT_SCAN_STORAGE_KEY || e.key === null) sync();
  };

  window.addEventListener("storage", onStorage);

  let restoreSetItem: (() => void) | null = null;
  let pollId: number | null = null;

  try {
    const proto = Storage.prototype;
    const original = proto.setItem;

    proto.setItem = function setItemPatched(this: Storage, key: string, value: string) {
      original.call(this, key, value);
      if (key === REACT_SCAN_STORAGE_KEY) sync();
    };

    restoreSetItem = () => {
      proto.setItem = original;
    };
  } catch {
    pollId = window.setInterval(sync, 400);
  }

  return () => {
    window.removeEventListener("storage", onStorage);
    restoreSetItem?.();
    if (pollId != null) window.clearInterval(pollId);
  };
};

export const withReactScan: Decorator = (Story) => {
  const [globals, updateGlobals] = useGlobals();
  const isEnabled =
    globals[REACT_SCAN_GLOBAL_TYPE_ID] === "true" || globals[REACT_SCAN_GLOBAL_TYPE_ID] === true;

  const isEnabledRef = useRef(isEnabled);
  const syncingFromGlobalsRef = useRef(false);

  isEnabledRef.current = isEnabled;

  useEffect(() => {
    syncingFromGlobalsRef.current = true;
    applyEnabledToReactScan(isEnabled);
    queueMicrotask(() => {
      syncingFromGlobalsRef.current = false;
    });
  }, [isEnabled]);

  useEffect(
    () =>
      bindStorageToGlobals(
        () => isEnabledRef.current,
        updateGlobals,
        () => syncingFromGlobalsRef.current,
      ),
    [updateGlobals],
  );

  return <Story />;
};

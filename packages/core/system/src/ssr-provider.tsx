import type {JSX, ReactNode} from "react";

import React, {useContext, useLayoutEffect, useMemo, useRef, useState} from "react";

interface SSRContextValue {
  prefix: string;
  current: number;
}

const defaultContext: SSRContextValue = {
  prefix: String(Math.round(Math.random() * 10000000000)),
  current: 0,
};

const SSRContext = React.createContext<SSRContextValue>(defaultContext);
const IsSSRContext = React.createContext(false);

export interface SSRProviderProps {
  children: ReactNode;
}

function LegacySSRProvider(props: SSRProviderProps): JSX.Element {
  let cur = useContext(SSRContext);
  let counter = useCounter(cur === defaultContext);
  let [isSSR, setIsSSR] = useState(true);
  let value: SSRContextValue = useMemo(
    () => ({
      prefix: cur === defaultContext ? "" : `${cur.prefix}-${counter}`,
      current: 0,
    }),
    [cur, counter],
  );

  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      setIsSSR(false);
    }, []);
  }

  return (
    <SSRContext.Provider value={value}>
      <IsSSRContext.Provider value={isSSR}>{props.children}</IsSSRContext.Provider>
    </SSRContext.Provider>
  );
}

let warnedAboutSSRProvider = false;

export function SSRProvider(props: SSRProviderProps): JSX.Element {
  if (typeof React["useId"] === "function") {
    if (
      process.env.NODE_ENV !== "test" &&
      process.env.NODE_ENV !== "production" &&
      !warnedAboutSSRProvider
    ) {
      // eslint-disable-next-line
      console.warn(
        "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
      );
      warnedAboutSSRProvider = true;
    }

    return <>{props.children}</>;
  }

  return <LegacySSRProvider {...props} />;
}

let canUseDOM = Boolean(
  typeof window !== "undefined" && window.document && window.document.createElement,
);

let componentIds = new WeakMap();

function useCounter(isDisabled = false) {
  let ctx = useContext(SSRContext);
  let ref = useRef<number | null>(null);

  if (ref.current === null && !isDisabled) {
    let currentOwner =
      // @ts-ignore
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;

    if (currentOwner) {
      let prevComponentValue = componentIds.get(currentOwner);

      if (prevComponentValue == null) {
        // On the first render, and first call to useId, store the id and state in our weak map.
        componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState,
        });
      } else if (currentOwner.memoizedState !== prevComponentValue.state) {
        // On the second render, the memoizedState gets reset by React.
        // Reset the counter, and remove from the weak map so we don't
        // do this for subsequent useId calls.
        ctx.current = prevComponentValue.id;
        componentIds.delete(currentOwner);
      }
    }

    ref.current = ++ctx.current;
  }

  return ref.current;
}

function useLegacySSRSafeId(defaultId?: string): string {
  let ctx = useContext(SSRContext);

  if (ctx === defaultContext && !canUseDOM && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line
    console.warn(
      "When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.",
    );
  }
  let counter = useCounter(!!defaultId);
  let prefix =
    ctx === defaultContext && process.env.NODE_ENV === "test"
      ? "react-aria"
      : `react-aria${ctx.prefix}`;

  return defaultId || `${prefix}-${counter}`;
}

function useModernSSRSafeId(defaultId?: string): string {
  let id = React.useId();
  let [didSSR] = useState(useIsSSR());
  let prefix =
    didSSR || process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${defaultContext.prefix}`;

  return defaultId || `${prefix}-${id}`;
}

/** @private */
export const useSSRSafeId =
  typeof React["useId"] === "function" ? useModernSSRSafeId : useLegacySSRSafeId;

function getSnapshot() {
  return false;
}

function getServerSnapshot() {
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(onStoreChange: () => void): () => void {
  // noop
  return () => {};
}

export function useIsSSR(): boolean {
  if (typeof React["useSyncExternalStore"] === "function") {
    return React["useSyncExternalStore"](subscribe, getSnapshot, getServerSnapshot);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(IsSSRContext);
}

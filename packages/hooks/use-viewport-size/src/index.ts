import React, {useContext, useEffect, useState} from "react";

interface ViewportSize {
  width: number;
  height: number;
}

let visualViewport = typeof document !== "undefined" && window.visualViewport;

const IsSSRContext = React.createContext(false);

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
  // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
  if (typeof React["useSyncExternalStore"] === "function") {
    return React["useSyncExternalStore"](subscribe, getSnapshot, getServerSnapshot);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(IsSSRContext);
}

export function useViewportSize(): ViewportSize {
  let isSSR = useIsSSR();
  let [size, setSize] = useState(() => (isSSR ? {width: 0, height: 0} : getViewportSize()));

  useEffect(() => {
    // Use visualViewport api to track available height even on iOS virtual keyboard opening
    let onResize = () => {
      setSize((size) => {
        let newSize = getViewportSize();

        if (newSize.width === size.width && newSize.height === size.height) {
          return size;
        }

        return newSize;
      });
    };

    if (!visualViewport) {
      window.addEventListener("resize", onResize);
    } else {
      visualViewport.addEventListener("resize", onResize);
    }

    return () => {
      if (!visualViewport) {
        window.removeEventListener("resize", onResize);
      } else {
        visualViewport.removeEventListener("resize", onResize);
      }
    };
  }, []);

  return size;
}

function getViewportSize(): ViewportSize {
  return {
    width: (visualViewport && visualViewport?.width) || window.innerWidth,
    height: (visualViewport && visualViewport?.height) || window.innerHeight,
  };
}

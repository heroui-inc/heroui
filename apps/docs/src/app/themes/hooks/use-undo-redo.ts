import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";

export function useUndoRedo() {
  const searchParams = useSearchParams();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Track our own history stack since browser doesn't expose it
  const historyStack = useRef<string[]>([]);
  const currentIndex = useRef(-1);
  const isNavigating = useRef(false);
  const lastSearchParams = useRef<string | null>(null);

  // Handle URL changes from nuqs or browser navigation
  useEffect(() => {
    const currentParams = searchParams.toString();

    // Skip if params haven't actually changed
    if (currentParams === lastSearchParams.current) {
      return;
    }

    lastSearchParams.current = currentParams;

    if (isNavigating.current) {
      // This change was from our undo/redo navigation
      isNavigating.current = false;

      return;
    }

    // This is a new change from nuqs (user action)
    // Truncate any forward history and add new entry
    historyStack.current = historyStack.current.slice(0, currentIndex.current + 1);
    historyStack.current.push(currentParams);
    currentIndex.current = historyStack.current.length - 1;

    setCanUndo(currentIndex.current > 0);
    setCanRedo(false);
  }, [searchParams]);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentParams = window.location.search.slice(1); // Remove leading '?'
      const newIndex = historyStack.current.indexOf(currentParams);

      if (newIndex !== -1 && newIndex !== currentIndex.current) {
        currentIndex.current = newIndex;
        lastSearchParams.current = currentParams;
        setCanUndo(newIndex > 0);
        setCanRedo(newIndex < historyStack.current.length - 1);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const undo = useCallback(() => {
    if (currentIndex.current > 0) {
      isNavigating.current = true;
      currentIndex.current--;
      setCanUndo(currentIndex.current > 0);
      setCanRedo(true);
      window.history.back();
    }
  }, []);

  const redo = useCallback(() => {
    if (currentIndex.current < historyStack.current.length - 1) {
      isNavigating.current = true;
      currentIndex.current++;
      setCanUndo(true);
      setCanRedo(currentIndex.current < historyStack.current.length - 1);
      window.history.forward();
    }
  }, []);

  return {canRedo, canUndo, redo, undo};
}

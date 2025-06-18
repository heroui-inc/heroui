// Partial code from react-spectrum to avoid importing the entire package
// ref: packages/@react-aria/overlays/src/useModal.tsx

import type {
  AriaAttributes,
  AriaRole,
  CSSProperties,
  DOMAttributes as ReactDOMAttributes,
  JSX,
  ReactNode,
} from "react";

import React, {useContext, useMemo, useState} from "react";

interface FocusableElement extends Element, HTMLOrSVGElement {}

interface DOMAttributes<T = FocusableElement> extends AriaAttributes, ReactDOMAttributes<T> {
  id?: string | undefined;
  role?: AriaRole | undefined;
  tabIndex?: number | undefined;
  style?: CSSProperties | undefined;
  className?: string | undefined;
}

interface ModalProviderAria {
  modalProviderProps: AriaAttributes;
}

interface ModalContext {
  parent: ModalContext | null;
  modalCount: number;
  addModal: () => void;
  removeModal: () => void;
}

export interface ModalProviderProps extends DOMAttributes {
  children: ReactNode;
}

const Context = React.createContext<ModalContext | null>(null);

/**
 * Each ModalProvider tracks how many modals are open in its subtree. On mount, the modals
 * trigger `addModal` to increment the count, and trigger `removeModal` on unmount to decrement it.
 * This is done recursively so that all parent providers are incremented and decremented.
 * If the modal count is greater than zero, we add `aria-hidden` to this provider to hide its
 * subtree from screen readers. This is done using React context in order to account for things
 * like portals, which can cause the React tree and the DOM tree to differ significantly in structure.
 */
function ModalProvider(props: ModalProviderProps): JSX.Element {
  let {children} = props;
  let parent = useContext(Context);
  let [modalCount, setModalCount] = useState(0);
  let context = useMemo(
    () => ({
      parent,
      modalCount,
      addModal() {
        setModalCount((count) => count + 1);
        if (parent) {
          parent.addModal();
        }
      },
      removeModal() {
        setModalCount((count) => count - 1);
        if (parent) {
          parent.removeModal();
        }
      },
    }),
    [parent, modalCount],
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

/**
 * Used to determine if the tree should be aria-hidden based on how many
 * modals are open.
 */
function useModalProvider(): ModalProviderAria {
  let context = useContext(Context);

  return {
    modalProviderProps: {
      "aria-hidden": context && context.modalCount > 0 ? true : undefined,
    },
  };
}

/**
 * Creates a root node that will be aria-hidden if there are other modals open.
 */
function OverlayContainerDOM(props: ModalProviderProps) {
  let {modalProviderProps} = useModalProvider();

  return <div data-overlay-container {...props} {...modalProviderProps} />;
}

/**
 * An OverlayProvider acts as a container for the top-level application.
 * Any application that uses modal dialogs or other overlays should
 * be wrapped in a `<OverlayProvider>`. This is used to ensure that
 * the main content of the application is hidden from screen readers
 * if a modal or other overlay is opened. Only the top-most modal or
 * overlay should be accessible at once.
 */
export function OverlayProvider(props: ModalProviderProps): JSX.Element {
  return (
    <ModalProvider>
      <OverlayContainerDOM {...props} />
    </ModalProvider>
  );
}

import type {
  AriaAttributes,
  AriaRole,
  CSSProperties,
  DOMAttributes as ReactDOMAttributes,
  JSX,
  ReactNode,
} from "react";

import React, {useContext, useMemo, useState} from "react";

export interface FocusableElement extends Element, HTMLOrSVGElement {}

export interface DOMAttributes<T = FocusableElement> extends AriaAttributes, ReactDOMAttributes<T> {
  id?: string | undefined;
  role?: AriaRole | undefined;
  tabIndex?: number | undefined;
  style?: CSSProperties | undefined;
  className?: string | undefined;
}

export interface ModalProviderProps extends DOMAttributes {
  children: ReactNode;
}

export interface ModalProviderAria {
  modalProviderProps: AriaAttributes;
}

interface ModalContext {
  parent: ModalContext | null;
  modalCount: number;
  addModal: () => void;
  removeModal: () => void;
}

const Context = React.createContext<ModalContext | null>(null);

export function ModalProvider(props: ModalProviderProps): JSX.Element {
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

export function useModalProvider(): ModalProviderAria {
  let context = useContext(Context);

  return {
    modalProviderProps: {
      "aria-hidden": context && context.modalCount > 0 ? true : undefined,
    },
  };
}
export function OverlayContainerDOM(props: ModalProviderProps) {
  let {modalProviderProps} = useModalProvider();

  return <div data-overlay-container {...props} {...modalProviderProps} />;
}

export function OverlayProvider(props: ModalProviderProps): JSX.Element {
  return (
    <ModalProvider>
      <OverlayContainerDOM {...props} />
    </ModalProvider>
  );
}

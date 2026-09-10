export const isDrawerDragTargetOwnedBy = (target: HTMLElement, dialog: HTMLElement) =>
  target.closest('[data-slot="drawer-dialog"]') === dialog;

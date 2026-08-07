/** Whether the document is scroll-locked (RAC `usePreventScroll`). */
export const isDocumentScrollLocked = () => {
  const html = document.documentElement;
  const body = document.body;

  const htmlOverflow = html.style.overflow || getComputedStyle(html).overflow;
  const bodyOverflow = body.style.overflow || getComputedStyle(body).overflow;

  return htmlOverflow === "hidden" || bodyOverflow === "hidden";
};

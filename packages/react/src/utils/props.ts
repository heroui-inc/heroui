export const isNotAsChild = <T>(props: T): props is T & {asChild?: false} => {
  return Boolean(
    typeof props === "object" && props !== null && "asChild" in props
      ? props.asChild !== true
      : true,
  );
};

export {Item as BaseItem} from "@react-stately/collections";
import type {ItemProps as BaseItemProps} from "@react-types/shared";
import type {HTMLHeroUIProps, As} from "@heroui/system";

/**
 * A modified version of the ItemProps from @react-types/shared, with the addition of the HeroUI props.
 *
 */
export type ItemProps<Type extends As = "div", T extends object = {}> = BaseItemProps<T> &
  HTMLHeroUIProps<Type>;

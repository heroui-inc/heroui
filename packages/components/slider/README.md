# @heroui/slider

Slider allows a user to select one or more values within a range.

Please refer to the [documentation](https://heroui.com/docs/components/slider) for more information.

## Props

| Prop                        | Type                                                     | Description                                                                                                                                                                                                                            | Default                               |
| --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `getTooltipValue`           | `(value: SliderValue, index?: number) => string \| number` | A function that returns the content to display as the tooltip label. If it returns a number, `tooltipValueFormatOptions` can be used for formatting. The `index` parameter is for multi-thumb sliders. If `tooltipProps.content` is set, it takes precedence. | `undefined`                           |
| `tooltipValueFormatOptions` | `Intl.NumberFormatOptions`                               | `Intl.NumberFormatOptions` to use for formatting the tooltip label when `getTooltipValue` returns a number. Ignored if `getTooltipValue` returns a string.                                                                               | Inherits from `formatOptions`         |
| *...other props*            |                                                          | *(This table should ideally list all relevant props. For brevity, only new props related to tooltips are detailed here. Refer to the main [documentation](https://heroui.com/docs/components/slider) for a complete list.)* |                                       |

*Note: `SliderValue` is typically `number | number[]`.*


## Installation

```sh
yarn add @heroui/slider
# or
npm i @heroui/slider
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/heroui-inc/heroui/blob/master/CONTRIBUTING.md)
for details.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/heroui-inc/heroui/blob/master/LICENSE).

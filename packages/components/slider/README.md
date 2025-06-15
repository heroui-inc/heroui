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

### Usage Examples

**Example with `getTooltipValue`:**

```jsx
<Slider
  showTooltip
  getTooltipValue={(value) => `Value: ${value}`}
/>

<Slider
  showTooltip
  defaultValue={0.5}
  maxValue={1}
  step={0.01}
  getTooltipValue={(value) => value} // Returns a number
  tooltipValueFormatOptions={{ style: 'percent' }} // Formats the number as a percentage
/>

{/* Example for time formatting */}
<Slider
  showTooltip
  label="Duration (ms to ss:mm:hh)"
  defaultValue={3665000} // e.g., 1 hour, 1 minute, 5 seconds
  maxValue={7200000}   // e.g., 2 hours
  step={1000}           // 1-second steps
  getTooltipValue={(value) => {
    // Ensure value is treated as a number
    let milliseconds = typeof value === 'number' ? value : (Array.isArray(value) ? value[0] : 0);

    if (isNaN(milliseconds) || milliseconds < 0) {
      milliseconds = 0;
    }

    let totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(seconds)}:${pad(minutes)}:${pad(hours)}`;
  }}
/>
```

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

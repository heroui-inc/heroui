# @vezham/use-theme

React hook to switch between light and dark themes

## Installation

```sh
yarn add @vezham/use-theme
# or
npm i @vezham/use-theme
```

## Usage

Import `useTheme`

```tsx
import {useTheme} from "@vezham/use-theme";
```

### theme

```tsx
// `theme` is the active theme name
// by default, it will use the one in localStorage.
// if it is no such value in localStorage, `light` theme will be used
const {theme} = useTheme();
```

### setTheme

You can use any theme name you want, but make sure it exists in your 
`tailwind.config.js` file. See [Create Theme](https://heroui.com/docs/customization/create-theme) for more details.

```tsx
// set `theme` by using `setTheme`
const {setTheme} = useTheme();
// setting to light theme
setTheme('light')
// setting to dark theme
setTheme('dark')
// setting to purple-dark theme
setTheme('purple-dark')
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/vezham/heroui/blob/master/CONTRIBUTING.md)
for details.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/vezham/heroui/blob/master/LICENSE).

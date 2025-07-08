# @heroui/step-progress

A step progress component that displays the progress through a sequence of steps.

Please refer to the [documentation](https://heroui.com/docs/components/step-progress) for more information.

## Installation

```sh
yarn add @heroui/step-progress
# or
npm i @heroui/step-progress
```

## Usage

```jsx
import {StepProgress} from "@heroui/step-progress";

const steps = [
  {id: 1, status: "completed"},
  {id: 2, status: "active", children: <div>Active step content</div>},
  {id: 3, status: "pending"},
];

export default function App() {
  return <StepProgress steps={steps} />;
}
```

## Contribution

Yes please! See the
[contributing guidelines](https://github.com/heroui-inc/heroui/blob/master/CONTRIBUTING.md)
for details.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/heroui-inc/heroui/blob/master/LICENSE).

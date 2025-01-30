import {Snippet} from "@vezham/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @vezham/react</Snippet>
      <Snippet color="warning" variant="flat">
        npm install @vezham/react
      </Snippet>
      <Snippet color="primary" variant="solid">
        npm install @vezham/react
      </Snippet>
      <Snippet color="secondary" variant="shadow">
        npm install @vezham/react
      </Snippet>
    </div>
  );
}

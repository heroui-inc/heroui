import {Snippet} from "@vezham/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet color="default">npm install @vezham/react</Snippet>
      <Snippet color="primary">npm install @vezham/react</Snippet>
      <Snippet color="secondary">npm install @vezham/react</Snippet>
      <Snippet color="success">npm install @vezham/react</Snippet>
      <Snippet color="warning">npm install @vezham/react</Snippet>
      <Snippet color="danger">npm install @vezham/react</Snippet>
    </div>
  );
}

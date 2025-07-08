import {StepProgress} from "@heroui/react";

export default function App() {
  const steps = [
    {id: "1", status: "completed", children: "Getting Started"},
    {id: "2", status: "active", children: "Configuration"},
    {id: "3", status: "pending", children: "Review"},
    {id: "4", status: "pending", children: "Complete"},
  ];

  return <StepProgress className="max-w-md" steps={steps} />;
}

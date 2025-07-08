import {StepProgress} from "@heroui/react";

export default function App() {
  const completedSteps = [
    {id: "1", status: "completed", children: "Account Setup"},
    {id: "2", status: "completed", children: "Profile Information"},
    {id: "3", status: "completed", children: "Verification"},
    {id: "4", status: "completed", children: "Finished"},
  ];

  const activeSteps = [
    {id: "1", status: "completed", children: "Personal Info"},
    {id: "2", status: "active", children: "Contact Details"},
    {id: "3", status: "pending", children: "Review"},
    {id: "4", status: "pending", children: "Submit"},
  ];

  const pendingSteps = [
    {id: "1", status: "pending", children: "Start Process"},
    {id: "2", status: "pending", children: "Configure"},
    {id: "3", status: "pending", children: "Finalize"},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Completed</h3>
        <StepProgress className="max-w-md" steps={completedSteps} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">In Progress</h3>
        <StepProgress className="max-w-md" steps={activeSteps} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Not Started</h3>
        <StepProgress className="max-w-md" steps={pendingSteps} />
      </div>
    </div>
  );
}

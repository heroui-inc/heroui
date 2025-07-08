import {StepProgress, Button} from "@heroui/react";
import {useState} from "react";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepData = [
    {id: "1", children: "Personal Information"},
    {id: "2", children: "Contact Details"},
    {id: "3", children: "Preferences"},
    {id: "4", children: "Review & Submit"},
  ];

  const steps = stepData.map((step, index) => ({
    ...step,
    status: index < currentStep ? "completed" : index === currentStep ? "active" : "pending",
  }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <StepProgress className="max-w-md" steps={steps} />

      <div className="flex gap-2">
        <Button isDisabled={currentStep === 0} variant="bordered" onPress={handlePrevious}>
          Previous
        </Button>
        <Button color="primary" isDisabled={currentStep === steps.length - 1} onPress={handleNext}>
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].children}
      </div>
    </div>
  );
}

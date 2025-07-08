import type {Meta, StoryObj} from "@storybook/react";
import type {Step} from "../src/step-progress";

import React from "react";

import {StepProgress} from "../src/step-progress";

export default {
  title: "Components/StepProgress",
  component: StepProgress,
  argTypes: {
    className: {
      control: {
        type: "text",
      },
    },
  },
} as Meta<typeof StepProgress>;

type Story = StoryObj<typeof StepProgress>;

const basicSteps: Step[] = [
  {id: 1, status: "completed"},
  {id: 2, status: "active"},
  {id: 3, status: "pending"},
];

export const Default: Story = {
  args: {
    steps: basicSteps,
  },
};

// Simple navigation template
const NavigationTemplate = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 4;

  const createSteps = (): Step[] => {
    return Array.from({length: totalSteps}, (_, index) => {
      const stepNumber = index + 1;
      let status: "completed" | "active" | "pending";

      if (stepNumber < currentStep) {
        status = "completed";
      } else if (stepNumber === currentStep) {
        status = "active";
      } else {
        status = "pending";
      }

      return {
        id: stepNumber,
        status,
        children:
          stepNumber === currentStep ? (
            <div className="p-4 text-center">
              <div className="font-medium">
                Step {stepNumber} of {totalSteps}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {stepNumber === 1 && "Starting the process"}
                {stepNumber === 2 && "Configuration"}
                {stepNumber === 3 && "Review"}
                {stepNumber === 4 && "Completed"}
              </div>
            </div>
          ) : undefined,
      };
    });
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-6">
      <StepProgress steps={createSteps()} />

      <div className="flex gap-4 justify-center">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded font-medium disabled:opacity-50"
          disabled={currentStep === 1}
          onClick={goToPrevious}
        >
          ← Back
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded font-medium disabled:opacity-50"
          disabled={currentStep === totalSteps}
          onClick={goToNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export const WithNavigation = {
  render: NavigationTemplate,
};

// Navigation with labels template
const NavigationWithLabelsTemplate = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const stepsData = [
    {id: 1, label: "Personal Information", description: "Enter your basic data"},
    {id: 2, label: "Verification", description: "Confirm your identity"},
    {id: 3, label: "Configuration", description: "Personalize your experience"},
    {id: 4, label: "Finalization", description: "Review and complete"},
  ];

  const createStepsWithLabels = (): Step[] => {
    return stepsData.map((stepData) => {
      let status: "completed" | "active" | "pending";

      if (stepData.id < currentStep) {
        status = "completed";
      } else if (stepData.id === currentStep) {
        status = "active";
      } else {
        status = "pending";
      }

      return {
        id: stepData.id,
        status,
        children:
          stepData.id === currentStep ? (
            <div className="p-6 bg-white rounded-lg border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{stepData.label}</h3>
              <p className="text-gray-600 mb-4">{stepData.description}</p>
              <div className="text-sm text-gray-500">
                Step {stepData.id} of {stepsData.length}
              </div>
            </div>
          ) : undefined,
      };
    });
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < stepsData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Progress Component */}
      <StepProgress steps={createStepsWithLabels()} />

      {/* Labels below the progress */}
      <div className="grid grid-cols-4 gap-2 px-2">
        {stepsData.map((stepData) => (
          <div key={stepData.id} className="text-center">
            <div
              className={`text-xs font-medium ${
                stepData.id < currentStep
                  ? "text-blue-600"
                  : stepData.id === currentStep
                    ? "text-blue-600"
                    : "text-gray-400"
              }`}
            >
              {stepData.label}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-gray-600 transition-colors"
          disabled={currentStep === 1}
          onClick={goToPrevious}
        >
          ← Back
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-blue-600 transition-colors"
          disabled={currentStep === stepsData.length}
          onClick={goToNext}
        >
          {currentStep === stepsData.length ? "Finalize" : "Next"} →
        </button>
      </div>
    </div>
  );
};

export const WithLabelsAndNavigation = {
  render: NavigationWithLabelsTemplate,
};

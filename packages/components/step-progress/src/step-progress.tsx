import type {ReactNode} from "react";

import {CheckIcon} from "../../../utilities/shared-icons/src";

export interface Step {
  id: number;
  status: "completed" | "active" | "pending";
  children?: ReactNode;
}

interface StepProgressProps {
  steps: Step[];
  className?: string;
}

export const StepProgress = ({steps, className = ""}: StepProgressProps) => {
  const activeStepIndex = steps.findIndex((step) => step.status === "active");
  const activeStep = activeStepIndex !== -1 ? steps[activeStepIndex] : null;

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-slate-800 px-6 py-4 rounded-lg">
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-600 -translate-y-1/2 rounded-full" />

          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{
              width:
                steps.length > 1
                  ? `${(steps.filter((step) => step.status === "completed").length / (steps.length - 1)) * 100}%`
                  : "0%",
            }}
          />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step.status === "completed"
                    ? "bg-blue-500 text-white"
                    : step.status === "active"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-500 text-slate-300"
                }`}
              >
                {step.status === "completed" ? <CheckIcon className="w-4 h-4" /> : step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeStep && activeStep.children && <div>{activeStep.children}</div>}
    </div>
  );
};

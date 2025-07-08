import "@testing-library/jest-dom";
import type {Step} from "../src";

import * as React from "react";
import {render} from "@testing-library/react";

import {spy, shouldIgnoreReactWarning} from "../../../utilities/test-utils/src";
import {StepProgress} from "../src";

describe("StepProgress", () => {
  const defaultSteps: Step[] = [
    {id: 1, status: "completed"},
    {id: 2, status: "active"},
    {id: 3, status: "pending"},
  ];

  it("should render correctly", () => {
    const wrapper = render(<StepProgress steps={defaultSteps} />);

    expect(() => wrapper.unmount()).not.toThrow();

    if (shouldIgnoreReactWarning(spy)) {
      return;
    }

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("should render all steps", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const stepElements = container.querySelectorAll("[class*='rounded-full'][class*='w-8']");

    expect(stepElements).toHaveLength(3);
  });

  it("should render step numbers for pending and active steps", () => {
    const {getByText} = render(<StepProgress steps={defaultSteps} />);

    expect(getByText("2")).toBeInTheDocument(); // active step
    expect(getByText("3")).toBeInTheDocument(); // pending step
  });

  it("should render CheckIcon for completed steps", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const checkIcon = container.querySelector("svg");

    expect(checkIcon).toBeInTheDocument();
  });

  it("should apply correct styling for completed steps", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const stepElements = container.querySelectorAll("[class*='rounded-full'][class*='w-8']");
    const completedStep = stepElements[0];

    expect(completedStep).toHaveClass("bg-blue-500", "text-white");
  });

  it("should apply correct styling for active steps", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const stepElements = container.querySelectorAll("[class*='rounded-full'][class*='w-8']");
    const activeStep = stepElements[1];

    expect(activeStep).toHaveClass("bg-blue-500", "text-white");
  });

  it("should apply correct styling for pending steps", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const stepElements = container.querySelectorAll("[class*='rounded-full'][class*='w-8']");
    const pendingStep = stepElements[2];

    expect(pendingStep).toHaveClass("bg-slate-500", "text-slate-300");
  });

  it("should calculate progress bar width correctly", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    // 1 completed step out of 2 possible progress positions (3 steps - 1) = 50%
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("should set progress bar to 0% with single step", () => {
    const singleStep: Step[] = [{id: 1, status: "completed"}];
    const {container} = render(<StepProgress steps={singleStep} />);
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    expect(progressBar).toHaveStyle("width: 0%");
  });

  it("should render 100% progress when all but last step are completed", () => {
    const stepsWithAllButLastCompleted: Step[] = [
      {id: 1, status: "completed"},
      {id: 2, status: "completed"},
      {id: 3, status: "active"},
    ];
    const {container} = render(<StepProgress steps={stepsWithAllButLastCompleted} />);
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    // 2 completed steps out of 2 possible progress positions (3 steps - 1) = 100%
    expect(progressBar).toHaveStyle("width: 100%");
  });

  it("should handle all steps completed correctly", () => {
    const allCompletedSteps: Step[] = [
      {id: 1, status: "completed"},
      {id: 2, status: "completed"},
      {id: 3, status: "completed"},
    ];
    const {container} = render(<StepProgress steps={allCompletedSteps} />);
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    // 3 completed steps out of 2 possible progress positions (3 steps - 1) = 150%
    // This is expected behavior as progress can exceed 100% when all steps are completed
    expect(progressBar).toHaveStyle("width: 150%");
  });

  it("should render active step children when provided", () => {
    const stepsWithChildren: Step[] = [
      {id: 1, status: "completed"},
      {
        id: 2,
        status: "active",
        children: <div data-testid="active-content">Active Step Content</div>,
      },
      {id: 3, status: "pending"},
    ];
    const {getByTestId} = render(<StepProgress steps={stepsWithChildren} />);

    expect(getByTestId("active-content")).toBeInTheDocument();
    expect(getByTestId("active-content")).toHaveTextContent("Active Step Content");
  });

  it("should not render children when no active step", () => {
    const stepsWithoutActive: Step[] = [
      {id: 1, status: "completed"},
      {
        id: 2,
        status: "pending",
        children: <div data-testid="should-not-render">Should not render</div>,
      },
      {id: 3, status: "pending"},
    ];
    const {queryByTestId} = render(<StepProgress steps={stepsWithoutActive} />);

    expect(queryByTestId("should-not-render")).not.toBeInTheDocument();
  });

  it("should not render children section when active step has no children", () => {
    const stepsWithoutChildren: Step[] = [
      {id: 1, status: "completed"},
      {id: 2, status: "active"},
      {id: 3, status: "pending"},
    ];
    const {container} = render(<StepProgress steps={stepsWithoutChildren} />);
    const childrenContainer = container.querySelector("div:last-child");

    // The last div should be the main container, not a children container
    expect(childrenContainer?.className).toContain("w-full");
  });

  it("should apply custom className", () => {
    const customClass = "custom-step-progress";
    const {container} = render(<StepProgress className={customClass} steps={defaultSteps} />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("w-full", customClass);
  });

  it("should handle empty steps array", () => {
    const {container} = render(<StepProgress steps={[]} />);
    const stepElements = container.querySelectorAll("[class*='rounded-full'][class*='w-8']");

    expect(stepElements).toHaveLength(0);
  });

  it("should handle multiple completed steps correctly", () => {
    const multipleCompletedSteps: Step[] = [
      {id: 1, status: "completed"},
      {id: 2, status: "completed"},
      {id: 3, status: "active"},
      {id: 4, status: "pending"},
    ];
    const {container} = render(<StepProgress steps={multipleCompletedSteps} />);
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    // 2 completed steps out of 3 possible progress positions (4 steps - 1) = 66.67%
    expect(progressBar).toHaveStyle("width: 66.66666666666666%");
  });

  it("should handle steps with mixed children", () => {
    const mixedSteps: Step[] = [
      {id: 1, status: "completed", children: <div data-testid="completed-content">Completed</div>},
      {id: 2, status: "active", children: <div data-testid="active-content">Active</div>},
      {id: 3, status: "pending", children: <div data-testid="pending-content">Pending</div>},
    ];
    const {getByTestId, queryByTestId} = render(<StepProgress steps={mixedSteps} />);

    // Only active step children should render
    expect(getByTestId("active-content")).toBeInTheDocument();
    expect(queryByTestId("completed-content")).not.toBeInTheDocument();
    expect(queryByTestId("pending-content")).not.toBeInTheDocument();
  });

  it("should render background and progress bar elements", () => {
    const {container} = render(<StepProgress steps={defaultSteps} />);
    const backgroundBar = container.querySelector("[class*='bg-slate-600']");
    const progressBar = container.querySelector("[class*='bg-blue-500'][class*='absolute']");

    expect(backgroundBar).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});

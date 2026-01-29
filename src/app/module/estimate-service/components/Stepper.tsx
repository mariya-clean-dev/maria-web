"use client";

import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: 1 | 2 | 3;
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Plan" },
    { id: 3, label: "Confirm" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-4">
          
          {/* Circle */}
          <div
            className={cn(
              "h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm",
              step.id <= currentStep
                ? "bg-[#17A5C6] text-white"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {step.id}
          </div>

          {/* Label */}
          <span
            className={cn(
              "hidden sm:inline-block font-medium",
              step.id <= currentStep
                ? "text-[#17A5C6]"
                : "text-gray-500"
            )}
          >
            {step.label}
          </span>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
            className={cn(
              "w-12 h-[2px]",
              step.id < currentStep
                ? "bg-[#17A5C6]"
                : "bg-gray-200 border-l-3 border-[#17A5C6]"
            )}
          />
          )}
        </div>
      ))}
    </div>
  );
}

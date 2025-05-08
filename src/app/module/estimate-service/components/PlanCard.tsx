import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { PlanOption } from "../lib/types";

interface PlanCardProps {
  plan: PlanOption;
  field: any;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
  }).format(price);
};

// Helper function to determine period based on plan name
const getPeriodText = (planName: string): string => {
  // if (planName.includes("Weekly")) return "/week";
  // if (planName.includes("Monthly")) return "/month";
  return "/clean";
};

export function PlanCard({ plan, field }: PlanCardProps) {
  // Generate features based on plan type
  const getFeatures = (planName: string): string[] => {    
    const baseFeatures = ["Room Cleaning", "Bathroom Cleaning"];

    if (planName.includes("Weekly")) {
      return [...baseFeatures, "Weekly Schedule", "Priority Booking"];
    }

    if (planName.includes("Monthly")) {
      return [...baseFeatures, "Monthly Schedule", "Flexible Dates"];
    }

    if (planName.includes("Bi-Weekly")) {
      return [...baseFeatures, "Bi-Weekly Schedule", "Consistent Cleaners"];
    }

    return [...baseFeatures, "One-time Service", "Flexible Scheduling"];
  };

  const features = getFeatures(plan.title);
  const periodText = getPeriodText(plan.title);
  const formattedPrice = formatPrice(plan.finalPrice);

  return (
    <div className="h-full">
      <Label
        htmlFor={plan.recurringTypeId}
        className="cursor-pointer block h-full"
      >
        <Card
          className={cn(
            "h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg border-2",
            // plan.isPopular ? "border-[#27AE60]" : "border-gray-200",
            field.value === plan.recurringTypeId
              ? "ring-2 ring-primary bg-primary/25"
              : ""
          )}
        >
          {/* {plan.isPopular && (
            <div className="bg-[#27AE60] text-white py-2 text-center w-full">
              Instant Booking
            </div>
          )} */}
          <CardContent
            className={cn(
              "p-6 flex-1 flex flex-col"
              // plan.isPopular ? "" : "pt-8"
            )}
          >
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">
                {formatPrice(plan.finalPrice)}
              </span>
              <span className="text-gray-600 ml-1">{periodText}</span>
            </div>
            {plan.discountPercent > 0 && (
              <div className="mb-4 text-[#27AE60] text-sm font-medium">
                {plan.discountPercent}% discount applied
              </div>
            )}
            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

            <div className="space-y-3 mb-6 flex-grow">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Check className="h-3 w-3 text-[#27AE60]" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={() => {
                field.onChange(plan.recurringTypeId);
              }}
              className={cn(
                "w-full mt-auto cursor-pointer",
                field.value === plan.recurringTypeId
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "bg-white border text-primary hover:text-white"
              )}
            >
              {field.value === plan.recurringTypeId
                ? "Selected"
                : "Choose Plan"}
            </Button>
            <RadioGroupItem
              value={plan.recurringTypeId}
              id={plan.recurringTypeId}
              className="sr-only"
            />
          </CardContent>
        </Card>
      </Label>
    </div>
  );
}

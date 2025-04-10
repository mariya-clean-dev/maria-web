"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WeekOfMonth } from "../lib/types";
import { WEEKS_OF_MONTH } from "../lib/constants";

interface WeekSelectorProps {
  selectedWeek: WeekOfMonth | null;
  onSelect: (week: WeekOfMonth) => void;
  hasError?: boolean;
}

export function WeekSelector({
  selectedWeek,
  onSelect,
  hasError = false,
}: WeekSelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className={cn("font-medium", hasError && "text-red-500")}>
        Select a week of the month for your service
        {hasError && <span className="text-red-500 ml-1">*</span>}
      </h4>
      <div className="flex flex-wrap gap-2">
        {WEEKS_OF_MONTH.map((week) => (
          <Button
            key={week}
            type="button"
            variant={selectedWeek === week ? "default" : "outline"}
            className={cn(
              selectedWeek === week ? "bg-[#19A4C6]" : "",
              hasError && !selectedWeek && "border-red-500"
            )}
            onClick={() => onSelect(week)}
          >
            {week}
          </Button>
        ))}
      </div>
    </div>
  );
}

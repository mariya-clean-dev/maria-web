"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DayOfWeek } from "../lib/types";
import { DAYS_OF_WEEK } from "../lib/constants";

interface DaySelectorProps {
  selectedDay: DayOfWeek | null;
  onSelect: (day: DayOfWeek) => void;
  hasError?: boolean;
}

export function DaySelector({
  selectedDay,
  onSelect,
  hasError = false,
}: DaySelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className={cn("font-medium", hasError && "text-red-500")}>
        Select day of the week
        {hasError && <span className="text-red-500 ml-1">*</span>}
      </h4>
      <div className="flex flex-wrap gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <Button
            key={day}
            type="button"
            variant={selectedDay === day ? "default" : "outline"}
            className={cn(
              selectedDay === day ? "bg-[#19A4C6]" : "",
              hasError && !selectedDay && "border-red-500"
            )}
            onClick={() => onSelect(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}

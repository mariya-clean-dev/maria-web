"use client";
import { WEEKS_OF_MONTH } from "@/app/module/estimate-service/lib/constants";
import { WeekOfMonth } from "@/app/module/estimate-service/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeekSelectorProps {
  selectedWeek: WeekOfMonth | null;
  onSelect: (week: WeekOfMonth) => void;
  hasError?: boolean;
  currentWeek?: number; // Add this prop to track the current week
}

export function WeekSelector({
  selectedWeek,
  onSelect,
  hasError = false,
  currentWeek = 0,
}: WeekSelectorProps) {
  // Helper function to determine if a week should be disabled
  const isWeekDisabled = (week: string): boolean => {
    if (!currentWeek) return false;

    // Get the week number from the week name
    const weekMap: Record<string, number> = {
      "First Week": 1,
      "Second Week": 2,
      "Third Week": 3,
      "Fourth Week": 4,
      "Week 1": 1,
      "Week 2": 2,
      "Week 3": 3,
      "Week 4": 4,
    };

    const weekNumber = weekMap[week] || 0;

    // Disable the week if it's earlier than the current week
    return weekNumber < currentWeek;
  };

  return (
    <div className="space-y-4">
      <h4 className={cn("font-medium", hasError ? "text-red-500" : "")}>
        Select a week of the month for your service
        {hasError && <span className="text-red-500 ml-1">*</span>}
      </h4>
      <div className="flex flex-wrap gap-2">
        {WEEKS_OF_MONTH.map((week) => {
          const disabled = isWeekDisabled(week);
          return (
            <Button
              key={week}
              type="button"
              variant={selectedWeek === week ? "default" : "outline"}
              className={cn(
                selectedWeek === week ? "bg-[#19A4C6]" : "",
                hasError && !selectedWeek && "border-red-500 border-2",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !disabled && onSelect(week)}
              disabled={disabled}
            >
              {week}
            </Button>
          );
        })}
      </div>
      {currentWeek > 0 && (
        <p className="text-sm text-gray-500">
          You can only select the current week or later weeks.
        </p>
      )}
    </div>
  );
}

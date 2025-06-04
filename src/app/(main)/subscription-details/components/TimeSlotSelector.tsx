"use client";
import type { TimeSlot } from "@/app/module/estimate-service/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTimeSlotList from "@/queries/useTimeSlotList";
import { formatTime } from "@/services/heplerFunctions";
import { Loader2 } from "lucide-react";

interface TimeSlotSelectorProps {
  selectedTimeSlot: TimeSlot | null;
  onSelect: (time: TimeSlot) => void;
  hasError?: boolean;
  selectedDate: Date | undefined;
}

export function TimeSlotSelector({
  selectedTimeSlot,
  onSelect,
  hasError = false,
  selectedDate,
}: TimeSlotSelectorProps) {
  const dateParam = selectedDate
    ? `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : null;

  // Fetch time slots from API with the selected date
  const { data, isLoading, isError, error } = useTimeSlotList(null, dateParam);

  // If date is not selected yet, show a message
  if (!selectedDate) {
    return (
      <div className="space-y-4">
        <h4 className={cn("font-medium", hasError ? "text-red-500" : "")}>
          Select time slot for your service
          {hasError && <span className="text-red-500 ml-1">*</span>}
        </h4>
        <div className="p-2 bg-gray-50 rounded-md text-center text-gray-500">
          Please select a date first to view available time slots
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h4 className="font-medium">Loading available time slots...</h4>
        <div className="flex justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#19A4C6]" />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-red-500">Error loading time slots</h4>
        <div className="p-4 bg-red-50 rounded-md text-center text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load time slots. Please try again."}
        </div>
      </div>
    );
  }

  // If no data or empty data
  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="space-y-4">
        <h4 className="font-medium">Select time slot for your service</h4>
        <div className="p-4 bg-gray-50 rounded-md text-center text-gray-500">
          No time slots available for the selected date
        </div>
      </div>
    );
  }

  // Group time slots into rows of 4 for better display
  const timeSlotRows: Array<typeof data.data> = [];
  for (let i = 0; i < data.data.length; i += 4) {
    timeSlotRows.push(data.data.slice(i, i + 4));
  }

  return (
    <div className="space-y-2">
      <h4 className={cn("font-medium", hasError ? "text-red-500" : "")}>
        Select time slot for your service
        {hasError && <span className="text-red-500 ml-1">*</span>}
      </h4>
      <div className="space-y-1">
        {timeSlotRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-2">
            {row.map((slot, colIndex) => {
              const formattedTime = formatTime(slot.time);              
              return (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!slot.isAvailable}
                  className={cn(
                    "text-xs h-10 px-2",
                    !slot.isAvailable
                      ? "bg-[#FFDAD6] text-[#E53935] border-[#E53935] opacity-70 cursor-not-allowed"
                      : selectedTimeSlot === slot.time
                      ? "bg-[#19A4C6] text-white border-[#19A4C6]"
                      : "",
                    hasError && !selectedTimeSlot && slot.isAvailable && ""
                  )}
                  onClick={() => {
                    if (slot.isAvailable) {
                      onSelect(slot.time);
                    }
                  }}
                >
                  {slot.time}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

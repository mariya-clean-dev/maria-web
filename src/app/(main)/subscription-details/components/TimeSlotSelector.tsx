"use client";
import { TimeSlot } from "@/app/module/estimate-service/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTimeSlotList from "@/queries/useTimeSlotList";
import { formatTime } from "@/services/heplerFunctions";
import { Loader2 } from "lucide-react";

import { useEffect } from "react";

interface TimeSlotSelectorProps {
  selectedTimeSlot: TimeSlot | null;
  onSelect: (time: TimeSlot) => void;
  hasError?: boolean;
  weekOfMonth: string | null;
  dayOfWeek: string | null;
}

export function TimeSlotSelector({
  selectedTimeSlot,
  onSelect,
  hasError = false,
  weekOfMonth,
  dayOfWeek,
}: TimeSlotSelectorProps) {
  // Fetch time slots from API
  const { data, isLoading, isError, error } = useTimeSlotList(
    // weekOfMonth,
    dayOfWeek
  );

  // When time slots are loaded, check if the selectedTimeSlot matches any of them
  useEffect(() => {
    if (data?.data && selectedTimeSlot) {
      // Convert the selectedTimeSlot from 12-hour format to 24-hour format for comparison
      const selectedTime24h = selectedTimeSlot.replace(
        /(\d+):(\d+)(am|pm)/,
        (_, hours, minutes, period) => {
          let hour = Number.parseInt(hours, 10);
          if (period === "pm" && hour < 12) hour += 12;
          if (period === "am" && hour === 12) hour = 0;
          return `${hour.toString().padStart(2, "0")}:${minutes}`;
        }
      );

      console.log("Selected time (24h):", selectedTime24h);

      // Find the matching time slot in the API response
      const matchingTimeSlot = data.data.find(
        (slot) => slot.time === selectedTime24h
      );

      if (matchingTimeSlot && matchingTimeSlot.isAvailable) {
        // If found and available, format it and set as selected
        const formattedTime = formatTime(matchingTimeSlot.time);
        console.log("Found matching time slot:", formattedTime);
        onSelect(formattedTime);
      } else if (matchingTimeSlot) {
        console.log("Found matching time slot but it's not available");
      } else {
        console.log("No matching time slot found for:", selectedTime24h);
      }
    }
  }, [data, selectedTimeSlot, onSelect]);

  // If week or day is not selected yet, show a message
  if (!weekOfMonth || !dayOfWeek) {
    return (
      <div className="space-y-4">
        <h4 className={cn("font-medium", hasError ? "text-red-500" : "")}>
          Select time slot for your service
          {hasError && <span className="text-red-500 ml-1">*</span>}
        </h4>
        <div className="p-4 bg-gray-50 rounded-md text-center text-gray-500">
          Please select week and day first to view available time slots
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
          No time slots available for the selected day
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
    <div className="space-y-4">
      <h4 className={cn("font-medium", hasError ? "text-red-500" : "")}>
        Select time slot for your service
        {hasError && <span className="text-red-500 ml-1">*</span>}
      </h4>
      <div className="space-y-2">
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
                      : selectedTimeSlot === formattedTime
                      ? "bg-[#19A4C6] text-white border-[#19A4C6]"
                      : "",
                    hasError &&
                      !selectedTimeSlot &&
                      slot.isAvailable &&
                      "border-red-500 border-2"
                  )}
                  onClick={() => {
                    if (slot.isAvailable) {
                      onSelect(formattedTime);
                    }
                  }}
                >
                  {formattedTime}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

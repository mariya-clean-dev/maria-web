"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  DayOfWeek,
  TimeSlot,
  WeekOfMonth,
} from "@/app/module/estimate-service/lib/types";
import {
  formatDayOfWeek,
  formatTime,
  formatWeekOfMonth,
} from "@/services/heplerFunctions";
import { WeekSelector } from "./WeekSelector";
import { DaySelector } from "./DaySelector";
import { TimeSlotSelector } from "./TimeSlotSelector";

interface DateEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onUpdate: (
    bookingId: string,
    weekOfMonth: number,
    dayOfWeek: number,
    time: string
  ) => void;
}

export function DateEditDialog({
  isOpen,
  onClose,
  booking,
  onUpdate,
}: DateEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with the current upcoming date values
  const [selectedWeek, setSelectedWeek] = useState<WeekOfMonth | null>(
    booking?.nextMonthSchedule
      ? (formatWeekOfMonth(
          booking.nextMonthSchedule.weekOfMonth
        ) as WeekOfMonth)
      : null
  );

  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(
    booking?.nextMonthSchedule
      ? (formatDayOfWeek(booking.nextMonthSchedule.dayOfWeek) as DayOfWeek)
      : null
  );

  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(
    booking?.nextMonthSchedule
      ? formatTime(booking.nextMonthSchedule.time)
      : null
  );

  // Reset selections when booking changes or when dialog opens
  useEffect(() => {
    if (booking?.nextMonthSchedule) {
      // Convert the numeric week to the string format expected by the selector
      const weekString = formatWeekOfMonth(
        booking.nextMonthSchedule.weekOfMonth
      );
      const dayString = formatDayOfWeek(booking.nextMonthSchedule.dayOfWeek);
      const timeString = formatTime(booking.nextMonthSchedule.time);

      console.log("Setting selected week:", weekString);
      console.log("Setting selected day:", dayString);
      console.log("Setting selected time:", timeString);

      // Make sure these are properly cast to the expected types
      setSelectedWeek(weekString as WeekOfMonth);
      setSelectedDay(dayString as DayOfWeek);
      setSelectedTime(timeString);
    }
  }, [booking, isOpen]); // Add isOpen to dependencies to ensure values are reset when dialog opens

  // Update handleSubmit to use the selected values
  const handleSubmit = async () => {
    if (!selectedWeek || !selectedDay || !selectedTime) {
      setError("Please select week, day and time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert the selected values back to the format expected by the API
      const weekNumber = booking.nextMonthSchedule.weekOfMonth;
      const dayNumber = booking.nextMonthSchedule.dayOfWeek;

      // Convert the selected time from 12-hour format to 24-hour format
      const time24h = selectedTime.replace(
        /(\d+):(\d+)(am|pm)/,
        (_, hours, minutes, period) => {
          let hour = Number.parseInt(hours, 10);
          if (period === "pm" && hour < 12) hour += 12;
          if (period === "am" && hour === 12) hour = 0;
          return `${hour.toString().padStart(2, "0")}:${minutes}`;
        }
      );

      console.log(booking);

      // Call the update function
      await onUpdate(
        booking.nextMonthSchedule.id,
        weekNumber,
        dayNumber,
        time24h
      );
    } catch (err) {
      console.error("Error updating date:", err);
      setError("Failed to update date. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Service Date</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          {/* Week of Month Selection */}
          <WeekSelector
            selectedWeek={selectedWeek}
            onSelect={setSelectedWeek}
            hasError={!selectedWeek}
            currentWeek={booking?.nextMonthSchedule?.weekOfMonth || 0}
          />

          {/* Day of Week Selection */}
          <DaySelector
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
            hasError={!selectedDay}
          />

          {/* Time Slot Selection */}
          <TimeSlotSelector
            selectedTimeSlot={selectedTime}
            onSelect={setSelectedTime}
            hasError={!selectedTime}
            weekOfMonth={selectedWeek}
            dayOfWeek={selectedDay}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#19A4C6] hover:bg-[#19A4C6]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

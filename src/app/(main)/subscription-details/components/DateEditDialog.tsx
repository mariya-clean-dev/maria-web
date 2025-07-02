"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";
import type { TimeSlot } from "@/app/module/estimate-service/lib/types";
import { TimeSlotSelector } from "./TimeSlotSelector";

interface DateEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  onUpdate: (bookingId: string, date: string, time: string) => void;
}

export function DateEditDialog({
  isOpen,
  onClose,
  booking,
  onUpdate,
}: DateEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

  // Calculate disabled dates (past dates and next 3 days)
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < today) {
      return true;
    }

    // Disable next 3 days
    if (date <= threeDaysFromNow) {
      return true;
    }

    return false;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Reset selected time when date changes
    setSelectedTime(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert selected date to ISO format
      const isoDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

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

      // Call the update function
      await onUpdate(booking.id, isoDate, time24h);
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

          {/* Date Selection */}
          <div className="space-y-4">
            <h4 className="font-medium">
              Select service date
              <span className="text-red-500 ml-1">*</span>
            </h4>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-md border"
              />
            </div>
          </div>

          {/* Time Slot Selection */}
          <TimeSlotSelector
            selectedTimeSlot={selectedTime}
            onSelect={setSelectedTime}
            hasError={!selectedTime}
            selectedDate={selectedDate}
            totalDuration={booking.durationMins}
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

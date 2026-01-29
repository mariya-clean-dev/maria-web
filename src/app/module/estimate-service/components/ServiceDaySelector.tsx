"use client";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type {
  ServiceDay,
  // WeekOfMonth,
  DayOfWeek,
  TimeSlot,
} from "../lib/types";
import { WeekSelector } from "./WeekSelector";
import { DaySelector } from "./DaySelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

interface ServiceDaySelectorProps {
  dayIndex: number;
  dayKey: string;
  serviceDay: ServiceDay;
  isDialogOpen: boolean;
  hasError?: boolean;
  onDialogOpenChange: (isOpen: boolean) => void;
  onServiceDaySelect: (
    dayKey: string,
    field: "selectedDate" | "timeSlot",
    value: Date | TimeSlot | null
  ) => void;
  totalDuration: number | null;
  selectedPlanId: string | null;
}

export function ServiceDaySelector({
  dayIndex,
  dayKey,
  serviceDay,
  isDialogOpen,
  hasError = false,
  onDialogOpenChange,
  onServiceDaySelect,
  totalDuration,
  selectedPlanId,
}: ServiceDaySelectorProps) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(
    serviceDay.selectedDate ? new Date(serviceDay.selectedDate) : undefined
  );

  useEffect(() => {
    setSelectedCalendarDate(serviceDay.selectedDate ? new Date(serviceDay.selectedDate) : undefined);
  }, [serviceDay.selectedDate]);

  // Check what's missing in the service day selection
  const getMissingSelections = () => {
    const missing = [];
    // if (!serviceDay.weekOfMonth) missing.push("week");
    if (!selectedCalendarDate) missing.push("date");
    if (!serviceDay.timeSlot) missing.push("time");
    return missing;
  };

  const missingSelections = getMissingSelections();
  const isComplete = missingSelections.length === 0;

  // Handler for calendar date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedCalendarDate(date);
    onServiceDaySelect(dayKey, "selectedDate", date || null); // Pass date to parent
  };

  // Function to disable dates
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start from tomorrow

    const twentyTwoDaysFromTomorrow = new Date(tomorrow);
    twentyTwoDaysFromTomorrow.setDate(tomorrow.getDate() + 21); // 21 days after tomorrow makes it 22 days inclusive

    // Check if the date is before tomorrow or after 22 days from tomorrow
    return date < tomorrow || date > twentyTwoDaysFromTomorrow;
  };

    const getNextServiceDay = () => {
    if (!selectedCalendarDate) return null;

    const nextDate = new Date(selectedCalendarDate);
    if (selectedPlanId === "61e437e4-8397-4cff-972c-3a9047dfba0e") {
      nextDate.setDate(selectedCalendarDate.getDate() + 7);
      return nextDate;
    } else if (selectedPlanId === "152445a3-a9eb-48f8-9b9a-113de83c2504") {
      nextDate.setDate(selectedCalendarDate.getDate() + 14);
      return nextDate;
    }
    return null;
  };

  const nextServiceDay = getNextServiceDay();

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Card
          className={cn(
            "cursor-pointer transition-colors h-10 flex items-start justify-center bg-[#FAFAF9] shadow-none border-none",
            hasError
              ? "border-red-500 hover:border-red-600"
              : "hover:border-[#17A5C6]",
            isComplete && "border-[#17A5C6]/50"
          )}
        >
          <CardContent className="p-2 flex items-center h-full">
            {hasError ? (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            ) : (
              <CalendarIcon className="h-5 w-5 text-[#17A5C6] mr-2" />
            )}

            {/* <h4 className="font-medium text-lg">
              Choose Day {dayIndex + 1}
            </h4> */}

            {isComplete ? (
              <div className="text-sm text-gray-600 text-center">
                <p>
                  {selectedCalendarDate
                    ? selectedCalendarDate.toLocaleDateString("en-US")
                    : "N/A"}
                    {" - "}
                    {serviceDay.timeSlot}
                </p>
              </div>
            ) : (
              <>
                {/* <p className="text-sm text-gray-500">
                  {hasError ? "Selection required" : "Click to select"}
                </p> */}
                {hasError && (
                  <p className="text-xs text-red-500">
                    Please select {missingSelections.join(", ")}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select Service Day </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Week of Month Selection */}
          {/* <WeekSelector
            selectedWeek={serviceDay.weekOfMonth}
            onSelect={(week) => onServiceDaySelect("weekOfMonth", week)}
            hasError={hasError && !serviceDay.weekOfMonth}
          /> */}

          {/* Day of Week Selection */}
          <div className="space-y-4">
            <p className="text-sm text-red-500 text-center mb-2">
              * This selected date determines the fixed day of the week for recurring plans.
            </p>
            <h4 className={cn("font-medium", hasError && !selectedCalendarDate && "text-red-500")}>
              Select a date
              {hasError && !selectedCalendarDate && <span className="text-red-500 ml-1">*</span>}
            </h4>
            <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedCalendarDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border mx-auto"
            />
            </div>
            {nextServiceDay && (
              <p className="text-sm text-gray-600 text-center mt-2">
                Next Service Day: {nextServiceDay.toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Time Slot Selection */}
          <TimeSlotSelector
            selectedTimeSlot={serviceDay.timeSlot}
            onSelect={(time) => onServiceDaySelect(dayKey, "timeSlot", time)}
            hasError={hasError && !serviceDay.timeSlot}
            dayOfWeek={serviceDay.dayOfWeek}
            selectedDate={selectedCalendarDate}
            totalDuration={totalDuration}
            selectedPlanId={selectedPlanId} 
          />

          {/* Save Button */}
          <Button
            type="button"
            className={cn(
              "w-full",
              isComplete ? "bg-[#19A4C6]" : "bg-[#19A4C6]/70"
            )}
            onClick={() => onDialogOpenChange(false)}
            disabled={!isComplete}
          >
            {isComplete ? "Save" : "Please complete all selections"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

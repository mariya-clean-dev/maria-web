"use client";
import { Calendar, AlertCircle } from "lucide-react";
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

interface ServiceDaySelectorProps {
  dayIndex: number;
  dayKey: string;
  serviceDay: ServiceDay;
  isDialogOpen: boolean;
  hasError?: boolean;
  onDialogOpenChange: (isOpen: boolean) => void;
  onServiceDaySelect: (
    field: "dayOfWeek" | "timeSlot",
    value: DayOfWeek | TimeSlot
  ) => void;
}

export function ServiceDaySelector({
  dayIndex,
  dayKey,
  serviceDay,
  isDialogOpen,
  hasError = false,
  onDialogOpenChange,
  onServiceDaySelect,
}: ServiceDaySelectorProps) {
  // Check what's missing in the service day selection
  const getMissingSelections = () => {
    const missing = [];
    // if (!serviceDay.weekOfMonth) missing.push("week");
    if (!serviceDay.dayOfWeek) missing.push("day");
    if (!serviceDay.timeSlot) missing.push("time");
    return missing;
  };

  const missingSelections = getMissingSelections();
  const isComplete = missingSelections.length === 0;

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Card
          className={cn(
            "cursor-pointer transition-colors h-full",
            hasError
              ? "border-red-500 hover:border-red-600"
              : "hover:border-[#27AE60]",
            isComplete && "border-[#27AE60]/50"
          )}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[150px]">
            {hasError ? (
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            ) : (
              <Calendar className="h-8 w-8 text-[#27AE60] mb-2" />
            )}

            <h4 className="font-medium text-lg mb-1">
              Choose Day {dayIndex + 1}
            </h4>

            {isComplete ? (
              <div className="text-sm text-gray-600 text-center">
                {/* <p className="font-medium">{serviceDay.weekOfMonth}</p> */}
                <p>{serviceDay.dayOfWeek}</p>
                <p>{serviceDay.timeSlot}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  {hasError ? "Selection required" : "Click to select"}
                </p>
                {hasError && (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    Please select {missingSelections.join(", ")}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Service Day {dayIndex + 1}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Week of Month Selection */}
          {/* <WeekSelector
            selectedWeek={serviceDay.weekOfMonth}
            onSelect={(week) => onServiceDaySelect("weekOfMonth", week)}
            hasError={hasError && !serviceDay.weekOfMonth}
          /> */}

          {/* Day of Week Selection */}
          <DaySelector
            selectedDay={serviceDay.dayOfWeek}
            onSelect={(day) => onServiceDaySelect("dayOfWeek", day)}
            hasError={hasError && !serviceDay.dayOfWeek}
          />

          {/* Time Slot Selection */}
          <TimeSlotSelector
            selectedTimeSlot={serviceDay.timeSlot}
            onSelect={(time) => onServiceDaySelect("timeSlot", time)}
            hasError={hasError && !serviceDay.timeSlot}
            dayOfWeek={serviceDay.dayOfWeek}
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

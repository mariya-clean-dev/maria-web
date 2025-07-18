"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DayOfWeek, TimeSlot } from "../lib/types";
import { TimeSlotSelector } from "@/app/(main)/subscription-details/components/TimeSlotSelector";

export const getDayNumberFromDate = (date: Date): DayOfWeek => {
    const day = date.getDay();
    return String(day === 0 ? 7 : day) as DayOfWeek;
};

interface OneTimeServiceDateSelectorProps {
    dayIndex: number;
    dayKey: string;
    serviceDay: {
        selectedDate?: Date | null;
        timeSlot: TimeSlot | null;
    };
    isDialogOpen: boolean;
    hasError?: boolean;
    onDialogOpenChange: (isOpen: boolean) => void;
    onServiceDaySelect: (
        dayKey: string,
        field: "selectedDate" | "timeSlot",
        value: Date | TimeSlot | null
    ) => void;
      totalDuration: number | null;
}

export function OneTimeServiceDateSelector({
    dayIndex,
    dayKey,
    serviceDay,
    isDialogOpen,
    hasError = false,
    onDialogOpenChange,
    onServiceDaySelect,
      totalDuration,
}: OneTimeServiceDateSelectorProps) {
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (serviceDay.selectedDate && !selectedCalendarDate) {
            setSelectedCalendarDate(new Date());
        }
    }, [serviceDay.selectedDate, selectedCalendarDate]);

    useEffect(() => {
        // console.log("Selected Calendar Date:", selectedCalendarDate);
    }, [selectedCalendarDate]);

    const getMissingSelections = () => {
        const missing = [];
        if (!selectedCalendarDate) missing.push("date");
        if (!serviceDay.timeSlot) missing.push("time");
        return missing;
    };

    const missingSelections = getMissingSelections();
    const isComplete = missingSelections.length === 0;

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedCalendarDate(date);
        if (date) {
            onServiceDaySelect(dayKey, "selectedDate", date);
        } else {
            onServiceDaySelect(dayKey, "selectedDate", null);
            onServiceDaySelect(dayKey, "timeSlot", null);
        }
    };

    const handleTimeSelect = (time: TimeSlot) => {
        onServiceDaySelect(dayKey, "timeSlot", time);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate());
    threeDaysFromNow.setHours(23, 59, 59, 999);

    const isDateDisabled = (date: Date) => {
        if (date < today) {
            return true;
        }
        if (date <= threeDaysFromNow) {
            return true;
        }
        return false;
    };

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
                            <CalendarIcon className="h-8 w-8 text-[#27AE60] mb-2" />
                        )}

                        <h4 className="font-medium text-lg mb-1">
                            Choose Date & Time
                        </h4>

                        {isComplete ? (
                            <div className="text-sm text-gray-600 text-center">
                                {selectedCalendarDate && (
                                    <p className="font-medium">{format(selectedCalendarDate, "PPP")}</p>
                                )}
                                <p>{serviceDay.timeSlot}</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500">
                                    {hasError ? "Selection required" : "Click to select"}
                                </p>
                                {hasError && (
                                    <p className="text-xs text-red-500 mt-1 text-center">
                                        Please select {missingSelections.join(" and ")}
                                    </p>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Select Service Date & Time</DialogTitle>
                </DialogHeader>
                <div className="space-y-1 py-1">
                    {/* Date Selection using Calendar */}
                    <div className="space-y-4">
                        <h4 className={cn("font-medium", hasError && !selectedCalendarDate && "text-red-500")}>
                            Select a specific date
                            {hasError && !selectedCalendarDate && <span className="text-red-500 ml-1">*</span>}
                        </h4>
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedCalendarDate}
                                onSelect={handleDateSelect}
                                disabled={isDateDisabled}
                                className="rounded-md border"
                            />
                        </div>
                    </div>

                    {/* Time Slot Selection */}
                    <TimeSlotSelector
                        selectedTimeSlot={serviceDay.timeSlot}
                        onSelect={handleTimeSelect}
                        hasError={hasError && !serviceDay.timeSlot}
                        selectedDate={selectedCalendarDate} // Pass the derived dayOfWeek
                        totalDuration={totalDuration}
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
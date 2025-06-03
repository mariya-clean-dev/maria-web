import axiosInstance from "@/services/axios";
import { dayOfWeekToNumber } from "@/services/heplerFunctions";
import { useQuery } from "@tanstack/react-query";

export interface TimeSlotResponse {
  status: boolean;
  message: string;
  data: Array<{
    time: string;
    isAvailable: boolean;
  }>;
}

const fetchTimeSlot = async (dayOfWeek?: number, date?: string) => {
  const params: Record<string, any> = {};

  // Only add dayOfWeek if it's a valid number and no date is provided
  if (dayOfWeek !== undefined && dayOfWeek >= 0 && !date) {
    params.dayOfWeek = dayOfWeek;
  }

  // Only add date if it's provided and no valid dayOfWeek
  if (date && (dayOfWeek === undefined || dayOfWeek < 0)) {
    params.date = date;
  }

  const response = await axiosInstance.get(`/scheduler/time-slots`, {
    params,
  });
  return response?.data as TimeSlotResponse;
};

const useTimeSlotList = (
  dayOfWeek: string | null = null,
  date: string | null = null
) => {
  // Only convert dayOfWeek if it's not null
  const dayNumber = dayOfWeek ? dayOfWeekToNumber(dayOfWeek) : -1;

  // Determine which parameter is valid
  const hasValidDayOfWeek = dayOfWeek !== null && dayNumber >= 0;
  const hasValidDate = date !== null && date.length > 0;

  return useQuery({
    queryKey: [
      "time-slot-list",
      hasValidDayOfWeek ? dayNumber : null,
      hasValidDate ? date : null,
    ],
    queryFn: () =>
      fetchTimeSlot(
        hasValidDayOfWeek ? dayNumber : undefined,
        hasValidDate ? date : undefined
      ),
    // Enable only if we have either a valid dayOfWeek OR a valid date, but not both
    enabled: hasValidDayOfWeek || hasValidDate,
  });
};

export default useTimeSlotList;

import axiosInstance from "@/services/axios";
import {
  dayOfWeekToNumber,
  weekOfMonthToNumber,
} from "@/services/heplerFunctions";
import { useQuery } from "@tanstack/react-query";

export interface TimeSlotResponse {
  status: boolean;
  message: string;
  data: Array<{
    time: string;
    isAvailable: boolean;
  }>;
}

const fetchTimeSlot = async ( dayOfWeek: number) => {
  const response = await axiosInstance.get(`/scheduler/time-slots`, {
    params: {
      // weekOfMonth: weekOfMonth,
      dayOfWeek: dayOfWeek,
    },
  });
  return response?.data as TimeSlotResponse;
};

const useTimeSlotList = (
  // weekOfMonth: string | null,
  dayOfWeek: string | null
) => {
  // const weekNumber = weekOfMonthToNumber(weekOfMonth);
  const dayNumber = dayOfWeekToNumber(dayOfWeek);

  return useQuery({
    queryKey: ["time-slot-list", dayNumber],
    queryFn: () => fetchTimeSlot( dayNumber),
    enabled: dayNumber >= 0,
  });
};

export default useTimeSlotList;

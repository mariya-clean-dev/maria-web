import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

const updateSchedule = async (payload: any) => {
  const { bookingId, ...rest } = payload;
  const response = await axiosInstance.patch(
    `/scheduler/reschedule/${bookingId}`,
    rest
  );
  return response.data;
};

export const useUpdateSchedule = () => {
  return useMutation({ mutationFn: updateSchedule });
};

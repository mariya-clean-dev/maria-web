import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

type EstimateCalculatePayload = {
  service_id: string;
  no_of_rooms: number;
  no_of_bathrooms: number;
  square_feet: number;
};

const estimateCalculation = async (payload: EstimateCalculatePayload) => {
  const response = await axiosInstance.post(
    `/services/price-estimate`,
    payload
  );
  return response.data;
};

export const useEstimateCalculation = () => {
  return useMutation({ mutationFn: estimateCalculation });
};

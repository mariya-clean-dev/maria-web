import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

interface EstimateInitPayload {
  name: string;
  email: string;
  pincode: string;
}

interface EstimateInitResponse {
  status: boolean;
  message: string;
  data: {
    success: boolean;
  };
}

const checkPincode = async (
  payload: EstimateInitPayload
): Promise<EstimateInitResponse> => {
  const response = await axiosInstance.post(
    "/users/check-pincode",
    payload
  );
  return response.data;
};

export const useEstimateInit = () => {
  return useMutation({
    mutationFn: checkPincode,
  });
};

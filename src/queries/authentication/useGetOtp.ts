import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

type GetOtpPayload = {
  email: string;
};

const getOtp = async (payload: GetOtpPayload) => {
  const response = await axiosInstance.post(`/auth/otp/generate`, payload);
  return response.data;
};

export const useGetOtp = () => {
  return useMutation({ mutationFn: getOtp });
};

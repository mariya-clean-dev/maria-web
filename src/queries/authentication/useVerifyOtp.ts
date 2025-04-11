import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

const verifyOtp = async (payload: VerifyOtpPayload) => {
  const response = await axiosInstance.post(`/auth/otp/verify`, payload);
  return response.data;
};

export const useVerifyOtp = () => {
  return useMutation({ mutationFn: verifyOtp });
};

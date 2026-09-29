import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

type ValidateCouponPayload = {
  code: string;
  bookingAmount: number;
};

const validateCoupon = async (payload: ValidateCouponPayload) => {
  const response = await axiosInstance.post("/coupons/validate", payload);
  return response.data;
};

export const useValidateCoupon = () => {
  return useMutation({ mutationFn: validateCoupon });
};

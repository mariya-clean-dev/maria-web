import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

interface Address {
  street: string;
  landmark: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  specialInstructions: string;
}

interface Schedule {
  weekOfMonth: number;
  dayOfWeek: number;
  time: string;
}

interface SubscriptionRequest {
  serviceId: string;
  type: "subscription" | "instant";
  proprtyType: string;
  materialProvied: boolean;
  areaSize: number;
  isEco: boolean;
  price: number;
  subscriptionTypeId: string;
  address: Address;
  name: string;
  email: string;
  phone: string;
  schedule_1: Schedule;
  schedule_2?: Schedule;
  schedule_3?: Schedule;
  schedule_4?: Schedule;
}

const createBooking = async (payload: SubscriptionRequest) => {
  const response = await axiosInstance.post(`/bookings`, payload);
  return response.data;
};

export const useCreateBooking = () => {
  return useMutation({ mutationFn: createBooking });
};

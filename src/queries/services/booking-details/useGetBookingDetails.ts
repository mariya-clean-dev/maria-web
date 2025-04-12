import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const fetchBookingDetails = async () => {
  const response = await axiosInstance.get(`/bookings`);
  return response?.data;
};

const useGetBookingDetails = () => {
  return useQuery({
    queryKey: ["booking-details"],
    queryFn: () => fetchBookingDetails(),
  });
};

export default useGetBookingDetails;

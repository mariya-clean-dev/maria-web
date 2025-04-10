import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const fetchServices = async () => {
  const response = await axiosInstance.get(`/services`);
  return response?.data;
};

const useListServices = () => {
  return useQuery({
    queryKey: ["list-services"],
    queryFn: () => fetchServices(),
  });
};

export default useListServices;

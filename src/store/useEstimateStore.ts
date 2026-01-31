import { create } from "zustand";

interface EstimateValues {
  homeSize: string;
  cleaningType: string;
  propertyType: string;
  rooms: number;
  bathrooms: number;
  ecoFriendly: boolean;
  materialsProvided: boolean;
}

interface EstimateUserInfo {
  name: string;
  email: string;
  pincode: string;
}

interface EstimateStoreType {
  estimateValues: EstimateValues | null;
  setEstimateValues: (estimateValue: EstimateValues) => void;


  userInfo: EstimateUserInfo | null;
  setUserInfo: (userInfo: EstimateUserInfo) => void;
}

export const useEstimateStore = create<EstimateStoreType>((set) => ({
  estimateValues: null,
  setEstimateValues: (estimateValue) => 
    set({ estimateValues: estimateValue }),


  userInfo: null,
  setUserInfo: (userInfo) =>
    set({ userInfo }),
}));

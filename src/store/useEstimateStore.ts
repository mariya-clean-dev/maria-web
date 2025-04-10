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

interface EstimateStoreType {
  estimateValues: EstimateValues | null;
  setEstimateValues: (estimateValue: any) => void;
}

export const useEstimateStore = create<EstimateStoreType>((set) => ({
  estimateValues: null,
  setEstimateValues: (estimateValue) => set({ estimateValues: estimateValue }),
}));

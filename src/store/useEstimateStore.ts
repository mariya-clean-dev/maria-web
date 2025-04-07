import { create } from "zustand";

interface EstimateStoreType {
  estimateValues: any;
  setEstimateValues: (estimateValue: any) => void;
}

export const useEstimateStore = create<EstimateStoreType>((set) => ({
  estimateValues: null,
  setEstimateValues: (estimateValue) => set({ estimateValues: estimateValue }),
}));

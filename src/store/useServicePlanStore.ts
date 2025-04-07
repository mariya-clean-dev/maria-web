import { create } from "zustand";

interface ServicePlanStoreType {
  servicePlan: any;
  setServicePlan: (plans: any) => void;
}

export const useServicePlanStore = create<ServicePlanStoreType>((set) => ({
  servicePlan: null,
  setServicePlan: (plans) => set({ servicePlan: plans }),
}));

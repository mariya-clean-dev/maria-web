"use client";

import React, { useState,useEffect } from "react";
import CalculateServiceEstimate from "./components/CalculateServiceEstimate";
import ServicePlan from "./components/ServicePlan";
import BookingConfirmation from "./components/BookingConfirmation";
import { useRouter } from "next/navigation";
import { useEstimateStore } from "@/store/useEstimateStore";

type ViewType =
  | "estimate"
  | "plans"
  | { view: "booking"; selectedPlanId: string };


const EstimateServiceModule = () => {

  const router = useRouter();
  const { userInfo } = useEstimateStore();

  useEffect(() => {
    if (!userInfo?.pincode) {
      router.replace("/");
    }
  }, [userInfo?.pincode, router]);

  if (!userInfo?.pincode) return null;
  const [view, setView] = useState<ViewType>("estimate");
  

  return (
    <>
      {view === "estimate" && (
        <CalculateServiceEstimate setView={setView} />
      )}

      {view === "plans" && (
        <ServicePlan setView={setView} />
      )}

      {typeof view === "object" && view.view === "booking" && (
        <BookingConfirmation
          selectedPlanId={view.selectedPlanId}
          setView={setView}
        />
      )}


    </>
  );
};

export default EstimateServiceModule;

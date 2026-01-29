"use client";

import React, { useState } from "react";
import CalculateServiceEstimate from "./components/CalculateServiceEstimate";
import ServicePlan from "./components/ServicePlan";
import BookingConfirmation from "./components/BookingConfirmation";

type ViewType =
  | "estimate"
  | "plans"
  | { view: "booking"; selectedPlanId: string };


const EstimateServiceModule = () => {
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

"use client";
import React, { useState } from "react";
import CalculateServiceEstimate from "./components/CalculateServiceEstimate";
import ServicePlan from "./components/ServicePlan";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

const EstimateServiceModule = () => {
  const [estimatePageView, setEstimatePageView] = useState(true);
  return (
    <>
      {estimatePageView ? (
        <CalculateServiceEstimate setEstimatePageView={setEstimatePageView} />
      ) : (
        <>
          <ServicePlan setEstimatePageView={setEstimatePageView} />
        </>
      )}
    </>
  );
};

export default EstimateServiceModule;

"use client";
import React, { useState } from "react";
import CalculateServiceEstimate from "./components/CalculateServiceEstimate";

const EstimateServiceModule = () => {
  const [estimatePageView, setEstimatePageView] = useState(true);
  return (
    <>
      {estimatePageView ? (
        <CalculateServiceEstimate setEstimatePageView={setEstimatePageView} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Estimate Service</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setEstimatePageView(true)}
          >
            Back to Estimate
          </button>
        </div>
      )}
    </>
  );
};

export default EstimateServiceModule;

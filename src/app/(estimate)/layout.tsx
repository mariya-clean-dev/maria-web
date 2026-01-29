"use client";

import EstimateNavbar from "../EstimateNavbar/EstimateNavbar";


export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <EstimateNavbar />
      {children}
    </div>
  );
}

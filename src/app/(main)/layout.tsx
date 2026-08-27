"use client";

import Navbar from "../Navbar";
import FloatingContact from "../module/home/components/FloatingContact/FloatingContact";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <FloatingContact />
    </div>
  );
}

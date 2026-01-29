"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function PaymentFailedPage() {
  // Clear payment details on load
  useEffect(() => {
    localStorage.removeItem("paymentDetails");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Payment Failed
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        We couldn&apos;t process your payment. Please try again or contact our
        customer support for assistance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/estimate-service">
          <Button size="lg" className="bg-[#19A4C6] hover:bg-[#19A4C6]/90">
            Try Again
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="border-[#19A4C6] text-[#19A4C6] hover:bg-[#19A4C6]/10"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

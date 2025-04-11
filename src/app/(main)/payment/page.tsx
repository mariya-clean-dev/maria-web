"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PaymentForm from "./components/PaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface PaymentDetails {
  bookingId: string;
  customerId: string;
  paymentIntent: string;
  clientSecret: string;
  amount: string;
  planName: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get payment details from localStorage
    const storedDetails = localStorage.getItem("paymentDetails");

    if (!storedDetails) {
      setError("Payment details not found. Please try booking again.");
      setLoading(false);
      return;
    }

    try {
      const details = JSON.parse(storedDetails) as PaymentDetails;
      setPaymentDetails(details);
    } catch (err) {
      setError("Invalid payment details. Please try booking again.");
    }

    setLoading(false);
  }, []);

  const handleCancel = () => {
    // Clear payment details and redirect to home
    localStorage.removeItem("paymentDetails");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#19A4C6] animate-spin mb-4" />
        <h2 className="text-xl font-medium text-gray-700">
          Loading payment details...
        </h2>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-center max-w-md">
          {error || "Payment details not found"}
        </div>
        <Button
          onClick={() => router.push("/estimate-service")}
          className="bg-[#19A4C6] hover:bg-[#19A4C6]/90"
        >
          Return to Estimate
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 mb-12 text-center">
            Please provide your payment details to confirm your booking
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{paymentDetails.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    ${Number.parseFloat(paymentDetails.amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">
                    {paymentDetails.bookingId}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Enter your card information securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentDetails.clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: paymentDetails.clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#19A4C6",
                      },
                    },
                  }}
                >
                  <PaymentForm
                    clientSecret={paymentDetails.clientSecret}
                    bookingId={paymentDetails.bookingId}
                  />
                </Elements>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

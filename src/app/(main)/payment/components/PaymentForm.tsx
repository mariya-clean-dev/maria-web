"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  clientSecret: string;
  bookingId: string;
}

export default function PaymentForm({
  clientSecret,
  bookingId,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect after successful payment
        return_url: `${window.location.origin}/payment-success?bookingId=${bookingId}`,
      },
      // Only redirect if 3D Secure or other authentication is required
      redirect: "if_required",
    });

    if (error) {
      // Payment failed, show error and redirect to failure page
      setErrorMessage(
        error.message || "An error occurred while processing your payment"
      );
      setIsProcessing(false);

      // Redirect to failure page after a short delay to show the error
      setTimeout(() => {
        router.push(
          `/payment-failed?error=${encodeURIComponent(
            error.message || "Payment failed"
          )}`
        );
      }, 1500);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment succeeded, clear localStorage and redirect to confirmation page
      localStorage.removeItem("paymentDetails");
      router.push(`/payment-success?bookingId=${bookingId}`);
    } else {
      // Payment requires additional actions or is processing
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Test mode notice - only show in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-blue-50 p-3 rounded-md text-sm mb-4">
          <p className="font-medium">Test Mode</p>
          <p>Use card number: 4242 4242 4242 4242</p>
          <p>Any future expiry date and any CVC</p>
        </div>
      )}

      <PaymentElement />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#19A4C6] hover:bg-[#19A4C6]/90"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingDetails {
  bookingId: string;
  servicePlan: string;
  serviceDates: string;
  amount: string;
}

export default function BookingConfirmedPage() {
  // const searchParams = useSearchParams();

  // // Generate a random booking ID once when the component mounts
  // const [bookingId] = useState(
  //   "#" + Math.floor(Math.random() * 9000000000 + 1000000000)
  // );

  // // Get values from URL parameters or use defaults
  // const plan = searchParams.get("plan") || "Weekly Plan";
  // const amount = searchParams.get("amount") || "$140";

  // // Create booking details object with values from URL or defaults
  // const bookingDetails: BookingDetails = {
  //   bookingId,
  //   servicePlan: plan,
  //   serviceDates: "Week 1, Mon | Week 2, Fri",
  //   amount: amount,
  // };

  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Success Icon */}
              <motion.div
                className="w-24 h-24 md:w-32 md:h-32 bg-[#27AE60] rounded-full flex items-center justify-center mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Check className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>

              {/* Confirmation Title */}
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Booking Confirmed
              </motion.h1>

              {/* Confirmation Message */}
              <motion.p
                className="text-gray-600 text-lg mb-10 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                We are pleased to inform you that your booking request has been
                received and confirmed.
              </motion.p>

              {/* Booking Details Card */}
              {/* <motion.div
                className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">
                    Booking Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-medium">{bookingDetails.bookingId}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Service Plan</p>
                      <p className="font-medium">
                        {bookingDetails.servicePlan}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Service Date</p>
                      <p className="font-medium">
                        {bookingDetails.serviceDates}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">{bookingDetails.amount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-gray-600 mb-2">
                  A confirmation email has been sent to your registered email
                  address.
                </p>
                <p className="text-gray-600">
                  If you have any questions, please contact our customer
                  support.
                </p>
              </motion.div> */}

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-[#19A4C6] hover:bg-[#19A4C6]/90 min-w-[200px]"
                  >
                    Back to Home
                  </Button>
                </Link>

                {/* <Link href="/bookings">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#19A4C6] text-[#19A4C6] hover:bg-[#19A4C6]/10 min-w-[200px]"
                  >
                    View My Bookings
                  </Button>
                </Link> */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    label: "Instant Booking",
    name: "One time",
    description:
      "For companies that need to manage work happening across multiple teams.",
    price: "20",
    isPopular: true,
  },
  {
    name: "Monthly Ones",
    description:
      "For companies that need to manage work happening across multiple teams.",
    price: "100",
  },
  {
    name: "ByWeekly",
    description:
      "For companies that need to manage work happening across multiple teams.",
    price: "100",
  },
  {
    name: "Weekly",
    description:
      "For companies that need to manage work happening across multiple teams.",
    price: "100",
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-50 font-poppins">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium ">
            We offer great <span className="text-[#27AE60]">price</span> plan
            for the <br /> Services
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="relative flex flex-col mt-8"
            >
              {/* {plan.isPopular && (
                <div className="bg-[#27AE60] text-white py-2 text-center rounded-t-lg w-full -mt-8">
                  {plan.label}
                </div>
              )} */}
              {/* <div
                className={`flex-1 p-8 rounded-b-2xl ${
                  !plan.isPopular && "rounded-t-2xl"
                } transition-all duration-300 flex flex-col items-center
                  ${plan.isPopular ? "bg-[#e3f7ed]" : "bg-white "}
                `}
              > */}
              <div
                className={`flex-1 p-8 rounded-2xl  transition-all duration-300 flex flex-col items-center bg-white
                `}
              >
                <h3 className="text-2xl font-medium mb-4 text-center">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-8 text-center">
                  {plan.description}
                </p>

                {/* <div className="mb-8 text-center">
                  <span className="text-4xl font-semibold">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div> */}

                {/* <Button
                  className={`w-full ${
                    plan.isPopular
                      ? "bg-[#27AE60] hover:bg-[#27AE60]/90 text-white"
                      : "bg-white border-2 border-[#0B2110] hover:border-[#27AE60] hover:text-[#27AE60] text-black"
                  }`}
                >
                  Get Started
                </Button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

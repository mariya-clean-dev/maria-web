"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { RadioGroup } from "@/components/ui/radio-group";
import { FORM_SCHEMA, FormValues } from "../lib/schema";
import { PlanCard } from "./PlanCard";
import { Card } from "@/components/ui/card";

import { useServicePlanStore } from "@/store/useServicePlanStore";
import useCustomToast from "@/hooks/use-custom-toast";
import Stepper from "./Stepper";

export default function ServicePlan({ setView }: any) {
  const { servicePlan } = useServicePlanStore();

  const { error } = useCustomToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: { plan: "" },
  });



  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <Stepper currentStep={2} />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[900px] mx-auto"
        >
          <Card className="bg-white rounded-[40px] px-[48px] py-[48px] shadow-lg ">

            <div className="flex flex-col items-center gap-3">
             <h1 className="text-3xl md:text-4xl font-bold text-center">
              Your Estimate Results
            </h1>
            <p className="text-gray-600 text-center max-w-[550px]">This is a preliminary estimate. Final pricing may vary based on your home. We&apos;re happy to tailor our services to fit your needs.</p>
            <p className="text-[#1C1917] font-bold text-[18px] mb-4">Enjoy guaranteed best <span className="text-[#61B35C]">pricing</span> and <span className="text-[#61B35C]">flexible</span> service options.</p>

            </div>
            <Form {...form}>
              <form className="space-y-10">

                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {servicePlan?.estimates?.map((plan: any) => (
                          <PlanCard
                            key={plan.recurringTypeId}
                            plan={plan}
                            field={field}
                            onSelect={(planId: string) =>
                              setView({
                                view: "booking",
                                selectedPlanId: planId,
                              })
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

          </Card>
        </motion.div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

import type {
  ServiceDates,
  WeekOfMonth,
  DayOfWeek,
  TimeSlot,
} from "../lib/types";
import { FORM_SCHEMA, type FormValues } from "../lib/schema";
import { PLANS } from "../lib/constants";
import { PlanCard } from "./PlanCard";
import { PersonalInfoFields } from "./PersonalInfoField";
import { AddressFields } from "./AddressFields";
import { ServiceDaySelector } from "./ServiceDaySelector";
import { useServicePlanStore } from "@/store/useServicePlanStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEstimateStore } from "@/store/useEstimateStore";
import {
  dayOfWeekToNumber,
  extractAreaSize,
  weekOfMonthToNumber,
} from "@/services/heplerFunctions";
import useCustomToast from "@/hooks/use-custom-toast";
import { useCreateBooking } from "@/queries/services/useCreateBooking";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServicePlan({ setEstimatePageView }: any) {
  const router = useRouter();

  const { servicePlan } = useServicePlanStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { estimateValues } = useEstimateStore();

  const { success, error, showError } = useCustomToast();

  //API CALLS
  const { mutate: createBooking } = useCreateBooking();

  useEffect(() => {
    //CHECK IF estimate values are empty if empty then redirect to estimate page
    if (
      !estimateValues ||
      Object.keys(estimateValues).length === 0 ||
      estimateValues === null
    ) {
      setEstimatePageView(true);
      error("Please fill the estimate form first");
      return;
    }
  }, [estimateValues, setEstimatePageView, error]);

  // ======== State ========
  const [serviceDates, setServiceDates] = useState<ServiceDates>({
    "day-1": { weekOfMonth: null, dayOfWeek: null, timeSlot: null },
    "day-2": { weekOfMonth: null, dayOfWeek: null, timeSlot: null },
    "day-3": { weekOfMonth: null, dayOfWeek: null, timeSlot: null },
    "day-4": { weekOfMonth: null, dayOfWeek: null, timeSlot: null },
  });

  const [openDialogs, setOpenDialogs] = useState<{ [key: string]: boolean }>({
    "day-1": false,
    "day-2": false,
    "day-3": false,
    "day-4": false,
  });

  // Track validation errors for service days
  const [serviceDayErrors, setServiceDayErrors] = useState<{
    [key: string]: boolean;
  }>({
    "day-1": false,
    "day-2": false,
    "day-3": false,
    "day-4": false,
  });

  const paymentMethodTypes = ["offline", "online"]

  // Track if form submission was attempted
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // ======== Form Setup ========
  const form = useForm<FormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      plan: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      zipcode: "",
      landmark: "",
      paymentMethod:"",
      remark: "",
    },
  });

  const selectedPlan = form.watch("plan");
  const bookingFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPlan && bookingFormRef.current) {
      // Scroll to the booking form with a small delay to ensure animations complete
      setTimeout(() => {
        bookingFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [selectedPlan]);

  // ======== Helper Functions ========
  /**
   * Updates the service day selection for a specific day and field
   */
  const handleServiceDaySelect = (
    dayKey: string,
    field: "weekOfMonth" | "dayOfWeek" | "timeSlot",
    value: WeekOfMonth | DayOfWeek | TimeSlot
  ) => {
    setServiceDates((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value,
      },
    }));

    // Clear error for this day if it was previously marked as error
    if (serviceDayErrors[dayKey]) {
      setServiceDayErrors((prev) => ({
        ...prev,
        [dayKey]: false,
      }));
    }
  };

  /**
   * Handles opening and closing of service day selection dialogs
   */
  const handleDialogOpenChange = (dayKey: string, isOpen: boolean) => {
    setOpenDialogs((prev) => ({
      ...prev,
      [dayKey]: isOpen,
    }));
  };

  /**
   * Returns the number of service days required based on the selected plan
   */
  const getDaysRequired = (): number => {    
    if (!selectedPlan) return 0;
    const plan = servicePlan?.estimates?.find(
      (p: any) => p.recurringTypeId === selectedPlan
    );    
    switch (plan?.title) {
      case "One Time":
        return 1;
      case "Bi-Weekly":
        return 1;
      case "Weekly":
        return 1;
      default:
        return 0;
    }
  };

  /**
   * Validates service days and updates error state
   */
  const validateServiceDays = (): boolean => {
    const daysRequired = getDaysRequired();
    if (daysRequired === 0) return true;

    let isValid = true;
    const newErrors = { ...serviceDayErrors };

    for (let i = 1; i <= daysRequired; i++) {
      const dayKey = `day-${i}`;
      const day = serviceDates[dayKey];

      if (!day.dayOfWeek || !day.timeSlot) {
        newErrors[dayKey] = true;
        isValid = false;
      } else {
        newErrors[dayKey] = false;
      }
    }

    setServiceDayErrors(newErrors);
    return isValid;
  };

  /**
   * Validates and submits the form
   */
  const onSubmit = (values: FormValues) => {
    setSubmissionAttempted(true);

    // Find the selected plan
    const plan = servicePlan?.estimates?.find(
      (p: any) => p.recurringTypeId === values.plan
    );
    if (!plan) {
      alert("Please select a plan");
      return;
    }

    // Validate service dates
    const isServiceDaysValid = validateServiceDays();

    if (!isServiceDaysValid) {
      return;
    }

    const areaSize = extractAreaSize(estimateValues?.homeSize ?? "");

    // Prepare schedules
    const schedules: Record<string, any> = {};
    const daysRequired = getDaysRequired();
    let schedule: { dayOfWeek: number; time: string } | null = null;

    for (let i = 1; i <= daysRequired; i++) {
      const dayKey = `day-${i}`;
      const day = serviceDates[dayKey];

      if (day.dayOfWeek && day.timeSlot) {
        // schedules[dayKey] = {
        //   // weekOfMonth: weekOfMonthToNumber(day.weekOfMonth),
        //   dayOfWeek: dayOfWeekToNumber(day.dayOfWeek),
        //   time: day.timeSlot,
        //   // time: convertTo24HourFormat(day.timeSlot),
        // };
        schedule = {
          dayOfWeek: dayOfWeekToNumber(day.dayOfWeek),
          time: day.timeSlot,
        };        
        break;
      }
    }

    setIsSubmitting(true);

    const bookingType =
      plan.title === "One Time" ? "one_time" : "recurring";

    // Prepare the final data structure
    const bookingData = {
      serviceId: estimateValues?.cleaningType,
      type: bookingType,
      no_of_rooms: estimateValues?.rooms,
      no_of_bathrooms: estimateValues?.bathrooms,
      propertyType: estimateValues?.propertyType,
      materialProvided: estimateValues?.materialsProvided,
      areaSize: areaSize,
      isEco: estimateValues?.ecoFriendly,
      price: plan.finalPrice,
      paymentMethod: values.paymentMethod,
      recurringTypeId:
        bookingType === "one_time" ? null : plan.recurringTypeId,
      address: {
        street: values.address1,
        landmark: values.landmark || "",
        addressLine1: values.address1,
        addressLine2: values.address2 || "",
        city: values.city,
        // state: "",
        zip: values.zipcode,
        specialInstructions: values.remark || "",
      },
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      schedule,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createBooking(bookingData, {
      onSuccess: (response) => {
        const responseData = response.data;
        // if (bookingType === "recurring") {
        // For subscription, redirect to Stripe checkout URL
        if (responseData.booking.paymentMethod === "offline" || responseData.stripe === null) {
          router.push(`/payment-success?bookingId=${responseData.id}`);
          setIsSubmitting(false);

        } else {
          window.location.href = responseData.stripe.checkoutUrl;
          setIsSubmitting(false);
        }
        // } else {
        //   // For instant booking, store payment intent details and redirect to payment page
        //   localStorage.setItem(
        //     "paymentDetails",
        //     JSON.stringify({
        //       bookingId: responseData.booking.id,
        //       customerId: responseData.stripe.customerId,
        //       paymentIntent: responseData.stripe.paymentIntent,
        //       clientSecret: responseData.stripe.clientSecret,
        //       amount: responseData.booking.price,
        //       planName: plan.title,
        //     })
        //   );

        //   router.push("/payment");
        //   setIsSubmitting(false);
        // }
      },
      onError: (error) => {
        showError(error);
      },
    });
  };

  // ======== Main Render ========
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="w-full flex md:justify-start justify-center md:pl-10 items-center">
        <Button
          className="cursor-pointer flex items-center justify-center "
          variant={"default"}
          onClick={() => setEstimatePageView(true)}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Your estimates Results
          </h1>
          <p className="text-gray-600 mb-12 text-center">
            Based on your requirements, here are our recommended cleaning plans
          </p>

          {/* Pricing Plans Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              We offer great <span className="text-[#27AE60]">price</span> plan
              for the Services
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Plan Selection */}
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
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
                          />
                        ))}
                      </RadioGroup>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                {/* Booking Confirmation Section */}
                {selectedPlan && (
                  <motion.div
                    ref={bookingFormRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                      Booking Confirmation
                    </h2>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      {/* Personal Information */}
                      <PersonalInfoFields form={form} />

                      {/* Address Information */}
                      <div className="mt-6">
                        <AddressFields form={form} />
                      </div>

                      {/* Landmark */}
                      <FormField
                        control={form.control}
                        name="landmark"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel>Landmark</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter landmark near you (optional)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Payment Method */}
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel>Payment Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 w-full">
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {paymentMethodTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Service Date Selection */}
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4"> 
                          Select Service Date
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {Array.from({ length: getDaysRequired() }).map(
                            (_, index) => {
                              const dayKey = `day-${index + 1}`;
                              return (
                                <ServiceDaySelector
                                  key={dayKey}
                                  dayIndex={index}
                                  dayKey={dayKey}
                                  serviceDay={serviceDates[dayKey]}
                                  isDialogOpen={openDialogs[dayKey]}
                                  hasError={
                                    submissionAttempted &&
                                    serviceDayErrors[dayKey]
                                  }
                                  onDialogOpenChange={(isOpen) =>
                                    handleDialogOpenChange(dayKey, isOpen)
                                  }
                                  onServiceDaySelect={(field, value) =>
                                    handleServiceDaySelect(dayKey, field, value)
                                  }
                                />
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Remark */}
                      <FormField
                        control={form.control}
                        name="remark"
                        render={({ field }) => (
                          <FormItem className="mt-8">
                            <FormLabel>Additional Instructions</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide any special instructions about your location (gate codes, parking information, entry details, etc.)"
                                className="resize-none min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full mt-8 h-12 bg-[#19A4C6] hover:bg-[#19A4C6]/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Book Now"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

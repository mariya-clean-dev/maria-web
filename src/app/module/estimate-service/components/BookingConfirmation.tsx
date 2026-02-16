"use client";

import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import type {
  ServiceDates,
  WeekOfMonth,
  DayOfWeek,
  TimeSlot,
} from "../lib/types";

import { FORM_SCHEMA, FormValues } from "../lib/schema";

import { PersonalInfoFields } from "./PersonalInfoField";
import { AddressFields } from "./AddressFields";
import { OneTimeServiceDateSelector } from "./OneTimeServiceDateSelector";
import { ServiceDaySelector } from "./ServiceDaySelector";

import { useServicePlanStore } from "@/store/useServicePlanStore";
import { useEstimateStore } from "@/store/useEstimateStore";
import useCustomToast from "@/hooks/use-custom-toast";
import { useCreateBooking } from "@/queries/services/useCreateBooking";
import { useRouter } from "next/navigation";
import {
  dayOfWeekToNumber,
  extractAreaSize,
} from "@/services/heplerFunctions";
import { CreditCard, FileText, Loader2, LockIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Stepper from "./Stepper";


export default function BookingConfirmation({ setView,selectedPlanId }: any) {
  const router = useRouter();
  const { success, showError } = useCustomToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { servicePlan } = useServicePlanStore();
  const { estimateValues,userInfo } = useEstimateStore();
  const { mutate: createBooking } = useCreateBooking();

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
    paymentMethod: "",
    remark: "",
  },
});

useEffect(() => {
  if (selectedPlanId) {
    form.setValue("plan", selectedPlanId);
  }
}, [selectedPlanId, form]);

useEffect(() => {
  if (userInfo) {
    if (userInfo.pincode) {
      form.setValue("zipcode", userInfo.pincode, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }

    if (userInfo.email) {
      form.setValue("email", userInfo.email, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }
}, [userInfo, form]);





  // ======== DATE STATE (same as old ServicePlan) ========

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

  const [serviceDayErrors, setServiceDayErrors] = useState<{
    [key: string]: boolean;
  }>({
    "day-1": false,
    "day-2": false,
    "day-3": false,
    "day-4": false,
  });

  const paymentMethodTypes = ["Card","Cash/Venmo"]
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // ======== HELPERS ========

  const handleServiceDaySelect = (
    dayKey: string,
    field: "weekOfMonth" | "dayOfWeek" | "timeSlot" | "selectedDate",
    value: WeekOfMonth | DayOfWeek | TimeSlot | Date | null
  ) => {
    setServiceDates((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value,
      },
    }));

    if (serviceDayErrors[dayKey]) {
      setServiceDayErrors((prev) => ({
        ...prev,
        [dayKey]: false,
      }));
    }
  };

  const handleDialogOpenChange = (dayKey: string, isOpen: boolean) => {
    setOpenDialogs((prev) => ({
      ...prev,
      [dayKey]: isOpen,
    }));
  };

  const getDaysRequired = () => {
    const plan = servicePlan?.estimates?.find(
    (p: any) => p.recurringTypeId === selectedPlanId
    );

    if (!plan) return 0;

    switch (plan.title) {
      case "One Time":
        return 1;
      case "Weekly":
        return 1;
      case "Bi-Weekly":
        return 1;
      default:
        return 0;
    }
  };


  const validateServiceDays = (): boolean => {
  const daysRequired = getDaysRequired();
  if (daysRequired === 0) return true;

  let isValid = true;
  const newErrors = { ...serviceDayErrors };

  const currentPlan = servicePlan?.estimates?.find(
    (p: any) => p.recurringTypeId === selectedPlanId
  );

  const isOneTimePlan = currentPlan?.title === "One Time";

  for (let i = 1; i <= daysRequired; i++) {
    const dayKey = `day-${i}`;
    const day = serviceDates[dayKey];

    if (isOneTimePlan) {
      if (!day.selectedDate || !day.timeSlot) {
        newErrors[dayKey] = true;
        isValid = false;
      } else {
        newErrors[dayKey] = false;
      }
    } else {
      if (!day.timeSlot) {
        newErrors[dayKey] = true;
        isValid = false;
      } else {
        newErrors[dayKey] = false;
      }
    }
  }

  setServiceDayErrors(newErrors);
  return isValid;
};


  // ======== SUBMIT ========

  const onSubmit = (values: FormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionAttempted(true);

    // Find the selected plan
    const plan = servicePlan?.estimates?.find(
    (p: any) => p.recurringTypeId === selectedPlanId
    );

    if (!plan) {
      showError("Please select a plan");
      setIsSubmitting(false);
      return;
    }

    if (!values.paymentMethod) {
        showError("Please select payment method");
        setIsSubmitting(false);
        return;
        }


    // Validate service dates
    const isServiceDaysValid = validateServiceDays();

    if (!isServiceDaysValid) {
        setIsSubmitting(false);
      return;
    }

    const areaSize = extractAreaSize(estimateValues?.homeSize ?? "");

    const bookingType =
      plan.title === "One Time" ? "one_time" : "recurring";

    const selectedDate = serviceDates["day-1"].selectedDate;
    const formattedDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      : null;

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
      paymentMethod: values.paymentMethod === "Cash/Venmo" ? "offline" : "online",
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
      date: formattedDate,
      time: serviceDates["day-1"].timeSlot,

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
        setIsSubmitting(false);
      },
    });
  };

  // Helper function to format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      // minimumFractionDigits: 0,
      // maximumFractionDigits: 0,
    }).format(price);
  };

  const selectedPlan = servicePlan?.estimates?.find(
  (p: any) => p.recurringTypeId === selectedPlanId
);

  // ======== RENDER ========

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <Stepper currentStep={3} />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-225 mx-auto"
        >
          <Card className="bg-white rounded-[40px]  px-6.25 md:px-12 py-12 md:py-12 shadow-[0_5px_20px_rgba(0,0,0,0.10)] ">

            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Booking Confirmation
            </h1>
            <p className="text-gray-600 text-center mb-4">Complete your details to secure your slot.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                

              <div className="space-y-8">

                  {/* Personal Information */}
                  <h3 className="text-[16px] font-bold mb-4 border-b border-[#F5F5F4] pb-2">
                    Your Details
                </h3>
                <PersonalInfoFields form={form} />
                {/* Address Information */}
                <h3 className="text-[16px] font-bold mb-4 border-b border-[#F5F5F4] pb-2">
                    Service Address
                </h3>
                <div className="mt-6">
                    <AddressFields form={form} />
                </div> 

                {/* Landmark */}
                <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                    <FormItem className="mt-8">
                    <FormLabel className="uppercase text-xs"><FileText size={15}/> DESCRIPTION / SPECIAL INSTRUCTIONS</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Gate code is 1234, please focus on the kitchen..."
                        className="resize-none min-h-25 bg-[#FAFAF9] border-none shadow-none"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              </div>
              <div className="space-y-8">
                {/* Payment Method */}
                <h3 className="text-[16px] font-bold mb-4 border-b border-[#F5F5F4] pb-2">
                    Payment Method
                </h3>
                <div className="bg-[#FAFAF9] border border-[#F5F5F4] rounded-2xl p-6 ">
                <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="font-normal text-[#79716B] text-[14px]"><CreditCard size={22} color="#17A5C6"/> Select payment method</FormLabel>
                    <div className="flex gap-4">
                    {paymentMethodTypes.map((type) => (
                        <button
                        type="button"
                        key={type}
                        onClick={() => form.setValue("paymentMethod", type)}
                        className={`flex-1 h-12 rounded-xl border transition
                            ${form.watch("paymentMethod") === type
                            ? "border-2 border-[#17A5C6] text-[#17A5C6] text-[14px] font-bold shadow-md bg-[#FFFFFF]"
                            : "border-2 border-[#E7E5E4] text-[#A6A09B] text-[14px] font-bold bg-[#FFFFFF]"
                            }`}
                        >
                        {type}
                        </button>
                    ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>

                {/* Service Date Selection */}
                <div className="mt-8">
                <h3 className="text-[16px] font-bold mb-4 border-b border-[#F5F5F4] pb-2">
                    Select Service Date
                </h3>
                <div >
                    {Array.from({ length: getDaysRequired() }).map(
                    (_, index) => {
                        const dayKey = `day-${index + 1}`;

                        const currentPlan = servicePlan?.estimates?.find(
                        (p: any) => p.recurringTypeId === selectedPlanId
                        );

                        if (currentPlan?.title === "One Time") {
                        return (
                            <OneTimeServiceDateSelector
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
                            onServiceDaySelect={(childDayKey, field, value) =>
                                handleServiceDaySelect(childDayKey, field, value)
                            }
                            totalDuration={servicePlan.totalDuration}
                            />
                        );
                        } else {
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
                            onServiceDaySelect={(childDayKey, field, value) =>
                                handleServiceDaySelect(childDayKey, field, value)
                            }
                            totalDuration={servicePlan.totalDuration}
                            selectedPlanId={selectedPlanId}
                            />
                        );
                        }
                    }
                    )}
                </div>
                </div>

                <div className="flex items-center gap-3 bg-[#17A5C60D] p-4.5 rounded-xl">

                <div>
                    <div className="flex items-center gap-2">
                      <span><LockIcon color="#17A5C6" size={16}/></span>
                      <p className="font-bold text-[#17A5C6] text-[16px]">Secure Booking</p>
                    </div>
                    <p className="text-[12px] text-[#79716B] mt-1.5">
                    Your payment information is encrypted.
                    You will not be charged until service is completed.
                    </p>
                </div>
                </div>


                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#19A4C6] hover:bg-[#19A4C6]/90 text-white rounded-full disabled:pointer-events-none"
                    >
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                        </>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                          Book Now
                          {selectedPlan?.finalPrice && (
                            <span className="font-semibold">
                              - {formatPrice(selectedPlan.finalPrice)}
                            </span>
                          )}
                        </span>
                    )}
                    </Button>
              </div>


              </form>
            </Form>

          </Card>
        </motion.div>
      </div>
    </div>
  );
}

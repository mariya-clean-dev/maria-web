"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Loader, Package } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEstimateCalculation } from "@/queries/estimate-calculation/useEstimateCalculation";
import useListServices from "@/queries/services/useListServices";
import useCustomToast from "@/hooks/use-custom-toast";
import { useEstimateStore } from "@/store/useEstimateStore";
import { useServicePlanStore } from "@/store/useServicePlanStore";

// Define form validation schema
const formSchema = z.object({
  homeSize: z.string({
    required_error: "Please select the size of your home.",
  }),
  cleaningType: z.string({
    required_error: "Please select the type of cleaning.",
  }),
  propertyType: z.string({
    required_error: "Please select the type of property.",
  }),
  rooms: z
    .number({
      required_error: "Please specify the number of rooms.",
    })
    .min(1, "At least 1 room is required.")
    .max(6),
  bathrooms: z
    .number({
      required_error: "Please specify the number of bathrooms.",
    })
    .min(0)
    .max(5),
  ecoFriendly: z.boolean().default(false),
  materialsProvided: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function CalculateServiceEstimate({ setEstimatePageView }: any) {
  const [roomsValue, setRoomsValue] = useState(0);
  const [bathroomsValue, setBathroomsValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { success, showError } = useCustomToast();
  const { setEstimateValues } = useEstimateStore();
  const { setServicePlan } = useServicePlanStore();

  //Api
  const { mutateAsync: estimateCalculation } = useEstimateCalculation();
  const { data: serviceData } = useListServices();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rooms: 0,
      bathrooms: 0,
      ecoFriendly: false,
      materialsProvided: false,
    },
  });

  // Form submission handler
  function onSubmit(values: FormValues) {
    setIsLoading(true);

    const estimatePayload = {
      service_id: values.cleaningType,
      no_of_rooms: values.rooms,
      no_of_bathrooms: values.bathrooms,
      square_feet: Number(values.homeSize.split(" ")[2]),
      materialsProvidedByClient: values.materialsProvided,
      isEcoCleaning: values.ecoFriendly
    };

    estimateCalculation(estimatePayload, {
      onSuccess: (resp) => {
        setIsLoading(false);
        setEstimateValues(values);
        setServicePlan(resp.data);
        success("Estimate calculated successfully!");
        setEstimatePageView(false);
      },
      onError: (error) => {
        console.log("Error calculating estimate:", error);
        showError(error);
        setIsLoading(false);
      },
    });
  }

  // Handle room number input changes
  const handleRoomsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // If the input is empty or just "0", set value to 0
    if (!inputValue) {
      setRoomsValue(0);
      form.setValue("rooms", 0);
      return;
    }

    // Parse the input as a number
    const value = Number.parseInt(inputValue);
    // Clamp the value between 0 and 6
    const clampedValue = Math.min(Math.max(value, 0), 6);
    setRoomsValue(clampedValue);
    form.setValue("rooms", clampedValue);
  };

  // Handle bathroom number input changes
  const handleBathroomsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    // If the input is empty or just "0", set value to 0
    if (!inputValue || inputValue === "0") {
      setBathroomsValue(0);
      form.setValue("bathrooms", 0);
      return;
    }

    // Parse the input as a number
    const value = Number.parseInt(inputValue);
    // Clamp the value between 0 and 5
    const clampedValue = Math.min(Math.max(value, 0), 5);
    setBathroomsValue(clampedValue);
    form.setValue("bathrooms", clampedValue);
  };

  const homeSizes = [
    "500 - 1000 sq ft",
    "1000 - 1500 sq ft",
    "1500 - 2000 sq ft",
    "2000 - 2500 sq ft",
    "2500 - 3000 sq ft",
    "3000 - 3500 sq ft",
    "3500 - 4000 sq ft",
    "4000 - 4500 sq ft",
    "4500 - 5000 sq ft",
    "5000 - 5500 sq ft",
    "5500 - 6000 sq ft",
  ];

  const cleaningTypes = [
    "Regular Cleaning",
    "Moving In / Out",
    "Deep Cleaning",
    "Post Renovation / Construction",
  ];

  const propertyTypes = ["House", "Apartment", "Studio"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Get Your Estimate
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Fill out the form below to receive a customized cleaning service
            estimate.
          </p>

          <Card className="bg-white shadow-md">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Grid layout for dropdowns on medium screens and larger */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Home Size Dropdown */}
                    <FormField
                      control={form.control}
                      name="homeSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size of your home</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {homeSizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cleaning Type Dropdown */}
                    <FormField
                      control={form.control}
                      name="cleaningType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of cleaning</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceData?.data?.map((service: any) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Property Type Dropdown */}
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of property</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Select property" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {propertyTypes.map((type) => (
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
                  </div>

                  {/* Number of Rooms Slider */}
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of bedrooms</FormLabel>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 relative">
                            <Slider
                              min={0}
                              max={6}
                              step={1}
                              value={[roomsValue]}
                              color="#19A4C6"
                              onValueChange={(value) => {
                                setRoomsValue(value[0]);
                                field.onChange(value[0]);
                              }}
                              className="py-4 cursor-grabbing"
                            />
                            {/* <div
                              className="absolute -bottom-2 border border-green-500 rounded px-2 py-1 text-sm bg-white"
                              style={{
                                left: `calc(${(roomsValue / 6) * 100}% - 10px)`,
                              }}
                            >
                              {roomsValue}
                            </div> */}
                          </div>
                          <Input
                            type="number"
                            min={0}
                            max={6}
                            value={
                              roomsValue === 0 ? "0" : roomsValue.toString()
                            }
                            onChange={handleRoomsInputChange}
                            className="w-20 h-12 text-center"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Number of Bathrooms Slider */}
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of bathrooms</FormLabel>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 relative">
                            <Slider
                              min={0}
                              max={5}
                              step={1}
                              value={[bathroomsValue]}
                              onValueChange={(value) => {
                                setBathroomsValue(value[0]);
                                field.onChange(value[0]);
                              }}
                              className="py-4 cursor-grabbing"
                            />
                            {/* <div
                              className="absolute -bottom-2 border border-green-500 rounded px-2 py-1 text-sm bg-white"
                              style={{
                                left: `calc(${
                                  (bathroomsValue / 5) * 100
                                }% - 10px)`,
                              }}
                            >
                              {bathroomsValue}
                            </div> */}
                          </div>
                          <Input
                            type="number"
                            min={0}
                            max={5}
                            value={
                              bathroomsValue === 0
                                ? "0"
                                : bathroomsValue.toString()
                            }
                            onChange={handleBathroomsInputChange}
                            className="w-20 h-12 text-center"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Switches for Eco-Friendly and Materials Provided */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                    {/* Eco-Friendly Switch */}
                    <FormField
                      control={form.control}
                      name="ecoFriendly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <Leaf className="h-5 w-5 text-[#27AE60]" />
                              <FormLabel className="font-medium">
                                Eco-Friendly Cleaning
                              </FormLabel>
                            </div>
                            <FormDescription className="text-sm text-gray-500">
                              Use environmentally friendly cleaning products
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Materials Provided Switch */}
                    <FormField
                      control={form.control}
                      name="materialsProvided"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <Package className="h-5 w-5 text-[#19A4C6]" />
                              <FormLabel className="font-medium">
                                Materials Provided
                              </FormLabel>
                            </div>
                            <FormDescription className="text-sm text-gray-500">
                              We provide all cleaning materials and equipment
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#19A4C6]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary cursor-pointer text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      "Calculate Estimate"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

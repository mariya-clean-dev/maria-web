"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, LucideMail } from "lucide-react";
import OtpInput from "react-otp-input";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetOtp } from "@/queries/authentication/useGetOtp";
import { useVerifyOtp } from "@/queries/authentication/useVerifyOtp";
import useCustomToast from "@/hooks/use-custom-toast";
import { useRouter } from "nextjs-toploader/app";

// Define form validation schema for email
const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Define form validation schema for OTP verification
const otpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().length(6, {
    message: "OTP must be exactly 6 digits.",
  }),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const { success, showError } = useCustomToast();

  // Initialize mutations
  const getOtpMutation = useGetOtp();
  const verifyOtpMutation = useVerifyOtp();

  // Initialize form with react-hook-form and zod validation
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  // Update OTP form email value when email changes
  useEffect(() => {
    if (email) {
      otpForm.setValue("email", email);
    }
  }, [email, otpForm]);

  // Update OTP form otp value when otp changes
  useEffect(() => {
    otpForm.setValue("otp", otp);
  }, [otp, otpForm]);

  // Handle email form submission to get OTP
  const handleGetOtp = async (values: EmailFormValues) => {
    setEmail(values.email);
    await getOtpMutation.mutateAsync(
      { email: values.email },
      {
        onSuccess: (data) => {
          if (data && data.message === "Not A Registered User") {
            showError("This email is not registered. Please sign up or use a different email.");
            setOtpSent(false);
          } else {
            setOtpSent(true);
            toast.success("OTP sent to your email");
          }
        },
        onError: (error) => {
          showError(error);
        },
      }
    );
  };

  // Handle OTP verification
  const handleVerifyOtp = async (values: OtpFormValues) => {
    await verifyOtpMutation.mutateAsync(
      {
        email: values.email,
        otp: values.otp,
      },
      {
        onSuccess: (data) => {
          success("Login successful!");
          sessionStorage.setItem("maria_access_token", data.access_token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          router.push("/");
        },
        onError: (error) => {
          showError(error);
        },
      }
    );
  };

  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center lg:flex-row bg-primary overflow-hidden">
      <div
          className="absolute inset-0
                    bg-[url('/service-image/serrvice7.jpeg')] 
                    bg-cover bg-center 
                    opacity-50 blur-sm
                    lg:hidden"
        />
      <motion.div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      >
        <LoginStepper step={otpSent ? 2 : 1} />
        <div className="max-w-md mx-auto w-full space-y-2 bg-[#ffff] border-2 border-blue-200 shadow-md px-10 py-15 rounded-[20px] z-1">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/footerlogo.png"
              alt="Clean by Maria"
              width={180}
              height={60}
              className="h-auto"
            />
          </div>

          <h1 className="text-4xl font-bold mb-5 text-center">Welcome back</h1>
          {/* <p className="text-gray-500 mb-8 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#27AE60] hover:underline">
              sign up
            </Link>
          </p> */}

          {!otpSent ? (
            // Email Form - Initial State
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(handleGetOtp)}
                className="space-y-6"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Enter Your Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                        <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                          className="h-12 pl-12"
                        />
                      </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#27AE60] hover:bg-[#219653] text-white rounded-2xl"
                  disabled={getOtpMutation.isPending}
                >
                  {getOtpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Get OTP"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            // OTP Verification Form
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                className="space-y-6"
              >
                <FormField
                  control={otpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                    className="hidden">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                          disabled
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Enter OTP sent to your email</FormLabel>
                      <FormControl>
                        <div className="flex justify-start w-90">
                          <OtpInput
                            value={otp}
                            onChange={handleOtpChange}
                            numInputs={6}
                            renderSeparator={
                              <span className="w-1 md:w-1"></span>
                            }
                            renderInput={(props) => (
                              <Input
                                {...props}
                                className="!w-11 !h-11 sm:!w-12 sm:!h-12 md:!w-12 md:!h-12 text-center p-0 sm:p-2"
                                inputMode="numeric"
                              />
                            )}
                            containerStyle="flex gap-1 sm:gap-2 justify-start w-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => {
                      getOtpMutation.mutate(
                        { email },
                        {
                          onSuccess: () => {
                            success("OTP resent successfully");
                          },
                          onError: (error) => {
                            showError(error);
                          },
                        }
                      );
                    }}
                    className="text-sm text-[#27AE60] hover:underline"
                    disabled={getOtpMutation.isPending}
                  >
                    {getOtpMutation.isPending ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Resend OTP"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Change Email
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#27AE60] hover:bg-[#219653] text-white"
                  disabled={verifyOtpMutation.isPending || otp.length !== 6}
                >
                  {verifyOtpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </form>
            </Form>
          )}

          <p className="text-gray-500 mt-6 text-center">
            {/* Having issues?{" "} */}
            <Link href="/" className="text-[#27AE60] hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </motion.div>

      {/* right side - Image with padding */}

      <motion.div className="w-full md:w-1/2  min-h-[300px] md:max-h-screen overflow-hidden hidden md:flex"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      >
        <div className="relative w-full h-full  overflow-hidden">
          <Image
            src="/login-lady.png"
            alt="Cleaning professional"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </motion.div>
    </div>
  );
}


function LoginStepper({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center mb-8 z-1">
      {/* Step 1 */}
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
          ${step >= 2 ? "bg-[#27AE60] text-white" : "bg-[#27AE60] text-white"}`}
        >
          {step >= 2 ? "✓" : "1"}
        </div>
        <span className="ml-2 text-sm text-white">
          Enter email
        </span>
      </div>

      {/* Line */}
      <div
        className={`mx-4 h-0.5 w-12 
        ${step >= 2 ? "bg-white/80" : "bg-white/50"}`}
      />

      {/* Step 2 */}
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
          ${step === 2 ? "bg-[#27AE60] text-white" : "bg-white/30 text-white/50"}`}
        >
          2
        </div>
        <span className={`ml-2 text-sm 
         ${step ==2 ? " text-white" :"text-white/50"} `}>
          Enter code
        </span>
      </div>
    </div>
  );
}

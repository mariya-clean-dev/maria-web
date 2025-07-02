"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

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

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignupModule() {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    // Here you would typically send the data to your API
    // For example: signUp(values)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center">
      {/* Left side - Image */}

      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen p-4 md:p-6 lg:p-8 hidden md:flex">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src="/signup-left-image.png"
            alt="Cleaning professional"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/footer-logo.png"
              alt="Clean by Maria"
              width={180}
              height={60}
              className=""
            />
          </div>

          <h1 className="text-4xl font-bold mb-2 text-center">Get started</h1>
          <p className="text-gray-500 mb-8 text-center">
            Already have account?{" "}
            <Link href="/login" className="text-[#27AE60] hover:underline">
              sign in
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email id</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="test@example.com"
                        type="email"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your Password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-12 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-[#27AE60] hover:bg-[#219653] text-white"
              >
                Sign up
              </Button>
            </form>
          </Form>

          <p className="text-gray-500 mt-6 text-center">
            Having issues?{" "}
            <Link href="/login" className="text-[#27AE60] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-[#19A4C6] min-h-[80vh] relative overflow-hidden mt-20">
      {/* Desktop layout - image on right, text on left */}
      <div className="hidden md:flex h-[80vh] items-center">
        {/* Content container */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-[60%] lg:max-w-[50%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              >
                Your Trusted Partner for Clean Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg mb-8 max-w-lg"
              >
                We take pride in our attention to detail and commitment to
                customer satisfaction.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#219653] hover:bg-[#219653] text-white border-none"
                >
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-[#219653] hover:bg-[#219653] text-white border-none"
                >
                  Get Your Estimate
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute right-0 top-0 bottom-0 w-1/2 z-0 h-full"
        >
          <Image
            src="/hero-image.png"
            alt="Cleaning Professional"
            fill
            className="object-contain object-right-bottom"
            sizes="50vw"
            priority
          />
        </motion.div>
      </div>

      {/* Mobile layout - image on top, text below */}
      <div className="md:hidden flex flex-col">
        {/* Mobile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full relative"
          style={{ height: "40vh" }}
        >
          <Image
            src="/hero-image.png"
            alt="Cleaning Professional"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Mobile content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold leading-tight mb-4"
            >
              Your Trusted Partner for Clean Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base mb-6"
            >
              We take pride in our attention to detail and commitment to
              customer satisfaction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-[#27AE60] hover:bg-[#219653] text-white border-none"
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-[#27AE60] hover:bg-[#219653] text-white border-none"
              >
                Get Your Estimate
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

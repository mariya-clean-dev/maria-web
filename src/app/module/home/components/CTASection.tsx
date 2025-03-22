"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CTASection() {
  return (
    <div className="p-8">
      <section className="bg-[#19A4C6] overflow-hidden rounded-lg relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white max-w-xl relative z-10 pl-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Get Started on Your Journey to a Cleaner Home Today!
              </h2>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-[#1C9F0B] hover:bg-[#219653] text-white border-none px-8 py-6 text-lg"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Empty on mobile but provides space for desktop */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Image positioned absolutely to match UI layout */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block absolute top-0 right-0 bottom-0 w-[60%] lg:w-[50%]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/book-image.png"
              alt="Cleaning hand with cloth"
              fill
              className="object-contain object-right"
              sizes="60vw"
              priority
              unoptimized
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

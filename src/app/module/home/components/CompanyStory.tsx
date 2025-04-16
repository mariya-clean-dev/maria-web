"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CompanyStory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden"
              >
                <Image
                  src="/company-story/main.png"
                  alt="Cleaning Professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  quality={100}
                  unoptimized={true}
                />
              </motion.div>
            </div>

            {/* Overlapping Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-12 -right-6 w-[250px] h-[250px] rounded-3xl overflow-hidden hidden md:flex"
            >
              <Image
                src="/company-story/sub.png"
                alt="Cleaning Team"
                fill
                className="object-cover"
                sizes="250px"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Experience Our Neighborly Done Right Promise™
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8 text-lg"
            >
              We offer Marias’s Neighborly Done Right Promise™ on all our
              services. This means you can trust us to meet your expectations.
              If you’re not satisfied with our services, call us by the end of
              the next business day and we’ll come back and clean it again at no
              additional cost to you.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-md bg-[#19A4C6] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Clean Homes, Happy Hearts</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-md bg-[#19A4C6] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Sparkle Every Space</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-md bg-[#19A4C6] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">
                  Purify. Refresh. Revitalize.
                </span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-md bg-[#19A4C6] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Cleanliness Standards</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

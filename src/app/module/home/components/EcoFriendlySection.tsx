"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EcoFriendlySection() {
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
    <div className="p-4 md:p-8">
      <section className="bg-[#61B35C] py-7 md:py-24 overflow-hidden rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-white pl-4"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                Our Commitment to
                <br />
                Ecofriendly Services
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-white/90 mb-8 text-lg max-w-xl"
              >
                Marias is committed to your complete satisfaction, which is why
                we strive to offer the most consistent, reliable, and affordable
                housecleaning services around. Our team of experienced
                professionals has taken the time to answer some of our most
                frequently asked questions for your convenience.
              </motion.p>

              <div className="space-y-4 mb-8">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">
                    Eco-Friendly Cleaning Products
                  </span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Customized Cleaning Packages</span>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="">
                <Link href="/estimate-service" className="cursor-pointer">
                  <Button
                    size="lg"
                    className="bg-white text-[#27AE60] hover:bg-white/90 font-semibold cursor-pointer"
                  >
                    Request Service
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Images Column */}
            <div className="relative h-[600px] md:h-[550px] hidden md:flex">
              {/* Image Container */}
              <div className="relative w-full h-full flex justify-center">
                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-[10%] w-[390px] h-[370px] lg:w-[480px] lg:h-[450px] z-10"
                >
                  <Image
                    src="/third-section/main-image3.png"
                    alt="Cleaning Professional"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>

                {/* Left Bottom Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute bottom-[24%] left-[3%] sm:bottom-[18%] sm:left-[15%] lg:bottom-[3%] lg:left-[10%] w-[250px] h-[250px] lg:w-[280px] lg:h-[280px] z-20"
                >
                  <Image
                    src="/third-section/left-image3.png"
                    alt="Cleaning Professional with Vacuum"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>

                {/* Right Bottom Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute bottom-[24%] right-[3%] sm:bottom-[18%] sm:right-[15%] lg:bottom-[3%] lg:right-[10%] w-[250px] h-[250px]  lg:w-[280px] lg:h-[280px] z-20"
                >
                  <Image
                    src="/third-section/right-image3.png"
                    alt="Cleaning Professional Cleaning Window"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

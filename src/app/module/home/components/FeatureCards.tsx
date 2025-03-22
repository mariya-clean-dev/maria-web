"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureCards() {
  return (
    <div
      className="relative z-20 hidden md:block"
      style={{ marginTop: "-100px" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="w-12 h-12 bg-[#E3F6FC] rounded-full flex items-center justify-center mb-3">
              <Image
                src="/feature-card/tick.svg"
                width={32}
                height={32}
                alt="Quality"
              />
            </div>
            <h3 className="text-lg font-bold mb-1 pt-2">Trustworthiness</h3>
            <p className="text-[#525254] text-[16px]">
              Building trust with clients by being <br /> transparent, honest,
              and reliable in all
              <br /> interactions, including respecting privacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="w-12 h-12 bg-[#E3F6FC] rounded-full flex items-center justify-center mb-3">
              <Image
                src="/feature-card/award.svg"
                width={32}
                height={32}
                alt="Quality"
              />
            </div>
            <h3 className="text-lg font-bold mb-1  pt-2">Professionalism</h3>
            <p className="text-gray-600 text-[16px]">
              Conducting all cleaning tasks with <br /> professionalism,
              including arriving on time,
              <br /> adhering to safety standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="w-12 h-12 bg-[#E3F6FC] rounded-full flex items-center justify-center mb-3">
              <Image
                src="/feature-card/like.svg"
                width={32}
                height={32}
                alt="Quality"
              />
            </div>
            <h3 className="text-lg font-bold mb-1  pt-2">
              Customer Satisfaction
            </h3>
            <p className="text-gray-600 text-[16px]">
              Prioritizing the needs and preferences of <br /> customers and
              striving to exceed their <br /> expectations.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

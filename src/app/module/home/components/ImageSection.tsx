"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ImageSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
    },
  };

  const floatingImageVariants = {
    hidden: (custom: any) => ({
      opacity: 0,
      x: custom.x,
      y: custom.y,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Image Column */}
        <motion.div
          className="relative h-[500px] md:h-[600px]"
          variants={leftColumnVariants}
        >
          {/* Main Image */}
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden rounded-md shadow-lg z-10">
            <Image
              src="/second-section/main-image.png"
              alt="Professional cleaning service"
              width={800}
              height={1000}
              quality={100}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Image 1 (left/top) - Now vertical */}
          <motion.div
            className="absolute left-0 top-4 -translate-x-1/4 w-1/3 h-2/5 rounded-md shadow-lg overflow-hidden z-20 hidden md:flex"
            variants={floatingImageVariants}
            custom={{ x: "-10%", y: "-15px" }}
          >
            <Image
              src="/second-section/left-image.png"
              alt="Cleaning supply"
              width={500}
              height={800}
              quality={100}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlapping Image 2 (right/bottom) - Now correctly vertical */}
          <motion.div
            className="absolute right-0 bottom-16 translate-x-1/4 w-1/3 h-2/5 rounded-md shadow-lg overflow-hidden z-20 hidden md:flex"
            variants={floatingImageVariants}
            custom={{ x: "10%", y: "15px" }}
          >
            <Image
              src="/second-section/right-image.png"
              alt="Detailed cleaning"
              width={500}
              height={800}
              quality={100}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </motion.div>

        {/* Content Column */}
        <motion.div variants={rightColumnVariants} className="font-poppins">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800"
            variants={itemVariants}
          >
            Experienced. Reliable.
            <br />
            Personalized Cleaning.
          </motion.h2>

          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            Looking for the best home cleaning services near you? Look no
            further than Maria’s custom home cleaning. We
            understand how hard it can be to keep a clean home with a busy
            schedule. That’s why our expert team delivers top-quality cleaning—tailored to your specific needs, preferences, and lifestyle.
          </motion.p>

          <div className="space-y-6">
            {/* Service 1 */}
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="bg-blue-100 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Instant cleaning service
                </h3>
                <p className="text-gray-600">
                  Need a clean space fast? Our responsive team is ready when you are—efficient, dependable, and always thorough.
                </p>
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="bg-blue-100 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Subscription-Based Plans
                </h3>
                <p className="text-gray-600">
                  Enjoy peace of mind with regular cleanings. Our flexible and affordable subscription options are designed to fit your routine.
                </p>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="bg-blue-100 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Customizable services
                </h3>
                <p className="text-gray-600">
                  No two homes are the same. That’s why we let you tailor our services to match your exact cleaning priorities and preferences.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ImageSection;

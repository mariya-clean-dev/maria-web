// AdvancedServicesSection.tsx
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Define service types
interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Sample services data
const services: Service[] = [
  {
    id: 1,
    title: "Regular Home Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service1.png",
  },
  {
    id: 2,
    title: "Deep Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service2.png",
  },
  {
    id: 3,
    title: "Move-In/Out Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service3.png",
  },
  {
    id: 4,
    title: "Post-Construction Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service4.png",
  },
  {
    id: 5,
    title: "Commercial Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service5.png",
  },
  {
    id: 6,
    title: "Specialized Cleaning",
    description:
      "Conducting all cleaning tasks with professionalism, including arriving on time.",
    image: "/service-image/service6.png",
  },
];

const ServicesSection = () => {
  // Animation controls
  const mainControls = useAnimation();
  const [mainRef, mainInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Trigger animations when section comes into view
  useEffect(() => {
    if (mainInView) {
      mainControls.start("visible");
    }
  }, [mainControls, mainInView]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
      },
    },
  };

  const cardVariants: Variants = {
    hidden: (index) => ({
      opacity: 0,
      y: 60,
      scale: 0.95,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    }),
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.2, opacity: 0.8 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
      },
    },
  };

  const textOverlayVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={mainControls}
          variants={containerVariants}
          className="space-y-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            We Take Pride for Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={mainControls}
                whileHover="hover"
                className="h-[460px] md:h-[500px] relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"
                  variants={{
                    hover: {
                      opacity: 0.9,
                      transition: { duration: 0.3 },
                    },
                  }}
                />

                <motion.div className="relative h-full w-full overflow-hidden">
                  <motion.div
                    variants={imageVariants}
                    className="h-full w-full"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain" // Changed from object-cover to object-contain
                      priority={index < 3}
                      quality={100} // Added quality attribute set to maximum
                    />
                  </motion.div>

                  <motion.div
                    variants={textOverlayVariants}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <div className="bg-black/40 backdrop-blur-md p-5 rounded-lg text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

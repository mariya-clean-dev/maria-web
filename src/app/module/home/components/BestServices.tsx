"use client";

import { motion } from "framer-motion";
import { Home, Star, Trash2, Send } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Services",
    description: "Choose a plan to fit to your needs-no contracts, no hassle",
  },
  {
    icon: Star,
    title: "Perfect Gift",
    description: "Give the gift of time with Maria Made gift certificate",
  },
  {
    icon: Trash2,
    title: "Practically Spotless Blog",
    description: "Get the expert advice from our team of cleaning specialists",
  },
  {
    icon: Send,
    title: "Ms Maria Foundation",
    description: "Supporting the victims of domestic violence",
  },
];

export default function BestServices() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            How Marias Cleaning Services Can Help You
          </motion.h2>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[#0ABED5] text-xl font-semibold mb-2">
              Our Services
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
          </motion.div> */}
        </div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-6 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#0ABED5]/30 transition-colors duration-300 group-hover:text-[#0ABED5]" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

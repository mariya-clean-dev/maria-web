"use client";

import styles from "./ServiceSection.module.css";
import {Sparkles,Home,Package,Hammer,Building2,} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Sparkles,
    title: "Regular Cleaning",
    desc: "For consistently clean homes",
    image: "/service-image/service1.png",
  },
  {
    icon: Home,
    title: "Deep Cleaning",
    desc: "A reset for kitchens, baths, and corners",
    image: "/service-image/service2.png",
  },
  {
    icon: Package,
    title: "Move-in / Move-out",
    desc: "Detailed cleaning for transitions",
    image: "/service-image/service3.png",
  },
  {
    icon: Hammer,
    title: "Post-Construction",
    desc: "Dust and debris cleanup after work",
    image: "/service-image/service4.png",
  },
  {
    icon: Building2,
    title: "Commercial",
    desc: "Small offices and studios",
    image: "/service-image/serrvice7.jpeg",
  },
];

export default function ServiceSection() {
  return (
    <section className={styles.serviceSection}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.label}>OUR EXPERTISE</span>
          <h2 className={styles.heading}>
            Curated Cleaning Solutions
            <br /> for Every Lifestyle.
          </h2>
        </motion.div>

        <motion.p
          className={styles.subText}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Whether you need a weekly refresh or a complete deep clean,
          we have a package that fits your life.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className={styles.cardGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.20 } },
        }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              className={styles.card}
              style={{ backgroundImage: `url(${service.image})` }}
              key={index}
              variants={{
                hidden: { opacity: 0},
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={styles.overlay}></div>
              <motion.div
                className={styles.iconWrapper}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={24} />
              </motion.div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

"use client";

import styles from "./PriceSection.module.css";
import { motion } from "framer-motion";

export default function PriceSection() {
  return (
    <section className={styles.priceSection}>
      
      {/* HEADING */}
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        We offer great <span>price</span> plan for the <br />
        Services
      </motion.h2>

      {/* CARDS */}
      <motion.div
        className={styles.cards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <motion.div
          className={styles.othercard}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <h3>One-Time</h3>
          <p>
            Perfect for when you need a single deep clean to refresh your space.
          </p>
        </motion.div>

        {/* POPULAR CARD */}
        <motion.div
          className={`${styles.card} ${styles.popular}`}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <span className={styles.badge}>MOST POPULAR</span>
          <h3>Weekly</h3>
          <p>
            Best for homes or workplaces that need consistent, high-level
            cleanliness.
          </p>
        </motion.div>

        <motion.div
          className={styles.othercard}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <h3>Bi-Weekly</h3>
          <p>
            A great option for busy homes or small businesses that need frequent
            attention.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import styles from "./CTASection.module.css";
import { motion } from "framer-motion";
import EstimateModal from "../../EstimateModal/EstimateModal";

export default function CTASection() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <section className={styles.ctaSection}>
      {/* HEADING */}
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Ready for a <br />
        <span>Fresh Start?</span>
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: "easeOut",
        }}
      >
        Get your free estimate in seconds and book your first clean today.
        No credit card required for estimate.
      </motion.p>

      {/* BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        <button className={styles.button} 
        onClick={() => {
          setOpen(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
          Get Estimate
        </button>
      </motion.div>
    </section>
    <EstimateModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

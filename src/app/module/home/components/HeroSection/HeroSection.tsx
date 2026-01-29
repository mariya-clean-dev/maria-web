"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./HeroSection.module.css";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import EstimateModal from "../../EstimateModal/EstimateModal";

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <section className={styles.heroSection}>
      {/* Content wrapper */}
      <div className={styles.contentWrapper}>
        
        {/* Left content */}
        <motion.div
          className={styles.leftContent}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          <motion.span
            className={styles.badge}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Sparkles size={14}/>
            PREMIUM CLEANING SERVICE
          </motion.span>

          <motion.h1
            className={styles.heading}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Cleaning made <span>effortless.</span>
          </motion.h1>

          <motion.p
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Reliable home and small-office cleaning across the Bay Area.
            We handle the mess, you reclaim your time.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.div
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400 ,damping:25}}
            >
              <button  className={styles.button} onClick={() => setOpen(true)}>
                See My Estimate
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          className={styles.rightImage}
          initial={{ opacity: 0, x: 60, scale: 1.05 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/hero-image.png"
            alt="Cleaning service"
            fill
            priority
          />
        </motion.div>

      </div>
    </section>
    <EstimateModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

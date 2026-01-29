"use client";

import styles from "./ProcessSection.module.css";
import { CalendarDays, MousePointerClick, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function ProcessSection() {
  return (
    <section className={styles.processSection}>
      <motion.div
        className={styles.wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
      >
        {/* HEADER */}
        <motion.div
          className={styles.header}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.span
            className={styles.label}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            SIMPLE PROCESS
          </motion.span>

          <motion.h2
            className={styles.heading}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
          >
            How It Works
          </motion.h2>
        </motion.div>

        {/* STEPS */}
        <motion.div
          className={styles.steps}
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
          {/* Line */}
          <span className={styles.line}>
            <motion.span
              className={styles.lineInner}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </span>


          <motion.div
            className={styles.step}
            variants={{
              hidden: { opacity: 0, y: 22 },
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
            <div className={styles.iconWrapper}>
              <MousePointerClick size={32} />
            </div>
            <h4>Select service</h4>
            <p>
              Choose the type of clean you need from our simple menu.
            </p>
          </motion.div>

          <motion.div
            className={styles.step}
            variants={{
              hidden: { opacity: 0, y: 22 },
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
            <div className={styles.iconWrapper}>
              <CalendarDays size={32} />
            </div>
            <h4>Choose schedule</h4>
            <p>
              Pick a date and time that works best for your lifestyle.
            </p>
          </motion.div>

          <motion.div
            className={styles.step}
            variants={{
              hidden: { opacity: 0, y: 22 },
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
            <div className={styles.iconWrapper}>
              <Smile size={32} />
            </div>
            <h4>Enjoy a spotless space</h4>
            <p>
              Relax while our professional team handles the rest.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

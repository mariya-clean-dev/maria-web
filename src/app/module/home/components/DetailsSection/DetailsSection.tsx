"use client";

import Image from "next/image";
import styles from "./DetailsSection.module.css";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DetailsSection() {
  return (
    <section className={styles.detailsSection}>
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
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <span className={styles.label}>THE DETAILS</span>
            <h2 className={styles.heading}>Every corner, covered.</h2>
          </motion.div>

          <motion.a
            href="#"
            className={styles.cta}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            VIEW FULL CHECKLIST <ArrowRight size={16} />
          </motion.a>
        </motion.div>

        {/* CARDS */}
        <motion.div
          className={styles.cards}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            className={styles.card}
            variants={{
              hidden: { opacity: 0, y: 24 },
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
            <motion.div
              className={styles.imageWrap}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <Image src="/kitchen.png" alt="" fill />
            </motion.div>

            <motion.div
              className={styles.content}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <h3>Kitchen</h3>
              <ul>
                <li>Countertops & backsplash</li>
                <li>Sinks scrubbed</li>
                <li>Appliances wiped</li>
                <li>Floors polished</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.card}
            variants={{
              hidden: { opacity: 0, y: 24 },
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
            <motion.div
              className={styles.imageWrap}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <Image src="/bathroom.png" alt="" fill />
            </motion.div>

            <motion.div
              className={styles.content}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <h3>Bathroom</h3>
              <ul>
                <li>Showers & tubs scrubbed</li>
                <li>Toilets disinfected</li>
                <li>Mirrors & fixtures shined</li>
                <li>Vanity wiped</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

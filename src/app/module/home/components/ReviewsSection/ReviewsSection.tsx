"use client";

import { Quote } from "lucide-react";
import styles from "./ReviewsSection.module.css";
import { motion } from "framer-motion";

const reviews = [
  {
    text: "Professional, on time, and extremely thorough. My kitchen has never looked this good.",
    name: "Sarah D.",
    service: "REGULAR CLEAN",
  },
  {
    text: "Booking was easy. Great attention to detail. They even organized my kids' play area!",
    name: "Emily J.",
    service: "DEEP CLEAN",
  },
  {
    text: "Consistent quality every visit. I love coming home on cleaning days.",
    name: "Michael B.",
    service: "WEEKLY SERVICE",
  },
];

export default function ReviewsSection() {
  return (
    <section className={styles.reviewsSection}>
      
      {/* HEADER */}
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
          className={styles.quoteIcon}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <Quote size={48} />
        </motion.span>

        <motion.h2
          className={styles.heading}
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
          Trusted by Your <br /> Neighbors
        </motion.h2>
      </motion.div>

      {/* REVIEWS */}
      <motion.div
        className={styles.reviews}
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
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className={styles.review}
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
            <div className={styles.stars}>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <p className={styles.text}>“{review.text}”</p>

            <div className={styles.author}>
              <strong>{review.name}</strong>
              <span>{review.service}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

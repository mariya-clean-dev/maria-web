"use client";

import Image from "next/image";
import styles from "./PromiseSection.module.css";
import { Clock, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PromiseSection() {
  return (
    <section className={styles.promiseSection}>
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
        {/* LEFT CONTENT */}
        <motion.div
          className={styles.content}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.22,
              },
            },
          }}
        >
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
            Our Promise to You
          </motion.h2>

          <motion.p
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
          >
            We treat your home with the same care and respect we would our own.
            Our reputation is built on trust, consistency, and a commitment
            to quality.
          </motion.p>

          {/* POINTS */}
          <motion.div
            className={styles.points}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                  delayChildren: 0.15,
                },
              },
            }}
          >
            <motion.div
              className={styles.point}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <span className={styles.icon}>
                <Clock size={24} />
              </span>
              <div>
                <h4>Punctual & Reliable</h4>
                <p>
                  Clear communication and strict arrival windows.
                  We value your time as much as you do.
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.point}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <span className={styles.iconGreen}>
                <Leaf size={24} />
              </span>
              <div>
                <h4>Eco-Conscious</h4>
                <p>
                  Premium eco-friendly products available on request.
                  Safe for your family and the planet.
                </p>
              </div>
            </motion.div>

            <motion.div
              className={styles.point}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <span className={styles.icon}>
                <ShieldCheck size={24} />
              </span>
              <div>
                <h4>100% Satisfaction</h4>
                <p>
                  If something’s missed, tell us by next business day
                  and we’ll return to make it right.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.a
            href="#"
            className={styles.link}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            Read our full service guarantee <ArrowRight size={16} />
          </motion.a>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className={styles.imageCard}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <Image
            src="/promise.png"
            alt="Eco-friendly cleaning supplies"
            fill
            priority
          />

          <motion.div
            className={styles.imageBadge}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.4,
                  ease: "easeOut",
                },
              },
            }}
          >
            <span><Leaf size={16} /></span>
            We use non-toxic, pet-safe supplies
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import styles from "./AboutSection.module.css";
import { Award, Users, Heart, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.blueGlow} />

      {/* WRAPPER */}
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
        {/* LEFT IMAGE */}
        <motion.div
          className={styles.imageCard}
          variants={{
            hidden: { opacity: 0, y: 20 },
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
          <Image
            src="/about-image.png"
            alt="Professional cleaning"
            fill
            priority
          />
          <p className={styles.quote}>
            “We treat your home with the same care and respect we would our own.”
          </p>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className={styles.content}>
          <motion.span
            className={styles.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            ABOUT US
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
            More Than Just a <br /> Cleaning Service.
          </motion.h2>

          <motion.p
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 16 },
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
            Clean by Maria started with a simple mission: to give families back
            their weekends. We understand that inviting someone into your home
            requires trust. That’s why every member of our team is vetted,
            trained, and treated like family.
          </motion.p>

          {/* FEATURES */}
          <motion.div
            className={styles.features}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {[
              { icon: Award, title: "Top Rated", desc: "Consistently 5-star reviews across all platforms." },
              { icon: Users, title: "Vetted Team", desc: "Rigorous background checks & full insurance." },
              { icon: Heart, title: "Pet Friendly", desc: "We love your furry friends as much as you do." },
              { icon: Leaf, title: "Eco Products", desc: "Non-toxic supplies safe for kids and pets." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.feature}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
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
                  <div className={styles.featureIcon}>
                    <Icon size={20} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

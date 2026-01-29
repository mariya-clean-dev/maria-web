"use client";

import { useState } from "react";
import styles from "./FaqSection.module.css";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do I need to be home during the cleaning?",
    answer:
      "No, you don't! Many of our clients provide us with a key or keypad code. If you prefer to be home, that's fine too. We just ask for a clear workspace to do our best work.",
  },
  {
    question: "Are your cleaning products safe for pets?",
    answer:
      "Yes. We use pet-safe and non-toxic products whenever possible. Eco-friendly options are available on request.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "Your satisfaction is our priority. If something is missed, notify us by the next business day and we’ll return to make it right.",
  },
  {
    question: "How do I pay?",
    answer:
      "Payment is simple and secure. We accept major credit cards and digital payments after the service is completed.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`${styles.item} ${isOpen ? styles.active : ""}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                {faq.question}

                <motion.span
                  className={styles.icon}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  +
                </motion.span>
              </button>

              {/* ANSWER */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: "easeOut" },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }}
                    className={styles.answerWrapper}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X, MessageSquare } from "lucide-react";
import styles from "./FloatingContact.module.css";

const PHONE_NUMBER = "+1 (925) 539-2941";
const PHONE_RAW = "19255392941"; // digits only for links

/* Card animation variants */
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 16,
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 12,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

/* Icon rotation for the trigger button */
const iconVariants = {
  phone: { rotate: 0, scale: 1 },
  close: { rotate: 90, scale: 0.9 },
};

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Dismiss on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.container} role="complementary" aria-label="Contact us">
      {/* ── Expandable card ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="contact-card"
            className={styles.card}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Contact information"
          >
            {/* Label */}
            <p className={styles.cardLabel}>Contact Us</p>

            {/* Action buttons */}
            <div className={styles.cardActions}>
              <a
                id="floating-contact-call-btn"
                href={`tel:+${PHONE_RAW}`}
                className={styles.btnCall}
                aria-label="Call us"
              >
                <Phone size={14} aria-hidden="true" />
                Call Now
              </a>

              <a
                id="floating-contact-sms-btn"
                href={`sms:+${PHONE_RAW}`}
                className={styles.btnWA}
                aria-label="Send us a text message"
              >
                <MessageSquare size={15} aria-hidden="true" />
                Text Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <motion.button
        id="floating-contact-trigger"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
      >
        {/* Pulse rings — only visible when collapsed */}
        {!isOpen && (
          <>
            <span className={styles.pulse} aria-hidden="true" />
            <span className={styles.pulse2} aria-hidden="true" />
          </>
        )}

        {/* Animated phone / close icon */}
        <motion.div
          variants={iconVariants}
          animate={isOpen ? "close" : "phone"}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Phone size={22} aria-hidden="true" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
